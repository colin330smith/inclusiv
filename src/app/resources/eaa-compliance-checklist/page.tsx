import type { Metadata } from "next";
import { Shield, Download, CheckCircle, Mail, Lock, FileText } from "lucide-react";
import Link from "next/link";
import { LeadMagnetForm } from "./LeadMagnetForm";

export const metadata: Metadata = {
  title: "Free EAA Compliance Checklist - 50+ Point WCAG Audit Guide",
  description:
    "Download our free 50+ point EAA compliance checklist. Covers all WCAG 2.1 AA requirements for European Accessibility Act compliance. No signup until download.",
  keywords: [
    "EAA compliance checklist",
    "WCAG checklist",
    "accessibility audit checklist",
    "European Accessibility Act checklist",
    "WCAG 2.1 AA checklist",
    "free accessibility checklist",
  ],
  openGraph: {
    title: "Free EAA Compliance Checklist | 50+ Point Audit Guide",
    description: "Download the complete EAA compliance checklist with 50+ checkpoints",
  },
  alternates: {
    canonical: "https://tryinclusiv.com/resources/eaa-compliance-checklist",
  },
};

const checklistPreview = [
  {
    category: "Perceivable",
    items: [
      "All images have meaningful alt text",
      "Color contrast meets 4.5:1 minimum ratio",
      "Text can be resized to 200% without loss",
      "Audio/video has captions or transcripts",
      "Content can be presented in different ways",
    ],
  },
  {
    category: "Operable",
    items: [
      "All functionality available via keyboard",
      "Users can pause, stop, or hide moving content",
      "No content flashes more than 3 times/second",
      "Skip links allow bypassing navigation",
      "Focus indicators are visible on all elements",
    ],
  },
  {
    category: "Understandable",
    items: [
      "Page language is declared in HTML",
      "Navigation is consistent across pages",
      "Form errors are clearly identified",
      "Labels and instructions are provided for inputs",
      "Context changes are initiated by user action",
    ],
  },
  {
    category: "Robust",
    items: [
      "HTML validates without significant errors",
      "ARIA attributes are used correctly",
      "Custom components have proper roles",
      "Status messages can be announced by screen readers",
      "Content works with assistive technologies",
    ],
  },
];

const benefits = [
  {
    icon: FileText,
    title: "50+ Checkpoints",
    description: "Comprehensive coverage of all WCAG 2.1 AA success criteria",
  },
  {
    icon: CheckCircle,
    title: "Priority Ranked",
    description: "Issues ranked by severity and ease of fix",
  },
  {
    icon: Lock,
    title: "Code Examples",
    description: "Fix examples for the most common issues",
  },
];

export default function EAAChecklistPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-indigo-500" />
            <span className="text-xl font-bold text-white">Inclusiv</span>
          </Link>
          <Link
            href="/#scanner"
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium transition-colors"
          >
            Free Scan
          </Link>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="py-16 md:py-20 border-b border-zinc-800">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left: Content */}
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full mb-6">
                  <Download className="w-4 h-4 text-green-400" />
                  <span className="text-green-400 text-sm font-medium">
                    Free Download
                  </span>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                  The Complete EAA
                  <span className="text-indigo-400"> Compliance Checklist</span>
                </h1>

                <p className="text-xl text-zinc-400 mb-8">
                  50+ point checklist covering every WCAG 2.1 AA requirement for
                  European Accessibility Act compliance. Use it to audit your site
                  or hand it to your dev team.
                </p>

                {/* Benefits */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {benefits.map((benefit, i) => (
                    <div key={i} className="text-center">
                      <div className="w-10 h-10 bg-indigo-500/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <benefit.icon className="w-5 h-5 text-indigo-400" />
                      </div>
                      <div className="text-sm font-medium text-white">
                        {benefit.title}
                      </div>
                      <div className="text-xs text-zinc-500">{benefit.description}</div>
                    </div>
                  ))}
                </div>

                {/* Trust */}
                <div className="flex items-center gap-2 text-sm text-zinc-500">
                  <Lock className="w-4 h-4" />
                  <span>No spam. Unsubscribe anytime.</span>
                </div>
              </div>

              {/* Right: Form */}
              <div>
                <LeadMagnetForm />
              </div>
            </div>
          </div>
        </section>

        {/* Preview Section */}
        <section className="py-16 border-b border-zinc-800">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-4">
              What&apos;s Inside the Checklist
            </h2>
            <p className="text-zinc-400 text-center mb-12 max-w-2xl mx-auto">
              Preview some of the 50+ checkpoints organized by WCAG principle
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {checklistPreview.map((section, i) => (
                <div
                  key={i}
                  className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl"
                >
                  <h3 className="text-lg font-semibold text-indigo-400 mb-4">
                    {section.category}
                  </h3>
                  <ul className="space-y-3">
                    {section.items.map((item, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-2 text-sm text-zinc-300"
                      >
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <p className="text-zinc-500">
                ...and 30+ more checkpoints in the full checklist
              </p>
            </div>
          </div>
        </section>

        {/* Why This Matters */}
        <section className="py-16 border-b border-zinc-800">
          <div className="max-w-4xl mx-auto px-6">
            <div className="bg-gradient-to-br from-red-500/10 via-zinc-900 to-zinc-900 border border-red-500/20 rounded-2xl p-8 md:p-10">
              <h2 className="text-2xl font-bold text-white mb-4">
                Why You Need This Checklist
              </h2>
              <p className="text-zinc-400 mb-6">
                The European Accessibility Act is now being enforced across all 27 EU
                member states. Non-compliant websites face:
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-zinc-900/50 rounded-lg text-center">
                  <div className="text-2xl font-bold text-red-400">€100K</div>
                  <div className="text-sm text-zinc-400">Max fine per violation</div>
                </div>
                <div className="p-4 bg-zinc-900/50 rounded-lg text-center">
                  <div className="text-2xl font-bold text-yellow-400">87%</div>
                  <div className="text-sm text-zinc-400">Sites are non-compliant</div>
                </div>
                <div className="p-4 bg-zinc-900/50 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-400">50+</div>
                  <div className="text-sm text-zinc-400">Points in our checklist</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Get Your Free Checklist
            </h2>
            <p className="text-xl text-zinc-400 mb-8">
              Enter your email above and we&apos;ll send the complete EAA compliance
              checklist directly to your inbox.
            </p>
            <div className="flex items-center justify-center gap-2 text-zinc-500">
              <Mail className="w-5 h-5" />
              <span>Check your inbox after submitting</span>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-8">
        <div className="max-w-6xl mx-auto px-6 text-center text-sm text-zinc-500">
          <p>
            &copy; {new Date().getFullYear()} Inclusiv. Free EAA compliance resources.
          </p>
        </div>
      </footer>
    </div>
  );
}
