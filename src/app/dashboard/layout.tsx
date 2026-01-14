import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import DashboardSidebar from './components/DashboardSidebar';
import DashboardHeader from './components/DashboardHeader';

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

  return (
    <div className="min-h-screen bg-zinc-950">
      <DashboardSidebar user={session.user} />
      <div className="lg:pl-64">
        <DashboardHeader user={session.user} />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
