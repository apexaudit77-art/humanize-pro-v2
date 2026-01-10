'use server';

/**
 * @fileOverview A Genkit flow for contextually rephrasing text while preserving the original meaning and intent.
 *
 * - contextuallyRephraseText - A function that handles the text rephrasing process.
 * - ContextualRephraseTextInput - The input type for the contextuallyRephraseText function.
 * - ContextualRephraseTextOutput - The return type for the contextuallyRephraseText function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ContextualRephraseTextInputSchema = z.object({
  text: z.string().describe('The text to be rephrased.'),
  tone: z.string().optional().describe('The desired tone of the rephrased text (e.g., Professional, Academic, Casual, Creative).'),
});
export type ContextualRephraseTextInput = z.infer<typeof ContextualRephraseTextInputSchema>;

const ContextualRephraseTextOutputSchema = z.object({
  rephrasedText: z.string().describe('The rephrased text.'),
});
export type ContextualRephraseTextOutput = z.infer<typeof ContextualRephraseTextOutputSchema>;

export async function contextuallyRephraseText(input: ContextualRephraseTextInput): Promise<ContextualRephraseTextOutput> {
  return contextuallyRephraseTextFlow(input);
}

const prompt = ai.definePrompt({
  name: 'contextuallyRephraseTextPrompt',
  input: {schema: ContextualRephraseTextInputSchema},
  output: {schema: ContextualRephraseTextOutputSchema},
  prompt: `You are an expert at rephrasing text while preserving its original meaning and intent.

  Rephrase the following text, considering the desired tone if provided:
  Text: {{{text}}}
  Tone: {{tone}}

  Return only the rephrased text.
  `,
});

const contextuallyRephraseTextFlow = ai.defineFlow(
  {
    name: 'contextuallyRephraseTextFlow',
    inputSchema: ContextualRephraseTextInputSchema,
    outputSchema: ContextualRephraseTextOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
