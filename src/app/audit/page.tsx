"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Shield,
  FileSearch,
  CheckCircle,
  Clock,
  Users,
  FileText,
  AlertTriangle,
  ArrowRight,
  Mail,
  Building,
  Globe,
  Phone,
  MessageSquare,
  Zap,
  Star,
  Award,
  Check,
  Calendar,
} from "lucide-react";
import { EAACountdown } from "@/components/EAACountdown";
import { SiteFooter } from "@/components/seo/SiteFooter";

type AuditType = "quick" | "comprehensive" | "enterprise";

interface AuditPackage {
  type: AuditType;
  name: string;
  price: string;
  description: string;
  features: string[];
  deliveryTime: string;
  popular?: boolean;
}

export default function AuditPage() {
  const [selectedPackage, setSelectedPackage] = useState<AuditType>("comprehensive");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    website: "",
    phone: "",
    pages: "10-50",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const auditPackages: AuditPackage[] = [
    {
      type: "quick",
      name: "Quick Audit",
      price: "$297",
      description: "Perfect for small sites or initial assessment",
      features: [
        "Up to 10 pages audited",
        "WCAG 2.1 AA compliance check",
        "PDF report with findings",
        "Priority issue list",
        "30-minute consultation call",
      ],
      deliveryTime: "3-5 business days",
    },
    {
      type: "comprehensive",
      name: "Comprehensive Audit",
      price: "$997",
      description: "Full accessibility audit for medium sites",
      features: [
        "Up to 50 pages audited",
        "WCAG 2.1 AA + AAA checks",
        "Detailed PDF report",
        "Prioritized remediation plan",
        "User flow analysis",
        "Screen reader testing",
        "Keyboard navigation review",
        "1-hour strategy call",
        "30-day email support",
      ],
      deliveryTime: "7-10 business days",
      popular: true,
    },
    {
      type: "enterprise",
      name: "Enterprise Audit",
      price: "Custom",
      description: "Tailored solution for large organizations",
      features: [
        "Unlimited pages",
        "Full WCAG 2.1 compliance",
        "EAA compliance assessment",
        "Custom report format",
        "Executive summary",
        "Developer workshops",
        "Accessibility statement draft",
        "Remediation assistance",
        "Quarterly follow-up audits",
        "Dedicated account manager",
      ],
      deliveryTime: "Custom timeline",
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await fetch("/api/leads/capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          package: selectedPackage,
          source: "audit-request",
        }),
      });
      setSubmitted(true);
    } catch (error) {
      console.error("Failed to submit:", error);
    }
  };

  const testimonials = [
    {
      quote:
        "The audit was incredibly thorough. We fixed all issues before the EAA deadline and now our site is fully compliant.",
      author: "Sarah M.",
      role: "E-commerce Director",
      company: "Fashion Retailer",
    },
    {
      quote:
        "Worth every penny. The detailed remediation plan made it easy for our dev team to prioritize and fix issues quickly.",
      author: "Michael K.",
      role: "CTO",
      company: "SaaS Startup",
    },
    {
      quote:
        "The consultation call alone was invaluable. They explained everything in plain language our team could understand.",
      author: "Lisa T.",
      role: "Marketing Manager",
      company: "Travel Agency",
    },
  ];

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
            <Link
              href="/pricing"
              className="text-zinc-400 hover:text-white transition-colors text-sm"
            >
              Self-Service Plans
            </Link>
            <Link
              href="/"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-colors text-sm"
            >
              Free Scan
            </Link>
          </div>
        </div>
      </header>

      {/* EAA Countdown Banner */}
      <EAACountdown variant="banner" showCTA={false} />

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 rounded-full text-indigo-400 text-sm mb-6">
            <FileSearch className="w-4 h-4" />
            Professional Audit Service
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Expert <span className="text-indigo-400">Accessibility Audit</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Get a comprehensive accessibility audit from our certified experts.
            Detailed findings, actionable recommendations, and full compliance
            roadmap.
          </p>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-wrap justify-center gap-6 mb-16 text-sm text-zinc-400">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-indigo-400" />
            <span>IAAP Certified Auditors</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-400" />
            <span>500+ Audits Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-400" />
            <span>4.9/5 Client Rating</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-indigo-400" />
            <span>Fast Turnaround</span>
          </div>
        </div>

        {/* Packages */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {auditPackages.map((pkg) => (
            <div
              key={pkg.type}
              className={`relative bg-zinc-900 border rounded-2xl p-6 cursor-pointer transition-all ${
                selectedPackage === pkg.type
                  ? "border-indigo-500 ring-2 ring-indigo-500/20"
                  : "border-zinc-800 hover:border-zinc-700"
              }`}
              onClick={() => setSelectedPackage(pkg.type)}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-indigo-600 text-white text-xs font-medium rounded-full">
                  Most Popular
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-white mb-1">{pkg.name}</h3>
                <p className="text-3xl font-bold text-indigo-400">{pkg.price}</p>
                <p className="text-zinc-500 text-sm mt-2">{pkg.description}</p>
              </div>

              <ul className="space-y-3 mb-6">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-zinc-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-4 border-t border-zinc-800">
                <div className="flex items-center gap-2 text-zinc-400 text-sm">
                  <Calendar className="w-4 h-4" />
                  <span>{pkg.deliveryTime}</span>
                </div>
              </div>

              {/* Selection indicator */}
              <div
                className={`absolute top-4 right-4 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedPackage === pkg.type
                    ? "border-indigo-500 bg-indigo-500"
                    : "border-zinc-700"
                }`}
              >
                {selectedPackage === pkg.type && (
                  <Check className="w-4 h-4 text-white" />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Request Form */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden mb-16">
          <div className="p-6 border-b border-zinc-800">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Mail className="w-5 h-5 text-indigo-400" />
              Request Your Audit
            </h2>
            <p className="text-zinc-400 text-sm mt-1">
              Fill out the form below and we&apos;ll get back to you within 24 hours.
            </p>
          </div>

          {submitted ? (
            <div className="p-12 text-center">
              <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">
                Request Submitted!
              </h3>
              <p className="text-zinc-400 mb-6 max-w-md mx-auto">
                Thank you for your interest. Our team will review your request
                and contact you within 24 hours to discuss next steps.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300"
              >
                <Zap className="w-4 h-4" />
                Run a free scan while you wait
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-zinc-400 text-sm mb-2">
                    Your Name *
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full pl-10 pr-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
                      placeholder="John Doe"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-zinc-400 text-sm mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full pl-10 pr-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-zinc-400 text-sm mb-2">
                    Company Name
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) =>
                        setFormData({ ...formData, company: e.target.value })
                      }
                      className="w-full pl-10 pr-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
                      placeholder="Acme Inc."
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-zinc-400 text-sm mb-2">
                    Website URL *
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                    <input
                      type="url"
                      required
                      value={formData.website}
                      onChange={(e) =>
                        setFormData({ ...formData, website: e.target.value })
                      }
                      className="w-full pl-10 pr-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
                      placeholder="https://example.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-zinc-400 text-sm mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full pl-10 pr-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-zinc-400 text-sm mb-2">
                    Estimated Pages
                  </label>
                  <select
                    value={formData.pages}
                    onChange={(e) =>
                      setFormData({ ...formData, pages: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="1-10">1-10 pages</option>
                    <option value="10-50">10-50 pages</option>
                    <option value="50-100">50-100 pages</option>
                    <option value="100+">100+ pages</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-zinc-400 text-sm mb-2">
                  Additional Information
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-zinc-500" />
                  <textarea
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    rows={4}
                    className="w-full pl-10 pr-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
                    placeholder="Tell us about your accessibility goals, specific concerns, or any deadlines you're working towards..."
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
                <div className="text-zinc-400 text-sm">
                  Selected:{" "}
                  <span className="text-white font-medium">
                    {auditPackages.find((p) => p.type === selectedPackage)?.name}
                  </span>
                </div>
                <button
                  type="submit"
                  className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-500/25"
                >
                  Request Audit
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">
            What Our Clients Say
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, i) => (
              <div
                key={i}
                className="bg-zinc-900 border border-zinc-800 rounded-xl p-6"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star
                      key={j}
                      className="w-4 h-4 text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-zinc-300 text-sm mb-4 italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div>
                  <p className="text-white font-medium">{testimonial.author}</p>
                  <p className="text-zinc-500 text-sm">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Process */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 mb-16">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">
            Our Audit Process
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-indigo-400 font-bold">1</span>
              </div>
              <h3 className="text-white font-medium mb-2">Discovery</h3>
              <p className="text-zinc-400 text-sm">
                We discuss your goals, priorities, and any specific concerns
                about your website.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-indigo-400 font-bold">2</span>
              </div>
              <h3 className="text-white font-medium mb-2">Testing</h3>
              <p className="text-zinc-400 text-sm">
                Our experts manually test your site using assistive technologies
                and automated tools.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-indigo-400 font-bold">3</span>
              </div>
              <h3 className="text-white font-medium mb-2">Analysis</h3>
              <p className="text-zinc-400 text-sm">
                We compile findings, prioritize issues, and create your detailed
                remediation roadmap.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-indigo-400 font-bold">4</span>
              </div>
              <h3 className="text-white font-medium mb-2">Delivery</h3>
              <p className="text-zinc-400 text-sm">
                You receive your report and we walk through findings in a
                consultation call.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Not Ready for a Full Audit?
          </h2>
          <p className="text-zinc-400 mb-6 max-w-xl mx-auto">
            Start with our free automated scan to get an instant overview of your
            accessibility issues.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-500/25"
            >
              <Zap className="w-5 h-5" />
              Free Instant Scan
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold rounded-xl transition-colors"
            >
              View Self-Service Plans
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
