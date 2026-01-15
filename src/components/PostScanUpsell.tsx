'use client';

import { useState, useEffect } from 'react';
import { X, Zap, AlertTriangle, CheckCircle, ArrowRight, Shield, Clock } from 'lucide-react';
import Link from 'next/link';

interface PostScanUpsellProps {
  score: number;
  totalIssues: number;
  criticalIssues: number;
  url: string;
  onClose: () => void;
  delay?: number; // Delay in ms before showing
}

const SHOWN_KEY = 'inclusiv_upsell_shown';
const SHOWN_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export default function PostScanUpsell({
  score,
  totalIssues,
  criticalIssues,
  url,
  onClose,
  delay = 3000,
}: PostScanUpsellProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Check if already shown recently
    const shownAt = localStorage.getItem(SHOWN_KEY);
    if (shownAt) {
      const shownTime = parseInt(shownAt, 10);
      if (Date.now() - shownTime < SHOWN_DURATION) {
        return;
      }
    }

    // Show after delay
    const timer = setTimeout(() => {
      setIsVisible(true);
      localStorage.setItem(SHOWN_KEY, Date.now().toString());

      // Track modal shown
      if (typeof window !== 'undefined') {
        const win = window as unknown as { plausible?: (event: string, options?: object) => void };
        win.plausible?.('Upsell Modal Shown', {
          props: { score, totalIssues, criticalIssues },
        });
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [delay, score, totalIssues, criticalIssues]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 300);
  };

  const handleCtaClick = () => {
    if (typeof window !== 'undefined') {
      const win = window as unknown as { plausible?: (event: string, options?: object) => void };
      win.plausible?.('Upsell CTA Clicked', {
        props: { score, totalIssues, destination: 'pricing' },
      });
    }
  };

  if (!isVisible) return null;

  // Determine urgency level and messaging
  const isHighRisk = score < 50 || criticalIssues > 5;
  const isMediumRisk = score < 80 || criticalIssues > 0;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${isClosing ? 'animate-fadeOut' : 'animate-fadeIn'}`}>
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className={`relative w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden ${isClosing ? 'animate-scaleOut' : 'animate-scaleIn'}`}>
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 hover:bg-zinc-800 rounded-lg transition-colors z-10"
          aria-label="Close"
        >
          <X className="w-5 h-5 text-zinc-400" />
        </button>

        {/* Header based on risk level */}
        {isHighRisk ? (
          <div className="bg-gradient-to-r from-red-600 to-orange-600 p-6 text-white">
            <div className="flex items-center gap-3 mb-2">
              <AlertTriangle className="w-6 h-6 animate-pulse" />
              <h3 className="text-xl font-bold">Your Website Needs Urgent Attention</h3>
            </div>
            <p className="text-white/90">
              {criticalIssues} critical issues detected that could result in EAA fines
            </p>
          </div>
        ) : isMediumRisk ? (
          <div className="bg-gradient-to-r from-orange-600 to-yellow-600 p-6 text-white">
            <div className="flex items-center gap-3 mb-2">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="text-xl font-bold">Compliance Issues Found</h3>
            </div>
            <p className="text-white/90">
              {totalIssues} accessibility issues need to be fixed for EAA compliance
            </p>
          </div>
        ) : (
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 text-white">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle className="w-6 h-6" />
              <h3 className="text-xl font-bold">Good Start! Keep It Up</h3>
            </div>
            <p className="text-white/90">
              Your site is on track. Continuous monitoring ensures you stay compliant.
            </p>
          </div>
        )}

        {/* Body */}
        <div className="p-6">
          {/* Score Summary */}
          <div className="flex items-center justify-between mb-6 p-4 bg-zinc-800/50 rounded-xl">
            <div>
              <p className="text-sm text-zinc-400 mb-1">Your Compliance Score</p>
              <div className="flex items-baseline gap-2">
                <span className={`text-3xl font-bold ${
                  score >= 80 ? 'text-green-400' : score >= 50 ? 'text-yellow-400' : 'text-red-400'
                }`}>
                  {score}
                </span>
                <span className="text-zinc-500">/100</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-zinc-400 mb-1">Issues Found</p>
              <p className="text-2xl font-bold text-white">{totalIssues}</p>
            </div>
          </div>

          {/* What you get */}
          <div className="mb-6">
            <p className="text-sm font-medium text-zinc-300 mb-3">
              Upgrade to fix these issues automatically:
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-zinc-300">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                AI-powered code fixes for all {totalIssues} issues
              </li>
              <li className="flex items-center gap-2 text-sm text-zinc-300">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                Full site scan (not just one page)
              </li>
              <li className="flex items-center gap-2 text-sm text-zinc-300">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                Continuous monitoring to catch new issues
              </li>
              <li className="flex items-center gap-2 text-sm text-zinc-300">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                Official compliance certificate
              </li>
            </ul>
          </div>

          {/* Urgency message */}
          <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg mb-6">
            <Clock className="w-4 h-4 text-red-400 flex-shrink-0" />
            <p className="text-sm text-red-300">
              <strong>EAA enforcement is active.</strong> Non-compliant sites face €100,000 fines.
            </p>
          </div>

          {/* CTA buttons */}
          <div className="space-y-3">
            <Link
              href="/pricing?ref=upsell"
              onClick={handleCtaClick}
              className="flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-xl transition-all shadow-lg"
            >
              <Zap className="w-5 h-5" />
              Get Full Compliance from €49/mo
              <ArrowRight className="w-5 h-5" />
            </Link>

            <button
              onClick={handleClose}
              className="w-full py-3 text-zinc-500 hover:text-zinc-300 text-sm transition-colors"
            >
              I&apos;ll risk the fines for now
            </button>
          </div>

          {/* Trust badge */}
          <div className="flex items-center justify-center gap-2 mt-4 pt-4 border-t border-zinc-800">
            <Shield className="w-4 h-4 text-green-500" />
            <span className="text-xs text-zinc-500">
              14-day free trial • Cancel anytime • 30-day money back
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
