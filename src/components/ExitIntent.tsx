"use client";

import { useState, useEffect, useCallback } from "react";
import { X, Shield, AlertTriangle, Gift, Clock, ArrowRight } from "lucide-react";

type ExitIntentProps = {
  onClose?: () => void;
  deadline?: string;
  daysRemaining?: number;
};

export default function ExitIntent({
  onClose,
  deadline = "June 28, 2025",
  daysRemaining = 167
}: ExitIntentProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    // Set cookie to not show again for 24 hours
    if (typeof window !== "undefined") {
      localStorage.setItem("exitIntentShown", Date.now().toString());
    }
    onClose?.();
  }, [onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          source: "exit_intent",
          offer: "free_guide"
        }),
      });
    } catch {
      // Continue anyway
    }

    setSubmitted(true);

    // Auto-close after 3 seconds
    setTimeout(() => {
      handleClose();
    }, 3000);
  };

  useEffect(() => {
    // Check if popup was shown recently (within 24 hours)
    const lastShown = localStorage.getItem("exitIntentShown");
    if (lastShown) {
      const hoursSince = (Date.now() - parseInt(lastShown)) / (1000 * 60 * 60);
      if (hoursSince < 24) return;
    }

    // Check if user already converted
    const hasConverted = localStorage.getItem("emailCaptured");
    if (hasConverted) return;

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger when mouse leaves through the top of the page
      if (e.clientY <= 5 && !hasTriggered) {
        setHasTriggered(true);
        setIsVisible(true);
      }
    };

    // Mobile: Detect scroll up intent (user scrolling back up quickly)
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;
    let lastScrollTime = Date.now();

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const currentTime = Date.now();
      const timeDiff = currentTime - lastScrollTime;

      if (timeDiff > 0) {
        scrollVelocity = (lastScrollY - currentScrollY) / timeDiff;
      }

      // If scrolling up fast and near the top
      if (scrollVelocity > 0.5 && currentScrollY < 200 && !hasTriggered) {
        setHasTriggered(true);
        setIsVisible(true);
      }

      lastScrollY = currentScrollY;
      lastScrollTime = currentTime;
    };

    // Add event listeners
    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("scroll", handleScroll);

    // Also trigger after 60 seconds of inactivity
    const inactivityTimer = setTimeout(() => {
      if (!hasTriggered) {
        setHasTriggered(true);
        setIsVisible(true);
      }
    }, 60000);

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(inactivityTimer);
    };
  }, [hasTriggered]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };

    if (isVisible) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isVisible, handleClose]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative bg-zinc-900 border border-zinc-700 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-300">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-zinc-500 hover:text-white transition-colors z-10"
          aria-label="Close popup"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <>
            {/* Urgency Banner */}
            <div className="bg-gradient-to-r from-red-600 to-orange-600 px-6 py-3">
              <div className="flex items-center justify-center gap-2 text-white">
                <AlertTriangle className="w-5 h-5" />
                <span className="font-semibold">Wait! Do not leave without this...</span>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              {/* Gift Icon */}
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center">
                <Gift className="w-8 h-8 text-white" />
              </div>

              <h2 className="text-2xl font-bold text-white text-center mb-3">
                Free EAA Compliance Checklist
              </h2>

              <p className="text-zinc-400 text-center mb-6">
                Get our complete 47-point checklist used by 500+ EU e-commerce sites to achieve
                compliance before the {deadline} deadline.
              </p>

              {/* Value Props */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-3 h-3 text-green-500" />
                  </div>
                  <span className="text-zinc-300">47-point WCAG 2.1 AA checklist</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-3 h-3 text-green-500" />
                  </div>
                  <span className="text-zinc-300">Platform-specific fixes (Shopify, WooCommerce, etc.)</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-3 h-3 text-green-500" />
                  </div>
                  <span className="text-zinc-300">Legal compliance documentation template</span>
                </div>
              </div>

              {/* Countdown */}
              <div className="flex items-center justify-center gap-2 text-sm text-red-400 mb-6">
                <Clock className="w-4 h-4" />
                <span>Only <strong>{daysRemaining} days</strong> until EAA enforcement</span>
              </div>

              {/* Email Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
                />
                <button
                  type="submit"
                  className="w-full px-6 py-4 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  Send Me The Free Checklist
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>

              <p className="text-zinc-500 text-xs text-center mt-4">
                No spam. Unsubscribe anytime. Your data is safe with us.
              </p>
            </div>
          </>
        ) : (
          /* Success State */
          <div className="p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-6 bg-green-500/20 rounded-full flex items-center justify-center">
              <Shield className="w-8 h-8 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">
              Check Your Inbox!
            </h2>
            <p className="text-zinc-400 mb-6">
              Your EAA Compliance Checklist is on its way to <strong className="text-white">{email}</strong>
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
