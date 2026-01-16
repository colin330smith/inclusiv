import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  industries,
  platforms,
  IndustryKey,
  PlatformKey
} from '@/lib/seo-data';
import {
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Shield,
  TrendingUp,
  Zap,
  Globe,
  FileCheck,
  Clock
} from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

function isIndustry(slug: string): slug is IndustryKey {
  return slug in industries;
}

function isPlatform(slug: string): slug is PlatformKey {
  return slug in platforms;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  if (isIndustry(slug)) {
    const industry = industries[slug];
    return {
      title: `${industry.title} | WCAG 2.1 AA | Inclusiv`,
      description: industry.description,
      openGraph: {
        title: industry.title,
        description: industry.description,
        type: 'website',
        url: `https://inclusiv.dev/accessibility/${slug}`,
      },
      twitter: {
        card: 'summary_large_image',
        title: industry.title,
        description: industry.description,
      },
      alternates: {
        canonical: `https://inclusiv.dev/accessibility/${slug}`,
      },
    };
  }

  if (isPlatform(slug)) {
    const platform = platforms[slug];
    return {
      title: `${platform.title} | WCAG 2.1 AA | Inclusiv`,
      description: platform.description,
      openGraph: {
        title: platform.title,
        description: platform.description,
        type: 'website',
        url: `https://inclusiv.dev/accessibility/${slug}`,
      },
      twitter: {
        card: 'summary_large_image',
        title: platform.title,
        description: platform.description,
      },
      alternates: {
        canonical: `https://inclusiv.dev/accessibility/${slug}`,
      },
    };
  }

  return {
    title: 'Not Found',
  };
}

export function generateStaticParams() {
  const industryParams = Object.keys(industries).map((slug) => ({ slug }));
  const platformParams = Object.keys(platforms).map((slug) => ({ slug }));
  return [...industryParams, ...platformParams];
}

export default async function AccessibilityPage({ params }: PageProps) {
  const { slug } = await params;

  if (isIndustry(slug)) {
    return <IndustryPage slug={slug} />;
  }

  if (isPlatform(slug)) {
    return <PlatformPage slug={slug} />;
  }

  notFound();
}

