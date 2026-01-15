"use client";

import { useState, useEffect } from "react";
import { Clock, AlertTriangle } from "lucide-react";
import Link from "next/link";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

// EAA deadline was June 28, 2025
const EAA_DEADLINE = new Date("2025-06-28T00:00:00+02:00");

function calculateTimeLeft(): TimeLeft {
  const now = new Date();
  const difference = EAA_DEADLINE.getTime() - now.getTime();

  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isPast: true,
    };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
    isPast: false,
  };
}

interface CountdownProps {
  variant?: "banner" | "compact" | "card";
  showCTA?: boolean;
}

export function EAACountdown({ variant = "banner", showCTA = true }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!mounted || !timeLeft) {
    return null;
  }

  // Deadline has passed - show enforcement message
  if (timeLeft.isPast) {
    if (variant === "banner") {
      return (
        <div className="bg-gradient-to-r from-red-500/20 via-red-500/10 to-red-500/20 border-y border-red-500/30">
          <div className="max-w-6xl mx-auto px-4 py-3">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-center">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-400 animate-pulse" />
                <span className="font-bold text-red-400">EAA ENFORCEMENT IS NOW ACTIVE</span>
              </div>
              <span className="text-zinc-400 text-sm">
                Non-compliant websites face fines up to EUR 100,000
              </span>
              {showCTA && (
                <Link
                  href="/"
                  className="px-4 py-1.5 bg-red-600 hover:bg-red-500 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  Check Your Site Now
                </Link>
              )}
            </div>
          </div>
        </div>
      );
    }

    if (variant === "compact") {
      return (
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-500/10 border border-red-500/30 rounded-lg">
          <AlertTriangle className="w-4 h-4 text-red-400" />
          <span className="text-red-400 text-sm font-medium">EAA Enforcement Active</span>
        </div>
      );
    }

    // Card variant
    return (
      <div className="p-6 bg-gradient-to-br from-red-500/10 via-red-500/5 to-transparent border border-red-500/20 rounded-2xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-red-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-red-400">EAA Enforcement Active</h3>
            <p className="text-zinc-400 text-sm">The deadline has passed</p>
          </div>
        </div>
        <p className="text-zinc-300 mb-4">
          The European Accessibility Act is now being enforced. Websites serving EU customers
          must be WCAG 2.1 AA compliant or face significant penalties.
        </p>
        {showCTA && (
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-medium rounded-lg transition-colors"
          >
            Check Compliance Now
          </Link>
        )}
      </div>
    );
  }

  // Countdown still active
  const urgencyLevel =
    timeLeft.days < 7 ? "critical" : timeLeft.days < 30 ? "urgent" : "warning";

  const urgencyColors = {
    critical: {
      bg: "from-red-500/20 via-red-500/10 to-red-500/20",
      border: "border-red-500/30",
      text: "text-red-400",
      number: "bg-red-500/20 border-red-500/30",
    },
    urgent: {
      bg: "from-orange-500/20 via-orange-500/10 to-orange-500/20",
      border: "border-orange-500/30",
      text: "text-orange-400",
      number: "bg-orange-500/20 border-orange-500/30",
    },
    warning: {
      bg: "from-yellow-500/20 via-yellow-500/10 to-yellow-500/20",
      border: "border-yellow-500/30",
      text: "text-yellow-400",
      number: "bg-yellow-500/20 border-yellow-500/30",
    },
  };

  const colors = urgencyColors[urgencyLevel];

  if (variant === "banner") {
    return (
      <div className={`bg-gradient-to-r ${colors.bg} border-y ${colors.border}`}>
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <Clock className={`w-5 h-5 ${colors.text}`} />
              <span className={`font-semibold ${colors.text}`}>EAA Deadline Countdown:</span>
            </div>
            <div className="flex items-center gap-2">
              <TimeBlock value={timeLeft.days} label="days" colors={colors} />
              <span className={`text-lg font-bold ${colors.text}`}>:</span>
              <TimeBlock value={timeLeft.hours} label="hrs" colors={colors} />
              <span className={`text-lg font-bold ${colors.text}`}>:</span>
              <TimeBlock value={timeLeft.minutes} label="min" colors={colors} />
              <span className={`text-lg font-bold ${colors.text}`}>:</span>
              <TimeBlock value={timeLeft.seconds} label="sec" colors={colors} />
            </div>
            {showCTA && (
              <Link
                href="/"
                className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg transition-colors"
              >
                Check Your Site
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className={`inline-flex items-center gap-3 px-4 py-2 bg-zinc-900/50 border ${colors.border} rounded-xl`}>
        <Clock className={`w-4 h-4 ${colors.text}`} />
        <div className="flex items-center gap-1.5 font-mono text-sm">
          <span className={`${colors.text} font-bold`}>{timeLeft.days}d</span>
          <span className="text-zinc-500">:</span>
          <span className={`${colors.text} font-bold`}>{String(timeLeft.hours).padStart(2, "0")}h</span>
          <span className="text-zinc-500">:</span>
          <span className={`${colors.text} font-bold`}>{String(timeLeft.minutes).padStart(2, "0")}m</span>
        </div>
        <span className="text-zinc-400 text-sm">until EAA</span>
      </div>
    );
  }

  // Card variant
  return (
    <div className={`p-6 bg-gradient-to-br ${colors.bg.replace("via-", "via-transparent to-")} border ${colors.border} rounded-2xl`}>
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-12 h-12 ${colors.number} rounded-xl flex items-center justify-center border`}>
          <Clock className={`w-6 h-6 ${colors.text}`} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">EAA Compliance Deadline</h3>
          <p className="text-zinc-400 text-sm">June 28, 2025</p>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2 mb-4">
        <TimeCard value={timeLeft.days} label="Days" colors={colors} />
        <TimeCard value={timeLeft.hours} label="Hours" colors={colors} />
        <TimeCard value={timeLeft.minutes} label="Minutes" colors={colors} />
        <TimeCard value={timeLeft.seconds} label="Seconds" colors={colors} />
      </div>
      <p className="text-zinc-400 text-sm mb-4">
        {urgencyLevel === "critical"
          ? "The deadline is days away. Act now to avoid penalties."
          : urgencyLevel === "urgent"
          ? "Less than a month remaining. Start your compliance journey today."
          : "Start now to ensure compliance before the deadline."}
      </p>
      {showCTA && (
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-colors w-full justify-center"
        >
          Start Free Compliance Check
        </Link>
      )}
    </div>
  );
}

function TimeBlock({
  value,
  label,
  colors,
}: {
  value: number;
  label: string;
  colors: { number: string; text: string };
}) {
  return (
    <div className="flex flex-col items-center">
      <div className={`px-2 py-1 ${colors.number} rounded border min-w-[44px] text-center`}>
        <span className={`text-lg font-bold font-mono ${colors.text}`}>
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="text-xs text-zinc-500 mt-0.5">{label}</span>
    </div>
  );
}

function TimeCard({
  value,
  label,
  colors,
}: {
  value: number;
  label: string;
  colors: { number: string; text: string };
}) {
  return (
    <div className={`p-3 ${colors.number} rounded-xl border text-center`}>
      <div className={`text-2xl font-bold font-mono ${colors.text}`}>
        {String(value).padStart(2, "0")}
      </div>
      <div className="text-xs text-zinc-500">{label}</div>
    </div>
  );
}

export default EAACountdown;
