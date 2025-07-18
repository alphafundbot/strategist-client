
'use server';

/**
 * @fileOverview A Genkit flow that selects and narrates top-tier strategist simulations.
 *
 * - selectTopSimulations - A function that filters simulations and generates a summary.
 * - SimulationSelectorInput - The input type for the selectTopSimulations function.
 * - SimulationSelectorOutput - The return type for the selectTopSimulations function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const MutationStatSchema = z.object({
  mutationId: z.string(),
  roiDelta: z.number(),
  overrideCount: z.number(),
  fingerprintScore: z.number(),
});

export const SimulationSelectorInputSchema = z.object({
  strategistId: z.string(),
  mutations: z.array(MutationStatSchema).describe("An array of completed mutation statistics."),
});
export type SimulationSelectorInput = z.infer<typeof SimulationSelectorInputSchema>;

export const SimulationSelectorOutputSchema = z.object({
  topSimulations: z.array(MutationStatSchema),
  narration: z.string().describe("A summary of why these simulations were selected as top-tier."),
});
export type SimulationSelectorOutput = z.infer<typeof SimulationSelectorOutputSchema>;

export async function selectTopSimulations(input: SimulationSelectorInput): Promise<SimulationSelectorOutput> {
  return simulationSelectorFlow(input);
}

const narrateSelectionPrompt = ai.definePrompt({
    name: 'narrateTopSimulationsPrompt',
    input: { schema: z.object({ topSimulations: z.array(MutationStatSchema) }) },
    output: { schema: z.object({ narration: z.string() }) },
    prompt: `You are an expert financial analyst. Narrate the selection of top-performing strategist simulations.

    You have been provided with a list of simulations that were filtered based on the following criteria:
    - ROI Delta >= 12%
    - Override Count <= 1
    - Fingerprint Score >= 85

    Your narration should include the mutation IDs, their ROI deltas, and reference their high fingerprint scores. Summarize why these simulations qualify as top-tier and should be considered for elevation and investor export.

    Top-Tier Simulations:
    {{#each topSimulations}}
    - Mutation ID: {{{mutationId}}}, ROI Delta: {{{roiDelta}}}%, Fingerprint Score: {{{fingerprintScore}}}
    {{/each}}

    Generate the summary narration now.
    `
});

const simulationSelectorFlow = ai.defineFlow(
  {
    name: 'simulationSelectorFlow',
    inputSchema: SimulationSelectorInputSchema,
    outputSchema: SimulationSelectorOutputSchema,
  },
  async (input) => {
    // Step 1 & 2: Filter and Sort Top Simulations
    const topSimulations = input.mutations
      .filter(m => 
        m.roiDelta >= 12 &&
        m.overrideCount <= 1 &&
        m.fingerprintScore >= 85
      )
      .sort((a, b) => b.roiDelta - a.roiDelta);

    if (topSimulations.length === 0) {
      return {
        topSimulations: [],
        narration: "No simulations met the top-tier criteria in this batch."
      };
    }

    // Step 3: Narrate the Selection
    const { output } = await narrateSelectionPrompt({ topSimulations });
    
    // In a real application, you would now perform Step 4: storeSelection in Firestore.
    // This flow returns the data to be stored by the caller.

    return {
      topSimulations,
      narration: output!.narration,
    };
  }
);
