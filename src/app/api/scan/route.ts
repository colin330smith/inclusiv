import { NextResponse } from "next/server";
import { chromium } from "playwright";
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

export async function POST(request: Request) {
  let browser = null;

  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // Launch browser
    browser = await chromium.launch({
      headless: true,
    });

    const context = await browser.newContext({
      userAgent:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    });

    const page = await context.newPage();

    // Navigate to page
    await page.goto(url, {
      waitUntil: "networkidle",
      timeout: 30000,
    });

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

    return NextResponse.json({
      score,
      totalIssues,
      criticalIssues,
      platform,
      topIssues,
      scannedAt: new Date().toISOString(),
    });
  } catch (error) {
    if (browser) {
      await browser.close();
    }

    console.error("Scan error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to scan website. Please check the URL and try again.",
      },
      { status: 500 }
    );
  }
}
