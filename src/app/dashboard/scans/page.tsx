import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';

// Force dynamic rendering since we access user session data
export const dynamic = 'force-dynamic';
import Link from 'next/link';
import type { Scan } from '@/types/database';
import {
  FileSearch,
  ArrowRight,
  AlertTriangle,
  CheckCircle,
  Clock,
  Globe,
  XCircle,
} from 'lucide-react';

export default async function ScansPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return null;
  }

  // Fetch user's scans with site info
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: scans } = await (supabaseAdmin as any)
    .from('scans')
    .select('*, sites(url, name)')
    .eq('user_id', session.user.id)
    .order('created_at', { ascending: false })
    .limit(50) as { data: (Scan & { sites: { url: string; name?: string } | null })[] | null; error: Error | null };

  // Calculate stats
  const completedScans = scans?.filter((s) => s.status === 'completed') || [];
  const avgScore =
    completedScans.length > 0
      ? Math.round(completedScans.reduce((acc, s) => acc + (s.score || 0), 0) / completedScans.length)
      : 0;
  const totalIssues = completedScans.reduce((acc, s) => acc + (s.total_issues || 0), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Scan History</h1>
        <p className="text-zinc-400 mt-1">View all accessibility scans for your sites.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
          <p className="text-sm text-zinc-500">Total Scans</p>
          <p className="text-2xl font-bold text-white mt-1">{scans?.length || 0}</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
          <p className="text-sm text-zinc-500">Average Score</p>
          <p
            className={`text-2xl font-bold mt-1 ${
              avgScore >= 80
                ? 'text-green-400'
                : avgScore >= 60
                ? 'text-yellow-400'
                : 'text-red-400'
            }`}
          >
            {avgScore}/100
          </p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
          <p className="text-sm text-zinc-500">Total Issues Found</p>
          <p className="text-2xl font-bold text-white mt-1">{totalIssues}</p>
        </div>
      </div>

      {/* Scans List */}
      {scans && scans.length > 0 ? (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-4">
                    Site
                  </th>
                  <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-4">
                    Status
                  </th>
                  <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-4">
                    Score
                  </th>
                  <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-4">
                    Issues
                  </th>
                  <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-4">
                    Date
                  </th>
                  <th className="text-right text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-4">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {scans.map((scan) => (
                  <tr key={scan.id} className="hover:bg-zinc-800/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Globe className="w-4 h-4 text-zinc-500" />
                        <span className="text-white font-medium truncate max-w-[200px]">
                          {(scan.sites as { url: string; name?: string } | null)?.url ||
                            scan.url ||
                            'Unknown'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={scan.status} />
                    </td>
                    <td className="px-6 py-4">
                      {scan.status === 'completed' && scan.score !== null ? (
                        <span
                          className={`font-semibold ${
                            scan.score >= 80
                              ? 'text-green-400'
                              : scan.score >= 60
                              ? 'text-yellow-400'
                              : 'text-red-400'
                          }`}
                        >
                          {scan.score}/100
                        </span>
                      ) : (
                        <span className="text-zinc-500">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {scan.status === 'completed' ? (
                        <div className="flex items-center gap-2">
                          <span className="text-white">{scan.total_issues || 0}</span>
                          {(scan.critical_issues ?? 0) > 0 && (
                            <span className="text-xs text-red-400">
                              ({scan.critical_issues} critical)
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-zinc-500">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-zinc-400 text-sm">{formatDate(scan.created_at)}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/dashboard/scans/${scan.id}`}
                        className="inline-flex items-center gap-1 text-indigo-400 hover:text-indigo-300 transition-colors"
                      >
                        View
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-12 text-center">
          <FileSearch className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No scans yet</h3>
          <p className="text-zinc-400 mb-6 max-w-md mx-auto">
            Add a site to your dashboard and run your first accessibility scan.
          </p>
          <Link
            href="/dashboard/sites/add"
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-colors"
          >
            Add a Site
          </Link>
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const statusConfig = {
    completed: {
      icon: CheckCircle,
      text: 'Completed',
      className: 'bg-green-500/10 text-green-400',
    },
    pending: {
      icon: Clock,
      text: 'Pending',
      className: 'bg-yellow-500/10 text-yellow-400',
    },
    processing: {
      icon: Clock,
      text: 'Processing',
      className: 'bg-blue-500/10 text-blue-400',
    },
    failed: {
      icon: XCircle,
      text: 'Failed',
      className: 'bg-red-500/10 text-red-400',
    },
  };

  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${config.className}`}>
      <Icon className="w-3.5 h-3.5" />
      {config.text}
    </span>
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

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
  });
}
