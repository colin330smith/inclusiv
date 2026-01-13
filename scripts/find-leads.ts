#!/usr/bin/env npx ts-node

/**
 * Lead Generator for Inclusiv
 * Finds EU e-commerce sites and checks their accessibility scores
 * Usage: npx ts-node scripts/find-leads.ts
 */

import { chromium } from 'playwright';

const EU_ECOMMERCE_DIRECTORIES = [
  'https://www.shopify.com/explore/eu',
  'https://www.woocommerce.com/showcase/',
];

const SEARCH_QUERIES = [
  'site:myshopify.com Germany',
  'site:myshopify.com France',
  'site:myshopify.com Netherlands',
  'powered by shopify EU',
  'online shop Germany contact',
];

interface Lead {
  url: string;
  email?: string;
  score?: number;
  issues?: number;
}

async function findLeads(): Promise<Lead[]> {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const leads: Lead[] = [];

  // Example: Search for Shopify stores in EU
  console.log('Searching for EU e-commerce leads...\n');

  // For now, let's use a manual list of known EU e-commerce sites
  // In production, this would scrape directories
  const targetSites = [
    'https://www.zalando.de',
    'https://www.aboutyou.de',
    'https://www.otto.de',
    'https://www.bonprix.de',
    'https://www.mediamarkt.de',
  ];

  for (const url of targetSites) {
    try {
      console.log(`Scanning: ${url}`);

      // Quick accessibility check using axe-core
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 });

      // Inject axe-core
      await page.addScriptTag({ url: 'https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.8.3/axe.min.js' });

      const results = await page.evaluate(() => {
        // @ts-ignore
        return window.axe?.run?.() || { violations: [] };
      });

      const violations = results.violations || [];
      const criticalCount = violations.filter((v: { impact: string }) => v.impact === 'critical').length;

      // Try to find contact email
      const emailMatch = await page.content().then(html => {
        const match = html.match(/[\w.-]+@[\w.-]+\.\w{2,}/);
        return match ? match[0] : undefined;
      });

      leads.push({
        url,
        email: emailMatch,
        score: Math.max(0, 100 - violations.length * 5),
        issues: violations.length,
      });

      console.log(`  Score: ${100 - violations.length * 5}/100`);
      console.log(`  Issues: ${violations.length} (${criticalCount} critical)`);
      if (emailMatch) console.log(`  Email: ${emailMatch}`);
      console.log('');

    } catch (error) {
      console.log(`  Error scanning ${url}: ${(error as Error).message}\n`);
    }
  }

  await browser.close();
  return leads;
}

// Generate cold email for lead
function generateEmail(lead: Lead): string {
  return `
Subject: Your website may face EAA fines (free check)

Hi,

I ran a quick accessibility scan on ${lead.url} and found ${lead.issues} issues that could be problematic after June 28, 2025 - the European Accessibility Act deadline.

Non-compliant websites face fines up to €100,000.

Current score: ${lead.score}/100

Would you like a full report with exact code fixes? No charge.

Best,
Inclusiv Team
https://inclusiv.dev
  `.trim();
}

// Main
(async () => {
  console.log('='.repeat(50));
  console.log('INCLUSIV LEAD GENERATOR');
  console.log('='.repeat(50));
  console.log('');

  const leads = await findLeads();

  console.log('\n' + '='.repeat(50));
  console.log('GENERATED EMAILS');
  console.log('='.repeat(50));

  for (const lead of leads) {
    if (lead.score && lead.score < 80) {
      console.log('\n--- Email for ' + lead.url + ' ---');
      console.log(generateEmail(lead));
    }
  }
})();
