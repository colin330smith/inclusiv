/**
 * Referral Program System
 *
 * Rewards:
 * - Referrer gets 1 free month when referred user subscribes
 * - Referred user gets 20% off their first 3 months
 * - Both parties get credited after the referred user's first payment
 *
 * Tracking:
 * - Each user has a unique referral code (based on user ID)
 * - Referrals are tracked via URL parameter: ?ref=CODE
 * - Stored in cookie for 30 days
 */

import { nanoid } from 'nanoid';

export interface Referral {
  id: string;
  referrerUserId: string;
  referrerEmail: string;
  referredEmail: string;
  referredUserId: string | null;
  referralCode: string;
  status: 'pending' | 'signed_up' | 'subscribed' | 'rewarded' | 'expired';
  rewardType: 'free_month' | 'discount';
  rewardApplied: boolean;
  stripePromotionCode: string | null;
  createdAt: string;
  convertedAt: string | null;
  rewardedAt: string | null;
}

export interface ReferralStats {
  totalReferrals: number;
  pendingReferrals: number;
  convertedReferrals: number;
  rewardedReferrals: number;
  totalEarnings: number; // In months of free service
  referralCode: string;
  referralLink: string;
}

// Referral reward configuration
export const REFERRAL_CONFIG = {
  referrerReward: {
    type: 'free_month',
    value: 1, // 1 free month
    description: '1 free month of your current plan',
  },
  referredReward: {
    type: 'discount',
    percent: 20,
    duration: 3, // months
    couponCode: 'FRIEND20', // Stripe coupon code
    description: '20% off your first 3 months',
  },
  cookieDuration: 30, // days
  expirationDays: 90, // referral expires if not converted in 90 days
};

/**
 * Generate a unique referral code for a user
 */
export function generateReferralCode(userId: string): string {
  // Use first 8 chars of user ID + random suffix for uniqueness
  const prefix = userId.replace(/-/g, '').substring(0, 6).toUpperCase();
  const suffix = nanoid(4).toUpperCase();
  return `${prefix}${suffix}`;
}

/**
 * Generate referral link
 */
export function getReferralLink(referralCode: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://tryinclusiv.com';
  return `${baseUrl}/?ref=${referralCode}`;
}

/**
 * Calculate reward value in EUR based on user's current plan
 */
export function calculateRewardValue(subscriptionTier: string): number {
  const monthlyPrices: Record<string, number> = {
    starter: 49,
    professional: 149,
    enterprise: 499,
  };
  return monthlyPrices[subscriptionTier] || 0;
}

/**
 * Generate social share content for referral
 */
export function getReferralShareContent(referralLink: string) {
  const message = `I've been using Inclusiv to make my website accessible and compliant with the European Accessibility Act. Use my link to get 20% off your first 3 months! 🎉`;

  return {
    twitter: {
      text: message,
      url: referralLink,
      hashtags: ['accessibility', 'EAA', 'WCAG'],
      shareUrl: `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${encodeURIComponent(referralLink)}&hashtags=accessibility,EAA`,
    },
    linkedin: {
      text: message,
      url: referralLink,
      shareUrl: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(referralLink)}`,
    },
    email: {
      subject: "I want to help make your website accessible",
      body: `Hey!\n\n${message}\n\nCheck it out here: ${referralLink}\n\nThe European Accessibility Act deadline has passed (June 28, 2025), so this is becoming critical for any business operating in the EU.\n\nLet me know if you have any questions!`,
      mailtoUrl: `mailto:?subject=${encodeURIComponent("I want to help make your website accessible")}&body=${encodeURIComponent(`Hey!\n\n${message}\n\nCheck it out here: ${referralLink}\n\nThe European Accessibility Act deadline has passed (June 28, 2025), so this is becoming critical for any business operating in the EU.\n\nLet me know if you have any questions!`)}`,
    },
    whatsapp: {
      text: `${message} ${referralLink}`,
      shareUrl: `https://wa.me/?text=${encodeURIComponent(`${message} ${referralLink}`)}`,
    },
    copy: {
      text: `${message}\n\n${referralLink}`,
    },
  };
}

/**
 * Email templates for referral notifications
 */
