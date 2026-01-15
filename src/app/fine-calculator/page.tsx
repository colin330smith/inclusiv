'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Shield, Calculator, AlertTriangle, TrendingUp, Share2, Twitter, Linkedin, Copy, Check, ArrowRight, Euro, Users, Globe, Building2 } from 'lucide-react';
import { SiteFooter } from '@/components/seo/SiteFooter';
import { EAACountdown } from '@/components/EAACountdown';

interface CalculationResult {
  baseFine: number;
  revenueMultiplier: number;
  totalPotentialFine: number;
  dailyRisk: number;
  yearlyRisk: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  complianceCost: number;
  roi: number;
}

const revenueRanges = [
  { label: 'Under €100K', value: 50000, multiplier: 1 },
  { label: '€100K - €500K', value: 250000, multiplier: 1.2 },
  { label: '€500K - €1M', value: 750000, multiplier: 1.5 },
  { label: '€1M - €5M', value: 2500000, multiplier: 2 },
  { label: '€5M - €10M', value: 7500000, multiplier: 2.5 },
  { label: '€10M - €50M', value: 25000000, multiplier: 3 },
  { label: '€50M - €100M', value: 75000000, multiplier: 4 },
  { label: 'Over €100M', value: 150000000, multiplier: 5 },
];

const euCountries = [
  { code: 'DE', name: 'Germany', baseFine: 100000 },
  { code: 'FR', name: 'France', baseFine: 50000 },
  { code: 'IT', name: 'Italy', baseFine: 75000 },
  { code: 'ES', name: 'Spain', baseFine: 60000 },
  { code: 'NL', name: 'Netherlands', baseFine: 80000 },
  { code: 'BE', name: 'Belgium', baseFine: 55000 },
  { code: 'AT', name: 'Austria', baseFine: 70000 },
  { code: 'SE', name: 'Sweden', baseFine: 90000 },
  { code: 'PL', name: 'Poland', baseFine: 40000 },
  { code: 'PT', name: 'Portugal', baseFine: 45000 },
  { code: 'IE', name: 'Ireland', baseFine: 65000 },
  { code: 'DK', name: 'Denmark', baseFine: 85000 },
  { code: 'FI', name: 'Finland', baseFine: 75000 },
  { code: 'CZ', name: 'Czech Republic', baseFine: 35000 },
  { code: 'GR', name: 'Greece', baseFine: 50000 },
  { code: 'Other', name: 'Other EU Country', baseFine: 60000 },
];

const industries = [
  { name: 'E-commerce', riskMultiplier: 2.5 },
  { name: 'Financial Services', riskMultiplier: 3 },
  { name: 'Healthcare', riskMultiplier: 2.8 },
  { name: 'Travel & Hospitality', riskMultiplier: 2.2 },
  { name: 'SaaS / Technology', riskMultiplier: 2 },
  { name: 'Education', riskMultiplier: 1.8 },
  { name: 'Professional Services', riskMultiplier: 1.5 },
  { name: 'Media & Entertainment', riskMultiplier: 1.7 },
  { name: 'Other', riskMultiplier: 1.5 },
];

