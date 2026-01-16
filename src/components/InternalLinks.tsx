"use client";

import Link from "next/link";
import { ArrowRight, FileText, Globe, Scale, Users } from "lucide-react";
import { industries, euCountries, type IndustryKey, type CountryKey } from "@/lib/seo-data";

// Related Industries Component
export function RelatedIndustries({
  currentSlug,
  limit = 4,
}: {
  currentSlug?: string;
  limit?: number;
}) {
  const industryKeys = (Object.keys(industries) as IndustryKey[]).filter((k) => k !== currentSlug);
  const shuffled = industryKeys.sort(() => 0.5 - Math.random()).slice(0, limit);

  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <Users className="w-5 h-5 text-indigo-400" />
        <h3 className="text-lg font-semibold text-white">
          Accessibility by Industry
        </h3>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {shuffled.map((slug) => (
          <Link
            key={slug}
            href={`/lp/industry/${slug}`}
            className="flex items-center gap-2 p-3 bg-zinc-800/50 hover:bg-zinc-800 rounded-lg transition-colors group"
          >
            <span className="text-sm text-zinc-300 group-hover:text-white">
              {industries[slug].name}
            </span>
            <ArrowRight className="w-3 h-3 text-zinc-500 group-hover:text-indigo-400 ml-auto" />
          </Link>
        ))}
      </div>
      <Link
        href="/lp/industry"
        className="mt-4 inline-flex items-center gap-1 text-sm text-indigo-400 hover:text-indigo-300"
      >
        View all industries <ArrowRight className="w-3 h-3" />
      </Link>
    </div>
  );
}

// Related Countries Component
export function RelatedCountries({
  currentSlug,
  limit = 4,
}: {
  currentSlug?: string;
  limit?: number;
}) {
  const countryKeys = (Object.keys(euCountries) as CountryKey[]).filter((k) => k !== currentSlug);
  const shuffled = countryKeys.sort(() => 0.5 - Math.random()).slice(0, limit);

  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <Globe className="w-5 h-5 text-indigo-400" />
        <h3 className="text-lg font-semibold text-white">EAA by Country</h3>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {shuffled.map((slug) => (
          <Link
            key={slug}
            href={`/lp/country/${slug}`}
            className="flex items-center gap-2 p-3 bg-zinc-800/50 hover:bg-zinc-800 rounded-lg transition-colors group"
          >
            <span className="text-sm text-zinc-300 group-hover:text-white">
              {euCountries[slug].name}
            </span>
            <ArrowRight className="w-3 h-3 text-zinc-500 group-hover:text-indigo-400 ml-auto" />
          </Link>
        ))}
      </div>
      <Link
        href="/lp/country"
        className="mt-4 inline-flex items-center gap-1 text-sm text-indigo-400 hover:text-indigo-300"
      >
        View all EU countries <ArrowRight className="w-3 h-3" />
      </Link>
    </div>
  );
}

// Compare Tools Component
export function CompareTools({ currentSlug }: { currentSlug?: string }) {
  const competitors = [
    { slug: "accessibe", name: "accessiBe" },
    { slug: "userway", name: "UserWay" },
    { slug: "wave", name: "WAVE" },
    { slug: "axe", name: "axe DevTools" },
    { slug: "siteimprove", name: "Siteimprove" },
    { slug: "audioeye", name: "AudioEye" },
  ].filter((c) => c.slug !== currentSlug);

  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <Scale className="w-5 h-5 text-indigo-400" />
        <h3 className="text-lg font-semibold text-white">Compare Tools</h3>
      </div>
      <div className="space-y-2">
        {competitors.slice(0, 4).map((comp) => (
          <Link
            key={comp.slug}
            href={`/compare/${comp.slug}`}
            className="flex items-center justify-between p-3 bg-zinc-800/50 hover:bg-zinc-800 rounded-lg transition-colors group"
          >
            <span className="text-sm text-zinc-300 group-hover:text-white">
              Inclusiv vs {comp.name}
            </span>
            <ArrowRight className="w-3 h-3 text-zinc-500 group-hover:text-indigo-400" />
          </Link>
        ))}
      </div>
      <Link
        href="/compare"
        className="mt-4 inline-flex items-center gap-1 text-sm text-indigo-400 hover:text-indigo-300"
      >
        View all comparisons <ArrowRight className="w-3 h-3" />
      </Link>
    </div>
  );
}

// Resources Component
export function RelatedResources() {
  const resources = [
    {
      href: "/resources/eaa-compliance-checklist",
      title: "Free EAA Checklist",
      description: "50+ point compliance audit",
      icon: FileText,
    },
    {
      href: "/blog",
      title: "Accessibility Blog",
      description: "Tips, guides & news",
      icon: FileText,
    },
    {
      href: "/wcag",
      title: "WCAG Guidelines",
      description: "Complete reference",
      icon: FileText,
    },
  ];

  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="w-5 h-5 text-indigo-400" />
        <h3 className="text-lg font-semibold text-white">Free Resources</h3>
      </div>
      <div className="space-y-3">
        {resources.map((resource) => (
          <Link
            key={resource.href}
            href={resource.href}
            className="flex items-start gap-3 p-3 bg-zinc-800/50 hover:bg-zinc-800 rounded-lg transition-colors group"
          >
            <resource.icon className="w-5 h-5 text-zinc-500 mt-0.5" />
            <div>
              <div className="text-sm font-medium text-zinc-300 group-hover:text-white">
                {resource.title}
              </div>
              <div className="text-xs text-zinc-500">{resource.description}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

// Full Sidebar Component
export function InternalLinksSidebar({
  currentIndustry,
  currentCountry,
  currentCompetitor,
}: {
  currentIndustry?: string;
  currentCountry?: string;
  currentCompetitor?: string;
}) {
  return (
    <div className="space-y-6">
      <RelatedResources />
      <RelatedIndustries currentSlug={currentIndustry} limit={4} />
      <RelatedCountries currentSlug={currentCountry} limit={4} />
      <CompareTools currentSlug={currentCompetitor} />
    </div>
  );
}

// Footer Links Component (for bottom of pages)
export function FooterInternalLinks() {
  return (
    <section className="py-16 border-t border-zinc-800">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-white text-center mb-8">
          Explore More Resources
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <RelatedIndustries limit={6} />
          <RelatedCountries limit={6} />
          <CompareTools />
        </div>
      </div>
    </section>
  );
}
