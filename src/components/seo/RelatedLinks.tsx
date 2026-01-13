"use client";

import Link from "next/link";
import { ArrowRight, FileText, Scale, Globe, Building2, ShoppingCart, BookOpen } from "lucide-react";
import { LucideIcon } from "lucide-react";

// Comprehensive link categories for internal linking
export type LinkCategory =
  | "pillar"
  | "blog"
  | "comparison"
  | "city"
  | "industry"
  | "platform"
  | "tool"
  | "guide";

export interface RelatedLink {
  title: string;
  href: string;
  description?: string;
  category: LinkCategory;
  priority?: number;
}

// Master link registry for SEO-optimized internal linking
export const linkRegistry: Record<LinkCategory, RelatedLink[]> = {
  pillar: [
    {
      title: "EAA Compliance Guide",
      href: "/eaa-compliance",
      description: "Complete European Accessibility Act compliance guide for businesses",
      category: "pillar",
      priority: 1,
    },
    {
      title: "WCAG 2.1 Guidelines",
      href: "/wcag-guidelines",
      description: "Web Content Accessibility Guidelines explained for developers",
      category: "pillar",
      priority: 2,
    },
    {
      title: "Web Accessibility 101",
      href: "/accessibility-guide",
      description: "Beginner's guide to web accessibility and inclusive design",
      category: "pillar",
      priority: 3,
    },
    {
      title: "EU Web Accessibility Directive",
      href: "/eu-web-accessibility-directive",
      description: "Understanding the EU Web Accessibility Directive requirements",
      category: "pillar",
      priority: 4,
    },
    {
      title: "ADA Compliance",
      href: "/ada-compliance",
      description: "Americans with Disabilities Act web compliance guide",
      category: "pillar",
      priority: 5,
    },
  ],
  blog: [
    {
      title: "EAA Compliance Guide 2025",
      href: "/blog/eaa-compliance-guide-2025",
      description: "Everything you need to know about EAA compliance in 2025",
      category: "blog",
    },
    {
      title: "WCAG Compliance Complete Guide",
      href: "/blog/wcag-compliance-complete-guide",
      description: "Master WCAG 2.1 AA requirements step by step",
      category: "blog",
    },
    {
      title: "Accessibility Testing Tools 2025",
      href: "/blog/accessibility-testing-tools-2025",
      description: "Best tools for automated and manual accessibility testing",
      category: "blog",
    },
    {
      title: "Alt Text Best Practices",
      href: "/blog/alt-text-best-practices",
      description: "How to write effective image descriptions for screen readers",
      category: "blog",
    },
    {
      title: "Keyboard Accessibility Guide",
      href: "/blog/keyboard-accessibility-guide",
      description: "Ensure your site works without a mouse",
      category: "blog",
    },
    {
      title: "Color Contrast Checker Guide",
      href: "/blog/color-contrast-checker-guide",
      description: "Meeting WCAG color contrast requirements",
      category: "blog",
    },
    {
      title: "Form Accessibility Guide",
      href: "/blog/form-accessibility-guide",
      description: "Creating accessible forms for all users",
      category: "blog",
    },
    {
      title: "Screen Reader Testing Guide",
      href: "/blog/screen-reader-testing-guide",
      description: "How to test your website with screen readers",
      category: "blog",
    },
    {
      title: "ARIA Labels Best Practices",
      href: "/blog/aria-labels-best-practices",
      description: "Using ARIA to enhance accessibility",
      category: "blog",
    },
    {
      title: "Mobile Accessibility Guide",
      href: "/blog/mobile-accessibility-guide",
      description: "Making mobile experiences accessible",
      category: "blog",
    },
    {
      title: "PDF Accessibility Guide",
      href: "/blog/pdf-accessibility-guide",
      description: "Creating accessible PDF documents",
      category: "blog",
    },
    {
      title: "Video Accessibility & Captions",
      href: "/blog/video-accessibility-captions",
      description: "Adding captions and transcripts to video content",
      category: "blog",
    },
    {
      title: "Accessibility Audit Checklist",
      href: "/blog/accessibility-audit-checklist",
      description: "Step-by-step guide to auditing your website",
      category: "blog",
    },
    {
      title: "Accessibility Statement Guide",
      href: "/blog/accessibility-statement-guide",
      description: "How to write an effective accessibility statement",
      category: "blog",
    },
    {
      title: "EAA vs ADA Comparison",
      href: "/blog/eaa-vs-ada-comparison",
      description: "Differences between European and American accessibility laws",
      category: "blog",
    },
    {
      title: "Accessibility Lawsuits 2025",
      href: "/blog/accessibility-lawsuits-2025",
      description: "Understanding the legal landscape of web accessibility",
      category: "blog",
    },
    {
      title: "E-commerce Accessibility ROI",
      href: "/blog/ecommerce-accessibility-roi",
      description: "Business case for accessible e-commerce",
      category: "blog",
    },
    {
      title: "Shopify WCAG Violations",
      href: "/blog/shopify-wcag-violations",
      description: "Common accessibility issues in Shopify stores",
      category: "blog",
    },
    {
      title: "Website Redesign Accessibility",
      href: "/blog/website-redesign-accessibility",
      description: "Incorporating accessibility into website redesigns",
      category: "blog",
    },
    {
      title: "EU E-commerce Accessibility Study",
      href: "/blog/eu-ecommerce-accessibility-study",
      description: "Research on accessibility in EU online stores",
      category: "blog",
    },
  ],
  comparison: [
    {
      title: "Inclusiv vs accessiBe",
      href: "/compare/inclusiv-vs-accessibe",
      description: "Compare Inclusiv with accessiBe overlay solution",
      category: "comparison",
    },
    {
      title: "Inclusiv vs UserWay",
      href: "/compare/inclusiv-vs-userway",
      description: "Compare Inclusiv with UserWay accessibility widget",
      category: "comparison",
    },
    {
      title: "Inclusiv vs AudioEye",
      href: "/compare/inclusiv-vs-audioeye",
      description: "Compare Inclusiv with AudioEye accessibility platform",
      category: "comparison",
    },
  ],
  city: [
    { title: "Berlin", href: "/accessibility-checker/berlin", category: "city" },
    { title: "Paris", href: "/accessibility-checker/paris", category: "city" },
    { title: "Amsterdam", href: "/accessibility-checker/amsterdam", category: "city" },
    { title: "Madrid", href: "/accessibility-checker/madrid", category: "city" },
    { title: "Rome", href: "/accessibility-checker/rome", category: "city" },
    { title: "Vienna", href: "/accessibility-checker/vienna", category: "city" },
    { title: "Brussels", href: "/accessibility-checker/brussels", category: "city" },
    { title: "Stockholm", href: "/accessibility-checker/stockholm", category: "city" },
    { title: "Copenhagen", href: "/accessibility-checker/copenhagen", category: "city" },
    { title: "Dublin", href: "/accessibility-checker/dublin", category: "city" },
    { title: "Lisbon", href: "/accessibility-checker/lisbon", category: "city" },
    { title: "Warsaw", href: "/accessibility-checker/warsaw", category: "city" },
    { title: "Prague", href: "/accessibility-checker/prague", category: "city" },
    { title: "Budapest", href: "/accessibility-checker/budapest", category: "city" },
    { title: "Milan", href: "/accessibility-checker/milan", category: "city" },
    { title: "Barcelona", href: "/accessibility-checker/barcelona", category: "city" },
    { title: "Munich", href: "/accessibility-checker/munich", category: "city" },
    { title: "Hamburg", href: "/accessibility-checker/hamburg", category: "city" },
    { title: "Helsinki", href: "/accessibility-checker/helsinki", category: "city" },
    { title: "Athens", href: "/accessibility-checker/athens", category: "city" },
  ],
  industry: [
    {
      title: "Healthcare Accessibility",
      href: "/healthcare",
      description: "Accessibility solutions for healthcare providers",
      category: "industry",
    },
    {
      title: "Finance & Banking",
      href: "/finance",
      description: "Web accessibility for financial institutions",
      category: "industry",
    },
    {
      title: "SaaS Accessibility",
      href: "/saas",
      description: "Making SaaS products accessible",
      category: "industry",
    },
    {
      title: "Enterprise Solutions",
      href: "/enterprise",
      description: "Enterprise-grade accessibility compliance",
      category: "industry",
    },
    {
      title: "Agency Partners",
      href: "/agency",
      description: "Accessibility solutions for digital agencies",
      category: "industry",
    },
    {
      title: "EU E-commerce",
      href: "/eu-ecommerce",
      description: "E-commerce accessibility for EU markets",
      category: "industry",
    },
  ],
  platform: [
    {
      title: "Shopify Accessibility",
      href: "/shopify-accessibility",
      description: "Make your Shopify store accessible",
      category: "platform",
    },
    {
      title: "WordPress Accessibility",
      href: "/wordpress-accessibility",
      description: "WordPress accessibility best practices",
      category: "platform",
    },
    {
      title: "WooCommerce Accessibility",
      href: "/woocommerce-accessibility",
      description: "WooCommerce accessibility solutions",
      category: "platform",
    },
    {
      title: "Magento Accessibility",
      href: "/magento-accessibility",
      description: "Magento store accessibility compliance",
      category: "platform",
    },
    {
      title: "BigCommerce Accessibility",
      href: "/bigcommerce-accessibility",
      description: "BigCommerce accessibility guide",
      category: "platform",
    },
  ],
  tool: [
    {
      title: "Free Accessibility Scanner",
      href: "/#scanner",
      description: "Scan your website for accessibility issues",
      category: "tool",
    },
    {
      title: "WCAG Checker",
      href: "/wcag-checker",
      description: "Check WCAG compliance instantly",
      category: "tool",
    },
    {
      title: "Accessibility Score Checker",
      href: "/tools/score-checker",
      description: "Get your accessibility score",
      category: "tool",
    },
    {
      title: "Accessibility Statement Generator",
      href: "/accessibility-statement-generator",
      description: "Generate an accessibility statement for your site",
      category: "tool",
    },
    {
      title: "EAA Compliance Checklist",
      href: "/eaa-compliance-checklist",
      description: "Interactive EAA compliance checklist",
      category: "tool",
    },
    {
      title: "WCAG 2.1 AA Checklist",
      href: "/wcag-21-aa-checklist",
      description: "Complete WCAG 2.1 Level AA checklist",
      category: "tool",
    },
  ],
  guide: [
    {
      title: "Getting Started",
      href: "/docs/guides/getting-started",
      description: "Start using Inclusiv in minutes",
      category: "guide",
    },
    {
      title: "EAA Knowledge Base",
      href: "/docs/knowledge-base/eaa",
      description: "Deep dive into EAA requirements",
      category: "guide",
    },
    {
      title: "WCAG Knowledge Base",
      href: "/docs/knowledge-base/wcag",
      description: "Technical WCAG documentation",
      category: "guide",
    },
    {
      title: "Developer Guide",
      href: "/docs/knowledge-base/developers",
      description: "Developer-focused accessibility guide",
      category: "guide",
    },
    {
      title: "Designer Guide",
      href: "/docs/knowledge-base/designers",
      description: "Accessibility for designers",
      category: "guide",
    },
    {
      title: "Business Guide",
      href: "/docs/knowledge-base/business",
      description: "Business case for accessibility",
      category: "guide",
    },
  ],
};

