import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// Initialize Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Resend for abandoned checkout emails
const RESEND_API_KEY = process.env.RESEND_API_KEY;

/**
 * POST /api/webhooks/stripe
 *
 * Handles Stripe webhook events for:
 * - checkout.session.completed - Successful checkout
 * - checkout.session.expired - Abandoned checkout
 * - customer.subscription.created - New subscription
 * - customer.subscription.updated - Subscription changes
 * - customer.subscription.deleted - Cancellation
 * - invoice.payment_failed - Failed payment
 */
export async function POST(request: NextRequest) {
  const body = await request.text();
  const sig = request.headers.get('stripe-signature');

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
        break;

      case 'checkout.session.expired':
        await handleCheckoutExpired(event.data.object as Stripe.Checkout.Session);
        break;

      case 'customer.subscription.created':
        await handleSubscriptionCreated(event.data.object as Stripe.Subscription);
        break;

      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event.data.object as Stripe.Subscription);
        break;

      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
        break;

      case 'invoice.payment_failed':
        await handlePaymentFailed(event.data.object as Stripe.Invoice);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook handler error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}

/**
 * Handle successful checkout - update lead status
 */
async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const email = session.customer_email;
  const plan = session.metadata?.plan;
  const billing = session.metadata?.billing;

  if (!email) return;

  console.log(`Checkout completed: ${email} - ${plan} (${billing})`);

  // Update lead status in database
  await supabase
    .from('leads')
    .update({
      status: 'converted',
      converted_at: new Date().toISOString(),
      plan: plan,
      billing_cycle: billing,
    })
    .eq('email', email);

  // Track conversion
  await trackEvent('checkout_completed', {
    email,
    plan,
    billing,
    amount: session.amount_total,
  });
}

/**
 * Handle abandoned checkout - send recovery email
 */
async function handleCheckoutExpired(session: Stripe.Checkout.Session) {
  const email = session.customer_email;
  const plan = session.metadata?.plan;
  const billing = session.metadata?.billing;

  if (!email) return;

  console.log(`Checkout abandoned: ${email} - ${plan}`);

  // Record abandoned checkout
  await supabase.from('abandoned_checkouts').insert({
    email,
    plan,
    billing,
    session_id: session.id,
    created_at: new Date().toISOString(),
  });

  // Schedule abandoned checkout email
  await sendAbandonedCheckoutEmail(email, plan || 'professional', billing || 'monthly');

  // Track abandonment
  await trackEvent('checkout_abandoned', {
    email,
    plan,
    billing,
  });
}

/**
 * Handle new subscription
 */
async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string;

  // Get customer email
  const customer = await stripe.customers.retrieve(customerId);
  if (customer.deleted) return;

  const email = customer.email;
  if (!email) return;

  console.log(`Subscription created: ${email}`);

  // Update user in database
  await supabase
    .from('users')
    .update({
      stripe_customer_id: customerId,
      stripe_subscription_id: subscription.id,
      subscription_status: subscription.status,
      current_period_end: new Date((subscription as unknown as { current_period_end: number }).current_period_end * 1000).toISOString(),
    })
    .eq('email', email);
}

/**
 * Handle subscription updates (upgrades, downgrades, status changes)
 */
async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string;

  const customer = await stripe.customers.retrieve(customerId);
  if (customer.deleted) return;

  const email = customer.email;
  if (!email) return;

  console.log(`Subscription updated: ${email} - ${subscription.status}`);

  await supabase
    .from('users')
    .update({
      subscription_status: subscription.status,
      current_period_end: new Date((subscription as unknown as { current_period_end: number }).current_period_end * 1000).toISOString(),
    })
    .eq('email', email);

  // If canceled, send win-back email
  if (subscription.cancel_at_period_end) {
    await sendCancellationEmail(email);
  }
}

/**
 * Handle subscription cancellation
 */
async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string;

  const customer = await stripe.customers.retrieve(customerId);
  if (customer.deleted) return;

  const email = customer.email;
  if (!email) return;

  console.log(`Subscription deleted: ${email}`);

  await supabase
    .from('users')
    .update({
      subscription_status: 'canceled',
      canceled_at: new Date().toISOString(),
    })
    .eq('email', email);

  // Send win-back email with special offer
  await sendWinBackEmail(email);
}

/**
 * Handle failed payment
 */
async function handlePaymentFailed(invoice: Stripe.Invoice) {
  const email = invoice.customer_email;
  if (!email) return;

  console.log(`Payment failed: ${email}`);

  // Send payment failed email
  await sendPaymentFailedEmail(email, invoice.hosted_invoice_url || '');
}

/**
 * Send abandoned checkout recovery email
 */
