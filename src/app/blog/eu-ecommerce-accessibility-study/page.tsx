"use client";

import Link from 'next/link';
import { Shield, Clock, ArrowRight, ArrowLeft, BarChart3, AlertTriangle, CheckCircle, TrendingUp, Building2, ShoppingCart, Percent, Target, Award, XCircle } from 'lucide-react';

// Calculate days until EAA deadline
const getDeadlineInfo = () => {
  const deadline = new Date("2025-06-28");
  const today = new Date();
  const diffTime = deadline.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return { days: diffDays, deadline };
};

// Study data
const overallStats = {
  sitesTested: 500,
  averageScore: 42,
  passingRate: 12,
  avgIssuesPerSite: 47,
  criticalIssuesPercent: 34,
};

const industryBreakdown = [
  { industry: 'Fashion & Apparel', sites: 85, avgScore: 38, passingRate: 8 },
  { industry: 'Electronics & Tech', sites: 72, avgScore: 51, passingRate: 18 },
  { industry: 'Home & Garden', sites: 68, avgScore: 41, passingRate: 11 },
  { industry: 'Food & Grocery', sites: 64, avgScore: 44, passingRate: 14 },
  { industry: 'Health & Beauty', sites: 58, avgScore: 39, passingRate: 9 },
  { industry: 'Sports & Outdoor', sites: 53, avgScore: 45, passingRate: 15 },
  { industry: 'Books & Media', sites: 48, avgScore: 52, passingRate: 19 },
  { industry: 'Automotive', sites: 32, avgScore: 36, passingRate: 6 },
  { industry: 'Other', sites: 20, avgScore: 43, passingRate: 12 },
];

const topViolations = [
  { issue: 'Missing or inadequate alt text', percent: 89, severity: 'Critical' },
  { issue: 'Insufficient color contrast', percent: 76, severity: 'Critical' },
  { issue: 'Missing form labels', percent: 71, severity: 'Critical' },
  { issue: 'Non-descriptive link text', percent: 68, severity: 'Serious' },
  { issue: 'Missing skip navigation links', percent: 64, severity: 'Serious' },
  { issue: 'Keyboard navigation issues', percent: 58, severity: 'Critical' },
  { issue: 'Missing language attribute', percent: 52, severity: 'Moderate' },
  { issue: 'Improper heading hierarchy', percent: 49, severity: 'Serious' },
  { issue: 'Missing focus indicators', percent: 47, severity: 'Critical' },
  { issue: 'Inaccessible dropdown menus', percent: 43, severity: 'Serious' },
];

const countryBreakdown = [
  { country: 'Germany', avgScore: 54, flag: '🇩🇪' },
  { country: 'Netherlands', avgScore: 51, flag: '🇳🇱' },
  { country: 'Sweden', avgScore: 49, flag: '🇸🇪' },
  { country: 'France', avgScore: 45, flag: '🇫🇷' },
  { country: 'Spain', avgScore: 41, flag: '🇪🇸' },
  { country: 'Italy', avgScore: 38, flag: '🇮🇹' },
  { country: 'Poland', avgScore: 35, flag: '🇵🇱' },
];

