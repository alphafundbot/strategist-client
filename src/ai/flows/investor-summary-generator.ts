'use server';

/**
 * @fileOverview Generates a narrated summary of the strategist's assessment reports for each mutation for investors.
 *
 * - generateInvestorSummary - A function that handles the investor summary generation process.
 * - InvestorSummaryInput - The input type for the generateInvestorSummary function.
 * - InvestorSummaryOutput - The return type for the generateInvestorSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const InvestorSummaryInputSchema = z.object({
  strategistName: z.string().describe('The name of the strategist.'),
  mutationReports: z.array(
    z.object({
      mutationId: z.string().describe('The ID of the mutation.'),
      assessmentReport: z.string().describe('The strategist assessment report for the mutation.'),
    })
  ).describe('An array of mutation reports with strategist assessments.'),
});
export type InvestorSummaryInput = z.infer<typeof InvestorSummaryInputSchema>;

const InvestorSummaryOutputSchema = z.object({
  narratedSummary: z.string().describe('A narrated summary of the strategist assessment reports for each mutation.'),
});
export type InvestorSummaryOutput = z.infer<typeof InvestorSummaryOutputSchema>;

export async function generateInvestorSummary(input: InvestorSummaryInput): Promise<InvestorSummaryOutput> {
  return investorSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'investorSummaryPrompt',
  input: {schema: InvestorSummaryInputSchema},
  output: {schema: InvestorSummaryOutputSchema},
  prompt: `You are an expert financial analyst summarizing strategist reports for investors.

  You will receive an array of mutation reports, each with a mutation ID and an assessment report from the strategist.
  Your task is to generate a single, concise narrated summary that captures the essence of the strategist's assessments across all mutations.
  The summary should be tailored for investors, highlighting key insights and potential risks and rewards.

  Strategist Name: {{{strategistName}}}
  Mutation Reports:
  {{#each mutationReports}}
  Mutation ID: {{{mutationId}}}
  Assessment Report: {{{assessmentReport}}}
  {{/each}}

  Narrated Summary:`,
});

const investorSummaryFlow = ai.defineFlow(
  {
    name: 'investorSummaryFlow',
    inputSchema: InvestorSummaryInputSchema,
    outputSchema: InvestorSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