async function sendAbandonedCheckoutEmail(email: string, plan: string, billing: string) {
  if (!RESEND_API_KEY) return;

  const planNames: Record<string, string> = {
    starter: 'Starter',
    professional: 'Professional',
    enterprise: 'Enterprise',
  };

  const planPrices: Record<string, { monthly: number; annual: number }> = {
    starter: { monthly: 49, annual: 39 },
    professional: { monthly: 149, annual: 119 },
    enterprise: { monthly: 499, annual: 399 },
  };

  const planName = planNames[plan] || 'Professional';
  const price = billing === 'annual'
    ? planPrices[plan]?.annual || 119
    : planPrices[plan]?.monthly || 149;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0a0a0a;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    <div style="background-color: #18181b; border-radius: 16px; padding: 32px; border: 1px solid #27272a;">
      <div style="text-align: center; margin-bottom: 24px;">
        <div style="display: inline-block; background: linear-gradient(135deg, #ef4444 0%, #f97316 100%); padding: 8px 16px; border-radius: 8px;">
          <span style="color: white; font-weight: 600; font-size: 14px;">Your Checkout is Waiting</span>
        </div>
      </div>

      <h1 style="color: #ffffff; font-size: 24px; font-weight: bold; margin: 0 0 16px 0; text-align: center;">
        Complete Your ${planName} Plan
      </h1>

      <p style="color: #a1a1aa; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0; text-align: center;">
        You were so close to getting your website EAA compliant! Don't let your competitors get ahead while enforcement is active.
      </p>

      <div style="background-color: #27272a; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <span style="color: #ffffff; font-weight: 600;">${planName} Plan</span>
          <span style="color: #818cf8; font-weight: bold;">€${price}/mo</span>
        </div>
        <ul style="margin: 0; padding: 0; list-style: none;">
          <li style="color: #a1a1aa; font-size: 14px; padding: 4px 0;">✓ Full WCAG 2.1 AA scanning</li>
          <li style="color: #a1a1aa; font-size: 14px; padding: 4px 0;">✓ Automated monitoring</li>
          <li style="color: #a1a1aa; font-size: 14px; padding: 4px 0;">✓ AI-powered fix suggestions</li>
        </ul>
      </div>

      <div style="text-align: center; margin-bottom: 24px;">
        <a href="https://tryinclusiv.com/pricing?coupon=COMEBACK20" style="display: inline-block; background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: white; text-decoration: none; padding: 16px 32px; border-radius: 12px; font-weight: 600; font-size: 16px;">
          Complete Checkout - Get 20% Off
        </a>
      </div>

      <p style="color: #71717a; font-size: 12px; text-align: center; margin: 0;">
        Use code <strong style="color: #818cf8;">COMEBACK20</strong> for 20% off your first 3 months
      </p>
    </div>

    <div style="text-align: center; margin-top: 32px;">
      <p style="color: #52525b; font-size: 12px; margin: 0;">
        Inclusiv • Web Accessibility Made Simple<br>
        <a href="https://tryinclusiv.com/unsubscribe" style="color: #52525b;">Unsubscribe</a>
      </p>
    </div>
  </div>
</body>
</html>
  `;

  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Inclusiv <hello@tryinclusiv.com>',
        to: [email],
        subject: `Complete your ${planName} checkout - 20% off inside`,
        html,
        tags: [
          { name: 'category', value: 'abandoned_checkout' },
        ],
      }),
    });
    console.log(`Abandoned checkout email sent to ${email}`);
  } catch (error) {
    console.error('Failed to send abandoned checkout email:', error);
  }
}

/**
 * Send cancellation email
 */
async function sendCancellationEmail(email: string) {
  if (!RESEND_API_KEY) return;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0a0a0a;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    <div style="background-color: #18181b; border-radius: 16px; padding: 32px; border: 1px solid #27272a;">
      <h1 style="color: #ffffff; font-size: 24px; font-weight: bold; margin: 0 0 16px 0;">
        We're sorry to see you go
      </h1>

      <p style="color: #a1a1aa; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
        Your subscription is set to cancel at the end of your billing period. Before you go, would you consider staying?
      </p>

      <div style="background-color: #27272a; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
        <p style="color: #ffffff; font-weight: 600; margin: 0 0 12px 0;">
          Special Offer: 50% off your next 3 months
        </p>
        <p style="color: #a1a1aa; font-size: 14px; margin: 0;">
          Use code <strong style="color: #22c55e;">STAYWITHUS</strong> to continue your compliance journey at half the price.
        </p>
      </div>

      <div style="text-align: center;">
        <a href="https://tryinclusiv.com/dashboard/billing?reactivate=true&coupon=STAYWITHUS" style="display: inline-block; background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); color: white; text-decoration: none; padding: 14px 28px; border-radius: 10px; font-weight: 600;">
          Keep My Subscription - 50% Off
        </a>
      </div>
    </div>
  </div>
</body>
</html>
  `;

  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Inclusiv <hello@tryinclusiv.com>',
        to: [email],
        subject: "Before you go - here's 50% off",
        html,
        tags: [
          { name: 'category', value: 'cancellation_recovery' },
        ],
      }),
    });
  } catch (error) {
    console.error('Failed to send cancellation email:', error);
  }
}

