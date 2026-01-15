import type { Metadata } from "next";
import Link from "next/link";
import {
  Shield,
  TrendingUp,
  Users,
  Clock,
  CheckCircle,
  ArrowRight,
  Building,
  ShoppingCart,
  Briefcase,
  Globe,
} from "lucide-react";
import { SiteFooter } from "@/components/seo/SiteFooter";

export const metadata: Metadata = {
  title: "Customer Case Studies | EAA Compliance Success Stories | Inclusiv",
  description: "See how businesses achieved EAA and WCAG compliance with Inclusiv. Real results from e-commerce, SaaS, and enterprise companies.",
  keywords: ["accessibility case studies", "EAA compliance success", "WCAG compliance results", "accessibility ROI"],
  openGraph: {
    title: "Customer Case Studies | Inclusiv",
    description: "See how businesses achieved accessibility compliance with Inclusiv",
    type: "website",
  },
};

const caseStudies = [
  {
    id: "nordic-fashion",
    company: "Nordic Fashion Co.",
    industry: "E-commerce",
    logo: ShoppingCart,
    location: "Stockholm, Sweden",
    challenge: "Facing the EAA deadline with 200+ product pages and no accessibility strategy",
    results: [
      { metric: "87%", label: "Accessibility score improvement" },
      { metric: "3 weeks", label: "Time to compliance" },
      { metric: "EUR 0", label: "Fines avoided" },
      { metric: "12%", label: "Conversion rate increase" },
    ],
    quote: "Inclusiv helped us identify 234 accessibility issues across our site. The AI-powered fixes meant our developers could implement changes in days, not months.",
    author: "Anna Lindberg",
    role: "Head of Digital, Nordic Fashion Co.",
    tags: ["E-commerce", "Fashion", "WCAG 2.1 AA", "EAA Compliance"],
    featured: true,
  },
  {
    id: "fintech-munich",
    company: "FinanceFlow GmbH",
    industry: "Financial Services",
    logo: Building,
    location: "Munich, Germany",
    challenge: "Complex web application with forms, charts, and real-time data needed accessibility overhaul",
    results: [
      { metric: "100%", label: "WCAG 2.1 AA compliant" },
      { metric: "47", label: "Critical issues resolved" },
      { metric: "6 weeks", label: "Full remediation" },
      { metric: "24/7", label: "Automated monitoring" },
    ],
    quote: "As a fintech serving EU customers, EAA compliance wasn&apos;t optional. Inclusiv&apos;s detailed code suggestions made our accessibility fixes precise and efficient.",
    author: "Thomas Mueller",
    role: "CTO, FinanceFlow GmbH",
    tags: ["FinTech", "Banking", "Complex Forms", "Real-time Data"],
    featured: true,
  },
  {
    id: "saas-amsterdam",
    company: "CloudDocs B.V.",
    industry: "SaaS",
    logo: Briefcase,
    location: "Amsterdam, Netherlands",
    challenge: "B2B SaaS platform with enterprise clients requiring accessibility compliance documentation",
    results: [
      { metric: "156", label: "Issues identified" },
      { metric: "100%", label: "Compliance certificate" },
      { metric: "4", label: "Enterprise contracts won" },
      { metric: "EUR 2M+", label: "New ARR attributed" },
    ],
    quote: "Our enterprise clients started asking for VPATs and accessibility documentation. Inclusiv helped us not just become compliant, but prove it with certificates our sales team could share.",
    author: "Pieter van der Berg",
    role: "CEO, CloudDocs B.V.",
    tags: ["SaaS", "B2B", "Enterprise", "Compliance Certificate"],
    featured: false,
  },
  {
    id: "travel-paris",
    company: "EuroTravel SA",
    industry: "Travel & Hospitality",
    logo: Globe,
    location: "Paris, France",
    challenge: "Multi-language travel booking site with complex interactive elements and third-party widgets",
    results: [
      { metric: "92%", label: "Score improvement" },
      { metric: "8 languages", label: "Supported" },
      { metric: "15%", label: "Bounce rate reduction" },
      { metric: "Ongoing", label: "Continuous monitoring" },
    ],
    quote: "With booking flows in 8 languages and dozens of third-party integrations, we thought accessibility would be impossible. Inclusiv made it manageable.",
    author: "Marie Dubois",
    role: "Product Director, EuroTravel SA",
    tags: ["Travel", "Multi-language", "Booking Flow", "Third-party Widgets"],
    featured: false,
  },
];

