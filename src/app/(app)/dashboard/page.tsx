
import { cookies } from 'next/headers';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { app } from '@/lib/firebase-admin-app'; // Import admin app

import WelcomeModal from '@/components/dashboard/welcome-modal';
import DashboardClient from '@/components/dashboard/dashboard-client';
import { Skeleton } from '@/components/ui/skeleton';

async function getTierForUser(uid: string): Promise<string> {
    try {
        const db = getFirestore(app);
        const userDoc = await db.collection('users').doc(uid).get();
        if (userDoc.exists) {
            return userDoc.data()?.tier || 'Free+';
        }
        return 'Free+'; // Default if no profile found
    } catch (error) {
        console.error("Error fetching user tier from Firestore:", error);
        return 'Free+'; // Fallback on error
    }
}

async function getAuthenticatedUserTier(): Promise<string> {
    const session = cookies().get('session')?.value || '';

    if (!session) {
        return 'Free+'; // Default for unauthenticated users
    }

    try {
        const decodedClaims = await getAuth(app).verifySessionCookie(session, true);
        const tier = await getTierForUser(decodedClaims.uid);
        return tier;
    } catch (error) {
        console.error("Session verification failed or user not found:", error);
        return 'Free+';
    }
}


export default async function DashboardPage() {
    const tier = await getAuthenticatedUserTier();

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
                <div className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        <Skeleton className="h-28" />
                        <Skeleton className="h-28" />
                        <Skeleton className="h-28" />
                        <Skeleton className="h-28" />
                    </div>
                     <div>
                        <Skeleton className="h-8 w-1/3 mx-auto md:mx-0 md:w-1/4 mb-4" />
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

