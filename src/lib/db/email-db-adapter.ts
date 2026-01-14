/**
 * Supabase Database Adapter for Email Scheduler
 * Replaces in-memory storage with persistent database storage
 */

import { supabaseAdmin } from '@/lib/supabase';
import type { EmailDatabaseAdapter } from '@/lib/email-scheduler';
import type { Lead, ScheduledEmail, SequenceType } from '@/lib/email-sequences';
import type { Lead as DbLead, ScheduledEmail as DbScheduledEmail } from '@/types/database';

export class SupabaseEmailDatabaseAdapter implements EmailDatabaseAdapter {
  async createLead(lead: Lead): Promise<Lead> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabaseAdmin as any)
      .from('leads')
      .upsert({
        email: lead.email,
        url: lead.websiteUrl,
        source: lead.source || 'unknown',
        name: lead.name,
        company_name: lead.companyName,
        scan_score: lead.scanResults?.score,
        total_issues: lead.scanResults?.totalIssues,
        critical_issues: lead.scanResults?.criticalIssues,
        platform_detected: lead.scanResults?.platform,
      }, {
        onConflict: 'email',
      })
      .select()
      .single() as { data: DbLead | null; error: Error | null };

    if (error || !data) throw new Error(`Failed to create lead: ${error?.message}`);

    return this.mapDbLeadToLead(data);
  }

  async getLead(id: string): Promise<Lead | null> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabaseAdmin as any)
      .from('leads')
      .select('*')
      .eq('id', id)
      .single() as { data: DbLead | null; error: Error | null };

    if (error || !data) return null;

    return this.mapDbLeadToLead(data);
  }

  async getLeadByEmail(email: string): Promise<Lead | null> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabaseAdmin as any)
      .from('leads')
      .select('*')
      .eq('email', email)
      .single() as { data: DbLead | null; error: Error | null };

    if (error || !data) return null;

    return this.mapDbLeadToLead(data);
  }

  async updateLead(id: string, updates: Partial<Lead>): Promise<Lead> {
    const updateData: Record<string, unknown> = {};

    if (updates.websiteUrl) updateData.url = updates.websiteUrl;
    if (updates.name) updateData.name = updates.name;
    if (updates.companyName) updateData.company_name = updates.companyName;
    if (updates.scanResults) {
      updateData.scan_score = updates.scanResults.score;
      updateData.total_issues = updates.scanResults.totalIssues;
      updateData.critical_issues = updates.scanResults.criticalIssues;
      updateData.platform_detected = updates.scanResults.platform;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabaseAdmin as any)
      .from('leads')
      .update(updateData)
      .eq('id', id)
      .select()
      .single() as { data: DbLead | null; error: Error | null };

    if (error || !data) throw new Error(`Failed to update lead: ${error?.message}`);

    return this.mapDbLeadToLead(data);
  }

  async createScheduledEmail(
    email: Omit<ScheduledEmail, 'id'>
  ): Promise<ScheduledEmail> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabaseAdmin as any)
      .from('scheduled_emails')
      .insert({
        lead_id: email.leadId,
        sequence_type: email.sequenceType,
        email_number: email.emailNumber,
        scheduled_for: email.scheduledFor.toISOString(),
        status: email.status || 'pending',
      })
      .select()
      .single() as { data: DbScheduledEmail | null; error: Error | null };

    if (error || !data) throw new Error(`Failed to create scheduled email: ${error?.message}`);

    return this.mapDbEmailToEmail(data);
  }

  async getScheduledEmail(id: string): Promise<ScheduledEmail | null> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabaseAdmin as any)
      .from('scheduled_emails')
      .select('*')
      .eq('id', id)
      .single() as { data: DbScheduledEmail | null; error: Error | null };

    if (error || !data) return null;

    return this.mapDbEmailToEmail(data);
  }

  async updateScheduledEmail(
    id: string,
    updates: Partial<ScheduledEmail>
  ): Promise<ScheduledEmail> {
    const updateData: Record<string, unknown> = {};

    if (updates.status) updateData.status = updates.status;
    if (updates.sentAt) updateData.sent_at = updates.sentAt.toISOString();
    if (updates.scheduledFor) updateData.scheduled_for = updates.scheduledFor.toISOString();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabaseAdmin as any)
      .from('scheduled_emails')
      .update(updateData)
      .eq('id', id)
      .select()
      .single() as { data: DbScheduledEmail | null; error: Error | null };

    if (error || !data) throw new Error(`Failed to update scheduled email: ${error?.message}`);

    return this.mapDbEmailToEmail(data);
  }

  async getPendingEmails(before?: Date): Promise<ScheduledEmail[]> {
    const now = before || new Date();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabaseAdmin as any)
      .from('scheduled_emails')
      .select('*')
      .eq('status', 'pending')
      .lte('scheduled_for', now.toISOString())
      .order('scheduled_for', { ascending: true }) as { data: DbScheduledEmail[] | null; error: Error | null };

    if (error) throw new Error(`Failed to get pending emails: ${error.message}`);

    return (data || []).map(this.mapDbEmailToEmail);
  }

  async getLeadEmails(leadId: string): Promise<ScheduledEmail[]> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabaseAdmin as any)
      .from('scheduled_emails')
      .select('*')
      .eq('lead_id', leadId)
      .order('email_number', { ascending: true }) as { data: DbScheduledEmail[] | null; error: Error | null };

    if (error) throw new Error(`Failed to get lead emails: ${error.message}`);

    return (data || []).map(this.mapDbEmailToEmail);
  }

  async getEmailsBySequence(sequenceType: SequenceType): Promise<ScheduledEmail[]> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabaseAdmin as any)
      .from('scheduled_emails')
      .select('*')
      .eq('sequence_type', sequenceType)
      .order('scheduled_for', { ascending: true }) as { data: DbScheduledEmail[] | null; error: Error | null };

    if (error) throw new Error(`Failed to get emails by sequence: ${error.message}`);

    return (data || []).map(this.mapDbEmailToEmail);
  }

  // Helper to map database lead to Lead type
  private mapDbLeadToLead(dbLead: {
    id: string;
    email: string;
    name?: string | null;
    company_name?: string | null;
    url: string | null;
    source: string;
    scan_score: number | null;
    total_issues: number | null;
    critical_issues: number | null;
    platform_detected: string | null;
    created_at: string;
  }): Lead {
    return {
      id: dbLead.id,
      email: dbLead.email,
      name: dbLead.name || undefined,
      companyName: dbLead.company_name || undefined,
      websiteUrl: dbLead.url || '',
      source: dbLead.source,
      scanResults: dbLead.scan_score !== null ? {
        score: dbLead.scan_score,
        totalIssues: dbLead.total_issues || 0,
        criticalIssues: dbLead.critical_issues || 0,
        platform: dbLead.platform_detected || 'unknown',
        topIssues: [],
        scannedAt: dbLead.created_at,
      } : undefined,
      createdAt: new Date(dbLead.created_at),
    };
  }

  // Helper to map database email to ScheduledEmail type
  private mapDbEmailToEmail(dbEmail: {
    id: string;
    lead_id: string;
    sequence_type: string;
    email_number: number;
    scheduled_for: string;
    status: string;
    sent_at: string | null;
  }): ScheduledEmail {
    return {
      id: dbEmail.id,
      leadId: dbEmail.lead_id,
      sequenceType: dbEmail.sequence_type as SequenceType,
      emailNumber: dbEmail.email_number,
      scheduledFor: new Date(dbEmail.scheduled_for),
      status: dbEmail.status as 'pending' | 'sent' | 'failed' | 'cancelled',
      sentAt: dbEmail.sent_at ? new Date(dbEmail.sent_at) : undefined,
    };
  }
}

// Singleton instance
export const supabaseEmailAdapter = new SupabaseEmailDatabaseAdapter();
