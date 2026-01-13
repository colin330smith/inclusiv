/**
 * Base HTML Email Template for Inclusiv
 * Professional, accessible email design system
 */

export const EMAIL_STYLES = {
  colors: {
    primary: '#6366F1', // Indigo
    primaryDark: '#4F46E5',
    secondary: '#10B981', // Emerald
    danger: '#EF4444',
    warning: '#F59E0B',
    text: '#1F2937',
    textMuted: '#6B7280',
    background: '#F9FAFB',
    white: '#FFFFFF',
    border: '#E5E7EB',
  },
  fonts: {
    primary: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
};

export function baseTemplate(content: string, previewText?: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Inclusiv</title>
  ${previewText ? `<meta name="description" content="${previewText}">` : ''}
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style>
    /* Reset styles */
    body, table, td, p, a, li, blockquote {
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }
    table, td {
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }
    img {
      -ms-interpolation-mode: bicubic;
      border: 0;
      height: auto;
      line-height: 100%;
      outline: none;
      text-decoration: none;
    }
    body {
      height: 100% !important;
      margin: 0 !important;
      padding: 0 !important;
      width: 100% !important;
      background-color: ${EMAIL_STYLES.colors.background};
    }
    a {
      color: ${EMAIL_STYLES.colors.primary};
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
    .button {
      display: inline-block;
      padding: 14px 28px;
      background-color: ${EMAIL_STYLES.colors.primary};
      color: #ffffff !important;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 600;
      font-size: 16px;
    }
    .button:hover {
      background-color: ${EMAIL_STYLES.colors.primaryDark};
      text-decoration: none;
    }
    .button-secondary {
      background-color: ${EMAIL_STYLES.colors.secondary};
    }
    @media screen and (max-width: 600px) {
      .container {
        width: 100% !important;
        padding: 0 16px !important;
      }
      .content {
        padding: 24px 16px !important;
      }
      h1 {
        font-size: 24px !important;
      }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: ${EMAIL_STYLES.colors.background}; font-family: ${EMAIL_STYLES.fonts.primary};">
  ${previewText ? `
  <!-- Preview text -->
  <div style="display: none; max-height: 0; overflow: hidden;">
    ${previewText}
    &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
  </div>
  ` : ''}

  <!-- Email wrapper -->
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: ${EMAIL_STYLES.colors.background};">
    <tr>
      <td align="center" style="padding: 40px 0;">

        <!-- Container -->
        <table role="presentation" class="container" cellpadding="0" cellspacing="0" width="600" style="max-width: 600px; background-color: ${EMAIL_STYLES.colors.white}; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">

          <!-- Header -->
          <tr>
            <td align="center" style="padding: 32px 40px 24px; border-bottom: 1px solid ${EMAIL_STYLES.colors.border};">
              <a href="https://inclusiv.app" style="text-decoration: none;">
                <span style="font-size: 28px; font-weight: 700; color: ${EMAIL_STYLES.colors.primary};">Inclusiv</span>
              </a>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td class="content" style="padding: 40px;">
              ${content}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px; background-color: ${EMAIL_STYLES.colors.background}; border-radius: 0 0 12px 12px; border-top: 1px solid ${EMAIL_STYLES.colors.border};">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center" style="padding-bottom: 16px;">
                    <a href="https://inclusiv.app" style="color: ${EMAIL_STYLES.colors.textMuted}; font-size: 14px; margin: 0 12px;">Website</a>
                    <a href="https://inclusiv.app/pricing" style="color: ${EMAIL_STYLES.colors.textMuted}; font-size: 14px; margin: 0 12px;">Pricing</a>
                    <a href="mailto:support@inclusiv.app" style="color: ${EMAIL_STYLES.colors.textMuted}; font-size: 14px; margin: 0 12px;">Support</a>
                  </td>
                </tr>
                <tr>
                  <td align="center">
                    <p style="margin: 0; color: ${EMAIL_STYLES.colors.textMuted}; font-size: 12px; line-height: 1.5;">
                      Inclusiv - Making the web accessible for everyone<br>
                      <a href="{unsubscribe_url}" style="color: ${EMAIL_STYLES.colors.textMuted};">Unsubscribe</a> |
                      <a href="{preferences_url}" style="color: ${EMAIL_STYLES.colors.textMuted};">Email preferences</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>
</body>
</html>
`;
}

// Score badge component
export function scoreBadge(score: number): string {
  let bgColor: string;
  let label: string;

  if (score >= 80) {
    bgColor = EMAIL_STYLES.colors.secondary;
    label = 'Good';
  } else if (score >= 60) {
    bgColor = EMAIL_STYLES.colors.warning;
    label = 'Needs Work';
  } else if (score >= 40) {
    bgColor = '#F97316';
    label = 'Poor';
  } else {
    bgColor = EMAIL_STYLES.colors.danger;
    label = 'Critical';
  }

  return `
    <div style="text-align: center; margin: 24px 0;">
      <div style="display: inline-block; background-color: ${bgColor}; border-radius: 16px; padding: 32px 48px;">
        <span style="display: block; font-size: 56px; font-weight: 700; color: #ffffff; line-height: 1;">{score}</span>
        <span style="display: block; font-size: 14px; color: rgba(255,255,255,0.9); margin-top: 4px;">out of 100</span>
        <span style="display: inline-block; background: rgba(255,255,255,0.2); padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 600; color: #ffffff; margin-top: 8px;">${label}</span>
      </div>
    </div>
  `;
}

// Issue list component
export function issueList(showPlaceholders: boolean = true): string {
  if (showPlaceholders) {
    return `
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin: 24px 0;">
        {issues_html}
      </table>
    `;
  }
  return '';
}

// Single issue row component
export function issueRow(impact: string, description: string, count: number): string {
  const impactColors: Record<string, string> = {
    critical: EMAIL_STYLES.colors.danger,
    serious: '#F97316',
    moderate: EMAIL_STYLES.colors.warning,
    minor: EMAIL_STYLES.colors.textMuted,
  };

  const color = impactColors[impact] || impactColors.moderate;

  return `
    <tr>
      <td style="padding: 12px 0; border-bottom: 1px solid ${EMAIL_STYLES.colors.border};">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td width="8" style="background-color: ${color}; border-radius: 4px;"></td>
            <td style="padding-left: 12px;">
              <span style="display: block; font-weight: 600; color: ${EMAIL_STYLES.colors.text}; font-size: 14px;">${description}</span>
              <span style="font-size: 12px; color: ${EMAIL_STYLES.colors.textMuted};">${count} instance${count !== 1 ? 's' : ''} found</span>
            </td>
            <td width="80" align="right">
              <span style="display: inline-block; background-color: ${color}; color: #ffffff; font-size: 11px; font-weight: 600; padding: 3px 8px; border-radius: 4px; text-transform: uppercase;">${impact}</span>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  `;
}

// CTA button component
export function ctaButton(text: string, url: string, variant: 'primary' | 'secondary' = 'primary'): string {
  const bgColor = variant === 'primary' ? EMAIL_STYLES.colors.primary : EMAIL_STYLES.colors.secondary;

  return `
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin: 24px auto;">
      <tr>
        <td align="center" style="border-radius: 8px; background-color: ${bgColor};">
          <a href="${url}" target="_blank" style="display: inline-block; padding: 14px 32px; font-size: 16px; font-weight: 600; color: #ffffff; text-decoration: none; border-radius: 8px;">${text}</a>
        </td>
      </tr>
    </table>
  `;
}

// Deadline countdown component
export function deadlineCountdown(): string {
  return `
    <div style="background: linear-gradient(135deg, ${EMAIL_STYLES.colors.danger} 0%, #DC2626 100%); border-radius: 12px; padding: 24px; margin: 24px 0; text-align: center;">
      <span style="display: block; font-size: 14px; color: rgba(255,255,255,0.9); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">EAA Deadline</span>
      <span style="display: block; font-size: 32px; font-weight: 700; color: #ffffff;">{days} Days Left</span>
      <span style="display: block; font-size: 14px; color: rgba(255,255,255,0.8); margin-top: 4px;">Until June 28, 2025</span>
    </div>
  `;
}

// Testimonial/case study component
export function testimonialBox(quote: string, author: string, company: string): string {
  return `
    <div style="background-color: ${EMAIL_STYLES.colors.background}; border-left: 4px solid ${EMAIL_STYLES.colors.primary}; padding: 20px; margin: 24px 0; border-radius: 0 8px 8px 0;">
      <p style="margin: 0 0 12px; font-style: italic; color: ${EMAIL_STYLES.colors.text}; font-size: 15px; line-height: 1.6;">"${quote}"</p>
      <p style="margin: 0; font-weight: 600; color: ${EMAIL_STYLES.colors.primary}; font-size: 14px;">— ${author}, ${company}</p>
    </div>
  `;
}

// Info box component
export function infoBox(title: string, content: string, type: 'info' | 'warning' | 'success' = 'info'): string {
  const colors: Record<string, { bg: string; border: string; icon: string }> = {
    info: { bg: '#EEF2FF', border: EMAIL_STYLES.colors.primary, icon: 'i' },
    warning: { bg: '#FEF3C7', border: EMAIL_STYLES.colors.warning, icon: '!' },
    success: { bg: '#D1FAE5', border: EMAIL_STYLES.colors.secondary, icon: '✓' },
  };

  const style = colors[type];

  return `
    <div style="background-color: ${style.bg}; border: 1px solid ${style.border}; border-radius: 8px; padding: 16px; margin: 20px 0;">
      <p style="margin: 0 0 8px; font-weight: 600; color: ${EMAIL_STYLES.colors.text}; font-size: 14px;">${title}</p>
      <p style="margin: 0; color: ${EMAIL_STYLES.colors.textMuted}; font-size: 14px; line-height: 1.5;">${content}</p>
    </div>
  `;
}

// Pricing offer box
export function pricingBox(originalPrice: string, offerPrice: string, savings: string, features: string[]): string {
  return `
    <div style="background: linear-gradient(135deg, #4F46E5 0%, #6366F1 100%); border-radius: 12px; padding: 32px; margin: 24px 0; text-align: center;">
      <span style="display: inline-block; background: rgba(255,255,255,0.2); padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 600; color: #ffffff; margin-bottom: 16px;">LIMITED TIME OFFER</span>
      <div style="margin: 16px 0;">
        <span style="font-size: 18px; color: rgba(255,255,255,0.7); text-decoration: line-through;">${originalPrice}</span>
        <span style="display: block; font-size: 48px; font-weight: 700; color: #ffffff; margin: 8px 0;">${offerPrice}</span>
        <span style="display: inline-block; background: ${EMAIL_STYLES.colors.secondary}; padding: 4px 12px; border-radius: 4px; font-size: 14px; font-weight: 600; color: #ffffff;">Save ${savings}</span>
      </div>
      <ul style="text-align: left; margin: 24px 0; padding: 0; list-style: none;">
        ${features.map(f => `<li style="color: #ffffff; font-size: 14px; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">✓ ${f}</li>`).join('')}
      </ul>
    </div>
  `;
}
