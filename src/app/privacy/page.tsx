import type { Metadata } from "next";
import { Shield, Clock, Lock, Eye, Database, Trash2, Mail, Globe } from "lucide-react";
import Link from "next/link";
import { SiteFooter } from "@/components/seo/SiteFooter";

export const metadata: Metadata = {
  title: "Privacy Policy | Inclusiv - Web Accessibility Scanner",
  description: "Learn how Inclusiv collects, uses, and protects your personal data. GDPR compliant privacy practices for our accessibility scanning service.",
  keywords: ["privacy policy", "GDPR", "data protection", "Inclusiv privacy"],
};

// Calculate days until EAA deadline
const getDeadlineInfo = () => {
  const deadline = new Date("2025-06-28");
  const today = new Date();
  const diffTime = deadline.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return { days: diffDays, deadline };
};

export default function PrivacyPage() {
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
            <Link href="/pricing" className="text-zinc-400 hover:text-white transition-colors text-sm font-medium">
              Pricing
            </Link>
            <Link href="/faq" className="text-zinc-400 hover:text-white transition-colors text-sm font-medium">
              FAQ
            </Link>
            <Link href="/contact" className="text-zinc-400 hover:text-white transition-colors text-sm font-medium">
              Contact
            </Link>
            <div className="flex items-center gap-2 px-3 py-1 bg-red-500/10 rounded-full text-sm text-red-400">
              <Clock className="w-4 h-4" />
              <span className="font-semibold">{deadlineInfo.days} days until EAA deadline</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 text-indigo-400 text-sm mb-6">
            <Lock className="w-4 h-4" />
            Privacy Policy
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Your privacy <span className="gradient-text">matters</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            We are committed to protecting your personal data and being transparent about how we use it.
          </p>
          <p className="text-zinc-500 mt-4">Last updated: January 2025</p>
        </div>

        {/* Content */}
        <div className="prose prose-invert prose-zinc max-w-none">
          <div className="space-y-12">
            {/* Introduction */}
            <section className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center">
                  <Shield className="w-5 h-5 text-indigo-500" />
                </div>
                <h2 className="text-2xl font-bold text-white m-0">Introduction</h2>
              </div>
              <p className="text-zinc-400 leading-relaxed">
                Inclusiv (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) operates the inclusiv.dev website and accessibility scanning service. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our service. We are fully compliant with the General Data Protection Regulation (GDPR) and process all data within the European Union.
              </p>
            </section>

            {/* Data We Collect */}
            <section className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center">
                  <Database className="w-5 h-5 text-indigo-500" />
                </div>
                <h2 className="text-2xl font-bold text-white m-0">Data We Collect</h2>
              </div>
              <div className="space-y-4 text-zinc-400">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Information You Provide</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Email address (when requesting a report or subscribing)</li>
                    <li>Name and company name (when contacting us or signing up)</li>
                    <li>Website URLs you submit for scanning</li>
                    <li>Payment information (processed securely by Stripe)</li>
                    <li>Messages and feedback you send us</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Information Collected Automatically</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>IP address and approximate location</li>
                    <li>Browser type and device information</li>
                    <li>Pages visited and actions taken on our site</li>
                    <li>Referral source and session duration</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Website Scanning Data</h3>
                  <p>
                    When you scan a website, we access only publicly visible content. We do not access private pages, login-protected areas, or backend systems. Scan results are stored temporarily to generate your report and are automatically deleted after 30 days unless you have an active paid subscription.
                  </p>
                </div>
              </div>
            </section>

            {/* How We Use Data */}
            <section className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center">
                  <Eye className="w-5 h-5 text-indigo-500" />
                </div>
                <h2 className="text-2xl font-bold text-white m-0">How We Use Your Data</h2>
              </div>
              <div className="space-y-2 text-zinc-400">
                <p>We use your information to:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Provide and maintain our accessibility scanning service</li>
                  <li>Send you scan results and accessibility reports</li>
                  <li>Process payments and manage subscriptions</li>
                  <li>Respond to your inquiries and support requests</li>
                  <li>Send important service updates and security notices</li>
                  <li>Improve our service based on usage patterns</li>
                  <li>Comply with legal obligations</li>
                </ul>
                <p className="mt-4">
                  We will <strong className="text-white">never</strong> sell your personal data to third parties or use it for purposes unrelated to our service.
                </p>
              </div>
            </section>

            {/* Data Sharing */}
            <section className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center">
                  <Globe className="w-5 h-5 text-indigo-500" />
                </div>
                <h2 className="text-2xl font-bold text-white m-0">Data Sharing</h2>
              </div>
              <div className="space-y-4 text-zinc-400">
                <p>We share your data only with:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li><strong className="text-white">Stripe:</strong> For secure payment processing (PCI DSS compliant)</li>
                  <li><strong className="text-white">Resend:</strong> For transactional email delivery</li>
                  <li><strong className="text-white">Vercel:</strong> For website hosting (EU data centers)</li>
                  <li><strong className="text-white">Legal authorities:</strong> When required by law or to protect our rights</li>
                </ul>
                <p>All our service providers are GDPR compliant and have appropriate data processing agreements in place.</p>
              </div>
            </section>

            {/* Your Rights */}
            <section className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center">
                  <Lock className="w-5 h-5 text-indigo-500" />
                </div>
                <h2 className="text-2xl font-bold text-white m-0">Your Rights</h2>
              </div>
              <div className="space-y-2 text-zinc-400">
                <p>Under GDPR, you have the right to:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li><strong className="text-white">Access:</strong> Request a copy of your personal data</li>
                  <li><strong className="text-white">Rectification:</strong> Correct inaccurate personal data</li>
                  <li><strong className="text-white">Erasure:</strong> Request deletion of your personal data</li>
                  <li><strong className="text-white">Portability:</strong> Receive your data in a structured format</li>
                  <li><strong className="text-white">Restriction:</strong> Limit how we process your data</li>
                  <li><strong className="text-white">Objection:</strong> Object to processing of your data</li>
                  <li><strong className="text-white">Withdraw consent:</strong> Withdraw consent at any time</li>
                </ul>
                <p className="mt-4">
                  To exercise these rights, email us at <a href="mailto:privacy@inclusiv.dev" className="text-indigo-400 hover:underline">privacy@inclusiv.dev</a>. We will respond within 30 days.
                </p>
              </div>
            </section>

            {/* Data Retention */}
            <section className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center">
                  <Trash2 className="w-5 h-5 text-indigo-500" />
                </div>
                <h2 className="text-2xl font-bold text-white m-0">Data Retention</h2>
              </div>
              <div className="space-y-2 text-zinc-400">
                <ul className="list-disc list-inside space-y-1">
                  <li>Free scan results: 30 days</li>
                  <li>Subscriber data: Duration of subscription + 90 days</li>
                  <li>Email communications: 2 years</li>
                  <li>Payment records: 7 years (legal requirement)</li>
                  <li>Analytics data: 26 months (anonymized)</li>
                </ul>
                <p className="mt-4">
                  You can request earlier deletion at any time by contacting us.
                </p>
              </div>
            </section>

            {/* Security */}
            <section className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center">
                  <Shield className="w-5 h-5 text-indigo-500" />
                </div>
                <h2 className="text-2xl font-bold text-white m-0">Security</h2>
              </div>
              <div className="space-y-2 text-zinc-400">
                <p>We protect your data with:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>TLS 1.3 encryption for all data in transit</li>
                  <li>AES-256 encryption for data at rest</li>
                  <li>Regular security audits and penetration testing</li>
                  <li>Strict access controls and authentication</li>
                  <li>EU-based data centers</li>
                </ul>
              </div>
            </section>

            {/* Contact */}
            <section className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center">
                  <Mail className="w-5 h-5 text-indigo-500" />
                </div>
                <h2 className="text-2xl font-bold text-white m-0">Contact Us</h2>
              </div>
              <div className="space-y-2 text-zinc-400">
                <p>For privacy-related inquiries:</p>
                <p>
                  Email: <a href="mailto:privacy@inclusiv.dev" className="text-indigo-400 hover:underline">privacy@inclusiv.dev</a>
                </p>
                <p className="mt-4">
                  If you believe we have not addressed your concerns satisfactorily, you have the right to lodge a complaint with your local data protection authority.
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <SiteFooter />
    </div>
  );
}
