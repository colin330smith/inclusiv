'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Command } from 'cmdk';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  LayoutDashboard,
  Globe,
  FileSearch,
  Settings,
  CreditCard,
  HelpCircle,
  FileText,
  TrendingUp,
  Plus,
  ExternalLink,
  LogOut,
  Moon,
  Sun,
  Zap,
} from 'lucide-react';
import { signOut } from 'next-auth/react';

interface CommandPaletteProps {
  user?: {
    name?: string | null;
    email: string;
    subscriptionTier: string;
  };
}

export function CommandPalette({ user }: CommandPaletteProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const router = useRouter();

  // Toggle command palette with ⌘K or Ctrl+K
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
      // Also support Escape to close
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const runCommand = useCallback((command: () => void) => {
    setOpen(false);
    setSearch('');
    command();
  }, []);

  const navigationItems = [
    { icon: LayoutDashboard, label: 'Dashboard', shortcut: 'G D', href: '/dashboard' },
    { icon: Globe, label: 'Sites', shortcut: 'G S', href: '/dashboard/sites' },
    { icon: FileSearch, label: 'Scans', shortcut: 'G C', href: '/dashboard/scans' },
    { icon: FileText, label: 'Reports', shortcut: 'G R', href: '/dashboard/reports' },
    { icon: TrendingUp, label: 'Analytics', shortcut: 'G A', href: '/dashboard/analytics' },
    { icon: CreditCard, label: 'Billing', shortcut: 'G B', href: '/dashboard/billing' },
    { icon: Settings, label: 'Settings', shortcut: 'G E', href: '/dashboard/settings' },
    { icon: HelpCircle, label: 'Help', shortcut: 'G H', href: '/dashboard/help' },
  ];

  const actionItems = [
    { icon: Plus, label: 'Add new site', shortcut: 'N', action: () => router.push('/dashboard/sites/add') },
    { icon: Zap, label: 'Run quick scan', shortcut: 'S', action: () => router.push('/') },
    { icon: ExternalLink, label: 'View pricing', action: () => router.push('/pricing') },
  ];

  return (
    <>
      {/* Trigger hint for users */}
      <button
        onClick={() => setOpen(true)}
        className="hidden lg:flex items-center gap-2 px-3 py-1.5 text-sm text-zinc-500 bg-zinc-800/50 hover:bg-zinc-800 border border-zinc-700 rounded-lg transition-colors"
      >
        <Search className="w-4 h-4" />
        <span>Search...</span>
        <kbd className="ml-2 px-1.5 py-0.5 text-xs bg-zinc-700 rounded">⌘K</kbd>
      </button>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            {/* Command Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -20 }}
              transition={{ duration: 0.15 }}
              className="fixed left-1/2 top-[20%] z-50 -translate-x-1/2 w-full max-w-xl"
            >
              <Command
                className="bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden"
                loop
              >
                {/* Search Input */}
                <div className="flex items-center gap-3 px-4 border-b border-zinc-800">
                  <Search className="w-5 h-5 text-zinc-500" />
                  <Command.Input
                    value={search}
                    onValueChange={setSearch}
                    placeholder="Type a command or search..."
                    className="flex-1 py-4 bg-transparent text-white placeholder-zinc-500 focus:outline-none"
                  />
                  <kbd className="px-2 py-1 text-xs text-zinc-500 bg-zinc-800 rounded">ESC</kbd>
                </div>

                {/* Command List */}
                <Command.List className="max-h-80 overflow-y-auto p-2">
                  <Command.Empty className="py-6 text-center text-zinc-500">
                    No results found.
                  </Command.Empty>

                  {/* Navigation Group */}
                  <Command.Group heading="Navigation" className="mb-2">
                    <p className="px-2 py-1.5 text-xs font-medium text-zinc-500 uppercase tracking-wider">
                      Navigation
                    </p>
                    {navigationItems.map((item) => (
                      <Command.Item
                        key={item.href}
                        value={item.label}
                        onSelect={() => runCommand(() => router.push(item.href))}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer text-zinc-300 hover:text-white hover:bg-zinc-800 data-[selected=true]:bg-zinc-800 data-[selected=true]:text-white transition-colors"
                      >
                        <item.icon className="w-4 h-4 text-zinc-500" />
                        <span className="flex-1">{item.label}</span>
                        {item.shortcut && (
                          <span className="text-xs text-zinc-600">{item.shortcut}</span>
                        )}
                      </Command.Item>
                    ))}
                  </Command.Group>

                  {/* Actions Group */}
                  <Command.Group heading="Actions" className="mb-2">
                    <p className="px-2 py-1.5 text-xs font-medium text-zinc-500 uppercase tracking-wider">
                      Actions
                    </p>
                    {actionItems.map((item) => (
                      <Command.Item
                        key={item.label}
                        value={item.label}
                        onSelect={() => runCommand(item.action)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer text-zinc-300 hover:text-white hover:bg-zinc-800 data-[selected=true]:bg-zinc-800 data-[selected=true]:text-white transition-colors"
                      >
                        <item.icon className="w-4 h-4 text-zinc-500" />
                        <span className="flex-1">{item.label}</span>
                        {item.shortcut && (
                          <span className="text-xs text-zinc-600">{item.shortcut}</span>
                        )}
                      </Command.Item>
                    ))}
                  </Command.Group>

                  {/* Account Group */}
                  <Command.Group heading="Account">
                    <p className="px-2 py-1.5 text-xs font-medium text-zinc-500 uppercase tracking-wider">
                      Account
                    </p>
                    {user && (
                      <Command.Item
                        value="Sign out"
                        onSelect={() => runCommand(() => signOut({ callbackUrl: '/' }))}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer text-zinc-300 hover:text-white hover:bg-zinc-800 data-[selected=true]:bg-zinc-800 data-[selected=true]:text-white transition-colors"
                      >
                        <LogOut className="w-4 h-4 text-zinc-500" />
                        <span className="flex-1">Sign out</span>
                      </Command.Item>
                    )}
                  </Command.Group>
                </Command.List>

                {/* Footer */}
                <div className="flex items-center justify-between px-4 py-3 border-t border-zinc-800 text-xs text-zinc-500">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <kbd className="px-1.5 py-0.5 bg-zinc-800 rounded">↑↓</kbd>
                      navigate
                    </span>
                    <span className="flex items-center gap-1">
                      <kbd className="px-1.5 py-0.5 bg-zinc-800 rounded">↵</kbd>
                      select
                    </span>
                  </div>
                  <span>Inclusiv</span>
                </div>
              </Command>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
