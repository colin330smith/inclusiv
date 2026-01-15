import type { Metadata } from "next";
import { Shield, Zap, Award, FileCheck, Lock, ArrowRight, Globe, AlertTriangle } from "lucide-react";
import Link from "next/link";
import PricingTracker from "./PricingTracker";
import PricingCards from "./PricingCards";
import { SiteFooter } from "@/components/seo/SiteFooter";
import LaunchDiscountBanner from "@/components/LaunchDiscountBanner";
import FineCalculator from "@/components/FineCalculator";

export const metadata: Metadata = {
  title: "Pricing | Inclusiv - WCAG Accessibility Compliance",
  description: "Choose your accessibility compliance plan. From free single-page scans to enterprise solutions. WCAG 2.1 AA compliant for EAA, ADA, and global accessibility standards.",
  keywords: ["accessibility pricing", "WCAG compliance cost", "EAA compliance pricing", "ADA compliance pricing", "web accessibility plans", "accessibility audit pricing"],
  openGraph: {
    title: "Pricing | Inclusiv - WCAG Compliance Plans",
    description: "Get WCAG 2.1 AA compliant. Plans starting from free. Works for EAA (EU) and ADA (US) requirements.",
    type: "website",
  },
};

const faqs = [
  {
    question: "What accessibility laws does WCAG compliance cover?",
    answer: "WCAG 2.1 AA is the global standard for web accessibility. It satisfies the requirements of the European Accessibility Act (EAA) in the EU, the Americans with Disabilities Act (ADA) in the US, and accessibility laws in Canada, UK, Australia, and most other countries. One standard covers you globally.",
  },
  {
    question: "What is the European Accessibility Act (EAA)?",
    answer: "The EAA is EU legislation requiring digital products and services to be accessible. It applies to websites, mobile apps, e-commerce, banking, and more. The compliance deadline is June 28, 2025. It requires WCAG 2.1 Level AA compliance.",
  },
  {
    question: "What about ADA compliance in the United States?",
    answer: "The Americans with Disabilities Act (ADA) requires businesses to make their websites accessible to people with disabilities. Courts have consistently ruled that WCAG 2.1 AA is the standard for ADA web accessibility compliance. Unlike the EAA, ADA enforcement is ongoing through lawsuits.",
  },
  {
    question: "Does your service work for both US and EU businesses?",
    answer: "Yes. Our scans check against WCAG 2.1 AA criteria, which is the standard required by both the EAA (Europe) and ADA (United States). Whether you're preparing for the EAA deadline or protecting against ADA lawsuits, the same compliance work applies.",
  },
  {
    question: "What WCAG level do I need?",
    answer: "WCAG 2.1 Level AA is required by both the EAA and ADA. Inclusiv scans for all Level A and AA success criteria, giving you a complete picture of your compliance status.",
  },
  {
    question: "How quickly can I become compliant?",
    answer: "Most websites can achieve compliance within 2-4 weeks using our AI-powered fixes. The Professional plan includes 1-click remediation that generates exact code changes for your platform (WordPress, Shopify, React, etc.).",
  },
  {
    question: "What's included in the compliance certificate?",
    answer: "Our compliance certificate documents your WCAG 2.1 AA conformance, includes a detailed accessibility statement, and provides documentation for regulators or legal proceedings. It's updated automatically with each scan.",
  },
  {
    question: "Can I cancel anytime?",
    answer: "Yes, all plans are month-to-month with no long-term commitment. You can cancel anytime from your dashboard. We also offer a 30-day money-back guarantee on all paid plans.",
  },
  {
    question: "What's the difference between monthly and annual billing?",
    answer: "Annual billing saves you 20% - that's 2 months free compared to monthly billing. Monthly plans include a 14-day free trial, while annual plans are billed upfront for the full year. Both give you full access to all plan features. You can switch from monthly to annual at any time to lock in savings.",
  },
  {
    question: "Do you offer discounts for non-profits?",
    answer: "Yes! Non-profits and educational institutions receive 50% off all paid plans. Contact us with proof of non-profit status to get your discount code.",
  },
  {
    question: "What happens if I exceed my page limit?",
    answer: "We'll notify you before you hit your limit. You can upgrade your plan anytime, or we'll continue scanning your most important pages. We never charge overage fees.",
  },
];

