import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'BigCommerce Accessibility Checker | WCAG Compliance for BigCommerce Stores',
  description: 'Free BigCommerce accessibility scanner. Check your BigCommerce store for WCAG 2.1 compliance. Fix product pages, checkout, and storefront accessibility issues.',
  keywords: ['BigCommerce accessibility', 'BigCommerce WCAG', 'BigCommerce ADA compliance', 'BigCommerce accessibility audit', 'BigCommerce EAA'],
  openGraph: {
    title: 'BigCommerce Accessibility Checker - Free Scan',
    description: 'Scan your BigCommerce store for accessibility issues. Get instant results and fixes.',
  },
};

export default function BigCommerceAccessibilityPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-[#121118] p-3 rounded-lg border border-slate-600">
            <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">
            BigCommerce Accessibility Checker
          </h1>
        </div>

        <p className="text-xl text-slate-300 mb-8">
          Ensure your BigCommerce store is accessible to every customer. Our specialized scanner
          identifies WCAG 2.1 violations in BigCommerce themes, apps, and checkout processes,
          helping you meet ADA and EAA requirements while improving conversions.
        </p>

        <div className="bg-amber-500/20 border border-amber-500 rounded-lg p-6 mb-8">
          <p className="text-xl font-semibold text-amber-300">
            BigCommerce themes need accessibility attention
          </p>
          <p className="text-amber-200 mt-2">
            While BigCommerce provides a solid foundation, many Stencil themes and third-party
            apps introduce accessibility barriers that require remediation.
          </p>
        </div>

        <div className="bg-slate-700 rounded-xl p-8 text-center mb-12 border border-slate-600">
          <h2 className="text-2xl font-bold mb-4">Scan Your BigCommerce Store - Free</h2>
          <p className="text-slate-300 mb-6">
            Compatible with all Stencil themes and BigCommerce editions.
          </p>
          <Link
            href="/"
            className="inline-block bg-blue-600 text-white font-bold px-8 py-4 rounded-lg hover:bg-blue-700 transition"
          >
            Check BigCommerce Accessibility →
          </Link>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Common BigCommerce Accessibility Issues</h2>
          <p className="text-slate-300 mb-6">
            BigCommerce stores often share similar accessibility problems stemming from theme
            design choices and app integrations. Understanding these issues is the first step
            toward creating an inclusive shopping experience.
          </p>
          <div className="space-y-4">
            <div className="bg-slate-700/50 rounded-lg p-4 border-l-4 border-red-500">
              <h3 className="font-semibold text-lg mb-1">Product Option Selectors</h3>
              <p className="text-slate-300 text-sm">Size, color, and custom field selectors frequently lack proper labels and keyboard accessibility</p>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-4 border-l-4 border-red-500">
              <h3 className="font-semibold text-lg mb-1">Quick View Modals</h3>
              <p className="text-slate-300 text-sm">Popular quick view features often trap keyboard focus and lack screen reader support</p>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-4 border-l-4 border-amber-500">
              <h3 className="font-semibold text-lg mb-1">Mega Menu Navigation</h3>
              <p className="text-slate-300 text-sm">Complex dropdown menus don't always support keyboard navigation or have proper ARIA markup</p>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-4 border-l-4 border-amber-500">
              <h3 className="font-semibold text-lg mb-1">Product Image Carousels</h3>
              <p className="text-slate-300 text-sm">Slick sliders and carousel components missing alt text and navigation controls</p>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-4 border-l-4 border-yellow-500">
              <h3 className="font-semibold text-lg mb-1">Faceted Search Filters</h3>
              <p className="text-slate-300 text-sm">Product filtering widgets often lack keyboard support and live region announcements</p>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-4 border-l-4 border-yellow-500">
              <h3 className="font-semibold text-lg mb-1">Third-Party Apps</h3>
              <p className="text-slate-300 text-sm">Review widgets, chat tools, and promotional popups from the app marketplace often lack accessibility</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Why BigCommerce Stores Need Accessibility</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-700/50 rounded-lg p-6">
              <h3 className="font-semibold text-lg text-red-400 mb-2">ADA Lawsuit Risk</h3>
              <p className="text-slate-300 text-sm">
                E-commerce websites are the top target for ADA accessibility lawsuits. In 2023,
                over 4,000 digital accessibility lawsuits were filed in the US alone. Average
                settlement costs range from $25,000 to $100,000.
              </p>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-6">
              <h3 className="font-semibold text-lg text-red-400 mb-2">EAA Compliance Deadline</h3>
              <p className="text-slate-300 text-sm">
                The European Accessibility Act requires WCAG 2.1 AA compliance by June 28, 2025
                for all businesses selling to EU customers. Fines can reach €100,000 per violation.
              </p>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-6">
              <h3 className="font-semibold text-lg text-green-400 mb-2">Expanded Market Reach</h3>
              <p className="text-slate-300 text-sm">
                Over 1 billion people globally have disabilities. Accessible stores tap into
                this underserved market with $8 trillion in annual spending power. Many
                competitors ignore this opportunity.
              </p>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-6">
              <h3 className="font-semibold text-lg text-blue-400 mb-2">Improved Conversion Rates</h3>
              <p className="text-slate-300 text-sm">
                Accessibility improvements benefit all users. Clear labels, keyboard navigation,
                and better contrast lead to 10-30% higher conversions across all customer segments.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">BigCommerce Theme Compatibility</h2>
          <p className="text-slate-300 mb-4">
            Our scanner works with all BigCommerce themes and editions:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              'Cornerstone',
              'Vault',
              'Fortune',
              'Flavor',
              'Flavor Bold',
              'Flavor Starter',
              'Launch',
              'Supermarket',
              'Custom Stencil',
              'BigCommerce Enterprise',
              'B2B Edition',
              'Headless/Catalyst'
            ].map((theme) => (
              <div key={theme} className="bg-slate-700/30 rounded-lg p-3 text-center">
                <span className="text-slate-200 text-sm">{theme}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">What We Analyze</h2>
          <p className="text-slate-300 mb-6">
            Our BigCommerce accessibility audit covers every customer touchpoint in your store:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-slate-700/50 rounded-lg p-4">
              <h3 className="font-semibold text-blue-400 mb-2">Homepage & Navigation</h3>
              <p className="text-slate-300 text-sm">Header, mega menus, search, footer, promotional banners</p>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-4">
              <h3 className="font-semibold text-blue-400 mb-2">Category Pages</h3>
              <p className="text-slate-300 text-sm">Product grids, filtering, sorting, pagination</p>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-4">
              <h3 className="font-semibold text-blue-400 mb-2">Product Pages</h3>
              <p className="text-slate-300 text-sm">Images, options, add to cart, tabs, reviews</p>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-4">
              <h3 className="font-semibold text-blue-400 mb-2">Cart & Mini Cart</h3>
              <p className="text-slate-300 text-sm">Quantity updates, promotions, proceed to checkout</p>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-4">
              <h3 className="font-semibold text-blue-400 mb-2">Checkout Process</h3>
              <p className="text-slate-300 text-sm">Forms, shipping, payment, order confirmation</p>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-4">
              <h3 className="font-semibold text-blue-400 mb-2">Customer Account</h3>
              <p className="text-slate-300 text-sm">Login, registration, dashboard, order history</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">The Cost of Inaccessible E-commerce</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-slate-700/50 rounded-lg p-6 text-center">
              <p className="text-4xl font-bold text-red-400">71%</p>
              <p className="text-slate-300 text-sm mt-2">Of customers with disabilities leave inaccessible sites</p>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-6 text-center">
              <p className="text-4xl font-bold text-amber-400">$25K+</p>
              <p className="text-slate-300 text-sm mt-2">Average ADA lawsuit settlement for e-commerce</p>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-6 text-center">
              <p className="text-4xl font-bold text-green-400">15%</p>
              <p className="text-slate-300 text-sm mt-2">Of global population lives with a disability</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">How It Works</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">1</div>
              <div>
                <h3 className="font-semibold text-lg">Enter Your Store URL</h3>
                <p className="text-slate-300 text-sm">No app installation required - just paste your BigCommerce store URL</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">2</div>
              <div>
                <h3 className="font-semibold text-lg">AI Scans Your Store</h3>
                <p className="text-slate-300 text-sm">We analyze homepage, products, categories, cart, and checkout pages</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">3</div>
              <div>
                <h3 className="font-semibold text-lg">Get Actionable Results</h3>
                <p className="text-slate-300 text-sm">Receive prioritized issues with BigCommerce-specific fix instructions</p>
              </div>
            </div>
          </div>
        </section>

        <div className="bg-gradient-to-r from-slate-700 to-slate-600 rounded-xl p-8 text-center border border-slate-500">
          <h2 className="text-2xl font-bold mb-4">Make Your BigCommerce Store Accessible</h2>
          <p className="text-slate-300 mb-6">
            Free scan. Instant results. Theme-specific recommendations.
          </p>
          <Link
            href="/"
            className="inline-block bg-blue-600 text-white font-bold px-8 py-4 rounded-lg hover:bg-blue-700 transition"
          >
            Scan My BigCommerce Store →
          </Link>
        </div>
      </div>
    </main>
  );
}
