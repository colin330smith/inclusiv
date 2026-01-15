"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Shield,
  Download,
  Share2,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Globe,
  FileText,
  Printer,
  Mail,
  ArrowRight,
  Eye,
  Users,
  Award,
  BarChart3,
  Target,
  Zap,
} from "lucide-react";

interface IssueCategory {
  name: string;
  count: number;
  severity: "critical" | "major" | "minor";
  examples: string[];
}

interface CompetitorData {
  name: string;
  domain: string;
  score: number;
  issues: number;
  trend: "up" | "down" | "same";
}

export default function ReportPage({
  params,
}: {
  params: Promise<{ domain: string }>;
}) {
  const [domain, setDomain] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  useEffect(() => {
    params.then((p) => {
      setDomain(decodeURIComponent(p.domain));
      setLoading(false);
    });
  }, [params]);

  if (loading || !domain) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  // Generate demo report data
  const generateReportData = () => {
    const baseScore = 35 + Math.floor(Math.random() * 40);
    const totalIssues = Math.max(10, 80 - Math.floor(baseScore * 0.7));

    const issueCategories: IssueCategory[] = [
      {
        name: "Missing Alt Text",
        count: Math.floor(Math.random() * 20) + 5,
        severity: "critical",
        examples: [
          "Product images without descriptions",
          "Logo missing alt attribute",
          "Banner images with empty alt",
        ],
      },
      {
        name: "Color Contrast",
        count: Math.floor(Math.random() * 15) + 3,
        severity: "critical",
        examples: [
          "Body text fails 4.5:1 ratio",
          "Button text below threshold",
          "Link text hard to distinguish",
        ],
      },
      {
        name: "Form Labels",
        count: Math.floor(Math.random() * 10) + 2,
        severity: "major",
        examples: [
          "Email input without label",
          "Search field missing label",
          "Dropdown without accessible name",
        ],
      },
      {
        name: "Keyboard Navigation",
        count: Math.floor(Math.random() * 8) + 1,
        severity: "major",
        examples: [
          "Modal traps focus",
          "Skip link missing",
          "Custom dropdown not keyboard accessible",
        ],
      },
      {
        name: "ARIA Issues",
        count: Math.floor(Math.random() * 12) + 2,
        severity: "minor",
        examples: [
          "Invalid ARIA attributes",
          "Missing required ARIA roles",
          "Misused aria-hidden",
        ],
      },
      {
        name: "Heading Structure",
        count: Math.floor(Math.random() * 6) + 1,
        severity: "minor",
        examples: [
          "Skipped heading levels",
          "Multiple H1 tags",
          "Empty heading elements",
        ],
      },
    ];

    const competitors: CompetitorData[] = [
      {
        name: "Competitor A",
        domain: "competitor-a.com",
        score: baseScore + Math.floor(Math.random() * 20) - 10,
        issues: Math.floor(Math.random() * 40) + 20,
        trend: Math.random() > 0.5 ? "up" : "down",
      },
      {
        name: "Competitor B",
        domain: "competitor-b.com",
        score: baseScore + Math.floor(Math.random() * 25) - 12,
        issues: Math.floor(Math.random() * 50) + 15,
        trend: Math.random() > 0.5 ? "up" : "same",
      },
      {
        name: "Competitor C",
        domain: "competitor-c.com",
        score: baseScore + Math.floor(Math.random() * 30) - 15,
        issues: Math.floor(Math.random() * 35) + 25,
        trend: Math.random() > 0.3 ? "down" : "up",
      },
    ];

    return {
      score: baseScore,
      totalIssues,
      criticalIssues: issueCategories
        .filter((c) => c.severity === "critical")
        .reduce((acc, c) => acc + c.count, 0),
      majorIssues: issueCategories
        .filter((c) => c.severity === "major")
        .reduce((acc, c) => acc + c.count, 0),
      minorIssues: issueCategories
        .filter((c) => c.severity === "minor")
        .reduce((acc, c) => acc + c.count, 0),
      issueCategories,
      competitors,
      wcagLevel: baseScore >= 80 ? "AA" : baseScore >= 60 ? "A" : "Failing",
      eaaCompliant: baseScore >= 80,
      estimatedFixTime: Math.ceil(totalIssues * 0.5),
      potentialFine: Math.max(
        10000,
        Math.floor((100 - baseScore) * 1000 * (Math.random() + 0.5))
      ),
      industryAverage: 62,
      scannedPages: Math.floor(Math.random() * 20) + 10,
      scanDate: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    };
  };

  const report = generateReportData();

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-400";
    if (score >= 60) return "text-yellow-400";
    return "text-red-400";
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return "bg-green-500/20 border-green-500/30";
    if (score >= 60) return "bg-yellow-500/20 border-yellow-500/30";
    return "bg-red-500/20 border-red-500/30";
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "major":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      case "minor":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      default:
        return "bg-zinc-500/20 text-zinc-400";
    }
  };

  const shareUrl = `https://inclusiv.app/report/${encodeURIComponent(domain)}`;
  const shareText = `Check out the accessibility report for ${domain} - Score: ${report.score}/100`;

  const handlePrint = () => {
    window.print();
  };

  const handleEmailReport = async () => {
    if (!email) return;

    try {
      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          source: "report",
          domain,
        }),
      });
      setEmailSent(true);
    } catch (error) {
      console.error("Failed to send report:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] print:bg-white">
      {/* Header - Hide on print */}
      <header className="border-b border-zinc-800 print:hidden">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-indigo-500" />
            <span className="text-xl font-bold text-white">Inclusiv</span>
          </Link>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors text-sm"
            >
              <Printer className="w-4 h-4" />
              Print
            </button>
            <Link
              href="/"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-colors text-sm"
            >
              New Scan
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8 print:py-4">
        {/* Report Header */}
        <div className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 rounded-2xl p-8 mb-8 print:bg-white print:border-gray-300">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <FileText className="w-6 h-6 text-indigo-400 print:text-indigo-600" />
                <span className="text-indigo-400 print:text-indigo-600 font-medium">
                  Accessibility Audit Report
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white print:text-gray-900 mb-2">
                {domain}
              </h1>
              <p className="text-zinc-400 print:text-gray-600 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Generated on {report.scanDate} • {report.scannedPages} pages
                scanned
              </p>
            </div>

            {/* Score Badge */}
            <div
              className={`text-center p-6 rounded-2xl border ${getScoreBg(report.score)}`}
            >
              <div
                className={`text-5xl font-bold ${getScoreColor(report.score)} print:text-gray-900`}
              >
                {report.score}
              </div>
              <div className="text-zinc-400 print:text-gray-600 text-sm mt-1">
                out of 100
              </div>
            </div>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-zinc-900 print:bg-gray-50 border border-zinc-800 print:border-gray-200 rounded-xl p-6">
            <div className="flex items-center gap-2 text-zinc-400 print:text-gray-600 text-sm mb-2">
              <AlertTriangle className="w-4 h-4" />
              Total Issues
            </div>
            <p className="text-3xl font-bold text-white print:text-gray-900">
              {report.totalIssues}
            </p>
            <p className="text-red-400 text-sm mt-1">
              {report.criticalIssues} critical
            </p>
          </div>

          <div className="bg-zinc-900 print:bg-gray-50 border border-zinc-800 print:border-gray-200 rounded-xl p-6">
            <div className="flex items-center gap-2 text-zinc-400 print:text-gray-600 text-sm mb-2">
              <Target className="w-4 h-4" />
              WCAG Level
            </div>
            <p
              className={`text-3xl font-bold ${report.wcagLevel === "AA" ? "text-green-400" : report.wcagLevel === "A" ? "text-yellow-400" : "text-red-400"} print:text-gray-900`}
            >
              {report.wcagLevel}
            </p>
            <p className="text-zinc-500 print:text-gray-500 text-sm mt-1">
              Target: AA
            </p>
          </div>

          <div className="bg-zinc-900 print:bg-gray-50 border border-zinc-800 print:border-gray-200 rounded-xl p-6">
            <div className="flex items-center gap-2 text-zinc-400 print:text-gray-600 text-sm mb-2">
              <Shield className="w-4 h-4" />
              EAA Status
            </div>
            {report.eaaCompliant ? (
              <p className="text-3xl font-bold text-green-400 print:text-green-600 flex items-center gap-2">
                <CheckCircle className="w-6 h-6" />
                Ready
              </p>
            ) : (
              <p className="text-3xl font-bold text-red-400 print:text-red-600 flex items-center gap-2">
                <XCircle className="w-6 h-6" />
                At Risk
              </p>
            )}
            <p className="text-zinc-500 print:text-gray-500 text-sm mt-1">
              June 2025
            </p>
          </div>

          <div className="bg-zinc-900 print:bg-gray-50 border border-zinc-800 print:border-gray-200 rounded-xl p-6">
            <div className="flex items-center gap-2 text-zinc-400 print:text-gray-600 text-sm mb-2">
              <Clock className="w-4 h-4" />
              Est. Fix Time
            </div>
            <p className="text-3xl font-bold text-white print:text-gray-900">
              {report.estimatedFixTime}h
            </p>
            <p className="text-zinc-500 print:text-gray-500 text-sm mt-1">
              developer hours
            </p>
          </div>
        </div>

        {/* Risk Assessment */}
        <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 mb-8 print:bg-red-50 print:border-red-200">
          <h2 className="text-xl font-bold text-white print:text-gray-900 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            EAA Risk Assessment
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-zinc-300 print:text-gray-700 mb-4">
                Based on your current accessibility score, your website may face
                significant penalties under the European Accessibility Act
                (EAA) when enforcement begins in June 2025.
              </p>
              <div className="bg-zinc-900 print:bg-white rounded-xl p-4 border border-zinc-800 print:border-gray-200">
                <p className="text-zinc-400 print:text-gray-600 text-sm mb-1">
                  Potential Annual Fine
                </p>
                <p className="text-3xl font-bold text-red-400 print:text-red-600">
                  €{report.potentialFine.toLocaleString()}
                </p>
                <p className="text-zinc-500 print:text-gray-500 text-xs mt-1">
                  Per EU member state where you operate
                </p>
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="font-medium text-white print:text-gray-900">
                Key Risk Factors:
              </h3>
              <ul className="space-y-2 text-zinc-300 print:text-gray-700 text-sm">
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                  <span>
                    {report.criticalIssues} critical WCAG violations detected
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                  <span>Currently below WCAG 2.1 AA compliance threshold</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                  <span>
                    Multiple pages with accessibility barriers for users with
                    disabilities
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span>
                    Estimated {report.estimatedFixTime} hours needed to reach
                    compliance
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Issue Breakdown */}
        <div className="bg-zinc-900 print:bg-gray-50 border border-zinc-800 print:border-gray-200 rounded-2xl overflow-hidden mb-8">
          <div className="p-6 border-b border-zinc-800 print:border-gray-200">
            <h2 className="text-xl font-bold text-white print:text-gray-900 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-indigo-400" />
              Issue Breakdown by Category
            </h2>
          </div>
          <div className="divide-y divide-zinc-800 print:divide-gray-200">
            {report.issueCategories.map((category, i) => (
              <div key={i} className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium border ${getSeverityColor(category.severity)}`}
                    >
                      {category.severity}
                    </span>
                    <h3 className="font-medium text-white print:text-gray-900">
                      {category.name}
                    </h3>
                  </div>
                  <span className="text-2xl font-bold text-white print:text-gray-900">
                    {category.count}
                  </span>
                </div>
                <div className="ml-20">
                  <p className="text-zinc-400 print:text-gray-600 text-sm mb-2">
                    Examples found:
                  </p>
                  <ul className="space-y-1">
                    {category.examples.map((example, j) => (
                      <li
                        key={j}
                        className="text-zinc-500 print:text-gray-500 text-sm flex items-center gap-2"
                      >
                        <span className="w-1 h-1 bg-zinc-600 rounded-full" />
                        {example}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Competitor Comparison */}
        <div className="bg-zinc-900 print:bg-gray-50 border border-zinc-800 print:border-gray-200 rounded-2xl overflow-hidden mb-8">
          <div className="p-6 border-b border-zinc-800 print:border-gray-200">
            <h2 className="text-xl font-bold text-white print:text-gray-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-400" />
              Competitor Comparison
            </h2>
            <p className="text-zinc-400 print:text-gray-600 text-sm mt-1">
              Industry average score: {report.industryAverage}/100
            </p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {/* Your site */}
              <div className="flex items-center gap-4">
                <div className="w-32 text-sm font-medium text-indigo-400">
                  {domain}
                </div>
                <div className="flex-1 relative">
                  <div className="h-8 bg-zinc-800 print:bg-gray-200 rounded-lg overflow-hidden">
                    <div
                      className={`h-full rounded-lg ${report.score >= 80 ? "bg-green-500" : report.score >= 60 ? "bg-yellow-500" : "bg-red-500"}`}
                      style={{ width: `${report.score}%` }}
                    />
                  </div>
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white print:text-gray-900 font-bold text-sm">
                    {report.score}
                  </span>
                </div>
                <div className="w-20 text-right">
                  <span className="text-xs px-2 py-1 bg-indigo-500/20 text-indigo-400 rounded">
                    Your Site
                  </span>
                </div>
              </div>

              {/* Competitors */}
              {report.competitors.map((competitor, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-32 text-sm text-zinc-400 print:text-gray-600 truncate">
                    {competitor.domain}
                  </div>
                  <div className="flex-1 relative">
                    <div className="h-8 bg-zinc-800 print:bg-gray-200 rounded-lg overflow-hidden">
                      <div
                        className={`h-full rounded-lg ${competitor.score >= 80 ? "bg-green-500/50" : competitor.score >= 60 ? "bg-yellow-500/50" : "bg-red-500/50"}`}
                        style={{ width: `${competitor.score}%` }}
                      />
                    </div>
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white print:text-gray-900 font-medium text-sm">
                      {competitor.score}
                    </span>
                  </div>
                  <div className="w-20 text-right">
                    {competitor.trend === "up" ? (
                      <TrendingUp className="w-4 h-4 text-green-400 inline" />
                    ) : competitor.trend === "down" ? (
                      <TrendingDown className="w-4 h-4 text-red-400 inline" />
                    ) : (
                      <span className="text-zinc-500">—</span>
                    )}
                  </div>
                </div>
              ))}

              {/* Industry average line */}
              <div className="flex items-center gap-4 mt-4 pt-4 border-t border-zinc-800 print:border-gray-200">
                <div className="w-32 text-sm text-zinc-500 print:text-gray-500">
                  Industry Avg
                </div>
                <div className="flex-1 relative">
                  <div className="h-8 bg-zinc-800/50 print:bg-gray-100 rounded-lg overflow-hidden">
                    <div
                      className="h-full rounded-lg bg-zinc-600 print:bg-gray-400"
                      style={{ width: `${report.industryAverage}%` }}
                    />
                  </div>
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 print:text-gray-600 font-medium text-sm">
                    {report.industryAverage}
                  </span>
                </div>
                <div className="w-20"></div>
              </div>
            </div>

            {/* Position Summary */}
            <div className="mt-6 p-4 bg-zinc-800/50 print:bg-gray-100 rounded-xl">
              <p className="text-zinc-300 print:text-gray-700 text-sm">
                {report.score >= report.industryAverage ? (
                  <>
                    <span className="text-green-400 print:text-green-600 font-medium">
                      Good news!
                    </span>{" "}
                    Your accessibility score is{" "}
                    {report.score - report.industryAverage} points above the
                    industry average.
                  </>
                ) : (
                  <>
                    <span className="text-red-400 print:text-red-600 font-medium">
                      Attention needed:
                    </span>{" "}
                    Your accessibility score is{" "}
                    {report.industryAverage - report.score} points below the
                    industry average.
                  </>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-zinc-900 print:bg-gray-50 border border-zinc-800 print:border-gray-200 rounded-2xl p-6 mb-8">
          <h2 className="text-xl font-bold text-white print:text-gray-900 mb-6 flex items-center gap-2">
            <Zap className="w-5 h-5 text-indigo-400" />
            Priority Actions
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
              <div className="flex items-center gap-2 text-red-400 font-medium mb-2">
                <span className="w-2 h-2 bg-red-500 rounded-full" />
                Immediate (Week 1)
              </div>
              <ul className="space-y-2 text-zinc-300 print:text-gray-700 text-sm">
                <li>• Fix all missing image alt text</li>
                <li>• Address color contrast failures</li>
                <li>• Add form field labels</li>
              </ul>
            </div>
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
              <div className="flex items-center gap-2 text-yellow-400 font-medium mb-2">
                <span className="w-2 h-2 bg-yellow-500 rounded-full" />
                Short-term (Week 2-3)
              </div>
              <ul className="space-y-2 text-zinc-300 print:text-gray-700 text-sm">
                <li>• Fix keyboard navigation issues</li>
                <li>• Implement skip links</li>
                <li>• Correct heading structure</li>
              </ul>
            </div>
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <div className="flex items-center gap-2 text-green-400 font-medium mb-2">
                <span className="w-2 h-2 bg-green-500 rounded-full" />
                Ongoing (Month 1+)
              </div>
              <ul className="space-y-2 text-zinc-300 print:text-gray-700 text-sm">
                <li>• Implement continuous monitoring</li>
                <li>• Train development team</li>
                <li>• Create accessibility guidelines</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Email Report Section - Hide on print */}
        <div className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 rounded-2xl p-8 mb-8 print:hidden">
          <div className="max-w-xl mx-auto text-center">
            <Mail className="w-10 h-10 text-indigo-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">
              Email This Report
            </h2>
            <p className="text-zinc-400 mb-6">
              Get a copy of this report delivered to your inbox with additional
              recommendations.
            </p>

            {emailSent ? (
              <div className="flex items-center justify-center gap-2 text-green-400">
                <CheckCircle className="w-5 h-5" />
                <span>Report sent! Check your inbox.</span>
              </div>
            ) : (
              <div className="flex gap-3">
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
                />
                <button
                  onClick={handleEmailReport}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl transition-colors"
                >
                  Send Report
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Share Section - Hide on print */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-8 print:hidden">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Share2 className="w-5 h-5 text-indigo-400" />
              <span className="text-white font-medium">Share this report</span>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors text-sm"
              >
                Share on X
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors text-sm"
              >
                Share on LinkedIn
              </a>
              <button
                onClick={() => navigator.clipboard.writeText(shareUrl)}
                className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors text-sm"
              >
                Copy Link
              </button>
            </div>
          </div>
        </div>

        {/* CTA Section - Hide on print */}
        <div className="text-center print:hidden">
          <h2 className="text-2xl font-bold text-white mb-4">
            Ready to Fix These Issues?
          </h2>
          <p className="text-zinc-400 mb-6 max-w-xl mx-auto">
            Get detailed guidance on fixing each issue and track your progress
            with continuous monitoring.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-500/25"
            >
              <Shield className="w-5 h-5" />
              Get Full Access
            </Link>
            <Link
              href={`/timeline/${encodeURIComponent(domain)}`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold rounded-xl transition-colors"
            >
              View Progress Timeline
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Print Footer */}
        <div className="hidden print:block mt-12 pt-6 border-t border-gray-200 text-center text-gray-500 text-sm">
          <p>
            Generated by Inclusiv • inclusiv.app • {report.scanDate}
          </p>
          <p className="mt-1">
            This report is for informational purposes only. For a comprehensive
            audit, visit inclusiv.app
          </p>
        </div>
      </main>

      {/* Footer - Hide on print */}
      <footer className="border-t border-zinc-800 py-8 mt-12 print:hidden">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-6 text-sm">
            <Link
              href="/"
              className="text-zinc-400 hover:text-white transition-colors"
            >
              Home
            </Link>
            <Link
              href="/leaderboard"
              className="text-zinc-400 hover:text-white transition-colors"
            >
              Leaderboard
            </Link>
            <Link
              href="/monitor"
              className="text-zinc-400 hover:text-white transition-colors"
            >
              Monitor
            </Link>
            <Link
              href="/pricing"
              className="text-zinc-400 hover:text-white transition-colors"
            >
              Pricing
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
