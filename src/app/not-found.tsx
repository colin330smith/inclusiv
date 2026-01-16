import { Metadata } from 'next';
import Link from 'next/link';
import { FileQuestion, Home, Search, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Page Not Found | Inclusiv',
  description: 'The page you are looking for could not be found.',
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        {/* 404 Icon */}
        <div className="w-24 h-24 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-6">
          <FileQuestion className="w-12 h-12 text-zinc-500" />
        </div>

        {/* Error Message */}
        <h1 className="text-4xl font-bold text-white mb-3">404</h1>
        <h2 className="text-xl font-semibold text-zinc-300 mb-4">Page Not Found</h2>
        <p className="text-zinc-400 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>

        {/* Actions */}
        <div className="space-y-3">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-colors"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Link>

          <Link
            href="/pricing"
            className="flex items-center justify-center gap-2 w-full py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold rounded-xl transition-colors"
          >
            View Pricing
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Helpful Links */}
        <div className="mt-8 pt-6 border-t border-zinc-800">
          <p className="text-zinc-500 text-sm mb-4">Looking for something specific?</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/blog"
              className="text-sm text-zinc-400 hover:text-indigo-400 transition-colors"
            >
              Blog
            </Link>
            <span className="text-zinc-700">•</span>
            <Link
              href="/faq"
              className="text-sm text-zinc-400 hover:text-indigo-400 transition-colors"
            >
              FAQ
            </Link>
            <span className="text-zinc-700">•</span>
            <Link
              href="/contact"
              className="text-sm text-zinc-400 hover:text-indigo-400 transition-colors"
            >
              Contact
            </Link>
            <span className="text-zinc-700">•</span>
            <Link
              href="/help"
              className="text-sm text-zinc-400 hover:text-indigo-400 transition-colors"
            >
              Help Center
            </Link>
          </div>
        </div>

        {/* Scanner CTA */}
        <div className="mt-8 p-4 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-xl">
          <div className="flex items-center justify-center gap-2 text-white mb-2">
            <Search className="w-5 h-5 text-indigo-400" />
            <span className="font-medium">Free Accessibility Scanner</span>
          </div>
          <p className="text-zinc-400 text-sm mb-3">
            Check your website&apos;s EAA compliance in 30 seconds
          </p>
          <Link
            href="/"
            className="text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors"
          >
            Scan Now →
          </Link>
        </div>
      </div>
    </div>
  );
}
