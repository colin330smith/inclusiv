'use client';

import { useState } from 'react';
import { Shield, Zap, Trophy, AlertTriangle, Share2, Twitter, Linkedin, Copy, Check, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { SiteFooter } from '@/components/seo/SiteFooter';
import { EAACountdown } from '@/components/EAACountdown';

interface ScanResult {
  url: string;
  score: number;
  issues: number;
  critical: number;
  loading: boolean;
  error: string | null;
}

export default function CompareSitesPage() {
  const [site1, setSite1] = useState<ScanResult>({
    url: '',
    score: 0,
    issues: 0,
    critical: 0,
    loading: false,
    error: null,
  });
  const [site2, setSite2] = useState<ScanResult>({
    url: '',
    score: 0,
    issues: 0,
    critical: 0,
    loading: false,
    error: null,
  });
  const [compared, setCompared] = useState(false);
  const [copied, setCopied] = useState(false);

  const scanSite = async (url: string, setSite: React.Dispatch<React.SetStateAction<ScanResult>>) => {
    let scanUrl = url.trim();
    if (!scanUrl.startsWith('http')) {
      scanUrl = 'https://' + scanUrl;
    }

    setSite(prev => ({ ...prev, loading: true, error: null }));

    try {
      const response = await fetch('/api/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: scanUrl }),
      });

      if (!response.ok) {
        throw new Error('Failed to scan');
      }

      const data = await response.json();
      setSite({
        url: scanUrl,
        score: data.score,
        issues: data.totalIssues,
        critical: data.criticalIssues,
        loading: false,
        error: null,
      });
    } catch {
      setSite(prev => ({
        ...prev,
        loading: false,
        error: 'Could not scan this site',
      }));
    }
  };

  const handleCompare = async (e: React.FormEvent) => {
    e.preventDefault();
    setCompared(false);

    await Promise.all([
      scanSite(site1.url, setSite1),
      scanSite(site2.url, setSite2),
    ]);

    setCompared(true);
  };

  const getWinner = () => {
    if (site1.score > site2.score) return 1;
    if (site2.score > site1.score) return 2;
    return 0;
  };

  const getHostname = (url: string) => {
    try {
      return new URL(url).hostname.replace('www.', '');
    } catch {
      return url;
    }
  };

  const getShareUrl = () => {
    const params = new URLSearchParams({
      site1: site1.url,
      score1: site1.score.toString(),
      site2: site2.url,
      score2: site2.score.toString(),
    });
    return `https://tryinclusiv.com/compare-sites?${params.toString()}`;
  };

  const getShareText = () => {
    const winner = getWinner();
    if (winner === 1) {
      return `${getHostname(site1.url)} (${site1.score}/100) beats ${getHostname(site2.url)} (${site2.score}/100) in accessibility! Compare your site:`;
    } else if (winner === 2) {
      return `${getHostname(site2.url)} (${site2.score}/100) beats ${getHostname(site1.url)} (${site1.score}/100) in accessibility! Compare your site:`;
    }
    return `${getHostname(site1.url)} and ${getHostname(site2.url)} tied at ${site1.score}/100 in accessibility! Compare your site:`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getShareUrl());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const winner = compared ? getWinner() : 0;

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
            href="/"
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-colors text-sm"
          >
            Single Site Scan
          </Link>
        </div>
      </header>

      {/* EAA Deadline Urgency Banner */}
      <EAACountdown variant="banner" showCTA={true} />

      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-500/10 rounded-full text-orange-400 text-sm font-medium mb-4">
            <Trophy className="w-4 h-4" />
            Accessibility Battle
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Compare Two Websites
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            See which site is more accessible. Compare your site against a competitor,
            or challenge a friend to an accessibility showdown.
          </p>
        </div>

        {/* Comparison Form */}
        <form onSubmit={handleCompare} className="mb-12">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Site 1 */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <label className="block text-sm text-zinc-400 mb-2">Site 1 (Your site)</label>
              <input
                type="text"
                value={site1.url}
                onChange={(e) => setSite1(prev => ({ ...prev, url: e.target.value }))}
                placeholder="yoursite.com"
                required
                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
              />
              {site1.error && (
                <p className="text-red-400 text-sm mt-2">{site1.error}</p>
              )}
            </div>

            {/* Site 2 */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <label className="block text-sm text-zinc-400 mb-2">Site 2 (Competitor)</label>
              <input
                type="text"
                value={site2.url}
                onChange={(e) => setSite2(prev => ({ ...prev, url: e.target.value }))}
                placeholder="competitor.com"
                required
                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
              />
              {site2.error && (
                <p className="text-red-400 text-sm mt-2">{site2.error}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={site1.loading || site2.loading}
            className="w-full md:w-auto mx-auto flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:from-zinc-700 disabled:to-zinc-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-500/25"
          >
            {site1.loading || site2.loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Scanning Both Sites...
              </>
            ) : (
              <>
                <Zap className="w-5 h-5" />
                Compare Now
              </>
            )}
          </button>
        </form>

        {/* Results */}
        {compared && !site1.error && !site2.error && (
          <div className="space-y-8">
            {/* Winner Banner */}
            {winner !== 0 && (
              <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-2xl p-6 text-center">
                <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
                <h2 className="text-2xl font-bold text-white mb-2">
                  {getHostname(winner === 1 ? site1.url : site2.url)} Wins!
                </h2>
                <p className="text-zinc-400">
                  With a score of {winner === 1 ? site1.score : site2.score}/100 vs {winner === 1 ? site2.score : site1.score}/100
                </p>
              </div>
            )}

            {/* Score Comparison */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Site 1 Result */}
              <div className={`bg-zinc-900 border rounded-2xl p-6 ${winner === 1 ? 'border-yellow-500/50' : 'border-zinc-800'}`}>
                {winner === 1 && (
                  <div className="flex items-center gap-2 mb-4">
                    <Trophy className="w-5 h-5 text-yellow-400" />
                    <span className="text-yellow-400 font-medium text-sm">Winner</span>
                  </div>
                )}
                <h3 className="text-lg font-semibold text-white mb-4 truncate">
                  {getHostname(site1.url)}
                </h3>
                <div className="flex items-center justify-center mb-4">
                  <div className="relative w-32 h-32">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="40" fill="none" stroke="#27272a" strokeWidth="8" />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke={site1.score >= 80 ? '#22c55e' : site1.score >= 50 ? '#f59e0b' : '#ef4444'}
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={251.2}
                        strokeDashoffset={251.2 - (251.2 * site1.score) / 100}
                        transform="rotate(-90 50 50)"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-4xl font-bold text-white">{site1.score}</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-white">{site1.issues}</p>
                    <p className="text-sm text-zinc-400">Issues</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-red-400">{site1.critical}</p>
                    <p className="text-sm text-zinc-400">Critical</p>
                  </div>
                </div>
              </div>

              {/* Site 2 Result */}
              <div className={`bg-zinc-900 border rounded-2xl p-6 ${winner === 2 ? 'border-yellow-500/50' : 'border-zinc-800'}`}>
                {winner === 2 && (
                  <div className="flex items-center gap-2 mb-4">
                    <Trophy className="w-5 h-5 text-yellow-400" />
                    <span className="text-yellow-400 font-medium text-sm">Winner</span>
                  </div>
                )}
                <h3 className="text-lg font-semibold text-white mb-4 truncate">
                  {getHostname(site2.url)}
                </h3>
                <div className="flex items-center justify-center mb-4">
                  <div className="relative w-32 h-32">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="40" fill="none" stroke="#27272a" strokeWidth="8" />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke={site2.score >= 80 ? '#22c55e' : site2.score >= 50 ? '#f59e0b' : '#ef4444'}
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={251.2}
                        strokeDashoffset={251.2 - (251.2 * site2.score) / 100}
                        transform="rotate(-90 50 50)"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-4xl font-bold text-white">{site2.score}</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-white">{site2.issues}</p>
                    <p className="text-sm text-zinc-400">Issues</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-red-400">{site2.critical}</p>
                    <p className="text-sm text-zinc-400">Critical</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Share Results */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Share2 className="w-5 h-5 text-indigo-400" />
                Share This Comparison
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(getShareText())}&url=${encodeURIComponent(getShareUrl())}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors"
                >
                  <Twitter className="w-4 h-4 text-zinc-400" />
                  <span className="text-sm text-zinc-300">Twitter</span>
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(getShareUrl())}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors"
                >
                  <Linkedin className="w-4 h-4 text-zinc-400" />
                  <span className="text-sm text-zinc-300">LinkedIn</span>
                </a>
                <button
                  onClick={handleCopy}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors col-span-2"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-green-400" />
                      <span className="text-sm text-green-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-zinc-400" />
                      <span className="text-sm text-zinc-300">Copy Link</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Warning for low scores */}
            {(site1.score < 70 || site2.score < 70) && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Compliance Warning
                    </h3>
                    <p className="text-zinc-400 mb-4">
                      {site1.score < 70 && site2.score < 70
                        ? 'Both sites may not meet EAA compliance requirements.'
                        : `${getHostname(site1.score < 70 ? site1.url : site2.url)} may not meet EAA compliance requirements.`}
                      {' '}Non-compliant websites face fines up to €100,000.
                    </p>
                    <Link
                      href="/pricing"
                      className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300"
                    >
                      Get help fixing issues <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* How it works */}
        {!compared && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-12">
            <h2 className="text-lg font-semibold text-white mb-4">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-10 h-10 bg-indigo-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-indigo-400 font-bold">1</span>
                </div>
                <h3 className="text-white font-medium mb-1">Enter Two URLs</h3>
                <p className="text-sm text-zinc-400">Your site and a competitor, or any two websites</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 bg-indigo-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-indigo-400 font-bold">2</span>
                </div>
                <h3 className="text-white font-medium mb-1">We Scan Both</h3>
                <p className="text-sm text-zinc-400">Full WCAG 2.1 accessibility audit on each site</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 bg-indigo-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-indigo-400 font-bold">3</span>
                </div>
                <h3 className="text-white font-medium mb-1">See the Winner</h3>
                <p className="text-sm text-zinc-400">Share the results and challenge others</p>
              </div>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            Want Detailed Fix Instructions?
          </h2>
          <p className="text-zinc-400 mb-6 max-w-xl mx-auto">
            Get a full accessibility report with copy-paste code fixes for every issue.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-500/25"
          >
            Get Full Scan Report
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
