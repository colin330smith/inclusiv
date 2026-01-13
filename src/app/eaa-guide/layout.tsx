import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ultimate EAA Compliance Guide 2025 | European Accessibility Act Requirements',
  description: 'Complete guide to European Accessibility Act (EAA) compliance. Learn all requirements, timeline, penalties, and how to achieve WCAG 2.1 AA compliance before the June 28, 2025 deadline. Avoid fines up to €100,000.',
  keywords: [
    'EAA compliance guide',
    'European Accessibility Act requirements',
    'EAA 2025 deadline',
    'EAA compliance checklist',
    'European Accessibility Act 2025',
    'WCAG 2.1 AA requirements',
    'EU accessibility law',
    'EAA penalties',
    'web accessibility compliance',
    'digital accessibility EU'
  ],
  openGraph: {
    title: 'The Ultimate EAA Compliance Guide 2025 | European Accessibility Act',
    description: 'Everything you need to know about European Accessibility Act compliance. Complete requirements checklist, timeline, and step-by-step guide for the June 2025 deadline.',
    type: 'article',
    publishedTime: '2025-01-01T00:00:00.000Z',
    modifiedTime: new Date().toISOString(),
    authors: ['Inclusiv'],
    tags: ['EAA', 'European Accessibility Act', 'WCAG', 'accessibility', 'compliance'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ultimate EAA Compliance Guide 2025',
    description: 'Complete European Accessibility Act requirements guide. June 2025 deadline approaching. Get compliant now.',
  },
  alternates: {
    canonical: 'https://inclusiv.app/eaa-guide',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function EAAGuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
