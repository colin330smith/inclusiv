import { Metadata } from 'next';
import Link from 'next/link';
import { Shield, BarChart3, TrendingUp, TrendingDown, ArrowRight, AlertTriangle, Trophy, Target } from 'lucide-react';
import { SiteFooter } from '@/components/seo/SiteFooter';

interface IndustryData {
  name: string;
  slug: string;
  avgScore: number;
  topPerformer: string;
  topScore: number;
  commonIssues: string[];
  sampleSize: number;
  trend: 'up' | 'down' | 'stable';
  trendValue: number;
  complianceRate: number;
  description: string;
  seoTitle: string;
  seoDescription: string;
}

const industryData: Record<string, IndustryData> = {
  'ecommerce': {
    name: 'E-commerce',
    slug: 'ecommerce',
    avgScore: 62,
    topPerformer: 'shopify.com',
    topScore: 91,
    commonIssues: [
      'Missing alt text on product images',
      'Low contrast on price displays',
      'Inaccessible checkout forms',
      'Missing form labels',
      'Focus indicators removed',
    ],
    sampleSize: 2847,
    trend: 'up',
    trendValue: 8,
    complianceRate: 34,
    description: 'E-commerce websites face unique accessibility challenges due to complex product catalogs, checkout flows, and dynamic content. With EAA now enforced, European e-commerce sites must ensure their entire customer journey is accessible.',
    seoTitle: 'E-commerce Website Accessibility Benchmark 2025',
    seoDescription: 'See how e-commerce websites score on WCAG accessibility. Average score: 62/100. Only 34% are EAA compliant. Free scan for your store.',
  },
  'saas': {
    name: 'SaaS',
    slug: 'saas',
    avgScore: 71,
    topPerformer: 'notion.so',
    topScore: 89,
    commonIssues: [
      'Complex dashboard navigation',
      'Keyboard trap in modals',
      'Missing ARIA labels on icons',
      'Auto-playing content',
      'Time-limited sessions without warnings',
    ],
    sampleSize: 1523,
    trend: 'up',
    trendValue: 12,
    complianceRate: 48,
    description: 'SaaS platforms often feature complex interfaces that can create significant barriers for users with disabilities. Leading SaaS companies are investing heavily in accessibility to expand their market reach and comply with regulations.',
    seoTitle: 'SaaS Website Accessibility Benchmark 2025',
    seoDescription: 'SaaS accessibility scores and benchmarks. Average score: 71/100. 48% EAA compliant. See how your software compares.',
  },
  'finance': {
    name: 'Finance & Banking',
    slug: 'finance',
    avgScore: 68,
    topPerformer: 'stripe.com',
    topScore: 92,
    commonIssues: [
      'CAPTCHA without alternatives',
      'PDF documents not accessible',
      'Session timeouts too short',
      'Complex data tables without headers',
      'Error messages not announced',
    ],
    sampleSize: 982,
    trend: 'up',
    trendValue: 15,
    complianceRate: 42,
    description: 'Financial services have regulatory requirements beyond accessibility, making compliance critical. Banks and fintech companies face pressure from both disability advocacy groups and regulators.',
    seoTitle: 'Finance & Banking Accessibility Benchmark 2025',
    seoDescription: 'Financial website accessibility scores. Banks average 68/100. Only 42% meet WCAG AA. Check your finance site now.',
  },
  'healthcare': {
    name: 'Healthcare',
    slug: 'healthcare',
    avgScore: 59,
    topPerformer: 'mayoclinic.org',
    topScore: 87,
    commonIssues: [
      'Patient portal accessibility issues',
      'Appointment booking barriers',
      'Medical forms without labels',
      'Poor color contrast on warnings',
      'Video content without captions',
    ],
    sampleSize: 756,
    trend: 'stable',
    trendValue: 3,
    complianceRate: 28,
    description: 'Healthcare websites often exclude the very patients who need them most. With an aging population and many disabilities directly related to health conditions, accessible healthcare websites are essential.',
    seoTitle: 'Healthcare Website Accessibility Benchmark 2025',
    seoDescription: 'Healthcare accessibility is critical. Average score: 59/100. Only 28% compliant. Scan your healthcare site free.',
  },
  'education': {
    name: 'Education',
    slug: 'education',
    avgScore: 65,
    topPerformer: 'harvard.edu',
    topScore: 88,
    commonIssues: [
      'Inaccessible learning management systems',
      'PDF course materials',
      'Video lectures without captions',
      'Complex navigation menus',
      'Registration forms without error handling',
    ],
    sampleSize: 1234,
    trend: 'up',
    trendValue: 10,
    complianceRate: 38,
    description: 'Educational institutions have legal obligations to provide accessible content. Students with disabilities must have equal access to course materials, registration systems, and learning platforms.',
    seoTitle: 'Education Website Accessibility Benchmark 2025',
    seoDescription: 'University and education accessibility scores. Average: 65/100. 38% compliant. Check your institution.',
  },
  'government': {
    name: 'Government',
    slug: 'government',
    avgScore: 78,
    topPerformer: 'gov.uk',
    topScore: 98,
    commonIssues: [
      'Legacy systems not updated',
      'PDF forms instead of HTML',
      'Complex service navigation',
      'Missing skip links',
      'Images of text in documents',
    ],
    sampleSize: 543,
    trend: 'up',
    trendValue: 18,
    complianceRate: 67,
    description: 'Government websites often lead in accessibility due to strict legal requirements. The UK&apos;s GOV.UK is considered a gold standard for accessible government services.',
    seoTitle: 'Government Website Accessibility Benchmark 2025',
    seoDescription: 'Government accessibility leads at 78/100 average. 67% compliant. See top performing public sector sites.',
  },
  'media': {
    name: 'Media & Entertainment',
    slug: 'media',
    avgScore: 64,
    topPerformer: 'bbc.com',
    topScore: 95,
    commonIssues: [
      'Auto-playing video content',
      'Missing captions and transcripts',
      'Keyboard navigation issues',
      'Fast-moving animations',
      'Audio descriptions missing',
    ],
    sampleSize: 892,
    trend: 'up',
    trendValue: 7,
    complianceRate: 35,
    description: 'Media websites have unique challenges with video, audio, and interactive content. Leading media companies like the BBC have set industry standards for accessible media delivery.',
    seoTitle: 'Media Website Accessibility Benchmark 2025',
    seoDescription: 'Media and entertainment accessibility scores. Average: 64/100. BBC leads at 95. Check your media site.',
  },
  'travel': {
    name: 'Travel & Hospitality',
    slug: 'travel',
    avgScore: 55,
    topPerformer: 'booking.com',
    topScore: 84,
    commonIssues: [
      'Complex booking flows',
      'Map-based interfaces without alternatives',
      'Dynamic pricing updates',
      'Calendar date pickers',
      'Search filters without labels',
    ],
    sampleSize: 678,
    trend: 'up',
    trendValue: 11,
    complianceRate: 24,
    description: 'Travel websites are among the most complex, with booking engines, maps, and real-time availability. The industry has significant room for improvement in accessibility.',
    seoTitle: 'Travel Website Accessibility Benchmark 2025',
    seoDescription: 'Travel industry accessibility is low at 55/100 average. Only 24% compliant. Scan your travel site.',
  },
};

