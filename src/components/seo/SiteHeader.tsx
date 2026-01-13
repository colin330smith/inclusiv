"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Shield,
  Menu,
  X,
  ChevronDown,
  Globe,
  FileText,
  Scale,
  Building2,
  ShoppingCart,
  BookOpen,
  Wrench,
} from "lucide-react";

const navigationGroups = {
  solutions: {
    label: "Solutions",
    icon: Building2,
    items: [
      {
        title: "By Industry",
        links: [
          { label: "Healthcare", href: "/healthcare" },
          { label: "Finance", href: "/finance" },
          { label: "SaaS", href: "/saas" },
          { label: "E-commerce", href: "/eu-ecommerce" },
          { label: "Enterprise", href: "/enterprise" },
          { label: "Agencies", href: "/agency" },
        ],
      },
      {
        title: "By Platform",
        links: [
          { label: "Shopify", href: "/shopify-accessibility" },
          { label: "WordPress", href: "/wordpress-accessibility" },
          { label: "WooCommerce", href: "/woocommerce-accessibility" },
          { label: "Magento", href: "/magento-accessibility" },
          { label: "BigCommerce", href: "/bigcommerce-accessibility" },
        ],
      },
    ],
  },
  tools: {
    label: "Tools",
    icon: Wrench,
    items: [
      {
        title: "Free Tools",
        links: [
          { label: "Accessibility Scanner", href: "/#scanner" },
          { label: "WCAG Checker", href: "/wcag-checker" },
          { label: "Statement Generator", href: "/accessibility-statement-generator" },
          { label: "Score Checker", href: "/tools/score-checker" },
        ],
      },
      {
        title: "Checklists",
        links: [
          { label: "EAA Compliance Checklist", href: "/eaa-compliance-checklist" },
          { label: "WCAG 2.1 AA Checklist", href: "/wcag-21-aa-checklist" },
          { label: "Accessibility Audit Checklist", href: "/blog/accessibility-audit-checklist" },
        ],
      },
    ],
  },
  resources: {
    label: "Resources",
    icon: BookOpen,
    items: [
      {
        title: "Guides",
        links: [
          { label: "EAA Compliance Guide", href: "/eaa-compliance" },
          { label: "WCAG Guidelines", href: "/wcag-guidelines" },
          { label: "Accessibility 101", href: "/accessibility-guide" },
          { label: "ADA Compliance", href: "/ada-compliance" },
          { label: "EU Directive", href: "/eu-web-accessibility-directive" },
        ],
      },
      {
        title: "Learn",
        links: [
          { label: "Blog", href: "/blog" },
          { label: "Documentation", href: "/docs" },
          { label: "Knowledge Base", href: "/docs/knowledge-base" },
          { label: "FAQ", href: "/faq" },
        ],
      },
    ],
  },
  compare: {
    label: "Compare",
    icon: Scale,
    items: [
      {
        title: "Alternatives",
        links: [
          { label: "Inclusiv vs accessiBe", href: "/compare/inclusiv-vs-accessibe" },
          { label: "Inclusiv vs UserWay", href: "/compare/inclusiv-vs-userway" },
          { label: "Inclusiv vs AudioEye", href: "/compare/inclusiv-vs-audioeye" },
        ],
      },
    ],
  },
};

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <header className="bg-zinc-950/95 backdrop-blur-sm border-b border-zinc-800 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-indigo-500" />
            <span className="text-white font-bold text-xl">Inclusiv</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {Object.entries(navigationGroups).map(([key, group]) => (
              <div
                key={key}
                className="relative"
                onMouseEnter={() => setActiveDropdown(key)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center gap-1 px-3 py-2 text-zinc-300 hover:text-white transition-colors text-sm">
                  {group.label}
                  <ChevronDown className="w-4 h-4" />
                </button>

                {/* Dropdown Menu */}
                {activeDropdown === key && (
                  <div className="absolute top-full left-0 w-[480px] bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl p-4 mt-1">
                    <div className="grid grid-cols-2 gap-6">
                      {group.items.map((section, idx) => (
                        <div key={idx}>
                          <h4 className="text-xs uppercase tracking-wide text-zinc-500 mb-3">
                            {section.title}
                          </h4>
                          <ul className="space-y-2">
                            {section.links.map((link) => (
                              <li key={link.href}>
                                <Link
                                  href={link.href}
                                  className="text-zinc-300 hover:text-indigo-400 transition-colors text-sm block py-1"
                                >
                                  {link.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Direct Links */}
            <Link
              href="/accessibility-checker"
              className="flex items-center gap-1 px-3 py-2 text-zinc-300 hover:text-white transition-colors text-sm"
            >
              <Globe className="w-4 h-4" />
              EU Cities
            </Link>

            <Link
              href="/pricing"
              className="px-3 py-2 text-zinc-300 hover:text-white transition-colors text-sm"
            >
              Pricing
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/contact"
              className="text-zinc-300 hover:text-white transition-colors text-sm"
            >
              Contact
            </Link>
            <Link
              href="/#scanner"
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium py-2 px-4 rounded-lg transition-all text-sm"
            >
              Free Scan
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-zinc-400 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-zinc-900 border-t border-zinc-800 max-h-[80vh] overflow-y-auto">
          <div className="p-4 space-y-6">
            {Object.entries(navigationGroups).map(([key, group]) => (
              <div key={key}>
                <h3 className="text-white font-semibold mb-3">{group.label}</h3>
                <div className="space-y-4">
                  {group.items.map((section, idx) => (
                    <div key={idx}>
                      <h4 className="text-xs uppercase tracking-wide text-zinc-500 mb-2">
                        {section.title}
                      </h4>
                      <ul className="space-y-2 ml-2">
                        {section.links.map((link) => (
                          <li key={link.href}>
                            <Link
                              href={link.href}
                              className="text-zinc-400 hover:text-indigo-400 text-sm"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="border-t border-zinc-800 pt-4 space-y-3">
              <Link
                href="/accessibility-checker"
                className="flex items-center gap-2 text-zinc-400 hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Globe className="w-4 h-4" />
                EU Cities
              </Link>
              <Link
                href="/pricing"
                className="text-zinc-400 hover:text-white block"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="/contact"
                className="text-zinc-400 hover:text-white block"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                href="/#scanner"
                className="block w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium py-3 px-4 rounded-lg text-center mt-4"
                onClick={() => setMobileMenuOpen(false)}
              >
                Free Accessibility Scan
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default SiteHeader;
