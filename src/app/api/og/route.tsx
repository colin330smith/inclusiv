import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  // Get parameters from URL
  const score = parseInt(searchParams.get('score') || '0', 10);
  const issues = parseInt(searchParams.get('issues') || '0', 10);
  const critical = parseInt(searchParams.get('critical') || '0', 10);
  const url = searchParams.get('url') || '';
  const platform = searchParams.get('platform') || 'Website';

  // Determine score status and color
  const getScoreColor = () => {
    if (score >= 80) return '#22c55e'; // green
    if (score >= 50) return '#f59e0b'; // yellow
    return '#ef4444'; // red
  };

  const getScoreStatus = () => {
    if (score >= 80) return 'Good - Likely Compliant';
    if (score >= 50) return 'Needs Improvement';
    return 'At Risk - Action Required';
  };

  const getScoreBgColor = () => {
    if (score >= 80) return 'rgba(34, 197, 94, 0.1)';
    if (score >= 50) return 'rgba(245, 158, 11, 0.1)';
    return 'rgba(239, 68, 68, 0.1)';
  };

  const scoreColor = getScoreColor();
  const scoreStatus = getScoreStatus();
  const scoreBgColor = getScoreBgColor();

  // Clean URL for display
  const displayUrl = url ? url.replace(/^https?:\/\//, '').replace(/\/$/, '') : 'Your Website';

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#0a0a0a',
          padding: '60px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                backgroundColor: '#6366f1',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <span
              style={{
                fontSize: '32px',
                fontWeight: 'bold',
                color: 'white',
              }}
            >
              Inclusiv
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              padding: '8px 16px',
              borderRadius: '999px',
              border: '1px solid rgba(239, 68, 68, 0.2)',
            }}
          >
            <span
              style={{
                color: '#f87171',
                fontSize: '18px',
                fontWeight: '600',
              }}
            >
              EAA Enforcement Active
            </span>
          </div>
        </div>

        {/* Main Content */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            gap: '60px',
            alignItems: 'center',
          }}
        >
          {/* Score Circle */}
          <div
            style={{
              width: '260px',
              height: '260px',
              borderRadius: '130px',
              backgroundColor: scoreBgColor,
              border: `8px solid ${scoreColor}`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <span
              style={{
                fontSize: '100px',
                fontWeight: 'bold',
                color: scoreColor,
                lineHeight: 1,
              }}
            >
              {score}
            </span>
            <span
              style={{
                fontSize: '24px',
                color: '#71717a',
                marginTop: '8px',
              }}
            >
              /100
            </span>
          </div>

          {/* Info */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            <span
              style={{
                fontSize: '24px',
                color: '#a1a1aa',
              }}
            >
              Accessibility Scan for
            </span>
            <span
              style={{
                fontSize: '42px',
                fontWeight: 'bold',
                color: 'white',
                lineHeight: 1.2,
              }}
            >
              {displayUrl}
            </span>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: scoreBgColor,
                padding: '12px 20px',
                borderRadius: '12px',
                border: `1px solid ${scoreColor}`,
                marginTop: '8px',
              }}
            >
              <span
                style={{
                  fontSize: '28px',
                  fontWeight: '600',
                  color: scoreColor,
                }}
              >
                {scoreStatus}
              </span>
            </div>
            <div
              style={{
                display: 'flex',
                gap: '24px',
                marginTop: '16px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <span
                  style={{
                    fontSize: '36px',
                    fontWeight: 'bold',
                    color: 'white',
                  }}
                >
                  {issues}
                </span>
                <span
                  style={{
                    fontSize: '18px',
                    color: '#71717a',
                  }}
                >
                  Issues Found
                </span>
              </div>
              {critical > 0 && (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <span
                    style={{
                      fontSize: '36px',
                      fontWeight: 'bold',
                      color: '#ef4444',
                    }}
                  >
                    {critical}
                  </span>
                  <span
                    style={{
                      fontSize: '18px',
                      color: '#71717a',
                    }}
                  >
                    Critical
                  </span>
                </div>
              )}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <span
                  style={{
                    fontSize: '36px',
                    fontWeight: 'bold',
                    color: '#6366f1',
                  }}
                >
                  {platform}
                </span>
                <span
                  style={{
                    fontSize: '18px',
                    color: '#71717a',
                  }}
                >
                  Platform
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '40px',
            paddingTop: '24px',
            borderTop: '1px solid #27272a',
          }}
        >
          <span
            style={{
              fontSize: '20px',
              color: '#71717a',
            }}
          >
            Free accessibility scan at tryinclusiv.com
          </span>
          <div
            style={{
              display: 'flex',
              gap: '12px',
            }}
          >
            {[
              { label: 'WCAG 2.1 AA', pass: score >= 80 },
              { label: 'EAA Ready', pass: score >= 80 },
              { label: 'ADA', pass: score >= 70 },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 12px',
                  backgroundColor: item.pass ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                  borderRadius: '8px',
                  border: `1px solid ${item.pass ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)'}`,
                }}
              >
                <span
                  style={{
                    fontSize: '16px',
                    color: item.pass ? '#22c55e' : '#ef4444',
                    fontWeight: '600',
                  }}
                >
                  {item.pass ? '✓' : '✗'} {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
