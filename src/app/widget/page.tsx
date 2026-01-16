import { Metadata } from 'next';
import Link from 'next/link';
import { Shield, Code, Eye, Zap, ArrowRight, Check, Copy, Accessibility, MousePointer, Keyboard } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free Accessibility Widget | Add to Your Website',
  description: 'Add our free accessibility widget to your website. Help users adjust text size, contrast, and navigation. Shows your commitment to inclusive design.',
  openGraph: {
    title: 'Free Accessibility Widget for Your Website',
    description: 'Give visitors control over their browsing experience. Easy to install, completely free.',
  },
};

export default function WidgetPage() {
  const widgetScript = `<!-- Inclusiv Accessibility Widget -->
<script src="https://tryinclusiv.com/widget.js" defer></script>`;

  const widgetScriptCustom = `<!-- Inclusiv Accessibility Widget (Custom) -->
<script>
  window.inclusivWidget = {
    position: 'bottom-right', // or 'bottom-left'
    primaryColor: '#6366f1',
    showBranding: true
  };
</script>
<script src="https://tryinclusiv.com/widget.js" defer></script>`;

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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 rounded-full text-green-400 text-sm mb-6">
            <Accessibility className="w-4 h-4" />
            100% Free Forever
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Free <span className="text-indigo-400">Accessibility Widget</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-8">
            Give your visitors control over their browsing experience. One line of code, instant accessibility improvements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#install"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-500/25"
            >
              <Code className="w-5 h-5" />
              Get Widget Code
            </Link>
            <Link
              href="#demo"
              className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold rounded-xl transition-colors"
            >
              <Eye className="w-5 h-5" />
              See Demo
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-4">
              <Eye className="w-6 h-6 text-indigo-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Visual Adjustments</h3>
            <p className="text-zinc-400">
              Let users increase text size, adjust contrast, highlight links, and change font styles for better readability.
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-4">
              <Keyboard className="w-6 h-6 text-indigo-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Navigation Helpers</h3>
            <p className="text-zinc-400">
              Keyboard navigation highlights, focus indicators, and skip-to-content links for screen reader users.
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-4">
              <MousePointer className="w-6 h-6 text-indigo-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Cursor Options</h3>
            <p className="text-zinc-400">
              Large cursor, reading guide, and animation pause controls for users with motor or cognitive needs.
            </p>
          </div>
        </div>

        {/* Widget Demo */}
        <div id="demo" className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden mb-16">
          <div className="p-6 border-b border-zinc-800">
            <h2 className="text-xl font-bold text-white">Live Demo</h2>
            <p className="text-zinc-400">This is how the widget appears on your website</p>
          </div>
          <div className="p-6 bg-zinc-950 min-h-[300px] relative">
            {/* Simulated website content */}
            <div className="max-w-2xl">
              <div className="h-8 w-48 bg-zinc-800 rounded mb-4"></div>
              <div className="h-4 w-full bg-zinc-800 rounded mb-2"></div>
              <div className="h-4 w-5/6 bg-zinc-800 rounded mb-2"></div>
              <div className="h-4 w-4/6 bg-zinc-800 rounded mb-6"></div>
              <div className="h-4 w-full bg-zinc-800 rounded mb-2"></div>
              <div className="h-4 w-3/4 bg-zinc-800 rounded mb-2"></div>
            </div>

            {/* Widget Preview */}
            <div className="absolute bottom-6 right-6">
              <div className="w-14 h-14 bg-indigo-600 rounded-full flex items-center justify-center shadow-lg shadow-indigo-500/25 cursor-pointer hover:scale-110 transition-transform">
                <Accessibility className="w-7 h-7 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Installation */}
        <div id="install" className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden mb-16">
          <div className="p-6 border-b border-zinc-800">
            <h2 className="text-xl font-bold text-white">Installation</h2>
            <p className="text-zinc-400">Add the widget to your site in seconds</p>
          </div>
          <div className="p-6 space-y-6">
            {/* Simple Install */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-white font-medium">Quick Install (Recommended)</h3>
                <button className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300">
                  <Copy className="w-3 h-3" />
                  Copy
                </button>
              </div>
              <pre className="p-4 bg-zinc-800 rounded-xl text-sm text-zinc-300 overflow-x-auto">
                {widgetScript}
              </pre>
              <p className="text-zinc-500 text-sm mt-2">
                Paste this code before the closing &lt;/body&gt; tag on your website.
              </p>
            </div>

            {/* Custom Install */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-white font-medium">Custom Configuration</h3>
                <button className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300">
                  <Copy className="w-3 h-3" />
                  Copy
                </button>
              </div>
              <pre className="p-4 bg-zinc-800 rounded-xl text-sm text-zinc-300 overflow-x-auto whitespace-pre-wrap">
                {widgetScriptCustom}
              </pre>
            </div>

            {/* Platform-specific */}
            <div className="pt-4 border-t border-zinc-800">
              <h3 className="text-white font-medium mb-4">Platform Guides</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Link href="/widget/shopify" className="p-3 bg-zinc-800 hover:bg-zinc-700 rounded-xl text-center transition-colors">
                  <span className="text-zinc-300 text-sm">Shopify</span>
                </Link>
                <Link href="/widget/wordpress" className="p-3 bg-zinc-800 hover:bg-zinc-700 rounded-xl text-center transition-colors">
                  <span className="text-zinc-300 text-sm">WordPress</span>
                </Link>
                <Link href="/widget/wix" className="p-3 bg-zinc-800 hover:bg-zinc-700 rounded-xl text-center transition-colors">
                  <span className="text-zinc-300 text-sm">Wix</span>
                </Link>
                <Link href="/widget/squarespace" className="p-3 bg-zinc-800 hover:bg-zinc-700 rounded-xl text-center transition-colors">
                  <span className="text-zinc-300 text-sm">Squarespace</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Why Free */}
        <div className="bg-gradient-to-r from-indigo-600/10 to-purple-600/10 border border-indigo-500/20 rounded-2xl p-8 mb-16">
          <h2 className="text-2xl font-bold text-white mb-4 text-center">Why Is It Free?</h2>
          <p className="text-zinc-300 text-center max-w-2xl mx-auto mb-6">
            We believe accessibility should be available to everyone. The widget helps users while showing your commitment to inclusive design. It&apos;s powered by Inclusiv - when site owners want to go further with automated scanning and monitoring, they upgrade to our paid plans.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2 text-zinc-300">
              <Check className="w-5 h-5 text-green-400" />
              <span>No usage limits</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-300">
              <Check className="w-5 h-5 text-green-400" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-300">
              <Check className="w-5 h-5 text-green-400" />
              <span>Fast CDN delivery</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-300">
              <Check className="w-5 h-5 text-green-400" />
              <span>GDPR compliant</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Ready to make your site more accessible?
          </h2>
          <p className="text-zinc-400 mb-6">
            Install the widget now, or scan your site first to see what else needs fixing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#install"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-500/25"
            >
              <Code className="w-5 h-5" />
              Get Widget Code
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold rounded-xl transition-colors"
            >
              <Zap className="w-5 h-5" />
              Scan Your Site Free
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-8 mt-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-zinc-400 text-sm">
            Free accessibility widget by Inclusiv. Making the web accessible for everyone.
          </p>
          <div className="flex items-center justify-center gap-6 mt-4 text-sm">
            <Link href="/" className="text-zinc-400 hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/tools" className="text-zinc-400 hover:text-white transition-colors">
              Free Tools
            </Link>
            <Link href="/benchmark" className="text-zinc-400 hover:text-white transition-colors">
              Benchmarks
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
