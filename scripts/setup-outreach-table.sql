-- Create outreach_prospects table for automated lead generation
CREATE TABLE IF NOT EXISTS outreach_prospects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  domain TEXT NOT NULL UNIQUE,
  company_name TEXT,
  country TEXT,
  industry TEXT,
  accessibility_score INTEGER,
  issues_count INTEGER,
  contact_email TEXT,
  source TEXT NOT NULL DEFAULT 'manual',
  status TEXT NOT NULL DEFAULT 'new',
  outreach_count INTEGER DEFAULT 0,
  last_contacted_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_outreach_prospects_status ON outreach_prospects(status);
CREATE INDEX IF NOT EXISTS idx_outreach_prospects_domain ON outreach_prospects(domain);

-- Enable RLS
ALTER TABLE outreach_prospects ENABLE ROW LEVEL SECURITY;

-- Policy for service role (full access)
CREATE POLICY "Service role has full access to outreach_prospects" ON outreach_prospects
  FOR ALL
  USING (auth.role() = 'service_role');
