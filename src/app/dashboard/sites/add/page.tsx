'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Globe, AlertTriangle, Loader2, Check } from 'lucide-react';

export default function AddSitePage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Plan limits
  const planLimits = {
    free: { sites: 1 },
    starter: { sites: 5 },
    professional: { sites: -1 },
    enterprise: { sites: -1 },
  };

  const currentPlanLimits = session?.user?.subscriptionTier
    ? planLimits[session.user.subscriptionTier as keyof typeof planLimits]
    : planLimits.free;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validate URL
      let validUrl = url.trim();
      if (!validUrl.startsWith('http://') && !validUrl.startsWith('https://')) {
        validUrl = 'https://' + validUrl;
      }

      // Check if valid URL
      try {
        new URL(validUrl);
      } catch {
        throw new Error('Please enter a valid URL');
      }

      const response = await fetch('/api/sites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: validUrl }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to add site');
      }

      setSuccess(true);

      // Redirect to sites page after success
      setTimeout(() => {
        router.push('/dashboard/sites');
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add site');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Back Link */}
      <Link
        href="/dashboard/sites"
        className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Sites
      </Link>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Add New Site</h1>
        <p className="text-zinc-400 mt-1">
          Enter the URL of the website you want to monitor for accessibility compliance.
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        {success ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Site Added Successfully!</h3>
            <p className="text-zinc-400">Redirecting to your sites...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* URL Input */}
            <div>
              <label htmlFor="url" className="block text-sm font-medium text-zinc-300 mb-2">
                Website URL
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Globe className="w-5 h-5 text-zinc-500" />
                </div>
                <input
                  id="url"
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="example.com"
                  className="w-full pl-12 pr-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  required
                  disabled={loading}
                />
              </div>
              <p className="text-xs text-zinc-500 mt-2">
                Enter the full URL or just the domain name. We&apos;ll add https:// if needed.
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {/* Plan Info */}
            <div className="p-4 bg-zinc-800/50 rounded-lg">
              <p className="text-sm text-zinc-400">
                <span className="text-zinc-300 font-medium">
                  {session?.user?.subscriptionTier?.charAt(0).toUpperCase()}
                  {session?.user?.subscriptionTier?.slice(1) || 'Free'} Plan:
                </span>{' '}
                {currentPlanLimits.sites === -1
                  ? 'Unlimited sites'
                  : `Up to ${currentPlanLimits.sites} site${currentPlanLimits.sites !== 1 ? 's' : ''}`}
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !url.trim()}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-zinc-700 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Adding Site...
                </>
              ) : (
                <>
                  <Globe className="w-5 h-5" />
                  Add Site
                </>
              )}
            </button>
          </form>
        )}
      </div>

      {/* Features Info */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4">
          <h4 className="text-white font-medium mb-1">Automated Monitoring</h4>
          <p className="text-sm text-zinc-500">
            We&apos;ll automatically scan your site on a regular schedule.
          </p>
        </div>
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4">
          <h4 className="text-white font-medium mb-1">Detailed Reports</h4>
          <p className="text-sm text-zinc-500">
            Get comprehensive accessibility reports with actionable fixes.
          </p>
        </div>
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4">
          <h4 className="text-white font-medium mb-1">Issue Tracking</h4>
          <p className="text-sm text-zinc-500">
            Track issues over time and measure your improvement.
          </p>
        </div>
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4">
          <h4 className="text-white font-medium mb-1">Compliance Certificates</h4>
          <p className="text-sm text-zinc-500">
            Generate certificates to prove your compliance status.
          </p>
        </div>
      </div>
    </div>
  );
}
