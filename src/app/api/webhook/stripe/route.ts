import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { Resend } from 'resend';
import { promises as fs } from 'fs';
import path from 'path';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';

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

// ============================================
// RETRY LOGIC WITH EXPONENTIAL BACKOFF
// ============================================

interface RetryOptions {
  maxRetries: number;
  baseDelayMs: number;
  maxDelayMs: number;
}

const DEFAULT_RETRY_OPTIONS: RetryOptions = {
  maxRetries: 3,
  baseDelayMs: 1000,
  maxDelayMs: 10000,
};

async function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function withRetry<T>(
  operation: () => Promise<T>,
  operationName: string,
  options: Partial<RetryOptions> = {}
): Promise<T> {
  const { maxRetries, baseDelayMs, maxDelayMs } = { ...DEFAULT_RETRY_OPTIONS, ...options };

  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      // Don't retry on certain errors that won't resolve with retries
      const errorMessage = lastError.message.toLowerCase();
      const isNonRetryable =
        errorMessage.includes('duplicate') ||
        errorMessage.includes('unique constraint') ||
        errorMessage.includes('not found') ||
        errorMessage.includes('invalid');

      if (isNonRetryable) {
        console.error(`${operationName}: Non-retryable error on attempt ${attempt}:`, lastError.message);
        throw lastError;
      }

      if (attempt < maxRetries) {
        // Exponential backoff with jitter
        const delay = Math.min(
          baseDelayMs * Math.pow(2, attempt - 1) + Math.random() * 1000,
          maxDelayMs
        );
        console.warn(`${operationName}: Attempt ${attempt} failed, retrying in ${Math.round(delay)}ms...`, lastError.message);
        await sleep(delay);
      } else {
        console.error(`${operationName}: All ${maxRetries} attempts failed:`, lastError.message);
      }
    }
  }

  throw lastError || new Error(`${operationName} failed after ${maxRetries} attempts`);
}

// ============================================
// IDEMPOTENCY TRACKING
// ============================================

// In-memory idempotency cache (for single instance)
// For production multi-instance, use Redis or database
const processedEvents = new Map<string, { timestamp: number; result: 'success' | 'failed' }>();
const IDEMPOTENCY_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

function cleanupOldEvents(): void {
  const now = Date.now();
  for (const [eventId, data] of processedEvents.entries()) {
    if (now - data.timestamp > IDEMPOTENCY_TTL_MS) {
      processedEvents.delete(eventId);
    }
  }
}

function isEventProcessed(eventId: string): boolean {
  const existing = processedEvents.get(eventId);
  return existing?.result === 'success';
}

function markEventProcessed(eventId: string, result: 'success' | 'failed'): void {
  processedEvents.set(eventId, { timestamp: Date.now(), result });
  // Cleanup periodically
  if (processedEvents.size > 1000) {
    cleanupOldEvents();
  }
}

// Store customer in JSON file (same pattern as leads)
const CUSTOMERS_FILE = path.join(process.cwd(), 'data', 'customers.json');

interface Customer {
  email: string;
  plan: string;
  stripeCustomerId: string;
  subscriptionId: string;
  status: 'active' | 'cancelled' | 'past_due';
  createdAt: string;
  updatedAt: string;
}

async function storeCustomer(customer: Customer) {
  try {
    const dataDir = path.dirname(CUSTOMERS_FILE);
    await fs.mkdir(dataDir, { recursive: true });

    let customers: Customer[] = [];
    try {
      const data = await fs.readFile(CUSTOMERS_FILE, 'utf-8');
      customers = JSON.parse(data);
    } catch {
      // File doesn't exist yet
    }

    // Update or add customer
    const existingIndex = customers.findIndex(c => c.email.toLowerCase() === customer.email.toLowerCase());
    if (existingIndex >= 0) {
      customers[existingIndex] = { ...customers[existingIndex], ...customer, updatedAt: new Date().toISOString() };
    } else {
      customers.push(customer);
    }

    await fs.writeFile(CUSTOMERS_FILE, JSON.stringify(customers, null, 2));
    console.log('Customer stored:', customer.email);
  } catch (error) {
    console.error('Failed to store customer:', error);
  }
}

