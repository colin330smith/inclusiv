'use client';

import { useState } from 'react';
import { Shield, Swords, Trophy, Share2, Twitter, Linkedin, Copy, Check, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';

interface ScanResult {
  url: string;
  score: number;
  issues: number;
  critical: number;
}

export default function ChallengePage() {
  const [challengerUrl, setChallengerUrl] = useState('');
  const [opponentUrl, setOpponentUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<{ challenger: ScanResult | null; opponent: ScanResult | null }>({
    challenger: null,
    opponent: null,
  });
  const [copied, setCopied] = useState(false);

  const handleChallenge = async () => {
    if (!challengerUrl || !opponentUrl) return;

    setLoading(true);
    setResults({ challenger: null, opponent: null });

    try {
      const [challengerRes, opponentRes] = await Promise.all([
        fetch('/api/scan', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: challengerUrl }),
        }),
        fetch('/api/scan', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: opponentUrl }),
        }),
      ]);

      const [challengerData, opponentData] = await Promise.all([
        challengerRes.json(),
        opponentRes.json(),
      ]);

      setResults({
        challenger: {
          url: challengerUrl,
          score: challengerData.score || 0,
          issues: challengerData.totalIssues || 0,
          critical: challengerData.criticalIssues || 0,
        },
        opponent: {
          url: opponentUrl,
          score: opponentData.score || 0,
          issues: opponentData.totalIssues || 0,
          critical: opponentData.criticalIssues || 0,
        },
      });
    } catch (error) {
      console.error('Challenge scan failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const getWinner = () => {
    if (!results.challenger || !results.opponent) return null;
    if (results.challenger.score > results.opponent.score) return 'challenger';
    if (results.opponent.score > results.challenger.score) return 'opponent';
    return 'tie';
  };

  const winner = getWinner();

  const getChallengeUrl = () => {
    if (typeof window === 'undefined') return '';
    const params = new URLSearchParams({
      challenger: challengerUrl,
      opponent: opponentUrl,
    });
    return `${window.location.origin}/challenge?${params.toString()}`;
  };

  const getShareText = () => {
    if (!results.challenger || !results.opponent) return '';
    const winnerSite = winner === 'challenger' ? challengerUrl : opponentUrl;
    const winnerScore = winner === 'challenger' ? results.challenger.score : results.opponent.score;
    return `${new URL(winnerSite).hostname} wins the accessibility challenge with a score of ${winnerScore}/100! Check your site:`;
  };

  const copyLink = () => {
    navigator.clipboard.writeText(getChallengeUrl());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
            href="/"
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-colors text-sm"
          >
            Free Scan
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 rounded-full text-orange-400 text-sm mb-6">
            <Swords className="w-4 h-4" />
            Accessibility Challenge
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Challenge Your <span className="text-orange-400">Competitor</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            See who has better accessibility compliance. Challenge any website and share the results.
          </p>
        </div>

        {/* Challenge Form */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 mb-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Your Site */}
            <div>
              <label className="block text-white font-medium mb-2">
                Your Website
              </label>
              <input
                type="url"
                value={challengerUrl}
                onChange={(e) => setChallengerUrl(e.target.value)}
                placeholder="https://yoursite.com"
                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-zinc-400 focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Competitor */}
            <div>
              <label className="block text-white font-medium mb-2">
                Competitor Website
              </label>
              <input
                type="url"
                value={opponentUrl}
                onChange={(e) => setOpponentUrl(e.target.value)}
                placeholder="https://competitor.com"
                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-zinc-400 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <button
            onClick={handleChallenge}
            disabled={loading || !challengerUrl || !opponentUrl}
            className="mt-6 w-full py-4 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 disabled:from-zinc-700 disabled:to-zinc-700 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Scanning Both Sites...
              </>
            ) : (
              <>
                <Swords className="w-5 h-5" />
                Start Challenge
              </>
            )}
          </button>
        </div>

        {/* Results */}
        {results.challenger && results.opponent && (
          <div className="space-y-8">
            {/* Winner Banner */}
            {winner && winner !== 'tie' && (
              <div className="bg-gradient-to-r from-yellow-600/20 to-orange-600/20 border border-yellow-500/30 rounded-2xl p-6 text-center">
                <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
                <h2 className="text-2xl font-bold text-white mb-2">
                  {new URL(winner === 'challenger' ? challengerUrl : opponentUrl).hostname} Wins!
                </h2>
                <p className="text-zinc-400">
                  With a score of {winner === 'challenger' ? results.challenger.score : results.opponent.score}/100
                </p>
              </div>
            )}

            {winner === 'tie' && (
              <div className="bg-zinc-800 rounded-2xl p-6 text-center">
                <h2 className="text-2xl font-bold text-white mb-2">It&apos;s a Tie!</h2>
                <p className="text-zinc-400">Both sites scored {results.challenger.score}/100</p>
              </div>
            )}

            {/* Score Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Challenger */}
              <div className={`bg-zinc-900 border rounded-2xl p-6 ${
                winner === 'challenger' ? 'border-yellow-500/50' : 'border-zinc-800'
              }`}>
                {winner === 'challenger' && (
                  <div className="flex items-center gap-2 text-yellow-400 text-sm mb-4">
                    <Trophy className="w-4 h-4" />
                    Winner
                  </div>
                )}
                <p className="text-zinc-400 text-sm mb-2 truncate">{challengerUrl}</p>
                <div className="flex items-end gap-4 mb-4">
                  <div className={`text-5xl font-bold ${
                    results.challenger.score >= 80 ? 'text-green-400' :
                    results.challenger.score >= 50 ? 'text-yellow-400' : 'text-red-400'
                  }`}>
                    {results.challenger.score}
                  </div>
                  <span className="text-zinc-500 text-xl mb-1">/100</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-zinc-500">Issues</span>
                    <p className="text-white font-medium">{results.challenger.issues}</p>
                  </div>
                  <div>
                    <span className="text-zinc-500">Critical</span>
                    <p className="text-red-400 font-medium">{results.challenger.critical}</p>
                  </div>
                </div>
              </div>

              {/* Opponent */}
              <div className={`bg-zinc-900 border rounded-2xl p-6 ${
                winner === 'opponent' ? 'border-yellow-500/50' : 'border-zinc-800'
              }`}>
                {winner === 'opponent' && (
                  <div className="flex items-center gap-2 text-yellow-400 text-sm mb-4">
                    <Trophy className="w-4 h-4" />
                    Winner
                  </div>
                )}
                <p className="text-zinc-400 text-sm mb-2 truncate">{opponentUrl}</p>
                <div className="flex items-end gap-4 mb-4">
                  <div className={`text-5xl font-bold ${
                    results.opponent.score >= 80 ? 'text-green-400' :
                    results.opponent.score >= 50 ? 'text-yellow-400' : 'text-red-400'
                  }`}>
                    {results.opponent.score}
                  </div>
                  <span className="text-zinc-500 text-xl mb-1">/100</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-zinc-500">Issues</span>
                    <p className="text-white font-medium">{results.opponent.issues}</p>
                  </div>
                  <div>
                    <span className="text-zinc-500">Critical</span>
                    <p className="text-red-400 font-medium">{results.opponent.critical}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Share Results */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Share2 className="w-5 h-5 text-indigo-400" />
                <h3 className="text-white font-bold">Share Challenge Results</h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(getShareText())}&url=${encodeURIComponent(getChallengeUrl())}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-xl transition-colors"
                >
                  <Twitter className="w-4 h-4 text-zinc-300" />
                  <span className="text-sm text-zinc-300">Twitter</span>
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(getChallengeUrl())}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-xl transition-colors"
                >
                  <Linkedin className="w-4 h-4 text-zinc-300" />
                  <span className="text-sm text-zinc-300">LinkedIn</span>
                </a>
                <button
                  onClick={copyLink}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-xl transition-colors col-span-2"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-green-400" />
                      <span className="text-sm text-green-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-zinc-300" />
                      <span className="text-sm text-zinc-300">Copy Challenge Link</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* How It Works */}
        <div className="mt-12 bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
          <h2 className="text-xl font-bold text-white mb-6 text-center">Why Challenge Competitors?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-orange-500/10 flex items-center justify-center">
                <Trophy className="w-6 h-6 text-orange-400" />
              </div>
              <h3 className="text-white font-medium mb-2">Benchmark Performance</h3>
              <p className="text-zinc-400 text-sm">
                See how your accessibility compares to competitors in your industry.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-orange-500/10 flex items-center justify-center">
                <Share2 className="w-6 h-6 text-orange-400" />
              </div>
              <h3 className="text-white font-medium mb-2">Share Your Win</h3>
              <p className="text-zinc-400 text-sm">
                If you&apos;re winning, share it! Great for marketing and building trust.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-orange-500/10 flex items-center justify-center">
                <Shield className="w-6 h-6 text-orange-400" />
              </div>
              <h3 className="text-white font-medium mb-2">Motivate Improvement</h3>
              <p className="text-zinc-400 text-sm">
                If you&apos;re behind, use it as motivation to fix issues and catch up.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-500/25"
          >
            <Shield className="w-5 h-5" />
            Get Full Accessibility Report
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-8 mt-12">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-6 text-sm">
            <Link href="/tools" className="text-zinc-400 hover:text-white transition-colors">
              Free Tools
            </Link>
            <Link href="/compare-sites" className="text-zinc-400 hover:text-white transition-colors">
              Compare Sites
            </Link>
            <Link href="/leaderboard" className="text-zinc-400 hover:text-white transition-colors">
              Leaderboard
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
