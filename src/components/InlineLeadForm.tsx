"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle, Globe, Mail, Sparkles, Shield, Loader2 } from "lucide-react";

interface InlineLeadFormProps {
  variant?: "default" | "compact" | "dark" | "gradient";
  headline?: string;
  subheadline?: string;
  buttonText?: string;
  showUrl?: boolean;
  leadMagnet?: string;
  source?: string;
  onSuccess?: () => void;
}

export default function InlineLeadForm({
  variant = "default",
  headline = "Get Your Free Accessibility Audit",
  subheadline = "Discover compliance issues and get AI-powered fixes delivered to your inbox.",
  buttonText = "Get Free Audit",
  showUrl = true,
  leadMagnet = "inline-audit",
  source = "inline-form",
  onSuccess,
}: InlineLeadFormProps) {
  const [email, setEmail] = useState("");
  const [url, setUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/leads/capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          url: url || undefined,
          source,
          leadMagnet,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit");
      }

      setIsSuccess(true);
      localStorage.setItem("inclusiv_email_submitted", "true");

      // Track conversion
      if (typeof window !== "undefined" && (window as unknown as { plausible?: (event: string, options?: object) => void }).plausible) {
        (window as unknown as { plausible: (event: string, options?: object) => void }).plausible("LeadCapture", { props: { source } });
      }

      onSuccess?.();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Variant styles
  const containerStyles = {
    default: "bg-zinc-900 border border-zinc-800 rounded-2xl p-8",
    compact: "bg-zinc-900/50 border border-zinc-800 rounded-xl p-6",
    dark: "bg-zinc-950 border border-zinc-800 rounded-2xl p-8",
    gradient: "bg-gradient-to-br from-indigo-950/50 to-purple-950/50 border border-indigo-500/20 rounded-2xl p-8",
  };

  if (isSuccess) {
    return (
      <div className={containerStyles[variant]}>
        <div className="text-center py-4">
          <div className="w-16 h-16 mx-auto mb-4 bg-green-500/20 rounded-full flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Success!</h3>
          <p className="text-zinc-400">
            Check your inbox at <span className="text-white">{email}</span> for your accessibility report.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={containerStyles[variant]}>
      {/* Header */}
      <div className="mb-6">
        {variant === "gradient" && (
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 rounded-full text-indigo-400 text-sm mb-4">
            <Sparkles className="w-4 h-4" />
            Free Resource
          </div>
        )}
        <h3 className="text-xl font-bold text-white mb-2">{headline}</h3>
        <p className="text-zinc-400 text-sm">{subheadline}</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email field */}
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            required
            className="w-full pl-12 pr-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>

        {/* URL field (optional) */}
        {showUrl && (
          <div className="relative">
            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://your-website.com (optional)"
              className="w-full pl-12 pr-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
        )}

        {error && (
          <p className="text-red-400 text-sm flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-red-400 rounded-full" />
            {error}
          </p>
        )}

        {/* Submit button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 disabled:from-zinc-600 disabled:to-zinc-600 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              {buttonText}
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </form>

      {/* Trust indicator */}
      <div className="mt-4 flex items-center justify-center gap-2 text-zinc-500 text-xs">
        <Shield className="w-3.5 h-3.5" />
        <span>We respect your privacy. Unsubscribe anytime.</span>
      </div>
    </div>
  );
}
