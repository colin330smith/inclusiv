'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';
import Link from 'next/link';
import {
  User,
  Mail,
  CreditCard,
  Bell,
  Shield,
  ArrowRight,
  Check,
  AlertTriangle,
} from 'lucide-react';

export default function SettingsPage() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState('account');

  const tabs = [
    { id: 'account', label: 'Account', icon: User },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-zinc-400 mt-1">Manage your account settings and preferences.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-zinc-800 pb-4">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        {activeTab === 'account' && <AccountSettings session={session} />}
        {activeTab === 'billing' && <BillingSettings session={session} />}
        {activeTab === 'notifications' && <NotificationSettings />}
      </div>
    </div>
  );
}

function AccountSettings({ session }: { session: ReturnType<typeof useSession>['data'] }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Account Information</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">Name</label>
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-zinc-500" />
              <span className="text-white">{session?.user?.name || 'Not set'}</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">Email</label>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-zinc-500" />
              <span className="text-white">{session?.user?.email}</span>
              <span className="text-xs px-2 py-0.5 bg-green-500/10 text-green-400 rounded-full">
                Verified
              </span>
            </div>
          </div>
        </div>
      </div>

      <hr className="border-zinc-800" />

      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Security</h3>
        <div className="space-y-3">
          <button className="flex items-center justify-between w-full p-4 bg-zinc-800/50 hover:bg-zinc-800 rounded-lg transition-colors">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-zinc-400" />
              <div className="text-left">
                <p className="text-white font-medium">Change Password</p>
                <p className="text-sm text-zinc-500">Update your account password</p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-zinc-500" />
          </button>
        </div>
      </div>

      <hr className="border-zinc-800" />

      <div>
        <h3 className="text-lg font-semibold text-red-400 mb-4">Danger Zone</h3>
        <button className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors">
          Delete Account
        </button>
        <p className="text-sm text-zinc-500 mt-2">
          This action is irreversible. All your data will be permanently deleted.
        </p>
      </div>
    </div>
  );
}

function BillingSettings({ session }: { session: ReturnType<typeof useSession>['data'] }) {
  const planDetails = {
    free: { name: 'Free', price: '$0', features: ['1 site', '3 scans/month', 'Basic reports'] },
    starter: {
      name: 'Starter',
      price: '$29/mo',
      features: ['5 sites', '100 scans/month', 'AI fix suggestions', 'Email support'],
    },
    professional: {
      name: 'Professional',
      price: '$79/mo',
      features: ['Unlimited sites', 'Unlimited scans', 'AI auto-fixes', 'API access', 'Priority support'],
    },
    enterprise: {
      name: 'Enterprise',
      price: 'Custom',
      features: ['Everything in Pro', 'Custom integrations', 'SLA', 'Dedicated support'],
    },
  };

  const currentPlan =
    planDetails[session?.user?.subscriptionTier as keyof typeof planDetails] || planDetails.free;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Current Plan</h3>
        <div className="p-4 bg-zinc-800/50 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-white font-semibold text-xl">{currentPlan.name}</p>
              <p className="text-zinc-400">{currentPlan.price}</p>
            </div>
            {session?.user?.subscriptionTier !== 'free' && (
              <span className="px-3 py-1 bg-green-500/10 text-green-400 rounded-full text-sm">
                Active
              </span>
            )}
          </div>
          <ul className="space-y-2">
            {currentPlan.features.map((feature, i) => (
              <li key={i} className="flex items-center gap-2 text-zinc-400 text-sm">
                <Check className="w-4 h-4 text-green-400" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {session?.user?.subscriptionTier === 'free' && (
        <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-indigo-400 font-medium">Upgrade to unlock more features</p>
              <p className="text-zinc-400 text-sm mt-1">
                Get unlimited scans, AI-powered fixes, and priority support.
              </p>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 mt-3 text-indigo-400 hover:text-indigo-300"
              >
                View Plans
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {session?.user?.subscriptionTier !== 'free' && (
        <>
          <hr className="border-zinc-800" />
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Payment Method</h3>
            <button className="flex items-center justify-between w-full p-4 bg-zinc-800/50 hover:bg-zinc-800 rounded-lg transition-colors">
              <div className="flex items-center gap-3">
                <CreditCard className="w-5 h-5 text-zinc-400" />
                <div className="text-left">
                  <p className="text-white font-medium">Manage Payment Method</p>
                  <p className="text-sm text-zinc-500">Update your card or billing info</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-zinc-500" />
            </button>
          </div>

          <hr className="border-zinc-800" />
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Billing History</h3>
            <p className="text-zinc-400 text-sm">
              View and download your past invoices from the Stripe customer portal.
            </p>
            <button className="mt-3 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors">
              View Billing History
            </button>
          </div>
        </>
      )}
    </div>
  );
}

function NotificationSettings() {
  const [emailNotifications, setEmailNotifications] = useState({
    scanComplete: true,
    weeklyReport: true,
    criticalIssues: true,
    productUpdates: false,
  });

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Email Notifications</h3>
        <div className="space-y-4">
          <NotificationToggle
            label="Scan Complete"
            description="Get notified when your scheduled scans finish"
            checked={emailNotifications.scanComplete}
            onChange={(checked) =>
              setEmailNotifications({ ...emailNotifications, scanComplete: checked })
            }
          />
          <NotificationToggle
            label="Weekly Report"
            description="Receive a weekly summary of your sites' accessibility status"
            checked={emailNotifications.weeklyReport}
            onChange={(checked) =>
              setEmailNotifications({ ...emailNotifications, weeklyReport: checked })
            }
          />
          <NotificationToggle
            label="Critical Issues"
            description="Get immediate alerts when critical issues are detected"
            checked={emailNotifications.criticalIssues}
            onChange={(checked) =>
              setEmailNotifications({ ...emailNotifications, criticalIssues: checked })
            }
          />
          <NotificationToggle
            label="Product Updates"
            description="Stay informed about new features and improvements"
            checked={emailNotifications.productUpdates}
            onChange={(checked) =>
              setEmailNotifications({ ...emailNotifications, productUpdates: checked })
            }
          />
        </div>
      </div>

      <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-colors">
        Save Preferences
      </button>
    </div>
  );
}

function NotificationToggle({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-lg">
      <div>
        <p className="text-white font-medium">{label}</p>
        <p className="text-sm text-zinc-500">{description}</p>
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative w-12 h-6 rounded-full transition-colors ${
          checked ? 'bg-indigo-600' : 'bg-zinc-700'
        }`}
      >
        <span
          className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
            checked ? 'translate-x-6' : ''
          }`}
        />
      </button>
    </div>
  );
}
