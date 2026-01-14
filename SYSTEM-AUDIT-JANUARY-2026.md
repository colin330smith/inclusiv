# Inclusiv System Audit: $100K MRR Viability Analysis

**Date:** January 14, 2026
**Auditor:** Claude Code
**Verdict:** DOES NOT PASS - Critical infrastructure missing

---

## Executive Summary

Inclusiv currently exists as a **lead capture funnel with a scanner** - NOT a viable SaaS product. The gap between current state and $100K MRR is massive, but fixable with focused execution.

### Current State
- **Revenue:** $0 MRR
- **Customers:** 0 paying
- **Product:** Free scanner + email capture
- **Infrastructure:** No database, ephemeral storage, broken email automation

### $100K MRR Requirement
At €149/mo average (Professional tier):
- **Customers needed:** 671
- **Monthly traffic needed:** 33,550 visitors (at 2% funnel conversion)
- **Daily trials needed:** ~45

### Verdict: CANNOT REACH $100K MRR IN 6 MONTHS AS-IS

The product literally cannot retain customers because:
1. No user accounts or authentication
2. No dashboard for paid features
3. Email sequences don't work (in-memory storage + once-daily cron)
4. Lead/customer data lost on every deploy

---

## Part 1: Infrastructure Audit (CRITICAL FAILURES)

### 1.1 Database: NONE EXISTS

**Finding:** All data storage uses ephemeral methods that are lost on Vercel deployment.

| Storage Type | Location | Status |
|--------------|----------|--------|
| Leads | `/data/leads.json` | LOST ON DEPLOY |
| Customers | `/data/customers.json` | LOST ON DEPLOY |
| Email Queue | In-memory Map | LOST ON RESTART |
| Scheduled Emails | In-memory Map | LOST ON RESTART |

**Code Evidence:**
```typescript
// src/app/api/leads/capture/route.ts:10
const LEADS_FILE = path.join(process.cwd(), "data", "leads.json");

// src/app/api/email/cron/route.ts:33-34
const scheduledEmailsStore: Map<string, StoredScheduledEmail> = new Map();
const leadsStore: Map<string, Lead> = new Map();
```

