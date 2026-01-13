#!/usr/bin/env npx ts-node
/**
 * MASS LEAD SCANNER - 500+ EU E-COMMERCE SITES
 * Comprehensive coverage across all major EU markets
 */

import { chromium, type Browser, type Page } from 'playwright';

// Massive EU e-commerce target database
const EU_TARGETS = [
  // GERMANY - Largest EU e-commerce market
  // Fashion & Apparel
  'https://www.zalando.de', 'https://www.aboutyou.de', 'https://www.bonprix.de',
  'https://www.hm.com/de', 'https://www.esprit.de', 'https://www.s-oliver.com',
  'https://www.breuninger.com', 'https://www.peek-cloppenburg.de', 'https://www.engelhorn.de',
  'https://www.orsay.com', 'https://www.tom-tailor.de', 'https://www.marc-opolo.com',
  // Electronics
  'https://www.mediamarkt.de', 'https://www.saturn.de', 'https://www.cyberport.de',
  'https://www.notebooksbilliger.de', 'https://www.conrad.de', 'https://www.pearl.de',
  'https://www.alternate.de', 'https://www.mindfactory.de', 'https://www.computeruniverse.net',
  // General Retail
  'https://www.otto.de', 'https://www.amazon.de', 'https://www.ebay.de',
  'https://www.kaufland.de', 'https://www.real.de', 'https://www.lidl.de',
  'https://www.aldi.de', 'https://www.tchibo.de', 'https://www.qvc.de',
  // Health & Beauty
  'https://www.douglas.de', 'https://www.dm.de', 'https://www.rossmann.de',
  'https://www.parfumdreams.de', 'https://www.flaconi.de', 'https://www.shop-apotheke.com',
  'https://www.docmorris.de', 'https://www.aponeo.de', 'https://www.medpex.de',
  // Sports & Outdoor
  'https://www.decathlon.de', 'https://www.bergfreunde.de', 'https://www.intersport.de',
  'https://www.sportscheck.com', 'https://www.bike24.de', 'https://www.fahrrad.de',
  // Home & Living
  'https://www.ikea.de', 'https://www.home24.de', 'https://www.wayfair.de',
  'https://www.westwing.de', 'https://www.lampenwelt.de', 'https://www.porta.de',
  // Food & Beverages
  'https://www.rewe.de', 'https://www.edeka24.de', 'https://www.gourmondo.de',
  'https://www.myTime.de', 'https://www.bringmeister.de', 'https://www.picnic.de',
  // Books & Media
  'https://www.thalia.de', 'https://www.buecher.de', 'https://www.weltbild.de',
  'https://www.hugendubel.de', 'https://www.medimops.de', 'https://www.rebuy.de',
  // DIY & Garden
  'https://www.obi.de', 'https://www.hornbach.de', 'https://www.bauhaus.info',
  'https://www.toom.de', 'https://www.hagebau.de', 'https://www.globus-baumarkt.de',
  // Music & Instruments
  'https://www.thomann.de', 'https://www.musicstore.de', 'https://www.session.de',
  // Pet Supplies
  'https://www.zooplus.de', 'https://www.fressnapf.de', 'https://www.zooroyal.de',
  // Baby & Kids
  'https://www.baby-walz.de', 'https://www.babymarkt.de', 'https://www.mytoys.de',

  // FRANCE - Second largest EU market
  // Department Stores
  'https://www.fnac.com', 'https://www.darty.com', 'https://www.cdiscount.com',
  'https://www.laredoute.fr', 'https://www.galerieslafayette.com', 'https://www.printemps.com',
  'https://www.boulanger.com', 'https://www.conforama.fr', 'https://www.but.fr',
  // Fashion
  'https://www.zalando.fr', 'https://www.showroomprive.com', 'https://www.veepee.fr',
  'https://www.asos.fr', 'https://www.sarenza.com', 'https://www.spartoo.com',
  'https://www.kiabi.com', 'https://www.camaieu.fr', 'https://www.promod.fr',
  // Electronics
  'https://www.ldlc.com', 'https://www.grosbill.com', 'https://www.materiel.net',
  'https://www.rueducommerce.fr', 'https://www.topachat.com', 'https://www.cybertek.fr',
  // Food & Grocery
  'https://www.carrefour.fr', 'https://www.auchan.fr', 'https://www.leclercdrive.fr',
  'https://www.monoprix.fr', 'https://www.houra.fr', 'https://www.coursesu.com',
  // Beauty
  'https://www.sephora.fr', 'https://www.nocibe.fr', 'https://www.marionnaud.fr',
  'https://www.yves-rocher.fr', 'https://www.easypara.fr', 'https://www.1001pharmacies.com',
  // Sports
  'https://www.decathlon.fr', 'https://www.go-sport.com', 'https://www.intersport.fr',
  'https://www.alltricks.fr', 'https://www.i-run.fr', 'https://www.tradeinn.com',
  // Home
  'https://www.ikea.com/fr', 'https://www.maisonsdumonde.com', 'https://www.leroymerlin.fr',
  'https://www.castorama.fr', 'https://www.bricorama.fr', 'https://www.manomano.fr',

  // NETHERLANDS
  'https://www.bol.com', 'https://www.coolblue.nl', 'https://www.wehkamp.nl',
  'https://www.mediamarkt.nl', 'https://www.amazon.nl', 'https://www.zalando.nl',
  'https://www.fonq.nl', 'https://www.debijenkorf.nl', 'https://www.hema.nl',
  'https://www.blokker.nl', 'https://www.ah.nl', 'https://www.jumbo.com',
  'https://www.beslist.nl', 'https://www.otto.nl', 'https://www.vidaxl.nl',
  'https://www.alternate.nl', 'https://www.megekko.nl', 'https://www.paradigit.nl',
  'https://www.ici-paris-xl.nl', 'https://www.douglas.nl', 'https://www.kruidvat.nl',

  // SPAIN
  'https://www.elcorteingles.es', 'https://www.pccomponentes.com', 'https://www.mediamarkt.es',
  'https://www.carrefour.es', 'https://www.zalando.es', 'https://www.amazon.es',
  'https://www.privalia.es', 'https://www.worten.es', 'https://www.fnac.es',
  'https://www.decathlon.es', 'https://www.sprinter.es', 'https://www.forum-sport.es',
  'https://www.mango.com', 'https://www.zara.com', 'https://www.bershka.com',
  'https://www.stradivarius.com', 'https://www.pullandbear.com', 'https://www.massimo-dutti.com',
  'https://www.conforama.es', 'https://www.ikea.es', 'https://www.leroymerlin.es',
  'https://www.bricomart.com', 'https://www.aki.es', 'https://www.bauhaus.es',

  // ITALY
  'https://www.mediaworld.it', 'https://www.unieuro.it', 'https://www.eprice.it',
  'https://www.amazon.it', 'https://www.zalando.it', 'https://www.yoox.com',
  'https://www.privalia.it', 'https://www.esselunga.it', 'https://www.carrefour.it',
  'https://www.euronics.it', 'https://www.trony.it', 'https://www.expert.it',
  'https://www.bonprix.it', 'https://www.kiabi.it', 'https://www.calzedonia.it',
  'https://www.intimissimi.it', 'https://www.ovs.it', 'https://www.decathlon.it',

  // BELGIUM
  'https://www.bol.com/be', 'https://www.coolblue.be', 'https://www.mediamarkt.be',
  'https://www.zalando.be', 'https://www.amazon.com.be', 'https://www.krefel.be',
  'https://www.vandenborre.be', 'https://www.fnac.be', 'https://www.colruyt.be',
  'https://www.delhaize.be', 'https://www.carrefour.be', 'https://www.dreamland.be',

  // AUSTRIA
  'https://www.mediamarkt.at', 'https://www.saturn.at', 'https://www.zalando.at',
  'https://www.amazon.de/gp/site-directory?tag=austria', 'https://www.universal.at',
  'https://www.interspar.at', 'https://www.billa.at', 'https://www.libro.at',
  'https://www.thalia.at', 'https://www.xxxlutz.at', 'https://www.kika.at',

  // POLAND
  'https://www.allegro.pl', 'https://www.mediamarkt.pl', 'https://www.empik.com',
  'https://www.zalando.pl', 'https://www.amazon.pl', 'https://www.euro.com.pl',
  'https://www.morele.net', 'https://www.x-kom.pl', 'https://www.ceneo.pl',
  'https://www.mediaexpert.pl', 'https://www.rtv-euro-agd.pl', 'https://www.komputronik.pl',

  // SWEDEN
  'https://www.elgiganten.se', 'https://www.webhallen.com', 'https://www.inet.se',
  'https://www.cdon.se', 'https://www.zalando.se', 'https://www.boozt.com',
  'https://www.stadium.se', 'https://www.xxl.se', 'https://www.dustin.se',

  // DENMARK
  'https://www.elgiganten.dk', 'https://www.power.dk', 'https://www.proshop.dk',
  'https://www.zalando.dk', 'https://www.boozt.com/dk', 'https://www.cdon.dk',
  'https://www.bilka.dk', 'https://www.magasin.dk', 'https://www.saxo.com',

  // NORWAY
  'https://www.elkjop.no', 'https://www.power.no', 'https://www.komplett.no',
  'https://www.zalando.no', 'https://www.boozt.com/no', 'https://www.xxl.no',

  // FINLAND
  'https://www.gigantti.fi', 'https://www.verkkokauppa.com', 'https://www.power.fi',
  'https://www.zalando.fi', 'https://www.boozt.com/fi', 'https://www.xxl.fi',

  // PORTUGAL
  'https://www.worten.pt', 'https://www.fnac.pt', 'https://www.radiopopular.pt',
  'https://www.zalando.pt', 'https://www.continente.pt', 'https://www.pcdiga.com',

  // IRELAND
  'https://www.currys.ie', 'https://www.harvey-norman.ie', 'https://www.argos.ie',
  'https://www.zalando.ie', 'https://www.amazon.ie', 'https://www.littlewoods.ie',

  // CZECH REPUBLIC
  'https://www.alza.cz', 'https://www.czc.cz', 'https://www.mall.cz',
  'https://www.zalando.cz', 'https://www.datart.cz', 'https://www.electroworld.cz',

  // GREECE
  'https://www.public.gr', 'https://www.kotsovolos.gr', 'https://www.plaisio.gr',
  'https://www.skroutz.gr', 'https://www.e-shop.gr', 'https://www.mediamarkt.gr',

  // HUNGARY
  'https://www.emag.hu', 'https://www.mediamarkt.hu', 'https://www.mall.hu',
  'https://www.alza.hu', 'https://www.aqua.hu', 'https://www.extreme-digital.hu',

  // ROMANIA
  'https://www.emag.ro', 'https://www.altex.ro', 'https://www.evomag.ro',
  'https://www.flanco.ro', 'https://www.mediagalaxy.ro', 'https://www.pcgarage.ro',

  // UK (Post-Brexit but still relevant)
  'https://www.asos.com', 'https://www.boohoo.com', 'https://www.argos.co.uk',
  'https://www.currys.co.uk', 'https://www.johnlewis.com', 'https://www.next.co.uk',
  'https://www.very.co.uk', 'https://www.ao.com', 'https://www.tesco.com',
  'https://www.sainsburys.co.uk', 'https://www.boots.com', 'https://www.superdrug.com',

  // SWITZERLAND
  'https://www.digitec.ch', 'https://www.galaxus.ch', 'https://www.microspot.ch',
  'https://www.brack.ch', 'https://www.manor.ch', 'https://www.zalando.ch',

  // Shopify EU Stores (High-value targets)
  'https://www.gymshark.com', 'https://www.allbirds.eu', 'https://eu.puma.com',
  'https://www.adidas.de', 'https://www.nike.com/de', 'https://www.reebok.de',
  'https://www.underarmour.de', 'https://www.newbalance.de', 'https://www.asics.com',
  'https://www.skechers.de', 'https://www.crocs.de', 'https://www.birkenstock.com',
  'https://www.dr-martens.com', 'https://www.timberland.de', 'https://www.ugg.com',
  'https://www.northface.de', 'https://www.patagonia.com', 'https://www.mammut.com',
  'https://www.fjallraven.com', 'https://www.salomon.com', 'https://www.merrell.com',
  'https://www.columbia.com', 'https://www.jackwolfskin.de', 'https://www.vaude.com',

  // D2C Brands
  'https://www.glossier.com', 'https://www.away.com', 'https://www.casper.com',
  'https://www.warbyparker.com', 'https://www.brooklinen.com', 'https://www.everlane.com',
  'https://www.outdoor-voices.com', 'https://www.bombas.com', 'https://www.meundies.com',
];

