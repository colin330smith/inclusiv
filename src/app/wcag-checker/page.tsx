import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Free WCAG 2.1 Checker | Instant Accessibility Score',
  description: 'Free WCAG 2.1 Level AA compliance checker. Scan your website instantly and get actionable accessibility fixes. No signup required.',
  keywords: ['WCAG checker', 'WCAG 2.1', 'accessibility checker', 'WCAG compliance', 'web accessibility', 'ADA compliance'],
  openGraph: {
    title: 'Free WCAG 2.1 Accessibility Checker',
    description: 'Instant WCAG 2.1 Level AA compliance scan. Get your accessibility score in seconds.',
  },
};

export default function WCAGCheckerPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Free WCAG 2.1 Compliance Checker
        </h1>

        <p className="text-xl text-slate-300 mb-8">
          Check if your website meets WCAG 2.1 Level AA standards in seconds.
          Our AI-powered scanner identifies issues and provides clear fixes.
        </p>

        <div className="bg-blue-600 rounded-xl p-8 text-center mb-12">
          <h2 className="text-2xl font-bold mb-4">Scan Your Site Now - Free</h2>
          <p className="text-blue-100 mb-6">
            No signup required. Get instant results.
          </p>
          <Link
            href="/"
            className="inline-block bg-white text-blue-600 font-bold px-8 py-4 rounded-lg hover:bg-blue-50 transition"
          >
            Start Free WCAG Scan →
          </Link>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">What We Check</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-slate-700/50 rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">1.1 Text Alternatives</h3>
              <p className="text-slate-300 text-sm">Alt text for images, captions for media content</p>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">1.3 Adaptable</h3>
              <p className="text-slate-300 text-sm">Proper heading structure, meaningful sequence</p>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">1.4 Distinguishable</h3>
              <p className="text-slate-300 text-sm">Color contrast (4.5:1 ratio), text resizing</p>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">2.1 Keyboard</h3>
              <p className="text-slate-300 text-sm">Full keyboard navigation, no keyboard traps</p>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">2.4 Navigable</h3>
              <p className="text-slate-300 text-sm">Skip links, page titles, focus visible</p>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">4.1 Compatible</h3>
              <p className="text-slate-300 text-sm">Valid HTML, ARIA labels, assistive tech support</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Why WCAG Compliance Matters</h2>
          <ul className="space-y-4 text-slate-300">
            <li className="flex items-start gap-3">
              <span className="text-green-400 text-xl">✓</span>
              <span><strong>Legal requirement</strong> - EAA mandates WCAG 2.1 AA for EU e-commerce by June 2025</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-400 text-xl">✓</span>
              <span><strong>Better SEO</strong> - Accessible sites rank higher in search engines</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-400 text-xl">✓</span>
              <span><strong>Larger audience</strong> - 15% of the population has some form of disability</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-400 text-xl">✓</span>
              <span><strong>Avoid lawsuits</strong> - ADA/EAA violations can result in significant fines</span>
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">WCAG 2.1 Levels Explained</h2>
          <div className="space-y-4">
            <div className="bg-slate-700/50 rounded-lg p-4">
              <h3 className="font-semibold text-lg text-yellow-400">Level A (Minimum)</h3>
              <p className="text-slate-300 text-sm">Basic accessibility requirements. Essential for any website.</p>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-4 border border-green-500">
              <h3 className="font-semibold text-lg text-green-400">Level AA (Required for EAA)</h3>
              <p className="text-slate-300 text-sm">Standard level required by most regulations including EAA, ADA, and Section 508.</p>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-4">
              <h3 className="font-semibold text-lg text-blue-400">Level AAA (Gold Standard)</h3>
              <p className="text-slate-300 text-sm">Highest accessibility level. Not always achievable for all content types.</p>
            </div>
          </div>
        </section>

        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Get Your Free WCAG Report</h2>
          <p className="text-purple-100 mb-6">
            Instant scan. Detailed issues. Clear fixes. No credit card required.
          </p>
          <Link
            href="/"
            className="inline-block bg-white text-purple-600 font-bold px-8 py-4 rounded-lg hover:bg-purple-50 transition"
          >
            Check WCAG Compliance Now →
          </Link>
        </div>
      </div>
    </main>
  );
}
