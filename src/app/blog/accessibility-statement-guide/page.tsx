"use client";

import Link from 'next/link';
import { Shield, Clock, ArrowRight, ArrowLeft, FileText, CheckCircle, AlertTriangle, Copy, Download, Scale, MessageSquare, Settings, Eye, Users, Building2 } from 'lucide-react';
import { useState } from 'react';

// Calculate days until EAA deadline
const getDeadlineInfo = () => {
  const deadline = new Date("2025-06-28");
  const today = new Date();
  const diffTime = deadline.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return { days: diffDays, deadline };
};

// Template sections
const templateSections = [
  {
    id: 'commitment',
    title: 'Commitment Statement',
    required: true,
    example: `[Company Name] is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards to ensure we provide equal access to all users.`,
  },
  {
    id: 'standards',
    title: 'Conformance Status',
    required: true,
    example: `This website conforms to Web Content Accessibility Guidelines (WCAG) 2.1 Level AA. These guidelines explain how to make web content more accessible for people with disabilities and more user-friendly for everyone.`,
  },
  {
    id: 'scope',
    title: 'Scope of Statement',
    required: true,
    example: `This accessibility statement applies to [website URL]. This includes all pages under this domain, our mobile applications, and digital services accessible through this website.`,
  },
  {
    id: 'measures',
    title: 'Accessibility Measures',
    required: false,
    example: `[Company Name] takes the following measures to ensure accessibility:
• Include accessibility as part of our mission statement
• Integrate accessibility into our procurement practices
• Provide continual accessibility training for our staff
• Assign clear accessibility goals and responsibilities
• Employ formal accessibility quality assurance methods`,
  },
  {
    id: 'feedback',
    title: 'Feedback & Contact Information',
    required: true,
    example: `We welcome your feedback on the accessibility of [website]. Please let us know if you encounter any accessibility barriers:

Email: accessibility@[company].com
Phone: [Phone Number]
Postal Address: [Address]

We aim to respond to accessibility feedback within 5 business days.`,
  },
  {
    id: 'limitations',
    title: 'Known Limitations',
    required: false,
    example: `Despite our best efforts, some content may not be fully accessible. Below is a description of known limitations:

• User-generated content: Some content uploaded by users may not meet accessibility standards. We provide guidance for accessible content creation.
• Third-party content: Some embedded content from third-party providers may not be fully accessible. We are working with these providers to improve accessibility.`,
  },
  {
    id: 'compatibility',
    title: 'Technical Specifications',
    required: false,
    example: `This website is designed to be compatible with the following assistive technologies:
• Screen readers (NVDA, JAWS, VoiceOver)
• Screen magnification software
• Speech recognition software
• Keyboard-only navigation

The website is not compatible with browsers older than 3 versions.`,
  },
  {
    id: 'assessment',
    title: 'Assessment Approach',
    required: false,
    example: `[Company Name] assessed the accessibility of this website using:
• Self-evaluation using automated testing tools
• External evaluation by accessibility consultants
• User testing with assistive technology users`,
  },
  {
    id: 'date',
    title: 'Statement Date',
    required: true,
    example: `This statement was created on [Date] and was last reviewed on [Date].`,
  },
];

const eaaRequirements = [
  'Declaration of conformance status (full, partial, or non-conformance)',
  'List of content not accessible and reasons why',
  'Description of accessible alternatives',
  'Contact information for accessibility feedback',
  'Link to enforcement procedure (for EU public sector)',
  'Date the statement was last updated',
];

const commonMistakes = [
  {
    mistake: 'Vague commitment statements',
    why: 'Statements like "we are committed to accessibility" without specifics provide no legal protection and no useful information to users.',
    fix: 'Specify the exact standards you\'re following (e.g., WCAG 2.1 Level AA) and your actual conformance status.',
  },
  {
    mistake: 'No contact mechanism',
    why: 'Without a way to report issues, users have no recourse and you lose valuable feedback about real accessibility barriers.',
    fix: 'Provide multiple contact methods (email, phone, form) and commit to response times.',
  },
  {
    mistake: 'Claiming full compliance falsely',
    why: 'Overclaiming compliance can backfire legally. If someone finds violations after you claimed full compliance, it looks like deception.',
    fix: 'Be honest about your status. "Partially conformant" with a remediation plan is better than a false "fully conformant."',
  },
  {
    mistake: 'Never updating the statement',
    why: 'An outdated statement suggests you\'re not actively maintaining accessibility. It also may not reflect your current status.',
    fix: 'Review and update at least annually, or whenever you make significant changes to your website.',
  },
  {
    mistake: 'Hiding it in the footer',
    why: 'If users can\'t find your accessibility statement, it\'s not serving its purpose. It should be easily discoverable.',
    fix: 'Link to it from your main footer, and consider adding it to your main navigation or help section.',
  },
  {
    mistake: 'Using inaccessible PDF format',
    why: 'Ironic as it sounds, many accessibility statements are published as inaccessible PDFs.',
    fix: 'Publish as HTML webpage. If you need a PDF version, ensure it\'s fully accessible.',
  },
];

