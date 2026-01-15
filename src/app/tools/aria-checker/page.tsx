'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Shield, FileText, AlertTriangle, CheckCircle, XCircle, ArrowRight, Copy, Check, Loader2 } from 'lucide-react';

interface AriaElement {
  tag: string;
  role?: string;
  label?: string;
  issue?: string;
  html: string;
}

interface AnalysisResult {
  elements: AriaElement[];
  issues: string[];
  score: number;
  passed: boolean;
  stats: {
    totalInteractive: number;
    withLabels: number;
    withRoles: number;
  };
}

export default function AriaCheckerPage() {
  const [html, setHtml] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [copied, setCopied] = useState(false);

  const analyzeHtml = (htmlContent: string): AnalysisResult => {
    const elements: AriaElement[] = [];
    const issues: string[] = [];

    // Interactive elements that need labels
    const interactiveRegex = /<(button|a|input|select|textarea|img)[^>]*>/gi;
    let match;

    while ((match = interactiveRegex.exec(htmlContent)) !== null) {
      const tag = match[1].toLowerCase();
      const fullMatch = match[0];

      // Extract attributes
      const roleMatch = fullMatch.match(/role=["']([^"']+)["']/i);
      const ariaLabelMatch = fullMatch.match(/aria-label=["']([^"']+)["']/i);
      const ariaLabelledbyMatch = fullMatch.match(/aria-labelledby=["']([^"']+)["']/i);
      const titleMatch = fullMatch.match(/title=["']([^"']+)["']/i);
      const altMatch = fullMatch.match(/alt=["']([^"']+)["']/i);
      const typeMatch = fullMatch.match(/type=["']([^"']+)["']/i);

      const element: AriaElement = {
        tag,
        role: roleMatch?.[1],
        label: ariaLabelMatch?.[1] || ariaLabelledbyMatch?.[1] || titleMatch?.[1] || altMatch?.[1],
        html: fullMatch.substring(0, 80) + (fullMatch.length > 80 ? '...' : ''),
      };

      // Check for issues
      if (tag === 'img') {
        if (!altMatch) {
          element.issue = 'Image missing alt attribute';
          issues.push(`Image missing alt attribute: ${fullMatch.substring(0, 50)}...`);
        } else if (altMatch[1] === '') {
          // Empty alt is valid for decorative images
          element.label = '[Decorative image - empty alt]';
        }
      } else if (tag === 'input') {
        const type = typeMatch?.[1] || 'text';
        if (!['hidden', 'submit', 'reset', 'button', 'image'].includes(type)) {
          if (!ariaLabelMatch && !ariaLabelledbyMatch && !fullMatch.includes('id=')) {
            element.issue = 'Input missing accessible label';
            issues.push(`Input (type="${type}") missing accessible label`);
          }
        }
      } else if (tag === 'button') {
        // Check if button has text content or aria-label
        if (!ariaLabelMatch && !ariaLabelledbyMatch) {
          // Can't fully check text content with regex, but flag if likely empty
          if (fullMatch.includes('><') || fullMatch.endsWith('/>')) {
            element.issue = 'Button may be missing accessible name';
            issues.push('Button element may be missing accessible name');
          }
        }
      } else if (tag === 'a') {
        // Links should have text content or aria-label
        if (!ariaLabelMatch && !ariaLabelledbyMatch && !titleMatch) {
          if (fullMatch.includes('><') || fullMatch.match(/<a[^>]*>\s*<img/)) {
            element.issue = 'Link may be missing accessible name';
            issues.push('Link element may be missing accessible name');
          }
        }
      }

      elements.push(element);
    }

    // Check for common ARIA mistakes
    const ariahiddenButtons = htmlContent.match(/<button[^>]*aria-hidden=["']true["'][^>]*>/gi);
    if (ariahiddenButtons) {
      issues.push(`${ariahiddenButtons.length} button(s) with aria-hidden="true" - interactive elements should not be hidden`);
    }

    const invalidRoles = htmlContent.match(/role=["'](button|link|checkbox)["'][^>]*(?!tabindex)/gi);
    if (invalidRoles) {
      issues.push('Elements with ARIA roles may need tabindex for keyboard access');
    }

    // Calculate stats
    const stats = {
      totalInteractive: elements.length,
      withLabels: elements.filter(e => e.label && !e.issue).length,
      withRoles: elements.filter(e => e.role).length,
    };

    // Calculate score
    const labelPercentage = stats.totalInteractive > 0 ? (stats.withLabels / stats.totalInteractive) * 100 : 100;
    const issueDeduction = Math.min(issues.length * 10, 50);
    const score = Math.max(0, Math.round(labelPercentage - issueDeduction));

    return {
      elements,
      issues,
      score,
      passed: issues.length === 0,
      stats,
    };
  };

  const handleAnalyze = async () => {
    setLoading(true);
    setResult(null);

    try {
      const analysis = analyzeHtml(html);
      setResult(analysis);
    } catch {
      setResult({
        elements: [],
        issues: ['Failed to analyze content. Please try again.'],
        score: 0,
        passed: false,
        stats: { totalInteractive: 0, withLabels: 0, withRoles: 0 },
      });
    } finally {
      setLoading(false);
    }
  };

  const generateReport = () => {
    if (!result) return '';
    return `ARIA Accessibility Report
========================
Score: ${result.score}/100
Interactive Elements: ${result.stats.totalInteractive}
With Labels: ${result.stats.withLabels}
With Roles: ${result.stats.withRoles}

Issues Found (${result.issues.length}):
${result.issues.map((issue, i) => `${i + 1}. ${issue}`).join('\n')}
`;
  };

  const copyReport = () => {
    navigator.clipboard.writeText(generateReport());
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
          <div className="flex items-center gap-4">
            <Link href="/tools" className="text-zinc-400 hover:text-white transition-colors text-sm">
              All Tools
            </Link>
            <Link
              href="/"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-colors text-sm"
            >
              Full Website Scan
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-sm mb-4">
            <FileText className="w-4 h-4" />
            Free WCAG Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            ARIA Label Checker
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Ensure interactive elements have proper accessible names per WCAG 4.1.2 (Name, Role, Value) guidelines.
          </p>
        </div>

        {/* Input Section */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-8">
          <label className="block text-white text-sm font-medium mb-2">
            Paste your HTML
          </label>
          <textarea
            value={html}
            onChange={(e) => setHtml(e.target.value)}
            placeholder="<button>Click me</button>&#10;<input type='text' aria-label='Search'>&#10;<img src='logo.png' alt='Company Logo'>"
            className="w-full h-48 px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-indigo-500 resize-none"
          />

          <button
            onClick={handleAnalyze}
            disabled={loading || !html}
            className="mt-4 w-full py-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-zinc-700 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <FileText className="w-5 h-5" />
                Check ARIA Labels
              </>
            )}
          </button>
        </div>

        {/* Results */}
        {result && (
          <div className="space-y-6">
            {/* Score */}
            <div className={`rounded-2xl p-6 border ${
              result.passed
                ? 'bg-green-500/10 border-green-500/30'
                : 'bg-red-500/10 border-red-500/30'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {result.passed ? (
                    <CheckCircle className="w-12 h-12 text-green-400" />
                  ) : (
                    <XCircle className="w-12 h-12 text-red-400" />
                  )}
                  <div>
                    <div className="text-3xl font-bold text-white">{result.score}/100</div>
                    <div className={result.passed ? 'text-green-400' : 'text-red-400'}>
                      {result.passed ? 'All checks passed!' : `${result.issues.length} issue${result.issues.length !== 1 ? 's' : ''} found`}
                    </div>
                  </div>
                </div>
                <button
                  onClick={copyReport}
                  className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-sm text-zinc-300 transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-green-400" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy Report
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-white">{result.stats.totalInteractive}</div>
                <div className="text-zinc-400 text-sm">Interactive Elements</div>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-green-400">{result.stats.withLabels}</div>
                <div className="text-zinc-400 text-sm">With Labels</div>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-blue-400">{result.stats.withRoles}</div>
                <div className="text-zinc-400 text-sm">With Roles</div>
              </div>
            </div>

            {/* Issues */}
            {result.issues.length > 0 && (
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-400" />
                  Issues Found
                </h2>
                <ul className="space-y-3">
                  {result.issues.map((issue, index) => (
                    <li key={index} className="flex items-start gap-3 text-zinc-300">
                      <span className="flex-shrink-0 w-6 h-6 bg-red-500/20 rounded-full flex items-center justify-center text-xs text-red-400 font-bold">
                        {index + 1}
                      </span>
                      {issue}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Elements */}
            {result.elements.length > 0 && (
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-white mb-4">Interactive Elements</h2>
                <div className="space-y-3">
                  {result.elements.map((element, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-xl ${
                        element.issue ? 'bg-red-500/10 border border-red-500/20' : 'bg-zinc-800'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-2 py-0.5 bg-indigo-500/20 text-indigo-400 rounded text-xs font-bold uppercase">
                          {element.tag}
                        </span>
                        {element.role && (
                          <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded text-xs">
                            role=&quot;{element.role}&quot;
                          </span>
                        )}
                        {element.label && (
                          <span className="px-2 py-0.5 bg-green-500/20 text-green-400 rounded text-xs">
                            {element.label}
                          </span>
                        )}
                        {element.issue && (
                          <span className="ml-auto text-xs text-red-400">
                            {element.issue}
                          </span>
                        )}
                      </div>
                      <code className="text-xs text-zinc-500 font-mono">
                        {element.html}
                      </code>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Best Practices */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">ARIA Best Practices</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  'All interactive elements need accessible names',
                  'Use aria-label for icon-only buttons',
                  'Images need alt text (empty for decorative)',
                  'Form inputs need associated labels',
                  'Links should have descriptive text',
                  'Custom widgets need proper ARIA roles',
                ].map((tip, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-zinc-300 text-sm">{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            Check All 50+ WCAG Criteria
          </h2>
          <p className="text-zinc-400 mb-6 max-w-xl mx-auto">
            ARIA labels are just one part of accessibility. Get a complete report for your entire website.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-500/25"
          >
            Free Full Website Scan
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-8 mt-12">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-6 text-sm">
            <Link href="/tools" className="text-zinc-400 hover:text-white transition-colors">
              All Tools
            </Link>
            <Link href="/tools/contrast-checker" className="text-zinc-400 hover:text-white transition-colors">
              Contrast Checker
            </Link>
            <Link href="/tools/heading-checker" className="text-zinc-400 hover:text-white transition-colors">
              Heading Checker
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
