import type { Metadata } from "next";
import { Shield, Clock, Wrench, ArrowRight, ChevronRight, Code, Image, Type, Keyboard, Eye, FormInput, Layout, Volume2, CheckCircle } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Fixing Accessibility Issues | Inclusiv Help Center",
  description: "Step-by-step guides for fixing common web accessibility issues. Learn how to add alt text, fix color contrast, improve keyboard navigation, and more.",
  keywords: ["fix accessibility issues", "WCAG remediation", "alt text guide", "color contrast fix", "keyboard navigation", "form accessibility"],
  openGraph: {
    title: "Fixing Accessibility Issues | Inclusiv Help Center",
    description: "Practical guides for remediating common accessibility problems and achieving WCAG 2.1 AA compliance.",
    type: "website",
  },
};

// Calculate days until EAA deadline
const getDeadlineInfo = () => {
  const deadline = new Date("2025-06-28");
  const today = new Date();
  const diffTime = deadline.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return { days: diffDays, deadline };
};

const fixGuides = [
  {
    id: "alt-text",
    title: "Adding Alt Text to Images",
    icon: Image,
    impact: "Critical",
    impactColor: "text-red-500 bg-red-500/10",
    wcag: "1.1.1 Non-text Content",
    description: "Alt text provides text alternatives for images, enabling screen reader users to understand visual content.",
    steps: [
      "Identify all images on your page (including background images conveying meaning)",
      "For each image, determine its purpose: decorative, informative, or functional",
      "For decorative images, use empty alt: alt=\"\"",
      "For informative images, describe the content concisely (under 125 characters)",
      "For functional images (like buttons), describe the action, not the image",
    ],
    codeExample: {
      bad: `<img src="product.jpg">`,
      good: `<img src="product.jpg" alt="Blue cotton t-shirt with round neck">`,
    },
    platforms: {
      shopify: "In the Shopify admin, go to Products > select product > click image > add alt text in the field provided",
      wordpress: "In the media library, click on the image and enter alt text in the 'Alternative Text' field",
      html: "Add the alt attribute directly to your <img> tags in your HTML",
    },
  },
  {
    id: "color-contrast",
    title: "Fixing Color Contrast",
    icon: Eye,
    impact: "Serious",
    impactColor: "text-orange-500 bg-orange-500/10",
    wcag: "1.4.3 Contrast (Minimum)",
    description: "Sufficient color contrast ensures text is readable for users with low vision or color blindness.",
    steps: [
      "Identify elements with insufficient contrast (check your Inclusiv report for specifics)",
      "Use a contrast checker tool to test current ratios",
      "Adjust either the text color or background color to achieve 4.5:1 ratio for normal text",
      "For large text (18pt+ or 14pt+ bold), the minimum ratio is 3:1",
      "Test with a color blindness simulator to verify readability",
    ],
    codeExample: {
      bad: `color: #767676; /* 4.48:1 ratio - fails */
background: #ffffff;`,
      good: `color: #595959; /* 7:1 ratio - passes */
background: #ffffff;`,
    },
    platforms: {
      shopify: "Edit your theme's CSS in Online Store > Themes > Edit code > Assets > theme.css",
      wordpress: "Use the Customizer (Appearance > Customize) or edit your theme's style.css",
      html: "Update the color values in your CSS stylesheet or inline styles",
    },
  },
  {
    id: "form-labels",
    title: "Form Accessibility",
    icon: FormInput,
    impact: "Critical",
    impactColor: "text-red-500 bg-red-500/10",
    wcag: "1.3.1 Info and Relationships, 3.3.2 Labels",
    description: "Form fields must have associated labels so screen reader users understand what information to enter.",
    steps: [
      "Ensure every input has a <label> element with matching 'for' and 'id' attributes",
      "Group related fields with <fieldset> and <legend> (e.g., radio button groups)",
      "Add clear error messages that identify the field and describe the error",
      "Use autocomplete attributes for common fields (name, email, address)",
      "Ensure focus indicators are visible on all form elements",
    ],
    codeExample: {
      bad: `<input type="email" placeholder="Email">`,
      good: `<label for="email">Email address</label>
<input type="email" id="email" name="email"
       autocomplete="email" required
       aria-describedby="email-hint">
<span id="email-hint">We'll never share your email.</span>`,
    },
    platforms: {
      shopify: "Edit form templates in Sections or Snippets within your theme code",
      wordpress: "Use accessible form plugins like Gravity Forms or WPForms, or edit your theme templates",
      html: "Add label elements and proper attributes to your form HTML",
    },
  },
  {
    id: "keyboard-nav",
    title: "Keyboard Navigation",
    icon: Keyboard,
    impact: "Critical",
    impactColor: "text-red-500 bg-red-500/10",
    wcag: "2.1.1 Keyboard, 2.4.3 Focus Order",
    description: "All interactive elements must be accessible via keyboard for users who cannot use a mouse.",
    steps: [
      "Test your site using only Tab, Shift+Tab, Enter, Space, and Arrow keys",
      "Ensure all interactive elements (links, buttons, inputs) receive focus",
      "Verify focus moves in a logical order (typically left-to-right, top-to-bottom)",
      "Check that there are no keyboard traps (areas where focus gets stuck)",
      "Make sure custom widgets (dropdowns, modals) are fully keyboard operable",
    ],
    codeExample: {
      bad: `<div onclick="doSomething()">Click me</div>`,
      good: `<button type="button" onclick="doSomething()">
  Click me
</button>

/* Or for custom elements: */
<div role="button" tabindex="0"
     onclick="doSomething()"
     onkeydown="if(event.key==='Enter')doSomething()">
  Click me
</div>`,
    },
    platforms: {
      shopify: "Review theme JavaScript for click handlers and ensure keyboard equivalents exist",
      wordpress: "Test with keyboard, update theme JS to add keyboard support to custom widgets",
      html: "Use semantic HTML buttons and links; add tabindex and keyboard handlers to custom elements",
    },
  },
  {
    id: "headings",
    title: "Heading Structure",
    icon: Type,
    impact: "Serious",
    impactColor: "text-orange-500 bg-orange-500/10",
    wcag: "1.3.1 Info and Relationships, 2.4.6 Headings",
    description: "Proper heading hierarchy helps screen reader users understand page structure and navigate content.",
    steps: [
      "Use only one <h1> per page (typically the main page title)",
      "Follow a logical hierarchy: h1 > h2 > h3 (don't skip levels)",
      "Use headings to create an outline of your content",
      "Don't use headings just for visual styling (use CSS instead)",
      "Ensure heading text is descriptive of the section content",
    ],
    codeExample: {
      bad: `<h1>Our Products</h1>
<h4>T-Shirts</h4>  <!-- Skipped h2, h3 -->
<h2>About Us</h2>   <!-- Inconsistent -->`,
      good: `<h1>Our Products</h1>
  <h2>Clothing</h2>
    <h3>T-Shirts</h3>
    <h3>Jeans</h3>
  <h2>Accessories</h2>
    <h3>Hats</h3>`,
    },
    platforms: {
      shopify: "Edit section and template files to ensure proper heading hierarchy",
      wordpress: "Use the Heading block properly in the block editor; check theme templates",
      html: "Structure your HTML with proper heading hierarchy throughout",
    },
  },
  {
    id: "focus-visible",
    title: "Focus Indicators",
    icon: Layout,
    impact: "Serious",
    impactColor: "text-orange-500 bg-orange-500/10",
    wcag: "2.4.7 Focus Visible",
    description: "Visible focus indicators show keyboard users which element is currently selected.",
    steps: [
      "Never use 'outline: none' without providing an alternative focus style",
      "Ensure focus indicators have sufficient contrast against the background",
      "Make focus indicators clearly visible (not just a subtle color change)",
      "Test focus visibility on all interactive elements",
      "Consider using :focus-visible for better UX (shows focus only for keyboard users)",
    ],
    codeExample: {
      bad: `/* Removes all focus indication */
a:focus, button:focus {
  outline: none;
}`,
      good: `/* Custom focus style */
a:focus-visible, button:focus-visible {
  outline: 3px solid #4f46e5;
  outline-offset: 2px;
}

/* Or ring style */
a:focus-visible {
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.5);
}`,
    },
    platforms: {
      shopify: "Add focus styles to your theme.css file; remove any 'outline: none' declarations",
      wordpress: "Update your theme's stylesheet; check for plugins removing focus outlines",
      html: "Add :focus and :focus-visible styles to your CSS",
    },
  },
  {
    id: "video-captions",
    title: "Video Captions & Transcripts",
    icon: Volume2,
    impact: "Critical",
    impactColor: "text-red-500 bg-red-500/10",
    wcag: "1.2.2 Captions, 1.2.3 Audio Description",
    description: "Videos must have captions for deaf users and transcripts for deafblind users.",
    steps: [
      "Add synchronized captions to all video content",
      "Include speaker identification when multiple people speak",
      "Describe relevant sound effects and music in captions",
      "Provide a text transcript for all video and audio content",
      "For videos with important visual information, add audio descriptions",
    ],
    codeExample: {
      bad: `<video src="product-demo.mp4" controls></video>`,
      good: `<video controls>
  <source src="product-demo.mp4" type="video/mp4">
  <track kind="captions" src="captions-en.vtt"
         srclang="en" label="English" default>
  <track kind="descriptions" src="descriptions-en.vtt"
         srclang="en" label="Audio Descriptions">
</video>
<a href="transcript.html">Read full transcript</a>`,
    },
    platforms: {
      shopify: "Use YouTube or Vimeo embeds with captions; add transcript links below videos",
      wordpress: "Upload videos with caption files; use plugins like Starter Templates for accessible embeds",
      html: "Use the <track> element for captions; host transcript files and link to them",
    },
  },
];

