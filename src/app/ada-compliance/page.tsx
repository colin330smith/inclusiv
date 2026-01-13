import { Metadata } from 'next';
import Link from 'next/link';
import { Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'ADA Website Compliance Checker | Free Accessibility Scan',
  description: 'Check your website for ADA compliance. Free instant scan for accessibility issues. Avoid lawsuits with WCAG 2.1 AA compliance.',
  keywords: ['ADA compliance', 'ADA website', 'ADA checker', 'ADA accessibility', 'Americans with Disabilities Act', 'website accessibility'],
  openGraph: {
    title: 'Free ADA Compliance Checker',
    description: 'Scan your website for ADA accessibility issues. Instant results, no signup required.',
  },
};

export default function ADACompliancePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          ADA Website Compliance Checker
        </h1>

        <p className="text-xl text-slate-300 mb-8">
          Protect your business from ADA lawsuits. Scan your website for accessibility
          issues and get clear fixes in seconds.
        </p>

        <div className="bg-red-500/20 border border-red-500 rounded-lg p-6 mb-8">
          <p className="text-xl font-semibold text-red-300">
            ⚖️ ADA lawsuits increased 300% since 2018
          </p>
          <p className="text-red-200 mt-2">
            Average settlement: $25,000 - $100,000+ plus legal fees and mandatory fixes.
          </p>
        </div>

        <div className="bg-blue-600 rounded-xl p-8 text-center mb-12">
          <h2 className="text-2xl font-bold mb-4">Free ADA Compliance Scan</h2>
          <p className="text-blue-100 mb-6">
            Instant results. No signup. No credit card.
          </p>
          <Link
            href="/"
            className="inline-block bg-white text-blue-600 font-bold px-8 py-4 rounded-lg hover:bg-blue-50 transition"
          >
            Check ADA Compliance Now →
          </Link>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">What is ADA Web Compliance?</h2>
          <p className="text-slate-300 mb-4">
            The Americans with Disabilities Act (ADA) requires businesses to provide equal
            access to their services - including websites. Courts have consistently ruled
            that websites are "places of public accommodation" under Title III of the ADA.
          </p>
          <p className="text-slate-300">
            While the ADA doesn't specify technical standards, courts reference <strong>WCAG 2.1
            Level AA</strong> as the benchmark for web accessibility compliance.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Who Needs ADA Compliance?</h2>
          <ul className="space-y-3 text-slate-300">
            <li className="flex items-start gap-3">
              <span className="text-blue-400">•</span>
              <span><strong>E-commerce stores</strong> - Any online shop selling products or services</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-400">•</span>
              <span><strong>Service businesses</strong> - Law firms, healthcare, restaurants, hotels</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-400">•</span>
              <span><strong>Educational institutions</strong> - Schools, universities, online courses</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-400">•</span>
              <span><strong>Government contractors</strong> - Anyone working with federal/state agencies</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-400">•</span>
              <span><strong>Any business with 15+ employees</strong> - Even if you only operate locally</span>
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Common ADA Violations We Detect</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-slate-700/50 rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2 text-red-400">Missing Alt Text</h3>
              <p className="text-slate-300 text-sm">Images without descriptions are inaccessible to screen readers</p>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2 text-red-400">Poor Color Contrast</h3>
              <p className="text-slate-300 text-sm">Text that's hard to read for users with vision impairments</p>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2 text-red-400">No Keyboard Navigation</h3>
              <p className="text-slate-300 text-sm">Users can't navigate without a mouse</p>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2 text-red-400">Unlabeled Forms</h3>
              <p className="text-slate-300 text-sm">Form fields without proper labels confuse assistive technology</p>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2 text-red-400">Missing Video Captions</h3>
              <p className="text-slate-300 text-sm">Videos without captions exclude deaf users</p>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2 text-red-400">Inaccessible PDFs</h3>
              <p className="text-slate-300 text-sm">Documents that screen readers can't parse</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">ADA Lawsuit Statistics</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-slate-700/50 rounded-lg p-6 text-center">
              <p className="text-4xl font-bold text-red-400">4,500+</p>
              <p className="text-slate-300 text-sm mt-2">ADA website lawsuits filed in 2024</p>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-6 text-center">
              <p className="text-4xl font-bold text-amber-400">$50K</p>
              <p className="text-slate-300 text-sm mt-2">Average settlement cost</p>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-6 text-center">
              <p className="text-4xl font-bold text-blue-400">74%</p>
              <p className="text-slate-300 text-sm mt-2">Target e-commerce websites</p>
            </div>
          </div>
        </section>

        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Don't Wait for a Lawsuit</h2>
          <p className="text-green-100 mb-6">
            Proactive compliance costs a fraction of a lawsuit. Check your site now.
          </p>
          <Link
            href="/"
            className="inline-block bg-white text-green-600 font-bold px-8 py-4 rounded-lg hover:bg-green-50 transition"
          >
            Free ADA Scan →
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-700 mt-24">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-slate-400">
              <Shield className="w-5 h-5" />
              <span>Inclusiv © 2025</span>
              <span className="text-slate-600">|</span>
              <span>Powered by axe-core</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-slate-400 text-sm">
              <Link href="/" className="hover:text-white transition-colors">Scanner</Link>
              <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
