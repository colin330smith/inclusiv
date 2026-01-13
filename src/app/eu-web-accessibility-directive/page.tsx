import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'EU Web Accessibility Directive vs European Accessibility Act | Complete Guide 2025',
  description: 'Understand the difference between EU Web Accessibility Directive and European Accessibility Act. Requirements, deadlines, and compliance guide for 2025.',
  keywords: ['EU Web Accessibility Directive', 'European Accessibility Act', 'WAD vs EAA', 'EU accessibility law', 'WCAG compliance EU'],
  openGraph: {
    title: 'EU Web Accessibility Directive vs European Accessibility Act',
    description: 'Complete guide to EU accessibility laws. WAD for public sector, EAA for private sector.',
  },
};

export default function EUWebAccessibilityDirectivePage() {
  const eaaDeadline = Math.ceil((new Date('2025-06-28').getTime() - Date.now()) / (1000 * 60 * 60 * 24));

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="bg-amber-600/20 border border-amber-500 rounded-lg p-4 mb-8">
          <p className="text-amber-300 font-semibold">
            EAA Enforcement Begins: June 28, 2025 - {eaaDeadline} days remaining
          </p>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          EU Web Accessibility Directive vs European Accessibility Act
        </h1>

        <p className="text-xl text-slate-300 mb-8">
          The European Union has two major accessibility laws that businesses need to understand:
          the Web Accessibility Directive (WAD) for public sector websites, and the European
          Accessibility Act (EAA) for private sector products and services. This guide explains
          both laws, their requirements, and how they affect your organization.
        </p>

        <div className="bg-blue-600 rounded-xl p-8 text-center mb-12">
          <h2 className="text-2xl font-bold mb-4">Check Your EU Compliance Status</h2>
          <p className="text-blue-100 mb-6">
            Both laws require WCAG 2.1 AA conformance. Scan your website to see where you stand.
          </p>
          <Link
            href="/"
            className="inline-block bg-white text-blue-600 font-bold px-8 py-4 rounded-lg hover:bg-blue-50 transition"
          >
            Scan My Website →
          </Link>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Quick Comparison: WAD vs EAA</h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-slate-700/50 rounded-lg overflow-hidden">
              <thead className="bg-slate-600">
                <tr>
                  <th className="px-4 py-3 text-left">Aspect</th>
                  <th className="px-4 py-3 text-left">Web Accessibility Directive</th>
                  <th className="px-4 py-3 text-left">European Accessibility Act</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-600">
                <tr>
                  <td className="px-4 py-3 font-semibold">Scope</td>
                  <td className="px-4 py-3 text-slate-300">Public sector only</td>
                  <td className="px-4 py-3 text-slate-300">Private sector (e-commerce, banking, etc.)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold">Effective Date</td>
                  <td className="px-4 py-3 text-slate-300">September 2020</td>
                  <td className="px-4 py-3 text-slate-300">June 28, 2025</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold">Standard</td>
                  <td className="px-4 py-3 text-slate-300">WCAG 2.1 AA (EN 301 549)</td>
                  <td className="px-4 py-3 text-slate-300">WCAG 2.1 AA (EN 301 549)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold">Enforcement</td>
                  <td className="px-4 py-3 text-slate-300">Member state authorities</td>
                  <td className="px-4 py-3 text-slate-300">Market surveillance authorities</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold">Penalties</td>
                  <td className="px-4 py-3 text-slate-300">Varies by country</td>
                  <td className="px-4 py-3 text-slate-300">Up to €100,000+ per violation</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold">Geographic Scope</td>
                  <td className="px-4 py-3 text-slate-300">EU public bodies</td>
                  <td className="px-4 py-3 text-slate-300">Any business serving EU customers</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-blue-400">The Web Accessibility Directive (WAD)</h2>

          <div className="space-y-6">
            <div className="bg-slate-700/50 rounded-lg p-6">
              <h3 className="font-semibold text-lg text-blue-400 mb-3">What is the WAD?</h3>
              <p className="text-slate-300 mb-4">
                Directive (EU) 2016/2102 on the accessibility of websites and mobile applications
                of public sector bodies was adopted in October 2016 and required transposition into
                national law by September 2018. It mandates that public sector websites and mobile
                apps be accessible to people with disabilities.
              </p>
              <p className="text-slate-300">
                The directive applies to websites of government bodies, public hospitals, public
                universities, libraries, courts, and other public institutions across all EU member
                states. It references the European standard EN 301 549, which aligns with WCAG 2.1 Level AA.
              </p>
            </div>

            <div className="bg-slate-700/50 rounded-lg p-6">
              <h3 className="font-semibold text-lg text-blue-400 mb-3">Who Must Comply with WAD?</h3>
              <ul className="text-slate-300 space-y-2">
                <li>• Central government websites and apps</li>
                <li>• Regional and local government bodies</li>
                <li>• Public law bodies (hospitals, universities)</li>
                <li>• Bodies governed by public law</li>
                <li>• Associations formed by public authorities</li>
              </ul>
            </div>

            <div className="bg-slate-700/50 rounded-lg p-6">
              <h3 className="font-semibold text-lg text-blue-400 mb-3">WAD Requirements</h3>
              <ul className="text-slate-300 space-y-2">
                <li>• Conform to WCAG 2.1 Level AA (via EN 301 549)</li>
                <li>• Publish an accessibility statement</li>
                <li>• Provide a feedback mechanism for users</li>
                <li>• Conduct regular accessibility monitoring</li>
                <li>• Report compliance status to EU Commission</li>
              </ul>
            </div>

            <div className="bg-slate-700/50 rounded-lg p-6">
              <h3 className="font-semibold text-lg text-blue-400 mb-3">WAD Exemptions</h3>
              <p className="text-slate-300 mb-3">Certain content is exempt from WAD requirements:</p>
              <ul className="text-slate-300 space-y-2">
                <li>• Office file formats published before September 23, 2018</li>
                <li>• Pre-recorded audio and video published before September 23, 2020</li>
                <li>• Live audio and video</li>
                <li>• Online maps (but accessible alternatives for essential info required)</li>
                <li>• Third-party content not under authority's control</li>
                <li>• Archived content not needed for ongoing administrative processes</li>
                <li>• Intranets/extranets published before September 23, 2019 (until redesigned)</li>
                <li>• Content of schools/kindergartens (except essential functions)</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-amber-400">The European Accessibility Act (EAA)</h2>

          <div className="space-y-6">
            <div className="bg-slate-700/50 rounded-lg p-6">
              <h3 className="font-semibold text-lg text-amber-400 mb-3">What is the EAA?</h3>
              <p className="text-slate-300 mb-4">
                Directive (EU) 2019/882 on the accessibility requirements for products and services
                was adopted in April 2019. Unlike the WAD which targets public sector, the EAA
                focuses on private sector products and services that are essential to daily life.
              </p>
              <p className="text-slate-300">
                The EAA is a harmonization directive designed to create consistent accessibility
                requirements across EU member states, removing barriers to cross-border trade while
                improving accessibility for the 87 million people with disabilities in the EU.
              </p>
            </div>

            <div className="bg-slate-700/50 rounded-lg p-6">
              <h3 className="font-semibold text-lg text-amber-400 mb-3">Products Covered by EAA</h3>
              <ul className="text-slate-300 space-y-2">
                <li>• Computers and operating systems</li>
                <li>• Self-service terminals (ATMs, ticketing machines, check-in kiosks)</li>
                <li>• Smartphones and tablets</li>
                <li>• TV equipment with computing capability</li>
                <li>• E-readers</li>
                <li>• Consumer terminal equipment for communication services</li>
              </ul>
            </div>

            <div className="bg-slate-700/50 rounded-lg p-6">
              <h3 className="font-semibold text-lg text-amber-400 mb-3">Services Covered by EAA</h3>
              <ul className="text-slate-300 space-y-2">
                <li>• <strong>E-commerce websites and apps</strong> (online stores)</li>
                <li>• Electronic communications services</li>
                <li>• Banking services for consumers</li>
                <li>• E-books and dedicated software</li>
                <li>• Audio-visual media services (streaming platforms)</li>
                <li>• Air, bus, rail, and waterborne passenger transport services</li>
              </ul>
            </div>

            <div className="bg-red-900/30 border border-red-700 rounded-lg p-6">
              <h3 className="font-semibold text-lg text-red-400 mb-3">EAA E-commerce Requirements</h3>
              <p className="text-slate-300 mb-3">
                For e-commerce businesses, the EAA specifically requires:
              </p>
              <ul className="text-slate-300 space-y-2">
                <li>• Accessible product identification and selection</li>
                <li>• Accessible payment and checkout processes</li>
                <li>• Accessible customer support and feedback mechanisms</li>
                <li>• WCAG 2.1 AA conformance for all web content</li>
                <li>• Accessible mobile apps if offered</li>
                <li>• Accessible PDF documents (invoices, receipts)</li>
              </ul>
            </div>

            <div className="bg-slate-700/50 rounded-lg p-6">
              <h3 className="font-semibold text-lg text-amber-400 mb-3">EAA Exemptions</h3>
              <p className="text-slate-300 mb-3">The EAA provides exemptions for:</p>
              <ul className="text-slate-300 space-y-2">
                <li>• <strong>Microenterprises</strong> (fewer than 10 employees AND annual turnover/balance sheet under €2 million)</li>
                <li>• <strong>Disproportionate burden</strong> - when compliance would fundamentally alter the service or impose excessive costs</li>
                <li>• Products/services placed on market before June 28, 2025 (grandfather clause - continues until June 28, 2030)</li>
              </ul>
              <p className="text-slate-400 text-sm mt-4">
                Note: Claiming disproportionate burden requires documented assessment and must be reassessed when service changes or every 5 years.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">EAA Penalties and Enforcement</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-700/50 rounded-lg p-6">
              <h3 className="font-semibold text-lg text-red-400 mb-3">Potential Penalties</h3>
              <ul className="text-slate-300 space-y-2">
                <li>• Fines up to <strong>€100,000</strong> per violation (varies by country)</li>
                <li>• Orders to remove non-compliant products from market</li>
                <li>• Prohibition of placing products/services on market</li>
                <li>• Public notification of non-compliance</li>
                <li>• Potential private legal action from consumers</li>
              </ul>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-6">
              <h3 className="font-semibold text-lg text-blue-400 mb-3">Enforcement Mechanism</h3>
              <ul className="text-slate-300 space-y-2">
                <li>• Each member state designates market surveillance authorities</li>
                <li>• Authorities can request compliance documentation</li>
                <li>• Consumers can file complaints directly</li>
                <li>• Disability organizations can represent consumers</li>
                <li>• Cross-border enforcement cooperation between states</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Key Dates and Timeline</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="bg-green-600 rounded-lg px-3 py-1 text-sm font-bold flex-shrink-0">2016</div>
              <div>
                <h3 className="font-semibold">WAD Adopted</h3>
                <p className="text-slate-300 text-sm">Web Accessibility Directive becomes EU law</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-green-600 rounded-lg px-3 py-1 text-sm font-bold flex-shrink-0">2019</div>
              <div>
                <h3 className="font-semibold">EAA Adopted</h3>
                <p className="text-slate-300 text-sm">European Accessibility Act published in EU Official Journal</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-green-600 rounded-lg px-3 py-1 text-sm font-bold flex-shrink-0">2020</div>
              <div>
                <h3 className="font-semibold">WAD Fully Enforced</h3>
                <p className="text-slate-300 text-sm">All public sector websites and mobile apps must comply</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-blue-600 rounded-lg px-3 py-1 text-sm font-bold flex-shrink-0">2022</div>
              <div>
                <h3 className="font-semibold">EAA Transposition Deadline</h3>
                <p className="text-slate-300 text-sm">Member states must incorporate EAA into national law by June 28, 2022</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-red-600 rounded-lg px-3 py-1 text-sm font-bold flex-shrink-0">2025</div>
              <div>
                <h3 className="font-semibold">EAA Enforcement Begins</h3>
                <p className="text-slate-300 text-sm">June 28, 2025: All covered products and services must comply</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-slate-600 rounded-lg px-3 py-1 text-sm font-bold flex-shrink-0">2030</div>
              <div>
                <h3 className="font-semibold">Grandfather Clause Expires</h3>
                <p className="text-slate-300 text-sm">Products/services placed on market before 2025 must comply by June 28, 2030</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">How to Prepare for EAA Compliance</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="bg-amber-600 rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 font-bold">1</div>
              <div>
                <h3 className="font-semibold text-lg">Audit Your Current Status</h3>
                <p className="text-slate-300 text-sm">Run an accessibility scan to identify WCAG 2.1 AA violations across your website and apps.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-amber-600 rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 font-bold">2</div>
              <div>
                <h3 className="font-semibold text-lg">Prioritize Critical Issues</h3>
                <p className="text-slate-300 text-sm">Focus on checkout, payment, and essential functions that directly impact customer ability to complete purchases.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-amber-600 rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 font-bold">3</div>
              <div>
                <h3 className="font-semibold text-lg">Create Remediation Roadmap</h3>
                <p className="text-slate-300 text-sm">Plan fixes with clear timelines. Address Level A issues first, then AA requirements.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-amber-600 rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 font-bold">4</div>
              <div>
                <h3 className="font-semibold text-lg">Document Everything</h3>
                <p className="text-slate-300 text-sm">Keep records of accessibility efforts, audits, and fixes. You may need to demonstrate compliance to authorities.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-amber-600 rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 font-bold">5</div>
              <div>
                <h3 className="font-semibold text-lg">Publish Accessibility Statement</h3>
                <p className="text-slate-300 text-sm">Create a public statement describing your conformance level, known limitations, and contact for accessibility feedback.</p>
              </div>
            </div>
          </div>
        </section>

        <div className="bg-gradient-to-r from-amber-600 to-blue-600 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Start Your EU Accessibility Compliance Today</h2>
          <p className="text-amber-100 mb-6">
            Both WAD and EAA require WCAG 2.1 AA conformance. Our free scanner identifies
            violations and provides prioritized fix recommendations.
          </p>
          <Link
            href="/"
            className="inline-block bg-white text-amber-600 font-bold px-8 py-4 rounded-lg hover:bg-amber-50 transition"
          >
            Check My Compliance →
          </Link>
        </div>
      </div>
    </main>
  );
}
