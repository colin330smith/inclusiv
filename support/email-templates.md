# Inclusiv - Customer Support Email Templates

## Table of Contents
1. [Welcome/Onboarding](#1-welcomeonboarding)
2. [Scan Results Explanation](#2-scan-results-explanation)
3. [Technical Support](#3-technical-support)
4. [Pricing Questions](#4-pricing-questions)
5. [Feature Requests](#5-feature-requests)
6. [Common Issue Responses](#6-common-issue-responses)

---

## 1. Welcome/Onboarding

### Template 1A: Welcome - Free Trial Started

**Subject:** Welcome to Inclusiv - Let's Make Your Website Accessible

```
Hi [FIRST_NAME],

Welcome to Inclusiv! You've taken an important step toward making your website accessible to everyone.

Here's how to get the most out of your free trial:

1. RUN YOUR FIRST SCAN
   Head to https://tryinclusiv.com and enter your website URL. In seconds, you'll see exactly where your site stands on accessibility.

2. REVIEW YOUR RESULTS
   Your report will show:
   - Overall accessibility score
   - Critical issues to fix first
   - Step-by-step fix recommendations

3. START FIXING ISSUES
   Each issue includes clear guidance on how to resolve it. Start with Critical issues for the biggest impact.

4. RE-SCAN TO VERIFY
   After making fixes, scan again to see your improved score.

IMPORTANT DEADLINE: The European Accessibility Act (EAA) comes into effect June 28, 2025. Businesses serving EU customers must be compliant or face significant fines.

Need help understanding your results? Just reply to this email - our accessibility experts are here to help.

Best,
The Inclusiv Team

P.S. Your free trial includes [X] scans. Upgrade anytime to scan your entire site.
```

---

### Template 1B: Welcome - Paid Plan Activated

**Subject:** You're All Set! Welcome to Inclusiv [PLAN_NAME]

```
Hi [FIRST_NAME],

Thank you for choosing Inclusiv [PLAN_NAME]! Your account is now active and ready to help you achieve accessibility compliance.

YOUR PLAN INCLUDES:
- [X] pages per scan
- Unlimited scans
- Exportable reports (CSV, PDF)
- [Priority/Standard] support
- Team collaboration features

GETTING STARTED:

1. Scan Your Site: https://tryinclusiv.com/dashboard
   Enter your homepage URL to scan your entire site automatically.

2. Review & Prioritize
   We'll rank issues by impact so you know exactly where to start.

3. Track Progress
   Your dashboard shows compliance progress over time.

4. Export & Share
   Generate reports for your development team or stakeholders.

QUICK TIPS:
- Schedule regular scans to catch new issues
- Use our CSV export to import issues into Jira/Asana
- Re-scan after each deployment

As a [PLAN_NAME] customer, you have access to [priority/dedicated] support. Just reply to this email anytime.

Your accessibility journey starts now!

Best,
The Inclusiv Team

---
Billing: You'll be charged $[AMOUNT] on [BILLING_DATE] each [month/year].
Manage your subscription: https://tryinclusiv.com/settings/billing
```

---

## 2. Scan Results Explanation

### Template 2A: First Scan Results

**Subject:** Your Inclusiv Scan Results Are Ready

```
Hi [FIRST_NAME],

Great news - your accessibility scan for [WEBSITE_URL] is complete!

YOUR RESULTS AT A GLANCE:
- Accessibility Score: [SCORE]/100
- Critical Issues: [X]
- Warnings: [X]
- Passed Checks: [X]

WHAT THIS MEANS:

[IF SCORE >= 80]
Your website is in good shape! You have a few items to address, but you're well on your way to full compliance.
[/IF]

[IF SCORE 50-79]
Your website has some accessibility gaps that need attention. The good news? Most issues have straightforward fixes.
[/IF]

[IF SCORE < 50]
Your website needs significant accessibility work before June 2025. Don't worry - we've prioritized exactly what to fix first.
[/IF]

TOP 3 ISSUES TO FIX FIRST:
1. [ISSUE_1] - [BRIEF_DESCRIPTION]
2. [ISSUE_2] - [BRIEF_DESCRIPTION]
3. [ISSUE_3] - [BRIEF_DESCRIPTION]

View your full report: [REPORT_LINK]

Each issue includes step-by-step instructions to fix it. Start with Critical issues - they have the biggest impact on accessibility and compliance.

NEXT STEPS:
1. Share this report with your development team
2. Address Critical issues first
3. Re-scan after fixes to verify improvements

Questions about your results? Reply to this email and our team will help you understand and prioritize.

Best,
The Inclusiv Team

---
EAA Deadline: June 28, 2025 - [X] days remaining
```

---

### Template 2B: Improved Score Notification

**Subject:** Your Accessibility Score Improved!

```
Hi [FIRST_NAME],

Your latest scan shows real progress!

SCORE CHANGE: [OLD_SCORE] -> [NEW_SCORE] (+[IMPROVEMENT] points)

ISSUES RESOLVED:
- [X] Critical issues fixed
- [X] Warnings addressed

REMAINING ITEMS:
- [X] Critical issues
- [X] Warnings

[IF NEW_SCORE >= 90]
Excellent work! You're in the top tier of accessibility compliance. Keep it up!
[/IF]

[IF NEW_SCORE >= 70 AND NEW_SCORE < 90]
Great progress! A few more fixes and you'll be fully compliant.
[/IF]

Keep the momentum going. Here's what to tackle next:
1. [NEXT_ISSUE_1]
2. [NEXT_ISSUE_2]

View full report: [REPORT_LINK]

You're making your website better for everyone. Keep up the great work!

Best,
The Inclusiv Team
```

---

## 3. Technical Support

### Template 3A: General Technical Issue

**Subject:** RE: [ORIGINAL_SUBJECT]

```
Hi [FIRST_NAME],

Thank you for reaching out about [BRIEF_ISSUE_SUMMARY].

I understand you're experiencing [DESCRIBE_ISSUE]. Let me help you resolve this.

[SOLUTION/EXPLANATION]

If you'd like me to walk you through this:
1. [STEP_1]
2. [STEP_2]
3. [STEP_3]

[IF APPLICABLE]
I've also attached/linked some resources that may help:
- [RESOURCE_1]
- [RESOURCE_2]
[/IF]

Please let me know if this resolves your issue or if you need any clarification. I'm happy to hop on a quick call if that would be easier.

Best,
[SUPPORT_NAME]
Inclusiv Support Team
```

---

### Template 3B: Scanner Not Working

**Subject:** RE: Scanner Issue - Let's Get This Working

```
Hi [FIRST_NAME],

Sorry to hear you're having trouble with the scanner. Let's troubleshoot this together.

COMMON CAUSES & SOLUTIONS:

1. WEBSITE BLOCKS CRAWLERS
   Some websites block automated tools. Check if your site has:
   - Cloudflare or similar protection (whitelist our IPs if possible)
   - robots.txt blocking crawlers
   - Geographic restrictions

2. PAGE REQUIRES LOGIN
   Our scanner can only access publicly available pages. For password-protected content, we recommend:
   - Scanning a staging environment with authentication disabled
   - Using our API with custom headers (Enterprise plan)

3. JAVASCRIPT-HEAVY SITE
   If your site relies heavily on JavaScript:
   - Our scanner waits for page load, but some content may not render
   - Try scanning specific pages directly rather than the homepage

4. TIMEOUT ISSUES
   Very large or slow-loading pages may timeout. Try:
   - Scanning individual pages instead of the full site
   - Checking your server performance

CAN YOU SHARE:
- The exact URL you're trying to scan
- Any error message you see
- A screenshot if possible

This will help me identify the specific issue and get you scanning quickly.

Best,
[SUPPORT_NAME]
Inclusiv Support Team
```

---

### Template 3C: Help Understanding Specific Issue

**Subject:** RE: Understanding [ISSUE_TYPE] Issues

```
Hi [FIRST_NAME],

Great question about [ISSUE_TYPE]. Let me explain what this means and how to fix it.

WHAT IS [ISSUE_TYPE]?
[PLAIN_LANGUAGE_EXPLANATION]

WHY IT MATTERS:
[ACCESSIBILITY_IMPACT - who it affects and how]

HOW TO FIX IT:

Before (problematic):
```
[CODE_EXAMPLE_BEFORE]
```

After (accessible):
```
[CODE_EXAMPLE_AFTER]
```

STEP-BY-STEP:
1. [STEP_1]
2. [STEP_2]
3. [STEP_3]

TESTING YOUR FIX:
- Re-scan the page with Inclusiv
- Test with keyboard navigation (Tab key)
- [ADDITIONAL_TEST_METHOD]

HELPFUL RESOURCES:
- WCAG Guidelines: [RELEVANT_WCAG_LINK]
- WebAIM Article: [RELEVANT_ARTICLE]

After making the fix, run another scan and you should see this issue resolved.

Let me know if you need any clarification!

Best,
[SUPPORT_NAME]
Inclusiv Support Team
```

---

## 4. Pricing Questions

### Template 4A: Plan Comparison

**Subject:** RE: Which Inclusiv Plan Is Right For Me?

```
Hi [FIRST_NAME],

Thanks for your interest in Inclusiv! Let me help you find the right plan.

Based on what you've shared ([THEIR_SITUATION]), here's my recommendation:

QUICK COMPARISON:

| Feature | Starter ($99/mo) | Professional ($299/mo) | Enterprise |
|---------|------------------|------------------------|------------|
| Pages | 100 | 1,000 | Unlimited |
| Scans | Unlimited | Unlimited | Unlimited |
| Support | Email (24hr) | Priority (4hr) | Dedicated |
| Team Members | 1 | 5 | Unlimited |
| API Access | No | Yes | Yes |
| Custom Reports | No | Yes | Yes |

MY RECOMMENDATION:
[PERSONALIZED_RECOMMENDATION_BASED_ON_THEIR_NEEDS]

[IF THEY MENTIONED BUDGET CONCERNS]
All plans include a 14-day free trial with no credit card required. You can also save 17% with annual billing (2 months free).
[/IF]

[IF THEY HAVE MULTIPLE SITES]
For multiple websites, our Professional or Enterprise plans are most cost-effective. Let me know how many sites you need to cover and I can provide a custom quote.
[/IF]

Want to start with a free trial? Sign up here: https://tryinclusiv.com/signup

Happy to answer any other questions!

Best,
[SUPPORT_NAME]
Inclusiv Team
```

---

### Template 4B: Enterprise Inquiry

**Subject:** RE: Enterprise Plan Inquiry

```
Hi [FIRST_NAME],

Thank you for your interest in Inclusiv Enterprise! I'd love to learn more about your needs.

ENTERPRISE INCLUDES:
- Unlimited pages and scans
- Dedicated support with SLA
- Custom integrations (API, CI/CD, SSO)
- Advanced reporting and analytics
- Team management with role-based access
- Compliance documentation for audits
- Quarterly accessibility reviews

TO PROVIDE AN ACCURATE QUOTE, CAN YOU SHARE:
1. Approximately how many websites/pages need scanning?
2. How many team members need access?
3. Any specific integrations required (Jira, GitHub, etc.)?
4. Timeline - when do you need to be compliant?
5. Any specific compliance requirements (beyond WCAG 2.1 AA)?

I'm happy to schedule a call to discuss your requirements in detail and provide a custom proposal.

Available times this week:
- [DATE/TIME_1]
- [DATE/TIME_2]
- [DATE/TIME_3]

Or book directly: [CALENDLY_LINK]

Looking forward to helping you achieve accessibility compliance!

Best,
[SUPPORT_NAME]
Inclusiv Team
```

---

### Template 4C: Discount Request

**Subject:** RE: Discount Request

```
Hi [FIRST_NAME],

Thank you for reaching out about pricing.

[IF ELIGIBLE FOR DISCOUNT]
Great news! I can offer you [DISCOUNT_TYPE]:

- Annual billing: Save 17% (2 months free)
- [Non-profit discount: 25% off any plan]
- [Startup discount: 50% off first 3 months]

To apply this discount, [INSTRUCTIONS].
[/IF]

[IF NOT ELIGIBLE BUT WANT TO HELP]
While we don't currently have a discount that applies to your situation, here are some options:

1. START WITH STARTER ($99/mo)
   Great for most small-medium websites. You can always upgrade later.

2. ANNUAL BILLING
   Save 17% - that's 2 months free on any plan.

3. FREE TRIAL
   Try any plan free for 14 days, no credit card required.
[/IF]

[IF NON-PROFIT/EDUCATION]
We offer special pricing for non-profits and educational institutions. Can you share:
- Organization name
- Non-profit status documentation (501c3 or equivalent)
- Approximate number of pages to scan

I'll get back to you with a custom quote within 24 hours.
[/IF]

Let me know how I can help you get started!

Best,
[SUPPORT_NAME]
Inclusiv Team
```

---

## 5. Feature Requests

### Template 5A: Feature Request Acknowledgment

**Subject:** RE: Feature Request - [FEATURE_NAME]

```
Hi [FIRST_NAME],

Thank you for sharing your idea for [FEATURE_NAME]! We love hearing from customers about how we can improve.

I've logged your request with our product team. Here's the status:

[IF FEATURE ON ROADMAP]
Great news - this feature is already on our roadmap! While I can't share exact timelines, we're actively working on it and expect to release it in [Q1/Q2/Q3/Q4 2025].

I've added you to the notification list - you'll be the first to know when it's available.
[/IF]

[IF FEATURE BEING CONSIDERED]
This is a great suggestion and aligns with feedback from other customers. I've shared it with our product team for consideration in our upcoming planning cycle.

While I can't guarantee if or when this will be built, your input directly shapes our roadmap.
[/IF]

[IF FEATURE NOT PLANNED]
Thank you for this suggestion. While this specific feature isn't currently on our roadmap, we regularly review customer feedback to prioritize development.

In the meantime, here's a workaround that might help:
[WORKAROUND_SUGGESTION]
[/IF]

Is there anything else you'd like to see in Inclusiv? We're always looking for ways to better serve your accessibility needs.

Best,
[SUPPORT_NAME]
Inclusiv Team
```

---

### Template 5B: Feature Released Notification

**Subject:** The Feature You Requested Is Here!

```
Hi [FIRST_NAME],

Remember when you asked about [FEATURE_NAME]? It's here!

WHAT'S NEW:
[FEATURE_DESCRIPTION]

HOW TO USE IT:
1. [STEP_1]
2. [STEP_2]
3. [STEP_3]

This feature is available now in your [PLAN_NAME] plan.

Log in to try it: https://tryinclusiv.com/dashboard

Thank you for helping shape Inclusiv. Your feedback makes our product better for everyone.

Have more ideas? We're all ears - just reply to this email.

Best,
The Inclusiv Team
```

---

## 6. Common Issue Responses

### Template 6A: Password Reset

**Subject:** Password Reset for Your Inclusiv Account

```
Hi [FIRST_NAME],

We received a request to reset your password.

Click here to reset your password:
[RESET_LINK]

This link expires in 24 hours.

If you didn't request this reset, you can safely ignore this email. Your password will remain unchanged.

Need help? Reply to this email.

Best,
The Inclusiv Team

---
For security, we'll never ask for your password via email.
```

---

### Template 6B: Account Cancellation

**Subject:** We're Sorry to See You Go

```
Hi [FIRST_NAME],

Your Inclusiv [PLAN_NAME] subscription has been cancelled as requested.

WHAT HAPPENS NEXT:
- Your access continues until [END_DATE]
- After that, your account reverts to free tier
- Your scan history remains available
- You can resubscribe anytime

We'd love to learn from your experience. Would you mind sharing why you decided to cancel? Your feedback helps us improve.

[ ] Too expensive
[ ] Didn't meet my needs
[ ] Switched to another solution
[ ] Project completed
[ ] Other: _______________

Reply with your feedback or schedule a quick call: [CALENDLY_LINK]

If there's anything we could have done differently, please let us know.

Best,
[SUPPORT_NAME]
Inclusiv Team

P.S. Changed your mind? Reactivate anytime at https://tryinclusiv.com/settings/billing
```

---

### Template 6C: Refund Confirmation

**Subject:** Your Refund Has Been Processed

```
Hi [FIRST_NAME],

We've processed your refund as requested.

REFUND DETAILS:
- Amount: $[AMOUNT]
- Original Payment: [DATE]
- Refund Method: [PAYMENT_METHOD]
- Expected Arrival: 5-10 business days

Your account has been adjusted accordingly.

We're sorry Inclusiv wasn't the right fit. If you have any feedback on how we could improve, we'd genuinely appreciate hearing it.

Best,
[SUPPORT_NAME]
Inclusiv Team
```

---

## Template Usage Notes

**Variables to Replace:**
- [FIRST_NAME] - Customer's first name
- [WEBSITE_URL] - Their website
- [SCORE] - Accessibility score
- [PLAN_NAME] - Their subscription plan
- [SUPPORT_NAME] - Support team member name
- [DATE] - Relevant dates
- [AMOUNT] - Dollar amounts
- [LINKS] - Relevant URLs

**Tone Guidelines:**
- Friendly but professional
- Empathetic to their frustration
- Clear and actionable
- Avoid jargon unless explaining it
- Always offer next steps

**Response Time Targets:**
- Free users: Within 24 business hours
- Starter: Within 24 business hours
- Professional: Within 4 business hours
- Enterprise: Within 1 business hour (SLA)

---

*Last Updated: January 2025*
