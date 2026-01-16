import type { Metadata } from "next";
import { Mail, Copy, CheckCircle, ArrowRight, Shield, AlertTriangle, Building, Users, Briefcase } from "lucide-react";
import Link from "next/link";
import { SiteFooter } from "@/components/seo/SiteFooter";
import { CopyButton } from "./CopyButton";

export const metadata: Metadata = {
  title: "Free EAA Compliance Email Templates | Outreach & Internal Communication",
  description: "Free email templates for EAA compliance communication. Notify stakeholders, request budget, inform leadership about accessibility deadlines.",
  keywords: ["EAA email templates", "accessibility compliance emails", "WCAG communication", "stakeholder notification", "compliance request"],
  openGraph: {
    title: "Free EAA Compliance Email Templates",
    description: "Professional email templates for EAA and accessibility compliance communication",
    type: "website",
  },
};

const templates = [
  {
    id: "executive-alert",
    title: "Executive Alert: EAA Compliance Risk",
    description: "Inform leadership about urgent EAA compliance requirements",
    audience: "C-Suite / Management",
    icon: Briefcase,
    subject: "Urgent: Our Website May Be Non-Compliant with EU Accessibility Law",
    body: `Hi [Name],

I wanted to bring an urgent compliance matter to your attention.

The European Accessibility Act (EAA) deadline was June 28, 2025. This EU law requires all digital products and services - including our website - to meet WCAG 2.1 AA accessibility standards.

Non-compliance can result in:
• Fines up to €100,000 per violation
• Mandatory remediation orders
• Reputational damage
• Loss of EU customers

I ran a quick scan on our website using [Inclusiv.dev] and found [X] accessibility issues, including [X critical issues] that could expose us to regulatory action.

Recommended next steps:
1. Conduct a full accessibility audit
2. Prioritize and fix critical issues
3. Implement ongoing monitoring

I'd like to discuss this in our next meeting. Happy to share the full scan report.

Best regards,
[Your Name]`,
  },
  {
    id: "budget-request",
    title: "Budget Request for Accessibility Compliance",
    description: "Request budget approval for accessibility tools and fixes",
    audience: "Finance / Procurement",
    icon: Building,
    subject: "Budget Request: WCAG/EAA Accessibility Compliance - Preventing €100K+ Fines",
    body: `Hi [Name],

I'm requesting budget approval for website accessibility compliance to address European Accessibility Act (EAA) requirements.

BACKGROUND:
The EAA requires WCAG 2.1 AA compliance for websites serving EU customers. The deadline was June 28, 2025, and enforcement is now active. Non-compliance can result in fines up to €100,000 per violation.

CURRENT STATUS:
A preliminary scan of our website identified [X] accessibility issues that need to be addressed.

PROPOSED SOLUTION:
I recommend using Inclusiv (inclusiv.dev) for accessibility scanning and remediation:

Option A - Professional Plan: €149/month
• Unlimited page scanning
• AI-powered fix suggestions
• Compliance certificate
• Priority support

Option B - Enterprise Plan: €499/month
• All Professional features
• Dedicated compliance manager
• Custom remediation support
• Legal documentation

COST-BENEFIT ANALYSIS:
• Investment: €1,788-5,988/year
• Risk avoided: Up to €100,000+ in fines
• ROI: 1,600%+ risk mitigation

I'd appreciate approval to proceed with [Option A/B]. Happy to discuss further.

Thank you,
[Your Name]`,
  },
  {
    id: "team-kickoff",
    title: "Team Kickoff: Accessibility Initiative",
    description: "Rally your development team around accessibility work",
    audience: "Development Team",
    icon: Users,
    subject: "New Initiative: Making Our Website Accessible (EAA Compliance)",
    body: `Hi team,

We're kicking off a new accessibility initiative to bring our website into compliance with the European Accessibility Act (EAA) and WCAG 2.1 AA standards.

WHY THIS MATTERS:
• Legal: The EAA deadline passed June 2025 - we need to comply
• Users: 15% of the population has a disability
• SEO: Accessible sites rank better on Google
• Quality: Accessible code is generally better code

WHAT WE FOUND:
I ran a scan using Inclusiv and found:
• [X] total accessibility issues
• [X] critical issues (screen reader barriers)
• [X] serious issues (keyboard navigation problems)

OUR APPROACH:
1. Week 1-2: Fix critical issues (alt text, form labels, ARIA)
2. Week 3-4: Fix serious issues (contrast, focus states)
3. Ongoing: Integrate accessibility into our workflow

RESOURCES:
• Scan results: [Link to your Inclusiv report]
• WCAG Quick Reference: https://www.w3.org/WAI/WCAG21/quickref/
• Testing tool: Install axe DevTools browser extension

I'll be scheduling a kickoff meeting this week. Please come prepared with questions.

Let's build something everyone can use!

[Your Name]`,
  },
  {
    id: "vendor-inquiry",
    title: "Vendor Compliance Inquiry",
    description: "Check if your vendors meet accessibility requirements",
    audience: "Third-Party Vendors",
    icon: Building,
    subject: "Accessibility Compliance Inquiry - EAA/WCAG 2.1 Requirements",
    body: `Dear [Vendor Name],

As part of our compliance with the European Accessibility Act (EAA), we're reviewing the accessibility status of all third-party tools and services integrated with our website.

Could you please provide:

1. WCAG Compliance Status
   • Does your product meet WCAG 2.1 Level AA standards?
   • Do you have a current VPAT/Accessibility Conformance Report?

2. Accessibility Documentation
   • Accessibility statement or policy
   • Recent accessibility audit results
   • Roadmap for any known issues

3. Technical Details
   • Keyboard navigation support
   • Screen reader compatibility
   • ARIA implementation status

4. Compliance Commitment
   • Timeline for achieving full WCAG 2.1 AA compliance (if not current)
   • Process for reporting and resolving accessibility issues

This information is required for our EAA compliance documentation. Please respond within [X] business days.

Thank you for your cooperation.

Best regards,
[Your Name]
[Company]`,
  },
  {
    id: "customer-communication",
    title: "Customer Accessibility Statement",
    description: "Communicate your accessibility commitment to customers",
    audience: "Customers / Public",
    icon: Users,
    subject: "Our Commitment to Digital Accessibility",
    body: `Dear valued customer,

At [Company Name], we believe the internet should be accessible to everyone. We're writing to share our commitment to digital accessibility and our progress in making our website fully accessible.

OUR COMMITMENT:
We're committed to ensuring our website meets Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards, which is the requirement under the European Accessibility Act and other global accessibility laws.

WHAT WE'VE DONE:
• Conducted comprehensive accessibility audits
• Fixed [X] accessibility issues
• Implemented keyboard navigation throughout
• Added screen reader support
• Improved color contrast and text readability

ONGOING EFFORTS:
We continuously monitor our website for accessibility issues and train our team on accessible design practices.

FEEDBACK:
If you encounter any accessibility barriers on our website, please contact us:
• Email: accessibility@[company].com
• Phone: [Number]

We typically respond to accessibility feedback within 2 business days.

Thank you for being our customer. We're committed to serving everyone.

Best regards,
[Your Name]
[Company Name]`,
  },
  {
    id: "cold-outreach",
    title: "Cold Outreach: EAA Compliance Check",
    description: "Reach out to EU businesses about accessibility",
    audience: "Prospective Clients",
    icon: Mail,
    subject: "Quick question about [Company] accessibility (EAA)",
    body: `Hi [Name],

I noticed [Company]'s website when researching [industry] businesses preparing for EAA compliance.

Quick question: Have you had a chance to check your site's accessibility status since the June 28, 2025 deadline?

I ran a quick (free) scan on [website] and spotted a few issues that could pose compliance risks - mainly around [specific issue like "missing alt text" or "keyboard navigation"].

Not trying to alarm you - 87% of EU websites have similar issues. But with enforcement now active, it's worth a look.

If you want, I can send over the free scan results. Takes 30 seconds: inclusiv.dev

Either way, hope [Company] is doing well!

Best,
[Your Name]

P.S. The scan is completely free, no strings attached. Just trying to help EU businesses stay compliant.`,
  },
];

