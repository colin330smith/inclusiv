"use client";

import { useState, useEffect } from "react";
import { X, Shield, ArrowRight } from "lucide-react";
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

      {/* Main bar - clean, professional design */}
      <div className="bg-zinc-900 border-t border-zinc-800">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Left content */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-indigo-500" />
                <span className="text-zinc-200 font-medium">
                  Check your website&apos;s accessibility score
                </span>
              </div>
              <span className="hidden md:inline text-zinc-400 text-sm">
                Free WCAG 2.1 AA compliance check
              </span>
            </div>

            {/* Right content */}
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-colors text-sm"
              >
                <span>Scan Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              {/* Close button */}
              <button
                onClick={handleDismiss}
                className="p-2 text-zinc-400 hover:text-zinc-300 hover:bg-zinc-800 rounded-lg transition-colors"
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
