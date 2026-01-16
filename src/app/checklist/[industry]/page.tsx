import { Metadata } from 'next';
import Link from 'next/link';
import {
  Shield, CheckCircle, Circle, AlertTriangle, Download,
  Zap, Share2, ArrowRight, Clock, Target, FileText
} from 'lucide-react';

interface Props {
  params: Promise<{ industry: string }>;
}

interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  wcagCriteria?: string;
  estimatedTime: string;
}

interface IndustryChecklist {
  name: string;
  slug: string;
  description: string;
  eaaDeadline: string;
  fineRange: string;
  criticalAreas: string[];
  checklist: {
    category: string;
    items: ChecklistItem[];
  }[];
}

const industryChecklists: Record<string, IndustryChecklist> = {
  ecommerce: {
    name: 'E-commerce',
    slug: 'ecommerce',
    description: 'Complete accessibility checklist for online stores and marketplaces to meet EAA and WCAG requirements.',
    eaaDeadline: 'June 28, 2025',
    fineRange: '€10,000 - €100,000+',
    criticalAreas: ['Product pages', 'Checkout flow', 'Search & filters', 'Shopping cart'],
    checklist: [
      {
        category: 'Product Pages',
        items: [
          { id: 'pp1', title: 'Product images have descriptive alt text', description: 'All product images including galleries and variants must have meaningful alt text describing the product.', priority: 'critical', wcagCriteria: '1.1.1', estimatedTime: '2-4 hours' },
          { id: 'pp2', title: 'Color swatches have text labels', description: 'Color selection cannot rely on color alone. Each swatch needs a visible or screen reader accessible label.', priority: 'high', wcagCriteria: '1.4.1', estimatedTime: '1-2 hours' },
          { id: 'pp3', title: 'Price information is accessible', description: 'Prices, discounts, and sale information must be programmatically associated with products.', priority: 'high', wcagCriteria: '1.3.1', estimatedTime: '1 hour' },
          { id: 'pp4', title: 'Size charts are accessible', description: 'Size guides must work with screen readers and not rely on complex tables without headers.', priority: 'medium', wcagCriteria: '1.3.1', estimatedTime: '2 hours' },
        ],
      },
      {
        category: 'Checkout Flow',
        items: [
          { id: 'cf1', title: 'All form fields have visible labels', description: 'Every input in checkout must have a properly associated label element.', priority: 'critical', wcagCriteria: '1.3.1', estimatedTime: '2 hours' },
          { id: 'cf2', title: 'Error messages are descriptive', description: 'Validation errors must explain what went wrong and how to fix it.', priority: 'critical', wcagCriteria: '3.3.1', estimatedTime: '3 hours' },
          { id: 'cf3', title: 'Progress indicator is accessible', description: 'Multi-step checkout must indicate current step and total steps accessibly.', priority: 'high', wcagCriteria: '1.3.1', estimatedTime: '1 hour' },
          { id: 'cf4', title: 'Payment forms work with autocomplete', description: 'Payment fields should support browser autocomplete for easier completion.', priority: 'medium', wcagCriteria: '1.3.5', estimatedTime: '1 hour' },
        ],
      },
      {
        category: 'Navigation & Search',
        items: [
          { id: 'ns1', title: 'Search is keyboard accessible', description: 'Search input, suggestions, and results must be fully keyboard navigable.', priority: 'critical', wcagCriteria: '2.1.1', estimatedTime: '3 hours' },
          { id: 'ns2', title: 'Filter controls are labeled', description: 'All filter checkboxes, dropdowns, and range sliders need proper labels.', priority: 'high', wcagCriteria: '1.3.1', estimatedTime: '2 hours' },
          { id: 'ns3', title: 'Category mega menus are accessible', description: 'Dropdown menus must work with keyboard and announce state changes.', priority: 'high', wcagCriteria: '2.1.1', estimatedTime: '4 hours' },
          { id: 'ns4', title: 'Breadcrumbs use proper markup', description: 'Breadcrumb navigation should use nav element with aria-label.', priority: 'low', wcagCriteria: '1.3.1', estimatedTime: '30 min' },
        ],
      },
      {
        category: 'Shopping Cart',
        items: [
          { id: 'sc1', title: 'Cart updates are announced', description: 'When items are added or removed, screen readers must be notified.', priority: 'high', wcagCriteria: '4.1.3', estimatedTime: '2 hours' },
          { id: 'sc2', title: 'Quantity controls are accessible', description: 'Plus/minus buttons or inputs for quantity must have proper labels.', priority: 'high', wcagCriteria: '1.3.1', estimatedTime: '1 hour' },
          { id: 'sc3', title: 'Remove buttons are descriptive', description: 'Delete buttons should indicate which item will be removed.', priority: 'medium', wcagCriteria: '2.4.6', estimatedTime: '1 hour' },
        ],
      },
    ],
  },
  saas: {
    name: 'SaaS & Software',
    slug: 'saas',
    description: 'Accessibility requirements checklist for software-as-a-service products and web applications.',
    eaaDeadline: 'June 28, 2025',
    fineRange: '€10,000 - €100,000+',
    criticalAreas: ['Dashboards', 'Forms & inputs', 'Data tables', 'Notifications'],
    checklist: [
      {
        category: 'Dashboard & Data Visualization',
        items: [
          { id: 'dd1', title: 'Charts have text alternatives', description: 'All charts and graphs must have accessible summaries or data tables.', priority: 'critical', wcagCriteria: '1.1.1', estimatedTime: '4 hours' },
          { id: 'dd2', title: 'Color is not the only indicator', description: 'Status indicators, trends, and alerts must not rely solely on color.', priority: 'critical', wcagCriteria: '1.4.1', estimatedTime: '2 hours' },
          { id: 'dd3', title: 'Interactive elements are focusable', description: 'Clickable dashboard widgets must be keyboard accessible.', priority: 'high', wcagCriteria: '2.1.1', estimatedTime: '3 hours' },
        ],
      },
      {
        category: 'Forms & User Input',
        items: [
          { id: 'fu1', title: 'All inputs have labels', description: 'Every form field must have a visible, programmatically associated label.', priority: 'critical', wcagCriteria: '1.3.1', estimatedTime: '2 hours' },
          { id: 'fu2', title: 'Required fields are indicated', description: 'Required fields must be marked both visually and programmatically.', priority: 'high', wcagCriteria: '3.3.2', estimatedTime: '1 hour' },
          { id: 'fu3', title: 'Custom controls are accessible', description: 'Custom dropdowns, date pickers, and sliders need ARIA attributes.', priority: 'high', wcagCriteria: '4.1.2', estimatedTime: '6 hours' },
          { id: 'fu4', title: 'Inline validation is announced', description: 'Real-time validation must be announced to screen readers.', priority: 'medium', wcagCriteria: '4.1.3', estimatedTime: '2 hours' },
        ],
      },
      {
        category: 'Data Tables',
        items: [
          { id: 'dt1', title: 'Tables have proper headers', description: 'Data tables must use th elements with scope attributes.', priority: 'critical', wcagCriteria: '1.3.1', estimatedTime: '2 hours' },
          { id: 'dt2', title: 'Sortable columns are accessible', description: 'Sort controls must be keyboard accessible and announce sort state.', priority: 'high', wcagCriteria: '2.1.1', estimatedTime: '2 hours' },
          { id: 'dt3', title: 'Pagination is keyboard navigable', description: 'Table pagination must work with keyboard alone.', priority: 'high', wcagCriteria: '2.1.1', estimatedTime: '1 hour' },
          { id: 'dt4', title: 'Row actions have descriptive labels', description: 'Edit, delete, view buttons must indicate which row they affect.', priority: 'medium', wcagCriteria: '2.4.6', estimatedTime: '1 hour' },
        ],
      },
      {
        category: 'Notifications & Modals',
        items: [
          { id: 'nm1', title: 'Alerts are announced to screen readers', description: 'Toast notifications and alerts must use role="alert" or live regions.', priority: 'critical', wcagCriteria: '4.1.3', estimatedTime: '2 hours' },
          { id: 'nm2', title: 'Modals trap focus correctly', description: 'Focus must stay within modal and return on close.', priority: 'high', wcagCriteria: '2.4.3', estimatedTime: '3 hours' },
          { id: 'nm3', title: 'Escape key closes modals', description: 'Users must be able to dismiss modals with Escape key.', priority: 'high', wcagCriteria: '2.1.1', estimatedTime: '1 hour' },
        ],
      },
    ],
  },
  finance: {
    name: 'Financial Services',
    slug: 'finance',
    description: 'Compliance checklist for banks, fintech, and financial service providers meeting EAA requirements.',
    eaaDeadline: 'June 28, 2025',
    fineRange: '€50,000 - €500,000+',
    criticalAreas: ['Account access', 'Transaction history', 'Secure forms', 'Documents'],
    checklist: [
      {
        category: 'Authentication & Security',
        items: [
          { id: 'as1', title: 'Login forms are accessible', description: 'Username, password, and 2FA inputs must have proper labels.', priority: 'critical', wcagCriteria: '1.3.1', estimatedTime: '2 hours' },
          { id: 'as2', title: 'CAPTCHA has alternatives', description: 'Visual CAPTCHAs must have audio or other accessible alternatives.', priority: 'critical', wcagCriteria: '1.1.1', estimatedTime: '4 hours' },
          { id: 'as3', title: 'Session timeout warnings are accessible', description: 'Users must be warned before timeout with option to extend.', priority: 'high', wcagCriteria: '2.2.1', estimatedTime: '2 hours' },
        ],
      },
      {
        category: 'Account & Transactions',
        items: [
          { id: 'at1', title: 'Account balances are accessible', description: 'Balance information must be readable by screen readers.', priority: 'critical', wcagCriteria: '1.3.1', estimatedTime: '1 hour' },
          { id: 'at2', title: 'Transaction tables are properly structured', description: 'Transaction history must use accessible data tables.', priority: 'critical', wcagCriteria: '1.3.1', estimatedTime: '3 hours' },
          { id: 'at3', title: 'Transfer forms have clear labels', description: 'Amount, recipient, and account fields must be properly labeled.', priority: 'critical', wcagCriteria: '1.3.1', estimatedTime: '2 hours' },
          { id: 'at4', title: 'Confirmation dialogs are accessible', description: 'Transaction confirmations must be keyboard and screen reader accessible.', priority: 'high', wcagCriteria: '4.1.2', estimatedTime: '2 hours' },
        ],
      },
      {
        category: 'Documents & Statements',
        items: [
          { id: 'ds1', title: 'PDFs are accessible', description: 'Bank statements and documents must be tagged PDFs or have HTML alternatives.', priority: 'critical', wcagCriteria: '1.1.1', estimatedTime: '8 hours' },
          { id: 'ds2', title: 'Document downloads are announced', description: 'When downloading starts, screen readers must be notified.', priority: 'medium', wcagCriteria: '4.1.3', estimatedTime: '1 hour' },
        ],
      },
    ],
  },
};

