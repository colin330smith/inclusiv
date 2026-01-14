import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

// Helper to check if Supabase is configured
export function isSupabaseConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

// Lazy-initialized clients
let _supabase: SupabaseClient<Database> | null = null;
let _supabaseAdmin: SupabaseClient<Database> | null = null;

// Client-side Supabase client (uses anon key)
export function getSupabase(): SupabaseClient<Database> {
  if (!_supabase) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) {
      throw new Error('Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY');
    }
    _supabase = createClient<Database>(url, key);
  }
  return _supabase;
}

// Server-side Supabase client (uses service role key for admin operations)
export function getSupabaseAdmin(): SupabaseClient<Database> {
  if (!_supabaseAdmin) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url) {
      throw new Error('Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL');
    }

    if (serviceKey) {
      _supabaseAdmin = createClient<Database>(url, serviceKey, {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      });
    } else if (anonKey) {
      _supabaseAdmin = getSupabase();
    } else {
      throw new Error('Supabase is not configured. Set SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY');
    }
  }
  return _supabaseAdmin;
}

// These exports are kept for backward compatibility but now use getter functions
// Use getSupabase() and getSupabaseAdmin() directly for better control

// Create type-safe proxy that defers client creation
function createLazyProxy<T extends object>(getter: () => T): T {
  return new Proxy({} as T, {
    get(target, prop, receiver) {
      // Don't create client for these properties
      if (
        prop === 'then' ||
        prop === Symbol.toStringTag ||
        prop === Symbol.toPrimitive ||
        prop === Symbol.iterator ||
        prop === 'constructor' ||
        prop === 'prototype'
      ) {
        return undefined;
      }

      try {
        const client = getter();
        const value = Reflect.get(client, prop, receiver);
        if (typeof value === 'function') {
          return value.bind(client);
        }
        return value;
      } catch (error) {
        // During build time, return undefined instead of throwing
        if (typeof window === 'undefined' && !process.env.NEXT_PUBLIC_SUPABASE_URL) {
          return undefined;
        }
        throw error;
      }
    },
    has(target, prop) {
      return true;
    },
    ownKeys() {
      return [];
    },
  });
}

export const supabase: SupabaseClient<Database> = createLazyProxy(getSupabase);
export const supabaseAdmin: SupabaseClient<Database> = createLazyProxy(getSupabaseAdmin);
