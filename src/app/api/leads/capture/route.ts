import { NextResponse } from "next/server";
import { Resend } from "resend";
import { supabaseAdmin } from "@/lib/supabase";
import { getEmailScheduler } from "@/lib/email-scheduler";
import type { Lead as EmailSequenceLead } from "@/lib/email-sequences";
import type { LeadUpdate, LeadInsert, Lead as DbLead } from "@/types/database";

// Lead input for capture API (different from email sequence Lead)
interface CaptureLeadInput {
  email: string;
  url?: string;
  source?: string;
  leadMagnet?: string;
  metadata?: Record<string, unknown>;
}

// Lead output with all fields
interface CapturedLead {
  id: string;
  email: string;
  url?: string;
  source: string;
  leadMagnet?: string;
  scanScore?: number;
  totalIssues?: number;
  criticalIssues?: number;
  platformDetected?: string;
  metadata?: Record<string, unknown>;
  createdAt: Date;
}

// Initialize Resend lazily to avoid build errors
const getResend = () => {
  if (!process.env.RESEND_API_KEY) return null;
  return new Resend(process.env.RESEND_API_KEY);
};

async function storeLead(lead: CaptureLeadInput): Promise<{ success: boolean; isNew: boolean; leadData?: CapturedLead }> {
  try {
    // Check if lead already exists
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: existing } = await (supabaseAdmin as any)
      .from('leads')
      .select('*')
      .eq('email', lead.email.toLowerCase())
      .single() as { data: DbLead | null; error: Error | null };

    if (existing) {
      // Update existing lead with new info
      const mergedMetadata = {
        ...(existing.metadata as Record<string, unknown> || {}),
        ...(lead.metadata || {}),
      };
      const updateData: LeadUpdate = {
        url: lead.url || existing.url,
        lead_magnet: lead.leadMagnet || existing.lead_magnet,
        metadata: mergedMetadata as LeadUpdate['metadata'],
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: updated, error } = await (supabaseAdmin as any)
        .from('leads')
        .update(updateData)
        .eq('id', existing.id)
        .select()
        .single() as { data: DbLead | null; error: Error | null };

      if (error) throw error;
      if (!updated) throw new Error('Failed to update lead');

      return {
        success: true,
        isNew: false,
        leadData: mapDbToLead(updated),
      };
    }

    // Create new lead
    const insertData: LeadInsert = {
      email: lead.email.toLowerCase().trim(),
      url: lead.url,
      source: lead.source || 'website',
      lead_magnet: lead.leadMagnet,
      metadata: lead.metadata as LeadInsert['metadata'],
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: created, error } = await (supabaseAdmin as any)
      .from('leads')
      .insert(insertData)
      .select()
      .single() as { data: DbLead | null; error: Error | null };

    if (error) throw error;
    if (!created) throw new Error('Failed to create lead');

    return {
      success: true,
      isNew: true,
      leadData: mapDbToLead(created),
    };
  } catch (error) {
    console.error("Failed to store lead:", error);
    return { success: false, isNew: false };
  }
}

function mapDbToLead(dbLead: DbLead): CapturedLead {
  return {
    id: dbLead.id,
    email: dbLead.email,
    url: dbLead.url || undefined,
    source: dbLead.source,
    leadMagnet: dbLead.lead_magnet || undefined,
    scanScore: dbLead.scan_score || undefined,
    totalIssues: dbLead.total_issues || undefined,
    criticalIssues: dbLead.critical_issues || undefined,
    platformDetected: dbLead.platform_detected || undefined,
    metadata: dbLead.metadata as Record<string, unknown> | undefined,
    createdAt: new Date(dbLead.created_at),
  };
}

// Convert CapturedLead to EmailSequenceLead for the email scheduler
function toEmailSequenceLead(lead: CapturedLead): EmailSequenceLead {
  return {
    id: lead.id,
    email: lead.email,
    websiteUrl: lead.url || '',
    source: lead.source,
    createdAt: lead.createdAt,
    scanResults: lead.scanScore !== undefined ? {
      score: lead.scanScore,
      totalIssues: lead.totalIssues || 0,
      criticalIssues: lead.criticalIssues || 0,
      platform: lead.platformDetected || 'unknown',
      topIssues: [],
      scannedAt: lead.createdAt.toISOString(),
    } : undefined,
  };
}

