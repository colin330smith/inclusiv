'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Shield, Bell, Plus, Trash2, TrendingUp, TrendingDown,
  AlertTriangle, CheckCircle, ExternalLink, Mail, Zap,
  BarChart3, Target, Eye, Clock, ArrowRight
} from 'lucide-react';

interface MonitoredSite {
  id: string;
  url: string;
  name: string;
  currentScore: number;
  previousScore: number;
  lastChecked: string;
  trend: 'up' | 'down' | 'same';
  alerts: boolean;
  isCompetitor: boolean;
}

// Demo data for showcase
const demoSites: MonitoredSite[] = [
  {
    id: '1',
    url: 'https://yoursite.com',
    name: 'Your Site',
    currentScore: 72,
    previousScore: 65,
    lastChecked: new Date().toISOString(),
    trend: 'up',
    alerts: true,
    isCompetitor: false,
  },
  {
    id: '2',
    url: 'https://competitor-a.com',
    name: 'Competitor A',
    currentScore: 68,
    previousScore: 71,
    lastChecked: new Date(Date.now() - 86400000).toISOString(),
    trend: 'down',
    alerts: true,
    isCompetitor: true,
  },
  {
    id: '3',
    url: 'https://competitor-b.com',
    name: 'Competitor B',
    currentScore: 81,
    previousScore: 78,
    lastChecked: new Date(Date.now() - 172800000).toISOString(),
    trend: 'up',
    alerts: true,
    isCompetitor: true,
  },
];

const alertTypes = [
  { id: 'score_drop', label: 'Score drops below threshold', description: 'Get notified when any site drops below your target score' },
  { id: 'competitor_change', label: 'Competitor score changes', description: 'Know when competitors improve or decline' },
  { id: 'weekly_report', label: 'Weekly comparison report', description: 'Get a summary of all tracked sites every week' },
  { id: 'compliance_risk', label: 'Compliance risk alerts', description: 'Immediate alerts when sites fall below compliance threshold' },
];

