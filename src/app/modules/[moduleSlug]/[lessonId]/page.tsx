
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

  const isModule1Lesson1 =
    module.slug === 'price-action-foundations' && lesson.id === 'l1';
  const isModule2Lesson1 =
    module.slug === 'market-structure-liquidity' && lesson.id === 'l1';

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
      <div className="space-y-14 py-12 md:space-y-20 md:py-16">
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

        <article className="prose prose-lg dark:prose-invert max-w-none space-y-8 md:space-y-12">
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
          ) : isModule2Lesson1 ? (
            <>
              <p>
                Welcome to the foundation of technical analysis. Before you can
                understand advanced concepts like liquidity, you first need to
                learn how to read the market&apos;s language. Market structure is
                the &quot;skeleton&quot; of price movement. By identifying its
                patterns, you take the first and most critical step toward
                understanding market direction and anticipating future moves.
              </p>
              <p>
                <strong>Objective:</strong> At the end of this lesson, you will be
                able to identify swing points on a chart and differentiate
                between a trend-continuing Break of Structure (BOS) and a
                potential trend-reversing Change of Character (CHOCH).
              </p>

              <section>
                <h2 className="font-semibold text-2xl text-foreground border-b pb-2">1. Defining the Trend</h2>
                <p>
                  A trend is simply the overall direction of the market. Trends
                  are not straight lines; they are a series of zig-zags or
                  &quot;swings.&quot; We identify the trend by looking at the pattern
                  of these swing highs and swing lows.
                </p>
                <h3 className="mt-4">The Uptrend: A Series of Higher Highs &amp; Higher Lows</h3>
                <p>
                  An uptrend (or bullish trend) is characterized by price
                  consistently making new highs, followed by pullbacks that form
                  a higher low than the previous one.
                </p>
                <p>
                  <strong>Higher High (HH):</strong> A swing high that is higher
                  than the previous swing high.
                </p>
                <p>
                  <strong>Higher Low (HL):</strong> A swing low that is higher
                  than the previous swing low.
                </p>
                <p>
                  As long as price continues to create this HH and HL pattern,
                  and the Higher Lows are respected (not broken), the uptrend is
                  considered intact.
                </p>
                <p className="italic text-muted-foreground">
                  [CHART IMAGE: A clear uptrend on a candlestick chart. Each
                  significant peak is labeled &quot;HH&quot; and each significant trough
                  is labeled &quot;HL&quot;.]
                </p>
                <p>
                  In this uptrend, notice how each peak is higher than the last
                  (HH), and each pullback low is also higher than the last (HL).
                  The structure is bullish.
                </p>
                <h3 className="mt-4">The Downtrend: A Series of Lower Highs &amp; Lower Lows</h3>
                <p>
                  A downtrend (or bearish trend) is the opposite. It is
                  characterized by price consistently making new lows, followed
                  by rallies that form a lower high than the previous one.
                </p>
                <p>
                  <strong>Lower Low (LL):</strong> A swing low that is lower than
                  the previous swing low.
                </p>
                <p>
                  <strong>Lower High (LH):</strong> A swing high that is lower
                  than the previous swing high.
                </p>
                <p>
                  As long as price continues to create this LL and LH pattern,
                  and the Lower Highs are respected, the downtrend is considered
                  intact.
                </p>
                <p className="italic text-muted-foreground">
                  [CHART IMAGE: A clear downtrend on a candlestick chart. Each
                  significant trough is labeled &quot;LL&quot; and each significant peak
                  is labeled &quot;LH&quot;.]
                </p>
                <p>
                  In this downtrend, price makes a new low (LL), rallies to a
                  peak that is lower than the previous one (LH), and repeats. The
                  structure is bearish.
                </p>
              </section>

              <section>
                <h2 className="font-semibold text-2xl text-foreground border-b pb-2">2. Break of Structure (BOS): The Trend Continues</h2>
                <p>
                  A Break of Structure, or BOS, is a confirmation signal that
                  the current trend is likely to continue. It&apos;s the engine that
                  keeps a trend moving.
                </p>
                <ul className="list-disc list-inside space-y-1 my-2 pl-4">
                  <li>
                    In an Uptrend: A BOS occurs when price breaks above the most
                    recent Higher High (HH).
                  </li>
                  <li>
                    In a Downtrend: A BOS occurs when price breaks below the
                    most recent Lower Low (LL).
                  </li>
                </ul>
                <p>
                  Seeing a BOS tells you that the momentum is still strong in
                  the direction of the trend. Healthy trends will have multiple
                  BOS events.
                </p>
                <p className="italic text-muted-foreground">
                  [CHART IMAGE: An uptrend chart with breaks of structure
                  highlighted.]
                </p>
                <p>
                  Here, every time price creates a new Higher High, it breaks
                  the structure of the previous high. These are bullish Breaks of
                  Structure (BOS), signaling trend continuation.
                </p>
              </section>

              <section>
                <h2 className="font-semibold text-2xl text-foreground border-b pb-2">3. Change of Character (CHOCH): The First Warning Sign</h2>
                <p>
                  If a BOS confirms a trend, a Change of Character (CHOCH) is the
                  first warning sign that a trend might be losing strength and
                  preparing to reverse.
                </p>
                <p>
                  <strong>Important:</strong> A CHOCH is NOT a confirmation of a
                  reversal. It is simply the first signal that the underlying
                  market dynamic is shifting.
                </p>
                <ul className="list-disc list-inside space-y-1 my-2 pl-4">
                  <li>
                    In an Uptrend: A CHOCH occurs when price fails to make a new
                    Higher High and instead breaks below the most recent Higher
                    Low (HL).
                  </li>
                  <li>
                    In a Downtrend: A CHOCH occurs when price fails to make a
                    new Lower Low and instead breaks above the most recent Lower
                    High (LH).
                  </li>
                </ul>
                <p>
                  Think of it this way: the trend had one job—to protect its highs
                  (in a downtrend) or its lows (in an uptrend). A CHOCH is the
                  first time it fails to do so.
                </p>
              </section>

              <section>
                <h2 className="font-semibold text-2xl text-foreground border-b pb-2">Practical Application: From Trend to Reversal Signal</h2>
                <p>
                  Let&apos;s put it all together. The chart below shows a healthy
                  uptrend, confirmed by multiple BOS events. But eventually, the
                  buying pressure fades, and the market gives us a warning sign.
                </p>
                <p className="italic text-muted-foreground">[CHART IMAGE: A comprehensive sequence showing BOS and a final CHOCH.]</p>
                <p>
                  This CHOCH is your signal to stop looking for buying
                  opportunities in the old trend and start analyzing the market
                  for a potential new trend in the opposite direction.
                </p>
              </section>

              <section>
                <h2 className="font-semibold text-2xl text-foreground border-b pb-2">Check Your Understanding</h2>
                <p>Test what you&apos;ve learned with these quick questions.</p>
                <p className="mt-4 font-medium">Question 1: A Break of Structure (BOS) in a downtrend signifies:</p>
                <ol className="list-decimal list-inside space-y-1 my-2 pl-4">
                  <li>The trend is about to reverse.</li>
                  <li>The trend is likely continuing.</li>
                  <li>The market is consolidating.</li>
                </ol>
                <details className="my-2">
                  <summary className="cursor-pointer text-primary">Click to see the answer</summary>
                  <p>
                    <strong>b) The trend is likely continuing.</strong> A BOS in a
                    downtrend is when price breaks below the previous Lower Low,
                    confirming bearish momentum.
                  </p>
                </details>
                <p className="mt-4 font-medium">Question 2: What is the first sign that an uptrend might be losing strength and potentially reversing?</p>
                <ol className="list-decimal list-inside space-y-1 my-2 pl-4">
                  <li>A Break of Structure (BOS)</li>
                  <li>A new Higher High (HH)</li>
                  <li>A Change of Character (CHOCH)</li>
                </ol>
                <details className="my-2">
                  <summary className="cursor-pointer text-primary">Click to see the answer</summary>
                  <p>
                    <strong>c) A Change of Character (CHOCH).</strong> A CHOCH occurs
                    when price breaks the last Higher Low in an uptrend, signaling
                    weakness.
                  </p>
                </details>
              </section>

              <Card className="mt-8 bg-card border-primary/20 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl">Next Lesson: Liquidity Pools →</CardTitle>
                </CardHeader>
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
