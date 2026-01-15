import type { Metadata } from "next";
import Link from "next/link";
import { Shield, ArrowRight, Check, X, Star } from "lucide-react";

export const metadata: Metadata = {
  title: "Accessibility Scanner Comparison | Inclusiv vs Competitors",
  description:
    "Compare Inclusiv to accessiBe, UserWay, WAVE, axe DevTools, Siteimprove and more. See why developers choose our free accessibility scanner.",
  keywords: [
    "accessibility scanner comparison",
    "accessibe alternative",
    "userway alternative",
    "wave alternative",
    "best accessibility scanner",
    "free wcag scanner",
  ],
  openGraph: {
    title: "Compare Accessibility Scanners | Inclusiv",
    description: "See how Inclusiv compares to accessiBe, UserWay, WAVE, and more",
  },
  alternates: {
    canonical: "https://tryinclusiv.com/compare",
  },
};

const competitors = [
  {
    slug: "accessibe",
    name: "accessiBe",
    pricing: "From $490/year",
    type: "Widget/Overlay",
    rating: "Mixed reviews",
  },
  {
    slug: "userway",
    name: "UserWay",
    pricing: "From $490/year",
    type: "Widget/Overlay",
    rating: "Mixed reviews",
  },
  {
    slug: "wave",
    name: "WAVE",
    pricing: "Free",
    type: "Scanner only",
    rating: "Trusted tool",
  },
  {
    slug: "axe",
    name: "axe DevTools",
    pricing: "From $400/month",
    type: "Developer tool",
    rating: "Industry standard",
  },
  {
    slug: "siteimprove",
    name: "Siteimprove",
    pricing: "$10K+/year",
    type: "Enterprise platform",
    rating: "Enterprise-grade",
  },
  {
    slug: "audioeye",
    name: "AudioEye",
    pricing: "From $199/month",
    type: "Hybrid",
    rating: "Mixed reviews",
  },
  {
    slug: "lighthouse",
    name: "Lighthouse",
    pricing: "Free",
    type: "Basic scanner",
    rating: "Google tool",
  },
];

export default function ComparePage() {
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
            Try Free
          </Link>
        </div>
      </header>

      <main className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          {/* Hero */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Compare Accessibility Scanners
            </h1>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              See how Inclusiv compares to other accessibility tools. We believe in
              transparency and letting you make an informed choice.
            </p>
          </div>

          {/* Inclusiv Highlight */}
          <div className="bg-gradient-to-br from-indigo-500/10 via-zinc-900 to-zinc-900 border border-indigo-500/20 rounded-2xl p-8 mb-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span className="text-yellow-400 font-medium">Our Approach</span>
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">
                  Why Inclusiv Is Different
                </h2>
                <ul className="space-y-3">
                  {[
                    "100% free - no hidden costs or subscriptions",
                    "Copy-paste code fixes for every issue",
                    "Uses axe-core (same engine as Microsoft & Google)",
                    "No overlays or widgets - real fixes only",
                    "No signup required - instant results",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-zinc-300">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="text-center">
                <div className="inline-block p-6 bg-zinc-900/50 rounded-xl">
                  <div className="text-5xl font-bold text-white mb-2">$0</div>
                  <div className="text-zinc-400">Forever free</div>
                  <Link
                    href="/#scanner"
                    className="inline-flex items-center gap-2 mt-4 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg transition-colors"
                  >
                    Try Now
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Comparison Table */}
          <div className="mb-12 overflow-x-auto">
            <h2 className="text-2xl font-bold text-white mb-6">Quick Comparison</h2>
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="text-left py-4 px-4 text-zinc-400 font-medium">Tool</th>
                  <th className="text-left py-4 px-4 text-zinc-400 font-medium">Pricing</th>
                  <th className="text-left py-4 px-4 text-zinc-400 font-medium">Type</th>
                  <th className="text-center py-4 px-4 text-zinc-400 font-medium">
                    Code Fixes
                  </th>
                  <th className="text-center py-4 px-4 text-zinc-400 font-medium">Free</th>
                  <th className="text-left py-4 px-4 text-zinc-400 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {/* Inclusiv Row */}
                <tr className="border-b border-indigo-500/30 bg-indigo-500/5">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-indigo-500" />
                      <span className="text-white font-semibold">Inclusiv</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-green-400 font-medium">Free</td>
                  <td className="py-4 px-4 text-zinc-300">Scanner + Fixes</td>
                  <td className="py-4 px-4 text-center">
                    <Check className="w-5 h-5 text-green-500 mx-auto" />
                  </td>
                  <td className="py-4 px-4 text-center">
                    <Check className="w-5 h-5 text-green-500 mx-auto" />
                  </td>
                  <td className="py-4 px-4">
                    <Link
                      href="/#scanner"
                      className="text-indigo-400 hover:text-indigo-300 text-sm font-medium"
                    >
                      Try Now →
                    </Link>
                  </td>
                </tr>

                {/* Competitor Rows */}
                {competitors.map((comp) => (
                  <tr key={comp.slug} className="border-b border-zinc-800/50">
                    <td className="py-4 px-4 text-zinc-300">{comp.name}</td>
                    <td className="py-4 px-4 text-zinc-400">{comp.pricing}</td>
                    <td className="py-4 px-4 text-zinc-400">{comp.type}</td>
                    <td className="py-4 px-4 text-center">
                      {comp.slug === "wave" || comp.slug === "lighthouse" ? (
                        <X className="w-5 h-5 text-red-500 mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-red-500 mx-auto" />
                      )}
                    </td>
                    <td className="py-4 px-4 text-center">
                      {comp.pricing === "Free" ? (
                        <Check className="w-5 h-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-red-500 mx-auto" />
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <Link
                        href={`/compare/${comp.slug}`}
                        className="text-zinc-400 hover:text-zinc-300 text-sm"
                      >
                        Compare →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Comparison Cards */}
          <h2 className="text-2xl font-bold text-white mb-6">Detailed Comparisons</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {competitors.map((comp) => (
              <Link
                key={comp.slug}
                href={`/compare/${comp.slug}`}
                className="group p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl hover:border-indigo-500/50 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-white group-hover:text-indigo-400 transition-colors">
                    Inclusiv vs {comp.name}
                  </h3>
                  <ArrowRight className="w-5 h-5 text-zinc-600 group-hover:text-indigo-400 transition-colors" />
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-500">Their pricing:</span>
                    <span className="text-zinc-300">{comp.pricing}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-500">Type:</span>
                    <span className="text-zinc-300">{comp.type}</span>
                  </div>
                </div>

                <div className="text-sm text-indigo-400">See full comparison →</div>
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              Ready to Try the Best Free Scanner?
            </h2>
            <p className="text-zinc-400 mb-8 max-w-md mx-auto">
              See for yourself why developers prefer Inclusiv. Free scan, instant results,
              copy-paste fixes.
            </p>
            <Link
              href="/#scanner"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-500/25 text-lg"
            >
              Start Free Scan
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-8">
        <div className="max-w-6xl mx-auto px-6 text-center text-sm text-zinc-500">
          <p>
            &copy; {new Date().getFullYear()} Inclusiv. Free accessibility scanner
            comparison.
          </p>
        </div>
      </footer>
    </div>
  );
}