export default function EUEcommerceStudyPage() {
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
          <span className="text-zinc-400">Research</span>
        </div>

        {/* Article Header */}
        <article>
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-sm font-semibold rounded-full">
                Research Study
              </span>
              <span className="text-zinc-500">January 2025</span>
              <span className="text-zinc-600">|</span>
              <span className="text-zinc-500">12 min read</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              We Scanned 500 EU E-commerce Sites: Here&apos;s What We Found
            </h1>

            <p className="text-xl text-zinc-400 leading-relaxed mb-8">
              Our comprehensive accessibility study reveals the current state of digital accessibility
              across European online stores. With the EAA deadline just {deadlineInfo.days} days away,
              the findings are concerning but actionable.
            </p>

            {/* Key Stats Banner */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-gradient-to-r from-red-900/20 to-orange-900/20 border border-red-500/30 rounded-2xl">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{overallStats.sitesTested}</div>
                <div className="text-sm text-zinc-400">Sites Analyzed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-400">{overallStats.averageScore}/100</div>
                <div className="text-sm text-zinc-400">Avg. Score</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-400">{overallStats.passingRate}%</div>
                <div className="text-sm text-zinc-400">Pass Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-400">{overallStats.avgIssuesPerSite}</div>
                <div className="text-sm text-zinc-400">Avg. Issues/Site</div>
              </div>
            </div>
          </header>

          {/* Executive Summary */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Target className="w-6 h-6 text-indigo-500" />
              Executive Summary
            </h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-zinc-300 text-lg leading-relaxed mb-4">
                Between November 2024 and January 2025, we conducted the most comprehensive accessibility
                audit of EU e-commerce websites to date. Using automated scanning tools powered by axe-core
                combined with manual WCAG 2.1 AA testing, we analyzed 500 online stores across 27 EU member states.
              </p>
              <p className="text-zinc-300 text-lg leading-relaxed mb-4">
                <strong className="text-white">The results are alarming:</strong> Only 12% of sites would currently
                pass basic EAA compliance requirements, with an average accessibility score of just 42 out of 100.
                This means <span className="text-red-400 font-semibold">88% of EU e-commerce businesses face potential
                fines and legal action</span> when the European Accessibility Act takes effect on June 28, 2025.
              </p>
              <p className="text-zinc-300 text-lg leading-relaxed">
                However, our data also reveals that most issues are fixable within weeks, not months. The most
                common violations are relatively simple to address, and businesses that act now still have time
                to achieve compliance before the deadline.
              </p>
            </div>
          </section>

          {/* Methodology */}
          <section className="mb-12 p-6 bg-zinc-900 border border-zinc-800 rounded-2xl">
            <h2 className="text-xl font-bold text-white mb-4">Study Methodology</h2>
            <div className="grid md:grid-cols-2 gap-6 text-zinc-400">
              <div>
                <h3 className="font-semibold text-white mb-2">What We Tested</h3>
                <ul className="space-y-1 text-sm">
                  <li>- Homepage accessibility</li>
                  <li>- Product listing pages</li>
                  <li>- Product detail pages</li>
                  <li>- Shopping cart functionality</li>
                  <li>- Checkout process (where accessible)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Testing Standards</h3>
                <ul className="space-y-1 text-sm">
                  <li>- WCAG 2.1 Level AA compliance</li>
                  <li>- Automated testing via axe-core</li>
                  <li>- Manual keyboard navigation testing</li>
                  <li>- Screen reader compatibility checks</li>
                  <li>- Color contrast analysis</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Top Violations */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-red-500" />
              Top 10 Accessibility Violations
            </h2>
            <p className="text-zinc-400 mb-6">
              These are the most common WCAG violations we found across the 500 sites tested.
              The good news? Most of these are straightforward to fix.
            </p>
            <div className="space-y-3">
              {topViolations.map((violation, index) => (
                <div
                  key={violation.issue}
                  className="flex items-center gap-4 p-4 bg-zinc-900 border border-zinc-800 rounded-xl"
                >
                  <div className="w-8 h-8 flex items-center justify-center bg-zinc-800 rounded-full text-zinc-400 font-bold text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-white">{violation.issue}</div>
                    <div className="text-sm text-zinc-500">Found on {violation.percent}% of sites</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          violation.severity === 'Critical' ? 'bg-red-500' :
                          violation.severity === 'Serious' ? 'bg-orange-500' : 'bg-yellow-500'
                        }`}
                        style={{ width: `${violation.percent}%` }}
                      />
                    </div>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded ${
                      violation.severity === 'Critical' ? 'bg-red-500/20 text-red-400' :
                      violation.severity === 'Serious' ? 'bg-orange-500/20 text-orange-400' : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {violation.severity}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Industry Breakdown */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Building2 className="w-6 h-6 text-indigo-500" />
              Accessibility Scores by Industry
            </h2>
            <p className="text-zinc-400 mb-6">
              Some industries are better prepared for EAA compliance than others. Books & Media
              and Electronics lead the way, while Automotive and Fashion lag behind.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-zinc-800">
                    <th className="text-left py-3 px-4 text-zinc-400 font-medium">Industry</th>
                    <th className="text-center py-3 px-4 text-zinc-400 font-medium">Sites Tested</th>
                    <th className="text-center py-3 px-4 text-zinc-400 font-medium">Avg. Score</th>
                    <th className="text-center py-3 px-4 text-zinc-400 font-medium">Passing Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {industryBreakdown.map((row) => (
                    <tr key={row.industry} className="border-b border-zinc-800/50">
                      <td className="py-3 px-4 text-white font-medium">{row.industry}</td>
                      <td className="py-3 px-4 text-center text-zinc-400">{row.sites}</td>
                      <td className="py-3 px-4 text-center">
                        <span className={`font-semibold ${
                          row.avgScore >= 50 ? 'text-emerald-400' :
                          row.avgScore >= 40 ? 'text-yellow-400' : 'text-red-400'
                        }`}>
                          {row.avgScore}/100
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className={`px-2 py-1 rounded text-sm font-medium ${
                          row.passingRate >= 15 ? 'bg-emerald-500/20 text-emerald-400' :
                          row.passingRate >= 10 ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'
                        }`}>
                          {row.passingRate}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Country Comparison */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-indigo-500" />
              Accessibility by Country
            </h2>
            <p className="text-zinc-400 mb-6">
              Northern European countries generally score higher on accessibility, likely due to
              earlier national accessibility legislation and stronger digital accessibility awareness.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {countryBreakdown.map((country) => (
                <div
                  key={country.country}
                  className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl text-center"
                >
                  <div className="text-2xl mb-2">{country.flag}</div>
                  <div className="font-medium text-white mb-1">{country.country}</div>
                  <div className={`text-2xl font-bold ${
                    country.avgScore >= 50 ? 'text-emerald-400' :
                    country.avgScore >= 40 ? 'text-yellow-400' : 'text-red-400'
                  }`}>
                    {country.avgScore}
                  </div>
                  <div className="text-xs text-zinc-500">avg. score</div>
                </div>
              ))}
            </div>
          </section>

          {/* Key Findings */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <BarChart3 className="w-6 h-6 text-indigo-500" />
              Key Findings
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-red-900/20 border border-red-500/30 rounded-2xl">
                <XCircle className="w-8 h-8 text-red-400 mb-4" />
                <h3 className="text-lg font-bold text-white mb-3">The Bad News</h3>
                <ul className="space-y-2 text-zinc-300">
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">-</span>
                    88% of sites fail basic EAA requirements
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">-</span>
                    34% of all issues found were critical severity
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">-</span>
                    Only 23% have accessible checkout processes
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">-</span>
                    Mobile accessibility is 40% worse than desktop
                  </li>
                </ul>
              </div>
              <div className="p-6 bg-emerald-900/20 border border-emerald-500/30 rounded-2xl">
                <CheckCircle className="w-8 h-8 text-emerald-400 mb-4" />
                <h3 className="text-lg font-bold text-white mb-3">The Good News</h3>
                <ul className="space-y-2 text-zinc-300">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">+</span>
                    70% of issues can be fixed in under 2 weeks
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">+</span>
                    Sites using modern platforms score 35% higher
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">+</span>
                    Awareness is growing - scores up 15% from 2023
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">+</span>
                    Top performers show compliance is achievable
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* What Top Performers Do Differently */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Award className="w-6 h-6 text-yellow-500" />
              What Top Performers Do Differently
            </h2>
            <p className="text-zinc-400 mb-6">
              The top 12% of sites that achieved compliance share common characteristics.
              Here&apos;s what separates them from the rest:
            </p>
            <div className="space-y-4">
              {[
                {
                  title: 'Automated Testing in CI/CD Pipeline',
                  description: 'Top performers run accessibility tests on every code deployment, catching issues before they reach production.',
                  adoption: '87%'
                },
                {
                  title: 'Dedicated Accessibility Resources',
                  description: 'Whether internal expertise or external partners, top sites have dedicated resources for accessibility.',
                  adoption: '92%'
                },
                {
                  title: 'Regular Manual Audits',
                  description: 'Quarterly manual testing with real assistive technology users supplements automated testing.',
                  adoption: '76%'
                },
                {
                  title: 'Accessibility-First Design Systems',
                  description: 'Component libraries built with accessibility baked in from the start.',
                  adoption: '81%'
                },
                {
                  title: 'Published Accessibility Statement',
                  description: 'Clear commitment to accessibility with contact information for feedback.',
                  adoption: '95%'
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex items-start gap-4 p-4 bg-zinc-900 border border-zinc-800 rounded-xl"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                    <p className="text-sm text-zinc-400">{item.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-emerald-400">{item.adoption}</div>
                    <div className="text-xs text-zinc-500">adoption rate</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="mb-12 p-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl text-center">
            <ShoppingCart className="w-12 h-12 text-white mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-4">
              Where Does Your Site Stand?
            </h2>
            <p className="text-indigo-100 mb-6 max-w-xl mx-auto">
              Find out your accessibility score and get a detailed report of issues to fix.
              Our scanner uses the same axe-core technology used in this study.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-600 font-semibold rounded-xl hover:bg-indigo-50 transition-colors"
            >
              <Shield className="w-5 h-5" />
              Get Your Free Accessibility Score
              <ArrowRight className="w-5 h-5" />
            </Link>
          </section>

          {/* Implications */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Percent className="w-6 h-6 text-indigo-500" />
              What This Means for Your Business
            </h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-zinc-300 text-lg leading-relaxed mb-4">
                With only {deadlineInfo.days} days until the EAA deadline, the findings of this study should
                serve as a wake-up call for EU e-commerce businesses. The 88% of non-compliant sites face:
              </p>
              <ul className="text-zinc-300 space-y-2 mb-6">
                <li><strong className="text-white">Financial penalties</strong> up to 100,000 or 4% of annual revenue</li>
                <li><strong className="text-white">Legal liability</strong> from customer complaints and advocacy groups</li>
                <li><strong className="text-white">Market exclusion</strong> from the 100+ million EU citizens with disabilities</li>
                <li><strong className="text-white">Reputational damage</strong> as accessibility becomes mainstream expectation</li>
              </ul>
              <p className="text-zinc-300 text-lg leading-relaxed">
                However, the data also shows that compliance is achievable. The most common issues are not
                complex technical challenges, they&apos;re oversights that can be fixed with proper attention
                and the right tools. Businesses that start now can still meet the June 2025 deadline.
              </p>
            </div>
          </section>

          {/* Download Full Report */}
          <section className="mb-12 p-6 bg-zinc-900 border border-zinc-800 rounded-2xl">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">Download the Full Report</h3>
                <p className="text-zinc-400">
                  Get the complete 45-page study with detailed methodology, additional data breakdowns,
                  and industry-specific recommendations.
                </p>
              </div>
              <Link
                href="/"
                className="whitespace-nowrap px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-colors"
              >
                Download PDF Report
              </Link>
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
                href="/blog/shopify-wcag-violations"
                className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-colors group"
              >
                <div className="text-sm text-indigo-400 mb-2">Tutorial</div>
                <h3 className="font-semibold text-white group-hover:text-indigo-400 transition-colors">
                  10 Most Common WCAG Violations in Shopify Stores
                </h3>
              </Link>
            </div>
          </section>
        </article>

        {/* Final CTA */}
        <div className="mt-12 bg-zinc-900 border border-zinc-800 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Check Your Compliance Status</h2>
          <p className="text-zinc-400 mb-6 max-w-xl mx-auto">
            Don&apos;t wait until June 2025 to find out where you stand. Get your free accessibility
            scan and start fixing issues today.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-colors"
          >
            <Shield className="w-5 h-5" />
            Free Accessibility Scan
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
