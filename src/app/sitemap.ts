import { MetadataRoute } from 'next'
import { blogPosts as blogPostsData, categories as blogCategories, BlogCategory } from '@/lib/blog-data'

// Industries for programmatic SEO
const industries = [
  'ecommerce', 'healthcare', 'finance', 'banking', 'insurance', 'education',
  'government', 'travel', 'retail', 'media', 'technology', 'legal',
  'real-estate', 'automotive', 'hospitality', 'nonprofit', 'saas',
  'telecommunications', 'manufacturing', 'entertainment', 'food-beverage',
  'fashion', 'beauty', 'sports', 'news', 'publishing',
]

// Platforms for programmatic SEO
const platforms = [
  'shopify', 'wordpress', 'wix', 'squarespace', 'webflow', 'magento',
  'bigcommerce', 'woocommerce', 'drupal', 'joomla', 'ghost', 'contentful',
  'strapi', 'sanity', 'hubspot', 'salesforce', 'prestashop', 'opencart',
  'volusion', 'shift4shop', 'ecwid', 'weebly', 'godaddy', 'notion',
]

// EU countries for GEO pages (EAA compliance)
const euCountries = [
  'germany', 'france', 'spain', 'italy', 'netherlands', 'belgium',
  'austria', 'sweden', 'denmark', 'finland', 'poland', 'portugal',
  'ireland', 'greece', 'czech-republic', 'romania', 'hungary', 'luxembourg',
  'slovakia', 'croatia', 'slovenia', 'lithuania', 'latvia', 'estonia',
  'bulgaria', 'cyprus', 'malta',
]

