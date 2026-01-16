/**
 * Email Automation Sequences for Inclusiv
 * Lead nurturing and follow-up email sequences
 */

import { Resend } from 'resend';

// Lazy-initialized Resend client (prevents build-time errors when API key is not set)
let resendClient: Resend | null = null;

function getResendClient(): Resend {
  if (!resendClient) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error('RESEND_API_KEY environment variable is not set');
    }
    resendClient = new Resend(apiKey);
  }
  return resendClient;
}

// Email sender configuration
const FROM_EMAIL = process.env.FROM_EMAIL || 'Inclusiv <hello@tryinclusiv.com>';
const REPLY_TO = process.env.REPLY_TO || 'support@tryinclusiv.com';

// Sequence Types
export type SequenceType = 'welcome' | 'cold_lead';

export interface Lead {
  id: string;
  email: string;
  name?: string;
  companyName?: string;
  websiteUrl: string;
  scanResults?: ScanResults;
  createdAt: Date;
  source?: string;
}

export interface ScanResults {
  score: number;
  totalIssues: number;
  criticalIssues: number;
  platform: string;
  topIssues: Array<{
    id: string;
    impact: string;
    description: string;
    count: number;
  }>;
  scannedAt: string;
}

export interface SequenceEmail {
  id: string;
  sequenceType: SequenceType;
  emailNumber: number;
  delayDays: number;
  subject: string;
  templateId: string;
}

export interface ScheduledEmail {
  id: string;
  leadId: string;
  sequenceType: SequenceType;
  emailNumber: number;
  scheduledFor: Date;
  sentAt?: Date;
  status: 'pending' | 'sent' | 'failed' | 'cancelled';
}

// ============================================
// WELCOME SEQUENCE DEFINITION
// ============================================

export const WELCOME_SEQUENCE: SequenceEmail[] = [
  {
    id: 'welcome-1',
    sequenceType: 'welcome',
    emailNumber: 1,
    delayDays: 0, // Immediate
    subject: 'Your Accessibility Report is Ready - {score}/100',
    templateId: 'welcome-report',
  },
  {
    id: 'welcome-2',
    sequenceType: 'welcome',
    emailNumber: 2,
    delayDays: 1,
    subject: 'How to Fix Your Top 3 Accessibility Issues',
    templateId: 'welcome-fix-guide',
  },
  {
    id: 'welcome-3',
    sequenceType: 'welcome',
    emailNumber: 3,
    delayDays: 3,
    subject: 'EAA Deadline Alert: Only {days} Days Left',
    templateId: 'welcome-deadline-reminder',
  },
  {
    id: 'welcome-4',
    sequenceType: 'welcome',
    emailNumber: 4,
    delayDays: 5,
    subject: 'Special Offer: Full Accessibility Remediation',
    templateId: 'welcome-special-offer',
  },
  {
    id: 'welcome-5',
    sequenceType: 'welcome',
    emailNumber: 5,
    delayDays: 7,
    subject: 'Last Chance: Secure Your Compliance Before June 28th',
    templateId: 'welcome-last-chance',
  },
];

// ============================================
// COLD LEAD SEQUENCE DEFINITION
// ============================================

export const COLD_LEAD_SEQUENCE: SequenceEmail[] = [
  {
    id: 'cold-1',
    sequenceType: 'cold_lead',
    emailNumber: 1,
    delayDays: 0, // Immediate
    subject: 'Is {companyName} Ready for the EU Accessibility Law?',
    templateId: 'cold-initial-outreach',
  },
  {
    id: 'cold-2',
    sequenceType: 'cold_lead',
    emailNumber: 2,
    delayDays: 2,
    subject: 'We Found {issueCount} Accessibility Issues on {domain}',
    templateId: 'cold-issue-detail',
  },
  {
    id: 'cold-3',
    sequenceType: 'cold_lead',
    emailNumber: 3,
    delayDays: 5,
    subject: 'How [Similar Company] Avoided a €100K Fine',
    templateId: 'cold-social-proof',
  },
  {
    id: 'cold-4',
    sequenceType: 'cold_lead',
    emailNumber: 4,
    delayDays: 7,
    subject: 'Final: Can We Help {companyName} Become Compliant?',
    templateId: 'cold-final-value',
  },
];

