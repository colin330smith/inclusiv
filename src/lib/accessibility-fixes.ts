/**
 * Accessibility Fix Database
 *
 * Provides platform-specific fix instructions for common WCAG issues
 * This is the VALUE layer - turning scan results into actionable guidance
 */

export interface AccessibilityFix {
  id: string;
  title: string;
  description: string;
  impact: 'critical' | 'serious' | 'moderate' | 'minor';
  wcagCriteria: string[];
  legalRisk: 'high' | 'medium' | 'low';
  estimatedTime: string; // e.g., "5 minutes", "1 hour"
  priorityScore: number; // 1-100, used for sorting
  fixInstructions: {
    general: string;
    code?: string;
    platforms?: Record<string, string>;
  };
  resources?: {
    title: string;
    url: string;
  }[];
}

/**
 * Complete fix database for all common accessibility issues
 */
export const accessibilityFixes: Record<string, AccessibilityFix> = {
  'color-contrast': {
    id: 'color-contrast',
    title: 'Insufficient Color Contrast',
    description: 'Text does not have sufficient contrast against its background, making it hard to read for users with visual impairments.',
    impact: 'serious',
    wcagCriteria: ['1.4.3 Contrast (Minimum)', '1.4.6 Contrast (Enhanced)'],
    legalRisk: 'high',
    estimatedTime: '15-30 minutes',
    priorityScore: 90,
    fixInstructions: {
      general: 'Ensure text has a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text (18pt+ or 14pt+ bold).',
      code: `/* Example fix - update your CSS colors */
/* Before: Low contrast */
.text { color: #888888; background: #ffffff; } /* Ratio: 3.5:1 ❌ */

/* After: Sufficient contrast */
.text { color: #595959; background: #ffffff; } /* Ratio: 7:1 ✓ */`,
      platforms: {
        'Shopify': 'Go to Online Store > Themes > Customize > Theme Settings > Colors. Adjust text colors to darker shades.',
        'WordPress': 'Use the Customizer (Appearance > Customize) to adjust theme colors, or edit your CSS in Additional CSS.',
        'Wix': 'Click on the text element > Design > Text Colors. Use the contrast checker in Wix to validate.',
        'Squarespace': 'Go to Design > Site Styles and adjust the text color under Typography settings.',
        'Webflow': 'Select the text element and update the color in the Style panel. Use hex codes with sufficient contrast.',
      }
    },
    resources: [
      { title: 'WebAIM Contrast Checker', url: 'https://webaim.org/resources/contrastchecker/' },
      { title: 'WCAG Contrast Guidelines', url: 'https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html' }
    ]
  },

  'image-alt': {
    id: 'image-alt',
    title: 'Images Missing Alternative Text',
    description: 'Images without alt text cannot be understood by screen reader users or when images fail to load.',
    impact: 'critical',
    wcagCriteria: ['1.1.1 Non-text Content'],
    legalRisk: 'high',
    estimatedTime: '2-5 minutes per image',
    priorityScore: 95,
    fixInstructions: {
      general: 'Add descriptive alt text to all meaningful images. Use empty alt="" for decorative images.',
      code: `<!-- Before: Missing alt -->
<img src="product.jpg">

<!-- After: Descriptive alt text -->
<img src="product.jpg" alt="Red leather handbag with gold clasp, front view">

<!-- For decorative images -->
<img src="decorative-line.png" alt="" role="presentation">`,
      platforms: {
        'Shopify': 'Go to Products > Select product > Click image > Add alt text in the "Alt text" field.',
        'WordPress': 'In Media Library, click image > fill in "Alternative Text" field. For featured images, edit in post/page.',
        'Wix': 'Click image > Settings (gear icon) > "What\'s in the image?" field.',
        'Squarespace': 'Click image > Edit > Image tab > Fill in "Image Alt Text" field.',
        'WooCommerce': 'Go to Products > Edit > Click gallery image > Add alt text in the right sidebar.',
      }
    },
    resources: [
      { title: 'Alt Text Decision Tree', url: 'https://www.w3.org/WAI/tutorials/images/decision-tree/' },
      { title: 'Writing Good Alt Text', url: 'https://axesslab.com/alt-texts/' }
    ]
  },

  'link-name': {
    id: 'link-name',
    title: 'Links Without Accessible Names',
    description: 'Links without descriptive text (like icon-only links or "click here") are confusing for screen reader users.',
    impact: 'serious',
    wcagCriteria: ['2.4.4 Link Purpose (In Context)', '4.1.2 Name, Role, Value'],
    legalRisk: 'high',
    estimatedTime: '5-10 minutes',
    priorityScore: 85,
    fixInstructions: {
      general: 'Ensure all links have descriptive text that explains where they lead. Use aria-label for icon-only links.',
      code: `<!-- Before: Non-descriptive -->
<a href="/cart"><i class="icon-cart"></i></a>
<a href="/products">Click here</a>

<!-- After: Descriptive links -->
<a href="/cart" aria-label="View shopping cart (3 items)">
  <i class="icon-cart" aria-hidden="true"></i>
</a>
<a href="/products">View all products</a>`,
      platforms: {
        'Shopify': 'Edit link text in theme editor. For icon links, add aria-label in Liquid templates.',
        'WordPress': 'Edit link text directly. For icon links, use the "Link Text" or "ARIA Label" option in block settings.',
        'Wix': 'Click link > change link text to be descriptive. For icon buttons, add tooltip text.',
        'Squarespace': 'Edit link text to be descriptive. Use "URL settings" for additional accessibility options.',
      }
    }
  },

  'button-name': {
    id: 'button-name',
    title: 'Buttons Without Accessible Names',
    description: 'Buttons without labels cannot be understood by assistive technology users.',
    impact: 'critical',
    wcagCriteria: ['4.1.2 Name, Role, Value'],
    legalRisk: 'high',
    estimatedTime: '5-10 minutes',
    priorityScore: 92,
    fixInstructions: {
      general: 'Add visible text or aria-label to all buttons. Icon buttons need aria-label attributes.',
      code: `<!-- Before: Unnamed button -->
<button><i class="icon-search"></i></button>

<!-- After: Named button -->
<button aria-label="Search products">
  <i class="icon-search" aria-hidden="true"></i>
</button>

<!-- Or with visible text -->
<button>
  <i class="icon-search" aria-hidden="true"></i>
  <span>Search</span>
</button>`,
      platforms: {
        'Shopify': 'Add aria-label to button elements in your theme\'s Liquid files.',
        'WordPress': 'Use the block editor\'s accessibility options or add aria-label via Custom HTML.',
        'Wix': 'Click button > add text or use the tooltip field for icon buttons.',
      }
    }
  },

  'label': {
    id: 'label',
    title: 'Form Fields Missing Labels',
    description: 'Form inputs without labels are difficult to understand, especially for screen reader users.',
    impact: 'critical',
    wcagCriteria: ['1.3.1 Info and Relationships', '3.3.2 Labels or Instructions'],
    legalRisk: 'high',
    estimatedTime: '10-20 minutes',
    priorityScore: 93,
    fixInstructions: {
      general: 'Associate each form field with a visible label using the <label> element with matching for/id attributes.',
      code: `<!-- Before: No label -->
<input type="email" placeholder="Email">

<!-- After: Proper labeling -->
<label for="email">Email Address</label>
<input type="email" id="email" placeholder="you@example.com">

<!-- For visually hidden labels (use sparingly) -->
<label for="search" class="sr-only">Search products</label>
<input type="search" id="search" placeholder="Search...">`,
      platforms: {
        'Shopify': 'Edit form sections in theme Liquid files. Add <label> elements linked to inputs.',
        'WordPress': 'Most form plugins (Contact Form 7, Gravity Forms) have label settings. Enable them.',
        'Wix': 'Labels are usually included. Check Form Settings > Field Labels to ensure they\'re visible.',
        'Squarespace': 'Form labels are automatic. Ensure "Show Field Labels" is enabled in form settings.',
      }
    }
  },

  'html-has-lang': {
    id: 'html-has-lang',
    title: 'Missing Language Declaration',
    description: 'The page does not specify its language, which helps screen readers pronounce content correctly.',
    impact: 'serious',
    wcagCriteria: ['3.1.1 Language of Page'],
    legalRisk: 'medium',
    estimatedTime: '2 minutes',
    priorityScore: 80,
    fixInstructions: {
      general: 'Add the lang attribute to the <html> element with the appropriate language code.',
      code: `<!-- Add to your HTML -->
<html lang="en">
  <!-- For German -->
  <html lang="de">
  <!-- For French -->
  <html lang="fr">`,
      platforms: {
        'Shopify': 'Edit theme.liquid file, add lang attribute to <html> tag: <html lang="{{ request.locale.iso_code }}">',
        'WordPress': 'Usually automatic. Check Settings > General > Site Language.',
        'Wix': 'Go to Settings > Multilingual to set primary language.',
        'Squarespace': 'Go to Settings > Language & Region to set site language.',
      }
    }
  },

  'document-title': {
    id: 'document-title',
    title: 'Missing Page Title',
    description: 'The page is missing a <title> element, which helps users understand and navigate to the page.',
    impact: 'serious',
    wcagCriteria: ['2.4.2 Page Titled'],
    legalRisk: 'medium',
    estimatedTime: '5 minutes',
    priorityScore: 78,
    fixInstructions: {
      general: 'Add a descriptive, unique <title> element to each page\'s <head> section.',
      code: `<!-- Add in <head> -->
<title>Product Name - Your Store | Category</title>

<!-- Homepage example -->
<title>Your Store Name - Tagline or Description</title>`,
      platforms: {
        'Shopify': 'Automatic from product/page titles. Edit in Admin > Products > [Product] > Search engine listing.',
        'WordPress': 'Edit page title or use Yoast SEO plugin for custom titles.',
        'Wix': 'Go to page settings (three dots) > SEO Basics > Title Tag.',
        'Squarespace': 'Go to Page Settings > SEO > SEO Title.',
      }
    }
  },

  'heading-order': {
    id: 'heading-order',
    title: 'Incorrect Heading Structure',
    description: 'Headings skip levels (e.g., h1 to h3), making it harder for screen reader users to navigate.',
    impact: 'moderate',
    wcagCriteria: ['1.3.1 Info and Relationships'],
    legalRisk: 'medium',
    estimatedTime: '15-30 minutes',
    priorityScore: 70,
    fixInstructions: {
      general: 'Use headings in sequential order without skipping levels. Start with h1, then h2, h3, etc.',
      code: `<!-- Incorrect structure -->
<h1>Page Title</h1>
<h3>Section</h3>  <!-- ❌ Skipped h2 -->
<h5>Subsection</h5>  <!-- ❌ Skipped h4 -->

<!-- Correct structure -->
<h1>Page Title</h1>
<h2>Section</h2>
<h3>Subsection</h3>`,
      platforms: {
        'Shopify': 'Review theme templates and product descriptions. Use proper heading hierarchy.',
        'WordPress': 'Use block editor heading levels carefully. Gutenberg shows heading hierarchy.',
        'Wix': 'Click text > change heading level in the format menu. Follow h1 > h2 > h3 order.',
        'Squarespace': 'Edit text blocks and use proper heading formats from the text menu.',
      }
    }
  },

  'bypass': {
    id: 'bypass',
    title: 'Missing Skip Navigation Link',
    description: 'No way for keyboard users to skip repetitive navigation and jump directly to main content.',
    impact: 'serious',
    wcagCriteria: ['2.4.1 Bypass Blocks'],
    legalRisk: 'high',
    estimatedTime: '20-30 minutes',
    priorityScore: 82,
    fixInstructions: {
      general: 'Add a skip link as the first focusable element that jumps to the main content area.',
      code: `<!-- Add at the start of <body> -->
<a href="#main-content" class="skip-link">
  Skip to main content
</a>

<!-- Add to your main content area -->
<main id="main-content">
  ...
</main>

<!-- CSS for skip link -->
<style>
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  padding: 8px;
  background: #000;
  color: #fff;
  z-index: 100;
}
.skip-link:focus {
  top: 0;
}
</style>`,
      platforms: {
        'Shopify': 'Add skip link to theme.liquid before header. Link to id="MainContent".',
        'WordPress': 'Many themes include this. Check theme options or add via header.php.',
        'Wix': 'Wix adds this automatically. Check site settings if missing.',
        'Squarespace': 'Add via Code Injection (Settings > Advanced > Code Injection).',
      }
    }
  },

  'region': {
    id: 'region',
    title: 'Content Not in Landmarks',
    description: 'Page content is not wrapped in semantic landmark regions (main, nav, header, footer).',
    impact: 'moderate',
    wcagCriteria: ['1.3.1 Info and Relationships', '2.4.1 Bypass Blocks'],
    legalRisk: 'medium',
    estimatedTime: '30-60 minutes',
    priorityScore: 65,
    fixInstructions: {
      general: 'Wrap page sections in appropriate landmark elements: <header>, <nav>, <main>, <footer>.',
      code: `<!-- Proper landmark structure -->
<header>
  <nav aria-label="Main navigation">...</nav>
</header>

<main>
  <article>...</article>
  <aside>Sidebar content</aside>
</main>

<footer>...</footer>`,
      platforms: {
        'Shopify': 'Most themes include landmarks. Check theme.liquid structure.',
        'WordPress': 'Most themes include this. Block themes use proper landmarks automatically.',
        'Wix': 'Wix handles this automatically in modern templates.',
        'Squarespace': 'Templates include landmarks. Avoid custom HTML that breaks structure.',
      }
    }
  },

  'meta-viewport': {
    id: 'meta-viewport',
    title: 'Viewport Prevents Zooming',
    description: 'The page prevents users from zooming, which is essential for users with low vision.',
    impact: 'critical',
    wcagCriteria: ['1.4.4 Resize Text'],
    legalRisk: 'high',
    estimatedTime: '5 minutes',
    priorityScore: 88,
    fixInstructions: {
      general: 'Remove maximum-scale=1 and user-scalable=no from your viewport meta tag.',
      code: `<!-- Before: Prevents zooming ❌ -->
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">

<!-- After: Allows zooming ✓ -->
<meta name="viewport" content="width=device-width, initial-scale=1">`,
      platforms: {
        'Shopify': 'Edit theme.liquid, find viewport meta tag and remove zoom restrictions.',
        'WordPress': 'Check theme header.php or use a plugin like Starter Templates to fix.',
        'Wix': 'Usually not an issue. Contact Wix support if present.',
        'Squarespace': 'Go to Design > Custom CSS and override if needed.',
      }
    }
  },

  'landmark-one-main': {
    id: 'landmark-one-main',
    title: 'Missing Main Landmark',
    description: 'Page lacks a <main> element to identify the primary content area.',
    impact: 'moderate',
    wcagCriteria: ['1.3.1 Info and Relationships'],
    legalRisk: 'medium',
    estimatedTime: '10 minutes',
    priorityScore: 72,
    fixInstructions: {
      general: 'Wrap your main page content in a <main> element. There should be exactly one per page.',
      code: `<!-- Add main landmark -->
<main id="main-content">
  <!-- Your page content here -->
</main>`,
      platforms: {
        'Shopify': 'Check theme.liquid for <main> tag. Add if missing, usually wrapping {{ content_for_layout }}.',
        'WordPress': 'Most themes include this. Check your theme\'s template files.',
        'Wix': 'Wix handles this automatically.',
        'Squarespace': 'Templates include this automatically.',
      }
    }
  },

  'aria-hidden-focus': {
    id: 'aria-hidden-focus',
    title: 'Hidden Element is Focusable',
    description: 'An element with aria-hidden="true" contains focusable elements, creating a confusing experience.',
    impact: 'serious',
    wcagCriteria: ['4.1.2 Name, Role, Value'],
    legalRisk: 'medium',
    estimatedTime: '10-20 minutes',
    priorityScore: 75,
    fixInstructions: {
      general: 'Either remove aria-hidden or make all child elements unfocusable with tabindex="-1".',
      code: `<!-- Before: Focusable inside hidden ❌ -->
<div aria-hidden="true">
  <button>Click me</button>
</div>

<!-- After: Option 1 - Remove aria-hidden -->
<div>
  <button>Click me</button>
</div>

<!-- After: Option 2 - Make unfocusable -->
<div aria-hidden="true">
  <button tabindex="-1">Click me</button>
</div>`,
    }
  },

  'duplicate-id': {
    id: 'duplicate-id',
    title: 'Duplicate Element IDs',
    description: 'Multiple elements share the same ID, which can break accessibility features and JavaScript.',
    impact: 'serious',
    wcagCriteria: ['4.1.1 Parsing'],
    legalRisk: 'medium',
    estimatedTime: '15-30 minutes',
    priorityScore: 73,
    fixInstructions: {
      general: 'Ensure each ID attribute is unique within the page. Use classes for shared styling.',
      code: `<!-- Before: Duplicate IDs ❌ -->
<div id="product-card">...</div>
<div id="product-card">...</div>

<!-- After: Unique IDs ✓ -->
<div id="product-card-1" class="product-card">...</div>
<div id="product-card-2" class="product-card">...</div>`,
    }
  },

  'frame-title': {
    id: 'frame-title',
    title: 'iFrames Missing Titles',
    description: 'Embedded content (iframes) lacks title attributes to describe their purpose.',
    impact: 'serious',
    wcagCriteria: ['2.4.1 Bypass Blocks', '4.1.2 Name, Role, Value'],
    legalRisk: 'medium',
    estimatedTime: '5 minutes per iframe',
    priorityScore: 68,
    fixInstructions: {
      general: 'Add a descriptive title attribute to all iframe elements.',
      code: `<!-- Before: No title ❌ -->
<iframe src="https://youtube.com/embed/..."></iframe>

<!-- After: With title ✓ -->
<iframe
  src="https://youtube.com/embed/..."
  title="Product demonstration video"
></iframe>`,
    }
  },

  'list': {
    id: 'list',
    title: 'Improper List Structure',
    description: 'List elements (ul, ol) contain non-list item children, breaking assistive technology navigation.',
    impact: 'serious',
    wcagCriteria: ['1.3.1 Info and Relationships'],
    legalRisk: 'medium',
    estimatedTime: '15-30 minutes',
    priorityScore: 65,
    fixInstructions: {
      general: 'Ensure <ul> and <ol> elements only contain <li> children. Move other elements inside <li> tags.',
      code: `<!-- Before: Invalid list ❌ -->
<ul>
  <div>Item 1</div>
  <li>Item 2</li>
</ul>

<!-- After: Valid list ✓ -->
<ul>
  <li>Item 1</li>
  <li>Item 2</li>
</ul>`,
    }
  },

  'tabindex': {
    id: 'tabindex',
    title: 'Positive Tabindex Values',
    description: 'Elements use tabindex values greater than 0, which disrupts the natural tab order.',
    impact: 'serious',
    wcagCriteria: ['2.4.3 Focus Order'],
    legalRisk: 'medium',
    estimatedTime: '15-30 minutes',
    priorityScore: 70,
    fixInstructions: {
      general: 'Remove positive tabindex values. Use 0 to make elements focusable in natural order, or -1 to remove from tab order.',
      code: `<!-- Before: Positive tabindex ❌ -->
<button tabindex="5">First</button>
<button tabindex="1">Second</button>

<!-- After: Natural order ✓ -->
<button>Second (now first in DOM)</button>
<button>First (now second in DOM)</button>

<!-- Or use tabindex="0" for custom elements -->
<div role="button" tabindex="0">Custom button</div>`,
    }
  },
};

