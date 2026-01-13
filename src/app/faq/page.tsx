import type { Metadata } from "next";
import { Shield, Clock, ChevronDown, Search, HelpCircle, MessageCircle, FileText, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FAQ | Inclusiv - Web Accessibility Compliance Questions",
  description: "Frequently asked questions about the European Accessibility Act, WCAG 2.1 compliance, Inclusiv scanner features, and how to make your website accessible.",
  keywords: ["accessibility FAQ", "EAA questions", "WCAG FAQ", "web accessibility help", "compliance questions", "accessibility answers"],
  openGraph: {
    title: "FAQ | Inclusiv - Web Accessibility Questions Answered",
    description: "Get answers to common questions about EAA compliance, WCAG standards, and using Inclusiv to make your website accessible.",
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

const faqCategories = [
  {
    name: "EAA & Regulations",
    icon: FileText,
    questions: [
      {
        id: "what-is-eaa",
        question: "What is the EAA (European Accessibility Act)?",
        answer: "The European Accessibility Act (EAA) is EU legislation (Directive 2019/882) that requires digital products and services to be accessible to people with disabilities. It covers websites, mobile apps, e-commerce platforms, banking services, e-books, and more. The EAA aims to create a harmonized accessibility standard across all EU member states, making it easier for businesses to comply while ensuring equal access for the 87 million Europeans with disabilities."
      },
      {
        id: "who-needs-comply",
        question: "Who needs to comply with the EAA?",
        answer: "The EAA applies to businesses that: (1) Sell products or services to EU consumers online, including e-commerce sites, SaaS platforms, and digital services; (2) Have an annual turnover exceeding €2 million or employ more than 10 people; (3) Provide services in areas like banking, transport, e-commerce, telecommunications, or e-books. Even non-EU companies serving EU customers must comply. Micro-enterprises (fewer than 10 employees and under €2M turnover) may be exempt, but accessibility is still recommended."
      },
      {
        id: "eaa-penalties",
        question: "What are the penalties for non-compliance?",
        answer: "Penalties for EAA non-compliance vary by EU member state but can be severe. Fines can reach up to €100,000 per violation in some countries. Beyond financial penalties, non-compliant businesses may face: removal from public procurement eligibility, legal action from affected individuals, reputational damage, and mandatory corrective orders. Some countries allow class action lawsuits, increasing potential liability significantly."
      },
      {
        id: "eaa-deadline",
        question: "When is the EAA deadline?",
        answer: "The EAA enforcement deadline is June 28, 2025. After this date, all covered businesses must have their digital products and services fully accessible. Some provisions already apply to new products launched after June 2025. We strongly recommend starting your compliance journey at least 3-6 months before the deadline to allow time for remediation."
      },
      {
        id: "what-is-wcag",
        question: "What is WCAG 2.1?",
        answer: "WCAG (Web Content Accessibility Guidelines) 2.1 is the internationally recognized standard for web accessibility, published by the W3C. It provides technical guidelines organized around four principles: Perceivable (content must be presentable to users), Operable (interface must be usable), Understandable (content and operation must be clear), and Robust (content must work with assistive technologies). WCAG 2.1 includes 78 success criteria covering everything from color contrast to keyboard navigation."
      },
      {
        id: "wcag-levels",
        question: "What is the difference between WCAG A, AA, and AAA?",
        answer: "WCAG has three conformance levels: Level A is the minimum level with 30 basic requirements (like alt text for images). Level AA is the mid-level standard with 20 additional requirements (like color contrast ratios and resizable text) - this is what the EAA requires. Level AAA is the highest level with 28 additional requirements (like sign language for videos) - typically only pursued for specialized accessibility needs. Most regulations, including the EAA, require Level AA compliance."
      },
      {
        id: "accessibility-statement",
        question: "Do I need an accessibility statement?",
        answer: "Yes, the EAA requires a publicly available accessibility statement. This statement must include: your organization's commitment to accessibility, the WCAG conformance level you target (AA required), known accessibility limitations and their reasons, contact information for accessibility feedback, and the date of your last accessibility audit. Inclusiv Professional and Enterprise plans automatically generate compliant accessibility statements."
      },
    ]
  },
  {
    name: "Inclusiv Scanner",
    icon: Search,
    questions: [
      {
        id: "how-inclusiv-works",
        question: "How does Inclusiv work?",
        answer: "Inclusiv uses automated accessibility testing powered by axe-core, the industry-leading accessibility engine. When you enter a URL, our scanner: (1) Loads your page in a headless browser; (2) Analyzes all elements against WCAG 2.1 AA criteria; (3) Detects your platform (Shopify, WordPress, etc.) for tailored recommendations; (4) Generates a comprehensive report with specific issues and locations; (5) Provides prioritized fixes with actual code snippets. Our AI then generates platform-specific remediation code you can implement immediately."
      },
      {
        id: "free-scan-included",
        question: "What is included in the free scan?",
        answer: "The free scan includes: single page analysis against all WCAG 2.1 AA criteria, detection of all accessibility issues on that page, severity ratings (critical, serious, moderate, minor), basic remediation guidance, platform detection, and email delivery of your report. For full site scanning, monitoring, AI-powered fixes, and compliance certificates, upgrade to a paid plan."
      },
      {
        id: "paid-plans",
        question: "What is in the paid plans?",
        answer: "Starter (€49/month): Full site scans up to 100 pages, weekly monitoring, platform-specific fixes, email and Slack alerts. Professional (€149/month): Unlimited pages, daily monitoring, AI-powered code fixes, 1-click remediation, compliance certificates, VPAT documentation, team access. Enterprise (€499/month): Everything in Professional plus custom integrations, dedicated account manager, 99.9% SLA, SSO/SAML, custom reporting, and legal compliance review."
      },
      {
        id: "scanner-accuracy",
        question: "How accurate is the scanner?",
        answer: "Inclusiv achieves approximately 50-60% coverage of all potential accessibility issues through automated testing - this is industry-standard for automated tools. Automated scanners excel at detecting: missing alt text, color contrast issues, form label problems, heading structure errors, and ARIA implementation issues. Some issues require manual testing (like keyboard navigation flow or screen reader announcements). Our Professional plan includes guidance on manual testing for complete coverage."
      },
      {
        id: "scan-duration",
        question: "How long does a scan take?",
        answer: "A single page scan typically completes in 30-60 seconds. Full site scans depend on the number of pages: 10 pages takes about 2-3 minutes, 100 pages takes 10-15 minutes, and 500+ pages can take 30-60 minutes. We use parallel scanning to speed up larger sites. You will receive an email notification when your scan completes, and you can view progress in real-time on the dashboard."
      },
      {
        id: "auto-fix",
        question: "Do you fix issues automatically?",
        answer: "Inclusiv provides AI-generated code fixes that you or your developers implement - we do not automatically modify your website code. This approach ensures you maintain full control over your codebase. Our fixes include: exact code snippets for your platform, before/after comparisons, implementation instructions, and verification steps. Professional and Enterprise plans include 1-click fix generation that creates complete pull requests for supported integrations."
      },
      {
        id: "platforms-supported",
        question: "What platforms do you support?",
        answer: "Inclusiv works with any web platform or technology. We provide specialized fix recommendations for: Shopify (Liquid templates), WordPress (PHP/Gutenberg), WooCommerce, Magento, Webflow, Squarespace, Wix, React/Next.js, Vue/Nuxt, Angular, and vanilla HTML/CSS/JavaScript. Our AI detects your platform automatically and tailors recommendations accordingly. Custom platforms receive generic but implementable code fixes."
      },
      {
        id: "rescan-after-fixes",
        question: "Can I rescan after implementing fixes?",
        answer: "Absolutely! We encourage rescanning after implementing fixes to verify improvements. Free users can scan the same page again anytime. Paid plans include automatic monitoring that rescans your site on schedule (weekly for Starter, daily for Professional). You can also trigger manual rescans anytime from your dashboard. Each scan generates a new report so you can track progress over time."
      },
    ]
  },
  {
    name: "Reports & Results",
    icon: FileText,
    questions: [
      {
        id: "detailed-report",
        question: "How do I get a detailed report?",
        answer: "To get your detailed report: (1) Run a scan by entering your URL on our homepage; (2) After the scan completes, enter your email to receive the full report; (3) Check your inbox for the report link (check spam if you don't see it); (4) The report includes all issues found, severity ratings, affected elements, and fix suggestions. Paid plans provide enhanced reports with code fixes, trend tracking, and exportable formats (PDF, CSV, JSON)."
      },
      {
        id: "compliance-certificate",
        question: "What is a compliance certificate?",
        answer: "A compliance certificate is an official document that attests to your website's accessibility conformance level. Inclusiv certificates include: your WCAG 2.1 AA conformance status, scan date and score, list of pages scanned, any known limitations, and a unique verification code. Certificates are available on Professional and Enterprise plans. They are automatically updated with each scan and can be displayed on your website or provided to regulators."
      },
    ]
  },
  {
    name: "Security & Privacy",
    icon: Shield,
    questions: [
      {
        id: "data-security",
        question: "Is my data secure?",
        answer: "Yes, we take security seriously. Inclusiv: (1) Only accesses publicly visible content on your website - never backend systems; (2) Encrypts all data in transit (TLS 1.3) and at rest (AES-256); (3) Does not store your website content after scanning; (4) Processes data in EU data centers (GDPR compliant); (5) Never shares or sells your data; (6) Allows you to delete all your data upon request. Enterprise plans include SOC 2 compliance documentation and custom security reviews."
      },
    ]
  },
  {
    name: "Support & Services",
    icon: MessageCircle,
    questions: [
      {
        id: "contact-support",
        question: "How do I contact support?",
        answer: "You can reach our support team via: Email at support@inclusiv.eu (response within 24 hours for all users, 4 hours for Professional, 1 hour for Enterprise). Our Help Center at /help has guides and tutorials. Professional and Enterprise customers have access to priority support queues and dedicated Slack channels. Enterprise customers have a dedicated account manager available by phone."
      },
      {
        id: "refund-policy",
        question: "Do you offer refunds?",
        answer: "Yes, we offer a 30-day money-back guarantee on all paid plans. If you are not satisfied with Inclusiv for any reason within the first 30 days of your subscription, contact us for a full refund - no questions asked. After 30 days, you can cancel anytime but refunds are not provided for partial months. Annual subscriptions are prorated if canceled early."
      },
      {
        id: "remediation-help",
        question: "Can you help with remediation?",
        answer: "Yes! Our support depends on your plan: Free users get generic fix guidance in reports. Starter users get platform-specific code suggestions. Professional users get AI-generated, copy-paste-ready code fixes. Enterprise users get dedicated remediation support including code review and implementation guidance. We also partner with accessibility agencies for hands-on remediation services - contact us for referrals."
      },
      {
        id: "agency-partner",
        question: "Do you work with agencies?",
        answer: "Yes, we have an Agency Partner Program! Benefits include: white-label reports with your branding, bulk pricing for multiple client sites, dedicated partner dashboard, priority support, commission on referrals, and co-marketing opportunities. Agencies can manage all client sites from a single dashboard with separate billing. Contact partners@inclusiv.eu or visit our Partners page to apply."
      },
    ]
  },
];

export default function FAQPage() {
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
            <Link href="/pricing" className="text-zinc-400 hover:text-white transition-colors text-sm font-medium">
              Pricing
            </Link>
            <Link href="/help" className="text-zinc-400 hover:text-white transition-colors text-sm font-medium">
              Help Center
            </Link>
            <Link href="/contact" className="text-zinc-400 hover:text-white transition-colors text-sm font-medium">
              Contact
            </Link>
            <div className="flex items-center gap-2 px-3 py-1 bg-red-500/10 rounded-full text-sm text-red-400">
              <Clock className="w-4 h-4" />
              <span className="font-semibold">{deadlineInfo.days} days until EAA deadline</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 text-indigo-400 text-sm mb-6">
            <HelpCircle className="w-4 h-4" />
            Frequently Asked Questions
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Questions? We have <span className="gradient-text">answers</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Everything you need to know about the EAA, WCAG compliance, and how Inclusiv helps you achieve accessibility.
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid md:grid-cols-3 gap-4 mb-12">
          <Link href="/help/getting-started" className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-indigo-500/50 transition-colors group">
            <h3 className="text-white font-semibold mb-1 group-hover:text-indigo-400 transition-colors">Getting Started</h3>
            <p className="text-zinc-500 text-sm">New to Inclusiv? Start here.</p>
          </Link>
          <Link href="/help/understanding-results" className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-indigo-500/50 transition-colors group">
            <h3 className="text-white font-semibold mb-1 group-hover:text-indigo-400 transition-colors">Understanding Results</h3>
            <p className="text-zinc-500 text-sm">Learn to read your scan report.</p>
          </Link>
          <Link href="/help/fixing-issues" className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-indigo-500/50 transition-colors group">
            <h3 className="text-white font-semibold mb-1 group-hover:text-indigo-400 transition-colors">Fixing Issues</h3>
            <p className="text-zinc-500 text-sm">Implement accessibility fixes.</p>
          </Link>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-12">
          {faqCategories.map((category) => (
            <div key={category.name}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center">
                  <category.icon className="w-5 h-5 text-indigo-500" />
                </div>
                <h2 className="text-2xl font-bold text-white">{category.name}</h2>
              </div>
              <div className="space-y-4">
                {category.questions.map((faq) => (
                  <details
                    key={faq.id}
                    className="group bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden"
                  >
                    <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                      <h3 className="text-lg font-semibold text-white pr-4">{faq.question}</h3>
                      <ChevronDown className="w-5 h-5 text-zinc-500 group-open:rotate-180 transition-transform flex-shrink-0" />
                    </summary>
                    <div className="px-5 pb-5">
                      <p className="text-zinc-400 leading-relaxed whitespace-pre-line">{faq.answer}</p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Still have questions */}
        <div className="mt-16 text-center p-10 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-indigo-500/20 border border-indigo-500/30 rounded-3xl">
          <h2 className="text-2xl font-bold text-white mb-4">
            Still have questions?
          </h2>
          <p className="text-zinc-400 mb-8 max-w-lg mx-auto">
            Our support team is here to help. Get answers within 24 hours or check out our comprehensive Help Center.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              Contact Support
            </Link>
            <Link
              href="/help"
              className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold rounded-xl transition-colors"
            >
              Visit Help Center
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
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
              <Link href="/faq" className="hover:text-white transition-colors">FAQ</Link>
              <Link href="/help" className="hover:text-white transition-colors">Help Center</Link>
              <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
              <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
