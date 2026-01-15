import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { domain, event } = body;

    if (!domain || !event) {
      return NextResponse.json(
        { error: 'Domain and event are required' },
        { status: 400 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Track widget usage
    const { error } = await supabase
      .from('widget_analytics')
      .insert({
        domain,
        event,
        timestamp: new Date().toISOString(),
        user_agent: request.headers.get('user-agent') || null,
        referer: request.headers.get('referer') || null,
      });

    if (error) {
      // Log but don't fail - analytics shouldn't break widget
      console.error('Widget tracking error:', error);
    }

    // Also update or create widget installation record
    if (event === 'load') {
      const { error: upsertError } = await supabase
        .from('widget_installations')
        .upsert({
          domain,
          last_seen: new Date().toISOString(),
          load_count: 1,
        }, {
          onConflict: 'domain',
        });

      if (upsertError) {
        console.error('Widget installation tracking error:', upsertError);
      }

      // Increment load count
      await supabase.rpc('increment_widget_loads', { widget_domain: domain });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Widget track API error:', error);
    // Always return success to not break widget
    return NextResponse.json({ success: true });
  }
}

// Get widget stats for a domain
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const domain = searchParams.get('domain');

    if (!domain) {
      return NextResponse.json(
        { error: 'Domain is required' },
        { status: 400 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { data, error } = await supabase
      .from('widget_installations')
      .select('*')
      .eq('domain', domain)
      .single();

    if (error || !data) {
      return NextResponse.json({ installed: false });
    }

    return NextResponse.json({
      installed: true,
      lastSeen: data.last_seen,
      loadCount: data.load_count,
    });
  } catch (error) {
    console.error('Widget stats API error:', error);
    return NextResponse.json({ installed: false });
  }
}
