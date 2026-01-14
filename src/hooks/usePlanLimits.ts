'use client';

import { useSession } from 'next-auth/react';
import { useMemo } from 'react';
import {
  getPlanLimits,
  isFeatureEnabled,
  SubscriptionTier,
  PlanLimits,
  PLAN_INFO,
  PLAN_PRICING,
} from '@/lib/plan-limits';

export interface UsePlanLimitsReturn {
  tier: SubscriptionTier;
  limits: PlanLimits;
  planName: string;
  planTagline: string;
  pricing: { monthly: number | null; yearly: number | null };
  isFreePlan: boolean;
  isPaidPlan: boolean;
  hasFeature: (feature: keyof PlanLimits) => boolean;
  canAddMoreSites: (currentCount: number) => boolean;
  canRunMoreScans: (currentMonthCount: number) => boolean;
  getRemainingScans: (currentMonthCount: number) => number | 'unlimited';
  getRemainingSites: (currentCount: number) => number | 'unlimited';
}

export function usePlanLimits(): UsePlanLimitsReturn {
  const { data: session } = useSession();

  const tier = (session?.user?.subscriptionTier as SubscriptionTier) || 'free';

  const result = useMemo(() => {
    const limits = getPlanLimits(tier);
    const planInfo = PLAN_INFO[tier];
    const pricing = PLAN_PRICING[tier];

    return {
      tier,
      limits,
      planName: planInfo.name,
      planTagline: planInfo.tagline,
      pricing,
      isFreePlan: tier === 'free',
      isPaidPlan: tier !== 'free',

      hasFeature: (feature: keyof PlanLimits): boolean => {
        return isFeatureEnabled(tier, feature);
      },

      canAddMoreSites: (currentCount: number): boolean => {
        if (limits.sites === -1) return true;
        return currentCount < limits.sites;
      },

      canRunMoreScans: (currentMonthCount: number): boolean => {
        if (limits.scansPerMonth === -1) return true;
        return currentMonthCount < limits.scansPerMonth;
      },

      getRemainingScans: (currentMonthCount: number): number | 'unlimited' => {
        if (limits.scansPerMonth === -1) return 'unlimited';
        return Math.max(0, limits.scansPerMonth - currentMonthCount);
      },

      getRemainingSites: (currentCount: number): number | 'unlimited' => {
        if (limits.sites === -1) return 'unlimited';
        return Math.max(0, limits.sites - currentCount);
      },
    };
  }, [tier]);

  return result;
}

/**
 * Hook for checking a specific feature
 */
export function useFeatureAccess(feature: keyof PlanLimits) {
  const { hasFeature, tier } = usePlanLimits();

  return {
    hasAccess: hasFeature(feature),
    currentTier: tier,
  };
}
