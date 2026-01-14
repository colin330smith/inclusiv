import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';

// Force dynamic rendering since we access user session data
export const dynamic = 'force-dynamic';
import Link from 'next/link';
import type { Site } from '@/types/database';
import {
  Globe,
  Plus,
  ArrowRight,
  AlertTriangle,
  CheckCircle,
  Clock,
  Search,
} from 'lucide-react';

export default async function SitesPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return null;
  }

  // Fetch user's sites with latest scan info
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: sites } = await (supabaseAdmin as any)
    .from('sites')
    .select('*')
    .eq('user_id', session.user.id)
    .order('created_at', { ascending: false }) as { data: Site[] | null; error: Error | null };

  // Plan limits
  const planLimits = {
    free: { sites: 1 },
    starter: { sites: 5 },
    professional: { sites: -1 }, // -1 = unlimited
    enterprise: { sites: -1 },
  };

  const currentPlanLimits = planLimits[session.user.subscriptionTier as keyof typeof planLimits] || planLimits.free;
  const totalSites = sites?.length || 0;
  const canAddSite = currentPlanLimits.sites === -1 || totalSites < currentPlanLimits.sites;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Your Sites</h1>
          <p className="text-zinc-400 mt-1">
            {currentPlanLimits.sites === -1
              ? `${totalSites} sites monitored`
              : `${totalSites}/${currentPlanLimits.sites} sites used`}
          </p>
        </div>
        {canAddSite ? (
          <Link
            href="/dashboard/sites/add"
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Site
          </Link>
        ) : (
          <Link
            href="/pricing"
            className="flex items-center gap-2 px-4 py-2 bg-zinc-700 hover:bg-zinc-600 text-white font-medium rounded-lg transition-colors"
          >
            Upgrade to Add More
          </Link>
        )}
      </div>

      {/* Plan Limit Warning */}
      {!canAddSite && (
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-yellow-400 font-medium">Site limit reached</p>
              <p className="text-zinc-400 text-sm mt-1">
                Your {session.user.subscriptionTier} plan allows {currentPlanLimits.sites} site{currentPlanLimits.sites !== 1 ? 's' : ''}.{' '}
                <Link href="/pricing" className="text-indigo-400 hover:text-indigo-300">
                  Upgrade your plan
                </Link>{' '}
                to monitor more sites.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Sites Grid */}
      {sites && sites.length > 0 ? (
        <div className="grid gap-4">
          {sites.map((site) => (
            <Link
              key={site.id}
              href={`/dashboard/sites/${site.id}`}
              className="bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-xl p-5 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                    <Globe className="w-6 h-6 text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg">{site.url}</h3>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-sm text-zinc-500">
                        Added {formatDate(site.created_at)}
                      </span>
                      {site.last_scanned_at && (
                        <span className="text-sm text-zinc-500">
                          Last scan: {formatDate(site.last_scanned_at)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {site.last_scan_score !== null ? (
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          site.last_scan_score >= 80
                            ? 'bg-green-500/10'
                            : site.last_scan_score >= 60
                            ? 'bg-yellow-500/10'
                            : 'bg-red-500/10'
                        }`}
                      >
                        {site.last_scan_score >= 80 ? (
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        ) : (
                          <AlertTriangle className="w-5 h-5 text-yellow-400" />
                        )}
                      </div>
                      <div className="text-right">
                        <p
                          className={`text-xl font-bold ${
                            site.last_scan_score >= 80
                              ? 'text-green-400'
                              : site.last_scan_score >= 60
                              ? 'text-yellow-400'
                              : 'text-red-400'
                          }`}
                        >
                          {site.last_scan_score}/100
                        </p>
                        <p className="text-xs text-zinc-500">
                          {site.last_scan_score >= 80
                            ? 'Good'
                            : site.last_scan_score >= 60
                            ? 'Needs Work'
                            : 'Critical'}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-zinc-500">
                      <Clock className="w-5 h-5" />
                      <span className="text-sm">No scans yet</span>
                    </div>
                  )}
                  <ArrowRight className="w-5 h-5 text-zinc-500" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-12 text-center">
          <Search className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No sites yet</h3>
          <p className="text-zinc-400 mb-6 max-w-md mx-auto">
            Add your first website to start monitoring its accessibility compliance.
          </p>
          <Link
            href="/dashboard/sites/add"
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Your First Site
          </Link>
        </div>
      )}
    </div>
  );
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffDays < 1) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;

  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}
