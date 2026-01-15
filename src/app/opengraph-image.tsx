import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Inclusiv - Free EAA Accessibility Scanner';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
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
                width: '56px',
                height: '56px',
                backgroundColor: '#6366f1',
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg
                width="32"
                height="32"
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
                fontSize: '36px',
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
              backgroundColor: 'rgba(239, 68, 68, 0.15)',
              padding: '10px 20px',
              borderRadius: '999px',
              border: '1px solid rgba(239, 68, 68, 0.3)',
            }}
          >
            <div
              style={{
                width: '10px',
                height: '10px',
                backgroundColor: '#ef4444',
                borderRadius: '50%',
              }}
            />
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
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '24px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <span
              style={{
                fontSize: '72px',
                fontWeight: 'bold',
                color: 'white',
                lineHeight: 1.1,
              }}
            >
              Is Your Website
            </span>
            <span
              style={{
                fontSize: '72px',
                fontWeight: 'bold',
                background: 'linear-gradient(to right, #6366f1, #a855f7)',
                backgroundClip: 'text',
                color: 'transparent',
                lineHeight: 1.1,
              }}
            >
              EAA Compliant?
            </span>
          </div>

          <span
            style={{
              fontSize: '28px',
              color: '#a1a1aa',
              maxWidth: '800px',
            }}
          >
            Free instant scan. No signup required. Check WCAG 2.1 AA compliance in 30 seconds.
          </span>

          {/* Stats Row */}
          <div
            style={{
              display: 'flex',
              gap: '40px',
              marginTop: '20px',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
              }}
            >
              <span
                style={{
                  fontSize: '40px',
                  fontWeight: 'bold',
                  color: '#6366f1',
                }}
              >
                30 sec
              </span>
              <span
                style={{
                  fontSize: '16px',
                  color: '#71717a',
                }}
              >
                Scan Time
              </span>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
              }}
            >
              <span
                style={{
                  fontSize: '40px',
                  fontWeight: 'bold',
                  color: '#22c55e',
                }}
              >
                Free
              </span>
              <span
                style={{
                  fontSize: '16px',
                  color: '#71717a',
                }}
              >
                No Credit Card
              </span>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
              }}
            >
              <span
                style={{
                  fontSize: '40px',
                  fontWeight: 'bold',
                  color: '#f59e0b',
                }}
              >
                €100K
              </span>
              <span
                style={{
                  fontSize: '16px',
                  color: '#71717a',
                }}
              >
                Non-Compliance Fine
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
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
            tryinclusiv.com
          </span>
          <div
            style={{
              display: 'flex',
              gap: '12px',
            }}
          >
            {['WCAG 2.1 AA', 'EAA', 'ADA', 'EN 301 549'].map((item, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 12px',
                  backgroundColor: 'rgba(99, 102, 241, 0.1)',
                  borderRadius: '8px',
                  border: '1px solid rgba(99, 102, 241, 0.2)',
                }}
              >
                <span
                  style={{
                    fontSize: '14px',
                    color: '#818cf8',
                    fontWeight: '500',
                  }}
                >
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
