"use client";

import { useState } from "react";
import { Globe, ArrowRight, Shield, CheckCircle, Lock } from "lucide-react";
import { useRouter } from "next/navigation";

export function ScannerForm() {
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<"url" | "email">("url");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    let scanUrl = url.trim();
    if (!scanUrl.startsWith("http")) {
      scanUrl = "https://" + scanUrl;
    }

    try {
      new URL(scanUrl);
      setUrl(scanUrl);
      setStep("email");
    } catch {
      setError("Please enter a valid URL");
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      // Capture lead
      await fetch("/api/leads/capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          url,
          source: "lp_eaa_compliance",
          leadMagnet: "eaa-compliance-scan",
        }),
      });

      // Track conversion
      if (typeof window !== "undefined") {
        const win = window as unknown as {
          plausible?: (event: string, options?: object) => void;
          gtag?: (...args: unknown[]) => void;
        };
        if (win.plausible) {
          win.plausible("LandingPageConversion", { props: { source: "eaa-compliance", url } });
        }
        if (win.gtag) {
          win.gtag("event", "conversion", {
            send_to: "AW-CONVERSION_ID/CONVERSION_LABEL",
            source: "eaa-compliance",
          });
        }
      }

      // Redirect to main scanner with URL pre-filled
      router.push(`/?scan=${encodeURIComponent(url)}`);
    } catch {
      setError("Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 md:p-8">
      <div className="text-center mb-6">
        <div className="w-14 h-14 mx-auto bg-indigo-500/10 rounded-xl flex items-center justify-center mb-4">
          <Shield className="w-7 h-7 text-indigo-500" />
        </div>
        <h2 className="text-xl font-bold text-white mb-2">
          Free EAA Compliance Check
        </h2>
        <p className="text-zinc-400 text-sm">
          {step === "url"
            ? "Enter your website URL to start the scan"
            : "Where should we send your compliance report?"
          }
        </p>
      </div>

      {step === "url" ? (
        <form onSubmit={handleUrlSubmit} className="space-y-4">
          <div className="relative">
            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="yourwebsite.com"
              className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition-colors"
              required
            />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full px-6 py-4 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25"
          >
            Check My Website
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>
      ) : (
        <form onSubmit={handleEmailSubmit} className="space-y-4">
          <div className="p-3 bg-zinc-800/50 rounded-lg mb-4">
            <div className="flex items-center gap-2 text-sm">
              <Globe className="w-4 h-4 text-zinc-400" />
              <span className="text-zinc-400">Scanning:</span>
              <span className="text-white font-medium truncate">{url}</span>
              <button
                type="button"
                onClick={() => setStep("url")}
                className="text-indigo-400 hover:text-indigo-300 text-xs ml-auto"
              >
                Change
              </button>
            </div>
          </div>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="w-full px-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition-colors"
            required
          />

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:from-zinc-700 disabled:to-zinc-700 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Starting Scan...
              </>
            ) : (
              <>
                Get Free Report
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>

          <p className="text-center text-zinc-500 text-xs">
            We&apos;ll email your detailed compliance report
          </p>
        </form>
      )}

      {/* Trust indicators */}
      <div className="mt-6 pt-6 border-t border-zinc-800">
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-zinc-500">
          <div className="flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5 text-green-500" />
            <span>No signup required</span>
          </div>
          <div className="flex items-center gap-1">
            <Lock className="w-3.5 h-3.5 text-green-500" />
            <span>Data stays private</span>
          </div>
          <div className="flex items-center gap-1">
            <Shield className="w-3.5 h-3.5 text-green-500" />
            <span>axe-core powered</span>
          </div>
        </div>
      </div>
    </div>
  );
}
