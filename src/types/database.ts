/**
 * Supabase Database Types
 * Auto-generated types for type-safe database queries
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string | null;
          password_hash: string | null;
          stripe_customer_id: string | null;
          subscription_status: 'free' | 'trial' | 'active' | 'canceled' | 'past_due';
          subscription_tier: 'free' | 'starter' | 'professional' | 'enterprise';
          subscription_id: string | null;
          trial_ends_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          name?: string | null;
          password_hash?: string | null;
          stripe_customer_id?: string | null;
          subscription_status?: 'free' | 'trial' | 'active' | 'canceled' | 'past_due';
          subscription_tier?: 'free' | 'starter' | 'professional' | 'enterprise';
          subscription_id?: string | null;
          trial_ends_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string | null;
          password_hash?: string | null;
          stripe_customer_id?: string | null;
          subscription_status?: 'free' | 'trial' | 'active' | 'canceled' | 'past_due';
          subscription_tier?: 'free' | 'starter' | 'professional' | 'enterprise';
          subscription_id?: string | null;
          trial_ends_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      leads: {
        Row: {
          id: string;
          email: string;
          url: string | null;
          source: string;
          lead_magnet: string | null;
          scan_score: number | null;
          total_issues: number | null;
          critical_issues: number | null;
          platform_detected: string | null;
          converted_to_user: boolean;
          user_id: string | null;
          metadata: Json | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          url?: string | null;
          source: string;
          lead_magnet?: string | null;
          scan_score?: number | null;
          total_issues?: number | null;
          critical_issues?: number | null;
          platform_detected?: string | null;
          converted_to_user?: boolean;
          user_id?: string | null;
          metadata?: Json | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          url?: string | null;
          source?: string;
          lead_magnet?: string | null;
          scan_score?: number | null;
          total_issues?: number | null;
          critical_issues?: number | null;
          platform_detected?: string | null;
          converted_to_user?: boolean;
          user_id?: string | null;
          metadata?: Json | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      scans: {
        Row: {
          id: string;
          user_id: string | null;
          site_id: string | null;
          lead_id: string | null;
          url: string;
          status: 'pending' | 'processing' | 'completed' | 'failed';
          scan_type: 'quick' | 'full' | 'deep';
          score: number | null;
          total_issues: number | null;
          critical_issues: number | null;
          serious_issues: number | null;
          moderate_issues: number | null;
          minor_issues: number | null;
          platform_detected: string | null;
          scan_results: Json | null;
          options: Json | null;
          is_anonymous: boolean;
          ip_address: string | null;
          created_at: string;
          completed_at: string | null;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          site_id?: string | null;
          lead_id?: string | null;
          url: string;
          status?: 'pending' | 'processing' | 'completed' | 'failed';
          scan_type?: 'quick' | 'full' | 'deep';
          score?: number | null;
          total_issues?: number | null;
          critical_issues?: number | null;
          serious_issues?: number | null;
          moderate_issues?: number | null;
          minor_issues?: number | null;
          platform_detected?: string | null;
          scan_results?: Json | null;
          options?: Json | null;
          is_anonymous?: boolean;
          ip_address?: string | null;
          created_at?: string;
          completed_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          site_id?: string | null;
          lead_id?: string | null;
          url?: string;
          status?: 'pending' | 'processing' | 'completed' | 'failed';
          scan_type?: 'quick' | 'full' | 'deep';
          score?: number | null;
          total_issues?: number | null;
          critical_issues?: number | null;
          serious_issues?: number | null;
          moderate_issues?: number | null;
          minor_issues?: number | null;
          platform_detected?: string | null;
          scan_results?: Json | null;
          options?: Json | null;
          is_anonymous?: boolean;
          ip_address?: string | null;
          created_at?: string;
          completed_at?: string | null;
        };
      };
      scheduled_emails: {
        Row: {
          id: string;
          lead_id: string;
          sequence_type: 'welcome' | 'cold_lead';
          email_number: number;
          scheduled_for: string;
          status: 'pending' | 'sent' | 'failed' | 'cancelled';
          sent_at: string | null;
          error_message: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          lead_id: string;
          sequence_type: 'welcome' | 'cold_lead';
          email_number: number;
          scheduled_for: string;
          status?: 'pending' | 'sent' | 'failed' | 'cancelled';
          sent_at?: string | null;
          error_message?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          lead_id?: string;
          sequence_type?: 'welcome' | 'cold_lead';
          email_number?: number;
          scheduled_for?: string;
          status?: 'pending' | 'sent' | 'failed' | 'cancelled';
          sent_at?: string | null;
          error_message?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      sites: {
        Row: {
          id: string;
          user_id: string;
          url: string;
          name: string | null;
          last_scan_id: string | null;
          last_scan_score: number | null;
          last_scanned_at: string | null;
          scan_frequency: 'manual' | 'daily' | 'weekly' | 'monthly';
          alert_on_score_change: boolean;
          alert_threshold: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          url: string;
          name?: string | null;
          last_scan_id?: string | null;
          last_scan_score?: number | null;
          last_scanned_at?: string | null;
          scan_frequency?: 'manual' | 'daily' | 'weekly' | 'monthly';
          alert_on_score_change?: boolean;
          alert_threshold?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          url?: string;
          name?: string | null;
          last_scan_id?: string | null;
          last_scan_score?: number | null;
          last_scanned_at?: string | null;
          scan_frequency?: 'manual' | 'daily' | 'weekly' | 'monthly';
          alert_on_score_change?: boolean;
          alert_threshold?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      outreach_prospects: {
        Row: {
          id: string;
          domain: string;
          company_name: string | null;
          country: string | null;
          industry: string | null;
          accessibility_score: number | null;
          issues_count: number | null;
          contact_email: string | null;
          source: string;
          status: string;
          outreach_count: number;
          last_contacted_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          domain: string;
          company_name?: string | null;
          country?: string | null;
          industry?: string | null;
          accessibility_score?: number | null;
          issues_count?: number | null;
          contact_email?: string | null;
          source?: string;
          status?: string;
          outreach_count?: number;
          last_contacted_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          domain?: string;
          company_name?: string | null;
          country?: string | null;
          industry?: string | null;
          accessibility_score?: number | null;
          issues_count?: number | null;
          contact_email?: string | null;
          source?: string;
          status?: string;
          outreach_count?: number;
          last_contacted_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      subscription_status: 'free' | 'trial' | 'active' | 'canceled' | 'past_due';
      subscription_tier: 'free' | 'starter' | 'professional' | 'enterprise';
      sequence_type: 'welcome' | 'cold_lead';
      email_status: 'pending' | 'sent' | 'failed' | 'cancelled';
      scan_frequency: 'manual' | 'daily' | 'weekly' | 'monthly';
    };
  };
}

// Helper types for easier usage
export type User = Database['public']['Tables']['users']['Row'];
export type UserInsert = Database['public']['Tables']['users']['Insert'];
export type UserUpdate = Database['public']['Tables']['users']['Update'];

export type Lead = Database['public']['Tables']['leads']['Row'];
export type LeadInsert = Database['public']['Tables']['leads']['Insert'];
export type LeadUpdate = Database['public']['Tables']['leads']['Update'];

export type Scan = Database['public']['Tables']['scans']['Row'];
export type ScanInsert = Database['public']['Tables']['scans']['Insert'];
export type ScanUpdate = Database['public']['Tables']['scans']['Update'];

export type ScheduledEmail = Database['public']['Tables']['scheduled_emails']['Row'];
export type ScheduledEmailInsert = Database['public']['Tables']['scheduled_emails']['Insert'];
export type ScheduledEmailUpdate = Database['public']['Tables']['scheduled_emails']['Update'];

export type Site = Database['public']['Tables']['sites']['Row'];
export type SiteInsert = Database['public']['Tables']['sites']['Insert'];
export type SiteUpdate = Database['public']['Tables']['sites']['Update'];

export type OutreachProspect = Database['public']['Tables']['outreach_prospects']['Row'];
export type OutreachProspectInsert = Database['public']['Tables']['outreach_prospects']['Insert'];
export type OutreachProspectUpdate = Database['public']['Tables']['outreach_prospects']['Update'];

export type SubscriptionStatus = Database['public']['Enums']['subscription_status'];
export type SubscriptionTier = Database['public']['Enums']['subscription_tier'];
export type SequenceType = Database['public']['Enums']['sequence_type'];
export type EmailStatus = Database['public']['Enums']['email_status'];
export type ScanFrequency = Database['public']['Enums']['scan_frequency'];
