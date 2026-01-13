import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'WCAG 2.1 AA Checklist 2025 | Complete Accessibility Compliance Guide',
  description: 'Complete WCAG 2.1 Level AA checklist for 2025. 50 success criteria explained with examples. Free compliance scanner included. Meet ADA and EAA requirements.',
  keywords: ['WCAG 2.1 AA checklist', 'WCAG checklist 2025', 'accessibility checklist', 'WCAG compliance', 'WCAG 2.1 requirements'],
  openGraph: {
    title: 'WCAG 2.1 AA Checklist 2025 - Complete Guide',
    description: 'The complete WCAG 2.1 Level AA checklist with all 50 success criteria. Free scanner included.',
  },
};

export default function WCAG21AAChecklistPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          WCAG 2.1 AA Checklist 2025
        </h1>

        <p className="text-xl text-slate-300 mb-8">
          The Web Content Accessibility Guidelines (WCAG) 2.1 Level AA is the global standard for
          web accessibility. This comprehensive checklist covers all 50 success criteria required
          for Level AA conformance, used by ADA, EAA, Section 508, and accessibility laws worldwide.
        </p>

        <div className="bg-blue-600 rounded-xl p-8 text-center mb-12">
          <h2 className="text-2xl font-bold mb-4">Automate Your WCAG Audit</h2>
          <p className="text-blue-100 mb-6">
            Manually checking all 50 criteria is time-consuming. Our AI scanner automatically
            tests for the majority of WCAG 2.1 AA requirements.
          </p>
          <Link
            href="/"
            className="inline-block bg-white text-blue-600 font-bold px-8 py-4 rounded-lg hover:bg-blue-50 transition"
          >
            Scan My Website →
          </Link>
        </div>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-green-400">1. Perceivable</h2>
          <p className="text-slate-300 mb-6">
            Information and user interface components must be presentable to users in ways they can perceive.
          </p>

          <div className="space-y-6">
            <div className="bg-slate-700/50 rounded-lg p-6">
              <h3 className="font-semibold text-lg text-green-400 mb-4">1.1 Text Alternatives</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-green-400 font-mono text-sm">1.1.1</span>
                  <div>
                    <span className="font-semibold">Non-text Content (A)</span>
                    <p className="text-slate-300 text-sm">All images, icons, and graphics have appropriate alt text</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-700/50 rounded-lg p-6">
              <h3 className="font-semibold text-lg text-green-400 mb-4">1.2 Time-based Media</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-green-400 font-mono text-sm">1.2.1</span>
                  <div>
                    <span className="font-semibold">Audio-only and Video-only (A)</span>
                    <p className="text-slate-300 text-sm">Pre-recorded audio has transcripts; video has audio description or transcript</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-400 font-mono text-sm">1.2.2</span>
                  <div>
                    <span className="font-semibold">Captions (A)</span>
                    <p className="text-slate-300 text-sm">Pre-recorded video with audio has captions</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-400 font-mono text-sm">1.2.3</span>
                  <div>
                    <span className="font-semibold">Audio Description (A)</span>
                    <p className="text-slate-300 text-sm">Video has audio description or text alternative</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-amber-400 font-mono text-sm">1.2.4</span>
                  <div>
                    <span className="font-semibold">Captions (Live) (AA)</span>
                    <p className="text-slate-300 text-sm">Live video with audio has real-time captions</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-amber-400 font-mono text-sm">1.2.5</span>
                  <div>
                    <span className="font-semibold">Audio Description (AA)</span>
                    <p className="text-slate-300 text-sm">Pre-recorded video has audio description</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-700/50 rounded-lg p-6">
              <h3 className="font-semibold text-lg text-green-400 mb-4">1.3 Adaptable</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-green-400 font-mono text-sm">1.3.1</span>
                  <div>
                    <span className="font-semibold">Info and Relationships (A)</span>
                    <p className="text-slate-300 text-sm">Structure and relationships conveyed through presentation are programmatically determinable</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-400 font-mono text-sm">1.3.2</span>
                  <div>
                    <span className="font-semibold">Meaningful Sequence (A)</span>
                    <p className="text-slate-300 text-sm">Reading order is logical and intuitive</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-400 font-mono text-sm">1.3.3</span>
                  <div>
                    <span className="font-semibold">Sensory Characteristics (A)</span>
                    <p className="text-slate-300 text-sm">Instructions don't rely solely on shape, size, location, or sound</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-amber-400 font-mono text-sm">1.3.4</span>
                  <div>
                    <span className="font-semibold">Orientation (AA) - WCAG 2.1</span>
                    <p className="text-slate-300 text-sm">Content works in both portrait and landscape orientations</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-amber-400 font-mono text-sm">1.3.5</span>
                  <div>
                    <span className="font-semibold">Identify Input Purpose (AA) - WCAG 2.1</span>
                    <p className="text-slate-300 text-sm">Form fields have autocomplete attributes for common data types</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-700/50 rounded-lg p-6">
              <h3 className="font-semibold text-lg text-green-400 mb-4">1.4 Distinguishable</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-green-400 font-mono text-sm">1.4.1</span>
                  <div>
                    <span className="font-semibold">Use of Color (A)</span>
                    <p className="text-slate-300 text-sm">Color is not the only means of conveying information</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-400 font-mono text-sm">1.4.2</span>
                  <div>
                    <span className="font-semibold">Audio Control (A)</span>
                    <p className="text-slate-300 text-sm">Auto-playing audio can be paused, stopped, or muted</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-amber-400 font-mono text-sm">1.4.3</span>
                  <div>
                    <span className="font-semibold">Contrast (Minimum) (AA)</span>
                    <p className="text-slate-300 text-sm">Text has contrast ratio of at least 4.5:1 (3:1 for large text)</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-amber-400 font-mono text-sm">1.4.4</span>
                  <div>
                    <span className="font-semibold">Resize Text (AA)</span>
                    <p className="text-slate-300 text-sm">Text can be resized up to 200% without loss of content</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-amber-400 font-mono text-sm">1.4.5</span>
                  <div>
                    <span className="font-semibold">Images of Text (AA)</span>
                    <p className="text-slate-300 text-sm">Text is used instead of images of text (with exceptions)</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-amber-400 font-mono text-sm">1.4.10</span>
                  <div>
                    <span className="font-semibold">Reflow (AA) - WCAG 2.1</span>
                    <p className="text-slate-300 text-sm">Content reflows at 320px width without horizontal scrolling</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-amber-400 font-mono text-sm">1.4.11</span>
                  <div>
                    <span className="font-semibold">Non-text Contrast (AA) - WCAG 2.1</span>
                    <p className="text-slate-300 text-sm">UI components and graphics have 3:1 contrast ratio</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-amber-400 font-mono text-sm">1.4.12</span>
                  <div>
                    <span className="font-semibold">Text Spacing (AA) - WCAG 2.1</span>
                    <p className="text-slate-300 text-sm">Content adapts to user-set text spacing adjustments</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-amber-400 font-mono text-sm">1.4.13</span>
                  <div>
                    <span className="font-semibold">Content on Hover or Focus (AA) - WCAG 2.1</span>
                    <p className="text-slate-300 text-sm">Hover/focus content is dismissible, hoverable, and persistent</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-blue-400">2. Operable</h2>
          <p className="text-slate-300 mb-6">
            User interface components and navigation must be operable.
          </p>

          <div className="space-y-6">
            <div className="bg-slate-700/50 rounded-lg p-6">
              <h3 className="font-semibold text-lg text-blue-400 mb-4">2.1 Keyboard Accessible</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-green-400 font-mono text-sm">2.1.1</span>
                  <div>
                    <span className="font-semibold">Keyboard (A)</span>
                    <p className="text-slate-300 text-sm">All functionality is accessible via keyboard</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-400 font-mono text-sm">2.1.2</span>
                  <div>
                    <span className="font-semibold">No Keyboard Trap (A)</span>
                    <p className="text-slate-300 text-sm">Keyboard focus can be moved away from any component</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-amber-400 font-mono text-sm">2.1.4</span>
                  <div>
                    <span className="font-semibold">Character Key Shortcuts (A) - WCAG 2.1</span>
                    <p className="text-slate-300 text-sm">Single-character shortcuts can be turned off or remapped</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-700/50 rounded-lg p-6">
              <h3 className="font-semibold text-lg text-blue-400 mb-4">2.2 Enough Time</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-green-400 font-mono text-sm">2.2.1</span>
                  <div>
                    <span className="font-semibold">Timing Adjustable (A)</span>
                    <p className="text-slate-300 text-sm">Time limits can be extended or disabled</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-400 font-mono text-sm">2.2.2</span>
                  <div>
                    <span className="font-semibold">Pause, Stop, Hide (A)</span>
                    <p className="text-slate-300 text-sm">Moving, blinking, or auto-updating content can be controlled</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-700/50 rounded-lg p-6">
              <h3 className="font-semibold text-lg text-blue-400 mb-4">2.3 Seizures and Physical Reactions</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-green-400 font-mono text-sm">2.3.1</span>
                  <div>
                    <span className="font-semibold">Three Flashes or Below Threshold (A)</span>
                    <p className="text-slate-300 text-sm">No content flashes more than 3 times per second</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-700/50 rounded-lg p-6">
              <h3 className="font-semibold text-lg text-blue-400 mb-4">2.4 Navigable</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-green-400 font-mono text-sm">2.4.1</span>
                  <div>
                    <span className="font-semibold">Bypass Blocks (A)</span>
                    <p className="text-slate-300 text-sm">Skip navigation links are available</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-400 font-mono text-sm">2.4.2</span>
                  <div>
                    <span className="font-semibold">Page Titled (A)</span>
                    <p className="text-slate-300 text-sm">Pages have descriptive, unique titles</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-400 font-mono text-sm">2.4.3</span>
                  <div>
                    <span className="font-semibold">Focus Order (A)</span>
                    <p className="text-slate-300 text-sm">Focus order is logical and intuitive</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-400 font-mono text-sm">2.4.4</span>
                  <div>
                    <span className="font-semibold">Link Purpose (In Context) (A)</span>
                    <p className="text-slate-300 text-sm">Link purpose is clear from link text or context</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-amber-400 font-mono text-sm">2.4.5</span>
                  <div>
                    <span className="font-semibold">Multiple Ways (AA)</span>
                    <p className="text-slate-300 text-sm">More than one way to find pages (nav, search, sitemap)</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-amber-400 font-mono text-sm">2.4.6</span>
                  <div>
                    <span className="font-semibold">Headings and Labels (AA)</span>
                    <p className="text-slate-300 text-sm">Headings and labels are descriptive</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-amber-400 font-mono text-sm">2.4.7</span>
                  <div>
                    <span className="font-semibold">Focus Visible (AA)</span>
                    <p className="text-slate-300 text-sm">Keyboard focus indicator is visible</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-700/50 rounded-lg p-6">
              <h3 className="font-semibold text-lg text-blue-400 mb-4">2.5 Input Modalities - WCAG 2.1</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-green-400 font-mono text-sm">2.5.1</span>
                  <div>
                    <span className="font-semibold">Pointer Gestures (A)</span>
                    <p className="text-slate-300 text-sm">Multi-point gestures have single-pointer alternatives</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-400 font-mono text-sm">2.5.2</span>
                  <div>
                    <span className="font-semibold">Pointer Cancellation (A)</span>
                    <p className="text-slate-300 text-sm">Actions triggered by down-event can be aborted or undone</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-400 font-mono text-sm">2.5.3</span>
                  <div>
                    <span className="font-semibold">Label in Name (A)</span>
                    <p className="text-slate-300 text-sm">Visible labels are included in accessible names</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-400 font-mono text-sm">2.5.4</span>
                  <div>
                    <span className="font-semibold">Motion Actuation (A)</span>
                    <p className="text-slate-300 text-sm">Motion-triggered functions have UI alternatives</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-amber-400">3. Understandable</h2>
          <p className="text-slate-300 mb-6">
            Information and the operation of the user interface must be understandable.
          </p>

          <div className="space-y-6">
            <div className="bg-slate-700/50 rounded-lg p-6">
              <h3 className="font-semibold text-lg text-amber-400 mb-4">3.1 Readable</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-green-400 font-mono text-sm">3.1.1</span>
                  <div>
                    <span className="font-semibold">Language of Page (A)</span>
                    <p className="text-slate-300 text-sm">Page language is identified in HTML lang attribute</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-amber-400 font-mono text-sm">3.1.2</span>
                  <div>
                    <span className="font-semibold">Language of Parts (AA)</span>
                    <p className="text-slate-300 text-sm">Language changes within content are identified</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-700/50 rounded-lg p-6">
              <h3 className="font-semibold text-lg text-amber-400 mb-4">3.2 Predictable</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-green-400 font-mono text-sm">3.2.1</span>
                  <div>
                    <span className="font-semibold">On Focus (A)</span>
                    <p className="text-slate-300 text-sm">Focus doesn't trigger unexpected context changes</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-400 font-mono text-sm">3.2.2</span>
                  <div>
                    <span className="font-semibold">On Input (A)</span>
                    <p className="text-slate-300 text-sm">Input doesn't trigger unexpected context changes</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-amber-400 font-mono text-sm">3.2.3</span>
                  <div>
                    <span className="font-semibold">Consistent Navigation (AA)</span>
                    <p className="text-slate-300 text-sm">Navigation is consistent across pages</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-amber-400 font-mono text-sm">3.2.4</span>
                  <div>
                    <span className="font-semibold">Consistent Identification (AA)</span>
                    <p className="text-slate-300 text-sm">Components with same function are identified consistently</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-700/50 rounded-lg p-6">
              <h3 className="font-semibold text-lg text-amber-400 mb-4">3.3 Input Assistance</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-green-400 font-mono text-sm">3.3.1</span>
                  <div>
                    <span className="font-semibold">Error Identification (A)</span>
                    <p className="text-slate-300 text-sm">Input errors are identified and described in text</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-400 font-mono text-sm">3.3.2</span>
                  <div>
                    <span className="font-semibold">Labels or Instructions (A)</span>
                    <p className="text-slate-300 text-sm">Forms have labels and instructions when needed</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-amber-400 font-mono text-sm">3.3.3</span>
                  <div>
                    <span className="font-semibold">Error Suggestion (AA)</span>
                    <p className="text-slate-300 text-sm">Error messages suggest how to fix the problem</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-amber-400 font-mono text-sm">3.3.4</span>
                  <div>
                    <span className="font-semibold">Error Prevention (AA)</span>
                    <p className="text-slate-300 text-sm">Legal/financial submissions are reversible, verified, or confirmed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-purple-400">4. Robust</h2>
          <p className="text-slate-300 mb-6">
            Content must be robust enough to be interpreted by a wide variety of user agents, including assistive technologies.
          </p>

          <div className="space-y-6">
            <div className="bg-slate-700/50 rounded-lg p-6">
              <h3 className="font-semibold text-lg text-purple-400 mb-4">4.1 Compatible</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-green-400 font-mono text-sm">4.1.1</span>
                  <div>
                    <span className="font-semibold">Parsing (A) - Obsolete in 2.2</span>
                    <p className="text-slate-300 text-sm">HTML is well-formed (no duplicate IDs, proper nesting)</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-400 font-mono text-sm">4.1.2</span>
                  <div>
                    <span className="font-semibold">Name, Role, Value (A)</span>
                    <p className="text-slate-300 text-sm">All UI components have accessible names, roles, and states</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-amber-400 font-mono text-sm">4.1.3</span>
                  <div>
                    <span className="font-semibold">Status Messages (AA) - WCAG 2.1</span>
                    <p className="text-slate-300 text-sm">Status messages are announced to screen readers without focus</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">WCAG 2.1 vs 2.0 - New Criteria</h2>
          <p className="text-slate-300 mb-4">
            WCAG 2.1 added 17 new success criteria to address mobile accessibility, cognitive disabilities,
            and low vision. Here are the Level AA additions:
          </p>
          <div className="bg-slate-700/50 rounded-lg p-6">
            <ul className="space-y-2 text-slate-300">
              <li><span className="text-amber-400 font-mono">1.3.4</span> Orientation</li>
              <li><span className="text-amber-400 font-mono">1.3.5</span> Identify Input Purpose</li>
              <li><span className="text-amber-400 font-mono">1.4.10</span> Reflow</li>
              <li><span className="text-amber-400 font-mono">1.4.11</span> Non-text Contrast</li>
              <li><span className="text-amber-400 font-mono">1.4.12</span> Text Spacing</li>
              <li><span className="text-amber-400 font-mono">1.4.13</span> Content on Hover or Focus</li>
              <li><span className="text-amber-400 font-mono">4.1.3</span> Status Messages</li>
            </ul>
          </div>
        </section>

        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Automate Your WCAG 2.1 AA Compliance Check</h2>
          <p className="text-blue-100 mb-6">
            Our AI scanner tests for the majority of these criteria automatically.
            Get instant results and prioritized fix recommendations.
          </p>
          <Link
            href="/"
            className="inline-block bg-white text-blue-600 font-bold px-8 py-4 rounded-lg hover:bg-blue-50 transition"
          >
            Scan My Website Free →
          </Link>
        </div>
      </div>
    </main>
  );
}
