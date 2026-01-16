# QUICK WIN GUIDE
Send to leads after they express interest - shows immediate value

---

## TOP 5 ACCESSIBILITY FIXES (Most Common Issues)

### 1. Missing Alt Text on Images
**Impact:** Screen reader users can't understand images

**The Fix:**
```html
<!-- Bad -->
<img src="product.jpg">

<!-- Good -->
<img src="product.jpg" alt="Blue running shoes, side view">
```

**Quick Action:**
- Run through all product images
- Add descriptive alt text
- For decorative images, use `alt=""`

---

### 2. Low Color Contrast
**Impact:** Text hard to read for low vision users

**The Fix:**
- Text should have 4.5:1 contrast ratio with background
- Large text (18px+ or 14px+ bold): 3:1 minimum

**Tool:** Use contrast checker: webaim.org/resources/contrastchecker/

**Quick Action:**
```css
/* Bad */
color: #999; /* light gray on white */

/* Good */
color: #595959; /* darker gray that passes */
```

---

### 3. Missing Form Labels
**Impact:** Screen reader users can't fill out forms

**The Fix:**
```html
<!-- Bad -->
<input type="email" placeholder="Email">

<!-- Good -->
<label for="email">Email Address</label>
<input type="email" id="email" placeholder="you@example.com">
```

**Quick Action:**
- Add `<label>` to every form field
- Connect with `for` and `id` attributes

---

### 4. Keyboard Navigation Issues
**Impact:** Users who can't use mouse are stuck

**The Fix:**
- All interactive elements should be reachable with Tab key
- Focus should be visible (outline)
- Don't remove focus outlines in CSS

```css
/* Bad */
*:focus { outline: none; }

/* Good */
*:focus { outline: 2px solid #0066cc; }
```

**Quick Action:**
- Test your site using only keyboard
- Tab through all pages
- Fix any traps or unreachable elements

---

### 5. Missing Link Text
**Impact:** Screen readers just say "link" with no context

**The Fix:**
```html
<!-- Bad -->
<a href="/products"><img src="arrow.svg"></a>
<a href="/products">Click here</a>

<!-- Good -->
<a href="/products">View all products</a>
<a href="/products"><img src="arrow.svg" alt="View all products"></a>
```

**Quick Action:**
- Search for "click here" links
- Add descriptive text or aria-label
- Ensure icon-only links have text alternatives

---

## SHOPIFY-SPECIFIC FIXES

### Theme Settings
1. **Logo alt text:** Theme settings → Header → Logo → Add alt text
2. **Social icons:** Ensure they have aria-labels
3. **Product images:** Add alt text in product editor

### Common Theme Issues
```liquid
<!-- Fix missing button labels -->
{% comment %} Bad {% endcomment %}
<button class="btn-cart">
  <svg>...</svg>
</button>

{% comment %} Good {% endcomment %}
<button class="btn-cart" aria-label="Add to cart">
  <svg aria-hidden="true">...</svg>
</button>
```

---

## WORDPRESS-SPECIFIC FIXES

### Quick Wins
1. **Images:** Always fill in alt text field when uploading
2. **Headings:** Use proper hierarchy (H1 → H2 → H3)
3. **Links:** Make link text descriptive

### Plugin Recommendations
- **WP Accessibility:** Free plugin for common fixes
- **Flavor:** Accessibility checker
- **One Click Accessibility:** Quick toolbar widget

---

## REACT/NEXT.JS FIXES

### Component Patterns
```jsx
// Bad - div with click handler
<div onClick={handleClick}>Click me</div>

// Good - semantic button
<button onClick={handleClick}>Click me</button>

// Bad - image without alt
<img src={product.image} />

// Good - with alt
<img src={product.image} alt={product.name} />
```

### Common Issues
1. Use semantic HTML (`<button>`, `<nav>`, `<main>`)
2. Add `aria-label` to icon-only buttons
3. Manage focus when routes change
4. Use `<Link>` component with descriptive text

---

## 5-MINUTE AUDIT CHECKLIST

Run through this list right now:

- [ ] Can you Tab through the entire page?
- [ ] Is focus visible on all interactive elements?
- [ ] Do all images have alt text?
- [ ] Do all form fields have labels?
- [ ] Is text readable (contrast)?
- [ ] Can you navigate with screen reader? (VoiceOver: Cmd+F5 on Mac)
- [ ] Are there any "click here" links?
- [ ] Do buttons look like buttons, links like links?

---

## RESOURCES

### Free Tools
- **WAVE:** wave.webaim.org (browser extension)
- **Lighthouse:** Built into Chrome DevTools
- **axe DevTools:** Browser extension
- **Contrast Checker:** webaim.org/resources/contrastchecker/

### WCAG Guidelines
- **Quick Reference:** w3.org/WAI/WCAG21/quickref/
- **Understanding WCAG:** w3.org/WAI/WCAG21/Understanding/

### Screen Reader Testing
- **VoiceOver (Mac):** Cmd + F5
- **NVDA (Windows):** Free download
- **JAWS (Windows):** Industry standard (paid)

---

## NEED MORE HELP?

This guide covers the basics. For comprehensive scanning and platform-specific fixes:

**Try Inclusiv free:** tryinclusiv.com

We scan your entire site and generate copy-paste fixes for your specific platform.

**Lifetime access:** $199 (normally $499/month) - first 50 customers only

[STRIPE_LINK]
