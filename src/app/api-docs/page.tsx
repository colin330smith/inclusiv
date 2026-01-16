import { Metadata } from 'next';
import Link from 'next/link';
import { Shield, Code, Zap, Lock, Globe, Terminal, Copy, ExternalLink, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Accessibility API for Developers | Free Tier Available',
  description: 'Integrate accessibility scanning into your CI/CD pipeline, build tools, or applications. Free tier includes 100 scans/month.',
  openGraph: {
    title: 'Inclusiv Accessibility API',
    description: 'Programmatic accessibility scanning for developers. Free tier available.',
  },
};

const endpoints = [
  {
    method: 'POST',
    path: '/api/v1/scan',
    description: 'Scan a URL for accessibility issues',
    example: `curl -X POST https://api.tryinclusiv.com/v1/scan \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"url": "https://example.com"}'`,
    response: `{
  "score": 78,
  "issueCount": 12,
  "criticalCount": 2,
  "issues": [
    {
      "type": "missing-alt-text",
      "severity": "critical",
      "element": "<img src='hero.jpg'>",
      "fix": "Add alt attribute describing the image"
    }
  ],
  "passedChecks": 45,
  "wcagLevel": "AA"
}`,
  },
  {
    method: 'GET',
    path: '/api/v1/scan/:id',
    description: 'Get scan results by ID',
    example: `curl https://api.tryinclusiv.com/v1/scan/scan_abc123 \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
    response: `{
  "id": "scan_abc123",
  "url": "https://example.com",
  "score": 78,
  "createdAt": "2025-01-15T10:30:00Z",
  "status": "completed"
}`,
  },
  {
    method: 'GET',
    path: '/api/v1/badge/:domain',
    description: 'Get accessibility badge for a domain',
    example: `curl https://api.tryinclusiv.com/v1/badge/example.com`,
    response: `Returns SVG badge image`,
  },
  {
    method: 'POST',
    path: '/api/v1/webhook',
    description: 'Register webhook for scan completion',
    example: `curl -X POST https://api.tryinclusiv.com/v1/webhook \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"url": "https://your-server.com/webhook", "events": ["scan.completed"]}'`,
    response: `{
  "id": "wh_xyz789",
  "url": "https://your-server.com/webhook",
  "events": ["scan.completed"],
  "active": true
}`,
  },
];

const pricingTiers = [
  {
    name: 'Free',
    price: '$0',
    scans: '100 scans/month',
    features: ['Basic scan results', 'JSON response', 'Badge generation', 'Community support'],
    cta: 'Get Free API Key',
    highlighted: false,
  },
  {
    name: 'Developer',
    price: '$29',
    scans: '1,000 scans/month',
    features: ['Full scan details', 'Webhooks', 'Priority scanning', 'Email support', 'CI/CD integration'],
    cta: 'Start Building',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    scans: 'Unlimited scans',
    features: ['Custom scanning rules', 'Dedicated support', 'SLA guarantee', 'On-premise option', 'Custom integrations'],
    cta: 'Contact Sales',
    highlighted: false,
  },
];

const useCases = [
  {
    icon: Terminal,
    title: 'CI/CD Integration',
    description: 'Fail builds when accessibility score drops below threshold. Catch issues before they reach production.',
  },
  {
    icon: Globe,
    title: 'Agency Dashboards',
    description: 'Monitor accessibility across all client sites from a single dashboard.',
  },
  {
    icon: Code,
    title: 'Developer Tools',
    description: 'Build VS Code extensions, browser plugins, or CLI tools with our API.',
  },
  {
    icon: Lock,
    title: 'Compliance Monitoring',
    description: 'Schedule regular scans and get alerts when compliance status changes.',
  },
];

