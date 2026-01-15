import { NextResponse } from "next/server";
import { Resend } from "resend";
import { supabaseAdmin } from "@/lib/supabase";
import type { OutreachProspectUpdate } from "@/types/database";

// Initialize Resend
const getResend = () => {
  if (!process.env.RESEND_API_KEY) return null;
  return new Resend(process.env.RESEND_API_KEY);
};

interface OutreachProspect {
  id: string;
  domain: string;
  company_name?: string;
  contact_email?: string;
  accessibility_score?: number;
  issues_count?: number;
  status: string;
}

// Email templates for cold outreach
const emailTemplates = {
  initial: (prospect: OutreachProspect) => ({
    subject: `Quick question about ${prospect.domain}'s EAA compliance`,
    html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
    .highlight { background: #fef3c7; padding: 2px 6px; border-radius: 4px; }
    .cta { display: inline-block; padding: 12px 24px; background: #6366f1; color: white; text-decoration: none; border-radius: 8px; margin: 20px 0; }
    .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #666; font-size: 14px; }
  </style>
</head>
<body>
  <p>Hi,</p>

  <p>I noticed <strong>${prospect.domain}</strong> serves customers in Europe. Quick question – have you checked if your website meets the new European Accessibility Act requirements?</p>

  <p>The <span class="highlight">EAA deadline passed on June 28th</span>, and non-compliant websites face fines up to <strong>EUR 100,000</strong>.</p>

  ${prospect.accessibility_score !== undefined ? `
  <p>I ran a quick scan of your site and found <strong>${prospect.issues_count || 'several'} accessibility issues</strong> that could put you at risk.</p>
  ` : ''}

  <p>I built a free tool that scans your site in 30 seconds and shows exactly what needs fixing:</p>

  <a href="https://tryinclusiv.com?utm_source=outreach&utm_campaign=cold&domain=${encodeURIComponent(prospect.domain)}" class="cta">
    Scan ${prospect.domain} Free →
  </a>

  <p>No signup needed. Takes 30 seconds.</p>

  <p>Would be happy to walk you through the results if useful.</p>

  <p>Best,<br>Colin</p>

  <div class="footer">
    <p>P.S. 96% of websites have accessibility issues they don't know about. A quick scan could save you from a costly surprise.</p>
    <p style="color: #999; font-size: 12px;">
      You're receiving this because your website may be affected by the European Accessibility Act.
      <a href="https://tryinclusiv.com/unsubscribe?email=${encodeURIComponent(prospect.contact_email || '')}" style="color: #999;">Unsubscribe</a>
    </p>
  </div>
</body>
</html>
    `,
    text: `Hi,

I noticed ${prospect.domain} serves customers in Europe. Quick question – have you checked if your website meets the new European Accessibility Act requirements?

The EAA deadline passed on June 28th, and non-compliant websites face fines up to EUR 100,000.

I built a free tool that scans your site in 30 seconds and shows exactly what needs fixing: https://tryinclusiv.com

No signup needed.

Best,
Colin

P.S. 96% of websites have accessibility issues they don't know about. A quick scan could save you from a costly surprise.`
  }),

  followUp: (prospect: OutreachProspect) => ({
    subject: `Re: ${prospect.domain} accessibility check`,
    html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
    .cta { display: inline-block; padding: 12px 24px; background: #6366f1; color: white; text-decoration: none; border-radius: 8px; margin: 20px 0; }
  </style>
</head>
<body>
  <p>Hi again,</p>

  <p>Just following up – I wanted to make sure you saw my note about the EAA compliance deadline.</p>

  <p>The European Accessibility Act is now being enforced across the EU. Websites serving European customers need to be WCAG 2.1 AA compliant.</p>

  <p>If ${prospect.domain} hasn't been checked yet, I'd be happy to run a free accessibility scan for you. It takes 30 seconds and shows exactly what (if anything) needs to be fixed.</p>

  <a href="https://tryinclusiv.com?utm_source=outreach&utm_campaign=followup&domain=${encodeURIComponent(prospect.domain)}" class="cta">
    Run Free Scan →
  </a>

  <p>Let me know if you have any questions.</p>

  <p>Best,<br>Colin</p>
</body>
</html>
    `,
    text: `Hi again,

Just following up – I wanted to make sure you saw my note about the EAA compliance deadline.

The European Accessibility Act is now being enforced across the EU. Websites serving European customers need to be WCAG 2.1 AA compliant.

If ${prospect.domain} hasn't been checked yet, I'd be happy to run a free accessibility scan for you: https://tryinclusiv.com

Let me know if you have any questions.

Best,
Colin`
  }),
};

async function sendOutreachEmail(
  prospect: OutreachProspect,
  template: 'initial' | 'followUp'
) {
  const resend = getResend();
  if (!resend) {
    console.error('Resend not configured');
    return { success: false, error: 'Email not configured' };
  }

  if (!prospect.contact_email) {
    return { success: false, error: 'No contact email' };
  }

  const emailContent = emailTemplates[template](prospect);

  try {
    const result = await resend.emails.send({
      from: "Colin at Inclusiv <colin@inclusiv.dev>",
      to: prospect.contact_email,
      subject: emailContent.subject,
      html: emailContent.html,
      text: emailContent.text,
      tags: [
        { name: 'campaign', value: 'cold_outreach' },
        { name: 'template', value: template },
        { name: 'domain', value: prospect.domain },
      ],
    });

    return { success: true, messageId: result.data?.id };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { success: false, error: String(error) };
  }
}

export async function POST(request: Request) {
  const authHeader = request.headers.get("authorization");
  const apiKey = process.env.ADMIN_API_KEY;

  if (!apiKey || authHeader !== `Bearer ${apiKey}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const {
      prospectIds,
      template = 'initial',
      limit = 10,
      dryRun = true
    } = body;

    let prospects: OutreachProspect[];

    if (prospectIds && Array.isArray(prospectIds)) {
      // Send to specific prospects
      const { data, error } = await supabaseAdmin
        .from('outreach_prospects')
        .select('*')
        .in('id', prospectIds);

      if (error) throw error;
      prospects = data || [];
    } else {
      // Get new prospects with contact emails
      const { data, error } = await supabaseAdmin
        .from('outreach_prospects')
        .select('*')
        .eq('status', 'new')
        .not('contact_email', 'is', null)
        .limit(limit);

      if (error) throw error;
      prospects = data || [];
    }

    const results = [];

    for (const prospect of prospects) {
      if (dryRun) {
        results.push({
          domain: prospect.domain,
          email: prospect.contact_email,
          status: 'dry_run',
          wouldSend: true,
        });
        continue;
      }

      const sendResult = await sendOutreachEmail(prospect, template);

      // Update prospect status
      if (sendResult.success) {
        const updateData: OutreachProspectUpdate = {
          status: 'contacted',
          last_contacted_at: new Date().toISOString(),
          outreach_count: (prospect as any).outreach_count ? (prospect as any).outreach_count + 1 : 1,
        };
        await supabaseAdmin
          .from('outreach_prospects')
          .update(updateData as never)
          .eq('id', prospect.id);
      }

      results.push({
        domain: prospect.domain,
        email: prospect.contact_email,
        ...sendResult,
      });

      // Rate limit: 1 email per second
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    return NextResponse.json({
      success: true,
      dryRun,
      processed: results.length,
      sent: results.filter(r => 'success' in r && r.success).length,
      results,
    });
  } catch (error) {
    console.error("Campaign error:", error);
    return NextResponse.json(
      { error: "Failed to send campaign" },
      { status: 500 }
    );
  }
}
