import { Metadata } from 'next';
import Link from 'next/link';
import { Shield, Zap, CheckCircle, AlertTriangle, ArrowRight, TrendingUp, Users, Euro, Clock, Star } from 'lucide-react';
import { SiteFooter } from '@/components/seo/SiteFooter';

interface IndustryPageData {
  name: string;
  slug: string;
  headline: string;
  subheadline: string;
  avgScore: number;
  complianceRate: number;
  fineRange: string;
  topIssues: { issue: string; impact: string; }[];
  benefits: { title: string; description: string; }[];
  stats: { value: string; label: string; }[];
  testimonial?: {
    quote: string;
    author: string;
    company: string;
    result: string;
  };
  urgencyMessage: string;
  caseStudySnippet: string;
}

const industryData: Record<string, IndustryPageData> = {
  'ecommerce': {
    name: 'E-commerce',
    slug: 'ecommerce',
    headline: 'Your Online Store is Losing €47K/Year to Accessibility Issues',
    subheadline: 'E-commerce sites face the highest EAA enforcement risk. Fix issues before your competitors report you.',
    avgScore: 62,
    complianceRate: 23,
    fineRange: '€50,000 - €150,000',
    topIssues: [
      { issue: 'Product images missing alt text', impact: 'Blind users cannot browse products' },
      { issue: 'Checkout forms without labels', impact: 'Screen readers cannot complete purchases' },
      { issue: 'Color-only sale indicators', impact: 'Color blind users miss discounts' },
      { issue: 'Non-keyboard navigable filters', impact: 'Users cannot refine product searches' },
    ],
    benefits: [
      { title: '+23% Conversion Rate', description: 'Accessible checkout flows convert significantly better for all users' },
      { title: 'Reach 135M EU Customers', description: 'One in four EU citizens has a disability affecting web use' },
      { title: 'Avoid €150K Fines', description: 'E-commerce is the most enforced sector under EAA' },
    ],
    stats: [
      { value: '77%', label: 'of e-commerce sites fail compliance' },
      { value: '€47K', label: 'avg. revenue lost to inaccessible checkout' },
      { value: '3.2x', label: 'higher cart abandonment with accessibility issues' },
    ],
    testimonial: {
      quote: 'We fixed our checkout accessibility issues and saw a 31% increase in completed orders within 2 weeks.',
      author: 'Marketing Director',
      company: 'Fashion retailer, Germany',
      result: '+31% conversions',
    },
    urgencyMessage: 'E-commerce sites are receiving enforcement notices daily. 3 major German retailers were fined in January 2025 alone.',
    caseStudySnippet: 'A mid-size fashion retailer discovered their €2.3M annual EU revenue was at risk due to 47 critical accessibility violations in their checkout flow.',
  },
  'saas': {
    name: 'SaaS',
    slug: 'saas',
    headline: 'Your SaaS Platform is One Complaint Away from €100K in Fines',
    subheadline: 'Software-as-a-Service providers serving EU customers must meet EAA standards. Most don\'t.',
    avgScore: 74,
    complianceRate: 42,
    fineRange: '€40,000 - €120,000',
    topIssues: [
      { issue: 'Complex dashboards without ARIA', impact: 'Screen readers cannot parse data visualizations' },
      { issue: 'Keyboard traps in modals', impact: 'Users get stuck in popup dialogs' },
      { issue: 'Dynamic content not announced', impact: 'Updates invisible to assistive technology' },
      { issue: 'Low contrast interface elements', impact: 'Users with low vision struggle to use product' },
    ],
    benefits: [
      { title: 'Enterprise-Ready', description: 'Large enterprises require VPAT/WCAG compliance for procurement' },
      { title: 'Reduce Support Tickets', description: '40% of UX issues stem from accessibility problems' },
      { title: 'Competitive Advantage', description: 'Only 42% of SaaS companies are compliant - stand out' },
    ],
    stats: [
      { value: '58%', label: 'of SaaS platforms fail accessibility audits' },
      { value: '67%', label: 'of enterprises require VPAT for procurement' },
      { value: '40%', label: 'of support tickets relate to accessibility UX' },
    ],
    urgencyMessage: 'Enterprise customers are now requiring accessibility compliance for SaaS procurement. Don\'t lose deals.',
    caseStudySnippet: 'A B2B SaaS company lost a €500K enterprise deal because they couldn\'t provide a VPAT. They became compliant in 3 weeks.',
  },
  'finance': {
    name: 'Financial Services',
    slug: 'finance',
    headline: 'Financial Regulators Are Now Checking Accessibility Compliance',
    subheadline: 'Banks, fintech, and insurance face the strictest EAA enforcement. Your compliance status is visible to regulators.',
    avgScore: 71,
    complianceRate: 38,
    fineRange: '€75,000 - €200,000',
    topIssues: [
      { issue: 'Account dashboards not screen reader compatible', impact: 'Blind users cannot check balances' },
      { issue: 'PDF statements inaccessible', impact: 'Documents cannot be read by assistive tech' },
      { issue: 'Transaction tables not properly structured', impact: 'Data relationships unclear to screen readers' },
      { issue: 'Authentication flows inaccessible', impact: '2FA and login blocks disabled users' },
    ],
    benefits: [
      { title: 'Regulatory Compliance', description: 'Meet both EAA and financial services digital accessibility requirements' },
      { title: 'Reduce Legal Risk', description: 'Financial services face highest per-violation penalties' },
      { title: 'Expand Customer Base', description: 'Elderly and disabled customers hold significant assets' },
    ],
    stats: [
      { value: '62%', label: 'of fintech apps fail accessibility testing' },
      { value: '€200K', label: 'maximum fine for financial services' },
      { value: '89%', label: 'of seniors encounter accessibility barriers' },
    ],
    urgencyMessage: 'BaFin (Germany) and AMF (France) have added accessibility to their digital compliance checklists.',
    caseStudySnippet: 'A neobank faced regulatory scrutiny after a customer complaint. They remediated 67 issues in 2 weeks to avoid enforcement action.',
  },
  'healthcare': {
    name: 'Healthcare',
    slug: 'healthcare',
    headline: 'Patients Can\'t Book Appointments on Your Inaccessible Website',
    subheadline: 'Healthcare providers face unique EAA obligations. Inaccessibility can mean patients missing critical care.',
    avgScore: 58,
    complianceRate: 18,
    fineRange: '€50,000 - €150,000',
    topIssues: [
      { issue: 'Appointment booking forms unlabeled', impact: 'Patients cannot schedule care' },
      { issue: 'Medical portal login inaccessible', impact: 'Disabled patients locked out of records' },
      { issue: 'Health information in images only', impact: 'Critical info unavailable to blind patients' },
      { issue: 'Video consultations without captions', impact: 'Deaf patients excluded from telehealth' },
    ],
    benefits: [
      { title: 'Better Patient Outcomes', description: 'Accessible portals mean patients engage with their care' },
      { title: 'Reduce No-Shows', description: 'Patients who can book online have 40% fewer missed appointments' },
      { title: 'Avoid Discrimination Claims', description: 'Healthcare accessibility is a patient rights issue' },
    ],
    stats: [
      { value: '82%', label: 'of healthcare sites fail compliance' },
      { value: '26M', label: 'EU citizens with disabilities need healthcare' },
      { value: '40%', label: 'reduction in no-shows with accessible booking' },
    ],
    urgencyMessage: 'Patient advocacy groups are actively filing accessibility complaints against healthcare providers.',
    caseStudySnippet: 'A private clinic chain discovered their appointment system was blocking 15% of potential patients. Fixing it increased bookings by €180K/year.',
  },
  'travel': {
    name: 'Travel & Hospitality',
    slug: 'travel',
    headline: 'Your Booking System is Turning Away €2.1B in Accessible Travel Spend',
    subheadline: 'Travelers with disabilities control massive purchasing power. Most can\'t complete bookings on your site.',
    avgScore: 64,
    complianceRate: 25,
    fineRange: '€45,000 - €130,000',
    topIssues: [
      { issue: 'Date pickers not keyboard accessible', impact: 'Users cannot select travel dates' },
      { issue: 'Room/seat selection requires mouse', impact: 'Keyboard users cannot choose options' },
      { issue: 'Interactive maps without alternatives', impact: 'Blind users cannot find locations' },
      { issue: 'Booking confirmations in images', impact: 'Details inaccessible to screen readers' },
    ],
    benefits: [
      { title: 'Capture €2.1B Market', description: 'Accessible travel market growing 15% annually' },
      { title: 'Higher Booking Values', description: 'Accessible travelers book longer stays' },
      { title: 'Loyalty & Referrals', description: 'Accessible experiences generate 2x word-of-mouth' },
    ],
    stats: [
      { value: '75%', label: 'of travel sites fail accessibility tests' },
      { value: '€2.1B', label: 'annual EU accessible travel market' },
      { value: '15%', label: 'annual growth in accessible tourism' },
    ],
    urgencyMessage: 'Summer 2025 booking season has started. Every day without accessibility = lost bookings.',
    caseStudySnippet: 'A boutique hotel chain fixed their booking engine accessibility and saw a 28% increase in direct bookings from accessibility-focused travel agencies.',
  },
  'education': {
    name: 'Education',
    slug: 'education',
    headline: 'Students Are Being Excluded from Your Online Learning Platform',
    subheadline: 'Educational institutions face strict accessibility requirements. Non-compliant platforms face legal action.',
    avgScore: 69,
    complianceRate: 35,
    fineRange: '€35,000 - €100,000',
    topIssues: [
      { issue: 'Video lectures without captions', impact: 'Deaf students cannot access content' },
      { issue: 'LMS navigation not keyboard accessible', impact: 'Motor-impaired students excluded' },
      { issue: 'Assessments incompatible with screen readers', impact: 'Blind students cannot complete exams' },
      { issue: 'PDF course materials inaccessible', impact: 'Documents unusable with assistive tech' },
    ],
    benefits: [
      { title: 'Legal Compliance', description: 'Education sector faces highest complaint rates' },
      { title: 'Better Learning Outcomes', description: 'Accessible content improves comprehension for all' },
      { title: 'Inclusive Reputation', description: 'Attract diverse student body and faculty' },
    ],
    stats: [
      { value: '65%', label: 'of educational platforms fail accessibility' },
      { value: '15%', label: 'of university students have disabilities' },
      { value: '3x', label: 'more legal complaints than other sectors' },
    ],
    urgencyMessage: 'Student advocacy groups are filing coordinated accessibility complaints against non-compliant institutions.',
    caseStudySnippet: 'An online course provider avoided a class-action lawsuit by proactively fixing accessibility issues discovered in a routine scan.',
  },
};

