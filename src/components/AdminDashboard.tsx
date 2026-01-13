"use client";

import { useState, useEffect } from "react";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Scan,
  Mail,
  CreditCard,
  Eye,
  MousePointer,
  Clock,
  ArrowRight,
  RefreshCw,
  Calendar,
  Target,
  Percent,
} from "lucide-react";

// Type definitions
type MetricCardProps = {
  title: string;
  value: string | number;
  change: number;
  changeLabel: string;
  icon: React.ReactNode;
  trend: "up" | "down" | "neutral";
};

type FunnelStage = {
  name: string;
  count: number;
  rate: number;
  expectedRate: number;
};

type TimeRange = "24h" | "7d" | "30d" | "90d";

// Mock data generator
const generateMockData = (timeRange: TimeRange) => {
  const baseMultiplier = {
    "24h": 1,
    "7d": 7,
    "30d": 30,
    "90d": 90,
  }[timeRange];

  // Base daily averages
  const dailyPageViews = 450;
  const dailyScanStarts = 89;
  const dailyScanCompletions = 72;
  const dailyEmailCaptures = 34;
  const dailyPricingViews = 28;
  const dailyCheckouts = 8;
  const dailyPayments = 4;

  return {
    pageViews: Math.floor(dailyPageViews * baseMultiplier * (0.9 + Math.random() * 0.2)),
    scanStarts: Math.floor(dailyScanStarts * baseMultiplier * (0.9 + Math.random() * 0.2)),
    scanCompletions: Math.floor(dailyScanCompletions * baseMultiplier * (0.9 + Math.random() * 0.2)),
    emailCaptures: Math.floor(dailyEmailCaptures * baseMultiplier * (0.9 + Math.random() * 0.2)),
    pricingViews: Math.floor(dailyPricingViews * baseMultiplier * (0.9 + Math.random() * 0.2)),
    checkoutsInitiated: Math.floor(dailyCheckouts * baseMultiplier * (0.9 + Math.random() * 0.2)),
    paymentsCompleted: Math.floor(dailyPayments * baseMultiplier * (0.9 + Math.random() * 0.2)),
    avgTimeOnPage: Math.floor(120 + Math.random() * 60),
    bounceRate: Math.floor(35 + Math.random() * 15),
    avgScrollDepth: Math.floor(55 + Math.random() * 25),
    revenue: Math.floor(dailyPayments * baseMultiplier * 149 * (0.9 + Math.random() * 0.2)),
  };
};

