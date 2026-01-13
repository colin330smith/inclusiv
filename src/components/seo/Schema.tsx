// Schema.org JSON-LD Components for SEO
// Provides structured data for all page types

import Script from "next/script";

// Organization Schema - Used site-wide
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Inclusiv",
  "url": "https://inclusiv.app",
  "logo": "https://inclusiv.app/logo.png",
  "description": "AI-powered accessibility scanner for European Accessibility Act (EAA) and WCAG 2.1 AA compliance. Free instant scans for businesses of all sizes.",
  "foundingDate": "2024",
  "sameAs": [
    "https://twitter.com/inclusivapp",
    "https://linkedin.com/company/inclusiv",
    "https://github.com/inclusiv"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "hello@inclusiv.app",
    "contactType": "customer support",
    "availableLanguage": ["English", "German", "French", "Spanish", "Italian"]
  },
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "EU"
  }
};

// Software Application Schema - For the main product
export const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Inclusiv Accessibility Scanner",
  "applicationCategory": "WebApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "AggregateOffer",
    "lowPrice": "0",
    "highPrice": "499",
    "priceCurrency": "EUR",
    "offerCount": "4"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "ratingCount": "127",
    "bestRating": "5",
    "worstRating": "1"
  },
  "description": "AI-powered accessibility scanner for EAA and WCAG compliance. Scan any website in 30 seconds.",
  "featureList": [
    "WCAG 2.1 AA compliance checking",
    "European Accessibility Act (EAA) compliance",
    "AI-powered issue detection",
    "Automated remediation suggestions",
    "PDF accessibility reports",
    "Continuous monitoring",
    "API access for developers"
  ],
  "screenshot": "https://inclusiv.app/screenshot.png",
  "softwareVersion": "2.0",
  "author": {
    "@type": "Organization",
    "name": "Inclusiv"
  }
};

// FAQ Schema Component
interface FAQItem {
  question: string;
  answer: string;
}

