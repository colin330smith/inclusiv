# Inclusiv Analytics Setup & Dashboard Guide

## Current Analytics Status: IMPLEMENTED

Inclusiv has a comprehensive dual-analytics setup with Google Analytics 4 (GA4) and Plausible Analytics.

---

## Analytics Architecture Overview

### 1. Google Analytics 4 (GA4)
- **Implementation**: Server-side in `/src/app/layout.tsx`
- **Measurement ID**: `NEXT_PUBLIC_GA_ID` (needs to be set in `.env`)
- **Features Enabled**:
  - Enhanced measurement
  - Enhanced conversions
  - Custom dimensions (user_type, scan_score, platform_detected)
  - E-commerce tracking
  - Page visibility tracking

### 2. Plausible Analytics (Privacy-Focused)
- **Implementation**: Script tag in layout
- **Domain**: `inclusiv.app` (production domain configured)
- **Benefits**:
  - GDPR compliant
  - No cookies
  - Simple, fast loading
  - Privacy-first alternative

### 3. Custom Analytics Library
**Location**: `/src/lib/analytics.ts`

Complete event tracking system with:
- Type-safe event definitions
- Dual provider support (GA4 + Plausible)
- Privacy-preserving email hashing
- URL anonymization
- Automatic scroll depth tracking
- Time on page tracking

---

## Tracked Events

| Event | Description | Properties |
|-------|-------------|------------|
| `page_view` | Page loads | page_path, page_title, referrer |
| `scan_started` | User initiates scan | url, source |
| `scan_completed` | Scan finishes | url, score, issues_count, critical_issues, platform, duration |
| `email_captured` | Lead submitted | source, email_hash, page_path |
| `pricing_viewed` | Views pricing page | plan_name, source |
| `checkout_initiated` | Starts checkout | plan_name, plan_price, currency |
| `payment_completed` | Purchase completed | plan_name, plan_price, transaction_id |
| `button_click` | Button interactions | button_id, button_text, button_location |
| `cta_click` | CTA interactions | button_id, button_text, destination |
| `feature_click` | Feature interest | feature_name, feature_section |
| `scroll_depth` | Engagement milestone | scroll_percentage (25/50/75/90/100) |
| `time_on_page` | Time milestones | time_on_page_seconds (30/60/120/300) |

---

## Conversion Funnel

```
Stage                    Expected Rate    Target for 50 Users
==================================================================
1. Page Views            100%             2,500 visitors
2. Scans Started         20%              500 scans
3. Scans Completed       16%              400 completed
4. Emails Captured       10%              250 emails
5. Pricing Viewed        7%               175 views
6. Checkout Initiated    3%               75 checkouts
7. Payment Completed     2%               50 paying users
```

### Funnel Math for 50 Users Goal:
- **Target**: 50 paying customers
- **Conversion Rate**: 2% (visitor to paid)
- **Required Visitors**: 2,500 unique visitors
- **Daily Target**: ~84 visitors/day (30-day goal)

---

## Key Performance Indicators (KPIs)

### Primary KPIs
| Metric | Current Target | Stretch Goal |
|--------|----------------|--------------|
| Visitor to Scan Rate | 20% | 25% |
| Scan to Email Rate | 50% | 60% |
| Email to Pricing Rate | 70% | 80% |
| Pricing to Checkout Rate | 43% | 50% |
| Checkout to Purchase Rate | 67% | 75% |
| Overall Conversion | 2% | 3% |

### Secondary KPIs
| Metric | Target | Notes |
|--------|--------|-------|
| Avg Time on Page | > 2 min | Engagement indicator |
| Bounce Rate | < 40% | Quality traffic |
| Scroll Depth | > 50% | Content engagement |
| Return Visitors | > 20% | Brand recall |

---

## Dashboard Access

### Admin Dashboard
**URL**: `/admin`
**Location**: `/src/app/admin/page.tsx`

Features:
- Real-time metrics display
- Time range selection (24h, 7d, 30d, 90d)
- Conversion funnel visualization
- Top CTAs performance
- Live event stream
- Password-protected access

### To Access:
1. Navigate to `https://inclusiv.app/admin`
2. Enter admin password (set via `NEXT_PUBLIC_ADMIN_PASSWORD` env var)
3. Default password: `inclusiv2025` (change in production!)

---

## Setup Checklist

### Completed:
- [x] Analytics library implemented (`/src/lib/analytics.ts`)
- [x] GA4 integration in layout
- [x] Plausible integration (domain: inclusiv.app)
- [x] Admin dashboard UI component
- [x] Admin route with authentication
- [x] Lead capture API with tracking
- [x] Event tracking on homepage
- [x] Pricing page tracking

### Immediate Actions Required:

- [ ] **Set GA4 Measurement ID**
  ```env
  # Add to .env.local and .env.production.local
  NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
  ```

- [ ] **Create GA4 Property**
  1. Go to https://analytics.google.com
  2. Create new GA4 property
  3. Copy Measurement ID
  4. Set up data streams
  5. Configure conversions

