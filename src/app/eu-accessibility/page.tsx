import { Metadata } from 'next';
import Link from 'next/link';
import { Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'EU Accessibility Requirements 2025 | Complete Guide',
  description: 'Complete guide to EU accessibility requirements for e-commerce. European Accessibility Act (EAA) deadline June 28, 2025. Check your compliance now.',
  keywords: ['EU accessibility', 'European Accessibility Act', 'accessibility requirements Europe', 'EAA 2025', 'EU e-commerce accessibility'],
  openGraph: {
    title: 'EU Accessibility Requirements 2025 - Complete Guide',
    description: 'Everything you need to know about EU accessibility laws for e-commerce websites.',
  },
};

export default function EUAccessibilityPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          EU Accessibility Requirements 2025
        </h1>

        <p className="text-xl text-slate-300 mb-8">
          Everything e-commerce businesses need to know about the European Accessibility Act
          and how to comply before the June 2025 deadline.
        </p>

        <div className="bg-amber-500/20 border border-amber-500 rounded-lg p-6 mb-8">
          <p className="text-xl font-semibold text-amber-300">
            ⏰ Compliance Deadline: June 28, 2025
          </p>
          <p className="text-amber-200 mt-2">
            All 27 EU member states will enforce accessibility requirements for digital services.
          </p>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Key EU Accessibility Laws</h2>

          <div className="space-y-6">
            <div className="bg-slate-700/50 rounded-lg p-6">
              <h3 className="font-semibold text-xl text-blue-400 mb-2">European Accessibility Act (EAA)</h3>
              <p className="text-slate-300 mb-2">Directive (EU) 2019/882</p>
              <ul className="text-slate-300 text-sm space-y-1 list-disc list-inside">
                <li>Applies to e-commerce, banking, transport, e-books</li>
                <li>Requires WCAG 2.1 Level AA compliance</li>
                <li>Fines up to €100,000 per violation</li>
                <li>Effective: June 28, 2025</li>
              </ul>
            </div>

            <div className="bg-slate-700/50 rounded-lg p-6">
              <h3 className="font-semibold text-xl text-green-400 mb-2">Web Accessibility Directive (WAD)</h3>
              <p className="text-slate-300 mb-2">Directive (EU) 2016/2102</p>
              <ul className="text-slate-300 text-sm space-y-1 list-disc list-inside">
                <li>Applies to public sector websites and apps</li>
                <li>Already in effect since 2020</li>
                <li>Requires accessibility statements</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Who Must Comply?</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-slate-700/50 rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">🛒 E-commerce</h3>
              <p className="text-slate-300 text-sm">Online shops selling products or services to EU customers</p>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">🏦 Banking</h3>
              <p className="text-slate-300 text-sm">Online banking, payment services, financial platforms</p>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">🚂 Transport</h3>
              <p className="text-slate-300 text-sm">Ticketing websites, travel booking platforms</p>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">📚 Digital Content</h3>
              <p className="text-slate-300 text-sm">E-books, streaming services, digital publications</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Country-Specific Enforcement</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-600">
                  <th className="text-left py-3 px-4">Country</th>
                  <th className="text-left py-3 px-4">Max Fine</th>
                  <th className="text-left py-3 px-4">Enforcement Body</th>
                </tr>
              </thead>
              <tbody className="text-slate-300">
                <tr className="border-b border-slate-700">
                  <td className="py-3 px-4">Germany</td>
                  <td className="py-3 px-4">€100,000</td>
                  <td className="py-3 px-4">Federal Ministry of Labour</td>
                </tr>
                <tr className="border-b border-slate-700">
                  <td className="py-3 px-4">France</td>
                  <td className="py-3 px-4">€50,000</td>
                  <td className="py-3 px-4">ARCOM</td>
                </tr>
                <tr className="border-b border-slate-700">
                  <td className="py-3 px-4">Netherlands</td>
                  <td className="py-3 px-4">€25,000</td>
                  <td className="py-3 px-4">Dutch Inspectorate</td>
                </tr>
                <tr className="border-b border-slate-700">
                  <td className="py-3 px-4">Spain</td>
                  <td className="py-3 px-4">€90,000</td>
                  <td className="py-3 px-4">IMSERSO</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Italy</td>
                  <td className="py-3 px-4">€75,000</td>
                  <td className="py-3 px-4">AgID</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Compliance Checklist</h2>
          <div className="space-y-3">
            <label className="flex items-center gap-3 bg-slate-700/30 p-3 rounded-lg">
              <input type="checkbox" className="w-5 h-5" disabled />
              <span>All images have descriptive alt text</span>
            </label>
            <label className="flex items-center gap-3 bg-slate-700/30 p-3 rounded-lg">
              <input type="checkbox" className="w-5 h-5" disabled />
              <span>Color contrast meets 4.5:1 ratio</span>
            </label>
            <label className="flex items-center gap-3 bg-slate-700/30 p-3 rounded-lg">
              <input type="checkbox" className="w-5 h-5" disabled />
              <span>All functionality works with keyboard only</span>
            </label>
            <label className="flex items-center gap-3 bg-slate-700/30 p-3 rounded-lg">
              <input type="checkbox" className="w-5 h-5" disabled />
              <span>Forms have proper labels and error messages</span>
            </label>
            <label className="flex items-center gap-3 bg-slate-700/30 p-3 rounded-lg">
              <input type="checkbox" className="w-5 h-5" disabled />
              <span>Videos have captions and transcripts</span>
            </label>
            <label className="flex items-center gap-3 bg-slate-700/30 p-3 rounded-lg">
              <input type="checkbox" className="w-5 h-5" disabled />
              <span>Page structure uses proper headings (H1-H6)</span>
            </label>
          </div>
        </section>

        <div className="bg-blue-600 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Check Your EU Compliance Now</h2>
          <p className="text-blue-100 mb-6">
            Free instant scan. See exactly what needs to be fixed before the deadline.
          </p>
          <Link
            href="/"
            className="inline-block bg-white text-blue-600 font-bold px-8 py-4 rounded-lg hover:bg-blue-50 transition"
          >
            Free Compliance Scan →
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
