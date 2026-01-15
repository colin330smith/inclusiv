import { NextResponse } from "next/server";
import { Resend } from "resend";

// Initialize Resend lazily to avoid build errors
const getResend = () => {
  if (!process.env.RESEND_API_KEY) return null;
  return new Resend(process.env.RESEND_API_KEY);
};

export async function POST(request: Request) {
  try {
    const { email, url, score } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Store lead in console for now (in production, use a database)
    console.log("New lead captured:", { email, url, score, timestamp: new Date().toISOString() });

    // Send welcome email
    const resend = getResend();
    if (resend) {
      try {
        await resend.emails.send({
          from: "Inclusiv <hello@tryinclusiv.com>",
          to: email,
          subject: `Your Accessibility Report - Score: ${score}/100`,
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <style>
                body { font-family: system-ui, -apple-system, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
                .header { text-align: center; margin-bottom: 40px; }
                .logo { font-size: 28px; font-weight: bold; color: #6366f1; }
                .score-badge { display: inline-block; padding: 20px 40px; background: ${score >= 80 ? '#22c55e' : score >= 50 ? '#f59e0b' : '#ef4444'}; color: white; border-radius: 16px; font-size: 48px; font-weight: bold; margin: 20px 0; }
                .cta { display: inline-block; padding: 16px 32px; background: #6366f1; color: white; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 20px 0; }
                .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #666; font-size: 14px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <div class="logo">🛡️ Inclusiv</div>
                </div>

                <h1>Your Accessibility Scan Results</h1>

                <p>Thanks for scanning <strong>${url}</strong>!</p>

                <div style="text-align: center;">
                  <div class="score-badge">${score}</div>
                  <p style="color: #666;">Accessibility Score</p>
                </div>

                <h2>${score >= 80 ? "Good progress! A few tweaks needed." : score >= 50 ? "Some work needed before the deadline." : "Critical issues require immediate attention."}</h2>

                <p>The European Accessibility Act deadline is <strong>June 28, 2025</strong>. Non-compliant websites face fines up to €100,000.</p>

                <h3>What's Next?</h3>
                <ul>
                  <li>Review your detailed accessibility report</li>
                  <li>Get AI-generated code fixes for your platform</li>
                  <li>Schedule a free compliance consultation</li>
                </ul>

                <p style="text-align: center;">
                  <a href="https://inclusiv.dev" class="cta">Book Free Consultation →</a>
                </p>

                <div class="footer">
                  <p>Questions? Reply to this email and we'll help you get compliant.</p>
                  <p>Inclusiv - Web Accessibility Made Simple</p>
                </div>
              </div>
            </body>
            </html>
          `,
        });
      } catch (emailError) {
        console.error("Email send error:", emailError);
        // Don't fail the request if email fails
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Subscribe error:", error);
    return NextResponse.json(
      { error: "Failed to subscribe" },
      { status: 500 }
    );
  }
}