- [ ] **Set Up Conversion Goals in GA4**
  - `email_captured` - Lead generation
  - `checkout_initiated` - Intent
  - `payment_completed` - Purchase (value tracking)

- [ ] **Configure Enhanced E-commerce**
  - Enable in GA4 admin
  - Verify purchase events are firing

- [ ] **Set Admin Password**
  ```env
  NEXT_PUBLIC_ADMIN_PASSWORD=your-secure-password
  ```

---

## UTM Parameter Tracking

GA4 automatically captures UTM parameters. Use these formats:

### Campaign URLs
```
https://inclusiv.app/?utm_source=SOURCE&utm_medium=MEDIUM&utm_campaign=CAMPAIGN

Examples:
- LinkedIn: ?utm_source=linkedin&utm_medium=social&utm_campaign=eaa_awareness
- Reddit: ?utm_source=reddit&utm_medium=social&utm_campaign=accessibility_discussion
- Email: ?utm_source=email&utm_medium=newsletter&utm_campaign=launch_announcement
- ProductHunt: ?utm_source=producthunt&utm_medium=referral&utm_campaign=launch
```

### UTM Parameters Reference
| Parameter | Values to Use |
|-----------|---------------|
| utm_source | linkedin, reddit, twitter, email, google, producthunt |
| utm_medium | social, cpc, email, referral, organic |
| utm_campaign | eaa_awareness, launch, cold_outreach, retargeting |
| utm_content | (optional) ad variant or post type |
| utm_term | (optional) keyword for paid search |

---

## Data Export & Reporting

### Weekly Report Template
```
INCLUSIV WEEKLY ANALYTICS REPORT
Week of: [DATE]

TRAFFIC
- Total Visitors: ___
- New vs Returning: __% / __%
- Top Sources: ___
- Avg Session Duration: ___

CONVERSION FUNNEL
- Scans Started: ___ (_%  of visitors)
- Scans Completed: ___ (_% completion rate)
- Emails Captured: ___ (_% capture rate)
- Pricing Views: ___
- Checkouts: ___
- Payments: ___

REVENUE
- New Customers: ___
- Revenue: EUR ___
- ARPU: EUR ___

KEY INSIGHTS
1. ___
2. ___
3. ___

ACTION ITEMS
1. ___
2. ___
```

### Automated Reporting
Consider setting up:
- Google Data Studio dashboard
- Weekly email reports via GA4
- Slack notifications for conversions

---

## Implementation Files Reference

| File | Purpose |
|------|---------|
| `/src/lib/analytics.ts` | Core analytics library |
| `/src/app/layout.tsx` | GA4 + Plausible scripts |
| `/src/app/page.tsx` | Homepage tracking |
| `/src/app/pricing/PricingTracker.tsx` | Pricing page tracking |
| `/src/components/AdminDashboard.tsx` | Analytics dashboard UI |
| `/src/app/admin/page.tsx` | Admin dashboard route |
| `/src/app/api/leads/capture/route.ts` | Lead storage + tracking |

---

## Privacy & Compliance

### Current Implementation
- Email hashing before storage (SHA-256)
- URL anonymization (sensitive params stripped)
- No raw PII in analytics events
- Plausible for GDPR-compliant tracking

### Recommended Additions
- [ ] Add cookie consent banner (if using GA4 in EU)
- [ ] Privacy policy update for analytics disclosure
- [ ] Data retention policy configuration in GA4

---

## Monitoring & Alerts

### Set Up in GA4:
1. **Real-time alerts** for:
   - Spike in traffic (viral potential)
   - Drop in conversions (broken funnel)
   - New traffic source (attribution)

2. **Custom alerts** for:
   - `payment_completed` > 10/day (scale alert)
   - Bounce rate > 60% (quality issue)
   - Avg session < 30s (engagement issue)

---

## Next Steps for Analytics Team

### This Week
1. Set up GA4 property with correct Measurement ID
2. Verify all events are firing in GA4 DebugView
3. Create first weekly report baseline
4. Set conversion goals

### This Month
1. Build Data Studio dashboard
2. Set up automated weekly reports
3. A/B testing framework integration
4. Attribution modeling review

### Quarterly
1. Funnel optimization analysis
2. Traffic source ROI analysis
3. User journey mapping
4. Cohort analysis setup

---

## Environment Variables Reference

Add these to your `.env.local` file:

```env
# Google Analytics 4
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Google Site Verification (for Search Console)
GOOGLE_SITE_VERIFICATION=your-verification-code

# Admin Dashboard Access
NEXT_PUBLIC_ADMIN_PASSWORD=your-secure-admin-password

# Admin API Key (for programmatic lead access)
ADMIN_API_KEY=your-secure-api-key-here
```

---

## Support & Resources

- **GA4 Documentation**: https://developers.google.com/analytics
- **Plausible Docs**: https://plausible.io/docs
- **Analytics Code**: `/src/lib/analytics.ts`
- **Dashboard**: `/src/components/AdminDashboard.tsx`
- **Admin Route**: `/src/app/admin/page.tsx`

---

*Last Updated: January 2025*
*Analytics Team - Inclusiv*