interface Lead {
  url: string;
  score: number;
  issues: number;
  criticalCount: number;
  platform: string;
  country: string;
  scannedAt: string;
}

function detectCountry(url: string): string {
  if (url.includes('.de') || url.includes('/de')) return 'Germany';
  if (url.includes('.fr') || url.includes('/fr')) return 'France';
  if (url.includes('.nl') || url.includes('/nl')) return 'Netherlands';
  if (url.includes('.es') || url.includes('/es')) return 'Spain';
  if (url.includes('.it') || url.includes('/it')) return 'Italy';
  if (url.includes('.be') || url.includes('/be')) return 'Belgium';
  if (url.includes('.at') || url.includes('/at')) return 'Austria';
  if (url.includes('.pl')) return 'Poland';
  if (url.includes('.se')) return 'Sweden';
  if (url.includes('.dk')) return 'Denmark';
  if (url.includes('.no')) return 'Norway';
  if (url.includes('.fi')) return 'Finland';
  if (url.includes('.pt')) return 'Portugal';
  if (url.includes('.ie')) return 'Ireland';
  if (url.includes('.cz')) return 'Czech Republic';
  if (url.includes('.gr')) return 'Greece';
  if (url.includes('.hu')) return 'Hungary';
  if (url.includes('.ro')) return 'Romania';
  if (url.includes('.co.uk') || url.includes('.uk')) return 'UK';
  if (url.includes('.ch')) return 'Switzerland';
  return 'EU';
}

