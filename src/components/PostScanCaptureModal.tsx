"use client";

import { useState, useEffect } from "react";
import { X, FileText, CheckCircle, ArrowRight, AlertTriangle, Shield, Zap } from "lucide-react";

interface PostScanCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  scanScore?: number;
  totalIssues?: number;
  criticalIssues?: number;
  scannedUrl?: string;
}

export default function PostScanCaptureModal({
  isOpen,
  onClose,
  scanScore = 0,
  totalIssues = 0,
  criticalIssues = 0,
  scannedUrl = "",
}: PostScanCaptureModalProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setIsSuccess(false);
      setError("");
    }
  }, [isOpen]);

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
          url: scannedUrl,
          source: "post_scan_modal",
          leadMagnet: "full-accessibility-report",
          metadata: {
            scanScore,
            totalIssues,
            criticalIssues,
          },
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
          win.plausible("PostScanCapture", { props: { score: scanScore, issues: totalIssues } });
        }
        if (win.gtag) {
          win.gtag("event", "email_captured", { source: "post_scan", score: scanScore });
        }
      }

      // Auto close after success
      setTimeout(() => {
        onClose();
      }, 3000);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const hasProblems = scanScore < 80 || totalIssues > 0;
  const isCritical = criticalIssues > 0 || scanScore < 50;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white transition-colors z-10"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <div className="p-8">
            {/* Icon based on score */}
            <div className={`w-14 h-14 mx-auto mb-6 rounded-xl flex items-center justify-center ${
              isCritical ? "bg-red-500/10" : hasProblems ? "bg-orange-500/10" : "bg-green-500/10"
            }`}>
              {isCritical ? (
                <AlertTriangle className="w-7 h-7 text-red-500" />
              ) : hasProblems ? (
                <Shield className="w-7 h-7 text-orange-500" />
              ) : (
                <CheckCircle className="w-7 h-7 text-green-500" />
              )}
            </div>

            {/* Header based on results */}
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold text-white mb-2">
                {isCritical
                  ? "Action Required: Critical Issues Found"
                  : hasProblems
                  ? "Your Full Report is Ready"
                  : "Great Score! Get Your Certificate"}
              </h2>
              <p className="text-zinc-400 text-sm">
                {isCritical
                  ? `We found ${criticalIssues} critical accessibility issues that could expose you to EAA fines.`
                  : hasProblems
                  ? `Your site scored ${scanScore}/100. Get detailed fix instructions sent to your inbox.`
                  : `Your site scored ${scanScore}/100. Get your compliance documentation.`}
              </p>
            </div>

            {/* Score summary */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="text-center p-3 bg-zinc-800/50 rounded-xl">
                <div className={`text-2xl font-bold ${
                  scanScore >= 80 ? "text-green-500" : scanScore >= 50 ? "text-orange-500" : "text-red-500"
                }`}>
                  {scanScore}
                </div>
                <div className="text-xs text-zinc-500">Score</div>
              </div>
              <div className="text-center p-3 bg-zinc-800/50 rounded-xl">
                <div className="text-2xl font-bold text-zinc-200">{totalIssues}</div>
                <div className="text-xs text-zinc-500">Issues</div>
              </div>
              <div className="text-center p-3 bg-zinc-800/50 rounded-xl">
                <div className={`text-2xl font-bold ${criticalIssues > 0 ? "text-red-500" : "text-green-500"}`}>
                  {criticalIssues}
                </div>
                <div className="text-xs text-zinc-500">Critical</div>
              </div>
            </div>

            {/* Benefits */}
            <div className="space-y-2 mb-6">
              {[
                "Detailed breakdown of every issue found",
                "Step-by-step fix instructions for your platform",
                "Priority ranking to fix what matters most",
                isCritical && "Legal risk assessment included",
              ].filter(Boolean).map((benefit, i) => (
                <div key={i} className="flex items-center gap-2 text-zinc-400 text-sm">
                  <Zap className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                  <span>{benefit}</span>
                </div>
              ))}
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
                className={`w-full px-6 py-4 font-semibold rounded-xl transition-all flex items-center justify-center gap-2 ${
                  isCritical
                    ? "bg-red-600 hover:bg-red-500 text-white"
                    : "bg-indigo-600 hover:bg-indigo-500 text-white"
                } disabled:bg-zinc-700 disabled:cursor-not-allowed`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <FileText className="w-5 h-5" />
                    {isCritical ? "Get Critical Fixes Report" : "Get Full Report"}
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            {/* Trust */}
            <p className="mt-4 text-center text-zinc-500 text-xs">
              Free report • No credit card • Unsubscribe anytime
            </p>
          </div>
        ) : (
          <div className="p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-6 bg-green-500/20 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Report Sent!</h2>
            <p className="text-zinc-400 mb-4">
              Check your inbox at <strong className="text-white">{email}</strong>
            </p>
            <p className="text-zinc-500 text-sm">
              Closing automatically...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
