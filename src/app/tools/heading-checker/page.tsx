'use client';

import { useState } from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Shield, Type, AlertTriangle, CheckCircle, XCircle, ArrowRight, Copy, Check, Loader2 } from 'lucide-react';

interface HeadingItem {
  level: number;
  text: string;
  issue?: string;
}

interface AnalysisResult {
  headings: HeadingItem[];
  issues: string[];
  score: number;
  passed: boolean;
}

export default function HeadingCheckerPage() {
  const [url, setUrl] = useState('');
  const [html, setHtml] = useState('');
  const [mode, setMode] = useState<'url' | 'html'>('url');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [copied, setCopied] = useState(false);

  const analyzeHtml = (htmlContent: string): AnalysisResult => {
    const headingRegex = /<h([1-6])[^>]*>([^<]*)<\/h\1>/gi;
    const headings: HeadingItem[] = [];
    const issues: string[] = [];
    let match;

    while ((match = headingRegex.exec(htmlContent)) !== null) {
      headings.push({
        level: parseInt(match[1]),
        text: match[2].trim() || '[Empty heading]',
      });
    }

    if (headings.length === 0) {
      issues.push('No headings found on the page');
      return { headings, issues, score: 0, passed: false };
    }

    // Check for H1
    const h1Count = headings.filter(h => h.level === 1).length;
    if (h1Count === 0) {
      issues.push('Missing H1 heading - every page should have exactly one H1');
    } else if (h1Count > 1) {
      issues.push(`Multiple H1 headings found (${h1Count}) - pages should have only one H1`);
    }

    // Check for skipped levels
    let prevLevel = 0;
    headings.forEach((heading, index) => {
      if (prevLevel > 0 && heading.level > prevLevel + 1) {
        const skipped = `h${prevLevel + 1}`;
        issues.push(`Skipped heading level: jumped from H${prevLevel} to H${heading.level} (missing ${skipped})`);
        heading.issue = `Skipped level - expected H${prevLevel + 1}`;
      }

      if (heading.text === '[Empty heading]') {
        issues.push(`Empty heading found at position ${index + 1}`);
        heading.issue = 'Empty heading';
      }

      prevLevel = heading.level;
    });

    // Check if first heading is H1
    if (headings[0].level !== 1) {
      issues.push(`First heading is H${headings[0].level} instead of H1`);
    }

    // Calculate score
    const maxIssues = 5;
    const score = Math.max(0, Math.round(100 - (issues.length / maxIssues) * 100));

    return {
      headings,
      issues,
      score,
      passed: issues.length === 0,
    };
  };

  const handleAnalyze = async () => {
    setLoading(true);
    setResult(null);

    try {
      if (mode === 'html') {
        const analysis = analyzeHtml(html);
        setResult(analysis);
      } else {
        // For URL mode, we'd need a backend API
        // For now, show a message
        setResult({
          headings: [],
          issues: ['URL scanning requires a backend API. Please paste your HTML directly for now.'],
          score: 0,
          passed: false,
        });
      }
    } catch {
      setResult({
        headings: [],
        issues: ['Failed to analyze content. Please try again.'],
        score: 0,
        passed: false,
      });
    } finally {
      setLoading(false);
    }
  };

  const generateOutline = () => {
    if (!result) return '';
    return result.headings.map(h =>
      `${'  '.repeat(h.level - 1)}H${h.level}: ${h.text}`
    ).join('\n');
  };

  const copyOutline = () => {
    navigator.clipboard.writeText(generateOutline());
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
            <Type className="w-4 h-4" />
            Free WCAG Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Heading Structure Checker
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Verify your heading hierarchy follows WCAG 1.3.1 (Info and Relationships) and 2.4.6 (Headings and Labels) guidelines.
          </p>
        </div>

        {/* Input Section */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-8">
          {/* Mode Toggle */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setMode('html')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                mode === 'html'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              Paste HTML
            </button>
            <button
              onClick={() => setMode('url')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                mode === 'url'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              Enter URL
            </button>
          </div>

          {mode === 'html' ? (
            <textarea
              value={html}
              onChange={(e) => setHtml(e.target.value)}
              placeholder="Paste your HTML here..."
              className="w-full h-48 px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-indigo-500 resize-none"
            />
          ) : (
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-indigo-500"
            />
          )}

          <button
            onClick={handleAnalyze}
            disabled={loading || (mode === 'html' ? !html : !url)}
            className="mt-4 w-full py-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-zinc-700 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Type className="w-5 h-5" />
                Analyze Headings
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

            {/* Heading Outline */}
            {result.headings.length > 0 && (
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-white">Heading Outline</h2>
                  <button
                    onClick={copyOutline}
                    className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-sm text-zinc-300 transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-green-400" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy
                      </>
                    )}
                  </button>
                </div>
                <div className="space-y-2">
                  {result.headings.map((heading, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-3 py-2 px-3 rounded-lg ${
                        heading.issue ? 'bg-red-500/10 border border-red-500/20' : 'bg-zinc-800'
                      }`}
                      style={{ marginLeft: `${(heading.level - 1) * 24}px` }}
                    >
                      <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                        heading.level === 1 ? 'bg-indigo-500/20 text-indigo-400' :
                        heading.level === 2 ? 'bg-blue-500/20 text-blue-400' :
                        heading.level === 3 ? 'bg-cyan-500/20 text-cyan-400' :
                        heading.level === 4 ? 'bg-teal-500/20 text-teal-400' :
                        heading.level === 5 ? 'bg-green-500/20 text-green-400' :
                        'bg-emerald-500/20 text-emerald-400'
                      }`}>
                        H{heading.level}
                      </span>
                      <span className={heading.issue ? 'text-red-300' : 'text-zinc-300'}>
                        {heading.text}
                      </span>
                      {heading.issue && (
                        <span className="text-xs text-red-400 ml-auto">{heading.issue}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Best Practices */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">WCAG Heading Best Practices</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  'Every page should have exactly one H1',
                  "Don't skip heading levels (e.g., H1 to H3)",
                  'Use headings to create a logical outline',
                  "Don't use headings just for styling",
                  'Keep heading text descriptive and concise',
                  'Screen readers use headings for navigation',
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
            Heading structure is just one aspect of accessibility. Scan your entire website for a complete compliance report.
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
            <Link href="/tools/alt-text-generator" className="text-zinc-400 hover:text-white transition-colors">
              Alt Text Generator
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
