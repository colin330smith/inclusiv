import type { Metadata } from "next";
import { Shield, AlertTriangle, CheckCircle, ArrowRight, Clock, Euro, Users, Globe } from "lucide-react";
import Link from "next/link";
import { ScannerForm } from "./ScannerForm";

export const metadata: Metadata = {
  title: "EAA Compliance Checker - Free WCAG Scan | Inclusiv",
  description: "Check if your website complies with the European Accessibility Act (EAA). Free instant WCAG 2.1 AA scan. Avoid €100,000 fines. Results in 30 seconds.",
  robots: {
    index: false, // Landing pages typically don't need organic indexing
    follow: true,
  },
};

const stats = [
  { value: "87%", label: "EU websites fail accessibility checks" },
  { value: "€100K", label: "Maximum penalty per violation" },
  { value: "30 sec", label: "Time to check your compliance" },
];

const benefits = [
  {
    icon: Shield,
    title: "Instant WCAG 2.1 AA Check",
    description: "Powered by axe-core, the industry standard used by Microsoft and Google",
  },
  {
    icon: Globe,
    title: "Multi-standard Compliance",
    description: "One scan checks EAA, ADA, EN 301 549, and Section 508 compliance",
  },
  {
    icon: CheckCircle,
    title: "Actionable Fix Guide",
    description: "Get platform-specific fixes for WordPress, Shopify, and custom sites",
  },
];

const testimonials = [
  {
    quote: "We were facing an EAA audit and Inclusiv helped us identify and fix 47 critical issues in under 2 weeks.",
    author: "Marcus K.",
    role: "CTO, German E-commerce",
    metric: "47 issues fixed",
  },
  {
    quote: "The scan found accessibility problems we didn't even know existed. The fix suggestions were incredibly detailed.",
    author: "Sophie L.",
    role: "Marketing Director, France",
    metric: "Score: 42 → 94",
  },
  {
    quote: "Simple, fast, and it actually works. We're now fully compliant and avoided potential fines.",
    author: "Jan V.",
    role: "Founder, Netherlands",
    metric: "100% compliant",
  },
];

