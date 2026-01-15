/**
 * Geo-Based Pricing System
 *
 * Adjusts pricing based on visitor location using:
 * - Currency detection
 * - Purchasing Power Parity (PPP) adjustments
 * - Regional price optimization
 */

export interface GeoLocation {
  country: string;
  countryCode: string;
  continent: string;
  currency: string;
  timezone: string;
}

export interface GeoPricing {
  currency: string;
  currencySymbol: string;
  exchangeRate: number;
  pppMultiplier: number;
  prices: {
    starter: { monthly: number; annual: number };
    professional: { monthly: number; annual: number };
    enterprise: { monthly: number; annual: number };
  };
  showOriginalPrices: boolean;
  discountPercent: number;
}

// Base prices in EUR
const BASE_PRICES = {
  starter: { monthly: 49, annual: 39 },
  professional: { monthly: 149, annual: 119 },
  enterprise: { monthly: 499, annual: 399 },
};

// Currency symbols and exchange rates (approximate - update regularly)
const CURRENCY_CONFIG: Record<string, { symbol: string; rate: number }> = {
  EUR: { symbol: '€', rate: 1 },
  USD: { symbol: '$', rate: 1.08 },
  GBP: { symbol: '£', rate: 0.86 },
  CHF: { symbol: 'CHF', rate: 0.95 },
  SEK: { symbol: 'kr', rate: 11.5 },
  NOK: { symbol: 'kr', rate: 11.8 },
  DKK: { symbol: 'kr', rate: 7.45 },
  PLN: { symbol: 'zł', rate: 4.3 },
  CZK: { symbol: 'Kč', rate: 25.0 },
  HUF: { symbol: 'Ft', rate: 390 },
  RON: { symbol: 'lei', rate: 5.0 },
  BGN: { symbol: 'лв', rate: 1.96 },
  HRK: { symbol: 'kn', rate: 7.53 }, // Now EUR
  CAD: { symbol: 'C$', rate: 1.47 },
  AUD: { symbol: 'A$', rate: 1.65 },
  NZD: { symbol: 'NZ$', rate: 1.78 },
  JPY: { symbol: '¥', rate: 162 },
  INR: { symbol: '₹', rate: 90 },
  BRL: { symbol: 'R$', rate: 5.4 },
  MXN: { symbol: 'MX$', rate: 18.5 },
  ZAR: { symbol: 'R', rate: 20.5 },
};

// Purchasing Power Parity multipliers by country
// Values < 1 mean lower prices, > 1 mean higher prices
const PPP_MULTIPLIERS: Record<string, number> = {
  // Western Europe (full price)
  DE: 1.0, FR: 1.0, NL: 1.0, BE: 1.0, AT: 1.0, IE: 1.0, LU: 1.0, FI: 1.0,
  // UK
  GB: 1.0,
  // Nordics (higher cost of living)
  SE: 1.1, NO: 1.15, DK: 1.05, IS: 1.1,
  // Switzerland (premium)
  CH: 1.2,
  // Southern Europe (slight discount)
  ES: 0.9, IT: 0.95, PT: 0.85, GR: 0.8,
  // Eastern Europe (significant discount)
  PL: 0.65, CZ: 0.7, HU: 0.6, RO: 0.55, BG: 0.5, HR: 0.65, SK: 0.7, SI: 0.8,
  EE: 0.75, LV: 0.65, LT: 0.65,
  // USA/Canada (full price, USD)
  US: 1.0, CA: 0.95,
  // UK territories
  AU: 0.95, NZ: 0.9,
  // Latin America (regional pricing)
  MX: 0.5, BR: 0.45, AR: 0.35, CL: 0.55, CO: 0.4,
  // Asia
  JP: 0.85, SG: 0.9, HK: 0.85, KR: 0.75, TW: 0.65,
  IN: 0.3, ID: 0.35, PH: 0.35, VN: 0.3, TH: 0.4, MY: 0.45,
  // Middle East
  AE: 0.95, SA: 0.85, IL: 0.9,
  // Africa
  ZA: 0.5, NG: 0.35, KE: 0.35, EG: 0.4,
};