/**
 * Send win-back email for churned customers
 */
async function sendWinBackEmail(email: string) {
  if (!RESEND_API_KEY) return;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0a0a0a;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    <div style="background-color: #18181b; border-radius: 16px; padding: 32px; border: 1px solid #27272a;">
      <div style="text-align: center; margin-bottom: 24px;">
        <div style="display: inline-block; background: linear-gradient(135deg, #f59e0b 0%, #ef4444 100%); padding: 8px 16px; border-radius: 8px;">
          <span style="color: white; font-weight: 600; font-size: 14px;">We Miss You</span>
        </div>
      </div>

      <h1 style="color: #ffffff; font-size: 24px; font-weight: bold; margin: 0 0 16px 0; text-align: center;">
        Your Website's Compliance Status
      </h1>

      <p style="color: #a1a1aa; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0; text-align: center;">
        Since you left, EAA enforcement has been active. Without monitoring, your site could have new accessibility issues that put you at risk of fines up to €100,000.
      </p>

      <div style="background: linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(249, 115, 22, 0.1) 100%); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 12px; padding: 20px; margin-bottom: 24px; text-align: center;">
        <p style="color: #fca5a5; font-weight: 600; margin: 0 0 8px 0;">
          Special Win-Back Offer
        </p>
        <p style="color: #ffffff; font-size: 28px; font-weight: bold; margin: 0;">
          60% OFF for 6 months
        </p>
        <p style="color: #a1a1aa; font-size: 14px; margin: 8px 0 0 0;">
          Code: <strong style="color: #fbbf24;">WELCOMEBACK60</strong>
        </p>
      </div>

      <div style="text-align: center;">
        <a href="https://tryinclusiv.com/pricing?coupon=WELCOMEBACK60" style="display: inline-block; background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: white; text-decoration: none; padding: 16px 32px; border-radius: 12px; font-weight: 600; font-size: 16px;">
          Reactivate My Account
        </a>
      </div>
    </div>
  </div>
</body>
</html>
  `;

  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Inclusiv <hello@tryinclusiv.com>',
        to: [email],
        subject: '⚠️ Your site may be at risk - 60% off to return',
        html,
        tags: [
          { name: 'category', value: 'winback' },
        ],
      }),
    });
  } catch (error) {
    console.error('Failed to send win-back email:', error);
  }
}

/**
 * Send payment failed email
 */
async function sendPaymentFailedEmail(email: string, invoiceUrl: string) {
  if (!RESEND_API_KEY) return;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0a0a0a;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    <div style="background-color: #18181b; border-radius: 16px; padding: 32px; border: 1px solid #27272a;">
      <div style="text-align: center; margin-bottom: 24px;">
        <div style="width: 64px; height: 64px; background-color: rgba(239, 68, 68, 0.1); border-radius: 50%; margin: 0 auto; display: flex; align-items: center; justify-content: center;">
          <span style="font-size: 32px;">⚠️</span>
        </div>
      </div>

      <h1 style="color: #ffffff; font-size: 24px; font-weight: bold; margin: 0 0 16px 0; text-align: center;">
        Payment Failed
      </h1>

      <p style="color: #a1a1aa; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0; text-align: center;">
        We couldn't process your payment. Please update your payment method to continue your accessibility monitoring without interruption.
      </p>

      <div style="background-color: #27272a; border-radius: 12px; padding: 16px; margin-bottom: 24px;">
        <p style="color: #fca5a5; font-size: 14px; margin: 0; text-align: center;">
          Your service will be paused in 3 days if payment is not updated
        </p>
      </div>

      <div style="text-align: center;">
        <a href="${invoiceUrl || 'https://tryinclusiv.com/dashboard/billing'}" style="display: inline-block; background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: white; text-decoration: none; padding: 14px 28px; border-radius: 10px; font-weight: 600;">
          Update Payment Method
        </a>
      </div>
    </div>
  </div>
</body>
</html>
  `;

  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Inclusiv <hello@tryinclusiv.com>',
        to: [email],
        subject: '⚠️ Action Required: Payment failed',
        html,
        tags: [
          { name: 'category', value: 'payment_failed' },
        ],
      }),
    });
  } catch (error) {
    console.error('Failed to send payment failed email:', error);
  }
}

/**
 * Track event (placeholder for analytics)
 */
async function trackEvent(event: string, properties: Record<string, unknown>) {
  console.log(`[Analytics] ${event}:`, properties);
  // In production, send to Plausible, PostHog, etc.
}
