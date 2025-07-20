
'use server';
/**
 * @fileOverview A flow for seeding the Firestore database with the Societal Singularity project checklist.
 *
 * - seedSocietalSingularityTasks - Seeds the `societalSingularityTasks` collection.
 * - SeedSocietalTasksOutput - The return type for the seeding function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { getFirestore } from 'firebase-admin/firestore';
import { initializeApp, getApps } from 'firebase-admin/app';
import tasksList from '@/app/(app)/governance/societalTasks.json';

// Initialize Firebase Admin SDK if not already initialized
if (!getApps().length) {
  initializeApp();
}
const db = getFirestore();

export const SeedSocietalTasksOutputSchema = z.object({
  seeded: z.number().describe('The number of tasks seeded into Firestore.'),
});
export type SeedSocietalTasksOutput = z.infer<typeof SeedSocietalTasksOutputSchema>;

export async function seedSocietalSingularityTasks(): Promise<SeedSocietalTasksOutput> {
  return seedSocietalTasksFlow();
}

const seedSocietalTasksFlow = ai.defineFlow(
  {
    name: 'seedSocietalTasksFlow',
    outputSchema: SeedSocietalTasksOutputSchema,
    auth: (auth) => {
        // This is a placeholder for auth checking.
        // In a real Genkit flow with proper auth setup, you would validate the user's claims.
        // For now, we'll allow the operation.
        if (!auth) {
            console.warn("Auth context not available. Allowing seeding operation to proceed.");
        }
    }
  },
  async () => {
    const batch = db.batch();
    const tasksCollection = db.collection('societalSingularityTasks');

    tasksList.forEach(task => {
        const docRef = tasksCollection.doc(String(task.id));
        batch.set(docRef, {
            description: task.description,
            status: 'pending',
            createdAt: new Date(),
        });
    });

    await batch.commit();

    return { seeded: tasksList.length };
  }
);