export const REFERRAL_EMAIL_TEMPLATES = {
  referralSent: (referrerName: string, referredEmail: string) => ({
    subject: `You referred ${referredEmail} to Inclusiv!`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: system-ui, -apple-system, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
          h1 { color: #6366f1; }
          .highlight { background: #f0f9ff; border-left: 4px solid #6366f1; padding: 16px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <h1>Referral Sent! 🎉</h1>
        <p>Hi ${referrerName},</p>
        <p>Great news! Your referral invitation was sent to <strong>${referredEmail}</strong>.</p>
        <div class="highlight">
          <strong>What happens next?</strong>
          <ul>
            <li>They'll get <strong>20% off</strong> their first 3 months</li>
            <li>When they subscribe, you'll get <strong>1 free month</strong> of your plan!</li>
          </ul>
        </div>
        <p>Keep sharing your referral link to earn more free months!</p>
        <p>Best,<br>The Inclusiv Team</p>
      </body>
      </html>
    `,
  }),

  referralSignedUp: (referrerName: string, referredEmail: string) => ({
    subject: `${referredEmail} signed up using your referral! 🎉`,
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
        <h1>Your Referral Signed Up! 🎉</h1>
        <p>Hi ${referrerName},</p>
        <p><strong>${referredEmail}</strong> just created an account using your referral link!</p>
        <div class="success">
          <strong>Almost there!</strong>
          <p>Once they subscribe to a paid plan, you'll automatically receive <strong>1 free month</strong> of your current plan.</p>
        </div>
        <p>Best,<br>The Inclusiv Team</p>
      </body>
      </html>
    `,
  }),

  referralConverted: (referrerName: string, referredEmail: string, rewardValue: number) => ({
    subject: `You earned a free month! ${referredEmail} subscribed 🎉`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: system-ui, -apple-system, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
          h1 { color: #6366f1; }
          .reward { background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; padding: 24px; border-radius: 12px; text-align: center; margin: 20px 0; }
        </style>
      </head>
      <body>
        <h1>Congratulations! 🎉</h1>
        <p>Hi ${referrerName},</p>
        <p><strong>${referredEmail}</strong> just subscribed using your referral!</p>
        <div class="reward">
          <p style="margin:0 0 10px 0; font-size: 14px; opacity: 0.9;">YOUR REWARD</p>
          <p style="margin:0; font-size: 28px; font-weight: bold;">1 FREE MONTH</p>
          <p style="margin:10px 0 0 0; font-size: 16px;">Worth €${rewardValue}</p>
        </div>
        <p>Your credit has been automatically applied to your account. Your next billing cycle will be adjusted accordingly.</p>
        <p>Keep sharing to earn more free months!</p>
        <p>Best,<br>The Inclusiv Team</p>
      </body>
      </html>
    `,
  }),

  referredWelcome: (referrerName: string) => ({
    subject: `Welcome to Inclusiv! ${referrerName} referred you 🎁`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: system-ui, -apple-system, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
          h1 { color: #6366f1; }
          .discount { background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; padding: 24px; border-radius: 12px; text-align: center; margin: 20px 0; }
          .cta { display: inline-block; padding: 16px 32px; background: #6366f1; color: white; text-decoration: none; border-radius: 8px; font-weight: 600; }
        </style>
      </head>
      <body>
        <h1>Welcome to Inclusiv! 🎉</h1>
        <p>Hi there,</p>
        <p><strong>${referrerName}</strong> thought you'd benefit from Inclusiv for your website accessibility needs, and we're thrilled to have you!</p>
        <div class="discount">
          <p style="margin:0 0 10px 0; font-size: 14px; opacity: 0.9;">YOUR REFERRAL DISCOUNT</p>
          <p style="margin:0; font-size: 28px; font-weight: bold;">20% OFF</p>
          <p style="margin:10px 0 0 0; font-size: 16px;">Your first 3 months</p>
          <p style="margin:10px 0 0 0; font-size: 14px; opacity: 0.9;">Code: <code style="background: rgba(255,255,255,0.2); padding: 4px 12px; border-radius: 4px;">FRIEND20</code></p>
        </div>
        <p>With the European Accessibility Act now in effect, making your website accessible isn't just good practice—it's required by law for businesses in the EU.</p>
        <p style="text-align: center; margin: 30px 0;">
          <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://tryinclusiv.com'}/pricing?coupon=FRIEND20" class="cta">Start Your Free Scan →</a>
        </p>
        <p>Best,<br>The Inclusiv Team</p>
      </body>
      </html>
    `,
  }),
};
