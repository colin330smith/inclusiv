#!/usr/bin/env node
/**
 * CONTACT FORM BLITZ - Automated outreach via website contact forms
 * Bypasses email deliverability, goes directly to inbox
 */

const targets = [
  // TIER 1: Previously sued companies (highest priority)
  { company: 'Fashion Nova', domain: 'fashionnova.com', contactUrl: 'https://www.fashionnova.com/pages/contact-us' },
  { company: 'Blue Apron', domain: 'blueapron.com', contactUrl: 'https://www.blueapron.com/contact' },
  { company: 'Sweetgreen', domain: 'sweetgreen.com', contactUrl: 'https://www.sweetgreen.com/contact' },

  // TIER 2: High-value Shopify stores
  { company: 'Gymshark', domain: 'gymshark.com', contactUrl: 'https://www.gymshark.com/pages/contact-us' },
  { company: 'Alo Yoga', domain: 'aloyoga.com', contactUrl: 'https://www.aloyoga.com/pages/contact' },
  { company: 'FIGS', domain: 'wearfigs.com', contactUrl: 'https://www.wearfigs.com/pages/contact' },
  { company: 'Bombas', domain: 'bombas.com', contactUrl: 'https://bombas.com/pages/contact-us' },
  { company: 'Skims', domain: 'skims.com', contactUrl: 'https://skims.com/pages/contact' },
  { company: 'Allbirds', domain: 'allbirds.com', contactUrl: 'https://www.allbirds.com/pages/contact' },
  { company: 'Kylie Cosmetics', domain: 'kyliecosmetics.com', contactUrl: 'https://kyliecosmetics.com/pages/contact' },
  { company: 'ColourPop', domain: 'colourpop.com', contactUrl: 'https://colourpop.com/pages/contact-us' },
  { company: 'Glossier', domain: 'glossier.com', contactUrl: 'https://www.glossier.com/contact' },
  { company: 'Rare Beauty', domain: 'rarebeauty.com', contactUrl: 'https://www.rarebeauty.com/pages/contact' },
  { company: 'Steve Madden', domain: 'stevemadden.com', contactUrl: 'https://www.stevemadden.com/pages/contact-us' },
  { company: 'Rebecca Minkoff', domain: 'rebeccaminkoff.com', contactUrl: 'https://www.rebeccaminkoff.com/pages/contact-us' },
  { company: 'Ruggable', domain: 'ruggable.com', contactUrl: 'https://ruggable.com/pages/contact' },
  { company: 'Bulletproof', domain: 'bulletproof.com', contactUrl: 'https://www.bulletproof.com/pages/contact-us' },
  { company: 'Death Wish Coffee', domain: 'deathwishcoffee.com', contactUrl: 'https://www.deathwishcoffee.com/pages/contact' },
  { company: 'Raycon', domain: 'rayconglobal.com', contactUrl: 'https://rayconglobal.com/pages/contact' },

  // TIER 3: Celebrity brands
  { company: 'Taylor Swift Store', domain: 'store.taylorswift.com', contactUrl: 'https://store.taylorswift.com/pages/contact' },
  { company: 'Netflix Shop', domain: 'netflix.shop', contactUrl: 'https://www.netflix.shop/pages/contact' },
  { company: 'Red Bull Shop', domain: 'redbullshop.com', contactUrl: 'https://www.redbullshopus.com/pages/contact' },
];

const generateMessage = (company, domain) => {
  return `Hi ${company} Team,

I wanted to reach out regarding website accessibility compliance.

In 2025, there have been 5,000+ ADA website lawsuits filed - a 37% increase from last year. Fashion and e-commerce brands are the #1 target, with Shopify stores representing 32% of all cases.

I'd like to offer ${company} a complimentary accessibility scan at tryinclusiv.com. It takes 30 seconds and shows exactly what accessibility issues exist on your site before they become a legal exposure.

For context:
- Fashion Nova paid $5M+ in their ADA settlement
- 46% of lawsuits are against repeat defendants
- 87 million Americans have disabilities

Would your team be interested in a free compliance check?

Best regards,
Inclusiv Team
tryinclusiv.com`;
};

// Output contact form targets for manual or automated submission
console.log('=== CONTACT FORM BLITZ TARGETS ===');
console.log(`Total targets: ${targets.length}\n`);

targets.forEach((target, i) => {
  console.log(`[${i + 1}] ${target.company}`);
  console.log(`    URL: ${target.contactUrl}`);
  console.log(`    Domain: ${target.domain}`);
  console.log('');
});

console.log('\n=== SAMPLE MESSAGE ===\n');
console.log(generateMessage('COMPANY_NAME', 'company.com'));
