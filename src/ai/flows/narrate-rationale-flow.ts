
'use server';
/**
 * @fileOverview A flow for generating a narrative for a trading strategy rationale.
 *
 * - narrateRationale - A function that handles the rationale narration process.
 * - NarrateRationaleInput - The input type for the narrateRationale function.
 * - NarrateRationaleOutput - The return type for the narrateRationale function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const RationaleEntrySchema = z.object({
  rationale: z.string(),
  rating: z.enum(['good', 'bad']).optional(),
});

export const NarrateRationaleInputSchema = z.object({
  roiTarget: z.string().describe('The target return on investment (ROI) in percent.'),
  entropyThreshold: z.string().describe('The entropy threshold for the strategy.'),
  strategyRationale: z.string().describe('The user-provided notes on the strategy.'),
  history: z.array(RationaleEntrySchema).optional().describe('A history of previously generated rationales and their ratings.'),
});
export type NarrateRationaleInput = z.infer<typeof NarrateRationaleInputSchema>;

export const NarrateRationaleOutputSchema = z.object({
  narrative: z.string().describe('The detailed narrative explaining the strategy, its risks, and potential.'),
  clarityScore: z.number().min(1).max(10).describe('A score from 1-10 rating the clarity and coherence of the provided strategy rationale.'),
});
export type NarrateRationaleOutput = z.infer<typeof NarrateRationaleOutputSchema>;


export async function narrateRationale(input: NarrateRationaleInput): Promise<NarrateRationaleOutput> {
  return narrateRationaleFlow(input);
}

const prompt = ai.definePrompt({
  name: 'narrateRationalePrompt',
  input: { schema: NarrateRationaleInputSchema },
  output: { schema: NarrateRationaleOutputSchema },
  prompt: `You are Everest, an AI strategist narrator. Your role is to take a trader's raw strategy notes and expand them into a clear, coherent narrative. You must also provide a "Clarity Score" from 1-10, evaluating how well-defined the initial notes are.

Analyze the following strategy parameters:
- ROI Target: {{roiTarget}}%
- Entropy Threshold: {{entropyThreshold}}
- Strategist's Rationale: "{{strategyRationale}}"

Based on this, generate a detailed narrative. Explain the potential logic, risks, and market conditions it might be suited for.

{{#if history}}
You are in an evolution cycle. Here is a history of your previous outputs and the strategist's feedback.
Learn from this. Emulate the style and substance of 'good' ratings. Avoid the patterns that led to 'bad' ratings.

History:
{{#each history}}
- Rationale: "{{this.rationale}}"
  Rating: {{#if this.rating}}{{this.rating}}{{else}}Not Rated{{/if}}
{{/each}}
{{/if}}

Generate the new narrative and clarity score based on the provided strategy and your learnings from the history.`,
});

const narrateRationaleFlow = ai.defineFlow(
  {
    name: 'narrateRationaleFlow',
    inputSchema: NarrateRationaleInputSchema,
    outputSchema: NarrateRationaleOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
