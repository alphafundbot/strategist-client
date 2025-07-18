import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

export const ai = genkit({
  plugins: [
    googleAI({
      vertex: {
        project: 'kasik-alpha-trade',
        location: 'us-central1',
      },
    }),
  ],
  model: 'googleai/gemini-2.0-flash',
});
