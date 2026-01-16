import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { euCountries, CountryKey } from '@/lib/seo-data';
import {
  Shield,
  Calendar,
  Scale,
  Globe,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Zap,
  FileCheck,
  Building2,
  Users,
  Euro,
} from 'lucide-react';

interface PageProps {
  params: Promise<{ country: string }>;
}

function isCountry(slug: string): slug is CountryKey {
  return slug in euCountries;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { country: slug } = await params;

  if (!isCountry(slug)) {
    return { title: 'Not Found' };
  }

  const country = euCountries[slug];
  return {
    title: `${country.title} | European Accessibility Act | Inclusiv`,
    description: country.description,
    openGraph: {
      title: country.title,
      description: country.description,
      type: 'website',
      url: `https://inclusiv.dev/compliance/${slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: country.title,
      description: country.description,
    },
    alternates: {
      canonical: `https://inclusiv.dev/compliance/${slug}`,
    },
  };
}

export function generateStaticParams() {
  return Object.keys(euCountries).map((country) => ({ country }));
}

export default async function CompliancePage({ params }: PageProps) {
  const { country: slug } = await params;

  if (!isCountry(slug)) {
    notFound();
  }

  const country = euCountries[slug];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: country.title,
    description: country.description,
    author: {
      '@type': 'Organization',
      name: 'Inclusiv',
      url: 'https://inclusiv.dev',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Inclusiv',
      url: 'https://inclusiv.dev',
    },
    about: {
      '@type': 'Thing',
      name: 'European Accessibility Act',
      description: 'EU directive requiring digital accessibility compliance',
    },
  };

  // Get neighboring countries for internal linking
  const countryKeys = Object.keys(euCountries) as CountryKey[];
  const currentIndex = countryKeys.indexOf(slug);
  const relatedCountries = countryKeys
    .filter((_, index) => index !== currentIndex)
    .slice(0, 4);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen bg-zinc-950">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-zinc-800">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-indigo-500/10" />
          <div className="relative max-w-6xl mx-auto px-4 py-24 sm:py-32">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm mb-6">
              <Globe className="w-4 h-4" />
              {country.nativeName}
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 max-w-4xl">
              {country.title}
            </h1>
            <p className="text-xl text-zinc-400 max-w-2xl mb-8">
              {country.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/#scanner"
                className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-colors"
              >
                <Zap className="w-5 h-5" />
                Check Your Compliance
              </Link>
              <Link
                href="/eaa-compliance"
                className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-medium rounded-lg transition-colors border border-zinc-700"
              >
                Learn About EAA
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Key Info Cards */}
        <section className="border-b border-zinc-800 py-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
                <Calendar className="w-8 h-8 text-red-400 mb-4" />
                <div className="text-2xl font-bold text-white mb-1">{country.deadline}</div>
                <div className="text-zinc-400 text-sm">Compliance Deadline</div>
              </div>
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
                <Scale className="w-8 h-8 text-amber-400 mb-4" />
                <div className="text-lg font-bold text-white mb-1">{country.penalties}</div>
                <div className="text-zinc-400 text-sm">Potential Penalties</div>
              </div>
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
                <Users className="w-8 h-8 text-blue-400 mb-4" />
                <div className="text-2xl font-bold text-white mb-1">{country.population}</div>
                <div className="text-zinc-400 text-sm">Population</div>
              </div>
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
                <Euro className="w-8 h-8 text-green-400 mb-4" />
                <div className="text-2xl font-bold text-white mb-1">{country.gdp}</div>
                <div className="text-zinc-400 text-sm">GDP</div>
              </div>
            </div>
          </div>
        </section>

        {/* Local Law Section */}
        <section className="py-20 border-b border-zinc-800">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">
                  {country.name}&apos;s Accessibility Law
                </h2>
                <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 mb-6">
                  <div className="flex items-start gap-4">
                    <FileCheck className="w-8 h-8 text-indigo-400 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {country.localLaw}
                      </h3>
                      <p className="text-zinc-400">
                        {country.name}&apos;s national implementation of the European Accessibility Act (EAA),
                        requiring digital products and services to meet WCAG 2.1 Level AA standards.
                      </p>
                    </div>
                  </div>
                </div>
                <p className="text-zinc-400 mb-6">
                  The European Accessibility Act requires all EU member states to implement
                  accessibility requirements for digital products and services. In {country.name},
                  businesses must comply by <strong className="text-white">{country.deadline}</strong>.
                </p>
              </div>
              <div className="bg-gradient-to-br from-red-500/10 to-amber-500/10 border border-red-500/20 rounded-2xl p-8">
                <AlertTriangle className="w-12 h-12 text-red-400 mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">
                  Deadline Approaching
                </h3>
                <p className="text-zinc-300 mb-6">
                  The EAA compliance deadline of {country.deadline} applies to all businesses
                  serving customers in {country.name}. Non-compliance can result in penalties
                  of up to {country.penalties}.
                </p>
                <Link
                  href="/#scanner"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-medium rounded-lg transition-colors w-full justify-center"
                >
                  Check Your Compliance Now
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Who Must Comply */}
        <section className="py-20 border-b border-zinc-800">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-white mb-4 text-center">
              Who Must Comply in {country.name}?
            </h2>
            <p className="text-zinc-400 mb-12 text-center max-w-2xl mx-auto">
              The EAA applies to businesses providing these products and services to consumers in {country.name}.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Building2,
                  title: 'E-commerce Websites',
                  description: 'Online stores selling to consumers in the EU',
                },
                {
                  icon: Globe,
                  title: 'Banking Services',
                  description: 'Online banking, ATMs, and financial services',
                },
                {
                  icon: Users,
                  title: 'E-books & Publishing',
                  description: 'Digital publications and reading platforms',
                },
                {
                  icon: Shield,
                  title: 'Transport Services',
                  description: 'Booking systems for air, bus, rail, and water',
                },
                {
                  icon: FileCheck,
                  title: 'Telecom Services',
                  description: 'Phone and internet service providers',
                },
                {
                  icon: Euro,
                  title: 'Consumer Electronics',
                  description: 'Computers, smartphones, and smart TVs',
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6"
                >
                  <item.icon className="w-8 h-8 text-indigo-400 mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-zinc-400 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Requirements Section */}
        <section className="py-20 border-b border-zinc-800">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-white mb-4">
              EAA Requirements for {country.name}
            </h2>
            <p className="text-zinc-400 mb-12 max-w-2xl">
              To comply with the EAA in {country.name}, your digital products must meet these requirements.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                'WCAG 2.1 Level AA compliance for all web content',
                'Accessible mobile applications (iOS and Android)',
                'Alternative text for all non-text content',
                'Keyboard accessibility for all functionality',
                'Sufficient color contrast (4.5:1 for text)',
                'Captions and transcripts for video content',
                'Clear and consistent navigation',
                'Error prevention and clear error messages',
                'Compatibility with assistive technologies',
                'Accessibility statement published on website',
              ].map((requirement, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl"
                >
                  <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-zinc-300">{requirement}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How Inclusiv Helps */}
        <section className="py-20 border-b border-zinc-800">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">
                  How Inclusiv Helps You Comply
                </h2>
                <div className="space-y-4">
                  {[
                    'Automated WCAG 2.1 AA compliance scanning',
                    'Detailed reports showing all accessibility issues',
                    'Priority scoring to fix critical issues first',
                    'Step-by-step remediation guidance',
                    'Continuous monitoring for ongoing compliance',
                    'Accessibility statement generator',
                    'Documentation for regulatory audits',
                    'Expert support from accessibility specialists',
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-zinc-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8">
                <div className="text-center">
                  <Shield className="w-16 h-16 text-green-400 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Get Compliant Before {country.deadline}
                  </h3>
                  <p className="text-zinc-400 mb-6">
                    Start with a free accessibility scan to see where your website stands.
                  </p>
                  <Link
                    href="/#scanner"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-colors w-full justify-center"
                  >
                    <Zap className="w-5 h-5" />
                    Start Free Scan
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Countries */}
        <section className="py-20 border-b border-zinc-800">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-white mb-8">
              EAA Compliance in Other EU Countries
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedCountries.map((countryKey) => {
                const relatedCountry = euCountries[countryKey];
                return (
                  <Link
                    key={countryKey}
                    href={`/compliance/${countryKey}`}
                    className="flex items-center gap-3 p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-colors group"
                  >
                    <Globe className="w-5 h-5 text-zinc-500 group-hover:text-indigo-400 transition-colors" />
                    <span className="text-zinc-300 group-hover:text-white transition-colors">
                      {relatedCountry.name}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Don&apos;t wait until {country.deadline}
            </h2>
            <p className="text-xl text-zinc-400 mb-8">
              Start your accessibility journey today. Most businesses need 3-6 months to achieve full compliance.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-colors"
              >
                View Pricing
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-zinc-800 hover:bg-zinc-700 text-white font-medium rounded-lg transition-colors border border-zinc-700"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
