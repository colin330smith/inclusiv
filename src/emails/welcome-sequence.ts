/**
 * Welcome Sequence Email Templates
 * Sent after a user scans their website
 */

import { baseTemplate, scoreBadge, issueList, ctaButton, deadlineCountdown, testimonialBox, infoBox, pricingBox, EMAIL_STYLES } from './base-template';
import type { Lead } from '../lib/email-sequences';

// Helper to generate issues HTML from lead data
function generateIssuesHtml(lead: Lead): string {
  if (!lead.scanResults?.topIssues?.length) {
    return '<tr><td style="padding: 12px 0; color: #6B7280;">No issues found - great job!</td></tr>';
  }

  const impactColors: Record<string, string> = {
    critical: '#EF4444',
    serious: '#F97316',
    moderate: '#F59E0B',
    minor: '#6B7280',
  };

  return lead.scanResults.topIssues.slice(0, 5).map(issue => `
    <tr>
      <td style="padding: 12px 0; border-bottom: 1px solid #E5E7EB;">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td width="8" style="background-color: ${impactColors[issue.impact] || impactColors.moderate}; border-radius: 4px;"></td>
            <td style="padding-left: 12px;">
              <span style="display: block; font-weight: 600; color: #1F2937; font-size: 14px;">${issue.description}</span>
              <span style="font-size: 12px; color: #6B7280;">${issue.count} instance${issue.count !== 1 ? 's' : ''} found</span>
            </td>
            <td width="80" align="right">
              <span style="display: inline-block; background-color: ${impactColors[issue.impact] || impactColors.moderate}; color: #ffffff; font-size: 11px; font-weight: 600; padding: 3px 8px; border-radius: 4px; text-transform: uppercase;">${issue.impact}</span>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  `).join('');
}

/**
 * Email 1: Full Report (Immediate)
 */
export function welcomeReport(lead: Lead): string {
  const issuesHtml = generateIssuesHtml(lead);

  const content = `
    <h1 style="margin: 0 0 16px; font-size: 28px; font-weight: 700; color: ${EMAIL_STYLES.colors.text};">
      Your Accessibility Report is Ready
    </h1>

    <p style="margin: 0 0 24px; color: ${EMAIL_STYLES.colors.textMuted}; font-size: 16px; line-height: 1.6;">
      Hi {firstName},<br><br>
      We've completed the accessibility scan for <strong>{domain}</strong>. Here's what we found:
    </p>

    ${scoreBadge(lead.scanResults?.score || 0)}

    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin: 24px 0; background-color: ${EMAIL_STYLES.colors.background}; border-radius: 8px;">
      <tr>
        <td style="padding: 16px; text-align: center; border-right: 1px solid ${EMAIL_STYLES.colors.border};">
          <span style="display: block; font-size: 28px; font-weight: 700; color: ${EMAIL_STYLES.colors.danger};">{totalIssues}</span>
          <span style="font-size: 12px; color: ${EMAIL_STYLES.colors.textMuted};">Total Issues</span>
        </td>
        <td style="padding: 16px; text-align: center; border-right: 1px solid ${EMAIL_STYLES.colors.border};">
          <span style="display: block; font-size: 28px; font-weight: 700; color: #F97316;">{criticalIssues}</span>
          <span style="font-size: 12px; color: ${EMAIL_STYLES.colors.textMuted};">Critical</span>
        </td>
        <td style="padding: 16px; text-align: center;">
          <span style="display: block; font-size: 28px; font-weight: 700; color: ${EMAIL_STYLES.colors.primary};">{platform}</span>
          <span style="font-size: 12px; color: ${EMAIL_STYLES.colors.textMuted};">Platform</span>
        </td>
      </tr>
    </table>

    <h2 style="margin: 32px 0 16px; font-size: 18px; font-weight: 600; color: ${EMAIL_STYLES.colors.text};">
      Top Issues Found
    </h2>

    <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
      ${issuesHtml}
    </table>

    ${deadlineCountdown()}

    ${infoBox(
      'Why This Matters',
      'The European Accessibility Act (EAA) requires all websites serving EU customers to be accessible by June 28, 2025. Non-compliance can result in fines up to €100,000 and being blocked from the EU market.',
      'warning'
    )}

    ${ctaButton('Get Your Full Report', 'https://inclusiv.app/report/{leadId}')}

    <p style="margin: 24px 0 0; color: ${EMAIL_STYLES.colors.textMuted}; font-size: 14px; text-align: center;">
      Tomorrow, we'll send you step-by-step instructions to fix your top issues.
    </p>
  `;

  return baseTemplate(content, `Your website scored {score}/100. We found {totalIssues} accessibility issues.`);
}

