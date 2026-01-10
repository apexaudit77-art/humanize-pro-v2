import { config } from 'dotenv';
config();

import '@/ai/flows/integrate-lsi-keywords.ts';
import '@/ai/flows/contextually-rephrase-text.ts';
import '@/ai/flows/remove-ai-patterns.ts';
import '@/ai/flows/generate-meta-tags.ts';
import '@/ai/flows/generate-semantic-header-tags.ts';
import '@/ai/flows/generate-seo-article.ts';
import '@/ai/flows/detect-ai-content.ts';
