import AppLayout from "@/components/layout/app-layout";
import { fetchModule, fetchLessons, fetchLessonContent, fetchModules } from "@/lib/supabase-content";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronLeft, MonitorPlay } from "lucide-react";
import { notFound } from "next/navigation";
import QuizModal from "@/components/quiz-modal";
import LessonProgress from "@/components/lesson-progress";
import type { Metadata, ResolvingMetadata } from "next";
import { compileMDX } from "next-mdx-remote/rsc";

export async function generateMetadata(
  { params }: any,
  _parent: ResolvingMetadata,
): Promise<Metadata> {
  const currentModule = await fetchModule(params.moduleSlug)
  const lessons = await fetchLessons(params.moduleSlug)
  const lesson = lessons.find((l) => l.id === params.lessonId)

  if (!currentModule || !lesson) {
    notFound();
  }

  return {
    title: `${lesson.title} | ${currentModule.title.split("–")[1]?.trim() || currentModule.title} | ICT Academy Lite`,
    description: `Lesson: ${lesson.title}. ${lesson.keyTakeaways}`,
  };
}

export async function generateStaticParams() {
  const modules = await fetchModules()
  const params: { moduleSlug: string; lessonId: string }[] = []
  for (const mod of modules) {
    const lessons = await fetchLessons(mod.slug)
    lessons.forEach((lesson) => {
      params.push({ moduleSlug: mod.slug, lessonId: lesson.id })
    })
  }
  return params
}

const TermDefinitionTable = ({
  items,
}: {
  items: { term: string; meaning: string; visual: string }[];
}) => (
  <div className="my-6 space-y-4">
    {items.map((item, index) => (
      <div
        key={index}
        className="grid grid-cols-1 md:grid-cols-[1fr_3fr_auto] gap-2 p-4 border rounded-md bg-card"
      >
        <div className="font-semibold text-foreground">{item.term}</div>
        <div className="text-muted-foreground">{item.meaning}</div>
        <div className="text-2xl hidden md:block">{item.visual}</div>
        <div className="text-2xl md:hidden text-center pt-2">{item.visual}</div>
      </div>
    ))}
  </div>
);

const ComparisonTable = ({
  items,
}: {
  items: { type: string; retail: string; ict: string }[];
}) => (
  <div className="my-6 space-y-4">
    <div className="hidden md:grid grid-cols-[1fr_2fr_2fr] gap-x-4 gap-y-2 p-4 rounded-md bg-card border mb-2">
      <div className="font-semibold text-foreground">Question Type</div>
      <div className="font-semibold text-foreground">Retail Approach</div>
      <div className="font-semibold text-foreground">ICT Approach</div>
    </div>
    {items.map((item, index) => (
      <div
        key={index}
        className="grid grid-cols-1 md:grid-cols-[1fr_2fr_2fr] gap-x-4 gap-y-2 p-4 border rounded-md bg-card"
      >
        <div className="md:hidden font-semibold text-foreground">
          Question Type:
        </div>
        <div className="text-muted-foreground italic md:not-italic">
          {item.type}
        </div>
        <div className="md:hidden font-semibold text-foreground mt-2">
          Retail Approach:
        </div>
        <div className="text-muted-foreground">{item.retail}</div>
        <div className="md:hidden font-semibold text-foreground mt-2">
          ICT Approach:
        </div>
        <div className="text-muted-foreground">{item.ict}</div>
      </div>
    ))}
  </div>
);

export default async function LessonPage({ params }: any) {
  const currentModule = await fetchModule(params.moduleSlug)
  const lessonList = await fetchLessons(params.moduleSlug)
  const lesson = lessonList.find((l) => l.id === params.lessonId)

  if (!currentModule || !lesson) {
    notFound();
  }


  const termDefinitions = [
    {
      term: "Liquidity",
      meaning:
        "Money that can quickly change hands. In trading this means clusters of pending orders waiting to be filled.",
      visual: "💧",
    },
    {
      term: "Stop-loss",
      meaning:
        "An automatic order that closes a losing trade. If price hits this level, you’re “stopped out.”",
      visual: "⛔",
    },
    {
      term: "Liquidity Pool",
      meaning:
        "A price area where many stop-losses or entries sit together. Price often visits this pool to grab those orders.",
      visual: "🏊",
    },
  ];

  const comparisonItems = [
    {
      type: "“Will price rise?”",
      retail: "“Is RSI below 30?”",
      ict: "“Is there a pool of buy-side liquidity above current price?”",
    },
    {
      type: "“Where do I exit?”",
      retail: "“When the moving average crosses.”",
      ict: "“Just below the next sell-side pool, so my stop is outside the herd.”",
    },
  ];

  let mdxContent: React.ReactNode | null = null
  const source = await fetchLessonContent(params.moduleSlug, params.lessonId)
  if (source) {
    try {
      const mdx = await compileMDX({
        source,
        components: { TermDefinitionTable, ComparisonTable },
      })
      mdxContent = mdx.content
    } catch (err) {
      console.error('Failed to load MDX', err)
    }
  }

  return (
    <AppLayout>
      <LessonProgress id={`${currentModule.slug}:${lesson.id}`} />
      <div className="space-y-14 py-12 md:space-y-20 md:py-16">
        <div>
          <Button variant="outline" asChild className="mb-6 text-sm">
            <Link href={`/modules/${currentModule.slug}`}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to {currentModule.title.split("–")[1]?.trim() || currentModule.title}
            </Link>
          </Button>
          <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {lesson.title}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl">
            {lesson.keyTakeaways}
          </p>
          {lesson.videoUrl && (
            <Card className="mt-6 bg-card border-primary/20 shadow-sm">
              <CardHeader className="flex flex-row items-center gap-3 pb-2">
                <MonitorPlay className="h-6 w-6 text-primary" />
                <CardTitle className="text-xl">Watch-along video</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <video
                  src={lesson.videoUrl}
                  controls
                  className="w-full h-auto rounded-md"
                />
              </CardContent>
            </Card>
          )}
        </div>

        <article className="prose prose-lg dark:prose-invert max-w-none space-y-12 md:space-y-16 tracking-wider leading-loose prose-p:my-6">
          {mdxContent ? (
            <>{mdxContent}</>
          ) : (
            <div>
              <h2 className="font-semibold text-2xl text-foreground border-b pb-2">
                Lesson Content
              </h2>
              <p className="text-muted-foreground">
                Detailed content for this lesson is coming soon. Please check back later.
              </p>
              <p className="mt-4">
                <strong className="text-foreground">Key Takeaways:</strong> {lesson.keyTakeaways}
              </p>
            </div>
          )}
        </article>
        {currentModule.quiz && currentModule.quiz.length > 0 && (
          <div className="pt-8 border-t">
            <QuizModal quiz={currentModule.quiz} moduleSlug={currentModule.slug} />
          </div>
        )}
      </div>
    </AppLayout>
  );
}