/**
 * Email 2: How to Fix Top 3 Issues (Day 1)
 */
export function welcomeFixGuide(lead: Lead): string {
  const topIssues = lead.scanResults?.topIssues?.slice(0, 3) || [];

  const fixGuides: Record<string, { title: string; fix: string; code?: string }> = {
    'color-contrast': {
      title: 'Fix Color Contrast Issues',
      fix: 'Ensure text has a contrast ratio of at least 4.5:1 against its background. Use tools like WebAIM Contrast Checker to verify.',
      code: '/* Before */\ncolor: #888888;\nbackground: #ffffff;\n\n/* After - Better contrast */\ncolor: #595959;\nbackground: #ffffff;',
    },
    'image-alt': {
      title: 'Add Alt Text to Images',
      fix: 'Every image needs descriptive alt text. If an image is decorative, use alt="" to hide it from screen readers.',
      code: '<!-- Before -->\n<img src="product.jpg">\n\n<!-- After -->\n<img src="product.jpg" alt="Blue running shoes with white sole">',
    },
    'link-name': {
      title: 'Make Links Accessible',
      fix: 'Links should have clear, descriptive text. Avoid "click here" or "read more" without context.',
      code: '<!-- Before -->\n<a href="/products">Click here</a>\n\n<!-- After -->\n<a href="/products">View all products</a>',
    },
    'button-name': {
      title: 'Add Accessible Names to Buttons',
      fix: 'All buttons need accessible names, either through visible text or aria-label attributes.',
      code: '<!-- Before -->\n<button><svg>...</svg></button>\n\n<!-- After -->\n<button aria-label="Close menu"><svg>...</svg></button>',
    },
    'label': {
      title: 'Label Form Fields',
      fix: 'Every form input needs an associated label element using the "for" attribute.',
      code: '<!-- Before -->\n<input type="email" placeholder="Email">\n\n<!-- After -->\n<label for="email">Email</label>\n<input type="email" id="email">',
    },
    'html-has-lang': {
      title: 'Add Language Attribute',
      fix: 'Add a lang attribute to your HTML element to help screen readers pronounce content correctly.',
      code: '<!-- Before -->\n<html>\n\n<!-- After -->\n<html lang="en">',
    },
    'heading-order': {
      title: 'Fix Heading Order',
      fix: 'Headings should be in sequential order (h1, h2, h3) without skipping levels.',
      code: '<!-- Before -->\n<h1>Title</h1>\n<h3>Section</h3>\n\n<!-- After -->\n<h1>Title</h1>\n<h2>Section</h2>',
    },
  };

  const issueGuides = topIssues.map(issue => {
    const guide = fixGuides[issue.id] || {
      title: `Fix: ${issue.description}`,
      fix: `This issue affects ${issue.count} element(s) on your page. Check the WCAG guidelines for detailed remediation steps.`,
    };

    return `
      <div style="background-color: ${EMAIL_STYLES.colors.background}; border-radius: 8px; padding: 20px; margin: 16px 0;">
        <h3 style="margin: 0 0 12px; font-size: 16px; font-weight: 600; color: ${EMAIL_STYLES.colors.text};">
          ${guide.title}
        </h3>
        <p style="margin: 0 0 12px; color: ${EMAIL_STYLES.colors.textMuted}; font-size: 14px; line-height: 1.6;">
          ${guide.fix}
        </p>
        ${guide.code ? `
          <div style="background-color: #1F2937; border-radius: 6px; padding: 16px; overflow-x: auto;">
            <pre style="margin: 0; color: #E5E7EB; font-size: 12px; font-family: 'SF Mono', Consolas, monospace; white-space: pre-wrap;">${guide.code}</pre>
          </div>
        ` : ''}
      </div>
    `;
  });

  const content = `
    <h1 style="margin: 0 0 16px; font-size: 28px; font-weight: 700; color: ${EMAIL_STYLES.colors.text};">
      How to Fix Your Top 3 Issues
    </h1>

    <p style="margin: 0 0 24px; color: ${EMAIL_STYLES.colors.textMuted}; font-size: 16px; line-height: 1.6;">
      Hi {firstName},<br><br>
      Yesterday we scanned <strong>{domain}</strong> and found {totalIssues} accessibility issues. Here's how to fix the most critical ones:
    </p>

    ${issueGuides.join('') || `
      <p style="color: ${EMAIL_STYLES.colors.textMuted};">
        Great news! Your site has minimal issues. Focus on maintaining accessibility as you add new content.
      </p>
    `}

    <h2 style="margin: 32px 0 16px; font-size: 18px; font-weight: 600; color: ${EMAIL_STYLES.colors.text};">
      Need Help Implementing These Fixes?
    </h2>

    <p style="margin: 0 0 24px; color: ${EMAIL_STYLES.colors.textMuted}; font-size: 14px; line-height: 1.6;">
      Our team can implement all fixes for you, typically within 48-72 hours. We handle everything from code changes to testing and verification.
    </p>

    ${ctaButton('Get Professional Help', 'https://inclusiv.app/pricing')}

    <p style="margin: 24px 0 0; color: ${EMAIL_STYLES.colors.textMuted}; font-size: 14px; text-align: center;">
      Next up: Learn about the EAA deadline and see how other companies became compliant.
    </p>
  `;

  return baseTemplate(content, `Here's how to fix the top accessibility issues on {domain}`);
}

