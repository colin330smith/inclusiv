import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'EAA Compliance Checklist 2025 | European Accessibility Act Guide',
  description: 'Complete EAA compliance checklist for e-commerce. WCAG 2.1 requirements, deadline June 28 2025, penalties up to €100,000. Free compliance scanner.',
  keywords: ['EAA compliance', 'European Accessibility Act', 'EAA checklist', 'EAA 2025', 'EU accessibility law', 'WCAG compliance'],
  openGraph: {
    title: 'EAA Compliance Checklist 2025',
    description: 'Everything you need to know about European Accessibility Act compliance for e-commerce.',
  },
};

export default function EAAComplianceChecklistPage() {
  const daysUntilDeadline = Math.ceil((new Date('2025-06-28').getTime() - Date.now()) / (1000 * 60 * 60 * 24));

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="bg-red-600/20 border border-red-500 rounded-lg p-4 mb-8">
          <p className="text-red-300 font-semibold">
            ⏰ EAA Deadline: June 28, 2025 — {daysUntilDeadline} days remaining
          </p>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          EAA Compliance Checklist 2025
        </h1>

        <p className="text-xl text-slate-300 mb-8">
          The European Accessibility Act (EAA) requires all e-commerce websites serving EU customers to meet
          WCAG 2.1 AA accessibility standards. Non-compliance can result in fines up to €100,000 per violation.
        </p>

        <div className="bg-blue-600 rounded-xl p-8 text-center mb-12">
          <h2 className="text-2xl font-bold mb-4">Check Your EAA Compliance Now</h2>
          <p className="text-blue-100 mb-6">
            Free instant scan. See your score in seconds.
          </p>
          <Link
            href="/"
            className="inline-block bg-white text-blue-600 font-bold px-8 py-4 rounded-lg hover:bg-blue-50 transition"
          >
            Scan My Website →
          </Link>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Complete EAA Compliance Checklist</h2>

          <div className="space-y-6">
            <div className="bg-slate-700/50 rounded-lg p-6">
              <h3 className="font-semibold text-lg text-green-400 mb-4">1. Perceivable Content</h3>
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-start gap-3">
                  <span className="text-green-400">☐</span>
                  <span>All images have descriptive alt text</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400">☐</span>
                  <span>Videos have captions and transcripts</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400">☐</span>
                  <span>Color contrast ratio is at least 4.5:1 for text</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400">☐</span>
                  <span>Text can be resized up to 200% without loss of content</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400">☐</span>
                  <span>Audio content has text alternatives</span>
                </li>
              </ul>
            </div>

            <div className="bg-slate-700/50 rounded-lg p-6">
              <h3 className="font-semibold text-lg text-blue-400 mb-4">2. Operable Interface</h3>
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-start gap-3">
                  <span className="text-blue-400">☐</span>
                  <span>All functionality accessible via keyboard</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400">☐</span>
                  <span>No keyboard traps (user can navigate away)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400">☐</span>
                  <span>Skip navigation links available</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400">☐</span>
                  <span>Focus indicators are visible</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400">☐</span>
                  <span>Touch targets are at least 44x44 pixels</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400">☐</span>
                  <span>No seizure-triggering content (flashing)</span>
                </li>
              </ul>
            </div>

            <div className="bg-slate-700/50 rounded-lg p-6">
              <h3 className="font-semibold text-lg text-amber-400 mb-4">3. Understandable Content</h3>
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-start gap-3">
                  <span className="text-amber-400">☐</span>
                  <span>Page language is declared (lang attribute)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-amber-400">☐</span>
                  <span>Form fields have visible labels</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-amber-400">☐</span>
                  <span>Error messages are clear and helpful</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-amber-400">☐</span>
                  <span>Navigation is consistent across pages</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-amber-400">☐</span>
                  <span>Input fields have clear instructions</span>
                </li>
              </ul>
            </div>

            <div className="bg-slate-700/50 rounded-lg p-6">
              <h3 className="font-semibold text-lg text-purple-400 mb-4">4. Robust Implementation</h3>
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-start gap-3">
                  <span className="text-purple-400">☐</span>
                  <span>Valid HTML with proper structure</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400">☐</span>
                  <span>ARIA attributes used correctly</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400">☐</span>
                  <span>Works with screen readers (NVDA, VoiceOver)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400">☐</span>
                  <span>Compatible with major browsers</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">EAA Penalties and Enforcement</h2>
          <div className="bg-red-900/30 border border-red-700 rounded-lg p-6">
            <h3 className="font-semibold text-lg text-red-400 mb-3">Non-Compliance Consequences</h3>
            <ul className="space-y-2 text-slate-300">
              <li>• <strong>Fines up to €100,000</strong> per violation in some EU countries</li>
              <li>• <strong>Legal action</strong> from disability advocacy groups</li>
              <li>• <strong>Reputational damage</strong> from public enforcement actions</li>
              <li>• <strong>Market access restrictions</strong> within the EU</li>
              <li>• <strong>Customer loss</strong> — 15% of EU population has a disability</li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Who Must Comply with the EAA?</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-slate-700/50 rounded-lg p-6">
              <h3 className="font-semibold text-lg text-green-400 mb-3">Covered Services</h3>
              <ul className="text-slate-300 space-y-2">
                <li>✓ E-commerce websites and apps</li>
                <li>✓ Banking and financial services</li>
                <li>✓ Telecommunications</li>
                <li>✓ Transport services</li>
                <li>✓ Audio-visual media</li>
                <li>✓ E-books and e-readers</li>
              </ul>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-6">
              <h3 className="font-semibold text-lg text-amber-400 mb-3">Who's Affected</h3>
              <ul className="text-slate-300 space-y-2">
                <li>• Companies selling to EU customers</li>
                <li>• Not just EU-based businesses</li>
                <li>• Applies regardless of company size*</li>
                <li>• Microenterprises may have exemptions</li>
                <li>• B2C and B2B services covered</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">How to Get EAA Compliant</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="bg-blue-600 rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 font-bold">1</div>
              <div>
                <h3 className="font-semibold text-lg">Audit Your Current State</h3>
                <p className="text-slate-300 text-sm">Run an accessibility scan to identify WCAG violations and prioritize fixes.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-blue-600 rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 font-bold">2</div>
              <div>
                <h3 className="font-semibold text-lg">Fix Critical Issues First</h3>
                <p className="text-slate-300 text-sm">Address keyboard navigation, alt text, and form labels — the most common violations.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-blue-600 rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 font-bold">3</div>
              <div>
                <h3 className="font-semibold text-lg">Test with Real Users</h3>
                <p className="text-slate-300 text-sm">Have users with disabilities test your site. Automated tools catch ~30% of issues.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-blue-600 rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 font-bold">4</div>
              <div>
                <h3 className="font-semibold text-lg">Document Your Compliance</h3>
                <p className="text-slate-300 text-sm">Publish an accessibility statement. Monitor ongoing compliance with regular audits.</p>
              </div>
            </div>
          </div>
        </section>

        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Start Your EAA Compliance Journey</h2>
          <p className="text-blue-100 mb-6">
            Free accessibility scan. Instant results. See exactly what needs to be fixed.
          </p>
          <Link
            href="/"
            className="inline-block bg-white text-blue-600 font-bold px-8 py-4 rounded-lg hover:bg-blue-50 transition"
          >
            Check My Compliance →
          </Link>
        </div>
      </div>
    </main>
  );
}
