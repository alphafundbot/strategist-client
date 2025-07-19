
"use client";

import { useEffect, useState } from 'react';
import WelcomeModal from '@/components/dashboard/welcome-modal';
import DashboardClient from '@/components/dashboard/dashboard-client';
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardPage() {
    const [tier, setTier] = useState<string | null>(null);

    useEffect(() => {
        // This effect runs only on the client, after hydration
        const checkTier = () => {
            const storedTier = localStorage.getItem('userTier');
            if (storedTier) {
                setTier(storedTier);
            } else {
                // If the value isn't set yet, check again shortly.
                // The layout component is responsible for setting this value.
                setTimeout(checkTier, 100);
            }
        };
        checkTier();
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
