import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Free Accessibility Statement Generator | ADA & WCAG Statement Template',
  description: 'Generate a professional accessibility statement for your website. Free ADA accessibility statement template. WCAG 2.1 compliant. Download instantly.',
  keywords: ['accessibility statement generator', 'ADA statement template', 'WCAG accessibility statement', 'website accessibility policy', 'accessibility commitment'],
  openGraph: {
    title: 'Free Accessibility Statement Generator',
    description: 'Create a professional accessibility statement for your website in minutes. Free template included.',
  },
};

export default function AccessibilityStatementGeneratorPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Free Accessibility Statement Generator
        </h1>

        <p className="text-xl text-slate-300 mb-8">
          Every website needs an accessibility statement. It demonstrates your commitment to
          inclusivity, provides contact information for users who need assistance, and is
          required by many accessibility laws including the EAA, ADA, and Section 508.
        </p>

        <div className="bg-blue-500/20 border border-blue-500 rounded-lg p-6 mb-8">
          <p className="text-xl font-semibold text-blue-300">
            First, scan your website for accessibility issues
          </p>
          <p className="text-blue-200 mt-2">
            Your accessibility statement should accurately reflect your current compliance status.
            Run a free scan to understand your accessibility level before creating your statement.
          </p>
        </div>

        <div className="bg-blue-600 rounded-xl p-8 text-center mb-12">
          <h2 className="text-2xl font-bold mb-4">Check Your Accessibility Status First</h2>
          <p className="text-blue-100 mb-6">
            Scan your website to see your WCAG compliance level - free and instant.
          </p>
          <Link
            href="/"
            className="inline-block bg-white text-blue-600 font-bold px-8 py-4 rounded-lg hover:bg-blue-50 transition"
          >
            Scan My Website →
          </Link>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">What is an Accessibility Statement?</h2>
          <p className="text-slate-300 mb-4">
            An accessibility statement is a public declaration of your organization's commitment
            to digital accessibility. It typically includes information about your accessibility
            standards, current compliance status, known limitations, and how users can request
            assistance or report issues.
          </p>
          <p className="text-slate-300">
            Having a well-crafted accessibility statement serves multiple purposes: it shows good
            faith effort toward compliance, provides transparency about known issues, and gives
            users with disabilities a clear path to get help when they encounter barriers.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Key Components of an Accessibility Statement</h2>
          <div className="space-y-4">
            <div className="bg-slate-700/50 rounded-lg p-4 border-l-4 border-green-500">
              <h3 className="font-semibold text-lg mb-1">1. Commitment Declaration</h3>
              <p className="text-slate-300 text-sm">State your organization's commitment to making your website accessible to people with disabilities</p>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-4 border-l-4 border-green-500">
              <h3 className="font-semibold text-lg mb-1">2. Conformance Status</h3>
              <p className="text-slate-300 text-sm">Specify which WCAG version and level you're targeting (e.g., WCAG 2.1 AA) and your current compliance status</p>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-4 border-l-4 border-blue-500">
              <h3 className="font-semibold text-lg mb-1">3. Technical Specifications</h3>
              <p className="text-slate-300 text-sm">List the technologies your website relies on (HTML, CSS, JavaScript) and tested assistive technologies</p>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-4 border-l-4 border-blue-500">
              <h3 className="font-semibold text-lg mb-1">4. Known Limitations</h3>
              <p className="text-slate-300 text-sm">Transparently document any known accessibility issues and your plans to address them</p>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-4 border-l-4 border-amber-500">
              <h3 className="font-semibold text-lg mb-1">5. Feedback Mechanism</h3>
              <p className="text-slate-300 text-sm">Provide contact information for users to report accessibility issues or request assistance</p>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-4 border-l-4 border-amber-500">
              <h3 className="font-semibold text-lg mb-1">6. Enforcement Procedure</h3>
              <p className="text-slate-300 text-sm">For EAA compliance, include information about relevant enforcement authorities</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Sample Accessibility Statement Template</h2>
          <div className="bg-slate-700/50 rounded-lg p-6 border border-slate-600">
            <div className="prose prose-invert max-w-none text-slate-300">
              <h3 className="text-white text-lg font-semibold mb-3">Accessibility Statement for [Your Company Name]</h3>

              <p className="mb-4 text-sm">
                <strong className="text-white">Commitment:</strong> [Your Company Name] is committed to ensuring digital
                accessibility for people with disabilities. We are continually improving the user experience for
                everyone and applying the relevant accessibility standards.
              </p>

              <p className="mb-4 text-sm">
                <strong className="text-white">Conformance Status:</strong> We aim to conform to the Web Content
                Accessibility Guidelines (WCAG) 2.1 at Level AA. These guidelines explain how to make web content
                more accessible to people with disabilities.
              </p>

              <p className="mb-4 text-sm">
                <strong className="text-white">Feedback:</strong> We welcome your feedback on the accessibility of
                [Your Website]. Please let us know if you encounter accessibility barriers:
              </p>

              <ul className="text-sm mb-4 list-disc list-inside">
                <li>Email: accessibility@[yourcompany].com</li>
                <li>Phone: [Your phone number]</li>
                <li>Address: [Your postal address]</li>
              </ul>

              <p className="mb-4 text-sm">
                <strong className="text-white">Assessment Date:</strong> This statement was last reviewed on [Date].
              </p>
            </div>
          </div>
          <p className="text-slate-400 text-sm mt-4">
            Note: Customize this template with your specific information. Run an accessibility scan first
            to accurately describe your conformance status.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Legal Requirements by Region</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-700/50 rounded-lg p-6">
              <h3 className="font-semibold text-lg text-blue-400 mb-2">European Union (EAA)</h3>
              <p className="text-slate-300 text-sm mb-3">
                The European Accessibility Act requires an accessibility statement that includes:
              </p>
              <ul className="text-slate-300 text-sm space-y-1">
                <li>• Conformance status</li>
                <li>• Known limitations with explanations</li>
                <li>• Feedback mechanism</li>
                <li>• Link to enforcement procedure</li>
                <li>• Statement preparation date</li>
              </ul>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-6">
              <h3 className="font-semibold text-lg text-red-400 mb-2">United States (ADA)</h3>
              <p className="text-slate-300 text-sm mb-3">
                While not legally mandated, an accessibility statement is strongly recommended:
              </p>
              <ul className="text-slate-300 text-sm space-y-1">
                <li>• Shows good faith effort</li>
                <li>• Demonstrates commitment</li>
                <li>• Provides liability protection</li>
                <li>• DOJ recommends as best practice</li>
                <li>• Often requested in lawsuits</li>
              </ul>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-6">
              <h3 className="font-semibold text-lg text-green-400 mb-2">United Kingdom</h3>
              <p className="text-slate-300 text-sm mb-3">
                Public sector and large organizations must publish statements including:
              </p>
              <ul className="text-slate-300 text-sm space-y-1">
                <li>• WCAG 2.1 AA conformance level</li>
                <li>• Non-accessible content details</li>
                <li>• Disproportionate burden claims</li>
                <li>• Preparation and review dates</li>
                <li>• Enforcement contact</li>
              </ul>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-6">
              <h3 className="font-semibold text-lg text-purple-400 mb-2">Canada (AODA)</h3>
              <p className="text-slate-300 text-sm mb-3">
                Ontario organizations must document their accessibility policies:
              </p>
              <ul className="text-slate-300 text-sm space-y-1">
                <li>• Multi-year accessibility plan</li>
                <li>• Feedback processes</li>
                <li>• Training documentation</li>
                <li>• Annual status reports</li>
                <li>• Available on request</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Best Practices for Your Statement</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="bg-green-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 text-sm font-bold">1</div>
              <div>
                <h3 className="font-semibold text-lg">Be Honest About Your Status</h3>
                <p className="text-slate-300 text-sm">Don't claim full compliance if you're not there yet. Transparency builds trust and shows good faith.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-green-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 text-sm font-bold">2</div>
              <div>
                <h3 className="font-semibold text-lg">Update Regularly</h3>
                <p className="text-slate-300 text-sm">Review and update your statement at least annually or whenever significant changes are made.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-green-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 text-sm font-bold">3</div>
              <div>
                <h3 className="font-semibold text-lg">Make It Easy to Find</h3>
                <p className="text-slate-300 text-sm">Link to your statement from the footer of every page. Users should be able to find it quickly.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-green-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 text-sm font-bold">4</div>
              <div>
                <h3 className="font-semibold text-lg">Monitor Your Feedback Channel</h3>
                <p className="text-slate-300 text-sm">Actively respond to accessibility feedback. Quick responses prevent complaints from escalating.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-green-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 text-sm font-bold">5</div>
              <div>
                <h3 className="font-semibold text-lg">Document Your Remediation Plans</h3>
                <p className="text-slate-300 text-sm">If you have known issues, include timelines for fixing them. This demonstrates commitment to improvement.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Common Mistakes to Avoid</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-red-900/30 border border-red-700/50 rounded-lg p-4">
              <h3 className="font-semibold text-red-400 mb-2">Claiming Full Compliance</h3>
              <p className="text-slate-300 text-sm">Unless you've had a professional audit, avoid claiming 100% compliance. It can backfire legally.</p>
            </div>
            <div className="bg-red-900/30 border border-red-700/50 rounded-lg p-4">
              <h3 className="font-semibold text-red-400 mb-2">Using Generic Templates</h3>
              <p className="text-slate-300 text-sm">Copy-pasted statements without customization don't reflect your actual efforts or status.</p>
            </div>
            <div className="bg-red-900/30 border border-red-700/50 rounded-lg p-4">
              <h3 className="font-semibold text-red-400 mb-2">Outdated Information</h3>
              <p className="text-slate-300 text-sm">A statement from years ago with no updates suggests accessibility isn't a priority.</p>
            </div>
            <div className="bg-red-900/30 border border-red-700/50 rounded-lg p-4">
              <h3 className="font-semibold text-red-400 mb-2">No Contact Information</h3>
              <p className="text-slate-300 text-sm">Users must be able to reach you with accessibility issues. A form or email is essential.</p>
            </div>
          </div>
        </section>

        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Know Your Accessibility Status First</h2>
          <p className="text-green-100 mb-6">
            Before writing your accessibility statement, understand where you stand.
            Our free scan identifies WCAG violations so you can accurately describe your compliance level.
          </p>
          <Link
            href="/"
            className="inline-block bg-white text-green-600 font-bold px-8 py-4 rounded-lg hover:bg-green-50 transition"
          >
            Scan My Website Free →
          </Link>
        </div>
      </div>
    </main>
  );
}
