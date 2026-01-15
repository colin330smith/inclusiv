'use client';

import { useState, useEffect } from 'react';
import { Shield, Zap, MapPin, X } from 'lucide-react';

interface Notification {
  id: string;
  type: 'scan' | 'signup' | 'upgrade';
  location: string;
  time: string;
  url?: string;
}

// Realistic EU locations weighted by population/business activity
const locations = [
  { city: 'Berlin', country: 'Germany', weight: 15 },
  { city: 'Munich', country: 'Germany', weight: 10 },
  { city: 'Paris', country: 'France', weight: 15 },
  { city: 'Lyon', country: 'France', weight: 5 },
  { city: 'Amsterdam', country: 'Netherlands', weight: 12 },
  { city: 'Rotterdam', country: 'Netherlands', weight: 5 },
  { city: 'Madrid', country: 'Spain', weight: 10 },
  { city: 'Barcelona', country: 'Spain', weight: 8 },
  { city: 'Milan', country: 'Italy', weight: 10 },
  { city: 'Rome', country: 'Italy', weight: 5 },
  { city: 'Vienna', country: 'Austria', weight: 6 },
  { city: 'Brussels', country: 'Belgium', weight: 7 },
  { city: 'Stockholm', country: 'Sweden', weight: 6 },
  { city: 'Copenhagen', country: 'Denmark', weight: 5 },
  { city: 'Dublin', country: 'Ireland', weight: 6 },
  { city: 'Zurich', country: 'Switzerland', weight: 8 },
  { city: 'Warsaw', country: 'Poland', weight: 5 },
  { city: 'Prague', country: 'Czech Republic', weight: 4 },
  { city: 'Lisbon', country: 'Portugal', weight: 4 },
  { city: 'Helsinki', country: 'Finland', weight: 3 },
];

// Domains that look realistic (not actual companies)
const sampleDomains = [
  'boutique-mode.de',
  'techshop.fr',
  'webwinkel.nl',
  'tienda-online.es',
  'negozio-digitale.it',
  'e-commerce.at',
  'shop-online.be',
  'butik.se',
  'webshop.dk',
  'store.ie',
  'laden-online.ch',
  'sklep.pl',
  'obchod.cz',
  'loja-online.pt',
  'kauppa.fi',
];

function getWeightedLocation() {
  const totalWeight = locations.reduce((sum, loc) => sum + loc.weight, 0);
  let random = Math.random() * totalWeight;

  for (const location of locations) {
    random -= location.weight;
    if (random <= 0) {
      return `${location.city}, ${location.country}`;
    }
  }

  return 'Berlin, Germany';
}

function getRandomDomain() {
  return sampleDomains[Math.floor(Math.random() * sampleDomains.length)];
}

function getRandomTime() {
  const minutes = Math.floor(Math.random() * 15) + 1;
  return `${minutes} min ago`;
}

function generateNotification(): Notification {
  const types: Notification['type'][] = ['scan', 'scan', 'scan', 'signup', 'upgrade'];
  const type = types[Math.floor(Math.random() * types.length)];

  return {
    id: Math.random().toString(36).substring(7),
    type,
    location: getWeightedLocation(),
    time: getRandomTime(),
    url: type === 'scan' ? getRandomDomain() : undefined,
  };
}

export default function RealtimeSocialProof() {
  const [notification, setNotification] = useState<Notification | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    // Don't show on mobile
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      return;
    }

    // Check if user has dismissed before this session
    if (sessionStorage.getItem('socialProofDismissed') === 'true') {
      setDismissed(true);
      return;
    }

    // Initial delay before first notification
    const initialDelay = setTimeout(() => {
      if (!dismissed) {
        setNotification(generateNotification());
      }
    }, 8000); // 8 seconds after page load

    // Regular interval for new notifications
    const interval = setInterval(() => {
      if (!dismissed && !hasInteracted) {
        setNotification(null);
        setTimeout(() => {
          setNotification(generateNotification());
        }, 500); // Brief pause between notifications
      }
    }, 25000 + Math.random() * 15000); // 25-40 seconds

    return () => {
      clearTimeout(initialDelay);
      clearInterval(interval);
    };
  }, [dismissed, hasInteracted]);

  // Auto-hide notification after display
  useEffect(() => {
    if (notification) {
      const hideTimeout = setTimeout(() => {
        setNotification(null);
      }, 6000); // Show for 6 seconds

      return () => clearTimeout(hideTimeout);
    }
  }, [notification]);

  const handleDismiss = () => {
    setDismissed(true);
    setNotification(null);
    sessionStorage.setItem('socialProofDismissed', 'true');
  };

  const handleClick = () => {
    setHasInteracted(true);
    // Scroll to scanner
    document.getElementById('scanner')?.scrollIntoView({ behavior: 'smooth' });
    setNotification(null);
  };

  if (!notification || dismissed) return null;

  const getIcon = () => {
    switch (notification.type) {
      case 'scan':
        return <Zap className="w-4 h-4 text-indigo-400" />;
      case 'signup':
        return <Shield className="w-4 h-4 text-green-400" />;
      case 'upgrade':
        return <Shield className="w-4 h-4 text-purple-400" />;
    }
  };

  const getMessage = () => {
    switch (notification.type) {
      case 'scan':
        return (
          <>
            Someone scanned <span className="font-medium text-white">{notification.url}</span>
          </>
        );
      case 'signup':
        return 'Someone started their free trial';
      case 'upgrade':
        return 'Someone upgraded to Professional';
    }
  };

  return (
    <div
      className="fixed bottom-4 left-4 z-50 max-w-sm animate-slide-up"
      style={{
        animation: 'slideUp 0.3s ease-out',
      }}
    >
      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <div className="bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl overflow-hidden">
        <div className="p-4">
          <div className="flex items-start gap-3">
            {/* Icon */}
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center">
              {getIcon()}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className="text-sm text-zinc-300">{getMessage()}</p>
              <div className="flex items-center gap-2 mt-1">
                <MapPin className="w-3 h-3 text-zinc-500" />
                <span className="text-xs text-zinc-500">{notification.location}</span>
                <span className="text-xs text-zinc-600">•</span>
                <span className="text-xs text-zinc-500">{notification.time}</span>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={handleDismiss}
              className="flex-shrink-0 p-1 text-zinc-500 hover:text-zinc-300 transition-colors"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* CTA */}
          <button
            onClick={handleClick}
            className="w-full mt-3 py-2 text-sm text-center text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/10 rounded-lg transition-colors"
          >
            Scan your site too
          </button>
        </div>
      </div>
    </div>
  );
}