export default function MonitorPage() {
  const [sites, setSites] = useState<MonitoredSite[]>(demoSites);
  const [newUrl, setNewUrl] = useState('');
  const [isCompetitor, setIsCompetitor] = useState(true);
  const [email, setEmail] = useState('');
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [selectedAlerts, setSelectedAlerts] = useState(['score_drop', 'competitor_change']);

  const yourSite = sites.find(s => !s.isCompetitor);
  const competitors = sites.filter(s => s.isCompetitor);
  const avgCompetitorScore = competitors.length > 0
    ? Math.round(competitors.reduce((acc, c) => acc + c.currentScore, 0) / competitors.length)
    : 0;

  const handleAddSite = (e: React.FormEvent) => {
    e.preventDefault();
    if (sites.length >= 3) {
      setShowUpgrade(true);
      return;
    }

    const domain = newUrl.replace(/^https?:\/\//, '').replace(/\/.*$/, '');
    const newSite: MonitoredSite = {
      id: Date.now().toString(),
      url: newUrl.startsWith('http') ? newUrl : `https://${newUrl}`,
      name: domain,
      currentScore: Math.floor(Math.random() * 30) + 50,
      previousScore: Math.floor(Math.random() * 30) + 50,
      lastChecked: new Date().toISOString(),
      trend: Math.random() > 0.5 ? 'up' : 'down',
      alerts: true,
      isCompetitor,
    };

    setSites([...sites, newSite]);
    setNewUrl('');
  };

  const removeSite = (id: string) => {
    setSites(sites.filter(s => s.id !== id));
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-green-500/10 border-green-500/20';
    if (score >= 60) return 'bg-yellow-500/10 border-yellow-500/20';
    return 'bg-red-500/10 border-red-500/20';
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
            <Link href="/compare-sites" className="text-zinc-400 hover:text-white transition-colors text-sm">
              Compare
            </Link>
            <Link href="/leaderboard" className="text-zinc-400 hover:text-white transition-colors text-sm">
              Leaderboard
            </Link>
            <Link
              href="/pricing"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-colors text-sm"
            >
              Upgrade
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 rounded-full text-indigo-400 text-sm mb-6">
            <Eye className="w-4 h-4" />
            Competitive Intelligence
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Monitor <span className="text-indigo-400">Competitor</span> Accessibility
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Track your competitors&apos; accessibility scores. Get alerts when they improve or decline.
            Stay ahead in compliance.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-center">
            <p className={`text-3xl font-bold ${getScoreColor(yourSite?.currentScore || 0)}`}>
              {yourSite?.currentScore || '--'}
            </p>
            <p className="text-zinc-400 text-sm">Your Score</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-center">
            <p className={`text-3xl font-bold ${getScoreColor(avgCompetitorScore)}`}>
              {avgCompetitorScore || '--'}
            </p>
            <p className="text-zinc-400 text-sm">Avg Competitor</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-center">
            <p className="text-3xl font-bold text-white">{competitors.length}</p>
            <p className="text-zinc-400 text-sm">Tracked Competitors</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-center">
            <p className={`text-3xl font-bold ${(yourSite?.currentScore || 0) > avgCompetitorScore ? 'text-green-400' : 'text-red-400'}`}>
              {(yourSite?.currentScore || 0) > avgCompetitorScore ? '+' : ''}
              {(yourSite?.currentScore || 0) - avgCompetitorScore}
            </p>
            <p className="text-zinc-400 text-sm">Your Advantage</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Monitoring Panel */}
          <div className="lg:col-span-2 space-y-6">
            {/* Add Site Form */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Plus className="w-5 h-5 text-indigo-400" />
                Add Site to Monitor
              </h2>
              <form onSubmit={handleAddSite} className="space-y-4">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    placeholder="competitor.com"
                    className="flex-1 px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-zinc-400 focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl transition-colors"
                  >
                    Add
                  </button>
                </div>
                <label className="flex items-center gap-2 text-sm text-zinc-400">
                  <input
                    type="checkbox"
                    checked={isCompetitor}
                    onChange={(e) => setIsCompetitor(e.target.checked)}
                    className="rounded border-zinc-600 bg-zinc-800 text-indigo-600 focus:ring-indigo-500"
                  />
                  This is a competitor site
                </label>
              </form>
            </div>

            {/* Monitored Sites List */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
              <div className="p-4 border-b border-zinc-800">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Target className="w-5 h-5 text-indigo-400" />
                  Monitored Sites
                </h2>
              </div>

              <div className="divide-y divide-zinc-800">
                {sites.map((site) => (
                  <div key={site.id} className="p-4 hover:bg-zinc-800/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center">
                          <img
                            src={`https://www.google.com/s2/favicons?domain=${site.url}&sz=32`}
                            alt=""
                            className="w-6 h-6"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-white font-medium">{site.name}</span>
                            {!site.isCompetitor && (
                              <span className="px-2 py-0.5 bg-indigo-500/20 text-indigo-400 text-xs rounded">
                                Your Site
                              </span>
                            )}
                            {site.isCompetitor && (
                              <span className="px-2 py-0.5 bg-orange-500/20 text-orange-400 text-xs rounded">
                                Competitor
                              </span>
                            )}
                          </div>
                          <p className="text-zinc-500 text-sm truncate max-w-xs">{site.url}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <div className="flex items-center gap-2">
                            <span className={`text-2xl font-bold ${getScoreColor(site.currentScore)}`}>
                              {site.currentScore}
                            </span>
                            {site.trend === 'up' && (
                              <TrendingUp className="w-5 h-5 text-green-400" />
                            )}
                            {site.trend === 'down' && (
                              <TrendingDown className="w-5 h-5 text-red-400" />
                            )}
                          </div>
                          <p className="text-zinc-500 text-xs">
                            was {site.previousScore}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <a
                            href={site.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-zinc-400 hover:text-white transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                          <button
                            onClick={() => removeSite(site.id)}
                            className="p-2 text-zinc-400 hover:text-red-400 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Score comparison bar */}
                    <div className="mt-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-zinc-500 text-xs">Score: {site.currentScore}/100</span>
                        {site.currentScore < 80 && (
                          <span className="text-xs text-red-400 flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3" />
                            Below compliance
                          </span>
                        )}
                        {site.currentScore >= 80 && (
                          <span className="text-xs text-green-400 flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" />
                            Compliant
                          </span>
                        )}
                      </div>
                      <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${
                            site.currentScore >= 80 ? 'bg-green-500' :
                            site.currentScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${site.currentScore}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Competitive Analysis */}
            {competitors.length > 0 && yourSite && (
              <div className="bg-gradient-to-r from-indigo-600/10 to-purple-600/10 border border-indigo-500/20 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-indigo-400" />
                  Competitive Analysis
                </h3>
                <div className="space-y-4">
                  {competitors.map((comp) => {
                    const diff = yourSite.currentScore - comp.currentScore;
                    return (
                      <div key={comp.id} className="flex items-center justify-between">
                        <span className="text-zinc-300">{comp.name}</span>
                        <div className="flex items-center gap-4">
                          <div className="w-32 h-2 bg-zinc-800 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                comp.currentScore >= 80 ? 'bg-green-500' :
                                comp.currentScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${comp.currentScore}%` }}
                            />
                          </div>
                          <span className={`font-bold ${diff > 0 ? 'text-green-400' : diff < 0 ? 'text-red-400' : 'text-zinc-400'}`}>
                            {diff > 0 ? '+' : ''}{diff}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-4 pt-4 border-t border-indigo-500/20">
                  <p className="text-sm text-zinc-400">
                    {yourSite.currentScore > avgCompetitorScore ? (
                      <span className="text-green-400">
                        You&apos;re ahead of the competition by {yourSite.currentScore - avgCompetitorScore} points!
                      </span>
                    ) : (
                      <span className="text-red-400">
                        Your competitors are ahead by {avgCompetitorScore - yourSite.currentScore} points. Time to improve!
                      </span>
                    )}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Alert Settings */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Bell className="w-5 h-5 text-indigo-400" />
                Alert Settings
              </h2>

              <div className="space-y-3 mb-6">
                {alertTypes.map((alert) => (
                  <label key={alert.id} className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selectedAlerts.includes(alert.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedAlerts([...selectedAlerts, alert.id]);
                        } else {
                          setSelectedAlerts(selectedAlerts.filter(a => a !== alert.id));
                        }
                      }}
                      className="mt-1 rounded border-zinc-600 bg-zinc-800 text-indigo-600 focus:ring-indigo-500"
                    />
                    <div>
                      <p className="text-white text-sm font-medium group-hover:text-indigo-400 transition-colors">
                        {alert.label}
                      </p>
                      <p className="text-zinc-500 text-xs">{alert.description}</p>
                    </div>
                  </label>
                ))}
              </div>

              <div className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-zinc-400 focus:outline-none focus:border-indigo-500"
                />
                <button className="w-full px-4 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2">
                  <Mail className="w-4 h-4" />
                  Enable Alerts
                </button>
              </div>
            </div>

            {/* Upgrade CTA */}
            <div className="bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-5 h-5 text-yellow-400" />
                <span className="text-yellow-400 font-medium text-sm">Pro Feature</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Unlimited Monitoring
              </h3>
              <ul className="space-y-2 mb-6 text-sm">
                <li className="flex items-center gap-2 text-zinc-300">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Track unlimited competitors
                </li>
                <li className="flex items-center gap-2 text-zinc-300">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Daily automated scans
                </li>
                <li className="flex items-center gap-2 text-zinc-300">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Historical score tracking
                </li>
                <li className="flex items-center gap-2 text-zinc-300">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Custom alert thresholds
                </li>
              </ul>
              <Link
                href="/pricing"
                className="block w-full text-center px-4 py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold rounded-xl transition-all"
              >
                Upgrade to Pro
              </Link>
            </div>

            {/* Quick Actions */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  href="/"
                  className="flex items-center justify-between p-3 bg-zinc-800 hover:bg-zinc-700 rounded-xl transition-colors group"
                >
                  <span className="text-zinc-300 group-hover:text-white">Run new scan</span>
                  <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-indigo-400" />
                </Link>
                <Link
                  href="/compare-sites"
                  className="flex items-center justify-between p-3 bg-zinc-800 hover:bg-zinc-700 rounded-xl transition-colors group"
                >
                  <span className="text-zinc-300 group-hover:text-white">Compare sites</span>
                  <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-indigo-400" />
                </Link>
                <Link
                  href="/challenge"
                  className="flex items-center justify-between p-3 bg-zinc-800 hover:bg-zinc-700 rounded-xl transition-colors group"
                >
                  <span className="text-zinc-300 group-hover:text-white">Challenge competitor</span>
                  <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-indigo-400" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="text-zinc-400 mb-4">
            Free plan includes 3 sites. Upgrade for unlimited monitoring.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-500/25"
            >
              <Zap className="w-5 h-5" />
              Scan Your Site First
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold rounded-xl transition-colors"
            >
              View Pro Plans
            </Link>
          </div>
        </div>
      </main>

      {/* Upgrade Modal */}
      {showUpgrade && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 max-w-md w-full">
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-indigo-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Upgrade to Monitor More
              </h3>
              <p className="text-zinc-400 mb-6">
                Free plan is limited to 3 sites. Upgrade to Pro for unlimited competitor monitoring.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setShowUpgrade(false)}
                  className="flex-1 px-4 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-medium rounded-xl transition-colors"
                >
                  Maybe Later
                </button>
                <Link
                  href="/pricing"
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold rounded-xl transition-all"
                >
                  Upgrade Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-8 mt-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-6 text-sm">
            <Link href="/" className="text-zinc-400 hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/compare-sites" className="text-zinc-400 hover:text-white transition-colors">
              Compare
            </Link>
            <Link href="/leaderboard" className="text-zinc-400 hover:text-white transition-colors">
              Leaderboard
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
