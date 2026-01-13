"use client";

import Link from 'next/link';
import { Shield, Clock, ArrowRight, ArrowLeft, Scale, Globe, AlertTriangle, CheckCircle, FileText, Building2, Users, DollarSign, Calendar, MapPin } from 'lucide-react';

// Calculate days until EAA deadline
const getDeadlineInfo = () => {
  const deadline = new Date("2025-06-28");
  const today = new Date();
  const diffTime = deadline.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return { days: diffDays, deadline };
};

// Comparison data
const comparisonTable = [
  {
    aspect: 'Geographic Scope',
    eaa: 'All 27 EU member states + EEA countries',
    ada: 'United States only',
  },
  {
    aspect: 'Effective Date',
    eaa: 'June 28, 2025',
    ada: 'In effect since 1990 (digital since ~2010)',
  },
  {
    aspect: 'Technical Standard',
    eaa: 'EN 301 549 (harmonized with WCAG 2.1 AA)',
    ada: 'WCAG 2.1 AA (de facto standard)',
  },
  {
    aspect: 'Enforcement Model',
    eaa: 'Regulatory + private complaints',
    ada: 'Litigation-driven (lawsuits)',
  },
  {
    aspect: 'Who Must Comply',
    eaa: 'Private sector selling to EU consumers',
    ada: 'Businesses open to public',
  },
  {
    aspect: 'Business Size Exemption',
    eaa: 'Microenterprises (<10 employees, <€2M revenue)',
    ada: 'Generally applies to all public accommodations',
  },
  {
    aspect: 'Maximum Penalties',
    eaa: 'Up to €100,000 or % of revenue (varies by member state)',
    ada: 'Up to $75,000 (first offense), $150,000 (subsequent)',
  },
  {
    aspect: 'Accessibility Statement',
    eaa: 'Mandatory',
    ada: 'Recommended but not required',
  },
  {
    aspect: 'Compliance Monitoring',
    eaa: 'Market surveillance authorities',
    ada: 'DOJ + private litigation',
  },
  {
    aspect: 'Transition Period',
    eaa: 'Products before June 2025 have until 2030',
    ada: 'Immediate compliance expected',
  },
];

const keyDifferences = [
  {
    title: 'Regulatory vs. Litigation Model',
    icon: Scale,
    eaa: 'The EAA follows a regulatory approach with designated market surveillance authorities in each member state who can inspect businesses, issue warnings, and impose fines.',
    ada: 'The ADA is primarily enforced through private lawsuits. Anyone who encounters an accessibility barrier can sue, leading to a wave of "drive-by" accessibility lawsuits.',
    implication: 'For EU businesses, this means proactive compliance monitoring but more predictable enforcement. For US businesses, the threat of lawsuits creates urgency but also unpredictability.',
  },
  {
    title: 'Scope of Application',
    icon: Globe,
    eaa: 'The EAA applies specifically to products and services including e-commerce, banking, transport, and telecommunications. It explicitly covers websites and mobile apps used for commercial purposes.',
    ada: 'The ADA applies to "places of public accommodation" which courts have increasingly interpreted to include websites. However, the lack of explicit digital regulations creates legal uncertainty.',
    implication: 'The EAA provides clearer guidance on what constitutes an accessible digital product, while ADA compliance standards are largely defined through court decisions.',
  },
  {
    title: 'Technical Requirements',
    icon: FileText,
    eaa: 'References EN 301 549, the EU accessibility standard that incorporates WCAG 2.1 Level AA with additional requirements for software, hardware, and documentation.',
    ada: 'No official technical standard, but WCAG 2.1 Level AA has emerged as the de facto requirement through DOJ settlements and court decisions.',
    implication: 'Both effectively require WCAG 2.1 AA compliance, but the EAA provides a more formal technical framework.',
  },
  {
    title: 'Small Business Treatment',
    icon: Building2,
    eaa: 'Microenterprises (under 10 employees and under €2 million annual revenue) are exempt from the EAA\'s requirements.',
    ada: 'No general small business exemption. Most businesses open to the public must comply, regardless of size.',
    implication: 'Small EU businesses may be exempt, while similar US businesses remain liable for ADA compliance.',
  },
];

const bothRequire = [
  'WCAG 2.1 Level AA compliance as the baseline',
  'Accessible checkout and payment processes',
  'Screen reader compatible content',
  'Keyboard navigation functionality',
  'Sufficient color contrast ratios',
  'Text alternatives for images',
  'Accessible forms with proper labels',
  'Consistent navigation patterns',
];

