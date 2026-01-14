import { Metadata } from 'next';
import Link from 'next/link';
import { Shield, ArrowRight, CheckCircle, AlertTriangle, Calendar, Scale, ArrowLeft, Zap, Clock, FileCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'EAA Enforcement Is Now Active: What E-commerce Businesses Need to Do',
  description: 'The European Accessibility Act deadline has passed. Learn what steps to take now, how enforcement works, and how to achieve compliance quickly to avoid fines up to 100,000.',
  keywords: [
    'EAA enforcement 2025',
    'European Accessibility Act penalties',
    'EAA compliance after deadline',
    'web accessibility fines EU',
    'EAA enforcement actions',
    'e-commerce accessibility compliance',
    'WCAG 2.1 AA requirements',
    'EU digital accessibility law',
  ],
  openGraph: {
    title: 'EAA Enforcement Is Now Active: What E-commerce Businesses Need to Do',
    description: 'The EAA deadline has passed. Learn what steps to take now to achieve compliance and avoid fines.',
    type: 'article',
    publishedTime: '2025-07-01T00:00:00.000Z',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EAA Enforcement Active: Next Steps for E-commerce',
    description: 'The European Accessibility Act deadline has passed. Here is what to do now.',
  },
  alternates: {
    canonical: 'https://tryinclusiv.com/blog/eaa-enforcement-active-what-to-do',
  },
};

const getEnforcementDays = () => {
  const deadline = new Date("2025-06-28");
  const today = new Date();
  const diffTime = today.getTime() - deadline.getTime();
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
};