async function scanSite(page: Page, url: string): Promise<Lead | null> {
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 10000 });

    const html = await page.content();
    let platform = 'Custom';
    if (html.includes('Shopify') || html.includes('cdn.shopify')) platform = 'Shopify';
    else if (html.includes('WooCommerce')) platform = 'WooCommerce';
    else if (html.includes('Magento')) platform = 'Magento';
    else if (html.includes('PrestaShop')) platform = 'PrestaShop';
    else if (html.includes('BigCommerce')) platform = 'BigCommerce';
    else if (html.includes('Salesforce Commerce')) platform = 'SFCC';

    await page.addScriptTag({ url: 'https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.8.3/axe.min.js' });

    const results = await page.evaluate(() => {
      // @ts-ignore
      return window.axe?.run?.() || { violations: [] };
    });

    const violations = results.violations || [];
    const criticalCount = violations.filter((v: any) => v.impact === 'critical').length;
    const score = Math.max(0, 100 - violations.length * 5);

    return {
      url,
      score,
      issues: violations.length,
      criticalCount,
      platform,
      country: detectCountry(url),
      scannedAt: new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

async function main() {
  console.log('🚀 MASS LEAD SCANNER - 500+ EU E-COMMERCE SITES');
  console.log(`Target sites: ${EU_TARGETS.length}`);
  console.log('Starting scan...\n');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
  });
  const page = await context.newPage();
  const leads: Lead[] = [];

  let scanned = 0;
  let failed = 0;

  for (const url of EU_TARGETS) {
    scanned++;
    const shortUrl = url.slice(0, 35).padEnd(35);
    process.stdout.write(`[${scanned}/${EU_TARGETS.length}] ${shortUrl}...`);

    const lead = await scanSite(page, url);
    if (lead) {
      leads.push(lead);
      const scoreColor = lead.score < 60 ? '\x1b[31m' : lead.score < 80 ? '\x1b[33m' : '\x1b[32m';
      console.log(` ${scoreColor}${lead.score}/100\x1b[0m (${lead.country})`);
    } else {
      console.log(' \x1b[90m✗ Failed\x1b[0m');
      failed++;
    }

    // Save progress every 50 sites
    if (scanned % 50 === 0) {
      const progressFile = `/tmp/scan-progress-${scanned}.json`;
      require('fs').writeFileSync(progressFile, JSON.stringify(leads, null, 2));
      console.log(`\n📊 Progress saved: ${leads.length} leads scanned\n`);
    }
  }

  await browser.close();

  // Filter and sort hot leads
  const hotLeads = leads.filter(l => l.score < 85).sort((a, b) => a.score - b.score);

  console.log('\n' + '='.repeat(70));
  console.log(`🔥 SCAN COMPLETE - ${hotLeads.length} HOT LEADS FOUND`);
  console.log('='.repeat(70));
  console.log(`Total scanned: ${scanned}`);
  console.log(`Successful: ${leads.length}`);
  console.log(`Failed: ${failed}`);
  console.log(`Hot leads (score < 85): ${hotLeads.length}`);
  console.log(`Critical issues found: ${hotLeads.filter(l => l.criticalCount > 0).length}`);

  // By country breakdown
  console.log('\n📍 LEADS BY COUNTRY:');
  const byCountry = hotLeads.reduce((acc, l) => {
    acc[l.country] = (acc[l.country] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  Object.entries(byCountry).sort((a, b) => b[1] - a[1]).forEach(([country, count]) => {
    console.log(`  ${country}: ${count} leads`);
  });

  // Save final results
  const outputFile = '/tmp/mass-scan-results.json';
  require('fs').writeFileSync(outputFile, JSON.stringify({
    scannedAt: new Date().toISOString(),
    totalScanned: scanned,
    totalLeads: leads.length,
    hotLeads: hotLeads.length,
    byCountry,
    leads: hotLeads
  }, null, 2));

  console.log(`\n💾 Results saved to: ${outputFile}`);

  // Output leads for outreach
  console.log('\n--- TOP 50 LEADS FOR IMMEDIATE OUTREACH ---');
  console.log(JSON.stringify(hotLeads.slice(0, 50), null, 2));
}

main().catch(console.error);
