"use client";

import { useState, useEffect } from "react";
import { Shield, AlertTriangle, CheckCircle, Clock, Globe, Lock, ArrowRight, Zap, ChevronDown, ChevronUp, Copy, Check, Download, Code, Wrench } from "lucide-react";
import {
  trackScanStarted,
  trackScanCompleted,
  trackEmailCaptured,
  trackCtaClick,
  trackFeatureClick,
  hashEmail,
  initAnalytics,
} from "@/lib/analytics";
import { SiteFooter } from "@/components/seo/SiteFooter";
import PostScanUpsell from "@/components/PostScanUpsell";
import { useABTest } from "@/components/ABTest";
import { AB_TESTS, trackConversion } from "@/lib/ab-testing";
import { getFixForIssue, getPlatformFix, accessibilityFixes } from "@/lib/accessibility-fixes";
import { downloadPDFReport } from "@/components/PDFReport";
import ShareResults from "@/components/ShareResults";
import RealtimeSocialProof from "@/components/RealtimeSocialProof";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import { SocialProofTicker } from "@/components/SocialProofTicker";

type ScanResult = {
  score: number;
  totalIssues: number;
  criticalIssues: number;
  platform: string;
  topIssues: Array<{
    id: string;
    impact: "critical" | "serious" | "moderate" | "minor";
    description: string;
    count: number;
  }>;
  scannedAt: string;
};

// Calculate days since EAA deadline (deadline has passed)
const getDeadlineInfo = () => {
  const deadline = new Date("2025-06-28");
  const today = new Date();
  const diffTime = today.getTime() - deadline.getTime();
  const daysSince = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return { daysSince, deadline, isPassed: daysSince > 0 };
};

