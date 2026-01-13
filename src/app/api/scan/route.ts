import { NextResponse } from "next/server";
import { chromium } from "playwright-core";
import AxeBuilder from "@axe-core/playwright";

// Platform detection patterns
const platformPatterns = {
  WordPress: [
    /wp-content/i,
    /wp-includes/i,
    /wordpress/i,
    /<meta name="generator" content="WordPress/i,
  ],
  Shopify: [
    /cdn\.shopify\.com/i,
    /myshopify\.com/i,
    /<meta name="shopify/i,
  ],
  Squarespace: [
    /squarespace\.com/i,
    /static\.squarespace\.com/i,
    /<meta.*squarespace/i,
  ],
  Wix: [/wix\.com/i, /wixstatic\.com/i, /wix-code/i],
  Webflow: [/webflow\.com/i, /assets\.website-files\.com/i],
  React: [/__NEXT_DATA__|_next\/|react-dom|__REACT/i],
  Vue: [/__VUE__|vue\.js|vue\.min\.js/i],
  Angular: [/ng-version|angular\.js|angular\.min\.js/i],
};

function detectPlatform(html: string, scripts: string[]): string {
  const content = html + " " + scripts.join(" ");

  for (const [platform, patterns] of Object.entries(platformPatterns)) {
    for (const pattern of patterns) {
      if (pattern.test(content)) {
        return platform;
      }
    }
  }

  return "Custom / Static HTML";
}

// Issue descriptions map
const issueDescriptions: Record<string, string> = {
  "color-contrast": "Text does not have sufficient color contrast",
  "image-alt": "Images are missing alternative text",
  "link-name": "Links do not have discernible text",
  "button-name": "Buttons do not have accessible names",
  "label": "Form elements do not have associated labels",
  "html-has-lang": "HTML element does not have a lang attribute",
  "document-title": "Document does not have a title element",
  "meta-viewport": "Meta viewport prevents zooming",
  "heading-order": "Heading levels are not in sequential order",
  "list": "List markup is not used correctly",
  "listitem": "List items are not contained in a list",
  "region": "Content is not contained in a landmark region",
  "aria-hidden-focus": "ARIA hidden element is focusable",
  "aria-valid-attr": "ARIA attribute is not valid",
  "aria-valid-attr-value": "ARIA attribute has an invalid value",
  "duplicate-id": "IDs used in ARIA are not unique",
  "frame-title": "Frames do not have a title",
  "landmark-one-main": "Page does not have a main landmark",
  "bypass": "Page does not have a skip link",
  "tabindex": "Elements have a tabindex greater than 0",
};

// Simple in-memory rate limiting (per IP)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 10; // 10 scans per minute per IP
const RATE_WINDOW = 60 * 1000; // 1 minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT) {
    return false;
  }

  record.count++;
  return true;
}

// Concurrent scan limiting
let activeScanCount = 0;
const MAX_CONCURRENT_SCANS = 50; // Browserless handles the actual browser scaling
const scanQueue: Array<() => void> = [];

async function acquireScanSlot(): Promise<void> {
  if (activeScanCount < MAX_CONCURRENT_SCANS) {
    activeScanCount++;
    return;
  }

  // Wait in queue
  return new Promise((resolve) => {
    scanQueue.push(() => {
      activeScanCount++;
      resolve();
    });
  });
}

function releaseScanSlot() {
  activeScanCount--;
  const next = scanQueue.shift();
  if (next) next();
}