async function sendWelcomeEmail(email: string, plan: string) {
  const resend = getResend();
  if (!resend) {
    console.log('Resend not configured, skipping welcome email');
    return;
  }

  const planFeatures: Record<string, string[]> = {
    starter: [
      'Full site scan up to 100 pages',
      'Weekly monitoring & alerts',
      'Platform-specific fix suggestions',
      'Email + Slack notifications',
    ],
    professional: [
      'Unlimited page scans',
      'Daily monitoring',
      'AI-powered code fixes',
      '1-click remediation',
      'WCAG compliance certificate',
    ],
    enterprise: [
      'Everything in Professional',
      'Custom integrations',
      'Dedicated account manager',
      '99.9% uptime SLA',
      'Legal compliance review',
    ],
  };

  const features = planFeatures[plan] || planFeatures.starter;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://inclusiv-xi.vercel.app';

  try {
    await resend.emails.send({
      from: 'Inclusiv <hello@tryinclusiv.com>',
      to: email,
      subject: `Welcome to Inclusiv ${plan.charAt(0).toUpperCase() + plan.slice(1)}! Let's get you compliant`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: system-ui, -apple-system, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
            h1 { color: #6366f1; }
            ul { padding-left: 20px; }
            li { margin: 8px 0; }
            .cta { display: inline-block; padding: 16px 32px; background: #6366f1; color: white; text-decoration: none; border-radius: 8px; font-weight: 600; }
            .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #666; font-size: 14px; }
            .highlight { background: #f0f9ff; border-left: 4px solid #6366f1; padding: 16px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <h1>Welcome to Inclusiv! 🎉</h1>

          <p>Thank you for subscribing to the <strong>${plan.charAt(0).toUpperCase() + plan.slice(1)}</strong> plan. You've made a great decision to protect your business from accessibility lawsuits and meet the EAA deadline.</p>

          <div class="highlight">
            <strong>⏰ Important Reminder:</strong> The European Accessibility Act deadline is <strong>June 28, 2025</strong>. Start scanning now to ensure compliance in time.
          </div>

          <h2>Your Plan Includes:</h2>
          <ul>
            ${features.map(f => `<li>✅ ${f}</li>`).join('\n            ')}
          </ul>

          <h2>Get Started in 3 Steps:</h2>
          <ol>
            <li><strong>Add your website</strong> - Enter your domain to start monitoring</li>
            <li><strong>Run your first scan</strong> - Get a complete WCAG 2.1 AA report</li>
            <li><strong>Fix issues</strong> - Use our AI-powered suggestions to remediate</li>
          </ol>

          <p style="text-align: center; margin: 30px 0;">
            <a href="${appUrl}" class="cta">Start Your First Scan →</a>
          </p>

          <p>Your 14-day trial starts today. If you have any questions, just reply to this email or contact us at support@tryinclusiv.com.</p>

          <div class="footer">
            <p>Welcome aboard!</p>
            <p><strong>The Inclusiv Team</strong></p>
            <p style="color: #999; font-size: 12px;">
              You're receiving this because you subscribed to Inclusiv.
              <a href="${appUrl}/unsubscribe?email=${encodeURIComponent(email)}" style="color: #999;">Unsubscribe</a>
            </p>
          </div>
        </body>
        </html>
      `,
    });
    console.log('Welcome email sent to:', email);
  } catch (error) {
    console.error('Failed to send welcome email:', error);
  }
}

async function sendAbandonedCheckoutEmail(email: string, plan: string) {
  const resend = getResend();
  if (!resend) return;

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://tryinclusiv.com';

  // Calculate savings with launch discount
  const prices: Record<string, { monthly: number; discounted: number }> = {
    starter: { monthly: 49, discounted: 34 },
    professional: { monthly: 149, discounted: 104 },
    enterprise: { monthly: 499, discounted: 349 },
  };

  const planPrices = prices[plan] || prices.professional;
  const savings = (planPrices.monthly - planPrices.discounted) * 3;

  try {
    await resend.emails.send({
      from: 'Inclusiv <hello@tryinclusiv.com>',
      to: email,
      subject: 'You left something behind (+ a special offer)',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: system-ui, -apple-system, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
            h1 { color: #6366f1; }
            .cta { display: inline-block; padding: 16px 32px; background: #6366f1; color: white; text-decoration: none; border-radius: 8px; font-weight: 600; }
            .highlight { background: #f0f9ff; border-left: 4px solid #6366f1; padding: 16px; margin: 20px 0; }
            .urgency { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; margin: 20px 0; }
            .discount { background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; padding: 20px; border-radius: 12px; text-align: center; margin: 20px 0; }
            .discount code { background: rgba(255,255,255,0.2); padding: 4px 12px; border-radius: 4px; font-size: 18px; }
            .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <h1>Almost there! 🛒</h1>

          <p>Hi there,</p>

          <p>I noticed you were checking out the <strong>${plan.charAt(0).toUpperCase() + plan.slice(1)}</strong> plan but didn't complete your purchase. No worries—I wanted to make sure nothing went wrong.</p>

          <div class="urgency">
            <strong>⚠️ EAA Deadline Alert:</strong> The European Accessibility Act enforcement deadline has passed (June 28, 2025). Non-compliant businesses now face fines up to €100,000.
          </div>

          <div class="discount">
            <p style="margin:0 0 10px 0; font-size: 14px; opacity: 0.9;">EXCLUSIVE LAUNCH OFFER</p>
            <p style="margin:0 0 10px 0; font-size: 28px; font-weight: bold;">30% OFF First 3 Months</p>
            <p style="margin:0;">Use code: <code>LAUNCH30</code></p>
            <p style="margin:10px 0 0 0; font-size: 14px;">Save €${savings} on your subscription</p>
          </div>

          <p style="text-align: center; margin: 30px 0;">
            <a href="${appUrl}/pricing?coupon=LAUNCH30" class="cta">Complete Your Purchase →</a>
          </p>

          <div class="highlight">
            <strong>Why businesses choose Inclusiv:</strong>
            <ul style="margin: 10px 0 0 0; padding-left: 20px;">
              <li>Full WCAG 2.1 AA compliance scanning</li>
              <li>AI-powered fix suggestions with exact code</li>
              <li>Compliance certificates for regulators</li>
              <li>30-day money-back guarantee</li>
            </ul>
          </div>

          <p>If you have any questions or ran into an issue, just reply to this email. I'm here to help.</p>

          <div class="footer">
            <p>Best,<br><strong>The Inclusiv Team</strong></p>
            <p style="color: #999; font-size: 12px;">
              <a href="${appUrl}/unsubscribe?email=${encodeURIComponent(email)}" style="color: #999;">Unsubscribe</a>
            </p>
          </div>
        </body>
        </html>
      `,
    });
    console.log('Abandoned checkout email sent to:', email);
  } catch (error) {
    console.error('Failed to send abandoned checkout email:', error);
  }
}

async function sendPaymentFailedEmail(email: string) {
  const resend = getResend();
  if (!resend) return;

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://tryinclusiv.com';

  try {
    await resend.emails.send({
      from: 'Inclusiv <hello@tryinclusiv.com>',
      to: email,
      subject: 'Action Required: Payment Failed for Your Inclusiv Subscription',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: system-ui, -apple-system, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
            h1 { color: #ef4444; }
            .cta { display: inline-block; padding: 16px 32px; background: #6366f1; color: white; text-decoration: none; border-radius: 8px; font-weight: 600; }
            .warning { background: #fef2f2; border-left: 4px solid #ef4444; padding: 16px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <h1>Payment Failed</h1>

          <p>We couldn't process your latest payment for Inclusiv.</p>

          <div class="warning">
            <strong>⚠️ Your subscription is at risk.</strong> Please update your payment method to continue using Inclusiv and stay compliant with the EAA deadline.
          </div>

          <p style="text-align: center; margin: 30px 0;">
            <a href="${appUrl}/account/billing" class="cta">Update Payment Method →</a>
          </p>

          <p>If you have questions, contact support@tryinclusiv.com.</p>
        </body>
        </html>
      `,
    });
  } catch (error) {
    console.error('Failed to send payment failed email:', error);
  }
}

// ============================================
// DATABASE UPDATE HELPERS WITH RETRY
// ============================================

async function updateUserSubscription(
  email: string,
  data: {
    subscription_tier?: 'free' | 'starter' | 'professional' | 'enterprise';
    subscription_status?: 'free' | 'trial' | 'active' | 'canceled' | 'past_due';
    stripe_customer_id?: string;
    subscription_id?: string;
  }
): Promise<void> {
  if (!isSupabaseConfigured()) {
    console.log('Supabase not configured, skipping user update');
    return;
  }

  await withRetry(
    async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error } = await (supabaseAdmin as any)
        .from('users')
        .update(data)
        .eq('email', email.toLowerCase());

      if (error) {
        throw new Error(`Supabase update failed: ${error.message}`);
      }
    },
    `updateUserSubscription(${email})`,
    { maxRetries: 3 }
  );
}

async function updateSubscriptionBySubscriptionId(
  subscriptionId: string,
  data: {
    subscription_tier?: 'free' | 'starter' | 'professional' | 'enterprise';
    subscription_status?: 'free' | 'trial' | 'active' | 'canceled' | 'past_due';
  }
): Promise<void> {
  if (!isSupabaseConfigured()) {
    console.log('Supabase not configured, skipping subscription update');
    return;
  }

  await withRetry(
    async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error } = await (supabaseAdmin as any)
        .from('users')
        .update(data)
        .eq('subscription_id', subscriptionId);

      if (error) {
        throw new Error(`Supabase subscription update failed: ${error.message}`);
      }
    },
    `updateSubscriptionBySubscriptionId(${subscriptionId})`,
    { maxRetries: 3 }
  );
}

// ============================================
// EVENT HANDLERS
// ============================================

async function handleCheckoutCompleted(event: Stripe.Event): Promise<void> {
  const session = event.data.object as Stripe.Checkout.Session;
  const email = session.customer_email;
  const plan = session.metadata?.plan || 'starter';

  console.log('NEW SUBSCRIPTION:', {
    email,
    plan,
    amount: session.amount_total,
    subscriptionId: session.subscription,
  });

  if (!email) {
    console.warn('No email in checkout session, skipping');
    return;
  }

  // Store customer record (local backup)
  await storeCustomer({
    email,
    plan,
    stripeCustomerId: session.customer as string,
    subscriptionId: session.subscription as string,
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  // Update user in Supabase with retry
  try {
    await updateUserSubscription(email, {
      subscription_tier: plan as 'starter' | 'professional' | 'enterprise',
      subscription_status: 'active',
      stripe_customer_id: session.customer as string,
      subscription_id: session.subscription as string,
    });
    console.log('User subscription updated in Supabase:', email);
  } catch (error) {
    console.error('Failed to update user subscription after retries:', error);
    // Don't throw - we still want to send welcome email and return 200 to Stripe
  }

  // Send welcome email (fire and forget, don't block webhook response)
  sendWelcomeEmail(email, plan).catch(err => {
    console.error('Welcome email failed:', err);
  });
}

async function handleSubscriptionUpdated(event: Stripe.Event): Promise<void> {
  const subscription = event.data.object as Stripe.Subscription;
  console.log('Subscription updated:', subscription.id, 'Status:', subscription.status);

  // Map Stripe subscription status to our status
  let status: 'active' | 'canceled' | 'past_due' = 'active';
  if (subscription.status === 'canceled' || subscription.status === 'unpaid') {
    status = 'canceled';
  } else if (subscription.status === 'past_due') {
    status = 'past_due';
  }

  try {
    await updateSubscriptionBySubscriptionId(subscription.id, {
      subscription_status: status,
    });
    console.log('Subscription status synced:', subscription.id, status);
  } catch (error) {
    console.error('Failed to sync subscription status:', error);
  }
}

async function handleSubscriptionDeleted(event: Stripe.Event): Promise<void> {
  const subscription = event.data.object as Stripe.Subscription;
  console.log('Subscription cancelled:', subscription.id);

  try {
    await updateSubscriptionBySubscriptionId(subscription.id, {
      subscription_status: 'canceled',
      subscription_tier: 'free',
    });
    console.log('Subscription cancelled in Supabase:', subscription.id);
  } catch (error) {
    console.error('Failed to update cancelled subscription after retries:', error);
  }
}

async function handlePaymentSucceeded(event: Stripe.Event): Promise<void> {
  const invoice = event.data.object as Stripe.Invoice;
  console.log('Payment received:', {
    amount: invoice.amount_paid,
    customer: invoice.customer_email,
  });

  // If this is a recurring payment (not the first one), ensure user is marked active
  if (invoice.customer_email && invoice.billing_reason === 'subscription_cycle') {
    try {
      await updateUserSubscription(invoice.customer_email, {
        subscription_status: 'active',
      });
    } catch (error) {
      console.error('Failed to confirm active status:', error);
    }
  }
}

async function handlePaymentFailed(event: Stripe.Event): Promise<void> {
  const invoice = event.data.object as Stripe.Invoice;
  console.log('Payment failed:', invoice.customer_email);

  if (!invoice.customer_email) return;

  try {
    await updateUserSubscription(invoice.customer_email, {
      subscription_status: 'past_due',
    });
    console.log('User marked as past_due:', invoice.customer_email);
  } catch (error) {
    console.error('Failed to update past_due status after retries:', error);
  }

  // Send dunning email
  sendPaymentFailedEmail(invoice.customer_email).catch(err => {
    console.error('Payment failed email error:', err);
  });
}

async function handleCheckoutExpired(event: Stripe.Event): Promise<void> {
  const session = event.data.object as Stripe.Checkout.Session;
  const email = session.customer_email;
  const plan = session.metadata?.plan || 'professional';

  console.log('ABANDONED CHECKOUT:', {
    email,
    plan,
    sessionId: session.id,
  });

  if (email) {
    sendAbandonedCheckoutEmail(email, plan).catch(err => {
      console.error('Abandoned checkout email failed:', err);
    });
  }
}

// ============================================
// MAIN WEBHOOK HANDLER
// ============================================

export async function POST(request: NextRequest) {
  const stripe = getStripe();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error('Missing STRIPE_WEBHOOK_SECRET');
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

  // Idempotency check - prevent duplicate processing
  if (isEventProcessed(event.id)) {
    console.log(`Event ${event.id} already processed, skipping`);
    return NextResponse.json({ received: true, duplicate: true });
  }

  console.log(`Processing webhook event: ${event.type} (${event.id})`);

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event);
        break;

      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event);
        break;

      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event);
        break;

      case 'invoice.payment_succeeded':
        await handlePaymentSucceeded(event);
        break;

      case 'invoice.payment_failed':
        await handlePaymentFailed(event);
        break;

      case 'checkout.session.expired':
        await handleCheckoutExpired(event);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    // Mark event as successfully processed
    markEventProcessed(event.id, 'success');
    console.log(`Event ${event.id} processed successfully`);

    return NextResponse.json({ received: true });
  } catch (error) {
    // Mark event as failed (will allow retry on next Stripe attempt)
    markEventProcessed(event.id, 'failed');
    console.error(`Event ${event.id} processing failed:`, error);

    // Return 500 to tell Stripe to retry later
    return NextResponse.json(
      { error: 'Webhook processing failed', eventId: event.id },
      { status: 500 }
    );
  }
}
