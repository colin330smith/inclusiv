import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

/**
 * GET /api/ab-testing/stats
 *
 * Retrieve A/B testing statistics
 * This endpoint aggregates conversion data from analytics events
 */
export async function GET(request: NextRequest) {
  try {
    // Only allow authenticated admin access
    const authHeader = request.headers.get('authorization');
    const adminKey = process.env.ADMIN_API_KEY;

    if (!adminKey || authHeader !== `Bearer ${adminKey}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Query A/B test events from analytics table if it exists
    // For now, return mock data structure
    const stats = {
      tests: [
        {
          id: 'homepage_headline_v1',
          name: 'Homepage Headline',
          variants: [
            {
              name: 'control',
              visitors: 0,
              conversions: 0,
              conversionRate: 0,
            },
            {
              name: 'urgency',
              visitors: 0,
              conversions: 0,
              conversionRate: 0,
            },
            {
              name: 'benefit',
              visitors: 0,
              conversions: 0,
              conversionRate: 0,
            },
          ],
          winner: null,
          confidence: 0,
          status: 'running',
        },
        {
          id: 'cta_button_v1',
          name: 'CTA Button Text',
          variants: [
            {
              name: 'scan_now',
              visitors: 0,
              conversions: 0,
              conversionRate: 0,
            },
            {
              name: 'check_free',
              visitors: 0,
              conversions: 0,
              conversionRate: 0,
            },
            {
              name: 'start_scan',
              visitors: 0,
              conversions: 0,
              conversionRate: 0,
            },
            {
              name: 'get_report',
              visitors: 0,
              conversions: 0,
              conversionRate: 0,
            },
          ],
          winner: null,
          confidence: 0,
          status: 'running',
        },
      ],
      summary: {
        totalTests: 2,
        runningTests: 2,
        completedTests: 0,
        totalVisitors: 0,
        totalConversions: 0,
      },
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('A/B testing stats error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch A/B testing stats' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/ab-testing/stats
 *
 * Record an A/B test event (assignment or conversion)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { testId, variant, eventType, conversionType } = body;

    if (!testId || !variant || !eventType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Create ab_test_events table if it doesn't exist
    // For now, store in a generic events table or create one

    // Log the event (in production, store in database)
    console.log('A/B Test Event:', {
      testId,
      variant,
      eventType,
      conversionType,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('A/B testing record error:', error);
    return NextResponse.json(
      { error: 'Failed to record A/B test event' },
      { status: 500 }
    );
  }
}
