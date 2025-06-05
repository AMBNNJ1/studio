
import AppLayout from '@/components/layout/app-layout';
import { allModules } from '@/lib/modules-data';
import type { ModuleDefinition } from '@/types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, ChevronLeft, BookOpen, CheckCircle, HelpCircle } from 'lucide-react';
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
      <div className="space-y-20 py-8">
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

        {module.quiz && module.quiz.length > 0 && (
           <section className="pt-8 border-t border-border">
            <h2 className="font-headline text-3xl font-semibold tracking-tight text-foreground mb-10 border-b pb-5">
              Quiz
            </h2>
            <Card className="shadow-md rounded-xl overflow-hidden bg-card border border-border">
              <CardHeader className="p-6">
                <CardTitle className="text-xl font-semibold text-foreground">Test Your Knowledge</CardTitle>
                <CardDescription className="text-base text-muted-foreground pt-1">
                  Check your understanding of this module. ({module.quiz.length} {module.quiz.length === 1 ? 'question' : 'questions'})
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 pt-0 space-y-8">
                {module.quiz.map((quizItem, index) => (
                  <div key={index} className="p-6 border border-border rounded-lg bg-background shadow-sm space-y-4">
                    <p className="font-medium text-lg text-foreground flex items-start">
                        <HelpCircle className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                        <span>{index + 1}. {quizItem.question}</span>
                    </p>
                    {quizItem.options.length > 0 ? (
                      <ul className="list-none space-y-2.5 pl-8">
                        {quizItem.options.map((opt, i) => (
                          <li key={i} className={`flex items-center text-muted-foreground ${opt.isCorrect ? 'font-medium text-foreground' : ''}`}>
                            {opt.isCorrect ? <CheckCircle className="h-4 w-4 text-green-500 mr-2.5 flex-shrink-0" /> : <span className="h-4 w-4 mr-2.5 flex-shrink-0"></span>}
                            <span>{String.fromCharCode(97 + i)}) {opt.text}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                       <p className="text-sm text-muted-foreground italic pl-8">Options not available for this question yet.</p>
                    )}
                    {quizItem.answerKey && !quizItem.options.some(o => o.isCorrect) && ( // Show answerKey only if options don't already mark the correct one
                      <div className="mt-4 pt-4 border-t border-border">
                        <p className="text-sm flex items-start">
                          <CheckCircle className="h-4 w-4 text-primary mr-2.5 mt-0.5 flex-shrink-0" />
                          <strong className="text-foreground mr-1.5">Answer:</strong> <span className="text-muted-foreground">{quizItem.answerKey}</span>
                        </p>
                      </div>
                    )}
                     {!quizItem.answerKey && !quizItem.options.some(o => o.isCorrect) && (
                       <p className="text-sm mt-4 pt-4 border-t border-border text-muted-foreground italic pl-8">Answer key not provided for this question.</p>
                    )}
                  </div>
                ))}
                 <Button variant="outline" disabled className="mt-8 w-full sm:w-auto">Start Interactive Quiz (Coming Soon)</Button>
              </CardContent>
            </Card>
          </section>
        )}
      </div>
    </AppLayout>
  );
}
