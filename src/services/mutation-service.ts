'use server';

import { adminDb } from '@/lib/admin';

/**
 * Stores mutation data for a specific strategist in Firestore.
 * @param strategistId The ID of the strategist.
 * @param mutationId The ID of the mutation.
 * @param data The mutation data to store.
 * @returns The path to the newly created document.
 */
export async function storeMutation(strategistId: string, mutationId: string, data: Record<string, any>) {
  try {
    const mutationRef = adminDb
      .collection('strategists')
      .doc(strategistId)
      .collection('mutations')
      .doc(mutationId);
      
    await mutationRef.set({
      ...data,
      serverTimestamp: new Date().toISOString(),
    });

    console.log(`Mutation stored at: ${mutationRef.path}`);
    return mutationRef.path;
  } catch (error) {
    console.error(`Error storing mutation ${mutationId} for strategist ${strategistId}:`, error);
    throw new Error('Failed to store mutation data.');
  }
}
