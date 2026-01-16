import type { Metadata } from "next";
import Link from "next/link";
import { Shield, ArrowRight, Globe, Euro, Calendar } from "lucide-react";
import { euCountries, type CountryKey } from "@/lib/seo-data";

export const metadata: Metadata = {
  title: "EU Country Accessibility Laws | EAA Compliance by Country",
  description:
    "Check accessibility compliance by EU country. Find local accessibility laws, enforcement bodies, and penalties for Germany, France, Spain, and 24 more EU nations.",
  keywords: [
    "EU accessibility laws",
    "EAA by country",
    "Germany accessibility law",
    "France accessibility law",
    "WCAG compliance EU",
    "European Accessibility Act countries",
  ],
  openGraph: {
    title: "EU Accessibility Laws by Country | Inclusiv",
    description: "Local accessibility laws and penalties for all 27 EU countries",
  },
  alternates: {
    canonical: "https://tryinclusiv.com/lp/country",
  },
};

export default function CountryIndexPage() {
  const countryKeys = Object.keys(euCountries) as CountryKey[];

  // Sort by penalty amount (roughly)
  const sortedCountries = countryKeys.sort((a, b) => {
    const penaltyA = parseInt(euCountries[a].penalties.replace(/[^0-9]/g, "")) || 0;
    const penaltyB = parseInt(euCountries[b].penalties.replace(/[^0-9]/g, "")) || 0;
    return penaltyB - penaltyA;
  });

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
              EU Accessibility Laws by Country
            </h1>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              Each EU member state has implemented the European Accessibility Act
              with local laws and penalties. Find your country below.
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl text-center">
              <Globe className="w-8 h-8 text-indigo-500 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">27</div>
              <div className="text-zinc-400">EU Countries</div>
            </div>
            <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl text-center">
              <Euro className="w-8 h-8 text-red-500 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">€500K</div>
              <div className="text-zinc-400">Highest Penalty</div>
            </div>
            <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl text-center">
              <Calendar className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">June 2025</div>
              <div className="text-zinc-400">Enforcement Deadline</div>
            </div>
          </div>

          {/* Country Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sortedCountries.map((key) => {
              const country = euCountries[key];
              return (
                <Link
                  key={key}
                  href={`/lp/country/${key}`}
                  className="group p-5 bg-zinc-900/50 border border-zinc-800 rounded-xl hover:border-indigo-500/50 transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h2 className="text-lg font-semibold text-white group-hover:text-indigo-400 transition-colors">
                      {country.name}
                    </h2>
                    <ArrowRight className="w-5 h-5 text-zinc-600 group-hover:text-indigo-400 transition-colors" />
                  </div>

                  <p className="text-sm text-indigo-400 mb-3">{country.localLaw}</p>

                  <div className="flex items-center gap-3">
                    <span className="text-xs px-2 py-1 bg-red-500/10 text-red-400 rounded">
                      {country.penalties}
                    </span>
                    <span className="text-xs px-2 py-1 bg-zinc-800 text-zinc-400 rounded">
                      {country.deadline}
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
                Check Your EU Compliance
              </h2>
              <p className="text-zinc-400 mb-6 max-w-md">
                Our scanner checks your website against all 27 EU countries&apos;
                accessibility requirements.
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
            &copy; {new Date().getFullYear()} Inclusiv. EU accessibility compliance
            scanner for all 27 member states.
          </p>
        </div>
      </footer>
    </div>
  );
}
