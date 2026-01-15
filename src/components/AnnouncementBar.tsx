'use client';

import { useState, useEffect } from 'react';
import { X, AlertTriangle, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const DISMISSED_KEY = 'inclusiv_announcement_dismissed';
const DISMISSED_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(false);
  const [daysEnforced, setDaysEnforced] = useState(0);

  useEffect(() => {
    // Check if dismissed
    const dismissedAt = localStorage.getItem(DISMISSED_KEY);
    if (dismissedAt) {
      const dismissedTime = parseInt(dismissedAt, 10);
      if (Date.now() - dismissedTime < DISMISSED_DURATION) {
        return;
      }
    }

    // Calculate days since EAA enforcement
    const eaaDate = new Date('2025-06-28');
    const now = new Date();
    const days = Math.floor((now.getTime() - eaaDate.getTime()) / (1000 * 60 * 60 * 24));
    setDaysEnforced(Math.max(0, days));

    // Only show on marketing pages
    const path = window.location.pathname;
    if (!path.includes('/dashboard') && !path.includes('/auth')) {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem(DISMISSED_KEY, Date.now().toString());
  };

  if (!isVisible) return null;

  return (
    <div className="sticky top-0 z-50 bg-gradient-to-r from-red-600 via-orange-500 to-red-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between gap-4 py-2.5">
          {/* Main message */}
          <div className="flex items-center gap-3 text-sm flex-1 justify-center">
            <AlertTriangle className="w-4 h-4 flex-shrink-0 animate-pulse" />
            <span className="hidden sm:inline">
              <strong>EAA Enforcement Active!</strong> Non-compliant websites now face €100,000 fines.
            </span>
            <span className="sm:hidden">
              <strong>EAA Active!</strong> Fines now enforced.
            </span>

            {daysEnforced > 0 && (
              <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 bg-black/20 rounded-full text-xs">
                <Clock className="w-3 h-3" />
                {daysEnforced} days since deadline
              </span>
            )}

            <Link
              href="/pricing"
              className="inline-flex items-center gap-1 px-3 py-1 bg-white text-red-600 font-semibold rounded-full text-xs hover:bg-zinc-100 transition-colors ml-2"
            >
              Get Compliant
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Dismiss button */}
          <button
            onClick={handleDismiss}
            className="p-1 hover:bg-white/10 rounded transition-colors flex-shrink-0"
            aria-label="Dismiss announcement"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
