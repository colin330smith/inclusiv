import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Inclusiv | Free Web Accessibility Scanner",
  description: "Scan your website for accessibility issues before the EAA deadline. Get instant compliance score and actionable fixes.",
  keywords: ["accessibility", "WCAG", "ADA", "EAA", "compliance", "web accessibility", "scanner"],
  openGraph: {
    title: "Inclusiv | Free Web Accessibility Scanner",
    description: "Scan your website for accessibility issues. EAA deadline June 2025.",
    type: "website",
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
        {/* Plausible Analytics - Privacy-friendly, no cookies */}
        <script defer data-domain="inclusiv-xi.vercel.app" src="https://plausible.io/js/script.js"></script>
        {/* Custom event tracking */}
        <script dangerouslySetInnerHTML={{
          __html: `
            window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) };
            // Track scans
            window.trackScan = (url, score) => plausible('Scan', {props: {url, score}});
            // Track signups
            window.trackSignup = (email) => plausible('Signup', {props: {email}});
          `
        }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
