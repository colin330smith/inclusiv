import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Shield,
  Check,
  X,
  ArrowRight,
  Star,
  Zap,
  DollarSign,
  Clock,
} from "lucide-react";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import {
  RelatedIndustries,
  RelatedCountries,
  CompareTools,
  RelatedResources,
} from "@/components/InternalLinks";

interface PageProps {
  params: Promise<{ competitor: string }>;
}

// Competitor data for comparison pages
const competitors: Record<
  string,
  {
    name: string;
    fullName: string;
    description: string;
    pricing: string;
    pros: string[];
    cons: string[];
    features: Record<string, boolean | string>;
    bestFor: string;
    ourAdvantage: string;
  }
> = {
  accessibe: {
    name: "accessiBe",
    fullName: "accessiBe",
    description:
      "AI-powered accessibility widget that claims to make websites ADA compliant with a single line of code.",
    pricing: "From $490/year",
    pros: [
      "Easy installation (one line of code)",
      "AI-powered adjustments",
      "Widget-based interface",
    ],
    cons: [
      "Doesn't fix actual code issues",
      "Criticized by accessibility experts",
      "Multiple lawsuits against users",
      "Overlay approach not truly compliant",
    ],
    features: {
      "Free tier": false,
      "Actual code fixes": false,
      "WCAG 2.1 AA scan": true,
      "Copy-paste fixes": false,
      "No signup required": false,
      "Real-time scanning": true,
      "Developer-friendly": false,
      "Manual audit option": true,
    },
    bestFor: "Non-technical users wanting a quick fix",
    ourAdvantage:
      "We provide actual code fixes instead of overlay widgets. Our approach is endorsed by accessibility experts and ensures real compliance.",
  },
  userway: {
    name: "UserWay",
    fullName: "UserWay",
    description:
      "Accessibility widget and compliance platform offering overlay solutions and manual audits.",
    pricing: "From $490/year",
    pros: [
      "Multiple product offerings",
      "Widget customization options",
      "Enterprise solutions available",
    ],
    cons: [
      "Widget approach has limitations",
      "Expensive for small businesses",
      "Technical issues reported",
      "Overlay doesn't fix source code",
    ],
    features: {
      "Free tier": "Limited",
      "Actual code fixes": false,
      "WCAG 2.1 AA scan": true,
      "Copy-paste fixes": false,
      "No signup required": false,
      "Real-time scanning": true,
      "Developer-friendly": false,
      "Manual audit option": true,
    },
    bestFor: "Enterprises wanting managed accessibility",
    ourAdvantage:
      "Free instant scans with developer-friendly code fixes. No annual contracts or expensive subscriptions.",
  },
  wave: {
    name: "WAVE",
    fullName: "WAVE by WebAIM",
    description:
      "Free web accessibility evaluation tool from WebAIM that identifies accessibility issues.",
    pricing: "Free (API from $100/month)",
    pros: [
      "Free to use",
      "Trusted by accessibility community",
      "Browser extension available",
    ],
    cons: [
      "No automated fixes provided",
      "Can be overwhelming for beginners",
      "No prioritization of issues",
      "Technical jargon heavy",
    ],
    features: {
      "Free tier": true,
      "Actual code fixes": false,
      "WCAG 2.1 AA scan": true,
      "Copy-paste fixes": false,
      "No signup required": true,
      "Real-time scanning": true,
      "Developer-friendly": "Partial",
      "Manual audit option": false,
    },
    bestFor: "Accessibility experts and auditors",
    ourAdvantage:
      "We provide the same scanning plus copy-paste code fixes and plain English explanations of each issue.",
  },
  axe: {
    name: "axe DevTools",
    fullName: "axe DevTools by Deque",
    description:
      "Industry-standard accessibility testing toolkit used by developers and accessibility professionals.",
    pricing: "Free (Pro from $400/month)",
    pros: [
      "Industry standard engine",
      "CI/CD integration",
      "Comprehensive testing",
    ],
    cons: [
      "Requires technical knowledge",
      "Pro features are expensive",
      "No automatic fix suggestions",
      "Steep learning curve",
    ],
    features: {
      "Free tier": true,
      "Actual code fixes": false,
      "WCAG 2.1 AA scan": true,
      "Copy-paste fixes": false,
      "No signup required": false,
      "Real-time scanning": true,
      "Developer-friendly": true,
      "Manual audit option": true,
    },
    bestFor: "Development teams with accessibility expertise",
    ourAdvantage:
      "We use axe-core under the hood but add copy-paste fixes and non-technical explanations on top.",
  },
  siteimprove: {
    name: "Siteimprove",
    fullName: "Siteimprove Accessibility",
    description:
      "Enterprise accessibility platform offering comprehensive web governance and accessibility testing.",
    pricing: "Custom (typically $10K+/year)",
    pros: [
      "Comprehensive platform",
      "Enterprise support",
      "Training and certification",
    ],
    cons: [
      "Very expensive",
      "Complex setup",
      "Overkill for small/medium sites",
      "Long sales process",
    ],
    features: {
      "Free tier": false,
      "Actual code fixes": false,
      "WCAG 2.1 AA scan": true,
      "Copy-paste fixes": false,
      "No signup required": false,
      "Real-time scanning": true,
      "Developer-friendly": "Partial",
      "Manual audit option": true,
    },
    bestFor: "Large enterprises with big budgets",
    ourAdvantage:
      "Get 80% of the value at 0% of the cost. Perfect for startups and SMBs who need compliance without enterprise pricing.",
  },
  audioeye: {
    name: "AudioEye",
    fullName: "AudioEye",
    description:
      "Digital accessibility platform combining AI automation with expert testing and remediation.",
    pricing: "From $199/month",
    pros: [
      "Hybrid AI + human approach",
      "Legal protection offered",
      "Monitoring included",
    ],
    cons: [
      "Expensive monthly cost",
      "Still relies on overlays",
      "Mixed reviews on effectiveness",
      "Contracts can be difficult to exit",
    ],
    features: {
      "Free tier": false,
      "Actual code fixes": "Partial",
      "WCAG 2.1 AA scan": true,
      "Copy-paste fixes": false,
      "No signup required": false,
      "Real-time scanning": true,
      "Developer-friendly": false,
      "Manual audit option": true,
    },
    bestFor: "Businesses wanting managed accessibility with legal protection",
    ourAdvantage:
      "Transparent, one-time fixes instead of ongoing subscriptions. You own your accessibility improvements.",
  },
  lighthouse: {
    name: "Lighthouse",
    fullName: "Google Lighthouse",
    description:
      "Google's open-source, automated tool for improving web page quality including accessibility.",
    pricing: "Free",
    pros: ["Free and built into Chrome", "Trusted Google tool", "Performance + accessibility"],
    cons: [
      "Only catches ~30% of issues",
      "No fix suggestions",
      "Not comprehensive enough for compliance",
      "Can miss critical issues",
    ],
    features: {
      "Free tier": true,
      "Actual code fixes": false,
      "WCAG 2.1 AA scan": "Partial",
      "Copy-paste fixes": false,
      "No signup required": true,
      "Real-time scanning": true,
      "Developer-friendly": true,
      "Manual audit option": false,
    },
    bestFor: "Quick performance and basic accessibility checks",
    ourAdvantage:
      "We use axe-core which catches 3x more accessibility issues than Lighthouse, plus we provide fixes.",
  },
};

