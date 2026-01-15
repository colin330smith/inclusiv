import { Metadata } from 'next';
import { Shield, AlertTriangle, CheckCircle, ArrowRight, Zap, Globe, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface ScanPageProps {
  searchParams: Promise<{
    score?: string;
    issues?: string;
    critical?: string;
    url?: string;
    platform?: string;
  }>;
}

// Generate dynamic metadata for social sharing
export async function generateMetadata({ searchParams }: ScanPageProps): Promise<Metadata> {
  const params = await searchParams;
  const score = parseInt(params.score || '0', 10);
  const url = params.url || '';
  const hostname = url ? url.replace(/^https?:\/\//, '').replace(/\/$/, '') : 'Website';

  const getScoreStatus = () => {
    if (score >= 80) return 'Good - Likely Compliant';
    if (score >= 50) return 'Needs Improvement';
    return 'At Risk - Action Required';
  };

  const title = `${hostname} Accessibility Score: ${score}/100`;
  const description = `${hostname} scored ${score}/100 on accessibility. Status: ${getScoreStatus()}. Free scan for your website at tryinclusiv.com`;

  // Build OG image URL
  const ogParams = new URLSearchParams({
    score: params.score || '0',
    issues: params.issues || '0',
    critical: params.critical || '0',
    url: params.url || '',
    platform: params.platform || 'Website',
  });

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      siteName: 'Inclusiv',
      images: [
        {
          url: `/api/og?${ogParams.toString()}`,
          width: 1200,
          height: 630,
          alt: `Accessibility scan results for ${hostname}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`/api/og?${ogParams.toString()}`],
    },
  };
}

export default async function ScanResultsPage({ searchParams }: ScanPageProps) {
  const params = await searchParams;
  const score = parseInt(params.score || '0', 10);
  const issues = parseInt(params.issues || '0', 10);
  const critical = parseInt(params.critical || '0', 10);
  const url = params.url || '';
  const platform = params.platform || 'Website';

  const hostname = url ? url.replace(/^https?:\/\//, '').replace(/\/$/, '') : 'Website';

  const getScoreColor = () => {
    if (score >= 80) return 'text-green-500';
    if (score >= 50) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getScoreStatus = () => {
    if (score >= 80) return { text: 'Good - Likely Compliant', color: 'text-green-500', bg: 'bg-green-500/10 border-green-500/20' };
    if (score >= 50) return { text: 'Needs Improvement', color: 'text-yellow-500', bg: 'bg-yellow-500/10 border-yellow-500/20' };
    return { text: 'At Risk - Action Required', color: 'text-red-500', bg: 'bg-red-500/10 border-red-500/20' };
  };

  const getScoreBorder = () => {
    if (score >= 80) return '#22c55e';
    if (score >= 50) return '#f59e0b';
    return '#ef4444';
  };

  const scoreStatus = getScoreStatus();

  const complianceChecks = [
    { label: 'WCAG 2.1 AA', status: score >= 80, description: 'Global Standard' },
    { label: 'EAA Ready', status: score >= 80, description: 'European Union' },
    { label: 'ADA Compliant', status: score >= 70, description: 'United States' },
    { label: 'EN 301 549', status: score >= 75, description: 'EU Technical' },
  ];

  // If no scan data, redirect to scanner
  if (!params.score) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">No Scan Data Found</h1>
          <p className="text-zinc-400 mb-6">Scan a website to see accessibility results.</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-colors"
          >
            <Shield className="w-5 h-5" />
            Start Free Scan
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="border-b border-zinc-800">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-indigo-500" />
            <span className="text-xl font-bold text-white">Inclusiv</span>
          </Link>
          <div className="flex items-center gap-2 px-3 py-1 bg-red-500/10 rounded-full text-sm text-red-400">
            <AlertTriangle className="w-4 h-4" />
            <span className="font-medium">EAA Now Enforced</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Shared Results Banner */}
        <div className="mb-8 p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
          <div className="flex items-center gap-3">
            <ExternalLink className="w-5 h-5 text-indigo-400 flex-shrink-0" />
            <div>
              <p className="text-white font-medium">Shared Scan Results</p>
              <p className="text-zinc-400 text-sm">
                These results were shared from an Inclusiv accessibility scan.{' '}
                <Link href="/" className="text-indigo-400 hover:text-indigo-300 underline">
                  Scan your own website free
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Results Card */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
          {/* Score Header */}
          <div className="p-8 border-b border-zinc-800">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Score Circle */}
              <div className="relative w-32 h-32 flex-shrink-0">
                <svg className="w-32 h-32" viewBox="0 0 100 100">
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
                    stroke={getScoreBorder()}
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={251.2}
                    strokeDashoffset={251.2 - (251.2 * score) / 100}
                    style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className={`text-4xl font-bold ${getScoreColor()}`}>{score}</span>
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 text-center md:text-left">
                <p className="text-zinc-400 mb-2">Accessibility Scan Results for</p>
                <h1 className="text-2xl font-bold text-white mb-3">{hostname}</h1>
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border ${scoreStatus.bg}`}>
                  <span className={`font-semibold ${scoreStatus.color}`}>{scoreStatus.text}</span>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-4 mt-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">{issues}</p>
                    <p className="text-sm text-zinc-400">Issues</p>
                  </div>
                  {critical > 0 && (
                    <div className="text-center">
                      <p className="text-2xl font-bold text-red-500">{critical}</p>
                      <p className="text-sm text-zinc-400">Critical</p>
                    </div>
                  )}
                  <div className="text-center">
                    <div className="flex items-center gap-1">
                      <Globe className="w-4 h-4 text-indigo-400" />
                      <p className="text-lg font-medium text-white">{platform}</p>
                    </div>
                    <p className="text-sm text-zinc-400">Platform</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Compliance Grid */}
          <div className="p-6 border-b border-zinc-800">
            <h2 className="text-lg font-semibold text-white mb-4">Compliance Status</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {complianceChecks.map((check, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-lg ${
                    check.status
                      ? 'bg-green-500/10 border border-green-500/20'
                      : 'bg-red-500/10 border border-red-500/20'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {check.status ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-red-500" />
                    )}
                    <span className={`text-sm font-medium ${check.status ? 'text-green-400' : 'text-red-400'}`}>
                      {check.label}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 mt-1 ml-6">{check.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="p-6 bg-gradient-to-r from-indigo-600/10 to-purple-600/10">
            <div className="text-center">
              <h2 className="text-xl font-bold text-white mb-2">Want to scan your own website?</h2>
              <p className="text-zinc-400 mb-6">Get a free accessibility scan with detailed fixes in under 30 seconds.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-500/25"
                >
                  <Zap className="w-5 h-5" />
                  Scan My Website Free
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold rounded-xl transition-colors"
                >
                  View Compliance Plans
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Notice */}
        {score < 70 && (
          <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-red-400 font-semibold">Legal Compliance Warning</h3>
                <p className="text-zinc-400 text-sm mt-1">
                  This website may not meet EAA (European Accessibility Act) requirements.
                  Non-compliant sites face fines up to €100,000. We recommend addressing critical issues immediately.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-8">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-zinc-400 text-sm">
            © {new Date().getFullYear()} Inclusiv. Free accessibility scanner powered by axe-core.
          </p>
          <div className="flex items-center justify-center gap-4 mt-4 text-sm">
            <Link href="/" className="text-zinc-400 hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/pricing" className="text-zinc-400 hover:text-white transition-colors">
              Pricing
            </Link>
            <Link href="/blog" className="text-zinc-400 hover:text-white transition-colors">
              Blog
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
