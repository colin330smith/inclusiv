import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { promises as fs } from 'fs';
import path from 'path';
import { generateReferralCode, getReferralLink, Referral, ReferralStats } from '@/lib/referrals';

const REFERRALS_FILE = path.join(process.cwd(), 'data', 'referrals.json');

// Get all referrals from storage
async function getReferrals(): Promise<Referral[]> {
  try {
    const data = await fs.readFile(REFERRALS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// Save referrals to storage
async function saveReferrals(referrals: Referral[]): Promise<void> {
  const dataDir = path.dirname(REFERRALS_FILE);
  await fs.mkdir(dataDir, { recursive: true });
  await fs.writeFile(REFERRALS_FILE, JSON.stringify(referrals, null, 2));
}

// Get referral stats for a user
async function getUserReferralStats(userId: string, userEmail: string): Promise<ReferralStats> {
  const allReferrals = await getReferrals();
  const userReferrals = allReferrals.filter(r => r.referrerUserId === userId);

  const referralCode = generateReferralCode(userId);

  return {
    totalReferrals: userReferrals.length,
    pendingReferrals: userReferrals.filter(r => r.status === 'pending' || r.status === 'signed_up').length,
    convertedReferrals: userReferrals.filter(r => r.status === 'subscribed' || r.status === 'rewarded').length,
    rewardedReferrals: userReferrals.filter(r => r.status === 'rewarded').length,
    totalEarnings: userReferrals.filter(r => r.status === 'rewarded').length, // 1 month per rewarded referral
    referralCode,
    referralLink: getReferralLink(referralCode),
  };
}

// GET - Get referral stats and list for current user
export async function GET(request: NextRequest) {
  try {
    // Get user from session/cookie (simplified - in production use proper auth)
    const cookieStore = await cookies();
    const userCookie = cookieStore.get('user');

    if (!userCookie?.value) {
      // Return demo data for unauthenticated users
      const demoCode = 'DEMO1234';
      return NextResponse.json({
        stats: {
          totalReferrals: 0,
          pendingReferrals: 0,
          convertedReferrals: 0,
          rewardedReferrals: 0,
          totalEarnings: 0,
          referralCode: demoCode,
          referralLink: getReferralLink(demoCode),
        },
        referrals: [],
      });
    }

    let user;
    try {
      user = JSON.parse(userCookie.value);
    } catch {
      return NextResponse.json({ error: 'Invalid session' }, { status: 401 });
    }

    const stats = await getUserReferralStats(user.id, user.email);
    const allReferrals = await getReferrals();
    const userReferrals = allReferrals
      .filter(r => r.referrerUserId === user.id)
      .map(r => ({
        id: r.id,
        referredEmail: r.referredEmail,
        status: r.status,
        createdAt: r.createdAt,
        convertedAt: r.convertedAt,
        rewardedAt: r.rewardedAt,
      }))
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return NextResponse.json({ stats, referrals: userReferrals });
  } catch (error) {
    console.error('Failed to get referral data:', error);
    return NextResponse.json({ error: 'Failed to get referral data' }, { status: 500 });
  }
}

// POST - Track a new referral visit (called when someone visits with ?ref=CODE)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { referralCode, visitorEmail } = body;

    if (!referralCode) {
      return NextResponse.json({ error: 'Referral code required' }, { status: 400 });
    }

    // Store referral code in cookie for later attribution
    const cookieStore = await cookies();
    cookieStore.set('referral_code', referralCode, {
      maxAge: 30 * 24 * 60 * 60, // 30 days
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    // If we have visitor email (e.g., from signup), create referral record
    if (visitorEmail) {
      const allReferrals = await getReferrals();

      // Check if this email was already referred
      const existingReferral = allReferrals.find(
        r => r.referredEmail.toLowerCase() === visitorEmail.toLowerCase()
      );

      if (existingReferral) {
        return NextResponse.json({
          success: true,
          message: 'Email already has a referral',
        });
      }

      // Find referrer by code (simplified - in production query database)
      // For now, we'll store the referral with the code and resolve later
      const newReferral: Referral = {
        id: crypto.randomUUID(),
        referrerUserId: '', // Will be resolved when we know who the referrer is
        referrerEmail: '',
        referredEmail: visitorEmail,
        referredUserId: null,
        referralCode,
        status: 'pending',
        rewardType: 'free_month',
        rewardApplied: false,
        stripePromotionCode: null,
        createdAt: new Date().toISOString(),
        convertedAt: null,
        rewardedAt: null,
      };

      allReferrals.push(newReferral);
      await saveReferrals(allReferrals);
    }

    return NextResponse.json({
      success: true,
      message: 'Referral tracked',
    });
  } catch (error) {
    console.error('Failed to track referral:', error);
    return NextResponse.json({ error: 'Failed to track referral' }, { status: 500 });
  }
}
