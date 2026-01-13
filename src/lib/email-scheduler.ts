/**
 * Email Scheduler
 * Handles scheduling and processing of automated email sequences
 *
 * This module provides a complete email scheduling system that can be
 * integrated with any database backend (PostgreSQL, MongoDB, etc.)
 */

import {
  WELCOME_SEQUENCE,
  COLD_LEAD_SEQUENCE,
  sendSequenceEmail,
  replaceTemplateVariables,
  type Lead,
  type SequenceEmail,
  type SequenceType,
  type ScheduledEmail,
} from './email-sequences';
import { getEmailTemplate } from '@/emails';

// ============================================
// DATABASE INTERFACE
// ============================================

/**
 * Database adapter interface
 * Implement this interface for your specific database
 */
export interface EmailDatabaseAdapter {
  // Lead operations
  createLead(lead: Lead): Promise<Lead>;
  getLead(id: string): Promise<Lead | null>;
  updateLead(id: string, data: Partial<Lead>): Promise<Lead>;

  // Scheduled email operations
  createScheduledEmail(email: Omit<ScheduledEmail, 'id'>): Promise<ScheduledEmail>;
  getScheduledEmail(id: string): Promise<ScheduledEmail | null>;
  updateScheduledEmail(id: string, data: Partial<ScheduledEmail>): Promise<ScheduledEmail>;

  // Query operations
  getPendingEmails(before?: Date): Promise<ScheduledEmail[]>;
  getLeadEmails(leadId: string): Promise<ScheduledEmail[]>;
  getEmailsBySequence(sequenceType: SequenceType): Promise<ScheduledEmail[]>;
}

// ============================================
// IN-MEMORY DATABASE ADAPTER (for development)
// ============================================

class InMemoryDatabaseAdapter implements EmailDatabaseAdapter {
  private leads: Map<string, Lead> = new Map();
  private emails: Map<string, ScheduledEmail> = new Map();
  private emailCounter = 0;

