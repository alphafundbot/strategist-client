

'use client';

import AppLayout from '@/components/common/app-layout';
import VoiceControlFab from '@/components/common/voice-control-fab';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedTier = localStorage.getItem('userTier');
      if (storedTier) {
        setIsVerified(true);
      } else {
        router.push('/');
      }
    }
  }, [router]);

  if (!isVerified) {
    return (
        <div className="flex h-screen w-full items-center justify-center">
            <div className="animate-pulse rounded-md bg-muted h-32 w-full max-w-sm"></div>
        </div>
    );
  }

  return (
    <AppLayout>
        {children}
        <VoiceControlFab />
    </AppLayout>
  );
}
