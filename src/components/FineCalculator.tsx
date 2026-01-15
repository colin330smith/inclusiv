'use client';

import { useState } from 'react';
import { Calculator, AlertTriangle, TrendingUp, Shield, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface RiskCalculation {
  estimatedFine: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  complianceCost: number;
  savingsMultiple: number;
}

const COMPANY_SIZE_OPTIONS = [
  { value: 'micro', label: 'Micro (1-9 employees)', revenue: 500000 },
  { value: 'small', label: 'Small (10-49 employees)', revenue: 2000000 },
  { value: 'medium', label: 'Medium (50-249 employees)', revenue: 10000000 },
  { value: 'large', label: 'Large (250+ employees)', revenue: 50000000 },
];

const INDUSTRY_OPTIONS = [
  { value: 'ecommerce', label: 'E-commerce / Retail', riskMultiplier: 1.3 },
  { value: 'financial', label: 'Financial Services', riskMultiplier: 1.5 },
  { value: 'healthcare', label: 'Healthcare', riskMultiplier: 1.4 },
  { value: 'travel', label: 'Travel & Hospitality', riskMultiplier: 1.2 },
  { value: 'saas', label: 'SaaS / Technology', riskMultiplier: 1.1 },
  { value: 'education', label: 'Education', riskMultiplier: 1.2 },
  { value: 'other', label: 'Other', riskMultiplier: 1.0 },
];

const EU_MARKET_OPTIONS = [
  { value: 'none', label: 'No EU customers', euMultiplier: 0 },
  { value: 'some', label: 'Some EU customers (<25%)', euMultiplier: 0.5 },
  { value: 'significant', label: 'Significant EU presence (25-50%)', euMultiplier: 0.8 },
  { value: 'primary', label: 'Primary market is EU (>50%)', euMultiplier: 1.0 },
];

function calculateRisk(
  companySize: string,
  industry: string,
  euMarket: string
): RiskCalculation {
  const sizeOption = COMPANY_SIZE_OPTIONS.find(o => o.value === companySize);
  const industryOption = INDUSTRY_OPTIONS.find(o => o.value === industry);
  const euOption = EU_MARKET_OPTIONS.find(o => o.value === euMarket);

  if (!sizeOption || !industryOption || !euOption) {
    return {
      estimatedFine: 0,
      riskLevel: 'low',
      complianceCost: 0,
      savingsMultiple: 0,
    };
  }

  // Base fine calculation (up to 4% of annual turnover or €100,000)
  const revenueBasedFine = sizeOption.revenue * 0.04;
  const maxFine = Math.min(revenueBasedFine, 100000);

  // Apply multipliers
  const adjustedFine = maxFine * industryOption.riskMultiplier * euOption.euMultiplier;

  // Determine risk level
  let riskLevel: RiskCalculation['riskLevel'];
  if (adjustedFine === 0) riskLevel = 'low';
  else if (adjustedFine < 10000) riskLevel = 'medium';
  else if (adjustedFine < 50000) riskLevel = 'high';
  else riskLevel = 'critical';

  // Calculate recommended plan cost
  let complianceCost: number;
  if (companySize === 'micro') complianceCost = 49 * 12; // Starter annual
  else if (companySize === 'small') complianceCost = 119 * 12; // Professional annual
  else complianceCost = 399 * 12; // Enterprise annual

  const savingsMultiple = adjustedFine > 0 ? Math.round(adjustedFine / complianceCost) : 0;

  return {
    estimatedFine: Math.round(adjustedFine),
    riskLevel,
    complianceCost,
    savingsMultiple,
  };
}

export default function FineCalculator() {
  const [companySize, setCompanySize] = useState('');
  const [industry, setIndustry] = useState('');
  const [euMarket, setEuMarket] = useState('');
  const [result, setResult] = useState<RiskCalculation | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleCalculate = () => {
    if (!companySize || !industry || !euMarket) return;

    const calculation = calculateRisk(companySize, industry, euMarket);
    setResult(calculation);
    setShowResult(true);

    // Track calculator usage
    if (typeof window !== 'undefined') {
      const win = window as unknown as { plausible?: (event: string, options?: object) => void };
      win.plausible?.('Fine Calculator Used', {
        props: { companySize, industry, euMarket, riskLevel: calculation.riskLevel },
      });
    }
  };

  const getRiskColor = (level: RiskCalculation['riskLevel']) => {
    switch (level) {
      case 'low': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'high': return 'text-orange-400';
      case 'critical': return 'text-red-400';
    }
  };

  const getRiskBg = (level: RiskCalculation['riskLevel']) => {
    switch (level) {
      case 'low': return 'bg-green-500/10 border-green-500/20';
      case 'medium': return 'bg-yellow-500/10 border-yellow-500/20';
      case 'high': return 'bg-orange-500/10 border-orange-500/20';
      case 'critical': return 'bg-red-500/10 border-red-500/20';
    }
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
          <Calculator className="w-5 h-5 text-red-400" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">EAA Fine Risk Calculator</h3>
          <p className="text-sm text-zinc-500">Estimate your potential non-compliance costs</p>
        </div>
      </div>

      {!showResult ? (
        <div className="space-y-4">
          {/* Company Size */}
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Company Size
            </label>
            <select
              value={companySize}
              onChange={(e) => setCompanySize(e.target.value)}
              className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select company size...</option>
              {COMPANY_SIZE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Industry */}
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Industry
            </label>
            <select
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select industry...</option>
              {INDUSTRY_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* EU Market */}
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              EU Market Exposure
            </label>
            <select
              value={euMarket}
              onChange={(e) => setEuMarket(e.target.value)}
              className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select EU exposure...</option>
              {EU_MARKET_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleCalculate}
            disabled={!companySize || !industry || !euMarket}
            className="w-full py-3 px-4 bg-red-600 hover:bg-red-500 disabled:bg-zinc-700 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Calculator className="w-5 h-5" />
            Calculate My Risk
          </button>
        </div>
      ) : result && (
        <div className="space-y-6">
          {/* Risk Level Badge */}
          <div className={`p-4 rounded-xl border ${getRiskBg(result.riskLevel)}`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-zinc-400">Risk Level</span>
              <span className={`font-bold uppercase ${getRiskColor(result.riskLevel)}`}>
                {result.riskLevel}
              </span>
            </div>
            {result.estimatedFine > 0 ? (
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-white">
                  €{result.estimatedFine.toLocaleString()}
                </span>
                <span className="text-zinc-500">potential fine</span>
              </div>
            ) : (
              <p className="text-green-400 font-medium">
                Low risk - but compliance still recommended
              </p>
            )}
          </div>

          {result.estimatedFine > 0 && (
            <>
              {/* Comparison */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-zinc-800/50 rounded-lg p-4 text-center">
                  <AlertTriangle className="w-6 h-6 text-red-400 mx-auto mb-2" />
                  <div className="text-lg font-bold text-red-400">
                    €{result.estimatedFine.toLocaleString()}
                  </div>
                  <div className="text-xs text-zinc-500">Non-compliance cost</div>
                </div>
                <div className="bg-zinc-800/50 rounded-lg p-4 text-center">
                  <Shield className="w-6 h-6 text-green-400 mx-auto mb-2" />
                  <div className="text-lg font-bold text-green-400">
                    €{result.complianceCost.toLocaleString()}
                  </div>
                  <div className="text-xs text-zinc-500">Annual compliance</div>
                </div>
              </div>

              {/* Savings Multiple */}
              {result.savingsMultiple > 1 && (
                <div className="flex items-center gap-3 p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-indigo-400" />
                  <span className="text-sm text-indigo-300">
                    Compliance costs <strong>{result.savingsMultiple}x less</strong> than potential fines
                  </span>
                </div>
              )}
            </>
          )}

          {/* CTA */}
          <div className="space-y-3">
            <Link
              href="/"
              className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              Start Free Scan Now
              <ArrowRight className="w-5 h-5" />
            </Link>
            <button
              onClick={() => setShowResult(false)}
              className="w-full py-2 text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              Recalculate
            </button>
          </div>

          <p className="text-xs text-zinc-500 text-center">
            * Estimates based on EAA guidelines. Actual fines may vary by member state.
          </p>
        </div>
      )}
    </div>
  );
}