export async function generateStaticParams() {
  return Object.keys(industryChecklists).map((industry) => ({ industry }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { industry } = await params;
  const data = industryChecklists[industry];

  if (!data) {
    return { title: 'Checklist Not Found' };
  }

  return {
    title: `${data.name} Accessibility Checklist | EAA Compliance 2025`,
    description: data.description,
    openGraph: {
      title: `${data.name} Accessibility Checklist`,
      description: `Complete EAA and WCAG compliance checklist for ${data.name.toLowerCase()}. ${data.checklist.reduce((acc, cat) => acc + cat.items.length, 0)} items to check before the deadline.`,
    },
  };
}

export default async function ChecklistPage({ params }: Props) {
  const { industry } = await params;
  const data = industryChecklists[industry];

  if (!data) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Checklist Not Found</h1>
          <Link href="/checklist/ecommerce" className="text-indigo-400 hover:text-indigo-300">
            View E-commerce Checklist
          </Link>
        </div>
      </div>
    );
  }

  const totalItems = data.checklist.reduce((acc, cat) => acc + cat.items.length, 0);
  const criticalItems = data.checklist.reduce(
    (acc, cat) => acc + cat.items.filter(i => i.priority === 'critical').length,
    0
  );

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-400 bg-red-500/10';
      case 'high': return 'text-orange-400 bg-orange-500/10';
      case 'medium': return 'text-yellow-400 bg-yellow-500/10';
      case 'low': return 'text-green-400 bg-green-500/10';
      default: return 'text-zinc-400 bg-zinc-500/10';
    }
  };

  const shareUrl = `https://inclusiv.app/checklist/${industry}`;
  const shareText = `${data.name} Accessibility Checklist for EAA compliance - ${totalItems} items to check:`;

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="border-b border-zinc-800">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-indigo-500" />
            <span className="text-xl font-bold text-white">Inclusiv</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/tools" className="text-zinc-400 hover:text-white transition-colors text-sm">
              All Tools
            </Link>
            <Link
              href="/"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-colors text-sm"
            >
              Free Scan
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 rounded-full text-indigo-400 text-sm mb-6">
            <FileText className="w-4 h-4" />
            {data.name} Compliance
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {data.name} <span className="text-indigo-400">Accessibility</span> Checklist
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-8">
            {data.description}
          </p>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="flex items-center gap-2 text-zinc-300">
              <Target className="w-5 h-5 text-indigo-400" />
              <span>{totalItems} items</span>
            </div>
            <div className="flex items-center gap-2 text-red-400">
              <AlertTriangle className="w-5 h-5" />
              <span>{criticalItems} critical</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-300">
              <Clock className="w-5 h-5 text-indigo-400" />
              <span>Deadline: {data.eaaDeadline}</span>
            </div>
          </div>
        </div>

        {/* Warning Banner */}
        <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-lg font-bold text-white mb-2">EAA Enforcement Active</h2>
              <p className="text-zinc-300">
                The European Accessibility Act is now being enforced. {data.name} businesses face fines of {data.fineRange} for non-compliance.
                Use this checklist to identify and fix issues before penalties apply.
              </p>
            </div>
          </div>
        </div>

        {/* Checklist Categories */}
        <div className="space-y-8 mb-12">
          {data.checklist.map((category) => (
            <div key={category.category} className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
              <div className="p-6 border-b border-zinc-800 bg-zinc-800/50">
                <h2 className="text-xl font-bold text-white">{category.category}</h2>
                <p className="text-zinc-400 text-sm">{category.items.length} items</p>
              </div>
              <div className="divide-y divide-zinc-800">
                {category.items.map((item) => (
                  <div key={item.id} className="p-6 hover:bg-zinc-800/30 transition-colors">
                    <div className="flex items-start gap-4">
                      <Circle className="w-5 h-5 text-zinc-600 flex-shrink-0 mt-1" />
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <h3 className="text-white font-medium">{item.title}</h3>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(item.priority)}`}>
                            {item.priority}
                          </span>
                        </div>
                        <p className="text-zinc-400 text-sm mb-3">{item.description}</p>
                        <div className="flex flex-wrap gap-4 text-xs">
                          {item.wcagCriteria && (
                            <span className="text-indigo-400">WCAG {item.wcagCriteria}</span>
                          )}
                          <span className="text-zinc-500">
                            <Clock className="w-3 h-3 inline mr-1" />
                            {item.estimatedTime}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Share & Actions */}
        <div className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 rounded-2xl p-8 mb-8">
          <div className="text-center">
            <Share2 className="w-8 h-8 text-indigo-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">Share This Checklist</h2>
            <p className="text-zinc-400 mb-6">Help others in {data.name.toLowerCase()} achieve compliance</p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 bg-zinc-800 hover:bg-zinc-700 text-white font-medium rounded-lg transition-colors"
              >
                Share on X
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 bg-zinc-800 hover:bg-zinc-700 text-white font-medium rounded-lg transition-colors"
              >
                LinkedIn
              </a>
              <button
                className="px-5 py-2 bg-zinc-800 hover:bg-zinc-700 text-white font-medium rounded-lg transition-colors"
              >
                Copy Link
              </button>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Check Your Site Automatically
          </h2>
          <p className="text-zinc-400 mb-6 max-w-xl mx-auto">
            Don&apos;t check manually. Our scanner identifies all these issues in seconds and provides specific fixes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-500/25"
            >
              <Zap className="w-5 h-5" />
              Get Free Scan
            </Link>
            <Link
              href={`/for/${industry}`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold rounded-xl transition-colors"
            >
              {data.name} Solutions
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Other Industry Links */}
        <div className="mt-12 pt-8 border-t border-zinc-800">
          <h3 className="text-lg font-bold text-white mb-4 text-center">Other Industry Checklists</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {Object.values(industryChecklists)
              .filter(ind => ind.slug !== industry)
              .map(ind => (
                <Link
                  key={ind.slug}
                  href={`/checklist/${ind.slug}`}
                  className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg transition-colors text-sm"
                >
                  {ind.name}
                </Link>
              ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-8 mt-12">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-6 text-sm">
            <Link href="/" className="text-zinc-400 hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/tools" className="text-zinc-400 hover:text-white transition-colors">
              Tools
            </Link>
            <Link href="/benchmark" className="text-zinc-400 hover:text-white transition-colors">
              Benchmarks
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
