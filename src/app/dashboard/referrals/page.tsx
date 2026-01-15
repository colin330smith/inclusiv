'use client';

import { useState, useEffect } from 'react';
import {
  Gift,
  Copy,
  Check,
  Users,
  DollarSign,
  Clock,
  Share2,
  Twitter,
  Linkedin,
  Mail,
  MessageCircle,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import {
  REFERRAL_CONFIG,
  getReferralShareContent,
  calculateRewardValue,
} from '@/lib/referrals';

interface ReferralStats {
  totalReferrals: number;
  pendingReferrals: number;
  convertedReferrals: number;
  rewardedReferrals: number;
  totalEarnings: number;
  referralCode: string;
  referralLink: string;
}

interface Referral {
  id: string;
  referredEmail: string;
  status: 'pending' | 'signed_up' | 'subscribed' | 'rewarded' | 'expired';
  createdAt: string;
  convertedAt: string | null;
  rewardedAt: string | null;
}

export default function ReferralsPage() {
  const [stats, setStats] = useState<ReferralStats | null>(null);
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviting, setInviting] = useState(false);
  const [inviteSuccess, setInviteSuccess] = useState(false);

  useEffect(() => {
    fetchReferralData();
  }, []);

  const fetchReferralData = async () => {
    try {
      const response = await fetch('/api/referrals');
      if (response.ok) {
        const data = await response.json();
        setStats(data.stats);
        setReferrals(data.referrals || []);
      }
    } catch (error) {
      console.error('Failed to fetch referral data:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    if (!stats?.referralLink) return;
    try {
      await navigator.clipboard.writeText(stats.referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const sendInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail || inviting) return;

    setInviting(true);
    try {
      const response = await fetch('/api/referrals/invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: inviteEmail }),
      });

      if (response.ok) {
        setInviteSuccess(true);
        setInviteEmail('');
        setTimeout(() => setInviteSuccess(false), 3000);
        fetchReferralData(); // Refresh stats
      }
    } catch (error) {
      console.error('Failed to send invite:', error);
    } finally {
      setInviting(false);
    }
  };

  const shareContent = stats ? getReferralShareContent(stats.referralLink) : null;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  // Mock data for demo if no stats
  const displayStats = stats || {
    totalReferrals: 0,
    pendingReferrals: 0,
    convertedReferrals: 0,
    rewardedReferrals: 0,
    totalEarnings: 0,
    referralCode: 'LOADING',
    referralLink: '#',
  };

  const displayShareContent = shareContent || getReferralShareContent('#');

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
          <Gift className="w-7 h-7 text-indigo-400" />
          Referral Program
        </h1>
        <p className="mt-2 text-zinc-400">
          Invite friends and earn free months of Inclusiv for every successful referral.
        </p>
      </div>

      {/* Rewards Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Your Reward</h3>
              <p className="text-sm text-zinc-400">For each successful referral</p>
            </div>
          </div>
          <div className="text-3xl font-bold text-white mb-2">
            {REFERRAL_CONFIG.referrerReward.value} Free Month
          </div>
          <p className="text-sm text-zinc-400">
            {REFERRAL_CONFIG.referrerReward.description}
          </p>
        </div>

        <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
              <Gift className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Their Reward</h3>
              <p className="text-sm text-zinc-400">What your friends get</p>
            </div>
          </div>
          <div className="text-3xl font-bold text-white mb-2">
            {REFERRAL_CONFIG.referredReward.percent}% Off
          </div>
          <p className="text-sm text-zinc-400">
            {REFERRAL_CONFIG.referredReward.description}
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
          <div className="flex items-center gap-2 text-zinc-400 mb-2">
            <Users className="w-4 h-4" />
            <span className="text-sm">Total Referrals</span>
          </div>
          <p className="text-2xl font-bold text-white">{displayStats.totalReferrals}</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
          <div className="flex items-center gap-2 text-zinc-400 mb-2">
            <Clock className="w-4 h-4" />
            <span className="text-sm">Pending</span>
          </div>
          <p className="text-2xl font-bold text-yellow-400">{displayStats.pendingReferrals}</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
          <div className="flex items-center gap-2 text-zinc-400 mb-2">
            <Check className="w-4 h-4" />
            <span className="text-sm">Converted</span>
          </div>
          <p className="text-2xl font-bold text-green-400">{displayStats.convertedReferrals}</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
          <div className="flex items-center gap-2 text-zinc-400 mb-2">
            <DollarSign className="w-4 h-4" />
            <span className="text-sm">Months Earned</span>
          </div>
          <p className="text-2xl font-bold text-indigo-400">{displayStats.totalEarnings}</p>
        </div>
      </div>

      {/* Referral Link */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Share2 className="w-5 h-5 text-indigo-400" />
          Your Referral Link
        </h2>

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="flex-1 flex items-center gap-2 bg-zinc-800 rounded-lg px-4 py-3">
            <input
              type="text"
              value={displayStats.referralLink}
              readOnly
              className="flex-1 bg-transparent text-white text-sm focus:outline-none"
            />
          </div>
          <button
            onClick={copyToClipboard}
            className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
              copied
                ? 'bg-green-600 text-white'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white'
            }`}
          >
            {copied ? (
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

        {/* Social Share Buttons */}
        <div className="flex flex-wrap gap-3">
          <a
            href={displayShareContent.twitter.shareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg transition-colors"
          >
            <Twitter className="w-4 h-4" />
            Twitter
          </a>
          <a
            href={displayShareContent.linkedin.shareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg transition-colors"
          >
            <Linkedin className="w-4 h-4" />
            LinkedIn
          </a>
          <a
            href={displayShareContent.whatsapp.shareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </a>
          <a
            href={displayShareContent.email.mailtoUrl}
            className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg transition-colors"
          >
            <Mail className="w-4 h-4" />
            Email
          </a>
        </div>
      </div>

      {/* Send Direct Invite */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Mail className="w-5 h-5 text-indigo-400" />
          Send Direct Invite
        </h2>
        <p className="text-sm text-zinc-400 mb-4">
          Enter an email address to send a personalized invite with your referral link.
        </p>

        <form onSubmit={sendInvite} className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            placeholder="colleague@company.com"
            className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
            required
          />
          <button
            type="submit"
            disabled={inviting || !inviteEmail}
            className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
              inviteSuccess
                ? 'bg-green-600 text-white'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white disabled:opacity-50 disabled:cursor-not-allowed'
            }`}
          >
            {inviteSuccess ? (
              <>
                <Check className="w-4 h-4" />
                Sent!
              </>
            ) : inviting ? (
              'Sending...'
            ) : (
              <>
                Send Invite
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>

      {/* Referrals List */}
      {referrals.length > 0 && (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-zinc-800">
            <h2 className="text-lg font-semibold text-white">Your Referrals</h2>
          </div>
          <div className="divide-y divide-zinc-800">
            {referrals.map((referral) => (
              <div key={referral.id} className="flex items-center justify-between p-4">
                <div>
                  <p className="text-white font-medium">{referral.referredEmail}</p>
                  <p className="text-sm text-zinc-500">
                    Referred {new Date(referral.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    referral.status === 'rewarded'
                      ? 'bg-green-500/20 text-green-400'
                      : referral.status === 'subscribed'
                      ? 'bg-indigo-500/20 text-indigo-400'
                      : referral.status === 'signed_up'
                      ? 'bg-blue-500/20 text-blue-400'
                      : referral.status === 'expired'
                      ? 'bg-zinc-500/20 text-zinc-400'
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}
                >
                  {referral.status.charAt(0).toUpperCase() + referral.status.slice(1).replace('_', ' ')}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* How It Works */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-6">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-bold text-indigo-400">1</span>
            </div>
            <div>
              <h3 className="font-medium text-white mb-1">Share Your Link</h3>
              <p className="text-sm text-zinc-400">
                Share your unique referral link with colleagues, friends, or your network.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-bold text-indigo-400">2</span>
            </div>
            <div>
              <h3 className="font-medium text-white mb-1">They Subscribe</h3>
              <p className="text-sm text-zinc-400">
                When they sign up and subscribe, they get {REFERRAL_CONFIG.referredReward.percent}% off their first {REFERRAL_CONFIG.referredReward.duration} months.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-bold text-indigo-400">3</span>
            </div>
            <div>
              <h3 className="font-medium text-white mb-1">You Earn</h3>
              <p className="text-sm text-zinc-400">
                You get 1 free month added to your account automatically. No limit on referrals!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