const comparisonFeatures = [
  { name: "Pages scanned", free: "1", starter: "100", professional: "Unlimited", enterprise: "Unlimited" },
  { name: "Scan frequency", free: "Manual", starter: "Weekly", professional: "Daily", enterprise: "Real-time" },
  { name: "Issue detection", free: "Basic", starter: "Full", professional: "Full + AI insights", enterprise: "Full + AI insights" },
  { name: "Fix suggestions", free: "Generic", starter: "Platform-specific", professional: "AI-generated code", enterprise: "AI-generated code" },
  { name: "Team members", free: "1", starter: "3", professional: "10", enterprise: "Unlimited" },
  { name: "Support", free: "Email", starter: "Email", professional: "Priority email", enterprise: "Dedicated manager" },
  { name: "Compliance certificate", free: "-", starter: "-", professional: "Included", enterprise: "Custom branded" },
  { name: "API access", free: "-", starter: "-", professional: "Read-only", enterprise: "Full access" },
  { name: "SLA", free: "-", starter: "-", professional: "-", enterprise: "99.9% uptime" },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Analytics Tracker */}
      <PricingTracker />

      {/* Launch Discount Banner */}
      <LaunchDiscountBanner />

      {/* Header */}
      <header className="border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-indigo-500" />
            <span className="text-xl font-bold text-white">Inclusiv</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-zinc-400 hover:text-white transition-colors">
              Scanner
            </Link>
            <div className="flex items-center gap-2 px-3 py-1 bg-indigo-500/10 rounded-full text-sm text-indigo-400">
              <Globe className="w-4 h-4" />
              <span className="font-medium">WCAG 2.1 AA Compliant</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-16">
        {/* Urgency Banner */}
        <div className="mb-8 p-4 bg-gradient-to-r from-red-500/10 via-orange-500/10 to-red-500/10 border border-red-500/20 rounded-2xl">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-center">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0" />
              <span className="font-semibold text-red-400">EAA Deadline: June 28, 2025</span>
            </div>
            <span className="hidden sm:inline text-zinc-600">|</span>
            <span className="text-zinc-400 text-sm sm:text-base">Non-compliant sites face fines up to €100,000</span>
          </div>
        </div>

        {/* Info Banner */}
        <div className="mb-12 p-4 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-indigo-500/10 border border-indigo-500/20 rounded-2xl">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-center">
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-indigo-400 flex-shrink-0" />
              <span className="font-semibold text-indigo-400">Works Globally</span>
            </div>
            <span className="hidden sm:inline text-zinc-600">|</span>
            <span className="text-zinc-400 text-sm sm:text-base">WCAG compliance meets EAA (Europe), ADA (US), and international standards</span>
          </div>
        </div>

        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Simple, transparent <span className="gradient-text">pricing</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            WCAG 2.1 AA compliance for businesses of all sizes. Start free, upgrade when you need more power.
          </p>
        </div>

        {/* Pricing Cards with Billing Toggle */}
        <div className="mb-20">
          <PricingCards />
        </div>

        {/* Money-back Guarantee */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-green-500/10 border border-green-500/30 rounded-full">
            <Lock className="w-5 h-5 text-green-500" />
            <span className="text-green-400 font-medium">30-Day Money-Back Guarantee</span>
            <span className="text-zinc-400">- No questions asked</span>
          </div>
        </div>

        {/* Social Proof / Testimonials */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            Trusted by teams preparing for EAA
          </h2>
          <p className="text-zinc-400 text-center mb-10">
            See what others are saying about their accessibility journey
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-zinc-300 mb-4 leading-relaxed">
                &quot;The scan found 47 accessibility issues we had no idea about. The AI-powered fix suggestions saved us weeks of work. We&apos;re now fully EAA compliant.&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  MK
                </div>
                <div>
                  <p className="text-white font-medium">Marcus K.</p>
                  <p className="text-zinc-500 text-sm">E-commerce Director, Berlin</p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-zinc-300 mb-4 leading-relaxed">
                &quot;As a developer, I love that it gives me exact code snippets to fix each issue. No guessing, no hours of research. Just copy, paste, and move on.&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  SR
                </div>
                <div>
                  <p className="text-white font-medium">Sophie R.</p>
                  <p className="text-zinc-500 text-sm">Lead Developer, Amsterdam</p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-zinc-300 mb-4 leading-relaxed">
                &quot;We were worried about the EAA deadline. Inclusiv helped us identify issues and prioritize fixes. Got our compliance certificate in 3 weeks.&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  JL
                </div>
                <div>
                  <p className="text-white font-medium">Johan L.</p>
                  <p className="text-zinc-500 text-sm">CTO, Stockholm</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fine Risk Calculator */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            What&apos;s Your Risk?
          </h2>
          <p className="text-zinc-400 text-center mb-10 max-w-2xl mx-auto">
            Calculate your potential EAA fine exposure and see how compliance compares
          </p>
          <div className="max-w-xl mx-auto">
            <FineCalculator />
          </div>
        </div>

        {/* Feature Comparison Table */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white text-center mb-10">
            Compare Plans
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="text-left py-4 px-4 text-zinc-400 font-medium">Feature</th>
                  <th className="text-center py-4 px-4 text-zinc-400 font-medium">Free</th>
                  <th className="text-center py-4 px-4 text-zinc-400 font-medium">Starter</th>
                  <th className="text-center py-4 px-4 text-indigo-400 font-medium bg-indigo-500/10">Professional</th>
                  <th className="text-center py-4 px-4 text-zinc-400 font-medium">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((feature, i) => (
                  <tr key={i} className="border-b border-zinc-800/50">
                    <td className="py-4 px-4 text-white">{feature.name}</td>
                    <td className="py-4 px-4 text-center text-zinc-400">{feature.free}</td>
                    <td className="py-4 px-4 text-center text-zinc-400">{feature.starter}</td>
                    <td className="py-4 px-4 text-center text-zinc-300 bg-indigo-500/5">{feature.professional}</td>
                    <td className="py-4 px-4 text-center text-zinc-400">{feature.enterprise}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          <div className="text-center p-6 bg-zinc-900 border border-zinc-800 rounded-2xl">
            <Zap className="w-10 h-10 text-indigo-500 mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-white mb-1">30 sec</h3>
            <p className="text-zinc-400">Average scan time</p>
          </div>
          <div className="text-center p-6 bg-zinc-900 border border-zinc-800 rounded-2xl">
            <FileCheck className="w-10 h-10 text-indigo-500 mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-white mb-1">100+</h3>
            <p className="text-zinc-400">WCAG criteria checked</p>
          </div>
          <div className="text-center p-6 bg-zinc-900 border border-zinc-800 rounded-2xl">
            <Award className="w-10 h-10 text-indigo-500 mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-white mb-1">WCAG 2.1</h3>
            <p className="text-zinc-400">Full AA coverage</p>
          </div>
        </div>

        {/* Compliance Coverage */}
        <div className="mb-20 p-8 bg-zinc-900 border border-zinc-800 rounded-2xl">
          <h2 className="text-2xl font-bold text-white text-center mb-6">
            One Standard, Global Compliance
          </h2>
          <p className="text-zinc-400 text-center mb-8 max-w-3xl mx-auto">
            WCAG 2.1 AA is the internationally recognized standard for web accessibility.
            Our scans help you comply with regulations worldwide.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-zinc-800/50 rounded-xl text-center">
              <p className="font-semibold text-white mb-1">European Union</p>
              <p className="text-sm text-zinc-400">EAA - June 2025</p>
            </div>
            <div className="p-4 bg-zinc-800/50 rounded-xl text-center">
              <p className="font-semibold text-white mb-1">United States</p>
              <p className="text-sm text-zinc-400">ADA - Ongoing</p>
            </div>
            <div className="p-4 bg-zinc-800/50 rounded-xl text-center">
              <p className="font-semibold text-white mb-1">United Kingdom</p>
              <p className="text-sm text-zinc-400">Equality Act</p>
            </div>
            <div className="p-4 bg-zinc-800/50 rounded-xl text-center">
              <p className="font-semibold text-white mb-1">Canada</p>
              <p className="text-sm text-zinc-400">AODA</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-zinc-400 text-center mb-10 max-w-2xl mx-auto">
            Everything you need to know about WCAG compliance and how Inclusiv helps you get there.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {faqs.map((faq, i) => (
              <div key={i} className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl">
                <h3 className="text-lg font-semibold text-white mb-3">{faq.question}</h3>
                <p className="text-zinc-400 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center p-10 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-indigo-500/20 border border-indigo-500/30 rounded-3xl">
          <h2 className="text-3xl font-bold text-white mb-4">
            Make your website accessible to everyone
          </h2>
          <p className="text-xl text-zinc-400 mb-8 max-w-2xl mx-auto">
            Get compliant in weeks, not months.
            WCAG 2.1 AA compliance that works for EAA, ADA, and beyond.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold rounded-xl transition-colors"
            >
              Start Free Scan
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          <p className="mt-4 text-zinc-500 text-sm">Choose a plan above to get started</p>
        </div>
      </main>

      {/* Footer */}
      <SiteFooter />
    </div>
  );
}
