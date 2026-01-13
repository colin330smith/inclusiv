#!/usr/bin/env npx ts-node
/**
 * Personalized Cold Outreach System
 * Human-first approach - no spam, real value, genuine help
 */

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_123'); // Will use env var

interface Lead {
  url: string;
  score: number;
  issues: number;
  criticalCount: number;
  platform: string;
  companyName: string;
  contactEmail: string;
  country: string;
}

// Scanned leads with contact research
const HOT_LEADS: Lead[] = [
  {
    url: 'https://www.bergfreunde.de',
    score: 40,
    issues: 12,
    criticalCount: 3,
    platform: 'Custom',
    companyName: 'Bergfreunde',
    contactEmail: 'info@bergfreunde.de',
    country: 'Germany'
  },
  {
    url: 'https://www.pearl.de',
    score: 55,
    issues: 9,
    criticalCount: 2,
    platform: 'Custom',
    companyName: 'Pearl',
    contactEmail: 'info@pearl.de',
    country: 'Germany'
  },
  {
    url: 'https://www.otto.de',
    score: 65,
    issues: 7,
    criticalCount: 1,
    platform: 'Custom',
    companyName: 'Otto',
    contactEmail: 'service@otto.de',
    country: 'Germany'
  },
  {
    url: 'https://www.tchibo.de',
    score: 65,
    issues: 7,
    criticalCount: 1,
    platform: 'Custom',
    companyName: 'Tchibo',
    contactEmail: 'info@tchibo.de',
    country: 'Germany'
  },
  {
    url: 'https://www.wehkamp.nl',
    score: 75,
    issues: 5,
    criticalCount: 1,
    platform: 'Custom',
    companyName: 'Wehkamp',
    contactEmail: 'info@wehkamp.nl',
    country: 'Netherlands'
  },
  {
    url: 'https://www.aboutyou.de',
    score: 80,
    issues: 4,
    criticalCount: 0,
    platform: 'Custom',
    companyName: 'About You',
    contactEmail: 'info@aboutyou.de',
    country: 'Germany'
  },
  {
    url: 'https://www.mediamarkt.de',
    score: 80,
    issues: 4,
    criticalCount: 2,
    platform: 'Custom',
    companyName: 'MediaMarkt',
    contactEmail: 'info@mediamarkt.de',
    country: 'Germany'
  },
  {
    url: 'https://www.saturn.de',
    score: 80,
    issues: 4,
    criticalCount: 2,
    platform: 'Custom',
    companyName: 'Saturn',
    contactEmail: 'info@saturn.de',
    country: 'Germany'
  },
  {
    url: 'https://www.fnac.com',
    score: 80,
    issues: 4,
    criticalCount: 0,
    platform: 'Custom',
    companyName: 'Fnac',
    contactEmail: 'contact@fnac.com',
    country: 'France'
  },
  {
    url: 'https://www.darty.com',
    score: 80,
    issues: 4,
    criticalCount: 0,
    platform: 'Custom',
    companyName: 'Darty',
    contactEmail: 'contact@darty.com',
    country: 'France'
  },
  {
    url: 'https://www.cdiscount.com',
    score: 80,
    issues: 4,
    criticalCount: 1,
    platform: 'Custom',
    companyName: 'Cdiscount',
    contactEmail: 'contact@cdiscount.com',
    country: 'France'
  },
  {
    url: 'https://www.printemps.com',
    score: 80,
    issues: 4,
    criticalCount: 1,
    platform: 'Custom',
    companyName: 'Printemps',
    contactEmail: 'contact@printemps.com',
    country: 'France'
  },
  {
    url: 'https://www.bol.com',
    score: 80,
    issues: 4,
    criticalCount: 0,
    platform: 'Custom',
    companyName: 'Bol.com',
    contactEmail: 'info@bol.com',
    country: 'Netherlands'
  }
];

