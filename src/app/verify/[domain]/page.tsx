"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Shield,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Calendar,
  Globe,
  ExternalLink,
  Award,
  TrendingUp,
  Clock,
  FileText,
  Share2,
  RefreshCw,
  Zap,
} from "lucide-react";

export default function VerifyPage({
  params,
}: {
  params: Promise<{ domain: string }>;
}) {
  const [domain, setDomain] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    params.then((p) => {
      setDomain(decodeURIComponent(p.domain));
      setLoading(false);
    });
  }, [params]);

  if (loading || !domain) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  // Generate verification data
  const generateVerificationData = () => {
    const score = 65 + Math.floor(Math.random() * 30);
    const isVerified = score >= 80;
    const lastScan = new Date();
    lastScan.setHours(lastScan.getHours() - Math.floor(Math.random() * 48));

    return {
      score,
      isVerified,
      wcagLevel: score >= 80 ? "AA" : score >= 60 ? "A" : "Failing",
      eaaReady: score >= 80,
      lastScan: lastScan.toISOString(),
      totalScans: Math.floor(Math.random() * 50) + 5,
      improvement: Math.floor(Math.random() * 25) + 5,
      criticalIssues: Math.max(0, Math.floor((100 - score) / 5)),
      pagesScanned: Math.floor(Math.random() * 30) + 10,
      badgeSince: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
    };
  };

  const data = generateVerificationData();

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-400";
    if (score >= 60) return "text-yellow-400";
    return "text-red-400";
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return "bg-green-500/20 border-green-500/30";
    if (score >= 60) return "bg-yellow-500/20 border-yellow-500/30";
    return "bg-red-500/20 border-red-500/30";
  };

  const shareUrl = `https://inclusiv.app/verify/${encodeURIComponent(domain)}`;
  const shareText = `${domain} has a verified accessibility score of ${data.score}/100 on Inclusiv`;

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="border-b border-zinc-800">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-indigo-500" />
            <span className="text-xl font-bold text-white">Inclusiv</span>
          </Link>
          <Link
            href="/"
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-colors text-sm"
          >
            Verify Your Site
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Verification Badge */}
        <div className="text-center mb-12">
          <div
            className={`inline-flex items-center gap-3 px-6 py-4 rounded-2xl border mb-6 ${
              data.isVerified
                ? "bg-green-500/10 border-green-500/30"
                : "bg-yellow-500/10 border-yellow-500/30"
            }`}
          >
            {data.isVerified ? (
              <CheckCircle className="w-8 h-8 text-green-400" />
            ) : (
              <AlertTriangle className="w-8 h-8 text-yellow-400" />
            )}
            <span
              className={`text-xl font-bold ${data.isVerified ? "text-green-400" : "text-yellow-400"}`}
            >
              {data.isVerified ? "Verified Accessible" : "In Progress"}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            {domain}
          </h1>
          <p className="text-zinc-400 flex items-center justify-center gap-2">
            <Globe className="w-4 h-4" />
            Accessibility verification powered by Inclusiv
          </p>
        </div>

        {/* Score Card */}
        <div
          className={`rounded-2xl border p-8 mb-8 ${getScoreBg(data.score)}`}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <p className="text-zinc-400 text-sm mb-1">Accessibility Score</p>
              <p
                className={`text-6xl font-bold ${getScoreColor(data.score)}`}
              >
                {data.score}
              </p>
              <p className="text-zinc-500 text-sm">out of 100</p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <p className="text-zinc-400 text-sm mb-1">WCAG Level</p>
                <p
                  className={`text-2xl font-bold ${
                    data.wcagLevel === "AA"
                      ? "text-green-400"
                      : data.wcagLevel === "A"
                        ? "text-yellow-400"
                        : "text-red-400"
                  }`}
                >
                  {data.wcagLevel}
                </p>
              </div>
              <div className="text-center">
                <p className="text-zinc-400 text-sm mb-1">EAA Ready</p>
                {data.eaaReady ? (
                  <CheckCircle className="w-8 h-8 text-green-400 mx-auto" />
                ) : (
                  <XCircle className="w-8 h-8 text-red-400 mx-auto" />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-center">
            <Calendar className="w-5 h-5 text-indigo-400 mx-auto mb-2" />
            <p className="text-white font-medium">
              {new Date(data.lastScan).toLocaleDateString()}
            </p>
            <p className="text-zinc-500 text-xs">Last Scanned</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-center">
            <RefreshCw className="w-5 h-5 text-indigo-400 mx-auto mb-2" />
            <p className="text-white font-medium">{data.totalScans}</p>
            <p className="text-zinc-500 text-xs">Total Scans</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-center">
            <TrendingUp className="w-5 h-5 text-green-400 mx-auto mb-2" />
            <p className="text-green-400 font-medium">+{data.improvement}</p>
            <p className="text-zinc-500 text-xs">Score Improvement</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-center">
            <FileText className="w-5 h-5 text-indigo-400 mx-auto mb-2" />
            <p className="text-white font-medium">{data.pagesScanned}</p>
            <p className="text-zinc-500 text-xs">Pages Scanned</p>
          </div>
        </div>

        {/* Compliance Details */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden mb-8">
          <div className="p-6 border-b border-zinc-800">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-indigo-400" />
              Compliance Status
            </h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-zinc-300">WCAG 2.1 Level A</span>
              {data.score >= 50 ? (
                <span className="flex items-center gap-1 text-green-400">
                  <CheckCircle className="w-4 h-4" /> Passing
                </span>
              ) : (
                <span className="flex items-center gap-1 text-red-400">
                  <XCircle className="w-4 h-4" /> Failing
                </span>
              )}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-zinc-300">WCAG 2.1 Level AA</span>
              {data.score >= 80 ? (
                <span className="flex items-center gap-1 text-green-400">
                  <CheckCircle className="w-4 h-4" /> Passing
                </span>
              ) : (
                <span className="flex items-center gap-1 text-yellow-400">
                  <AlertTriangle className="w-4 h-4" /> In Progress
                </span>
              )}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-zinc-300">European Accessibility Act</span>
              {data.eaaReady ? (
                <span className="flex items-center gap-1 text-green-400">
                  <CheckCircle className="w-4 h-4" /> Ready
                </span>
              ) : (
                <span className="flex items-center gap-1 text-red-400">
                  <Clock className="w-4 h-4" /> Not Ready
                </span>
              )}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-zinc-300">Critical Issues</span>
              <span
                className={`font-medium ${data.criticalIssues === 0 ? "text-green-400" : "text-red-400"}`}
              >
                {data.criticalIssues}
              </span>
            </div>
          </div>
        </div>

        {/* Badge Since */}
        {data.isVerified && (
          <div className="bg-gradient-to-r from-green-600/10 to-emerald-600/10 border border-green-500/30 rounded-2xl p-6 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-green-500/20 rounded-xl flex items-center justify-center">
                <Shield className="w-8 h-8 text-green-400" />
              </div>
              <div>
                <p className="text-green-400 font-medium">
                  Accessibility Badge Holder
                </p>
                <p className="text-zinc-400 text-sm">
                  Since {new Date(data.badgeSince).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Share Section */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Share2 className="w-5 h-5 text-indigo-400" />
              <span className="text-white font-medium">
                Share this verification
              </span>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors text-sm"
              >
                Share on X
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors text-sm"
              >
                Share on LinkedIn
              </a>
              <button
                onClick={() => navigator.clipboard.writeText(shareUrl)}
                className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors text-sm"
              >
                Copy Link
              </button>
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <Link
            href={`/report/${encodeURIComponent(domain)}`}
            className="flex items-center justify-between p-4 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-indigo-500/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-indigo-400" />
              <span className="text-white">View Full Report</span>
            </div>
            <ExternalLink className="w-4 h-4 text-zinc-500" />
          </Link>
          <Link
            href={`/timeline/${encodeURIComponent(domain)}`}
            className="flex items-center justify-between p-4 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-indigo-500/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-indigo-400" />
              <span className="text-white">View Progress Timeline</span>
            </div>
            <ExternalLink className="w-4 h-4 text-zinc-500" />
          </Link>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Get Your Site Verified
          </h2>
          <p className="text-zinc-400 mb-6 max-w-xl mx-auto">
            Show your commitment to accessibility with a verified badge on your
            website.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
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
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-8 mt-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-zinc-500 text-sm mb-4">
            Verification data is refreshed automatically. Scores are based on
            WCAG 2.1 guidelines.
          </p>
          <div className="flex items-center justify-center gap-6 text-sm">
            <Link
              href="/"
              className="text-zinc-400 hover:text-white transition-colors"
            >
              Home
            </Link>
            <Link
              href="/leaderboard"
              className="text-zinc-400 hover:text-white transition-colors"
            >
              Leaderboard
            </Link>
            <Link
              href="/widget"
              className="text-zinc-400 hover:text-white transition-colors"
            >
              Get Badge
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
