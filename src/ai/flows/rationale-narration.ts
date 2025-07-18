'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating a rationale narration for a mutation, including a clarity score.
 *
 * - generateRationaleNarration - A function that generates the rationale narration.
 * - RationaleNarrationInput - The input type for the generateRationaleNarration function.
 * - RationaleNarrationOutput - The output type for the generateRationaleNarration function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RationaleNarrationInputSchema = z.object({
  mutationProposal: z.string().describe('The proposed mutation description.'),
  roiTarget: z.string().describe('The target ROI for the mutation.'),
  entropyRisk: z.string().describe('The entropy risk associated with the mutation.'),
});
export type RationaleNarrationInput = z.infer<typeof RationaleNarrationInputSchema>;

const RationaleNarrationOutputSchema = z.object({
  rationale: z.string().describe('The rationale behind the mutation proposal.'),
  clarityScore: z.number().describe('A score indicating the clarity of the rationale (0-100).'),
});
export type RationaleNarrationOutput = z.infer<typeof RationaleNarrationOutputSchema>;

export async function generateRationaleNarration(
  input: RationaleNarrationInput
): Promise<RationaleNarrationOutput> {
  return rationaleNarrationFlow(input);
}

const rationaleNarrationPrompt = ai.definePrompt({
  name: 'rationaleNarrationPrompt',
  input: {schema: RationaleNarrationInputSchema},
  output: {schema: RationaleNarrationOutputSchema},
  prompt: `You are an expert strategist explaining the rationale behind a mutation proposal.

  Mutation Proposal: {{{mutationProposal}}}
  ROI Target: {{{roiTarget}}}
  Entropy Risk: {{{entropyRisk}}}

  Provide a clear and concise explanation of the rationale. Also, assign a clarity score (0-100) indicating how well the rationale is explained.
  `,
});

const rationaleNarrationFlow = ai.defineFlow(
  {
    name: 'rationaleNarrationFlow',
    inputSchema: RationaleNarrationInputSchema,
    outputSchema: RationaleNarrationOutputSchema,
  },
  async input => {
    const {output} = await rationaleNarrationPrompt(input);
    return output!;
  }
);