  async createLead(lead: Lead): Promise<Lead> {
    const id = lead.id || `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const newLead = { ...lead, id, createdAt: lead.createdAt || new Date() };
    this.leads.set(id, newLead);
    return newLead;
  }

  async getLead(id: string): Promise<Lead | null> {
    return this.leads.get(id) || null;
  }

  async updateLead(id: string, data: Partial<Lead>): Promise<Lead> {
    const lead = this.leads.get(id);
    if (!lead) throw new Error(`Lead not found: ${id}`);
    const updated = { ...lead, ...data };
    this.leads.set(id, updated);
    return updated;
  }

  async createScheduledEmail(email: Omit<ScheduledEmail, 'id'>): Promise<ScheduledEmail> {
    const id = `email_${++this.emailCounter}`;
    const newEmail = { ...email, id } as ScheduledEmail;
    this.emails.set(id, newEmail);
    return newEmail;
  }

  async getScheduledEmail(id: string): Promise<ScheduledEmail | null> {
    return this.emails.get(id) || null;
  }

  async updateScheduledEmail(id: string, data: Partial<ScheduledEmail>): Promise<ScheduledEmail> {
    const email = this.emails.get(id);
    if (!email) throw new Error(`Scheduled email not found: ${id}`);
    const updated = { ...email, ...data };
    this.emails.set(id, updated);
    return updated;
  }

  async getPendingEmails(before?: Date): Promise<ScheduledEmail[]> {
    const now = before || new Date();
    return Array.from(this.emails.values()).filter(
      e => e.status === 'pending' && new Date(e.scheduledFor) <= now
    );
  }

  async getLeadEmails(leadId: string): Promise<ScheduledEmail[]> {
    return Array.from(this.emails.values()).filter(e => e.leadId === leadId);
  }

  async getEmailsBySequence(sequenceType: SequenceType): Promise<ScheduledEmail[]> {
    return Array.from(this.emails.values()).filter(e => e.sequenceType === sequenceType);
  }
}

// ============================================
// EMAIL SCHEDULER CLASS
// ============================================

export class EmailScheduler {
  private db: EmailDatabaseAdapter;

  constructor(adapter?: EmailDatabaseAdapter) {
    this.db = adapter || new InMemoryDatabaseAdapter();
  }

  /**
   * Start a welcome sequence for a lead
   */
  async startWelcomeSequence(lead: Lead): Promise<{
    lead: Lead;
    scheduledEmails: ScheduledEmail[];
    firstEmailResult: { success: boolean; messageId?: string; error?: string };
  }> {
    // Create or update lead
    const savedLead = await this.db.createLead(lead);

    // Schedule all emails in the sequence
    const scheduledEmails: ScheduledEmail[] = [];
    const now = new Date();

    for (const seqEmail of WELCOME_SEQUENCE) {
      const scheduledFor = new Date(now);
      scheduledFor.setDate(scheduledFor.getDate() + seqEmail.delayDays);

      const scheduled = await this.db.createScheduledEmail({
        leadId: savedLead.id,
        sequenceType: 'welcome',
        emailNumber: seqEmail.emailNumber,
        scheduledFor,
        status: 'pending',
      });

      scheduledEmails.push(scheduled);
    }

    // Send the first email immediately
    const firstEmail = scheduledEmails[0];
    const firstSeqEmail = WELCOME_SEQUENCE[0];
    const htmlContent = getEmailTemplate(firstSeqEmail.templateId, savedLead);
    const result = await sendSequenceEmail(savedLead, firstSeqEmail, htmlContent);

    if (result.success) {
      await this.db.updateScheduledEmail(firstEmail.id, {
        status: 'sent',
        sentAt: new Date(),
      });
      firstEmail.status = 'sent';
      firstEmail.sentAt = new Date();
    } else {
      await this.db.updateScheduledEmail(firstEmail.id, { status: 'failed' });
      firstEmail.status = 'failed';
    }

    return {
      lead: savedLead,
      scheduledEmails,
      firstEmailResult: result,
    };
  }

  /**
   * Start a cold lead sequence
   */
  async startColdLeadSequence(lead: Lead): Promise<{
    lead: Lead;
    scheduledEmails: ScheduledEmail[];
    firstEmailResult: { success: boolean; messageId?: string; error?: string };
  }> {
    // Create or update lead
    const savedLead = await this.db.createLead(lead);

    // Schedule all emails in the sequence
    const scheduledEmails: ScheduledEmail[] = [];
    const now = new Date();

    for (const seqEmail of COLD_LEAD_SEQUENCE) {
      const scheduledFor = new Date(now);
      scheduledFor.setDate(scheduledFor.getDate() + seqEmail.delayDays);

      const scheduled = await this.db.createScheduledEmail({
        leadId: savedLead.id,
        sequenceType: 'cold_lead',
        emailNumber: seqEmail.emailNumber,
        scheduledFor,
        status: 'pending',
      });

      scheduledEmails.push(scheduled);
    }

    // Send the first email immediately
    const firstEmail = scheduledEmails[0];
    const firstSeqEmail = COLD_LEAD_SEQUENCE[0];
    const htmlContent = getEmailTemplate(firstSeqEmail.templateId, savedLead);
    const result = await sendSequenceEmail(savedLead, firstSeqEmail, htmlContent);

    if (result.success) {
      await this.db.updateScheduledEmail(firstEmail.id, {
        status: 'sent',
        sentAt: new Date(),
      });
      firstEmail.status = 'sent';
      firstEmail.sentAt = new Date();
    } else {
      await this.db.updateScheduledEmail(firstEmail.id, { status: 'failed' });
      firstEmail.status = 'failed';
    }

    return {
      lead: savedLead,
      scheduledEmails,
      firstEmailResult: result,
    };
  }

  /**
   * Process all due scheduled emails
   * Call this from a cron job
   */
  async processDueEmails(): Promise<{
    processed: number;
    sent: number;
    failed: number;
    errors: Array<{ emailId: string; error: string }>;
  }> {
    const dueEmails = await this.db.getPendingEmails();
    const errors: Array<{ emailId: string; error: string }> = [];
    let sent = 0;
    let failed = 0;

    for (const scheduled of dueEmails) {
      try {
        const lead = await this.db.getLead(scheduled.leadId);
        if (!lead) {
          await this.db.updateScheduledEmail(scheduled.id, { status: 'cancelled' });
          continue;
        }

        // Get the sequence email definition
        const sequence = scheduled.sequenceType === 'welcome'
          ? WELCOME_SEQUENCE
          : COLD_LEAD_SEQUENCE;

        const seqEmail = sequence.find(e => e.emailNumber === scheduled.emailNumber);
        if (!seqEmail) {
          await this.db.updateScheduledEmail(scheduled.id, { status: 'cancelled' });
          continue;
        }

        // Generate and send email
        const htmlContent = getEmailTemplate(seqEmail.templateId, lead);
        const result = await sendSequenceEmail(lead, seqEmail, htmlContent);

        if (result.success) {
          await this.db.updateScheduledEmail(scheduled.id, {
            status: 'sent',
            sentAt: new Date(),
          });
          sent++;
        } else {
          await this.db.updateScheduledEmail(scheduled.id, { status: 'failed' });
          failed++;
          errors.push({ emailId: scheduled.id, error: result.error || 'Unknown error' });
        }
      } catch (error) {
        failed++;
        errors.push({
          emailId: scheduled.id,
          error: error instanceof Error ? error.message : 'Processing error',
        });
      }
    }

    return {
      processed: dueEmails.length,
      sent,
      failed,
      errors,
    };
  }

  /**
   * Cancel a lead's pending emails
   */
  async cancelLeadSequence(leadId: string, sequenceType?: SequenceType): Promise<number> {
    const emails = await this.db.getLeadEmails(leadId);
    let cancelled = 0;

    for (const email of emails) {
      if (email.status === 'pending') {
        if (!sequenceType || email.sequenceType === sequenceType) {
          await this.db.updateScheduledEmail(email.id, { status: 'cancelled' });
          cancelled++;
        }
      }
    }

    return cancelled;
  }

  /**
   * Get scheduler stats
   */
  async getStats(): Promise<{
    pendingWelcome: number;
    pendingCold: number;
    dueNow: number;
  }> {
    const welcomeEmails = await this.db.getEmailsBySequence('welcome');
    const coldEmails = await this.db.getEmailsBySequence('cold_lead');
    const dueEmails = await this.db.getPendingEmails();

    return {
      pendingWelcome: welcomeEmails.filter(e => e.status === 'pending').length,
      pendingCold: coldEmails.filter(e => e.status === 'pending').length,
      dueNow: dueEmails.length,
    };
  }

  /**
   * Preview an email for a lead without sending
   */
  async previewEmail(lead: Lead, templateId: string): Promise<{
    subject: string;
    html: string;
  }> {
    const allSequences = [...WELCOME_SEQUENCE, ...COLD_LEAD_SEQUENCE];
    const seqEmail = allSequences.find(e => e.templateId === templateId);

    const html = getEmailTemplate(templateId, lead);
    const subject = seqEmail
      ? replaceTemplateVariables(seqEmail.subject, lead)
      : 'Preview';

    return { subject, html };
  }
}

// Export singleton instance
export const emailScheduler = new EmailScheduler();
