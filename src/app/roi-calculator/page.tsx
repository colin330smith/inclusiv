import { Metadata } from 'next';
import Link from 'next/link';
import { Shield, Calculator, TrendingUp, DollarSign, Users, Scale, AlertTriangle, CheckCircle } from 'lucide-react';
import ROICalculator from '@/components/ROICalculator';

export const metadata: Metadata = {
  title: 'Accessibility ROI Calculator | Calculate Your Compliance Risk',
  description: 'Calculate the true cost of inaccessible websites. Estimate lawsuit risk, lost revenue, and see ROI from accessibility investment.',
  openGraph: {
    title: 'Accessibility ROI Calculator',
    description: 'Calculate lawsuit risk and revenue impact of web accessibility.',
  },
};

const stats = [
  {
    icon: Scale,
    stat: '$2.7B+',
    label: 'ADA Lawsuit Settlements (2023)',
    color: 'text-red-400',
  },
  {
    icon: Users,
    stat: '1.3B',
    label: 'People with Disabilities Globally',
    color: 'text-blue-400',
  },
  {
    icon: DollarSign,
    stat: '$13T',
    label: 'Annual Disposable Income',
    color: 'text-green-400',
  },
  {
    icon: AlertTriangle,
    stat: '4,605',
    label: 'ADA Web Lawsuits Filed (2023)',
    color: 'text-yellow-400',
  },
];

const riskFactors = [
  {
    title: 'E-commerce Sites',
    risk: 'Highest Risk',
    description: 'Online stores are the #1 target for ADA lawsuits due to transaction barriers.',
    riskLevel: 95,
  },
  {
    title: 'Healthcare & Finance',
    risk: 'Very High Risk',
    description: 'Regulated industries face stricter compliance requirements.',
    riskLevel: 85,
  },
  {
    title: 'SaaS & Software',
    risk: 'High Risk',
    description: 'B2B products increasingly required to be accessible for enterprise contracts.',
    riskLevel: 70,
  },
  {
    title: 'Content & Media',
    risk: 'Moderate Risk',
    description: 'Video/audio content needs captions, transcripts, and descriptions.',
    riskLevel: 55,
  },
];

export default function ROICalculatorPage() {
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
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 rounded-full text-red-400 text-sm mb-6">
            <Calculator className="w-4 h-4" />
            Free Risk Assessment
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            What&apos;s Your <span className="text-red-400">Accessibility Risk</span>?
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Calculate the true cost of an inaccessible website. Lawsuit risk, lost revenue, compliance fines—know your exposure.
          </p>
        </div>

        {/* Stats Banner */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-center">
                <Icon className={`w-6 h-6 ${stat.color} mx-auto mb-2`} />
                <div className="text-2xl font-bold text-white">{stat.stat}</div>
                <div className="text-zinc-400 text-xs">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Calculator */}
        <div className="mb-16">
          <ROICalculator />
        </div>

        {/* Risk Factors */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white text-center mb-8">Industry Risk Levels</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {riskFactors.map((factor) => (
              <div key={factor.title} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-white">{factor.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    factor.riskLevel >= 80 ? 'bg-red-500/10 text-red-400' :
                    factor.riskLevel >= 60 ? 'bg-yellow-500/10 text-yellow-400' :
                    'bg-green-500/10 text-green-400'
                  }`}>
                    {factor.risk}
                  </span>
                </div>
                <p className="text-zinc-400 text-sm mb-4">{factor.description}</p>
                <div className="w-full bg-zinc-800 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      factor.riskLevel >= 80 ? 'bg-red-500' :
                      factor.riskLevel >= 60 ? 'bg-yellow-500' :
                      'bg-green-500'
                    }`}
                    style={{ width: `${factor.riskLevel}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits of Compliance */}
        <div className="bg-gradient-to-r from-green-600/10 to-emerald-600/10 border border-green-500/20 rounded-2xl p-8 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-8 h-8 text-green-400" />
            <h2 className="text-2xl font-bold text-white">The Business Case for Accessibility</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
              <div>
                <p className="text-white font-medium">15% Market Expansion</p>
                <p className="text-zinc-400 text-sm">Reach 1B+ users with disabilities</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
              <div>
                <p className="text-white font-medium">Better SEO Rankings</p>
                <p className="text-zinc-400 text-sm">Accessible sites rank higher on Google</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
              <div>
                <p className="text-white font-medium">Lawsuit Protection</p>
                <p className="text-zinc-400 text-sm">Documented compliance effort as defense</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
              <div>
                <p className="text-white font-medium">Enterprise Contracts</p>
                <p className="text-zinc-400 text-sm">Required for government & large corp deals</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
              <div>
                <p className="text-white font-medium">Brand Reputation</p>
                <p className="text-zinc-400 text-sm">Demonstrate commitment to inclusion</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
              <div>
                <p className="text-white font-medium">EAA Compliance</p>
                <p className="text-zinc-400 text-sm">Required for EU market access by June 2025</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-4">Don&apos;t Wait for a Lawsuit</h2>
          <p className="text-zinc-400 mb-6 max-w-xl mx-auto">
            The average ADA lawsuit settlement is $25,000-$100,000+. Proactive accessibility costs a fraction of that and opens your business to millions of new customers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-500/25"
            >
              Free Accessibility Scan
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold rounded-xl transition-colors"
            >
              View Pricing
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
