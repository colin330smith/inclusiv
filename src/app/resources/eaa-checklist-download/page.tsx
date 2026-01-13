"use client";

import { useState } from "react";
import { Shield, FileText, CheckCircle, Download, ArrowRight, Clock, AlertTriangle, Lock, Star, Mail, Loader2 } from "lucide-react";
import Link from "next/link";

export default function EAAChecklistDownload() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState("");

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
          source: "eaa-checklist-page",
          leadMagnet: "eaa-checklist",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit");
      }

      setIsUnlocked(true);
      localStorage.setItem("inclusiv_email_submitted", "true");

      // Track conversion
      if (typeof window !== "undefined" && (window as unknown as { plausible?: (event: string, options?: object) => void }).plausible) {
        (window as unknown as { plausible: (event: string, options?: object) => void }).plausible("LeadCapture", { props: { source: "eaa-checklist" } });
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Checklist items preview
  const checklistCategories = [
    {
      name: "Perceivable",
      items: [
        "Alt text for all images",
        "Video captions and transcripts",
        "Color contrast ratios",
        "Resizable text without loss",
      ],
    },
    {
      name: "Operable",
      items: [
        "Keyboard navigation",
        "Focus indicators",
        "Skip navigation links",
        "No keyboard traps",
      ],
    },
    {
      name: "Understandable",
      items: [
        "Clear error messages",
        "Consistent navigation",
        "Form labels and instructions",
        "Language attributes",
      ],
    },
    {
      name: "Robust",
      items: [
        "Valid HTML markup",
        "ARIA attributes",
        "Screen reader compatibility",
        "Platform compatibility",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-indigo-500" />
            <span className="text-xl font-bold text-white">Inclusiv</span>
          </Link>
          <div className="flex items-center gap-2 px-3 py-1 bg-red-500/10 rounded-full text-sm text-red-400">
            <Clock className="w-4 h-4" />
            <span className="font-semibold">EAA Deadline: June 28, 2025</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left column - Content */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 text-indigo-400 text-sm mb-6">
              <FileText className="w-4 h-4" />
              Free Download • 47-Point Checklist
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Complete EAA Compliance Checklist
            </h1>

            {/* Description */}
            <p className="text-xl text-zinc-400 mb-8">
              Stop guessing if your website is compliant. Our comprehensive 47-point checklist covers every WCAG 2.1 AA requirement for European Accessibility Act compliance.
            </p>

            {/* Warning banner */}
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-8">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-red-400 font-semibold mb-1">Time is Running Out</p>
                  <p className="text-zinc-400 text-sm">
                    The EAA deadline is June 28, 2025. Non-compliant websites can face fines up to €100,000. Download the checklist now and start fixing issues today.
                  </p>
                </div>
              </div>
            </div>

            {/* What's included */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-white mb-4">What's Included:</h2>
              <div className="grid gap-3">
                {[
                  "Complete WCAG 2.1 AA requirement breakdown",
                  "Priority rankings for each item (Critical/High/Medium/Low)",
                  "Estimated time to fix each issue",
                  "Code examples for common fixes",
                  "Testing tools recommendations",
                  "Compliance certificate template",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-zinc-300">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 border-2 border-zinc-900 flex items-center justify-center">
                    <span className="text-xs font-bold text-white">{String.fromCharCode(64 + i)}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                ))}
              </div>
              <span className="text-zinc-400 text-sm">Comprehensive WCAG 2.1 AA checklist</span>
            </div>
          </div>

          {/* Right column - Form/Download */}
          <div className="lg:sticky lg:top-8">
            {!isUnlocked ? (
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center">
                    <Lock className="w-8 h-8 text-indigo-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Unlock Your Free Checklist
                  </h3>
                  <p className="text-zinc-400">
                    Enter your email to get instant access to the full checklist.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      required
                      className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>

                  {error && (
                    <p className="text-red-400 text-sm">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-4 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 disabled:from-zinc-600 disabled:to-zinc-600 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Download className="w-5 h-5" />
                        Get Free Checklist
                      </>
                    )}
                  </button>
                </form>

                <p className="mt-4 text-center text-zinc-500 text-sm">
                  No spam, ever. Unsubscribe anytime.
                </p>

                {/* Preview of checklist */}
                <div className="mt-8 pt-6 border-t border-zinc-800">
                  <p className="text-zinc-500 text-sm mb-4">Preview of checklist categories:</p>
                  <div className="space-y-4">
                    {checklistCategories.map((category, i) => (
                      <div key={i}>
                        <p className="text-white font-medium mb-2">{category.name}</p>
                        <div className="space-y-1">
                          {category.items.slice(0, 2).map((item, j) => (
                            <div key={j} className="flex items-center gap-2 text-zinc-400 text-sm">
                              <div className="w-4 h-4 border border-zinc-600 rounded" />
                              <span>{item}</span>
                            </div>
                          ))}
                          <div className="flex items-center gap-2 text-zinc-600 text-sm blur-sm">
                            <div className="w-4 h-4 border border-zinc-600 rounded" />
                            <span>{category.items[2]}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-zinc-900 border border-green-500/30 rounded-2xl p-8">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-green-500/20 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Checklist Unlocked!
                  </h3>
                  <p className="text-zinc-400 mb-6">
                    Click below to download your EAA compliance checklist.
                  </p>

                  {/* Download button - links to a PDF in public folder */}
                  <a
                    href="/downloads/eaa-compliance-checklist.pdf"
                    download
                    className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white font-semibold rounded-xl transition-all shadow-lg shadow-green-500/25"
                  >
                    <Download className="w-5 h-5" />
                    Download Checklist (PDF)
                  </a>

                  <p className="mt-4 text-zinc-500 text-sm">
                    Also sent to your email: {email}
                  </p>

                  {/* Next steps */}
                  <div className="mt-8 pt-6 border-t border-zinc-800 text-left">
                    <p className="text-white font-semibold mb-4">Next Steps:</p>
                    <div className="space-y-3">
                      <Link
                        href="/"
                        className="flex items-center justify-between p-4 bg-zinc-800/50 hover:bg-zinc-800 rounded-xl transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-indigo-500/20 rounded-lg flex items-center justify-center">
                            <Shield className="w-5 h-5 text-indigo-400" />
                          </div>
                          <div>
                            <p className="text-white font-medium">Free Accessibility Scan</p>
                            <p className="text-zinc-500 text-sm">Get instant compliance score</p>
                          </div>
                        </div>
                        <ArrowRight className="w-5 h-5 text-zinc-500 group-hover:text-white transition-colors" />
                      </Link>
                      <Link
                        href="/pricing"
                        className="flex items-center justify-between p-4 bg-zinc-800/50 hover:bg-zinc-800 rounded-xl transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                            <FileText className="w-5 h-5 text-purple-400" />
                          </div>
                          <div>
                            <p className="text-white font-medium">Full Compliance Service</p>
                            <p className="text-zinc-500 text-sm">Let us handle everything</p>
                          </div>
                        </div>
                        <ArrowRight className="w-5 h-5 text-zinc-500 group-hover:text-white transition-colors" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 mt-24">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-zinc-500 text-sm">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              <span>Inclusiv © 2025</span>
              <span className="text-zinc-600">|</span>
              <span>Powered by axe-core</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
              <Link href="/" className="hover:text-zinc-300 transition-colors">Scanner</Link>
              <Link href="/pricing" className="hover:text-zinc-300 transition-colors">Pricing</Link>
              <Link href="/privacy" className="hover:text-zinc-300 transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-zinc-300 transition-colors">Terms</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
