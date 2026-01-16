import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

const getResend = () => {
  if (!process.env.RESEND_API_KEY) return null;
  return new Resend(process.env.RESEND_API_KEY);
};

const getSupabase = () => {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) return null;
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
};

export async function POST(request: Request) {
  try {
    const { email, source = 'website', listType = 'general' } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    // Store subscriber in database
    const supabase = getSupabase();
    if (supabase) {
      try {
        await supabase
          .from('newsletter_subscribers')
          .upsert({
            email,
            source,
            list_type: listType,
            subscribed_at: new Date().toISOString(),
            status: 'active',
          }, {
            onConflict: 'email',
          });
      } catch (dbError) {
        console.error("Database insert error:", dbError);
        // Don't fail the request if DB fails
      }
    }

    // Log subscriber
    console.log("New newsletter subscriber:", {
      email,
      source,
      listType,
      timestamp: new Date().toISOString(),
    });

    // Send welcome email
    const resend = getResend();
    if (resend) {
      try {
        await resend.emails.send({
          from: "Inclusiv <hello@tryinclusiv.com>",
          to: email,
          subject: "Welcome to the Inclusiv Newsletter",
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <style>
                body { font-family: system-ui, -apple-system, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
                .header { text-align: center; margin-bottom: 40px; }
                .logo { font-size: 28px; font-weight: bold; color: #6366f1; }
                .cta { display: inline-block; padding: 16px 32px; background: #6366f1; color: white; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 20px 0; }
                .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #666; font-size: 14px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <div class="logo">🛡️ Inclusiv</div>
                </div>

                <h1>Welcome to the Inclusiv Newsletter!</h1>

                <p>Thanks for subscribing. You'll receive the latest insights on:</p>

                <ul>
                  <li><strong>EAA Compliance</strong> - Updates on European Accessibility Act requirements</li>
                  <li><strong>WCAG Best Practices</strong> - Practical tips for making your website accessible</li>
                  <li><strong>Industry Research</strong> - Data-driven insights on web accessibility trends</li>
                  <li><strong>Platform Guides</strong> - Tutorials for Shopify, WordPress, and more</li>
                </ul>

                <p>While you're here, have you checked your website's accessibility score?</p>

                <p style="text-align: center;">
                  <a href="https://tryinclusiv.com" class="cta">Free Accessibility Scan →</a>
                </p>

                <div class="footer">
                  <p>Questions? Reply to this email and we'll help.</p>
                  <p>Inclusiv - Web Accessibility Made Simple</p>
                  <p><a href="https://tryinclusiv.com/unsubscribe?email=${encodeURIComponent(email)}" style="color: #666;">Unsubscribe</a></p>
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
    console.error("Newsletter subscribe error:", error);
    return NextResponse.json(
      { error: "Failed to subscribe" },
      { status: 500 }
    );
  }
}
