import { Metadata } from 'next';
import Link from 'next/link';
import { Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'WordPress Accessibility Checker | WCAG Compliance Scanner',
  description: 'Free WordPress accessibility scanner. Check your WordPress site for WCAG 2.1 compliance. Works with all themes and plugins. EAA deadline June 2025.',
  keywords: ['WordPress accessibility', 'WordPress WCAG', 'WordPress ADA', 'WordPress accessibility plugin', 'WordPress accessibility checker'],
  openGraph: {
    title: 'WordPress Accessibility Checker - Free Scan',
    description: 'Scan your WordPress site for accessibility issues. Works with all themes.',
  },
};

export default function WordPressAccessibilityPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-[#21759b] p-3 rounded-lg">
            <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zM3.443 12c0-.794.118-1.56.321-2.291l3.528 9.674C4.757 17.598 3.443 14.98 3.443 12zm8.557 8.557c-.794 0-1.56-.118-2.291-.321l2.434-7.073 2.494 6.835c.017.041.038.078.059.114a8.553 8.553 0 01-2.696.445zm1.122-12.558c.489-.026.929-.078.929-.078.437-.052.386-.695-.052-.669 0 0-1.315.104-2.164.104-.797 0-2.139-.104-2.139-.104-.438-.026-.489.643-.052.669 0 0 .413.052.849.078l1.262 3.458-1.772 5.312-2.949-8.77c.489-.026.929-.078.929-.078.437-.052.386-.695-.052-.669 0 0-1.315.104-2.164.104a4.88 4.88 0 01-.321-.013c.985-1.495 2.663-2.494 4.589-2.533 1.447.013 2.768.555 3.771 1.411-.024-.013-.047-.029-.073-.039-1.021 0-1.745.888-1.745 1.841 0 .854.494 1.576 1.021 2.431.398.697.854 1.589.854 2.878 0 .894-.343 1.932-.797 3.378l-1.045 3.494z"/>
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">
            WordPress Accessibility Checker
          </h1>
        </div>

        <p className="text-xl text-slate-300 mb-8">
          Make your WordPress site accessible to everyone. Scan for WCAG 2.1 issues
          and get fixes that work with any theme or page builder.
        </p>

        <div className="bg-blue-600 rounded-xl p-8 text-center mb-12">
          <h2 className="text-2xl font-bold mb-4">Scan Your WordPress Site - Free</h2>
          <p className="text-blue-100 mb-6">
            Works with Elementor, Divi, Gutenberg, and all themes.
          </p>
          <Link
            href="/"
            className="inline-block bg-white text-blue-600 font-bold px-8 py-4 rounded-lg hover:bg-blue-50 transition"
          >
            Check WordPress Accessibility →
          </Link>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Common WordPress Accessibility Issues</h2>
          <div className="space-y-4">
            <div className="bg-slate-700/50 rounded-lg p-4 border-l-4 border-red-500">
              <h3 className="font-semibold text-lg mb-1">Theme Accessibility Problems</h3>
              <p className="text-slate-300 text-sm">Many popular themes have contrast issues, missing focus states, and poor heading structure</p>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-4 border-l-4 border-red-500">
              <h3 className="font-semibold text-lg mb-1">Slider & Carousel Issues</h3>
              <p className="text-slate-300 text-sm">Auto-playing sliders without pause controls violate WCAG guidelines</p>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-4 border-l-4 border-amber-500">
              <h3 className="font-semibold text-lg mb-1">Page Builder Problems</h3>
              <p className="text-slate-300 text-sm">Elementor, Divi, and WPBakery often generate inaccessible HTML</p>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-4 border-l-4 border-amber-500">
              <h3 className="font-semibold text-lg mb-1">Plugin Conflicts</h3>
              <p className="text-slate-300 text-sm">Contact forms, popups, and social plugins frequently lack accessibility</p>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-4 border-l-4 border-yellow-500">
              <h3 className="font-semibold text-lg mb-1">Media Library Issues</h3>
              <p className="text-slate-300 text-sm">Images uploaded without alt text remain permanently inaccessible</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">WordPress Theme Compatibility</h2>
          <p className="text-slate-300 mb-4">
            Our scanner works with all WordPress themes, including:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {['Astra', 'Divi', 'Elementor', 'OceanWP', 'GeneratePress', 'Kadence', 'Neve', 'Avada', 'Enfold', 'flavflavor Theme', 'Twenty Twenty-Four', 'Starter Templates'].map((theme) => (
              <div key={theme} className="bg-slate-700/30 rounded-lg p-3 text-center">
                <span className="text-slate-200 text-sm">{theme}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Page Builder Support</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-slate-700/50 rounded-lg p-6 text-center">
              <div className="text-3xl mb-2">🔧</div>
              <h3 className="font-semibold text-lg mb-2">Elementor</h3>
              <p className="text-slate-300 text-sm">Full support for Elementor Pro and Free</p>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-6 text-center">
              <div className="text-3xl mb-2">🎨</div>
              <h3 className="font-semibold text-lg mb-2">Divi</h3>
              <p className="text-slate-300 text-sm">Compatible with Divi Builder and theme</p>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-6 text-center">
              <div className="text-3xl mb-2">📝</div>
              <h3 className="font-semibold text-lg mb-2">Gutenberg</h3>
              <p className="text-slate-300 text-sm">Native block editor fully supported</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Why WordPress Sites Need Accessibility</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-700/50 rounded-lg p-6">
              <h3 className="font-semibold text-lg text-blue-400 mb-2">43% of the Web</h3>
              <p className="text-slate-300 text-sm">
                WordPress powers 43% of all websites. Most have accessibility issues
                that put businesses at legal and reputational risk.
              </p>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-6">
              <h3 className="font-semibold text-lg text-red-400 mb-2">EAA Deadline</h3>
              <p className="text-slate-300 text-sm">
                By June 28, 2025, all EU business websites must be WCAG 2.1 AA
                compliant. Fines up to €100,000.
              </p>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-6">
              <h3 className="font-semibold text-lg text-amber-400 mb-2">ADA Lawsuits</h3>
              <p className="text-slate-300 text-sm">
                WordPress sites are frequent targets for ADA lawsuits.
                Average settlement: $25,000-$100,000.
              </p>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-6">
              <h3 className="font-semibold text-lg text-green-400 mb-2">Better SEO</h3>
              <p className="text-slate-300 text-sm">
                Accessible WordPress sites rank higher. Google rewards proper
                headings, alt text, and semantic HTML.
              </p>
            </div>
          </div>
        </section>

        <div className="bg-gradient-to-r from-[#21759b] to-[#0073aa] rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Make Your WordPress Site Accessible</h2>
          <p className="text-blue-100 mb-6">
            Free scan. Instant results. Works with any theme or plugin.
          </p>
          <Link
            href="/"
            className="inline-block bg-white text-blue-700 font-bold px-8 py-4 rounded-lg hover:bg-blue-50 transition"
          >
            Scan My WordPress Site →
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-700 mt-24">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-slate-400">
              <Shield className="w-5 h-5" />
              <span>Inclusiv © 2025</span>
              <span className="text-slate-600">|</span>
              <span>Powered by axe-core</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-slate-400 text-sm">
              <Link href="/" className="hover:text-white transition-colors">Scanner</Link>
              <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
