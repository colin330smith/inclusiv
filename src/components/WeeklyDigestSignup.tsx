'use client';

import { useState } from 'react';
import { Mail, CheckCircle, Sparkles, TrendingUp, AlertTriangle, BookOpen } from 'lucide-react';

interface WeeklyDigestSignupProps {
  variant?: 'inline' | 'card' | 'minimal';
  source?: string;
}

export default function WeeklyDigestSignup({ variant = 'card', source = 'website' }: WeeklyDigestSignupProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes('@')) {
      setErrorMessage('Please enter a valid email');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          source,
          listType: 'weekly_digest',
        }),
      });

      if (response.ok) {
        setStatus('success');
        setEmail('');
      } else {
        const data = await response.json();
        setErrorMessage(data.error || 'Failed to subscribe');
        setStatus('error');
      }
    } catch {
      setErrorMessage('Something went wrong. Please try again.');
      setStatus('error');
    }
  };

  if (variant === 'minimal') {
    return (
      <div className="flex items-center gap-2">
        {status === 'success' ? (
          <div className="flex items-center gap-2 text-green-400 text-sm">
            <CheckCircle className="w-4 h-4" />
            <span>Subscribed!</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 text-sm focus:outline-none focus:border-indigo-500 w-48"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
            >
              {status === 'loading' ? '...' : 'Subscribe'}
            </button>
          </form>
        )}
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <div className="bg-gradient-to-r from-indigo-600/10 to-purple-600/10 border border-indigo-500/20 rounded-xl p-4">
        {status === 'success' ? (
          <div className="flex items-center gap-3 text-green-400">
            <CheckCircle className="w-5 h-5" />
            <span>You&apos;re subscribed! Check your inbox for confirmation.</span>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-center gap-3 flex-1">
              <Mail className="w-5 h-5 text-indigo-400 flex-shrink-0" />
              <span className="text-white text-sm">Get weekly accessibility insights, tips & EAA updates</span>
            </div>
            <form onSubmit={handleSubmit} className="flex items-center gap-2 w-full sm:w-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 sm:w-48 px-3 py-2 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 text-sm focus:outline-none focus:border-indigo-500"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-lg transition-colors disabled:opacity-50 whitespace-nowrap"
              >
                {status === 'loading' ? 'Joining...' : 'Join Free'}
              </button>
            </form>
          </div>
        )}
        {status === 'error' && (
          <p className="mt-2 text-red-400 text-sm">{errorMessage}</p>
        )}
      </div>
    );
  }

  // Card variant (default)
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 p-6 border-b border-zinc-800">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-indigo-500/20 rounded-xl flex items-center justify-center">
            <Mail className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Weekly Accessibility Digest</h3>
            <p className="text-zinc-400 text-sm">Join 2,500+ accessibility-minded developers</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {status === 'success' ? (
          <div className="text-center py-4">
            <div className="w-12 h-12 mx-auto mb-4 bg-green-500/10 rounded-full flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-500" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">You&apos;re in!</h4>
            <p className="text-zinc-400 text-sm">
              Check your inbox to confirm your subscription. Your first digest arrives next Monday.
            </p>
          </div>
        ) : (
          <>
            {/* What you'll get */}
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white text-sm font-medium">Industry Benchmarks</p>
                  <p className="text-zinc-400 text-xs">Weekly score updates across industries</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white text-sm font-medium">EAA Compliance Updates</p>
                  <p className="text-zinc-400 text-xs">Stay ahead of regulatory changes</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <BookOpen className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white text-sm font-medium">Quick Fix Tutorials</p>
                  <p className="text-zinc-400 text-xs">Actionable tips you can implement today</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white text-sm font-medium">Tool Updates & Features</p>
                  <p className="text-zinc-400 text-xs">Be first to try new scanning features</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-zinc-400 focus:outline-none focus:border-indigo-500"
              />
              {status === 'error' && (
                <p className="text-red-400 text-sm">{errorMessage}</p>
              )}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold rounded-xl transition-all disabled:opacity-50"
              >
                {status === 'loading' ? 'Subscribing...' : 'Subscribe for Free'}
              </button>
            </form>

            <p className="text-center text-zinc-500 text-xs mt-4">
              No spam. Unsubscribe anytime. We respect your inbox.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