// ============================================
// EMAIL SENDING FUNCTIONS
// ============================================

/**
 * Calculate days until EAA deadline (June 28, 2025)
 */
export function getDaysUntilEAADeadline(): number {
  const deadline = new Date('2025-06-28');
  const today = new Date();
  const diffTime = deadline.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(0, diffDays);
}

/**
 * Get domain from URL
 */
export function getDomainFromUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.replace('www.', '');
  } catch {
    return url;
  }
}

/**
 * Get score color for email display
 */
export function getScoreColor(score: number): { bg: string; text: string; label: string } {
  if (score >= 80) {
    return { bg: '#10B981', text: '#ffffff', label: 'Good' };
  } else if (score >= 60) {
    return { bg: '#F59E0B', text: '#ffffff', label: 'Needs Work' };
  } else if (score >= 40) {
    return { bg: '#F97316', text: '#ffffff', label: 'Poor' };
  } else {
    return { bg: '#EF4444', text: '#ffffff', label: 'Critical' };
  }
}

/**
 * Replace template variables in subject and content
 */
export function replaceTemplateVariables(
  text: string,
  lead: Lead,
  additionalVars?: Record<string, string>
): string {
  const domain = getDomainFromUrl(lead.websiteUrl);
  const daysUntilDeadline = getDaysUntilEAADeadline();

  const vars: Record<string, string> = {
    '{name}': lead.name || 'there',
    '{firstName}': lead.name?.split(' ')[0] || 'there',
    '{companyName}': lead.companyName || domain,
    '{domain}': domain,
    '{websiteUrl}': lead.websiteUrl,
    '{score}': lead.scanResults?.score?.toString() || 'N/A',
    '{totalIssues}': lead.scanResults?.totalIssues?.toString() || '0',
    '{criticalIssues}': lead.scanResults?.criticalIssues?.toString() || '0',
    '{issueCount}': lead.scanResults?.totalIssues?.toString() || '0',
    '{platform}': lead.scanResults?.platform || 'your website',
    '{days}': daysUntilDeadline.toString(),
    '{deadline}': 'June 28, 2025',
    ...additionalVars,
  };

  let result = text;
  for (const [key, value] of Object.entries(vars)) {
    result = result.replace(new RegExp(key.replace(/[{}]/g, '\\$&'), 'g'), value);
  }
  return result;
}

/**
 * Send a single email using Resend
 */
