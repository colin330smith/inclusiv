/**
 * Cold Lead Sequence Email Templates
 * Outreach to leads who haven't scanned yet
 */

import { baseTemplate, scoreBadge, ctaButton, deadlineCountdown, testimonialBox, infoBox, EMAIL_STYLES } from './base-template';
import type { Lead } from '../lib/email-sequences';

/**
 * Email 1: Initial Outreach (Immediate)
 */
export function coldInitialOutreach(lead: Lead): string {
  const content = `
    <h1 style="margin: 0 0 16px; font-size: 28px; font-weight: 700; color: ${EMAIL_STYLES.colors.text};">
      Is {companyName} Ready for the EU Accessibility Law?
    </h1>

    <p style="margin: 0 0 24px; color: ${EMAIL_STYLES.colors.textMuted}; font-size: 16px; line-height: 1.6;">
      Hi {firstName},<br><br>
      I noticed {companyName} operates an e-commerce website. I wanted to reach out because there's a major regulatory deadline approaching that could impact your business.
    </p>

    ${deadlineCountdown()}

    <h2 style="margin: 32px 0 16px; font-size: 18px; font-weight: 600; color: ${EMAIL_STYLES.colors.text};">
      What is the European Accessibility Act?
    </h2>

    <p style="margin: 0 0 16px; color: ${EMAIL_STYLES.colors.textMuted}; font-size: 14px; line-height: 1.6;">
      The EAA is new legislation requiring all websites selling to EU customers to meet accessibility standards (WCAG 2.1 AA) by June 28, 2025. This applies to:
    </p>

    <ul style="margin: 0 0 24px; padding: 0 0 0 20px; color: ${EMAIL_STYLES.colors.textMuted}; font-size: 14px; line-height: 2;">
      <li>E-commerce websites and apps</li>
      <li>Banking and financial services</li>
      <li>Travel and transportation booking</li>
      <li>Media and entertainment platforms</li>
      <li>Any digital service sold to EU consumers</li>
    </ul>

    ${infoBox(
      'Non-Compliance Penalties',
      'Businesses that fail to comply face fines up to €100,000, legal action, and potential loss of access to the EU market (450+ million consumers).',
      'warning'
    )}

    <h2 style="margin: 32px 0 16px; font-size: 18px; font-weight: 600; color: ${EMAIL_STYLES.colors.text};">
      Free Accessibility Scan
    </h2>

    <p style="margin: 0 0 24px; color: ${EMAIL_STYLES.colors.textMuted}; font-size: 14px; line-height: 1.6;">
      I'd like to offer {companyName} a <strong>free accessibility scan</strong> of your website. In under 60 seconds, you'll receive:
    </p>

    <ul style="margin: 0 0 24px; padding: 0 0 0 20px; color: ${EMAIL_STYLES.colors.textMuted}; font-size: 14px; line-height: 2;">
      <li>Your accessibility score (0-100)</li>
      <li>List of all accessibility issues</li>
      <li>Priority ranking by severity</li>
      <li>Platform-specific recommendations</li>
    </ul>

    ${ctaButton('Get Your Free Scan', 'https://inclusiv.app?utm_source=cold_email&utm_campaign=initial')}

    <p style="margin: 24px 0 0; color: ${EMAIL_STYLES.colors.textMuted}; font-size: 14px;">
      No credit card required. Results in 60 seconds.
    </p>
  `;

  return baseTemplate(content, `The EAA deadline is {days} days away. Is {companyName} ready?`);
}

/**
 * Email 2: Specific Issue Detail (Day 2)
 */
