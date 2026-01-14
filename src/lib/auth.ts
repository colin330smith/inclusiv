/**
 * NextAuth.js Configuration
 * Provides authentication for the Inclusiv application
 */

import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { supabaseAdmin } from '@/lib/supabase';
import type { User } from '@/types/database';
import bcrypt from 'bcryptjs';

// Extend the built-in session types
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      image?: string | null;
      subscriptionTier: 'free' | 'starter' | 'professional' | 'enterprise';
      subscriptionStatus: 'free' | 'trial' | 'active' | 'canceled' | 'past_due';
      stripeCustomerId?: string | null;
    };
  }

  interface User {
    id: string;
    email: string;
    name?: string | null;
    subscriptionTier: 'free' | 'starter' | 'professional' | 'enterprise';
    subscriptionStatus: 'free' | 'trial' | 'active' | 'canceled' | 'past_due';
    stripeCustomerId?: string | null;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    subscriptionTier: 'free' | 'starter' | 'professional' | 'enterprise';
    subscriptionStatus: 'free' | 'trial' | 'active' | 'canceled' | 'past_due';
    stripeCustomerId?: string | null;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    // Google OAuth (optional - requires Google Cloud Console setup)
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          }),
        ]
      : []),

    // Email/Password credentials
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required');
        }

        // Find user in database
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { data: user, error } = await (supabaseAdmin as any)
          .from('users')
          .select('*')
          .eq('email', credentials.email.toLowerCase())
          .single() as { data: User | null; error: Error | null };

        if (error || !user) {
          throw new Error('Invalid email or password');
        }

        // Verify password
        const isValid = await bcrypt.compare(credentials.password, user.password_hash || '');
        if (!isValid) {
          throw new Error('Invalid email or password');
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          subscriptionTier: user.subscription_tier as 'free' | 'starter' | 'professional' | 'enterprise',
          subscriptionStatus: user.subscription_status as 'free' | 'trial' | 'active' | 'canceled' | 'past_due',
          stripeCustomerId: user.stripe_customer_id,
        };
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      // Handle OAuth sign-ins (Google)
      if (account?.provider === 'google') {
        try {
          // Check if user exists
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const { data: existingUser } = await (supabaseAdmin as any)
            .from('users')
            .select('*')
            .eq('email', user.email?.toLowerCase())
            .single() as { data: User | null; error: Error | null };

          if (!existingUser) {
            // Create new user from OAuth
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const { error } = await (supabaseAdmin as any).from('users').insert({
              email: user.email?.toLowerCase(),
              name: user.name,
              subscription_tier: 'free',
              subscription_status: 'free',
            }) as { error: Error | null };

            if (error) {
              console.error('Failed to create OAuth user:', error);
              return false;
            }
          }
        } catch (error) {
          console.error('OAuth sign-in error:', error);
          return false;
        }
      }

      return true;
    },

    async jwt({ token, user, trigger, session }) {
      // Initial sign-in
      if (user) {
        token.id = user.id;
        token.subscriptionTier = user.subscriptionTier || 'free';
        token.subscriptionStatus = user.subscriptionStatus || 'free';
        token.stripeCustomerId = user.stripeCustomerId;
      }

      // Handle session updates (e.g., after subscription change)
      if (trigger === 'update' && session) {
        token.subscriptionTier = session.subscriptionTier || token.subscriptionTier;
        token.subscriptionStatus = session.subscriptionStatus || token.subscriptionStatus;
      }

      // For OAuth users, fetch user data from database
      if (!token.id && token.email) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { data: dbUser } = await (supabaseAdmin as any)
          .from('users')
          .select('*')
          .eq('email', token.email.toLowerCase())
          .single() as { data: User | null; error: Error | null };

        if (dbUser) {
          token.id = dbUser.id;
          token.subscriptionTier = dbUser.subscription_tier as 'free' | 'starter' | 'professional' | 'enterprise';
          token.subscriptionStatus = dbUser.subscription_status as 'free' | 'trial' | 'active' | 'canceled' | 'past_due';
          token.stripeCustomerId = dbUser.stripe_customer_id;
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.subscriptionTier = token.subscriptionTier;
        session.user.subscriptionStatus = token.subscriptionStatus;
        session.user.stripeCustomerId = token.stripeCustomerId;
      }

      return session;
    },
  },

  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
    newUser: '/dashboard',
  },

  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  secret: process.env.NEXTAUTH_SECRET,
};

/**
 * Helper to hash passwords for new user registration
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

/**
 * Helper to create a new user with email/password
 */
export async function createUser(
  email: string,
  password: string,
  name?: string
): Promise<{ success: boolean; userId?: string; error?: string }> {
  try {
    // Check if user exists
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: existing } = await (supabaseAdmin as any)
      .from('users')
      .select('id')
      .eq('email', email.toLowerCase())
      .single() as { data: { id: string } | null; error: Error | null };

    if (existing) {
      return { success: false, error: 'User already exists' };
    }

    // Hash password and create user
    const passwordHash = await hashPassword(password);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: user, error } = await (supabaseAdmin as any)
      .from('users')
      .insert({
        email: email.toLowerCase(),
        password_hash: passwordHash,
        name,
        subscription_tier: 'free',
        subscription_status: 'free',
      })
      .select()
      .single() as { data: User | null; error: Error | null };

    if (error || !user) throw error;

    return { success: true, userId: user.id };
  } catch (error) {
    console.error('Create user error:', error);
    return { success: false, error: 'Failed to create user' };
  }
}