const globalStrategy = [
  {
    step: 1,
    title: 'Adopt WCAG 2.1 AA as Your Global Standard',
    description: 'Since both laws align with WCAG 2.1 AA, making this your baseline standard ensures compliance across jurisdictions.',
  },
  {
    step: 2,
    title: 'Implement Automated Testing',
    description: 'Use tools like axe-core (which powers our scanner) to catch accessibility issues during development, not after deployment.',
  },
  {
    step: 3,
    title: 'Publish an Accessibility Statement',
    description: 'Required by the EAA and recommended for ADA. Include your commitment, standards followed, and contact information.',
  },
  {
    step: 4,
    title: 'Establish a Feedback Mechanism',
    description: 'Both laws value user feedback. Create clear channels for users to report accessibility issues.',
  },
  {
    step: 5,
    title: 'Document Your Efforts',
    description: 'Keep records of audits, remediation efforts, and training. This demonstrates good faith in both regulatory and litigation contexts.',
  },
  {
    step: 6,
    title: 'Regular Monitoring',
    description: 'Accessibility is ongoing. Schedule regular audits and include accessibility checks in your development workflow.',
  },
];

export default function EAAvsADAPage() {
  const deadlineInfo = getDeadlineInfo();

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="border-b border-zinc-800">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-indigo-500" />
            <span className="text-xl font-bold text-white">Inclusiv</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/blog" className="text-zinc-400 hover:text-white transition-colors text-sm font-medium">
              Blog
            </Link>
            <div className="flex items-center gap-2 px-3 py-1 bg-red-500/10 rounded-full text-sm text-red-400">
              <Clock className="w-4 h-4" />
              <span className="font-semibold">{deadlineInfo.days} days until EAA deadline</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-zinc-500 mb-8">
          <Link href="/blog" className="hover:text-white transition-colors flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
          <span>/</span>
          <span className="text-zinc-400">Legal</span>
        </div>

        {/* Article Header */}
        <article>
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-sm font-semibold rounded-full">
                Legal Guide
              </span>
              <span className="text-zinc-500">January 2025</span>
              <span className="text-zinc-600">|</span>
              <span className="text-zinc-500">11 min read</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              EAA vs ADA: Understanding Accessibility Laws for Global E-commerce
            </h1>

            <p className="text-xl text-zinc-400 leading-relaxed mb-8">
              A comprehensive comparison of the European Accessibility Act and Americans with
              Disabilities Act for online businesses. Learn how to navigate both regulations
              for your international e-commerce operations.
            </p>

            {/* Visual Comparison */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-blue-900/20 border border-blue-500/30 rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-3xl">🇪🇺</div>
                  <div>
                    <h3 className="font-bold text-white">European Accessibility Act (EAA)</h3>
                    <p className="text-sm text-zinc-400">EU Directive 2019/882</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-blue-300">
                    <Calendar className="w-4 h-4" />
                    Effective: June 28, 2025
                  </div>
                  <div className="flex items-center gap-2 text-blue-300">
                    <MapPin className="w-4 h-4" />
                    Scope: 27 EU Member States
                  </div>
                  <div className="flex items-center gap-2 text-blue-300">
                    <Users className="w-4 h-4" />
                    100M+ potential customers
                  </div>
                </div>
              </div>
              <div className="p-6 bg-red-900/20 border border-red-500/30 rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-3xl">🇺🇸</div>
                  <div>
                    <h3 className="font-bold text-white">Americans with Disabilities Act (ADA)</h3>
                    <p className="text-sm text-zinc-400">Title III - Public Accommodations</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-red-300">
                    <Calendar className="w-4 h-4" />
                    Effective: Since 1990 (digital evolving)
                  </div>
                  <div className="flex items-center gap-2 text-red-300">
                    <MapPin className="w-4 h-4" />
                    Scope: United States
                  </div>
                  <div className="flex items-center gap-2 text-red-300">
                    <Users className="w-4 h-4" />
                    61M+ Americans with disabilities
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Introduction */}
          <section className="mb-12">
            <div className="prose prose-invert max-w-none">
              <p className="text-zinc-300 text-lg leading-relaxed mb-4">
                For businesses operating internationally, navigating accessibility laws can be challenging.
                The European Accessibility Act (EAA) and the Americans with Disabilities Act (ADA) are the
                two most significant accessibility regulations affecting e-commerce, but they differ in
                important ways.
              </p>
              <p className="text-zinc-300 text-lg leading-relaxed">
                This guide breaks down both laws, highlighting their similarities and differences, and
                provides a practical strategy for achieving compliance across both jurisdictions.
              </p>
            </div>
          </section>

          {/* Quick Overview Alert */}
          <section className="mb-12 p-6 bg-yellow-900/20 border border-yellow-500/30 rounded-2xl">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-white mb-2">Key Takeaway for Global Businesses</h3>
                <p className="text-zinc-300">
                  If your online store sells to both US and EU customers, you effectively need to comply
                  with both laws. The good news: both are based on WCAG 2.1 Level AA, so achieving one
                  gets you most of the way to the other. The main differences are in enforcement, documentation,
                  and reporting requirements.
                </p>
              </div>
            </div>
          </section>

          {/* Side by Side Comparison Table */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Scale className="w-6 h-6 text-indigo-500" />
              Side-by-Side Comparison
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="text-left py-3 px-4 bg-zinc-800 text-zinc-300 font-medium rounded-tl-lg">Aspect</th>
                    <th className="text-left py-3 px-4 bg-blue-900/30 text-blue-300 font-medium">EAA (EU)</th>
                    <th className="text-left py-3 px-4 bg-red-900/30 text-red-300 font-medium rounded-tr-lg">ADA (US)</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonTable.map((row, index) => (
                    <tr key={row.aspect} className={index % 2 === 0 ? 'bg-zinc-900/50' : ''}>
                      <td className="py-3 px-4 text-white font-medium border-b border-zinc-800">{row.aspect}</td>
                      <td className="py-3 px-4 text-zinc-300 border-b border-zinc-800">{row.eaa}</td>
                      <td className="py-3 px-4 text-zinc-300 border-b border-zinc-800">{row.ada}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Key Differences Deep Dive */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Globe className="w-6 h-6 text-indigo-500" />
              Key Differences Explained
            </h2>
            <div className="space-y-8">
              {keyDifferences.map((diff) => (
                <div key={diff.title} className="border border-zinc-800 rounded-2xl overflow-hidden">
                  <div className="p-4 bg-zinc-900 flex items-center gap-3">
                    <diff.icon className="w-6 h-6 text-indigo-400" />
                    <h3 className="text-lg font-bold text-white">{diff.title}</h3>
                  </div>
                  <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-zinc-800">
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xl">🇪🇺</span>
                        <span className="font-semibold text-blue-400">EAA Approach</span>
                      </div>
                      <p className="text-sm text-zinc-400">{diff.eaa}</p>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xl">🇺🇸</span>
                        <span className="font-semibold text-red-400">ADA Approach</span>
                      </div>
                      <p className="text-sm text-zinc-400">{diff.ada}</p>
                    </div>
                  </div>
                  <div className="p-4 bg-indigo-900/20 border-t border-zinc-800">
                    <p className="text-sm text-indigo-300">
                      <strong>Practical Implication:</strong> {diff.implication}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* What Both Laws Require */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-emerald-500" />
              What Both Laws Require
            </h2>
            <p className="text-zinc-400 mb-6">
              Despite their differences in enforcement and structure, both the EAA and ADA effectively
              require the same technical accessibility standards. If you meet these requirements,
              you&apos;ll be well-positioned for compliance in both jurisdictions:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {bothRequire.map((requirement) => (
                <div key={requirement} className="flex items-start gap-3 p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
                  <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="text-zinc-300">{requirement}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Penalties Comparison */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <DollarSign className="w-6 h-6 text-red-500" />
              Penalties and Enforcement
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-blue-900/20 border border-blue-500/30 rounded-2xl">
                <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                  <span className="text-xl">🇪🇺</span> EAA Penalties
                </h3>
                <ul className="space-y-3 text-zinc-300">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">-</span>
                    Fines up to €100,000 per violation (varies by member state)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">-</span>
                    Percentage of annual revenue in some countries
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">-</span>
                    Product withdrawal from market
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">-</span>
                    Public naming of non-compliant businesses
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">-</span>
                    Mandatory corrective actions
                  </li>
                </ul>
              </div>
              <div className="p-6 bg-red-900/20 border border-red-500/30 rounded-2xl">
                <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                  <span className="text-xl">🇺🇸</span> ADA Penalties
                </h3>
                <ul className="space-y-3 text-zinc-300">
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">-</span>
                    $75,000 for first violation
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">-</span>
                    $150,000 for subsequent violations
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">-</span>
                    Legal fees (often $10,000-$50,000+)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">-</span>
                    Settlement costs (average $25,000-$50,000)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">-</span>
                    Injunctive relief requiring immediate changes
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-6 p-4 bg-yellow-900/20 border border-yellow-500/30 rounded-xl">
              <p className="text-sm text-yellow-300">
                <strong>Note on ADA Litigation:</strong> In 2023, over 4,500 web accessibility lawsuits
                were filed in the US. The average cost to defend an ADA lawsuit is $25,000+, even if
                you win. Most businesses settle to avoid litigation costs.
              </p>
            </div>
          </section>

          {/* Global Compliance Strategy */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Globe className="w-6 h-6 text-indigo-500" />
              Global Compliance Strategy
            </h2>
            <p className="text-zinc-400 mb-6">
              For businesses selling to both EU and US customers, here&apos;s a practical approach
              to achieving compliance with both regulations:
            </p>
            <div className="space-y-4">
              {globalStrategy.map((step) => (
                <div key={step.step} className="flex items-start gap-4 p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
                  <div className="w-10 h-10 flex items-center justify-center bg-indigo-600 rounded-full text-white font-bold flex-shrink-0">
                    {step.step}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">{step.title}</h3>
                    <p className="text-sm text-zinc-400">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="mb-12 p-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl text-center">
            <Shield className="w-12 h-12 text-white mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-4">
              Check Your Global Compliance Status
            </h2>
            <p className="text-indigo-100 mb-6 max-w-xl mx-auto">
              Our scanner tests against WCAG 2.1 AA standards required by both the EAA and ADA.
              Get one report that covers both jurisdictions.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-600 font-semibold rounded-xl hover:bg-indigo-50 transition-colors"
            >
              Free Accessibility Scan
              <ArrowRight className="w-5 h-5" />
            </Link>
          </section>

          {/* FAQ Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                {
                  q: 'If I\'m compliant with one law, am I automatically compliant with the other?',
                  a: 'Mostly yes for technical requirements, since both reference WCAG 2.1 AA. However, the EAA has additional requirements like mandatory accessibility statements and specific documentation that the ADA doesn\'t explicitly require.',
                },
                {
                  q: 'I\'m a US company. Do I need to worry about the EAA?',
                  a: 'If you sell products or services to EU consumers, yes. The EAA applies to businesses serving EU customers, regardless of where the business is located. This includes any e-commerce site accessible to EU shoppers.',
                },
                {
                  q: 'I\'m an EU company. Do I need to worry about the ADA?',
                  a: 'If US customers can purchase from your website, you could potentially face ADA litigation. While enforcement is more challenging for non-US businesses, it\'s not impossible. Following WCAG 2.1 AA protects you in both markets.',
                },
                {
                  q: 'Which law has stricter penalties?',
                  a: 'It depends. The EAA can impose higher direct fines (up to €100,000+), but the ADA\'s litigation model means you face not just penalties but also legal fees, settlement costs, and the cost of immediate remediation under court order.',
                },
                {
                  q: 'Is there a grace period for either law?',
                  a: 'The EAA has a transition period—products already on the market before June 2025 have until 2030 to comply. The ADA has no official grace period; compliance is expected immediately, though courts may consider good-faith efforts at remediation.',
                },
              ].map((faq) => (
                <div key={faq.q} className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
                  <h3 className="font-semibold text-white mb-2">{faq.q}</h3>
                  <p className="text-sm text-zinc-400">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Related Articles */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-white mb-6">Related Articles</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Link
                href="/blog/eaa-compliance-guide-2025"
                className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-colors group"
              >
                <div className="text-sm text-indigo-400 mb-2">Compliance Guide</div>
                <h3 className="font-semibold text-white group-hover:text-indigo-400 transition-colors">
                  The Complete Guide to EAA Compliance for E-commerce in 2025
                </h3>
              </Link>
              <Link
                href="/blog/accessibility-statement-guide"
                className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-colors group"
              >
                <div className="text-sm text-indigo-400 mb-2">Legal</div>
                <h3 className="font-semibold text-white group-hover:text-indigo-400 transition-colors">
                  How to Create an Accessibility Statement That Actually Protects Your Business
                </h3>
              </Link>
            </div>
          </section>
        </article>

        {/* Final CTA */}
        <div className="mt-12 bg-zinc-900 border border-zinc-800 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to Achieve Global Compliance?</h2>
          <p className="text-zinc-400 mb-6 max-w-xl mx-auto">
            Start with a free scan to understand your current accessibility status.
            Our report identifies issues against WCAG 2.1 AA, the standard for both EAA and ADA.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-colors"
          >
            <Shield className="w-5 h-5" />
            Get Your Free Scan
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 mt-24">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-zinc-500">
              <Shield className="w-5 h-5" />
              <span>Inclusiv © 2025</span>
              <span className="text-zinc-600">|</span>
              <span>Powered by axe-core</span>
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
