
'use server';

import { contextuallyRephraseText } from '@/ai/flows/contextually-rephrase-text';
import { detectAiContent } from '@/ai/flows/detect-ai-content';
import { generateMetaTags } from '@/ai/flows/generate-meta-tags';
import { generateSeoArticle, type GenerateSeoArticleInput } from '@/ai/flows/generate-seo-article';
import { generateSemanticHeaderTags } from '@/ai/flows/generate-semantic-header-tags';
import { integrateLsiKeywords } from '@/ai/flows/integrate-lsi-keywords';
import { removeAiPatterns } from '@/ai/flows/remove-ai-patterns';
import { firestore } from '@/lib/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

interface ActionResult {
  success: boolean;
  data?: any;
  error?: string;
}

const getErrorMessage = (e: unknown): string => {
  return e instanceof Error ? e.message : 'An unexpected error occurred.';
}

export async function humanizeText(text: string, tone: string): Promise<ActionResult> {
  if (!text || text.length < 10) {
    return { success: false, error: 'Please enter at least 10 characters.' };
  }
  try {
    const rephrased = await contextuallyRephraseText({ text, tone });
    if (!rephrased?.rephrasedText) throw new Error("Rephrasing failed to produce text.");

    const humanized = await removeAiPatterns({ text: rephrased.rephrasedText, tone });
    if (!humanized?.humanizedText) throw new Error("Humanizing failed to produce text.");

    return { success: true, data: humanized.humanizedText };
  } catch (e) {
    console.error("humanizeText Error:", e);
    return { success: false, error: getErrorMessage(e) };
  }
}

export async function generateHeaders(text: string): Promise<ActionResult> {
  if (!text || text.length < 10) {
    return { success: false, error: 'Please enter at least 10 characters.' };
  }
  try {
    const result = await generateSemanticHeaderTags({ rephrasedOutput: text });
    if (!result?.outputWithHeaderTags) throw new Error("Header generation failed to produce text.");

    return { success: true, data: result.outputWithHeaderTags };
  } catch (e) {
    console.error("generateHeaders Error:", e);
    return { success: false, error: getErrorMessage(e) };
  }
}

export async function integrateKeywords(text: string, keywords: string): Promise<ActionResult> {
  if (!text || text.length < 10) {
    return { success: false, error: 'Please enter at least 10 characters of content.' };
  }
  if (!keywords || keywords.length < 3) {
    return { success: false, error: 'Please enter at least one keyword.' };
  }
  try {
    const result = await integrateLsiKeywords({ content: text, keywords });
    if (!result?.contentWithLsiKeywords) throw new Error("Keyword integration failed to produce text.");
    
    return { success: true, data: result.contentWithLsiKeywords };
  } catch (e) {
    console.error("integrateKeywords Error:", e);
    return { success: false, error: getErrorMessage(e) };
  }
}

export async function generateMeta(text: string): Promise<ActionResult> {
  if (!text || text.length < 10) {
    return { success: false, error: 'Please enter at least 10 characters.' };
  }
  try {
    const result = await generateMetaTags({ content: text });
     if (!result?.metaTitle || !result?.metaDescription) throw new Error("Meta tag generation failed.");

    return { success: true, data: result };
  } catch (e) {
    console.error("generateMeta Error:", e);
    return { success: false, error: getErrorMessage(e) };
  }
}

export async function generateArticle(input: GenerateSeoArticleInput): Promise<ActionResult> {
  if (!input.topic) {
    return { success: false, error: 'Please provide a topic for the article.' };
  }
  try {
    const result = await generateSeoArticle(input);
    if (!result?.article) throw new Error("Article generation failed to produce text.");

    return { success: true, data: result.article };
  } catch (e) {
    console.error("generateArticle Error:", e);
    return { success: false, error: getErrorMessage(e) };
  }
}

export async function detectText(text: string): Promise<ActionResult> {
  if (!text || text.trim().split(/\s+/).length < 100) {
    return { success: false, error: 'Please enter at least 100 words for an accurate detection.' };
  }
  try {
    const result = await detectAiContent({ text });
    if (result?.humanScore === undefined) throw new Error("AI detection failed to produce a score.");

    return { success: true, data: result };
  } catch (e) {
    console.error("detectText Error:", e);
    return { success: false, error: getErrorMessage(e) };
  }
}

export async function subscribeToNewsletter(email: string): Promise<ActionResult> {
  if (!email) {
    return { success: false, error: 'Email is required.' };
  }
  
  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, error: 'Please enter a valid email address.' };
  }
  
  try {
    if (!firestore) {
      throw new Error('Firestore is not initialized.');
    }

    const subscribersCollection = collection(firestore, 'newsletter_subscribers');
    await addDoc(subscribersCollection, {
      email: email,
      subscribedAt: serverTimestamp(),
    });

    return { success: true };
  } catch (e) {
    console.error("subscribeToNewsletter Error:", e);
    return { success: false, error: getErrorMessage(e) };
  }
}
