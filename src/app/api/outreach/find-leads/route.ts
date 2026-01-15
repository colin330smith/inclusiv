import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import type { OutreachProspectInsert, OutreachProspectUpdate } from "@/types/database";

// This endpoint finds potential leads by searching for EU e-commerce sites
// and checking their accessibility score

interface ProspectLead {
  domain: string;
  company?: string;
  country?: string;
  industry?: string;
  accessibilityScore?: number;
  issues?: number;
  contactEmail?: string;
  source: string;
}

// EU country domains and indicators
const EU_INDICATORS = [
  '.de', '.fr', '.es', '.it', '.nl', '.be', '.at', '.pt', '.pl', '.se',
  '.dk', '.fi', '.ie', '.cz', '.gr', '.hu', '.ro', '.bg', '.sk', '.si',
  '.ee', '.lv', '.lt', '.lu', '.mt', '.cy', '.hr',
  'germany', 'france', 'spain', 'italy', 'netherlands', 'belgium',
  'austria', 'portugal', 'poland', 'sweden', 'denmark', 'finland',
  'ireland', 'europe', 'european', 'eu'
];

// Common e-commerce platforms to target
const ECOMMERCE_INDICATORS = [
  'shop', 'store', 'cart', 'checkout', 'buy', 'order', 'product',
  'shopify', 'woocommerce', 'magento', 'prestashop', 'bigcommerce'
];

async function storeProspect(prospect: ProspectLead) {
  try {
    // Check if prospect already exists
    const { data: existing } = await supabaseAdmin
      .from('outreach_prospects')
      .select('id')
      .eq('domain', prospect.domain)
      .single();

    if (existing) {
      return { success: true, isNew: false };
    }

    // Insert new prospect
    const insertData: OutreachProspectInsert = {
      domain: prospect.domain,
      company_name: prospect.company,
      country: prospect.country,
      industry: prospect.industry,
      accessibility_score: prospect.accessibilityScore,
      issues_count: prospect.issues,
      contact_email: prospect.contactEmail,
      source: prospect.source,
      status: 'new',
      created_at: new Date().toISOString(),
    };
    const { error } = await supabaseAdmin
      .from('outreach_prospects')
      .insert(insertData as never);

    if (error) {
      console.error('Failed to store prospect:', error);
      return { success: false, isNew: false };
    }

    return { success: true, isNew: true };
  } catch (error) {
    console.error('Error storing prospect:', error);
    return { success: false, isNew: false };
  }
}

// Scan a URL for accessibility issues (reusing existing scanner)
async function quickAccessibilityScan(url: string): Promise<{ score: number; issues: number } | null> {
  try {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://tryinclusiv.com';
    const response = await fetch(`${appUrl}/api/scan`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) return null;

    const data = await response.json();
    return {
      score: data.score || 0,
      issues: data.totalIssues || 0,
    };
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  // Protect endpoint
  const authHeader = request.headers.get("authorization");
  const apiKey = process.env.ADMIN_API_KEY;

  if (!apiKey || authHeader !== `Bearer ${apiKey}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { domains, scanAccessibility = false } = body;

    if (!domains || !Array.isArray(domains)) {
      return NextResponse.json(
        { error: "domains array required" },
        { status: 400 }
      );
    }

    const results = [];

    for (const domain of domains.slice(0, 50)) { // Limit to 50 per request
      const prospect: ProspectLead = {
        domain: domain.toLowerCase().trim(),
        source: 'manual_import',
      };

      // Detect EU presence
      const isEU = EU_INDICATORS.some(indicator =>
        domain.toLowerCase().includes(indicator)
      );

      if (isEU) {
        prospect.country = 'EU';
      }

      // Detect e-commerce
      const isEcommerce = ECOMMERCE_INDICATORS.some(indicator =>
        domain.toLowerCase().includes(indicator)
      );

      if (isEcommerce) {
        prospect.industry = 'e-commerce';
      }

      // Optional: Quick accessibility scan
      if (scanAccessibility) {
        const scanResult = await quickAccessibilityScan(`https://${domain}`);
        if (scanResult) {
          prospect.accessibilityScore = scanResult.score;
          prospect.issues = scanResult.issues;
        }
      }

      const { isNew } = await storeProspect(prospect);
      results.push({ isNew, ...prospect });
    }

    return NextResponse.json({
      success: true,
      processed: results.length,
      newProspects: results.filter(r => r.isNew).length,
      results,
    });
  } catch (error) {
    console.error("Find leads error:", error);
    return NextResponse.json(
      { error: "Failed to process leads" },
      { status: 500 }
    );
  }
}

// GET: Retrieve prospects for outreach
export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  const apiKey = process.env.ADMIN_API_KEY;

  if (!apiKey || authHeader !== `Bearer ${apiKey}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'new';
    const limit = parseInt(searchParams.get('limit') || '100');

    const { data: prospects, error } = await supabaseAdmin
      .from('outreach_prospects')
      .select('*')
      .eq('status', status)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;

    return NextResponse.json({
      prospects: prospects || [],
      count: prospects?.length || 0,
    });
  } catch (error) {
    console.error("Get prospects error:", error);
    return NextResponse.json(
      { error: "Failed to get prospects" },
      { status: 500 }
    );
  }
}
