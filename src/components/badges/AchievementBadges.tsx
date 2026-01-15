'use client';

import { useState } from 'react';
import { Trophy, Award, Shield, Star, Zap, Crown, Medal, Target, CheckCircle2, Sparkles } from 'lucide-react';

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  borderColor: string;
  requirement: string;
  unlocked: boolean;
}

interface AchievementBadgesProps {
  score: number;
  issueCount: number;
  criticalCount: number;
  passedChecks: number;
}

export default function AchievementBadges({
  score,
  issueCount,
  criticalCount,
  passedChecks
}: AchievementBadgesProps) {
  const [showAll, setShowAll] = useState(false);

  const badges: Badge[] = [
    {
      id: 'perfect',
      name: 'Perfect Score',
      description: 'Achieved 100% accessibility compliance',
      icon: <Crown className="w-6 h-6" />,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/30',
      requirement: '100/100 score',
      unlocked: score === 100,
    },
    {
      id: 'champion',
      name: 'Accessibility Champion',
      description: 'Scored 95+ on accessibility',
      icon: <Trophy className="w-6 h-6" />,
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/30',
      requirement: '95+ score',
      unlocked: score >= 95,
    },
    {
      id: 'leader',
      name: 'Accessibility Leader',
      description: 'Scored 90+ putting you in the top tier',
      icon: <Star className="w-6 h-6" />,
      color: 'text-indigo-400',
      bgColor: 'bg-indigo-500/10',
      borderColor: 'border-indigo-500/30',
      requirement: '90+ score',
      unlocked: score >= 90,
    },
    {
      id: 'compliant',
      name: 'EAA Compliant',
      description: 'Meets European Accessibility Act standards',
      icon: <Shield className="w-6 h-6" />,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/30',
      requirement: '80+ score',
      unlocked: score >= 80,
    },
    {
      id: 'zero-critical',
      name: 'Zero Critical Issues',
      description: 'No critical accessibility barriers',
      icon: <CheckCircle2 className="w-6 h-6" />,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/30',
      requirement: '0 critical issues',
      unlocked: criticalCount === 0,
    },
    {
      id: 'clean',
      name: 'Clean Slate',
      description: 'Fewer than 5 accessibility issues',
      icon: <Sparkles className="w-6 h-6" />,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10',
      borderColor: 'border-cyan-500/30',
      requirement: 'Under 5 issues',
      unlocked: issueCount < 5,
    },
    {
      id: 'thorough',
      name: 'Thoroughly Tested',
      description: 'Passed 50+ accessibility checks',
      icon: <Target className="w-6 h-6" />,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/30',
      requirement: '50+ passed checks',
      unlocked: passedChecks >= 50,
    },
    {
      id: 'improving',
      name: 'On the Right Path',
      description: 'Scored 70+, making good progress',
      icon: <Zap className="w-6 h-6" />,
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/30',
      requirement: '70+ score',
      unlocked: score >= 70,
    },
    {
      id: 'starter',
      name: 'First Scan',
      description: 'Completed your first accessibility scan',
      icon: <Medal className="w-6 h-6" />,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30',
      requirement: 'Complete 1 scan',
      unlocked: true, // Always unlocked if they're seeing this
    },
    {
      id: 'aware',
      name: 'Accessibility Aware',
      description: 'Taking steps toward inclusive design',
      icon: <Award className="w-6 h-6" />,
      color: 'text-pink-400',
      bgColor: 'bg-pink-500/10',
      borderColor: 'border-pink-500/30',
      requirement: '50+ score',
      unlocked: score >= 50,
    },
  ];

  const unlockedBadges = badges.filter(b => b.unlocked);
  const lockedBadges = badges.filter(b => !b.unlocked);
  const displayBadges = showAll ? badges : unlockedBadges.slice(0, 4);

  if (unlockedBadges.length === 0) return null;

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
      <div className="p-6 border-b border-zinc-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-400" />
            <h3 className="text-lg font-bold text-white">Achievements Unlocked</h3>
          </div>
          <span className="text-sm text-zinc-400">
            {unlockedBadges.length}/{badges.length} badges
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {displayBadges.map((badge) => (
            <div
              key={badge.id}
              className={`relative p-4 rounded-xl border transition-all ${
                badge.unlocked
                  ? `${badge.bgColor} ${badge.borderColor} hover:scale-105`
                  : 'bg-zinc-800/50 border-zinc-700 opacity-50'
              }`}
            >
              {badge.unlocked && (
                <div className="absolute -top-2 -right-2">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                </div>
              )}
              <div className={`mb-3 ${badge.unlocked ? badge.color : 'text-zinc-500'}`}>
                {badge.icon}
              </div>
              <h4 className={`font-semibold text-sm mb-1 ${badge.unlocked ? 'text-white' : 'text-zinc-400'}`}>
                {badge.name}
              </h4>
              <p className={`text-xs ${badge.unlocked ? 'text-zinc-400' : 'text-zinc-500'}`}>
                {badge.unlocked ? badge.description : badge.requirement}
              </p>
            </div>
          ))}
        </div>

        {(unlockedBadges.length > 4 || lockedBadges.length > 0) && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="w-full mt-4 py-2 text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            {showAll ? 'Show less' : `Show all ${badges.length} badges`}
          </button>
        )}

        {/* Share CTA */}
        {unlockedBadges.length >= 3 && (
          <div className="mt-6 p-4 bg-gradient-to-r from-indigo-600/10 to-purple-600/10 border border-indigo-500/20 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium text-sm">Share your achievements!</p>
                <p className="text-zinc-400 text-xs">Show off your accessibility badges</p>
              </div>
              <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg transition-colors">
                Share Badges
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
