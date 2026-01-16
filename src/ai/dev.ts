import { config } from 'dotenv';
config();

import '@/ai/flows/summarize-documents.ts';
import '@/ai/flows/ai-suggested-tasks.ts';
import '@/ai/flows/initial-ai-assistant-prompt.ts';