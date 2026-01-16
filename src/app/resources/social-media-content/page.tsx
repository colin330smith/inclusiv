import type { Metadata } from "next";
import Link from "next/link";
import { Shield, Linkedin, Twitter, Copy, ArrowRight, AlertTriangle, TrendingUp } from "lucide-react";
import { SiteFooter } from "@/components/seo/SiteFooter";
import { CopyButton } from "../email-templates/CopyButton";

export const metadata: Metadata = {
  title: "Free EAA Social Media Content | LinkedIn & Twitter Posts",
  description: "Ready-to-use LinkedIn and Twitter posts about EAA compliance. Copy, customize, and share to establish yourself as an accessibility thought leader.",
  keywords: ["EAA social media", "accessibility LinkedIn posts", "WCAG Twitter content", "compliance thought leadership"],
  openGraph: {
    title: "Free EAA Social Media Content",
    description: "Ready-to-use LinkedIn and Twitter posts about accessibility compliance",
    type: "website",
  },
};

const linkedInPosts = [
  {
    id: "deadline-alert",
    title: "EAA Deadline Alert",
    hook: "Urgency hook for immediate engagement",
    content: `The European Accessibility Act deadline has passed.

Here's what that means for your business:

If your website serves EU customers and isn't WCAG 2.1 AA compliant, you could face:

- Fines up to EUR 100,000 per violation
- Mandatory remediation orders
- Removal from EU market
- Significant reputational damage

The scary part? 96% of websites have accessibility issues.

But here's what most people don't realize:

Accessibility isn't just about compliance. It's about:
- Reaching 15% more potential customers
- Improving SEO rankings (Google loves accessible sites)
- Building a more inclusive brand
- Future-proofing your digital presence

The fix isn't as hard as you think.

Start with a free accessibility scan to see where you stand.

What's your biggest challenge with web accessibility?

#EAA #WebAccessibility #WCAG #DigitalInclusion #Compliance`,
  },
  {
    id: "myth-busting",
    title: "Accessibility Myth Busting",
    hook: "Challenge common misconceptions",
    content: `"We don't have disabled users."

I hear this from business owners all the time.

Here's why it's wrong:

1. 15% of the world's population has a disability
2. Many disabilities are invisible (cognitive, hearing, vision)
3. Everyone becomes "disabled" situationally (bright sunlight, noisy environment, broken arm)
4. Your analytics can't track users who left because they couldn't use your site

The businesses winning in 2025 aren't asking "do we need accessibility?"

They're asking "how can accessibility improve our user experience for everyone?"

Because here's what accessible websites get:
- 30% better SEO performance
- Lower bounce rates
- Higher conversion rates
- Legal protection
- Access to government contracts

The EAA isn't just a regulation. It's a market signal.

The EU is telling us: build for everyone, or lose access to 450 million consumers.

What's your take on web accessibility?

#Accessibility #WebDevelopment #UX #DigitalTransformation #EAA`,
  },
  {
    id: "business-case",
    title: "ROI of Accessibility",
    hook: "Data-driven business argument",
    content: `Web accessibility isn't a cost center.

It's a growth lever.

Here's the math:

The Problem:
- 96% of websites have WCAG failures
- EUR 100K+ fines under EAA
- 15% of users can't fully use inaccessible sites

The Opportunity:
- EUR 13 trillion in disposable income (disability community)
- 70% of users with disabilities will leave an inaccessible site immediately
- Accessible sites rank 30% higher in search results

The Investment:
- Most critical fixes take hours, not months
- Basic compliance tools start at EUR 49/month
- One-time audit often under EUR 5,000

The Return:
- Risk mitigation: EUR 100K+ per violation avoided
- Revenue expansion: 15% larger addressable market
- SEO improvement: Higher organic traffic
- Brand value: Demonstrated social responsibility

The companies treating accessibility as a strategic advantage are winning.

The ones treating it as a checkbox are at risk.

Which one are you?

#BusinessStrategy #ROI #WebAccessibility #EAA #GrowthHacking`,
  },
  {
    id: "quick-wins",
    title: "Quick Accessibility Wins",
    hook: "Actionable value-add content",
    content: `5 accessibility fixes you can make today (no developer needed):

1. ADD ALT TEXT TO IMAGES
- Open your CMS
- Find images without descriptions
- Write what the image conveys, not what it looks like

2. CHECK YOUR COLOR CONTRAST
- Use a free contrast checker
- Ensure 4.5:1 ratio for normal text
- 3:1 ratio for large text

3. ADD FORM LABELS
- Every input needs a visible label
- Placeholder text isn't enough
- Labels should describe what's needed

4. USE DESCRIPTIVE LINK TEXT
- "Click here" tells users nothing
- "Download our EAA compliance guide" tells them everything

5. ADD SKIP LINKS
- Let keyboard users skip repetitive navigation
- One line of HTML can transform the experience

These 5 fixes address 40% of common accessibility issues.

Takes an afternoon. Reduces legal risk significantly.

What other quick wins would you add?

#WebAccessibility #QuickWins #WebDevelopment #UX #A11y`,
  },
];

