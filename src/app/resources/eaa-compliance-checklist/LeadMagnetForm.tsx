"use client";

import { useState } from "react";
import { Download, Loader2, CheckCircle, Mail } from "lucide-react";

export function LeadMagnetForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/lead-magnet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name,
          leadMagnet: "eaa-compliance-checklist",
          source: "checklist-page",
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to submit");
      }

      setIsSubmitted(true);

      // Track conversion
      if (typeof window !== "undefined") {
        (window as Window & { trackConversion?: (event: string, props: Record<string, string>) => void }).trackConversion?.("lead_magnet_download", {
          magnet: "eaa-compliance-checklist",
          email: email,
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-zinc-900/50 border border-green-500/20 rounded-2xl p-8 text-center">
        <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-400" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Check Your Inbox!</h3>
        <p className="text-zinc-400 mb-4">
          We&apos;ve sent the EAA Compliance Checklist to{" "}
          <span className="text-white">{email}</span>
        </p>
        <div className="flex items-center justify-center gap-2 text-sm text-zinc-500">
          <Mail className="w-4 h-4" />
          <span>Can&apos;t find it? Check your spam folder</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8">
      <div className="flex items-center gap-2 mb-6">
        <Download className="w-5 h-5 text-indigo-400" />
        <span className="text-sm font-medium text-indigo-400">
          Instant Download
        </span>
      </div>

      <h3 className="text-xl font-bold text-white mb-2">
        Get the Free Checklist
      </h3>
      <p className="text-zinc-400 text-sm mb-6">
        Enter your email and we&apos;ll send the complete 50+ point checklist
        directly to your inbox.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-zinc-300 mb-1">
            First Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John"
            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-1">
            Work Email <span className="text-red-400">*</span>
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="john@company.com"
            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-600/50 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Download className="w-5 h-5" />
              Send Me the Checklist
            </>
          )}
        </button>
      </form>

      <p className="text-xs text-zinc-500 text-center mt-4">
        By submitting, you agree to receive emails from Inclusiv. Unsubscribe anytime.
      </p>
    </div>
  );
}
