"use client";

import { useState, useEffect } from "react";
import { Globe, CheckCircle, TrendingUp } from "lucide-react";

type ActivityItem = {
  type: "scan" | "compliance" | "signup";
  company?: string;
  location?: string;
  time: string;
};

// Company name fragments for realistic generation
const COMPANY_FRAGMENTS = {
  prefixes: ["Tech", "Euro", "Nordic", "Digital", "Smart", "Global", "Prime", "Blue", "Green", "Red"],
  suffixes: ["Shop", "Store", "Market", "Commerce", "Hub", "Direct", "Online", "Retail", "Goods", "Trade"],
};

const LOCATIONS = [
  "Germany", "France", "Netherlands", "Belgium", "Spain", "Italy",
  "Austria", "Sweden", "Denmark", "Finland", "Poland", "Portugal"
];

// Generate a realistic company name
function generateCompanyName(): string {
  const prefix = COMPANY_FRAGMENTS.prefixes[Math.floor(Math.random() * COMPANY_FRAGMENTS.prefixes.length)];
  const suffix = COMPANY_FRAGMENTS.suffixes[Math.floor(Math.random() * COMPANY_FRAGMENTS.suffixes.length)];
  return `${prefix}${suffix}`;
}

// Generate a time ago string
function generateTimeAgo(): string {
  const minutes = Math.floor(Math.random() * 55) + 1;
  if (minutes < 2) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  return `${Math.floor(minutes / 60)}h ago`;
}

// Generate initial activity items
function generateInitialActivity(): ActivityItem[] {
  return Array.from({ length: 5 }, (_, i) => ({
    type: ["scan", "compliance", "scan", "signup", "scan"][i] as ActivityItem["type"],
    company: generateCompanyName(),
    location: LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)],
    time: generateTimeAgo(),
  }));
}

export function LiveActivityFeed() {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setActivities(generateInitialActivity());

    // Add new activity every 15-30 seconds
    const interval = setInterval(() => {
      const newActivity: ActivityItem = {
        type: Math.random() > 0.3 ? "scan" : "compliance",
        company: generateCompanyName(),
        location: LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)],
        time: "just now",
      };

      setActivities((prev) => [newActivity, ...prev.slice(0, 4)]);
    }, Math.random() * 15000 + 15000);

    return () => clearInterval(interval);
  }, []);

  if (!isClient) return null;

  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 max-w-sm">
      <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
        <TrendingUp className="w-4 h-4 text-green-500" />
        Live Activity
      </h4>
      <div className="space-y-2">
        {activities.slice(0, 3).map((activity, i) => (
          <div
            key={i}
            className={`flex items-center gap-2 text-xs transition-all duration-500 ${
              i === 0 ? "opacity-100" : "opacity-70"
            }`}
          >
            {activity.type === "scan" ? (
              <Globe className="w-3 h-3 text-indigo-400 flex-shrink-0" />
            ) : (
              <CheckCircle className="w-3 h-3 text-green-400 flex-shrink-0" />
            )}
            <span className="text-zinc-400 truncate">
              <span className="text-white">{activity.company}</span>
              {activity.type === "scan" ? " scanned their site" : " achieved compliance"}
            </span>
            <span className="text-zinc-600 ml-auto flex-shrink-0">{activity.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

type LiveCounterProps = {
  label: string;
  baseCount: number;
  incrementRange?: [number, number];
  intervalMs?: number;
  icon?: React.ReactNode;
};

export function LiveCounter({
  label,
  baseCount,
  incrementRange = [1, 3],
  intervalMs = 30000,
  icon,
}: LiveCounterProps) {
  const [count, setCount] = useState(baseCount);
  const [isClient, setIsClient] = useState(false);
  const [justIncremented, setJustIncremented] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const interval = setInterval(() => {
      const increment = Math.floor(
        Math.random() * (incrementRange[1] - incrementRange[0] + 1)
      ) + incrementRange[0];

      setCount((prev) => prev + increment);
      setJustIncremented(true);

      setTimeout(() => setJustIncremented(false), 500);
    }, intervalMs);

    return () => clearInterval(interval);
  }, [incrementRange, intervalMs]);

  if (!isClient) {
    return (
      <div className="flex items-center gap-2 text-sm text-green-400">
        {icon}
        <span>{baseCount.toLocaleString()} {label}</span>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2 text-sm text-green-400 transition-all duration-300 ${
      justIncremented ? "scale-105" : ""
    }`}>
      {icon}
      <span>
        <span className={`transition-all duration-300 ${justIncremented ? "text-green-300" : ""}`}>
          {count.toLocaleString()}
        </span>{" "}
        {label}
      </span>
    </div>
  );
}

export function RecentScansNotification() {
  const [show, setShow] = useState(false);
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    // Show first notification after 10 seconds
    const initialTimeout = setTimeout(() => {
      setCompany(generateCompanyName());
      setLocation(LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)]);
      setShow(true);

      // Hide after 5 seconds
      setTimeout(() => setShow(false), 5000);
    }, 10000);

    // Then show periodically
    const interval = setInterval(() => {
      setCompany(generateCompanyName());
      setLocation(LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)]);
      setShow(true);

      setTimeout(() => setShow(false), 5000);
    }, 45000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-4 z-40 animate-in slide-in-from-bottom-4 fade-in duration-300">
      <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-4 shadow-xl max-w-xs">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center flex-shrink-0">
            <Globe className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-white text-sm font-medium">{company}</p>
            <p className="text-zinc-400 text-xs">
              from {location} just scanned their site
            </p>
            <p className="text-zinc-500 text-xs mt-1">a few seconds ago</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function HourlyActivityBadge() {
  const [count, setCount] = useState(47);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    // Randomly fluctuate the count
    const interval = setInterval(() => {
      setCount(Math.floor(Math.random() * 30) + 35); // 35-65 range
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  if (!isClient) return null;

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full text-sm text-green-400">
      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
      <span>{count} companies checked compliance in the last hour</span>
    </div>
  );
}
