import type { Metadata } from "next";
import Link from "next/link";
import {
  Shield,
  Mail,
  FileText,
  CheckSquare,
  Calculator,
  BookOpen,
  Download,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { SiteFooter } from "@/components/seo/SiteFooter";

export const metadata: Metadata = {
  title: "Free Accessibility Resources | EAA Compliance Tools & Templates",
  description: "Free resources to help you achieve EAA and WCAG compliance. Email templates, checklists, calculators, and guides for web accessibility.",
  keywords: ["accessibility resources", "EAA compliance tools", "WCAG checklist", "accessibility templates", "compliance guides"],
  openGraph: {
    title: "Free Accessibility Resources | Inclusiv",
    description: "Free tools and templates for EAA and WCAG compliance",
    type: "website",
  },
};

const resources = [
  {
    title: "EAA Compliance Email Templates",
    description: "Professional email templates for communicating accessibility requirements with executives, vendors, teams, and customers.",
    href: "/resources/email-templates",
    icon: Mail,
    badge: "Popular",
    badgeColor: "bg-green-500/10 text-green-400 border-green-500/20",
  },
  {
    title: "Social Media Content",
    description: "Ready-to-use LinkedIn posts and Twitter threads about EAA compliance. Establish thought leadership.",
    href: "/resources/social-media-content",
    icon: BookOpen,
    badge: "New",
    badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  },
  {
    title: "EAA Compliance Checklist",
    description: "Comprehensive checklist covering all WCAG 2.1 AA requirements for European Accessibility Act compliance.",
    href: "/resources/eaa-checklist-download",
    icon: CheckSquare,
    badge: "Essential",
    badgeColor: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  },
  {
    title: "EAA Compliance Guide",
    description: "Complete guide to the European Accessibility Act - deadlines, requirements, penalties, and how to comply.",
    href: "/eaa-guide",
    icon: BookOpen,
    badge: null,
    badgeColor: "",
  },
  {
    title: "Accessibility Statement Generator",
    description: "Generate a professional accessibility statement for your website in minutes. Customizable and compliant.",
    href: "/accessibility-statement-generator",
    icon: FileText,
    badge: "Free Tool",
    badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  },
  {
    title: "ROI Calculator",
    description: "Calculate the return on investment for accessibility compliance. Understand the business case.",
    href: "/roi-calculator",
    icon: Calculator,
    badge: null,
    badgeColor: "",
  },
  {
    title: "WCAG 2.1 AA Checklist",
    description: "Interactive checklist for WCAG 2.1 Level AA compliance. Track your progress across all criteria.",
    href: "/wcag-21-aa-checklist",
    icon: CheckSquare,
    badge: null,
    badgeColor: "",
  },
];

const tools = [
  {
    title: "Contrast Checker",
    description: "Check if your text colors meet WCAG contrast requirements.",
    href: "/tools/contrast-checker",
    icon: Sparkles,
  },
  {
    title: "Heading Checker",
    description: "Verify your heading structure follows accessibility best practices.",
    href: "/tools/heading-checker",
    icon: FileText,
  },
  {
    title: "Alt Text Checker",
    description: "Analyze images and get AI-powered alt text suggestions.",
    href: "/tools/alt-text-checker",
    icon: FileText,
  },
];

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-indigo-500" />
            <span className="text-xl font-bold text-white">Inclusiv</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link
              href="/blog"
              className="text-zinc-400 hover:text-white transition-colors text-sm"
            >
              Blog
            </Link>
            <Link
              href="/pricing"
              className="text-zinc-400 hover:text-white transition-colors text-sm"
            >
              Pricing
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 rounded-full mb-6">
            <Download className="w-4 h-4 text-indigo-400" />
            <span className="text-indigo-400 text-sm font-medium">Free Resources</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Accessibility Resources
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Free tools, templates, and guides to help you achieve EAA and WCAG compliance.
            Everything you need to make your website accessible.
          </p>
        </div>

        {/* Main Resources */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-white mb-8">Guides & Templates</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource) => (
              <Link
                key={resource.href}
                href={resource.href}
                className="group block bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 hover:bg-zinc-900 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center">
                    <resource.icon className="w-6 h-6 text-indigo-500" />
                  </div>
                  {resource.badge && (
                    <span className={`text-xs font-medium px-2 py-1 rounded-full border ${resource.badgeColor}`}>
                      {resource.badge}
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-indigo-400 transition-colors">
                  {resource.title}
                </h3>
                <p className="text-zinc-400 text-sm mb-4">
                  {resource.description}
                </p>
                <span className="inline-flex items-center gap-1 text-sm text-indigo-400 font-medium">
                  View resource
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Tools */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-white mb-8">Free Tools</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group block bg-zinc-900/50 border border-zinc-800 rounded-xl p-5 hover:border-zinc-700 hover:bg-zinc-900 transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center">
                    <tool.icon className="w-5 h-5 text-zinc-400" />
                  </div>
                  <h3 className="font-semibold text-white group-hover:text-indigo-400 transition-colors">
                    {tool.title}
                  </h3>
                </div>
                <p className="text-zinc-500 text-sm">
                  {tool.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center p-10 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-indigo-500/10 border border-indigo-500/20 rounded-2xl">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to check your website&apos;s accessibility?
          </h2>
          <p className="text-zinc-400 mb-6 max-w-xl mx-auto">
            Get an instant accessibility audit with detailed remediation guidance.
            Free scan, no signup required.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-colors"
          >
            Start Free Scan
            <ArrowRight className="w-5 h-5" />
          </Link>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