export function coldIssueDetail(lead: Lead): string {
  // Generate issues HTML if we have scan results
  let issuesSection = '';

  if (lead.scanResults && lead.scanResults.topIssues?.length > 0) {
    const impactColors: Record<string, string> = {
      critical: '#EF4444',
      serious: '#F97316',
      moderate: '#F59E0B',
      minor: '#6B7280',
    };

    const issueRows = lead.scanResults.topIssues.slice(0, 5).map(issue => `
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid ${EMAIL_STYLES.colors.border};">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td width="8" style="background-color: ${impactColors[issue.impact] || impactColors.moderate}; border-radius: 4px;"></td>
              <td style="padding-left: 12px;">
                <span style="display: block; font-weight: 600; color: #1F2937; font-size: 14px;">${issue.description}</span>
                <span style="font-size: 12px; color: #6B7280;">${issue.count} instance${issue.count !== 1 ? 's' : ''}</span>
              </td>
              <td width="80" align="right">
                <span style="display: inline-block; background-color: ${impactColors[issue.impact] || impactColors.moderate}; color: #ffffff; font-size: 11px; font-weight: 600; padding: 3px 8px; border-radius: 4px; text-transform: uppercase;">${issue.impact}</span>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    `).join('');

    issuesSection = `
      ${scoreBadge(lead.scanResults.score)}

      <h2 style="margin: 24px 0 16px; font-size: 18px; font-weight: 600; color: ${EMAIL_STYLES.colors.text};">
        Top Issues We Found
      </h2>

      <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
        ${issueRows}
      </table>
    `;
  } else {
    issuesSection = `
      <div style="background-color: ${EMAIL_STYLES.colors.background}; border-radius: 12px; padding: 32px; text-align: center; margin: 24px 0;">
        <span style="display: block; font-size: 48px; margin-bottom: 16px;">🔍</span>
        <p style="margin: 0; color: ${EMAIL_STYLES.colors.textMuted}; font-size: 14px;">
          We haven't scanned {domain} yet. Get your free scan to see your accessibility issues.
        </p>
      </div>
    `;
  }

  const content = `
    <h1 style="margin: 0 0 16px; font-size: 28px; font-weight: 700; color: ${EMAIL_STYLES.colors.text};">
      We Scanned {domain} for Accessibility Issues
    </h1>

    <p style="margin: 0 0 24px; color: ${EMAIL_STYLES.colors.textMuted}; font-size: 16px; line-height: 1.6;">
      Hi {firstName},<br><br>
      Following up on my email about the EAA deadline - I went ahead and ran a quick accessibility scan on <strong>{domain}</strong>.
    </p>

    ${issuesSection}

    <h2 style="margin: 32px 0 16px; font-size: 18px; font-weight: 600; color: ${EMAIL_STYLES.colors.text};">
      Why These Issues Matter
    </h2>

    <p style="margin: 0 0 16px; color: ${EMAIL_STYLES.colors.textMuted}; font-size: 14px; line-height: 1.6;">
      Each of these issues can prevent users with disabilities from using your website. Under the EAA, this exposes {companyName} to:
    </p>

    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin: 16px 0;">
      <tr>
        <td style="padding: 12px; background-color: #FEE2E2; border-radius: 8px;">
          <strong style="color: ${EMAIL_STYLES.colors.danger};">Legal Risk:</strong>
          <span style="color: ${EMAIL_STYLES.colors.textMuted}; font-size: 14px;"> Fines up to €100,000 per violation</span>
        </td>
      </tr>
      <tr><td style="height: 8px;"></td></tr>
      <tr>
        <td style="padding: 12px; background-color: #FEF3C7; border-radius: 8px;">
          <strong style="color: #B45309;">Market Risk:</strong>
          <span style="color: ${EMAIL_STYLES.colors.textMuted}; font-size: 14px;"> Potential block from EU market access</span>
        </td>
      </tr>
      <tr><td style="height: 8px;"></td></tr>
      <tr>
        <td style="padding: 12px; background-color: #DBEAFE; border-radius: 8px;">
          <strong style="color: #1D4ED8;">Revenue Risk:</strong>
          <span style="color: ${EMAIL_STYLES.colors.textMuted}; font-size: 14px;"> 15-20% of users may struggle to purchase</span>
        </td>
      </tr>
    </table>

    ${ctaButton('Get Your Full Report', 'https://inclusiv.app?utm_source=cold_email&utm_campaign=issue_detail')}

    <p style="margin: 24px 0 0; color: ${EMAIL_STYLES.colors.textMuted}; font-size: 14px;">
      Want us to fix these issues for you? Reply to this email for a custom quote.
    </p>
  `;

  return baseTemplate(content, `We found {totalIssues} accessibility issues on {domain}`);
}

/**
 * Email 3: Social Proof + Testimonial (Day 5)
 */
