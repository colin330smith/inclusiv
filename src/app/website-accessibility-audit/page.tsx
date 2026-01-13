import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Website Accessibility Audit | Free WCAG Compliance Check',
  description: 'Get a comprehensive website accessibility audit. AI-powered WCAG 2.1 AA analysis with prioritized fixes. Free instant scan, no signup required.',
  keywords: ['website accessibility audit', 'accessibility audit', 'WCAG audit', 'web accessibility testing', 'accessibility assessment'],
  openGraph: {
    title: 'Free Website Accessibility Audit',
    description: 'Comprehensive AI-powered accessibility audit. Instant results with prioritized fixes.',
  },
};

export default function AccessibilityAuditPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Website Accessibility Audit
        </h1>

        <p className="text-xl text-slate-300 mb-8">
          Get a comprehensive accessibility audit of your website in seconds. Our AI analyzes
          your site against WCAG 2.1 AA standards and provides prioritized, actionable fixes.
        </p>

        <div className="bg-blue-600 rounded-xl p-8 text-center mb-12">
          <h2 className="text-2xl font-bold mb-4">Start Your Free Audit</h2>
          <p className="text-blue-100 mb-6">
            No signup. No credit card. Instant results.
          </p>
          <Link
            href="/"
            className="inline-block bg-white text-blue-600 font-bold px-8 py-4 rounded-lg hover:bg-blue-50 transition"
          >
            Audit My Website →
          </Link>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">What Our Audit Covers</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-slate-700/50 rounded-lg p-6">
              <h3 className="font-semibold text-lg text-blue-400 mb-3">Perceivable</h3>
              <ul className="text-slate-300 text-sm space-y-2">
                <li>• Image alt text analysis</li>
                <li>• Video caption detection</li>
                <li>• Color contrast ratios</li>
                <li>• Text resizing support</li>
                <li>• Audio descriptions</li>
              </ul>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-6">
              <h3 className="font-semibold text-lg text-green-400 mb-3">Operable</h3>
              <ul className="text-slate-300 text-sm space-y-2">
                <li>• Keyboard navigation</li>
                <li>• Focus indicators</li>
                <li>• Skip navigation links</li>
                <li>• Touch target sizes</li>
                <li>• Timing adjustments</li>
              </ul>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-6">
              <h3 className="font-semibold text-lg text-amber-400 mb-3">Understandable</h3>
              <ul className="text-slate-300 text-sm space-y-2">
                <li>• Language declaration</li>
                <li>• Form labels & errors</li>
                <li>• Consistent navigation</li>
                <li>• Predictable interactions</li>
                <li>• Error prevention</li>
              </ul>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-6">
              <h3 className="font-semibold text-lg text-purple-400 mb-3">Robust</h3>
              <ul className="text-slate-300 text-sm space-y-2">
                <li>• Valid HTML structure</li>
                <li>• ARIA implementation</li>
                <li>• Semantic markup</li>
                <li>• Browser compatibility</li>
                <li>• Assistive tech support</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Our Audit Process</h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-blue-600 rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 font-bold">1</div>
              <div>
                <h3 className="font-semibold text-lg">Automated Scanning</h3>
                <p className="text-slate-300 text-sm">Our AI crawls your site and runs 50+ automated accessibility checks against WCAG 2.1 criteria</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-blue-600 rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 font-bold">2</div>
              <div>
                <h3 className="font-semibold text-lg">Issue Classification</h3>
                <p className="text-slate-300 text-sm">Issues are categorized by WCAG level (A, AA, AAA) and severity (Critical, Serious, Moderate, Minor)</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-blue-600 rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 font-bold">3</div>
              <div>
                <h3 className="font-semibold text-lg">Compliance Score</h3>
                <p className="text-slate-300 text-sm">Get an overall accessibility score and see how you compare to industry benchmarks</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-blue-600 rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 font-bold">4</div>
              <div>
                <h3 className="font-semibold text-lg">Prioritized Fixes</h3>
                <p className="text-slate-300 text-sm">Receive specific code fixes for each issue, prioritized by impact and effort required</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Audit Report Includes</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-slate-700/50 rounded-lg p-4 text-center">
              <div className="text-3xl mb-2">📊</div>
              <h3 className="font-semibold">Compliance Score</h3>
              <p className="text-slate-400 text-sm">Overall WCAG compliance percentage</p>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-4 text-center">
              <div className="text-3xl mb-2">🔍</div>
              <h3 className="font-semibold">Issue Breakdown</h3>
              <p className="text-slate-400 text-sm">By category and severity level</p>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-4 text-center">
              <div className="text-3xl mb-2">🛠️</div>
              <h3 className="font-semibold">Code Fixes</h3>
              <p className="text-slate-400 text-sm">Copy-paste solutions for each issue</p>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-4 text-center">
              <div className="text-3xl mb-2">📱</div>
              <h3 className="font-semibold">Mobile Analysis</h3>
              <p className="text-slate-400 text-sm">Touch targets and responsive issues</p>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-4 text-center">
              <div className="text-3xl mb-2">⚖️</div>
              <h3 className="font-semibold">Legal Risk</h3>
              <p className="text-slate-400 text-sm">EAA/ADA compliance assessment</p>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-4 text-center">
              <div className="text-3xl mb-2">📈</div>
              <h3 className="font-semibold">Progress Tracking</h3>
              <p className="text-slate-400 text-sm">Compare audits over time</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Why Choose Our Audit?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-700/50 rounded-lg p-6">
              <h3 className="font-semibold text-lg text-green-400 mb-2">AI-Powered Accuracy</h3>
              <p className="text-slate-300 text-sm">
                Our AI understands context, reducing false positives that plague other tools.
                Get accurate results you can trust.
              </p>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-6">
              <h3 className="font-semibold text-lg text-blue-400 mb-2">Instant Results</h3>
              <p className="text-slate-300 text-sm">
                Traditional audits take weeks and cost thousands. Get comprehensive
                results in seconds, completely free.
              </p>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-6">
              <h3 className="font-semibold text-lg text-purple-400 mb-2">Developer-Friendly</h3>
              <p className="text-slate-300 text-sm">
                Every issue includes exact code fixes with line numbers. Copy, paste,
                and fix issues in minutes.
              </p>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-6">
              <h3 className="font-semibold text-lg text-amber-400 mb-2">Compliance Focused</h3>
              <p className="text-slate-300 text-sm">
                Specifically designed for EAA and ADA compliance. Know exactly
                what you need to fix to avoid legal issues.
              </p>
            </div>
          </div>
        </section>

        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Get Your Free Accessibility Audit</h2>
          <p className="text-blue-100 mb-6">
            Comprehensive analysis. Prioritized fixes. Zero cost.
          </p>
          <Link
            href="/"
            className="inline-block bg-white text-blue-600 font-bold px-8 py-4 rounded-lg hover:bg-blue-50 transition"
          >
            Start Free Audit →
          </Link>
        </div>
      </div>
    </main>
  );
}