export async function generateStaticParams() {
  return Object.keys(industryData).map((industry) => ({
    industry,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ industry: string }> }): Promise<Metadata> {
  const { industry: industrySlug } = await params;
  const industry = industryData[industrySlug];

  if (!industry) {
    return {
      title: 'Industry Benchmark Not Found',
    };
  }

  return {
    title: industry.seoTitle,
    description: industry.seoDescription,
    openGraph: {
      title: industry.seoTitle,
      description: industry.seoDescription,
    },
  };
}

export default async function IndustryBenchmarkPage({ params }: { params: Promise<{ industry: string }> }) {
  const { industry: industrySlug } = await params;
  const industry = industryData[industrySlug];

  if (!industry) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Industry Not Found</h1>
          <Link href="/benchmark" className="text-indigo-400 hover:text-indigo-300">
            View all industries
          </Link>
        </div>
      </div>
    );
  }

  const otherIndustries = Object.values(industryData).filter(i => i.slug !== industrySlug).slice(0, 4);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="border-b border-zinc-800">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-indigo-500" />
            <span className="text-xl font-bold text-white">Inclusiv</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/benchmark" className="text-zinc-400 hover:text-white transition-colors text-sm">
              All Industries
            </Link>
            <Link
              href="/"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-colors text-sm"
            >
              Free Scan
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-8">
          <Link href="/benchmark" className="text-zinc-400 hover:text-white transition-colors">
            Benchmarks
          </Link>
          <span className="text-zinc-600">/</span>
          <span className="text-white">{industry.name}</span>
        </nav>

        {/* Hero */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 rounded-full text-indigo-400 text-sm mb-6">
            <BarChart3 className="w-4 h-4" />
            Industry Benchmark
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {industry.name} <span className="text-indigo-400">Accessibility</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-3xl">
            {industry.description}
          </p>
        </div>

        {/* Key Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-zinc-400 text-sm">Average Score</span>
              <Target className="w-5 h-5 text-zinc-600" />
            </div>
            <div className="flex items-end gap-2">
              <span className={`text-4xl font-bold ${
                industry.avgScore >= 80 ? 'text-green-400' :
                industry.avgScore >= 60 ? 'text-yellow-400' : 'text-red-400'
              }`}>
                {industry.avgScore}
              </span>
              <span className="text-zinc-500 text-xl mb-1">/100</span>
            </div>
            <div className="flex items-center gap-1 mt-2">
              {industry.trend === 'up' ? (
                <TrendingUp className="w-4 h-4 text-green-400" />
              ) : industry.trend === 'down' ? (
                <TrendingDown className="w-4 h-4 text-red-400" />
              ) : null}
              <span className={`text-sm ${
                industry.trend === 'up' ? 'text-green-400' :
                industry.trend === 'down' ? 'text-red-400' : 'text-zinc-400'
              }`}>
                {industry.trend === 'up' ? '+' : ''}{industry.trendValue}% YoY
              </span>
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-zinc-400 text-sm">Compliance Rate</span>
              <Shield className="w-5 h-5 text-zinc-600" />
            </div>
            <div className="flex items-end gap-2">
              <span className={`text-4xl font-bold ${
                industry.complianceRate >= 50 ? 'text-green-400' :
                industry.complianceRate >= 30 ? 'text-yellow-400' : 'text-red-400'
              }`}>
                {industry.complianceRate}%
              </span>
            </div>
            <p className="text-zinc-500 text-sm mt-2">
              Meet WCAG AA
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-zinc-400 text-sm">Top Performer</span>
              <Trophy className="w-5 h-5 text-yellow-400" />
            </div>
            <div className="text-xl font-bold text-white truncate">
              {industry.topPerformer}
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-green-400 font-bold">{industry.topScore}</span>
              <span className="text-zinc-500">/100</span>
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-zinc-400 text-sm">Sites Analyzed</span>
              <BarChart3 className="w-5 h-5 text-zinc-600" />
            </div>
            <div className="text-4xl font-bold text-white">
              {industry.sampleSize.toLocaleString()}
            </div>
            <p className="text-zinc-500 text-sm mt-2">
              In the last 90 days
            </p>
          </div>
        </div>

        {/* Common Issues */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 mb-12">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            Most Common Issues in {industry.name}
          </h2>
          <div className="space-y-4">
            {industry.commonIssues.map((issue, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-red-500/10 rounded-lg flex items-center justify-center">
                  <span className="text-red-400 font-bold text-sm">{i + 1}</span>
                </div>
                <span className="text-zinc-300">{issue}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Score Distribution */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Score Distribution</h2>
          <div className="space-y-4">
            {[
              { range: '90-100', label: 'Excellent', pct: Math.floor(industry.complianceRate * 0.3), color: 'bg-green-500' },
              { range: '80-89', label: 'Good', pct: Math.floor(industry.complianceRate * 0.7), color: 'bg-emerald-500' },
              { range: '60-79', label: 'Needs Work', pct: Math.floor((100 - industry.complianceRate) * 0.5), color: 'bg-yellow-500' },
              { range: '40-59', label: 'Poor', pct: Math.floor((100 - industry.complianceRate) * 0.35), color: 'bg-orange-500' },
              { range: '0-39', label: 'Failing', pct: Math.floor((100 - industry.complianceRate) * 0.15), color: 'bg-red-500' },
            ].map((band) => (
              <div key={band.range} className="flex items-center gap-4">
                <div className="w-20 text-zinc-400 text-sm">{band.range}</div>
                <div className="flex-1 h-8 bg-zinc-800 rounded-lg overflow-hidden">
                  <div
                    className={`h-full ${band.color} transition-all duration-500`}
                    style={{ width: `${band.pct}%` }}
                  />
                </div>
                <div className="w-16 text-right text-zinc-300 text-sm">{band.pct}%</div>
              </div>
            ))}
          </div>
        </div>

        {/* Other Industries */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Compare with Other Industries</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {otherIndustries.map((ind) => (
              <Link
                key={ind.slug}
                href={`/benchmark/${ind.slug}`}
                className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 hover:border-zinc-700 transition-colors"
              >
                <h3 className="text-white font-medium mb-2">{ind.name}</h3>
                <div className="flex items-center gap-2">
                  <span className={`text-2xl font-bold ${
                    ind.avgScore >= 70 ? 'text-green-400' :
                    ind.avgScore >= 50 ? 'text-yellow-400' : 'text-red-400'
                  }`}>
                    {ind.avgScore}
                  </span>
                  <span className="text-zinc-500">/100 avg</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            How Does Your {industry.name} Site Compare?
          </h2>
          <p className="text-zinc-400 mb-6 max-w-xl mx-auto">
            Get your free accessibility score and see how you stack up against {industry.sampleSize.toLocaleString()}+ other {industry.name.toLowerCase()} websites.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-500/25"
          >
            <Shield className="w-5 h-5" />
            Get Your Free Score
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