/**
 * Email 3: EAA Deadline Reminder + Case Study (Day 3)
 */
export function welcomeDeadlineReminder(lead: Lead): string {
  const content = `
    <h1 style="margin: 0 0 16px; font-size: 28px; font-weight: 700; color: ${EMAIL_STYLES.colors.text};">
      The Clock is Ticking on EAA Compliance
    </h1>

    <p style="margin: 0 0 24px; color: ${EMAIL_STYLES.colors.textMuted}; font-size: 16px; line-height: 1.6;">
      Hi {firstName},<br><br>
      With your current accessibility score of <strong>{score}/100</strong>, {companyName} needs attention before the June 28, 2025 deadline.
    </p>

    ${deadlineCountdown()}

    <h2 style="margin: 32px 0 16px; font-size: 18px; font-weight: 600; color: ${EMAIL_STYLES.colors.text};">
      What Happens If You're Not Compliant?
    </h2>

    <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid ${EMAIL_STYLES.colors.border};">
          <table role="presentation" cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding-right: 12px; vertical-align: top;">
                <span style="display: inline-block; width: 24px; height: 24px; background: ${EMAIL_STYLES.colors.danger}; border-radius: 50%; text-align: center; line-height: 24px; color: white; font-weight: bold;">1</span>
              </td>
              <td>
                <strong style="color: ${EMAIL_STYLES.colors.text};">Fines up to €100,000</strong>
                <p style="margin: 4px 0 0; color: ${EMAIL_STYLES.colors.textMuted}; font-size: 14px;">Each EU member state can impose significant penalties</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid ${EMAIL_STYLES.colors.border};">
          <table role="presentation" cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding-right: 12px; vertical-align: top;">
                <span style="display: inline-block; width: 24px; height: 24px; background: #F97316; border-radius: 50%; text-align: center; line-height: 24px; color: white; font-weight: bold;">2</span>
              </td>
              <td>
                <strong style="color: ${EMAIL_STYLES.colors.text};">Market Access Blocked</strong>
                <p style="margin: 4px 0 0; color: ${EMAIL_STYLES.colors.textMuted}; font-size: 14px;">Non-compliant websites can be restricted from serving EU customers</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding: 12px 0;">
          <table role="presentation" cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding-right: 12px; vertical-align: top;">
                <span style="display: inline-block; width: 24px; height: 24px; background: ${EMAIL_STYLES.colors.warning}; border-radius: 50%; text-align: center; line-height: 24px; color: white; font-weight: bold;">3</span>
              </td>
              <td>
                <strong style="color: ${EMAIL_STYLES.colors.text};">Reputation Damage</strong>
                <p style="margin: 4px 0 0; color: ${EMAIL_STYLES.colors.textMuted}; font-size: 14px;">Public accessibility complaints can harm your brand image</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <h2 style="margin: 32px 0 16px; font-size: 18px; font-weight: 600; color: ${EMAIL_STYLES.colors.text};">
      Why Early Action Matters
    </h2>

    ${infoBox(
      'Industry Research',
      'Studies show that accessible websites often see improved SEO rankings, better user experience, and up to 15% higher conversion rates due to improved usability for all users.',
      'info'
    )}

    <p style="margin: 0 0 24px; color: ${EMAIL_STYLES.colors.textMuted}; font-size: 14px; line-height: 1.6;">
      <strong>Our Technology:</strong> Powered by axe-core (used by Microsoft, Google, Mozilla), we identify WCAG 2.1 AA issues and provide clear, actionable fixes you can implement immediately.
    </p>

    ${ctaButton('Start Your Remediation', 'https://inclusiv.app/pricing')}
  `;

  return baseTemplate(content, `Only {days} days until the EAA deadline. Your score: {score}/100`);
}