// Category icons
const categoryIcons: Record<LinkCategory, LucideIcon> = {
  pillar: BookOpen,
  blog: FileText,
  comparison: Scale,
  city: Globe,
  industry: Building2,
  platform: ShoppingCart,
  tool: ArrowRight,
  guide: FileText,
};

// Category colors
const categoryColors: Record<LinkCategory, string> = {
  pillar: "indigo",
  blog: "purple",
  comparison: "cyan",
  city: "emerald",
  industry: "amber",
  platform: "rose",
  tool: "blue",
  guide: "teal",
};

interface RelatedLinksProps {
  currentPath?: string;
  categories?: LinkCategory[];
  maxLinks?: number;
  title?: string;
  showDescriptions?: boolean;
  variant?: "grid" | "list" | "compact";
  className?: string;
}

export function RelatedLinks({
  currentPath,
  categories = ["pillar", "blog", "tool"],
  maxLinks = 6,
  title = "Related Resources",
  showDescriptions = true,
  variant = "grid",
  className = "",
}: RelatedLinksProps) {
  // Get links from specified categories, excluding current page
  const links = categories
    .flatMap((cat) => linkRegistry[cat] || [])
    .filter((link) => link.href !== currentPath)
    .sort((a, b) => (a.priority || 99) - (b.priority || 99))
    .slice(0, maxLinks);

  if (links.length === 0) return null;

  const Icon = (category: LinkCategory) => categoryIcons[category];

  if (variant === "compact") {
    return (
      <div className={`space-y-4 ${className}`}>
        {title && <h3 className="text-lg font-semibold text-white">{title}</h3>}
        <div className="flex flex-wrap gap-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="inline-flex items-center gap-1 text-sm text-zinc-400 hover:text-indigo-400 transition-colors"
            >
              {link.title}
              <ArrowRight className="w-3 h-3" />
            </Link>
          ))}
        </div>
      </div>
    );
  }

  if (variant === "list") {
    return (
      <div className={`space-y-4 ${className}`}>
        {title && <h3 className="text-xl font-semibold text-white mb-6">{title}</h3>}
        <div className="space-y-3">
          {links.map((link) => {
            const IconComponent = Icon(link.category);
            return (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-zinc-800/50 transition-colors group"
              >
                <IconComponent className={`w-5 h-5 text-${categoryColors[link.category]}-400 mt-0.5`} />
                <div>
                  <span className="text-white group-hover:text-indigo-400 transition-colors font-medium">
                    {link.title}
                  </span>
                  {showDescriptions && link.description && (
                    <p className="text-sm text-zinc-500 mt-1">{link.description}</p>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    );
  }

  // Grid variant (default)
  return (
    <div className={`space-y-6 ${className}`}>
      {title && <h3 className="text-xl font-semibold text-white">{title}</h3>}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {links.map((link) => {
          const IconComponent = Icon(link.category);
          return (
            <Link
              key={link.href}
              href={link.href}
              className="flex flex-col p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl hover:border-indigo-500/50 transition-all group"
            >
              <div className="flex items-center gap-2 mb-2">
                <IconComponent className={`w-4 h-4 text-${categoryColors[link.category]}-400`} />
                <span className="text-xs uppercase tracking-wide text-zinc-500">
                  {link.category}
                </span>
              </div>
              <span className="text-white group-hover:text-indigo-400 transition-colors font-medium">
                {link.title}
              </span>
              {showDescriptions && link.description && (
                <p className="text-sm text-zinc-500 mt-2 line-clamp-2">{link.description}</p>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

// Contextual link suggestions based on page content
export function getContextualLinks(
  currentPath: string,
  pageType: "blog" | "pillar" | "tool" | "comparison" | "city" | "industry" | "platform"
): RelatedLink[] {
  const suggestions: RelatedLink[] = [];

  // Always include pillar content
  suggestions.push(...linkRegistry.pillar.slice(0, 2));

  // Add contextual links based on page type
  switch (pageType) {
    case "blog":
      suggestions.push(...linkRegistry.tool.slice(0, 2));
      suggestions.push(...linkRegistry.comparison.slice(0, 1));
      break;
    case "pillar":
      suggestions.push(...linkRegistry.blog.slice(0, 3));
      suggestions.push(...linkRegistry.tool.slice(0, 2));
      break;
    case "tool":
      suggestions.push(...linkRegistry.blog.slice(0, 2));
      suggestions.push(...linkRegistry.guide.slice(0, 2));
      break;
    case "comparison":
      suggestions.push(...linkRegistry.blog.slice(0, 2));
      suggestions.push(...linkRegistry.tool.slice(0, 2));
      break;
    case "city":
      suggestions.push(...linkRegistry.industry.slice(0, 2));
      suggestions.push(...linkRegistry.platform.slice(0, 2));
      break;
    case "industry":
      suggestions.push(...linkRegistry.platform.slice(0, 2));
      suggestions.push(...linkRegistry.blog.slice(0, 2));
      break;
    case "platform":
      suggestions.push(...linkRegistry.blog.slice(0, 2));
      suggestions.push(...linkRegistry.tool.slice(0, 2));
      break;
  }

  // Filter out current page and duplicates
  return suggestions
    .filter((link, index, self) =>
      link.href !== currentPath &&
      self.findIndex(l => l.href === link.href) === index
    )
    .slice(0, 6);
}

export default RelatedLinks;
