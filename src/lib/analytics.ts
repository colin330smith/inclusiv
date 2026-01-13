/**
 * Analytics Utility for Inclusiv
 * Comprehensive tracking for user actions, conversions, and funnel analysis
 */

// Type definitions for analytics events
export type AnalyticsEvent =
  | 'page_view'
  | 'scan_started'
  | 'scan_completed'
  | 'email_captured'
  | 'pricing_viewed'
  | 'checkout_initiated'
  | 'payment_completed'
  | 'button_click'
  | 'feature_click'
  | 'cta_click'
  | 'scroll_depth'
  | 'time_on_page'
  | 'form_interaction';

export type EventProperties = {
  // Page view properties
  page_path?: string;
  page_title?: string;
  referrer?: string;

  // Scan properties
  url?: string;
  score?: number;
  issues_count?: number;
  critical_issues?: number;
  platform?: string;
  scan_duration_ms?: number;

  // Email properties
  email_hash?: string; // Never store raw email, use hash
  source?: string;

  // Button/CTA properties
  button_id?: string;
  button_text?: string;
  button_location?: string;

  // Feature properties
  feature_name?: string;
  feature_section?: string;

  // Pricing properties
  plan_name?: string;
  plan_price?: number;
  plan_period?: string;

  // Checkout properties
  checkout_step?: number;
  checkout_value?: number;
  currency?: string;

  // User engagement
  scroll_percentage?: number;
  time_on_page_seconds?: number;

  // Custom properties
  [key: string]: string | number | boolean | undefined;
};

// Declare global window types for analytics
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    plausible?: (...args: unknown[]) => void;
  }
}

/**
 * Initialize analytics - called once on app load
 */
export const initAnalytics = (): void => {
  if (typeof window === 'undefined') return;

  // Initialize dataLayer for Google Analytics
  window.dataLayer = window.dataLayer || [];

  // Track initial page view
  trackPageView();

  // Set up scroll tracking
  setupScrollTracking();

  // Set up time on page tracking
  setupTimeTracking();

  console.log('[Analytics] Initialized');
};

/**
 * Send event to Google Analytics 4
 */
const sendToGA4 = (eventName: string, properties: EventProperties = {}): void => {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', eventName, {
    ...properties,
    timestamp: new Date().toISOString(),
  });
};

/**
 * Send event to Plausible Analytics
 */
const sendToPlausible = (eventName: string, properties: EventProperties = {}): void => {
  if (typeof window === 'undefined' || !window.plausible) return;

  window.plausible(eventName, { props: properties });
};

/**
 * Core tracking function - sends to all configured analytics providers
 */
export const track = (event: AnalyticsEvent, properties: EventProperties = {}): void => {
  if (typeof window === 'undefined') return;

  const enrichedProperties = {
    ...properties,
    timestamp: Date.now(),
    user_agent: navigator.userAgent,
    screen_width: window.innerWidth,
    screen_height: window.innerHeight,
    url: window.location.href,
    pathname: window.location.pathname,
  };

  // Send to GA4
  sendToGA4(event, enrichedProperties);

  // Send to Plausible
  sendToPlausible(event, properties);

  // Log in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics]', event, enrichedProperties);
  }
};

/**
 * Track page views
 */
export const trackPageView = (pagePath?: string, pageTitle?: string): void => {
  track('page_view', {
    page_path: pagePath || (typeof window !== 'undefined' ? window.location.pathname : ''),
    page_title: pageTitle || (typeof document !== 'undefined' ? document.title : ''),
    referrer: typeof document !== 'undefined' ? document.referrer : '',
  });
};

/**
 * Track button clicks
 */
export const trackButtonClick = (
  buttonId: string,
  buttonText: string,
  buttonLocation: string
): void => {
  track('button_click', {
    button_id: buttonId,
    button_text: buttonText,
    button_location: buttonLocation,
  });
};

/**
 * Track scan started
 */
export const trackScanStarted = (url: string): void => {
  track('scan_started', {
    url: anonymizeUrl(url),
    source: 'homepage_scanner',
  });
};

/**
 * Track scan completed
 */
export const trackScanCompleted = (
  url: string,
  score: number,
  issuesCount: number,
  criticalIssues: number,
  platform: string,
  durationMs: number
): void => {
  track('scan_completed', {
    url: anonymizeUrl(url),
    score,
    issues_count: issuesCount,
    critical_issues: criticalIssues,
    platform,
    scan_duration_ms: durationMs,
    score_category: getScoreCategory(score),
  });
};

/**
 * Track email captured (for lead gen)
 */
export const trackEmailCaptured = (source: string, hashedEmail?: string): void => {
  track('email_captured', {
    source,
    email_hash: hashedEmail,
    page_path: typeof window !== 'undefined' ? window.location.pathname : '',
  });
};

/**
 * Track pricing page view
 */
export const trackPricingViewed = (planViewed?: string): void => {
  track('pricing_viewed', {
    plan_name: planViewed,
    source: typeof document !== 'undefined' ? document.referrer : '',
  });
};

/**
 * Track feature clicks (for understanding feature interest)
 */
export const trackFeatureClick = (featureName: string, featureSection: string): void => {
  track('feature_click', {
    feature_name: featureName,
    feature_section: featureSection,
  });
};

/**
 * Track CTA clicks specifically
 */
