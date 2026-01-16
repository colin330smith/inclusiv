'use client';

import { useState } from 'react';
import {
  Share2,
  Twitter,
  Linkedin,
  Copy,
  Check,
  Code,
  ExternalLink,
  Trophy,
  AlertTriangle,
} from 'lucide-react';

interface ViralSharePanelProps {
  score: number;
  url: string;
  totalIssues: number;
  criticalIssues: number;
  platform: string;
}

export default function ViralSharePanel({
  score,
  url,
  totalIssues,
  criticalIssues,
  platform,
}: ViralSharePanelProps) {
  const [copied, setCopied] = useState<string | null>(null);
  const [showEmbed, setShowEmbed] = useState(false);

  const hostname = url.replace(/^https?:\/\//, '').replace(/\/$/, '').split('/')[0];
  const appUrl = typeof window !== 'undefined' ? window.location.origin : 'https://tryinclusiv.com';

  // Build shareable URL
  const shareUrl = `${appUrl}/scan?score=${score}&issues=${totalIssues}&critical=${criticalIssues}&url=${encodeURIComponent(url)}&platform=${encodeURIComponent(platform)}`;

  // Social share messages
  const getShareMessage = () => {
    if (score >= 80) {
      return `${hostname} just scored ${score}/100 on accessibility! Verified compliant with WCAG 2.1 AA and EAA-ready. Scan your site free:`;
    } else if (score >= 50) {
      return `We scanned ${hostname} for accessibility compliance and found ${totalIssues} issues to fix. Score: ${score}/100. Check your site:`;
    } else {
      return `Accessibility alert for ${hostname}: Score ${score}/100 with ${criticalIssues} critical issues. EAA compliance deadline passed. Free scan:`;
    }
  };

  const twitterText = encodeURIComponent(getShareMessage());
  const linkedinText = encodeURIComponent(
    `${getShareMessage()}\n\nThe European Accessibility Act is now enforced. Non-compliant websites face fines up to 100,000. Get your free accessibility score:`
  );

  const handleCopy = async (text: string, type: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  // Embeddable badge HTML
  const getBadgeHtml = () => {
    const badgeUrl = `${appUrl}/api/badge?score=${score}&url=${encodeURIComponent(url)}`;
    const linkUrl = `${appUrl}?ref=badge&url=${encodeURIComponent(url)}`;

    return `<a href="${linkUrl}" target="_blank" rel="noopener" title="Accessibility Score by Inclusiv">
  <img src="${badgeUrl}" alt="Accessibility Score: ${score}/100" width="120" height="40" />
</a>`;
  };

  // Markdown badge
  const getBadgeMarkdown = () => {
    const badgeUrl = `${appUrl}/api/badge?score=${score}&url=${encodeURIComponent(url)}`;
    const linkUrl = `${appUrl}?ref=badge&url=${encodeURIComponent(url)}`;
    return `[![Accessibility Score: ${score}/100](${badgeUrl})](${linkUrl})`;
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Share2 className="w-5 h-5 text-indigo-400" />
          <h3 className="text-white font-semibold">Share Your Score</h3>
        </div>
        {score >= 80 && (
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-green-500/10 rounded-full">
            <Trophy className="w-4 h-4 text-green-400" />
            <span className="text-xs text-green-400 font-medium">Compliant</span>
          </div>
        )}
      </div>

      {/* Share Buttons */}
      <div className="p-4 space-y-3">
        {/* Social Share Row */}
        <div className="grid grid-cols-2 gap-3">
          {/* Twitter/X */}
          <a
            href={`https://twitter.com/intent/tweet?text=${twitterText}&url=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors group"
          >
            <Twitter className="w-4 h-4 text-zinc-400 group-hover:text-white" />
            <span className="text-sm text-zinc-300 group-hover:text-white">Share on X</span>
          </a>

          {/* LinkedIn */}
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors group"
          >
            <Linkedin className="w-4 h-4 text-zinc-400 group-hover:text-white" />
            <span className="text-sm text-zinc-300 group-hover:text-white">LinkedIn</span>
          </a>
        </div>

        {/* Copy Link */}
        <button
          onClick={() => handleCopy(shareUrl, 'link')}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors"
        >
          {copied === 'link' ? (
            <>
              <Check className="w-4 h-4 text-green-400" />
              <span className="text-sm text-green-400">Link Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-zinc-400" />
              <span className="text-sm text-zinc-300">Copy Shareable Link</span>
            </>
          )}
        </button>

        {/* Embed Badge Toggle */}
        <button
          onClick={() => setShowEmbed(!showEmbed)}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-indigo-500/30 bg-indigo-500/10 hover:bg-indigo-500/20 rounded-lg transition-colors"
        >
          <Code className="w-4 h-4 text-indigo-400" />
          <span className="text-sm text-indigo-300">
            {showEmbed ? 'Hide' : 'Get'} Embeddable Badge
          </span>
        </button>
      </div>

      {/* Embed Code Section */}
      {showEmbed && (
        <div className="p-4 pt-0 space-y-4">
          {/* Badge Preview */}
          <div className="p-4 bg-white rounded-lg flex items-center justify-center">
            <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
              score >= 80 ? 'bg-green-100' : score >= 50 ? 'bg-yellow-100' : 'bg-red-100'
            }`}>
              <div className={`text-lg font-bold ${
                score >= 80 ? 'text-green-600' : score >= 50 ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {score}
              </div>
              <div className="text-xs text-gray-600">
                <div className="font-medium">A11y Score</div>
                <div className="text-gray-500">by Inclusiv</div>
              </div>
            </div>
          </div>

          {/* HTML Code */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-zinc-400 font-medium">HTML Embed</span>
              <button
                onClick={() => handleCopy(getBadgeHtml(), 'html')}
                className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300"
              >
                {copied === 'html' ? (
                  <>
                    <Check className="w-3 h-3" />
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
            <pre className="p-3 bg-zinc-950 rounded-lg text-xs text-zinc-300 overflow-x-auto">
              <code>{getBadgeHtml()}</code>
            </pre>
          </div>

          {/* Markdown Code */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-zinc-400 font-medium">Markdown (README)</span>
              <button
                onClick={() => handleCopy(getBadgeMarkdown(), 'md')}
                className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300"
              >
                {copied === 'md' ? (
                  <>
                    <Check className="w-3 h-3" />
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
            <pre className="p-3 bg-zinc-950 rounded-lg text-xs text-zinc-300 overflow-x-auto">
              <code>{getBadgeMarkdown()}</code>
            </pre>
          </div>

          <p className="text-xs text-zinc-500">
            Add this badge to your website footer or README to show your accessibility commitment.
            Badge updates automatically when you rescan.
          </p>
        </div>
      )}

      {/* Challenge CTA for low scores */}
      {score < 80 && (
        <div className="p-4 bg-gradient-to-r from-orange-500/10 to-red-500/10 border-t border-orange-500/20">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-white text-sm font-medium mb-1">
                Challenge a competitor!
              </p>
              <p className="text-zinc-400 text-xs mb-2">
                Think your competitor&apos;s site is less accessible? Scan them and share the comparison.
              </p>
              <a
                href="/"
                className="inline-flex items-center gap-1 text-xs text-orange-400 hover:text-orange-300"
              >
                Scan another site
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
