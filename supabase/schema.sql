-- Inclusiv Database Schema
-- Run this in Supabase SQL Editor to create all tables

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enums
CREATE TYPE subscription_status AS ENUM ('free', 'trial', 'active', 'canceled', 'past_due');
CREATE TYPE subscription_tier AS ENUM ('free', 'starter', 'professional', 'enterprise');
CREATE TYPE sequence_type AS ENUM ('welcome', 'cold_lead');
CREATE TYPE email_status AS ENUM ('pending', 'sent', 'failed', 'cancelled');
CREATE TYPE scan_frequency AS ENUM ('manual', 'daily', 'weekly', 'monthly');

-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  password_hash TEXT,
  stripe_customer_id TEXT UNIQUE,
  subscription_status subscription_status DEFAULT 'free',
  subscription_tier subscription_tier DEFAULT 'free',
  subscription_id TEXT,
  trial_ends_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Leads table (for email capture before signup)
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL,
  name TEXT,
  company_name TEXT,
  url TEXT,
  source TEXT NOT NULL,
  lead_magnet TEXT,
  scan_score INTEGER,
  total_issues INTEGER,
  critical_issues INTEGER,
  platform_detected TEXT,
  converted_to_user BOOLEAN DEFAULT FALSE,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index on email for fast lookups
CREATE INDEX idx_leads_email ON leads(email);
CREATE INDEX idx_leads_created_at ON leads(created_at);

-- Scans table
CREATE TABLE scans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
  url TEXT NOT NULL,
  score INTEGER NOT NULL,
  total_issues INTEGER NOT NULL DEFAULT 0,
  critical_issues INTEGER NOT NULL DEFAULT 0,
  serious_issues INTEGER NOT NULL DEFAULT 0,
  moderate_issues INTEGER NOT NULL DEFAULT 0,
  minor_issues INTEGER NOT NULL DEFAULT 0,
  platform_detected TEXT,
  scan_results JSONB NOT NULL,
  is_anonymous BOOLEAN DEFAULT TRUE,
  ip_address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for scans
CREATE INDEX idx_scans_user_id ON scans(user_id);
CREATE INDEX idx_scans_url ON scans(url);
CREATE INDEX idx_scans_created_at ON scans(created_at);

-- Scheduled emails table
CREATE TABLE scheduled_emails (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  sequence_type sequence_type NOT NULL,
  email_number INTEGER NOT NULL,
  scheduled_for TIMESTAMPTZ NOT NULL,
  status email_status DEFAULT 'pending',
  sent_at TIMESTAMPTZ,
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for scheduled emails
CREATE INDEX idx_scheduled_emails_status ON scheduled_emails(status);
CREATE INDEX idx_scheduled_emails_scheduled_for ON scheduled_emails(scheduled_for);
CREATE INDEX idx_scheduled_emails_lead_id ON scheduled_emails(lead_id);

-- Sites table (for tracking multiple sites per user)
CREATE TABLE sites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  name TEXT,
  last_scan_id UUID REFERENCES scans(id) ON DELETE SET NULL,
  last_scan_score INTEGER,
  last_scanned_at TIMESTAMPTZ,
  scan_frequency scan_frequency DEFAULT 'manual',
  alert_on_score_change BOOLEAN DEFAULT TRUE,
  alert_threshold INTEGER DEFAULT 5,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, url)
);

-- Create index for sites
CREATE INDEX idx_sites_user_id ON sites(user_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_scheduled_emails_updated_at
  BEFORE UPDATE ON scheduled_emails
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sites_updated_at
  BEFORE UPDATE ON sites
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) Policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE scans ENABLE ROW LEVEL SECURITY;
ALTER TABLE scheduled_emails ENABLE ROW LEVEL SECURITY;
ALTER TABLE sites ENABLE ROW LEVEL SECURITY;

-- Users can only see their own data
CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  USING (auth.uid()::text = id::text OR auth.role() = 'service_role');

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  USING (auth.uid()::text = id::text OR auth.role() = 'service_role');

-- Service role can do everything (for server-side operations)
CREATE POLICY "Service role full access to users"
  ON users FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access to leads"
  ON leads FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access to scans"
  ON scans FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access to scheduled_emails"
  ON scheduled_emails FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access to sites"
  ON sites FOR ALL
  USING (auth.role() = 'service_role');

-- Users can view their own scans
CREATE POLICY "Users can view own scans"
  ON scans FOR SELECT
  USING (user_id::text = auth.uid()::text);

-- Users can view their own sites
CREATE POLICY "Users can view own sites"
  ON sites FOR SELECT
  USING (user_id::text = auth.uid()::text);

CREATE POLICY "Users can manage own sites"
  ON sites FOR ALL
  USING (user_id::text = auth.uid()::text);

-- Grant permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
