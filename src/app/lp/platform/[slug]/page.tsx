import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Zap,
  Code,
  Target,
  TrendingUp,
} from "lucide-react";
import { platforms, type PlatformKey } from "@/lib/seo-data";
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/JsonLd";
import {
  RelatedIndustries,
  RelatedCountries,
  CompareTools,
} from "@/components/InternalLinks";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static paths for all platforms
export async function generateStaticParams() {
  return Object.keys(platforms).map((slug) => ({ slug }));
}

// Generate metadata for each platform
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const platform = platforms[slug as PlatformKey];

  if (!platform) {
    return { title: "Not Found" };
  }

  return {
    title: `${platform.name} Accessibility Scanner | Free WCAG Compliance Check`,
    description: `Free accessibility scanner for ${platform.name} websites. Check EAA & WCAG 2.1 AA compliance in 30 seconds. ${platform.hero}`,
    keywords: [
      `${platform.name.toLowerCase()} accessibility`,
      `${platform.name.toLowerCase()} WCAG`,
      `${platform.name.toLowerCase()} accessibility checker`,
      `${platform.name.toLowerCase()} EAA compliance`,
      "accessibility scanner",
      "WCAG 2.1 AA",
    ],
    openGraph: {
      title: `${platform.name} Accessibility Scanner - Free EAA Compliance Check`,
      description: platform.description,
      type: "website",
    },
    alternates: {
      canonical: `https://tryinclusiv.com/lp/platform/${slug}`,
    },
  };
}

