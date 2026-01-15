import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { domain, score, rating, feedback, name, company, canShare, submittedAt } = body;

    // Validate required fields
    if (!domain || !rating) {
      return NextResponse.json(
        { error: 'Domain and rating are required' },
        { status: 400 }
      );
    }

    // Initialize Supabase client
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Store testimonial
    const { error } = await supabase
      .from('testimonials')
      .insert({
        domain,
        score,
        rating,
        feedback: feedback || null,
        name: name || null,
        company: company || null,
        can_share: canShare || false,
        submitted_at: submittedAt || new Date().toISOString(),
        status: 'pending', // pending, approved, rejected
      });

    if (error) {
      console.error('Failed to store testimonial:', error);
      // Don't fail the request even if DB fails
    }

    return NextResponse.json({
      success: true,
      message: 'Testimonial received',
    });
  } catch (error) {
    console.error('Testimonial API error:', error);
    return NextResponse.json(
      { error: 'Failed to submit testimonial' },
      { status: 500 }
    );
  }
}

// Get approved testimonials for display
export async function GET() {
  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('status', 'approved')
      .eq('can_share', true)
      .order('rating', { ascending: false })
      .limit(10);

    if (error) {
      console.error('Failed to fetch testimonials:', error);
      return NextResponse.json({ testimonials: [] });
    }

    return NextResponse.json({
      testimonials: data || [],
    });
  } catch (error) {
    console.error('Testimonials GET error:', error);
    return NextResponse.json({ testimonials: [] });
  }
}
