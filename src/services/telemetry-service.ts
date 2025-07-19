'use server';

import { adminDb } from '@/lib/admin';

/**
 * Logs a telemetry event to Firestore.
 * @param data The telemetry data to log.
 */
export async function logTelemetry(data: Record<string, any>) {
  try {
    const telemetryRef = adminDb.collection('telemetry').doc();
    await telemetryRef.set({
      ...data,
      serverTimestamp: new Date().toISOString(),
    });
    console.log(`Telemetry logged with ID: ${telemetryRef.id}`);
    return telemetryRef.id;
  } catch (error) {
    console.error('Error logging telemetry:', error);
    throw new Error('Failed to log telemetry data.');
  }
}
