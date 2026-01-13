# Inclusiv Customer Support Workflow

## Overview

This document outlines the customer support infrastructure, processes, and SLAs for Inclusiv. Our goal is to provide exceptional support that helps customers achieve accessibility compliance.

---

## Support Channels

### 1. Email Support
**Primary Channel**: support@tryinclusiv.com

**Setup Requirements:**
- Configure email forwarding/inbox management
- Set up auto-responder for acknowledgment
- Integrate with helpdesk system (recommended: Intercom, Zendesk, or Freshdesk)
- Create email aliases:
  - support@tryinclusiv.com (general support)
  - billing@tryinclusiv.com (billing inquiries)
  - enterprise@tryinclusiv.com (enterprise sales)

**Auto-Response Template:**
```
Subject: We received your message [Ticket #XXXX]

Hi there,

Thanks for reaching out to Inclusiv support! We've received your message and will get back to you within 24 hours (usually much faster).

In the meantime, you might find answers in our FAQ: https://tryinclusiv.com/faq

Your ticket number is #XXXX - please reference this in any follow-up messages.

Best,
The Inclusiv Team
```

---

### 2. Contact Form
**Location**: https://tryinclusiv.com/contact

**Required Fields:**
- Name
- Email
- Subject (dropdown):
  - General Question
  - Technical Support
  - Billing Inquiry
  - Feature Request
  - Partnership/Enterprise
  - Bug Report
- Message
- Website URL (optional)

**Optional Fields:**
- Company name
- Phone number
- Preferred contact method

**Form Submission Flow:**
1. User submits form
2. Auto-acknowledgment email sent
3. Ticket created in helpdesk
4. Routed based on subject category
5. Assigned to available support agent

---

### 3. In-App Support
**Location**: Help widget in dashboard

**Features:**
- Knowledge base search
- Contact form shortcut
- Live chat (future enhancement)
- Quick links to FAQ

---

### 4. Social Media Monitoring

**Platforms to Monitor:**
- Twitter/X: @tryinclusiv
- LinkedIn: Inclusiv company page
- Product Hunt: Inclusiv listing
- G2/Capterra: Review sites

**Monitoring Tools:**
- Mention.com or Brand24 for brand monitoring
- Twitter notifications for @mentions
- Google Alerts for "Inclusiv accessibility"

**Response Guidelines:**
- Respond to all @mentions within 4 hours
- Thank positive feedback publicly
- Move complaints to DM, then email
- Never argue publicly
- Always be helpful and professional

---

## Service Level Agreements (SLAs)

### Response Time Targets

| Plan | First Response | Resolution Target |
|------|---------------|-------------------|
| Free | 48 hours | Best effort |
| Starter | 24 hours | 72 hours |
| Professional | 4 hours | 24 hours |
| Enterprise | 1 hour | 8 hours |

**Business Hours:** Monday-Friday, 9 AM - 6 PM EST
**Enterprise:** 24/7 for critical issues

### Priority Levels

**P1 - Critical (Enterprise only)**
- Service completely down
- Security vulnerability
- Data breach
- Response: 1 hour, Resolution: 8 hours

**P2 - High**
- Scanner not functioning
- Cannot access account
- Billing errors
- Response: 4 hours, Resolution: 24 hours

**P3 - Medium**
- Feature not working as expected
- Report generation issues
- Integration problems
- Response: 24 hours, Resolution: 72 hours

**P4 - Low**
- General questions
- Feature requests
- How-to inquiries
- Response: 48 hours, Resolution: Best effort

---

## Escalation Process

### Level 1: Front-line Support
**Handled by:** Support Team
**Scope:**
- FAQ-related questions
- Basic troubleshooting
- Account/billing questions
- Scan result explanations
- Password resets

### Level 2: Technical Support
**Escalate when:**
- Issue persists after basic troubleshooting
- Bug identified
- API/integration issues
- Custom configuration needed

**Escalate to:** Technical Support Lead
**Method:** Tag ticket as "L2-Technical" in helpdesk

### Level 3: Engineering
**Escalate when:**
- Confirmed bug requiring code fix
- System outage
- Security issue
- Performance problems

**Escalate to:** Engineering Team Lead
**Method:** Create GitHub issue + tag ticket as "L3-Engineering"

### Level 4: Management
**Escalate when:**
- Customer threatens legal action
- Refund dispute
- Major service failure
- PR/reputation risk

**Escalate to:** CEO/Founder
**Method:** Immediate Slack/phone + email

---

## Support Workflow Process

### Standard Ticket Flow

```
[Customer Contact]
       |
       v
[Auto-Acknowledgment Sent]
       |
       v
[Ticket Created & Categorized]
       |
       v
[Assigned to Available Agent]
       |
       v
[Agent Reviews & Responds]
       |
      / \
     /   \
[Resolved]  [Needs Escalation]
    |              |
    v              v
[Close Ticket]  [Escalate to L2/L3]
    |              |
    v              v
[Follow-up Survey]  [Continue Process]
```

### Daily Support Routine

**Morning (9 AM):**
1. Review overnight tickets
2. Check social media mentions
3. Review escalated tickets
4. Team standup (if applicable)

**Throughout Day:**
1. Process new tickets within SLA
2. Follow up on pending tickets
3. Update knowledge base as needed
4. Log common issues for product team

