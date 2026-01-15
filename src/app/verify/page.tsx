"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Shield,
  Search,
  CheckCircle,
  Award,
  Globe,
  Zap,
  ArrowRight,
} from "lucide-react";

export default function VerifyLandingPage() {
  const router = useRouter();
  const [domain, setDomain] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!domain.trim()) return;

    setLoading(true);
    // Clean the domain
    let cleanDomain = domain.trim().toLowerCase();
    cleanDomain = cleanDomain.replace(/^https?:\/\//, "").replace(/\/$/, "");

    router.push(`/verify/${encodeURIComponent(cleanDomain)}`);
  };

  const featuredSites = [
    { domain: "apple.com", score: 92 },
    { domain: "microsoft.com", score: 88 },
    { domain: "google.com", score: 85 },
    { domain: "amazon.com", score: 78 },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="border-b border-zinc-800">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-indigo-500" />
            <span className="text-xl font-bold text-white">Inclusiv</span>
          </Link>
          <Link
            href="/#scanner"
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-colors text-sm"
          >
            Scan Your Site
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full text-green-400 text-sm mb-6">
            <CheckCircle className="w-4 h-4" />
            Badge Verification
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Verify Accessibility Badge
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Check the accessibility certification status of any website displaying
            an Inclusiv badge.
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 mb-12">
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
            <label className="block text-white font-medium mb-3 text-center">
              Enter website domain to verify
            </label>
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                <input
                  type="text"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  placeholder="example.com"
                  className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 text-lg"
                />
              </div>
              <button
                type="submit"
                disabled={loading || !domain.trim()}
                className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-zinc-700 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors flex items-center gap-2"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Search className="w-5 h-5" />
                )}
                Verify
              </button>
            </div>
          </form>
        </div>

        {/* Featured Verifications */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-white text-center mb-6">
            Recently Verified Sites
          </h2>
          <div className="grid md:grid-cols-4 gap-4">
            {featuredSites.map((site) => (
              <Link
                key={site.domain}
                href={`/verify/${site.domain}`}
                className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 hover:border-indigo-500/50 transition-colors text-center"
              >
                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                </div>
                <p className="text-white font-medium mb-1">{site.domain}</p>
                <p className="text-green-400 text-sm">Score: {site.score}/100</p>
              </Link>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 mb-12">
          <h2 className="text-xl font-bold text-white text-center mb-8">
            How Badge Verification Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Enter Domain",
                description: "Type in any website domain that displays an Inclusiv accessibility badge",
              },
              {
                step: "2",
                title: "Check Status",
                description: "We verify the badge authenticity and display current accessibility score",
              },
              {
                step: "3",
                title: "View Details",
                description: "See compliance status, scan history, and improvement timeline",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-indigo-400 font-bold">{item.step}</span>
                </div>
                <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                <p className="text-zinc-400 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* What's Verified */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-indigo-400" />
              What We Verify
            </h3>
            <ul className="space-y-3">
              {[
                "Current accessibility score",
                "WCAG 2.1 compliance level (A, AA, AAA)",
                "European Accessibility Act readiness",
                "Scan history and frequency",
                "Score improvement over time",
                "Badge holder status and duration",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-zinc-300">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-indigo-400" />
              Badge Requirements
            </h3>
            <ul className="space-y-3">
              {[
                "Minimum score of 80/100 for verification",
                "Regular scans (at least monthly)",
                "Actively fixing accessibility issues",
                "No critical accessibility barriers",
                "Valid accessibility statement",
                "Commitment to ongoing improvement",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-zinc-300">
                  <CheckCircle className="w-4 h-4 text-indigo-400 mt-1 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Get Your Own Verified Badge
          </h2>
          <p className="text-zinc-400 mb-6 max-w-xl mx-auto">
            Showcase your commitment to accessibility with a verified badge on your
            website.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/#scanner"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-500/25"
            >
              <Zap className="w-5 h-5" />
              Scan Your Site Free
            </Link>
            <Link
              href="/widget"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold rounded-xl transition-colors"
            >
              Get Badge Code
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-8 mt-12">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-zinc-500 text-sm mb-4">
            Badge verification is real-time and reflects the latest scan data.
          </p>
          <div className="flex items-center justify-center gap-6 text-sm">
            <Link
              href="/"
              className="text-zinc-400 hover:text-white transition-colors"
            >
              Home
            </Link>
            <Link
              href="/widget"
              className="text-zinc-400 hover:text-white transition-colors"
            >
              Get Badge
            </Link>
            <Link
              href="/leaderboard"
              className="text-zinc-400 hover:text-white transition-colors"
            >
              Leaderboard
            </Link>
            <Link
              href="/tools"
              className="text-zinc-400 hover:text-white transition-colors"
            >
              Free Tools
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
