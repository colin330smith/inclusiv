import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import Stripe from 'stripe';

const getStripe = () => {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('Missing STRIPE_SECRET_KEY');
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY);
};

const getResend = () => {
  if (!process.env.RESEND_API_KEY) return null;
  return new Resend(process.env.RESEND_API_KEY);
};

interface TrialSubscription {
  id: string;
  email: string;
  plan: string;
  trialEnd: Date;
  daysLeft: number;
}

async function getTrialSubscriptions(): Promise<TrialSubscription[]> {
  const stripe = getStripe();
  const trials: TrialSubscription[] = [];

  const subscriptions = await stripe.subscriptions.list({
    status: 'trialing',
    limit: 100,
  });

  for (const sub of subscriptions.data) {
    if (!sub.trial_end) continue;

    const customer = await stripe.customers.retrieve(sub.customer as string);
    if (!customer || customer.deleted || !('email' in customer) || !customer.email) continue;

    const trialEnd = new Date(sub.trial_end * 1000);
    const now = new Date();
    const daysLeft = Math.ceil((trialEnd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    trials.push({
      id: sub.id,
      email: customer.email,
      plan: sub.metadata?.plan || 'starter',
      trialEnd,
      daysLeft,
    });
  }

  return trials;
}

async function sendTrialReminderEmail(
  email: string,
  plan: string,
  daysLeft: number,
  type: '7_day' | '3_day' | '1_day' | 'expired'
) {
  const resend = getResend();
  if (!resend) {
    console.log('Resend not configured, skipping trial reminder email');
    return;
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://tryinclusiv.com';
  const planName = plan.charAt(0).toUpperCase() + plan.slice(1);

  const templates = {
    '7_day': {
      subject: `7 days left in your ${planName} trial - have you scanned your site?`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: system-ui, -apple-system, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
            h1 { color: #6366f1; }
            .cta { display: inline-block; padding: 16px 32px; background: #6366f1; color: white; text-decoration: none; border-radius: 8px; font-weight: 600; }
            .highlight { background: #f0f9ff; border-left: 4px solid #6366f1; padding: 16px; margin: 20px 0; }
            .checklist { background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .checklist li { margin: 8px 0; }
          </style>
        </head>
        <body>
          <h1>Your Trial is 1 Week In!</h1>

          <p>Hi there,</p>

          <p>You've had your ${planName} trial for a week now. Here's a quick checklist to make sure you're getting the most out of it:</p>

          <div class="checklist">
            <strong>Quick Trial Checklist:</strong>
            <ul>
              <li>☐ Run a full site scan</li>
              <li>☐ Review your accessibility score</li>
              <li>☐ Fix at least 3 critical issues</li>
              <li>☐ Set up monitoring alerts</li>
            </ul>
          </div>

          <div class="highlight">
            <strong>💡 Pro Tip:</strong> Sites that fix issues during the trial see an average 40% improvement in their accessibility scores. Start with the critical issues first!
          </div>

          <p style="text-align: center; margin: 30px 0;">
            <a href="${appUrl}/dashboard" class="cta">Continue Your Scan →</a>
          </p>

          <p>Questions? Just reply to this email.</p>

          <p>Best,<br>The Inclusiv Team</p>
        </body>
        </html>
      `,
    },
    '3_day': {
      subject: `⏰ Only 3 days left! Don't lose your accessibility progress`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: system-ui, -apple-system, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
            h1 { color: #6366f1; }
            .cta { display: inline-block; padding: 16px 32px; background: #6366f1; color: white; text-decoration: none; border-radius: 8px; font-weight: 600; }
            .urgency { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; margin: 20px 0; }
            .savings { background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; padding: 20px; border-radius: 12px; text-align: center; margin: 20px 0; }
          </style>
        </head>
        <body>
          <h1>3 Days Left in Your Trial</h1>

          <p>Hi there,</p>

          <p>Your ${planName} trial ends in just 3 days. After that:</p>

          <ul>
            <li>❌ Your scan history will be archived</li>
            <li>❌ Monitoring will stop</li>
            <li>❌ AI fix suggestions will be locked</li>
          </ul>

          <div class="urgency">
            <strong>⚠️ EAA Compliance Reminder:</strong> The European Accessibility Act deadline has passed. Non-compliant businesses now face fines up to €100,000. Keep your protection active!
          </div>

          <div class="savings">
            <p style="margin:0 0 10px 0; font-size: 14px; opacity: 0.9;">TRIAL EXTENSION OFFER</p>
            <p style="margin:0 0 10px 0; font-size: 24px; font-weight: bold;">Use code TRIAL30 for 30% off your first 3 months</p>
          </div>

          <p style="text-align: center; margin: 30px 0;">
            <a href="${appUrl}/pricing?coupon=TRIAL30" class="cta">Upgrade Now & Save →</a>
          </p>

          <p>Need more time? Reply to this email and let us know.</p>

          <p>Best,<br>The Inclusiv Team</p>
        </body>
        </html>
      `,
    },
    '1_day': {
      subject: `🚨 FINAL DAY: Your accessibility protection expires tomorrow`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: system-ui, -apple-system, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
            h1 { color: #ef4444; }
            .cta { display: inline-block; padding: 16px 32px; background: #6366f1; color: white; text-decoration: none; border-radius: 8px; font-weight: 600; }
            .final-warning { background: #fef2f2; border: 2px solid #ef4444; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .countdown { background: #18181b; color: white; padding: 20px; border-radius: 12px; text-align: center; margin: 20px 0; }
          </style>
        </head>
        <body>
          <h1>⏰ Your Trial Expires Tomorrow</h1>

          <p>Hi there,</p>

          <div class="final-warning">
            <strong>🚨 Final Warning:</strong> Your ${planName} trial expires in less than 24 hours. After that, your site will no longer be monitored for accessibility issues.
          </div>

          <p>Here's what you'll lose access to:</p>

          <ul>
            <li>✅ Continuous accessibility monitoring</li>
            <li>✅ AI-powered fix suggestions</li>
            <li>✅ Compliance certificates</li>
            <li>✅ Priority support</li>
          </ul>

          <div class="countdown">
            <p style="margin:0; font-size: 14px; color: #a1a1aa;">TIME REMAINING</p>
            <p style="margin:10px 0; font-size: 36px; font-weight: bold;">~24 HOURS</p>
            <p style="margin:0; font-size: 14px; color: #a1a1aa;">Use code <strong>LASTCHANCE</strong> for 40% off</p>
          </div>

          <p style="text-align: center; margin: 30px 0;">
            <a href="${appUrl}/pricing?coupon=LASTCHANCE" class="cta">Don't Lose Access →</a>
          </p>

          <p>This is your final reminder. We'd hate to see you lose your progress.</p>

          <p>Best,<br>The Inclusiv Team</p>
        </body>
        </html>
      `,
    },
    'expired': {
      subject: `Your Inclusiv trial has ended - here's a special offer to come back`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: system-ui, -apple-system, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
            h1 { color: #6366f1; }
            .cta { display: inline-block; padding: 16px 32px; background: #6366f1; color: white; text-decoration: none; border-radius: 8px; font-weight: 600; }
            .winback { background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; padding: 24px; border-radius: 12px; text-align: center; margin: 20px 0; }
          </style>
        </head>
        <body>
          <h1>We Miss You!</h1>

          <p>Hi there,</p>

          <p>Your ${planName} trial ended, but we wanted to reach out one more time with a special offer.</p>

          <p>During your trial, you made progress on your accessibility compliance. Don't let that work go to waste!</p>

          <div class="winback">
            <p style="margin:0 0 10px 0; font-size: 14px; opacity: 0.9;">EXCLUSIVE WIN-BACK OFFER</p>
            <p style="margin:0 0 10px 0; font-size: 28px; font-weight: bold;">50% OFF Your First Month</p>
            <p style="margin:0;">Use code: <code style="background: rgba(255,255,255,0.2); padding: 4px 12px; border-radius: 4px;">COMEBACK50</code></p>
            <p style="margin:10px 0 0 0; font-size: 14px; opacity: 0.9;">Valid for 7 days only</p>
          </div>

          <p style="text-align: center; margin: 30px 0;">
            <a href="${appUrl}/pricing?coupon=COMEBACK50" class="cta">Reactivate My Account →</a>
          </p>

          <p>If Inclusiv wasn't the right fit, we'd love to know why. Just reply to this email with your feedback.</p>

          <p>Best,<br>The Inclusiv Team</p>
        </body>
        </html>
      `,
    },
  };

  const template = templates[type];

  try {
    await resend.emails.send({
      from: 'Inclusiv <hello@inclusiv.dev>',
      to: email,
      subject: template.subject,
      html: template.html,
    });
    console.log(`Trial ${type} reminder sent to:`, email);
  } catch (error) {
    console.error(`Failed to send trial ${type} reminder:`, error);
  }
}

export async function GET(request: NextRequest) {
  // Verify cron secret (Vercel cron jobs send this header)
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const trials = await getTrialSubscriptions();
    const sentEmails: { email: string; type: string }[] = [];

    for (const trial of trials) {
      // Send appropriate reminder based on days left
      if (trial.daysLeft === 7) {
        await sendTrialReminderEmail(trial.email, trial.plan, trial.daysLeft, '7_day');
        sentEmails.push({ email: trial.email, type: '7_day' });
      } else if (trial.daysLeft === 3) {
        await sendTrialReminderEmail(trial.email, trial.plan, trial.daysLeft, '3_day');
        sentEmails.push({ email: trial.email, type: '3_day' });
      } else if (trial.daysLeft === 1) {
        await sendTrialReminderEmail(trial.email, trial.plan, trial.daysLeft, '1_day');
        sentEmails.push({ email: trial.email, type: '1_day' });
      } else if (trial.daysLeft <= 0) {
        await sendTrialReminderEmail(trial.email, trial.plan, trial.daysLeft, 'expired');
        sentEmails.push({ email: trial.email, type: 'expired' });
      }
    }

    return NextResponse.json({
      success: true,
      processed: trials.length,
      emailsSent: sentEmails.length,
      details: sentEmails,
    });
  } catch (error) {
    console.error('Trial reminder cron failed:', error);
    return NextResponse.json(
      { error: 'Failed to process trial reminders' },
      { status: 500 }
    );
  }
}

// Also handle Stripe webhook events for trial ending
export async function POST(request: NextRequest) {
  const stripe = getStripe();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 });
  }

  const body = await request.text();
  const sig = request.headers.get('stripe-signature');

  if (!sig) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  switch (event.type) {
    case 'customer.subscription.trial_will_end': {
      // Stripe sends this 3 days before trial ends
      const subscription = event.data.object as Stripe.Subscription;
      const customer = await stripe.customers.retrieve(subscription.customer as string);

      if (customer && !customer.deleted && 'email' in customer && customer.email) {
        const plan = subscription.metadata?.plan || 'starter';
        await sendTrialReminderEmail(customer.email, plan, 3, '3_day');
      }
      break;
    }
  }

  return NextResponse.json({ received: true });
}
