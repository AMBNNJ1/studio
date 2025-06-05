// Enhance glossary search with AI fuzzy search functionality.

'use server';

/**
 * @fileOverview AI-powered glossary search enhancement.
 *
 * - enhanceGlossarySearch - A function that performs a fuzzy search for ICT terms.
 * - EnhanceGlossarySearchInput - The input type for the enhanceGlossarySearch function.
 * - EnhanceGlossarySearchOutput - The return type for the enhanceGlossarySearch function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EnhanceGlossarySearchInputSchema = z.object({
  searchTerm: z.string().describe('The search term entered by the user.'),
  glossaryTerms: z.array(z.string()).describe('An array of ICT glossary terms.'),
});
export type EnhanceGlossarySearchInput = z.infer<typeof EnhanceGlossarySearchInputSchema>;

const EnhanceGlossarySearchOutputSchema = z.object({
  enhancedResults: z.array(
    z.object({
      term: z.string().describe('The glossary term.'),
      similarityScore: z.number().describe('The similarity score between the search term and the glossary term.'),
    })
  ).describe('An array of enhanced search results with similarity scores.'),
});
export type EnhanceGlossarySearchOutput = z.infer<typeof EnhanceGlossarySearchOutputSchema>;

export async function enhanceGlossarySearch(input: EnhanceGlossarySearchInput): Promise<EnhanceGlossarySearchOutput> {
  return enhanceGlossarySearchFlow(input);
}

const prompt = ai.definePrompt({
  name: 'enhanceGlossarySearchPrompt',
  input: {schema: EnhanceGlossarySearchInputSchema},
  output: {schema: EnhanceGlossarySearchOutputSchema},
  prompt: `You are an AI expert in information retrieval and natural language processing.

You are provided with a search term and a list of ICT glossary terms.
Your task is to enhance the search by performing a fuzzy search, calculating a similarity score between the search term and each glossary term.

Return the results as an array of objects, each containing the glossary term and its similarity score. The similarity score should be a number between 0 and 1, where 1 indicates a perfect match.

Search Term: {{{searchTerm}}}
Glossary Terms: {{#each glossaryTerms}}{{{this}}}, {{/each}}

Consider synonyms, abbreviations, and related concepts when calculating the similarity score. Prioritize terms that are closely related to the search term in the context of ICT trading methodology.

Output the enhanced search results in the following JSON format:
{
  "enhancedResults": [
    {
      "term": "Glossary Term 1",
      "similarityScore": 0.85
    },
    {
      "term": "Glossary Term 2",
      "similarityScore": 0.70
    }
  ]
}`,
});

const enhanceGlossarySearchFlow = ai.defineFlow(
  {
    name: 'enhanceGlossarySearchFlow',
    inputSchema: EnhanceGlossarySearchInputSchema,
    outputSchema: EnhanceGlossarySearchOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
