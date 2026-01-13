"use client";

import { useEffect } from "react";
import { trackPricingViewed, initAnalytics, trackCtaClick, trackCheckoutInitiated } from "@/lib/analytics";

type PricingTrackerProps = {
  planName?: string;
};

export default function PricingTracker({ planName }: PricingTrackerProps) {
  useEffect(() => {
    // Initialize analytics
    initAnalytics();

    // Track pricing page view
    trackPricingViewed(planName);
  }, [planName]);

  return null;
}

// Helper component for tracking plan CTA clicks
export function PlanCtaTracker({
  planName,
  planPrice,
  ctaText,
  children,
  onClick,
}: {
  planName: string;
  planPrice: number;
  ctaText: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  const handleClick = () => {
    trackCtaClick(`plan_${planName.toLowerCase()}`, ctaText, "pricing_page", `/#scanner`);

    if (planName !== "Free") {
      trackCheckoutInitiated(planName, planPrice, "EUR");
    }

    if (onClick) {
      onClick();
    }
  };

  return (
    <div onClick={handleClick}>
      {children}
    </div>
  );
}