/**
 * Email 4: Special Offer (Day 5)
 */
export function welcomeSpecialOffer(lead: Lead): string {
  const content = `
    <h1 style="margin: 0 0 16px; font-size: 28px; font-weight: 700; color: ${EMAIL_STYLES.colors.text};">
      Special Offer: Full Remediation Package
    </h1>

    <p style="margin: 0 0 24px; color: ${EMAIL_STYLES.colors.textMuted}; font-size: 16px; line-height: 1.6;">
      Hi {firstName},<br><br>
      We noticed you haven't started fixing your {totalIssues} accessibility issues yet. We're offering a special deal to help you get compliant before the deadline.
    </p>

    ${pricingBox(
      '$2,997',
      '$1,497',
      '50%',
      [
        'Complete accessibility audit & remediation',
        'All {totalIssues} issues fixed by our experts',
        'WCAG 2.2 AA compliance guarantee',
        'EAA compliance certificate',
        '90-day monitoring & support',
        'Priority 48-72 hour turnaround',
      ]
    )}

    ${ctaButton('Claim 50% Off Now', 'https://inclusiv.app/checkout?offer=welcome50')}

    <p style="margin: 24px 0; text-align: center; color: ${EMAIL_STYLES.colors.danger}; font-weight: 600; font-size: 14px;">
      Offer expires in 48 hours
    </p>

    ${infoBox(
      'What\'s Included',
      'Our team of accessibility experts will manually review and fix every issue on your website. We test with real screen readers and assistive technologies to ensure genuine accessibility, not just passing automated tests.',
      'info'
    )}

    <h2 style="margin: 32px 0 16px; font-size: 18px; font-weight: 600; color: ${EMAIL_STYLES.colors.text};">
      Why Act Now?
    </h2>

    <ul style="margin: 0; padding: 0 0 0 20px; color: ${EMAIL_STYLES.colors.textMuted}; font-size: 14px; line-height: 2;">
      <li><strong>Limited capacity:</strong> We can only take on 10 new projects this month</li>
      <li><strong>Deadline pressure:</strong> Only {days} days until EAA enforcement</li>
      <li><strong>Price increase:</strong> Regular pricing returns in 48 hours</li>
      <li><strong>Guaranteed results:</strong> 100% satisfaction or money back</li>
    </ul>

    ${ctaButton('Get Started Today', 'https://inclusiv.app/checkout?offer=welcome50')}
  `;

  return baseTemplate(content, `50% off accessibility remediation - Fix all {totalIssues} issues for $1,497`);
}

/**
 * Email 5: Last Chance (Day 7)
 */
