import { NextRequest, NextResponse } from 'next/server';
import {
  getGeoFromHeaders,
  calculateGeoPricing,
  GeoLocation,
  GeoPricing
} from '@/lib/geo-pricing';

export interface GeoResponse {
  location: GeoLocation | null;
  pricing: GeoPricing;
  detected: boolean;
}

/**
 * GET /api/geo
 *
 * Detects visitor location from Vercel headers and returns
 * geo-based pricing information.
 */
export async function GET(request: NextRequest) {
  try {
    // Get location from Vercel's geo headers
    const location = getGeoFromHeaders(request.headers);

    // Default to Germany if location cannot be detected
    const countryCode = location?.countryCode || 'DE';

    // Calculate geo-based pricing
    const pricing = calculateGeoPricing(countryCode);

    const response: GeoResponse = {
      location,
      pricing,
      detected: !!location,
    };

    return NextResponse.json(response, {
      headers: {
        // Cache for 1 hour on CDN, but allow client to use stale while revalidating
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Geo detection error:', error);

    // Return default EUR pricing on error
    const defaultPricing = calculateGeoPricing('DE');

    return NextResponse.json({
      location: null,
      pricing: defaultPricing,
      detected: false,
    });
  }
}
