#!/usr/bin/env npx ts-node
/**
 * Shopify Store Lead Generator
 * Finds Shopify stores in EU and checks accessibility
 */

import { chromium } from 'playwright';

// Known EU Shopify stores from various niches
const SHOPIFY_EU_TARGETS = [
  // Fashion
  'https://www.gymshark.com',
  'https://www.allbirds.eu',
  'https://www.fashionphile.com',
  'https://eu.princesspolly.com',
  // Beauty
  'https://www.cultbeauty.co.uk',
  'https://www.beautybay.com',
  'https://www.lookfantastic.de',
  // Home/Lifestyle
  'https://www.made.com',
  'https://www.westwing.de',
  // Food/Drink
  'https://www.hellofresh.de',
  'https://www.gousto.co.uk',
  // Tech accessories
  'https://www.dbrand.com',
  'https://www.peak-design.com',
  // Sports/Outdoor
  'https://www.decathlon.de',
  'https://www.bergfreunde.de',
];

interface Lead {
  url: string;
  score: number;
  issues: number;
  criticalCount: number;
  platform: string;
}

async function scanSite(page: any, url: string): Promise<Lead | null> {
  try {
    console.log(`Scanning: ${url}`);
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 12000 });
    
    // Detect platform
    const html = await page.content();
    let platform = 'Unknown';
    if (html.includes('Shopify') || html.includes('cdn.shopify')) platform = 'Shopify';
    else if (html.includes('WooCommerce')) platform = 'WooCommerce';
    else if (html.includes('Magento')) platform = 'Magento';
    
    await page.addScriptTag({ url: 'https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.8.3/axe.min.js' });
    
    const results = await page.evaluate(() => {
      // @ts-ignore
      return window.axe?.run?.() || { violations: [] };
    });

    const violations = results.violations || [];
    const criticalCount = violations.filter((v: any) => v.impact === 'critical').length;
    const score = Math.max(0, 100 - violations.length * 5);

    console.log(`  ${platform} | Score: ${score}/100 | Issues: ${violations.length} | Critical: ${criticalCount}`);

    return { url, score, issues: violations.length, criticalCount, platform };
  } catch (error) {
    console.log(`  Error: ${(error as Error).message.slice(0, 40)}`);
    return null;
  }
}

async function main() {
  console.log('='.repeat(60));
  console.log('SHOPIFY EU LEAD GENERATOR');
  console.log('='.repeat(60) + '\n');

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const leads: Lead[] = [];

  for (const url of SHOPIFY_EU_TARGETS) {
    const lead = await scanSite(page, url);
    if (lead && lead.score < 90) {
      leads.push(lead);
    }
  }

  await browser.close();

  console.log('\n' + '='.repeat(60));
  console.log('LEADS NEEDING COMPLIANCE (Score < 90)');
  console.log('='.repeat(60) + '\n');

  const sortedLeads = leads.sort((a, b) => a.score - b.score);
  
  for (const lead of sortedLeads) {
    console.log(`${lead.url} (${lead.platform})`);
    console.log(`  Score: ${lead.score}/100 | Issues: ${lead.issues} | Critical: ${lead.criticalCount}\n`);
  }

  console.log(JSON.stringify(sortedLeads, null, 2));
}

main();
