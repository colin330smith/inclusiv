"use client";

import { useState, useEffect, useCallback } from "react";
import { CheckCircle, Shield, Globe } from "lucide-react";

interface SocialProofEvent {
  id: string;
  type: "scan" | "signup" | "compliance";
  location: string;
  timeAgo: string;
  detail?: string;
}

// Simulated social proof data - represents realistic activity
const locations = [
  "Berlin, Germany",
  "Paris, France",
  "Amsterdam, Netherlands",
  "Munich, Germany",
  "Vienna, Austria",
  "Barcelona, Spain",
  "Milan, Italy",
  "Stockholm, Sweden",
  "Copenhagen, Denmark",
  "Dublin, Ireland",
  "Brussels, Belgium",
  "Helsinki, Finland",
  "Lisbon, Portugal",
  "Warsaw, Poland",
  "Prague, Czech Republic",
  "New York, USA",
  "Los Angeles, USA",
  "Chicago, USA",
  "London, UK",
  "Sydney, Australia",
];

const platforms = [
  "Shopify",
  "WordPress",
  "WooCommerce",
  "Webflow",
  "Squarespace",
  "Custom website",
  "Magento",
  "BigCommerce",
];

const generateEvent = (): SocialProofEvent => {
  const types: Array<"scan" | "signup" | "compliance"> = ["scan", "scan", "scan", "signup", "compliance"];
  const type = types[Math.floor(Math.random() * types.length)];
  const location = locations[Math.floor(Math.random() * locations.length)];
  const platform = platforms[Math.floor(Math.random() * platforms.length)];
  const minutes = Math.floor(Math.random() * 15) + 1;

  return {
    id: `${Date.now()}-${Math.random()}`,
    type,
    location,
    timeAgo: `${minutes}m ago`,
    detail: type === "scan" ? platform : undefined,
  };
};

interface SocialProofToastProps {
  minDelay?: number;
  maxDelay?: number;
  duration?: number;
}

export default function SocialProofToast({
  minDelay = 15000,
  maxDelay = 45000,
  duration = 5000,
}: SocialProofToastProps) {
  const [currentEvent, setCurrentEvent] = useState<SocialProofEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  const showNextEvent = useCallback(() => {
    if (isDismissed) return;

    const event = generateEvent();
    setCurrentEvent(event);
    setIsVisible(true);

    // Hide after duration
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    // Schedule next event
    const nextDelay = Math.floor(Math.random() * (maxDelay - minDelay)) + minDelay;
    const nextTimer = setTimeout(showNextEvent, nextDelay);

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(nextTimer);
    };
  }, [isDismissed, duration, minDelay, maxDelay]);

  useEffect(() => {
    // Check if user dismissed
    const dismissed = localStorage.getItem("inclusiv_social_proof_dismissed");
    if (dismissed) {
      const dismissedTime = parseInt(dismissed, 10);
      // Reset after 1 hour
      if (Date.now() - dismissedTime < 60 * 60 * 1000) {
        setIsDismissed(true);
        return;
      }
    }

    // Initial delay before first notification
    const initialDelay = setTimeout(() => {
      showNextEvent();
    }, 8000);

    return () => clearTimeout(initialDelay);
  }, [showNextEvent]);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    localStorage.setItem("inclusiv_social_proof_dismissed", Date.now().toString());
  };

  if (!currentEvent || !isVisible || isDismissed) return null;

  const getIcon = () => {
    switch (currentEvent.type) {
      case "scan":
        return <Globe className="w-5 h-5 text-indigo-400" />;
      case "signup":
        return <Shield className="w-5 h-5 text-green-400" />;
      case "compliance":
        return <CheckCircle className="w-5 h-5 text-emerald-400" />;
    }
  };

  const getMessage = () => {
    switch (currentEvent.type) {
      case "scan":
        return (
          <>
            Someone in <span className="font-medium text-white">{currentEvent.location}</span> just scanned their{" "}
            <span className="text-indigo-400">{currentEvent.detail}</span> site
          </>
        );
      case "signup":
        return (
          <>
            A business in <span className="font-medium text-white">{currentEvent.location}</span> started their compliance journey
          </>
        );
      case "compliance":
        return (
          <>
            A site from <span className="font-medium text-white">{currentEvent.location}</span> achieved WCAG compliance
          </>
        );
    }
  };

  return (
    <div
      className={`fixed bottom-4 left-4 z-50 max-w-sm transition-all duration-500 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl shadow-black/20 p-4">
        <button
          onClick={handleDismiss}
          className="absolute -top-2 -right-2 w-6 h-6 bg-zinc-800 border border-zinc-700 rounded-full flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors text-xs"
          aria-label="Dismiss"
        >
          &times;
        </button>

        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center flex-shrink-0">
            {getIcon()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-zinc-300 leading-relaxed">
              {getMessage()}
            </p>
            <p className="text-xs text-zinc-500 mt-1">{currentEvent.timeAgo}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
