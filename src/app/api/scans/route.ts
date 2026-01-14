import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';
import { requireWithinLimits, checkFeatureAccess } from '@/lib/plan-enforcement';
import { getPlanLimits, SubscriptionTier } from '@/lib/plan-limits';
import type { Site, Scan } from '@/types/database';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: scans, error } = await (supabaseAdmin as any)
      .from('scans')
      .select('*, sites(url, name)')
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false })
      .limit(50) as { data: (Scan & { sites: { url: string; name: string | null } | null })[] | null; error: Error | null };

    if (error) throw error;

    return NextResponse.json({ scans });
  } catch (error) {
    console.error('Error fetching scans:', error);
    return NextResponse.json({ error: 'Failed to fetch scans' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    // Check if user can run a scan (within limits)
    const { session, allowed, error, result } = await requireWithinLimits('scans');

    if (!allowed || error) {
      return NextResponse.json(
        {
          error: error?.message || 'Limit exceeded',
          code: error?.code,
          currentUsage: result?.currentUsage,
          limit: result?.limit,
          upgradeRequired: result?.upgradeRequired,
        },
        { status: error?.status || 403 }
      );
    }

    const body = await request.json();
    const { siteId, url, options } = body;

    // Validate input
    if (!siteId && !url) {
      return NextResponse.json(
        { error: 'Either siteId or url is required' },
        { status: 400 }
      );
    }

    let targetUrl = url;
    let targetSiteId = siteId;

    // If siteId provided, verify ownership and get URL
    if (siteId) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: site } = await (supabaseAdmin as any)
        .from('sites')
        .select('*')
        .eq('id', siteId)
        .eq('user_id', session!.user.id)
        .single() as { data: Site | null; error: Error | null };

      if (!site) {
        return NextResponse.json({ error: 'Site not found' }, { status: 404 });
      }

      targetUrl = site.url;
    }

    // Get plan limits for scan options
    const tier = session!.user.subscriptionTier as SubscriptionTier;
    const limits = getPlanLimits(tier);

    // Check if scan depth is within limits
    const requestedPages = options?.maxPages || 10;
    const allowedPages = limits.pagesPerScan === -1 ? requestedPages : Math.min(requestedPages, limits.pagesPerScan);

    // Check feature access for advanced options
    const aiSuggestionsResult = checkFeatureAccess(tier, 'aiFixSuggestions');
    const aiAutoFixResult = checkFeatureAccess(tier, 'aiAutoFixes');

    // Create scan record
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: scan, error: scanError } = await (supabaseAdmin as any)
      .from('scans')
      .insert({
        user_id: session!.user.id,
        site_id: targetSiteId || null,
        url: targetUrl,
        status: 'pending',
        scan_type: 'full',
        options: {
          maxPages: allowedPages,
          includeAiSuggestions: aiSuggestionsResult.allowed && (options?.includeAiSuggestions ?? true),
          includeAiAutoFixes: aiAutoFixResult.allowed && (options?.includeAiAutoFixes ?? false),
        },
      })
      .select()
      .single() as { data: Scan | null; error: Error | null };

    if (scanError) throw scanError;

    // TODO: Queue scan job for processing
    // In production, this would trigger a background job
    // For now, we'll leave the scan in 'pending' status

    return NextResponse.json({
      success: true,
      scan,
      usageInfo: {
        scansUsed: (result?.currentUsage || 0) + 1,
        scansLimit: result?.limit,
        pagesPerScan: allowedPages,
      },
      featureAccess: {
        aiSuggestions: aiSuggestionsResult.allowed,
        aiAutoFixes: aiAutoFixResult.allowed,
      },
    });
  } catch (error) {
    console.error('Error creating scan:', error);
    return NextResponse.json({ error: 'Failed to create scan' }, { status: 500 });
  }
}
