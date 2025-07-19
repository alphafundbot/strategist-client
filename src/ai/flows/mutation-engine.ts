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
  parentMutationId: z.string().optional().describe('The ID of the parent mutation to establish a lineage.'),
  mutationData: z.object({
      entropyRisk: z.number().describe("The entropy risk percentage."),
      proposalTier: z.string().describe("The tier of the strategist at the time of proposal."),
      suggestionRationale: z.string().optional().describe("The AI-generated rationale, if any, for this mutation."),
  }),
});
export type MutationEngineInput = z.infer<typeof MutationEngineInputSchema>;

export const MutationEngineOutputSchema = z.object({
  mutationId: z.string().describe('The ID of the newly created mutation.'),
  snapshotId: z.string().describe('The ID of the created snapshot for rollback.'),
  status: z.string().describe('The status of the mutation process.'),
  paths: z.object({
    mutationPath: z.string().describe('The Firestore path to the mutation document.'),
    snapshotPath: z.string().describe('The Firestore path to the snapshot document.'),
    telemetryPath: z.string().describe('The Firestore path to the telemetry log document.'),
  }),
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

const inferTagsPrompt = ai.definePrompt({
    name: 'inferTagsPrompt',
    input: { schema: z.object({
        roi: z.number(),
        entropy: z.number(),
        rationale: z.string().optional(),
    }) },
    output: { schema: z.object({ tags: z.array(z.string()) }) },
    prompt: `Based on the following mutation profile, generate 2-3 concise, lowercase, hyphenated strategy tags (e.g., "volatility-blind", "momentum-burst").

    - ROI Target: {{roi}}%
    - Entropy Risk: {{entropy}}%
    - Rationale: {{rationale}}

    Analyze the profile to infer the likely trading strategy.
    `,
});


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

    const { output: tagsOutput } = await inferTagsPrompt({
        roi: input.roiDeltaThreshold,
        entropy: input.mutationData.entropyRisk,
        rationale: input.mutationData.suggestionRationale,
    });

    const strategyTags = tagsOutput?.tags || [];

    // Placeholder for mutation logic
    const mutationId = `mut-${Date.now()}`;
    const snapshotId = `snap-${Date.now()}`;

    const mutationDetails = {
        ...input.mutationData,
        roiDeltaThreshold: input.roiDeltaThreshold,
        parentMutationId: input.parentMutationId,
        createdAt: new Date().toISOString(),
        snapshotId,
        strategyTags,
    };

    // Store mutation under /strategists/{uid}/mutations
    const mutationPath = await storeMutation(input.strategistId, mutationId, mutationDetails);
    
    // Placeholder for snapshot creation
    const snapshotPath = `/snapshots/${input.strategistId}/${snapshotId}`;

    const telemetryData = {
        event: 'mutationTriggered',
        strategistId: input.strategistId,
        mutationId,
        ...mutationDetails,
        timestamp: new Date().toISOString(),
    };
    
    // Log to /telemetry/mutationLogs/{docId}
    const telemetryPath = await logTelemetry('mutationLogs', telemetryData);

    return {
      mutationId,
      snapshotId,
      status: 'success',
      paths: {
        mutationPath,
        snapshotPath, // Placeholder path
        telemetryPath,
      },
    };
  }
);
