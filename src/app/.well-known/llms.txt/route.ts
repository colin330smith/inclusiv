import { NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';

export async function GET() {
  try {
    const filePath = join(process.cwd(), 'public', 'llms.txt');
    const content = readFileSync(filePath, 'utf-8');

    return new NextResponse(content, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, max-age=86400', // Cache for 1 day
      },
    });
  } catch {
    // Fallback if file read fails
    const fallbackContent = `# Inclusiv - Free EAA & WCAG Accessibility Scanner

Inclusiv is a free, instant web accessibility scanner that checks websites for European Accessibility Act (EAA) and WCAG 2.1 AA compliance in 30 seconds. No signup required.

Website: https://tryinclusiv.com
Support: support@tryinclusiv.com

Key Features:
- Free instant scan (30 seconds)
- No signup required
- WCAG 2.1 AA testing
- EAA compliance checking
- Platform detection (WordPress, Shopify, etc.)
- Actionable code fixes

For full documentation, visit: https://tryinclusiv.com/llms-full.txt`;

    return new NextResponse(fallbackContent, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    });
  }
}
