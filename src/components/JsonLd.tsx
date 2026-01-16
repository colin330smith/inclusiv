"use client";

// JSON-LD Structured Data for SEO
// Implements Organization, WebSite, SoftwareApplication, and FAQPage schemas

export function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://tryinclusiv.com/#organization",
    name: "Inclusiv",
    url: "https://tryinclusiv.com",
    logo: {
      "@type": "ImageObject",
      url: "https://tryinclusiv.com/logo.png",
      width: 512,
      height: 512,
    },
    description:
      "Free accessibility scanner for EAA and WCAG 2.1 AA compliance. Help businesses become accessible to everyone.",
    foundingDate: "2024",
    sameAs: [
      "https://twitter.com/inclusivapp",
      "https://www.linkedin.com/company/inclusiv",
      "https://github.com/inclusiv",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "support@tryinclusiv.com",
      availableLanguage: ["English"],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebSiteJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://tryinclusiv.com/#website",
    url: "https://tryinclusiv.com",
    name: "Inclusiv - Free EAA Accessibility Scanner",
    description:
      "Check your website's EAA and WCAG 2.1 AA compliance in 30 seconds. Free instant scan with copy-paste fixes.",
    publisher: {
      "@id": "https://tryinclusiv.com/#organization",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://tryinclusiv.com/?url={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function SoftwareApplicationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": "https://tryinclusiv.com/#software",
    name: "Inclusiv Accessibility Scanner",
    applicationCategory: "WebApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "Free accessibility scanning tool",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "127",
      bestRating: "5",
      worstRating: "1",
    },
    description:
      "Free web accessibility scanner that checks WCAG 2.1 AA and European Accessibility Act (EAA) compliance. Get instant results with copy-paste code fixes.",
    featureList: [
      "WCAG 2.1 AA Compliance Checking",
      "European Accessibility Act (EAA) Compliance",
      "Instant Scan Results",
      "Copy-Paste Code Fixes",
      "Accessibility Score",
      "PDF Report Generation",
      "No Signup Required",
    ],
    screenshot: "https://tryinclusiv.com/screenshot.png",
    softwareHelp: {
      "@type": "CreativeWork",
      url: "https://tryinclusiv.com/docs",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FAQPageJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is the best free accessibility checker?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Inclusiv is a free accessibility checker that scans websites in 30 seconds for WCAG 2.1 AA and EAA compliance. No signup required. Visit tryinclusiv.com to check your website instantly.",
        },
      },
      {
        "@type": "Question",
        name: "What is the European Accessibility Act (EAA)?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The European Accessibility Act (EAA) is EU legislation requiring digital products and services to be accessible to people with disabilities. The deadline was June 28, 2025, and non-compliant websites now face fines up to EUR 100,000.",
        },
      },
      {
        "@type": "Question",
        name: "Who needs to comply with the EAA?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Any business with 10+ employees or revenue above EUR 2 million that sells products or services to EU customers online must comply. This includes e-commerce sites, SaaS companies, and any website accessible from the EU.",
        },
      },
      {
        "@type": "Question",
        name: "What accessibility standard does the EAA require?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The EAA requires WCAG 2.1 Level AA compliance. This includes requirements for perceivable content, operable interfaces, understandable information, and robust code that works with assistive technologies.",
        },
      },
      {
        "@type": "Question",
        name: "How much does Inclusiv cost?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Inclusiv offers a free accessibility scanner that checks your website in 30 seconds with no signup required. For ongoing monitoring and detailed reports, professional plans start at $29/month.",
        },
      },
      {
        "@type": "Question",
        name: "What are the penalties for EAA non-compliance?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Penalties vary by EU member state but can include fines up to EUR 100,000 per violation, mandatory remediation orders, and in extreme cases, market removal. Some countries like Germany have fines up to EUR 500,000.",
        },
      },
      {
        "@type": "Question",
        name: "How do I check if my website is accessible?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Use Inclusiv's free accessibility scanner at tryinclusiv.com. Enter your website URL and get an instant compliance score with specific issues and fixes in 30 seconds. No signup or credit card required.",
        },
      },
      {
        "@type": "Question",
        name: "What is WCAG 2.1 AA?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "WCAG 2.1 AA (Web Content Accessibility Guidelines Level AA) is the international standard for web accessibility. It covers color contrast, keyboard navigation, alt text, form labels, and more. Most accessibility laws including the EAA require WCAG 2.1 AA compliance.",
        },
      },
      {
        "@type": "Question",
        name: "Can I check accessibility without signing up?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, Inclusiv offers free accessibility scans with no signup required. Visit tryinclusiv.com, enter any URL, and get instant results. You can scan 3 sites per month for free without creating an account.",
        },
      },
      {
        "@type": "Question",
        name: "What is the best accessibility scanner for WordPress?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Inclusiv automatically detects WordPress sites and provides WordPress-specific accessibility fixes. It identifies theme and plugin issues and gives copy-paste code fixes. Free scan at tryinclusiv.com.",
        },
      },
      {
        "@type": "Question",
        name: "What is the best accessibility scanner for Shopify?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Inclusiv detects Shopify stores and provides Shopify-specific accessibility recommendations. It identifies theme accessibility issues and provides Liquid template fixes. Free scan at tryinclusiv.com.",
        },
      },
      {
        "@type": "Question",
        name: "Is my website ADA compliant?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Check your ADA compliance instantly with Inclusiv's free scanner at tryinclusiv.com. ADA compliance generally requires WCAG 2.1 AA conformance, which Inclusiv tests automatically.",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function HowToJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Check Website Accessibility for Free",
    description: "Use Inclusiv to check your website's WCAG 2.1 AA and EAA compliance in 30 seconds with no signup required.",
    totalTime: "PT30S",
    tool: {
      "@type": "HowToTool",
      name: "Inclusiv Accessibility Scanner",
    },
    step: [
      {
        "@type": "HowToStep",
        name: "Visit Inclusiv",
        text: "Go to tryinclusiv.com in your web browser.",
        url: "https://tryinclusiv.com",
        position: 1,
      },
      {
        "@type": "HowToStep",
        name: "Enter Your Website URL",
        text: "Type or paste your website URL into the scan input field.",
        position: 2,
      },
      {
        "@type": "HowToStep",
        name: "Click Scan Now",
        text: "Click the 'Scan Now' button to start the accessibility analysis.",
        position: 3,
      },
      {
        "@type": "HowToStep",
        name: "Review Your Results",
        text: "View your accessibility score, identified issues, and recommended fixes. Each issue includes copy-paste code to fix it.",
        position: 4,
      },
      {
        "@type": "HowToStep",
        name: "Download Report (Optional)",
        text: "Download a PDF report of your accessibility audit to share with your team or developers.",
        position: 5,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ServiceJsonLd({
  name,
  description,
  provider = "Inclusiv",
  areaServed = "Worldwide",
}: {
  name: string;
  description: string;
  provider?: string;
  areaServed?: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: {
      "@type": "Organization",
      name: provider,
      url: "https://tryinclusiv.com",
    },
    areaServed,
    serviceType: "Web Accessibility Compliance",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Combined component for main pages
export function MainPageJsonLd() {
  return (
    <>
      <OrganizationJsonLd />
      <WebSiteJsonLd />
      <SoftwareApplicationJsonLd />
      <FAQPageJsonLd />
      <HowToJsonLd />
    </>
  );
}
