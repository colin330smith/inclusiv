"use client";

import { usePathname } from "next/navigation";
import LeadCapturePopup from "./LeadCapturePopup";
import FloatingCTA from "./FloatingCTA";

interface LeadCaptureProviderProps {
  children: React.ReactNode;
}

// Pages where we don't want to show lead capture elements
const EXCLUDED_PAGES = [
  "/resources/eaa-checklist-download", // Already has its own capture
  "/unsubscribe",
  "/privacy",
  "/terms",
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
          {/* Popup appears after 30 seconds */}
          <LeadCapturePopup delay={30000} />

          {/* Floating CTA bar appears after 5 seconds and scroll */}
          <FloatingCTA showDelay={5000} scrollThreshold={300} />
        </>
      )}
    </>
  );
}