// Key WCAG criteria for educational pages
const wcagCriteria = [
  { slug: '1-1-1-non-text-content', name: 'Non-text Content' },
  { slug: '1-3-1-info-and-relationships', name: 'Info and Relationships' },
  { slug: '1-4-1-use-of-color', name: 'Use of Color' },
  { slug: '1-4-3-contrast-minimum', name: 'Contrast Minimum' },
  { slug: '1-4-11-non-text-contrast', name: 'Non-text Contrast' },
  { slug: '2-1-1-keyboard', name: 'Keyboard' },
  { slug: '2-1-2-no-keyboard-trap', name: 'No Keyboard Trap' },
  { slug: '2-4-1-bypass-blocks', name: 'Bypass Blocks' },
  { slug: '2-4-2-page-titled', name: 'Page Titled' },
  { slug: '2-4-4-link-purpose', name: 'Link Purpose' },
  { slug: '2-4-6-headings-and-labels', name: 'Headings and Labels' },
  { slug: '2-4-7-focus-visible', name: 'Focus Visible' },
  { slug: '3-1-1-language-of-page', name: 'Language of Page' },
  { slug: '3-2-1-on-focus', name: 'On Focus' },
  { slug: '3-3-1-error-identification', name: 'Error Identification' },
  { slug: '3-3-2-labels-or-instructions', name: 'Labels or Instructions' },
  { slug: '4-1-1-parsing', name: 'Parsing' },
  { slug: '4-1-2-name-role-value', name: 'Name Role Value' },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://tryinclusiv.com'
  const now = new Date()

  // Core pages - highest priority
  const corePages = [
    { url: '', priority: 1.0, changeFrequency: 'daily' as const },
    { url: '/pricing', priority: 0.9, changeFrequency: 'weekly' as const },
    { url: '/contact', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/faq', priority: 0.7, changeFrequency: 'weekly' as const },
    { url: '/about', priority: 0.6, changeFrequency: 'monthly' as const },
    { url: '/demo', priority: 0.8, changeFrequency: 'weekly' as const },
  ]

  // AI discoverability pages
  const aiPages = [
    { url: '/llms.txt', priority: 0.8, changeFrequency: 'weekly' as const },
    { url: '/llms-full.txt', priority: 0.8, changeFrequency: 'weekly' as const },
  ]

  // Compliance checker pages - high priority, high intent
  const compliancePages = [
    { url: '/eaa-compliance', priority: 0.95, changeFrequency: 'weekly' as const },
    { url: '/ada-compliance', priority: 0.9, changeFrequency: 'weekly' as const },
    { url: '/wcag-checker', priority: 0.95, changeFrequency: 'weekly' as const },
    { url: '/eaa-compliance-checklist', priority: 0.85, changeFrequency: 'weekly' as const },
    { url: '/wcag-21-aa-checklist', priority: 0.85, changeFrequency: 'weekly' as const },
    { url: '/website-accessibility-audit', priority: 0.9, changeFrequency: 'weekly' as const },
    { url: '/eu-web-accessibility-directive', priority: 0.8, changeFrequency: 'weekly' as const },
    { url: '/accessibility-testing', priority: 0.85, changeFrequency: 'weekly' as const },
    { url: '/accessibility-monitoring', priority: 0.85, changeFrequency: 'weekly' as const },
    { url: '/accessibility-remediation', priority: 0.85, changeFrequency: 'weekly' as const },
  ]

  // Platform-specific pages - programmatic SEO
  const platformPages = platforms.map(platform => ({
    url: `/accessibility/${platform}`,
    priority: 0.8,
    changeFrequency: 'weekly' as const,
  }))

  // Industry-specific pages - programmatic SEO
  const industryPages = industries.map(industry => ({
    url: `/accessibility/${industry}`,
    priority: 0.8,
    changeFrequency: 'weekly' as const,
  }))

  // EU country GEO pages - programmatic SEO for EAA
  const geoPages = euCountries.map(country => ({
    url: `/compliance/${country}`,
    priority: 0.75,
    changeFrequency: 'weekly' as const,
  }))

  // WCAG criteria educational pages
  const wcagPages = wcagCriteria.map(criterion => ({
    url: `/wcag/${criterion.slug}`,
    priority: 0.7,
    changeFrequency: 'monthly' as const,
  }))

  // Tool/resource pages
  const resourcePages = [
    { url: '/accessibility-statement-generator', priority: 0.85, changeFrequency: 'monthly' as const },
    { url: '/eaa-guide', priority: 0.85, changeFrequency: 'monthly' as const },
    { url: '/resources', priority: 0.7, changeFrequency: 'weekly' as const },
    { url: '/resources/email-templates', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/resources/social-media-content', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/tools/contrast-checker', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/tools/heading-checker', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/tools/aria-checker', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/tools/alt-text-generator', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/roi-calculator', priority: 0.85, changeFrequency: 'monthly' as const },
    { url: '/lp/eaa-compliance', priority: 0.9, changeFrequency: 'weekly' as const },
    { url: '/tools', priority: 0.85, changeFrequency: 'weekly' as const },
  ]

  // Viral/Growth pages
  const viralPages = [
    { url: '/leaderboard', priority: 0.75, changeFrequency: 'daily' as const },
    { url: '/widget', priority: 0.75, changeFrequency: 'monthly' as const },
    { url: '/compare', priority: 0.8, changeFrequency: 'weekly' as const },
    { url: '/benchmarks', priority: 0.8, changeFrequency: 'weekly' as const },
    { url: '/referral', priority: 0.6, changeFrequency: 'monthly' as const },
  ]

  // Integration pages
  const integrationPages = [
    { url: '/integrations', priority: 0.8, changeFrequency: 'weekly' as const },
    { url: '/integrations/github-action', priority: 0.75, changeFrequency: 'monthly' as const },
    { url: '/extension', priority: 0.75, changeFrequency: 'monthly' as const },
    { url: '/api-docs', priority: 0.8, changeFrequency: 'weekly' as const },
  ]

  // Partner pages
  const partnerPages = [
    { url: '/partners', priority: 0.75, changeFrequency: 'monthly' as const },
  ]

  // Blog/content hub pages
  const blogPages = [
    { url: '/blog', priority: 0.8, changeFrequency: 'daily' as const },
    { url: '/blog/rss.xml', priority: 0.3, changeFrequency: 'daily' as const },
    { url: '/blog/feed.json', priority: 0.3, changeFrequency: 'daily' as const },
  ]

  // Dynamic blog posts from blog-data.ts
  const dynamicBlogPosts = blogPostsData.map(post => ({
    url: `/blog/${post.slug}`,
    priority: post.featured ? 0.85 : 0.75,
    changeFrequency: 'weekly' as const,
  }))

  // Blog category pages
  const blogCategoryPages = (Object.keys(blogCategories) as BlogCategory[]).map(category => ({
    url: `/blog/category/${category}`,
    priority: 0.7,
    changeFrequency: 'weekly' as const,
  }))

  // Blog tag pages (extract unique tags)
  const allTags = new Set<string>()
  blogPostsData.forEach(post => {
    post.tags.forEach(tag => allTags.add(tag.toLowerCase()))
  })
  const blogTagPages = Array.from(allTags).map(tag => ({
    url: `/blog/tag/${tag}`,
    priority: 0.6,
    changeFrequency: 'weekly' as const,
  }))

  // Case studies and social proof
  const caseStudies = [
    { url: '/case-studies', priority: 0.7, changeFrequency: 'weekly' as const },
    { url: '/case-studies/ecommerce', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/case-studies/healthcare', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/case-studies/government', priority: 0.7, changeFrequency: 'monthly' as const },
  ]

  // Comparison pages (vs competitors)
  const comparisonPages = [
    { url: '/compare/accessibe', priority: 0.75, changeFrequency: 'weekly' as const },
    { url: '/compare/userway', priority: 0.75, changeFrequency: 'weekly' as const },
    { url: '/compare/audioeye', priority: 0.75, changeFrequency: 'weekly' as const },
    { url: '/compare/equalweb', priority: 0.75, changeFrequency: 'weekly' as const },
  ]

  // Help/documentation pages
  const helpPages = [
    { url: '/help', priority: 0.6, changeFrequency: 'weekly' as const },
    { url: '/help/getting-started', priority: 0.6, changeFrequency: 'monthly' as const },
    { url: '/help/fixing-issues', priority: 0.6, changeFrequency: 'monthly' as const },
    { url: '/help/integrations', priority: 0.6, changeFrequency: 'monthly' as const },
    { url: '/help/api', priority: 0.5, changeFrequency: 'monthly' as const },
  ]

  // Legal pages
  const legalPages = [
    { url: '/privacy', priority: 0.3, changeFrequency: 'monthly' as const },
    { url: '/terms', priority: 0.3, changeFrequency: 'monthly' as const },
    { url: '/security', priority: 0.4, changeFrequency: 'monthly' as const },
    { url: '/gdpr', priority: 0.5, changeFrequency: 'monthly' as const },
  ]

  const allPages = [
    ...corePages,
    ...aiPages,
    ...compliancePages,
    ...platformPages,
    ...industryPages,
    ...geoPages,
    ...wcagPages,
    ...resourcePages,
    ...viralPages,
    ...integrationPages,
    ...partnerPages,
    ...blogPages,
    ...dynamicBlogPosts,
    ...blogCategoryPages,
    ...blogTagPages,
    ...caseStudies,
    ...comparisonPages,
    ...helpPages,
    ...legalPages,
  ]

  return allPages.map((page) => ({
    url: `${baseUrl}${page.url}`,
    lastModified: now,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }))
}