const twitterThreads = [
  {
    id: "eaa-explained",
    title: "EAA Explained Thread",
    hook: "Educational thread for awareness",
    tweets: [
      `The European Accessibility Act is now in force.

Here's everything you need to know (thread):`,
      `What is the EAA?

An EU law requiring digital products and services to be accessible to people with disabilities.

If you have EU customers, this applies to you.`,
      `Who must comply?

- E-commerce sites
- Banking services
- Transport booking sites
- Telecom services
- E-books and e-readers
- Any website serving EU customers`,
      `What does "accessible" mean?

WCAG 2.1 Level AA compliance:
- Screen reader compatible
- Keyboard navigable
- Sufficient color contrast
- Clear error messages
- Consistent navigation`,
      `What happens if you don't comply?

- Fines up to EUR 100,000 per violation
- Enforcement orders
- Potential market access restrictions
- Reputational damage`,
      `How to check your compliance:

1. Run a free accessibility scan (inclusiv.dev)
2. Review the issues found
3. Prioritize critical problems
4. Fix systematically
5. Monitor continuously`,
      `The good news?

Most fixes are straightforward. Alt text, form labels, color contrast.

Start today. Don't wait for enforcement action.

Questions? Drop them below.`,
    ],
  },
  {
    id: "accessibility-myths",
    title: "Accessibility Myths Thread",
    hook: "Myth-busting engagement content",
    tweets: [
      `"Accessibility is expensive and complicated."

Wrong.

Let me bust 7 accessibility myths (thread):`,
      `Myth 1: "Only blind people need accessibility"

Reality: Accessibility helps:
- Motor impairments (keyboard users)
- Cognitive disabilities
- Temporary injuries
- Aging populations
- Everyone in suboptimal conditions`,
      `Myth 2: "Overlays and widgets fix accessibility"

Reality: Most overlay solutions:
- Create new barriers
- Don't fix underlying code
- Give false compliance confidence
- Face lawsuits themselves`,
      `Myth 3: "We'll do accessibility later"

Reality: Retrofitting costs 10x more than building accessible from the start.

And "later" often means "after we get sued."`,
      `Myth 4: "Our site is too complex for accessibility"

Reality: Netflix, Spotify, and Amazon are accessible.

If they can do it, so can you.

Complexity isn't an excuse.`,
      `Myth 5: "Automated tools catch everything"

Reality: Automated tools catch ~30% of issues.

You need:
- Automated scanning (for scale)
- Manual testing (for context)
- User testing (for reality)`,
      `Myth 6: "Accessibility hurts design"

Reality: Constraints breed creativity.

Some of the best-designed sites are the most accessible.

Good UX and accessibility aren't opposites.`,
      `Myth 7: "Small businesses are exempt"

Reality: The EAA has few exemptions.

If you serve EU customers digitally, you likely need to comply.

Stop guessing. Start scanning.`,
    ],
  },
];

export default function SocialMediaContentPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-indigo-500" />
            <span className="text-xl font-bold text-white">Inclusiv</span>
          </Link>
          <Link
            href="/resources"
            className="text-zinc-400 hover:text-white transition-colors text-sm"
          >
            &larr; All Resources
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 rounded-full mb-6">
            <TrendingUp className="w-4 h-4 text-indigo-400" />
            <span className="text-indigo-400 text-sm font-medium">Free Resource</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            EAA Social Media Content
          </h1>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Ready-to-use LinkedIn posts and Twitter threads about EAA compliance.
            Establish yourself as an accessibility thought leader.
          </p>
        </div>

        {/* Usage Tips */}
        <div className="mb-10 p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-zinc-300">
              <strong className="text-indigo-400">Pro tip:</strong> Customize these templates
              with your own insights and experiences. Add relevant hashtags for your industry
              and engage with comments to boost visibility.
            </div>
          </div>
        </div>

        {/* LinkedIn Posts */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-[#0077B5]/10 rounded-lg flex items-center justify-center">
              <Linkedin className="w-5 h-5 text-[#0077B5]" />
            </div>
            <h2 className="text-2xl font-bold text-white">LinkedIn Posts</h2>
          </div>

          <div className="space-y-8">
            {linkedInPosts.map((post) => (
              <div
                key={post.id}
                id={post.id}
                className="bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden"
              >
                <div className="p-6 border-b border-zinc-800">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-1">
                        {post.title}
                      </h3>
                      <p className="text-zinc-500 text-sm">{post.hook}</p>
                    </div>
                    <CopyButton text={post.content} label="Copy post" />
                  </div>
                </div>
                <div className="p-6">
                  <pre className="whitespace-pre-wrap text-sm text-zinc-300 font-sans leading-relaxed bg-zinc-800/30 rounded-xl p-4 max-h-80 overflow-y-auto">
                    {post.content}
                  </pre>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Twitter Threads */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center">
              <Twitter className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">Twitter/X Threads</h2>
          </div>

          <div className="space-y-8">
            {twitterThreads.map((thread) => (
              <div
                key={thread.id}
                id={thread.id}
                className="bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden"
              >
                <div className="p-6 border-b border-zinc-800">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-1">
                        {thread.title}
                      </h3>
                      <p className="text-zinc-500 text-sm">{thread.hook}</p>
                    </div>
                    <CopyButton
                      text={thread.tweets.join("\n\n---\n\n")}
                      label="Copy thread"
                    />
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  {thread.tweets.map((tweet, index) => (
                    <div key={index} className="relative">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-zinc-800 rounded-full flex items-center justify-center text-xs text-zinc-500 font-medium">
                          {index + 1}
                        </div>
                        <div className="flex-1 bg-zinc-800/30 rounded-xl p-4">
                          <pre className="whitespace-pre-wrap text-sm text-zinc-300 font-sans leading-relaxed">
                            {tweet}
                          </pre>
                          <div className="mt-2 flex justify-end">
                            <CopyButton text={tweet} label="Copy" />
                          </div>
                        </div>
                      </div>
                      {index < thread.tweets.length - 1 && (
                        <div className="absolute left-3 top-8 bottom-0 w-px bg-zinc-800" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="text-center p-8 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-indigo-500/10 border border-indigo-500/20 rounded-2xl">
          <h2 className="text-2xl font-bold text-white mb-4">
            Get real data for your posts
          </h2>
          <p className="text-zinc-400 mb-6">
            Run a free scan to get actual accessibility metrics you can share in your content.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-colors"
          >
            Get Free Scan Results
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
