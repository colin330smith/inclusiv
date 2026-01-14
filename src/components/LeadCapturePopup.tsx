"use client";

import { useState, useEffect } from "react";
import { X, FileText, CheckCircle, ArrowRight } from "lucide-react";

interface LeadCapturePopupProps {
  delay?: number; // Delay in milliseconds before showing popup
}

const POPUP_DISMISSED_KEY = "inclusiv_popup_dismissed";
const POPUP_DISMISSED_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days

export default function LeadCapturePopup({ delay = 30000 }: LeadCapturePopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Check if popup was recently dismissed
    const dismissedAt = localStorage.getItem(POPUP_DISMISSED_KEY);
    if (dismissedAt) {
      const dismissedTime = parseInt(dismissedAt, 10);
      if (Date.now() - dismissedTime < POPUP_DISMISSED_DURATION) {
        return; // Don't show popup if dismissed within the last 7 days
      }
    }

    // Check if user already submitted email
    const hasSubmitted = localStorage.getItem("inclusiv_email_submitted");
    if (hasSubmitted) {
      return;
    }

    // Show popup after delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem(POPUP_DISMISSED_KEY, Date.now().toString());
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
          source: "popup",
          leadMagnet: "accessibility-report",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit");
      }

      setIsSuccess(true);
      localStorage.setItem("inclusiv_email_submitted", "true");

      // Track conversion
      if (typeof window !== "undefined" && (window as unknown as { plausible?: (event: string, options?: object) => void }).plausible) {
        (window as unknown as { plausible: (event: string, options?: object) => void }).plausible("LeadCapture", { props: { source: "popup" } });
      }

      // Auto-close after success
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={handleDismiss}
      />

      {/* Popup */}
      <div className="relative w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl overflow-hidden animate-in fade-in scale-in duration-200">
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
            {/* Icon */}
            <div className="w-14 h-14 mx-auto mb-6 bg-indigo-500/10 rounded-xl flex items-center justify-center">
              <FileText className="w-7 h-7 text-indigo-500" />
            </div>

            {/* Header */}
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold text-white mb-2">
                Free Accessibility Guide
              </h2>
              <p className="text-zinc-400 text-sm">
                Get our comprehensive WCAG 2.1 AA checklist with actionable steps to fix common accessibility issues.
              </p>
            </div>

            {/* Benefits */}
            <div className="space-y-2 mb-6">
              {[
                "Complete WCAG 2.1 AA checklist",
                "Step-by-step fix instructions",
                "Priority roadmap to compliance",
              ].map((benefit, i) => (
                <div key={i} className="flex items-center gap-2 text-zinc-400 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>

              {error && (
                <p className="text-red-400 text-sm">{error}</p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-zinc-700 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Get Free Report
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            {/* Trust indicators */}
            <p className="mt-6 text-center text-zinc-400 text-xs">
              We respect your privacy. Unsubscribe anytime.
            </p>
          </div>
        ) : (
          <div className="p-8 text-center">
            {/* Success state */}
            <div className="w-16 h-16 mx-auto mb-6 bg-green-500/20 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Check Your Inbox!
            </h2>
            <p className="text-zinc-400 mb-4">
              Your accessibility report is on its way to {email}
            </p>
            <p className="text-zinc-400 text-sm">
              This popup will close automatically...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
