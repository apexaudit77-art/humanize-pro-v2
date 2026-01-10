'use server';

/**
 * @fileOverview Removes AI-generated patterns from text to bypass AI detection tools.
 *
 * - removeAiPatterns - A function that removes AI patterns from text.
 * - RemoveAiPatternsInput - The input type for the removeAiPatterns function.
 * - RemoveAiPatternsOutput - The return type for the removeAiPattens function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RemoveAiPatternsInputSchema = z.object({
  text: z.string().describe('The text to remove AI patterns from.'),
  tone: z
    .string()
    .optional()
    .describe(
      'The tone of the text (Professional, Academic, Casual, Creative).'
    ),
});
export type RemoveAiPatternsInput = z.infer<typeof RemoveAiPatternsInputSchema>;

const RemoveAiPatternsOutputSchema = z.object({
  humanizedText: z.string().describe('The text with AI patterns removed.'),
});
export type RemoveAiPatternsOutput = z.infer<
  typeof RemoveAiPatternsOutputSchema
>;

export async function removeAiPatterns(
  input: RemoveAiPatternsInput
): Promise<RemoveAiPatternsOutput> {
  return removeAiPatternsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'removeAiPatternsPrompt',
  input: {schema: RemoveAiPatternsInputSchema},
  output: {schema: RemoveAiPatternsOutputSchema},
  prompt: `You are an expert in rewriting text to avoid AI detection. Your task is to revise the given text, making it sound as if it were written by a human. To do this, you must apply the following techniques:

1.  **Vary Sentence Structure:** Avoid repetitive sentence structures. Mix short, punchy sentences with longer, more complex ones.
2.  **Introduce "Perplexity" and "Burstiness":** Human writing naturally varies in complexity (perplexity) and rhythm (burstiness). Introduce this by varying sentence length and complexity.
3.  **Use Less Predictable Vocabulary:** Replace common AI-generated words and phrases with more nuanced or contextually appropriate synonyms.
4.  **Emulate Human Flow:** Ensure the text flows naturally and cohesively. Break up overly formal or robotic phrasing.

Apply the desired tone: {{{tone}}}

Original Text: {{{text}}}

Rewrite the text following these principles to make it undetectable by AI content scanners.`,
});

const removeAiPatternsFlow = ai.defineFlow(
  {
    name: 'removeAiPatternsFlow',
    inputSchema: RemoveAiPatternsInputSchema,
    outputSchema: RemoveAiPatternsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
