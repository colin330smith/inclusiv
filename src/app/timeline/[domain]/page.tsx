import { Metadata } from 'next';
import Link from 'next/link';
import { Shield, TrendingUp, TrendingDown, Calendar, CheckCircle, AlertTriangle, Zap, Share2, Clock, ArrowRight } from 'lucide-react';

interface Props {
  params: Promise<{ domain: string }>;
}

// Generate demo timeline data
function generateTimelineData(domain: string) {
  const baseScore = 45 + Math.floor(Math.random() * 20);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentMonth = new Date().getMonth();

  const timeline = [];
  let score = baseScore;

  for (let i = 5; i >= 0; i--) {
    const monthIndex = (currentMonth - i + 12) % 12;
    const improvement = Math.floor(Math.random() * 8) + 2;
    score = Math.min(98, score + improvement);

    const issues = Math.max(0, 50 - Math.floor((score / 100) * 45));

    timeline.push({
      month: months[monthIndex],
      year: currentMonth - i < 0 ? 2024 : 2025,
      score,
      issues,
      criticalIssues: Math.max(0, issues - Math.floor(Math.random() * 20)),
      fixedSinceLastScan: Math.floor(Math.random() * 15) + 5,
      scanDate: new Date(2025, monthIndex, 15).toISOString(),
    });
  }

  return timeline;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { domain } = await params;
  const decodedDomain = decodeURIComponent(domain);

  return {
    title: `${decodedDomain} Accessibility Progress | Score Timeline`,
    description: `Track ${decodedDomain}'s accessibility improvement journey. See historical scores, issues fixed, and compliance progress over time.`,
    openGraph: {
      title: `${decodedDomain} - Accessibility Progress Timeline`,
      description: `Watch how ${decodedDomain} is improving web accessibility over time.`,
    },
  };
}

