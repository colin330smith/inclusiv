'use client';

import { useState } from 'react';
import { Share2, Twitter, Linkedin, Copy, Check, Mail, MessageCircle } from 'lucide-react';

interface ShareResultsProps {
  score: number;
  issues: number;
  criticalIssues: number;
  url: string;
  platform: string;
}

export default function ShareResults({
  score,
  issues,
  criticalIssues,
  url,
  platform,
}: ShareResultsProps) {
  const [copied, setCopied] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  // Build share URL with scan parameters
  const getShareUrl = () => {
    const params = new URLSearchParams({
      score: score.toString(),
      issues: issues.toString(),
      critical: criticalIssues.toString(),
      url: url,
      platform: platform,
    });
    return `https://tryinclusiv.com/scan?${params.toString()}`;
  };

  // Get OG image URL
  const getOgImageUrl = () => {
    const params = new URLSearchParams({
      score: score.toString(),
      issues: issues.toString(),
      critical: criticalIssues.toString(),
      url: url,
      platform: platform,
    });
    return `https://tryinclusiv.com/api/og?${params.toString()}`;
  };

  const shareUrl = getShareUrl();
  const hostname = url.replace(/^https?:\/\//, '').replace(/\/$/, '');

  // Get score status text
  const getScoreText = () => {
    if (score >= 80) return 'passes';
    if (score >= 50) return 'needs work on';
    return 'has critical issues with';
  };

  // Share text
  const shareText = `I just scanned ${hostname} for accessibility - it ${getScoreText()} EAA compliance with a score of ${score}/100. Check your site free:`;
  const shareTextEncoded = encodeURIComponent(shareText);

  // Copy to clipboard
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Share handlers
  const shareHandlers = {
    twitter: () => {
      window.open(
        `https://twitter.com/intent/tweet?text=${shareTextEncoded}&url=${encodeURIComponent(shareUrl)}`,
        '_blank',
        'width=550,height=420'
      );
    },
    linkedin: () => {
      window.open(
        `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
        '_blank',
        'width=550,height=420'
      );
    },
    email: () => {
      window.location.href = `mailto:?subject=Accessibility Scan Results for ${hostname}&body=${shareTextEncoded} ${shareUrl}`;
    },
    whatsapp: () => {
      window.open(
        `https://wa.me/?text=${shareTextEncoded} ${encodeURIComponent(shareUrl)}`,
        '_blank'
      );
    },
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white rounded-lg transition-colors text-sm font-medium"
      >
        <Share2 className="w-4 h-4" />
        Share Results
      </button>

      {showDropdown && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowDropdown(false)}
          />

          {/* Dropdown */}
          <div className="absolute right-0 top-full mt-2 w-72 bg-zinc-800 border border-zinc-700 rounded-xl shadow-xl z-50 overflow-hidden">
            <div className="p-4 border-b border-zinc-700">
              <p className="text-white font-medium mb-2">Share your results</p>
              <p className="text-zinc-400 text-sm">
                Show others how your site scores on accessibility
              </p>
            </div>

            {/* Share buttons */}
            <div className="p-2 space-y-1">
              <button
                onClick={shareHandlers.twitter}
                className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-zinc-700 rounded-lg transition-colors text-left"
              >
                <div className="w-8 h-8 bg-[#1DA1F2]/10 rounded-lg flex items-center justify-center">
                  <Twitter className="w-4 h-4 text-[#1DA1F2]" />
                </div>
                <span className="text-zinc-300 text-sm">Share on X (Twitter)</span>
              </button>

              <button
                onClick={shareHandlers.linkedin}
                className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-zinc-700 rounded-lg transition-colors text-left"
              >
                <div className="w-8 h-8 bg-[#0A66C2]/10 rounded-lg flex items-center justify-center">
                  <Linkedin className="w-4 h-4 text-[#0A66C2]" />
                </div>
                <span className="text-zinc-300 text-sm">Share on LinkedIn</span>
              </button>

              <button
                onClick={shareHandlers.whatsapp}
                className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-zinc-700 rounded-lg transition-colors text-left"
              >
                <div className="w-8 h-8 bg-[#25D366]/10 rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                </div>
                <span className="text-zinc-300 text-sm">Share on WhatsApp</span>
              </button>

              <button
                onClick={shareHandlers.email}
                className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-zinc-700 rounded-lg transition-colors text-left"
              >
                <div className="w-8 h-8 bg-indigo-500/10 rounded-lg flex items-center justify-center">
                  <Mail className="w-4 h-4 text-indigo-400" />
                </div>
                <span className="text-zinc-300 text-sm">Share via Email</span>
              </button>
            </div>

            {/* Copy link */}
            <div className="p-3 border-t border-zinc-700">
              <p className="text-xs text-zinc-400 mb-2">Or copy link</p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={shareUrl}
                  readOnly
                  className="flex-1 px-3 py-2 bg-zinc-900 border border-zinc-600 rounded-lg text-zinc-300 text-xs truncate focus:outline-none"
                />
                <button
                  onClick={handleCopy}
                  className="px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors flex items-center gap-1"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Preview note */}
            <div className="px-3 pb-3">
              <p className="text-xs text-zinc-500">
                When shared, this link will show a preview card with your score and compliance status.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
