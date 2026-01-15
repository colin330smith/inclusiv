import { Metadata } from 'next';
import Link from 'next/link';
import { Shield, Users, Percent, Zap, CheckCircle, ArrowRight, Building2, Globe, Award, TrendingUp, DollarSign, Handshake } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Partner Program | Agency & Reseller Opportunities',
  description: 'Join the Inclusiv partner program. Earn 30% recurring commissions, get white-label options, and help your clients achieve accessibility compliance.',
  openGraph: {
    title: 'Inclusiv Partner Program',
    description: 'Earn 30% recurring commissions helping clients with accessibility.',
  },
};

const partnerTypes = [
  {
    icon: Building2,
    title: 'Agency Partners',
    description: 'Web design, development, and marketing agencies who offer accessibility as a service.',
    benefits: [
      '30% recurring commission on referrals',
      'White-label scanning reports',
      'Priority client support',
      'Co-branded marketing materials',
      'Dedicated partner manager',
    ],
    cta: 'Apply as Agency',
    ideal: 'Digital agencies, web design firms, marketing agencies',
  },
  {
    icon: Globe,
    title: 'Reseller Partners',
    description: 'Consultants and businesses who want to resell accessibility monitoring to their clients.',
    benefits: [
      'Wholesale pricing (up to 40% off)',
      'White-label dashboard option',
      'Custom domain for client access',
      'Volume discounts',
      'API access for integration',
    ],
    cta: 'Apply as Reseller',
    ideal: 'Accessibility consultants, IT service providers, compliance firms',
  },
  {
    icon: Award,
    title: 'Affiliate Partners',
    description: 'Content creators, bloggers, and influencers who want to earn by sharing Inclusiv.',
    benefits: [
      '25% recurring commission',
      'Custom tracking links',
      'Real-time dashboard',
      'Monthly payouts',
      'Marketing assets provided',
    ],
    cta: 'Join Affiliate Program',
    ideal: 'Bloggers, YouTubers, accessibility advocates',
  },
];

const testimonials = [
  {
    quote: "We've added accessibility audits to every web project. Inclusiv makes it easy to show clients their compliance status.",
    author: 'Sarah Chen',
    role: 'Founder, PixelPerfect Agency',
    revenue: '$4,200/mo',
  },
  {
    quote: "The white-label reports look like we built them ourselves. Clients love the professional presentation.",
    author: 'Marcus Johnson',
    role: 'CEO, AccessFirst Consulting',
    revenue: '$7,800/mo',
  },
  {
    quote: "As an accessibility blogger, recommending Inclusiv is natural. The commission is just a bonus.",
    author: 'Emma Williams',
    role: 'A11y Advocate & Blogger',
    revenue: '$1,500/mo',
  },
];

const stats = [
  { value: '200+', label: 'Active Partners' },
  { value: '$500K+', label: 'Partner Earnings' },
  { value: '30%', label: 'Recurring Commission' },
  { value: '24hrs', label: 'Avg. Payout Time' },
];

const faqs = [
  {
    q: 'How does the commission work?',
    a: 'You earn a percentage of the monthly subscription for as long as your referral remains a paying customer. Commissions are paid out monthly via PayPal or bank transfer.',
  },
  {
    q: 'Is there a minimum payout threshold?',
    a: 'Yes, the minimum payout is $100. If your balance is below this, it rolls over to the next month.',
  },
  {
    q: 'Can I white-label the reports?',
    a: 'Agency and Reseller partners can add their logo to scan reports and remove Inclusiv branding. Full white-label dashboards are available for Reseller partners.',
  },
  {
    q: 'How long is the cookie duration?',
    a: 'Our tracking cookies last 90 days, so you get credit for referrals even if they don\'t sign up immediately.',
  },
  {
    q: 'Can I refer enterprise clients?',
    a: 'Yes! For enterprise deals over $5,000/year, we offer custom commission structures. Contact us to discuss.',
  },
];

