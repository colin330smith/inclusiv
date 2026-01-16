'use client';

import { useState, useEffect } from 'react';
import { Calculator, DollarSign, AlertTriangle, TrendingUp, Shield, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface CalculatorInputs {
  monthlyVisitors: number;
  averageOrderValue: number;
  conversionRate: number;
  industry: string;
  hasBeenSued: boolean;
}

interface ROIResults {
  annualRevenue: number;
  potentialLostRevenue: number;
  lawsuitRisk: number;
  potentialSettlement: number;
  totalRiskExposure: number;
  roiMultiple: number;
  breakEvenDays: number;
}

const industries = [
  { value: 'ecommerce', label: 'E-commerce / Retail', riskMultiplier: 1.5 },
  { value: 'healthcare', label: 'Healthcare', riskMultiplier: 1.4 },
  { value: 'finance', label: 'Finance / Banking', riskMultiplier: 1.3 },
  { value: 'education', label: 'Education', riskMultiplier: 1.2 },
  { value: 'saas', label: 'SaaS / Software', riskMultiplier: 1.1 },
  { value: 'media', label: 'Media / Entertainment', riskMultiplier: 1.0 },
  { value: 'other', label: 'Other', riskMultiplier: 0.9 },
];

const formatCurrency = (amount: number): string => {
  if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(1)}M`;
  }
  if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(0)}K`;
  }
  return `$${amount.toFixed(0)}`;
};

