"use client";

import { useState, type FormEvent } from 'react';
import { enhanceGlossarySearch, type EnhanceGlossarySearchInput, type EnhanceGlossarySearchOutput } from '@/ai/flows/enhance-glossary-search';
import { glossaryData } from '@/lib/glossary-data';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Search, AlertTriangle } from 'lucide-react';

const dummyGlossaryTerms = [
  'Fibonacci Retracement', 
  'Support and Resistance', 
  'Order Block', 
  'Fair Value Gap', 
  'Liquidity Grab', 
  'Market Structure Shift', 
  'Premium and Discount', 
  'Time and Price Theory', 
  'ICT Killzones', 
  'Silver Bullet',
  'Breaker Block',
  'Mitigation Block',
  'Liquidity Void',
  'Consolidation',
  'Expansion',
  'Retracement',
  'Reversal'
];

const glossaryMap = new Map(glossaryData.map((item) => [item.term, item.definition]));

export default function GlossarySearch() {
  const [searchTerm, setSearchTerm] = useState('');
  interface ResultWithDefinition {
    term: string;
    similarityScore: number;
    definition: string;
  }

  const [results, setResults] = useState<ResultWithDefinition[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!searchTerm.trim()) {
      setResults(null);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);
    setResults(null);

    try {
      const input: EnhanceGlossarySearchInput = {
        searchTerm,
        glossaryTerms: dummyGlossaryTerms,
      };
      const output = await enhanceGlossarySearch(input);
      // Sort results by similarity score in descending order
      const sortedResults = output.enhancedResults
        .sort((a, b) => b.similarityScore - a.similarityScore)
        .map((r) => ({
          ...r,
          definition: glossaryMap.get(r.term) ?? 'Definition not found.',
        }));
      setResults(sortedResults);
    } catch (e) {
      console.error("Error enhancing glossary search:", e);
      setError('Failed to fetch search results. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Glossary Search</CardTitle>
          <CardDescription>
            Find definitions for ICT terms using our AI-enhanced fuzzy search.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-grow">
              <Input
                type="search"
                placeholder="E.g., 'Order Block', 'FVG'"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10 h-11 text-base"
                aria-label="Search glossary terms"
              />
              <Search className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            </div>
            <Button type="submit" disabled={isLoading} className="h-11">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Searching...
                </>
              ) : (
                'Search'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {results && results.length === 0 && !isLoading && (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">No results found for "{searchTerm}". Try a different term.</p>
          </CardContent>
        </Card>
      )}

      {results && results.length > 0 && (
        <div className="space-y-6">
          <h2 className="font-headline text-xl font-semibold text-foreground">
            Search Results for "{searchTerm}"
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {results.map((result, index) => (
              <Card key={index} className="flex flex-col shadow-sm hover:shadow-md transition-shadow duration-200">
                <CardHeader>
                  <CardTitle className="text-lg">{result.term}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-muted-foreground">
                    Similarity Score: <span className="font-medium text-primary">{(result.similarityScore * 100).toFixed(0)}%</span>
                  </p>
                  <p className="mt-2 text-sm">{result.definition}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
       {!results && !isLoading && !error && searchTerm && (
         <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">Enter a search term and click "Search" to see results.</p>
            </CardContent>
          </Card>
       )}
    </div>
  );
}