export default async function PlatformLandingPage({ params }: PageProps) {
  const { slug } = await params;
  const platform = platforms[slug as PlatformKey];

  if (!platform) {
    notFound();
  }

  const breadcrumbs = [
    { name: "Home", url: "https://tryinclusiv.com" },
    { name: "Platforms", url: "https://tryinclusiv.com/lp/platform" },
    { name: platform.name, url: `https://tryinclusiv.com/lp/platform/${slug}` },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <ServiceJsonLd
        name={`${platform.name} Accessibility Scanner`}
        description={platform.description}
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
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  {/* Platform Badge */}
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full mb-6">
                    <Code className="w-4 h-4 text-indigo-400" />
                    <span className="text-indigo-400 text-sm font-medium">
                      {platform.name} Accessibility
                    </span>
                  </div>

                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                    {platform.title}
                  </h1>

                  <p className="text-xl text-zinc-400 mb-8">{platform.hero}</p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="p-4 bg-zinc-900/50 rounded-xl border border-zinc-800">
                      <TrendingUp className="w-5 h-5 text-indigo-400 mb-2" />
                      <div className="text-sm text-zinc-500">Market Share</div>
                      <div className="font-semibold text-white">{platform.marketShare}</div>
                    </div>
                    <div className="p-4 bg-zinc-900/50 rounded-xl border border-zinc-800">
                      <Target className="w-5 h-5 text-red-400 mb-2" />
                      <div className="text-sm text-zinc-500">Avg Issues Found</div>
                      <div className="font-semibold text-white">{platform.avgIssues} issues</div>
                    </div>
                  </div>

                  {/* CTA */}
                  <Link
                    href="/#scanner"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-500/25 text-lg"
                  >
                    Scan Your {platform.name} Site Free
                    <ArrowRight className="w-5 h-5" />
                  </Link>

                  <p className="mt-4 text-zinc-500 text-sm">
                    No signup required. Results in 30 seconds.
                  </p>
                </div>

                {/* Right Side - Common Issues */}
                <div className="bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800 border border-zinc-700 rounded-2xl p-8">
                  <h3 className="text-xl font-bold text-white mb-6">
                    Common {platform.name} Accessibility Issues
                  </h3>
                  <div className="space-y-4">
                    {platform.commonIssues.map((issue, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 p-3 bg-red-500/5 rounded-lg border border-red-500/10"
                      >
                        <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                        <span className="text-zinc-300">{issue}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-indigo-500/10 rounded-lg border border-indigo-500/20">
                    <p className="text-indigo-300 text-sm">
                      Our scanner detects all these issues and provides copy-paste code fixes
                      specific to {platform.name}.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section className="py-16 border-b border-zinc-800">
            <div className="max-w-6xl mx-auto px-6">
              <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-4">
                How to Check Your {platform.name} Site
              </h2>
              <p className="text-zinc-400 text-center mb-12 max-w-2xl mx-auto">
                Our free scanner is optimized for {platform.name} sites and provides
                platform-specific fixes
              </p>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    step: "1",
                    title: "Enter Your URL",
                    description: `Paste your ${platform.name} site URL into our free scanner`,
                  },
                  {
                    step: "2",
                    title: "Get Instant Results",
                    description: `See exactly which WCAG requirements your ${platform.name} site fails`,
                  },
                  {
                    step: "3",
                    title: `Get ${platform.name} Fixes`,
                    description: `Copy-paste code fixes optimized for ${platform.name}'s platform`,
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

          {/* What We Check */}
          <section className="py-16 border-b border-zinc-800">
            <div className="max-w-6xl mx-auto px-6">
              <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-4">
                Full WCAG 2.1 AA Compliance Check
              </h2>
              <p className="text-zinc-400 text-center mb-10 max-w-2xl mx-auto">
                We scan your {platform.name} site against all EAA requirements
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    category: "Perceivable",
                    checks: ["Alt text", "Color contrast", "Text sizing", "Captions"],
                    icon: "eye",
                  },
                  {
                    category: "Operable",
                    checks: ["Keyboard nav", "Focus visible", "Skip links", "No flashing"],
                    icon: "keyboard",
                  },
                  {
                    category: "Understandable",
                    checks: ["Lang attribute", "Consistent UI", "Error handling", "Labels"],
                    icon: "brain",
                  },
                  {
                    category: "Robust",
                    checks: ["Valid HTML", "ARIA roles", "Name/value", "Status msgs"],
                    icon: "shield",
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
                      <Zap className="w-6 h-6 text-red-400" />
                      <span className="text-red-400 font-semibold">
                        EAA Enforcement Active
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-4">
                      {platform.name} Sites Face €100,000 Fines
                    </h2>
                    <p className="text-zinc-400 mb-6">
                      The European Accessibility Act deadline passed June 28, 2025. All{" "}
                      {platform.name} sites selling to EU customers must be WCAG 2.1 AA
                      compliant. Non-compliance risks serious penalties.
                    </p>
                    <ul className="space-y-2">
                      {[
                        "Fines up to €100,000 per violation",
                        "Mandatory remediation orders",
                        "Public disclosure requirements",
                        "Exclusion from EU market",
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

          {/* Testimonial */}
          <section className="py-16 border-b border-zinc-800">
            <div className="max-w-4xl mx-auto px-6 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
                Trusted by {platform.name} Store Owners
              </h2>
              <blockquote className="text-xl text-zinc-300 italic mb-6">
                &quot;We had no idea our {platform.name} theme had 47 accessibility issues.
                Inclusiv found them all and gave us the exact code to fix each one.
                Took us from failing to fully compliant in a weekend.&quot;
              </blockquote>
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 bg-indigo-500/20 rounded-full flex items-center justify-center">
                  <span className="text-indigo-400 font-bold">MK</span>
                </div>
                <div className="text-left">
                  <div className="font-semibold text-white">Marketing Director</div>
                  <div className="text-zinc-500 text-sm">{platform.name} Store Owner</div>
                </div>
              </div>
            </div>
          </section>

          {/* Related Resources */}
          <section className="py-16 border-b border-zinc-800">
            <div className="max-w-6xl mx-auto px-6">
              <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-10">
                Explore More Resources
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <RelatedIndustries limit={4} />
                <RelatedCountries limit={4} />
                <CompareTools />
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section className="py-20">
            <div className="max-w-3xl mx-auto px-6 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Check Your {platform.name} Site Now
              </h2>
              <p className="text-xl text-zinc-400 mb-8">
                Free scan. No signup. {platform.name}-specific fixes in 30 seconds.
              </p>

              <Link
                href="/#scanner"
                className="inline-flex items-center gap-2 px-10 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-500/25 text-xl"
              >
                Start Free {platform.name} Scan
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
                &copy; {new Date().getFullYear()} Inclusiv. Free {platform.name.toLowerCase()}{" "}
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
