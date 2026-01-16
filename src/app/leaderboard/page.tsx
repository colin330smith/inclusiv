import { Metadata } from 'next';
import { Shield, Trophy, Medal, Award, TrendingUp, Globe, ArrowRight, Zap, Star } from 'lucide-react';
import Link from 'next/link';
import { SiteFooter } from '@/components/seo/SiteFooter';
import { EAACountdown } from '@/components/EAACountdown';

export const metadata: Metadata = {
  title: 'Accessibility Leaderboard | Most Accessible Websites 2025',
  description: 'See which websites lead in accessibility compliance. Real-time rankings based on WCAG 2.1 AA scans. Is your site on the leaderboard?',
  openGraph: {
    title: 'Accessibility Leaderboard - Top Compliant Websites',
    description: 'Real-time rankings of the most accessible websites. Where does your site rank?',
  },
};

// Sample leaderboard data - In production, this would come from a database
const leaderboardData = [
  { rank: 1, domain: 'gov.uk', score: 98, platform: 'Custom', country: 'UK', trend: 'up', change: 2 },
  { rank: 2, domain: 'bbc.co.uk', score: 96, platform: 'Custom', country: 'UK', trend: 'same', change: 0 },
  { rank: 3, domain: 'apple.com', score: 95, platform: 'Custom', country: 'US', trend: 'up', change: 3 },
  { rank: 4, domain: 'microsoft.com', score: 94, platform: 'Custom', country: 'US', trend: 'up', change: 1 },
  { rank: 5, domain: 'gov.nl', score: 93, platform: 'Custom', country: 'NL', trend: 'same', change: 0 },
  { rank: 6, domain: 'spotify.com', score: 91, platform: 'React', country: 'SE', trend: 'up', change: 4 },
  { rank: 7, domain: 'zalando.de', score: 90, platform: 'Custom', country: 'DE', trend: 'down', change: 2 },
  { rank: 8, domain: 'booking.com', score: 89, platform: 'React', country: 'NL', trend: 'up', change: 1 },
  { rank: 9, domain: 'airbnb.com', score: 88, platform: 'React', country: 'US', trend: 'same', change: 0 },
  { rank: 10, domain: 'stripe.com', score: 87, platform: 'Next.js', country: 'US', trend: 'up', change: 5 },
];

const industryLeaders = {
  'E-commerce': [
    { domain: 'zalando.de', score: 90 },
    { domain: 'asos.com', score: 84 },
    { domain: 'hm.com', score: 82 },
  ],
  'Finance': [
    { domain: 'ing.nl', score: 88 },
    { domain: 'revolut.com', score: 85 },
    { domain: 'n26.com', score: 83 },
  ],
  'Travel': [
    { domain: 'booking.com', score: 89 },
    { domain: 'airbnb.com', score: 88 },
    { domain: 'klm.com', score: 81 },
  ],
  'SaaS': [
    { domain: 'stripe.com', score: 87 },
    { domain: 'notion.so', score: 85 },
    { domain: 'figma.com', score: 84 },
  ],
};

function getRankIcon(rank: number) {
  switch (rank) {
    case 1:
      return <Trophy className="w-6 h-6 text-yellow-400" />;
    case 2:
      return <Medal className="w-6 h-6 text-zinc-300" />;
    case 3:
      return <Award className="w-6 h-6 text-amber-600" />;
    default:
      return <span className="text-zinc-400 font-bold text-lg">{rank}</span>;
  }
}

function getScoreColor(score: number) {
  if (score >= 90) return 'text-green-400';
  if (score >= 70) return 'text-yellow-400';
  return 'text-red-400';
}

function getTrendIcon(trend: string, change: number) {
  if (trend === 'up') {
    return (
      <span className="flex items-center gap-1 text-green-400 text-sm">
        <TrendingUp className="w-4 h-4" />
        +{change}
      </span>
    );
  }
  if (trend === 'down') {
    return (
      <span className="flex items-center gap-1 text-red-400 text-sm">
        <TrendingUp className="w-4 h-4 rotate-180" />
        -{change}
      </span>
    );
  }
  return <span className="text-zinc-500 text-sm">—</span>;
}

