import type { Metadata } from "next";
import Link from "next/link";
import { Shield, ArrowRight, Code, AlertTriangle } from "lucide-react";
import { platforms, type PlatformKey } from "@/lib/seo-data";

export const metadata: Metadata = {
  title: "Platform Accessibility Guides | Free WCAG Scanner by Platform",
  description:
    "Free accessibility scanner for all major platforms. Shopify, WordPress, Wix, Squarespace, and more. Check EAA & WCAG 2.1 AA compliance in 30 seconds.",
  keywords: [
    "shopify accessibility",
    "wordpress accessibility",
    "wix accessibility",
    "squarespace accessibility",
    "wcag compliance by platform",
    "eaa compliance",
    "accessibility scanner",
  ],
  openGraph: {
    title: "Platform Accessibility Guides - Free WCAG Scanner",
    description:
      "Free accessibility scanner for all major platforms. Check compliance in 30 seconds.",
    type: "website",
  },
  alternates: {
    canonical: "https://tryinclusiv.com/lp/platform",
  },
};

// Group platforms by category
const platformGroups = {
  "E-commerce Platforms": [
    "shopify",
    "woocommerce",
    "magento",
    "bigcommerce",
    "prestashop",
    "opencart",
    "shift4shop",
    "ecwid",
    "volusion",
  ],
  "Website Builders": [
    "wordpress",
    "wix",
    "squarespace",
    "webflow",
    "weebly",
    "godaddy",
  ],
  "CMS Platforms": [
    "drupal",
    "joomla",
    "ghost",
    "hubspot",
    "notion",
  ],
  "Headless CMS": ["contentful", "strapi", "sanity"],
  "Enterprise Platforms": ["salesforce"],
};

export default function PlatformIndexPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-indigo-500" />
            <span className="text-xl font-bold text-white">Inclusiv</span>
          </Link>
          <div className="flex items-center gap-2 px-3 py-1 bg-red-500/10 rounded-full text-sm text-red-400">
            <AlertTriangle className="w-4 h-4" />
            <span className="font-medium">EAA Now Enforced</span>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="py-16 md:py-24 border-b border-zinc-800">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full mb-6">
              <Code className="w-4 h-4 text-indigo-400" />
              <span className="text-indigo-400 text-sm font-medium">
                Platform-Specific Guides
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Accessibility Compliance
              <br />
              <span className="text-indigo-400">By Platform</span>
            </h1>

            <p className="text-xl text-zinc-400 mb-10 max-w-2xl mx-auto">
              Free accessibility scanner with platform-specific fixes for Shopify,
              WordPress, Wix, and 20+ more platforms.
            </p>

            <Link
              href="/#scanner"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-500/25 text-lg"
            >
              Scan Your Site Free
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>

        {/* Platform Groups */}
        {Object.entries(platformGroups).map(([groupName, platformKeys]) => (
          <section key={groupName} className="py-12 border-b border-zinc-800">
            <div className="max-w-6xl mx-auto px-6">
              <h2 className="text-2xl font-bold text-white mb-8">{groupName}</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {platformKeys.map((key) => {
                  const platform = platforms[key as PlatformKey];
                  if (!platform) return null;

                  return (
                    <Link
                      key={key}
                      href={`/lp/platform/${key}`}
                      className="group p-6 bg-zinc-900/50 hover:bg-zinc-800/50 border border-zinc-800 hover:border-zinc-700 rounded-xl transition-all"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-white group-hover:text-indigo-400 transition-colors">
                            {platform.name}
                          </h3>
                          <div className="text-sm text-zinc-500">
                            {platform.marketShare} market share
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-red-400 font-semibold">
                            {platform.avgIssues}
                          </div>
                          <div className="text-xs text-zinc-500">avg issues</div>
                        </div>
                      </div>
                      <p className="text-sm text-zinc-400 line-clamp-2 mb-4">
                        {platform.description}
                      </p>
                      <div className="flex items-center gap-2 text-indigo-400 text-sm font-medium">
                        View {platform.name} Guide
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        ))}

        {/* Final CTA */}
        <section className="py-20">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Don&apos;t See Your Platform?
            </h2>
            <p className="text-xl text-zinc-400 mb-8">
              Our scanner works with any website. Scan your site now for free.
            </p>

            <Link
              href="/#scanner"
              className="inline-flex items-center gap-2 px-10 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-500/25 text-xl"
            >
              Start Free Scan
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-zinc-500">
              &copy; {new Date().getFullYear()} Inclusiv. Free accessibility scanner for all
              platforms.
            </p>
            <div className="flex items-center gap-6 text-sm text-zinc-500">
              <Link href="/privacy" className="hover:text-zinc-300">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-zinc-300">
                Terms
              </Link>
              <Link href="/contact" className="hover:text-zinc-300">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