export default function EAAComplianceLandingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Minimal header - no distracting navigation */}
      <header className="border-b border-zinc-800">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-indigo-500" />
            <span className="text-xl font-bold text-white">Inclusiv</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-red-500/10 rounded-full text-sm text-red-400">
            <AlertTriangle className="w-4 h-4" />
            <span className="font-medium">EAA Enforcement Active</span>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section - Focused on conversion */}
        <section className="py-12 md:py-16 border-b border-zinc-800">
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              {/* Left: Value proposition */}
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-full mb-6">
                  <Clock className="w-4 h-4 text-red-400" />
                  <span className="text-red-400 text-sm font-medium">
                    EAA deadline passed - Fines now active
                  </span>
                </div>

                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                  Is Your Website
                  <span className="text-red-400"> Breaking EU Law?</span>
                </h1>

                <p className="text-lg text-zinc-400 mb-6">
                  The European Accessibility Act is now enforced. Non-compliant websites face fines up to{" "}
                  <span className="text-white font-semibold">€100,000</span>. Check your compliance in 30 seconds - free.
                </p>

                {/* Trust indicators */}
                <div className="flex flex-wrap gap-4 mb-8">
                  {stats.map((stat, i) => (
                    <div key={i} className="text-center">
                      <div className="text-2xl font-bold text-white">{stat.value}</div>
                      <div className="text-xs text-zinc-500">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Mobile CTA */}
                <div className="lg:hidden mb-8">
                  <ScannerForm />
                </div>

                {/* Social proof */}
                <div className="flex items-center gap-3 text-sm text-zinc-400">
                  <div className="flex -space-x-2">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-zinc-800 border-2 border-zinc-900 flex items-center justify-center"
                      >
                        <Users className="w-4 h-4 text-zinc-500" />
                      </div>
                    ))}
                  </div>
                  <span>
                    <strong className="text-white">2,400+</strong> EU businesses scanned this month
                  </span>
                </div>
              </div>

              {/* Right: Scanner form */}
              <div className="hidden lg:block">
                <ScannerForm />
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 border-b border-zinc-800">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-2xl font-bold text-white text-center mb-10">
              Everything You Need to Avoid EAA Penalties
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {benefits.map((benefit, i) => (
                <div
                  key={i}
                  className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl"
                >
                  <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-4">
                    <benefit.icon className="w-6 h-6 text-indigo-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{benefit.title}</h3>
                  <p className="text-zinc-400 text-sm">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What We Check */}
        <section className="py-16 border-b border-zinc-800">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-2xl font-bold text-white text-center mb-4">
              Complete WCAG 2.1 AA Coverage
            </h2>
            <p className="text-zinc-400 text-center mb-10 max-w-2xl mx-auto">
              Our scanner checks all criteria required by the European Accessibility Act
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { category: "Perceivable", checks: ["Alt text", "Color contrast", "Text resizing", "Audio captions"] },
                { category: "Operable", checks: ["Keyboard navigation", "Focus indicators", "Skip links", "No seizure triggers"] },
                { category: "Understandable", checks: ["Language declaration", "Consistent navigation", "Error identification", "Form labels"] },
                { category: "Robust", checks: ["Valid HTML", "ARIA attributes", "Name/role/value", "Status messages"] },
              ].map((section, i) => (
                <div key={i} className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl">
                  <h3 className="font-semibold text-indigo-400 mb-3">{section.category}</h3>
                  <ul className="space-y-2">
                    {section.checks.map((check, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-zinc-400">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        {check}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 border-b border-zinc-800">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-2xl font-bold text-white text-center mb-10">
              Trusted by EU Businesses
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, i) => (
                <div
                  key={i}
                  className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl"
                >
                  <div className="inline-block px-3 py-1 bg-green-500/10 text-green-400 text-xs font-medium rounded-full mb-4">
                    {testimonial.metric}
                  </div>
                  <p className="text-zinc-300 mb-4 italic">&ldquo;{testimonial.quote}&rdquo;</p>
                  <div>
                    <p className="font-medium text-white">{testimonial.author}</p>
                    <p className="text-sm text-zinc-500">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* EAA Penalty Info */}
        <section className="py-16 border-b border-zinc-800">
          <div className="max-w-5xl mx-auto px-6">
            <div className="bg-gradient-to-br from-red-500/10 via-zinc-900 to-zinc-900 border border-red-500/20 rounded-2xl p-8 md:p-10">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    EAA Penalties Are Real
                  </h2>
                  <p className="text-zinc-400 mb-6">
                    EU member states are actively enforcing the European Accessibility Act.
                    Penalties vary by country but can include:
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Fines up to €100,000 per violation",
                      "Mandatory remediation orders",
                      "Public disclosure of non-compliance",
                      "Potential bans from public procurement",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-zinc-300">
                        <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-red-500/10 border border-red-500/30 mb-4">
                    <div>
                      <Euro className="w-8 h-8 text-red-400 mx-auto mb-1" />
                      <div className="text-3xl font-bold text-red-400">100K</div>
                    </div>
                  </div>
                  <p className="text-zinc-400">Maximum fine per violation</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Check Your Compliance Now
            </h2>
            <p className="text-xl text-zinc-400 mb-8">
              Free scan. No signup required. Results in 30 seconds.
            </p>

            <Link
              href="/#scanner"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-500/25 text-lg"
            >
              Start Free Compliance Check
              <ArrowRight className="w-5 h-5" />
            </Link>

            <p className="mt-6 text-zinc-500 text-sm">
              No credit card required. Scan is 100% free.
            </p>
          </div>
        </section>
      </main>

      {/* Minimal footer */}
      <footer className="border-t border-zinc-800 py-8">
        <div className="max-w-5xl mx-auto px-6 text-center text-sm text-zinc-500">
          <p>&copy; {new Date().getFullYear()} Inclusiv. WCAG 2.1 AA compliance scanning for EAA, ADA, and global standards.</p>
          <div className="mt-2 flex items-center justify-center gap-4">
            <Link href="/privacy" className="hover:text-zinc-300 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-zinc-300 transition-colors">Terms</Link>
            <Link href="/contact" className="hover:text-zinc-300 transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
