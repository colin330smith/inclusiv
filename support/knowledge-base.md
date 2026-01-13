# Inclusiv Knowledge Base

## Quick Navigation

1. [Getting Started](#getting-started)
2. [Understanding Accessibility](#understanding-accessibility)
3. [Using the Scanner](#using-the-scanner)
4. [Reading Your Results](#reading-your-results)
5. [Fixing Common Issues](#fixing-common-issues)
6. [Account Management](#account-management)
7. [Troubleshooting](#troubleshooting)

---

# Getting Started

## Creating Your Account

1. Visit https://tryinclusiv.com
2. Click "Start Free Scan" or "Sign Up"
3. Enter your email address
4. Create a password (minimum 8 characters)
5. Verify your email address
6. You're ready to scan!

**No credit card required** for free tier or trial.

---

## Running Your First Scan

### Step 1: Enter Your URL
- Go to https://tryinclusiv.com
- Paste your website URL in the scanner input
- Click "Scan Now"

### Step 2: Wait for Analysis
- Our AI analyzes your page in 15-30 seconds
- We check 50+ accessibility criteria
- You'll see a progress indicator

### Step 3: View Results
- Overall accessibility score (0-100)
- Critical issues (must fix)
- Warnings (should fix)
- Passed checks

### Tips for Best Results
- Scan your homepage first for an overview
- Scan key pages (contact, pricing, signup)
- Re-scan after making fixes

---

## Understanding Your Dashboard

**Dashboard Features:**

- **Recent Scans**: History of all your scans
- **Score Trends**: Track improvement over time
- **Issue Summary**: Overview of all issues found
- **Quick Actions**: Re-scan, export, share

**Navigation:**
- Home: Dashboard overview
- Scans: Full scan history
- Reports: Download/export options
- Settings: Account preferences

---

# Understanding Accessibility

## What is Web Accessibility?

Web accessibility means designing websites that everyone can use, including people with:

- **Visual impairments**: Blindness, low vision, color blindness
- **Hearing impairments**: Deafness, hard of hearing
- **Motor impairments**: Limited mobility, tremors
- **Cognitive impairments**: Dyslexia, ADHD, memory issues

**Why it matters:**
- 15% of the world's population has a disability
- Accessibility benefits everyone (mobile users, elderly, temporary injuries)
- It's increasingly required by law

---

## WCAG 2.1 AA Explained

**WCAG = Web Content Accessibility Guidelines**

These guidelines are organized into four principles (POUR):

### Perceivable
Content must be presentable in ways all users can perceive.
- Text alternatives for images
- Captions for videos
- Sufficient color contrast
- Resizable text

### Operable
Interface must be navigable by all users.
- Keyboard accessible
- Enough time to read content
- No seizure-triggering content
- Clear navigation

### Understandable
Content must be readable and predictable.
- Readable text
- Predictable behavior
- Input assistance
- Error identification

### Robust
Content must work with assistive technologies.
- Valid HTML
- Name, role, value for custom controls
- Status messages

---

## The European Accessibility Act (EAA)

### What is the EAA?
A European Union directive requiring digital products and services to be accessible to people with disabilities.

### Who must comply?
Businesses that:
- Sell to EU customers
- Operate websites accessible from EU
- Provide digital services in EU market

### Deadline
**June 28, 2025** - Full enforcement begins

### Penalties for Non-Compliance
- Fines up to €100,000+ per violation
- Legal action from consumers
- Market access restrictions
- Reputational damage

### What's Required
- WCAG 2.1 AA compliance
- Accessible documents (PDFs, forms)
- Accessible e-commerce
- Accessible customer service

---

## Other Accessibility Laws

### United States
- **ADA (Americans with Disabilities Act)**: Applies to public accommodations
- **Section 508**: Applies to federal agencies and contractors
- **State laws**: California, New York have additional requirements

### United Kingdom
- **Equality Act 2010**: Prohibits discrimination
- **Public Sector Bodies Regulations**: Specific web requirements

### Canada
- **AODA (Ontario)**: Provincial requirements
- **ACA (Accessible Canada Act)**: Federal requirements

### Australia
- **DDA (Disability Discrimination Act)**: National requirements

---

# Using the Scanner

## How the Scanner Works

1. **URL Input**: You provide your website URL
2. **Page Fetch**: We load your page like a browser
3. **DOM Analysis**: We examine the page structure
4. **Criteria Testing**: We test 50+ WCAG criteria
5. **Issue Detection**: We identify problems
6. **Report Generation**: We create actionable results

**What we check:**
- HTML structure and semantics
- Color contrast ratios
- Image alt text
- Form accessibility
- Keyboard navigation
- ARIA attributes
- And much more...

---

## Scanning Multiple Pages

### Free Tier
- 1 page per scan
- Good for testing

### Paid Plans
- Automatic page discovery
- Crawls your entire site
- Respects robots.txt

### How Multi-Page Scanning Works
1. Start with your homepage URL
2. Our crawler discovers linked pages
3. Each page is analyzed individually
4. Results are aggregated in your report

### Limiting Scan Scope
- Scan specific sections: `example.com/blog/`
- Scan individual pages: `example.com/contact`
- Use sitemap for custom selection (Enterprise)

---

## Scan Frequency Recommendations

| Website Type | Recommended Frequency |
|-------------|----------------------|
| Static site (rare updates) | Monthly |
| Blog/content site | Weekly |
| E-commerce | After each deployment |
| Web application | Daily (CI/CD integration) |

**Pro tip:** Set up automated scans after each deployment to catch issues early.

---

# Reading Your Results

## Accessibility Score

Your score is calculated based on:
- Number of issues found
- Severity of issues
- Percentage of elements passing
- Coverage of WCAG criteria

**Score Ranges:**
- **90-100**: Excellent - Minor improvements needed
- **70-89**: Good - Some issues to address
- **50-69**: Needs Work - Significant issues
- **0-49**: Critical - Major accessibility barriers

---

## Issue Categories

### Critical Issues
**Must fix** - These create significant barriers:
- Missing alt text on important images
- Insufficient color contrast
- Missing form labels
- Keyboard traps
- Missing page language

### Warnings
**Should fix** - These impact usability:
- Poor heading structure
- Missing skip links
- Unclear link text
- Missing focus indicators

### Notices
**Consider fixing** - Best practices:
- Redundant ARIA
- Suboptimal structure
- Minor improvements

---

## Understanding Individual Issues

Each issue includes:

**1. Issue Title**
Brief description of the problem

**2. WCAG Reference**
Which guideline is affected (e.g., "1.1.1 Non-text Content")

**3. Element Location**
Exactly where on the page (with CSS selector)

**4. Why It Matters**
Who is affected and how

**5. How to Fix**
Step-by-step instructions

**6. Code Examples**
Before/after code snippets

---

## Exporting Reports

### Available Formats

**PDF Report**
- Executive summary
- Visual charts
- Full issue list
- Ideal for stakeholders

**CSV Export**
- Spreadsheet format
- All issue details
- Import to Jira/Asana
- Ideal for developers

**JSON Export** (Professional+)
- API-friendly format
- Integration ready
- Programmatic access

---

# Fixing Common Issues

## Missing Alt Text

**Issue:** Images without alternative text
**Impact:** Screen reader users cannot understand images
**WCAG:** 1.1.1 Non-text Content

**How to Fix:**

Before:
```html
<img src="product.jpg">
```

After:
```html
<img src="product.jpg" alt="Blue wireless headphones on wooden desk">
```

**Tips:**
- Describe the image's purpose, not just appearance
- For decorative images, use empty alt: `alt=""`
- Keep descriptions under 125 characters
- Don't start with "Image of..." or "Picture of..."

---

## Insufficient Color Contrast

**Issue:** Text color too similar to background
**Impact:** Hard to read for low vision and color blind users
**WCAG:** 1.4.3 Contrast (Minimum)

**Requirements:**
- Normal text: 4.5:1 ratio minimum
- Large text (18pt+ or 14pt+ bold): 3:1 ratio minimum

**How to Fix:**

Before:
```css
color: #999999;
background: #ffffff;
/* Contrast ratio: 2.85:1 - FAIL */
```

After:
```css
color: #595959;
background: #ffffff;
/* Contrast ratio: 7:1 - PASS */
```

**Tools:**
- WebAIM Contrast Checker
- Inclusiv suggests compliant colors

---

## Missing Form Labels

**Issue:** Form inputs without associated labels
**Impact:** Screen reader users don't know what to enter
**WCAG:** 1.3.1 Info and Relationships

**How to Fix:**

Before:
```html
<input type="email" placeholder="Email">
```

After:
```html
<label for="email">Email Address</label>
<input type="email" id="email" placeholder="you@example.com">
```

**Alternative (visually hidden label):**
```html
<label for="email" class="sr-only">Email Address</label>
<input type="email" id="email" placeholder="Email">
```

---

## Missing Page Language

**Issue:** HTML document missing lang attribute
**Impact:** Screen readers can't pronounce content correctly
**WCAG:** 3.1.1 Language of Page

**How to Fix:**

Before:
```html
<html>
```

After:
```html
<html lang="en">
```

**Common language codes:**
- `en` - English
- `es` - Spanish
- `fr` - French
- `de` - German
- `zh` - Chinese

---

## Poor Heading Structure

**Issue:** Headings skip levels (h1 to h3)
**Impact:** Confuses screen reader navigation
**WCAG:** 1.3.1 Info and Relationships

**How to Fix:**

Before:
```html
<h1>Main Title</h1>
<h3>Section Title</h3>  <!-- Skipped h2! -->
<h4>Subsection</h4>
```

After:
```html
<h1>Main Title</h1>
<h2>Section Title</h2>
<h3>Subsection</h3>
```

**Rules:**
- One h1 per page (usually)
- Don't skip levels
- Use for structure, not styling

---

## Missing Focus Indicators

**Issue:** Interactive elements don't show focus state
**Impact:** Keyboard users can't see where they are
**WCAG:** 2.4.7 Focus Visible

**How to Fix:**

Don't do this:
```css
*:focus {
    outline: none;  /* NEVER remove focus without replacement */
}
```

Do this:
```css
button:focus,
a:focus {
    outline: 2px solid #0066cc;
    outline-offset: 2px;
}
```

**Better approach:**
```css
:focus-visible {
    outline: 2px solid #0066cc;
    outline-offset: 2px;
}
```

---

## Empty Links/Buttons

**Issue:** Clickable elements with no text
**Impact:** Screen readers announce "link" or "button" with no context
**WCAG:** 2.4.4 Link Purpose

**How to Fix:**

Before:
```html
<a href="/cart"><i class="icon-cart"></i></a>
```

After:
```html
<a href="/cart">
    <i class="icon-cart" aria-hidden="true"></i>
    <span class="sr-only">Shopping Cart</span>
</a>
```

Or with aria-label:
```html
<a href="/cart" aria-label="Shopping Cart">
    <i class="icon-cart" aria-hidden="true"></i>
</a>
```

---

# Account Management

## Upgrading Your Plan

1. Log in to your dashboard
2. Go to Settings > Billing
3. Click "Upgrade Plan"
4. Select your new plan
5. Enter payment information
6. Confirm upgrade

**Upgrade is immediate** - new features available instantly.

---

## Changing Payment Method

1. Go to Settings > Billing
2. Click "Payment Methods"
3. Add new card
4. Set as default
5. Remove old card (optional)

**Accepted:** Visa, Mastercard, American Express

---

## Downloading Invoices

1. Go to Settings > Billing
2. Click "Invoice History"
3. Click download icon for any invoice
4. PDF downloads automatically

---

## Cancelling Your Subscription

1. Go to Settings > Billing
2. Click "Cancel Subscription"
3. Select reason (optional)
4. Confirm cancellation

**Note:**
- Access continues until billing period ends
- Data is retained for 30 days
- You can reactivate anytime

---

# Troubleshooting

## Scanner Not Working

**Common causes and solutions:**

### Website Blocks Crawlers
- Check if Cloudflare/security blocks our scanner
- Whitelist our IP ranges
- Check robots.txt for blocks

### JavaScript-Heavy Sites
- Some dynamic content may not render
- Try scanning specific pages
- Contact support for JS-heavy sites

### Timeout Errors
- Large pages may timeout
- Try scanning smaller sections
- Check your server performance

### Authentication Required
- We can only scan public pages
- Use a staging environment
- Enterprise plan supports custom headers

---

## Results Not Accurate

If you believe results are incorrect:

1. **Re-scan**: Clear browser cache, try again
2. **Check the element**: Verify the CSS selector matches
3. **Dynamic content**: Content loaded after page load may not be captured
4. **Report false positive**: Contact support with details

---

## Account Access Issues

### Forgot Password
1. Click "Forgot Password" on login
2. Enter your email
3. Check inbox (and spam)
4. Click reset link
5. Create new password

### Account Locked
- After 5 failed attempts, account locks for 30 minutes
- Wait or contact support

### Email Verification
- Check spam/junk folders
- Click "Resend verification" on login page
- Contact support if still not received

---

## Contact Support

**Still need help?**

**Email:** support@tryinclusiv.com
**Response time:** Within 24 hours (faster for paid plans)

**Include in your message:**
- Your account email
- Website URL
- Description of the issue
- Screenshots if applicable

---

*Knowledge Base Version: 1.0*
*Last Updated: January 2025*
