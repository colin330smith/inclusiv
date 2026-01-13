import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'EAA Compliance Checker | European Accessibility Act 2025',
  description: 'Check your website for European Accessibility Act (EAA) compliance. Free scanner for WCAG 2.1 AA requirements. Deadline: June 28, 2025. Fines up to €100,000.',
  keywords: ['EAA compliance', 'European Accessibility Act', 'EAA 2025', 'accessibility law Europe', 'WCAG compliance checker'],
  openGraph: {
    title: 'EAA Compliance Checker - Are You Ready for June 2025?',
    description: 'The European Accessibility Act goes into effect June 28, 2025. Check if your e-commerce site is compliant.',
  },
};

export default function EAACompliancePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          European Accessibility Act (EAA) Compliance Checker
        </h1>

        <div className="bg-red-500/20 border border-red-500 rounded-lg p-6 mb-8">
          <p className="text-xl font-semibold text-red-300">
            ⚠️ Deadline: June 28, 2025
          </p>
          <p className="text-red-200 mt-2">
            Non-compliant websites face fines up to €100,000 per violation.
          </p>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">What is the EAA?</h2>
          <p className="text-slate-300 mb-4">
            The European Accessibility Act (Directive 2019/882) requires all e-commerce websites
            selling to EU customers to meet WCAG 2.1 Level AA accessibility standards by June 28, 2025.
          </p>
          <p className="text-slate-300">
            This affects online shops, banking services, e-books, transport services, and more across
            all 27 EU member states.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Who Must Comply?</h2>
          <ul className="list-disc list-inside text-slate-300 space-y-2">
            <li>E-commerce websites selling products or services in the EU</li>
            <li>Online banking and financial services</li>
            <li>Transport and ticketing platforms</li>
            <li>E-book and digital content providers</li>
            <li>Any digital service with EU customers</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Requirements Summary</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-slate-700/50 rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">Perceivable</h3>
              <p className="text-slate-300 text-sm">Alt text for images, captions for videos, sufficient color contrast</p>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">Operable</h3>
              <p className="text-slate-300 text-sm">Keyboard navigation, no seizure-inducing content, clear navigation</p>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">Understandable</h3>
              <p className="text-slate-300 text-sm">Readable text, predictable behavior, input assistance</p>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">Robust</h3>
              <p className="text-slate-300 text-sm">Compatible with assistive technologies, valid HTML</p>
            </div>
          </div>
        </section>

        <div className="bg-blue-600 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Check Your Site Now - Free</h2>
          <p className="text-blue-100 mb-6">
            Get an instant compliance score and see exactly what needs to be fixed.
          </p>
          <Link
            href="/"
            className="inline-block bg-white text-blue-600 font-bold px-8 py-4 rounded-lg hover:bg-blue-50 transition"
          >
            Free EAA Compliance Scan →
          </Link>
        </div>
      </div>
    </main>
  );
}