export async function sendEmail(params: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
  tags?: Array<{ name: string; value: string }>;
}): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    const resend = getResendClient();
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: params.to,
      subject: params.subject,
      html: params.html,
      replyTo: params.replyTo || REPLY_TO,
      tags: params.tags,
    });

    if (error) {
      console.error('Resend error:', error);
      return { success: false, error: error.message };
    }

    return { success: true, messageId: data?.id };
  } catch (error) {
    console.error('Email send error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Send a sequence email to a lead
 */
export async function sendSequenceEmail(
  lead: Lead,
  sequenceEmail: SequenceEmail,
  htmlContent: string
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const subject = replaceTemplateVariables(sequenceEmail.subject, lead);
  const html = replaceTemplateVariables(htmlContent, lead);

  return sendEmail({
    to: lead.email,
    subject,
    html,
    tags: [
      { name: 'sequence', value: sequenceEmail.sequenceType },
      { name: 'email_number', value: sequenceEmail.emailNumber.toString() },
      { name: 'lead_id', value: lead.id },
    ],
  });
}

/**
 * Start a welcome sequence for a new lead
 */
export async function startWelcomeSequence(
  lead: Lead,
  getEmailTemplate: (templateId: string, lead: Lead) => string
): Promise<ScheduledEmail[]> {
  const scheduledEmails: ScheduledEmail[] = [];
  const now = new Date();

  for (const email of WELCOME_SEQUENCE) {
    const scheduledFor = new Date(now);
    scheduledFor.setDate(scheduledFor.getDate() + email.delayDays);

    const scheduledEmail: ScheduledEmail = {
      id: `${lead.id}-${email.id}`,
      leadId: lead.id,
      sequenceType: 'welcome',
      emailNumber: email.emailNumber,
      scheduledFor,
      status: 'pending',
    };

    // Send immediate emails right away
    if (email.delayDays === 0) {
      const htmlContent = getEmailTemplate(email.templateId, lead);
      const result = await sendSequenceEmail(lead, email, htmlContent);

      if (result.success) {
        scheduledEmail.status = 'sent';
        scheduledEmail.sentAt = new Date();
      } else {
        scheduledEmail.status = 'failed';
      }
    }

    scheduledEmails.push(scheduledEmail);
  }

  return scheduledEmails;
}

/**
 * Start a cold lead sequence
 */
export async function startColdLeadSequence(
  lead: Lead,
  getEmailTemplate: (templateId: string, lead: Lead) => string
): Promise<ScheduledEmail[]> {
  const scheduledEmails: ScheduledEmail[] = [];
  const now = new Date();

  for (const email of COLD_LEAD_SEQUENCE) {
    const scheduledFor = new Date(now);
    scheduledFor.setDate(scheduledFor.getDate() + email.delayDays);

    const scheduledEmail: ScheduledEmail = {
      id: `${lead.id}-${email.id}`,
      leadId: lead.id,
      sequenceType: 'cold_lead',
      emailNumber: email.emailNumber,
      scheduledFor,
      status: 'pending',
    };

    // Send immediate emails right away
    if (email.delayDays === 0) {
      const htmlContent = getEmailTemplate(email.templateId, lead);
      const result = await sendSequenceEmail(lead, email, htmlContent);

      if (result.success) {
        scheduledEmail.status = 'sent';
        scheduledEmail.sentAt = new Date();
      } else {
        scheduledEmail.status = 'failed';
      }
    }

    scheduledEmails.push(scheduledEmail);
  }

  return scheduledEmails;
}

/**
 * Process scheduled emails (to be called by cron job)
 */
export async function processScheduledEmails(
  getScheduledEmails: () => Promise<ScheduledEmail[]>,
  getLeadById: (id: string) => Promise<Lead | null>,
  getEmailTemplate: (templateId: string, lead: Lead) => string,
  updateEmailStatus: (emailId: string, status: ScheduledEmail['status'], sentAt?: Date) => Promise<void>
): Promise<{ processed: number; sent: number; failed: number }> {
  const now = new Date();
  const emails = await getScheduledEmails();

  const pendingEmails = emails.filter(
    (email) => email.status === 'pending' && new Date(email.scheduledFor) <= now
  );

  let sent = 0;
  let failed = 0;

  for (const scheduledEmail of pendingEmails) {
    const lead = await getLeadById(scheduledEmail.leadId);
    if (!lead) {
      await updateEmailStatus(scheduledEmail.id, 'cancelled');
      continue;
    }

    // Get the sequence email definition
    const sequence = scheduledEmail.sequenceType === 'welcome'
      ? WELCOME_SEQUENCE
      : COLD_LEAD_SEQUENCE;

    const sequenceEmail = sequence.find(
      (e) => e.emailNumber === scheduledEmail.emailNumber
    );

    if (!sequenceEmail) {
      await updateEmailStatus(scheduledEmail.id, 'cancelled');
      continue;
    }

    const htmlContent = getEmailTemplate(sequenceEmail.templateId, lead);
    const result = await sendSequenceEmail(lead, sequenceEmail, htmlContent);

    if (result.success) {
      await updateEmailStatus(scheduledEmail.id, 'sent', new Date());
      sent++;
    } else {
      await updateEmailStatus(scheduledEmail.id, 'failed');
      failed++;
    }
  }

  return { processed: pendingEmails.length, sent, failed };
}

/**
 * Cancel a lead's email sequence
 */
export async function cancelSequence(
  leadId: string,
  sequenceType: SequenceType,
  updateEmailStatus: (emailId: string, status: ScheduledEmail['status']) => Promise<void>,
  getScheduledEmails: () => Promise<ScheduledEmail[]>
): Promise<number> {
  const emails = await getScheduledEmails();
  const toCancel = emails.filter(
    (e) => e.leadId === leadId &&
           e.sequenceType === sequenceType &&
           e.status === 'pending'
  );

  for (const email of toCancel) {
    await updateEmailStatus(email.id, 'cancelled');
  }

  return toCancel.length;
}

// Export all sequences for reference
export const EMAIL_SEQUENCES = {
  welcome: WELCOME_SEQUENCE,
  cold_lead: COLD_LEAD_SEQUENCE,
};
