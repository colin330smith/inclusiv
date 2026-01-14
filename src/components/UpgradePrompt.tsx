'use client';

import Link from 'next/link';
import { Crown, Zap, ArrowRight, X } from 'lucide-react';
import { useState } from 'react';
import { SubscriptionTier, PLAN_INFO, PLAN_PRICING } from '@/lib/plan-limits';

interface UpgradePromptProps {
  feature: string;
  currentTier: SubscriptionTier;
  requiredTier: SubscriptionTier;
  title?: string;
  description?: string;
  variant?: 'inline' | 'modal' | 'banner';
  onDismiss?: () => void;
}

export function UpgradePrompt({
  feature,
  currentTier,
  requiredTier,
  title,
  description,
  variant = 'inline',
  onDismiss,
}: UpgradePromptProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const requiredPlanInfo = PLAN_INFO[requiredTier];
  const requiredPricing = PLAN_PRICING[requiredTier];

  const handleDismiss = () => {
    setDismissed(true);
    onDismiss?.();
  };

  const defaultTitle = title || `Unlock ${feature}`;
  const defaultDescription = description ||
    `${feature} is available on the ${requiredPlanInfo.name} plan and above.`;

  if (variant === 'banner') {
    return (
      <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-xl p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center">
              <Crown className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <p className="text-white font-medium">{defaultTitle}</p>
              <p className="text-sm text-zinc-400">{defaultDescription}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/pricing"
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-colors"
            >
              Upgrade
              <ArrowRight className="w-4 h-4" />
            </Link>
            {onDismiss && (
              <button
                onClick={handleDismiss}
                className="p-2 text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'modal') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-indigo-500/10 flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-indigo-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{defaultTitle}</h3>
            <p className="text-zinc-400 mb-6">{defaultDescription}</p>

            <div className="bg-zinc-800/50 rounded-lg p-4 mb-6">
              <p className="text-sm text-zinc-500 mb-1">{requiredPlanInfo.name} Plan</p>
              {requiredPricing.monthly ? (
                <p className="text-2xl font-bold text-white">
                  ${requiredPricing.monthly}
                  <span className="text-sm font-normal text-zinc-500">/month</span>
                </p>
              ) : (
                <p className="text-2xl font-bold text-white">Custom Pricing</p>
              )}
              <p className="text-xs text-zinc-500 mt-1">{requiredPlanInfo.tagline}</p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleDismiss}
                className="flex-1 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors"
              >
                Maybe Later
              </button>
              <Link
                href="/pricing"
                className="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                View Plans
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default inline variant
  return (
    <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-4">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center flex-shrink-0">
          <Crown className="w-4 h-4 text-indigo-400" />
        </div>
        <div className="flex-1">
          <p className="text-white font-medium">{defaultTitle}</p>
          <p className="text-sm text-zinc-400 mt-1">{defaultDescription}</p>
          <Link
            href="/pricing"
            className="inline-flex items-center gap-1 text-sm text-indigo-400 hover:text-indigo-300 mt-2"
          >
            Upgrade to {requiredPlanInfo.name}
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}

/**
 * Feature gate component - shows children if user has access, otherwise shows upgrade prompt
 */
interface FeatureGateProps {
  feature: string;
  requiredTier: SubscriptionTier;
  currentTier: SubscriptionTier;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function FeatureGate({
  feature,
  requiredTier,
  currentTier,
  children,
  fallback,
}: FeatureGateProps) {
  const tierOrder: SubscriptionTier[] = ['free', 'starter', 'professional', 'enterprise'];
  const currentIndex = tierOrder.indexOf(currentTier);
  const requiredIndex = tierOrder.indexOf(requiredTier);

  const hasAccess = currentIndex >= requiredIndex;

  if (hasAccess) {
    return <>{children}</>;
  }

  if (fallback) {
    return <>{fallback}</>;
  }

  return (
    <UpgradePrompt
      feature={feature}
      currentTier={currentTier}
      requiredTier={requiredTier}
    />
  );
}
