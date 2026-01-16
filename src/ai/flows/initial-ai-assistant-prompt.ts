'use server';

/**
 * @fileOverview A flow that generates initial prompts for the AI Assistant Chat.
 *
 * - getInitialPrompts - A function that returns a list of suggested prompts for the AI Assistant.
 * - InitialPromptsOutput - The return type for the getInitialPrompts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const InitialPromptsOutputSchema = z.object({
  prompts: z.array(z.string()).describe('A list of suggested prompts for the AI Assistant.'),
});
export type InitialPromptsOutput = z.infer<typeof InitialPromptsOutputSchema>;

export async function getInitialPrompts(): Promise<InitialPromptsOutput> {
  return initialPromptsFlow();
}

const initialPromptsPrompt = ai.definePrompt({
  name: 'initialPromptsPrompt',
  output: {schema: InitialPromptsOutputSchema},
  prompt: `You are an AI assistant that is designed to help users understand your capabilities.

  Generate a list of diverse and helpful prompts that will showcase the different things you can do.

  The prompts should be clear, concise, and easy to understand.

  Return the prompts as a JSON array of strings.

  For example:
  {
    "prompts": [
      "Summarize the main points of the article.",
      "Translate this sentence into French.",
      "Write a short story about a cat.",
      "Suggest a healthy recipe for dinner.",
      "What are the latest advancements in AI?"
    ]
  }
  `,
});

const initialPromptsFlow = ai.defineFlow({
  name: 'initialPromptsFlow',
  outputSchema: InitialPromptsOutputSchema,
}, async () => {
  const {output} = await initialPromptsPrompt({});
  return output!;
});
