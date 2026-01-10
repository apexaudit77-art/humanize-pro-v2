'use server';

/**
 * @fileOverview A flow that generates semantic header tags (H1, H2, H3) within the rephrased output to improve content structure and SEO.
 *
 * - generateSemanticHeaderTags - A function that handles the generation of semantic header tags.
 * - GenerateSemanticHeaderTagsInput - The input type for the generateSemanticHeaderTags function.
 * - GenerateSemanticHeaderTagsOutput - The return type for the generateSemanticHeaderTags function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSemanticHeaderTagsInputSchema = z.object({
  rephrasedOutput: z
    .string()
    .describe('The rephrased output to add semantic header tags to.'),
});
export type GenerateSemanticHeaderTagsInput = z.infer<typeof GenerateSemanticHeaderTagsInputSchema>;

const GenerateSemanticHeaderTagsOutputSchema = z.object({
  outputWithHeaderTags: z
    .string()
    .describe('The rephrased output with semantic header tags (H1, H2, H3).'),
});
export type GenerateSemanticHeaderTagsOutput = z.infer<typeof GenerateSemanticHeaderTagsOutputSchema>;

export async function generateSemanticHeaderTags(
  input: GenerateSemanticHeaderTagsInput
): Promise<GenerateSemanticHeaderTagsOutput> {
  return generateSemanticHeaderTagsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSemanticHeaderTagsPrompt',
  input: {schema: GenerateSemanticHeaderTagsInputSchema},
  output: {schema: GenerateSemanticHeaderTagsOutputSchema},
  prompt: `You are an expert content editor specializing in improving content structure and SEO.

You will receive a rephrased output and your task is to add semantic header tags (H1, H2, H3) to it.
Ensure that the header tags are relevant to the content and improve the overall structure of the text.

Rephrased Output: {{{rephrasedOutput}}}

Output with Header Tags:`,
});

const generateSemanticHeaderTagsFlow = ai.defineFlow(
  {
    name: 'generateSemanticHeaderTagsFlow',
    inputSchema: GenerateSemanticHeaderTagsInputSchema,
    outputSchema: GenerateSemanticHeaderTagsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
