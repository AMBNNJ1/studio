
import AppLayout from '@/components/layout/app-layout';
import { allModules } from '@/lib/modules-data';
import type { LessonDefinition, ModuleDefinition } from '@/types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, ArrowLeft, ChevronLeft, MonitorPlay } from 'lucide-react';
import type { Metadata, ResolvingMetadata } from 'next';

type Props = {
  params: { moduleSlug: string; lessonId: string };
};

export async function generateMetadata(
  { params }: Props,
  _parent: ResolvingMetadata
): Promise<Metadata> {
  const module = allModules.find((m) => m.slug === params.moduleSlug);
  const lesson = module?.lessons.find((l) => l.id === params.lessonId);

  if (!module || !lesson) {
    return {
      title: 'Lesson Not Found | ICT Academy Lite',
    };
  }

  return {
    title: `${lesson.title} | ${module.title.split('–')[1]?.trim() || module.title} | ICT Academy Lite`,
    description: `Lesson: ${lesson.title}. ${lesson.keyTakeaways}`,
  };
}

export async function generateStaticParams() {
  const paths = allModules.flatMap((module) =>
    module.lessons.map((lesson) => ({
      moduleSlug: module.slug,
      lessonId: lesson.id,
    }))
  );
  return paths;
}

const TermDefinitionTable = ({ items }: { items: { term: string; meaning: string; visual: string }[] }) => (
  <div className="my-6 space-y-4">
    {items.map((item, index) => (
      <div key={index} className="grid grid-cols-1 md:grid-cols-[1fr_3fr_auto] gap-2 p-4 border rounded-md bg-card">
        <div className="font-semibold text-foreground">{item.term}</div>
        <div className="text-muted-foreground">{item.meaning}</div>
        <div className="text-2xl hidden md:block">{item.visual}</div>
        <div className="text-2xl md:hidden text-center pt-2">{item.visual}</div>
      </div>
    ))}
  </div>
);

const ComparisonTable = ({ items }: { items: { type: string; retail: string; ict: string }[] }) => (
  <div className="my-6 space-y-4">
     <div className="hidden md:grid grid-cols-[1fr_2fr_2fr] gap-x-4 gap-y-2 p-4 rounded-md bg-card border mb-2">
        <div className="font-semibold text-foreground">Question Type</div>
        <div className="font-semibold text-foreground">Retail Approach</div>
        <div className="font-semibold text-foreground">ICT Approach</div>
      </div>
    {items.map((item, index) => (
      <div key={index} className="grid grid-cols-1 md:grid-cols-[1fr_2fr_2fr] gap-x-4 gap-y-2 p-4 border rounded-md bg-card">
        <div className="md:hidden font-semibold text-foreground">Question Type:</div>
        <div className="text-muted-foreground italic md:not-italic">{item.type}</div>
        <div className="md:hidden font-semibold text-foreground mt-2">Retail Approach:</div>
        <div className="text-muted-foreground">{item.retail}</div>
        <div className="md:hidden font-semibold text-foreground mt-2">ICT Approach:</div>
        <div className="text-muted-foreground">{item.ict}</div>
      </div>
    ))}
  </div>
);


