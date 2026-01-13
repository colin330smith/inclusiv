import type { Metadata } from "next";
import { Shield, Check, X, Clock, Zap, Award, Users, FileCheck, Headphones, Building2, Lock, ArrowRight, AlertTriangle } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pricing | Inclusiv - EAA Compliance Before June 2025",
  description: "Choose your accessibility compliance plan. From free single-page scans to enterprise solutions. Get EAA compliant before the June 28, 2025 deadline.",
  keywords: ["accessibility pricing", "WCAG compliance cost", "EAA compliance pricing", "web accessibility plans", "accessibility audit pricing"],
  openGraph: {
    title: "Pricing | Inclusiv - EAA Compliance Plans",
    description: "Get EAA compliant before June 28, 2025. Plans starting from free. Avoid €100,000 fines.",
    type: "website",
  },
};

// Calculate days until EAA deadline
const getDeadlineInfo = () => {
  const deadline = new Date("2025-06-28");
  const today = new Date();
  const diffTime = deadline.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return { days: diffDays, deadline };
};

const plans = [
  {
    name: "Free",
    price: "€0",
    period: "",
    description: "Perfect for a quick compliance check",
    features: [
      { text: "Single page scan", included: true },
      { text: "Basic accessibility report", included: true },
      { text: "WCAG 2.1 AA issues detected", included: true },
      { text: "Email delivery", included: true },
      { text: "Full site scan", included: false },
      { text: "Weekly monitoring", included: false },
      { text: "AI-powered fixes", included: false },
      { text: "Compliance certificate", included: false },
      { text: "Priority support", included: false },
    ],
    cta: "Start Free Scan",
    ctaLink: "/",
    popular: false,
    highlight: false,
  },
  {
    name: "Starter",
    price: "€49",
    period: "/month",
    description: "For small businesses getting compliant",
    features: [
      { text: "Full site scan", included: true },
      { text: "Up to 100 pages", included: true },
      { text: "Weekly monitoring", included: true },
      { text: "Detailed issue reports", included: true },
      { text: "Platform-specific fixes", included: true },
      { text: "Email + Slack alerts", included: true },
      { text: "AI-powered fixes", included: false },
      { text: "Compliance certificate", included: false },
      { text: "Priority support", included: false },
    ],
    cta: "Start 14-Day Trial",
    ctaLink: "/#scanner",
    popular: false,
    highlight: false,
  },
  {
    name: "Professional",
    price: "€149",
    period: "/month",
    description: "Full compliance for growing companies",
    features: [
      { text: "Unlimited pages", included: true },
      { text: "Daily monitoring", included: true },
      { text: "AI-powered code fixes", included: true },
      { text: "1-click remediation", included: true },
      { text: "Compliance certificate", included: true },
      { text: "Priority email support", included: true },
      { text: "VPAT/ACR documentation", included: true },
      { text: "Multiple team members", included: true },
      { text: "Custom integrations", included: false },
    ],
    cta: "Start 14-Day Trial",
    ctaLink: "/#scanner",
    popular: true,
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "€499",
    period: "/month",
    description: "For organizations with complex needs",
    features: [
      { text: "Everything in Professional", included: true },
      { text: "Custom integrations", included: true },
      { text: "Dedicated account manager", included: true },
      { text: "99.9% uptime SLA", included: true },
      { text: "Full audit trail", included: true },
      { text: "SSO/SAML authentication", included: true },
      { text: "Custom reporting", included: true },
      { text: "On-call support", included: true },
      { text: "Legal compliance review", included: true },
    ],
    cta: "Contact Sales",
    ctaLink: "mailto:enterprise@inclusiv.eu",
    popular: false,
    highlight: false,
  },
];

