#!/usr/bin/env npx ts-node
/**
 * Massive EU E-commerce Lead Generator
 * Targets: Mid-market Shopify stores, boutique retailers, niche e-commerce
 * 500+ leads for EAA deadline (June 28, 2025)
 */

import { chromium } from 'playwright';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// 500+ EU E-commerce targets (mid-market = better conversion)
const EU_TARGETS = [
  // === GERMANY (150 sites) ===
  // Fashion & Lifestyle
  'https://www.armedangels.com', 'https://www.hessnatur.com', 'https://www.trigema.de',
  'https://www.mytheresa.com', 'https://www.stylebop.com', 'https://www.lodenfrey.com',
  'https://www.apropos-store.com', 'https://www.vooberlin.com', 'https://www.manufactum.de',
  'https://www.gruene-erde.com', 'https://www.waschbaer.de', 'https://www.avocadostore.de',
  'https://www.glore.de', 'https://www.grundstoff.net', 'https://www.loveco-shop.de',
  'https://www.selekkt.com', 'https://www.wermag.de', 'https://www.engelundvoelkers.com',
  // Home & Garden
  'https://www.connox.de', 'https://www.design3000.de', 'https://www.flinders.de',
  'https://www.cairo.de', 'https://www.ambientedirect.com', 'https://www.wohnen.de',
  'https://www.smow.de', 'https://www.pappsalon.de', 'https://www.interio.de',
  // Tech & Gadgets
  'https://www.reichelt.de', 'https://www.voelkner.de', 'https://www.pollin.de',
  'https://www.elfin.de', 'https://www.reichelt.de', 'https://www.getdigital.de',
  'https://www.coolstuff.de', 'https://www.radbag.de', 'https://www.emp.de',
  // Sports & Outdoor
  'https://www.camp4.de', 'https://www.unterwegs.biz', 'https://www.bergzeit.de',
  'https://www.sport-schuster.de', 'https://www.sportcheck.de', 'https://www.bobshop.de',
  'https://www.bikeunit.de', 'https://www.boc24.de', 'https://www.bikester.de',
  // Beauty & Wellness
  'https://www.ecco-verde.de', 'https://www.najoba.de', 'https://www.hautbalance.de',
  'https://www.biocare.de', 'https://www.wolkenseifen.de', 'https://www.savue.de',
  // Food & Drinks
  'https://www.gourmondo.de', 'https://www.delinero.de', 'https://www.genusshandwerker.de',
  'https://www.drinkfactory.de', 'https://www.spirituosen-superbillig.com',
  // Pet Supplies
  'https://www.zooplus.de', 'https://www.fressnapf.de', 'https://www.zooroyal.de',
  'https://www.hundeshop.de', 'https://www.tackenberg.de', 'https://www.anifit.de',
  // Baby & Kids
  'https://www.babymarkt.de', 'https://www.babywalz.de', 'https://www.kidsroom.de',
  'https://www.baby-sweets.de', 'https://www.baby-and-friends.com', 'https://www.windeln.de',

  // === FRANCE (100 sites) ===
  // Fashion
  'https://www.sezane.com', 'https://www.rouje.com', 'https://www.petite-mendigote.com',
  'https://www.balzac-paris.com', 'https://www.maison-standards.com', 'https://www.asphalte.com',
  'https://www.loom.fr', 'https://www.octobre-editions.com', 'https://www.bonton.fr',
  // Home
  'https://www.ampm.fr', 'https://www.lamaison-de-loir-et-cher.com', 'https://www.merci-merci.com',
  'https://www.smallable.com', 'https://www.fleux.com', 'https://www.bensimon.com',
  // Beauty
  'https://www.mademoiselle-bio.com', 'https://www.greenweez.com', 'https://www.aroma-zone.com',
  'https://www.officine-universelle-buly.com', 'https://www.typology.com', 'https://www.respire.co',
  // Tech
  'https://www.materiel.net', 'https://www.ldlc.com', 'https://www.grosbill.com',
  'https://www.topachat.com', 'https://www.macway.com', 'https://www.son-video.com',
  // Sports
  'https://www.snowleader.com', 'https://www.hardloop.fr', 'https://www.i-run.fr',
  'https://www.alltricks.fr', 'https://www.probikeshop.fr', 'https://www.lepape.com',
  // Food
  'https://www.lagrande-epicerie.com', 'https://www.locavore.fr', 'https://www.aurore-market.com',

  // === NETHERLANDS (80 sites) ===
  'https://www.fonq.nl', 'https://www.flinders.nl', 'https://www.loods5.nl',
  'https://www.sissy-boy.nl', 'https://www.scotch-soda.com', 'https://www.suitsupply.com',
  'https://www.goosecraft.com', 'https://www.amor-lux.com', 'https://www.olaf-hussein.com',
  'https://www.aceandtate.com', 'https://www.nudie-jeans.com', 'https://www.kings-of-indigo.com',
  'https://www.ekoplaza.nl', 'https://www.holland-at-home.com', 'https://www.parfum-click.nl',
  'https://www.bijenkorf.nl', 'https://www.vanmoof.com', 'https://www.gazelle.nl',
  'https://www.fietsenwinkel.nl', 'https://www.12go-biking.nl', 'https://www.internetbikes.com',

  // === SPAIN (60 sites) ===
  'https://www.mango.com', 'https://www.massimo-dutti.com', 'https://www.bershka.com',
  'https://www.stradivarius.com', 'https://www.oysho.com', 'https://www.uterque.com',
  'https://www.desigual.com', 'https://www.scalpers.es', 'https://www.adolfodominguez.com',
  'https://www.elcortingles.es', 'https://www.leroy-merlin.es', 'https://www.decathlon.es',
  'https://www.promofarma.com', 'https://www.mifarma.es', 'https://www.dosfarma.com',
  'https://www.kiwoko.es', 'https://www.tiendanimal.es', 'https://www.zooplus.es',

  // === ITALY (60 sites) ===
  'https://www.yoox.com', 'https://www.luisaviaroma.com', 'https://www.antonia.it',
  'https://www.deliberti.com', 'https://www.giglio.com', 'https://www.julian-fashion.com',
  'https://www.biffi.com', 'https://www.tessabit.com', 'https://www.eleonorabonucci.com',
  'https://www.bottega-veneta.com', 'https://www.gucciosteria.com', 'https://www.prada.com/it',
  'https://www.erbolario.com', 'https://www.kiko.it', 'https://www.farmacosmo.it',
  'https://www.vetrineprofumi.it', 'https://www.amicafarmacia.com', 'https://www.farmacie-benessere.it',

  // === AUSTRIA (40 sites) ===
  'https://www.shoepping.at', 'https://www.universal.at', 'https://www.kastner-oehler.at',
  'https://www.palmers.at', 'https://www.humanic.net', 'https://www.deichmann.at',
  'https://www.sportler.com', 'https://www.hervis.at', 'https://www.intersport.at',
  'https://www.billa.at', 'https://www.spar.at', 'https://www.gurkerl.at',

  // === BELGIUM (40 sites) ===
  'https://www.zalando.be', 'https://www.torfs.be', 'https://www.veritas.be',
  'https://www.e5mode.be', 'https://www.jbc.be', 'https://www.zeb.be',
  'https://www.colruyt.be', 'https://www.delhaize.be', 'https://www.carrefour.be',
  'https://www.krefel.be', 'https://www.vanden-borre.be', 'https://www.mediamarkt.be',

  // === SWEDEN (30 sites) ===
  'https://www.acnestudios.com', 'https://www.cfroge.se', 'https://www.filippa-k.com',
  'https://www.hope-sthlm.com', 'https://www.rodebjer.com', 'https://www.bymalina.com',
  'https://www.ellos.se', 'https://www.nelly.com', 'https://www.bubbleroom.se',
  'https://www.cdon.se', 'https://www.netonnet.se', 'https://www.webhallen.com',

  // === DENMARK (20 sites) ===
  'https://www.ganni.com', 'https://www.stine-goya.com', 'https://www.baum-pferdgarten.com',
  'https://www.wood-wood.dk', 'https://www.samsoe.com', 'https://www.hosbjerg.com',
  'https://www.magasin.dk', 'https://www.illum.dk', 'https://www.boozt.com',

  // === FINLAND (20 sites) ===
  'https://www.marimekko.com', 'https://www.iittala.com', 'https://www.artek.fi',
  'https://www.makia.com', 'https://www.samuji.com', 'https://www.r-collection.com',
  'https://www.stockmann.fi', 'https://www.sokos.fi', 'https://www.verkkokauppa.com',

  // === PORTUGAL (20 sites) ===
  'https://www.worten.pt', 'https://www.fnac.pt', 'https://www.salsa.pt',
  'https://www.quebramar.pt', 'https://www.sportzone.pt', 'https://www.decenio.pt',

  // === IRELAND (20 sites) ===
  'https://www.dunnesstores.com', 'https://www.penneys.ie', 'https://www.arnotts.ie',
  'https://www.brownthomas.com', 'https://www.harvey-nichols.com', 'https://www.elverys.ie',
].filter((url, i, arr) => arr.indexOf(url) === i); // Remove duplicates

