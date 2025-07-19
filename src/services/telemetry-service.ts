'use server';

import { adminDb } from '@/lib/admin';

/**
 * Logs a telemetry event to a specified Firestore collection.
 * @param collection The name of the collection to log to.
 * @param data The telemetry data to log.
 */
export async function logTelemetry(collection: string, data: Record<string, any>) {
  try {
    const telemetryRef = adminDb.collection(collection).doc();
    await telemetryRef.set({
      ...data,
      serverTimestamp: new Date().toISOString(),
    });
    console.log(`Telemetry logged to '${collection}' with ID: ${telemetryRef.id}`);
    return telemetryRef.id;
  } catch (error) {
    console.error(`Error logging telemetry to ${collection}:`, error);
    throw new Error('Failed to log telemetry data.');
  }
}
