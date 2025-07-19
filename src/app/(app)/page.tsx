
"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AppRootPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/dashboard');
  }, [router]);

  return (
    <div className="flex justify-center items-center h-full">
      <p>Redirecting to dashboard...</p>
    </div>
  );
}
