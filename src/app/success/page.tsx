import { Metadata } from 'next';
import Link from 'next/link';
import { Shield, CheckCircle, ArrowRight, Zap, Mail, Calendar } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Welcome to Inclusiv! | Subscription Confirmed',
  description: 'Your subscription is active. Start your accessibility compliance journey now.',
};

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6">
      <div className="max-w-lg w-full text-center">
        <div className="mb-8">
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">
            Welcome to Inclusiv!
          </h1>
          <p className="text-zinc-400 text-lg">
            Your subscription is now active. Let's get you EAA compliant before June 28, 2025.
          </p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-8 text-left">
          <h2 className="text-lg font-semibold text-white mb-4">What happens next:</h2>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <div className="w-8 h-8 bg-indigo-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Mail className="w-4 h-4 text-indigo-400" />
              </div>
              <div>
                <p className="text-white font-medium">Check your email</p>
                <p className="text-zinc-400 text-sm">We've sent your login credentials and quick-start guide</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-8 h-8 bg-indigo-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Zap className="w-4 h-4 text-indigo-400" />
              </div>
              <div>
                <p className="text-white font-medium">Run your first full scan</p>
                <p className="text-zinc-400 text-sm">Add your domain and scan all pages for WCAG issues</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-8 h-8 bg-indigo-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Calendar className="w-4 h-4 text-indigo-400" />
              </div>
              <div>
                <p className="text-white font-medium">Set up monitoring</p>
                <p className="text-zinc-400 text-sm">We'll automatically check for new issues weekly</p>
              </div>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-colors"
          >
            Start Scanning Now
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/help/getting-started"
            className="block w-full py-4 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold rounded-xl transition-colors"
          >
            Read the Quick-Start Guide
          </Link>
        </div>

        <div className="mt-8 pt-8 border-t border-zinc-800">
          <div className="flex items-center justify-center gap-2 text-zinc-500">
            <Shield className="w-5 h-5" />
            <span>Inclusiv</span>
          </div>
          <p className="text-zinc-600 text-sm mt-2">
            Questions? Reply to any email from us or contact support@inclusiv.eu
          </p>
        </div>
      </div>
    </div>
  );
}
