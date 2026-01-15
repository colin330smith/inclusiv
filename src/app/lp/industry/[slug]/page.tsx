import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  TrendingUp,
  Users,
  Scale,
  Clock,
} from "lucide-react";
import { industries, type IndustryKey } from "@/lib/seo-data";
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/JsonLd";
import {
  RelatedIndustries,
  RelatedCountries,
  CompareTools,
  RelatedResources,
} from "@/components/InternalLinks";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static paths for all industries
export async function generateStaticParams() {
  return Object.keys(industries).map((slug) => ({ slug }));
}

// Generate metadata for each industry
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const industry = industries[slug as IndustryKey];

  if (!industry) {
    return { title: "Not Found" };
  }

  return {
    title: `${industry.name} Accessibility Compliance | Free WCAG Scanner`,
    description: `Free accessibility scanner for ${industry.name.toLowerCase()} websites. Check EAA & WCAG 2.1 AA compliance in 30 seconds. ${industry.hero}`,
    keywords: [
      `${industry.name.toLowerCase()} accessibility`,
      `${industry.name.toLowerCase()} WCAG compliance`,
      `${industry.name.toLowerCase()} EAA`,
      "accessibility scanner",
      "WCAG 2.1 AA",
      "European Accessibility Act",
    ],
    openGraph: {
      title: `${industry.name} Accessibility - Free EAA Compliance Check`,
      description: industry.hero,
      type: "website",
    },
    alternates: {
      canonical: `https://tryinclusiv.com/lp/industry/${slug}`,
    },
  };
}

