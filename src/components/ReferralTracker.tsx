'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

/**
 * Tracks referral codes from URL parameters and stores them in cookies
 * This component should be added to the root layout
 */
export default function ReferralTracker() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const referralCode = searchParams.get('ref');

    if (referralCode) {
      // Store in cookie via API
      fetch('/api/referrals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ referralCode }),
      }).catch(console.error);

      // Also store in localStorage as backup
      localStorage.setItem('referral_code', referralCode);
      localStorage.setItem('referral_timestamp', Date.now().toString());

      // Track referral visit in analytics
      if (typeof window !== 'undefined' && 'gtag' in window) {
        // @ts-expect-error gtag exists
        window.gtag('event', 'referral_visit', {
          referral_code: referralCode,
        });
      }
    }
  }, [searchParams]);

  return null;
}

/**
 * Get the stored referral code (client-side)
 */
export function getStoredReferralCode(): string | null {
  if (typeof window === 'undefined') return null;

  const code = localStorage.getItem('referral_code');
  const timestamp = localStorage.getItem('referral_timestamp');

  if (!code || !timestamp) return null;

  // Check if referral is still valid (30 days)
  const thirtyDaysMs = 30 * 24 * 60 * 60 * 1000;
  if (Date.now() - parseInt(timestamp) > thirtyDaysMs) {
    localStorage.removeItem('referral_code');
    localStorage.removeItem('referral_timestamp');
    return null;
  }

  return code;
}

/**
 * Clear stored referral code (after successful conversion)
 */
export function clearStoredReferralCode(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('referral_code');
  localStorage.removeItem('referral_timestamp');
}