export default function ApiDocsPage() {
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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 rounded-full text-indigo-400 text-sm mb-6">
            <Code className="w-4 h-4" />
            Developer API
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Build with <span className="text-indigo-400">Accessibility</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-8">
            Integrate WCAG scanning into your workflows. CI/CD pipelines, monitoring dashboards, developer tools—if you can code it, you can make it accessible.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#get-started"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-500/25"
            >
              <Zap className="w-5 h-5" />
              Get Free API Key
            </Link>
            <a
              href="#endpoints"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold rounded-xl transition-colors"
            >
              <Terminal className="w-5 h-5" />
              View Documentation
            </a>
          </div>
        </div>

        {/* Use Cases */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white text-center mb-8">What Will You Build?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map((useCase) => {
              const Icon = useCase.icon;
              return (
                <div key={useCase.title} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition-colors">
                  <div className="w-10 h-10 bg-indigo-500/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-indigo-400" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">{useCase.title}</h3>
                  <p className="text-zinc-400 text-sm">{useCase.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Start */}
        <div id="get-started" className="mb-16">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-zinc-800">
              <h2 className="text-xl font-bold text-white">Quick Start</h2>
              <p className="text-zinc-400 text-sm mt-1">Get scanning in under 5 minutes</p>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-indigo-500/10 rounded-full flex items-center justify-center flex-shrink-0 text-indigo-400 font-bold text-sm">1</div>
                <div className="flex-1">
                  <p className="text-white font-medium mb-2">Get your API key</p>
                  <p className="text-zinc-400 text-sm">Sign up for a free account and generate your API key from the dashboard.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-indigo-500/10 rounded-full flex items-center justify-center flex-shrink-0 text-indigo-400 font-bold text-sm">2</div>
                <div className="flex-1">
                  <p className="text-white font-medium mb-2">Make your first request</p>
                  <div className="bg-zinc-950 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                    <pre className="text-zinc-300">
{`curl -X POST https://api.tryinclusiv.com/v1/scan \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"url": "https://your-site.com"}'`}
                    </pre>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-indigo-500/10 rounded-full flex items-center justify-center flex-shrink-0 text-indigo-400 font-bold text-sm">3</div>
                <div className="flex-1">
                  <p className="text-white font-medium mb-2">Use the results</p>
                  <p className="text-zinc-400 text-sm">Parse the JSON response to display scores, fail CI builds, or trigger alerts.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Endpoints */}
        <div id="endpoints" className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">API Endpoints</h2>
          <div className="space-y-6">
            {endpoints.map((endpoint) => (
              <div key={endpoint.path} className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
                <div className="p-4 border-b border-zinc-800 flex items-center gap-3">
                  <span className={`px-2 py-1 rounded text-xs font-mono font-bold ${
                    endpoint.method === 'POST' ? 'bg-green-500/10 text-green-400' : 'bg-blue-500/10 text-blue-400'
                  }`}>
                    {endpoint.method}
                  </span>
                  <code className="text-white font-mono text-sm">{endpoint.path}</code>
                </div>
                <div className="p-4">
                  <p className="text-zinc-400 text-sm mb-4">{endpoint.description}</p>
                  <div className="grid lg:grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-zinc-500 text-xs uppercase tracking-wide">Request</p>
                        <button className="text-zinc-500 hover:text-white transition-colors">
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="bg-zinc-950 rounded-lg p-3 font-mono text-xs overflow-x-auto">
                        <pre className="text-zinc-300 whitespace-pre-wrap">{endpoint.example}</pre>
                      </div>
                    </div>
                    <div>
                      <p className="text-zinc-500 text-xs uppercase tracking-wide mb-2">Response</p>
                      <div className="bg-zinc-950 rounded-lg p-3 font-mono text-xs overflow-x-auto">
                        <pre className="text-zinc-300 whitespace-pre-wrap">{endpoint.response}</pre>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white text-center mb-8">API Pricing</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {pricingTiers.map((tier) => (
              <div
                key={tier.name}
                className={`rounded-2xl p-6 ${
                  tier.highlighted
                    ? 'bg-gradient-to-b from-indigo-600/20 to-indigo-600/5 border-2 border-indigo-500'
                    : 'bg-zinc-900 border border-zinc-800'
                }`}
              >
                {tier.highlighted && (
                  <div className="text-indigo-400 text-xs font-semibold uppercase tracking-wide mb-2">Most Popular</div>
                )}
                <h3 className="text-xl font-bold text-white mb-1">{tier.name}</h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-3xl font-bold text-white">{tier.price}</span>
                  {tier.price !== 'Custom' && <span className="text-zinc-400">/month</span>}
                </div>
                <p className="text-zinc-400 text-sm mb-6">{tier.scans}</p>
                <ul className="space-y-3 mb-6">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-zinc-300">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href={tier.name === 'Enterprise' ? '/contact' : '/pricing'}
                  className={`block w-full py-3 text-center font-semibold rounded-xl transition-colors ${
                    tier.highlighted
                      ? 'bg-indigo-600 hover:bg-indigo-500 text-white'
                      : 'bg-zinc-800 hover:bg-zinc-700 text-white'
                  }`}
                >
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* SDKs Coming Soon */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 text-center">
          <h2 className="text-xl font-bold text-white mb-4">SDKs Coming Soon</h2>
          <p className="text-zinc-400 mb-6">
            We&apos;re building official SDKs for your favorite languages. Join the waitlist to be notified.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {['JavaScript/Node.js', 'Python', 'Ruby', 'Go', 'PHP'].map((lang) => (
              <span key={lang} className="px-4 py-2 bg-zinc-800 rounded-lg text-zinc-300 text-sm">
                {lang}
              </span>
            ))}
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-medium"
          >
            Request an SDK
            <ExternalLink className="w-4 h-4" />
          </Link>
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
            <Link href="/pricing" className="text-zinc-400 hover:text-white transition-colors">
              Pricing
            </Link>
            <Link href="/contact" className="text-zinc-400 hover:text-white transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