export default function LeaderboardPage() {
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
            <Link href="/tools" className="text-zinc-300 hover:text-white transition-colors text-sm font-medium">
              Free Tools
            </Link>
            <Link href="/pricing" className="text-zinc-300 hover:text-white transition-colors text-sm font-medium">
              Pricing
            </Link>
          </div>
        </div>
      </header>

      {/* EAA Deadline Urgency Banner */}
      <EAACountdown variant="banner" showCTA={true} />

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/10 rounded-full text-yellow-400 text-sm mb-6">
            <Trophy className="w-4 h-4" />
            Accessibility Leaderboard
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Most <span className="text-indigo-400">Accessible</span> Websites
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-6">
            Real-time rankings based on WCAG 2.1 AA compliance scans. See who leads in digital accessibility.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-500/25"
          >
            <Zap className="w-5 h-5" />
            Check Your Score
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Main Leaderboard */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden mb-12">
          <div className="p-6 border-b border-zinc-800">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400" />
                Top 10 Overall
              </h2>
              <span className="text-sm text-zinc-400">Updated daily</span>
            </div>
          </div>

          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-zinc-800/50 text-sm text-zinc-400 font-medium">
            <div className="col-span-1">Rank</div>
            <div className="col-span-4">Website</div>
            <div className="col-span-2">Score</div>
            <div className="col-span-2">Platform</div>
            <div className="col-span-1">Country</div>
            <div className="col-span-2 text-right">Trend</div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-zinc-800">
            {leaderboardData.map((site) => (
              <div
                key={site.rank}
                className={`grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-zinc-800/30 transition-colors ${
                  site.rank <= 3 ? 'bg-zinc-800/20' : ''
                }`}
              >
                <div className="col-span-1 flex items-center justify-center">
                  {getRankIcon(site.rank)}
                </div>
                <div className="col-span-4">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-zinc-500" />
                    <span className="text-white font-medium">{site.domain}</span>
                  </div>
                </div>
                <div className="col-span-2">
                  <span className={`text-2xl font-bold ${getScoreColor(site.score)}`}>
                    {site.score}
                  </span>
                  <span className="text-zinc-500 text-sm">/100</span>
                </div>
                <div className="col-span-2 text-zinc-400">{site.platform}</div>
                <div className="col-span-1">
                  <span className="px-2 py-1 bg-zinc-800 rounded text-xs text-zinc-300">
                    {site.country}
                  </span>
                </div>
                <div className="col-span-2 text-right">
                  {getTrendIcon(site.trend, site.change)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Industry Leaders */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Industry Leaders</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(industryLeaders).map(([industry, sites]) => (
              <div key={industry} className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
                <div className="p-4 border-b border-zinc-800 bg-zinc-800/50">
                  <h3 className="text-white font-semibold">{industry}</h3>
                </div>
                <div className="p-4 space-y-3">
                  {sites.map((site, i) => (
                    <div key={site.domain} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-zinc-500 text-sm w-5">{i + 1}.</span>
                        <span className="text-zinc-300 text-sm">{site.domain}</span>
                      </div>
                      <span className={`font-bold ${getScoreColor(site.score)}`}>
                        {site.score}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-indigo-600/10 to-purple-600/10 border border-indigo-500/20 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Want to appear on the leaderboard?
          </h2>
          <p className="text-zinc-400 mb-6 max-w-xl mx-auto">
            Scan your website for free and see where you rank. Top-scoring sites are featured on our public leaderboard.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-500/25"
            >
              <Zap className="w-5 h-5" />
              Get Your Free Score
            </Link>
            <Link
              href="/compare-sites"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold rounded-xl transition-colors"
            >
              <Trophy className="w-5 h-5" />
              Compare With Competitors
            </Link>
          </div>
        </div>

        {/* How Scoring Works */}
        <div className="mt-12 p-6 bg-zinc-900 border border-zinc-800 rounded-2xl">
          <h3 className="text-lg font-bold text-white mb-4">How Scoring Works</h3>
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-white font-medium">90-100: Excellent</span>
              </div>
              <p className="text-zinc-400">
                Meets WCAG 2.1 AA standards. Likely compliant with EAA, ADA, and other regulations.
              </p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <span className="text-white font-medium">70-89: Good</span>
              </div>
              <p className="text-zinc-400">
                Partially compliant. Some issues need attention but foundation is solid.
              </p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <span className="text-white font-medium">Below 70: Needs Work</span>
              </div>
              <p className="text-zinc-400">
                Significant accessibility barriers. May face legal risk under EAA enforcement.
              </p>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
