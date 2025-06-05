
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
      <div className="space-y-12 py-8">
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
          <p className="mt-3 text-lg text-muted-foreground max-w-3xl">
            {module.description}
          </p>
          <Badge
            variant={module.level === 'Beginner' || module.level === 'Beginner→Intermediate' ? 'secondary' : 'outline'}
            className="mt-2 py-1 px-3 text-sm rounded-md"
          >
            {module.level}
          </Badge>
        </header>

        <section>
          <h2 className="font-headline text-3xl font-semibold tracking-tight text-foreground mb-8 border-b pb-4">
            Lessons
          </h2>
          {module.lessons.length > 0 ? (
            <div className="space-y-6">
              {module.lessons.map((lesson, index) => (
                <Card key={lesson.id} className="shadow-sm hover:shadow-lg transition-shadow duration-300 ease-in-out rounded-lg overflow-hidden bg-card">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-foreground">
                      Lesson {index + 1}: {lesson.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <CardDescription className="text-base text-muted-foreground mb-4">
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
            <Card className="rounded-lg shadow-sm">
              <CardContent className="pt-6">
                <p className="text-muted-foreground text-center">No lessons available for this module yet.</p>
              </CardContent>
            </Card>
          )}
        </section>

        {module.quiz && module.quiz.length > 0 && (
           <section className="mt-16 pt-8 border-t">
            <h2 className="font-headline text-3xl font-semibold tracking-tight text-foreground mb-8 border-b pb-4">
              Quiz
            </h2>
            <Card className="shadow-sm rounded-lg overflow-hidden bg-card">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-foreground">Test Your Knowledge</CardTitle>
                <CardDescription className="text-base text-muted-foreground">
                  Check your understanding of this module. ({module.quiz.length} {module.quiz.length === 1 ? 'question' : 'questions'})
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4 space-y-6">
                {module.quiz.map((quizItem, index) => (
                  <div key={index} className="p-5 border rounded-md bg-background shadow-sm space-y-3">
                    <p className="font-medium text-lg text-foreground">{index + 1}. {quizItem.question}</p>
                    {quizItem.options.length > 0 ? (
                      <ul className="list-disc list-inside text-muted-foreground space-y-1.5 pl-5">
                        {quizItem.options.map((opt, i) => (
                          <li key={i} className={opt.isCorrect ? 'text-foreground' : ''}>
                            {opt.text} {opt.isCorrect && <Badge variant="secondary" className="ml-2 text-xs">Correct</Badge>}
                          </li>
                        ))}
                      </ul>
                    ) : (
                       <p className="text-sm text-muted-foreground italic">Options not available for this question yet.</p>
                    )}
                    {quizItem.answerKey && (
                      <div className="mt-3 pt-3 border-t">
                        <p className="text-sm">
                          <strong className="text-foreground">Answer:</strong> <span className="text-muted-foreground">{quizItem.answerKey}</span>
                        </p>
                      </div>
                    )}
                     {!quizItem.answerKey && !quizItem.options.some(o => o.isCorrect) && (
                       <p className="text-sm mt-3 pt-3 border-t text-muted-foreground italic">Answer key not provided for this question.</p>
                    )}
                  </div>
                ))}
                 <Button variant="outline" disabled className="mt-6">Start Interactive Quiz (Coming Soon)</Button>
              </CardContent>
            </Card>
          </section>
        )}
      </div>
    </AppLayout>
  );
}

    