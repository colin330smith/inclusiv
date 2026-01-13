"use client";

import { Shield, Lock, CheckCircle, Award, Server, Eye } from "lucide-react";

export function SecurityBadges() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <div className="flex items-center gap-2 px-4 py-2 bg-zinc-800/50 border border-zinc-700 rounded-lg">
        <Lock className="w-4 h-4 text-green-500" />
        <span className="text-zinc-400 text-sm">256-bit SSL</span>
      </div>
      <div className="flex items-center gap-2 px-4 py-2 bg-zinc-800/50 border border-zinc-700 rounded-lg">
        <Shield className="w-4 h-4 text-blue-500" />
        <span className="text-zinc-400 text-sm">GDPR Compliant</span>
      </div>
      <div className="flex items-center gap-2 px-4 py-2 bg-zinc-800/50 border border-zinc-700 rounded-lg">
        <Server className="w-4 h-4 text-indigo-500" />
        <span className="text-zinc-400 text-sm">EU Data Centers</span>
      </div>
      <div className="flex items-center gap-2 px-4 py-2 bg-zinc-800/50 border border-zinc-700 rounded-lg">
        <Eye className="w-4 h-4 text-purple-500" />
        <span className="text-zinc-400 text-sm">No Data Stored</span>
      </div>
    </div>
  );
}

export function ComplianceBadges() {
  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
      <h4 className="text-sm font-semibold text-zinc-400 uppercase tracking-wide mb-4 text-center">
        Compliance Standards Covered
      </h4>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-3 bg-zinc-800/50 rounded-lg">
          <div className="text-lg font-bold text-white mb-1">WCAG 2.1</div>
          <div className="text-xs text-zinc-500">Level AA</div>
        </div>
        <div className="text-center p-3 bg-zinc-800/50 rounded-lg">
          <div className="text-lg font-bold text-white mb-1">EAA</div>
          <div className="text-xs text-zinc-500">EU Directive</div>
        </div>
        <div className="text-center p-3 bg-zinc-800/50 rounded-lg">
          <div className="text-lg font-bold text-white mb-1">ADA</div>
          <div className="text-xs text-zinc-500">Title III</div>
        </div>
        <div className="text-center p-3 bg-zinc-800/50 rounded-lg">
          <div className="text-lg font-bold text-white mb-1">EN 301 549</div>
          <div className="text-xs text-zinc-500">EU Standard</div>
        </div>
      </div>
    </div>
  );
}

export function TrustIndicators() {
  return (
    <div className="bg-gradient-to-r from-zinc-900 to-zinc-800 border border-zinc-700 rounded-xl p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div>
          <div className="w-12 h-12 mx-auto mb-3 bg-green-500/10 rounded-full flex items-center justify-center">
            <CheckCircle className="w-6 h-6 text-green-500" />
          </div>
          <div className="text-2xl font-bold text-white mb-1">99.9%</div>
          <div className="text-zinc-400 text-sm">Uptime Guarantee</div>
        </div>
        <div>
          <div className="w-12 h-12 mx-auto mb-3 bg-blue-500/10 rounded-full flex items-center justify-center">
            <Award className="w-6 h-6 text-blue-500" />
          </div>
          <div className="text-2xl font-bold text-white mb-1">SOC 2</div>
          <div className="text-zinc-400 text-sm">Type II Certified</div>
        </div>
        <div>
          <div className="w-12 h-12 mx-auto mb-3 bg-purple-500/10 rounded-full flex items-center justify-center">
            <Shield className="w-6 h-6 text-purple-500" />
          </div>
          <div className="text-2xl font-bold text-white mb-1">ISO 27001</div>
          <div className="text-zinc-400 text-sm">Compliant</div>
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
          <h4 className="text-white font-semibold mb-2">Your Data is Safe</h4>
          <ul className="space-y-2 text-sm text-zinc-400">
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
              We never store your website content
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
              Scan results are encrypted and auto-deleted after 24h
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
              100% GDPR compliant processing
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
              Data processed only in EU data centers
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export function ScannerTrustBar() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-500">
      <div className="flex items-center gap-1.5">
        <Lock className="w-3.5 h-3.5 text-green-500" />
        <span>SSL Secured</span>
      </div>
      <div className="flex items-center gap-1.5">
        <Shield className="w-3.5 h-3.5 text-blue-500" />
        <span>GDPR Compliant</span>
      </div>
      <div className="flex items-center gap-1.5">
        <Eye className="w-3.5 h-3.5 text-purple-500" />
        <span>No Data Stored</span>
      </div>
      <div className="flex items-center gap-1.5">
        <Server className="w-3.5 h-3.5 text-indigo-500" />
        <span>EU Servers</span>
      </div>
    </div>
  );
}
