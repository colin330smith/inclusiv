import { Metadata } from 'next';
import Link from 'next/link';
import { Shield, AlertTriangle, CheckCircle, FileText, Scale, Clock, Zap, ArrowRight, Globe, Users, Euro, Building } from 'lucide-react';
import { EAACountdown } from '@/components/EAACountdown';
import { SiteFooter } from '@/components/seo/SiteFooter';

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
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-indigo-500" />
            <span className="text-xl font-bold text-white">Inclusiv</span>
          </Link>
          <Link
            href="/#scanner"
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-colors text-sm"
          >
            Free Compliance Scan
          </Link>
        </div>
      </header>

      {/* Countdown Banner */}
      <EAACountdown variant="banner" showCTA={true} />

      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-full text-red-400 text-sm mb-6">
            <AlertTriangle className="w-4 h-4" />
            EAA Enforcement Active Since June 2025
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            European Accessibility Act (EAA) <span className="text-indigo-400">Compliance Checker</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Check if your website meets the legal requirements of the European Accessibility Act.
            Free scan, instant results, actionable fixes.
          </p>
        </div>

        {/* Urgency Card */}
        <div className="mb-12">
          <EAACountdown variant="card" showCTA={true} />
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

        <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Check Your Site Now - Free</h2>
          <p className="text-indigo-100 mb-6">
            Get an instant compliance score and see exactly what needs to be fixed.
          </p>
          <Link
            href="/#scanner"
            className="inline-block bg-white text-indigo-600 font-bold px-8 py-4 rounded-lg hover:bg-indigo-50 transition"
          >
            Free EAA Compliance Scan →
          </Link>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
