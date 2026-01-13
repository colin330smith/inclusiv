import type { Metadata } from "next";
import { Shield, Clock, BarChart3, ArrowRight, ChevronRight, AlertTriangle, AlertCircle, Info, CheckCircle, FileText, Target, TrendingUp } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Understanding Results | Inclusiv Help Center",
  description: "Learn how to interpret your Inclusiv accessibility scan results. Understand issue severity, WCAG criteria, and how to prioritize your remediation efforts.",
  keywords: ["accessibility results", "WCAG analysis", "scan interpretation", "accessibility report", "compliance score"],
  openGraph: {
    title: "Understanding Your Accessibility Results | Inclusiv Help Center",
    description: "Learn how to read your accessibility report and prioritize issues for maximum compliance impact.",
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

const severityLevels = [
  {
    level: "Critical",
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/30",
    icon: AlertTriangle,
    description: "These issues prevent users with disabilities from accessing core content or functionality. They represent clear WCAG violations that could result in legal action or regulatory penalties.",
    examples: ["Images missing alt text", "Videos without captions", "Form inputs without labels", "Keyboard traps"],
    priority: "Fix immediately - these block user access",
  },
  {
    level: "Serious",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/30",
    icon: AlertCircle,
    description: "These issues significantly degrade the experience for users with disabilities. While users may find workarounds, the experience is substantially impaired.",
    examples: ["Insufficient color contrast", "Missing heading structure", "Links that open new windows without warning", "Focus not visible"],
    priority: "Fix soon - these cause significant barriers",
  },
  {
    level: "Moderate",
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
    borderColor: "border-yellow-500/30",
    icon: Info,
    description: "These issues cause some difficulty for users with disabilities but don't prevent access to content or functionality. They should be addressed but aren't urgent.",
    examples: ["Redundant alt text", "Skip links missing", "Table headers not associated", "Unclear link text"],
    priority: "Plan to fix - these impact experience quality",
  },
  {
    level: "Minor",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30",
    icon: Info,
    description: "These are accessibility best practices that, while not required for compliance, improve the overall experience for all users including those with disabilities.",
    examples: ["Missing landmark regions", "Non-descriptive page titles", "Touch targets slightly small", "Language not declared"],
    priority: "Nice to fix - improve overall quality",
  },
];

const wcagPrinciples = [
  {
    name: "Perceivable",
    letter: "P",
    description: "Users must be able to perceive the content. This includes providing text alternatives for non-text content, captions for videos, and ensuring content can be presented in different ways.",
    criteria: ["1.1 Text Alternatives", "1.2 Time-based Media", "1.3 Adaptable", "1.4 Distinguishable"],
  },
  {
    name: "Operable",
    letter: "O",
    description: "Users must be able to operate the interface. All functionality must be available via keyboard, users need enough time to read content, and navigation must be predictable.",
    criteria: ["2.1 Keyboard Accessible", "2.2 Enough Time", "2.3 Seizures", "2.4 Navigable", "2.5 Input Modalities"],
  },
  {
    name: "Understandable",
    letter: "U",
    description: "Users must be able to understand the content and interface. Text must be readable, pages must behave predictably, and users should be helped to avoid and correct mistakes.",
    criteria: ["3.1 Readable", "3.2 Predictable", "3.3 Input Assistance"],
  },
  {
    name: "Robust",
    letter: "R",
    description: "Content must work with current and future assistive technologies. This primarily means using valid, semantic HTML and ensuring compatibility with screen readers.",
    criteria: ["4.1 Compatible"],
  },
];

const reportSections = [
  {
    title: "Score Overview",
    description: "Your overall compliance score (0-100) based on the ratio of passed vs failed WCAG criteria. This gives you a quick snapshot of your accessibility status.",
    icon: Target,
  },
  {
    title: "Issue Summary",
    description: "Total count of issues broken down by severity. Critical and serious issues should be your top priority for remediation.",
    icon: AlertTriangle,
  },
  {
    title: "Platform Detection",
    description: "We detect whether you're using Shopify, WordPress, WooCommerce, or other platforms to provide targeted fix recommendations.",
    icon: FileText,
  },
  {
    title: "Top Issues List",
    description: "The most impactful issues on your site, with descriptions, affected elements (CSS selectors), and suggested fixes.",
    icon: BarChart3,
  },
];

export default function UnderstandingResultsPage() {
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
          <span className="text-zinc-300">Understanding Results</span>
        </nav>
      </div>

      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Hero */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 text-indigo-400 text-sm mb-6">
            <BarChart3 className="w-4 h-4" />
            Understanding Results
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            How to read your accessibility report
          </h1>
          <p className="text-xl text-zinc-400">
            Learn what each part of your scan results means and how to prioritize your remediation efforts for maximum impact.
          </p>
        </div>

        {/* Report Sections */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">What&apos;s in Your Report</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {reportSections.map((section) => (
              <div key={section.title} className="p-5 bg-zinc-900 border border-zinc-800 rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-indigo-500/10 rounded-lg flex items-center justify-center">
                    <section.icon className="w-5 h-5 text-indigo-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{section.title}</h3>
                </div>
                <p className="text-zinc-400">{section.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Severity Levels */}
        <div className="mb-16" id="severity">
          <h2 className="text-2xl font-bold text-white mb-6">Issue Severity Levels</h2>
          <p className="text-zinc-400 mb-6">
            Issues are categorized by their impact on users with disabilities. Understanding severity helps you prioritize which issues to fix first.
          </p>
          <div className="space-y-4">
            {severityLevels.map((severity) => (
              <div key={severity.level} className={`p-6 bg-zinc-900 border ${severity.borderColor} rounded-2xl`}>
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 ${severity.bgColor} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <severity.icon className={`w-6 h-6 ${severity.color}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className={`text-xl font-bold ${severity.color}`}>{severity.level}</h3>
                      <span className={`px-3 py-1 ${severity.bgColor} rounded-full text-xs font-medium ${severity.color}`}>
                        {severity.priority}
                      </span>
                    </div>
                    <p className="text-zinc-400 mb-4">{severity.description}</p>
                    <div className="bg-zinc-800/50 rounded-lg p-4">
                      <h4 className="text-sm font-semibold text-zinc-300 mb-2">Common examples:</h4>
                      <ul className="flex flex-wrap gap-2">
                        {severity.examples.map((example, i) => (
                          <li key={i} className="px-3 py-1 bg-zinc-700/50 rounded-full text-sm text-zinc-300">
                            {example}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* WCAG Principles */}
        <div className="mb-16" id="wcag">
          <h2 className="text-2xl font-bold text-white mb-6">WCAG 2.1 Principles (POUR)</h2>
          <p className="text-zinc-400 mb-6">
            WCAG is organized around four principles. Understanding these helps you grasp why each issue matters.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {wcagPrinciples.map((principle) => (
              <div key={principle.name} className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center">
                    <span className="text-lg font-bold text-white">{principle.letter}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white">{principle.name}</h3>
                </div>
                <p className="text-zinc-400 mb-4 text-sm">{principle.description}</p>
                <div className="flex flex-wrap gap-2">
                  {principle.criteria.map((criterion, i) => (
                    <span key={i} className="px-2 py-1 bg-zinc-800 rounded text-xs text-zinc-400">
                      {criterion}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Prioritization Guide */}
        <div className="mb-16" id="priority">
          <h2 className="text-2xl font-bold text-white mb-6">How to Prioritize Fixes</h2>
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="font-bold text-red-500">1</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Fix Critical Issues First</h3>
                  <p className="text-zinc-400">These block users completely. Start with issues that affect the most users and core functionality (homepage, checkout, contact forms).</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="font-bold text-orange-500">2</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Address Serious Issues</h3>
                  <p className="text-zinc-400">Focus on high-impact, low-effort fixes. Color contrast and missing labels often affect many elements but are quick to fix.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="font-bold text-yellow-500">3</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Plan Moderate Fixes</h3>
                  <p className="text-zinc-400">Schedule these into your regular development sprints. They improve experience but aren&apos;t compliance blockers.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="font-bold text-blue-500">4</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Consider Minor Improvements</h3>
                  <p className="text-zinc-400">Best practices that enhance the experience. Address these when you have capacity or during redesigns.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tracking Progress */}
        <div className="mb-16" id="tracking">
          <h2 className="text-2xl font-bold text-white mb-6">Tracking Your Progress</h2>
          <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl">
            <div className="flex items-start gap-4">
              <TrendingUp className="w-6 h-6 text-indigo-500 flex-shrink-0 mt-1" />
              <div>
                <p className="text-zinc-400 mb-4">
                  With Inclusiv paid plans, you get automatic monitoring that tracks your score over time. You&apos;ll see:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-zinc-300">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Score trends showing improvement (or regression)
                  </li>
                  <li className="flex items-center gap-2 text-zinc-300">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Issue counts by severity over time
                  </li>
                  <li className="flex items-center gap-2 text-zinc-300">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Alerts when new issues appear
                  </li>
                  <li className="flex items-center gap-2 text-zinc-300">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Comparison with industry benchmarks
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">Ready to Fix Issues?</h2>
          <Link
            href="/help/fixing-issues"
            className="block p-6 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-indigo-500/50 transition-colors group"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-white group-hover:text-indigo-400 transition-colors mb-2">Fixing Common Issues</h3>
                <p className="text-zinc-500">Step-by-step guides for remediating accessibility problems across platforms.</p>
              </div>
              <ArrowRight className="w-6 h-6 text-zinc-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
            </div>
          </Link>
        </div>

        {/* CTA */}
        <div className="text-center p-10 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-indigo-500/20 border border-indigo-500/30 rounded-3xl">
          <h2 className="text-2xl font-bold text-white mb-4">
            Need help interpreting your results?
          </h2>
          <p className="text-zinc-400 mb-8 max-w-lg mx-auto">
            Our support team can help you understand your report and prioritize fixes for maximum impact.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-colors"
          >
            Contact Support
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
