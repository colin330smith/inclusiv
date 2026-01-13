"use client";

import Link from 'next/link';
import { Shield, Clock, ArrowRight, ArrowLeft, Code, AlertTriangle, CheckCircle, Copy, ExternalLink, Lightbulb, Wrench } from 'lucide-react';
import { useState } from 'react';

// Calculate days until EAA deadline
const getDeadlineInfo = () => {
  const deadline = new Date("2025-06-28");
  const today = new Date();
  const diffTime = deadline.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return { days: diffDays, deadline };
};

// Code examples for each violation
const violations = [
  {
    id: 1,
    title: 'Missing Alt Text on Product Images',
    wcag: 'WCAG 1.1.1',
    severity: 'Critical',
    impact: 'Screen reader users cannot understand product images',
    percentage: '89%',
    badCode: `<!-- Bad: No alt text -->
<img src="product-blue-shirt.jpg">

<!-- Also bad: Non-descriptive alt -->
<img src="product-blue-shirt.jpg" alt="image">
<img src="product-blue-shirt.jpg" alt="product">`,
    goodCode: `<!-- Good: Descriptive alt text -->
<img
  src="product-blue-shirt.jpg"
  alt="Men's Navy Blue Oxford Button-Down Shirt, Size M"
>

<!-- For decorative images -->
<img src="decorative-pattern.jpg" alt="" role="presentation">`,
    liquidFix: `{% comment %} In your product template {% endcomment %}
<img
  src="{{ product.featured_image | img_url: 'large' }}"
  alt="{{ product.featured_image.alt | default: product.title }}"
  loading="lazy"
>`,
    explanation: 'Every meaningful image needs alt text that describes its content and function. For products, include key details like color, style, and type.',
  },
  {
    id: 2,
    title: 'Insufficient Color Contrast',
    wcag: 'WCAG 1.4.3',
    severity: 'Critical',
    impact: 'Text is unreadable for users with low vision or color blindness',
    percentage: '76%',
    badCode: `/* Bad: Light gray on white background */
.product-price {
  color: #999999;  /* Contrast ratio: 2.8:1 */
  background: #ffffff;
}

/* Bad: Trendy but inaccessible */
.sale-badge {
  color: #ff6b6b;  /* Contrast ratio: 3.2:1 */
  background: #fff5f5;
}`,
    goodCode: `/* Good: Meets 4.5:1 minimum ratio */
.product-price {
  color: #595959;  /* Contrast ratio: 7:1 */
  background: #ffffff;
}

/* Good: Bold colors that work */
.sale-badge {
  color: #c92a2a;  /* Contrast ratio: 6.5:1 */
  background: #fff5f5;
}`,
    liquidFix: `{% comment %} In theme.scss or theme.css {% endcomment %}
:root {
  --color-text-primary: #1a1a1a;    /* 16:1 on white */
  --color-text-secondary: #4a4a4a;  /* 9:1 on white */
  --color-text-muted: #666666;      /* 5.7:1 on white */
  --color-accent: #0052cc;          /* 7.3:1 on white */
}`,
    explanation: 'Text must have a contrast ratio of at least 4.5:1 against its background (3:1 for large text). Use tools like WebAIM Contrast Checker.',
  },
  {
    id: 3,
    title: 'Missing Form Labels',
    wcag: 'WCAG 1.3.1, 4.1.2',
    severity: 'Critical',
    impact: 'Screen reader users cannot understand what to enter in form fields',
    percentage: '71%',
    badCode: `<!-- Bad: No label association -->
<input type="email" placeholder="Enter your email">

<!-- Bad: Label exists but not associated -->
<label>Email</label>
<input type="email" id="email-field">

<!-- Bad: Hidden label breaks accessibility -->
<label style="display: none;">Email</label>
<input type="email">`,
    goodCode: `<!-- Good: Properly associated label -->
<label for="email-field">Email Address</label>
<input type="email" id="email-field" required>

<!-- Good: Visually hidden but accessible -->
<label for="search" class="visually-hidden">Search products</label>
<input type="search" id="search" placeholder="Search...">

<!-- CSS for visually-hidden -->
<style>
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}
</style>`,
    liquidFix: `{% comment %} Newsletter signup form {% endcomment %}
<form action="/contact#contact_form" method="post">
  <div class="form-group">
    <label for="newsletter-email">
      Email Address
      <span class="required" aria-hidden="true">*</span>
    </label>
    <input
      type="email"
      id="newsletter-email"
      name="contact[email]"
      required
      aria-required="true"
    >
  </div>
  <button type="submit">Subscribe</button>
</form>`,
    explanation: 'Every form input needs a programmatically associated label using the for/id relationship. Placeholders are not labels.',
  },
  {
    id: 4,
    title: 'Non-Descriptive Link Text',
    wcag: 'WCAG 2.4.4',
    severity: 'Serious',
    impact: 'Users cannot understand link destination without surrounding context',
    percentage: '68%',
    badCode: `<!-- Bad: Non-descriptive links -->
<a href="/products/shirt-123">Click here</a>
<a href="/products/shirt-123">Read more</a>
<a href="/products/shirt-123">Learn more</a>

<!-- Bad: URL as link text -->
<a href="/shipping">www.store.com/shipping</a>

<!-- Bad: Image link without alt -->
<a href="/cart"><img src="cart-icon.svg"></a>`,
    goodCode: `<!-- Good: Descriptive link text -->
<a href="/products/shirt-123">
  View Navy Blue Oxford Shirt Details
</a>

<!-- Good: Link with context -->
<a href="/shipping">
  View our shipping policy and delivery times
</a>

<!-- Good: Image link with alt -->
<a href="/cart" aria-label="Shopping cart, 3 items">
  <img src="cart-icon.svg" alt="">
  <span class="cart-count">3</span>
</a>`,
    liquidFix: `{% comment %} Product card link {% endcomment %}
<a
  href="{{ product.url }}"
  class="product-card-link"
  aria-label="View {{ product.title }} - {{ product.price | money }}"
>
  <img
    src="{{ product.featured_image | img_url: 'medium' }}"
    alt=""
  >
  <h3>{{ product.title }}</h3>
  <span class="price">{{ product.price | money }}</span>
</a>`,
    explanation: 'Link text should describe the destination or action. Avoid generic phrases like "click here" or "read more".',
  },
  {
    id: 5,
    title: 'Missing Skip Navigation Links',
    wcag: 'WCAG 2.4.1',
    severity: 'Serious',
    impact: 'Keyboard users must tab through entire navigation on every page',
    percentage: '64%',
    badCode: `<!-- Bad: No skip link -->
<header>
  <nav>
    <!-- 50+ navigation links -->
  </nav>
</header>
<main>
  <!-- Content -->
</main>`,
    goodCode: `<!-- Good: Skip link as first focusable element -->
<body>
  <a href="#main-content" class="skip-link">
    Skip to main content
  </a>
  <header>
    <nav aria-label="Main navigation">
      <!-- Navigation links -->
    </nav>
  </header>
  <main id="main-content" tabindex="-1">
    <!-- Content -->
  </main>
</body>

<style>
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  padding: 8px 16px;
  background: #000;
  color: #fff;
  z-index: 100;
}
.skip-link:focus {
  top: 0;
}
</style>`,
    liquidFix: `{% comment %} In theme.liquid, right after <body> {% endcomment %}
<a class="skip-to-content-link" href="#MainContent">
  {{ 'accessibility.skip_to_content' | t }}
</a>

{% comment %} In your main content area {% endcomment %}
<main id="MainContent" class="content-for-layout" role="main" tabindex="-1">
  {{ content_for_layout }}
</main>`,
    explanation: 'Skip links allow keyboard users to bypass repetitive content like navigation menus.',
  },
  {
    id: 6,
    title: 'Keyboard Navigation Issues',
    wcag: 'WCAG 2.1.1, 2.1.2',
    severity: 'Critical',
    impact: 'Users who cannot use a mouse are completely blocked',
    percentage: '58%',
    badCode: `<!-- Bad: Click-only interaction -->
<div onclick="addToCart()">Add to Cart</div>

<!-- Bad: Removes keyboard focus -->
<button onclick="..." style="outline: none;">Buy Now</button>

<!-- Bad: Non-focusable interactive element -->
<span class="dropdown-trigger">Select Size</span>`,
    goodCode: `<!-- Good: Proper button element -->
<button type="button" onclick="addToCart()">
  Add to Cart
</button>

<!-- Good: Custom focus style instead of removing -->
<button type="button" class="buy-button">Buy Now</button>
<style>
.buy-button:focus {
  outline: 2px solid #0052cc;
  outline-offset: 2px;
}
</style>

<!-- Good: Keyboard accessible custom dropdown -->
<button
  type="button"
  aria-expanded="false"
  aria-haspopup="listbox"
  aria-controls="size-options"
>
  Select Size
</button>`,
    liquidFix: `{% comment %} Accessible add to cart button {% endcomment %}
<button
  type="submit"
  name="add"
  class="btn product-form__cart-submit"
  {% if product.selected_or_first_available_variant.available == false %}
    disabled
    aria-disabled="true"
  {% endif %}
>
  <span>
    {% if product.selected_or_first_available_variant.available %}
      {{ 'products.product.add_to_cart' | t }}
    {% else %}
      {{ 'products.product.sold_out' | t }}
    {% endif %}
  </span>
</button>`,
    explanation: 'All interactive elements must be keyboard accessible. Use semantic HTML elements and never remove focus indicators.',
  },
  {
    id: 7,
    title: 'Missing Language Attribute',
    wcag: 'WCAG 3.1.1',
    severity: 'Moderate',
    impact: 'Screen readers may pronounce content incorrectly',
    percentage: '52%',
    badCode: `<!-- Bad: No language declared -->
<!DOCTYPE html>
<html>
<head>...</head>

<!-- Bad: Wrong language code -->
<html lang="english">`,
    goodCode: `<!-- Good: Correct language attribute -->
<!DOCTYPE html>
<html lang="en">

<!-- For German -->
<html lang="de">

<!-- For French -->
<html lang="fr">

<!-- For content in different language -->
<p>The French word for hello is
  <span lang="fr">bonjour</span>.
</p>`,
    liquidFix: `{% comment %} In theme.liquid {% endcomment %}
<!doctype html>
<html lang="{{ request.locale.iso_code }}">
<head>
  <!-- head content -->
</head>

{% comment %} For multi-language content {% endcomment %}
{% if request.locale.iso_code == 'de' %}
  <p lang="en">English description here</p>
{% endif %}`,
    explanation: 'The lang attribute helps screen readers use correct pronunciation and enables proper text-to-speech.',
  },
  {
    id: 8,
    title: 'Improper Heading Hierarchy',
    wcag: 'WCAG 1.3.1',
    severity: 'Serious',
    impact: 'Screen reader users cannot navigate by headings effectively',
    percentage: '49%',
    badCode: `<!-- Bad: Skipping heading levels -->
<h1>Our Store</h1>
<h4>Featured Products</h4>  <!-- Skipped h2 and h3 -->

<!-- Bad: Multiple h1 elements -->
<h1>Store Name</h1>
<h1>Sale Banner</h1>
<h1>Product Title</h1>

<!-- Bad: Styled text instead of headings -->
<div class="big-text">Product Categories</div>`,
    goodCode: `<!-- Good: Logical heading structure -->
<h1>Blue Oxford Shirt</h1>
  <h2>Product Details</h2>
    <h3>Materials & Care</h3>
    <h3>Size Guide</h3>
  <h2>Customer Reviews</h2>
    <h3>5 Star Reviews (42)</h3>
    <h3>4 Star Reviews (18)</h3>
  <h2>Related Products</h2>`,
    liquidFix: `{% comment %} Product page structure {% endcomment %}
<main id="MainContent">
  <h1 class="product-title">{{ product.title }}</h1>

  <section aria-labelledby="description-heading">
    <h2 id="description-heading">Description</h2>
    {{ product.description }}
  </section>

  <section aria-labelledby="reviews-heading">
    <h2 id="reviews-heading">Customer Reviews</h2>
    <!-- Review content -->
  </section>
</main>`,
    explanation: 'Headings should follow a logical hierarchy (h1, h2, h3...) without skipping levels. Only one h1 per page.',
  },
  {
    id: 9,
    title: 'Missing Focus Indicators',
    wcag: 'WCAG 2.4.7',
    severity: 'Critical',
    impact: 'Keyboard users cannot see which element is currently focused',
    percentage: '47%',
    badCode: `/* Bad: Removing focus outlines */
*:focus {
  outline: none;
}

button:focus {
  outline: 0;
}

/* Bad: Focus style too subtle */
a:focus {
  outline: 1px dotted #ccc;
}`,
    goodCode: `/* Good: Clear, visible focus indicators */
:focus {
  outline: 2px solid #0052cc;
  outline-offset: 2px;
}

/* Good: Custom focus styles that match brand */
:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px rgba(0, 82, 204, 0.5);
}

/* Good: Different styles for different elements */
button:focus-visible {
  outline: 2px solid #0052cc;
  outline-offset: 2px;
}

a:focus-visible {
  background-color: #fff3cd;
  outline: 2px solid #0052cc;
}`,
    liquidFix: `{% comment %} In theme.scss or theme.css {% endcomment %}
/* Focus styles for all interactive elements */
:focus-visible {
  outline: 3px solid var(--color-focus, #0052cc);
  outline-offset: 2px;
}

/* Remove default outline only when using focus-visible */
:focus:not(:focus-visible) {
  outline: none;
}

/* Ensure buttons have visible focus */
.btn:focus-visible,
.product-form__cart-submit:focus-visible {
  outline: 3px solid var(--color-focus, #0052cc);
  outline-offset: 2px;
  box-shadow: 0 0 0 4px rgba(0, 82, 204, 0.2);
}`,
    explanation: 'Focus indicators are essential for keyboard navigation. Never remove them without providing a visible alternative.',
  },
  {
    id: 10,
    title: 'Inaccessible Dropdown Menus',
    wcag: 'WCAG 2.1.1, 4.1.2',
    severity: 'Serious',
    impact: 'Keyboard users cannot access navigation or select options',
    percentage: '43%',
    badCode: `<!-- Bad: Hover-only dropdown -->
<div class="dropdown">
  <span>Categories</span>
  <ul class="dropdown-menu">
    <li><a href="#">Shirts</a></li>
    <li><a href="#">Pants</a></li>
  </ul>
</div>
<style>
.dropdown-menu { display: none; }
.dropdown:hover .dropdown-menu { display: block; }
</style>`,
    goodCode: `<!-- Good: Keyboard accessible dropdown -->
<div class="dropdown">
  <button
    type="button"
    aria-expanded="false"
    aria-haspopup="true"
    aria-controls="dropdown-menu"
  >
    Categories
    <span aria-hidden="true">▼</span>
  </button>
  <ul
    id="dropdown-menu"
    role="menu"
    aria-label="Categories"
    hidden
  >
    <li role="none">
      <a href="#" role="menuitem">Shirts</a>
    </li>
    <li role="none">
      <a href="#" role="menuitem">Pants</a>
    </li>
  </ul>
</div>

<script>
// Toggle on click and keyboard
// Handle Escape to close
// Handle arrow key navigation
</script>`,
    liquidFix: `{% comment %} Accessible navigation menu {% endcomment %}
<nav aria-label="Main navigation">
  <ul class="nav-menu" role="menubar">
    {% for link in linklists.main-menu.links %}
      {% if link.links.size > 0 %}
        <li role="none">
          <button
            type="button"
            aria-expanded="false"
            aria-haspopup="true"
            aria-controls="submenu-{{ forloop.index }}"
            class="nav-link has-dropdown"
          >
            {{ link.title }}
          </button>
          <ul
            id="submenu-{{ forloop.index }}"
            role="menu"
            class="dropdown-menu"
            hidden
          >
            {% for sublink in link.links %}
              <li role="none">
                <a href="{{ sublink.url }}" role="menuitem">
                  {{ sublink.title }}
                </a>
              </li>
            {% endfor %}
          </ul>
        </li>
      {% else %}
        <li role="none">
          <a href="{{ link.url }}" role="menuitem">
            {{ link.title }}
          </a>
        </li>
      {% endif %}
    {% endfor %}
  </ul>
</nav>`,
    explanation: 'Dropdown menus must work with keyboard alone. Use proper ARIA attributes and handle keyboard events.',
  },
];

