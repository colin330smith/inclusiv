/**
 * Email Cron Job Endpoint
 * Processes scheduled emails on a schedule
 *
 * Should be called by a cron job service (e.g., Vercel Cron, Railway, etc.)
 * Recommended schedule: Every 15 minutes
 *
 * Example Vercel cron config (vercel.json):
 * {
 *   "crons": [{
 *     "path": "/api/email/cron",
 *     "schedule": "0,15,30,45 * * * *"
 *   }]
 * }
 */

import { NextResponse } from 'next/server';
import { processScheduledEmails, type Lead, type ScheduledEmail } from '@/lib/email-sequences';
import { getEmailTemplate } from '@/emails';

// Verify cron secret for security
const CRON_SECRET = process.env.CRON_SECRET;

// In-memory storage (replace with database in production)
// These would typically be stored in a database like PostgreSQL, MongoDB, etc.
interface StoredScheduledEmail extends ScheduledEmail {
  createdAt: Date;
}

const scheduledEmailsStore: Map<string, StoredScheduledEmail> = new Map();
const leadsStore: Map<string, Lead> = new Map();

/**
 * POST /api/email/cron
 * Process scheduled emails (called by cron job)
 */
export async function POST(request: Request) {
  // Verify cron secret
  const authHeader = request.headers.get('authorization');

  if (CRON_SECRET && authHeader !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const startTime = Date.now();

    // Process scheduled emails
    const result = await processScheduledEmails(
      // Get all scheduled emails
      async () => Array.from(scheduledEmailsStore.values()),

      // Get lead by ID
      async (id: string) => leadsStore.get(id) || null,

      // Get email template
      (templateId: string, lead: Lead) => getEmailTemplate(templateId, lead),

      // Update email status
      async (emailId: string, status: ScheduledEmail['status'], sentAt?: Date) => {
        const email = scheduledEmailsStore.get(emailId);
        if (email) {
          email.status = status;
          if (sentAt) {
            email.sentAt = sentAt;
          }
          scheduledEmailsStore.set(emailId, email);
        }
      }
    );

    const duration = Date.now() - startTime;

    return NextResponse.json({
      success: true,
      processed: result.processed,
      sent: result.sent,
      failed: result.failed,
      durationMs: duration,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Cron job error:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Cron job failed',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/email/cron
 * Get cron job status and pending emails count
 */
export async function GET(request: Request) {
  const now = new Date();
  const emails = Array.from(scheduledEmailsStore.values());

  const pendingEmails = emails.filter(e => e.status === 'pending');
  const dueEmails = pendingEmails.filter(e => new Date(e.scheduledFor) <= now);

  // Get emails by sequence type
  const welcomePending = pendingEmails.filter(e => e.sequenceType === 'welcome').length;
  const coldPending = pendingEmails.filter(e => e.sequenceType === 'cold_lead').length;

  // Get sent/failed stats for last 24 hours
  const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const recentEmails = emails.filter(e => e.sentAt && new Date(e.sentAt) >= yesterday);
  const sentLast24h = recentEmails.filter(e => e.status === 'sent').length;
  const failedLast24h = recentEmails.filter(e => e.status === 'failed').length;

  return NextResponse.json({
    status: 'healthy',
    timestamp: now.toISOString(),
    stats: {
      totalScheduled: emails.length,
      pending: pendingEmails.length,
      dueNow: dueEmails.length,
      bySequence: {
        welcome: welcomePending,
        cold_lead: coldPending,
      },
      last24Hours: {
        sent: sentLast24h,
        failed: failedLast24h,
      },
    },
    nextDueEmail: dueEmails.length > 0
      ? {
          id: dueEmails[0].id,
          scheduledFor: dueEmails[0].scheduledFor,
          sequenceType: dueEmails[0].sequenceType,
          emailNumber: dueEmails[0].emailNumber,
        }
      : null,
  });
}

// ============================================
// HELPER FUNCTIONS FOR STORAGE
// (In production, these would interact with your database)
// ============================================

/**
 * Add a lead to the store
 */
export function addLead(lead: Lead): void {
  leadsStore.set(lead.id, lead);
}

/**
 * Add a scheduled email to the store
 */
export function addScheduledEmail(email: ScheduledEmail): void {
  scheduledEmailsStore.set(email.id, {
    ...email,
    createdAt: new Date(),
  });
}

/**
 * Get all scheduled emails for a lead
 */
export function getLeadScheduledEmails(leadId: string): StoredScheduledEmail[] {
  return Array.from(scheduledEmailsStore.values())
    .filter(e => e.leadId === leadId);
}

/**
 * Cancel all pending emails for a lead
 */
export function cancelLeadEmails(leadId: string): number {
  let cancelled = 0;
  for (const [id, email] of scheduledEmailsStore.entries()) {
    if (email.leadId === leadId && email.status === 'pending') {
      email.status = 'cancelled';
      scheduledEmailsStore.set(id, email);
      cancelled++;
    }
  }
  return cancelled;
}

/**
 * Clean up old completed/cancelled emails (older than 30 days)
 */
export function cleanupOldEmails(): number {
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  let deleted = 0;

  for (const [id, email] of scheduledEmailsStore.entries()) {
    if (
      (email.status === 'sent' || email.status === 'cancelled' || email.status === 'failed') &&
      email.createdAt < thirtyDaysAgo
    ) {
      scheduledEmailsStore.delete(id);
      deleted++;
    }
  }

  return deleted;
}
