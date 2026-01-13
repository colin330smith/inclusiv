import { Metadata } from 'next';
import Link from 'next/link';
import { Shield, Clock, ArrowRight, CheckCircle, AlertTriangle, Calendar, Globe, Users, Scale, BookOpen, ArrowLeft, Share2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'The Complete Guide to EAA Compliance for E-commerce in 2025',
  description: 'Everything you need to know about European Accessibility Act (EAA) compliance for e-commerce. Complete requirements, deadlines, penalties, and step-by-step guide to achieve compliance before June 2025.',
  keywords: [
    'EAA compliance guide',
    'European Accessibility Act e-commerce',
    'EAA 2025 deadline',
    'e-commerce accessibility requirements',
    'WCAG 2.1 AA e-commerce',
    'EU accessibility law online stores',
    'EAA penalties e-commerce',
    'web accessibility compliance',
  ],
  openGraph: {
    title: 'The Complete Guide to EAA Compliance for E-commerce in 2025',
    description: 'Everything you need to know about European Accessibility Act compliance for e-commerce businesses.',
    type: 'article',
    publishedTime: '2025-01-01T00:00:00.000Z',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Complete EAA Compliance Guide for E-commerce 2025',
    description: 'Master European Accessibility Act compliance for your online store before the June 2025 deadline.',
  },
  alternates: {
    canonical: 'https://inclusiv.app/blog/eaa-compliance-guide-2025',
  },
};

// Calculate days until EAA deadline
const getDeadlineInfo = () => {
  const deadline = new Date("2025-06-28");
  const today = new Date();
  const diffTime = deadline.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return { days: diffDays, deadline };
};

