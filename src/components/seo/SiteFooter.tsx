import Link from "next/link";
import { Shield, Mail, Twitter, Linkedin, Github } from "lucide-react";

const footerLinks = {
  product: [
    { label: "Free Scanner", href: "/#scanner" },
    { label: "WCAG Checker", href: "/wcag-checker" },
    { label: "Statement Generator", href: "/accessibility-statement-generator" },
    { label: "EAA Checklist", href: "/eaa-compliance-checklist" },
    { label: "WCAG 2.1 Checklist", href: "/wcag-21-aa-checklist" },
    { label: "Pricing", href: "/pricing" },
  ],
  guides: [
    { label: "EAA Compliance", href: "/eaa-compliance" },
    { label: "WCAG Guidelines", href: "/wcag-guidelines" },
    { label: "Accessibility 101", href: "/accessibility-guide" },
    { label: "ADA Compliance", href: "/ada-compliance" },
    { label: "EU Directive", href: "/eu-web-accessibility-directive" },
    { label: "Blog", href: "/blog" },
  ],
  platforms: [
    { label: "Shopify", href: "/shopify-accessibility" },
    { label: "WordPress", href: "/wordpress-accessibility" },
    { label: "WooCommerce", href: "/woocommerce-accessibility" },
    { label: "Magento", href: "/magento-accessibility" },
    { label: "BigCommerce", href: "/bigcommerce-accessibility" },
  ],
  industries: [
    { label: "Healthcare", href: "/healthcare" },
    { label: "Finance", href: "/finance" },
    { label: "SaaS", href: "/saas" },
    { label: "Enterprise", href: "/enterprise" },
    { label: "E-commerce", href: "/eu-ecommerce" },
    { label: "Agencies", href: "/agency" },
  ],
  compare: [
    { label: "vs accessiBe", href: "/compare/inclusiv-vs-accessibe" },
    { label: "vs UserWay", href: "/compare/inclusiv-vs-userway" },
    { label: "vs AudioEye", href: "/compare/inclusiv-vs-audioeye" },
  ],
  resources: [
    { label: "Documentation", href: "/docs" },
    { label: "API Reference", href: "/docs/api" },
    { label: "Knowledge Base", href: "/docs/knowledge-base" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Accessibility Statement", href: "/accessibility-statement" },
  ],
  cities: [
    { label: "Berlin", href: "/accessibility-checker/berlin" },
    { label: "Paris", href: "/accessibility-checker/paris" },
    { label: "Amsterdam", href: "/accessibility-checker/amsterdam" },
    { label: "Madrid", href: "/accessibility-checker/madrid" },
    { label: "Rome", href: "/accessibility-checker/rome" },
    { label: "Milan", href: "/accessibility-checker/milan" },
    { label: "Barcelona", href: "/accessibility-checker/barcelona" },
    { label: "Vienna", href: "/accessibility-checker/vienna" },
    { label: "All Cities", href: "/accessibility-checker" },
  ],
};

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-950 border-t border-zinc-800">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-6">
          {/* Product */}
          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-zinc-400 hover:text-indigo-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Guides */}
          <div>
            <h3 className="text-white font-semibold mb-4">Guides</h3>
            <ul className="space-y-3">
              {footerLinks.guides.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-zinc-400 hover:text-indigo-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Platforms */}
          <div>
            <h3 className="text-white font-semibold mb-4">Platforms</h3>
            <ul className="space-y-3">
              {footerLinks.platforms.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-zinc-400 hover:text-indigo-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h3 className="text-white font-semibold mb-4">Industries</h3>
            <ul className="space-y-3">
              {footerLinks.industries.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-zinc-400 hover:text-indigo-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Compare */}
          <div>
            <h3 className="text-white font-semibold mb-4">Compare</h3>
            <ul className="space-y-3">
              {footerLinks.compare.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-zinc-400 hover:text-indigo-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="text-white font-semibold mt-6 mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.slice(0, 3).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-zinc-400 hover:text-indigo-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Cities */}
          <div>
            <h3 className="text-white font-semibold mb-4">EU Cities</h3>
            <ul className="space-y-3">
              {footerLinks.cities.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-zinc-400 hover:text-indigo-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Popular Blog Posts - SEO Link Building */}
        <div className="mt-12 pt-8 border-t border-zinc-800">
          <h3 className="text-white font-semibold mb-4">Popular Resources</h3>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <Link href="/blog/eaa-compliance-guide-2025" className="text-zinc-400 hover:text-indigo-400 transition-colors">
              EAA Compliance Guide 2025
            </Link>
            <Link href="/blog/wcag-compliance-complete-guide" className="text-zinc-400 hover:text-indigo-400 transition-colors">
              WCAG Compliance Guide
            </Link>
            <Link href="/blog/accessibility-testing-tools-2025" className="text-zinc-400 hover:text-indigo-400 transition-colors">
              Accessibility Testing Tools
            </Link>
            <Link href="/blog/alt-text-best-practices" className="text-zinc-400 hover:text-indigo-400 transition-colors">
              Alt Text Best Practices
            </Link>
            <Link href="/blog/keyboard-accessibility-guide" className="text-zinc-400 hover:text-indigo-400 transition-colors">
              Keyboard Accessibility
            </Link>
            <Link href="/blog/form-accessibility-guide" className="text-zinc-400 hover:text-indigo-400 transition-colors">
              Form Accessibility
            </Link>
            <Link href="/blog/eaa-vs-ada-comparison" className="text-zinc-400 hover:text-indigo-400 transition-colors">
              EAA vs ADA
            </Link>
            <Link href="/blog/accessibility-lawsuits-2025" className="text-zinc-400 hover:text-indigo-400 transition-colors">
              Accessibility Lawsuits
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Logo & Copyright */}
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-2">
                <Shield className="w-6 h-6 text-indigo-500" />
                <span className="text-white font-semibold">Inclusiv</span>
              </div>
              <span className="text-zinc-500 text-sm">
                © {currentYear} Inclusiv. All rights reserved.
              </span>
              <span className="hidden sm:inline text-zinc-600">|</span>
              <span className="text-zinc-500 text-sm">423 April Ln, Apopka, FL 32712</span>
              <span className="hidden sm:inline text-zinc-600">|</span>
              <a href="tel:+16502015786" className="text-zinc-500 hover:text-white text-sm transition-colors">(650) 201-5786</a>
            </div>

            {/* Legal Links */}
            <div className="flex items-center gap-6">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-zinc-400 hover:text-white transition-colors text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a
                href="https://twitter.com/inclusivapp"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/company/inclusiv"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/inclusiv"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="mailto:hello@inclusiv.app"
                className="text-zinc-400 hover:text-white transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Organization Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Inclusiv",
            "url": "https://inclusiv.app",
            "logo": "https://inclusiv.app/logo.png",
            "description": "AI-powered accessibility scanner for European Accessibility Act (EAA) and WCAG compliance.",
            "sameAs": [
              "https://twitter.com/inclusivapp",
              "https://linkedin.com/company/inclusiv",
              "https://github.com/inclusiv"
            ],
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "423 April Ln",
              "addressLocality": "Apopka",
              "addressRegion": "FL",
              "postalCode": "32712",
              "addressCountry": "US"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "email": "hello@inclusiv.app",
              "telephone": "+1-650-201-5786",
              "contactType": "customer support"
            }
          }),
        }}
      />
    </footer>
  );
}

export default SiteFooter;