/**
 * Get fix information for an issue ID
 */
export function getFixForIssue(issueId: string): AccessibilityFix | null {
  return accessibilityFixes[issueId] || null;
}

/**
 * Get platform-specific fix instructions
 */
export function getPlatformFix(issueId: string, platform: string): string | null {
  const fix = accessibilityFixes[issueId];
  if (!fix?.fixInstructions.platforms) return null;

  // Try exact match first
  const platformKey = Object.keys(fix.fixInstructions.platforms).find(
    key => key.toLowerCase() === platform.toLowerCase()
  );

  return platformKey ? fix.fixInstructions.platforms[platformKey] : null;
}

/**
 * Calculate total estimated remediation time
 */
export function calculateRemediationTime(issues: { id: string; count: number }[]): string {
  let totalMinutes = 0;

  for (const issue of issues) {
    const fix = accessibilityFixes[issue.id];
    if (fix) {
      // Parse estimated time (e.g., "15-30 minutes", "2-5 minutes per image")
      const timeMatch = fix.estimatedTime.match(/(\d+)/);
      if (timeMatch) {
        const baseMinutes = parseInt(timeMatch[1], 10);
        // For "per item" times, multiply by count (capped at 10)
        const multiplier = fix.estimatedTime.includes('per') ? Math.min(issue.count, 10) : 1;
        totalMinutes += baseMinutes * multiplier;
      }
    }
  }

  if (totalMinutes < 60) {
    return `${totalMinutes} minutes`;
  } else if (totalMinutes < 480) {
    const hours = Math.round(totalMinutes / 60 * 10) / 10;
    return `${hours} hours`;
  } else {
    const days = Math.ceil(totalMinutes / 480); // 8-hour workday
    return `${days} days`;
  }
}