// Code block component
function CodeBlock({ code, language = 'html' }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <pre className="bg-zinc-950 border border-zinc-800 rounded-lg p-4 overflow-x-auto text-sm">
        <code className="text-zinc-300 font-mono">{code}</code>
      </pre>
      <button
        onClick={copyCode}
        className="absolute top-2 right-2 p-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Copy code"
      >
        {copied ? (
          <CheckCircle className="w-4 h-4 text-emerald-400" />
        ) : (
          <Copy className="w-4 h-4 text-zinc-400" />
        )}
      </button>
    </div>
  );
}

export default function ShopifyWCAGViolationsPage() {
  const deadlineInfo = getDeadlineInfo();

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="border-b border-zinc-800">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-indigo-500" />
            <span className="text-xl font-bold text-white">Inclusiv</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/blog" className="text-zinc-400 hover:text-white transition-colors text-sm font-medium">
              Blog
            </Link>
            <div className="flex items-center gap-2 px-3 py-1 bg-red-500/10 rounded-full text-sm text-red-400">
              <Clock className="w-4 h-4" />
              <span className="font-semibold">{deadlineInfo.days} days until EAA deadline</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-zinc-500 mb-8">
          <Link href="/blog" className="hover:text-white transition-colors flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
          <span>/</span>
          <span className="text-zinc-400">Tutorials</span>
        </div>

        {/* Article Header */}
        <article>
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 bg-purple-500/20 text-purple-400 text-sm font-semibold rounded-full">
                Tutorial
              </span>
              <span className="text-zinc-500">January 2025</span>
              <span className="text-zinc-600">|</span>
              <span className="text-zinc-500">10 min read</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              10 Most Common WCAG Violations in Shopify Stores (And How to Fix Them)
            </h1>

            <p className="text-xl text-zinc-400 leading-relaxed mb-8">
              A practical, code-focused guide to identifying and fixing the accessibility issues
              we see most often in Shopify stores. Includes working code examples and Liquid snippets
              you can implement today.
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-4 p-6 bg-zinc-900 border border-zinc-800 rounded-2xl">
              <div className="flex items-center gap-2">
                <Code className="w-5 h-5 text-indigo-400" />
                <span className="text-zinc-400">10 violations with fixes</span>
              </div>
              <div className="flex items-center gap-2">
                <Wrench className="w-5 h-5 text-indigo-400" />
                <span className="text-zinc-400">Copy-paste code examples</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-indigo-400" />
                <span className="text-zinc-400">WCAG 2.1 AA compliant</span>
              </div>
            </div>
          </header>

          {/* Introduction */}
          <section className="mb-12">
            <div className="prose prose-invert max-w-none">
              <p className="text-zinc-300 text-lg leading-relaxed mb-4">
                After scanning thousands of Shopify stores, we&apos;ve identified the most common
                accessibility violations that prevent sites from meeting WCAG 2.1 AA and EAA compliance.
                The good news? Most of these issues are straightforward to fix with the right code.
              </p>
              <p className="text-zinc-300 text-lg leading-relaxed">
                This guide provides working code examples for each issue, including HTML, CSS, and
                Shopify Liquid templates. You can copy these solutions directly into your theme.
              </p>
            </div>
          </section>

          {/* Table of Contents */}
          <section className="mb-12 p-6 bg-zinc-900 border border-zinc-800 rounded-2xl">
            <h2 className="text-lg font-bold text-white mb-4">Jump to a Violation</h2>
            <div className="grid md:grid-cols-2 gap-2">
              {violations.map((v) => (
                <a
                  key={v.id}
                  href={`#violation-${v.id}`}
                  className="flex items-center gap-2 text-zinc-400 hover:text-indigo-400 transition-colors text-sm"
                >
                  <span className="w-6 h-6 flex items-center justify-center bg-zinc-800 rounded text-xs font-bold">
                    {v.id}
                  </span>
                  {v.title}
                </a>
              ))}
            </div>
          </section>

          {/* Violations */}
          {violations.map((violation) => (
            <section key={violation.id} id={`violation-${violation.id}`} className="mb-16 scroll-mt-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 flex items-center justify-center bg-indigo-600 rounded-xl text-white font-bold text-xl">
                  {violation.id}
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white mb-2">{violation.title}</h2>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-sm text-indigo-400">{violation.wcag}</span>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded ${
                      violation.severity === 'Critical' ? 'bg-red-500/20 text-red-400' :
                      violation.severity === 'Serious' ? 'bg-orange-500/20 text-orange-400' : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {violation.severity}
                    </span>
                    <span className="text-sm text-zinc-500">Found on {violation.percentage} of stores</span>
                  </div>
                </div>
              </div>

              <div className="mb-6 p-4 bg-red-900/20 border border-red-500/30 rounded-xl">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-red-400">Impact:</span>
                    <span className="text-zinc-300 ml-2">{violation.impact}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {/* Bad Code */}
                <div>
                  <h3 className="text-sm font-semibold text-red-400 mb-2 flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-red-500/20 flex items-center justify-center text-xs">✕</span>
                    Problem Code
                  </h3>
                  <CodeBlock code={violation.badCode} />
                </div>

                {/* Good Code */}
                <div>
                  <h3 className="text-sm font-semibold text-emerald-400 mb-2 flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-emerald-500/20 flex items-center justify-center text-xs">✓</span>
                    Accessible Solution
                  </h3>
                  <CodeBlock code={violation.goodCode} />
                </div>

                {/* Liquid Fix */}
                <div>
                  <h3 className="text-sm font-semibold text-purple-400 mb-2 flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-purple-500/20 flex items-center justify-center text-xs">⚡</span>
                    Shopify Liquid Implementation
                  </h3>
                  <CodeBlock code={violation.liquidFix} language="liquid" />
                </div>

                {/* Explanation */}
                <div className="p-4 bg-indigo-900/20 border border-indigo-500/30 rounded-xl">
                  <div className="flex items-start gap-2">
                    <Lightbulb className="w-5 h-5 text-indigo-400 mt-0.5 flex-shrink-0" />
                    <p className="text-zinc-300">{violation.explanation}</p>
                  </div>
                </div>
              </div>
            </section>
          ))}

          {/* Testing Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Wrench className="w-6 h-6 text-indigo-500" />
              How to Test Your Fixes
            </h2>
            <div className="space-y-4">
              <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
                <h3 className="font-semibold text-white mb-2">1. Automated Testing</h3>
                <p className="text-zinc-400 text-sm mb-2">
                  Use our free scanner to check for common violations:
                </p>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 text-sm"
                >
                  Run Free Accessibility Scan
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
              <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
                <h3 className="font-semibold text-white mb-2">2. Keyboard Testing</h3>
                <p className="text-zinc-400 text-sm">
                  Tab through your entire site using only the keyboard. Can you access everything?
                  Can you see where focus is? Can you escape from modal dialogs?
                </p>
              </div>
              <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
                <h3 className="font-semibold text-white mb-2">3. Screen Reader Testing</h3>
                <p className="text-zinc-400 text-sm">
                  Use VoiceOver (Mac), NVDA (Windows), or TalkBack (Android) to navigate your site.
                  Do images have meaningful descriptions? Are forms labeled correctly?
                </p>
              </div>
              <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
                <h3 className="font-semibold text-white mb-2">4. Contrast Checker</h3>
                <p className="text-zinc-400 text-sm">
                  Use WebAIM&apos;s Contrast Checker or the Chrome DevTools accessibility panel
                  to verify your color combinations meet the 4.5:1 ratio requirement.
                </p>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="mb-12 p-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl text-center">
            <Shield className="w-12 h-12 text-white mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-4">
              Scan Your Shopify Store Now
            </h2>
            <p className="text-indigo-100 mb-6 max-w-xl mx-auto">
              Find all these issues and more with our free accessibility scanner.
              Get a detailed report with line-by-line code fixes.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-600 font-semibold rounded-xl hover:bg-indigo-50 transition-colors"
            >
              Free Accessibility Scan
              <ArrowRight className="w-5 h-5" />
            </Link>
          </section>

          {/* Shopify Resources */}
          <section className="mb-12 p-6 bg-zinc-900 border border-zinc-800 rounded-2xl">
            <h2 className="text-xl font-bold text-white mb-4">Additional Shopify Resources</h2>
            <ul className="space-y-2 text-zinc-400">
              <li>
                <a href="https://shopify.dev/docs/themes/best-practices/accessibility" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-indigo-400 transition-colors">
                  <ExternalLink className="w-4 h-4" />
                  Shopify Theme Accessibility Best Practices
                </a>
              </li>
              <li>
                <a href="https://www.w3.org/WAI/WCAG21/quickref/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-indigo-400 transition-colors">
                  <ExternalLink className="w-4 h-4" />
                  WCAG 2.1 Quick Reference Guide
                </a>
              </li>
              <li>
                <a href="https://webaim.org/techniques/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-indigo-400 transition-colors">
                  <ExternalLink className="w-4 h-4" />
                  WebAIM Accessibility Techniques
                </a>
              </li>
            </ul>
          </section>

          {/* Related Articles */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-white mb-6">Related Articles</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Link
                href="/blog/eaa-compliance-guide-2025"
                className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-colors group"
              >
                <div className="text-sm text-indigo-400 mb-2">Compliance Guide</div>
                <h3 className="font-semibold text-white group-hover:text-indigo-400 transition-colors">
                  The Complete Guide to EAA Compliance for E-commerce in 2025
                </h3>
              </Link>
              <Link
                href="/blog/accessibility-statement-guide"
                className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-colors group"
              >
                <div className="text-sm text-indigo-400 mb-2">Legal</div>
                <h3 className="font-semibold text-white group-hover:text-indigo-400 transition-colors">
                  How to Create an Accessibility Statement That Actually Protects Your Business
                </h3>
              </Link>
            </div>
          </section>
        </article>

        {/* Final CTA */}
        <div className="mt-12 bg-zinc-900 border border-zinc-800 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Need Help Fixing These Issues?</h2>
          <p className="text-zinc-400 mb-6 max-w-xl mx-auto">
            Our scanner identifies all these violations and provides specific code fixes
            for your Shopify theme. Get compliant before the EAA deadline.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-colors"
          >
            <Shield className="w-5 h-5" />
            Scan Your Store Free
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 mt-24">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-zinc-500">
              <Shield className="w-5 h-5" />
              <span>Inclusiv © 2025</span>
              <span className="text-zinc-600">|</span>
              <span>Powered by axe-core</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-zinc-500 text-sm">
              <Link href="/" className="hover:text-white transition-colors">Scanner</Link>
              <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
