
"use client";

import { useEffect, useState, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase/client';
import AppLayout from '@/components/layout/app-layout';
import { Toaster } from "@/components/ui/toaster";

export default function AuthenticatedLayout({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [tier, setTier] = useState<string>('Free+');
    const [initials, setInitials] = useState('');
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUser(user);
                const userDocRef = doc(db, 'users', user.uid);
                const userDoc = await getDoc(userDocRef);
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    const userTier = userData.tier || 'Free+';
                    setTier(userTier);
                    localStorage.setItem('userTier', userTier);
                    
                    const name = userData.name || user.displayName || 'User';
                    const initials = name.split(' ').map((n: string) => n[0]).join('');
                    setInitials(initials);
                } else {
                    setTier('Free+');
                    localStorage.setItem('userTier', 'Free+');
                    setInitials(user.email ? user.email[0].toUpperCase() : 'U');
                }
            } else {
                setUser(null);
                router.push('/');
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [router]);

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
            </div>
        );
    }

    if (!user) {
        return null; 
    }

    const navItems = [
      { name: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard' },
      { name: 'Trading Cockpit', path: '/trading', icon: 'Rocket' },
      { name: 'Strategy Vaults', path: '/vaults', icon: 'Vault' },
      { name: 'Asset Universe', path: '/assets', icon: 'Bitcoin' },
      { name: 'Connect', path: '/connect', icon: 'Plug' },
      { name: 'Transfers', path: '/transfers', icon: 'ArrowRightLeft' },
      { name: 'Investor Mode', path: '/investor', icon: 'UserCheck' },
    ];

    const bottomNavItems = [
      { name: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard' },
      { name: 'Trading', path: '/trading', icon: 'Rocket' },
      { name: 'Assets', path: '/assets', icon: 'Bitcoin' },
      { name: 'You', path: '/settings', icon: 'User' },
    ];

    return (
        <AppLayout
            userInitials={initials}
            userTier={tier}
            navItems={navItems}
            bottomNavItems={bottomNavItems}
            activePath={pathname}
        >
            <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
                {children}
            </main>
            <Toaster />
        </AppLayout>
    );
}
