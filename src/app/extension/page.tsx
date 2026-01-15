import { Metadata } from 'next';
import Link from 'next/link';
import { Shield, Chrome, Zap, Eye, Palette, Type, MousePointer, FileText, Bell, Settings, Download, Star, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free Accessibility Browser Extension | Chrome & Firefox',
  description: 'Scan any website for accessibility issues instantly. Get WCAG compliance scores, color contrast analysis, and fix suggestions right in your browser.',
  openGraph: {
    title: 'Inclusiv Browser Extension',
    description: 'Free accessibility scanner for Chrome and Firefox. Instant WCAG compliance checking.',
  },
};

const features = [
  {
    icon: Zap,
    title: 'Instant Scanning',
    description: 'One-click scan on any webpage. Get results in seconds, not minutes.',
  },
  {
    icon: Eye,
    title: 'Visual Overlay',
    description: 'See issues highlighted directly on the page. Click to navigate to the element.',
  },
  {
    icon: Palette,
    title: 'Color Analysis',
    description: 'Built-in contrast checker shows which elements fail WCAG requirements.',
  },
  {
    icon: Type,
    title: 'Alt Text Audit',
    description: 'View all images and their alt text at a glance. Spot missing descriptions.',
  },
  {
    icon: MousePointer,
    title: 'Keyboard Testing',
    description: 'Tab order visualization helps identify keyboard navigation issues.',
  },
  {
    icon: FileText,
    title: 'Export Reports',
    description: 'Generate PDF reports for clients or stakeholders with one click.',
  },
];

const simulationModes = [
  { name: 'Color Blindness', description: 'Protanopia, Deuteranopia, Tritanopia, and more' },
  { name: 'Low Vision', description: 'Blur and reduced contrast simulation' },
  { name: 'Dyslexia', description: 'Text rendering that simulates reading challenges' },
  { name: 'Motor Impairment', description: 'Enlarged click targets and keyboard-only mode' },
];

