
"use client";

import { useEffect, useState } from 'react';
import WelcomeModal from '@/components/dashboard/welcome-modal';
import DashboardClient from '@/components/dashboard/dashboard-client';
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardPage() {
    const [tier, setTier] = useState<string | null>(null);

    useEffect(() => {
        // This effect runs only on the client, after hydration
        const storedTier = localStorage.getItem('userTier') || 'Free+';
        setTier(storedTier);
    }, []);

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
                        <Skeleton className="h-28" />
                        <Skeleton className="h-28" />
                        <Skeleton className="h-28" />
                        <Skeleton className="h-28" />
                    </div>
                    <div>
                         <h2 className="text-xl font-semibold mt-8 mb-4 text-center md:text-left"><Skeleton className="h-6 w-1/2 mx-auto md:mx-0" /></h2>
                         <div className="grid gap-6 md:grid-cols-3">
                             <Skeleton className="h-28" />
                             <Skeleton className="h-28" />
                             <Skeleton className="h-28" />
                         </div>
                    </div>
                </div>
            )}
        </div>
    );
}
