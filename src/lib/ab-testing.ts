/**
 * Lightweight A/B Testing Library
 *
 * Creates persistent test variants for users and tracks conversions
 * Stores variant assignment in localStorage for consistency
 */

export interface ABTest {
  id: string;
  variants: string[];
  weights?: number[]; // Optional weights for each variant (must sum to 1)
}

export interface ABTestResult {
  variant: string;
  testId: string;
}

const AB_TEST_PREFIX = 'inclusiv_ab_';
const AB_CONVERSION_PREFIX = 'inclusiv_ab_conv_';

/**
 * Get or assign a variant for a user
 */
export function getVariant(test: ABTest): ABTestResult {
  if (typeof window === 'undefined') {
    // SSR - return first variant as default
    return { variant: test.variants[0], testId: test.id };
  }

  const storageKey = `${AB_TEST_PREFIX}${test.id}`;

  // Check if user already has a variant assigned
  const existingVariant = localStorage.getItem(storageKey);
  if (existingVariant && test.variants.includes(existingVariant)) {
    return { variant: existingVariant, testId: test.id };
  }

  // Assign a new variant
  const variant = selectVariant(test);
  localStorage.setItem(storageKey, variant);

  // Track variant assignment in analytics
  trackEvent('ab_test_assigned', {
    test_id: test.id,
    variant,
  });

  return { variant, testId: test.id };
}

/**
 * Select a variant based on weights or equal distribution
 */
function selectVariant(test: ABTest): string {
  const random = Math.random();

  if (test.weights) {
    let cumulative = 0;
    for (let i = 0; i < test.variants.length; i++) {
      cumulative += test.weights[i];
      if (random < cumulative) {
        return test.variants[i];
      }
    }
  }

  // Equal distribution
  const index = Math.floor(random * test.variants.length);
  return test.variants[index];
}

/**
 * Track a conversion for an A/B test
 */
export function trackConversion(testId: string, conversionType: string = 'conversion'): void {
  if (typeof window === 'undefined') return;

  const storageKey = `${AB_TEST_PREFIX}${testId}`;
  const variant = localStorage.getItem(storageKey);

  if (!variant) return;

  // Prevent duplicate conversion tracking
  const convKey = `${AB_CONVERSION_PREFIX}${testId}_${conversionType}`;
  if (localStorage.getItem(convKey)) return;

  localStorage.setItem(convKey, Date.now().toString());

  // Track in analytics
  trackEvent('ab_test_conversion', {
    test_id: testId,
    variant,
    conversion_type: conversionType,
  });
}

/**
 * Track an event (integrates with Plausible and GA)
 */
function trackEvent(eventName: string, properties: Record<string, string>): void {
  if (typeof window === 'undefined') return;

  // Plausible
  const win = window as unknown as {
    plausible?: (event: string, options?: { props: Record<string, string> }) => void;
    gtag?: (command: string, eventName: string, params: Record<string, string>) => void;
  };

  win.plausible?.(eventName, { props: properties });

  // Google Analytics
  win.gtag?.('event', eventName, properties);
}

/**
 * Hook for using A/B tests in React components
 */
export function useABTest(test: ABTest): ABTestResult {
  // For SSR, return first variant
  if (typeof window === 'undefined') {
    return { variant: test.variants[0], testId: test.id };
  }

  return getVariant(test);
}

// ==========================================
// Pre-defined A/B Tests
// ==========================================

export const AB_TESTS = {
  // Homepage headline test
  homepage_headline: {
    id: 'homepage_headline_v1',
    variants: [
      'control', // "Free EAA Accessibility Scanner"
      'urgency', // "EAA Deadline Passed - Check Compliance Now"
      'benefit', // "Avoid €100K Fines - Free Compliance Scan"
    ],
  } as ABTest,

  // CTA button text test
  cta_button: {
    id: 'cta_button_v1',
    variants: [
      'scan_now',      // "Scan Your Site"
      'check_free',    // "Check Free"
      'start_scan',    // "Start Free Scan"
      'get_report',    // "Get Free Report"
    ],
  } as ABTest,

  // Pricing page layout test
  pricing_layout: {
    id: 'pricing_layout_v1',
    variants: [
      'cards',         // Current card layout
      'comparison',    // Side-by-side comparison
    ],
  } as ABTest,

  // Social proof display test
  social_proof: {
    id: 'social_proof_v1',
    variants: [
      'toast',         // Toast notifications
      'inline',        // Inline stats
      'none',          // No social proof
    ],
  } as ABTest,

  // Urgency messaging test
  urgency_level: {
    id: 'urgency_level_v1',
    variants: [
      'low',           // Subtle urgency
      'medium',        // Moderate urgency
      'high',          // Strong urgency
    ],
  } as ABTest,

  // Post-scan CTA test
  post_scan_cta: {
    id: 'post_scan_cta_v1',
    variants: [
      'immediate',     // Show immediately after scan
      'delayed',       // Show after 3 seconds
      'scroll',        // Show on scroll
    ],
  } as ABTest,
};
