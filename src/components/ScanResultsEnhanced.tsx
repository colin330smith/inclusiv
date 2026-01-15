'use client';

import { useState } from 'react';
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  Shield,
  Download,
  Share2,
  Globe,
  Zap,
  ArrowRight,
  Scale
} from 'lucide-react';
import IssueFixCard from './IssueFixCard';
import {
  calculateRemediationTime,
  calculateLegalRisk,
  prioritizeIssues
} from '@/lib/accessibility-fixes';

interface ScanResult {
  score: number;
  totalIssues: number;
  criticalIssues: number;
  platform: string;
  topIssues: Array<{
    id: string;
    impact: 'critical' | 'serious' | 'moderate' | 'minor';
    description: string;
    count: number;
  }>;
  scannedAt: string;
}

interface ScanResultsEnhancedProps {
  result: ScanResult;
  url: string;
  onEmailCapture?: (email: string) => void;
}

export default function ScanResultsEnhanced({ result, url, onEmailCapture }: ScanResultsEnhancedProps) {
  const [showAllIssues, setShowAllIssues] = useState(false);
  const [email, setEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  // Calculate risk and remediation time
  const legalRisk = calculateLegalRisk(result.topIssues);
  const remediationTime = calculateRemediationTime(result.topIssues);
  const prioritizedIssues = prioritizeIssues(result.topIssues);

  // Show first 5 issues, or all if expanded
  const displayedIssues = showAllIssues ? prioritizedIssues : prioritizedIssues.slice(0, 5);
  const hasMoreIssues = prioritizedIssues.length > 5;

  const getScoreColor = (score: number) => {
    if (score >= 80) return '#22c55e';
    if (score >= 50) return '#f59e0b';
    return '#ef4444';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return { text: 'Good', color: 'text-green-500', bg: 'bg-green-500/10' };
    if (score >= 50) return { text: 'Needs Work', color: 'text-yellow-500', bg: 'bg-yellow-500/10' };
    return { text: 'At Risk', color: 'text-red-500', bg: 'bg-red-500/10' };
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high': return 'text-red-400 bg-red-500/10 border-red-500/30';
      case 'medium': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30';
      default: return 'text-green-400 bg-green-500/10 border-green-500/30';
    }
  };

  const scoreLabel = getScoreLabel(result.score);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (onEmailCapture) {
      onEmailCapture(email);
    }
    setEmailSubmitted(true);
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
      {/* Score Header */}
      <div className="p-6 sm:p-8 border-b border-zinc-800">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          {/* Score Circle */}
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex-shrink-0">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#27272a"
                strokeWidth="8"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke={getScoreColor(result.score)}
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={251.2}
                strokeDashoffset={251.2 - (251.2 * result.score) / 100}
                transform="rotate(-90 50 50)"
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-white">{result.score}</span>
              <span className="text-xs text-zinc-400">/ 100</span>
            </div>
          </div>

          {/* Score Info */}
          <div className="flex-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
              <h3 className="text-2xl font-bold text-white">Accessibility Score</h3>
              <span className={`px-2 py-0.5 rounded-full text-sm font-medium ${scoreLabel.color} ${scoreLabel.bg}`}>
                {scoreLabel.text}
              </span>
            </div>

            <p className="text-zinc-400 mb-4">
              {result.totalIssues} issues found
              {result.criticalIssues > 0 && (
                <span className="text-red-400 font-semibold"> ({result.criticalIssues} critical)</span>
              )}
            </p>

            <div className="flex items-center justify-center sm:justify-start gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-800 rounded-full text-sm text-zinc-300">
                <Globe className="w-4 h-4" />
                {result.platform}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-3 border-b border-zinc-800">
        {/* Remediation Time */}
        <div className="p-4 border-r border-zinc-800 text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Clock className="w-4 h-4 text-indigo-400" />
            <span className="text-white font-semibold">{remediationTime}</span>
          </div>
          <span className="text-xs text-zinc-400">Est. Fix Time</span>
        </div>

        {/* Legal Risk */}
        <div className="p-4 border-r border-zinc-800 text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Scale className="w-4 h-4 text-indigo-400" />
            <span className={`font-semibold capitalize ${legalRisk.level === 'high' ? 'text-red-400' : legalRisk.level === 'medium' ? 'text-yellow-400' : 'text-green-400'}`}>
              {legalRisk.level}
            </span>
          </div>
          <span className="text-xs text-zinc-400">Legal Risk</span>
        </div>

        {/* Potential Fine */}
        <div className="p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <AlertTriangle className="w-4 h-4 text-indigo-400" />
            <span className="text-white font-semibold text-sm">{legalRisk.fineEstimate}</span>
          </div>
          <span className="text-xs text-zinc-400">EAA Fine Risk</span>
        </div>
      </div>

      {/* Standards Compliance */}
      <div className="p-4 border-b border-zinc-800">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {[
            { label: 'WCAG 2.1 AA', status: result.score >= 80, description: 'Global Standard' },
            { label: 'EAA Ready', status: result.score >= 80, description: 'EU Law' },
            { label: 'ADA Ready', status: result.score >= 70, description: 'US Law' },
            { label: 'EN 301 549', status: result.score >= 75, description: 'EU Technical' },
          ].map((item, i) => (
            <div
              key={i}
              className={`p-2 rounded-lg ${item.status ? 'bg-green-500/10 border border-green-500/20' : 'bg-zinc-800 border border-zinc-700'}`}
            >
              <div className="flex items-center gap-1.5">
                {item.status ? (
                  <CheckCircle className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                ) : (
                  <AlertTriangle className="w-3.5 h-3.5 text-zinc-500 flex-shrink-0" />
                )}
                <span className={`text-xs font-medium ${item.status ? 'text-green-400' : 'text-zinc-400'}`}>
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Issues with Fixes - THE MAIN VALUE */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-semibold text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-indigo-400" />
            Issues with Copy-Paste Fixes
          </h4>
          <span className="text-sm text-zinc-400">
            {prioritizedIssues.length} issues • prioritized by impact
          </span>
        </div>

        {/* Issue Cards */}
        <div className="space-y-3">
          {displayedIssues.map((issue, i) => (
            <IssueFixCard
              key={issue.id + i}
              issue={issue}
              platform={result.platform}
              index={i}
            />
          ))}
        </div>

        {/* Show More */}
        {hasMoreIssues && !showAllIssues && (
          <button
            onClick={() => setShowAllIssues(true)}
            className="w-full mt-4 py-3 text-center text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/10 rounded-lg transition-colors text-sm font-medium"
          >
            Show {prioritizedIssues.length - 5} more issues with fixes
          </button>
        )}
      </div>

      {/* Email Capture - for PDF report (optional value add) */}
      {!emailSubmitted ? (
        <div className="p-6 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border-t border-indigo-500/30">
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Download className="w-5 h-5 text-indigo-400" />
                <h4 className="text-white font-semibold">Get PDF Report</h4>
                <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs font-medium rounded-full">FREE</span>
              </div>
              <p className="text-zinc-400 text-sm mb-3">
                Download a shareable PDF with all issues, fixes, and compliance status.
              </p>
              <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  required
                  className="flex-1 px-4 py-2.5 bg-zinc-900 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-indigo-500 text-sm"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold rounded-lg transition-colors text-sm"
                >
                  Send PDF Report
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-6 bg-green-600/10 border-t border-green-500/20">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
            <div>
              <h4 className="text-white font-semibold">PDF Report Sent!</h4>
              <p className="text-zinc-400 text-sm">Check your inbox at {email}</p>
            </div>
          </div>
        </div>
      )}

      {/* CTA Footer */}
      <div className="p-6 bg-zinc-800/50 border-t border-zinc-700">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className="text-white font-medium">Need help fixing these issues?</p>
            <p className="text-zinc-400 text-sm">Our team can fix everything for you.</p>
          </div>
          <a
            href="/pricing"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-500/25"
          >
            <Shield className="w-4 h-4" />
            Get Full Compliance
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
