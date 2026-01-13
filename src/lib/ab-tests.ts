// A/B Testing Framework for Inclusiv
// Simple client-side A/B test configuration

export type ABTestVariant = {
  id: string;
  weight: number; // Percentage weight (0-100)
};

export type ABTest = {
  id: string;
  name: string;
  variants: ABTestVariant[];
  enabled: boolean;
};

// Headline Variants
export const HEADLINE_VARIANTS = {
  control: "Is your website accessible?",
  urgency: "Your website may be breaking EU law",
  risk: "Avoid €100K fines: Check your accessibility now",
  benefit: "Get compliant in days, not months",
  question: "Will your site pass the EAA audit?",
} as const;

// CTA Button Variants
export const CTA_VARIANTS = {
  control: {
    text: "Check Compliance Now",
    color: "from-indigo-600 to-indigo-500",
    hoverColor: "hover:from-indigo-500 hover:to-indigo-400",
  },
  urgency: {
    text: "Scan Before It's Too Late",
    color: "from-red-600 to-red-500",
    hoverColor: "hover:from-red-500 hover:to-red-400",
  },
  free: {
    text: "Get Free Scan",
    color: "from-green-600 to-green-500",
    hoverColor: "hover:from-green-500 hover:to-green-400",
  },
  action: {
    text: "Find My Issues Now",
    color: "from-orange-600 to-orange-500",
    hoverColor: "hover:from-orange-500 hover:to-orange-400",
  },
} as const;

// Social Proof Number Variants
export const SOCIAL_PROOF_VARIANTS = {
  control: {
    scansCompleted: 2847,
    companiesTrusted: 500,
    complianceRate: 94,
  },
  high: {
    scansCompleted: 12847,
    companiesTrusted: 1200,
    complianceRate: 97,
  },
  medium: {
    scansCompleted: 5432,
    companiesTrusted: 750,
    complianceRate: 95,
  },
} as const;

// A/B Test Configuration
export const AB_TESTS: ABTest[] = [
  {
    id: "headline_test",
    name: "Headline Optimization",
    variants: [
      { id: "control", weight: 25 },
      { id: "urgency", weight: 25 },
      { id: "risk", weight: 25 },
      { id: "benefit", weight: 25 },
    ],
    enabled: true,
  },
  {
    id: "cta_test",
    name: "CTA Button Optimization",
    variants: [
      { id: "control", weight: 25 },
      { id: "urgency", weight: 25 },
      { id: "free", weight: 25 },
      { id: "action", weight: 25 },
    ],
    enabled: true,
  },
  {
    id: "social_proof_test",
    name: "Social Proof Numbers",
    variants: [
      { id: "control", weight: 34 },
      { id: "high", weight: 33 },
      { id: "medium", weight: 33 },
    ],
    enabled: true,
  },
];

// Get or create a user's test variant assignment
export function getVariantAssignment(testId: string): string {
  if (typeof window === "undefined") return "control";

  const storageKey = `ab_test_${testId}`;
  const stored = localStorage.getItem(storageKey);

  if (stored) return stored;

  const test = AB_TESTS.find((t) => t.id === testId);
  if (!test || !test.enabled) return "control";

  // Weighted random selection
  const random = Math.random() * 100;
  let cumulative = 0;

  for (const variant of test.variants) {
    cumulative += variant.weight;
    if (random <= cumulative) {
      localStorage.setItem(storageKey, variant.id);
      return variant.id;
    }
  }

  localStorage.setItem(storageKey, "control");
  return "control";
}

// Hook for getting AB test variants
export function useABTest(testId: string): string {
  if (typeof window === "undefined") return "control";
  return getVariantAssignment(testId);
}

// Track conversion event
export function trackConversion(testId: string, eventName: string): void {
  if (typeof window === "undefined") return;

  const variant = localStorage.getItem(`ab_test_${testId}`) || "control";

  // Send to analytics (placeholder - integrate with your analytics)
  console.log(`[AB Test] ${testId} - ${variant} - ${eventName}`);

  // You can integrate with:
  // - Google Analytics 4
  // - Mixpanel
  // - PostHog
  // - Amplitude

  // Example GA4 integration:
  // gtag('event', eventName, {
  //   test_id: testId,
  //   variant: variant,
  // });
}

// Get all active experiments for a user
export function getActiveExperiments(): Record<string, string> {
  if (typeof window === "undefined") return {};

  const experiments: Record<string, string> = {};

  AB_TESTS.forEach((test) => {
    if (test.enabled) {
      experiments[test.id] = getVariantAssignment(test.id);
    }
  });

  return experiments;
}

// Reset all experiments (useful for testing)
export function resetAllExperiments(): void {
  if (typeof window === "undefined") return;

  AB_TESTS.forEach((test) => {
    localStorage.removeItem(`ab_test_${test.id}`);
  });
}
