
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

    // Auto-redirect after timeout
    const redirect = setTimeout(() => {
      // const destination = strategist?.unlockedModules?.[0] || fallbackRoute;
      router.push(fallbackRoute);
    }, 5000);

    return () => clearTimeout(redirect);
  }, [router, pathname, fallbackRoute]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground p-4 relative">
      <div className="flex items-center space-x-4">
        <h1 className="text-2xl font-medium">404</h1>
        <div className="h-8 w-px bg-muted-foreground/50" />
        <p className="text-sm text-muted-foreground">
          This page could not be found. Redirecting shortly…
        </p>
      </div>

      <div className="mt-4 text-muted-foreground text-sm">
        Try: <Link href="/dashboard" className="underline hover:text-primary">/dashboard</Link>, <Link href="/trading" className="underline hover:text-primary">/trading</Link>, or <Link href="/vaults" className="underline hover:text-primary">/vaults</Link>
      </div>

      <Link
        href="/dashboard"
        className="absolute bottom-8 left-8 flex h-10 w-10 items-center justify-center rounded-full border border-border text-sm font-bold text-muted-foreground transition-colors hover:bg-muted"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M12 2.5a.5.5 0 0 0-1 0V2a.5.5 0 0 0-1 0v.5a.5.5 0 0 0-1 0v.5a.5.5 0 0 0-1 0V4a.5.5 0 0 0-1 0v.5a.5.5 0 0 0-1 0V5a.5.5 0 0 0-1 0v.5a.5.5 0 0 0-1 0v.5a.5.5 0 0 0-.5 1H2a.5.5 0 0 0 0 1h.5a.5.5 0 0 0 1 0V8a.5.5 0 0 0 1 0v-.5a.5.5 0 0 0 1 0v-.5a.5.5 0 0 0 1 0V6a.5.5 0 0 0 1 0v-.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0 1 0v-.5a.5.5 0 0 0 1 0V4a.5.5 0 0 0 1 0v-.5a.5.5 0 0 0 1 0V3a.5.5 0 0 0 1 0v-.5a.5.5 0 0 0-1 0V2a.5.5 0 0 0-1 0v.5a.5.5 0 0 0-1 0V3a.5.5 0 0 0-1 0v.5a.5.5 0 0 0-1 0V4a.5.5 0 0 0-1 0v.5a.5.5 0 0 0-1 0v.5a.5.5 0 0 0-1 0v.5a.5.5 0 0 0-1 0v.5a.5.5 0 0 0-1 0v.5a.5.5 0 0 0-1 0v.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0-1 0v.5a.5.5 0 0 0-1 0v.5a.5.5 0 0 0-.5 1H2a.5.5 0 0 0 0 1h.5a.5.5 0 0 0 .5-1v-.5a.5.5 0 0 0-1 0v.5a.5.5 0 0 0-1 0V11a.5.5 0 0 0-1 0v.5a.5.5 0 0 0 1 0v-.5a.5.5 0 0 0 1 0v.5a.5.5 0 0 0 1 0V11a.5.5 0 0 0 1 0v.5a.5.5 0 0 0 1 0v-.5a.5.5 0 0 0 1 0V10a.5.5 0 0 0 1 0v.5a.5.5 0 0 0 1 0v-.5a.5.5 0 0 0 1 0v-.5a.5.5 0 0 0 1 0V8a.5.5 0 0 0 1 0v.5a.5.5 0 0 0 1 0V8a.5.5 0 0 0 1 0v-.5a.5.5 0 0 0 1 0v.5a.5.5 0 0 0 .5-1H12a.5.5 0 0 0 0-1h-.5a.5.5 0 0 0-1 0v.5a.5.5 0 0 0-1 0V8a.5.5 0 0 0-1 0v.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0-1 0v.5a.5.5 0 0 0-1 0v.5a.5.5 0 0 0-1 0v.5a.5.5 0 0 0-1 0v.5a.5.5 0 0 0-1 0v.5a.5.5 0 0 0-1 0V12a.5.5 0 0 0-1 0v.5a.5.5 0 0 0-1 0v.5a.5.5 0 0 0-.5 1H2a.5.5 0 0 0 0 1h.5a.5.5 0 0 0 1 0v-.5a.5.5 0 0 0-1 0v.5a.5.5 0 0 0-1 0v.5a.5.5 0 0 0 1 0v-.5a.5.5 0 0 0 1 0v.5a.5.5 0 0 0 1 0V14a.5.5 0 0 0 1 0v-.5a.5.5 0 0 0 1 0v-.5a.5.5 0 0 0 1 0V12a.5.5 0 0 0 1 0v.5a.5.5 0 0 0 1 0v.5a.5.5 0 0 0 1 0v-.5a.5.5 0 0 0 1 0v-.5a.5.5 0 0 0 1 0v-.5a.5.5 0 0 0 1 0V10a.5.5 0 0 0 1 0v.5a.5.5 0 0 0 .5-1H12a.5.5 0 0 0 0-1h-.5a.5.5 0 0 0-.5 1v.5a.5.5 0 0 0 1 0v-.5a.5.5 0 0 0 1 0v.5a.5.5 0 0 0 1 0v.5a.5.5 0 0 0 1 0v.5a.5.5 0 0 0 1 0v.5a.5.5 0 0 0 1 0V14a.5.5 0 0 0 1 0v.5a.5.5 0 0 0 1 0v.5a.5.5 0 0 0 .5-1h.5a.5.5 0 0 0 0-1h-.5a.5.5 0 0 0-1 0v.5a.5.5 0 0 0 1 0V15a.5.5 0 0 0 1 0v-.5a.5.5 0 0 0 1 0v-.5a.5.5 0 0 0 1 0V13a.5.5 0 0 0 1 0v.5a.5.5 0 0 0 .5-1h.5a.5.5 0 0 0 0-1h-.5a.5.5 0 0 0-1 0v.5a.5.5 0 0 0 1 0v.5a.5.5 0 0 0 1 0v-.5a.5.5 0 0 0 1 0v.5a.5.5 0 0 0 .5-1h.5a.5.5 0 0 0 0-1h-.5a.5.5 0 0 0-1 0V12a.5.5 0 0 0-1 0v-.5a.5.5 0 0 0-1 0v.5a.5.5 0 0 0-1 0V12a.5.5 0 0 0-.5-1h-1a.5.5 0 0 0-1 0v.5a.5.5 0 0 0-1 0V12a.5.5 0 0 0-1 0v.5a.5.5 0 0 0-1 0v.5a.5.5 0 0 0-1 0v.5a.5.5 0 0 0-1 0v.5a.5.5 0 0 0-1 0v.5a.5.5 0 0 0-.5 1H2a.5.5 0 0 0 0 1h.5a.5.5 0 0 0 .5-1V15a.5.5 0 0 0-1 0v.5a.5.5 0 0 0-1 0v.5a.5.5 0 0 0 1 0v.5a.5.5 0 0 0 1 0v.5a.5.5 0 0 0 1 0V17a.5.5 0 0 0 1 0v.5a.5.5 0 0 0 1 0v.5a.5.5 0 0 0 1 0v.5a.5.5 0 0 0 .5-1H12a.5.5 0 0 0 0-1h-.5a.5.5 0 0 0-1 0v.5a.5.5 0 0 0-1 0v.5a.5.5 0 0 0-1 0V19a.5.5 0 0 0-1 0v.5a.5.5 0 0 0-1 0v.5a.5.5 0 0 0-1 0v.5a.5.5 0 0 0-.5 1H2a.5.5 0 0 0 0 1h.5a.5.5 0 0 0 1 0v-.5a.5.5 0 0 0-1 0v.5a.5.5 0 0 0 1 0v.5a.5.5 0 0 0 1 0v-.5a.5.5 0 0 0 1 0v-.5a.5.5 0 0 0 1 0v.5a.5.5 0 0 0 1 0V20a.5.5 0 0 0 1 0v.5a.5.5 0 0 0 .5-1H12a.5.5 0 0 0 0-1h-.5a.5.5 0 0 0-1 0v.5a.5.5 0 0 0-1 0v.5a.5.5 0 0 0 1 0V20a.5.5 0 0 0 1 0v-.5a.5.5 0 0 0 .5-1H12a.5.5 0 0 0 0-1h-.5a.5.5 0 0 0-1 0v.5a.5.5 0 0 0-1 0v.5a.5.5 0 0 0-1 0v.5a.5.5 0 0 0-1 0v.5a.5.5 0 0 0-1 0V21a.5.5 0 0 0-1 0v.5a.5.5 0 0 0-1 0v.5a.5.5 0 0 0-1 0v.5a.5.5 0 0 0-1 0v.5a.5.5 0 0 0-.5 1H2a.5.5 0 0 0 0 1h.5a.5.5 0 0 0 .5-1v-.5a.5.5 0 0 0-1 0v.5a.5.5 0 0 0-1 0v.5a.5.5 0 0 0-1 0v.5a.5.5 0 0 0 1 0v-.5a.5.5 0 0 0 1 0V22a.5.5 0 0 0 1 0v.5a.5.5 0 0 0 .5-1h.5a.5.5 0 0 0 0-1h-.5a.5.5 0 0 0-1 0V22a.5.5 0 0 0-1 0v.5a.5.5 0 0 0-1 0v.5a.5.5 0 0 0-1 0v.5a.5.5 0 0 0-.5 1H2a.5.5 0 0 0 0 1h.5a.5.5 0 0 0 .5-1V22a.5.5 0 0 0-1 0v.5a.5.5 0 0 0 1 0v.5a.5.5 0 0 0 1 0V23a.5.5 0 0 0 1 0v.5a.5.5 0 0 0 .5-1h.5a.5.5 0 0 0 0-1h-.5a.5.5 0 0 0-1 0v.5a.5.5 0 0 0 1 0v.5a.5.5 0 0 0 1 0v-.5a.5.5 0 0 0 1 0v-.5a.5.5 0 0 0 .5-1h.5a.5.5 0 0 0 0-1h-.5a.5.5 0 0 0-1 0v.5a.5.5 0 0 0 1 0V22a.5.5 0 0 0 1 0v.5a.5.5 0 0 0 1 0V23a.5.5 0 0 0 1 0v-.5a.5.5 0 0 0 .5-1h.5a.5.5 0 0 0 0-1h-.5a.5.5 0 0 0-1 0v.5a.5.5 0 0 0 1 0v-.5a.5.5 0 0 0 .5-1h.5a.5.5 0 0 0 0-1h-.5a.5.5 0 0 0-1 0V23a.5.5 0 0 0-1 0v.5a.5.5 0 0 0-.5 1H2a.5.5 0 0 0 0 1h.5a.5.5 0 0 0 1 0V23a.5.5 0 0 0 1 0v-.5a.5.5 0 0 0 .5-1h.5a.5.5 0 0 0 0-1h-.5a.5.5 0 0 0-1 0v.5a.5.5 0 0 0 1 0v.5a.5.5 0 0 0 1 0V23a.5.5 0 0 0 1 0v.5a.5.5 0 0 0 .5-1H12a.5.5 0 0 0 0-1h-.5a.5.5 0 0 0-1 0v.5a.5.5 0 0 0 1 0V23a.5.5 0 0 0 1 0v.5a.5.5 0 0 0 .5-1h.5a.5.5 0 0 0 0-1Z" /><path d="M12 2.5a.5.5 0 0 0 1 0V2a.5.5 0 0 0 1 0v.5a.5.5 0 0 0 1 0V2a.5.5 0 0 0 .5-1h.5a.5.5 0 0 0 0-1h-.5a.5.5 0 0 0-1 0V1a.5.5 0 0 0-1 0v.5a.5.5 0 0 0-1 0V1a.5.5 0 0 0-1 0v.5a.5.5 0 0 0-1 0V1a.5.5 0 0 0-1 0v.5a.5.5 0 0 0-1 0V1a.5.5 0 0 0-1 0v.5a.5.5 0 0 0-1 0V1a.5.5 0 0 0-1 0v.5a.5.5 0 0 0-.5 1H2a.5.5 0 0 0 0 1h.5a.5.5 0 0 0 .5-1v-.5a.5.5 0 0 0-1 0V3a.5.5 0 0 0-1 0v.5a.5.5 0 0 0 1 0V3a.5.5 0 0 0 1 0v.5a.5.5 0 0 0 1 0V3a.5.5 0 0 0 1 0v.5a.5.5 0 0 0 1 0V3a.5.5 0 0 0 1 0v.5a.5.5 0 0 0 1 0V3a.5.5 0 0 0 1 0v.5a.5.5 0 0 0 1 0V3a.5.5 0 0 0 .5-1h.5a.5.5 0 0 0 0-1h-.5a.5.5 0 0 0-.5 1v.5a.5.5 0 0 0-1 0V3a.5.5 0 0 0-1 0v.5a.5.5 0 0 0-1 0V3a.5.5 0 0 0-1 0v.5a.5.5 0 0 0-1 0V3a.5.5 0 0 0-1 0v.5a.5.5 0 0 0-1 0V3a.5.5 0 0 0-1 0V2a.5.5 0 0 0-1 0v.5a.5.5 0 0 0-1 0V2a.5.5 0 0 0-1 0v.5a.5.5 0 0 0-.5 1H2a.5.5 0 0 0 0 1h.5a.5.5 0 0 0 1 0V4a.5.5 0 0 0-1 0v.5a.5.5 0 0 0-1 0V5a.5.5 0 0 0-1 0v.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0 1 0v.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0 1 0v.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0 1 0v.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0 1 0V4a.5.5 0 0 0 1 0v.5a.5.5 0 0 0 .5-1h.5a.5.5 0 0 0 0-1h-.5a.5.5 0 0 0-.5 1v.5a.5.5 0 0 0-1 0V5a.5.5 0 0 0-1 0V4a.5.5 0 0 0-1 0v.5a.5.5 0 0 0-1 0V4a.5.5 0 0 0-1 0v.5a.5.5 0 0 0-1 0V4a.5.5 0 0 0-1 0v.5a.5.5 0 0 0-1 0V4a.5.5 0 0 0-1 0v.5a.5.5 0 0 0-1 0V4a.5.5 0 0 0-.5 1H2a.5.5 0 0 0 0 1h.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-1 0v.5a.5.5 0 0 0-1 0V6a.5.5 0 0 0-1 0v.5a.5.5 0 0 0 1 0V6a.5.5 0 0 0 1 0v.5a.5.5 0 0 0 1 0V6a.5.5 0 0 0 1 0v.5a.5.5 0 0 0 1 0V6a.5.5 0 0 0 1 0v.5a.5.5 0 0 0 1 0V6a.5.5 0 0 0 .5-1h.5a.5.5 0 0 0 0-1h-.5a.5.5 0 0 0-.5 1v.5a.5.5 0 0 0-1 0V6a.5.5 0 0 0-1 0V5a.5.5 0 0 0-1 0v.5a.5.5 0 0 0-1 0V5a.5.5 0 0 0-1 0v.5a.5.5 0 0 0-1 0V5a.5.5 0 0 0-1 0v.5a.5.5 0 0 0-1 0V5a.5.5 0 0 0-1 0v.5a.5.5 0 0 0-.5 1H2a.5.5 0 0 0 0 1h.5a.5.5 0 0 0 1 0V6a.5.5 0 0 0-1 0v.5a.5.5 0 0 0-1 0v.5a.5.5 0 0 0 1 0V7a.5.5 0 0 0 1 0v.5a.5.5 0 0 0 1 0V7a.5.5 0 0 0 1 0v.5a.5.5 0 0 0 1 0V7a.5.5 0 0 0 1 0v.5a.5.5 0 0 0 .5-1h.5a.5.5 0 0 0 0-1h-.5a.5.5 0 0 0-.5 1v.5a.5.5 0 0 0-1 0V7a.5.5 0 0 0-1 0V6a.5.5 0 0 0-1 0v.5a.5.5 0 0 0-1 0V6a.5.5 0 0 0-1 0v.5a.5.5 0 0 0-1 0V6a.5.5 0 0 0-1 0v.5a.5.5 0 0 0-1 0V6a.5.5 0 0 0-1 0V5a.5.5 0 0 0-.5 1H2a.5.5 0 0 0 0 1h.5a.5.5 0 0 0 1 0V6a.5.5 0 0 0-1 0v.5a.5.5 0 0 0-1 0v.5a.5.5 0 0 0-1 0v.5a.5.5 0 0 0 1 0v-.5a.5.5 0 0 0 1 0V7a.5.5 0 0 0 1 0v.5a.5.5 0 0 0 .5-1h.5a.5.5 0 0 0 0-1h-.5a.5.5 0 0 0-1 0V7a.5.5 0 0 0-1 0V6a.5.5 0 0 0-1 0v.5a.5.5 0 0 0-1 0v.5a.5.5 0 0 0-1 0v.5a.5.5 0 0 0-.5 1H2a.5.5 0 0 0 0 1h.5a.5.5 0 0 0 .5-1v-.5a.5.5 0 0 0-1 0v.5a.5.5 0 0 0-1 0v.5a.5.5 0 0 0-1 0v.5a.5.5 0 0 0 1 0v-.5a.5.5 0 0 0 1 0v.5a.5.5 0 0 0 1 0V8a.5.5 0 0 0 .5-1h.5a.5.5 0 0 0 0-1h-.5a.5.5 0 0 0-1 0v.5a.5.5 0 0 0 1 0v-.5a.5.5 0 0 0 .5-1h.5a.5.5 0 0 0 0-1h-.5a.5.5 0 0 0-1 0V8a.5.5 0 0 0-1 0v.5a.5.5 0 0 0-1 0V8a.5.5 0 0 0-1 0v.5a.5.5 0 0 0-1 0V8a.5.5 0 0 0-.5 1H2a.5.5 0 0 0 0 1h.5a.5.5 0 0 0 1 0v-.5a.5.5 0 0 0-1 0v.5a.5.5 0 0 0-1 0v.5a.5.5 0 0 0 1 0v-.5a.5.5 0 0 0 1 0V9a.5.5 0 0 0 1 0v.5a.5.5 0 0 0 .5-1h.5a.5.5 0 0 0 0-1h-.5a.5.5 0 0 0-1 0v.5a.5.5 0 0 0 1 0V9a.5.5 0 0 0 1 0V8a.5.5 0 0 0 1 0v.5a.5.5 0 0 0 .5-1h.5a.5.5 0 0 0 0-1h-.5a.5.5 0 0 0-1 0v.5a.5.5 0 0 0 1 0v.5a.5.5 0 0 0 1 0V9a.5.5 0 0 0 .5-1h.5a.5.5 0 0 0 0-1h-.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0-1 0v.5a.5.5 0 0 0-.5 1H2a.5.5 0 0 0 0 1h.5a.5.5 0 0 0 .5-1V9a.5.5 0 0 0-1 0v.5a.5.5 0 0 0-1 0v.5a.5.5 0 0 0 1 0v-.5a.5.5 0 0 0 1 0v.5a.5.5 0 0 0 1 0V10a.5.5 0 0 0 1 0v-.5a.5.5 0 0 0 1 0v.5a.5.5 0 0 0 .5-1h.5a.5.5 0 0 0 0-1h-.5a.5.5 0 0 0-1 0v.5a.5.5 0 0 0 1 0V10a.5.5 0 0 0 1 0v-.5a.5.5 0 0 0 1 0v.5a.5.5 0 0 0 .5-1h.5a.5.5 0 0 0 0-1h-.5a.5.5 0 0 0-1 0v.5a.5.5 0 0 0 1 0v-.5a.5.5 0 0 0 1 0V9a.5.5 0 0 0 1 0v.5a.5.5 0 0 0 1 0V9a.5.5 0 0 0 1 0v.5a.5.5 0 0 0 .5-1h.5a.5.5 0 0 0 0-1Z" /></svg>
      </Link>
    </div>
  );
}

    