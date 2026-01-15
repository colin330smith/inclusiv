'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw, Home, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to analytics in production
    console.error('Application error:', error);

    // Track error in Plausible if available
    if (typeof window !== 'undefined') {
      const win = window as unknown as { plausible?: (event: string, options?: object) => void };
      win.plausible?.('Error', {
        props: {
          message: error.message,
          digest: error.digest,
          path: window.location.pathname,
        },
      });
    }
  }, [error]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        {/* Error Icon */}
        <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-10 h-10 text-red-500" />
        </div>

        {/* Error Message */}
        <h1 className="text-2xl font-bold text-white mb-3">
          Something went wrong
        </h1>
        <p className="text-zinc-400 mb-8">
          We encountered an unexpected error. Our team has been notified and is working to fix it.
        </p>

        {/* Error Details (Development Only) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 mb-6 text-left">
            <p className="text-xs text-zinc-500 font-mono break-all">
              {error.message}
            </p>
            {error.digest && (
              <p className="text-xs text-zinc-600 mt-2">
                Error ID: {error.digest}
              </p>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={() => reset()}
            className="flex items-center justify-center gap-2 w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-colors"
          >
            <RefreshCw className="w-5 h-5" />
            Try Again
          </button>

          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 w-full py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold rounded-xl transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>

          <Link
            href="/"
            className="flex items-center justify-center gap-2 w-full py-3 text-zinc-400 hover:text-white transition-colors"
          >
            <Home className="w-4 h-4" />
            Return to Home
          </Link>
        </div>

        {/* Support Contact */}
        <div className="mt-8 pt-6 border-t border-zinc-800">
          <p className="text-zinc-500 text-sm">
            Need help? Contact us at{' '}
            <a
              href="mailto:support@tryinclusiv.com"
              className="text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              support@tryinclusiv.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
