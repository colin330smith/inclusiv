'use client';

import { useState } from 'react';
import { Shield, Image, Copy, Check, ArrowRight, Sparkles, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { SiteFooter } from '@/components/seo/SiteFooter';

// Alt text templates by image type
const templates = {
  product: {
    label: 'Product Image',
    template: '[Product name] - [Key feature/color/size] - [Brand if relevant]',
    examples: [
      'Blue cotton t-shirt with round neck - Size M - Organic fabric',
      'Wireless Bluetooth headphones in matte black with noise cancellation',
      'Handcrafted ceramic coffee mug - 350ml - Speckled glaze finish',
    ],
  },
  person: {
    label: 'Person/Portrait',
    template: '[Person role/name] [action/pose] [relevant context]',
    examples: [
      'Marketing team lead presenting quarterly results at company meeting',
      'Customer service representative smiling while assisting a client',
      'Chef preparing fresh pasta in restaurant kitchen',
    ],
  },
  infographic: {
    label: 'Chart/Infographic',
    template: '[Chart type] showing [data summary] - [key insight]',
    examples: [
      'Bar chart showing monthly sales growth - 40% increase from Q1 to Q2',
      'Pie chart displaying market share - Company A leads with 35%',
      'Line graph tracking website traffic over 12 months - peak in December',
    ],
  },
  decorative: {
    label: 'Decorative Image',
    template: 'Leave alt text empty (alt="") for purely decorative images',
    examples: [
      'Background patterns, dividers, and spacer images',
      'Icons that repeat information already in text',
      'Decorative borders and visual flourishes',
    ],
  },
  functional: {
    label: 'Functional/Button',
    template: '[Action that happens when clicked]',
    examples: [
      'Search',
      'Submit contact form',
      'Download PDF brochure',
      'Play video introduction',
    ],
  },
  complex: {
    label: 'Complex Image',
    template: 'Brief alt + link to full description or use longdesc',
    examples: [
      'Organization chart of company structure. Full description below.',
      'Detailed map of delivery zones. See text description.',
      'Step-by-step assembly diagram. Instructions follow.',
    ],
  },
};

export default function AltTextGeneratorPage() {
  const [imageType, setImageType] = useState<keyof typeof templates>('product');
  const [description, setDescription] = useState('');
  const [generatedAlt, setGeneratedAlt] = useState('');
  const [copied, setCopied] = useState(false);
  const [charCount, setCharCount] = useState(0);

  const generateAlt = () => {
    if (!description.trim()) return;

    // Clean and format the description
    let alt = description.trim();

    // Remove "image of", "picture of", etc.
    alt = alt.replace(/^(image|picture|photo|photograph|graphic|icon|illustration)\s+(of|showing|displaying)\s+/i, '');

    // Capitalize first letter
    alt = alt.charAt(0).toUpperCase() + alt.slice(1);

    // Remove trailing period if present (not recommended for alt text)
    alt = alt.replace(/\.$/, '');

    // Truncate if too long (recommend under 125 chars)
    if (alt.length > 125) {
      alt = alt.substring(0, 122) + '...';
    }

    setGeneratedAlt(alt);
    setCharCount(alt.length);
  };

  const copyAlt = () => {
    if (!generatedAlt) return;
    navigator.clipboard.writeText(generatedAlt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentTemplate = templates[imageType];

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
            <Image className="w-4 h-4" />
            Free WCAG Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Alt Text Generator
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Create accessible image descriptions that meet WCAG 2.1 standards.
            Essential for screen readers and SEO.
          </p>
        </div>

        {/* Main Tool */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Input */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-6">Describe Your Image</h2>

            {/* Image Type Selector */}
            <div className="mb-6">
              <label className="block text-sm text-zinc-400 mb-2">Image Type</label>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(templates).map(([key, value]) => (
                  <button
                    key={key}
                    onClick={() => setImageType(key as keyof typeof templates)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      imageType === key
                        ? 'bg-indigo-600 text-white'
                        : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                    }`}
                  >
                    {value.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Template hint */}
            <div className="mb-6 p-4 bg-zinc-800/50 rounded-lg">
              <p className="text-sm text-zinc-400 mb-2">Recommended format:</p>
              <p className="text-sm text-indigo-400 font-mono">{currentTemplate.template}</p>
            </div>

            {/* Description Input */}
            <div className="mb-6">
              <label className="block text-sm text-zinc-400 mb-2">
                Describe what&apos;s in the image
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter a description of your image..."
                rows={4}
                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 resize-none"
              />
            </div>

            {/* Generate Button */}
            <button
              onClick={generateAlt}
              disabled={!description.trim()}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-zinc-700 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors"
            >
              <Sparkles className="w-5 h-5" />
              Generate Alt Text
            </button>
          </div>

          {/* Output */}
          <div className="space-y-6">
            {/* Generated Alt Text */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Generated Alt Text</h2>

              {generatedAlt ? (
                <>
                  <div className="p-4 bg-zinc-800 rounded-lg mb-4">
                    <code className="text-green-400 text-sm break-words">
                      alt=&quot;{generatedAlt}&quot;
                    </code>
                  </div>

                  {/* Character count */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-zinc-400">
                      {charCount} characters
                    </span>
                    <span className={`text-sm ${charCount <= 125 ? 'text-green-400' : 'text-yellow-400'}`}>
                      {charCount <= 125 ? 'Good length' : 'Consider shortening'}
                    </span>
                  </div>

                  {/* Copy Button */}
                  <button
                    onClick={copyAlt}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-green-400" />
                        <span className="text-green-400 text-sm">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-zinc-400" />
                        <span className="text-zinc-300 text-sm">Copy Alt Text</span>
                      </>
                    )}
                  </button>
                </>
              ) : (
                <div className="p-8 text-center">
                  <Image className="w-12 h-12 text-zinc-700 mx-auto mb-3" />
                  <p className="text-zinc-500">
                    Enter a description and click generate
                  </p>
                </div>
              )}
            </div>

            {/* Examples */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <h3 className="text-sm font-medium text-zinc-400 mb-3">
                Examples for {currentTemplate.label}
              </h3>
              <div className="space-y-2">
                {currentTemplate.examples.map((example, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setDescription(example);
                      setGeneratedAlt(example);
                      setCharCount(example.length);
                    }}
                    className="w-full text-left p-3 bg-zinc-800/50 hover:bg-zinc-800 rounded-lg transition-colors"
                  >
                    <p className="text-sm text-zinc-300">{example}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Best Practices */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-12">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-yellow-400" />
            Alt Text Best Practices
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-green-400 font-medium mb-2">Do:</h3>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Be specific and concise (under 125 characters)
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Describe the purpose/function for buttons and links
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Include key information conveyed by the image
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Use empty alt (alt=&quot;&quot;) for decorative images
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-red-400 font-medium mb-2">Don&apos;t:</h3>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li className="flex items-start gap-2">
                  <span className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0">✕</span>
                  Start with &quot;Image of&quot; or &quot;Picture of&quot;
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0">✕</span>
                  Repeat information already in surrounding text
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0">✕</span>
                  Use filenames as alt text (e.g., IMG_1234.jpg)
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0">✕</span>
                  Leave alt attribute missing entirely
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            Find All Missing Alt Text Automatically
          </h2>
          <p className="text-zinc-400 mb-6 max-w-xl mx-auto">
            Our free scanner detects every image missing alt text on your website,
            plus 50+ other accessibility issues.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-500/25"
          >
            Scan My Website Free
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* SEO Content */}
        <div className="mt-16 prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-white">What is Alt Text?</h2>
          <p className="text-zinc-400">
            Alt text (alternative text) is a written description of an image that appears when
            the image cannot be displayed. It&apos;s read by screen readers to describe images
            to blind and visually impaired users, making it essential for web accessibility.
          </p>

          <h3 className="text-xl font-semibold text-white mt-8">Why Alt Text Matters for Compliance</h3>
          <p className="text-zinc-400">
            WCAG 2.1 Success Criterion 1.1.1 (Non-text Content) requires all images to have
            text alternatives. Missing alt text is one of the most common accessibility violations
            and can result in legal action under the EAA, ADA, and other accessibility laws.
          </p>

          <h3 className="text-xl font-semibold text-white mt-8">Alt Text and SEO</h3>
          <p className="text-zinc-400">
            Search engines can&apos;t see images - they rely on alt text to understand image content.
            Well-written alt text improves your image SEO, helps your images appear in Google
            Image Search, and provides context that can improve overall page rankings.
          </p>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
