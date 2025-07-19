
"use client";

import WelcomeModal from '@/components/dashboard/welcome-modal';
import DashboardClient from '@/components/dashboard/dashboard-client';
import { Skeleton } from '@/components/ui/skeleton';
import { User } from 'firebase/auth';

interface DashboardPageProps {
  user?: User | null;
  tier?: string | null;
}

export default function DashboardPage({ tier }: DashboardPageProps) {
    return (
        <div className="space-y-8">
            <WelcomeModal />
            <div className="text-center">
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <p className="text-muted-foreground">Monitor strategist fingerprint, vault metrics, and evolution protocol.</p>
            </div>

            {tier ? (
                <DashboardClient tier={tier} />
            ) : (
                <div className="space-y-8">
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        <Skeleton className="h-28 rounded-lg" />
                        <Skeleton className="h-28 rounded-lg" />
                        <Skeleton className="h-28 rounded-lg" />
                        <Skeleton className="h-28 rounded-lg" />
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                        <div className="lg:col-span-3">
                             <Skeleton className="h-80 rounded-lg" />
                        </div>
                         <div className="lg:col-span-2">
                             <Skeleton className="h-80 rounded-lg" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
