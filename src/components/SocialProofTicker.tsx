'use client';

import { useState, useEffect, useRef } from 'react';
import { Zap, CheckCircle, Shield, TrendingUp } from 'lucide-react';

interface TickerItem {
  id: string;
  type: 'scan' | 'signup' | 'compliance' | 'improvement';
  message: string;
  location: string;
  timeAgo: string;
}

// Realistic EU locations
const locations = [
  'Berlin', 'Munich', 'Hamburg', 'Frankfurt', 'Paris', 'Lyon', 'Marseille',
  'Amsterdam', 'Rotterdam', 'Madrid', 'Barcelona', 'Milan', 'Rome',
  'Vienna', 'Brussels', 'Stockholm', 'Copenhagen', 'Dublin', 'Zurich',
  'Warsaw', 'Prague', 'Lisbon', 'Helsinki', 'Oslo', 'Budapest',
];

// Platform types for variety
const platforms = [
  'Shopify store', 'WordPress site', 'WooCommerce store', 'Webflow site',
  'Next.js app', 'React app', 'Magento store', 'custom website',
];

function generateRandomItem(): TickerItem {
  const types: Array<'scan' | 'signup' | 'compliance' | 'improvement'> = [
    'scan', 'scan', 'scan', 'scan', 'signup', 'compliance', 'improvement'
  ];
  const type = types[Math.floor(Math.random() * types.length)];
  const location = locations[Math.floor(Math.random() * locations.length)];
  const platform = platforms[Math.floor(Math.random() * platforms.length)];
  const minutes = Math.floor(Math.random() * 30) + 1;
  const score = Math.floor(Math.random() * 40) + 45; // 45-85 range
  const improvement = Math.floor(Math.random() * 25) + 10; // 10-35 range

  let message = '';
  switch (type) {
    case 'scan':
      message = `A ${platform} was scanned`;
      break;
    case 'signup':
      message = 'New business started their trial';
      break;
    case 'compliance':
      message = `Site achieved ${score}% compliance`;
      break;
    case 'improvement':
      message = `Score improved by ${improvement} points`;
      break;
  }

  return {
    id: `${Date.now()}-${Math.random().toString(36).substring(7)}`,
    type,
    message,
    location,
    timeAgo: `${minutes}m ago`,
  };
}

function generateInitialItems(count: number): TickerItem[] {
  return Array.from({ length: count }, () => generateRandomItem());
}

interface SocialProofTickerProps {
  className?: string;
}

export function SocialProofTicker({ className = '' }: SocialProofTickerProps) {
  const [items, setItems] = useState<TickerItem[]>([]);
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initialize items on mount
  useEffect(() => {
    setItems(generateInitialItems(12));
  }, []);

  // Add new items periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setItems(prev => {
        const newItems = [...prev, generateRandomItem()];
        // Keep max 20 items to prevent memory issues
        if (newItems.length > 20) {
          return newItems.slice(-15);
        }
        return newItems;
      });
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const getIcon = (type: TickerItem['type']) => {
    switch (type) {
      case 'scan':
        return <Zap className="w-3.5 h-3.5 text-indigo-400" />;
      case 'signup':
        return <Shield className="w-3.5 h-3.5 text-green-400" />;
      case 'compliance':
        return <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />;
      case 'improvement':
        return <TrendingUp className="w-3.5 h-3.5 text-yellow-400" />;
    }
  };

  if (items.length === 0) return null;

  return (
    <div
      className={`bg-zinc-900/80 backdrop-blur-sm border-y border-zinc-800 overflow-hidden ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative flex items-center h-10">
        {/* Static label */}
        <div className="flex-shrink-0 px-4 py-2 bg-indigo-600/10 border-r border-zinc-800 z-10">
          <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wide flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Live Activity
          </span>
        </div>

        {/* Scrolling content */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-hidden"
        >
          <div
            className={`flex items-center gap-6 whitespace-nowrap ${isPaused ? '' : 'animate-scroll'}`}
            style={{
              animationPlayState: isPaused ? 'paused' : 'running',
            }}
          >
            {/* Duplicate items for seamless loop */}
            {[...items, ...items].map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className="flex items-center gap-2 text-sm py-2"
              >
                {getIcon(item.type)}
                <span className="text-zinc-300">{item.message}</span>
                <span className="text-zinc-500">•</span>
                <span className="text-zinc-500">{item.location}</span>
                <span className="text-zinc-600 text-xs">{item.timeAgo}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 60s linear infinite;
        }
      `}</style>
    </div>
  );
}
