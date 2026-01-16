'use client';

import { useState, useEffect } from 'react';
import { Shield, Check, X, Copy, RefreshCw, ArrowRight, Palette } from 'lucide-react';
import Link from 'next/link';
import { SiteFooter } from '@/components/seo/SiteFooter';

// Calculate relative luminance
function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

// Calculate contrast ratio
function getContrastRatio(l1: number, l2: number): number {
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

// Parse hex to RGB
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

// WCAG compliance levels
function getWCAGCompliance(ratio: number) {
  return {
    aaLarge: ratio >= 3,
    aaNormal: ratio >= 4.5,
    aaaLarge: ratio >= 4.5,
    aaaNormal: ratio >= 7,
  };
}

export default function ContrastCheckerPage() {
  const [foreground, setForeground] = useState('#ffffff');
  const [background, setBackground] = useState('#1a1a2e');
  const [ratio, setRatio] = useState<number>(0);
  const [compliance, setCompliance] = useState<ReturnType<typeof getWCAGCompliance> | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fgRgb = hexToRgb(foreground);
    const bgRgb = hexToRgb(background);

    if (fgRgb && bgRgb) {
      const fgLum = getLuminance(fgRgb.r, fgRgb.g, fgRgb.b);
      const bgLum = getLuminance(bgRgb.r, bgRgb.g, bgRgb.b);
      const contrastRatio = getContrastRatio(fgLum, bgLum);
      setRatio(contrastRatio);
      setCompliance(getWCAGCompliance(contrastRatio));
    }
  }, [foreground, background]);

  const swapColors = () => {
    const temp = foreground;
    setForeground(background);
    setBackground(temp);
  };

  const copyCSS = () => {
    const css = `color: ${foreground};\nbackground-color: ${background};`;
    navigator.clipboard.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const presets = [
    { fg: '#ffffff', bg: '#000000', name: 'Black & White' },
    { fg: '#1a1a2e', bg: '#ffffff', name: 'Dark on Light' },
    { fg: '#6366f1', bg: '#0f0f23', name: 'Indigo Dark' },
    { fg: '#22c55e', bg: '#0a0a0a', name: 'Green Dark' },
    { fg: '#f59e0b', bg: '#1f2937', name: 'Amber Gray' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="border-b border-zinc-800">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-indigo-500" />
            <span className="text-xl font-bold text-white">Inclusiv</span>
          </Link>
          <Link
            href="/"
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-colors text-sm"
          >
            Full Website Scan
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 rounded-full text-indigo-400 text-sm font-medium mb-4">
            <Palette className="w-4 h-4" />
            Free WCAG Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Color Contrast Checker
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Check if your color combinations meet WCAG 2.1 accessibility standards.
            Required for EAA and ADA compliance.
          </p>
        </div>

        {/* Main Tool */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Color Pickers */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-6">Select Colors</h2>

            {/* Foreground */}
            <div className="mb-6">
              <label className="block text-sm text-zinc-400 mb-2">Text Color (Foreground)</label>
              <div className="flex gap-3">
                <div className="relative">
                  <input
                    type="color"
                    value={foreground}
                    onChange={(e) => setForeground(e.target.value)}
                    className="w-16 h-12 rounded-lg cursor-pointer border-2 border-zinc-700"
                  />
                </div>
                <input
                  type="text"
                  value={foreground}
                  onChange={(e) => setForeground(e.target.value)}
                  className="flex-1 px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white font-mono uppercase"
                  placeholder="#ffffff"
                />
              </div>
            </div>

            {/* Swap Button */}
            <div className="flex justify-center mb-6">
              <button
                onClick={swapColors}
                className="p-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors"
                title="Swap colors"
              >
                <RefreshCw className="w-5 h-5 text-zinc-400" />
              </button>
            </div>

            {/* Background */}
            <div className="mb-6">
              <label className="block text-sm text-zinc-400 mb-2">Background Color</label>
              <div className="flex gap-3">
                <div className="relative">
                  <input
                    type="color"
                    value={background}
                    onChange={(e) => setBackground(e.target.value)}
                    className="w-16 h-12 rounded-lg cursor-pointer border-2 border-zinc-700"
                  />
                </div>
                <input
                  type="text"
                  value={background}
                  onChange={(e) => setBackground(e.target.value)}
                  className="flex-1 px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white font-mono uppercase"
                  placeholder="#000000"
                />
              </div>
            </div>

            {/* Presets */}
            <div>
              <label className="block text-sm text-zinc-400 mb-2">Quick Presets</label>
              <div className="flex flex-wrap gap-2">
                {presets.map((preset, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setForeground(preset.fg);
                      setBackground(preset.bg);
                    }}
                    className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-xs text-zinc-300 transition-colors"
                  >
                    <span
                      className="inline-block w-3 h-3 rounded-full mr-1.5"
                      style={{ backgroundColor: preset.fg, border: '1px solid #555' }}
                    />
                    <span
                      className="inline-block w-3 h-3 rounded-full mr-1.5"
                      style={{ backgroundColor: preset.bg, border: '1px solid #555' }}
                    />
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-6">
            {/* Preview */}
            <div
              className="rounded-2xl p-8 text-center border-2"
              style={{ backgroundColor: background, borderColor: background }}
            >
              <p className="text-4xl font-bold mb-2" style={{ color: foreground }}>
                Preview Text
              </p>
              <p className="text-lg" style={{ color: foreground }}>
                The quick brown fox jumps over the lazy dog.
              </p>
              <p className="text-sm mt-4" style={{ color: foreground, opacity: 0.8 }}>
                Small text example (14px)
              </p>
            </div>

            {/* Contrast Ratio */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <div className="text-center mb-6">
                <p className="text-sm text-zinc-400 mb-1">Contrast Ratio</p>
                <p className="text-5xl font-bold text-white">{ratio.toFixed(2)}:1</p>
              </div>

              {/* WCAG Results */}
              {compliance && (
                <div className="grid grid-cols-2 gap-3">
                  <div className={`p-3 rounded-lg ${compliance.aaNormal ? 'bg-green-500/10 border border-green-500/20' : 'bg-red-500/10 border border-red-500/20'}`}>
                    <div className="flex items-center gap-2">
                      {compliance.aaNormal ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <X className="w-4 h-4 text-red-500" />
                      )}
                      <span className={`text-sm font-medium ${compliance.aaNormal ? 'text-green-400' : 'text-red-400'}`}>
                        AA Normal
                      </span>
                    </div>
                    <p className="text-xs text-zinc-500 mt-1">4.5:1 required</p>
                  </div>

                  <div className={`p-3 rounded-lg ${compliance.aaLarge ? 'bg-green-500/10 border border-green-500/20' : 'bg-red-500/10 border border-red-500/20'}`}>
                    <div className="flex items-center gap-2">
                      {compliance.aaLarge ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <X className="w-4 h-4 text-red-500" />
                      )}
                      <span className={`text-sm font-medium ${compliance.aaLarge ? 'text-green-400' : 'text-red-400'}`}>
                        AA Large
                      </span>
                    </div>
                    <p className="text-xs text-zinc-500 mt-1">3:1 required</p>
                  </div>

                  <div className={`p-3 rounded-lg ${compliance.aaaNormal ? 'bg-green-500/10 border border-green-500/20' : 'bg-red-500/10 border border-red-500/20'}`}>
                    <div className="flex items-center gap-2">
                      {compliance.aaaNormal ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <X className="w-4 h-4 text-red-500" />
                      )}
                      <span className={`text-sm font-medium ${compliance.aaaNormal ? 'text-green-400' : 'text-red-400'}`}>
                        AAA Normal
                      </span>
                    </div>
                    <p className="text-xs text-zinc-500 mt-1">7:1 required</p>
                  </div>

                  <div className={`p-3 rounded-lg ${compliance.aaaLarge ? 'bg-green-500/10 border border-green-500/20' : 'bg-red-500/10 border border-red-500/20'}`}>
                    <div className="flex items-center gap-2">
                      {compliance.aaaLarge ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <X className="w-4 h-4 text-red-500" />
                      )}
                      <span className={`text-sm font-medium ${compliance.aaaLarge ? 'text-green-400' : 'text-red-400'}`}>
                        AAA Large
                      </span>
                    </div>
                    <p className="text-xs text-zinc-500 mt-1">4.5:1 required</p>
                  </div>
                </div>
              )}

              {/* Copy CSS */}
              <button
                onClick={copyCSS}
                className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-green-400" />
                    <span className="text-green-400 text-sm">Copied CSS!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-zinc-400" />
                    <span className="text-zinc-300 text-sm">Copy CSS</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            Check Your Entire Website
          </h2>
          <p className="text-zinc-400 mb-6 max-w-xl mx-auto">
            Color contrast is just one of 50+ WCAG criteria. Scan your full website
            to find all accessibility issues before they become legal problems.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-500/25"
          >
            Free Full Website Scan
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* SEO Content */}
        <div className="mt-16 prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-white">What is Color Contrast in WCAG?</h2>
          <p className="text-zinc-400">
            Color contrast refers to the difference in luminance between foreground text and its background.
            WCAG 2.1 requires a minimum contrast ratio of 4.5:1 for normal text and 3:1 for large text
            (18pt or 14pt bold) to ensure readability for users with visual impairments.
          </p>

          <h3 className="text-xl font-semibold text-white mt-8">Why Does Contrast Matter for Compliance?</h3>
          <p className="text-zinc-400">
            The European Accessibility Act (EAA) and Americans with Disabilities Act (ADA) both require
            websites to meet WCAG 2.1 Level AA standards. Poor color contrast is one of the most common
            accessibility violations and can result in fines up to €100,000 under EAA.
          </p>

          <h3 className="text-xl font-semibold text-white mt-8">WCAG Contrast Levels Explained</h3>
          <ul className="text-zinc-400 space-y-2">
            <li><strong className="text-white">Level AA Normal (4.5:1)</strong> - Required for body text under 18pt</li>
            <li><strong className="text-white">Level AA Large (3:1)</strong> - Required for text 18pt+ or 14pt bold</li>
            <li><strong className="text-white">Level AAA Normal (7:1)</strong> - Enhanced accessibility for all text</li>
            <li><strong className="text-white">Level AAA Large (4.5:1)</strong> - Enhanced accessibility for large text</li>
          </ul>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
