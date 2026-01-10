'use server';

/**
 * @fileOverview A Genkit flow for generating SEO-optimized articles.
 *
 * - generateSeoArticle - A function that handles the article generation process.
 * - GenerateSeoArticleInput - The input type for the generateSeoArticle function.
 * - GenerateSeoArticleOutput - The return type for the generateSeoArticle function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSeoArticleInputSchema = z.object({
  topic: z.string().describe('The topic of the article.'),
  category: z.string().describe('The category of the article (e.g., Sports, Tech).'),
  writingStyle: z.string().describe('The desired writing style (e.g., Fun/Casual, Professional/Academic).'),
  useCase: z.string().describe('The intended use case (e.g., SEO-Optimized Article, Social Media Post).'),
  language: z.string().describe('The target language for the article (e.g., English, Spanish).'),
});
export type GenerateSeoArticleInput = z.infer<typeof GenerateSeoArticleInputSchema>;

const GenerateSeoArticleOutputSchema = z.object({
  article: z.string().describe('The generated article content, formatted with HTML tags (H1, H2, H3, p).'),
});
export type GenerateSeoArticleOutput = z.infer<typeof GenerateSeoArticleOutputSchema>;

export async function generateSeoArticle(input: GenerateSeoArticleInput): Promise<GenerateSeoArticleOutput> {
  return generateSeoArticleFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSeoArticlePrompt',
  input: {schema: GenerateSeoArticleInputSchema},
  output: {schema: GenerateSeoArticleOutputSchema},
  prompt: `You are an expert SEO content writer. Generate a high-quality article based on the following specifications.

Topic: {{{topic}}}
Category: {{{category}}}
Writing Style: {{{writingStyle}}}
Use Case: {{{useCase}}}
Language: {{{language}}}

The article should be well-structured, engaging, and optimized for search engines.
IMPORTANT: The output must be a single string containing valid HTML, including <h1> for the main title, <h2> for subheadings, <h3> for further sub-points, and <p> for paragraphs. Do not wrap the output in a markdown block.

Example structure:
<h1>Main Title</h1><p>Introduction paragraph.</p><h2>Subtitle 1</h2><p>Content for subtitle 1.</p><h3>Deeper Point</h3><p>More details here.</p>
`,
});

const generateSeoArticleFlow = ai.defineFlow(
  {
    name: 'generateSeoArticleFlow',
    inputSchema: GenerateSeoArticleInputSchema,
    outputSchema: GenerateSeoArticleOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
