
'use server';

/**
 * @fileOverview Generates a concise, AI-powered briefing for a strategist.
 *
 * - generateStrategistBriefing - A function that creates a summary of current market conditions and opportunities.
 * - StrategistBriefingInput - The input type for the generateStrategistBriefing function.
 * - StrategistBriefingOutput - The return type for the generateStrategistBriefing function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export const StrategistBriefingInputSchema = z.object({
  tier: z.string().describe("The strategist's current access tier (e.g., 'Gold', 'Silver')."),
  recentMutations: z.array(z.object({
    id: z.string(),
    roi: z.number(),
    status: z.string(),
  })).describe("A list of recent mutations and their performance."),
});
export type StrategistBriefingInput = z.infer<typeof StrategistBriefingInputSchema>;

export const StrategistBriefingOutputSchema = z.object({
  briefing: z.string().describe('A concise, AI-generated briefing for the strategist, summarizing market status and highlighting a key opportunity.'),
});
export type StrategistBriefingOutput = z.infer<typeof StrategistBriefingOutputSchema>;

export async function generateStrategistBriefing(input: StrategistBriefingInput): Promise<StrategistBriefingOutput> {
  return strategistBriefingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'strategistBriefingPrompt',
  input: {schema: StrategistBriefingInputSchema},
  output: {schema: StrategistBriefingOutputSchema},
  prompt: `You are Everest, an AI assistant for an advanced trading platform.

  Generate a concise, powerful briefing for a strategist logging in. The tone should be professional and forward-looking.
  
  The strategist's tier is {{{tier}}}.
  
  Here are their recent mutation results:
  {{#each recentMutations}}
  - Mutation {{id}}: {{status}}, ROI: {{roi}}%
  {{/each}}

  Based on this, provide a 2-3 sentence summary of the current state and identify one potential area of focus or opportunity. For example, mention a high-performing mutation or a trend in the market.
  `,
});

const strategistBriefingFlow = ai.defineFlow(
  {
    name: 'strategistBriefingFlow',
    inputSchema: StrategistBriefingInputSchema,
    outputSchema: StrategistBriefingOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
