"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Shield,
  Gift,
  Users,
  DollarSign,
  Copy,
  Check,
  ArrowRight,
  Star,
  Trophy,
  Zap,
  Mail,
  Share2,
  CheckCircle,
  CreditCard,
  Percent,
  Award,
} from "lucide-react";

interface Reward {
  referrals: number;
  reward: string;
  value: string;
  icon: typeof Gift;
  color: string;
}

export default function ReferralsPage() {
  const [email, setEmail] = useState("");
  const [copied, setCopied] = useState(false);
  const [enrolled, setEnrolled] = useState(false);

  // Demo referral code
  const referralCode = "REF-" + Math.random().toString(36).substring(2, 8).toUpperCase();
  const referralLink = `https://inclusiv.app?ref=${referralCode}`;

  const rewards: Reward[] = [
    {
      referrals: 1,
      reward: "1 Month Free",
      value: "$29",
      icon: Gift,
      color: "text-green-400 bg-green-500/20",
    },
    {
      referrals: 3,
      reward: "3 Months Free",
      value: "$87",
      icon: Star,
      color: "text-yellow-400 bg-yellow-500/20",
    },
    {
      referrals: 5,
      reward: "6 Months Free",
      value: "$174",
      icon: Trophy,
      color: "text-orange-400 bg-orange-500/20",
    },
    {
      referrals: 10,
      reward: "1 Year Free",
      value: "$348",
      icon: Award,
      color: "text-purple-400 bg-purple-500/20",
    },
    {
      referrals: 25,
      reward: "Lifetime Access",
      value: "$997+",
      icon: Zap,
      color: "text-indigo-400 bg-indigo-500/20",
    },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleEnroll = async () => {
    if (!email) return;

    try {
      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          source: "referral-program",
        }),
      });
      setEnrolled(true);
    } catch (error) {
      console.error("Failed to enroll:", error);
    }
  };

  const stats = [
    { label: "Average Earnings", value: "$156", icon: DollarSign },
    { label: "Active Referrers", value: "847", icon: Users },
    { label: "Rewards Given", value: "$42K+", icon: Gift },
    { label: "Success Rate", value: "34%", icon: Percent },
  ];

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
            <Link
              href="/pricing"
              className="text-zinc-400 hover:text-white transition-colors text-sm"
            >
              Pricing
            </Link>
            <Link
              href="/"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-colors text-sm"
            >
              Free Scan
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 rounded-full text-green-400 text-sm mb-6">
            <Gift className="w-4 h-4" />
            Earn Free Access
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Refer Friends, <span className="text-indigo-400">Earn Rewards</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Share Inclusiv with your network and earn free months of access.
            Unlimited referrals, unlimited rewards.
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-16">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 text-center"
            >
              <stat.icon className="w-6 h-6 text-indigo-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-zinc-500 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* How It Works */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 mb-16">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Share2 className="w-8 h-8 text-indigo-400" />
              </div>
              <h3 className="text-white font-medium mb-2">1. Share Your Link</h3>
              <p className="text-zinc-400 text-sm">
                Share your unique referral link with friends, colleagues, or your
                audience via email, social media, or anywhere.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-indigo-400" />
              </div>
              <h3 className="text-white font-medium mb-2">2. Friends Sign Up</h3>
              <p className="text-zinc-400 text-sm">
                When someone signs up through your link and subscribes to a paid
                plan, you both get rewarded.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Gift className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-white font-medium mb-2">3. Earn Rewards</h3>
              <p className="text-zinc-400 text-sm">
                Get free months added to your account automatically. The more you
                refer, the more you earn!
              </p>
            </div>
          </div>
        </div>

        {/* Reward Tiers */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">
            Reward Tiers
          </h2>
          <div className="grid md:grid-cols-5 gap-4">
            {rewards.map((tier, i) => (
              <div
                key={i}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-center hover:border-indigo-500/50 transition-colors"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 ${tier.color}`}
                >
                  <tier.icon className="w-6 h-6" />
                </div>
                <p className="text-3xl font-bold text-white mb-1">
                  {tier.referrals}
                </p>
                <p className="text-zinc-500 text-sm mb-3">
                  {tier.referrals === 1 ? "referral" : "referrals"}
                </p>
                <div className="border-t border-zinc-800 pt-3">
                  <p className="text-white font-medium">{tier.reward}</p>
                  <p className="text-zinc-500 text-sm">Value: {tier.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Get Started / Referral Link */}
        <div className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 rounded-2xl p-8 mb-16">
          {!enrolled ? (
            <div className="max-w-xl mx-auto text-center">
              <Mail className="w-10 h-10 text-indigo-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">
                Join the Referral Program
              </h2>
              <p className="text-zinc-400 mb-6">
                Enter your email to get your unique referral link and start
                earning rewards.
              </p>
              <div className="flex gap-3">
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
                />
                <button
                  onClick={handleEnroll}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl transition-colors"
                >
                  Get My Link
                </button>
              </div>
            </div>
          ) : (
            <div className="max-w-xl mx-auto text-center">
              <CheckCircle className="w-10 h-10 text-green-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">
                You&apos;re In! Here&apos;s Your Link
              </h2>
              <p className="text-zinc-400 mb-6">
                Share this link to start earning free months of Inclusiv.
              </p>

              {/* Referral Link */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between gap-3">
                  <code className="text-indigo-400 text-sm truncate flex-1">
                    {referralLink}
                  </code>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1 px-3 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors text-sm"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-green-400" />
                        <span className="text-green-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-zinc-400" />
                        <span className="text-zinc-400">Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Share Buttons */}
              <div className="flex flex-wrap justify-center gap-3">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out @inclusivapp - the best accessibility scanner for EAA compliance! Use my referral link:`)}&url=${encodeURIComponent(referralLink)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors text-sm"
                >
                  Share on X
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(referralLink)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors text-sm"
                >
                  Share on LinkedIn
                </a>
                <a
                  href={`mailto:?subject=${encodeURIComponent("Check out this accessibility tool")}&body=${encodeURIComponent(`Hey!\n\nI've been using Inclusiv to check my website's accessibility for EAA compliance. It's really useful!\n\nUse my referral link and we both get free months: ${referralLink}`)}`}
                  className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors text-sm"
                >
                  Share via Email
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Your Referral Also Gets */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 mb-16">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Your Referrals Also Get
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Percent className="w-6 h-6 text-green-400" />
              </div>
              <p className="text-white font-medium">20% Off First Month</p>
              <p className="text-zinc-500 text-sm">Exclusive discount</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Zap className="w-6 h-6 text-indigo-400" />
              </div>
              <p className="text-white font-medium">Priority Onboarding</p>
              <p className="text-zinc-500 text-sm">Fast setup support</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                <CreditCard className="w-6 h-6 text-purple-400" />
              </div>
              <p className="text-white font-medium">Extended Trial</p>
              <p className="text-zinc-500 text-sm">21 days instead of 14</p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4 max-w-3xl mx-auto">
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-white font-medium mb-2">
                When do I get credited?
              </h3>
              <p className="text-zinc-400 text-sm">
                You&apos;re credited as soon as your referral&apos;s payment is confirmed,
                usually within minutes. Free months are automatically added to
                your account.
              </p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-white font-medium mb-2">
                Is there a limit on referrals?
              </h3>
              <p className="text-zinc-400 text-sm">
                No limit! You can refer as many people as you want and earn
                unlimited free months. Some power users have earned years of
                free access.
              </p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-white font-medium mb-2">
                What if I don&apos;t have an account yet?
              </h3>
              <p className="text-zinc-400 text-sm">
                No problem! Sign up for a free account first, then get your
                referral link. Your free months will stack on top of any plan
                you choose.
              </p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-white font-medium mb-2">
                Can I refer my own company?
              </h3>
              <p className="text-zinc-400 text-sm">
                Referrals must be genuine third parties. Self-referrals or
                creating fake accounts will result in disqualification from the
                program.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Ready to Start Earning?
          </h2>
          <p className="text-zinc-400 mb-6 max-w-xl mx-auto">
            Join hundreds of users already earning free access by sharing
            Inclusiv with their network.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-500/25"
            >
              <Gift className="w-5 h-5" />
              Get My Referral Link
            </a>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold rounded-xl transition-colors"
            >
              Try Free Scan First
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-8 mt-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-6 text-sm">
            <Link
              href="/"
              className="text-zinc-400 hover:text-white transition-colors"
            >
              Home
            </Link>
            <Link
              href="/pricing"
              className="text-zinc-400 hover:text-white transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/terms"
              className="text-zinc-400 hover:text-white transition-colors"
            >
              Terms
            </Link>
            <Link
              href="/contact"
              className="text-zinc-400 hover:text-white transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