export function coldSocialProof(lead: Lead): string {
  const content = `
    <h1 style="margin: 0 0 16px; font-size: 28px; font-weight: 700; color: ${EMAIL_STYLES.colors.text};">
      How We Help Companies Like Yours Achieve Compliance
    </h1>

    <p style="margin: 0 0 24px; color: ${EMAIL_STYLES.colors.textMuted}; font-size: 16px; line-height: 1.6;">
      Hi {firstName},<br><br>
      I wanted to share how Inclusiv can help businesses like {companyName} become EAA compliant before the June 2025 deadline.
    </p>

    <!-- What We Offer Section -->
    <div style="background-color: ${EMAIL_STYLES.colors.background}; border-radius: 12px; padding: 24px; margin: 24px 0;">
      <h3 style="margin: 0 0 16px; font-size: 18px; font-weight: 600; color: ${EMAIL_STYLES.colors.text};">
        How We Help Businesses Become Compliant
      </h3>
      <p style="margin: 0 0 16px; color: ${EMAIL_STYLES.colors.textMuted}; font-size: 14px; line-height: 1.6;">
        Our WCAG 2.1 AA scanner powered by axe-core (the same engine used by Microsoft, Google, and Mozilla) identifies accessibility issues and provides clear, actionable fixes.
      </p>
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <td style="text-align: center; padding: 12px;">
            <span style="display: block; font-size: 24px; font-weight: 700; color: ${EMAIL_STYLES.colors.primary};">60s</span>
            <span style="font-size: 12px; color: ${EMAIL_STYLES.colors.textMuted};">Scan Time</span>
          </td>
          <td style="text-align: center; padding: 12px;">
            <span style="display: block; font-size: 24px; font-weight: 700; color: ${EMAIL_STYLES.colors.secondary};">WCAG</span>
            <span style="font-size: 12px; color: ${EMAIL_STYLES.colors.textMuted};">2.1 AA Standard</span>
          </td>
          <td style="text-align: center; padding: 12px;">
            <span style="display: block; font-size: 24px; font-weight: 700; color: ${EMAIL_STYLES.colors.primary};">Free</span>
            <span style="font-size: 12px; color: ${EMAIL_STYLES.colors.textMuted};">Initial Scan</span>
          </td>
        </tr>
      </table>
    </div>

    <!-- Why Accessibility Matters -->
    ${infoBox(
      'Industry Context',
      'ADA website lawsuits in the US exceeded 4,500 in 2024 alone. The EU EAA will bring similar enforcement to Europe starting June 2025.',
      'info'
    )}

    <!-- Tech Stack Section -->
    <div style="background: linear-gradient(135deg, ${EMAIL_STYLES.colors.primary} 0%, #4F46E5 100%); border-radius: 12px; padding: 24px; margin: 24px 0;">
      <h3 style="margin: 0 0 16px; font-size: 16px; font-weight: 600; color: #ffffff; text-align: center;">
        Enterprise-Grade Technology
      </h3>
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <td style="text-align: center; padding: 8px;">
            <span style="display: block; font-size: 18px; font-weight: 700; color: #ffffff;">axe-core</span>
            <span style="font-size: 12px; color: rgba(255,255,255,0.8);">Deque Systems</span>
          </td>
          <td style="text-align: center; padding: 8px;">
            <span style="display: block; font-size: 18px; font-weight: 700; color: #ffffff;">WCAG 2.1</span>
            <span style="font-size: 12px; color: rgba(255,255,255,0.8);">Level AA</span>
          </td>
          <td style="text-align: center; padding: 8px;">
            <span style="display: block; font-size: 18px; font-weight: 700; color: #ffffff;">EAA + ADA</span>
            <span style="font-size: 12px; color: rgba(255,255,255,0.8);">Global Coverage</span>
          </td>
        </tr>
      </table>
    </div>

    ${ctaButton('See What We Can Do For You', 'https://inclusiv.app?utm_source=cold_email&utm_campaign=social_proof')}

    <p style="margin: 24px 0 0; color: ${EMAIL_STYLES.colors.textMuted}; font-size: 14px; text-align: center;">
      Reply to this email for a personalized quote based on your site's needs.
    </p>
  `;

  return baseTemplate(content, `See how companies like {companyName} achieved EAA compliance in under 72 hours`);
}

/**
 * Email 4: Final Value Proposition (Day 7)
 */
