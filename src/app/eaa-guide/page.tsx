"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Shield, Clock, CheckCircle, AlertTriangle, ArrowRight, Download, BookOpen, Calendar, FileCheck, Zap, Globe, Lock, Users, Scale } from 'lucide-react';

// Calculate days until EAA deadline
const getDeadlineInfo = () => {
  const deadline = new Date("2025-06-28");
  const today = new Date();
  const diffTime = deadline.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return { days: diffDays, deadline };
};

export default function EAAGuidePage() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const deadlineInfo = getDeadlineInfo();

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          source: 'eaa-guide-pdf',
          leadMagnet: 'EAA Compliance Guide PDF'
        }),
      });
      setSubmitted(true);
      // Track in analytics
      if (typeof window !== 'undefined' && 'trackSignup' in window) {
        (window as unknown as { trackSignup: (email: string) => void }).trackSignup(email);
      }
    } catch {
      setSubmitted(true); // Still show success
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleCheck = (id: string) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const totalChecks = 38; // Total number of checklist items

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
            <div className="flex items-center gap-2 px-3 py-1 bg-red-500/10 rounded-full text-sm text-red-400">
              <Clock className="w-4 h-4" />
              <span className="font-semibold">{deadlineInfo.days} days until EAA deadline</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 text-indigo-400 text-sm mb-6">
            <BookOpen className="w-4 h-4" />
            Comprehensive 2025 Guide
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            The Ultimate <span className="bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text">EAA Compliance Guide</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto mb-4">
            Everything you need to know about the European Accessibility Act requirements,
            timeline, and how to achieve compliance before the June 28, 2025 deadline.
          </p>
          <p className="text-zinc-500">
            Avoid fines up to 100,000 euros. Make your website accessible to 135 million EU citizens with disabilities.
          </p>
        </div>

        {/* Urgency Banner */}
        <div className="bg-gradient-to-r from-red-600/20 to-orange-600/20 border border-red-500/50 rounded-2xl p-6 mb-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-red-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">EAA 2025 Deadline Approaching</h2>
                <p className="text-red-300">Only <span className="font-bold">{deadlineInfo.days} days</span> remaining until mandatory compliance</p>
              </div>
            </div>
            <Link
              href="/"
              className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-xl transition-colors whitespace-nowrap"
            >
              Check Your Compliance Now
            </Link>
          </div>
        </div>

        {/* Table of Contents */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <FileCheck className="w-6 h-6 text-indigo-500" />
            What's in This Guide
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <a href="#what-is-eaa" className="flex items-center gap-3 p-4 bg-zinc-800/50 rounded-xl hover:bg-zinc-800 transition-colors">
              <span className="text-indigo-400">01</span>
              <span className="text-white">What is the European Accessibility Act?</span>
            </a>
            <a href="#who-must-comply" className="flex items-center gap-3 p-4 bg-zinc-800/50 rounded-xl hover:bg-zinc-800 transition-colors">
              <span className="text-indigo-400">02</span>
              <span className="text-white">Who Must Comply with the EAA?</span>
            </a>
            <a href="#requirements" className="flex items-center gap-3 p-4 bg-zinc-800/50 rounded-xl hover:bg-zinc-800 transition-colors">
              <span className="text-indigo-400">03</span>
              <span className="text-white">Complete Requirements Checklist</span>
            </a>
            <a href="#timeline" className="flex items-center gap-3 p-4 bg-zinc-800/50 rounded-xl hover:bg-zinc-800 transition-colors">
              <span className="text-indigo-400">04</span>
              <span className="text-white">Compliance Timeline</span>
            </a>
            <a href="#penalties" className="flex items-center gap-3 p-4 bg-zinc-800/50 rounded-xl hover:bg-zinc-800 transition-colors">
              <span className="text-indigo-400">05</span>
              <span className="text-white">Penalties and Enforcement</span>
            </a>
            <a href="#getting-compliant" className="flex items-center gap-3 p-4 bg-zinc-800/50 rounded-xl hover:bg-zinc-800 transition-colors">
              <span className="text-indigo-400">06</span>
              <span className="text-white">How to Achieve Compliance</span>
            </a>
          </div>
        </div>

        {/* Section 1: What is the EAA */}
        <section id="what-is-eaa" className="mb-16 scroll-mt-8">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-lg">1</span>
            What is the European Accessibility Act?
          </h2>
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
            <p className="text-zinc-300 text-lg mb-6">
              The <strong className="text-white">European Accessibility Act (EAA)</strong>, officially known as
              <strong className="text-white"> Directive (EU) 2019/882</strong>, is a landmark piece of EU legislation
              designed to improve the accessibility of products and services across the European Union.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-zinc-800/50 rounded-xl p-6">
                <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-indigo-500" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">EU-Wide Standard</h3>
                <p className="text-zinc-400 text-sm">Harmonizes accessibility requirements across all 27 EU member states</p>
              </div>
              <div className="bg-zinc-800/50 rounded-xl p-6">
                <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-indigo-500" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">135 Million People</h3>
                <p className="text-zinc-400 text-sm">Protects the rights of people with disabilities in the EU</p>
              </div>
              <div className="bg-zinc-800/50 rounded-xl p-6">
                <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-4">
                  <Scale className="w-6 h-6 text-indigo-500" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Legal Requirement</h3>
                <p className="text-zinc-400 text-sm">Enforceable by law with significant penalties for non-compliance</p>
              </div>
            </div>
            <div className="bg-indigo-600/10 border border-indigo-500/30 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-indigo-300 mb-3">Key Fact: WCAG 2.1 AA is the Standard</h4>
              <p className="text-zinc-300">
                The EAA adopts the <strong className="text-white">Web Content Accessibility Guidelines (WCAG) 2.1 Level AA</strong> as
                the technical standard for digital accessibility. This means websites must meet 50 specific success criteria
                across four principles: Perceivable, Operable, Understandable, and Robust (POUR).
              </p>
            </div>
          </div>
        </section>

        {/* CTA 1: Free Scan */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 mb-16 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Find Out Your Current Compliance Status</h3>
          <p className="text-indigo-100 mb-6 max-w-2xl mx-auto">
            Get an instant accessibility score and see exactly which EAA requirements your website
            is meeting — and which need attention.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-600 font-bold rounded-xl hover:bg-indigo-50 transition-colors"
          >
            Free EAA Compliance Scan
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Section 2: Who Must Comply */}
        <section id="who-must-comply" className="mb-16 scroll-mt-8">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-lg">2</span>
            Who Must Comply with the EAA?
          </h2>
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
            <p className="text-zinc-300 text-lg mb-8">
              The EAA applies to a wide range of products and services. If your business offers any of the following
              to EU customers, you must comply by June 28, 2025.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-zinc-800/50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-green-400 mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Services Covered by EAA
                </h3>
                <ul className="space-y-3 text-zinc-300">
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 mt-1">&#10003;</span>
                    <span><strong className="text-white">E-commerce websites</strong> — any online shop selling products or services</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 mt-1">&#10003;</span>
                    <span><strong className="text-white">Banking services</strong> — consumer banking, payment services, ATMs</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 mt-1">&#10003;</span>
                    <span><strong className="text-white">Telecommunications</strong> — phone, internet, messaging services</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 mt-1">&#10003;</span>
                    <span><strong className="text-white">Transport services</strong> — ticketing, booking, travel information</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 mt-1">&#10003;</span>
                    <span><strong className="text-white">E-books and readers</strong> — digital publications and devices</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 mt-1">&#10003;</span>
                    <span><strong className="text-white">Audio-visual media</strong> — streaming services, video platforms</span>
                  </li>
                </ul>
              </div>
              <div className="bg-zinc-800/50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-amber-400 mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Important Considerations
                </h3>
                <ul className="space-y-3 text-zinc-300">
                  <li className="flex items-start gap-3">
                    <span className="text-amber-400 mt-1">!</span>
                    <span><strong className="text-white">Not just EU companies</strong> — applies to ANY business selling to EU customers</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-amber-400 mt-1">!</span>
                    <span><strong className="text-white">B2B and B2C</strong> — both business and consumer services are covered</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-amber-400 mt-1">!</span>
                    <span><strong className="text-white">Mobile apps included</strong> — not just websites, all digital touchpoints</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-amber-400 mt-1">!</span>
                    <span><strong className="text-white">No minimum revenue</strong> — applies regardless of company size*</span>
                  </li>
                </ul>
                <div className="mt-4 p-4 bg-zinc-700/50 rounded-lg">
                  <p className="text-sm text-zinc-400">
                    *Microenterprises (fewer than 10 employees AND annual turnover under 2M euros)
                    may have limited exemptions for services only.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Complete Requirements Checklist */}
        <section id="requirements" className="mb-16 scroll-mt-8">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-lg">3</span>
            Complete EAA Requirements Checklist
          </h2>

          {/* Progress Bar */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-white font-semibold">Your Progress</span>
              <span className="text-indigo-400 font-semibold">{checkedCount} / {totalChecks} items checked</span>
            </div>
            <div className="h-3 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-300"
                style={{ width: `${(checkedCount / totalChecks) * 100}%` }}
              />
            </div>
          </div>

          <div className="space-y-6">
            {/* Perceivable */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-green-400 mb-2 flex items-center gap-3">
                <span className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">P</span>
                Perceivable
              </h3>
              <p className="text-zinc-400 mb-6">Information and user interface components must be presentable to users in ways they can perceive.</p>
              <div className="space-y-3">
                {[
                  { id: 'p1', text: 'All images have descriptive alt text that conveys meaning' },
                  { id: 'p2', text: 'Decorative images have empty alt attributes (alt="")' },
                  { id: 'p3', text: 'Videos have synchronized captions' },
                  { id: 'p4', text: 'Videos have audio descriptions for visual content' },
                  { id: 'p5', text: 'Audio content has text transcripts' },
                  { id: 'p6', text: 'Color contrast ratio is at least 4.5:1 for normal text' },
                  { id: 'p7', text: 'Color contrast ratio is at least 3:1 for large text (18px+ or 14px bold)' },
                  { id: 'p8', text: 'Color is not the only means of conveying information' },
                  { id: 'p9', text: 'Text can be resized up to 200% without loss of content' },
                  { id: 'p10', text: 'Content is responsive and works at different viewport sizes' },
                ].map(item => (
                  <label key={item.id} className="flex items-start gap-3 cursor-pointer group">
                    <div
                      onClick={() => toggleCheck(item.id)}
                      className={`w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                        checkedItems[item.id]
                          ? 'bg-green-500 border-green-500'
                          : 'border-zinc-600 group-hover:border-green-400'
                      }`}
                    >
                      {checkedItems[item.id] && <CheckCircle className="w-4 h-4 text-white" />}
                    </div>
                    <span className={`text-zinc-300 ${checkedItems[item.id] ? 'line-through text-zinc-500' : ''}`}>{item.text}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Operable */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-blue-400 mb-2 flex items-center gap-3">
                <span className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">O</span>
                Operable
              </h3>
              <p className="text-zinc-400 mb-6">User interface components and navigation must be operable by all users.</p>
              <div className="space-y-3">
                {[
                  { id: 'o1', text: 'All functionality is accessible via keyboard alone' },
                  { id: 'o2', text: 'No keyboard traps — users can navigate away from all elements' },
                  { id: 'o3', text: 'Focus order follows a logical, meaningful sequence' },
                  { id: 'o4', text: 'Focus indicators are clearly visible (2px+ outline)' },
                  { id: 'o5', text: 'Skip navigation link allows bypassing repetitive content' },
                  { id: 'o6', text: 'Page titles are descriptive and unique' },
                  { id: 'o7', text: 'Link purpose is clear from the link text alone' },
                  { id: 'o8', text: 'Touch targets are at least 44x44 CSS pixels' },
                  { id: 'o9', text: 'No content flashes more than 3 times per second' },
                  { id: 'o10', text: 'Users can pause, stop, or hide moving/auto-updating content' },
                  { id: 'o11', text: 'Session time limits have warnings and extension options' },
                ].map(item => (
                  <label key={item.id} className="flex items-start gap-3 cursor-pointer group">
                    <div
                      onClick={() => toggleCheck(item.id)}
                      className={`w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                        checkedItems[item.id]
                          ? 'bg-blue-500 border-blue-500'
                          : 'border-zinc-600 group-hover:border-blue-400'
                      }`}
                    >
                      {checkedItems[item.id] && <CheckCircle className="w-4 h-4 text-white" />}
                    </div>
                    <span className={`text-zinc-300 ${checkedItems[item.id] ? 'line-through text-zinc-500' : ''}`}>{item.text}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Understandable */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-amber-400 mb-2 flex items-center gap-3">
                <span className="w-8 h-8 bg-amber-500/20 rounded-lg flex items-center justify-center">U</span>
                Understandable
              </h3>
              <p className="text-zinc-400 mb-6">Information and operation of the user interface must be understandable.</p>
              <div className="space-y-3">
                {[
                  { id: 'u1', text: 'Page language is declared in the HTML lang attribute' },
                  { id: 'u2', text: 'Language changes within the page are marked up' },
                  { id: 'u3', text: 'Navigation is consistent across all pages' },
                  { id: 'u4', text: 'Similar components are identified consistently' },
                  { id: 'u5', text: 'Form fields have visible, descriptive labels' },
                  { id: 'u6', text: 'Required fields are clearly indicated' },
                  { id: 'u7', text: 'Error messages identify the specific field and error' },
                  { id: 'u8', text: 'Error suggestions provide actionable guidance' },
                  { id: 'u9', text: 'Important submissions have confirmation or review steps' },
                  { id: 'u10', text: 'Instructions do not rely solely on sensory characteristics' },
                ].map(item => (
                  <label key={item.id} className="flex items-start gap-3 cursor-pointer group">
                    <div
                      onClick={() => toggleCheck(item.id)}
                      className={`w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                        checkedItems[item.id]
                          ? 'bg-amber-500 border-amber-500'
                          : 'border-zinc-600 group-hover:border-amber-400'
                      }`}
                    >
                      {checkedItems[item.id] && <CheckCircle className="w-4 h-4 text-white" />}
                    </div>
                    <span className={`text-zinc-300 ${checkedItems[item.id] ? 'line-through text-zinc-500' : ''}`}>{item.text}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Robust */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-purple-400 mb-2 flex items-center gap-3">
                <span className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">R</span>
                Robust
              </h3>
              <p className="text-zinc-400 mb-6">Content must be robust enough to work with current and future assistive technologies.</p>
              <div className="space-y-3">
                {[
                  { id: 'r1', text: 'HTML is valid with no duplicate IDs' },
                  { id: 'r2', text: 'All elements have proper opening and closing tags' },
                  { id: 'r3', text: 'ARIA roles and attributes are used correctly' },
                  { id: 'r4', text: 'Custom controls have appropriate ARIA labels' },
                  { id: 'r5', text: 'Status messages are announced to screen readers' },
                  { id: 'r6', text: 'Site works with major screen readers (NVDA, JAWS, VoiceOver)' },
                  { id: 'r7', text: 'Site is compatible with major browsers (Chrome, Firefox, Safari, Edge)' },
                ].map(item => (
                  <label key={item.id} className="flex items-start gap-3 cursor-pointer group">
                    <div
                      onClick={() => toggleCheck(item.id)}
                      className={`w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                        checkedItems[item.id]
                          ? 'bg-purple-500 border-purple-500'
                          : 'border-zinc-600 group-hover:border-purple-400'
                      }`}
                    >
                      {checkedItems[item.id] && <CheckCircle className="w-4 h-4 text-white" />}
                    </div>
                    <span className={`text-zinc-300 ${checkedItems[item.id] ? 'line-through text-zinc-500' : ''}`}>{item.text}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA 2: Download PDF */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 mb-16">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-24 h-24 bg-indigo-500/10 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Download className="w-12 h-12 text-indigo-500" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold text-white mb-2">Download the Complete EAA Compliance PDF</h3>
              <p className="text-zinc-400 mb-4">
                Get our 45-page comprehensive guide including all requirements,
                implementation examples, country-specific penalties, and step-by-step remediation guides.
              </p>
              {!submitted ? (
                <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your work email"
                    required
                    className="flex-1 px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 text-white font-semibold rounded-xl transition-colors whitespace-nowrap flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Download className="w-5 h-5" />
                        Get Free PDF
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="flex items-center gap-3 text-green-400">
                  <CheckCircle className="w-6 h-6" />
                  <span>Check your inbox! PDF guide sent to {email}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Section 4: Timeline */}
        <section id="timeline" className="mb-16 scroll-mt-8">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-lg">4</span>
            EAA Compliance Timeline
          </h2>
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-zinc-700" />

              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-zinc-700 rounded-full flex items-center justify-center flex-shrink-0 z-10">
                    <Calendar className="w-6 h-6 text-zinc-400" />
                  </div>
                  <div className="pt-2">
                    <p className="text-zinc-500 text-sm">April 2019</p>
                    <h4 className="text-lg font-semibold text-white">EAA Adopted by EU</h4>
                    <p className="text-zinc-400 mt-1">Directive 2019/882 officially adopted by the European Parliament</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-zinc-700 rounded-full flex items-center justify-center flex-shrink-0 z-10">
                    <Calendar className="w-6 h-6 text-zinc-400" />
                  </div>
                  <div className="pt-2">
                    <p className="text-zinc-500 text-sm">June 2022</p>
                    <h4 className="text-lg font-semibold text-white">National Transposition Deadline</h4>
                    <p className="text-zinc-400 mt-1">EU member states required to transpose the directive into national law</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center flex-shrink-0 z-10">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div className="pt-2">
                    <p className="text-amber-400 text-sm font-semibold">NOW — Take Action</p>
                    <h4 className="text-lg font-semibold text-white">Final Preparation Period</h4>
                    <p className="text-zinc-400 mt-1">
                      <span className="text-amber-400 font-semibold">{deadlineInfo.days} days</span> remaining to achieve compliance.
                      Start auditing and fixing issues immediately.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0 z-10">
                    <AlertTriangle className="w-6 h-6 text-white" />
                  </div>
                  <div className="pt-2">
                    <p className="text-red-400 text-sm font-semibold">June 28, 2025</p>
                    <h4 className="text-lg font-semibold text-white">MANDATORY COMPLIANCE DEADLINE</h4>
                    <p className="text-zinc-400 mt-1">
                      All covered products and services must be accessible. Enforcement begins.
                      Non-compliant businesses face fines and legal action.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-zinc-700 rounded-full flex items-center justify-center flex-shrink-0 z-10">
                    <Calendar className="w-6 h-6 text-zinc-400" />
                  </div>
                  <div className="pt-2">
                    <p className="text-zinc-500 text-sm">June 2030</p>
                    <h4 className="text-lg font-semibold text-white">Extended Transition Ends</h4>
                    <p className="text-zinc-400 mt-1">Self-service terminals (ATMs, kiosks) must be fully compliant</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA 3: Scan Now */}
        <div className="bg-gradient-to-r from-red-600/20 to-orange-600/20 border border-red-500/30 rounded-2xl p-8 mb-16 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Do Not Wait Until the Deadline</h3>
          <p className="text-zinc-300 mb-6 max-w-2xl mx-auto">
            Accessibility remediation takes time. Most e-commerce sites have 50-200 issues that need fixing.
            Start now to avoid rushing — or missing the deadline entirely.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl transition-colors"
          >
            <Zap className="w-5 h-5" />
            Start My Free Compliance Scan
          </Link>
        </div>

        {/* Section 5: Penalties */}
        <section id="penalties" className="mb-16 scroll-mt-8">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-lg">5</span>
            Penalties and Enforcement
          </h2>
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
            <p className="text-zinc-300 text-lg mb-8">
              The EAA requires each EU member state to define their own penalties, but they must be
              "effective, proportionate, and dissuasive." Here's what businesses face for non-compliance:
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-red-900/20 border border-red-700/50 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-red-400 mb-4">Financial Penalties</h4>
                <ul className="space-y-3 text-zinc-300">
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">&#8226;</span>
                    <span>Fines up to <strong className="text-white">100,000 euros</strong> per violation (Germany)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">&#8226;</span>
                    <span>Up to <strong className="text-white">5% of annual turnover</strong> in some jurisdictions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">&#8226;</span>
                    <span>Per-violation penalties that can <strong className="text-white">accumulate quickly</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">&#8226;</span>
                    <span><strong className="text-white">Criminal liability</strong> for willful non-compliance</span>
                  </li>
                </ul>
              </div>

              <div className="bg-orange-900/20 border border-orange-700/50 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-orange-400 mb-4">Other Consequences</h4>
                <ul className="space-y-3 text-zinc-300">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-400">&#8226;</span>
                    <span><strong className="text-white">Market withdrawal</strong> — forced removal from EU market</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-400">&#8226;</span>
                    <span><strong className="text-white">Legal action</strong> by disability advocacy groups</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-400">&#8226;</span>
                    <span><strong className="text-white">Reputational damage</strong> from public enforcement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-400">&#8226;</span>
                    <span><strong className="text-white">Lost revenue</strong> from 135M potential customers</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-indigo-600/10 border border-indigo-500/30 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-indigo-300 mb-3">Market Surveillance Authorities</h4>
              <p className="text-zinc-300">
                Each EU country has designated authorities to monitor compliance. They can conduct audits,
                request documentation, and issue penalties. In many countries, <strong className="text-white">consumers can file complaints
                directly</strong>, triggering investigations.
              </p>
            </div>
          </div>
        </section>

        {/* Section 6: Getting Compliant */}
        <section id="getting-compliant" className="mb-16 scroll-mt-8">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-lg">6</span>
            How to Achieve EAA Compliance
          </h2>
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-bold text-white">1</span>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-white mb-2">Audit Your Current State</h4>
                  <p className="text-zinc-400 mb-4">
                    Run a comprehensive accessibility scan to identify all WCAG violations.
                    Automated tools catch about 30-40% of issues, so also conduct manual testing.
                  </p>
                  <Link href="/" className="text-indigo-400 hover:text-indigo-300 flex items-center gap-2">
                    Run a free accessibility scan
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-bold text-white">2</span>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-white mb-2">Prioritize Critical Issues</h4>
                  <p className="text-zinc-400">
                    Focus first on issues that completely block access for users with disabilities:
                    missing alt text, keyboard traps, form labels, and color contrast.
                    These represent the highest legal and usability risk.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-bold text-white">3</span>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-white mb-2">Implement Fixes Systematically</h4>
                  <p className="text-zinc-400">
                    Work through issues by component type — fix all images, then all forms, then navigation.
                    This is more efficient than page-by-page remediation. Use a tracking system to
                    monitor progress.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-bold text-white">4</span>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-white mb-2">Test with Real Users</h4>
                  <p className="text-zinc-400">
                    Conduct testing with users who rely on assistive technologies.
                    Screen reader users, keyboard-only users, and users with cognitive disabilities
                    will find issues automated tools miss.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-bold text-white">5</span>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-white mb-2">Publish an Accessibility Statement</h4>
                  <p className="text-zinc-400">
                    The EAA requires a public accessibility statement describing your compliance status,
                    known limitations, and contact information for accessibility feedback.
                    Update this regularly.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-bold text-white">6</span>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-white mb-2">Establish Ongoing Monitoring</h4>
                  <p className="text-zinc-400">
                    Accessibility is not a one-time fix. New content, updates, and features can
                    introduce new issues. Set up automated monitoring and regular manual audits
                    to maintain compliance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-10 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Start Your EAA Compliance Journey Today</h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses preparing for the June 2025 deadline.
            Get your free accessibility score in 30 seconds.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-3 px-10 py-5 bg-white text-indigo-600 font-bold text-lg rounded-xl hover:bg-indigo-50 transition-colors"
          >
            <Shield className="w-6 h-6" />
            Free EAA Compliance Scan
            <ArrowRight className="w-6 h-6" />
          </Link>
          <p className="text-indigo-200 text-sm mt-4">No signup required. Instant results.</p>
        </div>

        {/* FAQ Schema for SEO */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-2">What is the EAA 2025 deadline?</h3>
              <p className="text-zinc-400">
                The European Accessibility Act compliance deadline is June 28, 2025. After this date,
                all covered products and services sold to EU customers must meet WCAG 2.1 AA accessibility standards.
              </p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-2">Does the EAA apply to non-EU companies?</h3>
              <p className="text-zinc-400">
                Yes. The EAA applies to any business that sells products or services to EU customers,
                regardless of where the company is headquartered. If you have EU customers, you must comply.
              </p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-2">What are the EAA compliance requirements?</h3>
              <p className="text-zinc-400">
                The EAA requires compliance with WCAG 2.1 Level AA standards, which includes 50 success criteria
                across four principles: Perceivable, Operable, Understandable, and Robust. Key requirements include
                alt text for images, keyboard accessibility, color contrast, and screen reader compatibility.
              </p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-2">What are the penalties for EAA non-compliance?</h3>
              <p className="text-zinc-400">
                Penalties vary by EU member state but can include fines up to 100,000 euros per violation,
                market withdrawal, legal action from advocacy groups, and reputational damage. Some countries
                may impose penalties based on a percentage of annual turnover.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 mt-24">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-zinc-500">
              <Shield className="w-5 h-5" />
              <span>Inclusiv © 2025</span>
              <span className="text-zinc-600">|</span>
              <span>Powered by axe-core</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-zinc-500 text-sm">
              <Link href="/" className="hover:text-white transition-colors">Scanner</Link>
              <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* JSON-LD Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "The Ultimate EAA Compliance Guide 2025",
            "description": "Complete guide to European Accessibility Act requirements, timeline, and compliance strategies for the June 2025 deadline.",
            "author": {
              "@type": "Organization",
              "name": "Inclusiv"
            },
            "datePublished": "2025-01-01",
            "dateModified": new Date().toISOString().split('T')[0],
            "publisher": {
              "@type": "Organization",
              "name": "Inclusiv",
              "logo": {
                "@type": "ImageObject",
                "url": "https://inclusiv.app/logo.png"
              }
            }
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is the EAA 2025 deadline?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The European Accessibility Act compliance deadline is June 28, 2025. After this date, all covered products and services sold to EU customers must meet WCAG 2.1 AA accessibility standards."
                }
              },
              {
                "@type": "Question",
                "name": "Does the EAA apply to non-EU companies?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. The EAA applies to any business that sells products or services to EU customers, regardless of where the company is headquartered."
                }
              },
              {
                "@type": "Question",
                "name": "What are the EAA compliance requirements?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The EAA requires compliance with WCAG 2.1 Level AA standards, which includes 50 success criteria across four principles: Perceivable, Operable, Understandable, and Robust."
                }
              },
              {
                "@type": "Question",
                "name": "What are the penalties for EAA non-compliance?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Penalties vary by EU member state but can include fines up to 100,000 euros per violation, market withdrawal, and legal action."
                }
              }
            ]
          })
        }}
      />
    </div>
  );
}