const fullTemplate = `# Accessibility Statement for [Company Name]

## Our Commitment

[Company Name] is committed to ensuring digital accessibility for people with disabilities. We continually improve the user experience for everyone and apply the relevant accessibility standards to ensure we provide equal access to all users.

## Conformance Status

This website conforms to Web Content Accessibility Guidelines (WCAG) 2.1 Level AA. These guidelines explain how to make web content more accessible for people with disabilities and more user-friendly for everyone.

**Current Status:** [Fully conformant / Partially conformant / Non-conformant]

## Scope

This accessibility statement applies to:
- Website: [your-website.com]
- Mobile applications: [App names if applicable]
- Digital services: [List any specific services]

## Accessibility Features

We have implemented the following accessibility features:

**Navigation:**
- Skip navigation links to bypass repetitive content
- Consistent navigation structure across all pages
- Keyboard-accessible menus and interactive elements

**Content:**
- Text alternatives for all meaningful images
- Sufficient color contrast (minimum 4.5:1 for normal text)
- Resizable text up to 200% without loss of functionality
- Clear heading hierarchy for screen reader navigation

**Forms:**
- Clearly labeled form fields
- Error identification and suggestions
- Focus indicators for keyboard users

**Multimedia:**
- Captions for video content
- Transcripts for audio content
- No auto-playing media

## Known Limitations

Despite our best efforts to ensure accessibility, there may be some limitations. Below is a description of known limitations and potential solutions:

1. **[Specific content or feature]**
   - Description: [What the limitation is]
   - Why: [Reason for the limitation]
   - Alternative: [How users can access this content/feature alternatively]
   - Timeline: [When you expect to fix this]

2. **User-Generated Content**
   - Some content uploaded by users may not meet accessibility standards
   - We provide guidelines for accessible content creation
   - Contact us if you encounter inaccessible user content

3. **Third-Party Content**
   - Some embedded content from third-party providers may have accessibility limitations
   - We are actively working with providers to improve accessibility

## Feedback and Contact Information

We welcome your feedback on the accessibility of [website name]. Please let us know if you encounter accessibility barriers:

**Email:** accessibility@[company].com
**Phone:** [Phone number]
**Address:** [Physical address]
**Response Time:** We aim to respond to accessibility feedback within 5 business days.

**Accessibility Feedback Form:** [Link to dedicated form if available]

## Enforcement Procedure (EU/EEA Users)

If you are located in the European Union or European Economic Area, and you are not satisfied with our response to your accessibility concern, you have the right to submit a complaint to your national enforcement body. [Link to relevant national body or process]

## Technical Specifications

This website is designed to be compatible with:
- Screen readers: NVDA, JAWS, VoiceOver, TalkBack
- Screen magnification software
- Speech recognition software
- Keyboard-only navigation

**Technologies Used:**
- HTML5
- WAI-ARIA
- CSS
- JavaScript

**Browser Compatibility:**
This website works best with current versions of Chrome, Firefox, Safari, and Edge. It may not function optimally in older browsers.

## Assessment Methods

We assess the accessibility of [website] through:
- Self-evaluation using automated testing tools (axe-core)
- Expert manual evaluation
- [External audit by accessibility consultants if applicable]
- User testing with assistive technology users

## Statement Information

- **Date Created:** [Date]
- **Last Reviewed:** [Date]
- **Review Frequency:** [Monthly/Quarterly/Annually]

---

This statement was created using guidelines from the W3C Web Accessibility Initiative and European Accessibility Act requirements.`;

// Copy button component
function CopyButton({ text, label }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors text-sm"
    >
      {copied ? (
        <>
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span className="text-emerald-400">Copied!</span>
        </>
      ) : (
        <>
          <Copy className="w-4 h-4 text-zinc-400" />
          <span className="text-zinc-300">{label || 'Copy'}</span>
        </>
      )}
    </button>
  );
}

