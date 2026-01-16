import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const getResend = () => {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('Missing RESEND_API_KEY');
  }
  return new Resend(process.env.RESEND_API_KEY);
};

interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  website?: string;
  topic: string;
  message: string;
}

const topicLabels: Record<string, string> = {
  technical: 'Technical Support',
  billing: 'Billing & Pricing',
  compliance: 'Compliance Questions',
  enterprise: 'Enterprise Inquiry',
  partnership: 'Partnership Opportunity',
  bug: 'Bug Report',
  feature: 'Feature Request',
  other: 'Other',
};

export async function POST(request: NextRequest) {
  try {
    const data: ContactFormData = await request.json();

    // Validate required fields
    if (!data.name || !data.email || !data.topic || !data.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    const resend = getResend();

    // Send notification email to support team
    await resend.emails.send({
      from: 'Inclusiv Contact Form <noreply@inclusiv.dev>',
      to: ['support@tryinclusiv.com'],
      replyTo: data.email,
      subject: `[${topicLabels[data.topic] || data.topic}] Contact from ${data.name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #6366f1;">New Contact Form Submission</h2>

          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; width: 120px;">Name:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${data.name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Email:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><a href="mailto:${data.email}">${data.email}</a></td>
            </tr>
            ${data.company ? `
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Company:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${data.company}</td>
            </tr>
            ` : ''}
            ${data.website ? `
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Website:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><a href="${data.website}">${data.website}</a></td>
            </tr>
            ` : ''}
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Topic:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${topicLabels[data.topic] || data.topic}</td>
            </tr>
          </table>

          <h3 style="color: #333; margin-top: 30px;">Message:</h3>
          <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; white-space: pre-wrap;">${data.message}</div>

          <p style="color: #666; margin-top: 30px; font-size: 12px;">
            Sent from Inclusiv Contact Form
          </p>
        </div>
      `,
    });

    // Send confirmation email to user
    await resend.emails.send({
      from: 'Inclusiv <support@tryinclusiv.com>',
      to: [data.email],
      subject: 'We received your message - Inclusiv',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="text-align: center; padding: 30px 0;">
            <h1 style="color: #6366f1; margin: 0;">Inclusiv</h1>
          </div>

          <h2 style="color: #333;">Thanks for reaching out, ${data.name}!</h2>

          <p style="color: #666; line-height: 1.6;">
            We've received your message and will get back to you as soon as possible. Our typical response time is within 24 hours for general inquiries.
          </p>

          <div style="background: #f5f5f7; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #333;"><strong>Your message:</strong></p>
            <p style="color: #666; white-space: pre-wrap; margin: 10px 0 0 0;">${data.message}</p>
          </div>

          <p style="color: #666; line-height: 1.6;">
            In the meantime, you might find answers to common questions in our <a href="https://inclusiv.dev/faq" style="color: #6366f1;">FAQ</a> or <a href="https://inclusiv.dev/help" style="color: #6366f1;">Help Center</a>.
          </p>

          <p style="color: #666; line-height: 1.6;">
            Best regards,<br/>
            The Inclusiv Team
          </p>

          <div style="border-top: 1px solid #eee; margin-top: 30px; padding-top: 20px; text-align: center; color: #999; font-size: 12px;">
            <p>Inclusiv - Web Accessibility Compliance</p>
            <p><a href="https://inclusiv.dev" style="color: #6366f1;">inclusiv.dev</a></p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully',
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    );
  }
}