export function coldFinalValue(lead: Lead): string {
  const content = `
    <h1 style="margin: 0 0 16px; font-size: 28px; font-weight: 700; color: ${EMAIL_STYLES.colors.text};">
      Final Question: Can We Help {companyName}?
    </h1>

    <p style="margin: 0 0 24px; color: ${EMAIL_STYLES.colors.textMuted}; font-size: 16px; line-height: 1.6;">
      Hi {firstName},<br><br>
      I've sent a few emails about the upcoming EAA deadline and wanted to send one final note.
    </p>

    ${deadlineCountdown()}

    <h2 style="margin: 32px 0 16px; font-size: 18px; font-weight: 600; color: ${EMAIL_STYLES.colors.text};">
      Here's What I Know About Your Situation
    </h2>

    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin: 16px 0; background-color: ${EMAIL_STYLES.colors.background}; border-radius: 8px;">
      <tr>
        <td style="padding: 16px;">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td style="padding: 8px 0;">
                <span style="color: ${EMAIL_STYLES.colors.textMuted};">Website:</span>
                <span style="float: right; font-weight: 600; color: ${EMAIL_STYLES.colors.text};">{domain}</span>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-top: 1px solid ${EMAIL_STYLES.colors.border};">
                <span style="color: ${EMAIL_STYLES.colors.textMuted};">Platform:</span>
                <span style="float: right; font-weight: 600; color: ${EMAIL_STYLES.colors.text};">{platform}</span>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-top: 1px solid ${EMAIL_STYLES.colors.border};">
                <span style="color: ${EMAIL_STYLES.colors.textMuted};">EAA Deadline:</span>
                <span style="float: right; font-weight: 600; color: ${EMAIL_STYLES.colors.danger};">{days} days away</span>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-top: 1px solid ${EMAIL_STYLES.colors.border};">
                <span style="color: ${EMAIL_STYLES.colors.textMuted};">EU Market at Risk:</span>
                <span style="float: right; font-weight: 600; color: ${EMAIL_STYLES.colors.warning};">450M+ consumers</span>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <h2 style="margin: 32px 0 16px; font-size: 18px; font-weight: 600; color: ${EMAIL_STYLES.colors.text};">
      Three Options Moving Forward
    </h2>

    <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
      <tr>
        <td style="padding: 16px; background-color: #D1FAE5; border-radius: 8px; margin-bottom: 12px;">
          <strong style="color: ${EMAIL_STYLES.colors.secondary};">Option 1: We Fix Everything</strong>
          <p style="margin: 8px 0 0; color: ${EMAIL_STYLES.colors.textMuted}; font-size: 14px;">
            Our team handles complete remediation. Typical timeline: 48-72 hours. Includes compliance certificate and 90-day monitoring.
          </p>
        </td>
      </tr>
      <tr><td style="height: 12px;"></td></tr>
      <tr>
        <td style="padding: 16px; background-color: #DBEAFE; border-radius: 8px;">
          <strong style="color: #1D4ED8;">Option 2: DIY with Our Guidance</strong>
          <p style="margin: 8px 0 0; color: ${EMAIL_STYLES.colors.textMuted}; font-size: 14px;">
            Get our detailed scan report and step-by-step fix guides. You implement, we verify. Budget-friendly for technical teams.
          </p>
        </td>
      </tr>
      <tr><td style="height: 12px;"></td></tr>
      <tr>
        <td style="padding: 16px; background-color: #FEF3C7; border-radius: 8px;">
          <strong style="color: #B45309;">Option 3: Risk It</strong>
          <p style="margin: 8px 0 0; color: ${EMAIL_STYLES.colors.textMuted}; font-size: 14px;">
            Do nothing and hope enforcement doesn't reach you. Not recommended - fines start at €10,000 and can reach €100,000+.
          </p>
        </td>
      </tr>
    </table>

    <p style="margin: 24px 0; color: ${EMAIL_STYLES.colors.text}; font-size: 16px; line-height: 1.6;">
      If you're interested in Options 1 or 2, just reply to this email. I'll personally send over a custom quote within 24 hours.
    </p>

    ${ctaButton('Get Your Custom Quote', 'https://inclusiv.app/contact?utm_source=cold_email&utm_campaign=final_value')}

    <p style="margin: 24px 0 0; color: ${EMAIL_STYLES.colors.textMuted}; font-size: 14px;">
      This is the last email in this sequence. If you ever need help with accessibility in the future, you know where to find us.
    </p>

    <p style="margin: 16px 0 0; color: ${EMAIL_STYLES.colors.textMuted}; font-size: 14px;">
      Best regards,<br>
      <strong style="color: ${EMAIL_STYLES.colors.text};">The Inclusiv Team</strong>
    </p>
  `;

  return baseTemplate(content, `Final: {days} days until EAA deadline. Three options for {companyName}.`);
}

// Export all cold lead templates
export const coldLeadTemplates = {
  'cold-initial-outreach': coldInitialOutreach,
  'cold-issue-detail': coldIssueDetail,
  'cold-social-proof': coldSocialProof,
  'cold-final-value': coldFinalValue,
};
