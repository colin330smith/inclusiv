# Inclusiv Conversion Funnel Documentation

## Overview

This document outlines the conversion funnel for Inclusiv, including tracked events, expected conversion rates, and optimization strategies.

## Funnel Stages

### Stage 1: Landing Page View (100% baseline)
**Event:** `page_view`
**Description:** User lands on the homepage
**Target:** All visitors

### Stage 2: Scan Started (Expected: 15-25%)
**Event:** `scan_started`
**Description:** User enters a URL and clicks "Check Compliance Now"
**Key Metrics:**
- URL entered
- Source (homepage, pricing page, etc.)

**Optimization Levers:**
- Urgency messaging (EAA deadline countdown)
- Social proof (X sites scanned)
- Value proposition clarity
- CTA button prominence

### Stage 3: Scan Completed (Expected: 12-20%)
**Event:** `scan_completed`
**Description:** Scan finishes successfully and shows results
**Key Metrics:**
- Score (0-100)
- Issues count
- Critical issues
- Platform detected
- Scan duration (ms)

**Potential Drop-offs:**
- Scan failures (server errors)
- Timeouts (long scans)
- Invalid URLs

### Stage 4: Email Captured (Expected: 8-15%)
**Event:** `email_captured`
**Description:** User submits email for full report
**Key Metrics:**
- Email (hashed for privacy)
- Source/location of capture
- Associated scan score

**Optimization Levers:**
- Report value proposition
- Urgency (EAA deadline)
- Trust indicators
- Blurred content preview (FOMO)

### Stage 5: Pricing Viewed (Expected: 5-10%)
**Event:** `pricing_viewed`
**Description:** User navigates to pricing page
**Key Metrics:**
- Referrer page
- Plan interest (if any)

**Optimization Levers:**
- Clear pricing link visibility
- Value-based messaging
- Plan comparison clarity

### Stage 6: Checkout Initiated (Expected: 2-5%)
**Event:** `checkout_initiated`
**Description:** User clicks to start a paid plan trial/purchase
**Key Metrics:**
- Plan name
- Plan price
- Currency

**Optimization Levers:**
- Free trial availability
- Money-back guarantee
- Social proof on pricing page
- Clear feature comparison

### Stage 7: Payment Completed (Expected: 1-3%)
**Event:** `payment_completed`
**Description:** User completes payment successfully
**Key Metrics:**
- Plan name
- Revenue amount
- Transaction ID

**Success Indicators:**
- Confirmation email sent
- Account created
- Onboarding started

---

## Funnel Visualization

```
Landing Page View (100%)
        |
        v
  Scan Started (20%)
        |
        v
 Scan Completed (16%)
        |
        v
 Email Captured (10%)
        |
        v
 Pricing Viewed (7%)
        |
        v
Checkout Initiated (3%)
        |
        v
Payment Completed (2%)
```

---

## Key Performance Indicators (KPIs)

### Primary KPIs
1. **Visitor-to-Scan Rate:** % of visitors who start a scan
   - Target: >20%
   - Current benchmark: ~18-22%

2. **Scan-to-Email Rate:** % of completed scans that capture email
   - Target: >50%
   - Current benchmark: ~45-55%

3. **Email-to-Pricing Rate:** % of captured emails that view pricing
   - Target: >30%
   - Current benchmark: ~25-35%

4. **Pricing-to-Checkout Rate:** % of pricing viewers who start checkout
   - Target: >15%
   - Current benchmark: ~12-18%

5. **Checkout-to-Payment Rate:** % of checkouts that complete payment
   - Target: >60%
   - Current benchmark: ~55-65%

### Secondary KPIs
- Average time on page
- Scroll depth (25%, 50%, 75%, 90%)
- Bounce rate
- Return visitor rate
- Feature engagement rate

---

## Tracked Events Summary

| Event | Category | Priority |
|-------|----------|----------|
| `page_view` | Engagement | High |
| `scan_started` | Engagement | Critical |
| `scan_completed` | Engagement | Critical |
| `email_captured` | Conversion | Critical |
| `pricing_viewed` | Conversion | High |
| `checkout_initiated` | Conversion | Critical |
| `payment_completed` | Conversion | Critical |
| `button_click` | Engagement | Medium |
| `feature_click` | Engagement | Medium |
| `cta_click` | Engagement | High |
| `scroll_depth` | Engagement | Low |
| `time_on_page` | Engagement | Low |

---

## Analytics Implementation

### Google Analytics 4 (GA4)
- Measurement ID: `G-XXXXXXX` (replace with actual ID)
- Enhanced measurement enabled
- Custom dimensions configured

### Plausible Analytics
- Privacy-friendly backup
- Cookie-free tracking
- Domain: inclusiv-xi.vercel.app

### Event Properties
All events include:
- Timestamp
- Page URL
- User agent
- Screen dimensions
- Referrer (when available)

---

## Optimization Roadmap

### Short-term (1-2 weeks)
1. A/B test hero headline variations
2. Test different CTA button colors/text
3. Optimize scan loading experience
4. Add more social proof elements

### Medium-term (1-2 months)
1. Implement exit-intent email capture
2. Add personalized scan insights
3. Create platform-specific landing pages
4. Develop retargeting campaigns

### Long-term (3+ months)
1. Build recommendation engine
2. Implement predictive lead scoring
3. Develop enterprise demo flow
4. Create partner referral tracking

---

## Dashboard Access

The admin dashboard is available at:
- Component: `/src/components/AdminDashboard.tsx`
- Import: `import AdminDashboard from "@/components/AdminDashboard"`

The dashboard displays:
- Key metrics with trend indicators
- Conversion funnel visualization
- Top CTA performance
- Live event feed
- Time range filtering (24h, 7d, 30d, 90d)

---

## Notes

- All email addresses are hashed (SHA-256) before tracking for privacy compliance
- URLs are anonymized (query params stripped) before tracking
- GDPR/privacy compliance: Using cookie-free Plausible as backup
- GA4 configured with SameSite=None;Secure cookie flags
