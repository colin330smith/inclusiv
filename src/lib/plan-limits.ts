/**
 * Plan Limits and Feature Enforcement
 * Centralized configuration for plan-based feature restrictions
 */

export type SubscriptionTier = 'free' | 'starter' | 'professional' | 'enterprise';

export interface PlanLimits {
  sites: number; // -1 = unlimited
  scansPerMonth: number; // -1 = unlimited
  pagesPerScan: number;
  aiFixSuggestions: boolean;
  aiAutoFixes: boolean;
  apiAccess: boolean;
  customReports: boolean;
  complianceCertificates: boolean;
  whiteLabel: boolean;
  scheduledScans: boolean;
  prioritySupport: boolean;
  sla: boolean;
}

export const PLAN_LIMITS: Record<SubscriptionTier, PlanLimits> = {
  free: {
    sites: 1,
    scansPerMonth: 3,
    pagesPerScan: 5,
    aiFixSuggestions: false,
    aiAutoFixes: false,
    apiAccess: false,
    customReports: false,
    complianceCertificates: false,
    whiteLabel: false,
    scheduledScans: false,
    prioritySupport: false,
    sla: false,
  },
  starter: {
    sites: 5,
    scansPerMonth: 100,
    pagesPerScan: 50,
    aiFixSuggestions: true,
    aiAutoFixes: false,
    apiAccess: false,
    customReports: true,
    complianceCertificates: true,
    whiteLabel: false,
    scheduledScans: true,
    prioritySupport: false,
    sla: false,
  },
  professional: {
    sites: -1, // unlimited
    scansPerMonth: -1, // unlimited
    pagesPerScan: 500,
    aiFixSuggestions: true,
    aiAutoFixes: true,
    apiAccess: true,
    customReports: true,
    complianceCertificates: true,
    whiteLabel: false,
    scheduledScans: true,
    prioritySupport: true,
    sla: false,
  },
  enterprise: {
    sites: -1, // unlimited
    scansPerMonth: -1, // unlimited
    pagesPerScan: -1, // unlimited
    aiFixSuggestions: true,
    aiAutoFixes: true,
    apiAccess: true,
    customReports: true,
    complianceCertificates: true,
    whiteLabel: true,
    scheduledScans: true,
    prioritySupport: true,
    sla: true,
  },
};

export function getPlanLimits(tier: SubscriptionTier): PlanLimits {
  return PLAN_LIMITS[tier] || PLAN_LIMITS.free;
}

export function isFeatureEnabled(tier: SubscriptionTier, feature: keyof PlanLimits): boolean {
  const limits = getPlanLimits(tier);
  const value = limits[feature];

  // For numeric limits, check if > 0 or -1 (unlimited)
  if (typeof value === 'number') {
    return value !== 0;
  }

  return value === true;
}

export function getLimit(tier: SubscriptionTier, limitKey: 'sites' | 'scansPerMonth' | 'pagesPerScan'): number {
  const limits = getPlanLimits(tier);
  return limits[limitKey];
}

export function isWithinLimit(
  tier: SubscriptionTier,
  limitKey: 'sites' | 'scansPerMonth' | 'pagesPerScan',
  currentUsage: number
): boolean {
  const limit = getLimit(tier, limitKey);
  if (limit === -1) return true; // unlimited
  return currentUsage < limit;
}

/**
 * Feature-to-minimum-tier mapping for upgrade prompts
 */
export const FEATURE_MIN_TIER: Record<string, SubscriptionTier> = {
  aiFixSuggestions: 'starter',
  aiAutoFixes: 'professional',
  apiAccess: 'professional',
  customReports: 'starter',
  complianceCertificates: 'starter',
  whiteLabel: 'enterprise',
  scheduledScans: 'starter',
  prioritySupport: 'professional',
  sla: 'enterprise',
};

export function getMinimumTierForFeature(feature: string): SubscriptionTier | null {
  return FEATURE_MIN_TIER[feature] || null;
}

/**
 * Plan pricing for display
 */
export const PLAN_PRICING = {
  free: { monthly: 0, yearly: 0 },
  starter: { monthly: 29, yearly: 290 }, // ~17% discount
  professional: { monthly: 79, yearly: 790 }, // ~17% discount
  enterprise: { monthly: null, yearly: null }, // custom pricing
};

/**
 * Plan display names and descriptions
 */
export const PLAN_INFO: Record<SubscriptionTier, { name: string; tagline: string }> = {
  free: { name: 'Free', tagline: 'Get started with basic scanning' },
  starter: { name: 'Starter', tagline: 'For small teams and agencies' },
  professional: { name: 'Professional', tagline: 'For growing businesses' },
  enterprise: { name: 'Enterprise', tagline: 'For large organizations' },
};
