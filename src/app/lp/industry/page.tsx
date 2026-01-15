import type { Metadata } from "next";
import Link from "next/link";
import { Shield, ArrowRight, Building2 } from "lucide-react";
import { industries, type IndustryKey } from "@/lib/seo-data";

export const metadata: Metadata = {
  title: "Industry Accessibility Solutions | Free WCAG Scanner by Industry",
  description:
    "Free accessibility scanner tailored for your industry. Check EAA & WCAG 2.1 AA compliance for e-commerce, healthcare, finance, SaaS, and 20+ industries.",
  keywords: [
    "industry accessibility",
    "ecommerce accessibility",
    "healthcare accessibility",
    "finance accessibility",
    "SaaS accessibility",
    "WCAG compliance by industry",
  ],
  openGraph: {
    title: "Accessibility Solutions by Industry | Inclusiv",
    description: "Free WCAG scanner for 25+ industries",
  },
  alternates: {
    canonical: "https://tryinclusiv.com/lp/industry",
  },
};

const industryIcons: Record<string, string> = {
  ecommerce: "Shopping bags and online stores",
  healthcare: "Medical records and patient portals",
  finance: "Banking apps and investment platforms",
  banking: "Digital banking and online accounts",
  insurance: "Claims and policy management",
  education: "Learning platforms and school sites",
  government: "Public services and citizen portals",
  travel: "Booking sites and travel apps",
  retail: "Store websites and loyalty programs",
  media: "News sites and streaming platforms",
  technology: "Software products and documentation",
  legal: "Law firm sites and legal documents",
  "real-estate": "Property listings and virtual tours",
  automotive: "Dealer sites and configurators",
  hospitality: "Hotel booking and restaurant sites",
  nonprofit: "Donation pages and volunteer portals",
  saas: "Web applications and dashboards",
  telecommunications: "Account management and support",
  manufacturing: "B2B portals and product catalogs",
  entertainment: "Ticketing and event sites",
  "food-beverage": "Online ordering and menus",
  fashion: "Online fashion retail",
  beauty: "Beauty e-commerce and booking",
  sports: "Team sites and fitness apps",
  news: "News sites and publications",
  publishing: "Digital publishing platforms",
};

export default function IndustryIndexPage() {
  const industryKeys = Object.keys(industries) as IndustryKey[];

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

      <main className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          {/* Hero */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Accessibility Solutions by Industry
            </h1>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              Every industry faces unique accessibility challenges. Find tailored
              compliance guidance for your business.
            </p>
          </div>

          {/* Industry Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industryKeys.map((key) => {
              const industry = industries[key];
              return (
                <Link
                  key={key}
                  href={`/lp/industry/${key}`}
                  className="group p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl hover:border-indigo-500/50 transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-indigo-500" />
                    </div>
                    <ArrowRight className="w-5 h-5 text-zinc-600 group-hover:text-indigo-400 transition-colors" />
                  </div>

                  <h2 className="text-lg font-semibold text-white mb-2 group-hover:text-indigo-400 transition-colors">
                    {industry.name}
                  </h2>

                  <p className="text-sm text-zinc-400 mb-4 line-clamp-2">
                    {industry.hero}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs px-2 py-1 bg-zinc-800 text-zinc-400 rounded">
                      {industry.stats.marketSize} market
                    </span>
                    <span className="text-xs px-2 py-1 bg-red-500/10 text-red-400 rounded">
                      {industry.stats.lawsuitRisk} lawsuit risk
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <div className="inline-block p-8 bg-gradient-to-br from-indigo-500/10 via-zinc-900 to-zinc-900 border border-indigo-500/20 rounded-2xl">
              <h2 className="text-2xl font-bold text-white mb-4">
                Don&apos;t See Your Industry?
              </h2>
              <p className="text-zinc-400 mb-6 max-w-md">
                Our scanner works for any website. Check your accessibility
                compliance in 30 seconds.
              </p>
              <Link
                href="/#scanner"
                className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-colors"
              >
                Start Free Scan
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-8">
        <div className="max-w-6xl mx-auto px-6 text-center text-sm text-zinc-500">
          <p>
            &copy; {new Date().getFullYear()} Inclusiv. Free accessibility scanner
            for all industries.
          </p>
        </div>
      </footer>
    </div>
  );
}
