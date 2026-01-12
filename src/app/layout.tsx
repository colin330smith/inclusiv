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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
