'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Globe,
  FileSearch,
  Settings,
  CreditCard,
  HelpCircle,
  FileText,
  TrendingUp,
  Gift,
} from 'lucide-react';

interface DashboardSidebarProps {
  user: {
    name?: string | null;
    email: string;
    subscriptionTier: string;
  };
}

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Sites', href: '/dashboard/sites', icon: Globe },
  { name: 'Scans', href: '/dashboard/scans', icon: FileSearch },
  { name: 'Reports', href: '/dashboard/reports', icon: FileText },
  { name: 'Analytics', href: '/dashboard/analytics', icon: TrendingUp },
];

const secondaryNavigation = [
  { name: 'Referrals', href: '/dashboard/referrals', icon: Gift, highlight: true },
  { name: 'Billing', href: '/dashboard/billing', icon: CreditCard },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  { name: 'Help', href: '/dashboard/help', icon: HelpCircle },
];

export default function DashboardSidebar({ user }: DashboardSidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard';
    }
    return pathname.startsWith(href);
  };

  return (
    <aside className="fixed inset-y-0 left-0 z-50 hidden w-64 bg-zinc-900 border-r border-zinc-800 lg:block">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center px-6 border-b border-zinc-800">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-white">Inclusiv</span>
          </Link>
        </div>

        {/* Plan Badge */}
        <div className="px-4 py-3 border-b border-zinc-800">
          <div className="flex items-center justify-between">
            <span className="text-xs text-zinc-500 uppercase tracking-wider">Current Plan</span>
            <span
              className={`text-xs font-semibold px-2 py-1 rounded-full ${
                user.subscriptionTier === 'free'
                  ? 'bg-zinc-800 text-zinc-400'
                  : user.subscriptionTier === 'starter'
                  ? 'bg-blue-500/20 text-blue-400'
                  : user.subscriptionTier === 'professional'
                  ? 'bg-indigo-500/20 text-indigo-400'
                  : 'bg-purple-500/20 text-purple-400'
              }`}
            >
              {user.subscriptionTier.charAt(0).toUpperCase() + user.subscriptionTier.slice(1)}
            </span>
          </div>
        </div>

        {/* Primary Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? 'bg-indigo-500/10 text-indigo-400'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Secondary Navigation */}
        <nav className="px-3 py-4 border-t border-zinc-800 space-y-1">
          {secondaryNavigation.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            const highlight = 'highlight' in item && item.highlight;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? 'bg-indigo-500/10 text-indigo-400'
                    : highlight
                    ? 'text-green-400 hover:text-green-300 hover:bg-green-500/10'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.name}
                {highlight && !active && (
                  <span className="ml-auto text-[10px] bg-green-500/20 text-green-400 px-1.5 py-0.5 rounded-full">
                    Earn
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Upgrade CTA (for free users) */}
        {user.subscriptionTier === 'free' && (
          <div className="p-4 border-t border-zinc-800">
            <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-lg p-4">
              <p className="text-sm font-medium text-white mb-2">Upgrade to Pro</p>
              <p className="text-xs text-zinc-400 mb-3">
                Get unlimited scans, AI fixes, and compliance certificates.
              </p>
              <Link
                href="/pricing"
                className="block w-full py-2 px-3 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg text-center transition-colors"
              >
                View Plans
              </Link>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