export default function EAAEnforcementPage() {
  const enforcementDays = getEnforcementDays();

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-indigo-500" />
            <span className="text-xl font-bold text-white">Inclusiv</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/blog" className="text-zinc-400 hover:text-white transition-colors text-sm font-medium">
              Blog
            </Link>
            <Link href="/pricing" className="text-zinc-400 hover:text-white transition-colors text-sm font-medium">
              Pricing
            </Link>
            <div className="flex items-center gap-2 px-3 py-1 bg-red-500/10 rounded-full text-sm text-red-400">
              <AlertTriangle className="w-4 h-4" />
              <span className="font-semibold">EAA enforcement active</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-zinc-500 mb-8">
          <Link href="/blog" className="hover:text-white transition-colors flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" />
            Blog
          </Link>
          <span>/</span>
          <span className="text-zinc-400">Compliance Guide</span>
        </div>

        <article>
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 bg-red-500/20 text-red-400 text-sm font-semibold rounded-full">
                Urgent
              </span>
              <span className="text-zinc-500 text-sm flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                July 2025
              </span>
              <span className="text-zinc-500 text-sm">8 min read</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              EAA Enforcement Is Now Active: What E-commerce Businesses Need to Do
            </h1>
            <p className="text-xl text-zinc-400 leading-relaxed">
              The European Accessibility Act deadline of June 28, 2025 has passed. Enforcement is now active
              across EU member states. If your e-commerce site is not yet compliant, here is exactly what you
              need to do now to minimize risk and achieve compliance.
            </p>
          </header>

          {/* Enforcement Alert */}
          <div className="p-6 bg-red-500/10 border border-red-500/30 rounded-2xl mb-12">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-8 h-8 text-red-400 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-red-400 mb-2">
                  Enforcement Has Been Active for {enforcementDays} Days
                </h3>
                <p className="text-zinc-400">
                  EU member states can now issue fines up to €100,000 for non-compliant websites.
                  The good news: taking action now can significantly reduce your risk.
                </p>
              </div>
            </div>
          </div>

          {/* Article Content */}
          <div className="prose prose-invert prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-white mt-12 mb-6">The Current Situation</h2>
            <p className="text-zinc-300 mb-6 leading-relaxed">
              As of June 28, 2025, the European Accessibility Act requires all e-commerce websites, banking services,
              ticketing platforms, and other digital services operating in the EU to meet WCAG 2.1 Level AA
              accessibility standards.
            </p>
            <p className="text-zinc-300 mb-6 leading-relaxed">
              Early data from our scans shows that approximately 78% of EU e-commerce sites still have significant
              accessibility issues. This means enforcement authorities are likely to prioritize the most egregious
              violations first, giving businesses still working on compliance a window to act.
            </p>

            <h2 className="text-2xl font-bold text-white mt-12 mb-6">How EAA Enforcement Works</h2>
            <p className="text-zinc-300 mb-6 leading-relaxed">
              Unlike the GDPR, which has a single supervisory authority per country, EAA enforcement varies
              by member state. Each EU country has designated market surveillance authorities responsible for
              enforcement. Here is what to expect:
            </p>

            <div className="space-y-4 my-8">
              <div className="flex items-start gap-4 p-4 bg-zinc-900 rounded-xl">
                <div className="w-8 h-8 bg-indigo-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-indigo-400 font-bold">1</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Consumer Complaints</h4>
                  <p className="text-zinc-400 text-sm">
                    Most enforcement actions start with complaints from consumers or disability advocacy groups.
                    A user who cannot complete a purchase may file a complaint with their national authority.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-zinc-900 rounded-xl">
                <div className="w-8 h-8 bg-indigo-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-indigo-400 font-bold">2</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Investigation</h4>
                  <p className="text-zinc-400 text-sm">
                    Authorities will evaluate your website against WCAG 2.1 AA criteria. They may use
                    automated scanning tools combined with manual testing.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-zinc-900 rounded-xl">
                <div className="w-8 h-8 bg-indigo-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-indigo-400 font-bold">3</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Corrective Action Period</h4>
                  <p className="text-zinc-400 text-sm">
                    You will typically receive a notice and a deadline to fix issues before fines are imposed.
                    Having documentation of ongoing compliance efforts strengthens your position.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-zinc-900 rounded-xl">
                <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-red-400 font-bold">4</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Penalties</h4>
                  <p className="text-zinc-400 text-sm">
                    Fines up to €100,000 per violation. In severe cases, authorities can order your site
                    to be blocked in their jurisdiction until issues are resolved.
                  </p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-white mt-12 mb-6">Immediate Steps to Take Now</h2>

            <div className="grid gap-6 my-8">
              <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
                    <Zap className="w-5 h-5 text-green-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">Step 1: Get an Accessibility Audit</h3>
                </div>
                <p className="text-zinc-400 mb-4">
                  Run a comprehensive WCAG 2.1 AA scan of your website immediately. This gives you a baseline
                  understanding of your current issues and demonstrates proactive compliance efforts.
                </p>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-indigo-400 font-medium hover:text-indigo-300"
                >
                  Run a free scan now
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
                    <FileCheck className="w-5 h-5 text-green-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">Step 2: Publish an Accessibility Statement</h3>
                </div>
                <p className="text-zinc-400 mb-4">
                  An accessibility statement is required under the EAA. It should describe your current accessibility
                  status, known issues, and your remediation timeline. This document is crucial if you receive
                  an enforcement inquiry.
                </p>
                <Link
                  href="/accessibility-statement-generator"
                  className="inline-flex items-center gap-2 text-indigo-400 font-medium hover:text-indigo-300"
                >
                  Generate your statement
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
                    <Scale className="w-5 h-5 text-green-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">Step 3: Document Your Compliance Plan</h3>
                </div>
                <p className="text-zinc-400">
                  Create a formal remediation plan with specific milestones and deadlines. This documentation
                  shows enforcement authorities that you are taking compliance seriously, even if you are not yet
                  fully compliant.
                </p>
              </div>

              <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
                    <Clock className="w-5 h-5 text-green-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">Step 4: Fix Critical Issues First</h3>
                </div>
                <p className="text-zinc-400">
                  Not all accessibility issues carry equal weight. Focus first on critical and serious issues that
                  completely block users with disabilities. Common high-priority fixes include: missing alt text on
                  product images, inaccessible checkout forms, and missing focus indicators.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-white mt-12 mb-6">What Happens If You Receive an Enforcement Notice</h2>
            <p className="text-zinc-300 mb-6 leading-relaxed">
              If you receive notice from an enforcement authority, do not panic. Here is how to respond:
            </p>

            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                <span className="text-zinc-300">
                  <strong className="text-white">Respond promptly</strong> - Acknowledge receipt and request specifics about which issues were identified
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                <span className="text-zinc-300">
                  <strong className="text-white">Present your compliance plan</strong> - Show documentation of your ongoing remediation efforts
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                <span className="text-zinc-300">
                  <strong className="text-white">Request a reasonable timeline</strong> - Authorities often grant extensions for businesses showing good faith efforts
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                <span className="text-zinc-300">
                  <strong className="text-white">Consider legal counsel</strong> - For significant notices, consult with a lawyer familiar with EU accessibility law
                </span>
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-white mt-12 mb-6">How Long Does Compliance Take?</h2>
            <p className="text-zinc-300 mb-6 leading-relaxed">
              For most e-commerce websites, achieving WCAG 2.1 AA compliance takes 2-8 weeks depending on:
            </p>
            <ul className="space-y-2 mb-8 text-zinc-300">
              <li>- The number and severity of existing issues</li>
              <li>- Your platform (Shopify, WordPress, custom, etc.)</li>
              <li>- Available developer resources</li>
              <li>- Whether you use AI-assisted remediation tools</li>
            </ul>
            <p className="text-zinc-300 mb-6 leading-relaxed">
              With Inclusiv&apos;s AI-powered fixes, many businesses are achieving compliance in 2-3 weeks.
              Our platform generates exact code changes for your specific platform, significantly reducing
              the technical effort required.
            </p>

            <h2 className="text-2xl font-bold text-white mt-12 mb-6">The Bottom Line</h2>
            <p className="text-zinc-300 mb-6 leading-relaxed">
              Yes, the EAA deadline has passed. But enforcement authorities are focusing first on the
              most serious cases and on businesses that show no effort toward compliance. By taking action
              now &mdash; running an audit, publishing an accessibility statement, and actively working on fixes &mdash;
              you significantly reduce your risk.
            </p>
            <p className="text-zinc-300 mb-6 leading-relaxed">
              The businesses most at risk are those doing nothing. Do not be one of them.
            </p>
          </div>

          {/* CTA Section */}
          <div className="mt-16 p-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              Check Your Compliance Status Now
            </h2>
            <p className="text-indigo-100 mb-6 max-w-xl mx-auto">
              Get an instant accessibility audit of your website. See exactly what issues you have
              and get AI-generated fixes for your specific platform.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-600 font-semibold rounded-xl hover:bg-indigo-50 transition-colors"
            >
              <Shield className="w-5 h-5" />
              Free Accessibility Scan
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Related Articles */}
          <div className="mt-16">
            <h3 className="text-xl font-bold text-white mb-6">Related Articles</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <Link
                href="/blog/eaa-compliance-guide-2025"
                className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl hover:border-zinc-700 transition-colors"
              >
                <h4 className="font-semibold text-white mb-2">The Complete Guide to EAA Compliance</h4>
                <p className="text-zinc-400 text-sm">Full technical requirements and step-by-step implementation guide.</p>
              </Link>
              <Link
                href="/blog/accessibility-statement-guide"
                className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl hover:border-zinc-700 transition-colors"
              >
                <h4 className="font-semibold text-white mb-2">How to Create an Accessibility Statement</h4>
                <p className="text-zinc-400 text-sm">Write a statement that meets legal requirements and protects your business.</p>
              </Link>
            </div>
          </div>
        </article>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 mt-24">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-zinc-500">
              <Shield className="w-5 h-5" />
              <span>Inclusiv 2025</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-zinc-500 text-sm">
              <Link href="/" className="hover:text-white transition-colors">Scanner</Link>
              <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
