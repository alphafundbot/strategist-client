'use server';
/**
 * @fileOverview A mutation engine for strategists.
 *
 * - mutationEngineFlow - A function that handles the mutation process.
 * - MutationEngineInput - The input type for the mutationEngineFlow function.
 * - MutationEngineOutput - The return type for the mutationEngineFlow function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { logTelemetry } from '@/services/telemetry-service';
import { storeMutation } from '@/services/mutation-service';

export const MutationEngineInputSchema = z.object({
  strategistId: z.string().describe('The ID of the strategist initiating the mutation.'),
  roiDeltaThreshold: z.number().describe('The ROI delta that triggers the mutation.'),
  mutationData: z.object({
      entropyRisk: z.number().describe("The entropy risk percentage."),
      proposalTier: z.string().describe("The tier of the strategist at the time of proposal."),
      suggestionRationale: z.string().optional().describe("The AI-generated rationale, if any, for this mutation."),
  }),
});
export type MutationEngineInput = z.infer<typeof MutationEngineInputSchema>;

export const MutationEngineOutputSchema = z.object({
  mutationId: z.string().describe('The ID of the newly created mutation.'),
  status: z.string().describe('The status of the mutation process.'),
  snapshotId: z.string().describe('The ID of the created snapshot for rollback.'),
});
export type MutationEngineOutput = z.infer<typeof MutationEngineOutputSchema>;

export async function runMutationEngine(input: MutationEngineInput): Promise<MutationEngineOutput> {
  return mutationEngineFlow(input);
}

// In a real implementation, we would check Firestore for the last mutation timestamp
// for the given strategistId and enforce a cooldown.
async function checkCooldown(strategistId: string): Promise<boolean> {
  console.log(`Checking cooldown for strategist ${strategistId}...`);
  // Placeholder for cooldown logic.
  return true;
}

export const mutationEngineFlow = ai.defineFlow(
  {
    name: 'mutationEngineFlow',
    inputSchema: MutationEngineInputSchema,
    outputSchema: MutationEngineOutputSchema,
  },
  async (input) => {

    const canProceed = await checkCooldown(input.strategistId);
    if (!canProceed) {
        throw new Error(`Strategist ${input.strategistId} is on cooldown.`);
    }

    // Placeholder for mutation logic
    const mutationId = `mut-${Date.now()}`;
    const snapshotId = `snap-${Date.now()}`;

    const mutationDetails = {
        ...input.mutationData,
        roiDeltaThreshold: input.roiDeltaThreshold,
        createdAt: new Date().toISOString(),
        snapshotId,
    };

    // Store mutation under /strategists/{uid}/mutations
    await storeMutation(input.strategistId, mutationId, mutationDetails);

    const telemetryData = {
        event: 'mutationTriggered',
        strategistId: input.strategistId,
        mutationId,
        ...mutationDetails,
        timestamp: new Date().toISOString(),
    };
    
    // Log to /telemetry/mutationLogs/{docId}
    await logTelemetry('mutationLogs', telemetryData);

    return {
      mutationId,
      status: 'success',
      snapshotId,
    };
  }
);