export default function EmailTemplatesPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-indigo-500" />
            <span className="text-xl font-bold text-white">Inclusiv</span>
          </Link>
          <Link
            href="/resources"
            className="text-zinc-400 hover:text-white transition-colors text-sm"
          >
            ← All Resources
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 rounded-full mb-6">
            <Mail className="w-4 h-4 text-indigo-400" />
            <span className="text-indigo-400 text-sm font-medium">Free Resource</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            EAA Compliance Email Templates
          </h1>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Professional email templates to communicate accessibility requirements with
            executives, teams, vendors, and customers. Copy, customize, and send.
          </p>
        </div>

        {/* Urgency Banner */}
        <div className="mb-10 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0" />
            <p className="text-zinc-300 text-sm">
              <strong className="text-red-400">EAA enforcement is active.</strong> Use these
              templates to communicate the urgency to your stakeholders.
            </p>
          </div>
        </div>

        {/* Templates */}
        <div className="space-y-8">
          {templates.map((template) => (
            <div
              key={template.id}
              id={template.id}
              className="bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden"
            >
              {/* Template Header */}
              <div className="p-6 border-b border-zinc-800">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <template.icon className="w-6 h-6 text-indigo-500" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-white mb-1">
                        {template.title}
                      </h2>
                      <p className="text-zinc-400 text-sm mb-2">{template.description}</p>
                      <span className="inline-block px-2 py-0.5 bg-zinc-800 rounded text-xs text-zinc-400">
                        Audience: {template.audience}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Subject Line */}
              <div className="px-6 py-4 bg-zinc-800/30 border-b border-zinc-800">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <span className="text-xs text-zinc-500 uppercase tracking-wide">Subject Line</span>
                    <p className="text-white font-medium mt-1">{template.subject}</p>
                  </div>
                  <CopyButton text={template.subject} label="Copy subject" />
                </div>
              </div>

              {/* Email Body */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-zinc-500 uppercase tracking-wide">Email Body</span>
                  <CopyButton text={template.body} label="Copy email" />
                </div>
                <pre className="whitespace-pre-wrap text-sm text-zinc-300 font-sans leading-relaxed bg-zinc-800/30 rounded-xl p-4 max-h-80 overflow-y-auto">
                  {template.body}
                </pre>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center p-8 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-indigo-500/10 border border-indigo-500/20 rounded-2xl">
          <h2 className="text-2xl font-bold text-white mb-4">
            Need actual compliance data for your emails?
          </h2>
          <p className="text-zinc-400 mb-6">
            Run a free scan to get real accessibility metrics you can include in your communications.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-colors"
          >
            Get Free Scan Results
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
