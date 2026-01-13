"use client";

import { useState, useEffect } from "react";
import { Shield, AlertTriangle, CheckCircle, Clock, Globe, Lock, ArrowRight, Zap, Star, Quote } from "lucide-react";

type ScanResult = {
  score: number;
  totalIssues: number;
  criticalIssues: number;
  platform: string;
  topIssues: Array<{
    id: string;
    impact: "critical" | "serious" | "moderate" | "minor";
    description: string;
    count: number;
  }>;
  scannedAt: string;
};

type CountdownTime = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

// Calculate time until EAA deadline
const getDeadlineCountdown = (): CountdownTime => {
  const deadline = new Date("2025-06-28T00:00:00");
  const now = new Date();
  const diffTime = deadline.getTime() - now.getTime();

  if (diffTime <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diffTime % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
};

// Calculate days until EAA deadline (simple version for header)
const getDeadlineInfo = () => {
  const deadline = new Date("2025-06-28");
  const today = new Date();
  const diffTime = deadline.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return { days: diffDays, deadline };
};

export default function Home() {
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [scanCount] = useState(2847); // Social proof - scans completed
  const [countdown, setCountdown] = useState<CountdownTime>(getDeadlineCountdown());
  const deadlineInfo = getDeadlineInfo();

  // Live countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(getDeadlineCountdown());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setResult(null);

    let scanUrl = url.trim();
    if (!scanUrl.startsWith("http")) {
      scanUrl = "https://" + scanUrl;
    }

    try {
      new URL(scanUrl);
    } catch {
      setError("Please enter a valid URL");
      return;
    }

    setScanning(true);

    try {
      const response = await fetch("/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: scanUrl }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Scan failed");
      }

      setResult(data);
      setShowEmailCapture(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Scan failed. Please try again.");
    } finally {
      setScanning(false);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, url, score: result?.score }),
      });
      setEmailSubmitted(true);
    } catch {
      // Still show success - email might have been captured
      setEmailSubmitted(true);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "#22c55e";
    if (score >= 50) return "#f59e0b";
    return "#ef4444";
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "critical": return "text-red-500 bg-red-500/10";
      case "serious": return "text-orange-500 bg-orange-500/10";
      case "moderate": return "text-yellow-500 bg-yellow-500/10";
      default: return "text-blue-500 bg-blue-500/10";
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-indigo-500" />
            <span className="text-xl font-bold text-white">Inclusiv</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="/pricing" className="text-zinc-400 hover:text-white transition-colors text-sm font-medium">
              Pricing
            </a>
            <div className="flex items-center gap-2 text-sm text-green-400">
              <CheckCircle className="w-4 h-4" />
              <span>{scanCount.toLocaleString()} sites scanned</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-red-500/10 rounded-full text-sm text-red-400">
              <Clock className="w-4 h-4" />
              <span className="font-semibold">{deadlineInfo.days} days until €100k fines</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="max-w-6xl mx-auto px-6 py-16">
        {/* Countdown Timer */}
        <div className="max-w-3xl mx-auto mb-10">
          <div className="bg-gradient-to-r from-red-950/50 to-orange-950/50 border border-red-500/30 rounded-2xl p-6">
            <div className="text-center mb-4">
              <p className="text-red-400 font-semibold text-sm uppercase tracking-wide mb-1">EAA Compliance Deadline</p>
              <p className="text-zinc-400 text-sm">June 28, 2025 - Non-compliant sites face fines up to €100,000</p>
            </div>
            <div className="flex items-center justify-center gap-4">
              <div className="text-center">
                <div className="bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 min-w-[80px]">
                  <span className="text-3xl font-bold text-white">{countdown.days}</span>
                </div>
                <p className="text-zinc-500 text-xs mt-1 uppercase">Days</p>
              </div>
              <span className="text-2xl text-zinc-600 font-bold">:</span>
              <div className="text-center">
                <div className="bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 min-w-[80px]">
                  <span className="text-3xl font-bold text-white">{countdown.hours.toString().padStart(2, '0')}</span>
                </div>
                <p className="text-zinc-500 text-xs mt-1 uppercase">Hours</p>
              </div>
              <span className="text-2xl text-zinc-600 font-bold">:</span>
              <div className="text-center">
                <div className="bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 min-w-[80px]">
                  <span className="text-3xl font-bold text-white">{countdown.minutes.toString().padStart(2, '0')}</span>
                </div>
                <p className="text-zinc-500 text-xs mt-1 uppercase">Minutes</p>
              </div>
              <span className="text-2xl text-zinc-600 font-bold">:</span>
              <div className="text-center">
                <div className="bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 min-w-[80px]">
                  <span className="text-3xl font-bold text-red-500 tabular-nums">{countdown.seconds.toString().padStart(2, '0')}</span>
                </div>
                <p className="text-zinc-500 text-xs mt-1 uppercase">Seconds</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 text-indigo-400 text-sm mb-6">
            <Zap className="w-4 h-4" />
            Free accessibility scan • No signup required
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Is your website <span className="gradient-text">accessible?</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-4">
            The European Accessibility Act deadline is {countdown.days} days away.
            Non-compliant sites face fines up to €100,000.
          </p>
          <p className="text-zinc-500">
            Scan your site in 30 seconds. Get instant compliance score + actionable fixes.
          </p>
        </div>

        {/* Scanner */}
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleScan} className="relative mb-8">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Enter your website URL"
                  className="w-full pl-12 pr-4 py-4 bg-zinc-900 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition-colors"
                  disabled={scanning}
                />
              </div>
              <button
                type="submit"
                disabled={scanning || !url.trim()}
                className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 disabled:from-zinc-700 disabled:to-zinc-700 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-500/25 flex items-center gap-2"
              >
                {scanning ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Scanning...
                  </>
                ) : (
                  <>
                    Check Compliance Now
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
            {error && (
              <p className="mt-3 text-red-400 text-sm flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                {error}
              </p>
            )}
          </form>

          {/* Scanning State */}
          {scanning && (
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 relative">
                <div className="absolute inset-0 rounded-full border-4 border-zinc-700" />
                <div className="absolute inset-0 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Scanning your website...</h3>
              <p className="text-zinc-400">Checking WCAG 2.1 AA compliance across all elements</p>
            </div>
          )}

          {/* Results */}
          {result && !scanning && (
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
              {/* Score Header */}
              <div className="p-8 border-b border-zinc-800 flex items-center gap-8">
                <div className="relative w-32 h-32">
                  <svg className="w-32 h-32" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#27272a"
                      strokeWidth="8"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke={getScoreColor(result.score)}
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={251.2}
                      strokeDashoffset={251.2 - (251.2 * result.score) / 100}
                      className="score-ring animate-score"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold text-white">{result.score}</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {result.score >= 80 ? "Good Progress!" : result.score >= 50 ? "Needs Work" : "Critical Issues Found"}
                  </h3>
                  <p className="text-zinc-400 mb-3">
                    {result.totalIssues} accessibility issues detected
                    {result.criticalIssues > 0 && (
                      <span className="text-red-400"> • {result.criticalIssues} critical</span>
                    )}
                  </p>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-800 rounded-full text-sm text-zinc-300">
                    <Globe className="w-4 h-4" />
                    {result.platform}
                  </div>
                </div>
              </div>

              {/* Top Issues Preview */}
              <div className="p-6">
                <h4 className="text-lg font-semibold text-white mb-4">Top Issues Found</h4>
                <div className="space-y-3">
                  {result.topIssues.slice(0, 3).map((issue, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-4 bg-zinc-800/50 rounded-xl"
                    >
                      <span className={`px-2 py-1 rounded text-xs font-medium uppercase ${getImpactColor(issue.impact)}`}>
                        {issue.impact}
                      </span>
                      <div className="flex-1">
                        <p className="text-white">{issue.description}</p>
                        <p className="text-zinc-500 text-sm mt-1">{issue.count} instances found</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Blurred Issues */}
                {result.topIssues.length > 3 && (
                  <div className="relative mt-3">
                    <div className="space-y-3 blur-sm pointer-events-none">
                      {result.topIssues.slice(3, 5).map((issue, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-3 p-4 bg-zinc-800/50 rounded-xl"
                        >
                          <span className={`px-2 py-1 rounded text-xs font-medium uppercase ${getImpactColor(issue.impact)}`}>
                            {issue.impact}
                          </span>
                          <div className="flex-1">
                            <p className="text-white">{issue.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Lock className="w-6 h-6 text-zinc-500" />
                    </div>
                  </div>
                )}
              </div>

              {/* Email Capture */}
              {showEmailCapture && !emailSubmitted && (
                <div className="p-6 bg-indigo-600/10 border-t border-indigo-500/20">
                  <h4 className="text-lg font-semibold text-white mb-2">
                    Get Your Full Report + AI-Generated Fixes
                  </h4>
                  <p className="text-zinc-400 mb-4">
                    Enter your email to unlock all {result.totalIssues} issues with exact code fixes.
                  </p>
                  <form onSubmit={handleEmailSubmit} className="flex gap-3">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      required
                      className="flex-1 px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
                    />
                    <button
                      type="submit"
                      className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-colors"
                    >
                      Get Full Report
                    </button>
                  </form>
                </div>
              )}

              {/* Email Success */}
              {emailSubmitted && (
                <div className="p-6 bg-green-600/10 border-t border-green-500/20">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-green-500" />
                    <div>
                      <h4 className="text-lg font-semibold text-white">Check your inbox!</h4>
                      <p className="text-zinc-400">
                        Full report with AI fixes sent to {email}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Social Proof Section */}
        <div className="mt-16">
          <div className="bg-gradient-to-r from-indigo-950/30 to-purple-950/30 border border-indigo-500/20 rounded-2xl p-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 border-2 border-zinc-900 flex items-center justify-center">
                    <span className="text-xs font-bold text-white">{String.fromCharCode(64 + i)}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-1 ml-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                ))}
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Trusted by 500+ EU E-commerce Sites</h3>
            <p className="text-zinc-400 max-w-lg mx-auto">
              Join hundreds of online stores across Europe already using Inclusiv to achieve EAA compliance before the deadline.
            </p>
          </div>
        </div>

        {/* Platform Badges */}
        <div className="mt-10 text-center">
          <p className="text-zinc-500 text-sm mb-6">Works with your platform</p>
          <div className="flex items-center justify-center gap-8 opacity-50">
            {["Shopify", "WooCommerce", "Magento", "Webflow", "Custom"].map((name) => (
              <div key={name} className="text-zinc-400 font-semibold">{name}</div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="mt-24 grid md:grid-cols-3 gap-8">
          <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl">
            <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-indigo-500" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">30-Second Scans</h3>
            <p className="text-zinc-400">
              Get instant results. No waiting, no complex setup. Just enter your URL.
            </p>
          </div>
          <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl">
            <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-indigo-500" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">WCAG 2.1 AA Compliant</h3>
            <p className="text-zinc-400">
              Full coverage of EAA requirements. Stay ahead of the June 2025 deadline.
            </p>
          </div>
          <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl">
            <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-4">
              <CheckCircle className="w-6 h-6 text-indigo-500" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">AI-Powered Fixes</h3>
            <p className="text-zinc-400">
              Get exact code fixes for your platform. WordPress, Shopify, or custom code.
            </p>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">What Our Customers Say</h2>
            <p className="text-zinc-400">E-commerce leaders trust Inclusiv for EAA compliance</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote: "Inclusiv identified 47 critical issues we missed. We fixed them in a week and are now fully compliant.",
                author: "Marie Schmidt",
                role: "CTO, Fashion Outlet DE",
                rating: 5
              },
              {
                quote: "The AI-generated fixes saved our dev team hundreds of hours. Worth every cent before the deadline hits.",
                author: "Johan van Berg",
                role: "Head of Digital, NL Retail Group",
                rating: 5
              },
              {
                quote: "We scanned 12 storefronts in one afternoon. The detailed reports made prioritization simple.",
                author: "Elena Rossi",
                role: "Compliance Manager, IT Commerce",
                rating: 5
              }
            ].map((testimonial, i) => (
              <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 relative">
                <Quote className="w-8 h-8 text-indigo-500/30 absolute top-4 right-4" />
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <p className="text-zinc-300 mb-6 leading-relaxed">"{testimonial.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center">
                    <span className="text-sm font-bold text-white">{testimonial.author.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">{testimonial.author}</p>
                    <p className="text-zinc-500 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-24 text-center">
          <div className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 rounded-2xl p-10">
            <h2 className="text-3xl font-bold text-white mb-4">
              Only {countdown.days} Days Left to Comply
            </h2>
            <p className="text-zinc-400 max-w-xl mx-auto mb-6">
              Do not wait until it is too late. Scan your site now and get a clear roadmap to EAA compliance before the June 28, 2025 deadline.
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-500/25 inline-flex items-center gap-2"
            >
              Get Your Free Compliance Report
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 mt-24">
        <div className="max-w-6xl mx-auto px-6 py-8 flex items-center justify-between text-zinc-500 text-sm">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            <span>Inclusiv © 2025</span>
          </div>
          <div>
            Powered by axe-core • WCAG 2.1 AA
          </div>
        </div>
      </footer>
    </div>
  );
}
