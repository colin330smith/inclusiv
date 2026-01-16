import { Metadata } from 'next';
import Link from 'next/link';
import { Shield, AlertTriangle } from 'lucide-react';
import { EAACountdown } from '@/components/EAACountdown';
import { SocialProofTicker } from '@/components/SocialProofTicker';
import { SiteFooter } from '@/components/seo/SiteFooter';

export const metadata: Metadata = {
  title: 'Shopify Accessibility Checker | WCAG Compliance for Shopify',
  description: 'Free Shopify accessibility scanner. Check your Shopify store for WCAG 2.1 compliance. EAA deadline June 2025. Fix issues automatically.',
  keywords: ['Shopify accessibility', 'Shopify WCAG', 'Shopify ADA compliance', 'Shopify accessibility audit', 'Shopify EAA'],
  openGraph: {
    title: 'Shopify Accessibility Checker - Free Scan',
    description: 'Check your Shopify store for accessibility issues before the EAA deadline.',
  },
};

export default function ShopifyAccessibilityPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-indigo-500" />
            <span className="text-xl font-bold text-white">Inclusiv</span>
          </Link>
          <Link
            href="/#scanner"
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-colors text-sm"
          >
            Free Shopify Scan
          </Link>
        </div>
      </header>

      {/* EAA Countdown Banner */}
      <EAACountdown variant="banner" showCTA={true} />

      {/* Live Activity Ticker */}
      <SocialProofTicker />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-[#96bf48] p-3 rounded-lg">
            <svg className="w-8 h-8 text-white" viewBox="0 0 109 40" fill="currentColor">
              <path d="M95.8 17.6c-2.5 0-4.4 1.2-5.6 3v-2.6h-5.5v19.5h5.7v-10c0-2.4 1.3-3.9 3.4-3.9 2 0 3 1.3 3 3.6v10.3h5.7V25.2c0-4.7-2.6-7.6-6.7-7.6zm-14.3 0c-2.7 0-4.9.9-6.4 2.5l2.2 3.2c1.1-1.1 2.4-1.7 3.8-1.7 1.8 0 2.9 1 2.9 2.5v.6h-3.5c-4.3 0-6.6 2-6.6 5.2 0 3.1 2.3 5.3 5.8 5.3 2.2 0 3.7-.8 4.6-2.1v1.7h5.4v-10.9c0-4.1-2.9-6.3-8.2-6.3z"/>
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">
            Shopify Accessibility Checker
          </h1>
        </div>

        <p className="text-xl text-zinc-400 mb-8">
          Make your Shopify store accessible to everyone. Scan for WCAG 2.1 issues
          and get automated fixes designed specifically for Shopify themes.
        </p>

        {/* Urgency Card */}
        <div className="mb-12">
          <EAACountdown variant="card" showCTA={true} />
        </div>

        <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-xl p-8 text-center mb-12">
          <h2 className="text-2xl font-bold mb-4">Scan Your Shopify Store - Free</h2>
          <p className="text-indigo-100 mb-6">
            Works with all Shopify themes. Instant results.
          </p>
          <Link
            href="/#scanner"
            className="inline-block bg-white text-indigo-600 font-bold px-8 py-4 rounded-lg hover:bg-indigo-50 transition"
          >
            Check Shopify Accessibility →
          </Link>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Common Shopify Accessibility Issues</h2>
          <div className="space-y-4">
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 border-l-4 border-l-red-500">
              <h3 className="font-semibold text-lg text-white mb-1">Product Images Without Alt Text</h3>
              <p className="text-zinc-400 text-sm">Many Shopify themes don't automatically add alt text to product images</p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 border-l-4 border-l-amber-500">
              <h3 className="font-semibold text-lg text-white mb-1">Inaccessible Dropdown Menus</h3>
              <p className="text-zinc-400 text-sm">Navigation menus that don't work with keyboard or screen readers</p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 border-l-4 border-l-amber-500">
              <h3 className="font-semibold text-lg text-white mb-1">Color Picker Without Labels</h3>
              <p className="text-zinc-400 text-sm">Product variant selectors missing accessible labels</p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 border-l-4 border-l-yellow-500">
              <h3 className="font-semibold text-lg text-white mb-1">Checkout Form Issues</h3>
              <p className="text-zinc-400 text-sm">Form fields without proper labels and error messages</p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 border-l-4 border-l-yellow-500">
              <h3 className="font-semibold text-lg text-white mb-1">Third-Party Apps</h3>
              <p className="text-zinc-400 text-sm">Review widgets, popups, and chatbots often lack accessibility</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Why Shopify Stores Need Accessibility</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
              <h3 className="font-semibold text-lg text-red-400 mb-2">EAA Compliance (Europe)</h3>
              <p className="text-zinc-400 text-sm">
                By June 28, 2025, all e-commerce sites selling to EU customers must be
                WCAG 2.1 AA compliant. Fines up to €100,000.
              </p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
              <h3 className="font-semibold text-lg text-red-400 mb-2">ADA Compliance (USA)</h3>
              <p className="text-zinc-400 text-sm">
                E-commerce is the #1 target for ADA lawsuits. Average settlement:
                $25,000-$100,000 plus legal fees.
              </p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
              <h3 className="font-semibold text-lg text-green-400 mb-2">Increased Sales</h3>
              <p className="text-zinc-400 text-sm">
                15% of the global population has a disability. Accessible sites see
                10-30% increase in conversions.
              </p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
              <h3 className="font-semibold text-lg text-blue-400 mb-2">Better SEO</h3>
              <p className="text-zinc-400 text-sm">
                Google rewards accessible sites. Proper headings, alt text, and
                semantic HTML improve rankings.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Shopify Theme Compatibility</h2>
          <p className="text-zinc-400 mb-4">
            Our scanner works with all Shopify themes, including:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {['Dawn', 'Debut', 'Brooklyn', 'Minimal', 'Supply', 'Venture', 'Narrative', 'Express', 'Sense', 'Craft', 'Colorblock', 'Studio'].map((theme) => (
              <div key={theme} className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-3 text-center">
                <span className="text-zinc-300">{theme}</span>
              </div>
            ))}
          </div>
          <p className="text-zinc-500 text-sm mt-4">
            Plus any custom theme or third-party theme from the Shopify Theme Store.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">How It Works</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="bg-indigo-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 text-white font-bold">1</div>
              <div>
                <h3 className="font-semibold text-lg text-white">Enter Your Shopify URL</h3>
                <p className="text-zinc-400 text-sm">Just paste your store URL - no app installation required</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-indigo-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 text-white font-bold">2</div>
              <div>
                <h3 className="font-semibold text-lg text-white">AI Scans Your Store</h3>
                <p className="text-zinc-400 text-sm">We check homepage, products, collections, cart, and checkout</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-indigo-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 text-white font-bold">3</div>
              <div>
                <h3 className="font-semibold text-lg text-white">Get Your Accessibility Report</h3>
                <p className="text-zinc-400 text-sm">See issues prioritized by severity with exact fix instructions</p>
              </div>
            </div>
          </div>
        </section>

        <div className="bg-gradient-to-r from-[#96bf48] to-[#5c8b1e] rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Make Your Shopify Store Accessible</h2>
          <p className="text-green-100 mb-6">
            Free scan. Instant results. Shopify-specific fixes.
          </p>
          <Link
            href="/#scanner"
            className="inline-block bg-white text-green-700 font-bold px-8 py-4 rounded-lg hover:bg-green-50 transition"
          >
            Scan My Shopify Store →
          </Link>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
