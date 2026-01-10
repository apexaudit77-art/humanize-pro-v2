'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating SEO-optimized meta tags (title and description) for given content.
 *
 * - generateMetaTags - A function that generates meta tags based on the input content.
 * - GenerateMetaTagsInput - The input type for the generateMetaTags function, including the content for which meta tags are generated.
 * - GenerateMetaTagsOutput - The output type for the generateMetaTags function, containing the generated meta title and description.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateMetaTagsInputSchema = z.object({
  content: z
    .string()
    .describe(
      'The content for which to generate meta tags (title and description).'
    ),
});
export type GenerateMetaTagsInput = z.infer<typeof GenerateMetaTagsInputSchema>;

const GenerateMetaTagsOutputSchema = z.object({
  metaTitle: z.string().describe('The generated meta title for the content.'),
  metaDescription: z
    .string()
    .describe('The generated meta description for the content.'),
});
export type GenerateMetaTagsOutput = z.infer<typeof GenerateMetaTagsOutputSchema>;

export async function generateMetaTags(
  input: GenerateMetaTagsInput
): Promise<GenerateMetaTagsOutput> {
  return generateMetaTagsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateMetaTagsPrompt',
  input: {schema: GenerateMetaTagsInputSchema},
  output: {schema: GenerateMetaTagsOutputSchema},
  prompt: `You are an SEO expert. Generate an SEO-optimized meta title and meta description for the following content.

Content: {{{content}}}

Ensure the meta title is concise and engaging, and the meta description accurately summarizes the content while encouraging clicks from search engine results pages.

Follow these guidelines:

*   Meta Title: Under 60 characters.
*   Meta Description: Under 160 characters.

Return the results in JSON format.
`,
});

const generateMetaTagsFlow = ai.defineFlow(
  {
    name: 'generateMetaTagsFlow',
    inputSchema: GenerateMetaTagsInputSchema,
    outputSchema: GenerateMetaTagsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