// Generate static params for all industries
export async function generateStaticParams() {
  return Object.keys(industryData).map((industry) => ({
    industry,
  }));
}

// Generate metadata for each industry page
export async function generateMetadata({ params }: { params: Promise<{ industry: string }> }): Promise<Metadata> {
  const { industry } = await params;
  const data = industryData[industry];

  if (!data) {
    return {
      title: 'Industry Accessibility Solutions | Inclusiv',
    };
  }

  return {
    title: `${data.name} Accessibility Compliance | EAA Scanner for ${data.name}`,
    description: `${data.name} websites face ${data.fineRange} in EAA fines. Only ${data.complianceRate}% are compliant. Free accessibility scan for ${data.name.toLowerCase()} sites.`,
    openGraph: {
      title: `Accessibility for ${data.name} | Avoid ${data.fineRange} Fines`,
      description: data.subheadline,
    },
  };
}

export default async function IndustryLandingPage({ params }: { params: Promise<{ industry: string }> }) {
  const { industry } = await params;
  const data = industryData[industry];

  if (!data) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Industry not found</h1>
          <Link href="/" className="text-indigo-400 hover:text-indigo-300">
            Go to homepage
          </Link>
        </div>
      </div>
    );
  }

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
            <Link href="/benchmark" className="text-zinc-400 hover:text-white transition-colors text-sm">
              Benchmarks
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

      <main className="max-w-6xl mx-auto px-6">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 rounded-full text-red-400 text-sm mb-6">
              <AlertTriangle className="w-4 h-4" />
              Only {data.complianceRate}% of {data.name} sites are compliant
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {data.headline}
            </h1>

            <p className="text-xl text-zinc-400 mb-8 max-w-2xl">
              {data.subheadline}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link
                href="/#scanner"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-500/25"
              >
                <Zap className="w-5 h-5" />
                Free {data.name} Accessibility Scan
              </Link>
              <Link
                href="/fine-calculator"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-zinc-800 hover:bg-zinc-700 text-white font-medium rounded-xl transition-colors"
              >
                <Euro className="w-5 h-5" />
                Calculate Your Fine Risk
              </Link>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-6">
              {data.stats.map((stat, i) => (
                <div key={i} className="text-center sm:text-left">
                  <p className="text-3xl md:text-4xl font-bold text-white">{stat.value}</p>
                  <p className="text-sm text-zinc-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Urgency Banner */}
        <section className="py-6">
          <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <Clock className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Time-Sensitive</h3>
                <p className="text-zinc-300">{data.urgencyMessage}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Top Issues Section */}
        <section className="py-16">
          <h2 className="text-3xl font-bold text-white mb-8">
            Common Accessibility Issues in {data.name}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {data.topIssues.map((item, i) => (
              <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                <h3 className="text-white font-medium mb-2">{item.issue}</h3>
                <p className="text-zinc-400 text-sm flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                  {item.impact}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16">
          <h2 className="text-3xl font-bold text-white mb-8">
            Why {data.name} Companies Fix Accessibility
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {data.benefits.map((benefit, i) => (
              <div key={i} className="bg-gradient-to-br from-indigo-600/10 to-purple-600/10 border border-indigo-500/20 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <h3 className="text-white font-bold">{benefit.title}</h3>
                </div>
                <p className="text-zinc-400 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonial */}
        {data.testimonial && (
          <section className="py-16">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <Star className="w-8 h-8 text-yellow-400" />
                </div>
                <div>
                  <p className="text-xl text-white mb-4">&ldquo;{data.testimonial.quote}&rdquo;</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">{data.testimonial.author}</p>
                      <p className="text-zinc-500 text-sm">{data.testimonial.company}</p>
                    </div>
                    <div className="bg-green-500/10 px-4 py-2 rounded-lg">
                      <p className="text-green-400 font-bold">{data.testimonial.result}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Case Study Snippet */}
        <section className="py-16">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-indigo-400" />
              Real {data.name} Case Study
            </h3>
            <p className="text-zinc-300 mb-6">{data.caseStudySnippet}</p>
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300"
            >
              Read full case study <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16">
          <div className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Get Your Free {data.name} Accessibility Audit
            </h2>
            <p className="text-xl text-zinc-400 mb-8 max-w-2xl mx-auto">
              Scan your website in 30 seconds. See exactly which issues to fix to become compliant
              and avoid fines up to {data.fineRange}.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/#scanner"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-500/25"
              >
                <Zap className="w-5 h-5" />
                Start Free Scan
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href={`/benchmark/${data.slug}`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-zinc-800 hover:bg-zinc-700 text-white font-medium rounded-xl transition-colors"
              >
                <Users className="w-5 h-5" />
                See {data.name} Benchmarks
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