// Country to currency mapping
const COUNTRY_CURRENCIES: Record<string, string> = {
  // Eurozone
  DE: 'EUR', FR: 'EUR', NL: 'EUR', BE: 'EUR', AT: 'EUR', IE: 'EUR', LU: 'EUR',
  FI: 'EUR', ES: 'EUR', IT: 'EUR', PT: 'EUR', GR: 'EUR', EE: 'EUR', LV: 'EUR',
  LT: 'EUR', SK: 'EUR', SI: 'EUR', MT: 'EUR', CY: 'EUR', HR: 'EUR',
  // Other European
  GB: 'GBP', CH: 'CHF', SE: 'SEK', NO: 'NOK', DK: 'DKK', PL: 'PLN',
  CZ: 'CZK', HU: 'HUF', RO: 'RON', BG: 'BGN',
  // Americas
  US: 'USD', CA: 'CAD', MX: 'MXN', BR: 'BRL',
  // Oceania
  AU: 'AUD', NZ: 'NZD',
  // Asia
  JP: 'JPY', IN: 'INR', SG: 'USD', HK: 'USD', KR: 'USD', TW: 'USD',
  // Middle East
  AE: 'USD', SA: 'USD', IL: 'USD',
  // Africa
  ZA: 'ZAR', NG: 'USD', KE: 'USD', EG: 'USD',
};

/**
 * Get currency for a country
 */
export function getCurrencyForCountry(countryCode: string): string {
  return COUNTRY_CURRENCIES[countryCode] || 'EUR';
}

/**
 * Calculate geo-based pricing
 */
export function calculateGeoPricing(countryCode: string): GeoPricing {
  const currency = getCurrencyForCountry(countryCode);
  const currencyConfig = CURRENCY_CONFIG[currency] || CURRENCY_CONFIG.EUR;
  const pppMultiplier = PPP_MULTIPLIERS[countryCode] || 1.0;

  // Calculate prices with PPP adjustment
  const calculatePrice = (basePrice: number): number => {
    const convertedPrice = basePrice * currencyConfig.rate;
    const pppAdjustedPrice = convertedPrice * pppMultiplier;

    // Round to nice numbers
    if (pppAdjustedPrice > 100) {
      return Math.round(pppAdjustedPrice / 10) * 10 - 1; // e.g., 149
    } else if (pppAdjustedPrice > 10) {
      return Math.round(pppAdjustedPrice) - 1 + 0.99; // e.g., 49.99
    } else {
      return Math.round(pppAdjustedPrice * 10) / 10; // e.g., 4.9
    }
  };

  const prices = {
    starter: {
      monthly: calculatePrice(BASE_PRICES.starter.monthly),
      annual: calculatePrice(BASE_PRICES.starter.annual),
    },
    professional: {
      monthly: calculatePrice(BASE_PRICES.professional.monthly),
      annual: calculatePrice(BASE_PRICES.professional.annual),
    },
    enterprise: {
      monthly: calculatePrice(BASE_PRICES.enterprise.monthly),
      annual: calculatePrice(BASE_PRICES.enterprise.annual),
    },
  };

  // Calculate effective discount
  const originalPrice = BASE_PRICES.professional.monthly * currencyConfig.rate;
  const discountedPrice = prices.professional.monthly;
  const discountPercent = Math.round((1 - discountedPrice / originalPrice) * 100);

  return {
    currency,
    currencySymbol: currencyConfig.symbol,
    exchangeRate: currencyConfig.rate,
    pppMultiplier,
    prices,
    showOriginalPrices: pppMultiplier < 0.8, // Show "save X%" for significant discounts
    discountPercent: Math.max(0, discountPercent),
  };
}

/**
 * Format price with currency symbol
 */
export function formatPrice(price: number, currencySymbol: string): string {
  // Handle integer prices (no decimals needed)
  if (price >= 10 && Number.isInteger(price)) {
    return `${currencySymbol}${price}`;
  }

  // Handle prices with decimals
  if (currencySymbol === '¥' || currencySymbol === 'kr' || currencySymbol === 'Ft') {
    // These currencies typically don't use decimals
    return `${currencySymbol}${Math.round(price).toLocaleString()}`;
  }

  return `${currencySymbol}${price.toFixed(price % 1 === 0 ? 0 : 2)}`;
}

/**
 * Get geo location from IP (server-side)
 * Uses Vercel's geo headers or falls back to IP lookup
 */
