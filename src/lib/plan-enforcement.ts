/**
 * Plan Enforcement Utilities
 * Server-side helpers for enforcing plan limits and feature access
 */

import { getServerSession, Session } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';
import {
  getPlanLimits,
  isFeatureEnabled,
  SubscriptionTier,
  PlanLimits,
} from '@/lib/plan-limits';

export interface EnforcementResult {
  allowed: boolean;
  reason?: string;
  currentUsage?: number;
  limit?: number;
  upgradeRequired?: boolean;
  suggestedTier?: SubscriptionTier;
}

/**
 * Check if user can add a new site
 */
export async function canAddSite(userId: string, tier: SubscriptionTier): Promise<EnforcementResult> {
  const limits = getPlanLimits(tier);

  if (limits.sites === -1) {
    return { allowed: true };
  }

  const { count } = await supabaseAdmin
    .from('sites')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId);

  const currentUsage = count || 0;

  if (currentUsage >= limits.sites) {
    return {
      allowed: false,
      reason: `Your ${tier} plan allows up to ${limits.sites} site${limits.sites !== 1 ? 's' : ''}`,
      currentUsage,
      limit: limits.sites,
      upgradeRequired: true,
      suggestedTier: tier === 'free' ? 'starter' : 'professional',
    };
  }

  return { allowed: true, currentUsage, limit: limits.sites };
}

/**
 * Check if user can run a scan this month
 */
export async function canRunScan(userId: string, tier: SubscriptionTier): Promise<EnforcementResult> {
  const limits = getPlanLimits(tier);

  if (limits.scansPerMonth === -1) {
    return { allowed: true };
  }

  // Get start of current month
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const { count } = await supabaseAdmin
    .from('scans')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .gte('created_at', startOfMonth.toISOString());

  const currentUsage = count || 0;

  if (currentUsage >= limits.scansPerMonth) {
    return {
      allowed: false,
      reason: `You've used all ${limits.scansPerMonth} scans for this month`,
      currentUsage,
      limit: limits.scansPerMonth,
      upgradeRequired: true,
      suggestedTier: tier === 'free' ? 'starter' : 'professional',
    };
  }

  return { allowed: true, currentUsage, limit: limits.scansPerMonth };
}

/**
 * Check if a feature is available for the user's plan
 */
export function checkFeatureAccess(
  tier: SubscriptionTier,
  feature: keyof PlanLimits
): EnforcementResult {
  const enabled = isFeatureEnabled(tier, feature);

  if (!enabled) {
    const tierOrder: SubscriptionTier[] = ['free', 'starter', 'professional', 'enterprise'];
    const currentIndex = tierOrder.indexOf(tier);

    // Find the minimum tier that has this feature
    let suggestedTier: SubscriptionTier = 'enterprise';
    for (const checkTier of tierOrder.slice(currentIndex + 1)) {
      if (isFeatureEnabled(checkTier, feature)) {
        suggestedTier = checkTier;
        break;
      }
    }

    return {
      allowed: false,
      reason: `${feature} is not available on the ${tier} plan`,
      upgradeRequired: true,
      suggestedTier,
    };
  }

  return { allowed: true };
}

/**
 * Get user's current usage stats
 */
export async function getUserUsageStats(userId: string): Promise<{
  sites: number;
  scansThisMonth: number;
  totalScans: number;
}> {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const [sitesResult, scansThisMonthResult, totalScansResult] = await Promise.all([
    supabaseAdmin
      .from('sites')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId),
    supabaseAdmin
      .from('scans')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .gte('created_at', startOfMonth.toISOString()),
    supabaseAdmin
      .from('scans')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId),
  ]);

  return {
    sites: sitesResult.count || 0,
    scansThisMonth: scansThisMonthResult.count || 0,
    totalScans: totalScansResult.count || 0,
  };
}

/**
 * Middleware helper to check plan access for API routes
 */
export async function requirePlanFeature(
  feature: keyof PlanLimits
): Promise<{
  session: Session | null;
  allowed: boolean;
  error?: { message: string; status: number };
}> {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return {
      session: null,
      allowed: false,
      error: { message: 'Unauthorized', status: 401 },
    };
  }

  const tier = session.user.subscriptionTier as SubscriptionTier;
  const result = checkFeatureAccess(tier, feature);

  if (!result.allowed) {
    return {
      session,
      allowed: false,
      error: {
        message: `This feature requires a ${result.suggestedTier} plan or higher`,
        status: 403,
      },
    };
  }

  return { session, allowed: true };
}

/**
 * Middleware helper to check site/scan limits for API routes
 */
export async function requireWithinLimits(
  limitType: 'sites' | 'scans'
): Promise<{
  session: Session | null;
  allowed: boolean;
  error?: { message: string; status: number; code?: string };
  result?: EnforcementResult;
}> {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return {
      session: null,
      allowed: false,
      error: { message: 'Unauthorized', status: 401 },
    };
  }

  const tier = session.user.subscriptionTier as SubscriptionTier;
  const userId = session.user.id;

  const result = limitType === 'sites'
    ? await canAddSite(userId, tier)
    : await canRunScan(userId, tier);

  if (!result.allowed) {
    return {
      session,
      allowed: false,
      error: {
        message: result.reason || 'Limit exceeded',
        status: 403,
        code: limitType === 'sites' ? 'SITE_LIMIT_REACHED' : 'SCAN_LIMIT_REACHED',
      },
      result,
    };
  }

  return { session, allowed: true, result };
}