**Impact:**
- Every lead captured is lost when Vercel rebuilds
- Email sequences cannot function (data doesn't persist between cron runs)
- No way to track customers for paid features

**Required Fix:** PostgreSQL database (Supabase or Vercel Postgres)

---

### 1.2 Email Automation: BROKEN

**Finding:** The email scheduler system is well-designed but cannot work.

**Problem 1:** In-memory storage
```typescript
// src/lib/email-scheduler.ts:50-53
class InMemoryDatabaseAdapter implements EmailDatabaseAdapter {
  private leads: Map<string, Lead> = new Map();
  private emails: Map<string, ScheduledEmail> = new Map();
```

**Problem 2:** Cron only runs once per day
```json
// vercel.json
{ "crons": [{ "path": "/api/email/cron", "schedule": "0 9 * * *" }] }
```

A 7-day email sequence with day 0, 1, 3, 5, 7 emails CANNOT work with:
- Daily cron (multiple emails could be due at once)
- In-memory storage (each cron run starts fresh - no scheduled emails exist)

**Impact:**
- First email might send (directly in capture endpoint)
- All follow-up emails NEVER send
- Nurture sequences are non-functional

**Required Fix:**
1. Database adapter for email scheduler
2. Increase cron frequency OR use event-driven sending

---

### 1.3 User Authentication: DOES NOT EXIST

**Finding:** No authentication system whatsoever.

```bash
# Search results for auth-related files:
**/auth/**/*.ts - No files found
**/dashboard/**/*.tsx - No files found
```

**Impact:**
- Cannot deliver paid features (no way to identify users)
- Cannot restrict scans by plan
- Cannot show historical scan data
- Cannot manage subscriptions

**Required Fix:** Full auth system (NextAuth.js or Clerk)

---

### 1.4 Paid Product: DOES NOT EXIST

**Finding:** There is a checkout flow that creates Stripe subscriptions, but no product to deliver.

**What exists:**
- Stripe checkout (creates subscription)
- Stripe webhook (records payment to JSON file)
- Pricing page (shows tiers)

**What's missing:**
- User dashboard
- Scan history
- Team management
- API access
- Certificates
- Scheduled scans
- Reports
- All features advertised in pricing

**Impact:** Anyone who pays gets nothing except access to the same free scanner.

---

## Part 2: Product Audit

### 2.1 Scanner (WORKING)

The core scanner functions correctly:
- Playwright + axe-core via Browserless
- Platform detection (WordPress, Shopify, etc.)
- Returns score, issues, metadata
- 10 scans/minute rate limit per IP

**Test Result:** Successfully scanned example.com, returned score 100.

### 2.2 Lead Capture (PARTIALLY WORKING)

Lead capture forms exist and function:
- Post-scan modal
- Exit intent popup
- Inline lead forms
- Floating CTA

**Problem:** Leads go to a JSON file that's lost on deploy.

### 2.3 Email Sending (PARTIALLY WORKING)

Resend integration is configured:
- Templates exist for welcome sequence (5 emails)
- Templates exist for cold lead sequence (4 emails)
- First email sends immediately on capture

**Problem:** Follow-up emails never send due to storage issues.

### 2.4 Analytics (WORKING)

Comprehensive tracking is in place:
- GA4 + Plausible dual tracking
- Full funnel tracking defined
- Conversion events configured

---

## Part 3: $100K MRR Math

### Revenue Model

| Tier | Price | Expected Mix | Revenue/Customer |
|------|-------|--------------|------------------|
| Free | €0 | 80% | €0 |
| Starter | €49/mo | 10% | €49 |
| Professional | €149/mo | 7% | €149 |
| Enterprise | €499/mo | 3% | €499 |

**Blended ARPU:** €58.39/paying customer (weighted by mix)

### Customer Requirement

To hit €100K MRR:
- At €149 avg (Pro only): **671 customers**
- At €58 blended: **1,712 customers**

### Traffic Requirement

Using the funnel rates defined in `analytics.ts`:
```typescript
LANDING: 100% → SCAN_STARTED: 20% → SCAN_COMPLETED: 16% →
EMAIL_CAPTURED: 10% → PRICING_VIEWED: 7% →
CHECKOUT_INITIATED: 3% → PAYMENT_COMPLETED: 2%
```

To get 671 customers at 2% conversion:
- **Monthly visitors needed:** 33,550
- **Daily visitors needed:** 1,118

To get 1,712 customers at 2% conversion:
- **Monthly visitors needed:** 85,600
- **Daily visitors needed:** 2,853

### 6-Month Ramp Calculation

| Month | Customers | Churn (4%) | Net | MRR (€149 avg) |
|-------|-----------|------------|-----|----------------|
| 1 | 50 | 0 | 50 | €7,450 |
| 2 | 80 | 2 | 128 | €19,072 |
| 3 | 100 | 5 | 223 | €33,227 |
| 4 | 120 | 9 | 334 | €49,766 |
| 5 | 140 | 13 | 461 | €68,689 |
| 6 | 160 | 18 | 603 | €89,847 |

**Result: €89,847 MRR at Month 6** - Falls short by €10K.

### Adjusted Target (Achievable)

To hit €100K by month 6, need:
- Month 1: 60 customers (+20%)
- Monthly growth: 25% increase each month
- Churn: <3.5%

**OR** raise prices:
- Pro at €199/mo instead of €149
- At €199 avg, need only 503 customers

---

## Part 4: Critical Blockers

### Blocker 1: No Product to Sell (SEVERITY: CRITICAL)

The pricing page promises features that don't exist:
- Weekly/daily scans (no scheduler)
- Compliance certificates (not built)
- Team management (no auth)
- API access (not built)
- Reports (not built)

**Time to fix:** 2-3 weeks (dashboard + core features)

### Blocker 2: No Customer Retention (SEVERITY: CRITICAL)

Even if someone pays, they get:
- No dashboard
- No scan history
- No value beyond free tier

**Impact:** Immediate churn, refunds, chargebacks

**Time to fix:** 2 weeks (basic dashboard)

### Blocker 3: Broken Email Nurture (SEVERITY: HIGH)

The 7-day email sequence is the primary conversion mechanism. Currently:
- Only first email sends
- Days 1, 3, 5, 7 emails never send
- No nurture = no conversions

**Time to fix:** 3-5 days (database + cron fix)

### Blocker 4: Data Loss (SEVERITY: HIGH)

Every deploy loses:
- All leads ever captured
- All customer records
- All scheduled emails

**Time to fix:** 2-3 days (database setup)

### Blocker 5: No Traffic (SEVERITY: HIGH)

Current traffic: Unknown (likely <100/day)
Required traffic: 1,118/day

**Time to fix:** Ongoing (SEO, content, outreach)

---

## Part 5: Phase 2 Recommendations

### Week 1: Database Foundation (MUST DO)

1. **Set up Supabase or Vercel Postgres**
   - Lead storage
   - Customer storage
   - Email scheduler storage
   - Scan history

2. **Fix email scheduler**
   - Implement DatabaseAdapter for scheduler
   - Increase cron to every 15 minutes (Vercel Pro needed)
   - OR implement event-driven email sending

3. **Fix Stripe webhook**
   - Write customer data to database, not JSON

### Week 2: Authentication & Dashboard

1. **Add NextAuth.js or Clerk**
   - Email/password + OAuth
   - Link to Stripe customer ID

2. **Build minimal dashboard**
   - Scan history
   - Current plan display
   - Usage stats

3. **Implement plan restrictions**
   - Free: 3 scans/day, 1 site
   - Paid: Based on tier limits

### Week 3: Core Paid Features

1. **Scheduled scans**
   - Cron job to run scans for paid users
   - Email alerts when score changes

2. **PDF reports**
   - Downloadable accessibility report
   - Branded with their logo (Pro+)

3. **Compliance certificate**
   - Auto-generated badge
   - Embed code for their site

### Week 4: Traffic Generation

1. **Launch Product Hunt**
   - Already planned in battleplan

2. **Execute Reddit/HN strategy**
   - Use content from READY-TO-POST materials

3. **Direct outreach**
   - Scan → personalized email
   - 50/day target

### Ongoing: Conversion Optimization

1. **Fix email sequences**
   - Ensure all 7 days send
   - A/B test subject lines

2. **Optimize checkout**
   - Add testimonials
   - Show ROI calculator

3. **Reduce churn**
   - Weekly value emails
   - Score trend notifications

---

## Part 6: Revised 6-Month Timeline

### Month 1: Foundation (Target: €5K MRR)

- Week 1-2: Database, email fix, auth
- Week 3-4: Dashboard, plan enforcement
- Launch: Reddit + HN
- Target: 35 paying customers

### Month 2: Product Expansion (Target: €15K MRR)

- Scheduled scans
- PDF reports
- Certificates
- Product Hunt launch
- Target: 100 paying customers

### Month 3: Growth (Target: €30K MRR)

- API v1
- White-label for agencies
- Agency tier launch
- Partner program live
- Target: 200 paying customers

### Month 4: Scale (Target: €50K MRR)

- Platform integrations (Shopify app, WordPress plugin)
- AI fix suggestions (Claude integration)
- Paid ads started ($2K/mo)
- Target: 335 paying customers

### Month 5: Accelerate (Target: €75K MRR)

- Legal templates pack ($99)
- Advanced remediation engine
- Ads scaled ($5K/mo)
- Target: 500 paying customers

### Month 6: Target (Target: €100K MRR)

- Full feature parity with plan
- Support AI agent
- Referral program
- Target: 671 paying customers

---

## Part 7: Investment Required

### Technical Debt (Must Pay Now)

| Item | Cost | Priority |
|------|------|----------|
| Supabase Pro | €25/mo | CRITICAL |
| Vercel Pro (for crons) | €20/mo | CRITICAL |
| Browserless scaling | €99-299/mo | HIGH |
| Resend scaling | €20-80/mo | MEDIUM |

**Total infrastructure:** €165-425/mo

### Development Time

| Feature | Hours | Priority |
|---------|-------|----------|
| Database setup | 8 | CRITICAL |
| Email scheduler fix | 4 | CRITICAL |
| Authentication | 12 | CRITICAL |
| Dashboard v1 | 16 | CRITICAL |
| Plan enforcement | 8 | CRITICAL |
| Scheduled scans | 8 | HIGH |
| Reports/certs | 8 | HIGH |
| API v1 | 12 | MEDIUM |

**Total development:** ~76 hours (2 weeks full-time)

### Marketing (Zero Budget Strategy)

Per CODE-RED-ACQUISITION-BATTLEPLAN.md:
- Organic: Reddit, HN, LinkedIn
- Content: SEO articles
- Direct: Personalized outreach
- Partners: Agency referrals

---

## Conclusion

### Can Inclusiv reach $100K MRR in 6 months?

**CONDITIONALLY YES** - but only if:

1. **Database is added within 48 hours**
2. **Dashboard ships within 2 weeks**
3. **Email nurture is fixed within 1 week**
4. **Traffic generation starts immediately**
5. **Pricing stays at €149+ average**

### What happens without these changes?

- 0 paying customers possible (no product to deliver)
- All leads lost on each deploy
- Email sequences don't convert
- Anyone who pays will churn immediately

### Recommended Action

**Start Phase 2 tonight with database setup.** This unblocks everything else.

Priority order:
1. Supabase/Vercel Postgres setup (tonight)
2. Email scheduler database adapter (tomorrow AM)
3. Authentication (tomorrow PM - Day 2)
4. Dashboard MVP (Days 3-4)
5. Launch traffic generation (Day 5)

---

## Appendix: Current System Map

```
CURRENT STATE:
==============

Website (tryinclusiv.com)
    │
    ├── Free Scanner ✅ WORKING
    │       │
    │       └── POST /api/scan
    │               └── Browserless + axe-core
    │
    ├── Lead Capture ⚠️ PARTIALLY WORKING
    │       │
    │       ├── Exit Intent Popup
    │       ├── Post-Scan Modal
    │       ├── Floating CTA
    │       └── Inline Forms
    │               │
    │               └── POST /api/leads/capture
    │                       └── leads.json ❌ EPHEMERAL
    │
    ├── Email Sequences ❌ BROKEN
    │       │
    │       ├── First email sends ✅
    │       └── Follow-ups never send ❌
    │               │
    │               └── GET /api/email/cron
    │                       └── In-memory storage ❌
    │
    ├── Checkout ⚠️ CREATES SUBSCRIPTION, NO PRODUCT
    │       │
    │       ├── POST /api/checkout ✅
    │       └── POST /api/webhook/stripe
    │               └── customers.json ❌ EPHEMERAL
    │
    └── Dashboard ❌ DOES NOT EXIST


REQUIRED STATE:
===============

Website (tryinclusiv.com)
    │
    ├── Database Layer (Supabase/Postgres)
    │       │
    │       ├── leads table
    │       ├── customers table
    │       ├── scans table
    │       ├── scheduled_emails table
    │       └── subscriptions table
    │
    ├── Authentication (NextAuth/Clerk)
    │       │
    │       └── Linked to Stripe customer
    │
    ├── User Dashboard
    │       │
    │       ├── Scan history
    │       ├── Plan management
    │       ├── Team management
    │       └── API keys
    │
    └── Email Scheduler (Database-backed)
            │
            └── Frequent cron OR event-driven
```

---

**END OF AUDIT**

*Generated: January 14, 2026 at ~4:00 AM*
*Status: Ready for Phase 2 execution*
