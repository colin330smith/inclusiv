'use client';

import { useState } from 'react';
import { Copy, Check, Code, ExternalLink, Download, Twitter, Linkedin } from 'lucide-react';

interface ShareableBadgeProps {
  domain: string;
  score: number;
}

export default function ShareableBadge({ domain, score }: ShareableBadgeProps) {
  const [copied, setCopied] = useState<string | null>(null);
  const [badgeStyle, setBadgeStyle] = useState<'flat' | 'flat-square' | 'plastic'>('flat');

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://tryinclusiv.com';
  const badgeUrl = `${baseUrl}/api/badge?domain=${encodeURIComponent(domain)}&score=${score}&style=${badgeStyle}`;
  const scanUrl = `${baseUrl}/scan/${encodeURIComponent(domain)}`;

  const getBadgeColor = () => {
    if (score >= 90) return '4ade80'; // green
    if (score >= 70) return 'facc15'; // yellow
    return 'f87171'; // red
  };

  const getGradeLabel = () => {
    if (score >= 95) return 'A+';
    if (score >= 90) return 'A';
    if (score >= 85) return 'B+';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    return 'Needs Work';
  };

  const embedCodes = {
    html: `<a href="${scanUrl}" target="_blank" rel="noopener">
  <img src="${badgeUrl}" alt="Accessibility Score: ${score}/100" />
</a>`,
    markdown: `[![Accessibility Score: ${score}/100](${badgeUrl})](${scanUrl})`,
    bbcode: `[url=${scanUrl}][img]${badgeUrl}[/img][/url]`,
  };

  const handleCopy = async (text: string, type: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const shareText = `My website ${domain} scored ${score}/100 on accessibility! Check your site's score for free:`;
  const shareUrl = encodeURIComponent(scanUrl);

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
      <div className="p-6 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <Code className="w-5 h-5 text-indigo-400" />
          <h3 className="text-lg font-bold text-white">Embed Your Score Badge</h3>
        </div>
        <p className="text-zinc-400 text-sm mt-1">
          Show visitors you care about accessibility
        </p>
      </div>

      <div className="p-6 space-y-6">
        {/* Badge Preview */}
        <div className="text-center">
          <div className="inline-block p-4 bg-zinc-800 rounded-xl">
            {/* SVG Badge Preview */}
            <svg width="200" height="28" xmlns="http://www.w3.org/2000/svg">
              <linearGradient id="a" x2="0" y2="100%">
                <stop offset="0" stopColor="#bbb" stopOpacity=".1"/>
                <stop offset="1" stopOpacity=".1"/>
              </linearGradient>
              <rect rx={badgeStyle === 'flat-square' ? '0' : '4'} width="200" height="28" fill="#555"/>
              <rect rx={badgeStyle === 'flat-square' ? '0' : '4'} x="120" width="80" height="28" fill={`#${getBadgeColor()}`}/>
              <rect rx={badgeStyle === 'flat-square' ? '0' : '4'} width="200" height="28" fill="url(#a)"/>
              <g fill="#fff" textAnchor="middle" fontFamily="Verdana,Geneva,DejaVu Sans,sans-serif" fontSize="11">
                <text x="60" y="19" fill="#fff">accessibility</text>
                <text x="160" y="19" fill="#fff">{score}/100 ({getGradeLabel()})</text>
              </g>
            </svg>
          </div>
          <p className="text-zinc-500 text-xs mt-2">Live badge - updates with each scan</p>
        </div>

        {/* Style Selector */}
        <div>
          <label className="text-sm text-zinc-400 mb-2 block">Badge Style</label>
          <div className="flex gap-2">
            {(['flat', 'flat-square', 'plastic'] as const).map((style) => (
              <button
                key={style}
                onClick={() => setBadgeStyle(style)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  badgeStyle === style
                    ? 'bg-indigo-600 text-white'
                    : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                }`}
              >
                {style.charAt(0).toUpperCase() + style.slice(1).replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Embed Codes */}
        <div className="space-y-4">
          {/* HTML */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm text-zinc-400">HTML</label>
              <button
                onClick={() => handleCopy(embedCodes.html, 'html')}
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
            <pre className="p-3 bg-zinc-800 rounded-lg text-xs text-zinc-300 overflow-x-auto">
              {embedCodes.html}
            </pre>
          </div>

          {/* Markdown */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm text-zinc-400">Markdown (GitHub, GitLab)</label>
              <button
                onClick={() => handleCopy(embedCodes.markdown, 'markdown')}
                className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300"
              >
                {copied === 'markdown' ? (
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
            <pre className="p-3 bg-zinc-800 rounded-lg text-xs text-zinc-300 overflow-x-auto">
              {embedCodes.markdown}
            </pre>
          </div>

          {/* Direct Link */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm text-zinc-400">Direct Image URL</label>
              <button
                onClick={() => handleCopy(badgeUrl, 'url')}
                className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300"
              >
                {copied === 'url' ? (
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
            <div className="p-3 bg-zinc-800 rounded-lg text-xs text-zinc-300 truncate">
              {badgeUrl}
            </div>
          </div>
        </div>

        {/* Social Share */}
        <div className="pt-4 border-t border-zinc-800">
          <p className="text-sm text-zinc-400 mb-3">Share your achievement</p>
          <div className="flex gap-3">
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${shareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors"
            >
              <Twitter className="w-4 h-4 text-zinc-300" />
              <span className="text-sm text-zinc-300">Twitter</span>
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors"
            >
              <Linkedin className="w-4 h-4 text-zinc-300" />
              <span className="text-sm text-zinc-300">LinkedIn</span>
            </a>
            <a
              href={badgeUrl}
              download={`accessibility-badge-${domain}.svg`}
              className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors"
            >
              <Download className="w-4 h-4 text-zinc-300" />
              <span className="text-sm text-zinc-300">Download</span>
            </a>
          </div>
        </div>

        {/* Use Cases */}
        <div className="p-4 bg-zinc-800/50 rounded-xl">
          <p className="text-sm text-white font-medium mb-2">Where to add your badge:</p>
          <ul className="space-y-1 text-xs text-zinc-400">
            <li className="flex items-center gap-2">
              <ExternalLink className="w-3 h-3" />
              Your website footer
            </li>
            <li className="flex items-center gap-2">
              <ExternalLink className="w-3 h-3" />
              GitHub README files
            </li>
            <li className="flex items-center gap-2">
              <ExternalLink className="w-3 h-3" />
              About or accessibility pages
            </li>
            <li className="flex items-center gap-2">
              <ExternalLink className="w-3 h-3" />
              Email signatures
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