export async function POST(request: Request) {
  let browser = null;
  const startTime = Date.now();

  // Get client IP for rate limiting
  const forwardedFor = request.headers.get("x-forwarded-for");
  const clientIP = forwardedFor ? forwardedFor.split(",")[0].trim() : "unknown";

  // Check rate limit
  if (!checkRateLimit(clientIP)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a minute before scanning again." },
      { status: 429 }
    );
  }

  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // Validate URL format
    let validatedUrl: URL;
    try {
      validatedUrl = new URL(url.startsWith("http") ? url : `https://${url}`);
    } catch {
      return NextResponse.json({ error: "Invalid URL format" }, { status: 400 });
    }

    // Wait for scan slot (queue if at capacity)
    const queueStartTime = Date.now();
    await acquireScanSlot();
    const queueWaitTime = Date.now() - queueStartTime;

    try {
      // Connect to Browserless.io or fall back to local browser for development
      const browserlessEndpoint = process.env.BROWSERLESS_API_KEY
        ? `wss://production-sfo.browserless.io?token=${process.env.BROWSERLESS_API_KEY}`
        : null;

      if (browserlessEndpoint) {
        // Production: Use Browserless.io
        browser = await chromium.connectOverCDP(browserlessEndpoint);
      } else {
        // Development fallback: Try local browser
        try {
          browser = await chromium.launch({ headless: true });
        } catch (launchError) {
          console.error("Local browser launch failed:", launchError);
          return NextResponse.json(
            {
              error: "Scanner temporarily unavailable. Please try again in a few minutes.",
              code: "BROWSER_UNAVAILABLE"
            },
            { status: 503 }
          );
        }
      }

      const context = await browser.newContext({
        userAgent:
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        viewport: { width: 1280, height: 720 },
      });

      // Set timeout for all operations
      context.setDefaultTimeout(25000);

      const page = await context.newPage();

      // Navigate to page with error handling
      try {
        await page.goto(validatedUrl.toString(), {
          waitUntil: "domcontentloaded",
          timeout: 20000,
        });

        // Wait a bit for dynamic content
        await page.waitForTimeout(2000);
      } catch (navError) {
        console.error("Navigation error:", navError);
        return NextResponse.json(
          {
            error: "Could not load the website. Please check the URL is correct and the site is accessible.",
            code: "NAVIGATION_FAILED"
          },
          { status: 400 }
        );
      }

      // Get page content for platform detection
      const html = await page.content();
      const scripts = await page.evaluate(() => {
        const scriptTags = document.querySelectorAll("script[src]");
        return Array.from(scriptTags).map((s) => s.getAttribute("src") || "");
      });

      const platform = detectPlatform(html, scripts);

      // Run axe-core scan
      const axeResults = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();

      // Process violations
      const issueMap = new Map<
        string,
        {
          id: string;
          impact: string;
          description: string;
          count: number;
        }
      >();

      for (const violation of axeResults.violations) {
        const existing = issueMap.get(violation.id);
        const count = violation.nodes.length;

        if (existing) {
          existing.count += count;
        } else {
          issueMap.set(violation.id, {
            id: violation.id,
            impact: violation.impact || "moderate",
            description:
              issueDescriptions[violation.id] ||
              violation.help ||
              violation.description,
            count,
          });
        }
      }

      // Sort by impact and count
      const impactOrder = { critical: 0, serious: 1, moderate: 2, minor: 3 };
      const topIssues = Array.from(issueMap.values())
        .sort((a, b) => {
          const impactDiff =
            (impactOrder[a.impact as keyof typeof impactOrder] || 3) -
            (impactOrder[b.impact as keyof typeof impactOrder] || 3);
          if (impactDiff !== 0) return impactDiff;
          return b.count - a.count;
        })
        .slice(0, 10);

      // Calculate score
      const totalIssues = Array.from(issueMap.values()).reduce(
        (sum, i) => sum + i.count,
        0
      );
      const criticalIssues = Array.from(issueMap.values())
        .filter((i) => i.impact === "critical" || i.impact === "serious")
        .reduce((sum, i) => sum + i.count, 0);

      // Score calculation: Start at 100, deduct based on issues
      let score = 100;
      for (const issue of issueMap.values()) {
        const penalty =
          issue.impact === "critical"
            ? 5
            : issue.impact === "serious"
              ? 3
              : issue.impact === "moderate"
                ? 1
                : 0.5;
        score -= Math.min(penalty * issue.count, 20); // Cap per-issue penalty
      }
      score = Math.max(0, Math.round(score));

      await browser.close();

      const totalTime = Date.now() - startTime;

      return NextResponse.json({
        score,
        totalIssues,
        criticalIssues,
        platform,
        topIssues,
        scannedAt: new Date().toISOString(),
        // Include performance metrics for monitoring
        _meta: {
          scanDuration: totalTime,
          queueWaitTime,
          activeScanners: activeScanCount,
        },
      });
    } finally {
      releaseScanSlot();
    }
  } catch (error) {
    if (browser) {
      try {
        await browser.close();
      } catch {
        // Ignore close errors
      }
    }

    console.error("Scan error:", error);

    // Return user-friendly error without exposing internal details
    return NextResponse.json(
      {
        error: "Unable to complete scan. Please try again or contact support if the issue persists.",
        code: "SCAN_FAILED",
      },
      { status: 500 }
    );
  }
}
