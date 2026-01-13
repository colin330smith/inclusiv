import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'WooCommerce Accessibility Checker | WCAG Compliance for Online Stores',
  description: 'Free WooCommerce accessibility scanner. Check your WooCommerce store for WCAG 2.1 compliance. Fix cart, checkout, and product page issues.',
  keywords: ['WooCommerce accessibility', 'WooCommerce WCAG', 'WooCommerce ADA', 'WooCommerce accessibility audit', 'accessible e-commerce'],
  openGraph: {
    title: 'WooCommerce Accessibility Checker - Free Scan',
    description: 'Scan your WooCommerce store for accessibility issues. Instant results.',
  },
};

export default function WooCommerceAccessibilityPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-[#96588a] p-3 rounded-lg">
            <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">
            WooCommerce Accessibility
          </h1>
        </div>

        <p className="text-xl text-slate-300 mb-8">
          Make your WooCommerce store accessible to all customers. Scan for WCAG issues
          in your product pages, cart, and checkout process.
        </p>

        <div className="bg-red-500/20 border border-red-500 rounded-lg p-6 mb-8">
          <p className="text-xl font-semibold text-red-300">
            E-commerce is the #1 target for accessibility lawsuits
          </p>
          <p className="text-red-200 mt-2">
            74% of ADA web lawsuits target online stores. WooCommerce sites are particularly vulnerable.
          </p>
        </div>

        <div className="bg-purple-600 rounded-xl p-8 text-center mb-12">
          <h2 className="text-2xl font-bold mb-4">Scan Your WooCommerce Store - Free</h2>
          <p className="text-purple-100 mb-6">
            Full checkout flow analysis. Product page audits. Cart accessibility.
          </p>
          <Link
            href="/"
            className="inline-block bg-white text-purple-600 font-bold px-8 py-4 rounded-lg hover:bg-purple-50 transition"
          >
            Check WooCommerce Accessibility →
          </Link>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Critical WooCommerce Accessibility Issues</h2>
          <div className="space-y-4">
            <div className="bg-slate-700/50 rounded-lg p-4 border-l-4 border-red-500">
              <h3 className="font-semibold text-lg mb-1">Checkout Form Problems</h3>
              <p className="text-slate-300 text-sm">Missing labels, unclear error messages, and inaccessible payment forms</p>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-4 border-l-4 border-red-500">
              <h3 className="font-semibold text-lg mb-1">Product Image Gallery</h3>
              <p className="text-slate-300 text-sm">Lightboxes and zoom features often trap keyboard users</p>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-4 border-l-4 border-amber-500">
              <h3 className="font-semibold text-lg mb-1">Add to Cart Buttons</h3>
              <p className="text-slate-300 text-sm">AJAX cart updates without screen reader announcements</p>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-4 border-l-4 border-amber-500">
              <h3 className="font-semibold text-lg mb-1">Variable Product Selectors</h3>
              <p className="text-slate-300 text-sm">Size/color pickers without proper ARIA labels</p>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-4 border-l-4 border-yellow-500">
              <h3 className="font-semibold text-lg mb-1">Mini Cart Widget</h3>
              <p className="text-slate-300 text-sm">Dropdown carts that can't be accessed by keyboard</p>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-4 border-l-4 border-yellow-500">
              <h3 className="font-semibold text-lg mb-1">Product Filtering</h3>
              <p className="text-slate-300 text-sm">AJAX filters without proper focus management</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Pages We Scan</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-slate-700/50 rounded-lg p-4">
              <h3 className="font-semibold text-purple-400 mb-2">Shop Page</h3>
              <p className="text-slate-300 text-sm">Product grid, filtering, sorting, pagination</p>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-4">
              <h3 className="font-semibold text-purple-400 mb-2">Product Pages</h3>
              <p className="text-slate-300 text-sm">Images, variations, reviews, add to cart</p>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-4">
              <h3 className="font-semibold text-purple-400 mb-2">Cart Page</h3>
              <p className="text-slate-300 text-sm">Quantity updates, coupon codes, totals</p>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-4">
              <h3 className="font-semibold text-purple-400 mb-2">Checkout</h3>
              <p className="text-slate-300 text-sm">Forms, payment, shipping, order review</p>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-4">
              <h3 className="font-semibold text-purple-400 mb-2">My Account</h3>
              <p className="text-slate-300 text-sm">Login, registration, order history</p>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-4">
              <h3 className="font-semibold text-purple-400 mb-2">Search Results</h3>
              <p className="text-slate-300 text-sm">Search form, results display, no results</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">WooCommerce Plugin Compatibility</h2>
          <p className="text-slate-300 mb-4">
            We check accessibility for popular WooCommerce extensions:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              'WooCommerce Subscriptions',
              'WooCommerce Bookings',
              'Product Add-Ons',
              'WooCommerce Memberships',
              'Stripe Payment Gateway',
              'PayPal Payments',
              'WooCommerce Blocks',
              'Product Bundles',
              'Checkout Field Editor'
            ].map((plugin) => (
              <div key={plugin} className="bg-slate-700/30 rounded-lg p-3 text-center">
                <span className="text-slate-200 text-sm">{plugin}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">The Cost of Inaccessible E-commerce</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-slate-700/50 rounded-lg p-6 text-center">
              <p className="text-4xl font-bold text-red-400">$6.9B</p>
              <p className="text-slate-300 text-sm mt-2">Lost annually by UK retailers due to inaccessibility</p>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-6 text-center">
              <p className="text-4xl font-bold text-amber-400">71%</p>
              <p className="text-slate-300 text-sm mt-2">Of disabled users leave inaccessible sites</p>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-6 text-center">
              <p className="text-4xl font-bold text-green-400">$8T</p>
              <p className="text-slate-300 text-sm mt-2">Global spending power of disabled people</p>
            </div>
          </div>
        </section>

        <div className="bg-gradient-to-r from-[#96588a] to-[#7b4377] rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Make Your Store Accessible to Everyone</h2>
          <p className="text-purple-100 mb-6">
            Free scan. WooCommerce-specific fixes. Increase conversions.
          </p>
          <Link
            href="/"
            className="inline-block bg-white text-purple-700 font-bold px-8 py-4 rounded-lg hover:bg-purple-50 transition"
          >
            Scan My WooCommerce Store →
          </Link>
        </div>
      </div>
    </main>
  );
}