export default function PartnersPage() {
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
            <Link href="/tools" className="text-zinc-300 hover:text-white transition-colors text-sm font-medium">
              Free Tools
            </Link>
            <Link href="/pricing" className="text-zinc-300 hover:text-white transition-colors text-sm font-medium">
              Pricing
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 rounded-full text-green-400 text-sm mb-6">
            <Handshake className="w-4 h-4" />
            Partner Program
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Grow Your Business with <span className="text-green-400">Accessibility</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-8">
            Earn recurring revenue while helping businesses become accessible. 30% commission, white-label options, and dedicated support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#partner-types"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-500 hover:to-emerald-400 text-white font-semibold rounded-xl transition-all shadow-lg shadow-green-500/25"
            >
              <Users className="w-5 h-5" />
              Become a Partner
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold rounded-xl transition-colors"
            >
              Talk to Partnership Team
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-zinc-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Partner Types */}
        <div id="partner-types" className="mb-16">
          <h2 className="text-2xl font-bold text-white text-center mb-8">Choose Your Partner Track</h2>
          <div className="grid lg:grid-cols-3 gap-6">
            {partnerTypes.map((type) => {
              const Icon = type.icon;
              return (
                <div key={type.title} className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-green-500/50 transition-colors">
                  <div className="p-6 border-b border-zinc-800">
                    <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-green-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{type.title}</h3>
                    <p className="text-zinc-400 text-sm">{type.description}</p>
                  </div>
                  <div className="p-6">
                    <p className="text-zinc-500 text-xs uppercase tracking-wide mb-3">Benefits</p>
                    <ul className="space-y-2 mb-6">
                      {type.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-start gap-2 text-sm text-zinc-300">
                          <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                    <p className="text-zinc-500 text-xs mb-4">
                      <strong className="text-zinc-400">Ideal for:</strong> {type.ideal}
                    </p>
                    <Link
                      href="/contact?type=partner"
                      className="flex items-center justify-center gap-2 w-full py-3 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-xl transition-colors"
                    >
                      {type.cta}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 mb-16">
          <h2 className="text-2xl font-bold text-white text-center mb-8">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-500/10 rounded-full flex items-center justify-center mx-auto mb-4 text-indigo-400 font-bold">1</div>
              <h3 className="text-white font-semibold mb-2">Apply</h3>
              <p className="text-zinc-400 text-sm">Submit your application with your business details</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-500/10 rounded-full flex items-center justify-center mx-auto mb-4 text-indigo-400 font-bold">2</div>
              <h3 className="text-white font-semibold mb-2">Get Approved</h3>
              <p className="text-zinc-400 text-sm">We review applications within 48 hours</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-500/10 rounded-full flex items-center justify-center mx-auto mb-4 text-indigo-400 font-bold">3</div>
              <h3 className="text-white font-semibold mb-2">Share & Sell</h3>
              <p className="text-zinc-400 text-sm">Use your links, reports, and materials</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4 text-green-400 font-bold">
                <DollarSign className="w-6 h-6" />
              </div>
              <h3 className="text-white font-semibold mb-2">Get Paid</h3>
              <p className="text-zinc-400 text-sm">Monthly payouts via PayPal or bank transfer</p>
            </div>
          </div>
        </div>

        {/* Partner Testimonials */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white text-center mb-8">Partner Success Stories</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div key={testimonial.author} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                <p className="text-zinc-300 text-sm mb-4">&ldquo;{testimonial.quote}&rdquo;</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-semibold text-sm">{testimonial.author}</p>
                    <p className="text-zinc-500 text-xs">{testimonial.role}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-green-400 font-bold">{testimonial.revenue}</p>
                    <p className="text-zinc-500 text-xs">earnings</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Commission Calculator */}
        <div className="bg-gradient-to-r from-green-600/10 to-emerald-600/10 border border-green-500/20 rounded-2xl p-8 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-8 h-8 text-green-400" />
            <div>
              <h2 className="text-2xl font-bold text-white">Earnings Potential</h2>
              <p className="text-zinc-400">See what partners are earning</p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-zinc-900/50 rounded-xl p-6 text-center">
              <p className="text-zinc-400 text-sm mb-2">5 Referrals/Month</p>
              <p className="text-3xl font-bold text-white mb-1">$735</p>
              <p className="text-green-400 text-sm">$8,820/year</p>
            </div>
            <div className="bg-zinc-900/50 rounded-xl p-6 text-center border-2 border-green-500/30">
              <p className="text-zinc-400 text-sm mb-2">15 Referrals/Month</p>
              <p className="text-3xl font-bold text-white mb-1">$2,205</p>
              <p className="text-green-400 text-sm">$26,460/year</p>
            </div>
            <div className="bg-zinc-900/50 rounded-xl p-6 text-center">
              <p className="text-zinc-400 text-sm mb-2">30 Referrals/Month</p>
              <p className="text-3xl font-bold text-white mb-1">$4,410</p>
              <p className="text-green-400 text-sm">$52,920/year</p>
            </div>
          </div>
          <p className="text-center text-zinc-500 text-xs mt-4">
            Based on 30% commission on $49/month plan with 100% retention
          </p>
        </div>

        {/* FAQs */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white text-center mb-8">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {faqs.map((faq) => (
              <div key={faq.q} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                <h3 className="text-white font-semibold mb-2">{faq.q}</h3>
                <p className="text-zinc-400 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to Partner?</h2>
          <p className="text-zinc-400 mb-6 max-w-xl mx-auto">
            Join 200+ partners earning recurring revenue while making the web more accessible.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact?type=partner"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-500 hover:to-emerald-400 text-white font-semibold rounded-xl transition-all shadow-lg shadow-green-500/25"
            >
              Apply Now
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold rounded-xl transition-colors"
            >
              Schedule a Call
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-8 mt-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-6 text-sm">
            <Link href="/" className="text-zinc-400 hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/tools" className="text-zinc-400 hover:text-white transition-colors">
              Free Tools
            </Link>
            <Link href="/pricing" className="text-zinc-400 hover:text-white transition-colors">
              Pricing
            </Link>
            <Link href="/contact" className="text-zinc-400 hover:text-white transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
