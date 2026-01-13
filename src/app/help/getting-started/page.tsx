import type { Metadata } from "next";
import { Shield, Clock, Zap, ArrowRight, ChevronRight, CheckCircle, Globe, Mail, BarChart3, Settings, AlertCircle } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Getting Started | Inclusiv Help Center",
  description: "Learn how to use Inclusiv for web accessibility scanning. Step-by-step guide to running your first scan, understanding scores, and achieving EAA compliance.",
  keywords: ["accessibility scanner tutorial", "Inclusiv guide", "WCAG scanner setup", "accessibility testing start"],
  openGraph: {
    title: "Getting Started with Inclusiv | Help Center",
    description: "Step-by-step guide to running your first accessibility scan and understanding your compliance score.",
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

const steps = [
  {
    number: 1,
    title: "Enter Your URL",
    description: "Go to the Inclusiv homepage and enter your website URL in the scanner. You can enter any page - your homepage is a great place to start. The scanner accepts full URLs (https://example.com) or just the domain (example.com).",
    icon: Globe,
    tips: ["Start with your homepage for an overview", "Test important pages like checkout and contact forms", "Include pages with lots of content for comprehensive results"],
  },
  {
    number: 2,
    title: "Run the Scan",
    description: "Click 'Check Compliance Now' to start the scan. The scanner will load your page in a headless browser, analyze all elements against WCAG 2.1 AA criteria, and detect your platform (Shopify, WordPress, etc.) for tailored recommendations.",
    icon: Zap,
    tips: ["Scans typically complete in 30-60 seconds", "The scanner checks 50+ accessibility criteria", "Platform detection enables targeted fix suggestions"],
  },
  {
    number: 3,
    title: "Review Your Score",
    description: "After scanning, you'll see your accessibility score (0-100) along with a summary of issues found. The score reflects your WCAG 2.1 AA compliance level. Higher scores mean fewer accessibility barriers for users with disabilities.",
    icon: BarChart3,
    tips: ["80+ is good, but aim for 95+ for full compliance", "Critical issues should be prioritized first", "Focus on high-impact, low-effort fixes"],
  },
  {
    number: 4,
    title: "Get Your Full Report",
    description: "Enter your email to receive a detailed report with all issues, their locations, and fix suggestions. The report includes severity ratings, affected elements with CSS selectors, and platform-specific remediation guidance.",
    icon: Mail,
    tips: ["Check spam if you don't receive the report", "Reports include code snippets for fixes", "Save reports to track progress over time"],
  },
];

const scoreExplanation = [
  { range: "90-100", status: "Excellent", color: "text-green-500", description: "Your site meets most WCAG 2.1 AA criteria. Minor issues may exist but overall accessibility is strong." },
  { range: "70-89", status: "Good", color: "text-yellow-500", description: "Your site is reasonably accessible with some issues to address. Focus on critical and serious issues first." },
  { range: "50-69", status: "Needs Work", color: "text-orange-500", description: "Multiple accessibility barriers exist. Prioritize remediation to avoid compliance issues." },
  { range: "0-49", status: "Critical", color: "text-red-500", description: "Significant accessibility issues that likely violate EAA requirements. Immediate attention needed." },
];

const nextSteps = [
  { title: "Understanding Your Results", href: "/help/understanding-results", description: "Learn what each issue means and how to prioritize fixes" },
  { title: "Fixing Common Issues", href: "/help/fixing-issues", description: "Step-by-step guides for remediating accessibility problems" },
  { title: "Frequently Asked Questions", href: "/faq", description: "Get answers to common questions about EAA and WCAG" },
];

export default function GettingStartedPage() {
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
            <Link href="/help" className="text-zinc-400 hover:text-white transition-colors text-sm font-medium">
              Help Center
            </Link>
            <Link href="/faq" className="text-zinc-400 hover:text-white transition-colors text-sm font-medium">
              FAQ
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

      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto px-6 py-4">
        <nav className="flex items-center gap-2 text-sm text-zinc-500">
          <Link href="/help" className="hover:text-white transition-colors">Help Center</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-zinc-300">Getting Started</span>
        </nav>
      </div>

      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Hero */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 text-indigo-400 text-sm mb-6">
            <Zap className="w-4 h-4" />
            Getting Started Guide
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Run your first accessibility scan
          </h1>
          <p className="text-xl text-zinc-400">
            Learn how to use Inclusiv to check your website for WCAG 2.1 AA compliance and identify accessibility issues.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-8 mb-16">
          {steps.map((step) => (
            <div key={step.number} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center">
                    <span className="text-xl font-bold text-indigo-400">{step.number}</span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <step.icon className="w-5 h-5 text-indigo-500" />
                    <h2 className="text-xl font-bold text-white">{step.title}</h2>
                  </div>
                  <p className="text-zinc-400 mb-4 leading-relaxed">{step.description}</p>
                  <div className="bg-zinc-800/50 rounded-xl p-4">
                    <h4 className="text-sm font-semibold text-zinc-300 mb-2">Tips:</h4>
                    <ul className="space-y-2">
                      {step.tips.map((tip, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-zinc-400">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Score Explanation */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">Understanding Your Score</h2>
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
            {scoreExplanation.map((score, i) => (
              <div key={score.range} className={`p-5 ${i < scoreExplanation.length - 1 ? 'border-b border-zinc-800' : ''}`}>
                <div className="flex items-center gap-4 mb-2">
                  <span className={`font-bold text-lg ${score.color}`}>{score.range}</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${score.color} bg-opacity-10`} style={{ backgroundColor: 'currentColor', opacity: 0.1 }}>
                    <span className={score.color}>{score.status}</span>
                  </span>
                </div>
                <p className="text-zinc-400">{score.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Important Note */}
        <div className="mb-16 p-6 bg-amber-500/10 border border-amber-500/30 rounded-2xl">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Important: Automated Testing Limitations</h3>
              <p className="text-zinc-400 leading-relaxed">
                Automated scanners like Inclusiv can detect approximately 50-60% of accessibility issues. For complete WCAG 2.1 AA compliance,
                you should also conduct manual testing (keyboard navigation, screen reader testing) and user testing with people who have disabilities.
                Our Professional plan includes guidance on comprehensive testing strategies.
              </p>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">Next Steps</h2>
          <div className="grid gap-4">
            {nextSteps.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="p-5 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-indigo-500/50 transition-colors flex items-center justify-between group"
              >
                <div>
                  <h3 className="text-lg font-semibold text-white group-hover:text-indigo-400 transition-colors">{item.title}</h3>
                  <p className="text-zinc-500">{item.description}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-zinc-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center p-10 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-indigo-500/20 border border-indigo-500/30 rounded-3xl">
          <h2 className="text-2xl font-bold text-white mb-4">
            Ready to scan your website?
          </h2>
          <p className="text-zinc-400 mb-8 max-w-lg mx-auto">
            Get your free accessibility report in under 60 seconds. No signup required.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-colors"
          >
            Start Free Scan
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
