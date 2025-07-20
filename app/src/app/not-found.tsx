
'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

// NOTE: This component handles 404 errors gracefully.
// In a real application, you might log these events to a telemetry service.

export default function NotFound() {
  const pathname = usePathname();

  useEffect(() => {
    // Placeholder for logging 404 events to a service like Firestore or Cloud Logging.
    console.log(`404 Not Found: Route '${pathname}' was accessed.`);
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white p-4">
      <div className="flex items-center space-x-4 text-center">
        <h1 className="text-2xl font-medium tracking-wider">404</h1>
        <div className="h-8 w-px bg-gray-600" />
        <p className="text-sm text-gray-400">
          this page could not be found.
        </p>
      </div>
       <Link
        href="/dashboard"
        className="absolute bottom-8 left-8 flex h-10 w-10 items-center justify-center rounded-full border border-gray-800 text-sm font-bold text-gray-500 transition-colors hover:bg-gray-900 hover:text-white"
        aria-label="Go to Dashboard"
      >
        N
      </Link>
    </div>
  );
}
