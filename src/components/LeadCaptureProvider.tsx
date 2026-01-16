"use client";

import { usePathname } from "next/navigation";
import LeadCapturePopup from "./LeadCapturePopup";
import FloatingCTA from "./FloatingCTA";
import ExitIntentPopup from "./ExitIntentPopup";
import SocialProofToast from "./SocialProofToast";
import LiveChatWidget from "./LiveChatWidget";

interface LeadCaptureProviderProps {
  children: React.ReactNode;
}

// Pages where we don't want to show lead capture elements
const EXCLUDED_PAGES = [
  "/resources/eaa-checklist-download", // Already has its own capture
  "/unsubscribe",
  "/privacy",
  "/terms",
  "/success", // Don't show on checkout success
];

export default function LeadCaptureProvider({ children }: LeadCaptureProviderProps) {
  const pathname = usePathname();

  // Check if current page is excluded
  const isExcludedPage = EXCLUDED_PAGES.some(page => pathname?.startsWith(page));

  return (
    <>
      {children}

      {/* Lead Capture Components - only show on non-excluded pages */}
      {!isExcludedPage && (
        <>
          {/* Timed popup appears after 30 seconds */}
          <LeadCapturePopup delay={30000} />

          {/* Exit intent popup when user tries to leave */}
          <ExitIntentPopup />

          {/* Floating CTA bar appears after 5 seconds and scroll */}
          <FloatingCTA showDelay={5000} scrollThreshold={300} />

          {/* Social proof notifications */}
          <SocialProofToast minDelay={20000} maxDelay={60000} duration={6000} />

          {/* Live chat widget for sales */}
          <LiveChatWidget />
        </>
      )}
    </>
  );
}
