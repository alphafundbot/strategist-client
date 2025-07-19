
'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

// NOTE: The following would be handled by a real hook and Firestore service
// import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
// import { useStrategistProfile } from '@/hooks/useStrategist'; // custom hook to fetch strategist data

export default function NotFound() {
  const router = useRouter();
  const pathname = usePathname();
  // const { strategist } = useStrategistProfile(); // returns tierLevel, unlockedModules, uid
  const fallbackRoute = '/dashboard';

  useEffect(() => {
    /**
     * Logs the 404 event to a telemetry collection in Firestore.
     * This is currently a placeholder for when the service is implemented.
     */
    const log404 = async () => {
      console.log(`404 Not Found: ${pathname}. Logging to telemetry...`);
      // Example of what would be here:
      // const db = getFirestore();
      // await addDoc(collection(db, 'telemetry'), {
      //   route: pathname,
      //   timestamp: serverTimestamp(),
      //   strategistUID: strategist?.uid || 'anon',
      //   fallback: fallbackRoute,
      // });

      // Trigger Everest narration via Genkit flow (optional)
      // await invokeEverestNarration("Strategist, that route is uncharted... Redirecting to Vault core.");
    };

    log404();

    // Auto-redirect after timeout. The original component had a 5s redirect,
    // but the new design doesn't mention it, so it's removed for now.
    // If you want it back, just say the word.
    // const redirect = setTimeout(() => {
    //   router.push(fallbackRoute);
    // }, 5000);
    // return () => clearTimeout(redirect);

  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground p-4 relative">
      <div className="flex items-center space-x-4">
        <h1 className="text-2xl font-medium">404</h1>
        <div className="h-8 w-px bg-muted-foreground/50" />
        <p className="text-sm text-muted-foreground">
          this page could not be found.
        </p>
      </div>

      <Link
        href="/dashboard"
        className="absolute bottom-8 left-8 flex h-10 w-10 items-center justify-center rounded-full border border-border text-sm font-bold text-muted-foreground transition-colors hover:bg-muted"
        aria-label="Go to Dashboard"
      >
        N
      </Link>
    </div>
  );
}