export default function ExtensionPage() {
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
            <Chrome className="w-4 h-4" />
            Browser Extension
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Accessibility Testing<br /><span className="text-indigo-400">Right in Your Browser</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-8">
            Scan any website instantly. No logins, no setup. Just one click to find accessibility issues and get fix suggestions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a
              href="https://chrome.google.com/webstore/detail/inclusiv"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-zinc-100 text-zinc-900 font-semibold rounded-xl transition-all"
            >
              <Chrome className="w-5 h-5" />
              Add to Chrome - Free
            </a>
            <a
              href="https://addons.mozilla.org/firefox/addon/inclusiv"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-400 text-white font-semibold rounded-xl transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 6.536c.227.474.419.98.57 1.512a6.798 6.798 0 00-1.584-.188c-.437 0-.863.04-1.277.115a5.18 5.18 0 00-.363-1.196c.899-.147 1.792-.21 2.654-.243zM12 4c1.262 0 2.464.23 3.573.65a9.036 9.036 0 00-3.573-.65zm-3.573.65A7.97 7.97 0 0112 4c-1.262 0-2.464.23-3.573.65zM6.106 6.536c.862.033 1.755.096 2.654.243a5.18 5.18 0 00-.363 1.196c-.414-.075-.84-.115-1.277-.115a6.798 6.798 0 00-1.584.188c.151-.532.343-1.038.57-1.512zM4 12c0-1.108.226-2.165.634-3.124.714.196 1.468.327 2.251.386-.058.486-.089.983-.089 1.49 0 2.507 1.004 4.779 2.636 6.434C6.675 15.858 4.9 14.11 4 12zm8 8c-1.108 0-2.165-.226-3.124-.634.196-.714.327-1.468.386-2.251.486.058.983.089 1.49.089 2.507 0 4.779-1.004 6.434-2.636C15.858 17.325 14.11 20 12 20zm5.366-3.814c1.632-1.655 2.636-3.927 2.636-6.434 0-.507-.031-1.004-.089-1.49.783-.059 1.537-.19 2.251-.386.408.959.634 2.016.634 3.124-.9 2.11-2.675 3.858-4.432 5.186z"/>
              </svg>
              Firefox Add-on
            </a>
          </div>
          <div className="flex items-center justify-center gap-8 text-sm text-zinc-400">
            <div className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              <span>50,000+ installs</span>
            </div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="ml-1">4.9/5</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>Free forever</span>
            </div>
          </div>
        </div>

        {/* Screenshot */}
        <div className="mb-16 bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
          <div className="p-3 border-b border-zinc-800 flex items-center gap-2 bg-zinc-950">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <div className="flex-1 mx-4 bg-zinc-800 rounded-lg px-3 py-1 text-zinc-400 text-sm">
              example.com
            </div>
          </div>
          <div className="relative">
            {/* Simulated webpage */}
            <div className="p-8 bg-white min-h-[300px]">
              <div className="max-w-lg mx-auto">
                <div className="h-8 bg-zinc-200 rounded w-48 mb-4"></div>
                <div className="h-4 bg-zinc-100 rounded w-full mb-2"></div>
                <div className="h-4 bg-zinc-100 rounded w-5/6 mb-4"></div>
                <div className="h-32 bg-zinc-200 rounded mb-4 relative">
                  <div className="absolute inset-0 border-2 border-red-500 rounded">
                    <div className="absolute -top-8 left-0 bg-red-500 text-white text-xs px-2 py-1 rounded">
                      Missing alt text
                    </div>
                  </div>
                </div>
                <div className="h-10 bg-zinc-200 rounded w-32 relative">
                  <div className="absolute inset-0 border-2 border-yellow-500 rounded">
                    <div className="absolute -top-8 left-0 bg-yellow-500 text-white text-xs px-2 py-1 rounded">
                      Low contrast
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Extension popup overlay */}
            <div className="absolute top-4 right-4 w-80 bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl overflow-hidden">
              <div className="p-4 border-b border-zinc-800 flex items-center gap-3">
                <Shield className="w-6 h-6 text-indigo-500" />
                <span className="text-white font-semibold">Inclusiv</span>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-4xl font-bold text-yellow-400">72</div>
                  <div>
                    <p className="text-white font-medium">Accessibility Score</p>
                    <p className="text-zinc-400 text-sm">5 issues found</p>
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-zinc-400">Critical</span>
                    <span className="text-red-400 font-medium">2</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-zinc-400">Warnings</span>
                    <span className="text-yellow-400 font-medium">3</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-zinc-400">Passed</span>
                    <span className="text-green-400 font-medium">38</span>
                  </div>
                </div>
                <button className="w-full py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg">
                  View Full Report
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white text-center mb-8">Powerful Features, Zero Setup</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition-colors">
                  <div className="w-10 h-10 bg-indigo-500/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-indigo-400" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                  <p className="text-zinc-400 text-sm">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Simulation Modes */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-purple-600/10 to-indigo-600/10 border border-purple-500/20 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <Eye className="w-6 h-6 text-purple-400" />
              <h2 className="text-xl font-bold text-white">Disability Simulations</h2>
            </div>
            <p className="text-zinc-400 mb-6">
              Experience your website as users with disabilities do. Built-in simulations help you understand the real impact of accessibility issues.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {simulationModes.map((mode) => (
                <div key={mode.name} className="bg-zinc-900/50 rounded-xl p-4">
                  <p className="text-white font-medium mb-1">{mode.name}</p>
                  <p className="text-zinc-400 text-sm">{mode.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* For Teams */}
        <div className="mb-16">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Settings className="w-5 h-5 text-indigo-400" />
                  <span className="text-indigo-400 text-sm font-medium">For Teams</span>
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">Sync Settings Across Your Team</h2>
                <p className="text-zinc-400 mb-6">
                  Connect to your Inclusiv account to sync custom rules, team dashboards, and scan history across devices. Free tier syncs to one device.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-sm text-zinc-300">
                    <Bell className="w-4 h-4 text-green-400" />
                    Get Slack/email alerts when scores change
                  </li>
                  <li className="flex items-center gap-2 text-sm text-zinc-300">
                    <Users className="w-4 h-4 text-green-400" />
                    Share custom rule configurations
                  </li>
                  <li className="flex items-center gap-2 text-sm text-zinc-300">
                    <FileText className="w-4 h-4 text-green-400" />
                    Aggregate reports across all team scans
                  </li>
                </ul>
              </div>
              <div className="bg-zinc-800 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-indigo-500/20 rounded-full flex items-center justify-center">
                    <Users className="w-4 h-4 text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Acme Corp</p>
                    <p className="text-zinc-400 text-xs">5 team members</p>
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-zinc-400">Total scans this month</span>
                    <span className="text-white">1,247</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-zinc-400">Avg team score</span>
                    <span className="text-green-400">84</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-zinc-400">Issues fixed</span>
                    <span className="text-white">89</span>
                  </div>
                </div>
                <div className="pt-4 border-t border-zinc-700">
                  <p className="text-zinc-400 text-xs">Last scan: 2 minutes ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Install Now, Scan in Seconds</h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Join 50,000+ developers and designers making the web more accessible. Free forever, no account required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://chrome.google.com/webstore/detail/inclusiv"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-500/25"
            >
              <Chrome className="w-5 h-5" />
              Install for Chrome
            </a>
            <a
              href="https://addons.mozilla.org/firefox/addon/inclusiv"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold rounded-xl transition-colors"
            >
              Install for Firefox
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