export function getGeoFromHeaders(headers: Headers): GeoLocation | null {
  // Vercel provides these headers automatically
  const country = headers.get('x-vercel-ip-country');
  const city = headers.get('x-vercel-ip-city');
  const continent = headers.get('x-vercel-ip-continent');
  const timezone = headers.get('x-vercel-ip-timezone');

  if (country) {
    return {
      country: city || country,
      countryCode: country,
      continent: continent || 'EU',
      currency: getCurrencyForCountry(country),
      timezone: timezone || 'Europe/London',
    };
  }

  return null;
}

/**
 * Detect location client-side using timezone
 */
export function detectLocationFromTimezone(): string | null {
  if (typeof window === 'undefined') return null;

  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    // Map timezones to country codes (simplified)
    const tzToCountry: Record<string, string> = {
      'Europe/London': 'GB',
      'Europe/Paris': 'FR',
      'Europe/Berlin': 'DE',
      'Europe/Madrid': 'ES',
      'Europe/Rome': 'IT',
      'Europe/Amsterdam': 'NL',
      'Europe/Brussels': 'BE',
      'Europe/Vienna': 'AT',
      'Europe/Dublin': 'IE',
      'Europe/Lisbon': 'PT',
      'Europe/Warsaw': 'PL',
      'Europe/Prague': 'CZ',
      'Europe/Budapest': 'HU',
      'Europe/Bucharest': 'RO',
      'Europe/Sofia': 'BG',
      'Europe/Athens': 'GR',
      'Europe/Helsinki': 'FI',
      'Europe/Stockholm': 'SE',
      'Europe/Oslo': 'NO',
      'Europe/Copenhagen': 'DK',
      'Europe/Zurich': 'CH',
      'America/New_York': 'US',
      'America/Los_Angeles': 'US',
      'America/Chicago': 'US',
      'America/Denver': 'US',
      'America/Toronto': 'CA',
      'America/Vancouver': 'CA',
      'America/Mexico_City': 'MX',
      'America/Sao_Paulo': 'BR',
      'Asia/Tokyo': 'JP',
      'Asia/Singapore': 'SG',
      'Asia/Hong_Kong': 'HK',
      'Asia/Seoul': 'KR',
      'Asia/Taipei': 'TW',
      'Asia/Kolkata': 'IN',
      'Asia/Dubai': 'AE',
      'Australia/Sydney': 'AU',
      'Pacific/Auckland': 'NZ',
      'Africa/Johannesburg': 'ZA',
    };

    return tzToCountry[timezone] || null;
  } catch {
    return null;
  }
}

/**
 * Get browser's preferred language to infer location
 */
export function detectLocationFromLanguage(): string | null {
  if (typeof window === 'undefined') return null;

  try {
    const lang = navigator.language || navigator.languages?.[0];
    if (!lang) return null;

    // Map language codes to country codes
    const langToCountry: Record<string, string> = {
      'en-GB': 'GB',
      'en-US': 'US',
      'en-AU': 'AU',
      'en-CA': 'CA',
      'de-DE': 'DE',
      'de-AT': 'AT',
      'de-CH': 'CH',
      'fr-FR': 'FR',
      'fr-CA': 'CA',
      'fr-BE': 'BE',
      'fr-CH': 'CH',
      'es-ES': 'ES',
      'es-MX': 'MX',
      'it-IT': 'IT',
      'nl-NL': 'NL',
      'nl-BE': 'BE',
      'pt-PT': 'PT',
      'pt-BR': 'BR',
      'pl-PL': 'PL',
      'ja-JP': 'JP',
      'zh-CN': 'CN',
      'zh-TW': 'TW',
      'ko-KR': 'KR',
    };

    // Try exact match first
    if (langToCountry[lang]) {
      return langToCountry[lang];
    }

    // Try language prefix
    const langPrefix = lang.split('-')[0];
    const prefixMapping: Record<string, string> = {
      en: 'US', de: 'DE', fr: 'FR', es: 'ES', it: 'IT', nl: 'NL',
      pt: 'PT', pl: 'PL', ja: 'JP', ko: 'KR', zh: 'CN', sv: 'SE',
      no: 'NO', da: 'DK', fi: 'FI', el: 'GR', cs: 'CZ', hu: 'HU',
      ro: 'RO', bg: 'BG',
    };

    return prefixMapping[langPrefix] || null;
  } catch {
    return null;
  }
}
