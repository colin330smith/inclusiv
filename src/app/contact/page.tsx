import type { Metadata } from "next";
import { Shield, Clock, Mail, MessageSquare, Phone, MapPin, CheckCircle, AlertCircle, Zap } from "lucide-react";
import Link from "next/link";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | Inclusiv - Web Accessibility Support",
  description: "Get in touch with the Inclusiv team for accessibility compliance questions, technical support, or partnership inquiries. We typically respond within 24 hours.",
  keywords: ["Inclusiv contact", "accessibility support", "WCAG help", "EAA compliance support"],
  openGraph: {
    title: "Contact Inclusiv | Get Accessibility Support",
    description: "Reach out to our team for help with web accessibility compliance and technical support.",
    type: "website",
  },
};

// Calculate days until EAA deadline
const getDeadlineInfo = () => {
  const deadline = new Date("2025-06-28");
  const today = new Date();
  const diffTime = deadline.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return { days: diffDays, deadline };
};

const contactMethods = [
  {
    icon: Mail,
    title: "Email Support",
    description: "Get help with technical issues, billing questions, or compliance guidance.",
    contact: "support@inclusiv.dev",
    responseTime: "Within 24 hours",
  },
  {
    icon: MessageSquare,
    title: "Live Chat",
    description: "Quick answers to simple questions during business hours.",
    contact: "Available Mon-Fri, 9am-6pm CET",
    responseTime: "Usually within minutes",
  },
  {
    icon: Phone,
    title: "Schedule a Call",
    description: "Book a consultation for enterprise needs or complex implementations.",
    contact: "Professional & Enterprise plans",
    responseTime: "Book via email",
  },
];

const faqQuickLinks = [
  { question: "What is the EAA deadline?", href: "/faq#eaa-deadline" },
  { question: "How do I interpret my score?", href: "/help/understanding-results" },
  { question: "How do I fix missing alt text?", href: "/help/fixing-issues#alt-text" },
  { question: "What plans do you offer?", href: "/pricing" },
];

export default function ContactPage() {
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
            <Link href="/help" className="text-zinc-400 hover:text-white transition-colors text-sm font-medium">
              Help Center
            </Link>
            <div className="flex items-center gap-2 px-3 py-1 bg-red-500/10 rounded-full text-sm text-red-400">
              <Clock className="w-4 h-4" />
              <span className="font-semibold">{deadlineInfo.days} days until EAA deadline</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-16">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 text-indigo-400 text-sm mb-6">
            <MessageSquare className="w-4 h-4" />
            Contact Us
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Get in <span className="gradient-text">touch</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Have questions about accessibility compliance? Need technical support? We&apos;re here to help you achieve your accessibility goals.
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {contactMethods.map((method) => (
            <div
              key={method.title}
              className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl"
            >
              <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-4">
                <method.icon className="w-6 h-6 text-indigo-500" />
              </div>
              <h2 className="text-xl font-bold text-white mb-2">{method.title}</h2>
              <p className="text-zinc-400 mb-4">{method.description}</p>
              <div className="space-y-2">
                <p className="text-white font-medium">{method.contact}</p>
                <p className="text-sm text-zinc-500">Response: {method.responseTime}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-3">
            <ContactForm />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2 space-y-6">
            {/* Response Time */}
            <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="w-5 h-5 text-indigo-500" />
                <h3 className="text-lg font-semibold text-white">Response Times</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-xl">
                  <span className="text-zinc-400">Email Support</span>
                  <span className="text-white font-medium">Within 24 hours</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-xl">
                  <span className="text-zinc-400">Professional Plan</span>
                  <span className="text-white font-medium">Within 4 hours</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-xl">
                  <span className="text-zinc-400">Enterprise Plan</span>
                  <span className="text-white font-medium">Within 1 hour</span>
                </div>
              </div>
            </div>

            {/* Quick Answers */}
            <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <h3 className="text-lg font-semibold text-white">Quick Answers</h3>
              </div>
              <p className="text-zinc-400 text-sm mb-4">
                Many questions are already answered in our help resources:
              </p>
              <div className="space-y-2">
                {faqQuickLinks.map((link, i) => (
                  <Link
                    key={i}
                    href={link.href}
                    className="block p-3 bg-zinc-800/50 rounded-xl text-zinc-300 hover:text-indigo-400 hover:bg-zinc-800 transition-colors text-sm"
                  >
                    {link.question}
                  </Link>
                ))}
              </div>
              <Link
                href="/faq"
                className="block mt-4 text-center text-indigo-400 hover:text-indigo-300 text-sm font-medium"
              >
                View all FAQs
              </Link>
            </div>

            {/* Priority Support */}
            <div className="p-6 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="w-5 h-5 text-indigo-400" />
                <h3 className="text-lg font-semibold text-white">Need Urgent Help?</h3>
              </div>
              <p className="text-zinc-300 text-sm mb-4">
                With the EAA deadline approaching, we understand time is critical. Upgrade to Professional for priority support and faster response times.
              </p>
              <Link
                href="/pricing"
                className="block text-center px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl transition-colors text-sm"
              >
                View Priority Plans
              </Link>
            </div>

            {/* Office Info */}
            <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-5 h-5 text-indigo-500" />
                <h3 className="text-lg font-semibold text-white">Our Location</h3>
              </div>
              <p className="text-zinc-400 text-sm">
                Inclusiv operates remotely across Europe, serving businesses globally.
              </p>
              <div className="mt-4 p-3 bg-zinc-800/50 rounded-xl">
                <p className="text-zinc-300 text-sm">Business Hours</p>
                <p className="text-white font-medium">Mon-Fri, 9:00 AM - 6:00 PM CET</p>
              </div>
            </div>
          </div>
        </div>
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
    </div>
  );
}
