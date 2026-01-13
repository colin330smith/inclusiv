import { NextResponse } from "next/server";
import { Resend } from "resend";
import { promises as fs } from "fs";
import path from "path";

// Initialize Resend lazily to avoid build errors
const getResend = () => {
  if (!process.env.RESEND_API_KEY) return null;
  return new Resend(process.env.RESEND_API_KEY);
};

// Path to store leads (in production, use a proper database)
const LEADS_FILE = path.join(process.cwd(), "data", "leads.json");

interface Lead {
  email: string;
  url?: string;
  source: string;
  leadMagnet: string;
  timestamp: string;
  ip?: string;
  userAgent?: string;
}

async function storeLeads(lead: Lead) {
  try {
    // Ensure data directory exists
    const dataDir = path.dirname(LEADS_FILE);
    await fs.mkdir(dataDir, { recursive: true });

    // Read existing leads
    let leads: Lead[] = [];
    try {
      const data = await fs.readFile(LEADS_FILE, "utf-8");
      leads = JSON.parse(data);
    } catch {
      // File doesn't exist yet, start with empty array
    }

    // Check for duplicate emails
    const existingLead = leads.find((l) => l.email.toLowerCase() === lead.email.toLowerCase());
    if (existingLead) {
      // Update existing lead with new info
      Object.assign(existingLead, {
        ...lead,
        updatedAt: new Date().toISOString(),
      });
    } else {
      leads.push(lead);
    }

    // Write back to file
    await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2));

    return { success: true, isNew: !existingLead };
  } catch (error) {
    console.error("Failed to store lead:", error);
    return { success: false, isNew: false };
  }
}

async function sendWelcomeEmail(email: string, leadMagnet: string, url?: string) {
  const resend = getResend();
  if (!resend) return;

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://inclusiv-xi.vercel.app';

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
        <p>The European Accessibility Act deadline is <strong>June 28, 2025</strong>. Non-compliant websites face fines up to €100,000.</p>
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
        <p><strong>Remember:</strong> The EAA deadline is June 28, 2025. Start checking off these items today!</p>
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
      from: "Inclusiv <hello@inclusiv.dev>",
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
    const { email, url, source = "unknown", leadMagnet = "general" } = body;

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

    // Create lead object
    const lead: Lead = {
      email: email.toLowerCase().trim(),
      url: url?.trim() || undefined,
      source,
      leadMagnet,
      timestamp: new Date().toISOString(),
      ip,
      userAgent,
    };

    // Store lead
    const { isNew } = await storeLeads(lead);

    // Log to console (useful for debugging and Vercel logs)
    console.log("Lead captured:", {
      email: lead.email,
      source,
      leadMagnet,
      isNew,
      timestamp: lead.timestamp,
    });

    // Send welcome email (only for new leads)
    if (isNew) {
      await sendWelcomeEmail(email, leadMagnet, url);
    }

    return NextResponse.json({
      success: true,
      message: isNew ? "Thanks for subscribing!" : "You're already subscribed!",
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
    const data = await fs.readFile(LEADS_FILE, "utf-8");
    const leads = JSON.parse(data);
    return NextResponse.json({ leads, total: leads.length });
  } catch {
    return NextResponse.json({ leads: [], total: 0 });
  }
}
