

'use client';

import AppLayout from '@/components/common/app-layout';
import VoiceControlFab from '@/components/common/voice-control-fab';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading } = useAuth();
  
  useEffect(() => {
    if (!loading) {
      if (!user) {
        // If user is not logged in, clear tier and redirect to login
        localStorage.removeItem('userTier');
        router.push('/');
      } else {
         // If user is logged in, but there's no tier, they need to start over
        const storedTier = localStorage.getItem('userTier');
        if (!storedTier) {
            signOut(auth).finally(() => {
                 router.push('/');
            });
        }
      }
    }
  }, [user, loading, router, pathname]);

  if (loading || !user) {
    return (
        <div className="flex h-screen w-full items-center justify-center bg-background">
            <div className="flex flex-col items-center gap-4">
                <div className="animate-pulse rounded-full bg-muted h-16 w-16"></div>
                <div className="animate-pulse rounded-md bg-muted h-8 w-48"></div>
            </div>
        </div>
    );
  }
  
  const showFullLayout = pathname !== '/onboarding';

  return (
    <AppLayout>
        {children}
        {showFullLayout && <VoiceControlFab />}
    </AppLayout>
  );
}
