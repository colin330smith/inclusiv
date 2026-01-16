import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Calendar,
  Euro,
  FileText,
  Globe,
} from "lucide-react";
import { euCountries, type CountryKey } from "@/lib/seo-data";
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

// Generate static paths for all countries
export async function generateStaticParams() {
  return Object.keys(euCountries).map((slug) => ({ slug }));
}

// Generate metadata for each country
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const country = euCountries[slug as CountryKey];

  if (!country) {
    return { title: "Not Found" };
  }

  return {
    title: `${country.name} Accessibility Law (${country.localLaw}) | EAA Compliance`,
    description: `Check your website's accessibility compliance for ${country.name}. ${country.localLaw} requires WCAG 2.1 AA. ${country.penalties}. Free instant scan.`,
    keywords: [
      `${country.name} accessibility`,
      country.localLaw,
      `${country.name} WCAG`,
      `${country.name} EAA`,
      "accessibility compliance",
      "European Accessibility Act",
    ],
    openGraph: {
      title: `${country.name} Accessibility Compliance - ${country.localLaw}`,
      description: `Free accessibility scanner for ${country.name}. Check compliance with ${country.localLaw}. ${country.penalties}.`,
      type: "website",
    },
    alternates: {
      canonical: `https://tryinclusiv.com/lp/country/${slug}`,
    },
  };
}