export default function LessonPage({ params }: Props) {
  const module = allModules.find((m) => m.slug === params.moduleSlug);
  const lesson = module?.lessons.find((l) => l.id === params.lessonId);

  if (!module || !lesson) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <AlertTriangle className="h-16 w-16 text-destructive mb-4" />
          <h1 className="text-3xl font-bold text-foreground mb-2">Lesson Not Found</h1>
          <p className="text-muted-foreground mb-6">
            Sorry, we couldn't find the lesson you were looking for.
          </p>
          <Button asChild variant="outline">
            <Link href={`/modules/${params.moduleSlug || ''}`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Module
            </Link>
          </Button>
        </div>
      </AppLayout>
    );
  }

  const isModule1Lesson1 = module.slug === 'price-action-foundations' && lesson.id === 'l1';

  const termDefinitions = [
    { term: 'Liquidity', meaning: 'Money that can quickly change hands. In trading this means clusters of pending orders waiting to be filled.', visual: '💧' },
    { term: 'Stop-loss', meaning: 'An automatic order that closes a losing trade. If price hits this level, you’re “stopped out.”', visual: '⛔' },
    { term: 'Liquidity Pool', meaning: 'A price area where many stop-losses or entries sit together. Price often visits this pool to grab those orders.', visual: '🏊' },
  ];

  const comparisonItems = [
    { type: '“Will price rise?”', retail: '“Is RSI below 30?”', ict: '“Is there a pool of buy-side liquidity above current price?”' },
    { type: '“Where do I exit?”', retail: '“When the moving average crosses.”', ict: '“Just below the next sell-side pool, so my stop is outside the herd.”' },
  ];

  return (
    <AppLayout>
      <div className="space-y-10 py-8">
        <div>
          <Button variant="outline" asChild className="mb-6 text-sm">
            <Link href={`/modules/${module.slug}`}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to {module.title.split('–')[1]?.trim() || module.title}
            </Link>
          </Button>
          <p className="text-sm font-medium text-primary mb-1">
            {module.title.split('–')[0]?.trim() || 'Module'} - Lesson {module.lessons.findIndex(l => l.id === lesson.id) + 1}
          </p>
          <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {lesson.title}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl">
            {lesson.keyTakeaways}
          </p>
          {lesson.videoUrl && (
             <Card className="mt-6 bg-card border-primary/20 shadow-sm">
              <CardContent className="pt-6 flex items-center gap-3">
                <MonitorPlay className="h-6 w-6 text-primary" />
                <p className="text-foreground">
                  Watch-along video: <code className="bg-muted px-2 py-1 rounded-sm text-sm">{lesson.videoUrl}</code> (Video player coming soon)
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        <article className="prose prose-lg dark:prose-invert max-w-none space-y-8">
          {isModule1Lesson1 ? (
            <>
              <p className="text-base italic text-muted-foreground">Beginner-friendly edition – no prior knowledge assumed</p>
              
              <section>
                <h2 className="font-semibold text-2xl text-foreground border-b pb-2">1. Meet the Teacher: ICT</h2>
                <p>Michael J. Huddleston, who goes by Inner Circle Trader (ICT), is a veteran trader who began sharing free lessons online in the early 2000s. His big claim:</p>
                <blockquote className="border-l-4 border-primary pl-4 italic my-4 text-muted-foreground">
                  “Price moves mainly to pick up liquidity (other people’s orders), not because of your indicators.”
                </blockquote>
                <p>Think of him as a tour guide who shows you where the big players hide their buy and sell orders—so you can avoid being the easy target.</p>
              </section>

              <section>
                <h2 className="font-semibold text-2xl text-foreground border-b pb-2">2. First Building Blocks 🧱</h2>
                <p>Before we go further, let’s clarify three words we’ll use a lot.</p>
                <TermDefinitionTable items={termDefinitions} />
                <p className="mt-4"><strong className="text-foreground">Rule of thumb:</strong> Where you (a retail trader) put a stop-loss, institutions see a target.</p>
              </section>

              <section>
                <h2 className="font-semibold text-2xl text-foreground border-b pb-2">3. Candlestick Crash Course (30 seconds) ⏱️</h2>
                <p>A single candlestick shows four prices:</p>
                <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
                  {`
  high ─┐  ← Wick (thin line)
       │
  open ●───┐
       │    ← Body (thick part)
       │
 close ●───┘
       │
   low ─┘`}
                </pre>
                <p className="mt-2"><strong>Body</strong> = where the bulk of trading happened.</p>
                <p><strong>Wick (shadow)</strong> = quick move that was rejected. ICT treats long wicks as signs of a liquidity sweep (price went hunting for stops and then reversed).</p>
                <p>If this is brand-new to you, don’t worry—Lesson 2 dives deeper.</p>
              </section>

              <section>
                <h2 className="font-semibold text-2xl text-foreground border-b pb-2">4. Why Liquidity &gt; Indicators</h2>
                <p>Most popular indicators (RSI, MACD, moving averages) are averages of past prices. They tell you what <em className="italic">has already happened</em>. Liquidity shows you where price is <em className="italic">likely to go next</em>.</p>
                <ComparisonTable items={comparisonItems} />
                <p className="mt-4"><strong className="text-foreground">Takeaway:</strong> Liquidity is forward-looking—a magnet that price seeks out.</p>
              </section>

              <section>
                <h2 className="font-semibold text-2xl text-foreground border-b pb-2">5. Mini Story: The Tuesday Stop-Hunt</h2>
                <p>Imagine EUR/USD forms two equal highs at 1.1000 on Monday. Many traders place stop-losses a few pips above that level. By Tuesday morning price spikes to 1.1005, tagging those stops, then immediately drops 80 pips.</p>
                <p><strong className="text-foreground">What happened?</strong> Price raided the buy-side liquidity pool (those clustered stops) and, once the orders were filled, reversed because the mission was accomplished.</p>
                <p>No indicator predicted that exact spike—but knowing where the stops sat did.</p>
              </section>

              <section>
                <h2 className="font-semibold text-2xl text-foreground border-b pb-2">6. Try It Yourself ✍️</h2>
                <p>Open any chart (e.g., GBP/USD, 1-hour).</p>
                <ol className="list-decimal list-inside space-y-1 my-2 pl-4">
                  <li>Mark the two most recent obvious swing highs and lows.</li>
                  <li>Ask: If I were a big bank needing to buy cheaply, would I push price down to the sell-side pool first?</li>
                </ol>
                <p>Watch the next few candles—journal what you see.</p>
                <p className="mt-2 p-3 bg-accent text-accent-foreground rounded-md text-sm"><strong className="text-foreground">Tip:</strong> Post a screenshot in the community channel and tag it #Lesson1 to get feedback.</p>
              </section>

              <section>
                <h2 className="font-semibold text-2xl text-foreground border-b pb-2">7. Key Points to Remember</h2>
                <ul className="list-disc list-inside space-y-1 my-2 pl-4">
                  <li>ICT ≠ Indicators. ICT is about where orders sit in the market.</li>
                  <li>Liquidity pools act like magnets; price often seeks them before making its real move.</li>
                  <li>Wicks tell stories. A long wick through a prior high is often a liquidity grab.</li>
                  <li>Start training your eyes to spot equal highs/lows—they scream “stops are here!”</li>
                </ul>
              </section>

              <Card className="mt-8 bg-card border-primary/20 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl">Coming Up → Lesson 2: Anatomy of a Candlestick</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">You’ll zoom into each candle part so these ideas become crystal clear. See you there! 👋</p>
                </CardContent>
              </Card>
            </>
          ) : (
            <div>
              <h2 className="font-semibold text-2xl text-foreground border-b pb-2">Lesson Content</h2>
              <p className="text-muted-foreground">Detailed content for this lesson is coming soon. Please check back later.</p>
              <p className="mt-4"><strong className="text-foreground">Key Takeaways:</strong> {lesson.keyTakeaways}</p>
            </div>
          )}
        </article>
      </div>
    </AppLayout>
  );
}
