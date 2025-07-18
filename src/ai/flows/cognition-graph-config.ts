'use server';
/**
 * @fileOverview A cognition graph configuration AI agent.
 *
 * - configureCognitionGraph - A function that configures the cognition graph based on natural language prompts.
 * - CognitionGraphInput - The input type for the configureCognitionGraph function.
 * - CognitionGraphOutput - The return type for the configureCognitionGraph function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CognitionGraphInputSchema = z.object({
  prompt: z.string().describe('A natural language prompt describing the desired cognition graph configuration.'),
});
export type CognitionGraphInput = z.infer<typeof CognitionGraphInputSchema>;

const CognitionGraphOutputSchema = z.object({
  graphConfiguration: z.string().describe('A JSON string representing the configuration of the cognition graph.'),
});
export type CognitionGraphOutput = z.infer<typeof CognitionGraphOutputSchema>;

export async function configureCognitionGraph(input: CognitionGraphInput): Promise<CognitionGraphOutput> {
  return configureCognitionGraphFlow(input);
}

const prompt = ai.definePrompt({
  name: 'configureCognitionGraphPrompt',
  input: {schema: CognitionGraphInputSchema},
  output: {schema: CognitionGraphOutputSchema},
  prompt: `You are an expert in configuring cognition graphs. You will take a natural language prompt and translate it into a JSON configuration for the graph.

  The JSON configuration should include nodes, edges, and any specific styling or layout instructions.

  Ensure that the JSON is valid and well-formatted.

  Here is the prompt to use to configure the graph:

  {{prompt}}`,
});

const configureCognitionGraphFlow = ai.defineFlow(
  {
    name: 'configureCognitionGraphFlow',
    inputSchema: CognitionGraphInputSchema,
    outputSchema: CognitionGraphOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
