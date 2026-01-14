"use client";

import { useState, useEffect, useCallback } from "react";
import { X, AlertTriangle, Shield, ArrowRight, Clock } from "lucide-react";

const EXIT_DISMISSED_KEY = "inclusiv_exit_dismissed";
const EXIT_DISMISSED_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export default function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleExitIntent = useCallback((e: MouseEvent) => {
    // Detect when mouse moves toward the top of the viewport (exit intent)
    if (e.clientY <= 10) {
      // Check if already dismissed
      const dismissedAt = localStorage.getItem(EXIT_DISMISSED_KEY);
      if (dismissedAt) {
        const dismissedTime = parseInt(dismissedAt, 10);
        if (Date.now() - dismissedTime < EXIT_DISMISSED_DURATION) {
          return;
        }
      }

      // Check if user already submitted email
      if (localStorage.getItem("inclusiv_email_submitted")) {
        return;
      }

      setIsVisible(true);
      // Remove listener after triggering once
      document.removeEventListener("mouseout", handleExitIntent);
    }
  }, []);

  useEffect(() => {
    // Only add exit intent on desktop (mouse-based)
    if (typeof window === "undefined" || window.innerWidth < 768) {
      return;
    }

    // Add a delay before activating exit intent
    const timer = setTimeout(() => {
      document.addEventListener("mouseout", handleExitIntent);
    }, 10000); // Wait 10 seconds before activating

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseout", handleExitIntent);
    };
  }, [handleExitIntent]);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem(EXIT_DISMISSED_KEY, Date.now().toString());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/leads/capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          source: "exit_intent",
          leadMagnet: "eaa-deadline-alert",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit");
      }

      setIsSuccess(true);
      localStorage.setItem("inclusiv_email_submitted", "true");

      // Track conversion
      if (typeof window !== "undefined") {
        const win = window as unknown as {
          plausible?: (event: string, options?: object) => void;
          gtag?: (...args: unknown[]) => void;
        };
        if (win.plausible) {
          win.plausible("ExitIntentCapture", { props: { source: "exit_intent" } });
        }
        if (win.gtag) {
          win.gtag("event", "email_captured", { source: "exit_intent" });
        }
      }

      setTimeout(() => {
        setIsVisible(false);
      }, 3000);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={handleDismiss}
      />

      {/* Popup */}
      <div className="relative w-full max-w-xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-red-500/30 rounded-2xl shadow-2xl shadow-red-500/10 overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        {/* Urgency stripe */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-orange-500 to-red-500" />

        {/* Close button */}
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white transition-colors z-10"
          aria-label="Close popup"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <div className="p-8">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-full mb-4">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                <span className="text-red-400 text-sm font-medium">EAA Deadline Passed</span>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Wait! Your Site May Be At Risk
              </h2>
              <p className="text-zinc-400">
                The European Accessibility Act deadline was <strong className="text-red-400">June 28, 2025</strong>.
                Non-compliant websites now face fines up to <strong className="text-white">€100,000</strong>.
              </p>
            </div>

            {/* Risk stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-3 bg-zinc-800/50 rounded-xl">
                <div className="text-2xl font-bold text-red-400">€100K</div>
                <div className="text-xs text-zinc-500">Max Fine</div>
              </div>
              <div className="text-center p-3 bg-zinc-800/50 rounded-xl">
                <div className="text-2xl font-bold text-orange-400">87%</div>
                <div className="text-xs text-zinc-500">Sites Fail</div>
              </div>
              <div className="text-center p-3 bg-zinc-800/50 rounded-xl">
                <div className="flex items-center justify-center gap-1 text-2xl font-bold text-yellow-400">
                  <Clock className="w-5 h-5" />
                  NOW
                </div>
                <div className="text-xs text-zinc-500">Enforcement</div>
              </div>
            </div>

            {/* Offer */}
            <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-xl p-4 mb-6">
              <div className="flex items-start gap-3">
                <Shield className="w-6 h-6 text-indigo-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-white mb-1">Free Compliance Check</h3>
                  <p className="text-zinc-400 text-sm">
                    Enter your email and we&apos;ll send you a free compliance report for your website.
                    Takes 30 seconds. No credit card required.
                  </p>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your business email"
                required
                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />

              {error && <p className="text-red-400 text-sm">{error}</p>}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:from-zinc-700 disabled:to-zinc-700 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Checking...
                  </>
                ) : (
                  <>
                    Check My Compliance Risk
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            <p className="mt-4 text-center text-zinc-500 text-xs">
              We respect your privacy. Unsubscribe anytime.
            </p>
          </div>
        ) : (
          <div className="p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-6 bg-green-500/20 rounded-full flex items-center justify-center">
              <Shield className="w-8 h-8 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Check Your Inbox!
            </h2>
            <p className="text-zinc-400 mb-4">
              We&apos;re sending your compliance report to <strong className="text-white">{email}</strong>
            </p>
            <p className="text-zinc-500 text-sm">
              This popup will close automatically...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
