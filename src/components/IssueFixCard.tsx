'use client';

import { useState } from 'react';
import {
  AlertTriangle,
  CheckCircle,
  Copy,
  ChevronDown,
  ChevronUp,
  Clock,
  ExternalLink,
  Zap,
  Code
} from 'lucide-react';
import { getFixForIssue, getPlatformFix, type AccessibilityFix } from '@/lib/accessibility-fixes';

interface IssueFixCardProps {
  issue: {
    id: string;
    impact: 'critical' | 'serious' | 'moderate' | 'minor';
    description: string;
    count: number;
  };
  platform: string;
  index: number;
}

export default function IssueFixCard({ issue, platform, index }: IssueFixCardProps) {
  const [isExpanded, setIsExpanded] = useState(index === 0); // First card expanded by default
  const [codeCopied, setCodeCopied] = useState(false);

  const fix = getFixForIssue(issue.id);
  const platformFix = getPlatformFix(issue.id, platform);

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'critical': return 'text-red-500 bg-red-500/10 border-red-500/30';
      case 'serious': return 'text-orange-500 bg-orange-500/10 border-orange-500/30';
      case 'moderate': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/30';
      default: return 'text-blue-500 bg-blue-500/10 border-blue-500/30';
    }
  };

  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case 'critical': return { label: 'Critical', icon: '!' };
      case 'serious': return { label: 'Serious', icon: '!!' };
      case 'moderate': return { label: 'Moderate', icon: '-' };
      default: return { label: 'Minor', icon: '' };
    }
  };

  const handleCopyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCodeCopied(true);
      setTimeout(() => setCodeCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const badge = getImpactBadge(issue.impact);

  return (
    <div className={`bg-zinc-800/50 rounded-xl border overflow-hidden transition-all ${
      isExpanded ? 'border-indigo-500/30' : 'border-zinc-700'
    }`}>
      {/* Header - Always visible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 flex items-start gap-3 text-left hover:bg-zinc-800/70 transition-colors"
      >
        <span className={`px-2 py-1 rounded text-xs font-bold uppercase border ${getImpactColor(issue.impact)}`}>
          {badge.label}
        </span>

        <div className="flex-1 min-w-0">
          <h4 className="text-white font-medium leading-snug">
            {fix?.title || issue.description}
          </h4>
          <div className="flex items-center gap-3 mt-1 text-sm text-zinc-400">
            <span>{issue.count} instance{issue.count !== 1 ? 's' : ''}</span>
            {fix && (
              <>
                <span className="text-zinc-600">•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {fix.estimatedTime}
                </span>
              </>
            )}
          </div>
        </div>

        <div className="flex-shrink-0 text-zinc-400">
          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>
      </button>

      {/* Expanded Content */}
      {isExpanded && fix && (
        <div className="border-t border-zinc-700 px-4 pb-4">
          {/* Description */}
          <div className="pt-4 pb-3">
            <p className="text-zinc-300 text-sm">{fix.description}</p>
          </div>

          {/* WCAG Criteria */}
          <div className="flex flex-wrap gap-2 mb-4">
            {fix.wcagCriteria.map((criterion, i) => (
              <span
                key={i}
                className="px-2 py-1 bg-indigo-500/10 text-indigo-400 text-xs rounded-full border border-indigo-500/20"
              >
                {criterion}
              </span>
            ))}
          </div>

          {/* Platform-Specific Fix */}
          {platformFix && (
            <div className="mb-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-green-400" />
                <span className="text-green-400 text-sm font-semibold">{platform} Quick Fix</span>
              </div>
              <p className="text-zinc-300 text-sm">{platformFix}</p>
            </div>
          )}

          {/* General Fix Instructions */}
          <div className="mb-4">
            <h5 className="text-white text-sm font-semibold mb-2">How to Fix</h5>
            <p className="text-zinc-300 text-sm">{fix.fixInstructions.general}</p>
          </div>

          {/* Code Example */}
          {fix.fixInstructions.code && (
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <h5 className="text-white text-sm font-semibold flex items-center gap-2">
                  <Code className="w-4 h-4 text-indigo-400" />
                  Code Example
                </h5>
                <button
                  onClick={() => handleCopyCode(fix.fixInstructions.code!)}
                  className="flex items-center gap-1 px-2 py-1 text-xs text-zinc-400 hover:text-white hover:bg-zinc-700 rounded transition-colors"
                >
                  {codeCopied ? (
                    <>
                      <CheckCircle className="w-3 h-3 text-green-500" />
                      <span className="text-green-500">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="bg-zinc-900 border border-zinc-700 rounded-lg p-3 text-xs text-zinc-300 overflow-x-auto">
                <code>{fix.fixInstructions.code}</code>
              </pre>
            </div>
          )}

          {/* Resources */}
          {fix.resources && fix.resources.length > 0 && (
            <div className="pt-3 border-t border-zinc-700">
              <h5 className="text-zinc-400 text-xs font-semibold uppercase mb-2">Learn More</h5>
              <div className="flex flex-wrap gap-2">
                {fix.resources.map((resource, i) => (
                  <a
                    key={i}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2 py-1 text-xs text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/10 rounded transition-colors"
                  >
                    {resource.title}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Legal Risk Warning for high-risk issues */}
          {fix.legalRisk === 'high' && (
            <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-red-400 text-sm font-semibold">High Legal Risk</span>
                  <p className="text-zinc-400 text-xs mt-1">
                    This issue is commonly cited in accessibility lawsuits and EAA enforcement actions. Fix this first.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Collapsed Preview - show fix is available */}
      {!isExpanded && fix && (
        <div className="px-4 pb-3 flex items-center gap-2 text-xs text-green-400">
          <CheckCircle className="w-3 h-3" />
          <span>Copy-paste fix available</span>
        </div>
      )}
    </div>
  );
}
