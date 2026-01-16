import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getSupabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';

// Certificate generation API
// Professional and Enterprise plans only

interface CertificateData {
  certificateId: string;
  issueDate: string;
  expirationDate: string;
  siteUrl: string;
  siteName: string;
  companyName: string;
  score: number;
  wcagLevel: string;
  passedChecks: number;
  totalChecks: number;
  scanDate: string;
  verificationUrl: string;
}

function generateCertificateId(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `INC-${timestamp}-${random}`;
}

function generateCertificateHTML(data: CertificateData): string {
  const passRate = Math.round((data.passedChecks / data.totalChecks) * 100);

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>WCAG 2.1 AA Compliance Certificate - ${data.siteName}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 40px;
    }

    .certificate {
      background: white;
      border-radius: 24px;
      padding: 60px;
      max-width: 800px;
      width: 100%;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
      position: relative;
      overflow: hidden;
    }

    .certificate::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 8px;
      background: linear-gradient(90deg, #6366f1, #8b5cf6, #a855f7);
    }

    .watermark {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 200px;
      font-weight: 700;
      color: rgba(99, 102, 241, 0.03);
      pointer-events: none;
      white-space: nowrap;
    }

    .header {
      text-align: center;
      margin-bottom: 40px;
    }

    .logo {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      margin-bottom: 24px;
    }

    .logo-icon {
      width: 48px;
      height: 48px;
      background: linear-gradient(135deg, #6366f1, #8b5cf6);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 24px;
      font-weight: 700;
    }

    .logo-text {
      font-size: 24px;
      font-weight: 700;
      color: #1a1a2e;
    }

    .title {
      font-size: 32px;
      font-weight: 700;
      color: #1a1a2e;
      margin-bottom: 8px;
    }

    .subtitle {
      font-size: 18px;
      color: #64748b;
      font-weight: 500;
    }

    .badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: linear-gradient(135deg, #22c55e, #16a34a);
      color: white;
      padding: 12px 24px;
      border-radius: 50px;
      font-weight: 600;
      font-size: 16px;
      margin: 24px 0;
    }

    .badge-icon {
      width: 24px;
      height: 24px;
    }

    .details {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      margin-bottom: 40px;
    }

    .detail-box {
      background: #f8fafc;
      border-radius: 16px;
      padding: 24px;
    }

    .detail-label {
      font-size: 12px;
      font-weight: 600;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 8px;
    }

    .detail-value {
      font-size: 18px;
      font-weight: 600;
      color: #1a1a2e;
    }

    .detail-value.url {
      font-size: 16px;
      color: #6366f1;
      word-break: break-all;
    }

    .score-section {
      text-align: center;
      margin-bottom: 40px;
    }

    .score-ring {
      width: 150px;
      height: 150px;
      margin: 0 auto 16px;
      position: relative;
    }

    .score-value {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 48px;
      font-weight: 700;
      color: #1a1a2e;
    }

    .score-label {
      font-size: 14px;
      color: #64748b;
      font-weight: 500;
    }

    .metrics {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
      margin-bottom: 40px;
    }

    .metric {
      text-align: center;
      padding: 16px;
      background: #f8fafc;
      border-radius: 12px;
    }

    .metric-value {
      font-size: 24px;
      font-weight: 700;
      color: #1a1a2e;
    }

    .metric-label {
      font-size: 12px;
      color: #64748b;
      margin-top: 4px;
    }

    .verification {
      text-align: center;
      padding: 24px;
      background: #f0f9ff;
      border-radius: 16px;
      border: 1px dashed #6366f1;
    }

    .verification-label {
      font-size: 12px;
      font-weight: 600;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 8px;
    }

    .verification-id {
      font-size: 20px;
      font-weight: 700;
      color: #6366f1;
      font-family: monospace;
      margin-bottom: 8px;
    }

    .verification-url {
      font-size: 12px;
      color: #64748b;
    }

    .footer {
      text-align: center;
      margin-top: 32px;
      padding-top: 24px;
      border-top: 1px solid #e2e8f0;
    }

    .footer-text {
      font-size: 12px;
      color: #94a3b8;
      line-height: 1.6;
    }

    .footer-logo {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      margin-top: 12px;
      font-size: 14px;
      color: #64748b;
      font-weight: 500;
    }

    @media print {
      body {
        background: white;
        padding: 0;
      }

      .certificate {
        box-shadow: none;
        border: 2px solid #e2e8f0;
      }
    }
  </style>
</head>
<body>
  <div class="certificate">
    <div class="watermark">VERIFIED</div>

    <div class="header">
      <div class="logo">
        <div class="logo-icon">I</div>
        <span class="logo-text">Inclusiv</span>
      </div>
      <h1 class="title">Accessibility Compliance Certificate</h1>
      <p class="subtitle">WCAG 2.1 Level AA Conformance</p>
      <div class="badge">
        <svg class="badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
        COMPLIANT
      </div>
    </div>

    <div class="details">
      <div class="detail-box">
        <div class="detail-label">Certified Website</div>
        <div class="detail-value url">${data.siteUrl}</div>
      </div>
      <div class="detail-box">
        <div class="detail-label">Organization</div>
        <div class="detail-value">${data.companyName || data.siteName}</div>
      </div>
      <div class="detail-box">
        <div class="detail-label">Issue Date</div>
        <div class="detail-value">${new Date(data.issueDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
      </div>
      <div class="detail-box">
        <div class="detail-label">Valid Until</div>
        <div class="detail-value">${new Date(data.expirationDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
      </div>
    </div>

    <div class="metrics">
      <div class="metric">
        <div class="metric-value">${data.score}</div>
        <div class="metric-label">Compliance Score</div>
      </div>
      <div class="metric">
        <div class="metric-value">${passRate}%</div>
        <div class="metric-label">Pass Rate</div>
      </div>
      <div class="metric">
        <div class="metric-value">${data.wcagLevel}</div>
        <div class="metric-label">WCAG Level</div>
      </div>
    </div>

    <div class="verification">
      <div class="verification-label">Verification ID</div>
      <div class="verification-id">${data.certificateId}</div>
      <div class="verification-url">Verify at: ${data.verificationUrl}</div>
    </div>

    <div class="footer">
      <p class="footer-text">
        This certificate confirms that the website listed above has been scanned and evaluated
        for accessibility compliance with WCAG 2.1 Level AA guidelines. The website passed the
        automated accessibility checks at the time of the most recent scan on
        ${new Date(data.scanDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}.
        <br><br>
        This certificate is valid for 90 days from the issue date and subject to continued compliance.
      </p>
      <div class="footer-logo">
        Powered by <strong>Inclusiv</strong> • European Accessibility Act Compliance
      </div>
    </div>
  </div>
</body>
</html>
`;
}

export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Get scan_id or site_id from query params
    const { searchParams } = new URL(request.url);
    const scanId = searchParams.get('scan_id');
    const siteId = searchParams.get('site_id');
    const format = searchParams.get('format') || 'html'; // html, json, or pdf

    if (!scanId && !siteId) {
      return NextResponse.json(
        { error: 'Either scan_id or site_id is required' },
        { status: 400 }
      );
    }

    // Check Supabase configuration
    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 503 }
      );
    }

    const supabase = getSupabaseAdmin();

    // Verify user has Professional or Enterprise plan
    type UserRow = {
      subscription_tier: 'free' | 'starter' | 'professional' | 'enterprise';
      subscription_status: 'free' | 'trial' | 'active' | 'canceled' | 'past_due';
      name: string | null;
    };

    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('subscription_tier, subscription_status, name')
      .eq('email', session.user.email.toLowerCase())
      .single();

    if (userError || !userData) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const user = userData as UserRow;

    if (!['professional', 'enterprise'].includes(user.subscription_tier)) {
      return NextResponse.json(
        { error: 'Certificate generation requires Professional or Enterprise plan' },
        { status: 403 }
      );
    }

    if (user.subscription_status !== 'active' && user.subscription_status !== 'trial') {
      return NextResponse.json(
        { error: 'Active subscription required' },
        { status: 403 }
      );
    }

    // Get scan data
    type ScanRow = {
      id: string;
      url: string;
      score: number;
      total_issues: number;
      site_id: string | null;
      status: string;
      scan_results: unknown;
      completed_at: string | null;
      created_at: string;
    };

    let scan: ScanRow | null = null;
    if (scanId) {
      const { data, error } = await supabase
        .from('scans')
        .select('*')
        .eq('id', scanId)
        .single();

      if (error || !data) {
        return NextResponse.json(
          { error: 'Scan not found' },
          { status: 404 }
        );
      }
      scan = data as ScanRow;
    } else if (siteId) {
      // Get the most recent completed scan for this site
      const { data, error } = await supabase
        .from('scans')
        .select('*')
        .eq('site_id', siteId)
        .eq('status', 'completed')
        .order('completed_at', { ascending: false })
        .limit(1)
        .single();

      if (error || !data) {
        return NextResponse.json(
          { error: 'No completed scan found for this site' },
          { status: 404 }
        );
      }
      scan = data as ScanRow;
    }

    if (!scan) {
      return NextResponse.json(
        { error: 'Scan data not found' },
        { status: 404 }
      );
    }

    // Check if score qualifies for certificate (must be >= 80)
    if (scan.score < 80) {
      return NextResponse.json(
        {
          error: 'Certificate requires compliance score of 80 or higher',
          currentScore: scan.score,
          requiredScore: 80
        },
        { status: 400 }
      );
    }

    // Get site data if we have site_id
    let siteName = new URL(scan.url).hostname;
    if (scan.site_id) {
      const { data: siteData } = await supabase
        .from('sites')
        .select('name, url')
        .eq('id', scan.site_id)
        .single();

      const site = siteData as { name: string | null; url: string } | null;
      if (site?.name) {
        siteName = site.name;
      }
    }

    // Calculate metrics from scan results
    const scanResults = scan.scan_results as {
      axePasses?: number;
      axeViolations?: unknown[];
    } | null;

    const passedChecks = scanResults?.axePasses || 0;
    const totalChecks = passedChecks + (scan.total_issues || 0);

    // Generate certificate data
    const issueDate = new Date();
    const expirationDate = new Date(issueDate);
    expirationDate.setDate(expirationDate.getDate() + 90); // Valid for 90 days

    const certificateId = generateCertificateId();
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://tryinclusiv.com';

    const certificateData: CertificateData = {
      certificateId,
      issueDate: issueDate.toISOString(),
      expirationDate: expirationDate.toISOString(),
      siteUrl: scan.url,
      siteName,
      companyName: user.name || siteName,
      score: scan.score,
      wcagLevel: 'AA',
      passedChecks,
      totalChecks: totalChecks || passedChecks + 1,
      scanDate: scan.completed_at || scan.created_at,
      verificationUrl: `${appUrl}/verify/${certificateId}`,
    };

    // Return based on format
    if (format === 'json') {
      return NextResponse.json({
        certificate: certificateData,
        status: 'generated',
      });
    }

    // Default to HTML
    const html = generateCertificateHTML(certificateData);

    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-store',
      },
    });

  } catch (error) {
    console.error('Certificate generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate certificate' },
      { status: 500 }
    );
  }
}
