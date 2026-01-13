import type { Metadata } from "next";
import { Shield } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | Inclusiv",
  description: "Terms of service for Inclusiv accessibility scanning and compliance services.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="border-b border-zinc-800">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-indigo-500" />
            <span className="text-xl font-bold text-white">Inclusiv</span>
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-white mb-8">Terms of Service</h1>
        <p className="text-zinc-400 mb-8">Last updated: January 13, 2025</p>

        <div className="prose prose-invert prose-zinc max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
            <p className="text-zinc-400">
              By accessing or using Inclusiv&apos;s services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">2. Description of Service</h2>
            <p className="text-zinc-400">
              Inclusiv provides web accessibility scanning and compliance services based on WCAG 2.1 AA standards. Our services include automated accessibility audits, compliance reports, and remediation guidance.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">3. User Responsibilities</h2>
            <p className="text-zinc-400 mb-3">You agree to:</p>
            <ul className="list-disc list-inside text-zinc-400 space-y-2">
              <li>Only scan websites you own or have permission to scan</li>
              <li>Provide accurate information when creating an account</li>
              <li>Maintain the security of your account credentials</li>
              <li>Use our services in compliance with all applicable laws</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">4. Intellectual Property</h2>
            <p className="text-zinc-400">
              All content, features, and functionality of Inclusiv are owned by us and are protected by international copyright, trademark, and other intellectual property laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">5. Subscription and Payments</h2>
            <p className="text-zinc-400">
              Paid subscriptions are billed on a monthly basis. You may cancel at any time from your account dashboard. Refunds are available within 30 days of purchase, no questions asked.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">6. Limitation of Liability</h2>
            <p className="text-zinc-400">
              Our accessibility scanning provides guidance based on automated testing. While we strive for accuracy, we cannot guarantee complete legal compliance. Our services do not constitute legal advice. Users are responsible for ensuring their websites meet all applicable legal requirements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">7. Termination</h2>
            <p className="text-zinc-400">
              We reserve the right to terminate or suspend your account at our discretion, particularly for violations of these terms or misuse of our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">8. Changes to Terms</h2>
            <p className="text-zinc-400">
              We may update these terms from time to time. We will notify users of significant changes via email or through our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">9. Contact</h2>
            <p className="text-zinc-400">
              For questions about these terms, please contact us at{" "}
              <a href="mailto:legal@inclusiv.eu" className="text-indigo-400 hover:text-indigo-300">
                legal@inclusiv.eu
              </a>
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 mt-20">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-zinc-500 text-sm">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              <span>Inclusiv © 2025</span>
              <span className="text-zinc-600">|</span>
              <span>Powered by axe-core</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
              <Link href="/" className="hover:text-zinc-300 transition-colors">Scanner</Link>
              <Link href="/pricing" className="hover:text-zinc-300 transition-colors">Pricing</Link>
              <Link href="/privacy" className="hover:text-zinc-300 transition-colors">Privacy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
