import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const getStripe = () => {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('Missing STRIPE_SECRET_KEY');
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY);
};

// Valid coupon codes - in production, these would be validated against Stripe
const VALID_COUPONS: Record<string, { stripeId: string; description: string }> = {
  LAUNCH30: {
    stripeId: process.env.STRIPE_LAUNCH30_COUPON_ID || 'launch30',
    description: '30% off first 3 months',
  },
  NONPROFIT50: {
    stripeId: process.env.STRIPE_NONPROFIT_COUPON_ID || 'nonprofit50',
    description: '50% off for non-profits',
  },
};

// Monthly pricing - Updated for sustainable B2B economics
const MONTHLY_PLANS = {
  starter: {
    priceId: process.env.STRIPE_STARTER_PRICE_ID!,
    name: 'Starter',
    amount: 9900, // €99 (was €49)
  },
  professional: {
    priceId: process.env.STRIPE_PROFESSIONAL_PRICE_ID!,
    name: 'Professional',
    amount: 29900, // €299 (was €149)
  },
  enterprise: {
    priceId: process.env.STRIPE_ENTERPRISE_PRICE_ID!,
    name: 'Enterprise',
    amount: 89900, // €899 (was €499)
  },
};

// Annual pricing (20% discount) - falls back to monthly if not configured
const ANNUAL_PLANS = {
  starter: {
    priceId: process.env.STRIPE_STARTER_ANNUAL_PRICE_ID || process.env.STRIPE_STARTER_PRICE_ID!,
    name: 'Starter Annual',
    amount: 94800, // €948/year (~€79/mo)
    fallback: !process.env.STRIPE_STARTER_ANNUAL_PRICE_ID,
  },
  professional: {
    priceId: process.env.STRIPE_PROFESSIONAL_ANNUAL_PRICE_ID || process.env.STRIPE_PROFESSIONAL_PRICE_ID!,
    name: 'Professional Annual',
    amount: 286800, // €2,868/year (~€239/mo)
    fallback: !process.env.STRIPE_PROFESSIONAL_ANNUAL_PRICE_ID,
  },
  enterprise: {
    priceId: process.env.STRIPE_ENTERPRISE_ANNUAL_PRICE_ID || process.env.STRIPE_ENTERPRISE_PRICE_ID!,
    name: 'Enterprise Annual',
    amount: 862800, // €8,628/year (~€719/mo)
    fallback: !process.env.STRIPE_ENTERPRISE_ANNUAL_PRICE_ID,
  },
};

export async function POST(request: NextRequest) {
  try {
    const { plan, billing = 'monthly', email, successUrl, cancelUrl, couponCode } = await request.json();

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

    // Build session params
    const sessionParams: Stripe.Checkout.SessionCreateParams = {
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
        coupon_applied: couponCode || '',
      },
      subscription_data: subscriptionData,
      // Allow user to enter promo code at checkout
      allow_promotion_codes: true,
    };

    // Apply coupon if provided and valid
    if (couponCode) {
      const upperCode = couponCode.toUpperCase();
      const coupon = VALID_COUPONS[upperCode];
      if (coupon) {
        sessionParams.discounts = [{ coupon: coupon.stripeId }];
        // When using discounts, can't also allow promotion codes
        delete sessionParams.allow_promotion_codes;
      }
    }

    const session = await stripe.checkout.sessions.create(sessionParams);

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
