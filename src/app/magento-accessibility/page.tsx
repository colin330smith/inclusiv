import { Metadata } from 'next';
import Link from 'next/link';
import { Shield } from 'lucide-react';
import { SiteFooter } from '@/components/seo/SiteFooter';
import { EAACountdown } from '@/components/EAACountdown';
import { SocialProofTicker } from '@/components/SocialProofTicker';

export const metadata: Metadata = {
  title: 'Magento Accessibility Checker | WCAG & ADA Compliance for Magento',
  description: 'Free Magento accessibility scanner. Check your Magento store for WCAG 2.1 compliance and ADA issues. Fix product pages, checkout, and navigation problems.',
  keywords: ['Magento accessibility', 'Magento WCAG', 'Magento ADA compliance', 'Magento accessibility audit', 'Adobe Commerce accessibility'],
  openGraph: {
    title: 'Magento Accessibility Checker - Free Scan',
    description: 'Scan your Magento store for accessibility issues. Instant results for WCAG and ADA compliance.',
  },
};

export default function MagentoAccessibilityPage() {
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

      {/* EAA Deadline Urgency Banner */}
      <EAACountdown variant="banner" showCTA={true} />

      {/* Live Activity Ticker */}
      <SocialProofTicker />

      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-[#f46f25] p-3 rounded-lg">
            <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.18l6.9 3.45L12 11.09 5.1 7.63 12 4.18zM4 8.82l7 3.5v7.36l-7-3.5V8.82zm16 7.36l-7 3.5v-7.36l7-3.5v7.36z"/>
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">
            Magento Accessibility Checker
          </h1>
        </div>

        <p className="text-xl text-zinc-300 mb-8">
          Make your Magento or Adobe Commerce store accessible to all customers. Our scanner identifies
          WCAG 2.1 violations specific to Magento themes, extensions, and checkout flows, helping you
          achieve ADA and EAA compliance before costly lawsuits or fines arrive.
        </p>

        <div className="bg-red-500/20 border border-red-500 rounded-lg p-6 mb-8">
          <p className="text-xl font-semibold text-red-300">
            Magento stores face unique accessibility challenges
          </p>
          <p className="text-red-200 mt-2">
            Complex product configurations, layered navigation, and third-party extensions often
            introduce accessibility barriers that standard themes don't address.
          </p>
        </div>

        <div className="bg-orange-600 rounded-xl p-8 text-center mb-12">
          <h2 className="text-2xl font-bold mb-4">Scan Your Magento Store - Free</h2>
          <p className="text-orange-100 mb-6">
            Works with Magento 2, Adobe Commerce, and all popular themes.
          </p>
          <Link
            href="/"
            className="inline-block bg-white text-orange-600 font-bold px-8 py-4 rounded-lg hover:bg-orange-50 transition"
          >
            Check Magento Accessibility →
          </Link>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Common Magento Accessibility Issues</h2>
          <p className="text-zinc-300 mb-6">
            Magento's powerful e-commerce features can create significant accessibility barriers when
            not implemented correctly. These are the most frequently encountered WCAG violations in
            Magento stores:
          </p>
          <div className="space-y-4">
            <div className="bg-zinc-700/50 rounded-lg p-4 border-l-4 border-red-500">
              <h3 className="font-semibold text-lg mb-1">Layered Navigation Inaccessibility</h3>
              <p className="text-zinc-300 text-sm">Magento's faceted search and filter system often lacks keyboard support and ARIA labels, making it impossible for screen reader users to filter products</p>
            </div>
            <div className="bg-zinc-700/50 rounded-lg p-4 border-l-4 border-red-500">
              <h3 className="font-semibold text-lg mb-1">Configurable Product Selectors</h3>
              <p className="text-zinc-300 text-sm">Swatch selectors for size, color, and other attributes frequently missing proper labels and keyboard interactions</p>
            </div>
            <div className="bg-zinc-700/50 rounded-lg p-4 border-l-4 border-amber-500">
              <h3 className="font-semibold text-lg mb-1">Mini Cart and AJAX Updates</h3>
              <p className="text-zinc-300 text-sm">Cart updates happen silently without screen reader announcements, leaving users unaware of changes</p>
            </div>
            <div className="bg-zinc-700/50 rounded-lg p-4 border-l-4 border-amber-500">
              <h3 className="font-semibold text-lg mb-1">Checkout Step Indicators</h3>
              <p className="text-zinc-300 text-sm">Multi-step checkout progress is often not communicated to assistive technology users</p>
            </div>
            <div className="bg-zinc-700/50 rounded-lg p-4 border-l-4 border-yellow-500">
              <h3 className="font-semibold text-lg mb-1">Product Image Galleries</h3>
              <p className="text-zinc-300 text-sm">Fotorama and other gallery extensions lack alt text and keyboard navigation support</p>
            </div>
            <div className="bg-zinc-700/50 rounded-lg p-4 border-l-4 border-yellow-500">
              <h3 className="font-semibold text-lg mb-1">Third-Party Extension Conflicts</h3>
              <p className="text-zinc-300 text-sm">Popular extensions for reviews, wishlists, and comparisons often inject inaccessible components</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Why Magento Accessibility Matters</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-zinc-700/50 rounded-lg p-6">
              <h3 className="font-semibold text-lg text-red-400 mb-2">Legal Requirements</h3>
              <p className="text-zinc-300 text-sm">
                E-commerce sites are primary targets for ADA lawsuits in the US. The EAA requires
                WCAG 2.1 AA compliance for all EU-serving stores by June 2025. Magento enterprise
                stores often have the resources to be targeted.
              </p>
            </div>
            <div className="bg-zinc-700/50 rounded-lg p-6">
              <h3 className="font-semibold text-lg text-green-400 mb-2">Revenue Impact</h3>
              <p className="text-zinc-300 text-sm">
                With 1.3 billion people worldwide living with disabilities and $8 trillion in
                spending power, an accessible Magento store can capture market share competitors
                are leaving behind.
              </p>
            </div>
            <div className="bg-zinc-700/50 rounded-lg p-6">
              <h3 className="font-semibold text-lg text-blue-400 mb-2">SEO Benefits</h3>
              <p className="text-zinc-300 text-sm">
                Proper heading structure, alt text, and semantic HTML improve your Magento
                store's search rankings. Google rewards accessible sites with better visibility.
              </p>
            </div>
            <div className="bg-zinc-700/50 rounded-lg p-6">
              <h3 className="font-semibold text-lg text-purple-400 mb-2">Brand Reputation</h3>
              <p className="text-zinc-300 text-sm">
                Demonstrating commitment to accessibility builds customer trust and loyalty.
                Inclusive design signals that your brand values all customers equally.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Magento Version Compatibility</h2>
          <p className="text-zinc-300 mb-4">
            Our accessibility scanner works with all Magento versions and deployment types:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              'Magento 2.4.x',
              'Adobe Commerce',
              'Magento Open Source',
              'Magento Commerce Cloud',
              'Magento 2.3.x',
              'PWA Studio',
              'Hyvä Theme',
              'Luma Theme',
              'Custom Themes'
            ].map((version) => (
              <div key={version} className="bg-zinc-700/30 rounded-lg p-3 text-center">
                <span className="text-zinc-200 text-sm">{version}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Pages and Features We Audit</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-zinc-700/50 rounded-lg p-4">
              <h3 className="font-semibold text-orange-400 mb-2">Category Pages</h3>
              <p className="text-zinc-300 text-sm">Layered navigation, sorting, pagination, product grid</p>
            </div>
            <div className="bg-zinc-700/50 rounded-lg p-4">
              <h3 className="font-semibold text-orange-400 mb-2">Product Detail Pages</h3>
              <p className="text-zinc-300 text-sm">Configurables, bundles, grouped products, galleries, reviews</p>
            </div>
            <div className="bg-zinc-700/50 rounded-lg p-4">
              <h3 className="font-semibold text-orange-400 mb-2">Shopping Cart</h3>
              <p className="text-zinc-300 text-sm">Quantity updates, coupons, shipping estimator, totals</p>
            </div>
            <div className="bg-zinc-700/50 rounded-lg p-4">
              <h3 className="font-semibold text-orange-400 mb-2">Checkout Flow</h3>
              <p className="text-zinc-300 text-sm">Shipping, billing, payment methods, order review</p>
            </div>
            <div className="bg-zinc-700/50 rounded-lg p-4">
              <h3 className="font-semibold text-orange-400 mb-2">Customer Account</h3>
              <p className="text-zinc-300 text-sm">Registration, login, dashboard, order history, addresses</p>
            </div>
            <div className="bg-zinc-700/50 rounded-lg p-4">
              <h3 className="font-semibold text-orange-400 mb-2">Search Results</h3>
              <p className="text-zinc-300 text-sm">Search suggestions, results filtering, no results handling</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">How Our Magento Scanner Works</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="bg-orange-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">1</div>
              <div>
                <h3 className="font-semibold text-lg">Enter Your Store URL</h3>
                <p className="text-zinc-300 text-sm">No extension installation needed - just paste your Magento store URL</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-orange-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">2</div>
              <div>
                <h3 className="font-semibold text-lg">AI-Powered Analysis</h3>
                <p className="text-zinc-300 text-sm">We crawl key pages including products, categories, cart, and checkout</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-orange-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">3</div>
              <div>
                <h3 className="font-semibold text-lg">Get Magento-Specific Fixes</h3>
                <p className="text-zinc-300 text-sm">Receive detailed fix instructions referencing Magento templates and XML layouts</p>
              </div>
            </div>
          </div>
        </section>

        <div className="bg-gradient-to-r from-[#f46f25] to-[#e85d10] rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Make Your Magento Store Accessible</h2>
          <p className="text-orange-100 mb-6">
            Free scan. Instant results. Magento-specific recommendations.
          </p>
          <Link
            href="/"
            className="inline-block bg-white text-orange-600 font-bold px-8 py-4 rounded-lg hover:bg-orange-50 transition"
          >
            Scan My Magento Store →
          </Link>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