export default async function CountryLandingPage({ params }: PageProps) {
  const { slug } = await params;
  const country = euCountries[slug as CountryKey];

  if (!country) {
    notFound();
  }

  const breadcrumbs = [
    { name: "Home", url: "https://tryinclusiv.com" },
    { name: "Countries", url: "https://tryinclusiv.com/lp/country" },
    { name: country.name, url: `https://tryinclusiv.com/lp/country/${slug}` },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <ServiceJsonLd
        name={`${country.name} Accessibility Compliance Scanner`}
        description={`Check your website's compliance with ${country.name}'s accessibility laws (${country.localLaw})`}
        areaServed={country.name}
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
              <span className="font-medium">EAA Enforced in {country.name}</span>
            </div>
          </div>
        </header>

        <main>
          {/* Hero Section */}
          <section className="py-16 md:py-24 border-b border-zinc-800">
            <div className="max-w-6xl mx-auto px-6">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  {/* Country Badge */}
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full mb-6">
                    <Globe className="w-4 h-4 text-indigo-400" />
                    <span className="text-indigo-400 text-sm font-medium">
                      {country.name} Accessibility Law
                    </span>
                  </div>

                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                    {country.name} Website Accessibility
                    <span className="text-indigo-400"> Compliance</span>
                  </h1>

                  <p className="text-xl text-zinc-400 mb-8">
                    The <strong className="text-white">{country.localLaw}</strong> is now
                    enforced in {country.name}. Non-compliant websites face{" "}
                    <strong className="text-red-400">{country.penalties}</strong>.
                  </p>

                  {/* Key Info */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="p-4 bg-zinc-900/50 rounded-xl border border-zinc-800">
                      <Calendar className="w-5 h-5 text-indigo-400 mb-2" />
                      <div className="text-sm text-zinc-500">Deadline</div>
                      <div className="font-semibold text-white">{country.deadline}</div>
                    </div>
                    <div className="p-4 bg-zinc-900/50 rounded-xl border border-zinc-800">
                      <Euro className="w-5 h-5 text-red-400 mb-2" />
                      <div className="text-sm text-zinc-500">Penalties</div>
                      <div className="font-semibold text-white text-sm">{country.penalties}</div>
                    </div>
                    <div className="p-4 bg-zinc-900/50 rounded-xl border border-zinc-800">
                      <FileText className="w-5 h-5 text-green-400 mb-2" />
                      <div className="text-sm text-zinc-500">Local Law</div>
                      <div className="font-semibold text-white text-sm">{country.localLaw}</div>
                    </div>
                    <div className="p-4 bg-zinc-900/50 rounded-xl border border-zinc-800">
                      <Globe className="w-5 h-5 text-purple-400 mb-2" />
                      <div className="text-sm text-zinc-500">Population</div>
                      <div className="font-semibold text-white text-sm">{country.population}</div>
                    </div>
                  </div>

                  {/* CTA */}
                  <Link
                    href="/#scanner"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-500/25 text-lg"
                  >
                    Check {country.name} Compliance
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>

                {/* Right Side - Penalty Warning */}
                <div className="bg-gradient-to-br from-red-500/10 via-zinc-900 to-zinc-900 border border-red-500/20 rounded-2xl p-8">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-red-500/10 border border-red-500/30 mb-4">
                      <div>
                        <AlertTriangle className="w-12 h-12 text-red-400" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-white">Non-Compliance Risk</h3>
                    <p className="text-zinc-400 text-sm">{country.penalties}</p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-white">What {country.name} enforces:</h4>
                    <ul className="space-y-2">
                      {[
                        "WCAG 2.1 Level AA compliance",
                        "Digital services accessibility",
                        "E-commerce accessibility",
                        "Banking and financial services",
                        "Transport and ticketing systems",
                      ].map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-zinc-300">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section className="py-16 border-b border-zinc-800">
            <div className="max-w-6xl mx-auto px-6">
              <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-4">
                How to Check {country.name} Compliance
              </h2>
              <p className="text-zinc-400 text-center mb-12 max-w-2xl mx-auto">
                Our free scanner checks your website against {country.localLaw} requirements
              </p>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    step: "1",
                    title: "Enter Your URL",
                    description: "Paste your website URL into our free scanner",
                  },
                  {
                    step: "2",
                    title: "Get Instant Results",
                    description: `See exactly which ${country.localLaw} requirements you meet or fail`,
                  },
                  {
                    step: "3",
                    title: "Fix with Code",
                    description: "Get copy-paste code fixes for every issue found",
                  },
                ].map((item, i) => (
                  <div key={i} className="text-center">
                    <div className="w-16 h-16 bg-indigo-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-indigo-400">{item.step}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-zinc-400 text-sm">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* WCAG Requirements */}
          <section className="py-16 border-b border-zinc-800">
            <div className="max-w-6xl mx-auto px-6">
              <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-4">
                {country.localLaw} Requires WCAG 2.1 AA
              </h2>
              <p className="text-zinc-400 text-center mb-12 max-w-2xl mx-auto">
                These accessibility standards must be met to comply with {country.name} law
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    category: "Perceivable",
                    items: ["Text alternatives", "Time-based media", "Adaptable content", "Distinguishable"],
                  },
                  {
                    category: "Operable",
                    items: ["Keyboard accessible", "Enough time", "No seizures", "Navigable"],
                  },
                  {
                    category: "Understandable",
                    items: ["Readable text", "Predictable UI", "Input assistance", "Error handling"],
                  },
                  {
                    category: "Robust",
                    items: ["Compatible code", "Valid HTML", "ARIA support", "Status messages"],
                  },
                ].map((section, i) => (
                  <div key={i} className="p-5 bg-zinc-900/50 border border-zinc-800 rounded-xl">
                    <h3 className="font-semibold text-indigo-400 mb-3">{section.category}</h3>
                    <ul className="space-y-2">
                      {section.items.map((item, j) => (
                        <li key={j} className="flex items-center gap-2 text-sm text-zinc-400">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
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
                <RelatedIndustries limit={4} />
                <RelatedCountries currentSlug={slug} limit={4} />
                <CompareTools />
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section className="py-20">
            <div className="max-w-3xl mx-auto px-6 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Check Your {country.name} Compliance Now
              </h2>
              <p className="text-xl text-zinc-400 mb-8">
                Free scan. No signup. Instant results for {country.localLaw} compliance.
              </p>

              <Link
                href="/#scanner"
                className="inline-flex items-center gap-2 px-10 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-500/25 text-xl"
              >
                Start Free {country.name} Compliance Check
                <ArrowRight className="w-6 h-6" />
              </Link>

              <p className="mt-6 text-zinc-500">
                No credit card required. 100% free accessibility scan.
              </p>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="border-t border-zinc-800 py-8">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-zinc-500">
                &copy; {new Date().getFullYear()} Inclusiv. {country.name} accessibility
                compliance scanner.
              </p>
              <div className="flex items-center gap-6 text-sm text-zinc-500">
                <Link href="/privacy" className="hover:text-zinc-300">Privacy</Link>
                <Link href="/terms" className="hover:text-zinc-300">Terms</Link>
                <Link href="/contact" className="hover:text-zinc-300">Contact</Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
