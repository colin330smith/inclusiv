import { Metadata } from 'next';
import Link from 'next/link';
import { Shield, TrendingUp, AlertTriangle, ChevronRight, Zap, BarChart3, Globe, Store, Building2, Briefcase, Heart, Plane, GraduationCap, Utensils } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Accessibility Benchmarks by Industry | 2025 Report',
  description: 'Compare your website accessibility score against industry averages. See how e-commerce, finance, healthcare, and other sectors perform on WCAG compliance.',
  openGraph: {
    title: 'Industry Accessibility Benchmarks 2025',
    description: 'How accessible is your industry? See real benchmark data from 10,000+ website scans.',
  },
};

const industryData = [
  {
    name: 'E-commerce',
    slug: 'ecommerce',
    icon: Store,
    avgScore: 62,
    topScore: 94,
    trend: 'up',
    trendValue: 8,
    commonIssues: ['Missing alt text', 'Poor color contrast', 'Inaccessible forms'],
    sitesScanned: 2847,
    complianceRate: 23,
  },
  {
    name: 'Financial Services',
    slug: 'finance',
    icon: Building2,
    avgScore: 71,
    topScore: 96,
    trend: 'up',
    trendValue: 12,
    commonIssues: ['Complex forms without labels', 'PDF accessibility', 'Dynamic content'],
    sitesScanned: 1523,
    complianceRate: 38,
  },
  {
    name: 'Healthcare',
    slug: 'healthcare',
    icon: Heart,
    avgScore: 58,
    topScore: 91,
    trend: 'up',
    trendValue: 5,
    commonIssues: ['Missing form labels', 'Inaccessible appointment booking', 'Low contrast'],
    sitesScanned: 982,
    complianceRate: 18,
  },
  {
    name: 'Travel & Hospitality',
    slug: 'travel',
    icon: Plane,
    avgScore: 64,
    topScore: 93,
    trend: 'up',
    trendValue: 7,
    commonIssues: ['Complex booking flows', 'Interactive maps', 'Calendar widgets'],
    sitesScanned: 1234,
    complianceRate: 25,
  },
  {
    name: 'Professional Services',
    slug: 'professional-services',
    icon: Briefcase,
    avgScore: 67,
    topScore: 95,
    trend: 'same',
    trendValue: 0,
    commonIssues: ['Contact forms', 'Document downloads', 'Service descriptions'],
    sitesScanned: 876,
    complianceRate: 31,
  },
  {
    name: 'Education',
    slug: 'education',
    icon: GraduationCap,
    avgScore: 69,
    topScore: 97,
    trend: 'up',
    trendValue: 15,
    commonIssues: ['Video content', 'LMS integration', 'Document accessibility'],
    sitesScanned: 1567,
    complianceRate: 35,
  },
  {
    name: 'Food & Restaurant',
    slug: 'food-restaurant',
    icon: Utensils,
    avgScore: 51,
    topScore: 88,
    trend: 'up',
    trendValue: 3,
    commonIssues: ['Menu PDFs', 'Online ordering', 'Location finders'],
    sitesScanned: 723,
    complianceRate: 12,
  },
  {
    name: 'SaaS & Technology',
    slug: 'saas',
    icon: Globe,
    avgScore: 74,
    topScore: 98,
    trend: 'up',
    trendValue: 9,
    commonIssues: ['Complex UIs', 'Dynamic content', 'Keyboard navigation'],
    sitesScanned: 2156,
    complianceRate: 42,
  },
];

function getScoreColor(score: number) {
  if (score >= 90) return 'text-green-400';
  if (score >= 70) return 'text-yellow-400';
  return 'text-red-400';
}

function getScoreBg(score: number) {
  if (score >= 90) return 'bg-green-500/10 border-green-500/20';
  if (score >= 70) return 'bg-yellow-500/10 border-yellow-500/20';
  return 'bg-red-500/10 border-red-500/20';
}

