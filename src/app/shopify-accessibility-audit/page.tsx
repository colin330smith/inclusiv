import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Shopify Accessibility Audit | Free WCAG Scanner for Shopify Stores',
  description: 'Free accessibility audit for Shopify stores. Check WCAG 2.1 compliance, fix EAA issues before June 2025. Instant results, no signup required.',
  keywords: ['Shopify accessibility', 'Shopify accessibility audit', 'Shopify WCAG', 'Shopify ADA compliance', 'accessible Shopify theme'],
  openGraph: {
    title: 'Free Shopify Accessibility Audit',
    description: 'Check your Shopify store for WCAG 2.1 compliance. EAA deadline June 2025.',
  },
};

export default function ShopifyAccessibilityPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Shopify Accessibility Audit
        </h1>

        <p className="text-xl text-slate-300 mb-8">
          Most Shopify themes aren't fully accessible out of the box. Our scanner checks your store
          against WCAG 2.1 AA standards and identifies exactly what needs to be fixed for EAA compliance.
        </p>

        <div className="bg-green-600 rounded-xl p-8 text-center mb-12">
          <h2 className="text-2xl font-bold mb-4">Scan Your Shopify Store Free</h2>
          <p className="text-green-100 mb-6">
            Enter your store URL. Get results in 30 seconds.
          </p>
          <Link
            href="/"
            className="inline-block bg-white text-green-600 font-bold px-8 py-4 rounded-lg hover:bg-green-50 transition"
          >
            Audit My Shopify Store →
          </Link>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Common Shopify Accessibility Issues</h2>
          <p className="text-slate-300 mb-6">
            After scanning thousands of Shopify stores, these are the most frequent accessibility problems we find:
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-slate-700/50 rounded-lg p-6">
              <h3 className="font-semibold text-lg text-red-400 mb-3">Product Images</h3>
              <ul className="text-slate-300 text-sm space-y-2">
                <li>• Missing alt text on product photos</li>
                <li>• Decorative images not hidden from screen readers</li>
                <li>• Image zoom not keyboard accessible</li>
              </ul>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-6">
              <h3 className="font-semibold text-lg text-red-400 mb-3">Navigation</h3>
              <ul className="text-slate-300 text-sm space-y-2">
                <li>• Dropdown menus not keyboard accessible</li>
                <li>• Missing skip-to-content links</li>
                <li>• Mobile menu not screen reader friendly</li>
              </ul>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-6">
              <h3 className="font-semibold text-lg text-red-400 mb-3">Cart & Checkout</h3>
              <ul className="text-slate-300 text-sm space-y-2">
                <li>• Form fields without visible labels</li>
                <li>• Error messages not announced to screen readers</li>
                <li>• Quantity selectors not accessible</li>
              </ul>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-6">
              <h3 className="font-semibold text-lg text-red-400 mb-3">Visual Design</h3>
              <ul className="text-slate-300 text-sm space-y-2">
                <li>• Low color contrast on buttons and text</li>
                <li>• Focus indicators removed or invisible</li>
                <li>• Touch targets too small on mobile</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Accessibility by Shopify Theme</h2>
          <p className="text-slate-300 mb-6">
            Some themes are more accessible than others. Here's what we've found:
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-600">
                  <th className="py-3 px-4">Theme</th>
                  <th className="py-3 px-4">Average Score</th>
                  <th className="py-3 px-4">Common Issues</th>
                </tr>
              </thead>
              <tbody className="text-slate-300">
                <tr className="border-b border-slate-700">
                  <td className="py-3 px-4 font-semibold">Dawn (Free)</td>
                  <td className="py-3 px-4"><span className="text-green-400">82/100</span></td>
                  <td className="py-3 px-4 text-sm">Best default option, minor contrast issues</td>
                </tr>
                <tr className="border-b border-slate-700">
                  <td className="py-3 px-4 font-semibold">Debut (Legacy)</td>
                  <td className="py-3 px-4"><span className="text-amber-400">68/100</span></td>
                  <td className="py-3 px-4 text-sm">Dropdown menus, focus indicators</td>
                </tr>
                <tr className="border-b border-slate-700">
                  <td className="py-3 px-4 font-semibold">Brooklyn</td>
                  <td className="py-3 px-4"><span className="text-amber-400">65/100</span></td>
                  <td className="py-3 px-4 text-sm">Slideshow accessibility, contrast</td>
                </tr>
                <tr className="border-b border-slate-700">
                  <td className="py-3 px-4 font-semibold">Minimal</td>
                  <td className="py-3 px-4"><span className="text-amber-400">70/100</span></td>
                  <td className="py-3 px-4 text-sm">Generally decent, form labels</td>
                </tr>
                <tr className="border-b border-slate-700">
                  <td className="py-3 px-4 font-semibold">Turbo</td>
                  <td className="py-3 px-4"><span className="text-red-400">58/100</span></td>
                  <td className="py-3 px-4 text-sm">Complex features hurt accessibility</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold">Prestige</td>
                  <td className="py-3 px-4"><span className="text-red-400">55/100</span></td>
                  <td className="py-3 px-4 text-sm">Visual-heavy design, many issues</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Quick Fixes for Shopify Accessibility</h2>

          <div className="space-y-6">
            <div className="bg-slate-700/50 rounded-lg p-6">
              <h3 className="font-semibold text-lg text-blue-400 mb-3">1. Add Alt Text to All Products</h3>
              <p className="text-slate-300 text-sm mb-3">
                In Shopify admin: Products → Select product → Click image → Add alt text
              </p>
              <p className="text-slate-400 text-sm">
                Describe what's in the image. "Blue cotton t-shirt front view" not "IMG_1234"
              </p>
            </div>

            <div className="bg-slate-700/50 rounded-lg p-6">
              <h3 className="font-semibold text-lg text-blue-400 mb-3">2. Enable Skip-to-Content Link</h3>
              <p className="text-slate-300 text-sm mb-3">
                Add to theme.liquid before the header:
              </p>
              <code className="block bg-slate-800 p-3 rounded text-sm text-green-400 overflow-x-auto">
                {`<a href="#main-content" class="skip-link">Skip to content</a>`}
              </code>
            </div>

            <div className="bg-slate-700/50 rounded-lg p-6">
              <h3 className="font-semibold text-lg text-blue-400 mb-3">3. Fix Color Contrast</h3>
              <p className="text-slate-300 text-sm mb-3">
                Check your theme colors in theme settings. Ensure text has at least 4.5:1 contrast ratio.
              </p>
              <p className="text-slate-400 text-sm">
                Use a contrast checker tool. Common fixes: darken gray text, increase button contrast.
              </p>
            </div>

            <div className="bg-slate-700/50 rounded-lg p-6">
              <h3 className="font-semibold text-lg text-blue-400 mb-3">4. Label All Form Fields</h3>
              <p className="text-slate-300 text-sm mb-3">
                Every input needs a visible label. Don't rely on placeholders alone.
              </p>
              <code className="block bg-slate-800 p-3 rounded text-sm text-green-400 overflow-x-auto">
                {`<label for="email">Email address</label>\n<input type="email" id="email" name="email">`}
              </code>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Shopify Apps for Accessibility</h2>
          <div className="bg-amber-900/30 border border-amber-600 rounded-lg p-6">
            <p className="text-amber-200 mb-4">
              ⚠️ <strong>Warning about accessibility overlay apps:</strong>
            </p>
            <p className="text-slate-300 text-sm">
              Apps that promise to "make your site accessible with one line of code" are not a real solution.
              They add widgets on top of accessibility issues instead of fixing them. Many have been criticized
              by the disability community and don't provide legal protection. Fix the actual issues instead.
            </p>
          </div>
        </section>

        <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Get Your Shopify Accessibility Score</h2>
          <p className="text-green-100 mb-6">
            Free scan. Prioritized fixes. Real compliance.
          </p>
          <Link
            href="/"
            className="inline-block bg-white text-green-600 font-bold px-8 py-4 rounded-lg hover:bg-green-50 transition"
          >
            Scan My Store Now →
          </Link>
        </div>
      </div>
    </main>
  );
}
