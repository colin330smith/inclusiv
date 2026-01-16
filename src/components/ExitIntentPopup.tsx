'use client';

import { useState, useEffect, useCallback } from 'react';
import { X, Gift, Shield, AlertTriangle, ArrowRight, Zap } from 'lucide-react';

interface ExitIntentPopupProps {
  onClose?: () => void;
}

export default function ExitIntentPopup({ onClose }: ExitIntentPopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setDismissed(true);
    sessionStorage.setItem('exitIntentDismissed', 'true');
    onClose?.();
  }, [onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          source: 'exit_intent',
          offer: 'free_audit_checklist'
        }),
      });
    } catch {
      // Continue even if API fails
    }

    setSubmitted(true);
    localStorage.setItem('emailCaptured', 'true');
    setTimeout(() => {
      handleClose();
    }, 3000);
  };

  useEffect(() => {
    // Don't show on mobile
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      return;
    }

    // Check if already dismissed or email captured
    if (sessionStorage.getItem('exitIntentDismissed') === 'true') {
      setDismissed(true);
      return;
    }

    if (localStorage.getItem('emailCaptured') === 'true') {
      setDismissed(true);
      return;
    }

    let triggered = false;
    let timeoutId: NodeJS.Timeout;

    // Exit intent detection - mouse leaves viewport from top
    const handleMouseLeave = (e: MouseEvent) => {
      if (triggered || dismissed) return;

      // Only trigger when leaving from the top of the page
      if (e.clientY <= 0) {
        triggered = true;
        // Small delay to ensure it's intentional
        timeoutId = setTimeout(() => {
          setIsVisible(true);
        }, 100);
      }
    };

    // Also trigger after extended time on page with no scan
    const idleTimeout = setTimeout(() => {
      if (!triggered && !dismissed && !sessionStorage.getItem('scanCompleted')) {
        triggered = true;
        setIsVisible(true);
      }
    }, 45000); // 45 seconds

    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(idleTimeout);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [dismissed]);

  // Handle escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isVisible) {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isVisible, handleClose]);

  if (!isVisible || dismissed) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div
        className="relative w-full max-w-lg bg-zinc-900 border border-zinc-700 rounded-2xl shadow-2xl overflow-hidden animate-scale-up"
        style={{
          animation: 'scaleUp 0.3s ease-out',
        }}
      >
        <style jsx>{`
          @keyframes scaleUp {
            from {
              opacity: 0;
              transform: scale(0.95);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
        `}</style>

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white transition-colors z-10"
          aria-label="Close popup"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <>
            {/* Header with gift icon */}
            <div className="p-6 pb-0">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                  <Gift className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="px-2 py-1 bg-green-500/10 text-green-400 text-xs font-semibold rounded-full">
                    FREE RESOURCE
                  </span>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-white mb-2">
                Wait! Get Your Free EAA Compliance Checklist
              </h2>
              <p className="text-zinc-400 mb-4">
                Don&apos;t risk fines. Our 47-point checklist covers everything you need for European Accessibility Act compliance.
              </p>

              {/* Urgency badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-500/10 border border-red-500/20 rounded-lg mb-6">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                <span className="text-sm text-red-400 font-medium">EAA enforcement is now active</span>
              </div>
            </div>

            {/* Form */}
            <div className="p-6 pt-2">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your work email"
                    required
                    className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-zinc-400 focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25"
                >
                  <Zap className="w-5 h-5" />
                  Get Free Checklist
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>

              {/* Trust badges */}
              <div className="flex items-center justify-center gap-4 mt-4 text-xs text-zinc-500">
                <span>No spam</span>
                <span>|</span>
                <span>Unsubscribe anytime</span>
                <span>|</span>
                <span>5,000+ downloads</span>
              </div>
            </div>

            {/* What's included */}
            <div className="px-6 pb-6">
              <div className="p-4 bg-zinc-800/50 rounded-xl">
                <p className="text-sm text-zinc-300 font-medium mb-2">What&apos;s inside:</p>
                <ul className="space-y-1 text-sm text-zinc-400">
                  <li className="flex items-center gap-2">
                    <Shield className="w-3 h-3 text-indigo-400" />
                    47-point WCAG 2.1 AA compliance checklist
                  </li>
                  <li className="flex items-center gap-2">
                    <Shield className="w-3 h-3 text-indigo-400" />
                    EAA deadline requirements breakdown
                  </li>
                  <li className="flex items-center gap-2">
                    <Shield className="w-3 h-3 text-indigo-400" />
                    Priority fix guide for common issues
                  </li>
                </ul>
              </div>
            </div>
          </>
        ) : (
          /* Success State */
          <div className="p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/10 flex items-center justify-center">
              <Shield className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Check Your Inbox!</h3>
            <p className="text-zinc-400 mb-4">
              Your free EAA Compliance Checklist is on its way to <span className="text-white">{email}</span>
            </p>
            <p className="text-sm text-zinc-500">
              This popup will close automatically...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
