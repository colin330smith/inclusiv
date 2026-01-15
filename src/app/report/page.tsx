"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Shield,
  Search,
  FileText,
  BarChart3,
  Globe,
  Zap,
  ArrowRight,
  CheckCircle,
  Download,
  Share2,
  Printer,
} from "lucide-react";

export default function ReportLandingPage() {
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

    router.push(`/report/${encodeURIComponent(cleanDomain)}`);
  };

  const reportFeatures = [
    {
      icon: BarChart3,
      title: "Executive Summary",
      description: "Quick overview with score, compliance status, and key metrics",
    },
    {
      icon: FileText,
      title: "Issue Breakdown",
      description: "Detailed categorization of all accessibility issues found",
    },
    {
      icon: CheckCircle,
      title: "Fix Recommendations",
      description: "Prioritized list of fixes with technical implementation guidance",
    },
    {
      icon: Share2,
      title: "Competitor Analysis",
      description: "See how you compare against industry competitors",
    },
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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/30 rounded-full text-indigo-400 text-sm mb-6">
            <FileText className="w-4 h-4" />
            Accessibility Reports
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Generate Accessibility Report
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Get a detailed, shareable accessibility report for any website.
            Perfect for audits, client presentations, and compliance documentation.
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 mb-12">
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
            <label className="block text-white font-medium mb-3 text-center">
              Enter website domain to generate report
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
                  <FileText className="w-5 h-5" />
                )}
                Generate
              </button>
            </div>
          </form>
        </div>

        {/* Report Features */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-white text-center mb-8">
            What's Included in Your Report
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {reportFeatures.map((feature) => {
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

        {/* Export Options */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 mb-12">
          <h2 className="text-xl font-bold text-white text-center mb-8">
            Multiple Export Options
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Share2,
                title: "Share Link",
                description: "Get a unique URL to share the report with anyone",
              },
              {
                icon: Printer,
                title: "Print PDF",
                description: "Print-optimized format for documentation",
              },
              {
                icon: Download,
                title: "Email Delivery",
                description: "Send the report directly to your inbox",
              },
            ].map((option) => {
              const Icon = option.icon;
              return (
                <div key={option.title} className="text-center">
                  <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-indigo-400" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">{option.title}</h3>
                  <p className="text-zinc-400 text-sm">{option.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Use Cases */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-white text-center mb-8">
            Popular Use Cases
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Client Presentations",
                description: "Professional reports to show clients their accessibility status and needed improvements",
              },
              {
                title: "Compliance Audits",
                description: "Documentation for EAA, ADA, or internal compliance requirements",
              },
              {
                title: "Competitive Analysis",
                description: "Compare your site against competitors and identify opportunities",
              },
            ].map((useCase) => (
              <div
                key={useCase.title}
                className="bg-zinc-900 border border-zinc-800 rounded-xl p-6"
              >
                <h3 className="text-lg font-semibold text-white mb-2">
                  {useCase.title}
                </h3>
                <p className="text-zinc-400 text-sm">{useCase.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Need a More Detailed Audit?
          </h2>
          <p className="text-zinc-400 mb-6 max-w-xl mx-auto">
            Our professional audits include manual testing, remediation guidance,
            and ongoing support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/audit"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-500/25"
            >
              <Zap className="w-5 h-5" />
              Request Professional Audit
            </Link>
            <Link
              href="/#scanner"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold rounded-xl transition-colors"
            >
              Try Free Scanner
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-8 mt-12">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-zinc-500 text-sm mb-4">
            Reports are generated in real-time using the latest scan data.
          </p>
          <div className="flex items-center justify-center gap-6 text-sm">
            <Link
              href="/"
              className="text-zinc-400 hover:text-white transition-colors"
            >
              Home
            </Link>
            <Link
              href="/audit"
              className="text-zinc-400 hover:text-white transition-colors"
            >
              Request Audit
            </Link>
            <Link
              href="/compare-sites"
              className="text-zinc-400 hover:text-white transition-colors"
            >
              Compare Sites
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
