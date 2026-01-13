import { NextResponse } from "next/server";
import { chromium, Browser } from "playwright-core";
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
const RATE_LIMIT = 10;
const RATE_WINDOW = 60 * 1000;

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

// Helper to connect with timeout
async function connectWithTimeout(endpoint: string, timeoutMs: number): Promise<Browser> {
  return Promise.race([
    chromium.connectOverCDP(endpoint),
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Connection timeout")), timeoutMs)
    ),
  ]);
}

export async function POST(request: Request) {
  let browser: Browser | null = null;
  const startTime = Date.now();

  const forwardedFor = request.headers.get("x-forwarded-for");
  const clientIP = forwardedFor ? forwardedFor.split(",")[0].trim() : "unknown";

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

    let validatedUrl: URL;
    try {
      validatedUrl = new URL(url.startsWith("http") ? url : `https://${url}`);
    } catch {
      return NextResponse.json({ error: "Invalid URL format" }, { status: 400 });
    }

    // Connect to Browserless
    const apiKey = process.env.BROWSERLESS_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Scanner not configured. Please contact support.", code: "NOT_CONFIGURED" },
        { status: 503 }
      );
    }

    const browserlessEndpoint = `wss://production-sfo.browserless.io?token=${apiKey}`;

    try {
      browser = await connectWithTimeout(browserlessEndpoint, 15000);
    } catch (connectError) {
      console.error("Browserless connection failed:", connectError);
      return NextResponse.json(
        { error: "Scanner temporarily unavailable. Please try again.", code: "CONNECTION_FAILED" },
        { status: 503 }
      );
    }

    const context = await browser.newContext({
      userAgent:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      viewport: { width: 1280, height: 720 },
    });
    context.setDefaultTimeout(25000);

    const page = await context.newPage();

    try {
      await page.goto(validatedUrl.toString(), {
        waitUntil: "domcontentloaded",
        timeout: 20000,
      });
      await page.waitForTimeout(2000);
    } catch (navError) {
      console.error("Navigation error:", navError);
      await browser.close();
      return NextResponse.json(
        { error: "Could not load the website. Please check the URL.", code: "NAVIGATION_FAILED" },
        { status: 400 }
      );
    }

    const html = await page.content();
    const scripts = await page.evaluate(() => {
      const scriptTags = document.querySelectorAll("script[src]");
      return Array.from(scriptTags).map((s) => s.getAttribute("src") || "");
    });

    const platform = detectPlatform(html, scripts);

    const axeResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    const issueMap = new Map<string, { id: string; impact: string; description: string; count: number }>();

    for (const violation of axeResults.violations) {
      const existing = issueMap.get(violation.id);
      const count = violation.nodes.length;

      if (existing) {
        existing.count += count;
      } else {
        issueMap.set(violation.id, {
          id: violation.id,
          impact: violation.impact || "moderate",
          description: issueDescriptions[violation.id] || violation.help || violation.description,
          count,
        });
      }
    }

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

    const totalIssues = Array.from(issueMap.values()).reduce((sum, i) => sum + i.count, 0);
    const criticalIssues = Array.from(issueMap.values())
      .filter((i) => i.impact === "critical" || i.impact === "serious")
      .reduce((sum, i) => sum + i.count, 0);

    let score = 100;
    for (const issue of issueMap.values()) {
      const penalty =
        issue.impact === "critical" ? 5 : issue.impact === "serious" ? 3 : issue.impact === "moderate" ? 1 : 0.5;
      score -= Math.min(penalty * issue.count, 20);
    }
    score = Math.max(0, Math.round(score));

    await browser.close();

    return NextResponse.json({
      score,
      totalIssues,
      criticalIssues,
      platform,
      topIssues,
      scannedAt: new Date().toISOString(),
      _meta: { scanDuration: Date.now() - startTime },
    });
  } catch (error) {
    if (browser) {
      try {
        await browser.close();
      } catch {
        // Ignore
      }
    }

    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Scan error:", errorMessage);

    return NextResponse.json(
      { error: "Unable to complete scan. Please try again.", code: "SCAN_FAILED", debug: errorMessage },
      { status: 500 }
    );
  }
}