// Metric Card Component
const MetricCard = ({ title, value, change, changeLabel, icon, trend }: MetricCardProps) => {
  const trendColor = trend === "up" ? "text-green-500" : trend === "down" ? "text-red-500" : "text-zinc-500";
  const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : ArrowRight;

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-zinc-400 text-sm font-medium">{title}</span>
        <div className="w-9 h-9 rounded-lg bg-indigo-500/10 flex items-center justify-center">
          {icon}
        </div>
      </div>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-2xl font-bold text-white">{value}</p>
          <div className={`flex items-center gap-1 mt-1 text-sm ${trendColor}`}>
            <TrendIcon className="w-3 h-3" />
            <span>{Math.abs(change)}% {changeLabel}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Funnel Visualization Component
const FunnelVisualization = ({ stages }: { stages: FunnelStage[] }) => {
  const maxCount = stages[0]?.count || 1;

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Conversion Funnel</h3>
        <Target className="w-5 h-5 text-indigo-500" />
      </div>
      <div className="space-y-4">
        {stages.map((stage, index) => {
          const widthPercent = (stage.count / maxCount) * 100;
          const isAboveExpected = stage.rate >= stage.expectedRate;

          return (
            <div key={stage.name}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm text-zinc-300">{stage.name}</span>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-zinc-500">{stage.count.toLocaleString()}</span>
                  <span className={`text-sm font-medium ${isAboveExpected ? "text-green-500" : "text-orange-500"}`}>
                    {stage.rate.toFixed(1)}%
                  </span>
                </div>
              </div>
              <div className="relative h-8 bg-zinc-800 rounded-lg overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-lg transition-all duration-500"
                  style={{ width: `${widthPercent}%` }}
                />
                {/* Expected rate marker */}
                <div
                  className="absolute inset-y-0 w-0.5 bg-zinc-500"
                  style={{ left: `${(stage.expectedRate / 100) * (stage.count / maxCount) * 100}%` }}
                />
              </div>
              {index < stages.length - 1 && (
                <div className="flex justify-center py-1">
                  <ArrowRight className="w-4 h-4 text-zinc-600 rotate-90" />
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-4 pt-4 border-t border-zinc-800 flex items-center gap-4 text-xs text-zinc-500">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-indigo-500 rounded" />
          <span>Actual</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-0.5 bg-zinc-500" />
          <span>Expected threshold</span>
        </div>
      </div>
    </div>
  );
};

// Top CTAs Component
const TopCTAs = () => {
  const ctas = [
    { name: "Check Compliance Now", clicks: 1247, conversionRate: 18.4 },
    { name: "Get Full Report", clicks: 892, conversionRate: 42.1 },
    { name: "Start Free Scan", clicks: 634, conversionRate: 15.7 },
    { name: "Start 14-Day Trial", clicks: 289, conversionRate: 8.9 },
    { name: "View Pricing", clicks: 412, conversionRate: 6.2 },
  ];

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Top CTAs</h3>
        <MousePointer className="w-5 h-5 text-indigo-500" />
      </div>
      <div className="space-y-3">
        {ctas.map((cta, index) => (
          <div
            key={cta.name}
            className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-medium flex items-center justify-center">
                {index + 1}
              </span>
              <span className="text-sm text-zinc-300">{cta.name}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-zinc-500">{cta.clicks.toLocaleString()} clicks</span>
              <span className="text-sm font-medium text-green-500">{cta.conversionRate}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Event Log Component
const EventLog = () => {
  const events = [
    { event: "payment_completed", user: "marie@example.de", time: "2 min ago", value: "Professional" },
    { event: "scan_completed", user: "anonymous", time: "5 min ago", value: "Score: 67" },
    { event: "email_captured", user: "johan@example.nl", time: "8 min ago", value: "Homepage" },
    { event: "checkout_initiated", user: "elena@example.it", time: "12 min ago", value: "Starter" },
    { event: "scan_started", user: "anonymous", time: "15 min ago", value: "shopify.com" },
    { event: "pricing_viewed", user: "anonymous", time: "18 min ago", value: "From homepage" },
    { event: "scan_completed", user: "anonymous", time: "22 min ago", value: "Score: 45" },
    { event: "email_captured", user: "info@example.fr", time: "25 min ago", value: "Scan results" },
  ];

  const getEventColor = (event: string) => {
    switch (event) {
      case "payment_completed":
        return "text-green-500 bg-green-500/10";
      case "email_captured":
        return "text-blue-500 bg-blue-500/10";
      case "scan_completed":
        return "text-purple-500 bg-purple-500/10";
      case "checkout_initiated":
        return "text-orange-500 bg-orange-500/10";
      default:
        return "text-zinc-500 bg-zinc-500/10";
    }
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Live Events</h3>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-xs text-zinc-500">Live</span>
        </div>
      </div>
      <div className="space-y-2 max-h-[300px] overflow-y-auto">
        {events.map((event, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-2 hover:bg-zinc-800/50 rounded-lg transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className={`px-2 py-1 rounded text-xs font-medium ${getEventColor(event.event)}`}>
                {event.event}
              </span>
              <span className="text-sm text-zinc-400">{event.user}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs text-zinc-500">{event.value}</span>
              <span className="text-xs text-zinc-600">{event.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main Dashboard Component
export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState<TimeRange>("7d");
  const [data, setData] = useState(generateMockData("7d"));
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    setData(generateMockData(timeRange));
  }, [timeRange]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setData(generateMockData(timeRange));
      setIsRefreshing(false);
    }, 500);
  };

  // Calculate funnel stages
  const funnelStages: FunnelStage[] = [
    { name: "Page Views", count: data.pageViews, rate: 100, expectedRate: 100 },
    { name: "Scans Started", count: data.scanStarts, rate: (data.scanStarts / data.pageViews) * 100, expectedRate: 20 },
    { name: "Scans Completed", count: data.scanCompletions, rate: (data.scanCompletions / data.pageViews) * 100, expectedRate: 16 },
    { name: "Emails Captured", count: data.emailCaptures, rate: (data.emailCaptures / data.pageViews) * 100, expectedRate: 10 },
    { name: "Pricing Viewed", count: data.pricingViews, rate: (data.pricingViews / data.pageViews) * 100, expectedRate: 7 },
    { name: "Checkout Started", count: data.checkoutsInitiated, rate: (data.checkoutsInitiated / data.pageViews) * 100, expectedRate: 3 },
    { name: "Payment Completed", count: data.paymentsCompleted, rate: (data.paymentsCompleted / data.pageViews) * 100, expectedRate: 2 },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Analytics Dashboard</h1>
          <p className="text-zinc-500 text-sm mt-1">Track conversions and user behavior</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Time Range Selector */}
          <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 rounded-lg p-1">
            {(["24h", "7d", "30d", "90d"] as TimeRange[]).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  timeRange === range
                    ? "bg-indigo-600 text-white"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {range}
              </button>
            ))}
          </div>
          {/* Refresh Button */}
          <button
            onClick={handleRefresh}
            className="p-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-400 hover:text-white transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <MetricCard
          title="Total Page Views"
          value={data.pageViews.toLocaleString()}
          change={12.5}
          changeLabel="vs last period"
          icon={<Eye className="w-5 h-5 text-indigo-500" />}
          trend="up"
        />
        <MetricCard
          title="Scans Completed"
          value={data.scanCompletions.toLocaleString()}
          change={8.3}
          changeLabel="vs last period"
          icon={<Scan className="w-5 h-5 text-indigo-500" />}
          trend="up"
        />
        <MetricCard
          title="Emails Captured"
          value={data.emailCaptures.toLocaleString()}
          change={-2.1}
          changeLabel="vs last period"
          icon={<Mail className="w-5 h-5 text-indigo-500" />}
          trend="down"
        />
        <MetricCard
          title="Revenue"
          value={`€${data.revenue.toLocaleString()}`}
          change={15.7}
          changeLabel="vs last period"
          icon={<CreditCard className="w-5 h-5 text-indigo-500" />}
          trend="up"
        />
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <MetricCard
          title="Avg Time on Page"
          value={`${Math.floor(data.avgTimeOnPage / 60)}:${(data.avgTimeOnPage % 60).toString().padStart(2, "0")}`}
          change={5.2}
          changeLabel="vs last period"
          icon={<Clock className="w-5 h-5 text-indigo-500" />}
          trend="up"
        />
        <MetricCard
          title="Bounce Rate"
          value={`${data.bounceRate}%`}
          change={-3.4}
          changeLabel="vs last period"
          icon={<Percent className="w-5 h-5 text-indigo-500" />}
          trend="up"
        />
        <MetricCard
          title="Avg Scroll Depth"
          value={`${data.avgScrollDepth}%`}
          change={7.8}
          changeLabel="vs last period"
          icon={<BarChart3 className="w-5 h-5 text-indigo-500" />}
          trend="up"
        />
        <MetricCard
          title="New Users"
          value={Math.floor(data.pageViews * 0.72).toLocaleString()}
          change={9.1}
          changeLabel="vs last period"
          icon={<Users className="w-5 h-5 text-indigo-500" />}
          trend="up"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <FunnelVisualization stages={funnelStages} />
        <TopCTAs />
      </div>

      {/* Event Log */}
      <EventLog />

      {/* Footer */}
      <div className="mt-8 pt-6 border-t border-zinc-800 flex items-center justify-between text-sm text-zinc-500">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <span>Data from {timeRange === "24h" ? "last 24 hours" : `last ${timeRange.replace("d", " days")}`}</span>
        </div>
        <span>Last updated: just now</span>
      </div>
    </div>
  );
}
