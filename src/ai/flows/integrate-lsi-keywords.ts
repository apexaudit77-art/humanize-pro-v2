'use server';

/**
 * @fileOverview A flow that integrates LSI keywords into the rephrased content.
 *
 * - integrateLsiKeywords - A function that integrates LSI keywords into the rephrased content.
 * - IntegrateLsiKeywordsInput - The input type for the integrateLsiKeywords function.
 * - IntegrateLsiKeywordsOutput - The return type for the integrateLsiKeywords function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IntegrateLsiKeywordsInputSchema = z.object({
  content: z
    .string()
    .describe('The rephrased content to integrate LSI keywords into.'),
  keywords: z.string().describe('The list of LSI keywords to integrate.'),
});
export type IntegrateLsiKeywordsInput = z.infer<typeof IntegrateLsiKeywordsInputSchema>;

const IntegrateLsiKeywordsOutputSchema = z.object({
  contentWithLsiKeywords: z
    .string()
    .describe('The content with LSI keywords integrated.'),
});
export type IntegrateLsiKeywordsOutput = z.infer<typeof IntegrateLsiKeywordsOutputSchema>;

export async function integrateLsiKeywords(input: IntegrateLsiKeywordsInput): Promise<IntegrateLsiKeywordsOutput> {
  return integrateLsiKeywordsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'integrateLsiKeywordsPrompt',
  input: {schema: IntegrateLsiKeywordsInputSchema},
  output: {schema: IntegrateLsiKeywordsOutputSchema},
  prompt: `You are an SEO expert. Integrate the following LSI keywords into the content without keyword stuffing. Maintain the original meaning of the content.

Content: {{{content}}}

LSI Keywords: {{{keywords}}}

Output the content with LSI keywords integrated seamlessly. Focus on improving readability and natural flow while incorporating the keywords effectively for SEO.
`,
});

const integrateLsiKeywordsFlow = ai.defineFlow(
  {
    name: 'integrateLsiKeywordsFlow',
    inputSchema: IntegrateLsiKeywordsInputSchema,
    outputSchema: IntegrateLsiKeywordsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
