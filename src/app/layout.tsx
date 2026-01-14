import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import LeadCaptureProvider from "@/components/LeadCaptureProvider";
import SessionProvider from "@/components/providers/SessionProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Google Analytics Measurement ID - Replace with your actual ID
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || "G-XXXXXXX";

export const metadata: Metadata = {
  metadataBase: new URL('https://tryinclusiv.com'),
  title: {
    default: "Inclusiv | Free EAA & WCAG Accessibility Scanner",
    template: "%s | Inclusiv"
  },
  description: "Free accessibility scanner for EAA compliance. Check your website in 30 seconds. The EAA deadline passed June 2025 - non-compliant sites now face €100,000 fines.",
  keywords: ["EAA compliance", "WCAG 2.1 AA", "accessibility scanner", "European Accessibility Act", "ADA compliance", "website accessibility checker", "accessibility audit", "free accessibility tool", "EAA fines", "web accessibility law"],
  authors: [{ name: "Inclusiv" }],
  creator: "Inclusiv",
  publisher: "Inclusiv",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "Free EAA Accessibility Scanner - Check Compliance in 30 Seconds",
    description: "Is your website EAA compliant? Free instant scan. Non-compliant sites now face €100,000 fines.",
    type: "website",
    siteName: "Inclusiv",
    locale: "en_US",
    url: "https://tryinclusiv.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free EAA Accessibility Scanner",
    description: "Check your website's EAA compliance in 30 seconds. Free scan, no signup required.",
    creator: "@inclusivapp",
  },
  alternates: {
    canonical: "https://tryinclusiv.com",
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics 4 */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_title: document.title,
              page_location: window.location.href,
              send_page_view: true,
              cookie_flags: 'SameSite=None;Secure',
              // Enhanced measurement
              enhanced_conversions: true,
              // Custom dimensions
              custom_map: {
                'dimension1': 'user_type',
                'dimension2': 'scan_score',
                'dimension3': 'platform_detected'
              }
            });

            // Track page visibility
            document.addEventListener('visibilitychange', function() {
              if (document.visibilityState === 'hidden') {
                gtag('event', 'page_hidden', {
                  page_title: document.title,
                  time_on_page: Math.round(performance.now() / 1000)
                });
              }
            });
          `}
        </Script>

        {/* Plausible Analytics - Privacy-friendly, no cookies */}
        <script defer data-domain="inclusiv.app" src="https://plausible.io/js/script.js"></script>

        {/* Custom event tracking utilities */}
        <Script id="custom-analytics" strategy="afterInteractive">
          {`
            // Plausible helper
            window.plausible = window.plausible || function() {
              (window.plausible.q = window.plausible.q || []).push(arguments)
            };

            // Track scans (legacy support)
            window.trackScan = function(url, score) {
              plausible('Scan', {props: {url: url, score: score}});
              if (window.gtag) {
                gtag('event', 'scan_completed', {
                  url: url,
                  score: score,
                  event_category: 'engagement',
                  event_label: url
                });
              }
            };

            // Track signups (legacy support)
            window.trackSignup = function(email) {
              plausible('Signup', {props: {email: email}});
              if (window.gtag) {
                gtag('event', 'email_captured', {
                  event_category: 'conversion',
                  event_label: 'email_signup'
                });
              }
            };

            // Conversion tracking helper
            window.trackConversion = function(eventName, properties) {
              plausible(eventName, {props: properties || {}});
              if (window.gtag) {
                gtag('event', eventName, properties || {});
              }
            };
          `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          <LeadCaptureProvider>
            {children}
          </LeadCaptureProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
