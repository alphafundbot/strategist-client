'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AppRootPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/dashboard');
  }, [router]);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="animate-pulse rounded-md bg-muted h-32 w-full max-w-sm"></div>
    </div>
  );
}