export const trackCtaClick = (
  ctaId: string,
  ctaText: string,
  ctaLocation: string,
  ctaDestination?: string
): void => {
  track('cta_click', {
    button_id: ctaId,
    button_text: ctaText,
    button_location: ctaLocation,
    destination: ctaDestination,
  });
};

/**
 * Conversion Events - High Value Actions
 */

export const trackCheckoutInitiated = (
  planName: string,
  planPrice: number,
  currency: string = 'EUR'
): void => {
  track('checkout_initiated', {
    plan_name: planName,
    plan_price: planPrice,
    currency,
    checkout_step: 1,
  });
};

export const trackPaymentCompleted = (
  planName: string,
  planPrice: number,
  currency: string = 'EUR',
  transactionId?: string
): void => {
  track('payment_completed', {
    plan_name: planName,
    plan_price: planPrice,
    currency,
    transaction_id: transactionId,
  });

  // Also send to GA4 purchase event for better ecommerce tracking
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'purchase', {
      transaction_id: transactionId,
      value: planPrice,
      currency,
      items: [{
        item_id: planName.toLowerCase().replace(/\s/g, '_'),
        item_name: planName,
        price: planPrice,
        quantity: 1,
      }],
    });
  }
};

/**
 * Utility Functions
 */

// Hash email for privacy
export const hashEmail = async (email: string): Promise<string> => {
  if (typeof window === 'undefined') return '';

  const encoder = new TextEncoder();
  const data = encoder.encode(email.toLowerCase().trim());
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

// Anonymize URL (remove sensitive query params)
const anonymizeUrl = (url: string): string => {
  try {
    const urlObj = new URL(url);
    // Remove potentially sensitive params
    ['token', 'key', 'password', 'secret', 'auth'].forEach(param => {
      urlObj.searchParams.delete(param);
    });
    return urlObj.origin + urlObj.pathname;
  } catch {
    return url.split('?')[0];
  }
};

// Categorize score for easier analysis
const getScoreCategory = (score: number): string => {
  if (score >= 90) return 'excellent';
  if (score >= 80) return 'good';
  if (score >= 50) return 'needs_work';
  return 'critical';
};

// Set up scroll depth tracking
const setupScrollTracking = (): void => {
  if (typeof window === 'undefined') return;

  let maxScroll = 0;
  const milestones = [25, 50, 75, 90, 100];
  const trackedMilestones = new Set<number>();

  const handleScroll = (): void => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercentage = Math.round((window.scrollY / scrollHeight) * 100);

    if (scrollPercentage > maxScroll) {
      maxScroll = scrollPercentage;

      milestones.forEach(milestone => {
        if (scrollPercentage >= milestone && !trackedMilestones.has(milestone)) {
          trackedMilestones.add(milestone);
          track('scroll_depth', { scroll_percentage: milestone });
        }
      });
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
};

// Set up time on page tracking
const setupTimeTracking = (): void => {
  if (typeof window === 'undefined') return;

  const startTime = Date.now();
  const milestones = [30, 60, 120, 300]; // seconds
  const trackedMilestones = new Set<number>();

  const checkTime = (): void => {
    const timeOnPage = Math.floor((Date.now() - startTime) / 1000);

    milestones.forEach(milestone => {
      if (timeOnPage >= milestone && !trackedMilestones.has(milestone)) {
        trackedMilestones.add(milestone);
        track('time_on_page', { time_on_page_seconds: milestone });
      }
    });
  };

  setInterval(checkTime, 5000);

  // Track time when leaving page
  window.addEventListener('beforeunload', () => {
    const timeOnPage = Math.floor((Date.now() - startTime) / 1000);
    track('time_on_page', {
      time_on_page_seconds: timeOnPage,
      is_exit: true,
    });
  });
};

/**
 * Conversion Funnel Tracking
 *
 * The Inclusiv conversion funnel:
 * 1. page_view (landing) - 100% baseline
 * 2. scan_started - ~15-25% expected
 * 3. scan_completed - ~12-20% expected (depends on scan success rate)
 * 4. email_captured - ~8-15% expected
 * 5. pricing_viewed - ~5-10% expected
 * 6. checkout_initiated - ~2-5% expected
 * 7. payment_completed - ~1-3% expected
 */

export const FUNNEL_STAGES = {
  LANDING: 'page_view',
  SCAN_STARTED: 'scan_started',
  SCAN_COMPLETED: 'scan_completed',
  EMAIL_CAPTURED: 'email_captured',
  PRICING_VIEWED: 'pricing_viewed',
  CHECKOUT_INITIATED: 'checkout_initiated',
  PAYMENT_COMPLETED: 'payment_completed',
} as const;

export const EXPECTED_FUNNEL_RATES = {
  [FUNNEL_STAGES.LANDING]: 100,
  [FUNNEL_STAGES.SCAN_STARTED]: 20,
  [FUNNEL_STAGES.SCAN_COMPLETED]: 16,
  [FUNNEL_STAGES.EMAIL_CAPTURED]: 10,
  [FUNNEL_STAGES.PRICING_VIEWED]: 7,
  [FUNNEL_STAGES.CHECKOUT_INITIATED]: 3,
  [FUNNEL_STAGES.PAYMENT_COMPLETED]: 2,
} as const;
