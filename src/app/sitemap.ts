import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://inclusiv.app'
  const now = new Date()

  // Core pages - highest priority
  const corePages = [
    { url: '', priority: 1.0, changeFrequency: 'daily' as const },
    { url: '/pricing', priority: 0.9, changeFrequency: 'weekly' as const },
    { url: '/contact', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/faq', priority: 0.7, changeFrequency: 'weekly' as const },
  ]

  // Compliance checker pages - high priority, high intent
  const compliancePages = [
    { url: '/eaa-compliance', priority: 0.9, changeFrequency: 'weekly' as const },
    { url: '/ada-compliance', priority: 0.9, changeFrequency: 'weekly' as const },
    { url: '/wcag-checker', priority: 0.9, changeFrequency: 'weekly' as const },
    { url: '/eaa-compliance-checklist', priority: 0.85, changeFrequency: 'weekly' as const },
    { url: '/wcag-21-aa-checklist', priority: 0.85, changeFrequency: 'weekly' as const },
    { url: '/website-accessibility-audit', priority: 0.85, changeFrequency: 'weekly' as const },
    { url: '/eu-web-accessibility-directive', priority: 0.8, changeFrequency: 'weekly' as const },
  ]

  // Platform-specific pages - high intent commercial
  const platformPages = [
    { url: '/shopify-accessibility', priority: 0.85, changeFrequency: 'weekly' as const },
    { url: '/shopify-accessibility-audit', priority: 0.85, changeFrequency: 'weekly' as const },
    { url: '/wordpress-accessibility', priority: 0.85, changeFrequency: 'weekly' as const },
    { url: '/woocommerce-accessibility', priority: 0.85, changeFrequency: 'weekly' as const },
    { url: '/bigcommerce-accessibility', priority: 0.8, changeFrequency: 'weekly' as const },
    { url: '/magento-accessibility', priority: 0.8, changeFrequency: 'weekly' as const },
  ]

  // Tool/resource pages
  const resourcePages = [
    { url: '/accessibility-statement-generator', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/eaa-guide', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/resources', priority: 0.7, changeFrequency: 'weekly' as const },
  ]

  // Blog posts
  const blogPosts = [
    { url: '/blog', priority: 0.7, changeFrequency: 'daily' as const },
    { url: '/blog/eaa-compliance-guide-2025', priority: 0.8, changeFrequency: 'weekly' as const },
    { url: '/blog/eaa-vs-ada-comparison', priority: 0.75, changeFrequency: 'monthly' as const },
    { url: '/blog/shopify-wcag-violations', priority: 0.75, changeFrequency: 'monthly' as const },
    { url: '/blog/eu-ecommerce-accessibility-study', priority: 0.75, changeFrequency: 'monthly' as const },
    { url: '/blog/accessibility-statement-guide', priority: 0.75, changeFrequency: 'monthly' as const },
  ]

  // Help pages
  const helpPages = [
    { url: '/help/getting-started', priority: 0.6, changeFrequency: 'monthly' as const },
    { url: '/help/fixing-issues', priority: 0.6, changeFrequency: 'monthly' as const },
  ]

  const allPages = [
    ...corePages,
    ...compliancePages,
    ...platformPages,
    ...resourcePages,
    ...blogPosts,
    ...helpPages,
  ]

  return allPages.map((page) => ({
    url: `${baseUrl}${page.url}`,
    lastModified: now,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }))
}