export default function ROICalculator() {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    monthlyVisitors: 50000,
    averageOrderValue: 75,
    conversionRate: 2,
    industry: 'ecommerce',
    hasBeenSued: false,
  });

  const [results, setResults] = useState<ROIResults | null>(null);
  const [showResults, setShowResults] = useState(false);

  const calculateROI = () => {
    const industry = industries.find(i => i.value === inputs.industry);
    const riskMultiplier = industry?.riskMultiplier || 1;

    // Annual revenue calculation
    const monthlyConversions = inputs.monthlyVisitors * (inputs.conversionRate / 100);
    const monthlyRevenue = monthlyConversions * inputs.averageOrderValue;
    const annualRevenue = monthlyRevenue * 12;

    // 15% of population has disabilities, but only fraction use assistive tech
    // Estimate 8% of visitors face accessibility barriers
    const barrierRate = 0.08;
    const lostConversionsMonthly = inputs.monthlyVisitors * barrierRate * (inputs.conversionRate / 100) * 0.6;
    const potentialLostRevenue = lostConversionsMonthly * inputs.averageOrderValue * 12;

    // Lawsuit risk calculation
    // Base risk: 1 in 1000 businesses get sued annually in high-risk industries
    const baseRiskPercentage = 0.1 * riskMultiplier;
    const visitorRiskBonus = Math.min(inputs.monthlyVisitors / 100000, 2); // Higher traffic = higher visibility
    const previousSuitPenalty = inputs.hasBeenSued ? 3 : 1;
    const lawsuitRisk = Math.min(baseRiskPercentage * visitorRiskBonus * previousSuitPenalty, 15);

    // Settlement estimation
    const baseSettlement = 25000;
    const revenueBasedSettlement = annualRevenue * 0.005; // 0.5% of annual revenue
    const potentialSettlement = Math.max(baseSettlement, Math.min(revenueBasedSettlement, 500000)) * riskMultiplier;

    // Total risk exposure
    const totalRiskExposure = potentialLostRevenue + (potentialSettlement * (lawsuitRisk / 100));

    // ROI calculation based on $49/month plan
    const annualInvestment = 49 * 12; // $588/year
    const roiMultiple = totalRiskExposure / annualInvestment;

    // Break-even calculation
    const dailyLostRevenue = potentialLostRevenue / 365;
    const dailyInvestment = annualInvestment / 365;
    const breakEvenDays = dailyLostRevenue > 0 ? Math.ceil(dailyInvestment / (dailyLostRevenue / 365 * 0.3)) : 30;

    setResults({
      annualRevenue,
      potentialLostRevenue,
      lawsuitRisk,
      potentialSettlement,
      totalRiskExposure,
      roiMultiple,
      breakEvenDays: Math.min(breakEvenDays, 365),
    });
    setShowResults(true);
  };

  useEffect(() => {
    // Auto-calculate on input change
    if (inputs.monthlyVisitors > 0 && inputs.averageOrderValue > 0) {
      calculateROI();
    }
  }, [inputs]);

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
      <div className="p-6 border-b border-zinc-800 bg-gradient-to-r from-indigo-600/10 to-purple-600/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-500/20 rounded-xl flex items-center justify-center">
            <Calculator className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Accessibility ROI Calculator</h2>
            <p className="text-zinc-400 text-sm">See your potential risk and savings</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Inputs */}
          <div className="space-y-6">
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Monthly Website Visitors
              </label>
              <input
                type="number"
                value={inputs.monthlyVisitors}
                onChange={(e) => setInputs({ ...inputs, monthlyVisitors: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                placeholder="50000"
              />
              <p className="text-zinc-500 text-xs mt-1">From Google Analytics or similar</p>
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Average Order Value ($)
              </label>
              <input
                type="number"
                value={inputs.averageOrderValue}
                onChange={(e) => setInputs({ ...inputs, averageOrderValue: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                placeholder="75"
              />
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Conversion Rate (%)
              </label>
              <input
                type="number"
                step="0.1"
                value={inputs.conversionRate}
                onChange={(e) => setInputs({ ...inputs, conversionRate: parseFloat(e.target.value) || 0 })}
                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                placeholder="2"
              />
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Industry
              </label>
              <select
                value={inputs.industry}
                onChange={(e) => setInputs({ ...inputs, industry: e.target.value })}
                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-indigo-500"
              >
                {industries.map((industry) => (
                  <option key={industry.value} value={industry.value}>
                    {industry.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="hasBeenSued"
                checked={inputs.hasBeenSued}
                onChange={(e) => setInputs({ ...inputs, hasBeenSued: e.target.checked })}
                className="w-5 h-5 rounded bg-zinc-800 border-zinc-700 text-indigo-500 focus:ring-indigo-500"
              />
              <label htmlFor="hasBeenSued" className="text-white text-sm">
                Previously received ADA demand letter or lawsuit
              </label>
            </div>
          </div>

          {/* Results */}
          <div>
            {showResults && results && (
              <div className="space-y-4">
                {/* Risk Score */}
                <div className="bg-zinc-800 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-zinc-400 text-sm">Your Risk Level</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      results.lawsuitRisk >= 5 ? 'bg-red-500/20 text-red-400' :
                      results.lawsuitRisk >= 2 ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-green-500/20 text-green-400'
                    }`}>
                      {results.lawsuitRisk >= 5 ? 'HIGH RISK' :
                       results.lawsuitRisk >= 2 ? 'MODERATE RISK' : 'LOWER RISK'}
                    </span>
                  </div>
                  <div className="w-full bg-zinc-700 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all ${
                        results.lawsuitRisk >= 5 ? 'bg-red-500' :
                        results.lawsuitRisk >= 2 ? 'bg-yellow-500' :
                        'bg-green-500'
                      }`}
                      style={{ width: `${Math.min(results.lawsuitRisk * 10, 100)}%` }}
                    />
                  </div>
                  <p className="text-zinc-500 text-xs mt-2">
                    {results.lawsuitRisk.toFixed(1)}% annual lawsuit probability
                  </p>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-zinc-800 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <DollarSign className="w-4 h-4 text-red-400" />
                      <span className="text-zinc-400 text-xs">Lost Revenue/Year</span>
                    </div>
                    <div className="text-2xl font-bold text-red-400">
                      {formatCurrency(results.potentialLostRevenue)}
                    </div>
                    <p className="text-zinc-500 text-xs">From inaccessible UX</p>
                  </div>

                  <div className="bg-zinc-800 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <AlertTriangle className="w-4 h-4 text-yellow-400" />
                      <span className="text-zinc-400 text-xs">Potential Settlement</span>
                    </div>
                    <div className="text-2xl font-bold text-yellow-400">
                      {formatCurrency(results.potentialSettlement)}
                    </div>
                    <p className="text-zinc-500 text-xs">If sued</p>
                  </div>
                </div>

                {/* Total Exposure */}
                <div className="bg-gradient-to-r from-red-600/10 to-orange-600/10 border border-red-500/20 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                    <span className="text-white font-semibold">Total Risk Exposure</span>
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">
                    {formatCurrency(results.totalRiskExposure)}
                  </div>
                  <p className="text-zinc-400 text-sm">Per year in potential losses</p>
                </div>

                {/* ROI */}
                <div className="bg-gradient-to-r from-green-600/10 to-emerald-600/10 border border-green-500/20 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-green-400" />
                    <span className="text-white font-semibold">Your Potential ROI</span>
                  </div>
                  <div className="text-3xl font-bold text-green-400 mb-1">
                    {results.roiMultiple.toFixed(0)}x
                  </div>
                  <p className="text-zinc-400 text-sm">
                    Return on $49/mo investment
                  </p>
                </div>

                {/* CTA */}
                <Link
                  href="/"
                  className="flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-500/25"
                >
                  <Shield className="w-5 h-5" />
                  Scan Your Site Free
                  <ArrowRight className="w-5 h-5" />
                </Link>

                <p className="text-center text-zinc-500 text-xs">
                  No credit card required • Results in 60 seconds
                </p>
              </div>
            )}

            {!showResults && (
              <div className="h-full flex items-center justify-center text-zinc-500">
                <p>Enter your details to see your risk assessment</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="px-6 py-4 bg-zinc-800/50 border-t border-zinc-800">
        <p className="text-zinc-500 text-xs text-center">
          This calculator provides estimates based on industry data and should not be considered legal advice.
          Actual risk and outcomes vary. Consult with a legal professional for specific guidance.
        </p>
      </div>
    </div>
  );
}
