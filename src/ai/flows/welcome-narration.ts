'use server';

/**
 * @fileOverview Generates a dynamic, strategist-grade welcome narration for the cockpit login screen.
 *
 * - generateWelcomeNarration - A function that handles the welcome narration generation process.
 * - WelcomeNarrationOutput - The return type for the generateWelcomeNarration function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const WelcomeNarrationOutputSchema = z.object({
  narration: z.string().describe('A concise, engaging welcome message for a strategist entering the cockpit.'),
});
export type WelcomeNarrationOutput = z.infer<typeof WelcomeNarrationOutputSchema>;

export async function generateWelcomeNarration(): Promise<WelcomeNarrationOutput> {
  return welcomeNarrationFlow();
}

const prompt = ai.definePrompt({
  name: 'welcomeNarrationPrompt',
  output: {schema: WelcomeNarrationOutputSchema},
  prompt: `You are an AI assistant for an advanced trading platform called Strategist Systems™ Cockpit.

  Generate a short, powerful, and engaging welcome narration for a strategist logging in. The tone should be professional, slightly futuristic, and inspiring. Mention key concepts like "cognition-grade operator," "mutation epochs," "vault amplification," and "signal integrity."

  Keep it to 2-3 sentences.
  `,
});

const welcomeNarrationFlow = ai.defineFlow(
  {
    name: 'welcomeNarrationFlow',
    outputSchema: WelcomeNarrationOutputSchema,
  },
  async () => {
    const {output} = await prompt();
    return output!;
  }
);