async function sendWelcomeEmail(email: string, leadMagnet: string, url?: string) {
  const resend = getResend();
  if (!resend) return;

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://tryinclusiv.com';

  // Different email templates based on lead magnet
  const templates: Record<string, { subject: string; content: string }> = {
    "accessibility-report": {
      subject: "Your Free Accessibility Report is Here",
      content: `
        <h1>Your Accessibility Report</h1>
        <p>Thanks for requesting your free accessibility report! Here's what you'll learn:</p>
        <ul>
          <li>The most common WCAG 2.1 violations</li>
          <li>How to prioritize accessibility fixes</li>
          <li>Quick wins you can implement today</li>
        </ul>
        <p>The European Accessibility Act deadline has <strong>passed</strong>. Non-compliant websites face fines up to €100,000.</p>
        <p style="text-align: center; margin: 30px 0;">
          <a href="${appUrl}" style="display: inline-block; padding: 16px 32px; background: #6366f1; color: white; text-decoration: none; border-radius: 8px; font-weight: 600;">
            Scan Your Website Free →
          </a>
        </p>
      `,
    },
    "eaa-checklist": {
      subject: "Your EAA Compliance Checklist Download",
      content: `
        <h1>Your EAA Compliance Checklist</h1>
        <p>Great choice! Your comprehensive EAA compliance checklist is attached to this email.</p>
        <p>Here's what's included:</p>
        <ul>
          <li>Complete 47-point accessibility checklist</li>
          <li>Priority rankings for each requirement</li>
          <li>Timeline recommendations for compliance</li>
          <li>Quick-reference code examples</li>
        </ul>
        <p><strong>Remember:</strong> The EAA deadline has passed. Start checking off these items today!</p>
        <p style="text-align: center; margin: 30px 0;">
          <a href="${appUrl}/resources/eaa-checklist" style="display: inline-block; padding: 16px 32px; background: #6366f1; color: white; text-decoration: none; border-radius: 8px; font-weight: 600;">
            Download Your Checklist →
          </a>
        </p>
      `,
    },
    "inline-audit": {
      subject: "Your Accessibility Audit Request",
      content: `
        <h1>Thanks for Your Interest!</h1>
        <p>We've received your request for a free accessibility audit${url ? ` for <strong>${url}</strong>` : ""}.</p>
        <p>Our team will review your website and send you a detailed report within 24 hours.</p>
        <p>In the meantime, try our instant scanner:</p>
        <p style="text-align: center; margin: 30px 0;">
          <a href="${appUrl}" style="display: inline-block; padding: 16px 32px; background: #6366f1; color: white; text-decoration: none; border-radius: 8px; font-weight: 600;">
            Get Instant Scan Results →
          </a>
        </p>
      `,
    },
    default: {
      subject: "Welcome to Inclusiv - Web Accessibility Made Simple",
      content: `
        <h1>Welcome to Inclusiv!</h1>
        <p>Thanks for joining thousands of businesses working toward EAA compliance.</p>
        <p>Here's what you can do next:</p>
        <ul>
          <li>Scan your website for free</li>
          <li>Get AI-powered fix suggestions</li>
          <li>Download our compliance resources</li>
        </ul>
        <p style="text-align: center; margin: 30px 0;">
          <a href="${appUrl}" style="display: inline-block; padding: 16px 32px; background: #6366f1; color: white; text-decoration: none; border-radius: 8px; font-weight: 600;">
            Start Your Free Scan →
          </a>
        </p>
      `,
    },
  };

  const template = templates[leadMagnet] || templates.default;

  try {
    await resend.emails.send({
      from: "Inclusiv <hello@tryinclusiv.com>",
      to: email,
      subject: template.subject,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: system-ui, -apple-system, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
            h1 { color: #6366f1; }
            ul { padding-left: 20px; }
            li { margin: 8px 0; }
            .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          ${template.content}
          <div class="footer">
            <p>Questions? Just reply to this email.</p>
            <p>Inclusiv - Web Accessibility Made Simple</p>
            <p style="color: #999; font-size: 12px;">
              You're receiving this because you signed up at Inclusiv.
              <a href="${appUrl}/unsubscribe?email=${encodeURIComponent(email)}" style="color: #999;">Unsubscribe</a>
            </p>
          </div>
        </body>
        </html>
      `,
    });
  } catch (error) {
    console.error("Failed to send welcome email:", error);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, url, source = "website", leadMagnet = "general", startSequence = false } = body;

    // Validate email
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Get request metadata
    const userAgent = request.headers.get("user-agent") || undefined;
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0] ||
               request.headers.get("x-real-ip") ||
               undefined;

    // Store lead in Supabase
    const { isNew, leadData } = await storeLead({
      email: email.toLowerCase().trim(),
      url: url?.trim() || undefined,
      source,
      leadMagnet,
      metadata: {
        ip,
        userAgent,
        capturedAt: new Date().toISOString(),
      },
    });

    // Log to console (useful for debugging and Vercel logs)
    console.log("Lead captured:", {
      email: email.toLowerCase(),
      source,
      leadMagnet,
      isNew,
      timestamp: new Date().toISOString(),
    });

    // Start email sequence for new leads if requested
    if (isNew && startSequence && leadData) {
      try {
        const scheduler = getEmailScheduler();
        await scheduler.startWelcomeSequence(toEmailSequenceLead(leadData));
        console.log("Started welcome sequence for:", email);
      } catch (seqError) {
        console.error("Failed to start email sequence:", seqError);
        // Don't fail the request, lead is still captured
      }
    } else if (isNew) {
      // Just send a simple welcome email
      await sendWelcomeEmail(email, leadMagnet, url);
    }

    return NextResponse.json({
      success: true,
      message: isNew ? "Thanks for subscribing!" : "You're already subscribed!",
      leadId: leadData?.id,
    });
  } catch (error) {
    console.error("Lead capture error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve leads (protected - for admin use only)
export async function GET(request: Request) {
  // Simple API key protection
  const authHeader = request.headers.get("authorization");
  const apiKey = process.env.ADMIN_API_KEY;

  if (!apiKey || authHeader !== `Bearer ${apiKey}`) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '100');
    const offset = parseInt(searchParams.get('offset') || '0');

    const { data: leads, error, count } = await supabaseAdmin
      .from('leads')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;

    return NextResponse.json({
      leads: leads || [],
      total: count || 0,
      limit,
      offset,
    });
  } catch (error) {
    console.error("Failed to fetch leads:", error);
    return NextResponse.json(
      { error: "Failed to fetch leads" },
      { status: 500 }
    );
  }
}
