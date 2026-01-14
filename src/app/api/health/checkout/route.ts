import { NextResponse } from 'next/server';
import Stripe from 'stripe';

/**
 * Checkout Health Check API
 *
 * Monitors the health of the checkout flow:
 * 1. Verifies Stripe API connectivity
 * 2. Validates all price IDs exist and are active
 * 3. Checks webhook endpoint configuration
 *
 * Can be used by external monitoring (e.g., Uptime Robot, Better Uptime)
 */

interface HealthCheckResult {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: string;
  checks: {
    stripe_connection: CheckResult;
    price_ids: CheckResult;
    environment: CheckResult;
  };
  response_time_ms: number;
}

interface CheckResult {
  status: 'pass' | 'fail' | 'warn';
  message: string;
  details?: Record<string, unknown>;
}

const getStripe = () => {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('Missing STRIPE_SECRET_KEY');
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY);
};

async function checkStripeConnection(): Promise<CheckResult> {
  try {
    const stripe = getStripe();
    // Quick API call to verify connection
    await stripe.balance.retrieve();
    return {
      status: 'pass',
      message: 'Stripe API connection successful',
    };
  } catch (error) {
    return {
      status: 'fail',
      message: error instanceof Error ? error.message : 'Stripe connection failed',
    };
  }
}

async function checkPriceIds(): Promise<CheckResult> {
  const priceIds = {
    starter: process.env.STRIPE_STARTER_PRICE_ID,
    professional: process.env.STRIPE_PROFESSIONAL_PRICE_ID,
    enterprise: process.env.STRIPE_ENTERPRISE_PRICE_ID,
  };

  const missing = Object.entries(priceIds)
    .filter(([, id]) => !id)
    .map(([name]) => name);

  if (missing.length > 0) {
    return {
      status: 'fail',
      message: `Missing price IDs: ${missing.join(', ')}`,
      details: { missing },
    };
  }

  try {
    const stripe = getStripe();
    const results: Record<string, boolean> = {};

    for (const [plan, priceId] of Object.entries(priceIds)) {
      if (priceId) {
        try {
          const price = await stripe.prices.retrieve(priceId);
          results[plan] = price.active;
        } catch {
          results[plan] = false;
        }
      }
    }

    const inactive = Object.entries(results)
      .filter(([, active]) => !active)
      .map(([name]) => name);

    if (inactive.length > 0) {
      return {
        status: 'warn',
        message: `Inactive/invalid prices: ${inactive.join(', ')}`,
        details: { inactive, results },
      };
    }

    return {
      status: 'pass',
      message: 'All price IDs valid and active',
      details: { results },
    };
  } catch (error) {
    return {
      status: 'fail',
      message: error instanceof Error ? error.message : 'Price validation failed',
    };
  }
}

function checkEnvironment(): CheckResult {
  const required = [
    'STRIPE_SECRET_KEY',
    'STRIPE_STARTER_PRICE_ID',
    'STRIPE_PROFESSIONAL_PRICE_ID',
    'STRIPE_ENTERPRISE_PRICE_ID',
    'NEXT_PUBLIC_APP_URL',
  ];

  const optional = [
    'STRIPE_WEBHOOK_SECRET',
    'STRIPE_STARTER_ANNUAL_PRICE_ID',
    'STRIPE_PROFESSIONAL_ANNUAL_PRICE_ID',
    'STRIPE_ENTERPRISE_ANNUAL_PRICE_ID',
  ];

  const missingRequired = required.filter(key => !process.env[key]);
  const missingOptional = optional.filter(key => !process.env[key]);

  if (missingRequired.length > 0) {
    return {
      status: 'fail',
      message: `Missing required env vars: ${missingRequired.join(', ')}`,
      details: { missingRequired, missingOptional },
    };
  }

  if (missingOptional.length > 0) {
    return {
      status: 'warn',
      message: `Missing optional env vars: ${missingOptional.join(', ')}`,
      details: { missingOptional },
    };
  }

  return {
    status: 'pass',
    message: 'All environment variables configured',
  };
}

export async function GET() {
  const startTime = Date.now();

  try {
    // Run all checks in parallel
    const [stripeConnection, priceIds, environment] = await Promise.all([
      checkStripeConnection(),
      checkPriceIds(),
      Promise.resolve(checkEnvironment()),
    ]);

    const checks = {
      stripe_connection: stripeConnection,
      price_ids: priceIds,
      environment: environment,
    };

    // Determine overall status
    const allChecks = Object.values(checks);
    const hasFail = allChecks.some(c => c.status === 'fail');
    const hasWarn = allChecks.some(c => c.status === 'warn');

    let status: 'healthy' | 'degraded' | 'unhealthy';
    if (hasFail) {
      status = 'unhealthy';
    } else if (hasWarn) {
      status = 'degraded';
    } else {
      status = 'healthy';
    }

    const result: HealthCheckResult = {
      status,
      timestamp: new Date().toISOString(),
      checks,
      response_time_ms: Date.now() - startTime,
    };

    // Return appropriate HTTP status
    const httpStatus = status === 'unhealthy' ? 503 : 200;

    return NextResponse.json(result, { status: httpStatus });
  } catch (error) {
    const result: HealthCheckResult = {
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      checks: {
        stripe_connection: { status: 'fail', message: 'Check failed' },
        price_ids: { status: 'fail', message: 'Check failed' },
        environment: { status: 'fail', message: error instanceof Error ? error.message : 'Unknown error' },
      },
      response_time_ms: Date.now() - startTime,
    };

    return NextResponse.json(result, { status: 503 });
  }
}

// POST endpoint for detailed checkout test
export async function POST() {
  const startTime = Date.now();

  try {
    const stripe = getStripe();

    // Create a test checkout session (won't actually charge)
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: process.env.STRIPE_STARTER_PRICE_ID!,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
      // Expire immediately (for testing only)
      expires_at: Math.floor(Date.now() / 1000) + 1800, // 30 minutes
      subscription_data: {
        trial_period_days: 14,
      },
    });

    // Immediately expire the session so it can't be used
    await stripe.checkout.sessions.expire(session.id);

    return NextResponse.json({
      status: 'pass',
      message: 'Checkout session creation successful',
      test_session_id: session.id,
      response_time_ms: Date.now() - startTime,
    });
  } catch (error) {
    return NextResponse.json({
      status: 'fail',
      message: error instanceof Error ? error.message : 'Checkout test failed',
      response_time_ms: Date.now() - startTime,
    }, { status: 500 });
  }
}