export default function AccessibilityStatementGuidePage() {
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
          <span className="text-zinc-400">Legal</span>
        </div>

        {/* Article Header */}
        <article>
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-sm font-semibold rounded-full">
                Legal Guide
              </span>
              <span className="text-zinc-500">January 2025</span>
              <span className="text-zinc-600">|</span>
              <span className="text-zinc-500">9 min read</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              How to Create an Accessibility Statement That Actually Protects Your Business
            </h1>

            <p className="text-xl text-zinc-400 leading-relaxed mb-8">
              Learn how to write an accessibility statement that meets EAA requirements,
              builds user trust, and provides genuine legal protection. Includes
              copy-paste templates and real-world examples.
            </p>

            {/* Quick Features */}
            <div className="flex flex-wrap gap-4 p-6 bg-zinc-900 border border-zinc-800 rounded-2xl">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-indigo-400" />
                <span className="text-zinc-400">Copy-paste template included</span>
              </div>
              <div className="flex items-center gap-2">
                <Scale className="w-5 h-5 text-indigo-400" />
                <span className="text-zinc-400">EAA compliant format</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-indigo-400" />
                <span className="text-zinc-400">Section-by-section guide</span>
              </div>
            </div>
          </header>

          {/* Introduction */}
          <section className="mb-12">
            <div className="prose prose-invert max-w-none">
              <p className="text-zinc-300 text-lg leading-relaxed mb-4">
                An accessibility statement is more than a legal checkbox—it&apos;s a public commitment
                to accessibility, a communication tool with your users, and yes, an important piece
                of your legal compliance strategy. Under the European Accessibility Act, it&apos;s mandatory.
                Under the ADA, while not required, it demonstrates good faith.
              </p>
              <p className="text-zinc-300 text-lg leading-relaxed">
                This guide will walk you through creating an accessibility statement that actually
                serves its purposes: informing users, demonstrating commitment, and providing
                appropriate legal protection.
              </p>
            </div>
          </section>

          {/* Why It Matters */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Eye className="w-6 h-6 text-indigo-500" />
              Why Your Accessibility Statement Matters
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl">
                <Users className="w-8 h-8 text-indigo-400 mb-4" />
                <h3 className="font-bold text-white mb-2">For Users</h3>
                <p className="text-sm text-zinc-400">
                  Sets expectations about accessibility features, known limitations, and how
                  to get help if they encounter barriers.
                </p>
              </div>
              <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl">
                <Scale className="w-8 h-8 text-indigo-400 mb-4" />
                <h3 className="font-bold text-white mb-2">For Legal Protection</h3>
                <p className="text-sm text-zinc-400">
                  Demonstrates good faith effort, discloses known issues transparently, and
                  provides evidence of ongoing accessibility work.
                </p>
              </div>
              <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl">
                <Building2 className="w-8 h-8 text-indigo-400 mb-4" />
                <h3 className="font-bold text-white mb-2">For Your Business</h3>
                <p className="text-sm text-zinc-400">
                  Builds trust with customers, creates a feedback channel for improvements,
                  and signals commitment to inclusion.
                </p>
              </div>
            </div>
          </section>

          {/* EAA Requirements */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <FileText className="w-6 h-6 text-indigo-500" />
              EAA Requirements for Accessibility Statements
            </h2>
            <div className="p-6 bg-blue-900/20 border border-blue-500/30 rounded-2xl mb-6">
              <p className="text-zinc-300 mb-4">
                Under the European Accessibility Act, businesses must provide an accessibility
                statement that includes the following elements:
              </p>
              <ul className="space-y-2">
                {eaaRequirements.map((req) => (
                  <li key={req} className="flex items-start gap-2 text-zinc-300">
                    <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-4 bg-yellow-900/20 border border-yellow-500/30 rounded-xl">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-zinc-300">
                  <strong className="text-yellow-400">Important:</strong> The EAA requires the statement
                  to be in an accessible format. That means HTML webpage (not just PDF), with proper
                  heading structure, and keyboard accessible.
                </p>
              </div>
            </div>
          </section>

          {/* Section by Section Guide */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Settings className="w-6 h-6 text-indigo-500" />
              Section-by-Section Guide
            </h2>
            <p className="text-zinc-400 mb-6">
              Here&apos;s what to include in each section of your accessibility statement,
              with example text you can customize:
            </p>
            <div className="space-y-6">
              {templateSections.map((section) => (
                <div
                  key={section.id}
                  id={section.id}
                  className="border border-zinc-800 rounded-2xl overflow-hidden"
                >
                  <div className="p-4 bg-zinc-900 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <h3 className="font-bold text-white">{section.title}</h3>
                      {section.required && (
                        <span className="text-xs px-2 py-0.5 bg-red-500/20 text-red-400 rounded">
                          Required
                        </span>
                      )}
                    </div>
                    <CopyButton text={section.example} label="Copy Section" />
                  </div>
                  <div className="p-4">
                    <pre className="text-sm text-zinc-400 whitespace-pre-wrap font-sans bg-zinc-950 p-4 rounded-lg">
                      {section.example}
                    </pre>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Common Mistakes */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-red-500" />
              Common Mistakes to Avoid
            </h2>
            <div className="space-y-4">
              {commonMistakes.map((item) => (
                <div
                  key={item.mistake}
                  className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl"
                >
                  <h3 className="font-semibold text-red-400 mb-2">{item.mistake}</h3>
                  <p className="text-sm text-zinc-400 mb-3">{item.why}</p>
                  <div className="flex items-start gap-2 p-3 bg-emerald-900/20 border border-emerald-500/30 rounded-lg">
                    <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-emerald-300">{item.fix}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Full Template */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Download className="w-6 h-6 text-indigo-500" />
              Complete Template
            </h2>
            <p className="text-zinc-400 mb-6">
              Here&apos;s a complete accessibility statement template that meets EAA requirements
              and follows best practices. Copy it and customize for your business:
            </p>
            <div className="border border-zinc-800 rounded-2xl overflow-hidden">
              <div className="p-4 bg-zinc-900 flex items-center justify-between">
                <span className="font-semibold text-white">Full Accessibility Statement Template</span>
                <CopyButton text={fullTemplate} label="Copy Full Template" />
              </div>
              <div className="p-4 max-h-96 overflow-y-auto">
                <pre className="text-sm text-zinc-400 whitespace-pre-wrap font-mono bg-zinc-950 p-4 rounded-lg">
                  {fullTemplate}
                </pre>
              </div>
            </div>
          </section>

          {/* Implementation Tips */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <MessageSquare className="w-6 h-6 text-indigo-500" />
              Implementation Best Practices
            </h2>
            <div className="space-y-4">
              {[
                {
                  title: 'Make it easy to find',
                  description: 'Link to your accessibility statement from your website footer on every page. Consider also linking from your help section and contact page.',
                },
                {
                  title: 'Use plain language',
                  description: 'Write in clear, simple language. Avoid jargon. Remember that people with cognitive disabilities may be reading this.',
                },
                {
                  title: 'Keep it current',
                  description: 'Set a reminder to review quarterly. Update immediately when you fix issues or discover new ones.',
                },
                {
                  title: 'Test the page itself',
                  description: 'Your accessibility statement page must be accessible. Run it through your accessibility scanner.',
                },
                {
                  title: 'Monitor feedback channels',
                  description: 'Actually respond to accessibility feedback. This is valuable user research and demonstrates good faith.',
                },
                {
                  title: 'Connect it to your remediation process',
                  description: 'When you list known limitations, include realistic timelines for fixes. Then follow through.',
                },
              ].map((tip) => (
                <div key={tip.title} className="flex items-start gap-4 p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
                  <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-white mb-1">{tip.title}</h3>
                    <p className="text-sm text-zinc-400">{tip.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="mb-12 p-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl text-center">
            <Shield className="w-12 h-12 text-white mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-4">
              Know What to Put in Your Statement
            </h2>
            <p className="text-indigo-100 mb-6 max-w-xl mx-auto">
              Scan your site first to identify your actual accessibility status and known issues.
              This makes writing an accurate statement much easier.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-600 font-semibold rounded-xl hover:bg-indigo-50 transition-colors"
            >
              Scan Your Site Free
              <ArrowRight className="w-5 h-5" />
            </Link>
          </section>

          {/* Checklist */}
          <section className="mb-12 p-6 bg-zinc-900 border border-zinc-800 rounded-2xl">
            <h2 className="text-xl font-bold text-white mb-4">Pre-Publication Checklist</h2>
            <div className="space-y-2">
              {[
                'Statement is published as accessible HTML (not just PDF)',
                'All placeholder text [like this] has been replaced',
                'Conformance status accurately reflects current state',
                'Contact information is correct and monitored',
                'Known limitations are honestly disclosed',
                'Statement page itself passes accessibility testing',
                'Link appears in website footer on all pages',
                'Date of last review is included',
                'Response time commitment is realistic',
                'Internal team knows how to handle feedback',
              ].map((item) => (
                <label key={item} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    className="w-5 h-5 rounded border-zinc-600 bg-zinc-800 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-zinc-400 group-hover:text-zinc-300">{item}</span>
                </label>
              ))}
            </div>
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
                href="/blog/eaa-vs-ada-comparison"
                className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-colors group"
              >
                <div className="text-sm text-indigo-400 mb-2">Legal</div>
                <h3 className="font-semibold text-white group-hover:text-indigo-400 transition-colors">
                  EAA vs ADA: Understanding Accessibility Laws for Global E-commerce
                </h3>
              </Link>
            </div>
          </section>
        </article>

        {/* Final CTA */}
        <div className="mt-12 bg-zinc-900 border border-zinc-800 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to Create Your Statement?</h2>
          <p className="text-zinc-400 mb-6 max-w-xl mx-auto">
            Start with an accessibility scan to understand your current status. Then use our
            template to create an accurate, compliant accessibility statement.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-colors"
          >
            <Shield className="w-5 h-5" />
            Free Accessibility Scan
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 mt-24">
        <div className="max-w-4xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-zinc-500 text-sm">
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
    </div>
  );
}