function IndustryPage({ slug }: { slug: IndustryKey }) {
  const industry = industries[slug];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: industry.title,
    description: industry.description,
    provider: {
      '@type': 'Organization',
      name: 'Inclusiv',
      url: 'https://inclusiv.dev',
    },
    serviceType: 'Web Accessibility Compliance',
    areaServed: 'Worldwide',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen bg-zinc-950">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-zinc-800">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-purple-500/10" />
          <div className="relative max-w-6xl mx-auto px-4 py-24 sm:py-32">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-sm mb-6">
              <Shield className="w-4 h-4" />
              {industry.name} Accessibility
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 max-w-4xl">
              {industry.hero}
            </h1>
            <p className="text-xl text-zinc-400 max-w-2xl mb-8">
              {industry.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/#scanner"
                className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-colors"
              >
                <Zap className="w-5 h-5" />
                Free Accessibility Scan
              </Link>
              <Link
                href="/demo"
                className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-medium rounded-lg transition-colors border border-zinc-700"
              >
                Book a Demo
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="border-b border-zinc-800 py-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
                <div className="text-3xl font-bold text-white mb-2">{industry.stats.marketSize}</div>
                <div className="text-zinc-400">Global Market Size</div>
              </div>
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
                <div className="text-3xl font-bold text-white mb-2">{industry.stats.disabledSpending}</div>
                <div className="text-zinc-400">Disabled Consumer Spending</div>
              </div>
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
                <div className="text-3xl font-bold text-red-400 mb-2">{industry.stats.lawsuitRisk}</div>
                <div className="text-zinc-400">of Sites Have Critical Issues</div>
              </div>
            </div>
          </div>
        </section>

        {/* Pain Points Section */}
        <section className="py-20 border-b border-zinc-800">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-white mb-4">
              Common Accessibility Issues in {industry.name}
            </h2>
            <p className="text-zinc-400 mb-12 max-w-2xl">
              These are the most frequent accessibility barriers we find on {industry.name.toLowerCase()} websites.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {industry.painPoints.map((point, index) => (
                <div
                  key={index}
                  className="flex gap-4 p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl"
                >
                  <div className="flex-shrink-0">
                    <AlertTriangle className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-white">{point}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Regulations Section */}
        <section className="py-20 border-b border-zinc-800">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-white mb-4">
              Regulations Affecting {industry.name}
            </h2>
            <p className="text-zinc-400 mb-12 max-w-2xl">
              {industry.name} businesses must comply with these accessibility regulations.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {industry.regulations.map((reg, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl"
                >
                  <FileCheck className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-white font-medium">{reg}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section className="py-20 border-b border-zinc-800">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">
                  How Inclusiv Helps {industry.name} Companies
                </h2>
                <div className="space-y-4">
                  {[
                    'Automated WCAG 2.1 AA compliance scanning',
                    'Industry-specific issue detection and remediation',
                    'Continuous monitoring and alerting',
                    'Detailed reports for stakeholders and auditors',
                    'Priority scoring based on user impact',
                    'Step-by-step fix instructions for developers',
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
                  <Globe className="w-16 h-16 text-indigo-400 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Start Your Free Scan
                  </h3>
                  <p className="text-zinc-400 mb-6">
                    Get an instant accessibility report for your {industry.name.toLowerCase()} website.
                  </p>
                  <Link
                    href="/#scanner"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-colors w-full justify-center"
                  >
                    <Zap className="w-5 h-5" />
                    Scan Your Website Free
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to make your {industry.name.toLowerCase()} website accessible?
            </h2>
            <p className="text-xl text-zinc-400 mb-8">
              Join hundreds of {industry.name.toLowerCase()} companies using Inclusiv to achieve WCAG compliance.
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

function PlatformPage({ slug }: { slug: PlatformKey }) {
  const platform = platforms[slug];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: platform.title,
    description: platform.description,
    provider: {
      '@type': 'Organization',
      name: 'Inclusiv',
      url: 'https://inclusiv.dev',
    },
    serviceType: 'Web Accessibility Compliance',
    areaServed: 'Worldwide',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen bg-zinc-950">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-zinc-800">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-cyan-500/10" />
          <div className="relative max-w-6xl mx-auto px-4 py-24 sm:py-32">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm mb-6">
              <Globe className="w-4 h-4" />
              {platform.name} Accessibility
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 max-w-4xl">
              {platform.hero}
            </h1>
            <p className="text-xl text-zinc-400 max-w-2xl mb-8">
              {platform.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/#scanner"
                className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-colors"
              >
                <Zap className="w-5 h-5" />
                Scan Your {platform.name} Site
              </Link>
              <Link
                href="/demo"
                className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-medium rounded-lg transition-colors border border-zinc-700"
              >
                Book a Demo
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="border-b border-zinc-800 py-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
                <div className="text-3xl font-bold text-white mb-2">{platform.marketShare}</div>
                <div className="text-zinc-400">CMS Market Share</div>
              </div>
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
                <div className="text-3xl font-bold text-amber-400 mb-2">{platform.avgIssues}</div>
                <div className="text-zinc-400">Avg. Issues Per Site</div>
              </div>
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
                <div className="flex items-center gap-2 text-3xl font-bold text-green-400 mb-2">
                  <Clock className="w-8 h-8" />
                  30s
                </div>
                <div className="text-zinc-400">Average Scan Time</div>
              </div>
            </div>
          </div>
        </section>

        {/* Common Issues Section */}
        <section className="py-20 border-b border-zinc-800">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-white mb-4">
              Common {platform.name} Accessibility Issues
            </h2>
            <p className="text-zinc-400 mb-12 max-w-2xl">
              These are the most frequent accessibility problems we find on {platform.name} websites.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {platform.commonIssues.map((issue, index) => (
                <div
                  key={index}
                  className="flex gap-4 p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl"
                >
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-amber-500/10 rounded-lg flex items-center justify-center">
                      <span className="text-amber-400 font-bold">{index + 1}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-white">{issue}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 border-b border-zinc-800">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-white mb-4 text-center">
              How Inclusiv Works with {platform.name}
            </h2>
            <p className="text-zinc-400 mb-12 text-center max-w-2xl mx-auto">
              Get your {platform.name} site WCAG 2.1 AA compliant in three simple steps.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: '1',
                  title: 'Scan Your Site',
                  description: `Enter your ${platform.name} site URL and we\'ll crawl every page for accessibility issues.`,
                },
                {
                  step: '2',
                  title: 'Review Issues',
                  description: `Get a detailed report of all WCAG violations specific to ${platform.name} sites.`,
                },
                {
                  step: '3',
                  title: 'Fix & Monitor',
                  description: `Follow our ${platform.name}-specific fix guides and set up continuous monitoring.`,
                },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-indigo-500/10 border border-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-indigo-400 font-bold text-lg">{item.step}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-zinc-400">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 border-b border-zinc-800">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">
                  {platform.name}-Specific Features
                </h2>
                <div className="space-y-4">
                  {[
                    `Detection of ${platform.name} theme accessibility issues`,
                    `${platform.name}-specific remediation guidance`,
                    'Code snippets ready to copy and paste',
                    'Integration guides for your development workflow',
                    'Monitoring across theme updates',
                    'Support for custom ${platform.name} implementations',
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
                  <TrendingUp className="w-16 h-16 text-green-400 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Improve Your Score
                  </h3>
                  <p className="text-zinc-400 mb-6">
                    Most {platform.name} sites improve their accessibility score by 40+ points within the first month.
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

        {/* CTA Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Make your {platform.name} site accessible today
            </h2>
            <p className="text-xl text-zinc-400 mb-8">
              Join thousands of {platform.name} users who trust Inclusiv for accessibility compliance.
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
