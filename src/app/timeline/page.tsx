"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Shield,
  Search,
  Clock,
  TrendingUp,
  Globe,
  Zap,
  ArrowRight,
  BarChart3,
  Calendar,
  Target,
  CheckCircle,
} from "lucide-react";

export default function TimelineLandingPage() {
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

    router.push(`/timeline/${encodeURIComponent(cleanDomain)}`);
  };

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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/30 rounded-full text-indigo-400 text-sm mb-6">
            <Clock className="w-4 h-4" />
            Progress Tracking
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Accessibility Progress Timeline
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Track your website's accessibility improvements over time.
            See how your score has evolved with each scan.
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 mb-12">
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
            <label className="block text-white font-medium mb-3 text-center">
              Enter website domain to view timeline
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
                  <TrendingUp className="w-5 h-5" />
                )}
                View
              </button>
            </div>
          </form>
        </div>

        {/* What You'll See */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-white text-center mb-8">
            What Your Timeline Shows
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: BarChart3,
                title: "Score History",
                description: "Visual graph showing how your accessibility score has changed over time",
              },
              {
                icon: Calendar,
                title: "Scan Events",
                description: "Timeline of all scans with score changes and key events marked",
              },
              {
                icon: Target,
                title: "Issue Tracking",
                description: "See how the number of issues has decreased with each fix",
              },
              {
                icon: TrendingUp,
                title: "Improvement Rate",
                description: "Metrics showing your rate of progress toward full compliance",
              },
            ].map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="bg-zinc-900 border border-zinc-800 rounded-xl p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-indigo-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-zinc-400 text-sm">{feature.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Why Track Progress */}
        <div className="bg-gradient-to-r from-green-600/10 to-emerald-600/10 border border-green-500/30 rounded-2xl p-8 mb-12">
          <h2 className="text-xl font-bold text-white text-center mb-8">
            Why Track Your Progress?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Prove Compliance",
                description: "Show stakeholders and auditors your ongoing commitment to accessibility",
              },
              {
                title: "Measure ROI",
                description: "Quantify the improvements from your accessibility investments",
              },
              {
                title: "Stay Accountable",
                description: "Keep your team motivated with visible progress and milestones",
              },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                <p className="text-zinc-400 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sample Timeline Preview */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 mb-12">
          <h2 className="text-xl font-bold text-white text-center mb-8">
            Sample Timeline Preview
          </h2>
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-zinc-700" />

            {/* Timeline Events */}
            <div className="space-y-8">
              {[
                { date: "Jan 15", score: 45, change: null, event: "Initial scan" },
                { date: "Jan 22", score: 58, change: "+13", event: "Fixed critical issues" },
                { date: "Feb 5", score: 72, change: "+14", event: "Alt text added" },
                { date: "Feb 19", score: 85, change: "+13", event: "Keyboard navigation fixed" },
              ].map((event, index) => (
                <div key={index} className="relative flex items-center gap-6 pl-16">
                  <div className="absolute left-6 w-4 h-4 bg-indigo-500 rounded-full border-4 border-zinc-900" />
                  <div className="flex-1 bg-zinc-800 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-zinc-400 text-sm">{event.date}</span>
                      {event.change && (
                        <span className="text-green-400 text-sm font-medium">
                          {event.change}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white font-medium">{event.event}</span>
                      <span className="text-indigo-400 font-bold">
                        Score: {event.score}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Start Tracking Your Progress
          </h2>
          <p className="text-zinc-400 mb-6 max-w-xl mx-auto">
            Run your first scan and start building your accessibility improvement timeline.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/#scanner"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-500/25"
            >
              <Zap className="w-5 h-5" />
              Scan Your Website Free
            </Link>
            <Link
              href="/report"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold rounded-xl transition-colors"
            >
              View Report
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-8 mt-12">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-zinc-500 text-sm mb-4">
            Timeline data is updated with each scan to track your progress.
          </p>
          <div className="flex items-center justify-center gap-6 text-sm">
            <Link
              href="/"
              className="text-zinc-400 hover:text-white transition-colors"
            >
              Home
            </Link>
            <Link
              href="/report"
              className="text-zinc-400 hover:text-white transition-colors"
            >
              Reports
            </Link>
            <Link
              href="/verify"
              className="text-zinc-400 hover:text-white transition-colors"
            >
              Verify Badge
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
