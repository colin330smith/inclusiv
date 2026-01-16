'use client';

import { Document, Page, Text, View, StyleSheet, Font, pdf } from '@react-pdf/renderer';

// Register a font (using built-in Helvetica for now)
Font.register({
  family: 'Helvetica',
  fonts: [
    { src: 'Helvetica' },
    { src: 'Helvetica-Bold', fontWeight: 'bold' },
  ],
});

// PDF Styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#ffffff',
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 30,
    borderBottomWidth: 2,
    borderBottomColor: '#6366f1',
    paddingBottom: 20,
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6366f1',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 10,
    color: '#71717a',
  },
  reportTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#18181b',
    marginBottom: 8,
    marginTop: 20,
  },
  scanInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  infoBox: {
    backgroundColor: '#f4f4f5',
    padding: 12,
    borderRadius: 4,
    width: '48%',
  },
  infoLabel: {
    fontSize: 9,
    color: '#71717a',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  infoValue: {
    fontSize: 12,
    color: '#18181b',
  },
  scoreSection: {
    flexDirection: 'row',
    marginBottom: 30,
    alignItems: 'center',
  },
  scoreCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  scoreValue: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  scoreLabel: {
    fontSize: 10,
    color: '#71717a',
  },
  scoreInfo: {
    flex: 1,
  },
  scoreTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#18181b',
    marginBottom: 8,
  },
  scoreDescription: {
    fontSize: 11,
    color: '#52525b',
    lineHeight: 1.5,
  },
  complianceSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#18181b',
    marginBottom: 12,
  },
  complianceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  complianceItem: {
    width: '48%',
    padding: 10,
    borderRadius: 4,
    marginBottom: 8,
  },
  compliancePass: {
    backgroundColor: '#dcfce7',
    borderWidth: 1,
    borderColor: '#86efac',
  },
  complianceFail: {
    backgroundColor: '#fef2f2',
    borderWidth: 1,
    borderColor: '#fecaca',
  },
  complianceLabel: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  compliancePassText: {
    color: '#166534',
  },
  complianceFailText: {
    color: '#991b1b',
  },
  complianceDescription: {
    fontSize: 9,
    color: '#71717a',
    marginTop: 2,
  },
  issuesSection: {
    marginBottom: 30,
  },
  issueItem: {
    marginBottom: 12,
    padding: 12,
    backgroundColor: '#fafafa',
    borderRadius: 4,
    borderLeftWidth: 4,
  },
  criticalBorder: {
    borderLeftColor: '#ef4444',
  },
  seriousBorder: {
    borderLeftColor: '#f97316',
  },
  moderateBorder: {
    borderLeftColor: '#eab308',
  },
  minorBorder: {
    borderLeftColor: '#3b82f6',
  },
  issueHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  issueDescription: {
    fontSize: 11,
    color: '#18181b',
    flex: 1,
    marginRight: 10,
  },
  issueBadge: {
    fontSize: 8,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 2,
  },
  criticalBadge: {
    backgroundColor: '#fecaca',
    color: '#991b1b',
  },
  seriousBadge: {
    backgroundColor: '#fed7aa',
    color: '#9a3412',
  },
  moderateBadge: {
    backgroundColor: '#fef08a',
    color: '#854d0e',
  },
  minorBadge: {
    backgroundColor: '#dbeafe',
    color: '#1e40af',
  },
  issueDetails: {
    flexDirection: 'row',
    marginTop: 4,
  },
  issueCount: {
    fontSize: 9,
    color: '#71717a',
    marginRight: 15,
  },
  issueFix: {
    fontSize: 9,
    color: '#059669',
  },
  fixSection: {
    backgroundColor: '#f0fdf4',
    padding: 8,
    borderRadius: 4,
    marginTop: 8,
  },
  fixTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#166534',
    marginBottom: 4,
  },
  fixText: {
    fontSize: 9,
    color: '#166534',
    lineHeight: 1.4,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    borderTopWidth: 1,
    borderTopColor: '#e4e4e7',
    paddingTop: 15,
  },
  footerText: {
    fontSize: 9,
    color: '#71717a',
    textAlign: 'center',
  },
  footerCta: {
    fontSize: 10,
    color: '#6366f1',
    textAlign: 'center',
    marginTop: 5,
    fontWeight: 'bold',
  },
  legalWarning: {
    backgroundColor: '#fef2f2',
    padding: 12,
    borderRadius: 4,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#fecaca',
  },
  warningTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#991b1b',
    marginBottom: 4,
  },
  warningText: {
    fontSize: 9,
    color: '#7f1d1d',
    lineHeight: 1.4,
  },
});

// Types
interface ScanResult {
  score: number;
  totalIssues: number;
  criticalIssues: number;
  platform: string;
  topIssues: Array<{
    id: string;
    impact: 'critical' | 'serious' | 'moderate' | 'minor';
    description: string;
    count: number;
  }>;
  scannedAt: string;
}

interface AccessibilityFix {
  title: string;
  description: string;
  wcagCriteria: string[];
  legalRisk: string;
  estimatedTime: string;
  fixInstructions: {
    general: string;
    code?: string;
  };
}

interface PDFReportProps {
  result: ScanResult;
  url: string;
  fixes?: Record<string, AccessibilityFix>;
}

// Get score color
const getScoreColor = (score: number): string => {
  if (score >= 80) return '#22c55e';
  if (score >= 50) return '#f59e0b';
  return '#ef4444';
};

// Get score status
const getScoreStatus = (score: number): string => {
  if (score >= 80) return 'Good - Likely Compliant';
  if (score >= 50) return 'Needs Improvement';
  return 'At Risk - Action Required';
};

