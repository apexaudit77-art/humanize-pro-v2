'use server';

/**
 * @fileOverview A flow that detects the likelihood of text being AI-generated.
 *
 * - detectAiContent - A function that analyzes text and returns a probability score.
 * - DetectAiContentInput - The input type for the detectAiContent function.
 * - DetectAiContentOutput - The return type for the detectAiContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DetectAiContentInputSchema = z.object({
  text: z.string().describe('The text to be analyzed.'),
});
export type DetectAiContentInput = z.infer<typeof DetectAiContentInputSchema>;

const DetectAiContentOutputSchema = z.object({
  humanScore: z
    .number()
    .describe(
      'The probability score (0-100) that the text was written by a human.'
    ),
});
export type DetectAiContentOutput = z.infer<typeof DetectAiContentOutputSchema>;

export async function detectAiContent(
  input: DetectAiContentInput
): Promise<DetectAiContentOutput> {
  return detectAiContentFlow(input);
}

// This is a mock implementation. In a real scenario, you would use a proper model or API.
const detectAiContentFlow = ai.defineFlow(
  {
    name: 'detectAiContentFlow',
    inputSchema: DetectAiContentInputSchema,
    outputSchema: DetectAiContentOutputSchema,
  },
  async ({text}) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));
    
    // Mock logic: longer text and varied sentence length might seem more human.
    const wordCount = text.trim().split(/\s+/).length;
    const sentenceCount = text.split(/[.!?]/).filter(Boolean).length;
    const avgSentenceLength = wordCount / (sentenceCount || 1);

    let score = 50; // Start with a neutral score

    if (wordCount < 50) {
      score -= 20;
    } else if (wordCount > 150) {
      score += 10;
    }

    if (avgSentenceLength > 15 && avgSentenceLength < 25) {
        score += 15;
    } else if (avgSentenceLength < 10 || avgSentenceLength > 30) {
        score -= 15;
    }

    // Add some randomness
    score += (Math.random() - 0.5) * 20;

    // Clamp score between 5 and 95
    const finalScore = Math.max(5, Math.min(95, score));

    return {
      humanScore: Math.round(finalScore),
    };
  }
);
