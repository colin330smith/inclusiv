/**
 * Email Templates Index
 * Central export for all email templates
 */

import { welcomeTemplates } from './welcome-sequence';
import { coldLeadTemplates } from './cold-lead-sequence';
import type { Lead } from '../lib/email-sequences';

// Combine all templates
export const emailTemplates = {
  ...welcomeTemplates,
  ...coldLeadTemplates,
};

// Template function type
export type EmailTemplateFunction = (lead: Lead) => string;

/**
 * Get an email template by ID
 */
export function getEmailTemplate(templateId: string, lead: Lead): string {
  const templateFn = emailTemplates[templateId as keyof typeof emailTemplates];

  if (!templateFn) {
    throw new Error(`Email template not found: ${templateId}`);
  }

  return templateFn(lead);
}

/**
 * List all available template IDs
 */
export function listTemplateIds(): string[] {
  return Object.keys(emailTemplates);
}

// Re-export templates and components
export { welcomeTemplates } from './welcome-sequence';
export { coldLeadTemplates } from './cold-lead-sequence';
export {
  baseTemplate,
  scoreBadge,
  ctaButton,
  deadlineCountdown,
  testimonialBox,
  infoBox,
  pricingBox,
  EMAIL_STYLES,
} from './base-template';
