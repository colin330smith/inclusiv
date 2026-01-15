import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { promises as fs } from 'fs';
import path from 'path';
import { Resend } from 'resend';
import {
  generateReferralCode,
  getReferralLink,
  Referral,
  REFERRAL_CONFIG,
  REFERRAL_EMAIL_TEMPLATES,
} from '@/lib/referrals';

const REFERRALS_FILE = path.join(process.cwd(), 'data', 'referrals.json');

const getResend = () => {
  if (!process.env.RESEND_API_KEY) return null;
  return new Resend(process.env.RESEND_API_KEY);
};

// Get all referrals from storage
async function getReferrals(): Promise<Referral[]> {
  try {
    const data = await fs.readFile(REFERRALS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// Save referrals to storage
async function saveReferrals(referrals: Referral[]): Promise<void> {
  const dataDir = path.dirname(REFERRALS_FILE);
  await fs.mkdir(dataDir, { recursive: true });
  await fs.writeFile(REFERRALS_FILE, JSON.stringify(referrals, null, 2));
}

// POST - Send a referral invite email
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
    }

    // Get user from session
    const cookieStore = await cookies();
    const userCookie = cookieStore.get('user');

    if (!userCookie?.value) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    let user;
    try {
      user = JSON.parse(userCookie.value);
    } catch {
      return NextResponse.json({ error: 'Invalid session' }, { status: 401 });
    }

    const allReferrals = await getReferrals();

    // Check if this email was already invited by this user
    const existingReferral = allReferrals.find(
      r => r.referredEmail.toLowerCase() === email.toLowerCase() &&
           r.referrerUserId === user.id
    );

    if (existingReferral) {
      return NextResponse.json({
        error: 'You have already invited this email',
      }, { status: 400 });
    }

    // Check if email is already a user
    const isExistingUser = allReferrals.some(
      r => r.referredEmail.toLowerCase() === email.toLowerCase() &&
           r.status !== 'pending'
    );

    if (isExistingUser) {
      return NextResponse.json({
        error: 'This email is already registered',
      }, { status: 400 });
    }

    const referralCode = generateReferralCode(user.id);
    const referralLink = getReferralLink(referralCode);

    // Create referral record
    const newReferral: Referral = {
      id: crypto.randomUUID(),
      referrerUserId: user.id,
      referrerEmail: user.email,
      referredEmail: email,
      referredUserId: null,
      referralCode,
      status: 'pending',
      rewardType: 'free_month',
      rewardApplied: false,
      stripePromotionCode: null,
      createdAt: new Date().toISOString(),
      convertedAt: null,
      rewardedAt: null,
    };

    allReferrals.push(newReferral);
    await saveReferrals(allReferrals);

    // Send invite email to referred person
    const resend = getResend();
    if (resend) {
      const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://tryinclusiv.com';
      const referrerName = user.name || user.email.split('@')[0];

      try {
        await resend.emails.send({
          from: 'Inclusiv <hello@inclusiv.dev>',
          to: email,
          subject: `${referrerName} thinks you should check out Inclusiv (+ 20% off inside)`,
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <style>
                body { font-family: system-ui, -apple-system, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
                h1 { color: #6366f1; }
                .cta { display: inline-block; padding: 16px 32px; background: #6366f1; color: white; text-decoration: none; border-radius: 8px; font-weight: 600; }
                .discount { background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; padding: 24px; border-radius: 12px; text-align: center; margin: 20px 0; }
                .highlight { background: #f0f9ff; border-left: 4px solid #6366f1; padding: 16px; margin: 20px 0; }
              </style>
            </head>
            <body>
              <h1>You've Been Invited! 🎉</h1>

              <p>Hi there,</p>

              <p><strong>${referrerName}</strong> thought you'd benefit from Inclusiv—the fastest way to make your website accessible and compliant with the European Accessibility Act.</p>

              <div class="discount">
                <p style="margin:0 0 10px 0; font-size: 14px; opacity: 0.9;">YOUR EXCLUSIVE REFERRAL DISCOUNT</p>
                <p style="margin:0; font-size: 28px; font-weight: bold;">${REFERRAL_CONFIG.referredReward.percent}% OFF</p>
                <p style="margin:10px 0 0 0; font-size: 16px;">Your first ${REFERRAL_CONFIG.referredReward.duration} months</p>
                <p style="margin:10px 0 0 0; font-size: 14px; opacity: 0.9;">Applied automatically with this link</p>
              </div>

              <div class="highlight">
                <strong>⚠️ EAA Compliance Alert:</strong> The European Accessibility Act deadline has passed (June 28, 2025). Non-compliant businesses now face fines up to €100,000.
              </div>

              <p><strong>What Inclusiv Does:</strong></p>
              <ul>
                <li>✅ Scans your entire website for WCAG 2.1 AA issues</li>
                <li>✅ Provides AI-powered fix suggestions with exact code</li>
                <li>✅ Generates compliance certificates for regulators</li>
                <li>✅ Continuous monitoring to stay compliant</li>
              </ul>

              <p style="text-align: center; margin: 30px 0;">
                <a href="${referralLink}" class="cta">Get Started with ${REFERRAL_CONFIG.referredReward.percent}% Off →</a>
              </p>

              <p>Your discount is automatically applied when you sign up using the link above.</p>

              <p>Best,<br>The Inclusiv Team</p>

              <p style="color: #999; font-size: 12px; margin-top: 40px;">
                ${referrerName} referred you to Inclusiv because they thought you'd find it useful.
                <a href="${appUrl}/unsubscribe?email=${encodeURIComponent(email)}" style="color: #999;">Unsubscribe</a>
              </p>
            </body>
            </html>
          `,
        });

        // Also notify the referrer
        await resend.emails.send({
          from: 'Inclusiv <hello@inclusiv.dev>',
          to: user.email,
          subject: `Invite sent to ${email}!`,
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <style>
                body { font-family: system-ui, -apple-system, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
                h1 { color: #6366f1; }
                .success { background: #f0fdf4; border-left: 4px solid #22c55e; padding: 16px; margin: 20px 0; }
              </style>
            </head>
            <body>
              <h1>Invite Sent! 🎉</h1>

              <p>Hi ${referrerName},</p>

              <p>Your referral invite was just sent to <strong>${email}</strong>!</p>

              <div class="success">
                <strong>What happens next?</strong>
                <ul>
                  <li>They'll get <strong>${REFERRAL_CONFIG.referredReward.percent}% off</strong> their first ${REFERRAL_CONFIG.referredReward.duration} months</li>
                  <li>When they subscribe, you'll get <strong>1 free month</strong> of your plan!</li>
                </ul>
              </div>

              <p>Keep sharing your referral link to earn more free months. There's no limit!</p>

              <p>Your referral link: <a href="${referralLink}">${referralLink}</a></p>

              <p>Best,<br>The Inclusiv Team</p>
            </body>
            </html>
          `,
        });

        console.log('Referral invite sent to:', email);
      } catch (error) {
        console.error('Failed to send referral emails:', error);
        // Don't fail the request if email fails - referral is still tracked
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Invite sent successfully',
    });
  } catch (error) {
    console.error('Failed to send invite:', error);
    return NextResponse.json({ error: 'Failed to send invite' }, { status: 500 });
  }
}
