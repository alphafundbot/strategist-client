
'use server';
/**
 * @fileOverview A flow for generating a simulated ROI forecast based on a natural language prompt.
 *
 * - simulateRoi - A function that handles the ROI simulation process.
 * - SimulateRoiInput - The input type for the simulateRoi function.
 * - SimulateRoiOutput - The return type for the simulateRoi function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const MonthDataSchema = z.object({
    month: z.string().describe("The month for the data point (e.g., 'Jan', 'Feb')."),
    projectedRoi: z.number().describe('The projected ROI for this month, as a percentage.'),
    optimisticRoi: z.number().describe('The optimistic (best-case) ROI for this month.'),
    pessimisticRoi: z.number().describe('The pessimistic (worst-case) ROI for this month.'),
});

export const SimulateRoiInputSchema = z.object({
  prompt: z.string().describe('A natural language description of the desired simulation scenario. e.g., "A bullish 6-month forecast with a Q2 dip"'),
});
export type SimulateRoiInput = z.infer<typeof SimulateRoiInputSchema>;

export const SimulateRoiOutputSchema = z.object({
  simulationName: z.string().describe("A short, descriptive name for the simulation scenario, derived from the user's prompt."),
  data: z.array(MonthDataSchema).length(6).describe('An array of 6 data points, one for each month of the simulation.'),
});
export type SimulateRoiOutput = z.infer<typeof SimulateRoiOutputSchema>;


export async function simulateRoi(input: SimulateRoiInput): Promise<SimulateRoiOutput> {
  return simulateRoiFlow(input);
}

const prompt = ai.definePrompt({
  name: 'simulateRoiPrompt',
  input: { schema: SimulateRoiInputSchema },
  output: { schema: SimulateRoiOutputSchema },
  prompt: `You are a financial data simulation expert. Your task is to interpret a user's natural language prompt and generate a 6-month ROI (Return on Investment) simulation dataset based on it.

The user's prompt is: "{{prompt}}"

Generate a plausible 6-month dataset that reflects the user's scenario. You must create three data series: 'projectedRoi', 'optimisticRoi', and 'pessimisticRoi'. The optimistic value should always be higher than the projected, and the pessimistic value should always be lower.

Also, create a short, descriptive name for the simulation that summarizes the user's prompt.

For example, if the prompt is "A steady growth forecast", the data should show a consistent upward trend. If it's "High volatility with a summer spike", the data should show significant fluctuations with a peak in months like June or July.

Generate exactly 6 data points for the simulation.
`,
});

const simulateRoiFlow = ai.defineFlow(
  {
    name: 'simulateRoiFlow',
    inputSchema: SimulateRoiInputSchema,
    outputSchema: SimulateRoiOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
