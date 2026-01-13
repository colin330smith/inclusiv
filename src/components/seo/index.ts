// SEO Components for Internal Linking and Schema Markup
export {
  RelatedLinks,
  linkRegistry,
  getContextualLinks,
  type LinkCategory,
  type RelatedLink,
} from "./RelatedLinks";

export {
  Breadcrumbs,
  breadcrumbPaths,
  getBlogBreadcrumbs,
  getCityBreadcrumbs,
  getDocsBreadcrumbs,
  getBreadcrumbSchema,
  type BreadcrumbItem,
} from "./Breadcrumbs";

export { SiteHeader } from "./SiteHeader";
export { SiteFooter } from "./SiteFooter";

export {
  InlineLink,
  LinkCallout,
  MultiLinkCallout,
  ReadMore,
  SidebarLinks,
  QuickNav,
  commonLinks,
} from "./InlineLinks";

// Schema.org JSON-LD Components
export {
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
  websiteSchema,
} from "./Schema";
