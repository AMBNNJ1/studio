
import AppLayout from '@/components/layout/app-layout';
import { allModules } from '@/lib/modules-data';
import type { ModuleDefinition } from '@/types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, ChevronLeft, BookOpen } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Metadata, ResolvingMetadata } from 'next';

type Props = {
  params: { moduleSlug: string };
};

export async function generateMetadata(
  { params }: Props,
  _parent: ResolvingMetadata
): Promise<Metadata> {
  const moduleSlug = params.moduleSlug;
  const module = allModules.find((m) => m.slug === moduleSlug);

  if (!module) {
    return {
      title: 'Module Not Found | ICT Academy Lite',
    };
  }

  const pageTitle = module.title.split('–')[1]?.trim() || module.title;
  return {
    title: `${pageTitle} | ICT Academy Lite`,
    description: module.description,
  };
}

export async function generateStaticParams() {
  return allModules.map((module) => ({
    moduleSlug: module.slug,
  }));
}

export default function ModuleDetailPage({ params }: Props) {
  const module = allModules.find((m) => m.slug === params.moduleSlug);

  if (!module) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <AlertTriangle className="h-16 w-16 text-destructive mb-4" />
          <h1 className="text-3xl font-bold text-foreground mb-2">Module Not Found</h1>
          <p className="text-muted-foreground mb-6">
            Sorry, we couldn't find the module you were looking for.
          </p>
          <Button asChild>
            <Link href="/modules">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to All Modules
            </Link>
          </Button>
        </div>
      </AppLayout>
    );
  }

  const displayTitle = module.title.split('–')[1]?.trim() || module.title;
  const moduleNumberString = module.title.split('–')[0]?.trim();

  return (
    <AppLayout>
      <div className="py-8"> {/* Removed space-y-20, relying on mt-* for sections */}
        <header className="space-y-4">
          <Button variant="outline" asChild className="mb-2 text-sm">
            <Link href="/modules">
              <ChevronLeft className="mr-2 h-4 w-4" />
              All Modules
            </Link>
          </Button>
          {moduleNumberString && <p className="text-base font-medium text-primary">{moduleNumberString}</p>}
          <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {displayTitle}
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl"> {/* Removed explicit mt-3, space-y-4 on header handles it */}
            {module.description}
          </p>
          <Badge
            variant={module.level === 'Beginner' || module.level === 'Beginner→Intermediate' ? 'secondary' : 'outline'}
            className="py-1 px-3 text-sm rounded-md" 
          >
            {module.level}
          </Badge>
        </header>

        <section className="mt-12"> {/* Added mt-12 for separation */}
          <h2 className="font-headline text-3xl font-semibold tracking-tight text-foreground mb-10 border-b pb-5">
            Lessons
          </h2>
          {module.lessons.length > 0 ? (
            <div className="space-y-8">
              {module.lessons.map((lesson, index) => (
                <Card key={lesson.id} className="shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out rounded-xl overflow-hidden bg-card border border-border">
                  <CardHeader className="p-6">
                    <CardTitle className="text-xl font-semibold text-foreground">
                      Lesson {index + 1}: {lesson.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 pt-0">
                    <CardDescription className="text-base text-muted-foreground mb-5">
                      <strong className="font-medium text-foreground">Key Takeaways:</strong> {lesson.keyTakeaways}
                    </CardDescription>
                    {module.slug === 'price-action-foundations' && lesson.id === 'l1' ? (
                       <Button asChild variant="secondary" className="mt-2">
                        <Link href={`/modules/${module.slug}/${lesson.id}`}>
                          <BookOpen className="mr-2 h-4 w-4" />
                          View Lesson
                        </Link>
                      </Button>
                    ) : (
                      <Button asChild variant="secondary" className="mt-2">
                        <Link href={`/modules/${module.slug}/${lesson.id}`}>
                           <BookOpen className="mr-2 h-4 w-4" />
                           View Lesson (Content Coming Soon)
                        </Link>
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="rounded-xl shadow-sm border border-border">
              <CardContent className="p-6">
                <p className="text-muted-foreground text-center">No lessons available for this module yet.</p>
              </CardContent>
            </Card>
          )}
        </section>

      </div>
    </AppLayout>
  );
}
