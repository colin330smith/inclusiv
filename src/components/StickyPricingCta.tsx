'use client';

import { useState, useEffect } from 'react';
import { Zap, ArrowRight, X } from 'lucide-react';
import Link from 'next/link';

interface StickyPricingCtaProps {
  showAfterScroll?: number; // pixels to scroll before showing
  message?: string;
  ctaText?: string;
  ctaLink?: string;
  price?: string;
}

const DISMISSED_KEY = 'inclusiv_sticky_cta_dismissed';
const DISMISSED_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export default function StickyPricingCta({
  showAfterScroll = 500,
  message = 'Get full WCAG compliance',
  ctaText = 'View Plans',
  ctaLink = '/pricing',
  price = 'from €49/mo',
}: StickyPricingCtaProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if dismissed recently
    const dismissedAt = localStorage.getItem(DISMISSED_KEY);
    if (dismissedAt) {
      const dismissedTime = parseInt(dismissedAt, 10);
      if (Date.now() - dismissedTime < DISMISSED_DURATION) {
        setIsDismissed(true);
        return;
      }
    }

    const handleScroll = () => {
      // Don't show on pricing page
      if (window.location.pathname.includes('/pricing')) {
        setIsVisible(false);
        return;
      }

      // Don't show on dashboard
      if (window.location.pathname.includes('/dashboard')) {
        setIsVisible(false);
        return;
      }

      if (window.scrollY > showAfterScroll) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [showAfterScroll]);

  const handleDismiss = () => {
    setIsDismissed(true);
    localStorage.setItem(DISMISSED_KEY, Date.now().toString());
  };

  const handleCtaClick = () => {
    if (typeof window !== 'undefined') {
      const win = window as unknown as { plausible?: (event: string, options?: object) => void };
      win.plausible?.('Sticky CTA Clicked', {
        props: { destination: ctaLink },
      });
    }
  };

  if (isDismissed || !isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 animate-slideUp">
      <div className="bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 border-t border-zinc-700 shadow-2xl shadow-black/50">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Message */}
            <div className="flex items-center gap-3 flex-1">
              <div className="hidden sm:flex items-center justify-center w-10 h-10 bg-indigo-500/20 rounded-lg">
                <Zap className="w-5 h-5 text-indigo-400" />
              </div>
              <div className="hidden sm:block">
                <p className="text-white font-medium">{message}</p>
                <p className="text-zinc-400 text-sm">
                  14-day free trial • No credit card required
                </p>
              </div>
              <p className="sm:hidden text-white text-sm font-medium">{message}</p>
            </div>

            {/* CTA */}
            <div className="flex items-center gap-3">
              <div className="hidden md:block text-right">
                <span className="text-indigo-400 font-semibold">{price}</span>
              </div>
              <Link
                href={ctaLink}
                onClick={handleCtaClick}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-lg transition-all shadow-lg whitespace-nowrap"
              >
                {ctaText}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={handleDismiss}
                className="p-2 hover:bg-zinc-700 rounded-lg transition-colors"
                aria-label="Dismiss"
              >
                <X className="w-4 h-4 text-zinc-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