// Get impact border style
const getImpactBorder = (impact: string) => {
  switch (impact) {
    case 'critical': return styles.criticalBorder;
    case 'serious': return styles.seriousBorder;
    case 'moderate': return styles.moderateBorder;
    default: return styles.minorBorder;
  }
};

// Get impact badge style
const getImpactBadge = (impact: string) => {
  switch (impact) {
    case 'critical': return styles.criticalBadge;
    case 'serious': return styles.seriousBadge;
    case 'moderate': return styles.moderateBadge;
    default: return styles.minorBadge;
  }
};

// PDF Document Component
export const AccessibilityReportPDF = ({ result, url, fixes = {} }: PDFReportProps) => {
  const scoreColor = getScoreColor(result.score);
  const scoreStatus = getScoreStatus(result.score);
  const scanDate = new Date(result.scannedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const complianceChecks = [
    { label: 'WCAG 2.1 AA', status: result.score >= 80, description: 'Global Standard' },
    { label: 'EAA Ready', status: result.score >= 80, description: 'European Union' },
    { label: 'ADA Compliant', status: result.score >= 70, description: 'United States' },
    { label: 'EN 301 549', status: result.score >= 75, description: 'EU Technical' },
  ];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logo}>Inclusiv</Text>
          <Text style={styles.subtitle}>Web Accessibility Compliance Scanner</Text>
        </View>

        {/* Report Title */}
        <Text style={styles.reportTitle}>Accessibility Scan Report</Text>

        {/* Scan Info */}
        <View style={styles.scanInfo}>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Website URL</Text>
            <Text style={styles.infoValue}>{url}</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Scan Date</Text>
            <Text style={styles.infoValue}>{scanDate}</Text>
          </View>
        </View>

        {/* Score Section */}
        <View style={styles.scoreSection}>
          <View style={[styles.scoreCircle, { borderColor: scoreColor }]}>
            <Text style={[styles.scoreValue, { color: scoreColor }]}>{result.score}</Text>
            <Text style={styles.scoreLabel}>/100</Text>
          </View>
          <View style={styles.scoreInfo}>
            <Text style={styles.scoreTitle}>{scoreStatus}</Text>
            <Text style={styles.scoreDescription}>
              {result.totalIssues} accessibility issues detected
              {result.criticalIssues > 0 && ` (${result.criticalIssues} critical)`}.
              Platform detected: {result.platform}.
            </Text>
          </View>
        </View>

        {/* Legal Warning for low scores */}
        {result.score < 70 && (
          <View style={styles.legalWarning}>
            <Text style={styles.warningTitle}>Legal Compliance Warning</Text>
            <Text style={styles.warningText}>
              Your website may not meet EAA (European Accessibility Act) requirements.
              Non-compliant sites face fines up to €100,000. We recommend addressing
              critical issues immediately.
            </Text>
          </View>
        )}

        {/* Compliance Status */}
        <View style={styles.complianceSection}>
          <Text style={styles.sectionTitle}>Compliance Status</Text>
          <View style={styles.complianceGrid}>
            {complianceChecks.map((check, index) => (
              <View
                key={index}
                style={[
                  styles.complianceItem,
                  check.status ? styles.compliancePass : styles.complianceFail
                ]}
              >
                <Text style={[
                  styles.complianceLabel,
                  check.status ? styles.compliancePassText : styles.complianceFailText
                ]}>
                  {check.status ? '✓' : '✗'} {check.label}
                </Text>
                <Text style={styles.complianceDescription}>{check.description}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Issues Section */}
        <View style={styles.issuesSection}>
          <Text style={styles.sectionTitle}>Top Issues Found ({result.topIssues.length})</Text>
          {result.topIssues.slice(0, 8).map((issue, index) => {
            const fix = fixes[issue.id];
            return (
              <View key={index} style={[styles.issueItem, getImpactBorder(issue.impact)]}>
                <View style={styles.issueHeader}>
                  <Text style={styles.issueDescription}>{issue.description}</Text>
                  <Text style={[styles.issueBadge, getImpactBadge(issue.impact)]}>
                    {issue.impact}
                  </Text>
                </View>
                <View style={styles.issueDetails}>
                  <Text style={styles.issueCount}>{issue.count} instances</Text>
                  {fix && <Text style={styles.issueFix}>Fix available: ~{fix.estimatedTime}</Text>}
                </View>
                {fix && (
                  <View style={styles.fixSection}>
                    <Text style={styles.fixTitle}>How to Fix:</Text>
                    <Text style={styles.fixText}>{fix.fixInstructions.general}</Text>
                  </View>
                )}
              </View>
            );
          })}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Generated by Inclusiv | tryinclusiv.com | {scanDate}
          </Text>
          <Text style={styles.footerCta}>
            Need help fixing these issues? Visit tryinclusiv.com/pricing
          </Text>
        </View>
      </Page>
    </Document>
  );
};

// Function to generate and download PDF
export async function downloadPDFReport(
  result: ScanResult,
  url: string,
  fixes: Record<string, AccessibilityFix> = {}
): Promise<void> {
  const blob = await pdf(
    <AccessibilityReportPDF result={result} url={url} fixes={fixes} />
  ).toBlob();

  // Create download link
  const downloadUrl = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = downloadUrl;

  // Create filename from URL
  const hostname = new URL(url.startsWith('http') ? url : `https://${url}`).hostname;
  const date = new Date().toISOString().split('T')[0];
  link.download = `accessibility-report-${hostname}-${date}.pdf`;

  // Trigger download
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Cleanup
  URL.revokeObjectURL(downloadUrl);
}

export default AccessibilityReportPDF;