// Generate static paths for all competitors
export async function generateStaticParams() {
  return Object.keys(competitors).map((competitor) => ({ competitor }));
}

// Generate metadata for each competitor
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { competitor } = await params;
  const comp = competitors[competitor];

  if (!comp) {
    return { title: "Not Found" };
  }

  return {
    title: `Inclusiv vs ${comp.name} - Accessibility Scanner Comparison`,
    description: `Compare Inclusiv to ${comp.name}. See features, pricing, and why developers prefer Inclusiv's free accessibility scanner with copy-paste code fixes.`,
    keywords: [
      `${comp.name} alternative`,
      `${comp.name} vs inclusiv`,
      `${comp.name} comparison`,
      "accessibility scanner comparison",
      "WCAG scanner",
      "EAA compliance tool",
    ],
    openGraph: {
      title: `Inclusiv vs ${comp.name} - Which is Better?`,
      description: `Compare features and pricing: Inclusiv vs ${comp.name} accessibility scanners`,
    },
    alternates: {
      canonical: `https://tryinclusiv.com/compare/${competitor}`,
    },
  };
}

export default async function ComparisonPage({ params }: PageProps) {
  const { competitor } = await params;
  const comp = competitors[competitor];

  if (!comp) {
    notFound();
  }

  const breadcrumbs = [
    { name: "Home", url: "https://tryinclusiv.com" },
    { name: "Compare", url: "https://tryinclusiv.com/compare" },
    { name: `vs ${comp.name}`, url: `https://tryinclusiv.com/compare/${competitor}` },
  ];

  const inclusivFeatures: Record<string, boolean | string> = {
    "Free tier": true,
    "Actual code fixes": true,
    "WCAG 2.1 AA scan": true,
    "Copy-paste fixes": true,
    "No signup required": true,
    "Real-time scanning": true,
    "Developer-friendly": true,
    "Manual audit option": false,
  };

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />

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
              Try Free
            </Link>
          </div>
        </header>

        <main>
          {/* Hero */}
          <section className="py-16 border-b border-zinc-800">
            <div className="max-w-6xl mx-auto px-6 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full mb-6">
                <span className="text-indigo-400 text-sm font-medium">
                  Comparison Guide
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Inclusiv vs {comp.name}
              </h1>

              <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-8">
                See why developers choose Inclusiv over {comp.name} for accessibility
                compliance
              </p>

              {/* Quick Stats */}
              <div className="grid md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                  <DollarSign className="w-6 h-6 text-green-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">Free</div>
                  <div className="text-sm text-zinc-400">Inclusiv Pricing</div>
                </div>
                <div className="p-4 bg-zinc-800/50 border border-zinc-700 rounded-xl">
                  <DollarSign className="w-6 h-6 text-zinc-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{comp.pricing}</div>
                  <div className="text-sm text-zinc-400">{comp.name} Pricing</div>
                </div>
                <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
                  <Zap className="w-6 h-6 text-indigo-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">30 sec</div>
                  <div className="text-sm text-zinc-400">Scan Time</div>
                </div>
              </div>
            </div>
          </section>

          {/* Feature Comparison Table */}
          <section className="py-16 border-b border-zinc-800">
            <div className="max-w-4xl mx-auto px-6">
              <h2 className="text-2xl font-bold text-white text-center mb-10">
                Feature Comparison
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-zinc-800">
                      <th className="text-left py-4 px-4 text-zinc-400 font-medium">
                        Feature
                      </th>
                      <th className="text-center py-4 px-4">
                        <div className="flex items-center justify-center gap-2">
                          <Shield className="w-5 h-5 text-indigo-500" />
                          <span className="text-white font-semibold">Inclusiv</span>
                        </div>
                      </th>
                      <th className="text-center py-4 px-4 text-zinc-400 font-medium">
                        {comp.name}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(inclusivFeatures).map(([feature, value]) => (
                      <tr key={feature} className="border-b border-zinc-800/50">
                        <td className="py-4 px-4 text-zinc-300">{feature}</td>
                        <td className="py-4 px-4 text-center">
                          {value === true ? (
                            <Check className="w-5 h-5 text-green-500 mx-auto" />
                          ) : value === false ? (
                            <X className="w-5 h-5 text-red-500 mx-auto" />
                          ) : (
                            <span className="text-yellow-400 text-sm">{value}</span>
                          )}
                        </td>
                        <td className="py-4 px-4 text-center">
                          {comp.features[feature] === true ? (
                            <Check className="w-5 h-5 text-green-500 mx-auto" />
                          ) : comp.features[feature] === false ? (
                            <X className="w-5 h-5 text-red-500 mx-auto" />
                          ) : (
                            <span className="text-yellow-400 text-sm">
                              {comp.features[feature]}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Pros and Cons */}
          <section className="py-16 border-b border-zinc-800">
            <div className="max-w-6xl mx-auto px-6">
              <h2 className="text-2xl font-bold text-white text-center mb-10">
                {comp.name} Pros & Cons
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="p-6 bg-green-500/5 border border-green-500/20 rounded-xl">
                  <h3 className="text-lg font-semibold text-green-400 mb-4">
                    {comp.name} Pros
                  </h3>
                  <ul className="space-y-3">
                    {comp.pros.map((pro, i) => (
                      <li key={i} className="flex items-start gap-2 text-zinc-300">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-6 bg-red-500/5 border border-red-500/20 rounded-xl">
                  <h3 className="text-lg font-semibold text-red-400 mb-4">
                    {comp.name} Cons
                  </h3>
                  <ul className="space-y-3">
                    {comp.cons.map((con, i) => (
                      <li key={i} className="flex items-start gap-2 text-zinc-300">
                        <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Our Advantage */}
          <section className="py-16 border-b border-zinc-800">
            <div className="max-w-4xl mx-auto px-6">
              <div className="bg-gradient-to-br from-indigo-500/10 via-zinc-900 to-zinc-900 border border-indigo-500/20 rounded-2xl p-8 md:p-10">
                <div className="flex items-center gap-3 mb-4">
                  <Star className="w-6 h-6 text-yellow-400" />
                  <h2 className="text-xl font-bold text-white">
                    Why Choose Inclusiv Over {comp.name}
                  </h2>
                </div>

                <p className="text-lg text-zinc-300 mb-6">{comp.ourAdvantage}</p>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 bg-zinc-900/50 rounded-lg">
                    <DollarSign className="w-5 h-5 text-green-400 mb-2" />
                    <div className="text-white font-medium">100% Free</div>
                    <div className="text-sm text-zinc-400">No hidden costs</div>
                  </div>
                  <div className="p-4 bg-zinc-900/50 rounded-lg">
                    <Clock className="w-5 h-5 text-indigo-400 mb-2" />
                    <div className="text-white font-medium">Instant Results</div>
                    <div className="text-sm text-zinc-400">30 second scans</div>
                  </div>
                  <div className="p-4 bg-zinc-900/50 rounded-lg">
                    <Zap className="w-5 h-5 text-yellow-400 mb-2" />
                    <div className="text-white font-medium">Copy-Paste Fixes</div>
                    <div className="text-sm text-zinc-400">Real code solutions</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Related Resources Section */}
          <section className="py-16 border-b border-zinc-800">
            <div className="max-w-6xl mx-auto px-6">
              <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-10">
                Explore More
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <RelatedResources />
                <RelatedIndustries limit={4} />
                <RelatedCountries limit={4} />
                <CompareTools currentSlug={competitor} />
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section className="py-20">
            <div className="max-w-3xl mx-auto px-6 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Try Inclusiv Free
              </h2>
              <p className="text-xl text-zinc-400 mb-8">
                See why developers prefer Inclusiv over {comp.name}. Free scan, no signup,
                instant results.
              </p>

              <Link
                href="/#scanner"
                className="inline-flex items-center gap-2 px-10 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-500/25 text-xl"
              >
                Start Free Scan
                <ArrowRight className="w-6 h-6" />
              </Link>

              <p className="mt-6 text-zinc-500">
                No credit card. No signup. Just results.
              </p>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="border-t border-zinc-800 py-8">
          <div className="max-w-6xl mx-auto px-6 text-center text-sm text-zinc-500">
            <p>
              &copy; {new Date().getFullYear()} Inclusiv. The free {comp.name} alternative.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
