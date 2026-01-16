import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const score = parseInt(searchParams.get('score') || '0', 10);

  // Determine colors based on score
  const getColors = () => {
    if (score >= 80) {
      return {
        bg: '#dcfce7',
        border: '#22c55e',
        text: '#166534',
        label: 'Compliant',
      };
    }
    if (score >= 50) {
      return {
        bg: '#fef9c3',
        border: '#eab308',
        text: '#854d0e',
        label: 'Needs Work',
      };
    }
    return {
      bg: '#fee2e2',
      border: '#ef4444',
      text: '#991b1b',
      label: 'At Risk',
    };
  };

  const colors = getColors();

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          backgroundColor: colors.bg,
          borderRadius: 8,
          border: `2px solid ${colors.border}`,
          padding: '8px 12px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          {/* Score */}
          <div
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: colors.text,
            }}
          >
            {score}
          </div>

          {/* Divider */}
          <div
            style={{
              width: 1,
              height: 24,
              backgroundColor: colors.border,
              opacity: 0.5,
            }}
          />

          {/* Label */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span
              style={{
                fontSize: 10,
                fontWeight: 600,
                color: colors.text,
              }}
            >
              A11y Score
            </span>
            <span
              style={{
                fontSize: 8,
                color: colors.text,
                opacity: 0.7,
              }}
            >
              by Inclusiv
            </span>
          </div>
        </div>
      </div>
    ),
    {
      width: 120,
      height: 40,
    }
  );
}
