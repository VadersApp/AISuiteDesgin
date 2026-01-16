'use server';

/**
 * @fileOverview A document summarization AI agent.
 *
 * - summarizeDocuments - A function that handles the document summarization process.
 * - SummarizeDocumentsInput - The input type for the summarizeDocuments function.
 * - SummarizeDocumentsOutput - The return type for the summarizeDocuments function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeDocumentsInputSchema = z.object({
  documentText: z.string().describe('The text content of the document to summarize.'),
});
export type SummarizeDocumentsInput = z.infer<typeof SummarizeDocumentsInputSchema>;

const SummarizeDocumentsOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the document.'),
});
export type SummarizeDocumentsOutput = z.infer<typeof SummarizeDocumentsOutputSchema>;

export async function summarizeDocuments(input: SummarizeDocumentsInput): Promise<SummarizeDocumentsOutput> {
  return summarizeDocumentsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeDocumentsPrompt',
  input: {schema: SummarizeDocumentsInputSchema},
  output: {schema: SummarizeDocumentsOutputSchema},
  prompt: `You are an expert summarizer. Please provide a concise summary of the following document:\n\n{{{documentText}}}`,
});

const summarizeDocumentsFlow = ai.defineFlow(
  {
    name: 'summarizeDocumentsFlow',
    inputSchema: SummarizeDocumentsInputSchema,
    outputSchema: SummarizeDocumentsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
