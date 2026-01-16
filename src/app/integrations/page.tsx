import { Metadata } from 'next';
import Link from 'next/link';
import { Shield, Github, Chrome, Slack, Code, Webhook, Zap, ArrowRight, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Integrations | Connect Accessibility Testing Everywhere',
  description: 'Integrate Inclusiv with your favorite tools. GitHub Actions, Slack, browser extensions, CI/CD pipelines, and REST API.',
  openGraph: {
    title: 'Inclusiv Integrations',
    description: 'Connect accessibility testing to your workflow.',
  },
};

const integrations = [
  {
    name: 'GitHub Action',
    description: 'Fail PRs when accessibility score drops below threshold',
    icon: Github,
    href: '/integrations/github-action',
    status: 'available',
    features: ['Block failing PRs', 'PR comments', 'Branch comparison'],
  },
  {
    name: 'Browser Extension',
    description: 'Scan any webpage instantly with one click',
    icon: Chrome,
    href: '/extension',
    status: 'available',
    features: ['Chrome & Firefox', 'Visual overlay', 'Export reports'],
  },
  {
    name: 'REST API',
    description: 'Build custom integrations with our API',
    icon: Code,
    href: '/api-docs',
    status: 'available',
    features: ['100 free scans/month', 'Webhooks', 'JSON response'],
  },
  {
    name: 'Slack',
    description: 'Get notifications when scores change',
    icon: Slack,
    href: '/integrations/slack',
    status: 'coming-soon',
    features: ['Score alerts', 'Weekly digests', 'Team channels'],
  },
  {
    name: 'Webhooks',
    description: 'Receive events in your own systems',
    icon: Webhook,
    href: '/api-docs#webhooks',
    status: 'available',
    features: ['Scan completed', 'Score changed', 'Custom payloads'],
  },
  {
    name: 'Zapier',
    description: 'Connect to 5,000+ apps without code',
    icon: Zap,
    href: '/integrations/zapier',
    status: 'coming-soon',
    features: ['Trigger workflows', 'Connect CRMs', 'Automate reports'],
  },
];

const platforms = [
  { name: 'Shopify', href: '/shopify-accessibility' },
  { name: 'WordPress', href: '/wordpress-accessibility' },
  { name: 'WooCommerce', href: '/woocommerce-accessibility' },
  { name: 'Magento', href: '/magento-accessibility' },
  { name: 'BigCommerce', href: '/bigcommerce-accessibility' },
  { name: 'Wix', href: '/wix-accessibility' },
  { name: 'Squarespace', href: '/squarespace-accessibility' },
  { name: 'Webflow', href: '/webflow-accessibility' },
];

export default function IntegrationsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-indigo-500" />
            <span className="text-xl font-bold text-white">Inclusiv</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/tools" className="text-zinc-300 hover:text-white transition-colors text-sm font-medium">
              Free Tools
            </Link>
            <Link href="/pricing" className="text-zinc-300 hover:text-white transition-colors text-sm font-medium">
              Pricing
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Integrations
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Connect accessibility testing to your existing workflow. CI/CD, notifications, or custom integrations—we&apos;ve got you covered.
          </p>
        </div>

        {/* Integration Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {integrations.map((integration) => {
            const Icon = integration.icon;
            return (
              <Link
                key={integration.name}
                href={integration.href}
                className={`group bg-zinc-900 border rounded-2xl p-6 transition-all ${
                  integration.status === 'available'
                    ? 'border-zinc-800 hover:border-indigo-500/50'
                    : 'border-zinc-800/50 opacity-75'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center group-hover:bg-indigo-500/10 transition-colors">
                    <Icon className="w-6 h-6 text-zinc-400 group-hover:text-indigo-400 transition-colors" />
                  </div>
                  {integration.status === 'coming-soon' && (
                    <span className="px-2 py-1 bg-zinc-800 text-zinc-400 text-xs rounded-full">
                      Coming Soon
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{integration.name}</h3>
                <p className="text-zinc-400 text-sm mb-4">{integration.description}</p>
                <ul className="space-y-2">
                  {integration.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-zinc-300">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                {integration.status === 'available' && (
                  <div className="mt-4 flex items-center gap-1 text-indigo-400 text-sm font-medium group-hover:gap-2 transition-all">
                    Learn more
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </Link>
            );
          })}
        </div>

        {/* Platform Guides */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 mb-16">
          <h2 className="text-xl font-bold text-white mb-4">Platform-Specific Guides</h2>
          <p className="text-zinc-400 mb-6">
            Step-by-step accessibility guides for popular e-commerce and CMS platforms.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {platforms.map((platform) => (
              <Link
                key={platform.name}
                href={platform.href}
                className="px-4 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-xl text-zinc-300 text-sm font-medium transition-colors text-center"
              >
                {platform.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Custom Integration */}
        <div className="bg-gradient-to-r from-indigo-600/10 to-purple-600/10 border border-indigo-500/20 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Need a Custom Integration?</h2>
          <p className="text-zinc-400 mb-6 max-w-xl mx-auto">
            Our REST API supports any integration you can imagine. Build internal tools, connect to your CMS, or automate compliance workflows.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/api-docs"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-500/25"
            >
              <Code className="w-5 h-5" />
              View API Docs
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold rounded-xl transition-colors"
            >
              Talk to Us
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-8 mt-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-6 text-sm">
            <Link href="/" className="text-zinc-400 hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/tools" className="text-zinc-400 hover:text-white transition-colors">
              Free Tools
            </Link>
            <Link href="/api-docs" className="text-zinc-400 hover:text-white transition-colors">
              API
            </Link>
            <Link href="/pricing" className="text-zinc-400 hover:text-white transition-colors">
              Pricing
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