export default async function TimelinePage({ params }: Props) {
  const { domain } = await params;
  const decodedDomain = decodeURIComponent(domain);
  const timeline = generateTimelineData(decodedDomain);

  const latestScan = timeline[timeline.length - 1];
  const firstScan = timeline[0];
  const totalImprovement = latestScan.score - firstScan.score;
  const totalFixed = timeline.reduce((acc, t) => acc + t.fixedSinceLastScan, 0);
  const isCompliant = latestScan.score >= 80;

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const shareUrl = `https://inclusiv.app/timeline/${encodeURIComponent(decodedDomain)}`;
  const shareText = `${decodedDomain} improved their accessibility score by ${totalImprovement} points! Track your progress:`;

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-indigo-500" />
            <span className="text-xl font-bold text-white">Inclusiv</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/leaderboard" className="text-zinc-400 hover:text-white transition-colors text-sm">
              Leaderboard
            </Link>
            <Link
              href="/"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-colors text-sm"
            >
              Free Scan
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 rounded-full text-indigo-400 text-sm mb-6">
            <Calendar className="w-4 h-4" />
            Progress Timeline
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="text-indigo-400">{decodedDomain}</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Accessibility improvement journey over the past 6 months
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-12">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className={`text-4xl font-bold ${getScoreColor(latestScan.score)}`}>
                {latestScan.score}
              </span>
              {totalImprovement > 0 && <TrendingUp className="w-6 h-6 text-green-400" />}
            </div>
            <p className="text-zinc-400 text-sm">Current Score</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 text-center">
            <p className="text-4xl font-bold text-green-400">+{totalImprovement}</p>
            <p className="text-zinc-400 text-sm">Points Gained</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 text-center">
            <p className="text-4xl font-bold text-indigo-400">{totalFixed}</p>
            <p className="text-zinc-400 text-sm">Issues Fixed</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              {isCompliant ? (
                <>
                  <CheckCircle className="w-6 h-6 text-green-400" />
                  <span className="text-green-400 font-bold">Compliant</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-6 h-6 text-red-400" />
                  <span className="text-red-400 font-bold">At Risk</span>
                </>
              )}
            </div>
            <p className="text-zinc-400 text-sm">EAA Status</p>
          </div>
        </div>

        {/* Timeline Graph */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-8">
          <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-indigo-400" />
            Score Progress
          </h2>

          {/* Simple bar chart visualization */}
          <div className="space-y-4">
            {timeline.map((entry, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-16 text-right text-sm text-zinc-400">
                  {entry.month} {entry.year}
                </div>
                <div className="flex-1 relative">
                  <div className="h-8 bg-zinc-800 rounded-lg overflow-hidden">
                    <div
                      className={`h-full rounded-lg transition-all duration-500 ${getScoreBg(entry.score)}`}
                      style={{ width: `${entry.score}%` }}
                    />
                  </div>
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white font-bold text-sm">
                    {entry.score}
                  </span>
                </div>
                <div className="w-24 text-sm">
                  {i > 0 && entry.score > timeline[i - 1].score ? (
                    <span className="text-green-400">+{entry.score - timeline[i - 1].score}</span>
                  ) : i > 0 && entry.score < timeline[i - 1].score ? (
                    <span className="text-red-400">{entry.score - timeline[i - 1].score}</span>
                  ) : (
                    <span className="text-zinc-500">-</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Compliance line indicator */}
          <div className="mt-4 pt-4 border-t border-zinc-800">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-4 h-1 bg-green-500 rounded" />
              <span className="text-zinc-400">Score ≥ 80 = EAA Compliant</span>
            </div>
          </div>
        </div>

        {/* Detailed Timeline */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden mb-8">
          <div className="p-6 border-b border-zinc-800">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-indigo-400" />
              Scan History
            </h2>
          </div>
          <div className="divide-y divide-zinc-800">
            {[...timeline].reverse().map((entry, i) => (
              <div key={i} className="p-6 hover:bg-zinc-800/50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center font-bold text-xl ${
                      entry.score >= 80 ? 'bg-green-500/20 text-green-400' :
                      entry.score >= 60 ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {entry.score}
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        {entry.month} {entry.year}
                      </p>
                      <p className="text-zinc-500 text-sm">
                        {entry.issues} issues • {entry.criticalIssues} critical
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    {entry.fixedSinceLastScan > 0 && (
                      <div className="flex items-center gap-1 text-green-400 text-sm">
                        <CheckCircle className="w-4 h-4" />
                        {entry.fixedSinceLastScan} fixed
                      </div>
                    )}
                    <p className="text-zinc-500 text-xs mt-1">
                      {new Date(entry.scanDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Share Section */}
        <div className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 rounded-2xl p-8 mb-8">
          <div className="text-center">
            <Share2 className="w-8 h-8 text-indigo-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">
              Share Your Progress
            </h2>
            <p className="text-zinc-400 mb-6">
              Proud of your accessibility improvements? Share your journey!
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-medium rounded-xl transition-colors"
              >
                Share on X
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-medium rounded-xl transition-colors"
              >
                Share on LinkedIn
              </a>
              <button
                onClick={() => {
                  if (typeof navigator !== 'undefined') {
                    navigator.clipboard.writeText(shareUrl);
                  }
                }}
                className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-medium rounded-xl transition-colors"
              >
                Copy Link
              </button>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Track Your Own Progress
          </h2>
          <p className="text-zinc-400 mb-6 max-w-xl mx-auto">
            Start your accessibility journey today. Get a free scan and track your improvements over time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-500/25"
            >
              <Zap className="w-5 h-5" />
              Get Your Free Score
            </Link>
            <Link
              href="/monitor"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold rounded-xl transition-colors"
            >
              Start Monitoring
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-8 mt-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-6 text-sm">
            <Link href="/" className="text-zinc-400 hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/leaderboard" className="text-zinc-400 hover:text-white transition-colors">
              Leaderboard
            </Link>
            <Link href="/wall-of-fame" className="text-zinc-400 hover:text-white transition-colors">
              Wall of Fame
            </Link>
            <Link href="/monitor" className="text-zinc-400 hover:text-white transition-colors">
              Monitor
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
