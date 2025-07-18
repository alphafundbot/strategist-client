'use server';

/**
 * @fileOverview Generates a pitch deck from strategist assessment reports.
 *
 * - generatePitchDeck - A function that handles the pitch deck generation process.
 * - PitchDeckInput - The input type for the generatePitchDeck function.
 * - PitchDeckOutput - The return type for the generatePitchDeck function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PitchDeckInputSchema = z.object({
  strategistName: z.string().describe('The name of the strategist.'),
  mutationReports: z.array(
    z.object({
      mutationId: z.string().describe('The ID of the mutation.'),
      assessmentReport: z.string().describe('The strategist assessment report for the mutation.'),
    })
  ).describe('An array of mutation reports with strategist assessments.'),
});
export type PitchDeckInput = z.infer<typeof PitchDeckInputSchema>;

const PitchDeckOutputSchema = z.object({
  pitchDeckContent: z.string().describe('The generated pitch deck content in Markdown format.'),
});
export type PitchDeckOutput = z.infer<typeof PitchDeckOutputSchema>;

export async function generatePitchDeck(input: PitchDeckInput): Promise<PitchDeckOutput> {
  return pitchDeckFlow(input);
}

const prompt = ai.definePrompt({
  name: 'pitchDeckPrompt',
  input: {schema: PitchDeckInputSchema},
  output: {schema: PitchDeckOutputSchema},
  prompt: `You are an expert financial analyst creating a compelling pitch deck for investors.

  You will receive an array of mutation reports, each with a mutation ID and an assessment report from the strategist.
  Your task is to generate a concise and powerful pitch deck in Markdown format. The pitch deck should summarize the key achievements, strategies, and potential for future growth based on the provided reports.

  Include the following sections:
  1.  **Executive Summary**: A brief, powerful overview.
  2.  **Key Achievements**: Highlight top-performing mutations and ROI.
  3.  **Strategic Approach**: Describe the strategist's methodology.
  4.  **Risk Mitigation**: Explain how risks and overrides are handled.
  5.  **Future Outlook**: Project future potential.

  Strategist Name: {{{strategistName}}}
  Mutation Reports:
  {{#each mutationReports}}
  - **Mutation ID:** {{{mutationId}}}
    - **Assessment:** {{{assessmentReport}}}
  {{/each}}

  Generate the pitch deck content now.
  `,
});

const pitchDeckFlow = ai.defineFlow(
  {
    name: 'pitchDeckFlow',
    inputSchema: PitchDeckInputSchema,
    outputSchema: PitchDeckOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
