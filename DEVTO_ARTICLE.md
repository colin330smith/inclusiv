# The European Accessibility Act Just Went Into Effect - Here's What Developers Need to Know

The European Accessibility Act (EAA) deadline was June 28, 2025. If your website or web application serves EU customers, you now need to be WCAG 2.1 AA compliant or face fines up to EUR 100,000.

I built a free tool to help developers check and fix accessibility issues: [tryinclusiv.com](https://tryinclusiv.com)

## What is the EAA?

The European Accessibility Act is EU-wide legislation requiring digital products and services to be accessible to people with disabilities. Unlike previous guidelines, this one has teeth:

- **Fines up to EUR 100,000** per violation
- **Mandatory remediation orders** forcing you to fix issues
- **Market removal** in extreme cases

## Who does it apply to?

If you meet **any** of these criteria, you're likely covered:

- Your company has 10+ employees OR revenue above EUR 2 million
- You sell products or services to EU customers online
- You have an e-commerce site accessible from the EU
- You're a SaaS company with EU users

## What's actually required?

The EAA maps to WCAG 2.1 Level AA. Here are the most common violations I see:

### 1. Missing alt text on images
```html
<!-- Bad -->
<img src="product.jpg">

<!-- Good -->
<img src="product.jpg" alt="Blue running shoes, side view">
```

### 2. Insufficient color contrast
Text needs a contrast ratio of at least 4.5:1 against its background. Tools like WebAIM's contrast checker help, but my scanner will tell you the exact hex codes to use.

### 3. Form inputs without labels
```html
<!-- Bad -->
<input type="email" placeholder="Email">

<!-- Good -->
<label for="email">Email address</label>
<input type="email" id="email" placeholder="you@example.com">
```

### 4. Non-keyboard accessible elements
```javascript
// Bad - only works with mouse
<div onclick="doSomething()">Click me</div>

// Good - works with keyboard too
<button onclick="doSomething()">Click me</button>
```

### 5. Missing skip links
Screen reader users shouldn't have to tab through your entire nav on every page.

```html
<a href="#main-content" class="skip-link">Skip to main content</a>
```

## Why I built a free scanner

Most accessibility tools give you cryptic messages like "WCAG 2.1.1 Keyboard - Fail" and leave you to figure it out.

I wanted something that:
- Shows the **exact element** with the issue
- Explains **why it matters** for real users
- Gives you **copy-paste code** to fix it

No signup required. Just enter your URL and get instant results.

## Try it now

Go to [tryinclusiv.com](https://tryinclusiv.com), enter your site URL, and see your accessibility score in 30 seconds.

I'd love feedback from the dev community:
1. What accessibility issues trip you up most?
2. What features would make this more useful?

---

*I'm building this in public. Follow along or reach out if you have questions about EAA compliance.*