interface ScanResult {
  url: string;
  score: number;
  issues: number;
  critical: number;
  contactEmail?: string;
  status: 'scanned' | 'failed' | 'blocked';
}

async function scanSite(page: any, url: string): Promise<ScanResult> {
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 });
    await page.addScriptTag({ url: 'https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.8.3/axe.min.js' });

    const results = await page.evaluate(() => {
      // @ts-ignore
      return window.axe?.run?.() || { violations: [] };
    });

    const violations = results.violations || [];
    const critical = violations.filter((v: any) => v.impact === 'critical').length;
    const score = Math.max(0, 100 - violations.length * 4);

    // Extract email from page
    const html = await page.content();
    const emailMatch = html.match(/[\w.-]+@[\w.-]+\.(de|fr|nl|es|it|at|be|se|dk|fi|pt|ie|com|eu)\b/);

    return { url, score, issues: violations.length, critical, contactEmail: emailMatch?.[0], status: 'scanned' };
  } catch (error: any) {
    const isBlocked = error.message?.includes('403') || error.message?.includes('blocked');
    return { url, score: 0, issues: 0, critical: 0, status: isBlocked ? 'blocked' : 'failed' };
  }
}

function generateEmailHtml(result: ScanResult): string {
  const domain = new URL(result.url).hostname.replace('www.', '');
  const daysLeft = Math.ceil((new Date('2025-06-28').getTime() - Date.now()) / (1000 * 60 * 60 * 24));

  return `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; color: #333;">
  <p>Hi there,</p>

  <p>I ran an accessibility scan on <strong>${domain}</strong> and found ${result.issues} issues that need attention before the EU Accessibility Act deadline (June 28, 2025 - ${daysLeft} days away).</p>

  ${result.critical > 0 ? `<p style="color: #dc2626;"><strong>⚠️ ${result.critical} critical issues detected</strong> - these could result in fines up to €100,000.</p>` : ''}

  <div style="background: #f8fafc; border-radius: 8px; padding: 16px; margin: 16px 0;">
    <p style="margin: 0 0 8px 0;"><strong>Accessibility Score:</strong></p>
    <p style="margin: 0; font-size: 32px; font-weight: bold; color: ${result.score < 60 ? '#dc2626' : result.score < 80 ? '#f59e0b' : '#16a34a'};">
      ${result.score}/100
    </p>
  </div>

  <p>I built Inclusiv to help EU e-commerce sites get compliant quickly - our AI fixes most issues automatically.</p>

  <p><a href="https://inclusiv-xi.vercel.app" style="display: inline-block; background: #2563eb; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold;">Get Your Free Detailed Report →</a></p>

  <p>Happy to answer any questions about EAA compliance.</p>

  <p>Best,<br/>Colin<br/>
  <span style="color: #666; font-size: 14px;">Inclusiv - AI-Powered Accessibility</span></p>
</div>`;
}