export default function Home() {
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [scanProgress, setScanProgress] = useState(0);
  const [showUpsell, setShowUpsell] = useState(false);
  const [expandedIssues, setExpandedIssues] = useState<Set<string>>(new Set());
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [generatingPdf, setGeneratingPdf] = useState(false);
  const [pdfDownloaded, setPdfDownloaded] = useState(false);
  const deadlineInfo = getDeadlineInfo();

  // A/B Testing hooks
  const headlineTest = useABTest(AB_TESTS.homepage_headline);
  const ctaTest = useABTest(AB_TESTS.cta_button);

  // Get headline based on variant
  const getHeadline = () => {
    switch (headlineTest.variant) {
      case 'urgency':
        return {
          main: 'EAA Deadline Passed',
          highlight: 'Check Compliance Now',
        };
      case 'benefit':
        return {
          main: 'Avoid €100K Fines',
          highlight: 'Free Compliance Scan',
        };
      default:
        return {
          main: 'Is Your Website',
          highlight: 'EAA Compliant?',
        };
    }
  };

  // Get CTA button text based on variant
  const getCtaText = () => {
    switch (ctaTest.variant) {
      case 'check_free':
        return 'Check Free';
      case 'start_scan':
        return 'Start Free Scan';
      case 'get_report':
        return 'Get Free Report';
      default:
        return 'Check My Website Free';
    }
  };

  const headline = getHeadline();

  // Initialize analytics on mount
  useEffect(() => {
    initAnalytics();
  }, []);

  // Show upsell modal when scan results are available
  useEffect(() => {
    if (result && !scanning) {
      setShowUpsell(true);
    }
  }, [result, scanning]);

  // Scan progress animation
  useEffect(() => {
    if (scanning) {
      setScanProgress(0);
      const steps = [
        { progress: 15, delay: 500 },
        { progress: 35, delay: 1500 },
        { progress: 55, delay: 3000 },
        { progress: 75, delay: 5000 },
        { progress: 90, delay: 7000 },
      ];

      const timeouts = steps.map(step =>
        setTimeout(() => setScanProgress(step.progress), step.delay)
      );

      return () => timeouts.forEach(clearTimeout);
    } else {
      setScanProgress(100);
    }
  }, [scanning]);

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setResult(null);

    let scanUrl = url.trim();
    if (!scanUrl.startsWith("http")) {
      scanUrl = "https://" + scanUrl;
    }

    try {
      new URL(scanUrl);
    } catch {
      setError("Please enter a valid URL");
      return;
    }

    // Track scan started
    const scanStartTime = Date.now();
    trackScanStarted(scanUrl);
    trackCtaClick("scan_submit", "Scan My Website", "hero_scanner");

    setScanning(true);

    try {
      const response = await fetch("/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: scanUrl }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Scan failed");
      }

      // Track scan completed with metrics
      const scanDuration = Date.now() - scanStartTime;
      trackScanCompleted(
        scanUrl,
        data.score,
        data.totalIssues,
        data.criticalIssues,
        data.platform,
        scanDuration
      );

      setResult(data);
      setShowEmailCapture(true);

      // Track A/B test conversions
      trackConversion(AB_TESTS.homepage_headline.id, 'scan_completed');
      trackConversion(AB_TESTS.cta_button.id, 'scan_completed');
    } catch (err) {
      setError(err instanceof Error ? err.message : "Scan failed. Please try again.");
    } finally {
      setScanning(false);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    trackCtaClick("email_submit", "Get Full Report", "scan_results");

    try {
      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, url, score: result?.score }),
      });

      const hashedEmail = await hashEmail(email);
      trackEmailCaptured("scan_results", hashedEmail);

      setEmailSubmitted(true);
      localStorage.setItem("emailCaptured", "true");
    } catch {
      trackEmailCaptured("scan_results");
      setEmailSubmitted(true);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "#22c55e";
    if (score >= 50) return "#f59e0b";
    return "#ef4444";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return { text: "Good", color: "text-green-500" };
    if (score >= 50) return { text: "Needs Improvement", color: "text-yellow-500" };
    return { text: "Needs Attention", color: "text-red-500" };
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "critical": return "text-red-500 bg-red-500/10";
      case "serious": return "text-orange-500 bg-orange-500/10";
      case "moderate": return "text-yellow-500 bg-yellow-500/10";
      default: return "text-blue-500 bg-blue-500/10";
    }
  };

  const toggleIssue = (issueId: string) => {
    setExpandedIssues(prev => {
      const newSet = new Set(prev);
      if (newSet.has(issueId)) {
        newSet.delete(issueId);
      } else {
        newSet.add(issueId);
      }
      return newSet;
    });
    trackFeatureClick(`expand_issue_${issueId}`, "scan_results");
  };

  const copyCode = async (code: string, issueId: string) => {
    await navigator.clipboard.writeText(code);
    setCopiedCode(issueId);
    trackFeatureClick(`copy_fix_${issueId}`, "scan_results");
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // Handle instant PDF download
  const handlePdfDownload = async () => {
    if (!result) return;

    setGeneratingPdf(true);
    trackFeatureClick("pdf_download_instant", "scan_results");

    try {
      // Build fixes object for the PDF
      const fixes: Record<string, typeof accessibilityFixes[string]> = {};
      result.topIssues.forEach(issue => {
        const fix = getFixForIssue(issue.id);
        if (fix) {
          fixes[issue.id] = fix;
        }
      });

      await downloadPDFReport(result, url, fixes);
      setPdfDownloaded(true);

      // Track successful download
      trackConversion(AB_TESTS.homepage_headline.id, 'pdf_downloaded');
    } catch (err) {
      console.error('PDF generation failed:', err);
    } finally {
      setGeneratingPdf(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-indigo-500" />
            <span className="text-xl font-bold text-white">Inclusiv</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="/pricing"
              className="text-zinc-300 hover:text-white transition-colors text-sm font-medium"
              onClick={() => trackCtaClick("pricing_nav", "Pricing", "header", "/pricing")}
            >
              Pricing
            </a>
            <div className="flex items-center gap-2 px-3 py-1 bg-red-500/10 rounded-full text-sm text-red-400">
              <AlertTriangle className="w-4 h-4" />
              <span className="font-medium">EAA Now Enforced • Fines Active</span>
            </div>
          </div>
        </div>
      </header>

      {/* Live Activity Ticker */}
      <SocialProofTicker />

      {/* Hero */}
      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 text-indigo-400 text-sm mb-6">
            <Zap className="w-4 h-4" />
            Free accessibility scanner powered by axe-core
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {headline.main} <span className="text-indigo-400">{headline.highlight}</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-4">
            Check in 30 seconds. The EAA deadline passed {deadlineInfo.daysSince} days ago - non-compliant sites <span className="text-red-400 font-semibold">now face €100,000 fines</span>.
          </p>
          <p className="text-zinc-300 max-w-xl mx-auto">
            Free instant scan using axe-core - the same engine trusted by Microsoft, Google, and 10M+ developers.
          </p>
        </div>

        {/* Scanner */}
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleScan} className="relative mb-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Enter your website URL"
                  className="w-full pl-12 pr-4 py-4 bg-zinc-900 border border-zinc-700 rounded-xl text-white placeholder-zinc-400 focus:outline-none focus:border-indigo-500 transition-colors text-base"
                  disabled={scanning}
                />
              </div>
              <button
                type="submit"
                disabled={scanning || !url.trim()}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 disabled:from-zinc-700 disabled:to-zinc-700 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25"
              >
                {scanning ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Scanning...
                  </>
                ) : (
                  <>
                    {getCtaText()}
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
            {error && (
              <p className="mt-3 text-red-400 text-sm flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                {error}
              </p>
            )}
          </form>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-zinc-300 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
              <span>No signup required</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-green-500 flex-shrink-0" />
              <span>Your data stays private</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-green-500 flex-shrink-0" />
              <span>Results in 30 seconds</span>
            </div>
          </div>

          {/* Scanning State */}
          {scanning && (
            <div className="mt-8 bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
              <div className="w-16 h-16 mx-auto mb-4 relative">
                <div className="absolute inset-0 rounded-full border-4 border-zinc-700" />
                <div className="absolute inset-0 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2 text-center">Scanning your website...</h3>
              <p className="text-zinc-300 text-center mb-4">Checking WCAG 2.1 AA compliance</p>

              {/* Progress Bar */}
              <div className="w-full bg-zinc-800 rounded-full h-2 mb-2">
                <div
                  className="bg-indigo-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${scanProgress}%` }}
                />
              </div>
              <p className="text-zinc-300 text-sm text-center">{scanProgress}% complete</p>

              {/* Scanning Steps */}
              <div className="mt-6 space-y-2">
                {[
                  { label: "Checking page structure", done: scanProgress > 15 },
                  { label: "Analyzing color contrast", done: scanProgress > 35 },
                  { label: "Testing keyboard navigation", done: scanProgress > 55 },
                  { label: "Validating ARIA labels", done: scanProgress > 75 },
                  { label: "Generating report", done: scanProgress > 90 },
                ].map((step, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    {step.done ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <div className="w-4 h-4 border-2 border-zinc-600 rounded-full" />
                    )}
                    <span className={step.done ? "text-zinc-200" : "text-zinc-400"}>{step.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Results */}
          {result && !scanning && (
            <div className="mt-8 bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
              {/* Score Header */}
              <div className="p-6 sm:p-8 border-b border-zinc-800 flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
                <div className="relative w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0">
                  <svg className="w-24 h-24 sm:w-32 sm:h-32" viewBox="0 0 100 100">
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
                      className="score-ring animate-score"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold text-white">{result.score}</span>
                  </div>
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                    Accessibility Score: <span className={getScoreLabel(result.score).color}>{getScoreLabel(result.score).text}</span>
                  </h3>
                  <p className="text-zinc-400 mb-3">
                    {result.totalIssues} accessibility issues detected
                    {result.criticalIssues > 0 && (
                      <span className="text-red-400"> ({result.criticalIssues} critical)</span>
                    )}
                  </p>
                  <div className="flex items-center justify-center sm:justify-start gap-3 flex-wrap">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-800 rounded-full text-sm text-zinc-300">
                      <Globe className="w-4 h-4" />
                      {result.platform}
                    </div>
                    <ShareResults
                      score={result.score}
                      issues={result.totalIssues}
                      criticalIssues={result.criticalIssues}
                      url={url}
                      platform={result.platform}
                    />
                  </div>
                </div>
              </div>

              {/* Compliance Status Grid */}
              <div className="p-6 border-b border-zinc-800">
                <h4 className="text-lg font-semibold text-white mb-4">Standards Checked</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { label: "WCAG 2.1 AA", status: result.score >= 80, description: "Global standard" },
                    { label: "EAA Ready", status: result.score >= 80, description: "Europe" },
                    { label: "ADA Compliant", status: result.score >= 70, description: "USA" },
                    { label: "EN 301 549", status: result.score >= 75, description: "EU Technical" },
                  ].map((item, i) => (
                    <div key={i} className={`p-3 rounded-lg ${item.status ? "bg-green-500/10 border border-green-500/20" : "bg-zinc-800 border border-zinc-700"}`}>
                      <div className="flex items-center gap-2">
                        {item.status ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 text-zinc-400" />
                        )}
                        <span className={`text-sm font-medium ${item.status ? "text-green-400" : "text-zinc-400"}`}>
                          {item.label}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400 mt-1 ml-6">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Issues with Instant Fixes */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                    <Wrench className="w-5 h-5 text-indigo-400" />
                    Issues with Instant Fixes
                  </h4>
                  <span className="text-sm text-zinc-400">{result.topIssues.length} issues • Click to expand fixes</span>
                </div>
                <div className="space-y-3">
                  {result.topIssues.map((issue, i) => {
                    const fix = getFixForIssue(issue.id);
                    const platformFix = fix ? getPlatformFix(issue.id, result.platform) : null;
                    const isExpanded = expandedIssues.has(issue.id);

                    return (
                      <div
                        key={i}
                        className="bg-zinc-800/50 rounded-xl overflow-hidden border border-zinc-700/50 hover:border-zinc-600/50 transition-colors"
                      >
                        {/* Issue Header - Clickable */}
                        <button
                          onClick={() => toggleIssue(issue.id)}
                          className="w-full flex items-start gap-3 p-4 text-left"
                        >
                          <span className={`px-2 py-1 rounded text-xs font-medium uppercase flex-shrink-0 ${getImpactColor(issue.impact)}`}>
                            {issue.impact}
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className="text-white font-medium">{issue.description}</p>
                            <p className="text-zinc-400 text-sm mt-1">{issue.count} instances found</p>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            {fix && (
                              <span className="px-2 py-1 bg-green-500/10 text-green-400 text-xs rounded-full">
                                Fix available
                              </span>
                            )}
                            {isExpanded ? (
                              <ChevronUp className="w-5 h-5 text-zinc-400" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-zinc-400" />
                            )}
                          </div>
                        </button>

                        {/* Expanded Fix Content */}
                        {isExpanded && fix && (
                          <div className="px-4 pb-4 border-t border-zinc-700/50">
                            {/* Quick Info */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4">
                              <div className="text-center p-2 bg-zinc-900/50 rounded-lg">
                                <p className="text-xs text-zinc-400 mb-1">WCAG</p>
                                <p className="text-sm text-white font-medium">{fix.wcagCriteria}</p>
                              </div>
                              <div className="text-center p-2 bg-zinc-900/50 rounded-lg">
                                <p className="text-xs text-zinc-400 mb-1">Legal Risk</p>
                                <p className={`text-sm font-medium capitalize ${fix.legalRisk === 'high' ? 'text-red-400' : fix.legalRisk === 'medium' ? 'text-yellow-400' : 'text-green-400'}`}>
                                  {fix.legalRisk}
                                </p>
                              </div>
                              <div className="text-center p-2 bg-zinc-900/50 rounded-lg">
                                <p className="text-xs text-zinc-400 mb-1">Fix Time</p>
                                <p className="text-sm text-white font-medium">{fix.estimatedTime}</p>
                              </div>
                              <div className="text-center p-2 bg-zinc-900/50 rounded-lg">
                                <p className="text-xs text-zinc-400 mb-1">Priority</p>
                                <p className="text-sm text-indigo-400 font-medium">{fix.priorityScore}/100</p>
                              </div>
                            </div>

                            {/* General Fix Instructions */}
                            <div className="mb-4">
                              <h5 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                How to Fix
                              </h5>
                              <p className="text-sm text-zinc-300">{fix.fixInstructions.general}</p>
                            </div>

                            {/* Code Example */}
                            {fix.fixInstructions.code && (
                              <div className="mb-4">
                                <div className="flex items-center justify-between mb-2">
                                  <h5 className="text-sm font-semibold text-white flex items-center gap-2">
                                    <Code className="w-4 h-4 text-indigo-400" />
                                    Code Fix
                                  </h5>
                                  <button
                                    onClick={() => copyCode(fix.fixInstructions.code!, issue.id)}
                                    className="flex items-center gap-1 px-2 py-1 text-xs bg-zinc-700 hover:bg-zinc-600 rounded text-zinc-300 transition-colors"
                                  >
                                    {copiedCode === issue.id ? (
                                      <>
                                        <Check className="w-3 h-3 text-green-500" />
                                        Copied!
                                      </>
                                    ) : (
                                      <>
                                        <Copy className="w-3 h-3" />
                                        Copy
                                      </>
                                    )}
                                  </button>
                                </div>
                                <pre className="p-3 bg-zinc-900 rounded-lg text-xs text-zinc-300 overflow-x-auto">
                                  <code>{fix.fixInstructions.code}</code>
                                </pre>
                              </div>
                            )}

                            {/* Platform-Specific Fix */}
                            {platformFix && (
                              <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-lg">
                                <h5 className="text-sm font-semibold text-indigo-400 mb-2 flex items-center gap-2">
                                  <Globe className="w-4 h-4" />
                                  {result.platform} Specific Fix
                                </h5>
                                <p className="text-sm text-zinc-300">{platformFix}</p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Expand All Button */}
                {result.topIssues.length > 3 && (
                  <button
                    onClick={() => {
                      const allIds = result.topIssues.map(i => i.id);
                      if (expandedIssues.size === allIds.length) {
                        setExpandedIssues(new Set());
                      } else {
                        setExpandedIssues(new Set(allIds));
                      }
                    }}
                    className="mt-4 w-full py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm font-medium rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    {expandedIssues.size === result.topIssues.length ? (
                      <>
                        <ChevronUp className="w-4 h-4" />
                        Collapse All Fixes
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-4 h-4" />
                        Expand All {result.topIssues.length} Fixes
                      </>
                    )}
                  </button>
                )}

                {/* Value Upgrade CTA */}
                <div className="mt-6 p-4 bg-gradient-to-r from-indigo-600/10 to-purple-600/10 border border-indigo-500/20 rounded-xl">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex-1">
                      <p className="text-white font-medium mb-1">
                        {result.score < 70 ? "Need help fixing these issues?" : "Want ongoing compliance monitoring?"}
                      </p>
                      <p className="text-zinc-400 text-sm">
                        {result.score < 70
                          ? "Our team can fix all issues and ensure full EAA compliance in days, not months."
                          : "Keep your site compliant with automated scans, alerts, and expert support."}
                      </p>
                    </div>
                    <a
                      href="/pricing"
                      onClick={() => trackCtaClick("inline_upgrade", "View Plans", "scan_results")}
                      className="flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-500/25 whitespace-nowrap"
                    >
                      <Zap className="w-4 h-4" />
                      View Plans from €49/mo
                    </a>
                  </div>
                </div>
              </div>

              {/* PDF Download Section - Primary action is instant download */}
              {showEmailCapture && !emailSubmitted && (
                <div className="p-6 bg-gradient-to-r from-indigo-600/10 to-purple-600/10 border-t border-indigo-500/20">
                  <div className="flex flex-col gap-4">
                    {/* Instant Download - Primary */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Download className="w-5 h-5 text-indigo-400" />
                          <h4 className="text-base font-semibold text-white">
                            Download Your Report
                          </h4>
                          <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs font-medium rounded-full">FREE</span>
                        </div>
                        <p className="text-zinc-400 text-sm">Get a professional PDF report instantly - no email required.</p>
                      </div>
                      <button
                        onClick={handlePdfDownload}
                        disabled={generatingPdf}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 disabled:from-zinc-700 disabled:to-zinc-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-500/25 whitespace-nowrap"
                      >
                        {generatingPdf ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Generating...
                          </>
                        ) : pdfDownloaded ? (
                          <>
                            <CheckCircle className="w-4 h-4" />
                            Downloaded!
                          </>
                        ) : (
                          <>
                            <Download className="w-4 h-4" />
                            Download PDF Now
                          </>
                        )}
                      </button>
                    </div>

                    {/* Email Option - Secondary */}
                    <div className="pt-4 border-t border-zinc-700/50">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                        <p className="text-zinc-400 text-sm">Or get it emailed for easy sharing:</p>
                        <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-2 sm:items-center">
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@company.com"
                            required
                            className="px-3 py-2 bg-zinc-900 border border-zinc-600 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-indigo-500 text-sm w-full sm:w-48"
                          />
                          <button
                            type="submit"
                            className="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 text-white font-medium rounded-lg transition-colors text-sm whitespace-nowrap"
                          >
                            Email PDF
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Email Success + Upgrade CTA */}
              {emailSubmitted && (
                <div className="p-6 bg-green-600/10 border-t border-green-500/20">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                      <div>
                        <h4 className="text-lg font-semibold text-white">Check your inbox</h4>
                        <p className="text-zinc-400">
                          Full report sent to {email}
                        </p>
                      </div>
                    </div>
                    <a
                      href="/pricing"
                      onClick={() => trackCtaClick("upgrade_cta", "View Compliance Plans", "scan_results")}
                      className="flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-500/25 whitespace-nowrap"
                    >
                      <Zap className="w-4 h-4" />
                      Get Full Compliance
                    </a>
                  </div>
                  <div className="mt-4 pt-4 border-t border-green-500/20">
                    <p className="text-zinc-400 text-sm">
                      <span className="text-white font-medium">Want us to fix everything?</span> Our team handles full WCAG 2.1 AA compliance - audits, fixes, and ongoing monitoring.{" "}
                      <a href="/pricing" className="text-indigo-400 hover:text-indigo-300 underline">View all plans →</a>
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Why Accessibility Matters */}
        <div className="mt-20">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-white mb-3">Why Web Accessibility Matters</h2>
            <p className="text-zinc-400 max-w-xl mx-auto">
              Accessibility laws are being enforced worldwide. Make your website usable by everyone.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="p-6 bg-zinc-900 border border-red-500/30 rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-3">Europe: EAA Now Enforced</h3>
              <p className="text-zinc-400 text-sm mb-3">
                The European Accessibility Act deadline passed June 28, 2025. Non-compliant e-commerce sites, banking apps, and digital services are now legally at risk for fines up to €100,000.
              </p>
              <div className="text-red-400 text-sm font-medium">Enforcement active for {deadlineInfo.daysSince} days</div>
            </div>

            <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-3">USA: ADA Lawsuits Rising</h3>
              <p className="text-zinc-400 text-sm mb-3">
                ADA web accessibility lawsuits continue to grow. Courts have ruled that websites are &quot;places of public accommodation&quot; under the ADA.
              </p>
              <div className="text-indigo-400 text-sm font-medium">4,000+ lawsuits filed annually</div>
            </div>
          </div>
        </div>

        {/* Platform Support */}
        <div className="mt-16 text-center">
          <p className="text-zinc-300 text-sm mb-6">Works with any website or platform</p>
          <div className="flex items-center justify-center gap-8 flex-wrap">
            {["WordPress", "Shopify", "WooCommerce", "Webflow", "Squarespace", "React", "Next.js", "Custom"].map((name) => (
              <div key={name} className="text-zinc-300 hover:text-white transition-colors font-medium">{name}</div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="mt-20 grid md:grid-cols-3 gap-6">
          <div
            className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-colors"
            onClick={() => trackFeatureClick("Powered by axe-core", "features_section")}
          >
            <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-indigo-500" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Powered by axe-core</h3>
            <p className="text-zinc-400 text-sm">
              Industry-standard accessibility testing engine used by Microsoft, Google, and thousands of organizations.
            </p>
          </div>
          <div
            className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-colors"
            onClick={() => trackFeatureClick("WCAG 2.1 AA Coverage", "features_section")}
          >
            <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-4">
              <CheckCircle className="w-6 h-6 text-indigo-500" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">WCAG 2.1 AA Coverage</h3>
            <p className="text-zinc-400 text-sm">
              The global accessibility standard. Meeting WCAG 2.1 AA helps you comply with accessibility laws worldwide.
            </p>
          </div>
          <div
            className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-colors"
            onClick={() => trackFeatureClick("Instant Results", "features_section")}
          >
            <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-indigo-500" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Instant Results</h3>
            <p className="text-zinc-400 text-sm">
              Get your accessibility score in under 30 seconds. No account required, no complex setup.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-br from-zinc-900 to-zinc-900/50 border border-zinc-800 rounded-2xl p-10 max-w-2xl mx-auto relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl" />

            <div className="relative">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 rounded-full text-sm text-red-400 mb-4">
                <AlertTriangle className="w-4 h-4" />
                <span className="font-medium">EAA enforcement active since June 2025</span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">
                Get Full WCAG Compliance Today
              </h2>
              <p className="text-zinc-400 mb-6">
                78% of EU sites are still non-compliant. Get compliant with our done-for-you service.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => {
                    trackCtaClick("final_cta", "Check Compliance Free", "footer_cta");
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-6 py-4 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold rounded-xl transition-all inline-flex items-center justify-center gap-2"
                >
                  Check Free First
                  <ArrowRight className="w-5 h-5" />
                </button>
                <a
                  href="/pricing"
                  onClick={() => trackCtaClick("pricing_cta", "View All Plans", "footer_cta")}
                  className="px-6 py-4 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold rounded-xl transition-all inline-flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25"
                >
                  <Zap className="w-5 h-5" />
                  View Plans from €49/mo
                </a>
              </div>
              <p className="text-zinc-500 text-sm mt-4">
                Plans from €49/mo for self-service to €499/mo for done-for-you compliance
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <SiteFooter />

      {/* Post-scan upsell modal */}
      {showUpsell && result && (
        <PostScanUpsell
          score={result.score}
          totalIssues={result.totalIssues}
          criticalIssues={result.criticalIssues}
          url={url}
          onClose={() => setShowUpsell(false)}
          delay={3000}
        />
      )}

      {/* Real-time social proof notifications */}
      <RealtimeSocialProof />

      {/* Exit intent popup for lead capture */}
      <ExitIntentPopup />
    </div>
  );
}
