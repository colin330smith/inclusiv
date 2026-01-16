import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';

// Force dynamic rendering since we access user session data
export const dynamic = 'force-dynamic';
import Link from 'next/link';
import type { Site, Scan } from '@/types/database';
import {
  Globe,
  FileSearch,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Plus,
  TrendingUp,
  Clock,
} from 'lucide-react';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect('/api/auth/signin?callbackUrl=/dashboard');
  }

  // Fetch user's sites and recent scans
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: sites } = await (supabaseAdmin as any)
    .from('sites')
    .select('*')
    .eq('user_id', session.user.id)
    .order('created_at', { ascending: false })
    .limit(5) as { data: Site[] | null; error: Error | null };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: recentScans } = await (supabaseAdmin as any)
    .from('scans')
    .select('*, sites(url)')
    .eq('user_id', session.user.id)
    .order('created_at', { ascending: false })
    .limit(5) as { data: (Scan & { sites: { url: string } | null })[] | null; error: Error | null };

  // Calculate stats
  const totalSites = sites?.length || 0;
  const totalScans = recentScans?.length || 0;
  const avgScore =
    recentScans && recentScans.length > 0
      ? Math.round(recentScans.reduce((acc, scan) => acc + (scan.score || 0), 0) / recentScans.length)
      : 0;
  const criticalIssues =
    recentScans?.reduce((acc, scan) => acc + (scan.critical_issues || 0), 0) || 0;

  // Plan limits
  const planLimits = {
    free: { sites: 1, scansPerMonth: 3 },
    starter: { sites: 5, scansPerMonth: 100 },
    professional: { sites: -1, scansPerMonth: -1 }, // -1 = unlimited
    enterprise: { sites: -1, scansPerMonth: -1 },
  };

  const currentPlanLimits = planLimits[session.user.subscriptionTier as keyof typeof planLimits] || planLimits.free;
  const isFreePlan = session.user.subscriptionTier === 'free';

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">
          Welcome back, {session.user.name?.split(' ')[0] || session.user.email.split('@')[0]}
        </h1>
        <p className="text-zinc-400 mt-1">
          Here&apos;s an overview of your accessibility compliance status.
        </p>
      </div>

      {/* Upgrade Banner (for free users) */}
      {isFreePlan && (
        <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">Upgrade to unlock more features</h3>
              <p className="text-zinc-400 mt-1">
                Get unlimited scans, AI-powered fixes, and compliance certificates.
              </p>
            </div>
            <Link
              href="/pricing"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
            >
              Upgrade Now
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Globe}
          label="Sites Monitored"
          value={totalSites}
          subtext={
            currentPlanLimits.sites === -1
              ? 'Unlimited'
              : `${totalSites}/${currentPlanLimits.sites} used`
          }
          color="indigo"
        />
        <StatCard
          icon={FileSearch}
          label="Total Scans"
          value={totalScans}
          subtext="This month"
          color="blue"
        />
        <StatCard
          icon={TrendingUp}
          label="Average Score"
          value={`${avgScore}/100`}
          subtext={avgScore >= 80 ? 'Good' : avgScore >= 60 ? 'Needs work' : 'Critical'}
          color={avgScore >= 80 ? 'green' : avgScore >= 60 ? 'yellow' : 'red'}
        />
        <StatCard
          icon={AlertTriangle}
          label="Critical Issues"
          value={criticalIssues}
          subtext="Require immediate attention"
          color={criticalIssues > 0 ? 'red' : 'green'}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Sites */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Your Sites</h2>
            <Link
              href="/dashboard/sites/add"
              className="flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Site
            </Link>
          </div>

          {sites && sites.length > 0 ? (
            <div className="space-y-3">
              {sites.map((site) => (
                <Link
                  key={site.id}
                  href={`/dashboard/sites/${site.id}`}
                  className="flex items-center justify-between p-3 bg-zinc-800/50 hover:bg-zinc-800 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                      <Globe className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium truncate max-w-[200px]">{site.url}</p>
                      <p className="text-xs text-zinc-500">
                        Last scan: {site.last_scanned_at ? formatDate(site.last_scanned_at) : 'Never'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {site.last_scan_score !== null && (
                      <span
                        className={`text-sm font-semibold ${
                          site.last_scan_score >= 80
                            ? 'text-green-400'
                            : site.last_scan_score >= 60
                            ? 'text-yellow-400'
                            : 'text-red-400'
                        }`}
                      >
                        {site.last_scan_score}/100
                      </span>
                    )}
                    <ArrowRight className="w-4 h-4 text-zinc-500" />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Globe className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
              <p className="text-zinc-400">No sites added yet</p>
              <Link
                href="/dashboard/sites/add"
                className="inline-flex items-center gap-2 mt-3 text-indigo-400 hover:text-indigo-300"
              >
                <Plus className="w-4 h-4" />
                Add your first site
              </Link>
            </div>
          )}

          {sites && sites.length > 0 && (
            <Link
              href="/dashboard/sites"
              className="block text-center mt-4 text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              View all sites →
            </Link>
          )}
        </div>

        {/* Recent Scans */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Recent Scans</h2>
            <Link
              href="/dashboard/scans"
              className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              View all
            </Link>
          </div>

          {recentScans && recentScans.length > 0 ? (
            <div className="space-y-3">
              {recentScans.map((scan) => (
                <Link
                  key={scan.id}
                  href={`/dashboard/scans/${scan.id}`}
                  className="flex items-center justify-between p-3 bg-zinc-800/50 hover:bg-zinc-800 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        scan.status === 'completed'
                          ? (scan.score ?? 0) >= 80
                            ? 'bg-green-500/10'
                            : (scan.score ?? 0) >= 60
                            ? 'bg-yellow-500/10'
                            : 'bg-red-500/10'
                          : 'bg-zinc-700/50'
                      }`}
                    >
                      {scan.status === 'completed' ? (
                        (scan.score ?? 0) >= 80 ? (
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        ) : (
                          <AlertTriangle className="w-5 h-5 text-yellow-400" />
                        )
                      ) : (
                        <Clock className="w-5 h-5 text-zinc-400" />
                      )}
                    </div>
                    <div>
                      <p className="text-white font-medium truncate max-w-[200px]">
                        {(scan.sites as { url: string } | null)?.url || scan.url || 'Unknown'}
                      </p>
                      <p className="text-xs text-zinc-500">{formatDate(scan.created_at)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {scan.status === 'completed' && scan.score !== null && (
                      <span
                        className={`text-sm font-semibold ${
                          scan.score >= 80
                            ? 'text-green-400'
                            : scan.score >= 60
                            ? 'text-yellow-400'
                            : 'text-red-400'
                        }`}
                      >
                        {scan.score}/100
                      </span>
                    )}
                    {scan.status === 'pending' && (
                      <span className="text-xs text-zinc-500">Processing...</span>
                    )}
                    <ArrowRight className="w-4 h-4 text-zinc-500" />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <FileSearch className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
              <p className="text-zinc-400">No scans yet</p>
              <p className="text-sm text-zinc-500 mt-1">Add a site to start scanning</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <QuickAction
            href="/dashboard/sites/add"
            icon={Plus}
            title="Add New Site"
            description="Start monitoring a website"
          />
          <QuickAction
            href="/"
            icon={FileSearch}
            title="Run Quick Scan"
            description="Free single-page scan"
          />
          <QuickAction
            href="/dashboard/reports"
            icon={FileSearch}
            title="View Reports"
            description="Detailed compliance reports"
          />
          <QuickAction
            href="/dashboard/settings"
            icon={Clock}
            title="Schedule Scans"
            description="Set up automated monitoring"
          />
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  subtext,
  color,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string | number;
  subtext: string;
  color: 'indigo' | 'blue' | 'green' | 'yellow' | 'red';
}) {
  const colorClasses = {
    indigo: 'bg-indigo-500/10 text-indigo-400',
    blue: 'bg-blue-500/10 text-blue-400',
    green: 'bg-green-500/10 text-green-400',
    yellow: 'bg-yellow-500/10 text-yellow-400',
    red: 'bg-red-500/10 text-red-400',
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
      <div className="flex items-start justify-between">
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorClasses[color]}`}
        >
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <div className="mt-4">
        <p className="text-2xl font-bold text-white">{value}</p>
        <p className="text-sm text-zinc-400 mt-1">{label}</p>
        <p className="text-xs text-zinc-500 mt-1">{subtext}</p>
      </div>
    </div>
  );
}

function QuickAction({
  href,
  icon: Icon,
  title,
  description,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-start gap-4 p-4 bg-zinc-800/50 hover:bg-zinc-800 rounded-lg transition-colors"
    >
      <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5 text-indigo-400" />
      </div>
      <div>
        <p className="text-white font-medium">{title}</p>
        <p className="text-xs text-zinc-500 mt-1">{description}</p>
      </div>
    </Link>
  );
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}
