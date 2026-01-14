# LAUNCH CHECKLIST - STEP BY STEP
Execute in this exact order

---

## PRE-LAUNCH (Colin - 15 minutes)

### Step 1: Create Stripe Payment Link
- [ ] Go to dashboard.stripe.com
- [ ] Click "Payment Links" in sidebar
- [ ] Click "Create payment link"
- [ ] Set product name: `Inclusiv Lifetime Access - Founding 50`
- [ ] Set price: `$199.00` (one-time)
- [ ] Add description: `Full WCAG compliance platform. Lifetime access. Unlimited scans. Never pay again.`
- [ ] Click "Create link"
- [ ] Copy the link: `https://buy.stripe.com/...`
- [ ] **PASTE LINK HERE:** _______________

### Step 2: Verify Resend Domain
- [ ] Go to resend.com/domains
- [ ] Click "Add domain"
- [ ] Enter: `tryinclusiv.com`
- [ ] Copy the DNS records provided
- [ ] Go to your DNS provider (Vercel/Cloudflare/etc)
- [ ] Add the TXT and MX records
- [ ] Return to Resend and click "Verify"
- [ ] Wait for verification (usually 5-10 minutes)
- [ ] **CONFIRM VERIFIED:** [ ]

### Step 3: Update All Materials
Run this command to replace Stripe link in all files:
```bash
cd /Users/colinsmith/inclusiv/marketing
sed -i '' 's|\[STRIPE_LINK\]|YOUR_ACTUAL_STRIPE_LINK|g' *.md
```

---

## LAUNCH PHASE 1: SOCIAL MEDIA (30 minutes)

### Reddit Posts (Do all 4)

**1. r/webdev**
- [ ] Go to reddit.com/r/webdev
- [ ] Click "Create Post"
- [ ] Copy post from BLITZ-TODAY.md (r/webdev section)
- [ ] Paste and submit
- [ ] Note post URL: _______________

**2. r/entrepreneur**
- [ ] Go to reddit.com/r/entrepreneur
- [ ] Click "Create Post"
- [ ] Copy post from BLITZ-TODAY.md (r/entrepreneur section)
- [ ] Paste and submit
- [ ] Note post URL: _______________

**3. r/startups**
- [ ] Go to reddit.com/r/startups
- [ ] Click "Create Post"
- [ ] Copy post from BLITZ-TODAY.md (r/startups section)
- [ ] Paste and submit
- [ ] Note post URL: _______________

**4. r/SaaS**
- [ ] Go to reddit.com/r/SaaS
- [ ] Click "Create Post"
- [ ] Copy post from BLITZ-TODAY.md (r/SaaS section)
- [ ] Paste and submit
- [ ] Note post URL: _______________

### Hacker News
- [ ] Go to news.ycombinator.com/submit
- [ ] Title: `Show HN: Inclusiv – Free WCAG accessibility scanner (lifetime deals for first 50)`
- [ ] URL: `https://tryinclusiv.com`
- [ ] Submit
- [ ] Note post URL: _______________

### Twitter
- [ ] Log into Twitter
- [ ] Copy thread from BLITZ-TODAY.md (Twitter section)
- [ ] Post as thread (use thread feature)
- [ ] Pin to profile
- [ ] Note thread URL: _______________

### LinkedIn
- [ ] Log into LinkedIn
- [ ] Copy post from BLITZ-TODAY.md (LinkedIn section)
- [ ] Post
- [ ] Note post URL: _______________

---

## LAUNCH PHASE 2: COLD EMAILS (If Resend verified)

### Send Priority Emails (Top 10)
Use templates from COLD-EMAIL-BLAST.md

- [ ] Email 1: support@chubbies.com - SENT
- [ ] Email 2: hello@hismileteeth.com - SENT
- [ ] Email 3: support@tracksmith.com - SENT
- [ ] Email 4: support@anker.com - SENT
- [ ] Email 5: hello@casetify.com - SENT
- [ ] Email 6: support@rayconglobal.com - SENT
- [ ] Email 7: customerservice@aloyoga.com - SENT
- [ ] Email 8: hello@vuoriclothing.com - SENT
- [ ] Email 9: hello@rhone.com - SENT
- [ ] Email 10: hello@burrow.com - SENT

### Send Secondary Emails
- [ ] Email 11: customerservice@thepangaia.com - SENT
- [ ] Email 12: hello@monos.com - SENT
- [ ] Email 13: service@goodamerican.com - SENT
- [ ] Email 14: support@savagex.com - SENT
- [ ] Email 15: info@puravidabracelets.com - SENT
- [ ] Email 16: hello@awaytravel.com - SENT
- [ ] Email 17: hello@drinkhint.com - SENT

---

## LAUNCH PHASE 3: NETWORK BLAST (30 minutes)

### Personal Contacts
- [ ] Send to 20 LinkedIn connections (DM template from NETWORK-BLAST.md)
- [ ] Send to 20 email contacts (email template from NETWORK-BLAST.md)
- [ ] Post in any Slack/Discord communities
- [ ] Text 10 friends who have websites

### Ask for Shares
- [ ] Ask 5 friends to retweet your thread
- [ ] Ask 5 friends to upvote Reddit posts
- [ ] Ask 5 friends to share on LinkedIn

---

## POST-LAUNCH: ENGAGEMENT (Ongoing)

### Every 15 Minutes
- [ ] Check Reddit comments - reply to ALL
- [ ] Check HN comments - reply to ALL
- [ ] Check Twitter mentions - reply to ALL
- [ ] Check email inbox - reply to ALL

### Engagement Rules
- Be genuine, not salesy
- Answer questions thoroughly
- Admit weaknesses honestly
- Thank people for feedback
- Never argue with critics

### Closing Opportunities
When someone expresses interest:
```
Thanks! Here's the lifetime deal link: [STRIPE_LINK]

Any questions, happy to jump on a quick call.
```

---

## TRACKING

### Hour 1
- Reddit upvotes: ____
- HN points: ____
- Twitter engagement: ____
- Site traffic: ____
- Stripe purchases: ____

### Hour 2
- Reddit upvotes: ____
- HN points: ____
- Twitter engagement: ____
- Site traffic: ____
- Stripe purchases: ____

### Hour 4
- Reddit upvotes: ____
- HN points: ____
- Twitter engagement: ____
- Site traffic: ____
- Stripe purchases: ____

### End of Day
- Total Reddit upvotes: ____
- Total HN points: ____
- Total Twitter impressions: ____
- Total site visitors: ____
- **TOTAL CUSTOMERS: ____**
- **TOTAL REVENUE: $____**

---

## EMERGENCY PLAYS

### If Posts Get Removed
- Don't repost same content
- Try different subreddit
- Focus on other channels

### If No Traction After 2 Hours
- Lower price to $149 or $99
- Add bonus (free consultation call)
- Double down on cold emails

### If Getting Traction
- Cross-post to more subreddits
- Create follow-up content
- Engage MORE in comments

---

## FILES REFERENCE

| Purpose | File |
|---------|------|
| Reddit/HN/Twitter posts | BLITZ-TODAY.md |
| Cold email templates | COLD-EMAIL-BLAST.md |
| Network blast templates | NETWORK-BLAST.md |
| Sales scripts | SALES-SCRIPTS.md |
| Reddit variations | REDDIT-VARIATIONS.md |
| Email subject lines | EMAIL-SUBJECT-LINES.md |
| Leads database | FINAL-LEADS.csv |

---

## GO TIME

Everything is ready. Execute in order. Move fast.

**Target: 50 customers × $199 = $10,000**

Good luck. 🚀
