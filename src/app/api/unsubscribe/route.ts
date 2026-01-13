import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const LEADS_FILE = path.join(process.cwd(), 'data', 'leads.json');
const UNSUBSCRIBED_FILE = path.join(process.cwd(), 'data', 'unsubscribed.json');

interface Lead {
  email: string;
  source: string;
  createdAt: string;
  unsubscribed?: boolean;
  unsubscribedAt?: string;
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normalizedEmail)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const dataDir = path.dirname(LEADS_FILE);
    await fs.mkdir(dataDir, { recursive: true });

    // Add to unsubscribed list
    let unsubscribed: string[] = [];
    try {
      const data = await fs.readFile(UNSUBSCRIBED_FILE, 'utf-8');
      unsubscribed = JSON.parse(data);
    } catch {
      // File doesn't exist yet
    }

    if (!unsubscribed.includes(normalizedEmail)) {
      unsubscribed.push(normalizedEmail);
      await fs.writeFile(UNSUBSCRIBED_FILE, JSON.stringify(unsubscribed, null, 2));
    }

    // Also mark as unsubscribed in leads file if exists
    try {
      const leadsData = await fs.readFile(LEADS_FILE, 'utf-8');
      const leads: Lead[] = JSON.parse(leadsData);

      const updatedLeads = leads.map(lead => {
        if (lead.email.toLowerCase() === normalizedEmail) {
          return {
            ...lead,
            unsubscribed: true,
            unsubscribedAt: new Date().toISOString(),
          };
        }
        return lead;
      });

      await fs.writeFile(LEADS_FILE, JSON.stringify(updatedLeads, null, 2));
    } catch {
      // Leads file doesn't exist, that's fine
    }

    console.log('Unsubscribed:', normalizedEmail);

    return NextResponse.json({
      success: true,
      message: 'Successfully unsubscribed',
    });
  } catch (error) {
    console.error('Unsubscribe error:', error);
    return NextResponse.json(
      { error: 'Failed to unsubscribe' },
      { status: 500 }
    );
  }
}

// Also support GET for one-click unsubscribe links
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');

  if (!email) {
    return NextResponse.redirect(new URL('/unsubscribe', request.url));
  }

  // Process unsubscribe
  const result = await POST(new NextRequest(request.url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  }));

  if (result.ok) {
    return NextResponse.redirect(new URL(`/unsubscribe?email=${encodeURIComponent(email)}&success=true`, request.url));
  }

  return NextResponse.redirect(new URL(`/unsubscribe?email=${encodeURIComponent(email)}&error=true`, request.url));
}
