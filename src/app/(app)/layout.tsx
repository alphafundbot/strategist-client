
"use client";

import { useEffect, useState, ReactNode, Children, cloneElement, isValidElement } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase/client';
import AppLayout from '@/components/layout/app-layout';
import { Toaster } from "@/components/ui/toaster";

export default function AuthenticatedLayout({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [tier, setTier] = useState<string>('Observer');
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
                    const userTier = userData.tier || 'Observer';
                    setTier(userTier);
                    
                    const name = userData.name || user.displayName || 'User';
                    const initials = name.split(' ').map((n: string) => n[0]).join('');
                    setInitials(initials);
                } else {
                    setTier('Observer');
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
      { name: 'Mutation Generator', path: '/trading', icon: 'FlaskConical' },
      { name: 'Strategy Vaults', path: '/vaults', icon: 'Archive' },
      { name: 'ROI Simulation', path: '/simulation', icon: 'BarChart' },
      { name: 'Investor Mode', path: '/investor', icon: 'UserCheck' },
    ];

    const bottomNavItems = [
      { name: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard' },
      { name: 'Generator', path: '/trading', icon: 'FlaskConical' },
      { name: 'Vaults', path: '/vaults', icon: 'Archive' },
      { name: 'You', path: '/settings', icon: 'User' },
    ];

    const childrenWithProps = Children.map(children, child => {
      if (isValidElement(child)) {
        // @ts-ignore
        return cloneElement(child, { user, tier });
      }
      return child;
    });

    return (
        <AppLayout
            userInitials={initials}
            userTier={tier}
            navItems={navItems}
            bottomNavItems={bottomNavItems}
            activePath={pathname}
        >
            <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
                {childrenWithProps}
            </main>
            <Toaster />
        </AppLayout>
    );
}
