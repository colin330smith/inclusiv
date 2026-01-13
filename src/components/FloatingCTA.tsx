"use client";

import { useState, useEffect } from "react";
import { X, Shield, ArrowRight, Zap } from "lucide-react";
import Link from "next/link";

interface FloatingCTAProps {
  showDelay?: number; // Delay before showing the bar
  scrollThreshold?: number; // How far user must scroll before showing
}

const CTA_DISMISSED_KEY = "inclusiv_floating_cta_dismissed";
const CTA_DISMISSED_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export default function FloatingCTA({
  showDelay = 5000,
  scrollThreshold = 300
}: FloatingCTAProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [delayPassed, setDelayPassed] = useState(false);

  useEffect(() => {
    // Check if CTA was recently dismissed
    const dismissedAt = localStorage.getItem(CTA_DISMISSED_KEY);
    if (dismissedAt) {
      const dismissedTime = parseInt(dismissedAt, 10);
      if (Date.now() - dismissedTime < CTA_DISMISSED_DURATION) {
        return; // Don't show if dismissed within the last 24 hours
      }
    }

    // Set up delay timer
    const delayTimer = setTimeout(() => {
      setDelayPassed(true);
    }, showDelay);

    // Set up scroll listener
    const handleScroll = () => {
      if (window.scrollY > scrollThreshold) {
        setHasScrolled(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Check initial scroll position
    if (window.scrollY > scrollThreshold) {
      setHasScrolled(true);
    }

    return () => {
      clearTimeout(delayTimer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [showDelay, scrollThreshold]);

  // Show when both conditions are met
  useEffect(() => {
    if (delayPassed && hasScrolled) {
      setIsVisible(true);
    }
  }, [delayPassed, hasScrolled]);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem(CTA_DISMISSED_KEY, Date.now().toString());
  };

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 transition-transform duration-300 ${
        isMinimized ? "translate-y-[calc(100%-48px)]" : "translate-y-0"
      }`}
    >
      {/* Minimize handle */}
      <button
        onClick={handleMinimize}
        className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-3 bg-zinc-800 border border-zinc-700 rounded-t-lg flex items-center justify-center hover:bg-zinc-700 transition-colors"
        aria-label={isMinimized ? "Expand" : "Minimize"}
      >
        <div className="w-6 h-1 bg-zinc-600 rounded-full" />
      </button>

      {/* Main bar */}
      <div className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 border-t border-indigo-400/30 shadow-lg shadow-indigo-500/20">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Left content */}
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full">
                <Zap className="w-4 h-4 text-yellow-300" />
                <span className="text-white/90 text-sm font-medium">Free Tool</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-white/90" />
                <span className="text-white font-semibold">
                  Get Your Free Accessibility Score
                </span>
              </div>
              <span className="hidden md:inline text-white/70 text-sm">
                Check compliance before the EAA deadline
              </span>
            </div>

            {/* Right content */}
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-5 py-2 bg-white hover:bg-zinc-100 text-indigo-600 font-semibold rounded-lg transition-colors shadow-md"
              >
                <span className="hidden sm:inline">Scan Now</span>
                <span className="sm:hidden">Scan</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              {/* Close button */}
              <button
                onClick={handleDismiss}
                className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Dismiss"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
