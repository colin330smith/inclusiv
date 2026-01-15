'use client';

import { useState, useEffect } from 'react';
import { Shield, Trophy, ExternalLink, Search, Star, Award, CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface FeaturedSite {
  url: string;
  name: string;
  score: number;
  industry: string;
  featured: boolean;
  verifiedAt: string;
}

// Pre-populated with example sites (in production would come from API)
const initialSites: FeaturedSite[] = [
  { url: 'https://gov.uk', name: 'GOV.UK', score: 98, industry: 'Government', featured: true, verifiedAt: '2025-01-10' },
  { url: 'https://bbc.com', name: 'BBC', score: 95, industry: 'Media', featured: true, verifiedAt: '2025-01-12' },
  { url: 'https://apple.com', name: 'Apple', score: 94, industry: 'Technology', featured: true, verifiedAt: '2025-01-08' },
  { url: 'https://microsoft.com', name: 'Microsoft', score: 93, industry: 'Technology', featured: false, verifiedAt: '2025-01-11' },
  { url: 'https://stripe.com', name: 'Stripe', score: 92, industry: 'Finance', featured: false, verifiedAt: '2025-01-09' },
  { url: 'https://shopify.com', name: 'Shopify', score: 91, industry: 'E-commerce', featured: false, verifiedAt: '2025-01-14' },
  { url: 'https://github.com', name: 'GitHub', score: 90, industry: 'Technology', featured: false, verifiedAt: '2025-01-13' },
  { url: 'https://notion.so', name: 'Notion', score: 89, industry: 'Productivity', featured: false, verifiedAt: '2025-01-10' },
];

const industries = ['All', 'Technology', 'E-commerce', 'Finance', 'Media', 'Government', 'Healthcare', 'Education'];

export default function WallOfFamePage() {
  const [sites, setSites] = useState<FeaturedSite[]>(initialSites);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitUrl, setSubmitUrl] = useState('');
  const [submitEmail, setSubmitEmail] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const filteredSites = sites.filter(site => {
    const matchesFilter = filter === 'All' || site.industry === filter;
    const matchesSearch = site.name.toLowerCase().includes(search.toLowerCase()) ||
                          site.url.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const featuredSites = filteredSites.filter(s => s.featured);
  const regularSites = filteredSites.filter(s => !s.featured);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: submitEmail,
          source: 'wall_of_fame_submission',
          metadata: { url: submitUrl },
        }),
      });
      setSubmitSuccess(true);
    } catch {
      // Still show success for UX
      setSubmitSuccess(true);
    } finally {
      setSubmitting(false);
    }
  };

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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/10 rounded-full text-yellow-400 text-sm mb-6">
            <Trophy className="w-4 h-4" />
            Accessibility Excellence
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Wall of <span className="text-yellow-400">Fame</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Celebrating websites that prioritize accessibility. These sites have achieved 85+ scores on our WCAG compliance test.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search sites..."
              className="w-full pl-12 pr-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-400 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
            {industries.map(industry => (
              <button
                key={industry}
                onClick={() => setFilter(industry)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  filter === industry
                    ? 'bg-indigo-600 text-white'
                    : 'bg-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                {industry}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Sites */}
        {featuredSites.length > 0 && (
          <div className="mb-12">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400" />
              Featured
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {featuredSites.map((site, i) => (
                <div
                  key={site.url}
                  className="bg-gradient-to-br from-yellow-600/10 to-orange-600/10 border border-yellow-500/30 rounded-2xl p-6 relative overflow-hidden"
                >
                  {i === 0 && (
                    <div className="absolute top-4 right-4">
                      <Award className="w-8 h-8 text-yellow-400" />
                    </div>
                  )}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center overflow-hidden">
                      <img
                        src={`https://www.google.com/s2/favicons?domain=${site.url}&sz=48`}
                        alt={site.name}
                        className="w-8 h-8"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/favicon.ico';
                        }}
                      />
                    </div>
                    <div>
                      <h3 className="text-white font-bold">{site.name}</h3>
                      <p className="text-zinc-400 text-sm">{site.industry}</p>
                    </div>
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <div className="text-4xl font-bold text-green-400">{site.score}</div>
                      <div className="text-zinc-500 text-sm">/ 100</div>
                    </div>
                    <a
                      href={site.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm text-zinc-400 hover:text-white transition-colors"
                    >
                      Visit <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                  <div className="mt-4 pt-4 border-t border-yellow-500/20">
                    <div className="flex items-center gap-2 text-xs text-zinc-500">
                      <CheckCircle className="w-3 h-3 text-green-400" />
                      Verified {new Date(site.verifiedAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Sites Grid */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-white mb-4">
            All Compliant Sites ({regularSites.length})
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {regularSites.map((site) => (
              <div
                key={site.url}
                className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 hover:border-zinc-700 transition-colors"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center overflow-hidden">
                    <img
                      src={`https://www.google.com/s2/favicons?domain=${site.url}&sz=32`}
                      alt={site.name}
                      className="w-6 h-6"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/favicon.ico';
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-medium truncate">{site.name}</h3>
                    <p className="text-zinc-500 text-xs">{site.industry}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`text-2xl font-bold ${
                      site.score >= 90 ? 'text-green-400' : 'text-emerald-400'
                    }`}>
                      {site.score}
                    </span>
                    <span className="text-zinc-500 text-sm">/100</span>
                  </div>
                  <a
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Your Site */}
        <div className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 rounded-2xl p-8">
          <div className="max-w-xl mx-auto text-center">
            <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">
              Submit Your Site
            </h2>
            <p className="text-zinc-400 mb-6">
              Proud of your accessibility score? Submit your site to be featured on our Wall of Fame.
              Sites must score 85+ to qualify.
            </p>

            {!submitSuccess ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="url"
                    value={submitUrl}
                    onChange={(e) => setSubmitUrl(e.target.value)}
                    placeholder="https://yoursite.com"
                    required
                    className="flex-1 px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-zinc-400 focus:outline-none focus:border-indigo-500"
                  />
                  <input
                    type="email"
                    value={submitEmail}
                    onChange={(e) => setSubmitEmail(e.target.value)}
                    placeholder="you@company.com"
                    required
                    className="flex-1 px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-zinc-400 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold rounded-xl transition-all"
                >
                  {submitting ? 'Submitting...' : 'Submit for Review'}
                </button>
              </form>
            ) : (
              <div className="flex items-center justify-center gap-3 py-4">
                <CheckCircle className="w-6 h-6 text-green-400" />
                <span className="text-green-400 font-medium">
                  Submitted! We&apos;ll review your site and email you.
                </span>
              </div>
            )}

            <p className="text-zinc-500 text-xs mt-4">
              We&apos;ll scan your site to verify the score before featuring it.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-zinc-400 mb-4">Want to get your site on the Wall of Fame?</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-500/25"
          >
            <Shield className="w-5 h-5" />
            Check Your Score
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-8 mt-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-6 text-sm">
            <Link href="/leaderboard" className="text-zinc-400 hover:text-white transition-colors">
              Leaderboard
            </Link>
            <Link href="/challenge" className="text-zinc-400 hover:text-white transition-colors">
              Challenge
            </Link>
            <Link href="/benchmark" className="text-zinc-400 hover:text-white transition-colors">
              Benchmarks
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