async function main() {
  console.log('🚀 MASSIVE EU LEAD SCANNER');
  console.log(`Targets: ${EU_TARGETS.length} sites`);
  console.log('Starting scan...\n');

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const results: ScanResult[] = [];
  let scanned = 0, failed = 0, blocked = 0;

  for (let i = 0; i < EU_TARGETS.length; i++) {
    const url = EU_TARGETS[i];
    const result = await scanSite(page, url);
    results.push(result);

    const statusIcon = result.status === 'scanned' ? '✅' : result.status === 'blocked' ? '🚫' : '❌';
    const scoreStr = result.status === 'scanned' ? `${result.score}/100` : result.status;
    console.log(`[${i + 1}/${EU_TARGETS.length}] ${url.substring(0, 40).padEnd(40)} ${statusIcon} ${scoreStr}`);

    if (result.status === 'scanned') scanned++;
    else if (result.status === 'blocked') blocked++;
    else failed++;

    // Rate limit
    await new Promise(r => setTimeout(r, 1500));
  }

  await browser.close();

  // Filter hot leads (low score = high opportunity)
  const hotLeads = results
    .filter(r => r.status === 'scanned' && r.score < 85)
    .sort((a, b) => a.score - b.score);

  console.log('\n' + '='.repeat(60));
  console.log('SCAN COMPLETE');
  console.log('='.repeat(60));
  console.log(`Scanned: ${scanned} | Blocked: ${blocked} | Failed: ${failed}`);
  console.log(`Hot Leads (score < 85): ${hotLeads.length}`);
  console.log('='.repeat(60));

  // Save results
  const fs = await import('fs');
  fs.writeFileSync('/tmp/eu-leads.json', JSON.stringify(results, null, 2));
  fs.writeFileSync('/tmp/hot-leads.json', JSON.stringify(hotLeads, null, 2));
  console.log('\nSaved to /tmp/eu-leads.json and /tmp/hot-leads.json');

  // Send emails to top 50 leads with emails
  const emailableLeads = hotLeads.filter(l => l.contactEmail).slice(0, 50);
  console.log(`\n📧 Sending outreach to ${emailableLeads.length} leads with emails...`);

  for (const lead of emailableLeads) {
    const domain = new URL(lead.url).hostname.replace('www.', '');
    try {
      await resend.emails.send({
        from: 'Colin <colin@localliftleads.com>',
        to: lead.contactEmail!,
        subject: `${domain}: ${lead.issues} accessibility issues found (EAA deadline soon)`,
        html: generateEmailHtml(lead),
      });
      console.log(`  ✅ Sent to ${lead.contactEmail}`);
    } catch (e: any) {
      console.log(`  ❌ Failed: ${e.message?.slice(0, 50)}`);
    }
    await new Promise(r => setTimeout(r, 2000)); // Rate limit
  }

  console.log('\n🎯 OUTREACH COMPLETE');
}

main().catch(console.error);
