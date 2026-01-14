import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const getStripe = () => {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('Missing STRIPE_SECRET_KEY');
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY);
};

// Monthly pricing
const MONTHLY_PLANS = {
  starter: {
    priceId: process.env.STRIPE_STARTER_PRICE_ID!,
    name: 'Starter',
    amount: 4900, // €49
  },
  professional: {
    priceId: process.env.STRIPE_PROFESSIONAL_PRICE_ID!,
    name: 'Professional',
    amount: 14900, // €149
  },
  enterprise: {
    priceId: process.env.STRIPE_ENTERPRISE_PRICE_ID!,
    name: 'Enterprise',
    amount: 49900, // €499
  },
};

// Annual pricing (20% discount) - falls back to monthly if not configured
const ANNUAL_PLANS = {
  starter: {
    priceId: process.env.STRIPE_STARTER_ANNUAL_PRICE_ID || process.env.STRIPE_STARTER_PRICE_ID!,
    name: 'Starter Annual',
    amount: 47000, // €470/year (~€39/mo)
    fallback: !process.env.STRIPE_STARTER_ANNUAL_PRICE_ID,
  },
  professional: {
    priceId: process.env.STRIPE_PROFESSIONAL_ANNUAL_PRICE_ID || process.env.STRIPE_PROFESSIONAL_PRICE_ID!,
    name: 'Professional Annual',
    amount: 143000, // €1,430/year (~€119/mo)
    fallback: !process.env.STRIPE_PROFESSIONAL_ANNUAL_PRICE_ID,
  },
  enterprise: {
    priceId: process.env.STRIPE_ENTERPRISE_ANNUAL_PRICE_ID || process.env.STRIPE_ENTERPRISE_PRICE_ID!,
    name: 'Enterprise Annual',
    amount: 479000, // €4,790/year (~€399/mo)
    fallback: !process.env.STRIPE_ENTERPRISE_ANNUAL_PRICE_ID,
  },
};

export async function POST(request: NextRequest) {
  try {
    const { plan, billing = 'monthly', email, successUrl, cancelUrl } = await request.json();

    const plans = billing === 'annual' ? ANNUAL_PLANS : MONTHLY_PLANS;

    if (!plan || !plans[plan as keyof typeof plans]) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
    }

    const selectedPlan = plans[plan as keyof typeof plans];

    const stripe = getStripe();

    // Build subscription data - only include trial for monthly plans
    const subscriptionData: Stripe.Checkout.SessionCreateParams['subscription_data'] = {
      metadata: {
        plan: plan,
        billing: billing,
      },
    };

    // 14-day trial for monthly plans only
    if (billing === 'monthly') {
      subscriptionData.trial_period_days = 14;
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      customer_email: email,
      line_items: [
        {
          price: selectedPlan.priceId,
          quantity: 1,
        },
      ],
      success_url: successUrl || `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
      metadata: {
        plan: plan,
        billing: billing,
      },
      subscription_data: subscriptionData,
    });

    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Checkout error:', errorMessage, error);
    return NextResponse.json(
      { error: 'Failed to create checkout session', details: errorMessage },
      { status: 500 }
    );
  }
}
