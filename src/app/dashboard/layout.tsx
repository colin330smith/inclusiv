import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';
import DashboardSidebar from './components/DashboardSidebar';
import DashboardHeader from './components/DashboardHeader';
import { CommandPalette } from '@/components/ui/command-palette';
import { OnboardingWizard } from '@/components/ui/onboarding-wizard';
import { ToastProvider } from '@/components/ui/toast-provider';

// Force dynamic rendering for all dashboard pages since they use auth/session
export const dynamic = 'force-dynamic';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth/signin?callbackUrl=/dashboard');
  }

  // Check if user is new (no sites yet)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: sites } = await (supabaseAdmin as any)
    .from('sites')
    .select('id')
    .eq('user_id', session.user.id)
    .limit(1);

  const isNewUser = !sites || sites.length === 0;

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Global toast notifications */}
      <ToastProvider />

      {/* Command palette (⌘K) */}
      <CommandPalette user={session.user} />

      {/* Onboarding wizard for new users */}
      <OnboardingWizard
        userName={session.user.name}
        isNewUser={isNewUser}
      />

      <DashboardSidebar user={session.user} />
      <div className="lg:pl-64">
        <DashboardHeader user={session.user} />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
