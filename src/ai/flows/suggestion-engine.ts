
'use server';

/**
 * @fileOverview A Genkit flow that generates mutation suggestions for strategists.
 *
 * - generateMutationSuggestion - A function that suggests a new mutation based on tier and performance.
 * - MutationSuggestionInput - The input type for the generateMutationSuggestion function.
 * - MutationSuggestionOutput - The return type for the generateMutationSuggestion function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

export const MutationSuggestionInputSchema = z.object({
  tier: z.string().describe("The strategist's current tier (e.g., 'Free+', 'Silver', 'Gold')."),
  recentPerformance: z.string().describe("A summary of the strategist's recent trading performance and identified gaps."),
});
export type MutationSuggestionInput = z.infer<typeof MutationSuggestionInputSchema>;

export const MutationSuggestionOutputSchema = z.object({
  suggestedRoi: z.number().describe("The AI-suggested ROI target for the new mutation, within the strategist's tier limits."),
  suggestedEntropy: z.number().describe("The AI-suggested entropy risk percentage."),
  rationale: z.string().describe("A concise rationale explaining why this mutation is suggested."),
});
export type MutationSuggestionOutput = z.infer<typeof MutationSuggestionOutputSchema>;

export async function generateMutationSuggestion(input: MutationSuggestionInput): Promise<MutationSuggestionOutput> {
  return suggestionEngineFlow(input);
}

const getTierLimits = (tier: string) => {
    switch (tier) {
        case 'Gold':
            return { min: 13, max: 18 };
        case 'Silver':
            return { min: 9, max: 12 };
        default: // Free+
            return { min: 4, max: 8 };
    }
}

const prompt = ai.definePrompt({
  name: 'mutationSuggestionPrompt',
  input: { schema: MutationSuggestionInputSchema },
  output: { schema: MutationSuggestionOutputSchema },
  prompt: `You are Everest, an AI assistant for an advanced trading platform. Your task is to suggest a new mutation for a strategist.

  Strategist Tier: {{{tier}}}
  Recent Performance Summary: {{{recentPerformance}}}

  Based on the tier and performance, generate a suggestion for a new mutation.
  - The suggested ROI must be within the allowed range for the tier.
  - Gold Tier ROI Range: 13-18%
  - Silver Tier ROI Range: 9-12%
  - Free+ Tier ROI Range: 4-8%
  - The suggested entropy risk should be reasonable (e.g., 3-10%).
  - The rationale should be concise (1-2 sentences) and justify the suggestion based on the recent performance. For example, if performance was strong in one area, suggest diversifying or doubling down.
  
  Generate the suggestion now.`,
});


const suggestionEngineFlow = ai.defineFlow(
  {
    name: 'suggestionEngineFlow',
    inputSchema: MutationSuggestionInputSchema,
    outputSchema: MutationSuggestionOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);

    if (!output) {
        throw new Error("AI failed to generate a suggestion.");
    }
    
    // Ensure the AI-generated ROI is within the tier's strict bounds.
    const limits = getTierLimits(input.tier);
    const clampedRoi = Math.max(limits.min, Math.min(output.suggestedRoi, limits.max));
    const clampedEntropy = Math.max(0, Math.min(output.suggestedEntropy, 100));

    return {
        suggestedRoi: clampedRoi,
        suggestedEntropy: clampedEntropy,
        rationale: output.rationale
    };
  }
);