export default async function IndustryLandingPage({ params }: PageProps) {
  const { slug } = await params;
  const industry = industries[slug as IndustryKey];

  if (!industry) {
    notFound();
  }

  const breadcrumbs = [
    { name: "Home", url: "https://tryinclusiv.com" },
    { name: "Industries", url: "https://tryinclusiv.com/lp/industry" },
    { name: industry.name, url: `https://tryinclusiv.com/lp/industry/${slug}` },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <ServiceJsonLd
        name={`${industry.name} Accessibility Compliance Scanner`}
        description={industry.description}
      />

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
          {/* Hero Section */}
          <section className="py-16 md:py-24 border-b border-zinc-800">
            <div className="max-w-6xl mx-auto px-6">
              <div className="max-w-3xl">
                {/* Industry Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full mb-6">
                  <span className="text-indigo-400 text-sm font-medium">
                    {industry.name} Accessibility
                  </span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  {industry.title}
                </h1>

                <p className="text-xl text-zinc-400 mb-8">{industry.hero}</p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-6 mb-10">
                  <div className="text-center p-4 bg-zinc-900/50 rounded-xl border border-zinc-800">
                    <TrendingUp className="w-6 h-6 text-indigo-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">
                      {industry.stats.marketSize}
                    </div>
                    <div className="text-xs text-zinc-500">Market Size</div>
                  </div>
                  <div className="text-center p-4 bg-zinc-900/50 rounded-xl border border-zinc-800">
                    <Users className="w-6 h-6 text-green-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">
                      {industry.stats.disabledSpending}
                    </div>
                    <div className="text-xs text-zinc-500">Disabled Spending</div>
                  </div>
                  <div className="text-center p-4 bg-zinc-900/50 rounded-xl border border-zinc-800">
                    <Scale className="w-6 h-6 text-red-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">
                      {industry.stats.lawsuitRisk}
                    </div>
                    <div className="text-xs text-zinc-500">Lawsuit Risk</div>
                  </div>
                </div>

                {/* CTA */}
                <Link
                  href="/#scanner"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-500/25 text-lg"
                >
                  Scan Your {industry.name} Site Free
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </section>

          {/* Pain Points */}
          <section className="py-16 border-b border-zinc-800">
            <div className="max-w-6xl mx-auto px-6">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Why {industry.name} Businesses Need Accessibility
              </h2>
              <p className="text-zinc-400 mb-10 max-w-2xl">
                {industry.description}
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {industry.painPoints.map((point, i) => (
                  <div
                    key={i}
                    className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl"
                  >
                    <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center mb-4">
                      <AlertTriangle className="w-5 h-5 text-red-400" />
                    </div>
                    <p className="text-zinc-300">{point}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Regulations */}
          <section className="py-16 border-b border-zinc-800">
            <div className="max-w-6xl mx-auto px-6">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                {industry.name} Accessibility Regulations
              </h2>
              <p className="text-zinc-400 mb-10 max-w-2xl">
                These laws and standards apply to {industry.name.toLowerCase()} businesses
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {industry.regulations.map((reg, i) => (
                  <div
                    key={i}
                    className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl flex items-center gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-zinc-300 font-medium">{reg}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* What We Check */}
          <section className="py-16 border-b border-zinc-800">
            <div className="max-w-6xl mx-auto px-6">
              <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-4">
                Full WCAG 2.1 AA Compliance Check
              </h2>
              <p className="text-zinc-400 text-center mb-10 max-w-2xl mx-auto">
                Our scanner checks all accessibility criteria required by the EAA
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    category: "Perceivable",
                    checks: ["Alt text", "Color contrast", "Text sizing", "Captions"],
                  },
                  {
                    category: "Operable",
                    checks: ["Keyboard nav", "Focus visible", "Skip links", "No flashing"],
                  },
                  {
                    category: "Understandable",
                    checks: ["Lang attribute", "Consistent UI", "Error handling", "Labels"],
                  },
                  {
                    category: "Robust",
                    checks: ["Valid HTML", "ARIA roles", "Name/value", "Status msgs"],
                  },
                ].map((section, i) => (
                  <div
                    key={i}
                    className="p-5 bg-zinc-900/50 border border-zinc-800 rounded-xl"
                  >
                    <h3 className="font-semibold text-indigo-400 mb-3">
                      {section.category}
                    </h3>
                    <ul className="space-y-2">
                      {section.checks.map((check, j) => (
                        <li
                          key={j}
                          className="flex items-center gap-2 text-sm text-zinc-400"
                        >
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          {check}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* EAA Warning */}
          <section className="py-16 border-b border-zinc-800">
            <div className="max-w-6xl mx-auto px-6">
              <div className="bg-gradient-to-br from-red-500/10 via-zinc-900 to-zinc-900 border border-red-500/20 rounded-2xl p-8 md:p-10">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Clock className="w-6 h-6 text-red-400" />
                      <span className="text-red-400 font-semibold">
                        EAA Enforcement Active
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-4">
                      {industry.name} Sites Face €100,000 Fines
                    </h2>
                    <p className="text-zinc-400 mb-6">
                      The European Accessibility Act deadline passed June 28, 2025. EU authorities
                      are now actively enforcing compliance. {industry.name} businesses without
                      accessible websites risk significant penalties.
                    </p>
                    <ul className="space-y-2">
                      {[
                        "Fines up to €100,000 per violation",
                        "Mandatory remediation orders",
                        "Public disclosure requirements",
                        "Exclusion from public contracts",
                      ].map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-zinc-300">
                          <AlertTriangle className="w-4 h-4 text-red-400" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-40 h-40 rounded-full bg-red-500/10 border border-red-500/30">
                      <div>
                        <div className="text-5xl font-bold text-red-400">€100K</div>
                        <div className="text-sm text-zinc-400 mt-1">per violation</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Related Resources Section */}
          <section className="py-16 border-b border-zinc-800">
            <div className="max-w-6xl mx-auto px-6">
              <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-10">
                Explore More Resources
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <RelatedResources />
                <RelatedIndustries currentSlug={slug} limit={4} />
                <RelatedCountries limit={4} />
                <CompareTools />
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section className="py-20">
            <div className="max-w-3xl mx-auto px-6 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Check Your {industry.name} Site Now
              </h2>
              <p className="text-xl text-zinc-400 mb-8">
                Free scan. No signup. Results in 30 seconds.
              </p>

              <Link
                href="/#scanner"
                className="inline-flex items-center gap-2 px-10 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-500/25 text-xl"
              >
                Start Free Compliance Scan
                <ArrowRight className="w-6 h-6" />
              </Link>

              <p className="mt-6 text-zinc-500">
                No credit card required. 100% free accessibility check.
              </p>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="border-t border-zinc-800 py-8">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-zinc-500">
                &copy; {new Date().getFullYear()} Inclusiv. Free {industry.name.toLowerCase()}{" "}
                accessibility scanner.
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
    </>
  );
}