/**
 * Calculate legal risk level based on issues
 */
export function calculateLegalRisk(issues: { id: string; impact: string }[]): {
  level: 'high' | 'medium' | 'low';
  description: string;
  fineEstimate: string;
} {
  const highRiskIssues = issues.filter(issue => {
    const fix = accessibilityFixes[issue.id];
    return fix?.legalRisk === 'high' || issue.impact === 'critical';
  });

  if (highRiskIssues.length >= 3) {
    return {
      level: 'high',
      description: 'Your site has multiple critical accessibility violations that commonly lead to legal action.',
      fineEstimate: '€20,000 - €100,000',
    };
  } else if (highRiskIssues.length >= 1) {
    return {
      level: 'medium',
      description: 'Your site has accessibility issues that could result in complaints or legal notices.',
      fineEstimate: '€5,000 - €20,000',
    };
  } else {
    return {
      level: 'low',
      description: 'Your site has minor accessibility issues. Address them to maintain compliance.',
      fineEstimate: '< €5,000',
    };
  }
}

/**
 * Sort issues by priority for remediation
 */
export function prioritizeIssues<T extends { id: string; impact: string; count: number }>(issues: T[]): T[] {
  return [...issues].sort((a, b) => {
    const fixA = accessibilityFixes[a.id];
    const fixB = accessibilityFixes[b.id];

    // Primary sort by priority score (from fix database)
    const priorityA = fixA?.priorityScore || 50;
    const priorityB = fixB?.priorityScore || 50;

    if (priorityA !== priorityB) {
      return priorityB - priorityA; // Higher priority first
    }

    // Secondary sort by impact
    const impactOrder = { critical: 0, serious: 1, moderate: 2, minor: 3 };
    const impactA = impactOrder[a.impact as keyof typeof impactOrder] ?? 3;
    const impactB = impactOrder[b.impact as keyof typeof impactOrder] ?? 3;

    if (impactA !== impactB) {
      return impactA - impactB;
    }

    // Tertiary sort by count (more instances = higher priority)
    return b.count - a.count;
  });
}