const stats = [
  { value: "500+", label: "Websites scanned" },
  { value: "50,000+", label: "Issues detected" },
  { value: "98%", label: "Customer satisfaction" },
  { value: "EUR 0", label: "Customer fines" },
];

export default function CaseStudiesPage() {
  const featuredStudies = caseStudies.filter((cs) => cs.featured);
  const otherStudies = caseStudies.filter((cs) => !cs.featured);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-indigo-500" />
            <span className="text-xl font-bold text-white">Inclusiv</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link
              href="/pricing"
              className="text-zinc-400 hover:text-white transition-colors text-sm"
            >
              Pricing
            </Link>
            <Link
              href="/resources"
              className="text-zinc-400 hover:text-white transition-colors text-sm"
            >
              Resources
            </Link>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="py-16 md:py-24 border-b border-zinc-800">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 rounded-full mb-6">
              <TrendingUp className="w-4 h-4 text-indigo-400" />
              <span className="text-indigo-400 text-sm font-medium">Customer Success Stories</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Real Results from Real Companies
            </h1>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-12">
              See how businesses across Europe achieved EAA compliance and improved their
              accessibility with Inclusiv.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-zinc-500 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Case Studies */}
        <section className="py-16 md:py-20">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-2xl font-bold text-white mb-10">Featured Success Stories</h2>

            <div className="grid lg:grid-cols-2 gap-8">
              {featuredStudies.map((study) => (
                <div
                  key={study.id}
                  className="bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-700 transition-colors"
                >
                  {/* Header */}
                  <div className="p-6 border-b border-zinc-800">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-indigo-500/10 rounded-xl flex items-center justify-center">
                          <study.logo className="w-7 h-7 text-indigo-500" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white">{study.company}</h3>
                          <p className="text-zinc-500 text-sm">{study.location}</p>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 text-xs font-medium rounded-full">
                        {study.industry}
                      </span>
                    </div>
                    <p className="text-zinc-400 text-sm">{study.challenge}</p>
                  </div>

                  {/* Results Grid */}
                  <div className="grid grid-cols-2 gap-px bg-zinc-800">
                    {study.results.map((result) => (
                      <div key={result.label} className="bg-zinc-900 p-4 text-center">
                        <div className="text-2xl font-bold text-indigo-400 mb-1">
                          {result.metric}
                        </div>
                        <div className="text-xs text-zinc-500">{result.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Quote */}
                  <div className="p-6">
                    <blockquote className="text-zinc-300 mb-4 italic">
                      &quot;{study.quote}&quot;
                    </blockquote>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {study.author.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <p className="text-white font-medium">{study.author}</p>
                        <p className="text-zinc-500 text-sm">{study.role}</p>
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="px-6 pb-6">
                    <div className="flex flex-wrap gap-2">
                      {study.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-zinc-800 text-zinc-400 text-xs rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Other Case Studies */}
        <section className="py-16 border-t border-zinc-800">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-2xl font-bold text-white mb-10">More Success Stories</h2>

            <div className="grid md:grid-cols-2 gap-6">
              {otherStudies.map((study) => (
                <div
                  key={study.id}
                  className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-colors"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-zinc-800 rounded-lg flex items-center justify-center flex-shrink-0">
                      <study.logo className="w-6 h-6 text-zinc-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{study.company}</h3>
                      <p className="text-zinc-500 text-sm">{study.industry} &bull; {study.location}</p>
                    </div>
                  </div>
                  <p className="text-zinc-400 text-sm mb-4">{study.challenge}</p>
                  <div className="flex flex-wrap gap-4 mb-4">
                    {study.results.slice(0, 2).map((result) => (
                      <div key={result.label} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-zinc-300">
                          <span className="font-semibold text-white">{result.metric}</span>{" "}
                          {result.label}
                        </span>
                      </div>
                    ))}
                  </div>
                  <blockquote className="text-zinc-400 text-sm italic border-l-2 border-zinc-700 pl-4">
                    &quot;{study.quote}&quot;
                    <footer className="mt-2 text-zinc-500 not-italic">
                      — {study.author}, {study.role.split(",")[0]}
                    </footer>
                  </blockquote>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 border-t border-zinc-800">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="p-10 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-indigo-500/10 border border-indigo-500/20 rounded-2xl">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to become our next success story?
              </h2>
              <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
                Join hundreds of businesses that have achieved EAA compliance with Inclusiv.
                Start with a free scan today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-colors"
                >
                  Start Free Scan
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold rounded-xl transition-colors border border-zinc-700"
                >
                  View Pricing
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
