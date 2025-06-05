import AppLayout from '@/components/layout/app-layout';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <AppLayout>
      <section className="py-16 text-center md:py-24 lg:py-32 bg-accent/30 rounded-lg shadow-sm">
        <div className="container mx-auto max-w-3xl px-4">
          <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Master ICT Trading Concepts
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground sm:text-xl">
            Unlock the secrets of Inner Circle Trader methodology with concise lessons, engaging videos, and interactive quizzes. Start your journey to trading proficiency today.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="/modules">Start Learning</Link>
            </Button>
            <Button asChild variant="ghost" size="lg">
              <Link href="/glossary">Explore Glossary</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Our Modules
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Dive into curated learning paths designed to build your ICT knowledge step-by-step.
          </p>
        </div>
        {/* Placeholder for Module Grid */}
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="rounded-lg border bg-card p-6 shadow-sm" data-ai-hint="trading course">
              <div className="mb-4 h-40 w-full rounded bg-muted data-[ai-hint='abstract lines']">
                {/* Replace with next/image later */}
                <img src={`https://placehold.co/600x400.png? সিরিয়াল=${index + 1}`} alt={`Module ${index + 1} Placeholder`} className="h-full w-full object-cover rounded"/>
              </div>
              <h3 className="font-headline text-xl font-semibold text-foreground">Module {index + 1} Title</h3>
              <p className="mt-2 text-sm text-muted-foreground">A brief description of what this module covers. Get ready to learn key concepts.</p>
              <Button variant="outline" className="mt-4 w-full">View Module</Button>
            </div>
          ))}
        </div>
      </section>
    </AppLayout>
  );
}