export default function FineCalculatorPage() {
  const [selectedRevenue, setSelectedRevenue] = useState(revenueRanges[3]);
  const [selectedCountry, setSelectedCountry] = useState(euCountries[0]);
  const [selectedIndustry, setSelectedIndustry] = useState(industries[0]);
  const [euVisitors, setEuVisitors] = useState(30);
  const [hasExistingComplaints, setHasExistingComplaints] = useState(false);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const calculateFine = () => {
    const baseFine = selectedCountry.baseFine;
    const revenueMultiplier = selectedRevenue.multiplier;
    const industryMultiplier = selectedIndustry.riskMultiplier;
    const visitorMultiplier = euVisitors > 50 ? 1.5 : euVisitors > 20 ? 1.2 : 1;
    const complaintMultiplier = hasExistingComplaints ? 1.5 : 1;

    const totalPotentialFine = Math.round(
      baseFine * revenueMultiplier * industryMultiplier * visitorMultiplier * complaintMultiplier
    );

    // Daily risk calculation based on enforcement probability
    const enforcementProbability = 0.15; // 15% chance of enforcement action per year
    const dailyRisk = Math.round((totalPotentialFine * enforcementProbability) / 365);
    const yearlyRisk = Math.round(totalPotentialFine * enforcementProbability);

    // Compliance cost estimate
    const complianceCost = selectedRevenue.value < 1000000 ? 2388 :
                          selectedRevenue.value < 10000000 ? 4788 : 9588;

    const roi = Math.round(((yearlyRisk - complianceCost) / complianceCost) * 100);

    let riskLevel: 'low' | 'medium' | 'high' | 'critical' = 'low';
    if (totalPotentialFine > 150000) riskLevel = 'critical';
    else if (totalPotentialFine > 80000) riskLevel = 'high';
    else if (totalPotentialFine > 40000) riskLevel = 'medium';

    setResult({
      baseFine,
      revenueMultiplier,
      totalPotentialFine,
      dailyRisk,
      yearlyRisk,
      riskLevel,
      complianceCost,
      roi,
    });
    setShowResult(true);
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'critical': return 'text-red-500';
      case 'high': return 'text-orange-500';
      case 'medium': return 'text-yellow-500';
      default: return 'text-green-500';
    }
  };

  const getRiskBg = (level: string) => {
    switch (level) {
      case 'critical': return 'bg-red-500/10 border-red-500/30';
      case 'high': return 'bg-orange-500/10 border-orange-500/30';
      case 'medium': return 'bg-yellow-500/10 border-yellow-500/30';
      default: return 'bg-green-500/10 border-green-500/30';
    }
  };

  const getShareUrl = () => {
    if (typeof window === 'undefined' || !result) return '';
    return `${window.location.origin}/fine-calculator`;
  };

  const getShareText = () => {
    if (!result) return '';
    return `My business could face up to €${result.totalPotentialFine.toLocaleString()} in EAA accessibility fines. Calculate your risk:`;
  };

  const copyLink = () => {
    navigator.clipboard.writeText(getShareUrl());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="border-b border-zinc-800">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-indigo-500" />
            <span className="text-xl font-bold text-white">Inclusiv</span>
          </Link>
          <Link
            href="/"
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-colors text-sm"
          >
            Free Scan
          </Link>
        </div>
      </header>

      {/* EAA Deadline Urgency Banner */}
      <EAACountdown variant="banner" showCTA={true} />

      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            EAA Fine <span className="text-red-400">Calculator</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Calculate your potential European Accessibility Act fines based on your business profile.
            See your daily risk exposure and ROI of compliance.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Calculator Form */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-indigo-400" />
              Your Business Profile
            </h2>

            {/* Annual Revenue */}
            <div className="mb-6">
              <label className="block text-white font-medium mb-3 flex items-center gap-2">
                <Euro className="w-4 h-4 text-zinc-400" />
                Annual Revenue (EUR)
              </label>
              <div className="grid grid-cols-2 gap-2">
                {revenueRanges.map((range) => (
                  <button
                    key={range.label}
                    onClick={() => setSelectedRevenue(range)}
                    className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      selectedRevenue.label === range.label
                        ? 'bg-indigo-600 text-white'
                        : 'bg-zinc-800 text-zinc-400 hover:text-white'
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Primary EU Market */}
            <div className="mb-6">
              <label className="block text-white font-medium mb-3 flex items-center gap-2">
                <Globe className="w-4 h-4 text-zinc-400" />
                Primary EU Market
              </label>
              <select
                value={selectedCountry.code}
                onChange={(e) => setSelectedCountry(euCountries.find(c => c.code === e.target.value) || euCountries[0])}
                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-indigo-500"
              >
                {euCountries.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Industry */}
            <div className="mb-6">
              <label className="block text-white font-medium mb-3 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-zinc-400" />
                Industry
              </label>
              <select
                value={selectedIndustry.name}
                onChange={(e) => setSelectedIndustry(industries.find(i => i.name === e.target.value) || industries[0])}
                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-indigo-500"
              >
                {industries.map((industry) => (
                  <option key={industry.name} value={industry.name}>
                    {industry.name}
                  </option>
                ))}
              </select>
            </div>

            {/* EU Visitors */}
            <div className="mb-6">
              <label className="block text-white font-medium mb-3 flex items-center gap-2">
                <Users className="w-4 h-4 text-zinc-400" />
                EU Traffic: {euVisitors}%
              </label>
              <input
                type="range"
                min="1"
                max="100"
                value={euVisitors}
                onChange={(e) => setEuVisitors(Number(e.target.value))}
                className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
              <div className="flex justify-between text-xs text-zinc-500 mt-1">
                <span>1%</span>
                <span>100%</span>
              </div>
            </div>

            {/* Existing Complaints */}
            <div className="mb-8">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasExistingComplaints}
                  onChange={(e) => setHasExistingComplaints(e.target.checked)}
                  className="w-5 h-5 rounded border-zinc-600 bg-zinc-800 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-zinc-300">
                  Previous accessibility complaints or legal notices
                </span>
              </label>
            </div>

            <button
              onClick={calculateFine}
              className="w-full py-4 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <Calculator className="w-5 h-5" />
              Calculate My Risk
            </button>
          </div>

          {/* Results Panel */}
          <div className={`transition-all duration-500 ${showResult && result ? 'opacity-100' : 'opacity-50'}`}>
            {result ? (
              <div className="space-y-6">
                {/* Risk Level Banner */}
                <div className={`rounded-2xl p-6 border ${getRiskBg(result.riskLevel)}`}>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-zinc-400 text-sm uppercase tracking-wide">Risk Level</span>
                    <span className={`text-lg font-bold uppercase ${getRiskColor(result.riskLevel)}`}>
                      {result.riskLevel}
                    </span>
                  </div>
                  <div className="flex items-end gap-2">
                    <span className={`text-5xl font-bold ${getRiskColor(result.riskLevel)}`}>
                      €{result.totalPotentialFine.toLocaleString()}
                    </span>
                    <span className="text-zinc-500 mb-2">max fine</span>
                  </div>
                </div>

                {/* Daily Risk */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                  <h3 className="text-white font-medium mb-4">Daily Risk Exposure</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-zinc-800 rounded-xl p-4">
                      <p className="text-zinc-400 text-sm mb-1">Per Day</p>
                      <p className="text-2xl font-bold text-orange-400">€{result.dailyRisk.toLocaleString()}</p>
                    </div>
                    <div className="bg-zinc-800 rounded-xl p-4">
                      <p className="text-zinc-400 text-sm mb-1">Per Year</p>
                      <p className="text-2xl font-bold text-red-400">€{result.yearlyRisk.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                {/* ROI of Compliance */}
                <div className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 border border-green-500/30 rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="w-5 h-5 text-green-400" />
                    <h3 className="text-white font-medium">ROI of Compliance</h3>
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-zinc-400 text-sm mb-1">Compliance Cost</p>
                      <p className="text-xl font-bold text-white">€{result.complianceCost.toLocaleString()}/year</p>
                    </div>
                    <div className="text-right">
                      <p className="text-zinc-400 text-sm mb-1">Your ROI</p>
                      <p className="text-3xl font-bold text-green-400">{result.roi}%</p>
                    </div>
                  </div>
                  <p className="text-zinc-400 text-sm mt-4">
                    Compliance pays for itself {Math.round(result.roi / 100)}x over vs. risk of fines
                  </p>
                </div>

                {/* Share Results */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Share2 className="w-5 h-5 text-indigo-400" />
                    <h3 className="text-white font-medium">Share Your Risk Assessment</h3>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <a
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(getShareText())}&url=${encodeURIComponent(getShareUrl())}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-4 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-xl transition-colors"
                    >
                      <Twitter className="w-4 h-4 text-zinc-300" />
                    </a>
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(getShareUrl())}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-4 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-xl transition-colors"
                    >
                      <Linkedin className="w-4 h-4 text-zinc-300" />
                    </a>
                    <button
                      onClick={copyLink}
                      className="flex items-center justify-center gap-2 px-4 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-xl transition-colors"
                    >
                      {copied ? (
                        <Check className="w-4 h-4 text-green-400" />
                      ) : (
                        <Copy className="w-4 h-4 text-zinc-300" />
                      )}
                    </button>
                  </div>
                </div>

                {/* CTA */}
                <Link
                  href="/"
                  className="block w-full py-4 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-bold rounded-xl transition-all text-center"
                >
                  <span className="flex items-center justify-center gap-2">
                    <Shield className="w-5 h-5" />
                    Get Compliant Now - Free Scan
                    <ArrowRight className="w-5 h-5" />
                  </span>
                </Link>
              </div>
            ) : (
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-12 text-center">
                <Calculator className="w-16 h-16 text-zinc-700 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-zinc-500 mb-2">
                  Your Risk Assessment
                </h3>
                <p className="text-zinc-600">
                  Fill in your business details and click calculate to see your potential EAA fine exposure.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h3 className="text-white font-bold mb-3">What is the EAA?</h3>
            <p className="text-zinc-400 text-sm">
              The European Accessibility Act requires all digital products and services sold to EU customers
              to meet WCAG 2.1 AA standards. Non-compliance can result in significant fines.
            </p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h3 className="text-white font-bold mb-3">Who Enforces It?</h3>
            <p className="text-zinc-400 text-sm">
              Each EU member state has designated market surveillance authorities. Germany, France,
              and the Netherlands have been most active in enforcement actions since June 2025.
            </p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h3 className="text-white font-bold mb-3">How to Get Compliant</h3>
            <p className="text-zinc-400 text-sm">
              Start with a free accessibility scan to identify issues. Most businesses can achieve
              compliance within 2-4 weeks with proper remediation guidance.
            </p>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Don&apos;t Wait for a Fine
          </h2>
          <p className="text-zinc-400 mb-6 max-w-xl mx-auto">
            Companies that proactively fix accessibility issues before complaints
            face significantly lower penalties. Start your free scan now.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-500/25"
          >
            <Shield className="w-5 h-5" />
            Free Accessibility Scan
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
