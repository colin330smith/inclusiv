import { Metadata } from 'next';
import Link from 'next/link';
import {
  Shield,
  Palette,
  Image,
  Type,
  FileText,
  ArrowRight,
  Zap,
  Search,
  BarChart3,
  Calculator,
  Users,
  Bell,
  Trophy,
  Star,
  Code,
  BookOpen,
  Globe,
  Target,
  MessageSquare,
  Scale,
  TrendingUp,
  Award,
  Clock,
  Sparkles,
} from 'lucide-react';
import { SiteFooter } from '@/components/seo/SiteFooter';
import { EAACountdown } from '@/components/EAACountdown';
import { SocialProofTicker } from '@/components/SocialProofTicker';

export const metadata: Metadata = {
  title: 'Free Accessibility Tools | WCAG Checkers, Calculators & Generators',
  description: 'Free WCAG accessibility tools: website scanner, contrast checker, alt text generator, fine calculator, competitor comparison, and more. Ensure EAA and ADA compliance.',
  openGraph: {
    title: 'Free Accessibility Tools - WCAG Compliance',
    description: 'Over 20 free tools to check and improve your website accessibility. Scanner, calculators, comparison tools, and more.',
  },
};

const toolCategories = [
  {
    name: 'Scanners & Audits',
    description: 'Comprehensive accessibility testing tools',
    tools: [
      {
        name: 'Full Website Scanner',
        description: 'Scan your entire website for 50+ WCAG accessibility issues in under 30 seconds.',
        href: '/#scanner',
        icon: Zap,
        color: 'text-indigo-400',
        bg: 'bg-indigo-500/10',
        badge: 'Most Popular',
        badgeColor: 'bg-green-500',
      },
      {
        name: 'WCAG Checker',
        description: 'Deep WCAG 2.1 Level A, AA, and AAA compliance analysis with detailed reports.',
        href: '/wcag-checker',
        icon: Search,
        color: 'text-blue-400',
        bg: 'bg-blue-500/10',
      },
      {
        name: 'Website Accessibility Audit',
        description: 'Comprehensive multi-page accessibility audit with prioritized fix recommendations.',
        href: '/website-accessibility-audit',
        icon: FileText,
        color: 'text-cyan-400',
        bg: 'bg-cyan-500/10',
      },
    ],
  },
  {
    name: 'Comparison & Competition',
    description: 'Compare and compete on accessibility',
    tools: [
      {
        name: 'Compare Sites',
        description: 'Compare accessibility scores between two websites side-by-side.',
        href: '/compare-sites',
        icon: BarChart3,
        color: 'text-purple-400',
        bg: 'bg-purple-500/10',
        badge: 'Viral',
        badgeColor: 'bg-purple-500',
      },
      {
        name: 'Challenge Competitor',
        description: 'Challenge any competitor and share the accessibility comparison publicly.',
        href: '/challenge',
        icon: Target,
        color: 'text-orange-400',
        bg: 'bg-orange-500/10',
        badge: 'New',
        badgeColor: 'bg-orange-500',
      },
      {
        name: 'Competitor Monitor',
        description: 'Track competitor accessibility changes over time with alerts.',
        href: '/monitor',
        icon: Bell,
        color: 'text-yellow-400',
        bg: 'bg-yellow-500/10',
      },
      {
        name: 'Industry Benchmarks',
        description: 'Compare your accessibility score against industry averages.',
        href: '/benchmark',
        icon: TrendingUp,
        color: 'text-green-400',
        bg: 'bg-green-500/10',
      },
    ],
  },
  {
    name: 'Calculators',
    description: 'Calculate compliance costs and ROI',
    tools: [
      {
        name: 'EAA Fine Calculator',
        description: 'Calculate potential fines under the European Accessibility Act based on your violations.',
        href: '/fine-calculator',
        icon: Calculator,
        color: 'text-red-400',
        bg: 'bg-red-500/10',
        badge: 'Popular',
        badgeColor: 'bg-red-500',
      },
      {
        name: 'ROI Calculator',
        description: 'Calculate the return on investment of accessibility improvements.',
        href: '/roi-calculator',
        icon: Scale,
        color: 'text-emerald-400',
        bg: 'bg-emerald-500/10',
      },
    ],
  },
  {
    name: 'Generators & Checkers',
    description: 'Create accessible content',
    tools: [
      {
        name: 'Color Contrast Checker',
        description: 'Check if your color combinations meet WCAG 2.1 AA and AAA standards.',
        href: '/tools/contrast-checker',
        icon: Palette,
        color: 'text-pink-400',
        bg: 'bg-pink-500/10',
      },
      {
        name: 'Alt Text Generator',
        description: 'AI-powered alt text generation for images that works with screen readers.',
        href: '/tools/alt-text-generator',
        icon: Image,
        color: 'text-blue-400',
        bg: 'bg-blue-500/10',
        badge: 'AI',
        badgeColor: 'bg-cyan-500',
      },
      {
        name: 'Accessibility Statement Generator',
        description: 'Generate a compliant accessibility statement for your website.',
        href: '/accessibility-statement-generator',
        icon: FileText,
        color: 'text-violet-400',
        bg: 'bg-violet-500/10',
      },
      {
        name: 'Heading Structure Checker',
        description: 'Verify your heading hierarchy follows WCAG 1.3.1 and 2.4.6 guidelines.',
        href: '/tools/heading-checker',
        icon: Type,
        color: 'text-cyan-400',
        bg: 'bg-cyan-500/10',
      },
      {
        name: 'ARIA Label Checker',
        description: 'Ensure interactive elements have proper accessible names per WCAG 4.1.2.',
        href: '/tools/aria-checker',
        icon: Code,
        color: 'text-amber-400',
        bg: 'bg-amber-500/10',
      },
    ],
  },
  {
    name: 'Social & Recognition',
    description: 'Showcase your accessibility commitment',
    tools: [
      {
        name: 'Accessibility Leaderboard',
        description: 'See which companies have the best accessibility scores.',
        href: '/leaderboard',
        icon: Trophy,
        color: 'text-yellow-400',
        bg: 'bg-yellow-500/10',
        badge: 'Trending',
        badgeColor: 'bg-yellow-500',
      },
      {
        name: 'Wall of Fame',
        description: 'Companies committed to digital accessibility excellence.',
        href: '/wall-of-fame',
        icon: Star,
        color: 'text-amber-400',
        bg: 'bg-amber-500/10',
      },
      {
        name: 'Free Widget Badge',
        description: 'Embed an accessibility badge on your website to show your commitment.',
        href: '/widget',
        icon: Award,
        color: 'text-green-400',
        bg: 'bg-green-500/10',
        badge: 'Free',
        badgeColor: 'bg-green-500',
      },
      {
        name: 'Verify Badge',
        description: 'Verify any website\'s accessibility badge and certification status.',
        href: '/verify',
        icon: Shield,
        color: 'text-indigo-400',
        bg: 'bg-indigo-500/10',
      },
    ],
  },
  {
    name: 'Learning & Certification',
    description: 'Learn accessibility best practices',
    tools: [
      {
        name: 'Accessibility Quiz',
        description: 'Test your accessibility knowledge and get certified.',
        href: '/quiz',
        icon: MessageSquare,
        color: 'text-pink-400',
        bg: 'bg-pink-500/10',
        badge: 'Interactive',
        badgeColor: 'bg-pink-500',
      },
      {
        name: 'Free 5-Day Course',
        description: 'Learn web accessibility fundamentals in daily email lessons.',
        href: '/learn',
        icon: BookOpen,
        color: 'text-blue-400',
        bg: 'bg-blue-500/10',
      },
      {
        name: 'EAA Compliance Guide',
        description: 'Complete guide to the European Accessibility Act requirements.',
        href: '/eaa-guide',
        icon: Globe,
        color: 'text-emerald-400',
        bg: 'bg-emerald-500/10',
      },
      {
        name: 'ADA Compliance Guide',
        description: 'Understanding ADA requirements for digital accessibility.',
        href: '/ada-compliance',
        icon: FileText,
        color: 'text-cyan-400',
        bg: 'bg-cyan-500/10',
      },
    ],
  },
  {
    name: 'Reports & Tracking',
    description: 'Track progress over time',
    tools: [
      {
        name: 'Accessibility Report',
        description: 'Get a detailed, shareable accessibility report for any website.',
        href: '/report',
        icon: FileText,
        color: 'text-violet-400',
        bg: 'bg-violet-500/10',
      },
      {
        name: 'Progress Timeline',
        description: 'Track your accessibility score improvements over time.',
        href: '/timeline',
        icon: Clock,
        color: 'text-cyan-400',
        bg: 'bg-cyan-500/10',
      },
      {
        name: 'Referral Program',
        description: 'Earn free months by referring others to Inclusiv.',
        href: '/referrals',
        icon: Users,
        color: 'text-purple-400',
        bg: 'bg-purple-500/10',
        badge: 'Earn Rewards',
        badgeColor: 'bg-purple-500',
      },
    ],
  },
];