export default function EAAComplianceGuide2025() {
  const deadlineInfo = getDeadlineInfo();

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-indigo-500" />
            <span className="text-xl font-bold text-white">Inclusiv</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/blog" className="text-zinc-400 hover:text-white transition-colors text-sm font-medium">
              Blog
            </Link>
            <Link href="/pricing" className="text-zinc-400 hover:text-white transition-colors text-sm font-medium">
              Pricing
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
            Blog
          </Link>
          <span>/</span>
          <span className="text-zinc-400">Compliance Guide</span>
        </div>

        {/* Article Header */}
        <article>
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 bg-indigo-500/20 text-indigo-400 text-sm font-semibold rounded-full">
                Compliance Guide
              </span>
              <span className="text-zinc-500 text-sm flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                January 2025
              </span>
              <span className="text-zinc-500 text-sm">15 min read</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              The Complete Guide to EAA Compliance for E-commerce in 2025
            </h1>
            <p className="text-xl text-zinc-400 leading-relaxed">
              The European Accessibility Act deadline is approaching fast. This comprehensive guide covers everything
              e-commerce businesses need to know about compliance requirements, technical standards, penalties, and
              step-by-step strategies to get your online store ready before June 28, 2025.
            </p>
          </header>

          {/* Urgency Banner */}
          <div className="bg-gradient-to-r from-red-600/20 to-orange-600/20 border border-red-500/50 rounded-2xl p-6 mb-12">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-7 h-7 text-red-400" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Time-Sensitive: Only {deadlineInfo.days} Days Remaining</h2>
                <p className="text-red-300">Non-compliant e-commerce sites face fines up to 100,000 euros and potential market withdrawal after June 28, 2025.</p>
              </div>
            </div>
          </div>

          {/* Table of Contents */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 mb-12">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
              <BookOpen className="w-5 h-5 text-indigo-500" />
              In This Guide
            </h2>
            <div className="grid md:grid-cols-2 gap-3">
              <a href="#what-is-eaa" className="flex items-center gap-3 p-3 bg-zinc-800/50 rounded-lg hover:bg-zinc-800 transition-colors text-zinc-300 hover:text-white">
                <span className="text-indigo-400 font-semibold">1.</span>
                What is the European Accessibility Act?
              </a>
              <a href="#who-must-comply" className="flex items-center gap-3 p-3 bg-zinc-800/50 rounded-lg hover:bg-zinc-800 transition-colors text-zinc-300 hover:text-white">
                <span className="text-indigo-400 font-semibold">2.</span>
                Who Must Comply?
              </a>
              <a href="#technical-requirements" className="flex items-center gap-3 p-3 bg-zinc-800/50 rounded-lg hover:bg-zinc-800 transition-colors text-zinc-300 hover:text-white">
                <span className="text-indigo-400 font-semibold">3.</span>
                Technical Requirements (WCAG 2.1 AA)
              </a>
              <a href="#ecommerce-specific" className="flex items-center gap-3 p-3 bg-zinc-800/50 rounded-lg hover:bg-zinc-800 transition-colors text-zinc-300 hover:text-white">
                <span className="text-indigo-400 font-semibold">4.</span>
                E-commerce Specific Requirements
              </a>
              <a href="#penalties" className="flex items-center gap-3 p-3 bg-zinc-800/50 rounded-lg hover:bg-zinc-800 transition-colors text-zinc-300 hover:text-white">
                <span className="text-indigo-400 font-semibold">5.</span>
                Penalties and Enforcement
              </a>
              <a href="#compliance-roadmap" className="flex items-center gap-3 p-3 bg-zinc-800/50 rounded-lg hover:bg-zinc-800 transition-colors text-zinc-300 hover:text-white">
                <span className="text-indigo-400 font-semibold">6.</span>
                Your Compliance Roadmap
              </a>
            </div>
          </div>

          {/* Article Content */}
          <div className="prose prose-invert prose-lg max-w-none">
            {/* Section 1 */}
            <section id="what-is-eaa" className="mb-16 scroll-mt-8">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-lg">1</span>
                What is the European Accessibility Act?
              </h2>
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
                <p className="text-zinc-300 text-lg mb-6 leading-relaxed">
                  The <strong className="text-white">European Accessibility Act (EAA)</strong>, formally known as
                  Directive (EU) 2019/882, is the most significant piece of accessibility legislation in European
                  history. It establishes binding accessibility requirements for products and services across all
                  27 EU member states, creating a unified standard that businesses must meet.
                </p>
                <p className="text-zinc-300 text-lg mb-6 leading-relaxed">
                  For e-commerce businesses, the EAA represents a fundamental shift. Unlike previous guidelines
                  that were often voluntary or applied only to public sector websites, the EAA makes accessibility
                  a legal requirement for any online store serving EU customers. This includes businesses
                  headquartered outside the EU.
                </p>

                <div className="grid md:grid-cols-3 gap-6 my-8">
                  <div className="bg-zinc-800/50 rounded-xl p-6">
                    <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-4">
                      <Globe className="w-6 h-6 text-indigo-500" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">EU-Wide Standard</h3>
                    <p className="text-zinc-400 text-sm">Replaces fragmented national laws with one harmonized requirement across 27 countries</p>
                  </div>
                  <div className="bg-zinc-800/50 rounded-xl p-6">
                    <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-4">
                      <Users className="w-6 h-6 text-indigo-500" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">135 Million People</h3>
                    <p className="text-zinc-400 text-sm">Designed to serve EU citizens with disabilities who represent significant purchasing power</p>
                  </div>
                  <div className="bg-zinc-800/50 rounded-xl p-6">
                    <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-4">
                      <Scale className="w-6 h-6 text-indigo-500" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">Legal Requirement</h3>
                    <p className="text-zinc-400 text-sm">Enforceable by law with meaningful penalties for non-compliance</p>
                  </div>
                </div>

                <div className="bg-indigo-600/10 border border-indigo-500/30 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-indigo-300 mb-3">The WCAG 2.1 AA Connection</h4>
                  <p className="text-zinc-300">
                    The EAA adopts the <strong className="text-white">Web Content Accessibility Guidelines (WCAG) 2.1 Level AA</strong> as
                    its technical foundation. This means your e-commerce site must meet 50 specific success criteria organized around
                    four principles: content must be Perceivable, interfaces must be Operable, information must be Understandable,
                    and technology must be Robust enough for assistive technologies.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 2 */}
            <section id="who-must-comply" className="mb-16 scroll-mt-8">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-lg">2</span>
                Who Must Comply?
              </h2>
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
                <p className="text-zinc-300 text-lg mb-6 leading-relaxed">
                  The EAA casts a wide net. If you sell products or services to customers in the EU, you
                  likely fall under its scope. The legislation specifically targets e-commerce services, making
                  online retail a primary focus of compliance requirements.
                </p>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-green-900/20 border border-green-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-green-400 mb-4 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" />
                      You Must Comply If...
                    </h3>
                    <ul className="space-y-3 text-zinc-300">
                      <li className="flex items-start gap-3">
                        <span className="text-green-400 mt-1">&#10003;</span>
                        <span>You operate an e-commerce website selling to EU customers</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-green-400 mt-1">&#10003;</span>
                        <span>Your business has more than 10 employees</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-green-400 mt-1">&#10003;</span>
                        <span>Your annual turnover exceeds 2 million euros</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-green-400 mt-1">&#10003;</span>
                        <span>You sell physical products, digital products, or services online</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-green-400 mt-1">&#10003;</span>
                        <span>You operate marketplace platforms</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-amber-900/20 border border-amber-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-amber-400 mb-4 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" />
                      Critical Considerations
                    </h3>
                    <ul className="space-y-3 text-zinc-300">
                      <li className="flex items-start gap-3">
                        <span className="text-amber-400 mt-1">!</span>
                        <span><strong className="text-white">Location does not matter</strong> - US, UK, or Asian companies must comply if serving EU customers</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-amber-400 mt-1">!</span>
                        <span><strong className="text-white">Mobile apps count</strong> - your shopping app faces the same requirements</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-amber-400 mt-1">!</span>
                        <span><strong className="text-white">Checkout process included</strong> - the entire purchase journey must be accessible</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-amber-400 mt-1">!</span>
                        <span><strong className="text-white">Customer service too</strong> - help centers, chatbots, and contact forms</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <p className="text-zinc-300 text-lg leading-relaxed">
                  The only significant exemption applies to microenterprises providing services (not products):
                  businesses with fewer than 10 employees AND annual turnover below 2 million euros.
                  However, most legitimate e-commerce operations exceed these thresholds.
                </p>
              </div>
            </section>

            {/* CTA Break */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 my-12 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">Find Out If Your Store Is Compliant</h3>
              <p className="text-indigo-100 mb-6 max-w-xl mx-auto">
                Get an instant accessibility score and see exactly which EAA requirements you are meeting
                and which need immediate attention.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-600 font-bold rounded-xl hover:bg-indigo-50 transition-colors"
              >
                Free EAA Compliance Scan
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Section 3 */}
            <section id="technical-requirements" className="mb-16 scroll-mt-8">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-lg">3</span>
                Technical Requirements: WCAG 2.1 AA Explained
              </h2>
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
                <p className="text-zinc-300 text-lg mb-8 leading-relaxed">
                  WCAG 2.1 Level AA comprises 50 success criteria organized into four foundational principles.
                  Here is what each means for your e-commerce store:
                </p>

                {/* Perceivable */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-green-400 mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">P</span>
                    Perceivable - Users Can See or Hear Content
                  </h3>
                  <div className="bg-zinc-800/50 rounded-xl p-6">
                    <ul className="space-y-3 text-zinc-300">
                      <li><strong className="text-white">Alt text for product images:</strong> Every product photo needs descriptive alt text that conveys what the image shows. A screen reader user should understand what the product looks like.</li>
                      <li><strong className="text-white">Video captions:</strong> Product videos, tutorials, and promotional content need synchronized captions for deaf and hard-of-hearing users.</li>
                      <li><strong className="text-white">Color contrast:</strong> Text must have a contrast ratio of at least 4.5:1 against its background. This affects your entire design system including buttons, links, and form labels.</li>
                      <li><strong className="text-white">Text resizing:</strong> Content must remain usable when users zoom to 200%. No horizontal scrolling or content cutoff.</li>
                      <li><strong className="text-white">Responsive design:</strong> Your store must work at all viewport sizes, from mobile to ultrawide displays.</li>
                    </ul>
                  </div>
                </div>

                {/* Operable */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-blue-400 mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">O</span>
                    Operable - Users Can Navigate and Interact
                  </h3>
                  <div className="bg-zinc-800/50 rounded-xl p-6">
                    <ul className="space-y-3 text-zinc-300">
                      <li><strong className="text-white">Keyboard navigation:</strong> Every interactive element must be accessible via keyboard. This includes product carousels, filters, add-to-cart buttons, and checkout forms.</li>
                      <li><strong className="text-white">No keyboard traps:</strong> Users must be able to navigate away from any element using only the keyboard. Modal dialogs and dropdown menus are common trap sources.</li>
                      <li><strong className="text-white">Focus indicators:</strong> When tabbing through your site, users must see a clear visual indicator of which element is focused.</li>
                      <li><strong className="text-white">Touch targets:</strong> Buttons and links must be at least 44x44 CSS pixels. This is especially important for mobile e-commerce.</li>
                      <li><strong className="text-white">Skip navigation:</strong> Provide a way for keyboard users to bypass repetitive navigation and jump to main content.</li>
                    </ul>
                  </div>
                </div>

                {/* Understandable */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-amber-400 mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 bg-amber-500/20 rounded-lg flex items-center justify-center">U</span>
                    Understandable - Users Can Comprehend Content
                  </h3>
                  <div className="bg-zinc-800/50 rounded-xl p-6">
                    <ul className="space-y-3 text-zinc-300">
                      <li><strong className="text-white">Language declaration:</strong> Your HTML must declare the page language. If product descriptions appear in multiple languages, mark those sections appropriately.</li>
                      <li><strong className="text-white">Form labels:</strong> Every form field needs a visible, programmatically associated label. Placeholder text alone is not sufficient.</li>
                      <li><strong className="text-white">Error identification:</strong> When users make mistakes in checkout forms, errors must be clearly identified with specific guidance on how to fix them.</li>
                      <li><strong className="text-white">Consistent navigation:</strong> Your navigation structure should remain consistent across all pages. Do not move the cart icon or reorganize menus unpredictably.</li>
                      <li><strong className="text-white">Input assistance:</strong> Provide clear instructions for complex inputs like credit card numbers or shipping addresses.</li>
                    </ul>
                  </div>
                </div>

                {/* Robust */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-purple-400 mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">R</span>
                    Robust - Content Works with Assistive Technology
                  </h3>
                  <div className="bg-zinc-800/50 rounded-xl p-6">
                    <ul className="space-y-3 text-zinc-300">
                      <li><strong className="text-white">Valid HTML:</strong> Your code must be well-formed with properly nested elements and unique IDs. Invalid HTML often breaks screen readers.</li>
                      <li><strong className="text-white">ARIA implementation:</strong> When using custom components, implement ARIA roles, states, and properties correctly. Incorrect ARIA is worse than no ARIA.</li>
                      <li><strong className="text-white">Status messages:</strong> When users add items to cart or complete actions, announce these changes to screen reader users.</li>
                      <li><strong className="text-white">Name, role, value:</strong> Custom UI components must expose their name, role, and current value to assistive technologies.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section id="ecommerce-specific" className="mb-16 scroll-mt-8">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-lg">4</span>
                E-commerce Specific Requirements
              </h2>
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
                <p className="text-zinc-300 text-lg mb-8 leading-relaxed">
                  Beyond general WCAG compliance, the EAA has specific provisions for e-commerce that address
                  the entire customer journey. Here are the critical touchpoints:
                </p>

                <div className="space-y-6">
                  <div className="bg-zinc-800/50 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-white mb-3">Product Discovery and Browsing</h4>
                    <ul className="space-y-2 text-zinc-300">
                      <li>- Search functionality must be keyboard accessible with results announced to screen readers</li>
                      <li>- Product filters and sorting must work without a mouse</li>
                      <li>- Category navigation must use proper heading structure</li>
                      <li>- Product cards need meaningful alt text and clear price/availability information</li>
                    </ul>
                  </div>

                  <div className="bg-zinc-800/50 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-white mb-3">Product Detail Pages</h4>
                    <ul className="space-y-2 text-zinc-300">
                      <li>- All product images must have descriptive alt text</li>
                      <li>- Image galleries and zoom features must be keyboard operable</li>
                      <li>- Size charts and product specifications must be accessible</li>
                      <li>- Customer reviews must be readable by assistive technologies</li>
                      <li>- Color and size selectors must announce selected options</li>
                    </ul>
                  </div>

                  <div className="bg-zinc-800/50 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-white mb-3">Shopping Cart and Checkout</h4>
                    <ul className="space-y-2 text-zinc-300">
                      <li>- Cart updates must be announced to screen reader users</li>
                      <li>- Quantity changes must provide immediate feedback</li>
                      <li>- Checkout forms need proper labels and error handling</li>
                      <li>- Address autocomplete must be keyboard accessible</li>
                      <li>- Payment forms must work with assistive technologies</li>
                      <li>- Order confirmation must be accessible</li>
                    </ul>
                  </div>

                  <div className="bg-zinc-800/50 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-white mb-3">Customer Service</h4>
                    <ul className="space-y-2 text-zinc-300">
                      <li>- Live chat must be keyboard accessible</li>
                      <li>- Contact forms must have proper labels</li>
                      <li>- Help center content must be navigable</li>
                      <li>- FAQ accordions must be keyboard operable</li>
                      <li>- Return/refund processes must be accessible</li>
                    </ul>
                  </div>

                  <div className="bg-zinc-800/50 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-white mb-3">Account Management</h4>
                    <ul className="space-y-2 text-zinc-300">
                      <li>- Login and registration forms must be accessible</li>
                      <li>- Password requirements must be clearly communicated</li>
                      <li>- Order history must be readable by screen readers</li>
                      <li>- Account settings must be keyboard navigable</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 5 */}
            <section id="penalties" className="mb-16 scroll-mt-8">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-lg">5</span>
                Penalties and Enforcement
              </h2>
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
                <p className="text-zinc-300 text-lg mb-8 leading-relaxed">
                  The EAA requires each EU member state to establish enforcement mechanisms and penalties that
                  are effective, proportionate, and dissuasive. While specific amounts vary by country, the
                  financial and business risks are substantial.
                </p>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-red-900/20 border border-red-700/50 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-red-400 mb-4">Financial Penalties</h4>
                    <ul className="space-y-3 text-zinc-300">
                      <li className="flex items-start gap-2">
                        <span className="text-red-400">&#8226;</span>
                        <span>Germany: Up to <strong className="text-white">100,000 euros</strong> per violation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400">&#8226;</span>
                        <span>Some jurisdictions: Up to <strong className="text-white">5% of annual turnover</strong></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400">&#8226;</span>
                        <span>Per-violation penalties that <strong className="text-white">accumulate</strong> with each issue</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400">&#8226;</span>
                        <span>Potential <strong className="text-white">criminal liability</strong> for willful non-compliance</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-orange-900/20 border border-orange-700/50 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-orange-400 mb-4">Operational Consequences</h4>
                    <ul className="space-y-3 text-zinc-300">
                      <li className="flex items-start gap-2">
                        <span className="text-orange-400">&#8226;</span>
                        <span><strong className="text-white">Market withdrawal</strong> - forced removal from EU market</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-400">&#8226;</span>
                        <span><strong className="text-white">Public enforcement actions</strong> that damage reputation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-400">&#8226;</span>
                        <span><strong className="text-white">Legal action</strong> from disability advocacy organizations</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-400">&#8226;</span>
                        <span><strong className="text-white">Lost revenue</strong> from 135M potential customers</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-indigo-600/10 border border-indigo-500/30 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-indigo-300 mb-3">Consumer Complaint Mechanism</h4>
                  <p className="text-zinc-300">
                    The EAA establishes a right for consumers to file complaints directly with market surveillance
                    authorities. This means any EU customer who encounters accessibility barriers on your site can
                    trigger an official investigation. With 135 million people with disabilities in the EU,
                    the risk of complaints is significant.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 6 */}
            <section id="compliance-roadmap" className="mb-16 scroll-mt-8">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-lg">6</span>
                Your Compliance Roadmap
              </h2>
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
                <p className="text-zinc-300 text-lg mb-8 leading-relaxed">
                  With {deadlineInfo.days} days until the deadline, here is how to approach EAA compliance
                  systematically:
                </p>

                <div className="space-y-6">
                  <div className="flex gap-6">
                    <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-xl font-bold text-white">1</span>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-white mb-2">Week 1: Comprehensive Audit</h4>
                      <p className="text-zinc-400 mb-3">
                        Start with an automated scan to identify the full scope of issues. Automated tools typically
                        catch 30-40% of problems but provide a crucial baseline.
                      </p>
                      <Link href="/" className="text-indigo-400 hover:text-indigo-300 flex items-center gap-2">
                        Run your free accessibility scan
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>

                  <div className="flex gap-6">
                    <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-xl font-bold text-white">2</span>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-white mb-2">Week 2-3: Prioritize and Plan</h4>
                      <p className="text-zinc-400">
                        Focus first on critical issues that completely block access: missing alt text, keyboard traps,
                        form labels, and color contrast violations. These represent the highest legal risk and
                        affect the most users.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-6">
                    <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-xl font-bold text-white">3</span>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-white mb-2">Week 4-8: Systematic Remediation</h4>
                      <p className="text-zinc-400">
                        Work through issues by component type rather than page by page. Fix all images, then all forms,
                        then navigation. This approach is more efficient and ensures consistency.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-6">
                    <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-xl font-bold text-white">4</span>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-white mb-2">Week 9-10: User Testing</h4>
                      <p className="text-zinc-400">
                        Test with real users who rely on assistive technologies. Screen reader users, keyboard-only
                        navigators, and users with cognitive disabilities will find issues automated tools miss.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-6">
                    <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-xl font-bold text-white">5</span>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-white mb-2">Week 11: Documentation</h4>
                      <p className="text-zinc-400 mb-3">
                        Publish your accessibility statement describing your compliance status, known limitations,
                        and how users can report issues or request accommodations.
                      </p>
                      <Link href="/blog/accessibility-statement-guide" className="text-indigo-400 hover:text-indigo-300 flex items-center gap-2">
                        Read our accessibility statement guide
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>

                  <div className="flex gap-6">
                    <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-xl font-bold text-white">6</span>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-white mb-2">Ongoing: Continuous Monitoring</h4>
                      <p className="text-zinc-400">
                        Accessibility is not a one-time project. New content, features, and updates can introduce
                        new issues. Establish automated monitoring and regular manual audits to maintain compliance.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Conclusion */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-white mb-6">Conclusion: The Time to Act Is Now</h2>
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
                <p className="text-zinc-300 text-lg mb-6 leading-relaxed">
                  The European Accessibility Act represents both a legal obligation and a business opportunity.
                  With {deadlineInfo.days} days remaining, e-commerce businesses have a clear window to achieve
                  compliance, but that window is closing rapidly.
                </p>
                <p className="text-zinc-300 text-lg mb-6 leading-relaxed">
                  Beyond avoiding fines, accessible e-commerce sites see tangible benefits: expanded market reach
                  to 135 million EU citizens with disabilities, improved SEO performance, better mobile usability,
                  and enhanced brand reputation.
                </p>
                <p className="text-zinc-300 text-lg leading-relaxed">
                  The first step is understanding where you stand. An accessibility scan takes 30 seconds and
                  provides immediate clarity on your compliance status and what needs to be fixed.
                </p>
              </div>
            </section>
          </div>

          {/* Final CTA */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-10 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Check Your EAA Compliance Now</h2>
            <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
              Get an instant accessibility score, see all violations, and receive AI-generated fixes
              tailored to your platform. Free scan, no signup required.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-3 px-10 py-5 bg-white text-indigo-600 font-bold text-lg rounded-xl hover:bg-indigo-50 transition-colors"
            >
              <Shield className="w-6 h-6" />
              Free Accessibility Scan
              <ArrowRight className="w-6 h-6" />
            </Link>
            <p className="text-indigo-200 text-sm mt-4">Join 2,800+ e-commerce sites already using Inclusiv</p>
          </div>

          {/* Related Articles */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-white mb-6">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/blog/shopify-wcag-violations" className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition-colors group">
                <span className="text-xs text-zinc-500 uppercase tracking-wide">Tutorial</span>
                <h3 className="text-lg font-semibold text-white mt-2 group-hover:text-indigo-400 transition-colors">10 Most Common WCAG Violations in Shopify Stores</h3>
              </Link>
              <Link href="/blog/eaa-vs-ada-comparison" className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition-colors group">
                <span className="text-xs text-zinc-500 uppercase tracking-wide">Legal</span>
                <h3 className="text-lg font-semibold text-white mt-2 group-hover:text-indigo-400 transition-colors">EAA vs ADA: Understanding Accessibility Laws</h3>
              </Link>
              <Link href="/blog/accessibility-statement-guide" className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition-colors group">
                <span className="text-xs text-zinc-500 uppercase tracking-wide">Legal</span>
                <h3 className="text-lg font-semibold text-white mt-2 group-hover:text-indigo-400 transition-colors">How to Create an Accessibility Statement</h3>
              </Link>
            </div>
          </div>
        </article>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 mt-24">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-zinc-500 text-sm">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            <span>Inclusiv 2025</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <Link href="/eaa-guide" className="hover:text-white transition-colors">EAA Guide</Link>
            <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
          </div>
          <div>
            Powered by axe-core - WCAG 2.1 AA
          </div>
        </div>
      </footer>

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "The Complete Guide to EAA Compliance for E-commerce in 2025",
            "description": "Everything you need to know about European Accessibility Act compliance for e-commerce businesses.",
            "author": {
              "@type": "Organization",
              "name": "Inclusiv"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Inclusiv",
              "logo": {
                "@type": "ImageObject",
                "url": "https://inclusiv.app/logo.png"
              }
            },
            "datePublished": "2025-01-01",
            "dateModified": "2025-01-15"
          })
        }}
      />
    </div>
  );
}