export function FAQSchema({ items }: { items: FAQItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return (
    <Script
      id="faq-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Article Schema Component for Blog Posts
interface ArticleSchemaProps {
  title: string;
  description: string;
  url: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  section?: string;
  keywords?: string[];
}

export function ArticleSchema({
  title,
  description,
  url,
  image,
  datePublished,
  dateModified,
  author = "Inclusiv Team",
  section = "Accessibility",
  keywords = []
}: ArticleSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "url": url,
    "image": image || "https://inclusiv.app/blog-default.png",
    "datePublished": datePublished,
    "dateModified": dateModified || datePublished,
    "author": {
      "@type": "Person",
      "name": author,
      "url": "https://inclusiv.app/about"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Inclusiv",
      "logo": {
        "@type": "ImageObject",
        "url": "https://inclusiv.app/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    },
    "articleSection": section,
    "keywords": keywords.join(", ")
  };

  return (
    <Script
      id="article-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// HowTo Schema for Guides
interface HowToStep {
  name: string;
  text: string;
  url?: string;
}

interface HowToSchemaProps {
  title: string;
  description: string;
  steps: HowToStep[];
  estimatedTime?: string;
  supply?: string[];
  tool?: string[];
}

export function HowToSchema({
  title,
  description,
  steps,
  estimatedTime = "PT30M",
  supply = [],
  tool = []
}: HowToSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": title,
    "description": description,
    "totalTime": estimatedTime,
    "supply": supply.map(s => ({ "@type": "HowToSupply", "name": s })),
    "tool": tool.map(t => ({ "@type": "HowToTool", "name": t })),
    "step": steps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.name,
      "text": step.text,
      "url": step.url
    }))
  };

  return (
    <Script
      id="howto-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Local Business Schema for City Pages
interface LocalBusinessSchemaProps {
  city: string;
  country: string;
  countryCode: string;
  region?: string;
}

export function LocalBusinessSchema({
  city,
  country,
  countryCode,
  region
}: LocalBusinessSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `Inclusiv Accessibility Scanner for ${city}`,
    "description": `Web accessibility compliance scanning and EAA compliance services for businesses in ${city}, ${country}. Ensure your website meets European Accessibility Act requirements.`,
    "provider": {
      "@type": "Organization",
      "name": "Inclusiv",
      "url": "https://inclusiv.app"
    },
    "areaServed": {
      "@type": "City",
      "name": city,
      "containedInPlace": {
        "@type": "Country",
        "name": country
      }
    },
    "serviceType": "Web Accessibility Compliance",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "EUR",
      "description": "Free accessibility scan"
    }
  };

  return (
    <Script
      id="local-business-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Product Comparison Schema
interface ComparisonSchemaProps {
  productName: string;
  competitorName: string;
  url: string;
}

export function ComparisonSchema({
  productName,
  competitorName,
  url
}: ComparisonSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": `${productName} vs ${competitorName} - Accessibility Tool Comparison`,
    "description": `Compare ${productName} and ${competitorName} accessibility tools. See features, pricing, and compliance capabilities side by side.`,
    "url": url,
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": [
        {
          "@type": "Product",
          "name": productName,
          "description": "AI-powered accessibility scanner for EAA and WCAG compliance",
          "brand": { "@type": "Brand", "name": "Inclusiv" },
          "category": "Accessibility Software"
        },
        {
          "@type": "Product",
          "name": competitorName,
          "description": `${competitorName} accessibility solution`,
          "category": "Accessibility Software"
        }
      ]
    }
  };

  return (
    <Script
      id="comparison-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Web Page Schema - Generic
interface WebPageSchemaProps {
  title: string;
  description: string;
  url: string;
  type?: "WebPage" | "AboutPage" | "ContactPage" | "FAQPage" | "CollectionPage";
  lastModified?: string;
}

export function WebPageSchema({
  title,
  description,
  url,
  type = "WebPage",
  lastModified
}: WebPageSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": type,
    "name": title,
    "description": description,
    "url": url,
    "isPartOf": {
      "@type": "WebSite",
      "name": "Inclusiv",
      "url": "https://inclusiv.app"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Inclusiv",
      "url": "https://inclusiv.app"
    },
    "dateModified": lastModified
  };

  return (
    <Script
      id="webpage-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Pricing/Offer Schema
interface PricingTier {
  name: string;
  price: number;
  currency?: string;
  description: string;
  features: string[];
}

export function PricingSchema({ tiers }: { tiers: PricingTier[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Inclusiv Accessibility Scanner",
    "description": "AI-powered accessibility scanner for EAA and WCAG compliance",
    "brand": {
      "@type": "Brand",
      "name": "Inclusiv"
    },
    "offers": tiers.map(tier => ({
      "@type": "Offer",
      "name": tier.name,
      "price": tier.price,
      "priceCurrency": tier.currency || "EUR",
      "description": tier.description,
      "eligibleRegion": {
        "@type": "Place",
        "name": "Worldwide"
      }
    }))
  };

  return (
    <Script
      id="pricing-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Video Schema for Tutorial Content
interface VideoSchemaProps {
  title: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  duration?: string;
  embedUrl?: string;
}

export function VideoSchema({
  title,
  description,
  thumbnailUrl,
  uploadDate,
  duration,
  embedUrl
}: VideoSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": title,
    "description": description,
    "thumbnailUrl": thumbnailUrl,
    "uploadDate": uploadDate,
    "duration": duration,
    "embedUrl": embedUrl,
    "publisher": {
      "@type": "Organization",
      "name": "Inclusiv",
      "logo": {
        "@type": "ImageObject",
        "url": "https://inclusiv.app/logo.png"
      }
    }
  };

  return (
    <Script
      id="video-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Review Schema
interface Review {
  author: string;
  rating: number;
  reviewBody: string;
  datePublished: string;
}

export function ReviewSchema({ reviews }: { reviews: Review[] }) {
  const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Inclusiv Accessibility Scanner",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": avgRating.toFixed(1),
      "reviewCount": reviews.length,
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": reviews.map(review => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": review.author
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.rating,
        "bestRating": "5",
        "worstRating": "1"
      },
      "reviewBody": review.reviewBody,
      "datePublished": review.datePublished
    }))
  };

  return (
    <Script
      id="review-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Course/Training Schema for Educational Content
interface CourseSchemaProps {
  title: string;
  description: string;
  provider?: string;
  duration?: string;
  level?: "Beginner" | "Intermediate" | "Advanced";
}

export function CourseSchema({
  title,
  description,
  provider = "Inclusiv",
  duration,
  level = "Beginner"
}: CourseSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": title,
    "description": description,
    "provider": {
      "@type": "Organization",
      "name": provider,
      "url": "https://inclusiv.app"
    },
    "courseMode": "Online",
    "isAccessibleForFree": true,
    "educationalLevel": level,
    "timeRequired": duration,
    "inLanguage": "en"
  };

  return (
    <Script
      id="course-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Combined Schema for Main Pages
export function MainPageSchema() {
  return (
    <>
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <Script
        id="software-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
      />
    </>
  );
}

// Website Schema with SearchAction
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Inclusiv",
  "url": "https://inclusiv.app",
  "description": "AI-powered accessibility scanner for EAA and WCAG compliance",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://inclusiv.app/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
};

export function WebsiteSchema() {
  return (
    <Script
      id="website-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
    />
  );
}

export default {
  FAQSchema,
  ArticleSchema,
  HowToSchema,
  LocalBusinessSchema,
  ComparisonSchema,
  WebPageSchema,
  PricingSchema,
  VideoSchema,
  ReviewSchema,
  CourseSchema,
  MainPageSchema,
  WebsiteSchema,
  organizationSchema,
  softwareApplicationSchema,
  websiteSchema
};
