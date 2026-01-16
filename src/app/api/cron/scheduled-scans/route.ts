import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';

// Scheduled scans cron job
// Runs daily to execute scheduled scans for paid users
// Vercel Cron: 0 6 * * * (daily at 6am UTC)

interface ScheduledScan {
  siteId: string;
  url: string;
  userId: string;
  frequency: 'daily' | 'weekly' | 'monthly' | 'manual';
  lastScanned: string | null;
}

async function shouldScanToday(scan: ScheduledScan): Promise<boolean> {
  // Manual frequency means no automatic scans
  if (scan.frequency === 'manual') return false;

  if (!scan.lastScanned) return true;

  const lastScan = new Date(scan.lastScanned);
  const now = new Date();
  const daysSinceLastScan = Math.floor(
    (now.getTime() - lastScan.getTime()) / (1000 * 60 * 60 * 24)
  );

  switch (scan.frequency) {
    case 'daily':
      return daysSinceLastScan >= 1;
    case 'weekly':
      return daysSinceLastScan >= 7;
    case 'monthly':
      return daysSinceLastScan >= 30;
    default:
      return false;
  }
}

async function triggerScan(siteId: string, url: string): Promise<{ success: boolean; error?: string }> {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  try {
    const response = await fetch(`${appUrl}/api/scan`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-internal-cron': 'true',
      },
      body: JSON.stringify({
        url,
        site_id: siteId,
        scheduled: true,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      return { success: false, error: error.message || 'Scan failed' };
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function GET(request: NextRequest) {
  // Verify cron secret
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
  }

  const supabase = getSupabaseAdmin();
  const results = {
    processed: 0,
    scansTriggered: 0,
    errors: [] as { siteId: string; error: string }[],
  };

  try {
    // Get all sites belonging to paid users (starter, professional, enterprise)
    // with active subscriptions
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: paidUsers, error: usersError } = await (supabase
      .from('users') as ReturnType<typeof supabase.from>)
      .select('id, subscription_tier')
      .in('subscription_tier', ['starter', 'professional', 'enterprise'])
      .in('subscription_status', ['active', 'trial']) as { data: { id: string; subscription_tier: string }[] | null; error: Error | null };

    if (usersError) {
      console.error('Failed to fetch paid users:', usersError);
      return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
    }

    if (!paidUsers || paidUsers.length === 0) {
      return NextResponse.json({ message: 'No paid users to process', ...results });
    }

    // Get all sites for these users
    const userIds = paidUsers.map((u) => u.id);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: sites, error: sitesError } = await (supabase
      .from('sites') as ReturnType<typeof supabase.from>)
      .select('id, url, user_id, last_scanned_at, scan_frequency, monitoring_enabled')
      .in('user_id', userIds)
      .neq('scan_frequency', 'manual') as { data: { id: string; url: string; user_id: string; last_scanned_at: string | null; scan_frequency: string; monitoring_enabled: boolean }[] | null; error: Error | null }; // Only sites with scheduled scans

    if (sitesError) {
      console.error('Failed to fetch sites:', sitesError);
      return NextResponse.json({ error: 'Failed to fetch sites' }, { status: 500 });
    }

    if (!sites || sites.length === 0) {
      return NextResponse.json({ message: 'No sites to scan', ...results });
    }

    // Process each site
    for (const site of sites) {
      results.processed++;

      const scheduledScan: ScheduledScan = {
        siteId: site.id,
        url: site.url,
        userId: site.user_id,
        frequency: site.scan_frequency as ScheduledScan['frequency'],
        lastScanned: site.last_scanned_at,
      };

      if (await shouldScanToday(scheduledScan)) {
        console.log(`Triggering scheduled scan for ${site.url} (${scheduledScan.frequency})`);
        const result = await triggerScan(site.id, site.url);

        if (result.success) {
          results.scansTriggered++;
        } else {
          results.errors.push({ siteId: site.id, error: result.error || 'Unknown error' });
        }

        // Rate limit: wait 2 seconds between scans to avoid overwhelming Browserless
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
    }

    console.log('Scheduled scans complete:', results);

    return NextResponse.json({
      success: true,
      ...results,
    });
  } catch (error) {
    console.error('Scheduled scans cron failed:', error);
    return NextResponse.json(
      { error: 'Failed to process scheduled scans' },
      { status: 500 }
    );
  }
}
