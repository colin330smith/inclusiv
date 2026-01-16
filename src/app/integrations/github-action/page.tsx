import { Metadata } from 'next';
import Link from 'next/link';
import { Shield, Github, Zap, CheckCircle, AlertTriangle, Terminal, Copy, ArrowRight, GitBranch, GitPullRequest, Settings } from 'lucide-react';

export const metadata: Metadata = {
  title: 'GitHub Action for Accessibility Testing | Fail Builds on Issues',
  description: 'Add accessibility testing to your CI/CD pipeline. Fail PRs that introduce accessibility regressions. Free for open source.',
  openGraph: {
    title: 'Inclusiv GitHub Action',
    description: 'Automated accessibility testing in your CI/CD pipeline.',
  },
};

const workflowYaml = `name: Accessibility Check

on:
  pull_request:
    branches: [main]
  push:
    branches: [main]

jobs:
  accessibility:
    runs-on: ubuntu-latest
    steps:
      - name: Run Accessibility Scan
        uses: inclusiv/a11y-action@v1
        with:
          url: \${{ secrets.SITE_URL }}
          api-key: \${{ secrets.INCLUSIV_API_KEY }}
          threshold: 80  # Fail if score drops below 80

      - name: Comment on PR
        if: github.event_name == 'pull_request'
        uses: inclusiv/a11y-action@v1
        with:
          action: comment
          github-token: \${{ secrets.GITHUB_TOKEN }}`;

const features = [
  {
    icon: AlertTriangle,
    title: 'Fail on Regressions',
    description: 'Set a minimum accessibility score. PRs that drop below the threshold are blocked.',
  },
  {
    icon: GitPullRequest,
    title: 'PR Comments',
    description: 'Automatically comment on PRs with scan results, showing what changed.',
  },
  {
    icon: GitBranch,
    title: 'Branch Comparison',
    description: 'Compare accessibility scores between your PR and main branch.',
  },
  {
    icon: Settings,
    title: 'Configurable Rules',
    description: 'Customize which rules are critical, warnings, or ignored.',
  },
];

export default function GitHubActionPage() {
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
            <Link href="/api-docs" className="text-zinc-300 hover:text-white transition-colors text-sm font-medium">
              API Docs
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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-800 rounded-full text-zinc-300 text-sm mb-6">
            <Github className="w-4 h-4" />
            GitHub Action
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="text-indigo-400">Accessibility Testing</span><br />in Your CI/CD
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-8">
            Catch accessibility issues before they reach production. Fail builds, comment on PRs, and track compliance over time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://github.com/marketplace/actions/inclusiv-accessibility"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-zinc-100 text-zinc-900 font-semibold rounded-xl transition-all"
            >
              <Github className="w-5 h-5" />
              View on Marketplace
            </a>
            <Link
              href="/api-docs#get-started"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold rounded-xl transition-colors"
            >
              <Zap className="w-5 h-5" />
              Get API Key
            </Link>
          </div>
        </div>

        {/* Demo Screenshot */}
        <div className="mb-16 bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-zinc-800 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="ml-2 text-zinc-400 text-sm">Pull Request #142</span>
          </div>
          <div className="p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 bg-indigo-500/20 rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 text-indigo-400" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-white font-semibold">inclusiv</span>
                  <span className="text-zinc-500 text-sm">bot</span>
                  <span className="text-zinc-500 text-sm">• 2 minutes ago</span>
                </div>
                <div className="bg-zinc-800 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-3xl font-bold text-green-400">87</div>
                    <div>
                      <p className="text-white font-medium">Accessibility Score</p>
                      <p className="text-green-400 text-sm flex items-center gap-1">
                        <ArrowRight className="w-3 h-3 rotate-[-45deg]" />
                        +3 from main branch
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-red-400">0</p>
                      <p className="text-zinc-400 text-xs">Critical</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-yellow-400">3</p>
                      <p className="text-zinc-400 text-xs">Warnings</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-400">42</p>
                      <p className="text-zinc-400 text-xs">Passed</p>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-zinc-700">
                    <p className="text-zinc-400 text-sm mb-2">Fixed in this PR:</p>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-zinc-300">Added missing alt text to hero image</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-zinc-300">Fixed form label association</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 ml-14">
              <span className="px-3 py-1 bg-green-500/10 text-green-400 rounded-full text-xs font-medium">
                ✓ Accessibility check passed
              </span>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                <div className="w-10 h-10 bg-indigo-500/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-indigo-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                <p className="text-zinc-400 text-sm">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* Setup */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white text-center mb-8">Setup in 2 Minutes</h2>
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
            <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-zinc-400" />
                <span className="text-zinc-300 text-sm font-mono">.github/workflows/accessibility.yml</span>
              </div>
              <button className="text-zinc-400 hover:text-white transition-colors p-1">
                <Copy className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6 overflow-x-auto">
              <pre className="text-sm font-mono text-zinc-300 whitespace-pre">{workflowYaml}</pre>
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="mb-16">
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">1</div>
              <div>
                <h3 className="text-white font-semibold mb-1">Get your API key</h3>
                <p className="text-zinc-400 text-sm">Create a free account and generate your API key from the dashboard.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">2</div>
              <div>
                <h3 className="text-white font-semibold mb-1">Add secrets to your repo</h3>
                <p className="text-zinc-400 text-sm">Go to Settings → Secrets → Actions and add <code className="bg-zinc-800 px-1 rounded">INCLUSIV_API_KEY</code> and <code className="bg-zinc-800 px-1 rounded">SITE_URL</code>.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">3</div>
              <div>
                <h3 className="text-white font-semibold mb-1">Create workflow file</h3>
                <p className="text-zinc-400 text-sm">Copy the YAML above into <code className="bg-zinc-800 px-1 rounded">.github/workflows/accessibility.yml</code> and push.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 text-white">
                <CheckCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">You&apos;re done!</h3>
                <p className="text-zinc-400 text-sm">Every PR will now be checked for accessibility issues automatically.</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-indigo-600/10 to-purple-600/10 border border-indigo-500/20 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Free for Open Source</h2>
          <p className="text-zinc-400 mb-6 max-w-xl mx-auto">
            Open source projects get unlimited scans. Just include a link to your repo when signing up.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/api-docs#get-started"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-500/25"
            >
              <Zap className="w-5 h-5" />
              Get Free API Key
            </Link>
            <a
              href="https://github.com/inclusiv/a11y-action"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold rounded-xl transition-colors"
            >
              <Github className="w-5 h-5" />
              View Source
            </a>
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
            <Link href="/api-docs" className="text-zinc-400 hover:text-white transition-colors">
              API Docs
            </Link>
            <Link href="/tools" className="text-zinc-400 hover:text-white transition-colors">
              Free Tools
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
