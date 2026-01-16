import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Inclusiv Blog',
    default: 'Blog | Web Accessibility Insights & EAA Compliance',
  },
  description: 'Expert insights on web accessibility, EAA compliance, WCAG guidelines, and e-commerce accessibility. Stay informed about accessibility laws and best practices.',
  keywords: [
    'web accessibility blog',
    'EAA compliance articles',
    'WCAG guidelines',
    'accessibility best practices',
    'e-commerce accessibility',
    'European Accessibility Act',
    'ADA compliance',
    'digital accessibility',
  ],
  openGraph: {
    title: 'Inclusiv Blog | Web Accessibility Insights',
    description: 'Expert insights on web accessibility, EAA compliance, and WCAG guidelines for e-commerce.',
    type: 'website',
    siteName: 'Inclusiv',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Inclusiv Blog',
    description: 'Web accessibility insights for e-commerce businesses',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    types: {
      'application/rss+xml': 'https://tryinclusiv.com/blog/rss.xml',
      'application/feed+json': 'https://tryinclusiv.com/blog/feed.json',
    },
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
