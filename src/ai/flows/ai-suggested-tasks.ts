'use server';
/**
 * @fileOverview An AI agent that suggests tasks to users based on their role and current projects.
 *
 * - suggestTasks - A function that handles the task suggestion process.
 * - AISuggestedTasksInput - The input type for the suggestTasks function.
 * - AISuggestedTasksOutput - The return type for the suggestTasks function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AISuggestedTasksInputSchema = z.object({
  userRole: z.string().describe('The role of the user.'),
  currentProjects: z.string().describe('The current projects the user is working on.'),
});
export type AISuggestedTasksInput = z.infer<typeof AISuggestedTasksInputSchema>;

const AISuggestedTasksOutputSchema = z.object({
  suggestedTasks: z.array(z.string()).describe('A list of tasks suggested to the user.'),
});
export type AISuggestedTasksOutput = z.infer<typeof AISuggestedTasksOutputSchema>;

export async function suggestTasks(input: AISuggestedTasksInput): Promise<AISuggestedTasksOutput> {
  return suggestTasksFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestTasksPrompt',
  input: {schema: AISuggestedTasksInputSchema},
  output: {schema: AISuggestedTasksOutputSchema},
  prompt: `You are an AI task suggestion assistant. You will suggest tasks to the user based on their role and current projects.

  User Role: {{{userRole}}}
  Current Projects: {{{currentProjects}}}

  Suggest tasks that are relevant to the user's role and current projects. The tasks should be specific and actionable.
  Return the tasks as a list of strings.
  `,
});

const suggestTasksFlow = ai.defineFlow(
  {
    name: 'suggestTasksFlow',
    inputSchema: AISuggestedTasksInputSchema,
    outputSchema: AISuggestedTasksOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
