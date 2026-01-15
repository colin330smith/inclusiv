'use client';

import { useState, useEffect, ReactNode } from 'react';
import { ABTest as ABTestType, getVariant, trackConversion } from '@/lib/ab-testing';

interface ABTestProps {
  test: ABTestType;
  children: (variant: string, trackConversion: () => void) => ReactNode;
}

/**
 * A/B Test Component
 *
 * Usage:
 * ```tsx
 * <ABTest test={AB_TESTS.cta_button}>
 *   {(variant, track) => (
 *     <button onClick={() => { track(); handleClick(); }}>
 *       {variant === 'scan_now' ? 'Scan Now' : 'Check Free'}
 *     </button>
 *   )}
 * </ABTest>
 * ```
 */
export function ABTest({ test, children }: ABTestProps) {
  const [variant, setVariant] = useState<string>(test.variants[0]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const result = getVariant(test);
    setVariant(result.variant);
  }, [test]);

  const track = (conversionType: string = 'click') => {
    trackConversion(test.id, conversionType);
  };

  // During SSR/hydration, render the control variant
  if (!isClient) {
    return <>{children(test.variants[0], () => {})}</>;
  }

  return <>{children(variant, track)}</>;
}

interface VariantProps {
  test: ABTestType;
  variant: string;
  children: ReactNode;
}

/**
 * Render content only for a specific variant
 *
 * Usage:
 * ```tsx
 * <Variant test={AB_TESTS.headline} variant="urgency">
 *   <h1>EAA Deadline Passed - Check Compliance Now</h1>
 * </Variant>
 * ```
 */
export function Variant({ test, variant, children }: VariantProps) {
  const [currentVariant, setCurrentVariant] = useState<string | null>(null);

  useEffect(() => {
    const result = getVariant(test);
    setCurrentVariant(result.variant);
  }, [test]);

  if (currentVariant !== variant) {
    return null;
  }

  return <>{children}</>;
}

interface ABTestButtonProps {
  test: ABTestType;
  variants: Record<string, {
    text: string;
    className?: string;
  }>;
  onClick: () => void;
  baseClassName?: string;
}

/**
 * Pre-built A/B tested button component
 */
export function ABTestButton({
  test,
  variants,
  onClick,
  baseClassName = '',
}: ABTestButtonProps) {
  const [currentVariant, setCurrentVariant] = useState<string>(test.variants[0]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const result = getVariant(test);
    setCurrentVariant(result.variant);
  }, [test]);

  const handleClick = () => {
    trackConversion(test.id, 'click');
    onClick();
  };

  const variantConfig = variants[currentVariant] || variants[test.variants[0]];

  // Prevent hydration mismatch by using control during SSR
  if (!isClient) {
    const controlConfig = variants[test.variants[0]];
    return (
      <button
        className={`${baseClassName} ${controlConfig.className || ''}`}
        onClick={handleClick}
      >
        {controlConfig.text}
      </button>
    );
  }

  return (
    <button
      className={`${baseClassName} ${variantConfig.className || ''}`}
      onClick={handleClick}
    >
      {variantConfig.text}
    </button>
  );
}

/**
 * Hook for A/B testing with hydration safety
 */
export function useABTest(test: ABTestType): {
  variant: string;
  isReady: boolean;
  trackConversion: (type?: string) => void;
} {
  const [variant, setVariant] = useState<string>(test.variants[0]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const result = getVariant(test);
    setVariant(result.variant);
    setIsReady(true);
  }, [test]);

  const track = (conversionType: string = 'conversion') => {
    trackConversion(test.id, conversionType);
  };

  return { variant, isReady, trackConversion: track };
}
