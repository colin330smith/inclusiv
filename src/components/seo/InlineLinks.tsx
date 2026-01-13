"use client";

import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";

// Inline contextual link component for embedding within content
interface InlineLinkProps {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  className?: string;
}

export function InlineLink({ href, children, external = false, className = "" }: InlineLinkProps) {
  const isExternal = external || href.startsWith("http");

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`text-indigo-400 hover:text-indigo-300 underline decoration-indigo-400/30 hover:decoration-indigo-300 transition-colors inline-flex items-center gap-1 ${className}`}
      >
        {children}
        <ExternalLink className="w-3 h-3" />
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={`text-indigo-400 hover:text-indigo-300 underline decoration-indigo-400/30 hover:decoration-indigo-300 transition-colors ${className}`}
    >
      {children}
    </Link>
  );
}

// Callout box with links to related content
interface LinkCalloutProps {
  title: string;
  description?: string;
  href: string;
  variant?: "default" | "highlight" | "warning";
  className?: string;
}

export function LinkCallout({
  title,
  description,
  href,
  variant = "default",
  className = "",
}: LinkCalloutProps) {
  const variantStyles = {
    default: "bg-zinc-800/50 border-zinc-700 hover:border-indigo-500/50",
    highlight: "bg-indigo-900/20 border-indigo-500/30 hover:border-indigo-400",
    warning: "bg-amber-900/20 border-amber-500/30 hover:border-amber-400",
  };

  return (
    <Link
      href={href}
      className={`block p-4 rounded-lg border transition-all group ${variantStyles[variant]} ${className}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <h4 className="text-white font-medium group-hover:text-indigo-400 transition-colors">
            {title}
          </h4>
          {description && (
            <p className="text-zinc-400 text-sm mt-1">{description}</p>
          )}
        </div>
        <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-indigo-400 transition-colors mt-1" />
      </div>
    </Link>
  );
}

// Multi-link callout box
interface MultiLinkCalloutProps {
  title: string;
  links: Array<{ label: string; href: string }>;
  className?: string;
}

export function MultiLinkCallout({ title, links, className = "" }: MultiLinkCalloutProps) {
  return (
    <div className={`bg-zinc-800/30 border border-zinc-700 rounded-lg p-4 ${className}`}>
      <h4 className="text-white font-medium mb-3">{title}</h4>
      <div className="flex flex-wrap gap-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="inline-flex items-center gap-1 text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            {link.label}
            <ArrowRight className="w-3 h-3" />
          </Link>
        ))}
      </div>
    </div>
  );
}

// "Read More" section for end of content
interface ReadMoreProps {
  links: Array<{
    title: string;
    href: string;
    description?: string;
  }>;
  title?: string;
  className?: string;
}

export function ReadMore({ links, title = "Continue Reading", className = "" }: ReadMoreProps) {
  return (
    <div className={`mt-12 pt-8 border-t border-zinc-800 ${className}`}>
      <h3 className="text-xl font-semibold text-white mb-6">{title}</h3>
      <div className="grid sm:grid-cols-2 gap-4">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex items-start gap-3 p-4 bg-zinc-900/50 border border-zinc-800 rounded-lg hover:border-indigo-500/50 transition-all group"
          >
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center flex-shrink-0">
              <ArrowRight className="w-4 h-4 text-indigo-400" />
            </div>
            <div>
              <h4 className="text-white font-medium group-hover:text-indigo-400 transition-colors">
                {link.title}
              </h4>
              {link.description && (
                <p className="text-zinc-500 text-sm mt-1">{link.description}</p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

// Sidebar links widget
interface SidebarLinksProps {
  title: string;
  links: Array<{
    label: string;
    href: string;
    badge?: string;
  }>;
  className?: string;
}

export function SidebarLinks({ title, links, className = "" }: SidebarLinksProps) {
  return (
    <div className={`bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 ${className}`}>
      <h3 className="text-white font-semibold mb-4">{title}</h3>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="flex items-center justify-between text-zinc-400 hover:text-indigo-400 transition-colors text-sm py-1"
            >
              <span>{link.label}</span>
              {link.badge && (
                <span className="text-xs bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded">
                  {link.badge}
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Quick navigation for long-form content
interface QuickNavItem {
  id: string;
  label: string;
  children?: QuickNavItem[];
}

interface QuickNavProps {
  items: QuickNavItem[];
  title?: string;
  className?: string;
}

export function QuickNav({ items, title = "On This Page", className = "" }: QuickNavProps) {
  return (
    <nav className={`bg-zinc-900/30 border border-zinc-800 rounded-xl p-4 ${className}`}>
      <h3 className="text-white font-semibold mb-4">{title}</h3>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="text-zinc-400 hover:text-indigo-400 transition-colors text-sm"
            >
              {item.label}
            </a>
            {item.children && item.children.length > 0 && (
              <ul className="ml-4 mt-2 space-y-1">
                {item.children.map((child) => (
                  <li key={child.id}>
                    <a
                      href={`#${child.id}`}
                      className="text-zinc-500 hover:text-indigo-400 transition-colors text-xs"
                    >
                      {child.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

// Pre-built link collections for common scenarios
export const commonLinks = {
  eaaRelated: [
    { label: "EAA Compliance Guide", href: "/eaa-compliance" },
    { label: "EAA Checklist", href: "/eaa-compliance-checklist" },
    { label: "EAA vs ADA", href: "/blog/eaa-vs-ada-comparison" },
    { label: "EAA Deadline Info", href: "/blog/eaa-compliance-guide-2025" },
  ],
  wcagRelated: [
    { label: "WCAG Guidelines", href: "/wcag-guidelines" },
    { label: "WCAG 2.1 AA Checklist", href: "/wcag-21-aa-checklist" },
    { label: "WCAG Checker Tool", href: "/wcag-checker" },
    { label: "WCAG Compliance Guide", href: "/blog/wcag-compliance-complete-guide" },
  ],
  toolsRelated: [
    { label: "Free Scanner", href: "/#scanner" },
    { label: "WCAG Checker", href: "/wcag-checker" },
    { label: "Statement Generator", href: "/accessibility-statement-generator" },
    { label: "Testing Tools", href: "/blog/accessibility-testing-tools-2025" },
  ],
  platformRelated: [
    { label: "Shopify", href: "/shopify-accessibility" },
    { label: "WordPress", href: "/wordpress-accessibility" },
    { label: "WooCommerce", href: "/woocommerce-accessibility" },
    { label: "Magento", href: "/magento-accessibility" },
  ],
  industryRelated: [
    { label: "Healthcare", href: "/healthcare" },
    { label: "Finance", href: "/finance" },
    { label: "E-commerce", href: "/eu-ecommerce" },
    { label: "Enterprise", href: "/enterprise" },
  ],
};

export default InlineLink;
