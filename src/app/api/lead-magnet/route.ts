import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

// Lazy initialization to avoid build-time errors
const getResend = () => {
  if (!process.env.RESEND_API_KEY) return null;
  return new Resend(process.env.RESEND_API_KEY);
};

const getSupabase = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
};

// Lead magnet configurations
const leadMagnets: Record<string, {
  name: string;
  subject: string;
  downloadUrl: string;
  fileName: string;
}> = {
  "eaa-compliance-checklist": {
    name: "EAA Compliance Checklist",
    subject: "Your Free EAA Compliance Checklist is Ready",
    downloadUrl: "https://tryinclusiv.com/downloads/eaa-compliance-checklist.pdf",
    fileName: "EAA-Compliance-Checklist.pdf",
  },
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name, leadMagnet, source } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    if (!leadMagnet || !leadMagnets[leadMagnet]) {
      return NextResponse.json({ error: "Invalid lead magnet" }, { status: 400 });
    }

    const magnet = leadMagnets[leadMagnet];
    const supabase = getSupabase();
    const resend = getResend();

    // Save lead to database
    if (supabase) {
      const { error: dbError } = await supabase.from("leads").upsert(
        {
          email,
          name: name || null,
          source: source || "lead-magnet",
          lead_magnet: leadMagnet,
          created_at: new Date().toISOString(),
        },
        { onConflict: "email" }
      );

      if (dbError) {
        console.error("Database error:", dbError);
        // Continue anyway - still send the email
      }
    }

    // Send email with the lead magnet
    if (!resend) {
      console.error("Resend not configured");
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      );
    }

    const { error: emailError } = await resend.emails.send({
      from: "Inclusiv <hello@tryinclusiv.com>",
      to: email,
      subject: magnet.subject,
      html: generateLeadMagnetEmail(name || "there", magnet),
    });

    if (emailError) {
      console.error("Email error:", emailError);
      return NextResponse.json(
        { error: "Failed to send email. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Lead magnet error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

function generateLeadMagnetEmail(
  name: string,
  magnet: { name: string; downloadUrl: string; fileName: string }
): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${magnet.name}</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">

  <div style="text-align: center; margin-bottom: 30px;">
    <div style="display: inline-flex; align-items: center; gap: 8px;">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
      <span style="font-size: 24px; font-weight: bold; color: #111;">Inclusiv</span>
    </div>
  </div>

  <h1 style="color: #111; font-size: 24px; margin-bottom: 16px;">
    Hey ${name}! 👋
  </h1>

  <p style="font-size: 16px; color: #444; margin-bottom: 20px;">
    Thanks for downloading the <strong>${magnet.name}</strong>. Here's your copy:
  </p>

  <div style="text-align: center; margin: 30px 0;">
    <a href="${magnet.downloadUrl}"
       style="display: inline-block; background-color: #6366f1; color: white; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-weight: 600; font-size: 16px;">
      📥 Download Your Checklist
    </a>
  </div>

  <div style="background-color: #f8fafc; border-radius: 8px; padding: 20px; margin: 30px 0;">
    <h3 style="color: #111; margin-top: 0;">What's inside:</h3>
    <ul style="color: #444; padding-left: 20px;">
      <li>50+ checkpoints covering all WCAG 2.1 AA criteria</li>
      <li>Priority rankings by severity and ease of fix</li>
      <li>Code examples for common issues</li>
      <li>EAA compliance tips specific to your industry</li>
    </ul>
  </div>

  <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; margin: 30px 0;">
    <p style="margin: 0; color: #92400e;">
      <strong>⚠️ Quick reminder:</strong> The EAA deadline passed in June 2025. Non-compliant sites now face fines up to €100,000 per violation.
    </p>
  </div>

  <h3 style="color: #111;">Want to check your site right now?</h3>
  <p style="color: #444;">
    Run a free accessibility scan in 30 seconds — no signup required:
  </p>

  <div style="text-align: center; margin: 20px 0;">
    <a href="https://tryinclusiv.com/#scanner"
       style="display: inline-block; background-color: #111; color: white; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 600;">
      Free Scan →
    </a>
  </div>

  <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">

  <p style="font-size: 14px; color: #6b7280;">
    Have questions about EAA compliance? Just reply to this email — I read every message.
  </p>

  <p style="font-size: 14px; color: #6b7280;">
    Cheers,<br>
    The Inclusiv Team
  </p>

  <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; font-size: 12px; color: #9ca3af;">
    <p>
      Inclusiv · Making the web accessible for everyone
    </p>
    <p>
      <a href="https://tryinclusiv.com" style="color: #6366f1; text-decoration: none;">tryinclusiv.com</a>
    </p>
    <p style="margin-top: 10px;">
      <a href="{{{UNSUBSCRIBE_URL}}}" style="color: #9ca3af; text-decoration: underline;">Unsubscribe</a>
    </p>
  </div>

</body>
</html>
  `;
}
