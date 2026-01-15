'use client';

import { useState } from 'react';
import { Share2, Twitter, Linkedin, Link2, Check, Facebook, Mail } from 'lucide-react';
import { trackFeatureClick } from '@/lib/analytics';

interface ShareButtonsProps {
  score: number;
  url: string;
  totalIssues: number;
  criticalIssues: number;
  platform: string;
}

export default function ShareButtons({ score, url, totalIssues, criticalIssues, platform }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Generate share URL with OG image parameters
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://tryinclusiv.com';

  // Clean URL for display
  const displayUrl = url.replace(/^https?:\/\//, '').replace(/\/$/, '');

  // Create OG image URL for sharing
  const ogImageUrl = `${baseUrl}/api/og?score=${score}&issues=${totalIssues}&critical=${criticalIssues}&url=${encodeURIComponent(displayUrl)}&platform=${encodeURIComponent(platform)}`;

  // Create shareable page URL (could be a dedicated share page or the main page with query params)
  const shareUrl = `${baseUrl}?shared=true&score=${score}&url=${encodeURIComponent(displayUrl)}`;

  const getScoreStatus = () => {
    if (score >= 80) return 'Good - Likely Compliant';
    if (score >= 50) return 'Needs Improvement';
    return 'At Risk - Action Required';
  };

  const shareText = score >= 70
    ? `Just checked my website's accessibility score: ${score}/100! ${getScoreStatus()}. Check yours free at tryinclusiv.com`
    : `My website scored ${score}/100 on accessibility (${totalIssues} issues found). Time to fix this! Free scan at tryinclusiv.com`;

  const encodedShareText = encodeURIComponent(shareText);
  const encodedUrl = encodeURIComponent(shareUrl);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedShareText}&url=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedShareText}`,
    email: `mailto:?subject=Website Accessibility Score: ${score}/100&body=${encodeURIComponent(`${shareText}\n\nScan your website: ${shareUrl}`)}`,
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      trackFeatureClick('share_copy_link', 'scan_results');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleShare = (platform: string) => {
    trackFeatureClick(`share_${platform}`, 'scan_results');
    setIsOpen(false);
  };

  // Native share API for mobile
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Accessibility Score: ${score}/100`,
          text: shareText,
          url: shareUrl,
        });
        trackFeatureClick('share_native', 'scan_results');
      } catch (err) {
        // User cancelled or share failed
        console.log('Share cancelled');
      }
    } else {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="relative">
      {/* Main Share Button */}
      <button
        onClick={handleNativeShare}
        className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg transition-colors text-sm font-medium"
      >
        <Share2 className="w-4 h-4" />
        Share Results
      </button>

      {/* Share Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-zinc-900 border border-zinc-700 rounded-xl shadow-xl z-50 overflow-hidden">
          <div className="p-3 border-b border-zinc-700">
            <p className="text-xs text-zinc-400">Share your accessibility score</p>
          </div>

          <div className="p-2">
            {/* Twitter/X */}
            <a
              href={shareLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleShare('twitter')}
              className="flex items-center gap-3 px-3 py-2.5 hover:bg-zinc-800 rounded-lg transition-colors group"
            >
              <div className="w-8 h-8 bg-zinc-800 group-hover:bg-zinc-700 rounded-lg flex items-center justify-center">
                <Twitter className="w-4 h-4 text-zinc-400" />
              </div>
              <span className="text-sm text-zinc-300">Share on X</span>
            </a>

            {/* LinkedIn */}
            <a
              href={shareLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleShare('linkedin')}
              className="flex items-center gap-3 px-3 py-2.5 hover:bg-zinc-800 rounded-lg transition-colors group"
            >
              <div className="w-8 h-8 bg-zinc-800 group-hover:bg-zinc-700 rounded-lg flex items-center justify-center">
                <Linkedin className="w-4 h-4 text-zinc-400" />
              </div>
              <span className="text-sm text-zinc-300">Share on LinkedIn</span>
            </a>

            {/* Facebook */}
            <a
              href={shareLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleShare('facebook')}
              className="flex items-center gap-3 px-3 py-2.5 hover:bg-zinc-800 rounded-lg transition-colors group"
            >
              <div className="w-8 h-8 bg-zinc-800 group-hover:bg-zinc-700 rounded-lg flex items-center justify-center">
                <Facebook className="w-4 h-4 text-zinc-400" />
              </div>
              <span className="text-sm text-zinc-300">Share on Facebook</span>
            </a>

            {/* Email */}
            <a
              href={shareLinks.email}
              onClick={() => handleShare('email')}
              className="flex items-center gap-3 px-3 py-2.5 hover:bg-zinc-800 rounded-lg transition-colors group"
            >
              <div className="w-8 h-8 bg-zinc-800 group-hover:bg-zinc-700 rounded-lg flex items-center justify-center">
                <Mail className="w-4 h-4 text-zinc-400" />
              </div>
              <span className="text-sm text-zinc-300">Send via Email</span>
            </a>

            {/* Copy Link */}
            <button
              onClick={copyToClipboard}
              className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-zinc-800 rounded-lg transition-colors group"
            >
              <div className="w-8 h-8 bg-zinc-800 group-hover:bg-zinc-700 rounded-lg flex items-center justify-center">
                {copied ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Link2 className="w-4 h-4 text-zinc-400" />
                )}
              </div>
              <span className="text-sm text-zinc-300">
                {copied ? 'Copied!' : 'Copy Link'}
              </span>
            </button>
          </div>

          {/* Score Preview */}
          <div className="p-3 border-t border-zinc-700 bg-zinc-800/50">
            <div className="flex items-center gap-3">
              <div className={`text-2xl font-bold ${score >= 80 ? 'text-green-500' : score >= 50 ? 'text-yellow-500' : 'text-red-500'}`}>
                {score}
              </div>
              <div>
                <p className="text-xs text-zinc-400">Your Score</p>
                <p className="text-xs text-zinc-500">{displayUrl}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Click outside to close */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
