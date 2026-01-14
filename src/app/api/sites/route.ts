import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';
import type { Site } from '@/types/database';

// Plan limits
const PLAN_LIMITS = {
  free: { sites: 1, scansPerMonth: 3 },
  starter: { sites: 5, scansPerMonth: 100 },
  professional: { sites: -1, scansPerMonth: -1 }, // -1 = unlimited
  enterprise: { sites: -1, scansPerMonth: -1 },
};

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: sites, error } = await (supabaseAdmin as any)
      .from('sites')
      .select('*')
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false }) as { data: Site[] | null; error: Error | null };

    if (error) throw error;

    return NextResponse.json({ sites });
  } catch (error) {
    console.error('Error fetching sites:', error);
    return NextResponse.json({ error: 'Failed to fetch sites' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { url } = body;

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    // Validate URL format
    let validUrl: URL;
    try {
      validUrl = new URL(url);
    } catch {
      return NextResponse.json({ error: 'Invalid URL format' }, { status: 400 });
    }

    // Normalize URL (remove trailing slash, use lowercase hostname)
    const normalizedUrl = `${validUrl.protocol}//${validUrl.hostname.toLowerCase()}${validUrl.pathname.replace(/\/$/, '') || ''}`;

    // Check plan limits
    const planLimits = PLAN_LIMITS[session.user.subscriptionTier as keyof typeof PLAN_LIMITS] || PLAN_LIMITS.free;

    if (planLimits.sites !== -1) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { count, error: countError } = await (supabaseAdmin as any)
        .from('sites')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', session.user.id) as { count: number | null; error: Error | null };

      if (countError) throw countError;

      if ((count || 0) >= planLimits.sites) {
        return NextResponse.json(
          {
            error: `Site limit reached. Your ${session.user.subscriptionTier} plan allows ${planLimits.sites} site${planLimits.sites !== 1 ? 's' : ''}. Upgrade to add more.`,
            code: 'SITE_LIMIT_REACHED',
          },
          { status: 403 }
        );
      }
    }

    // Check if site already exists for this user
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: existing } = await (supabaseAdmin as any)
      .from('sites')
      .select('id')
      .eq('user_id', session.user.id)
      .eq('url', normalizedUrl)
      .single() as { data: { id: string } | null; error: Error | null };

    if (existing) {
      return NextResponse.json(
        { error: 'This site is already added to your account' },
        { status: 400 }
      );
    }

    // Create the site
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: site, error } = await (supabaseAdmin as any)
      .from('sites')
      .insert({
        user_id: session.user.id,
        url: normalizedUrl,
        name: validUrl.hostname,
      })
      .select()
      .single() as { data: Site | null; error: Error | null };

    if (error) throw error;

    return NextResponse.json({ success: true, site });
  } catch (error) {
    console.error('Error creating site:', error);
    return NextResponse.json({ error: 'Failed to create site' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const siteId = searchParams.get('id');

    if (!siteId) {
      return NextResponse.json({ error: 'Site ID is required' }, { status: 400 });
    }

    // Verify ownership
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: site } = await (supabaseAdmin as any)
      .from('sites')
      .select('id')
      .eq('id', siteId)
      .eq('user_id', session.user.id)
      .single() as { data: { id: string } | null; error: Error | null };

    if (!site) {
      return NextResponse.json({ error: 'Site not found' }, { status: 404 });
    }

    // Delete the site (cascade will handle related records)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabaseAdmin as any).from('sites').delete().eq('id', siteId) as { error: Error | null };

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting site:', error);
    return NextResponse.json({ error: 'Failed to delete site' }, { status: 500 });
  }
}