const faqs = [
  {
    question: "What is the European Accessibility Act (EAA)?",
    answer: "The EAA is EU legislation requiring digital products and services to be accessible to people with disabilities. It applies to websites, mobile apps, e-commerce, banking, and more. Non-compliance after June 28, 2025 can result in fines up to €100,000 and legal action.",
  },
  {
    question: "Does the EAA apply to my business?",
    answer: "If you sell products or services to EU consumers online, the EAA likely applies to you. This includes e-commerce sites, SaaS platforms, booking systems, and any B2C digital service. Even US companies selling to EU customers must comply.",
  },
  {
    question: "What WCAG level do I need for EAA compliance?",
    answer: "The EAA requires WCAG 2.1 Level AA compliance. Inclusiv scans for all Level A and AA success criteria, giving you a complete picture of your compliance status.",
  },
  {
    question: "How quickly can I become compliant?",
    answer: "Most websites can achieve compliance within 2-4 weeks using our AI-powered fixes. The Professional plan includes 1-click remediation that generates exact code changes for your platform (WordPress, Shopify, React, etc.).",
  },
  {
    question: "What's included in the compliance certificate?",
    answer: "Our compliance certificate documents your WCAG 2.1 AA conformance, includes a detailed accessibility statement, and provides evidence for regulators. It's updated automatically with each scan.",
  },
  {
    question: "Can I cancel anytime?",
    answer: "Yes, all plans are month-to-month with no long-term commitment. You can cancel anytime from your dashboard. We also offer a 30-day money-back guarantee on all paid plans.",
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
  const deadlineInfo = getDeadlineInfo();

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
            <Link href="/" className="text-zinc-400 hover:text-white transition-colors">
              Scanner
            </Link>
            <div className="flex items-center gap-2 px-3 py-1 bg-red-500/10 rounded-full text-sm text-red-400 animate-pulse">
              <Clock className="w-4 h-4" />
              <span className="font-semibold">{deadlineInfo.days} days until EAA deadline</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-16">
        {/* Urgency Banner */}
        <div className="mb-12 p-4 bg-gradient-to-r from-red-500/20 via-orange-500/20 to-red-500/20 border border-red-500/30 rounded-2xl">
          <div className="flex items-center justify-center gap-3 text-center">
            <AlertTriangle className="w-6 h-6 text-red-400 flex-shrink-0" />
            <p className="text-lg">
              <span className="font-bold text-red-400">EAA Deadline: June 28, 2025</span>
              <span className="text-zinc-300 mx-2">|</span>
              <span className="text-zinc-400">Non-compliant sites face fines up to €100,000. Only {deadlineInfo.days} days left.</span>
            </p>
          </div>
        </div>

        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Simple, transparent <span className="gradient-text">pricing</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Get compliant before the deadline. Start free, upgrade when you need more power.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-6 ${
                plan.highlight
                  ? "bg-gradient-to-b from-indigo-500/20 to-indigo-500/5 border-2 border-indigo-500"
                  : "bg-zinc-900 border border-zinc-800"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 bg-indigo-500 text-white text-sm font-semibold rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-zinc-400 text-sm mb-4">{plan.description}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-zinc-500">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    {feature.included ? (
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    ) : (
                      <X className="w-5 h-5 text-zinc-600 flex-shrink-0 mt-0.5" />
                    )}
                    <span className={feature.included ? "text-zinc-300" : "text-zinc-600"}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href={plan.ctaLink}
                className={`block w-full py-3 px-4 rounded-xl text-center font-semibold transition-colors ${
                  plan.highlight
                    ? "bg-indigo-600 hover:bg-indigo-500 text-white"
                    : "bg-zinc-800 hover:bg-zinc-700 text-white"
                }`}
              >
                {plan.cta}
                {plan.highlight && <ArrowRight className="inline w-4 h-4 ml-2" />}
              </Link>
            </div>
          ))}
        </div>

        {/* Money-back Guarantee */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-green-500/10 border border-green-500/30 rounded-full">
            <Lock className="w-5 h-5 text-green-500" />
            <span className="text-green-400 font-medium">30-Day Money-Back Guarantee</span>
            <span className="text-zinc-400">• No questions asked</span>
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
        <div className="grid md:grid-cols-4 gap-6 mb-20">
          <div className="text-center p-6 bg-zinc-900 border border-zinc-800 rounded-2xl">
            <Zap className="w-10 h-10 text-indigo-500 mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-white mb-1">30 sec</h3>
            <p className="text-zinc-400">Average scan time</p>
          </div>
          <div className="text-center p-6 bg-zinc-900 border border-zinc-800 rounded-2xl">
            <Users className="w-10 h-10 text-indigo-500 mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-white mb-1">2,847+</h3>
            <p className="text-zinc-400">Sites scanned</p>
          </div>
          <div className="text-center p-6 bg-zinc-900 border border-zinc-800 rounded-2xl">
            <FileCheck className="w-10 h-10 text-indigo-500 mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-white mb-1">94%</h3>
            <p className="text-zinc-400">Issues fixed with AI</p>
          </div>
          <div className="text-center p-6 bg-zinc-900 border border-zinc-800 rounded-2xl">
            <Award className="w-10 h-10 text-indigo-500 mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-white mb-1">WCAG 2.1</h3>
            <p className="text-zinc-400">Full AA coverage</p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-zinc-400 text-center mb-10 max-w-2xl mx-auto">
            Everything you need to know about EAA compliance and how Inclusiv helps you get there.
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
            Don't wait for the deadline
          </h2>
          <p className="text-xl text-zinc-400 mb-8 max-w-2xl mx-auto">
            Start your free scan today. Get compliant in weeks, not months.
            <span className="block mt-2 text-red-400 font-medium">
              Only {deadlineInfo.days} days until €100k fines become reality.
            </span>
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-colors text-lg"
          >
            Start Free Scan Now
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="mt-4 text-zinc-500 text-sm">No credit card required</p>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 mt-24">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-zinc-500">
              <Shield className="w-5 h-5" />
              <span>Inclusiv © 2025</span>
            </div>
            <div className="flex items-center gap-6 text-zinc-500 text-sm">
              <Link href="/eaa-compliance" className="hover:text-white transition-colors">EAA Guide</Link>
              <Link href="/wcag-checker" className="hover:text-white transition-colors">WCAG Checker</Link>
              <span>Powered by axe-core • WCAG 2.1 AA</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
