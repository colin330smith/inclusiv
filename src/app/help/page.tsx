import type { Metadata } from "next";
import { Shield, Clock, BookOpen, Zap, FileText, Wrench, BarChart3, Users, Settings, HelpCircle, ArrowRight, Search } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Help Center | Inclusiv - Web Accessibility Support",
  description: "Learn how to use Inclusiv, understand your accessibility scan results, and fix compliance issues. Guides, tutorials, and resources for EAA compliance.",
  keywords: ["accessibility help", "Inclusiv support", "WCAG guide", "accessibility tutorial", "EAA compliance help"],
  openGraph: {
    title: "Help Center | Inclusiv - Accessibility Support & Resources",
    description: "Comprehensive guides and tutorials for achieving web accessibility compliance with Inclusiv.",
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

const helpCategories = [
  {
    title: "Getting Started",
    description: "New to Inclusiv? Learn the basics of accessibility scanning and how to run your first scan.",
    icon: Zap,
    href: "/help/getting-started",
    articles: [
      "Running your first scan",
      "Understanding your compliance score",
      "Setting up your account",
      "Connecting your website",
    ],
  },
  {
    title: "Understanding Results",
    description: "Learn how to interpret your scan results, prioritize issues, and track your progress.",
    icon: BarChart3,
    href: "/help/understanding-results",
    articles: [
      "Reading your accessibility report",
      "Issue severity levels explained",
      "WCAG success criteria",
      "Tracking improvements over time",
    ],
  },
  {
    title: "Fixing Issues",
    description: "Step-by-step guides for remediating common accessibility issues across different platforms.",
    icon: Wrench,
    href: "/help/fixing-issues",
    articles: [
      "Adding alt text to images",
      "Fixing color contrast",
      "Form accessibility",
      "Keyboard navigation",
    ],
  },
];

const popularArticles = [
  { title: "What is the EAA deadline?", href: "/faq#eaa-deadline" },
  { title: "How to fix missing alt text", href: "/help/fixing-issues#alt-text" },
  { title: "Understanding your compliance score", href: "/help/understanding-results#score" },
  { title: "WCAG 2.1 AA requirements explained", href: "/faq#what-is-wcag" },
  { title: "Getting a compliance certificate", href: "/faq#compliance-certificate" },
  { title: "Platform-specific fixes for Shopify", href: "/help/fixing-issues#shopify" },
];

const quickLinks = [
  { title: "FAQ", description: "Common questions answered", icon: HelpCircle, href: "/faq" },
  { title: "Pricing", description: "Plans and features", icon: FileText, href: "/pricing" },
  { title: "Contact Support", description: "Get help from our team", icon: Users, href: "/contact" },
];

export default function HelpCenterPage() {
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

      <main className="max-w-6xl mx-auto px-6 py-16">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 text-indigo-400 text-sm mb-6">
            <BookOpen className="w-4 h-4" />
            Help Center
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            How can we <span className="gradient-text">help you?</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-8">
            Guides, tutorials, and resources to help you achieve web accessibility compliance.
          </p>

          {/* Search placeholder */}
          <div className="max-w-xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
              <input
                type="text"
                placeholder="Search for help articles..."
                className="w-full pl-12 pr-4 py-4 bg-zinc-900 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Main Categories */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {helpCategories.map((category) => (
            <Link
              key={category.title}
              href={category.href}
              className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl hover:border-indigo-500/50 transition-all group"
            >
              <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-indigo-500/20 transition-colors">
                <category.icon className="w-6 h-6 text-indigo-500" />
              </div>
              <h2 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">
                {category.title}
              </h2>
              <p className="text-zinc-400 mb-4">{category.description}</p>
              <ul className="space-y-2">
                {category.articles.map((article, i) => (
                  <li key={i} className="text-zinc-500 text-sm flex items-center gap-2">
                    <div className="w-1 h-1 bg-zinc-600 rounded-full" />
                    {article}
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex items-center gap-2 text-indigo-400 font-medium">
                View all articles
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        {/* Popular Articles */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">Popular Articles</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {popularArticles.map((article, i) => (
              <Link
                key={i}
                href={article.href}
                className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-indigo-500/50 transition-colors flex items-center justify-between group"
              >
                <span className="text-white group-hover:text-indigo-400 transition-colors">{article.title}</span>
                <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">Quick Links</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {quickLinks.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="p-5 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-indigo-500/50 transition-colors group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <link.icon className="w-5 h-5 text-indigo-500" />
                  <h3 className="text-lg font-semibold text-white group-hover:text-indigo-400 transition-colors">
                    {link.title}
                  </h3>
                </div>
                <p className="text-zinc-500">{link.description}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="text-center p-10 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-indigo-500/20 border border-indigo-500/30 rounded-3xl">
          <h2 className="text-2xl font-bold text-white mb-4">
            Can&apos;t find what you&apos;re looking for?
          </h2>
          <p className="text-zinc-400 mb-8 max-w-lg mx-auto">
            Our support team is ready to help you with any questions about accessibility compliance.
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
