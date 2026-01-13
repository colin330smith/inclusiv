"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

// Breadcrumb path mappings for SEO
export const breadcrumbPaths: Record<string, BreadcrumbItem[]> = {
  // Pillar pages
  "/eaa-compliance": [
    { label: "Home", href: "/" },
    { label: "EAA Compliance" },
  ],
  "/wcag-guidelines": [
    { label: "Home", href: "/" },
    { label: "WCAG Guidelines" },
  ],
  "/accessibility-guide": [
    { label: "Home", href: "/" },
    { label: "Accessibility Guide" },
  ],
  "/ada-compliance": [
    { label: "Home", href: "/" },
    { label: "ADA Compliance" },
  ],
  "/eu-web-accessibility-directive": [
    { label: "Home", href: "/" },
    { label: "EU Web Accessibility Directive" },
  ],

  // Blog
  "/blog": [
    { label: "Home", href: "/" },
    { label: "Blog" },
  ],

  // Comparisons
  "/compare/inclusiv-vs-accessibe": [
    { label: "Home", href: "/" },
    { label: "Compare", href: "/compare" },
    { label: "Inclusiv vs accessiBe" },
  ],
  "/compare/inclusiv-vs-userway": [
    { label: "Home", href: "/" },
    { label: "Compare", href: "/compare" },
    { label: "Inclusiv vs UserWay" },
  ],
  "/compare/inclusiv-vs-audioeye": [
    { label: "Home", href: "/" },
    { label: "Compare", href: "/compare" },
    { label: "Inclusiv vs AudioEye" },
  ],

  // Tools
  "/wcag-checker": [
    { label: "Home", href: "/" },
    { label: "Tools" },
    { label: "WCAG Checker" },
  ],
  "/accessibility-statement-generator": [
    { label: "Home", href: "/" },
    { label: "Tools" },
    { label: "Accessibility Statement Generator" },
  ],
  "/eaa-compliance-checklist": [
    { label: "Home", href: "/" },
    { label: "Tools" },
    { label: "EAA Compliance Checklist" },
  ],
  "/wcag-21-aa-checklist": [
    { label: "Home", href: "/" },
    { label: "Tools" },
    { label: "WCAG 2.1 AA Checklist" },
  ],

  // Accessibility Checker
  "/accessibility-checker": [
    { label: "Home", href: "/" },
    { label: "Accessibility Checker" },
  ],

  // Industries
  "/healthcare": [
    { label: "Home", href: "/" },
    { label: "Industries" },
    { label: "Healthcare" },
  ],
  "/finance": [
    { label: "Home", href: "/" },
    { label: "Industries" },
    { label: "Finance" },
  ],
  "/saas": [
    { label: "Home", href: "/" },
    { label: "Industries" },
    { label: "SaaS" },
  ],
  "/enterprise": [
    { label: "Home", href: "/" },
    { label: "Industries" },
    { label: "Enterprise" },
  ],
  "/agency": [
    { label: "Home", href: "/" },
    { label: "Industries" },
    { label: "Agency" },
  ],

  // Platforms
  "/shopify-accessibility": [
    { label: "Home", href: "/" },
    { label: "Platforms" },
    { label: "Shopify" },
  ],
  "/wordpress-accessibility": [
    { label: "Home", href: "/" },
    { label: "Platforms" },
    { label: "WordPress" },
  ],
  "/woocommerce-accessibility": [
    { label: "Home", href: "/" },
    { label: "Platforms" },
    { label: "WooCommerce" },
  ],
  "/magento-accessibility": [
    { label: "Home", href: "/" },
    { label: "Platforms" },
    { label: "Magento" },
  ],
  "/bigcommerce-accessibility": [
    { label: "Home", href: "/" },
    { label: "Platforms" },
    { label: "BigCommerce" },
  ],

  // Docs
  "/docs": [
    { label: "Home", href: "/" },
    { label: "Documentation" },
  ],
  "/docs/guides/getting-started": [
    { label: "Home", href: "/" },
    { label: "Documentation", href: "/docs" },
    { label: "Getting Started" },
  ],
  "/docs/knowledge-base": [
    { label: "Home", href: "/" },
    { label: "Documentation", href: "/docs" },
    { label: "Knowledge Base" },
  ],
  "/docs/api": [
    { label: "Home", href: "/" },
    { label: "Documentation", href: "/docs" },
    { label: "API Reference" },
  ],

  // Other pages
  "/pricing": [
    { label: "Home", href: "/" },
    { label: "Pricing" },
  ],
  "/contact": [
    { label: "Home", href: "/" },
    { label: "Contact" },
  ],
  "/faq": [
    { label: "Home", href: "/" },
    { label: "FAQ" },
  ],
};

// Generate breadcrumbs for blog posts
export function getBlogBreadcrumbs(slug: string, title: string): BreadcrumbItem[] {
  return [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: title },
  ];
}

// Generate breadcrumbs for city pages
export function getCityBreadcrumbs(citySlug: string, cityName: string): BreadcrumbItem[] {
  return [
    { label: "Home", href: "/" },
    { label: "Accessibility Checker", href: "/accessibility-checker" },
    { label: cityName },
  ];
}

// Generate breadcrumbs for docs pages
export function getDocsBreadcrumbs(section: string, page: string, pageTitle: string): BreadcrumbItem[] {
  const sectionLabels: Record<string, string> = {
    "knowledge-base": "Knowledge Base",
    "api": "API Reference",
    "guides": "Guides",
    "integrations": "Integrations",
    "troubleshooting": "Troubleshooting",
  };

  return [
    { label: "Home", href: "/" },
    { label: "Documentation", href: "/docs" },
    { label: sectionLabels[section] || section, href: `/docs/${section}` },
    { label: pageTitle },
  ];
}

export function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex items-center text-sm text-zinc-400 ${className}`}
    >
      <ol className="flex items-center flex-wrap gap-1" itemScope itemType="https://schema.org/BreadcrumbList">
        {items.map((item, index) => (
          <li
            key={index}
            className="flex items-center"
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
          >
            {index > 0 && (
              <ChevronRight className="w-4 h-4 mx-1 text-zinc-600" aria-hidden="true" />
            )}
            {item.href ? (
              <Link
                href={item.href}
                className="hover:text-indigo-400 transition-colors flex items-center gap-1"
                itemProp="item"
              >
                {index === 0 && <Home className="w-3.5 h-3.5" />}
                <span itemProp="name">{item.label}</span>
              </Link>
            ) : (
              <span className="text-zinc-300" itemProp="name">
                {item.label}
              </span>
            )}
            <meta itemProp="position" content={String(index + 1)} />
          </li>
        ))}
      </ol>
    </nav>
  );
}

// JSON-LD Schema for breadcrumbs
export function getBreadcrumbSchema(items: BreadcrumbItem[], baseUrl: string = "https://inclusiv.app") {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": item.href ? `${baseUrl}${item.href}` : undefined,
    })),
  };
}

export default Breadcrumbs;
