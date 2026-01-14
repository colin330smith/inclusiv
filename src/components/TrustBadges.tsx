"use client";

import { Shield, Lock, CheckCircle, Server, Eye } from "lucide-react";

export function SecurityBadges() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <div className="flex items-center gap-2 px-4 py-2 bg-zinc-800/50 border border-zinc-700 rounded-lg">
        <Lock className="w-4 h-4 text-green-500" />
        <span className="text-zinc-400 text-sm">HTTPS Secured</span>
      </div>
      <div className="flex items-center gap-2 px-4 py-2 bg-zinc-800/50 border border-zinc-700 rounded-lg">
        <Shield className="w-4 h-4 text-blue-500" />
        <span className="text-zinc-400 text-sm">GDPR Compliant</span>
      </div>
      <div className="flex items-center gap-2 px-4 py-2 bg-zinc-800/50 border border-zinc-700 rounded-lg">
        <Server className="w-4 h-4 text-indigo-500" />
        <span className="text-zinc-400 text-sm">Vercel Hosted</span>
      </div>
    </div>
  );
}

export function ComplianceBadges() {
  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
      <h4 className="text-sm font-semibold text-zinc-400 uppercase tracking-wide mb-4 text-center">
        Accessibility Standards We Check
      </h4>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-3 bg-zinc-800/50 rounded-lg">
          <div className="text-lg font-bold text-white mb-1">WCAG 2.1</div>
          <div className="text-xs text-zinc-400">Level AA</div>
        </div>
        <div className="text-center p-3 bg-zinc-800/50 rounded-lg">
          <div className="text-lg font-bold text-white mb-1">EAA</div>
          <div className="text-xs text-zinc-400">EU Directive</div>
        </div>
        <div className="text-center p-3 bg-zinc-800/50 rounded-lg">
          <div className="text-lg font-bold text-white mb-1">ADA</div>
          <div className="text-xs text-zinc-400">Title III</div>
        </div>
        <div className="text-center p-3 bg-zinc-800/50 rounded-lg">
          <div className="text-lg font-bold text-white mb-1">EN 301 549</div>
          <div className="text-xs text-zinc-400">EU Standard</div>
        </div>
      </div>
    </div>
  );
}

export function TechStackInfo() {
  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
      <h4 className="text-sm font-semibold text-zinc-400 uppercase tracking-wide mb-4 text-center">
        Built With
      </h4>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-3 bg-zinc-800/50 rounded-lg">
          <div className="text-lg font-bold text-white mb-1">axe-core</div>
          <div className="text-xs text-zinc-400">Deque Systems</div>
        </div>
        <div className="text-center p-3 bg-zinc-800/50 rounded-lg">
          <div className="text-lg font-bold text-white mb-1">Next.js</div>
          <div className="text-xs text-zinc-400">React Framework</div>
        </div>
        <div className="text-center p-3 bg-zinc-800/50 rounded-lg">
          <div className="text-lg font-bold text-white mb-1">Vercel</div>
          <div className="text-xs text-zinc-400">Edge Hosting</div>
        </div>
        <div className="text-center p-3 bg-zinc-800/50 rounded-lg">
          <div className="text-lg font-bold text-white mb-1">Puppeteer</div>
          <div className="text-xs text-zinc-400">Browser Testing</div>
        </div>
      </div>
    </div>
  );
}

export function DataPrivacyAssurance() {
  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
          <Shield className="w-6 h-6 text-indigo-500" />
        </div>
        <div>
          <h4 className="text-white font-semibold mb-2">Privacy First</h4>
          <ul className="space-y-2 text-sm text-zinc-400">
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
              Scans are processed on the fly, not stored
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
              No tracking cookies required
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
              Open source scanning engine (axe-core)
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export function ScannerTrustBar() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-400">
      <div className="flex items-center gap-1.5">
        <Lock className="w-3.5 h-3.5 text-green-500" />
        <span>HTTPS Only</span>
      </div>
      <div className="flex items-center gap-1.5">
        <Eye className="w-3.5 h-3.5 text-purple-500" />
        <span>No Data Stored</span>
      </div>
      <div className="flex items-center gap-1.5">
        <Server className="w-3.5 h-3.5 text-indigo-500" />
        <span>Powered by axe-core</span>
      </div>
    </div>
  );
}