**End of Day (5:30 PM):**
1. Clear queue or set expectations
2. Hand off urgent items to on-call (if applicable)
3. Update ticket statuses
4. Log daily metrics

---

## Knowledge Base Structure

### Categories

1. **Getting Started**
   - Creating an account
   - Running your first scan
   - Understanding your results
   - Dashboard overview

2. **Scanning & Reports**
   - How the scanner works
   - Understanding accessibility scores
   - Reading your report
   - Exporting reports
   - Scheduling scans

3. **Fixing Issues**
   - Common accessibility issues
   - Fix guides by issue type
   - Working with developers
   - Verification and re-scanning

4. **Compliance & Standards**
   - WCAG 2.1 overview
   - European Accessibility Act
   - ADA requirements
   - Compliance deadlines

5. **Account & Billing**
   - Plan comparison
   - Upgrading/downgrading
   - Payment methods
   - Invoices and receipts
   - Cancellation and refunds

6. **Technical/API**
   - API documentation
   - Integrations (CI/CD, Jira, etc.)
   - Troubleshooting
   - System requirements

---

## Metrics & Reporting

### Key Metrics to Track

**Volume Metrics:**
- Tickets created per day/week/month
- Tickets by category
- Tickets by plan type
- Tickets by channel

**Performance Metrics:**
- First response time (average, median)
- Resolution time (average, median)
- SLA compliance rate
- Customer satisfaction (CSAT)
- Net Promoter Score (NPS)

**Quality Metrics:**
- First contact resolution rate
- Escalation rate
- Reopen rate
- Knowledge base article views
- Self-service success rate

### Weekly Report Template

```
INCLUSIV SUPPORT - WEEKLY REPORT
Week of: [DATE]

VOLUME:
- Total tickets: X
- New tickets: X
- Resolved tickets: X
- Open tickets: X

BY CATEGORY:
- Technical: X (X%)
- Billing: X (X%)
- General: X (X%)
- Feature requests: X (X%)

PERFORMANCE:
- Avg first response: X hours
- Avg resolution: X hours
- SLA compliance: X%
- CSAT: X/5

TOP ISSUES THIS WEEK:
1. [Issue] - X tickets
2. [Issue] - X tickets
3. [Issue] - X tickets

ESCALATIONS: X
REFUNDS PROCESSED: X

NOTES/ACTION ITEMS:
- [Item 1]
- [Item 2]
```

---

## Tools & Systems

### Recommended Stack

**Helpdesk/Ticketing:**
- Intercom (recommended for startup)
- Zendesk (scalable option)
- Freshdesk (budget option)
- HelpScout (simple option)

**Knowledge Base:**
- Intercom Articles
- Notion (public pages)
- GitBook
- HelpScout Docs

**Social Monitoring:**
- Mention.com
- Brand24
- Hootsuite

**Internal Communication:**
- Slack (support channel)
- Email escalation lists

**Analytics:**
- Built-in helpdesk analytics
- Google Analytics (for KB)
- Custom dashboards

---

## Quality Assurance

### Response Quality Checklist

Before sending any response, verify:

- [ ] Addressed all customer questions
- [ ] Used customer's name
- [ ] Clear and jargon-free language
- [ ] Actionable next steps provided
- [ ] Links included where helpful
- [ ] Proofread for typos
- [ ] Appropriate sign-off
- [ ] Correct ticket status set

### Weekly QA Review

Review 5-10 random tickets per week:
- Response quality
- SLA compliance
- Resolution effectiveness
- Customer satisfaction

---

## Training & Onboarding

### New Support Team Member Checklist

**Week 1:**
- [ ] Product demo and account setup
- [ ] Review all FAQ content
- [ ] Shadow existing support
- [ ] Complete accessibility basics training
- [ ] Review WCAG 2.1 overview

**Week 2:**
- [ ] Handle tickets with supervision
- [ ] Learn helpdesk system
- [ ] Study escalation procedures
- [ ] Practice with common scenarios

**Week 3:**
- [ ] Handle tickets independently
- [ ] First QA review
- [ ] Feedback session
- [ ] Start on-call rotation (if applicable)

### Ongoing Training
- Monthly accessibility updates
- Product feature training
- Customer feedback review
- Industry news briefing

---

## Emergency Procedures

### Service Outage

1. **Detection:** Monitor alerts, customer reports
2. **Acknowledge:** Update status page, social media
3. **Communicate:** Send email to affected customers
4. **Resolve:** Work with engineering team
5. **Post-mortem:** Document and prevent recurrence

### Security Incident

1. **Contain:** Isolate affected systems
2. **Escalate:** Notify management immediately
3. **Investigate:** Document everything
4. **Notify:** Inform affected customers (if required)
5. **Remediate:** Fix vulnerability
6. **Report:** Post-incident analysis

---

## Contact Information

**Support Team:**
- Email: support@tryinclusiv.com
- Internal Slack: #support

**Escalation Contacts:**
- Technical Lead: [NAME] - [EMAIL]
- Engineering Lead: [NAME] - [EMAIL]
- CEO: [NAME] - [EMAIL]

**Emergency (P1 only):**
- On-call phone: [NUMBER]

---

*Document Version: 1.0*
*Last Updated: January 2025*
*Review Schedule: Monthly*
