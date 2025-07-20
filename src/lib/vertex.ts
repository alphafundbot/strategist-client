import { AIPromptServiceClient } from '@google-cloud/aiplatform';

const client = new AIPromptServiceClient();

export async function runEpoch(promptId: string, input: string) {
  const project = process.env.VERTEX_AI_PROJECT!;
  const location = process.env.VERTEX_AI_LOCATION!;
  const name = `projects/${project}/locations/${location}/prompts/${promptId}`;
  const [response] = await client.runPrompt({
    name,
    prompt: { text: input },
  });
  return response.candidates?.[0]?.content || '';
}

// Epoch-25 Shortcut
export async function runEpoch25(input: string) {
  return runEpoch(process.env.VERTEX_AI_PROMPT_ID!, input);
}

// Epoch-26 Shortcut
export async function runEpoch26(input: string) {
  return runEpoch(process.env.VERTEX_AI_PROMPT_ID_26!, input);
}