function generatePersonalizedEmail(lead: Lead): { subject: string; html: string } {
  const urgency = lead.score < 60 ? 'urgent' : lead.score < 80 ? 'significant' : 'moderate';
  const daysUntilEAA = Math.ceil((new Date('2025-06-28').getTime() - Date.now()) / (1000 * 60 * 60 * 24));

  const subject = lead.criticalCount > 0
    ? `${lead.companyName}: ${lead.criticalCount} critical accessibility issues before EAA deadline`
    : `Quick accessibility check for ${lead.companyName} - ${daysUntilEAA} days until EAA`;

  const html = `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; color: #333;">
  <p>Hi there,</p>

  <p>I ran a quick accessibility scan on ${lead.url} and found ${lead.issues} issues that could affect your compliance with the European Accessibility Act (EAA), which goes into effect on <strong>June 28, 2025</strong>.</p>

  ${lead.criticalCount > 0 ? `<p style="color: #dc2626;"><strong>⚠️ ${lead.criticalCount} of these are critical issues</strong> that could result in fines up to €100,000.</p>` : ''}

  <div style="background: #f8fafc; border-radius: 8px; padding: 16px; margin: 16px 0;">
    <p style="margin: 0 0 8px 0;"><strong>Your Quick Score:</strong></p>
    <p style="margin: 0; font-size: 24px; color: ${lead.score < 60 ? '#dc2626' : lead.score < 80 ? '#f59e0b' : '#16a34a'};">
      ${lead.score}/100
    </p>
    <p style="margin: 8px 0 0 0; font-size: 14px; color: #666;">
      ${lead.score < 60 ? 'Needs immediate attention' : lead.score < 80 ? 'Room for improvement' : 'Good, but some gaps'}
    </p>
  </div>

  <p>I built Inclusiv specifically to help EU e-commerce sites get compliant fast - we can fix most issues automatically and get you to WCAG 2.1 AA compliance in days, not months.</p>

  <p><strong>Want me to send you the detailed report?</strong> I'll show you exactly what needs to be fixed, prioritized by impact.</p>

  <p>No pressure - just thought you should know about this before the deadline hits.</p>

  <p>Best,<br/>
  Colin<br/>
  <span style="color: #666; font-size: 14px;">Inclusiv - AI-Powered Accessibility Compliance</span><br/>
  <a href="https://inclusiv-xi.vercel.app" style="color: #2563eb; font-size: 14px;">inclusiv-xi.vercel.app</a></p>
</div>
`;

  return { subject, html };
}

async function sendOutreach() {
  console.log('🚀 PERSONALIZED OUTREACH STARTING');
  console.log(`Leads to contact: ${HOT_LEADS.length}`);
  console.log('Strategy: Human-first, value-driven, no spam\n');

  let sent = 0;
  let failed = 0;

  for (const lead of HOT_LEADS) {
    const { subject, html } = generatePersonalizedEmail(lead);

    console.log(`📧 ${lead.companyName} (${lead.country})`);
    console.log(`   Score: ${lead.score}/100 | Critical: ${lead.criticalCount}`);
    console.log(`   To: ${lead.contactEmail}`);
    console.log(`   Subject: ${subject}`);

    try {
      const result = await resend.emails.send({
        from: 'Colin <colin@localliftleads.com>',
        to: lead.contactEmail,
        subject,
        html,
      });

      if (result.error) {
        console.log(`   ❌ Failed: ${result.error.message}\n`);
        failed++;
      } else {
        console.log(`   ✅ Sent! ID: ${result.data?.id}\n`);
        sent++;
      }
    } catch (error) {
      console.log(`   ❌ Error: ${(error as Error).message}\n`);
      failed++;
    }

    // Rate limiting - be respectful
    await new Promise(r => setTimeout(r, 2000));
  }

  console.log('\n' + '='.repeat(50));
  console.log('OUTREACH COMPLETE');
  console.log('='.repeat(50));
  console.log(`Sent: ${sent}`);
  console.log(`Failed: ${failed}`);
  console.log(`Success rate: ${Math.round(sent / HOT_LEADS.length * 100)}%`);
}

sendOutreach().catch(console.error);
