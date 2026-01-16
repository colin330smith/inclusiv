'use client';

import { useState, useEffect } from 'react';
import { Clock, Zap, X } from 'lucide-react';

interface LimitedOfferBannerProps {
  offerEndDate?: Date;
  discountPercent?: number;
  couponCode?: string;
  onDismiss?: () => void;
}

const DISMISSED_KEY = 'inclusiv_offer_banner_dismissed';
const DISMISSED_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export default function LimitedOfferBanner({
  offerEndDate,
  discountPercent = 30,
  couponCode = 'LAUNCH30',
  onDismiss,
}: LimitedOfferBannerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Check if dismissed
    const dismissedAt = localStorage.getItem(DISMISSED_KEY);
    if (dismissedAt) {
      const dismissedTime = parseInt(dismissedAt, 10);
      if (Date.now() - dismissedTime < DISMISSED_DURATION) {
        return;
      }
    }

    setIsVisible(true);

    // Calculate end date - default to end of current week
    const endDate = offerEndDate || getEndOfWeek();

    const updateTimer = () => {
      const now = new Date();
      const diff = endDate.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [offerEndDate]);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem(DISMISSED_KEY, Date.now().toString());
    onDismiss?.();
  };

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white py-3 px-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-yellow-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 relative">
        {/* Offer text */}
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-300 animate-pulse" />
          <span className="font-bold text-lg">
            {discountPercent}% OFF Launch Special
          </span>
        </div>

        {/* Countdown timer */}
        <div className="flex items-center gap-2 bg-black/20 rounded-lg px-3 py-1.5">
          <Clock className="w-4 h-4" />
          <div className="flex items-center gap-1 font-mono text-sm">
            <TimeUnit value={timeLeft.hours} label="h" />
            <span className="text-white/60">:</span>
            <TimeUnit value={timeLeft.minutes} label="m" />
            <span className="text-white/60">:</span>
            <TimeUnit value={timeLeft.seconds} label="s" />
          </div>
        </div>

        {/* Coupon code */}
        <div className="flex items-center gap-2">
          <span className="text-white/80 text-sm hidden sm:inline">Use code:</span>
          <code className="bg-white/20 px-3 py-1 rounded font-bold text-sm">
            {couponCode}
          </code>
        </div>

        {/* Dismiss button */}
        <button
          onClick={handleDismiss}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded transition-colors"
          aria-label="Dismiss offer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <span className="tabular-nums">
      {value.toString().padStart(2, '0')}{label}
    </span>
  );
}

function getEndOfWeek(): Date {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const daysUntilSunday = 7 - dayOfWeek;
  const endOfWeek = new Date(now);
  endOfWeek.setDate(now.getDate() + daysUntilSunday);
  endOfWeek.setHours(23, 59, 59, 999);
  return endOfWeek;
}
