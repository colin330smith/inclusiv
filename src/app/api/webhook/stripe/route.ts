import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { Resend } from 'resend';
import { promises as fs } from 'fs';
import path from 'path';

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
      from: 'Inclusiv <hello@inclusiv.dev>',
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

          <p>Your 14-day trial starts today. If you have any questions, just reply to this email or contact us at support@inclusiv.eu.</p>

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

async function sendPaymentFailedEmail(email: string) {
  const resend = getResend();
  if (!resend) return;

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://inclusiv-xi.vercel.app';

  try {
    await resend.emails.send({
      from: 'Inclusiv <hello@inclusiv.dev>',
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

          <p>If you have questions, contact support@inclusiv.eu.</p>
        </body>
        </html>
      `,
    });
  } catch (error) {
    console.error('Failed to send payment failed email:', error);
  }
}

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

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      const email = session.customer_email;
      const plan = session.metadata?.plan || 'starter';

      console.log('NEW SUBSCRIPTION:', {
        email,
        plan,
        amount: session.amount_total,
        subscriptionId: session.subscription,
      });

      // Store customer record
      if (email) {
        await storeCustomer({
          email,
          plan,
          stripeCustomerId: session.customer as string,
          subscriptionId: session.subscription as string,
          status: 'active',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });

        // Send welcome email
        await sendWelcomeEmail(email, plan);
      }
      break;
    }

    case 'customer.subscription.updated': {
      const subscription = event.data.object as Stripe.Subscription;
      console.log('Subscription updated:', subscription.id);
      break;
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription;
      console.log('Subscription cancelled:', subscription.id);
      break;
    }

    case 'invoice.payment_succeeded': {
      const invoice = event.data.object as Stripe.Invoice;
      console.log('Payment received:', {
        amount: invoice.amount_paid,
        customer: invoice.customer_email,
      });
      break;
    }

    case 'invoice.payment_failed': {
      const invoice = event.data.object as Stripe.Invoice;
      console.log('Payment failed:', invoice.customer_email);

      // Send dunning email
      if (invoice.customer_email) {
        await sendPaymentFailedEmail(invoice.customer_email);
      }
      break;
    }
  }

  return NextResponse.json({ received: true });
}