export default function FixingIssuesPage() {
  const deadlineInfo = getDeadlineInfo();

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-indigo-500" />
            <span className="text-xl font-bold text-white">Inclusiv</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/help" className="text-zinc-400 hover:text-white transition-colors text-sm font-medium">
              Help Center
            </Link>
            <Link href="/faq" className="text-zinc-400 hover:text-white transition-colors text-sm font-medium">
              FAQ
            </Link>
            <Link href="/contact" className="text-zinc-400 hover:text-white transition-colors text-sm font-medium">
              Contact
            </Link>
            <div className="flex items-center gap-2 px-3 py-1 bg-red-500/10 rounded-full text-sm text-red-400">
              <Clock className="w-4 h-4" />
              <span className="font-semibold">{deadlineInfo.days} days until EAA deadline</span>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto px-6 py-4">
        <nav className="flex items-center gap-2 text-sm text-zinc-500">
          <Link href="/help" className="hover:text-white transition-colors">Help Center</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-zinc-300">Fixing Issues</span>
        </nav>
      </div>

      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Hero */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 text-indigo-400 text-sm mb-6">
            <Wrench className="w-4 h-4" />
            Fixing Issues
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            How to fix common accessibility issues
          </h1>
          <p className="text-xl text-zinc-400">
            Step-by-step guides for remediating the most common WCAG 2.1 AA violations. Platform-specific instructions included.
          </p>
        </div>

        {/* Quick Nav */}
        <div className="mb-12 p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
          <h2 className="text-sm font-semibold text-zinc-400 mb-3">Jump to:</h2>
          <div className="flex flex-wrap gap-2">
            {fixGuides.map((guide) => (
              <a
                key={guide.id}
                href={`#${guide.id}`}
                className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 rounded-full text-sm text-zinc-300 hover:text-white transition-colors"
              >
                {guide.title}
              </a>
            ))}
          </div>
        </div>

        {/* Fix Guides */}
        <div className="space-y-12">
          {fixGuides.map((guide) => (
            <div key={guide.id} id={guide.id} className="scroll-mt-24">
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
                {/* Header */}
                <div className="p-6 border-b border-zinc-800">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <guide.icon className="w-6 h-6 text-indigo-500" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-xl font-bold text-white">{guide.title}</h2>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${guide.impactColor}`}>
                          {guide.impact}
                        </span>
                      </div>
                      <p className="text-zinc-400 mb-2">{guide.description}</p>
                      <p className="text-zinc-500 text-sm">
                        <span className="text-indigo-400">WCAG:</span> {guide.wcag}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Steps */}
                <div className="p-6 border-b border-zinc-800">
                  <h3 className="text-lg font-semibold text-white mb-4">How to fix</h3>
                  <ol className="space-y-3">
                    {guide.steps.map((step, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="w-6 h-6 bg-indigo-500/20 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-medium text-indigo-400">
                          {i + 1}
                        </span>
                        <span className="text-zinc-300">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Code Example */}
                <div className="p-6 border-b border-zinc-800">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Code className="w-5 h-5 text-indigo-500" />
                    Code Example
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-red-500 text-sm font-medium">Before (Inaccessible)</span>
                      </div>
                      <pre className="p-4 bg-red-500/5 border border-red-500/20 rounded-lg overflow-x-auto">
                        <code className="text-sm text-zinc-300">{guide.codeExample.bad}</code>
                      </pre>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-green-500 text-sm font-medium">After (Accessible)</span>
                      </div>
                      <pre className="p-4 bg-green-500/5 border border-green-500/20 rounded-lg overflow-x-auto">
                        <code className="text-sm text-zinc-300">{guide.codeExample.good}</code>
                      </pre>
                    </div>
                  </div>
                </div>

                {/* Platform Instructions */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Platform-specific instructions</h3>
                  <div className="space-y-3">
                    <div className="p-4 bg-zinc-800/50 rounded-lg" id={`${guide.id}-shopify`}>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-0.5 bg-green-500/20 text-green-400 rounded text-xs font-medium">Shopify</span>
                      </div>
                      <p className="text-zinc-400 text-sm">{guide.platforms.shopify}</p>
                    </div>
                    <div className="p-4 bg-zinc-800/50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded text-xs font-medium">WordPress</span>
                      </div>
                      <p className="text-zinc-400 text-sm">{guide.platforms.wordpress}</p>
                    </div>
                    <div className="p-4 bg-zinc-800/50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-0.5 bg-orange-500/20 text-orange-400 rounded text-xs font-medium">HTML/CSS</span>
                      </div>
                      <p className="text-zinc-400 text-sm">{guide.platforms.html}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* AI Fixes CTA */}
        <div className="mt-16 p-8 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-indigo-500/20 border border-indigo-500/30 rounded-3xl">
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 bg-indigo-500/20 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Code className="w-8 h-8 text-indigo-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Want AI-generated fixes?
              </h2>
              <p className="text-zinc-400 mb-4">
                Inclusiv Professional generates copy-paste-ready code fixes specific to your platform and codebase.
                Stop spending hours figuring out the right code - get exact fixes in seconds.
              </p>
              <div className="flex items-center gap-4">
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-colors"
                >
                  View Plans
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/"
                  className="text-indigo-400 hover:text-indigo-300 font-medium"
                >
                  Try free scan first
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Need More Help */}
        <div className="mt-12 text-center">
          <h2 className="text-xl font-bold text-white mb-4">Need more help?</h2>
          <p className="text-zinc-400 mb-6">
            Our support team can help you with complex accessibility issues.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold rounded-xl transition-colors"
          >
            Contact Support
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 mt-24">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-zinc-500">
              <Shield className="w-5 h-5" />
              <span>Inclusiv © 2025</span>
            </div>
            <div className="flex items-center gap-6 text-zinc-500 text-sm">
              <Link href="/faq" className="hover:text-white transition-colors">FAQ</Link>
              <Link href="/help" className="hover:text-white transition-colors">Help Center</Link>
              <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
              <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