const stats = [
  { value: '100K+', label: 'Scans Completed' },
  { value: '50K+', label: 'Websites Analyzed' },
  { value: '25+', label: 'Free Tools' },
  { value: '4.9/5', label: 'User Rating' },
];

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-indigo-500" />
            <span className="text-xl font-bold text-white">Inclusiv</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/pricing"
              className="text-zinc-400 hover:text-white transition-colors text-sm hidden sm:block"
            >
              Pricing
            </Link>
            <Link
              href="/#scanner"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-colors text-sm"
            >
              Free Website Scan
            </Link>
          </div>
        </div>
      </header>

      {/* EAA Deadline Urgency Banner */}
      <EAACountdown variant="banner" showCTA={true} />

      {/* Live Activity Ticker */}
      <SocialProofTicker />

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/30 rounded-full text-indigo-400 text-sm mb-6">
            <Sparkles className="w-4 h-4" />
            25+ Free Tools
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Free Accessibility Tools
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Everything you need to check, improve, and showcase your website accessibility.
            All tools are 100% free. No signup required.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 text-center"
            >
              <p className="text-3xl font-bold text-indigo-400 mb-1">{stat.value}</p>
              <p className="text-zinc-400 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Featured Tool */}
        <div className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 rounded-2xl p-8 mb-16">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/20 rounded-full text-indigo-400 text-sm mb-4">
                <Zap className="w-4 h-4" />
                Featured Tool
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">
                Instant Accessibility Scanner
              </h2>
              <p className="text-zinc-300 mb-6">
                Scan any website in seconds and get a comprehensive accessibility report with
                actionable recommendations. Works with any website, no login required.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/#scanner"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-colors"
                >
                  <Search className="w-5 h-5" />
                  Scan Your Website
                </Link>
                <Link
                  href="/compare-sites"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold rounded-xl transition-colors"
                >
                  <BarChart3 className="w-5 h-5" />
                  Compare Sites
                </Link>
              </div>
            </div>
            <div className="flex-shrink-0">
              <div className="w-48 h-48 bg-indigo-500/20 rounded-2xl flex items-center justify-center">
                <Shield className="w-24 h-24 text-indigo-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Tool Categories */}
        {toolCategories.map((category) => (
          <div key={category.name} className="mb-16">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">{category.name}</h2>
              <p className="text-zinc-400">{category.description}</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.tools.map((tool) => (
                <Link
                  key={tool.name}
                  href={tool.href}
                  className="group bg-zinc-900 border border-zinc-800 rounded-2xl p-6 transition-all hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/10"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 ${tool.bg} rounded-xl flex items-center justify-center`}>
                      <tool.icon className={`w-6 h-6 ${tool.color}`} />
                    </div>
                    {tool.badge && (
                      <span className={`px-2 py-1 ${tool.badgeColor} text-white text-xs font-medium rounded-full`}>
                        {tool.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-indigo-400 transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-zinc-400 text-sm mb-4">{tool.description}</p>
                  <span className="inline-flex items-center gap-1 text-sm text-indigo-400 group-hover:gap-2 transition-all">
                    Use Tool <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ))}

        {/* Use Cases */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            Who Uses These Tools?
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                title: 'E-commerce Stores',
                description: 'Ensure your online store is accessible to all customers and compliant with EAA',
                icon: Globe,
              },
              {
                title: 'Agencies',
                description: 'Audit client websites and prove accessibility compliance with shareable reports',
                icon: Users,
              },
              {
                title: 'Developers',
                description: 'Catch accessibility issues during development before they reach production',
                icon: Code,
              },
              {
                title: 'Compliance Teams',
                description: 'Monitor and track accessibility across your organization over time',
                icon: Scale,
              },
            ].map((useCase) => (
              <div
                key={useCase.title}
                className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 text-center"
              >
                <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <useCase.icon className="w-6 h-6 text-indigo-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {useCase.title}
                </h3>
                <p className="text-zinc-400 text-sm">{useCase.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            Check Everything at Once
          </h2>
          <p className="text-zinc-400 mb-6 max-w-xl mx-auto">
            Instead of checking issues one by one, scan your entire website and get
            a complete accessibility report with fixes in 30 seconds.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/#scanner"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-500/25"
            >
              <Zap className="w-5 h-5" />
              Free Full Website Scan
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold rounded-xl transition-colors"
            >
              View Pro Plans
            </Link>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
