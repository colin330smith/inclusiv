"use client";

import { useState, useEffect } from "react";
import { X, Sparkles, Clock } from "lucide-react";

interface LaunchDiscountBannerProps {
  discountCode?: string;
  discountPercent?: number;
  endDate?: Date;
  onClose?: () => void;
}

export default function LaunchDiscountBanner({
  discountCode = "LAUNCH30",
  discountPercent = 30,
  endDate = new Date("2025-02-28T23:59:59"),
  onClose,
}: LaunchDiscountBannerProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isVisible, setIsVisible] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // Check if banner was dismissed
    const dismissed = localStorage.getItem("launch_banner_dismissed");
    if (dismissed === "true") {
      setIsVisible(false);
    }

    // Auto-apply the coupon code when banner is shown
    localStorage.setItem("applied_coupon", discountCode);
  }, [discountCode]);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const end = endDate.getTime();
      const distance = end - now;

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem("launch_banner_dismissed", "true");
    onClose?.();
  };

  if (!isVisible || !isMounted) return null;

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white">
      {/* Animated background shimmer */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />

      <div className="relative max-w-6xl mx-auto px-6 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
            <span className="font-bold text-lg">
              Launch Special: {discountPercent}% OFF
            </span>
          </div>

          <div className="hidden sm:block w-px h-6 bg-white/30" />

          <div className="flex items-center gap-2">
            <span className="text-sm opacity-90">Use code:</span>
            <code className="px-3 py-1 bg-white/20 rounded-lg font-mono font-bold text-yellow-200">
              {discountCode}
            </code>
          </div>

          <div className="hidden sm:block w-px h-6 bg-white/30" />

          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4" />
            <span>Ends in:</span>
            <div className="flex gap-1 font-mono font-bold">
              <span className="px-2 py-1 bg-black/20 rounded">{timeLeft.days}d</span>
              <span className="px-2 py-1 bg-black/20 rounded">{timeLeft.hours}h</span>
              <span className="px-2 py-1 bg-black/20 rounded">{timeLeft.minutes}m</span>
              <span className="px-2 py-1 bg-black/20 rounded">{timeLeft.seconds}s</span>
            </div>
          </div>
        </div>

        <button
          onClick={handleClose}
          className="absolute top-1/2 right-4 -translate-y-1/2 p-1 hover:bg-white/10 rounded-full transition-colors"
          aria-label="Dismiss banner"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
