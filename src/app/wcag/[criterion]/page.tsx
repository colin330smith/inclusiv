import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { wcagCriteria, WcagCriterionKey } from '@/lib/seo-data';
import {
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Code2,
  Zap,
  Shield,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';

interface PageProps {
  params: Promise<{ criterion: string }>;
}

function isCriterion(slug: string): slug is WcagCriterionKey {
  return slug in wcagCriteria;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { criterion: slug } = await params;

  if (!isCriterion(slug)) {
    return { title: 'Not Found' };
  }

  const criterion = wcagCriteria[slug];
  const title = `WCAG ${criterion.number}: ${criterion.name} | Accessibility Guide`;
  const description = `Learn how to meet WCAG ${criterion.number} ${criterion.name}. ${criterion.description}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      url: `https://inclusiv.dev/wcag/${slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `https://inclusiv.dev/wcag/${slug}`,
    },
  };
}

export function generateStaticParams() {
  return Object.keys(wcagCriteria).map((criterion) => ({ criterion }));
}

export default async function WcagCriterionPage({ params }: PageProps) {
  const { criterion: slug } = await params;

  if (!isCriterion(slug)) {
    notFound();
  }

  const criterion = wcagCriteria[slug];

  // Get related criteria (same principle)
  const criteriaKeys = Object.keys(wcagCriteria) as WcagCriterionKey[];
  const relatedCriteria = criteriaKeys
    .filter((key) => key !== slug && wcagCriteria[key].principle === criterion.principle)
    .slice(0, 4);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: `WCAG ${criterion.number}: ${criterion.name}`,
    description: criterion.description,
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
      name: 'Web Content Accessibility Guidelines (WCAG)',
    },
  };

  const levelColors = {
    A: 'bg-green-500/10 text-green-400 border-green-500/20',
    AA: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    AAA: 'bg-red-500/10 text-red-400 border-red-500/20',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen bg-zinc-950">
        {/* Breadcrumb */}
        <div className="border-b border-zinc-800">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <nav className="flex items-center gap-2 text-sm text-zinc-500">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/wcag-checker" className="hover:text-white transition-colors">WCAG</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-zinc-300">{criterion.number}</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-zinc-800">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-purple-500/10" />
          <div className="relative max-w-6xl mx-auto px-4 py-16 sm:py-24">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${levelColors[criterion.level as keyof typeof levelColors]}`}>
                Level {criterion.level}
              </span>
              <span className="inline-flex items-center px-3 py-1 bg-zinc-800 rounded-full text-sm text-zinc-400">
                {criterion.principle}
              </span>
              <span className="inline-flex items-center px-3 py-1 bg-zinc-800 rounded-full text-sm text-zinc-400">
                {criterion.guideline}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              WCAG {criterion.number}: {criterion.name}
            </h1>
            <p className="text-xl text-zinc-400 max-w-3xl">
              {criterion.description}
            </p>
          </div>
        </section>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Column */}
            <div className="lg:col-span-2 space-y-12">
              {/* Why It Matters */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <BookOpen className="w-6 h-6 text-indigo-400" />
                  Why It Matters
                </h2>
                <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
                  <p className="text-zinc-300 leading-relaxed">
                    {criterion.whyItMatters}
                  </p>
                </div>
              </section>

              {/* How to Fix */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <Code2 className="w-6 h-6 text-green-400" />
                  How to Meet This Criterion
                </h2>
                <div className="space-y-3">
                  {criterion.howToFix.map((fix, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl"
                    >
                      <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-zinc-300">{fix}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Common Violations */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <AlertTriangle className="w-6 h-6 text-amber-400" />
                  Common Violations
                </h2>
                <div className="space-y-3">
                  {criterion.commonViolations.map((violation, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-4 bg-zinc-900/50 border border-red-500/20 rounded-xl"
                    >
                      <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                      <span className="text-zinc-300">{violation}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Official Resources */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">
                  Official WCAG Resources
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <a
                    href={`https://www.w3.org/WAI/WCAG21/Understanding/${slug.replace(/-/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-colors group"
                  >
                    <ExternalLink className="w-5 h-5 text-zinc-500 group-hover:text-indigo-400 transition-colors" />
                    <div>
                      <div className="text-white font-medium">Understanding {criterion.number}</div>
                      <div className="text-sm text-zinc-500">W3C Documentation</div>
                    </div>
                  </a>
                  <a
                    href={`https://www.w3.org/WAI/WCAG21/Techniques/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-colors group"
                  >
                    <ExternalLink className="w-5 h-5 text-zinc-500 group-hover:text-indigo-400 transition-colors" />
                    <div>
                      <div className="text-white font-medium">WCAG Techniques</div>
                      <div className="text-sm text-zinc-500">Implementation Examples</div>
                    </div>
                  </a>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Scan CTA */}
              <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-2xl p-6">
                <Shield className="w-10 h-10 text-indigo-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">
                  Check Your Site
                </h3>
                <p className="text-zinc-400 text-sm mb-4">
                  Scan your website to find {criterion.number} violations and get remediation guidance.
                </p>
                <Link
                  href="/#scanner"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-colors w-full justify-center text-sm"
                >
                  <Zap className="w-4 h-4" />
                  Free Accessibility Scan
                </Link>
              </div>

              {/* Criterion Info */}
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Criterion Details</h3>
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm text-zinc-500">Success Criterion</dt>
                    <dd className="text-white font-medium">{criterion.number}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-zinc-500">Level</dt>
                    <dd>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-sm font-medium ${levelColors[criterion.level as keyof typeof levelColors]}`}>
                        {criterion.level}
                      </span>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm text-zinc-500">Principle</dt>
                    <dd className="text-white">{criterion.principle}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-zinc-500">Guideline</dt>
                    <dd className="text-white">{criterion.guideline}</dd>
                  </div>
                </dl>
              </div>

              {/* Related Criteria */}
              {relatedCriteria.length > 0 && (
                <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Related Criteria</h3>
                  <div className="space-y-2">
                    {relatedCriteria.map((key) => {
                      const related = wcagCriteria[key];
                      return (
                        <Link
                          key={key}
                          href={`/wcag/${key}`}
                          className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-lg hover:bg-zinc-800 transition-colors group"
                        >
                          <div>
                            <div className="text-white text-sm font-medium group-hover:text-indigo-400 transition-colors">
                              {related.number}: {related.name}
                            </div>
                            <div className="text-xs text-zinc-500">Level {related.level}</div>
                          </div>
                          <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-indigo-400 transition-colors" />
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <section className="border-t border-zinc-800 py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Need help with WCAG compliance?
            </h2>
            <p className="text-zinc-400 mb-8">
              Inclusiv scans your entire website and identifies all WCAG violations, including {criterion.number}.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/#scanner"
                className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-colors"
              >
                <Zap className="w-5 h-5" />
                Scan Your Website
              </Link>
              <Link
                href="/wcag-checker"
                className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-medium rounded-lg transition-colors border border-zinc-700"
              >
                View All Criteria
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