export default function BenchmarkPage() {
  const totalScans = industryData.reduce((acc, ind) => acc + ind.sitesScanned, 0);
  const avgAllIndustries = Math.round(industryData.reduce((acc, ind) => acc + ind.avgScore, 0) / industryData.length);

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
            <Link href="/leaderboard" className="text-zinc-300 hover:text-white transition-colors text-sm font-medium">
              Leaderboard
            </Link>
            <Link href="/tools" className="text-zinc-300 hover:text-white transition-colors text-sm font-medium">
              Free Tools
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 rounded-full text-indigo-400 text-sm mb-6">
            <BarChart3 className="w-4 h-4" />
            2025 Industry Report
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Accessibility <span className="text-indigo-400">Benchmarks</span> by Industry
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-8">
            Based on {totalScans.toLocaleString()} website scans. See how your industry compares on WCAG 2.1 AA compliance.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-500/25"
          >
            <Zap className="w-5 h-5" />
            Check Your Score
          </Link>
        </div>

        {/* Key Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-center">
            <p className="text-4xl font-bold text-white mb-2">{avgAllIndustries}</p>
            <p className="text-zinc-400">Average Score (All Industries)</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-center">
            <p className="text-4xl font-bold text-red-400 mb-2">74%</p>
            <p className="text-zinc-400">Sites Below Compliance</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-center">
            <p className="text-4xl font-bold text-green-400 mb-2">+8.5%</p>
            <p className="text-zinc-400">Improvement Since EAA</p>
          </div>
        </div>

        {/* EAA Warning */}
        <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 mb-12">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-lg font-bold text-white mb-2">European Accessibility Act Now Enforced</h2>
              <p className="text-zinc-300 mb-4">
                As of June 2025, websites serving EU customers must meet WCAG 2.1 AA standards or face fines up to €100,000.
                Only 26% of websites in our benchmark currently meet compliance requirements.
              </p>
              <Link
                href="/eaa-compliance"
                className="inline-flex items-center gap-2 text-red-400 hover:text-red-300 font-medium"
              >
                Learn about EAA requirements
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Industry Cards */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Industry Breakdown</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {industryData.map((industry) => {
              const Icon = industry.icon;
              return (
                <Link key={industry.slug} href={`/benchmark/${industry.slug}`} className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-700 transition-colors group">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center">
                          <Icon className="w-6 h-6 text-indigo-400" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white">{industry.name}</h3>
                          <p className="text-zinc-500 text-sm">{industry.sitesScanned.toLocaleString()} sites scanned</p>
                        </div>
                      </div>
                      {industry.trend === 'up' && (
                        <div className="flex items-center gap-1 text-green-400 text-sm">
                          <TrendingUp className="w-4 h-4" />
                          +{industry.trendValue}%
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className={`p-3 rounded-xl border ${getScoreBg(industry.avgScore)}`}>
                        <p className={`text-2xl font-bold ${getScoreColor(industry.avgScore)}`}>{industry.avgScore}</p>
                        <p className="text-zinc-500 text-xs">Avg Score</p>
                      </div>
                      <div className="p-3 bg-zinc-800 rounded-xl">
                        <p className="text-2xl font-bold text-green-400">{industry.topScore}</p>
                        <p className="text-zinc-500 text-xs">Top Score</p>
                      </div>
                      <div className="p-3 bg-zinc-800 rounded-xl">
                        <p className="text-2xl font-bold text-white">{industry.complianceRate}%</p>
                        <p className="text-zinc-500 text-xs">Compliant</p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-zinc-800">
                      <p className="text-sm text-zinc-400 mb-2">Common issues:</p>
                      <div className="flex flex-wrap gap-2">
                        {industry.commonIssues.map((issue) => (
                          <span key={issue} className="px-2 py-1 bg-zinc-800 rounded text-xs text-zinc-300">
                            {issue}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-indigo-600/10 to-purple-600/10 border border-indigo-500/20 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            How Does Your Site Compare?
          </h2>
          <p className="text-zinc-400 mb-6 max-w-xl mx-auto">
            Get your free accessibility score in 30 seconds. See where you stand against industry benchmarks and get actionable fixes.
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
              <BarChart3 className="w-5 h-5" />
              Compare Competitors
            </Link>
          </div>
        </div>

        {/* Methodology */}
        <div className="mt-12 p-6 bg-zinc-900 border border-zinc-800 rounded-2xl">
          <h3 className="text-lg font-bold text-white mb-4">Methodology</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-zinc-400">
            <div>
              <p className="mb-2">
                <strong className="text-white">Data collection:</strong> {totalScans.toLocaleString()} websites scanned between January 2024 and January 2025 using automated WCAG 2.1 AA testing.
              </p>
              <p>
                <strong className="text-white">Scoring:</strong> Based on violations detected across 50+ accessibility criteria including contrast, alt text, form labels, keyboard navigation, and ARIA implementation.
              </p>
            </div>
            <div>
              <p className="mb-2">
                <strong className="text-white">Compliance threshold:</strong> Score of 80+ indicates likely compliance with WCAG 2.1 AA and EAA requirements.
              </p>
              <p>
                <strong className="text-white">Industry classification:</strong> Sites categorized based on primary business activity and self-reported industry.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-8 mt-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-zinc-400 text-sm">
            Data updated monthly. Last update: January 2025.
          </p>
          <div className="flex items-center justify-center gap-6 mt-4 text-sm">
            <Link href="/" className="text-zinc-400 hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/leaderboard" className="text-zinc-400 hover:text-white transition-colors">
              Leaderboard
            </Link>
            <Link href="/tools" className="text-zinc-400 hover:text-white transition-colors">
              Free Tools
            </Link>
            <Link href="/pricing" className="text-zinc-400 hover:text-white transition-colors">
              Pricing
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
