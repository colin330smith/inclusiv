#!/usr/bin/env npx ts-node

/**
 * Mass Lead Generator - EU E-commerce Sites
 * Scans major EU e-commerce sites for accessibility issues
 */

import { chromium } from 'playwright';

const EU_ECOMMERCE_TARGETS = [
  // Germany
  'https://www.douglas.de',
  'https://www.dm.de',
  'https://www.tchibo.de',
  'https://www.lidl.de',
  'https://www.aldi-sued.de',
  'https://www.saturn.de',
  'https://www.notebooksbilliger.de',
  'https://www.cyberport.de',
  'https://www.alternate.de',
  'https://www.thomann.de',
  // France
  'https://www.fnac.com',
  'https://www.darty.com',
  'https://www.cdiscount.com',
  'https://www.boulanger.com',
  // Netherlands
  'https://www.bol.com',
  'https://www.coolblue.nl',
  'https://www.wehkamp.nl',
  // Spain
  'https://www.elcorteingles.es',
  'https://www.pccomponentes.com',
  // Italy
  'https://www.mediaworld.it',
  'https://www.unieuro.it',
];

interface Lead {
  url: string;
  email?: string;
  score: number;
  issues: number;
  criticalCount: number;
}

async function scanSite(page: any, url: string): Promise<Lead | null> {
  try {
    console.log(`Scanning: ${url}`);
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 10000 });
    
    await page.addScriptTag({ url: 'https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.8.3/axe.min.js' });
    
    const results = await page.evaluate(() => {
      // @ts-ignore
      return window.axe?.run?.() || { violations: [] };
    });

    const violations = results.violations || [];
    const criticalCount = violations.filter((v: any) => v.impact === 'critical').length;
    const score = Math.max(0, 100 - violations.length * 5);

    // Extract email
    const html = await page.content();
    const emailMatch = html.match(/[\w.-]+@[\w.-]+\.\w{2,}/);

    console.log(`  Score: ${score}/100 | Issues: ${violations.length} | Critical: ${criticalCount}`);

    return {
      url,
      email: emailMatch ? emailMatch[0] : undefined,
      score,
      issues: violations.length,
      criticalCount,
    };
  } catch (error) {
    console.log(`  Error: ${(error as Error).message.slice(0, 50)}`);
    return null;
  }
}

async function main() {
  console.log('='.repeat(60));
  console.log('INCLUSIV MASS LEAD GENERATOR');
  console.log('='.repeat(60) + '\n');

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const leads: Lead[] = [];

  for (const url of EU_ECOMMERCE_TARGETS) {
    const lead = await scanSite(page, url);
    if (lead && lead.score < 85) {
      leads.push(lead);
    }
  }

  await browser.close();

  console.log('\n' + '='.repeat(60));
  console.log('HIGH-VALUE LEADS (Score < 85)');
  console.log('='.repeat(60) + '\n');

  const sortedLeads = leads.sort((a, b) => a.score - b.score);
  
  for (const lead of sortedLeads) {
    console.log(`${lead.url}`);
    console.log(`  Score: ${lead.score}/100 | Issues: ${lead.issues} | Critical: ${lead.criticalCount}`);
    if (lead.email) console.log(`  Email: ${lead.email}`);
    console.log('');
  }

  // Output as JSON for processing
  console.log('\n--- JSON OUTPUT ---');
  console.log(JSON.stringify(sortedLeads, null, 2));
}

main();
