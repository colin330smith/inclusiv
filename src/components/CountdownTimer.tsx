'use client';

import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface CountdownTimerProps {
  endDate?: Date;
  label?: string;
  compact?: boolean;
  className?: string;
}

// Default to end of current week (Sunday midnight)
function getEndOfWeek(): Date {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const daysUntilSunday = 7 - dayOfWeek;
  const endOfWeek = new Date(now);
  endOfWeek.setDate(now.getDate() + daysUntilSunday);
  endOfWeek.setHours(23, 59, 59, 999);
  return endOfWeek;
}

export default function CountdownTimer({
  endDate = getEndOfWeek(),
  label = 'Offer ends in:',
  compact = false,
  className = '',
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const end = endDate.getTime();
      const distance = end - now;

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  if (!isMounted) {
    return null;
  }

  if (compact) {
    return (
      <div className={`flex items-center gap-1.5 text-xs ${className}`}>
        <Clock className="w-3 h-3 text-orange-400" />
        <span className="text-zinc-400">{label}</span>
        <span className="font-mono font-semibold text-orange-300">
          {timeLeft.days > 0 && `${timeLeft.days}d `}
          {String(timeLeft.hours).padStart(2, '0')}:
          {String(timeLeft.minutes).padStart(2, '0')}:
          {String(timeLeft.seconds).padStart(2, '0')}
        </span>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Clock className="w-4 h-4 text-orange-400" />
      <span className="text-sm text-zinc-400">{label}</span>
      <div className="flex gap-1 font-mono text-sm">
        {timeLeft.days > 0 && (
          <span className="px-1.5 py-0.5 bg-orange-500/10 text-orange-300 rounded">
            {timeLeft.days}d
          </span>
        )}
        <span className="px-1.5 py-0.5 bg-orange-500/10 text-orange-300 rounded">
          {String(timeLeft.hours).padStart(2, '0')}h
        </span>
        <span className="px-1.5 py-0.5 bg-orange-500/10 text-orange-300 rounded">
          {String(timeLeft.minutes).padStart(2, '0')}m
        </span>
        <span className="px-1.5 py-0.5 bg-orange-500/10 text-orange-300 rounded">
          {String(timeLeft.seconds).padStart(2, '0')}s
        </span>
      </div>
    </div>
  );
}
