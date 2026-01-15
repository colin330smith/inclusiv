'use client';

import { useState, useRef, useEffect } from 'react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { Bell, Menu, User, LogOut, Settings, CreditCard, ChevronDown, Search } from 'lucide-react';

interface DashboardHeaderProps {
  user: {
    name?: string | null;
    email: string;
    image?: string | null;
  };
}

export default function DashboardHeader({ user }: DashboardHeaderProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const initials = user.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : user.email[0].toUpperCase();

  return (
    <header className="sticky top-0 z-40 bg-zinc-950/80 backdrop-blur-lg border-b border-zinc-800">
      <div className="flex h-16 items-center justify-between px-4 lg:px-6">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="lg:hidden p-2 text-zinc-400 hover:text-white"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Page Title Area */}
        <div className="flex-1 lg:flex-none">
          {/* Can be used for breadcrumbs or page title */}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
          {/* Search / Command Palette Trigger */}
          <button
            onClick={() => {
              // Trigger command palette via keyboard event
              const event = new KeyboardEvent('keydown', {
                key: 'k',
                metaKey: true,
                bubbles: true,
              });
              document.dispatchEvent(event);
            }}
            className="hidden lg:flex items-center gap-2 px-3 py-1.5 text-sm text-zinc-500 bg-zinc-800/50 hover:bg-zinc-800 border border-zinc-700 rounded-lg transition-colors"
          >
            <Search className="w-4 h-4" />
            <span>Search...</span>
            <kbd className="ml-2 px-1.5 py-0.5 text-xs bg-zinc-700 rounded">⌘K</kbd>
          </button>

          {/* Notifications */}
          <button className="relative p-2 text-zinc-400 hover:text-white transition-colors">
            <Bell className="w-5 h-5" />
            {/* Notification badge */}
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full"></span>
          </button>

          {/* User Menu */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-3 p-1.5 rounded-lg hover:bg-zinc-800 transition-colors"
            >
              {/* Avatar */}
              {user.image ? (
                <img
                  src={user.image}
                  alt={user.name || 'User'}
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center">
                  <span className="text-sm font-medium text-white">{initials}</span>
                </div>
              )}

              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-white">
                  {user.name || user.email.split('@')[0]}
                </p>
                <p className="text-xs text-zinc-500">{user.email}</p>
              </div>

              <ChevronDown className="w-4 h-4 text-zinc-400 hidden sm:block" />
            </button>

            {/* Dropdown Menu */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl py-1 z-50">
                <div className="px-4 py-3 border-b border-zinc-800 sm:hidden">
                  <p className="text-sm font-medium text-white">
                    {user.name || user.email.split('@')[0]}
                  </p>
                  <p className="text-xs text-zinc-500">{user.email}</p>
                </div>

                <Link
                  href="/dashboard/settings"
                  className="flex items-center gap-3 px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
                  onClick={() => setShowUserMenu(false)}
                >
                  <User className="w-4 h-4" />
                  Profile
                </Link>

                <Link
                  href="/dashboard/settings"
                  className="flex items-center gap-3 px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
                  onClick={() => setShowUserMenu(false)}
                >
                  <Settings className="w-4 h-4" />
                  Settings
                </Link>

                <Link
                  href="/dashboard/billing"
                  className="flex items-center gap-3 px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
                  onClick={() => setShowUserMenu(false)}
                >
                  <CreditCard className="w-4 h-4" />
                  Billing
                </Link>

                <div className="border-t border-zinc-800 mt-1 pt-1">
                  <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-400 hover:bg-zinc-800 hover:text-red-300 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
