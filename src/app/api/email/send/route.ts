/**
 * Email Send API Endpoint
 * Triggers email sends using Resend
 */

import { NextResponse } from 'next/server';
import {
  sendEmail,
  startWelcomeSequence,
  startColdLeadSequence,
  replaceTemplateVariables,
  WELCOME_SEQUENCE,
  COLD_LEAD_SEQUENCE,
  type Lead,
  type SequenceType,
} from '@/lib/email-sequences';
import { getEmailTemplate } from '@/emails';

// In-memory storage for demo (replace with database in production)
const scheduledEmails: Map<string, {
  id: string;
  leadId: string;
  sequenceType: SequenceType;
  emailNumber: number;
  scheduledFor: Date;
  sentAt?: Date;
  status: 'pending' | 'sent' | 'failed' | 'cancelled';
}> = new Map();

const leads: Map<string, Lead> = new Map();

/**
 * POST /api/email/send
 *
 * Actions:
 * - send_single: Send a single email
 * - start_welcome: Start welcome sequence for a lead
 * - start_cold: Start cold lead sequence
 * - send_template: Send a specific template to a lead
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action } = body;

    switch (action) {
      case 'send_single':
        return handleSendSingle(body);

      case 'start_welcome':
        return handleStartWelcome(body);

      case 'start_cold':
        return handleStartCold(body);

      case 'send_template':
        return handleSendTemplate(body);

      case 'preview_template':
        return handlePreviewTemplate(body);

      default:
        return NextResponse.json(
          { error: 'Invalid action. Use: send_single, start_welcome, start_cold, send_template, preview_template' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Email API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * Send a single email
 */
async function handleSendSingle(body: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}) {
  const { to, subject, html, replyTo } = body;

  if (!to || !subject || !html) {
    return NextResponse.json(
      { error: 'Missing required fields: to, subject, html' },
      { status: 400 }
    );
  }

  const result = await sendEmail({ to, subject, html, replyTo });

  if (result.success) {
    return NextResponse.json({
      success: true,
      messageId: result.messageId,
    });
  }

  return NextResponse.json(
    { error: result.error },
    { status: 500 }
  );
}

/**
 * Start welcome sequence for a new lead
 */
async function handleStartWelcome(body: {
  lead: Lead;
}) {
  const { lead } = body;

  if (!lead || !lead.email || !lead.websiteUrl) {
    return NextResponse.json(
      { error: 'Missing required lead data: email, websiteUrl' },
      { status: 400 }
    );
  }

  // Generate lead ID if not provided
  const leadId = lead.id || `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const leadWithId = { ...lead, id: leadId };

  // Store lead
  leads.set(leadId, leadWithId);

  // Start the sequence
  const scheduled = await startWelcomeSequence(
    leadWithId,
    (templateId, lead) => getEmailTemplate(templateId, lead)
  );

  // Store scheduled emails
  for (const email of scheduled) {
    scheduledEmails.set(email.id, email);
  }

  return NextResponse.json({
    success: true,
    leadId,
    scheduledEmails: scheduled.map(e => ({
      id: e.id,
      emailNumber: e.emailNumber,
      scheduledFor: e.scheduledFor,
      status: e.status,
    })),
    firstEmailSent: scheduled[0]?.status === 'sent',
  });
}

/**
 * Start cold lead sequence
 */
async function handleStartCold(body: {
  lead: Lead;
}) {
  const { lead } = body;

  if (!lead || !lead.email || !lead.websiteUrl) {
    return NextResponse.json(
      { error: 'Missing required lead data: email, websiteUrl' },
      { status: 400 }
    );
  }

  // Generate lead ID if not provided
  const leadId = lead.id || `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const leadWithId = { ...lead, id: leadId };

  // Store lead
  leads.set(leadId, leadWithId);

  // Start the sequence
  const scheduled = await startColdLeadSequence(
    leadWithId,
    (templateId, lead) => getEmailTemplate(templateId, lead)
  );

  // Store scheduled emails
  for (const email of scheduled) {
    scheduledEmails.set(email.id, email);
  }

  return NextResponse.json({
    success: true,
    leadId,
    scheduledEmails: scheduled.map(e => ({
      id: e.id,
      emailNumber: e.emailNumber,
      scheduledFor: e.scheduledFor,
      status: e.status,
    })),
    firstEmailSent: scheduled[0]?.status === 'sent',
  });
}

/**
 * Send a specific template to a lead
 */
async function handleSendTemplate(body: {
  lead: Lead;
  templateId: string;
  subject?: string;
}) {
  const { lead, templateId, subject } = body;

  if (!lead || !lead.email || !templateId) {
    return NextResponse.json(
      { error: 'Missing required fields: lead (with email), templateId' },
      { status: 400 }
    );
  }

  // Generate lead ID if not provided
  const leadId = lead.id || `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const leadWithId = { ...lead, id: leadId };

  try {
    const html = getEmailTemplate(templateId, leadWithId);

    // Find the sequence email for subject
    const allSequences = [...WELCOME_SEQUENCE, ...COLD_LEAD_SEQUENCE];
    const sequenceEmail = allSequences.find(e => e.templateId === templateId);

    const finalSubject = subject ||
      (sequenceEmail ? replaceTemplateVariables(sequenceEmail.subject, leadWithId) : 'Message from Inclusiv');

    const result = await sendEmail({
      to: lead.email,
      subject: finalSubject,
      html,
      tags: [
        { name: 'template', value: templateId },
        { name: 'lead_id', value: leadId },
      ],
    });

    if (result.success) {
      return NextResponse.json({
        success: true,
        messageId: result.messageId,
        templateId,
      });
    }

    return NextResponse.json(
      { error: result.error },
      { status: 500 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Template not found' },
      { status: 400 }
    );
  }
}

/**
 * Preview a template without sending
 */
async function handlePreviewTemplate(body: {
  lead: Lead;
  templateId: string;
}) {
  const { lead, templateId } = body;

  if (!lead || !templateId) {
    return NextResponse.json(
      { error: 'Missing required fields: lead, templateId' },
      { status: 400 }
    );
  }

  // Generate lead ID if not provided
  const leadId = lead.id || `preview_${Date.now()}`;
  const leadWithId = { ...lead, id: leadId };

  try {
    const html = getEmailTemplate(templateId, leadWithId);

    // Find the sequence email for subject
    const allSequences = [...WELCOME_SEQUENCE, ...COLD_LEAD_SEQUENCE];
    const sequenceEmail = allSequences.find(e => e.templateId === templateId);

    const subject = sequenceEmail
      ? replaceTemplateVariables(sequenceEmail.subject, leadWithId)
      : 'Preview';

    return NextResponse.json({
      success: true,
      templateId,
      subject,
      html,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Template not found' },
      { status: 400 }
    );
  }
}

/**
 * GET /api/email/send
 * Get scheduled emails or email status
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const leadId = searchParams.get('leadId');
  const status = searchParams.get('status');

  let emails = Array.from(scheduledEmails.values());

  if (leadId) {
    emails = emails.filter(e => e.leadId === leadId);
  }

  if (status) {
    emails = emails.filter(e => e.status === status);
  }

  return NextResponse.json({
    count: emails.length,
    emails: emails.map(e => ({
      id: e.id,
      leadId: e.leadId,
      sequenceType: e.sequenceType,
      emailNumber: e.emailNumber,
      scheduledFor: e.scheduledFor,
      sentAt: e.sentAt,
      status: e.status,
    })),
  });
}