export function welcomeLastChance(lead: Lead): string {
  const content = `
    <div style="background: linear-gradient(135deg, ${EMAIL_STYLES.colors.danger} 0%, #B91C1C 100%); border-radius: 12px; padding: 24px; margin: 0 0 24px; text-align: center;">
      <span style="display: block; font-size: 14px; color: rgba(255,255,255,0.9); text-transform: uppercase; letter-spacing: 1px;">FINAL REMINDER</span>
      <span style="display: block; font-size: 28px; font-weight: 700; color: #ffffff; margin-top: 8px;">Your Offer Expires Today</span>
    </div>

    <h1 style="margin: 0 0 16px; font-size: 28px; font-weight: 700; color: ${EMAIL_STYLES.colors.text};">
      Last Chance to Secure Compliance
    </h1>

    <p style="margin: 0 0 24px; color: ${EMAIL_STYLES.colors.textMuted}; font-size: 16px; line-height: 1.6;">
      Hi {firstName},<br><br>
      This is my final email about your accessibility compliance. After today, the 50% discount expires and we may not have capacity to help before the deadline.
    </p>

    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin: 24px 0; background-color: ${EMAIL_STYLES.colors.background}; border-radius: 8px;">
      <tr>
        <td style="padding: 20px;">
          <h3 style="margin: 0 0 12px; color: ${EMAIL_STYLES.colors.text}; font-size: 16px;">Your Current Status:</h3>
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td style="padding: 8px 0; color: ${EMAIL_STYLES.colors.textMuted};">Accessibility Score:</td>
              <td style="padding: 8px 0; text-align: right; font-weight: 600; color: ${EMAIL_STYLES.colors.danger};">{score}/100</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: ${EMAIL_STYLES.colors.textMuted};">Total Issues:</td>
              <td style="padding: 8px 0; text-align: right; font-weight: 600; color: ${EMAIL_STYLES.colors.text};">{totalIssues}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: ${EMAIL_STYLES.colors.textMuted};">Critical Issues:</td>
              <td style="padding: 8px 0; text-align: right; font-weight: 600; color: #F97316;">{criticalIssues}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: ${EMAIL_STYLES.colors.textMuted};">Days Until Deadline:</td>
              <td style="padding: 8px 0; text-align: right; font-weight: 600; color: ${EMAIL_STYLES.colors.danger};">{days}</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <h2 style="margin: 32px 0 16px; font-size: 18px; font-weight: 600; color: ${EMAIL_STYLES.colors.text};">
      What You're Risking:
    </h2>

    ${infoBox(
      'Without Action',
      `If {companyName} isn't compliant by June 28, 2025, you face potential fines, legal action, and being blocked from serving EU customers. With {totalIssues} issues, manual remediation could take weeks - time you don't have.`,
      'warning'
    )}

    <h2 style="margin: 32px 0 16px; font-size: 18px; font-weight: 600; color: ${EMAIL_STYLES.colors.text};">
      Final Offer: $1,497 (Regular $2,997)
    </h2>

    ${ctaButton('Secure Your Compliance Now', 'https://inclusiv.app/checkout?offer=welcome50&final=true')}

    <p style="margin: 24px 0; color: ${EMAIL_STYLES.colors.textMuted}; font-size: 14px; line-height: 1.6;">
      If budget is a concern, we also offer payment plans. Reply to this email and we'll work something out.
    </p>

    <p style="margin: 0; color: ${EMAIL_STYLES.colors.textMuted}; font-size: 14px; font-style: italic;">
      This is the last email in this sequence. If you need help in the future, you can always reach out at support@inclusiv.app.
    </p>
  `;

  return baseTemplate(content, `FINAL: 50% off expires today. {days} days until EAA deadline.`);
}

// Export all welcome templates
export const welcomeTemplates = {
  'welcome-report': welcomeReport,
  'welcome-fix-guide': welcomeFixGuide,
  'welcome-deadline-reminder': welcomeDeadlineReminder,
  'welcome-special-offer': welcomeSpecialOffer,
  'welcome-last-chance': welcomeLastChance,
};
