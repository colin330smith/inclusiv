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
    { label: "EAA Guide", href: "/eaa-guide" },
    { label: "ADA Compliance", href: "/ada-compliance" },
    { label: "EU Directive", href: "/eu-web-accessibility-directive" },
    { label: "EU Accessibility", href: "/eu-accessibility" },
    { label: "Blog", href: "/blog" },
  ],
  platforms: [
    { label: "Shopify", href: "/shopify-accessibility" },
    { label: "Shopify Audit", href: "/shopify-accessibility-audit" },
    { label: "WordPress", href: "/wordpress-accessibility" },
    { label: "WooCommerce", href: "/woocommerce-accessibility" },
    { label: "Magento", href: "/magento-accessibility" },
    { label: "BigCommerce", href: "/bigcommerce-accessibility" },
  ],
  resources: [
    { label: "Help Center", href: "/help" },
    { label: "Getting Started", href: "/help/getting-started" },
    { label: "Understanding Results", href: "/help/understanding-results" },
    { label: "Fixing Issues", href: "/help/fixing-issues" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ],
  blog: [
    { label: "EAA Compliance Guide", href: "/blog/eaa-compliance-guide-2025" },
    { label: "EAA vs ADA", href: "/blog/eaa-vs-ada-comparison" },
    { label: "EU E-commerce Study", href: "/blog/eu-ecommerce-accessibility-study" },
    { label: "Shopify WCAG Issues", href: "/blog/shopify-wcag-violations" },
    { label: "Statement Guide", href: "/blog/accessibility-statement-guide" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
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

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
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

          {/* Blog */}
          <div className="col-span-2">
            <h3 className="text-white font-semibold mb-4">Popular Articles</h3>
            <ul className="space-y-3">
              {footerLinks.blog.map((link) => (
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

        {/* Quick Links - SEO */}
        <div className="mt-12 pt-8 border-t border-zinc-800">
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <Link href="/blog/eaa-compliance-guide-2025" className="text-zinc-400 hover:text-indigo-400 transition-colors">
              EAA Compliance Guide
            </Link>
            <Link href="/blog/eaa-vs-ada-comparison" className="text-zinc-400 hover:text-indigo-400 transition-colors">
              EAA vs ADA
            </Link>
            <Link href="/blog/eu-ecommerce-accessibility-study" className="text-zinc-400 hover:text-indigo-400 transition-colors">
              EU E-commerce Study
            </Link>
            <Link href="/blog/shopify-wcag-violations" className="text-zinc-400 hover:text-indigo-400 transition-colors">
              Shopify WCAG Issues
            </Link>
            <Link href="/wcag-checker" className="text-zinc-400 hover:text-indigo-400 transition-colors">
              WCAG Checker
            </Link>
            <Link href="/accessibility-statement-generator" className="text-zinc-400 hover:text-indigo-400 transition-colors">
              Statement Generator
            </Link>
            <Link href="/website-accessibility-audit" className="text-zinc-400 hover:text-indigo-400 transition-colors">
              Website Audit
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
              <span className="text-zinc-400 text-sm">
                © {currentYear} Inclusiv. All rights reserved.
              </span>
              <span className="hidden sm:inline text-zinc-500">|</span>
              <span className="text-zinc-400 text-sm">423 April Ln, Apopka, FL 32712</span>
              <span className="hidden sm:inline text-zinc-500">|</span>
              <a href="tel:+16502015786" className="text-zinc-400 hover:text-white text-sm transition-colors">(650) 201-5786</a>
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
                href="mailto:colin330@me.com"
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
              "email": "colin330@me.com",
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
