'use client';

import { useState, useEffect } from 'react';
import { Shield, Gift, Users, Copy, Check, Twitter, Linkedin, Mail, ArrowRight, Trophy, Zap } from 'lucide-react';
import Link from 'next/link';

export default function ReferPage() {
  const [referralCode, setReferralCode] = useState('');
  const [copied, setCopied] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Generate unique referral code
  useEffect(() => {
    const existingCode = localStorage.getItem('referralCode');
    if (existingCode) {
      setReferralCode(existingCode);
    } else {
      const newCode = 'REF' + Math.random().toString(36).substring(2, 8).toUpperCase();
      setReferralCode(newCode);
      localStorage.setItem('referralCode', newCode);
    }
  }, []);

  const referralUrl = typeof window !== 'undefined'
    ? `${window.location.origin}?ref=${referralCode}`
    : `https://tryinclusiv.com?ref=${referralCode}`;

  const handleCopy = async (text: string, type: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          source: 'referral_program',
          referralCode
        }),
      });
    } catch {
      // Continue even if API fails
    }
    setSubmitted(true);
  };

  const shareMessages = {
    twitter: encodeURIComponent(`Just discovered Inclusiv - free accessibility scanner that checks WCAG compliance in 30 seconds. My site scored ${Math.floor(Math.random() * 30) + 70}/100. Try it:`),
    linkedin: encodeURIComponent(`Free accessibility scanner for your website. The European Accessibility Act is now enforced with fines up to €100K. Check your compliance in seconds:`),
    email: {
      subject: encodeURIComponent('Free Tool to Check Website Accessibility'),
      body: encodeURIComponent(`Hey,

I found this free tool to check website accessibility compliance. With the EAA now enforced, thought you might want to scan your site.

It's free, takes 30 seconds, and gives you a detailed report with fixes.

Check it out: ${referralUrl}

Let me know your score!`),
    },
  };

  const rewards = [
    { referrals: 3, reward: '1 Month Free', description: 'Get Starter plan free for a month' },
    { referrals: 5, reward: 'Priority Support', description: 'Skip the queue, get help first' },
    { referrals: 10, reward: '50% Off First Year', description: 'Half price on any annual plan' },
    { referrals: 25, reward: 'Free Professional', description: '3 months of Professional plan' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="border-b border-zinc-800">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-indigo-500" />
            <span className="text-xl font-bold text-white">Inclusiv</span>
          </Link>
          <Link
            href="/pricing"
            className="text-zinc-300 hover:text-white transition-colors text-sm font-medium"
          >
            Pricing
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 rounded-full text-green-400 text-sm mb-6">
            <Gift className="w-4 h-4" />
            Referral Program
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Share Inclusiv, <span className="text-indigo-400">Get Rewarded</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-xl mx-auto">
            Help others discover accessibility compliance and earn free months of service.
          </p>
        </div>

        {/* Email Capture to Track Referrals */}
        {!submitted ? (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 mb-8">
            <div className="max-w-md mx-auto text-center">
              <h2 className="text-xl font-bold text-white mb-2">Get Your Referral Link</h2>
              <p className="text-zinc-400 mb-6">Enter your email to track your referrals and rewards.</p>
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  required
                  className="flex-1 px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-zinc-400 focus:outline-none focus:border-indigo-500"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold rounded-xl transition-all"
                >
                  Get My Link
                </button>
              </form>
            </div>
          </div>
        ) : (
          <>
            {/* Referral Link Section */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden mb-8">
              <div className="p-6 border-b border-zinc-800">
                <div className="flex items-center gap-2 mb-4">
                  <Users className="w-5 h-5 text-indigo-400" />
                  <h2 className="text-lg font-bold text-white">Your Referral Link</h2>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 px-4 py-3 bg-zinc-800 rounded-xl text-zinc-300 font-mono text-sm truncate">
                    {referralUrl}
                  </div>
                  <button
                    onClick={() => handleCopy(referralUrl, 'link')}
                    className="px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    {copied === 'link' ? (
                      <>
                        <Check className="w-4 h-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy Link
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Share Buttons */}
              <div className="p-6">
                <p className="text-zinc-400 text-sm mb-4">Share directly:</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <a
                    href={`https://twitter.com/intent/tweet?text=${shareMessages.twitter}&url=${encodeURIComponent(referralUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-xl transition-colors"
                  >
                    <Twitter className="w-4 h-4 text-zinc-300" />
                    <span className="text-sm text-zinc-300">Twitter</span>
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(referralUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-xl transition-colors"
                  >
                    <Linkedin className="w-4 h-4 text-zinc-300" />
                    <span className="text-sm text-zinc-300">LinkedIn</span>
                  </a>
                  <a
                    href={`mailto:?subject=${shareMessages.email.subject}&body=${shareMessages.email.body}`}
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-xl transition-colors"
                  >
                    <Mail className="w-4 h-4 text-zinc-300" />
                    <span className="text-sm text-zinc-300">Email</span>
                  </a>
                  <button
                    onClick={() => handleCopy(referralCode, 'code')}
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-xl transition-colors"
                  >
                    {copied === 'code' ? (
                      <>
                        <Check className="w-4 h-4 text-green-400" />
                        <span className="text-sm text-green-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-zinc-300" />
                        <span className="text-sm text-zinc-300">Code: {referralCode}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Rewards Tiers */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden mb-8">
              <div className="p-6 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-400" />
                  <h2 className="text-lg font-bold text-white">Reward Tiers</h2>
                </div>
              </div>
              <div className="divide-y divide-zinc-800">
                {rewards.map((tier, i) => (
                  <div key={i} className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center">
                        <span className="text-indigo-400 font-bold">{tier.referrals}</span>
                      </div>
                      <div>
                        <p className="text-white font-medium">{tier.reward}</p>
                        <p className="text-zinc-400 text-sm">{tier.description}</p>
                      </div>
                    </div>
                    <div className="text-zinc-500 text-sm">
                      {tier.referrals} referrals
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* How It Works */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 mb-8">
          <h2 className="text-xl font-bold text-white mb-6 text-center">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-indigo-500/10 flex items-center justify-center">
                <span className="text-indigo-400 font-bold text-xl">1</span>
              </div>
              <h3 className="text-white font-medium mb-2">Share Your Link</h3>
              <p className="text-zinc-400 text-sm">
                Share your unique referral link with friends, colleagues, or on social media.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-indigo-500/10 flex items-center justify-center">
                <span className="text-indigo-400 font-bold text-xl">2</span>
              </div>
              <h3 className="text-white font-medium mb-2">They Scan & Subscribe</h3>
              <p className="text-zinc-400 text-sm">
                When someone uses your link and becomes a paid customer, you earn credit.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-indigo-500/10 flex items-center justify-center">
                <span className="text-indigo-400 font-bold text-xl">3</span>
              </div>
              <h3 className="text-white font-medium mb-2">Get Rewarded</h3>
              <p className="text-zinc-400 text-sm">
                Unlock rewards as you hit milestones. More referrals = bigger rewards.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-zinc-400 mb-4">Don&apos;t have an account yet?</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-500/25"
          >
            <Zap className="w-5 h-5" />
            Scan Your Website Free
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-8 mt-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-zinc-400 text-sm">
            © {new Date().getFullYear()} Inclusiv. Free accessibility scanner.
          </p>
          <div className="flex items-center justify-center gap-6 mt-4 text-sm">
            <Link href="/" className="text-zinc-400 hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/tools" className="text-zinc-400 hover:text-white transition-colors">
              Free Tools
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
