
import type { ModuleDefinition } from '@/types';

export const allModules: ModuleDefinition[] = [
  {
    id: 'm1',
    slug: 'price-action-foundations',
    title: 'Module 1 – Price-Action Foundations',
    level: 'Beginner',
    description: 'Learn the absolute basics: how price is delivered, why candles form, and how ICT views trading sessions.',
    lessons: [
      { id: 'l1', title: 'What Is ICT Trading?', keyTakeaways: 'History of Inner Circle Trader methodology; why liquidity matters more than indicators.', videoUrl: '/videos/m1_l1_intro.mp4' },
      { id: 'l2', title: 'Anatomy of a Candlestick', keyTakeaways: 'Open, high, low, close; wicks = liquidity probes.', videoUrl: '/videos/m1_l2_candles.mp4' },
      { id: 'l3', title: 'Trading Sessions & Time-of-Day', keyTakeaways: 'Asia, London, New-York killzones; PD Arrays intro.', videoUrl: '/videos/m1_l3_sessions.mp4' },
      { id: 'l4', title: 'Candle Sentiment & Reversals', keyTakeaways: 'How body fill, wick length, and relative position signal bullish vs. bearish intent; basic pin-bar and engulfing patterns.', videoUrl: '/videos/m1_l4_sentiment.mp4' },
      { id: 'l5', title: 'Support & Resistance Basics', keyTakeaways: 'Spot swing highs/lows and mark simple ICT PD Arrays acting as support or resistance.', videoUrl: '/videos/m1_l5_support_resist.mp4' },
    ],
    quiz: [
      {
        question: 'Which candle part best represents a liquidity sweep?',
        options: [
          { text: 'Body', isCorrect: false },
          { text: 'Wick', isCorrect: true },
          { text: 'Close', isCorrect: false },
          { text: 'Open', isCorrect: false },
        ],
        answerKey: 'b) Wick',
      },
      // Add 4 more questions for Module 1 later
    ],
    imagePlaceholder: '/images/module-1-price-action.png',
    dataAiHint: 'candlestick chart',
  },
  {
    id: 'm2',
    slug: 'market-structure-liquidity',
    title: 'Module 2 – Market Structure & Liquidity',
    level: 'Beginner→Intermediate',
    description: 'Identify structure shifts and locate the pools of liquidity institutions target.',
    lessons: [
      { id: 'l1', title: 'Market Structure Basics', keyTakeaways: 'Swing highs/lows, break of structure (BOS) vs. change of character (CHOCH).', videoUrl: '/videos/m2_l1_structure.mp4' },
      { id: 'l2', title: 'Liquidity Pools', keyTakeaways: 'Equal highs/lows, buy-side vs sell-side liquidity.', videoUrl: '/videos/m2_l2_liquidity_pools.mp4' },
      { id: 'l3', title: 'Liquidity Sweeps', keyTakeaways: 'How false breakouts set up real moves.', videoUrl: '/videos/m2_l3_sweeps.mp4' },
    ],
    quiz: [
      {
        question: 'A CHOCH signals …',
        options: [
          { text: 'continuation', isCorrect: false },
          { text: 'probable reversal', isCorrect: true },
          { text: 'no change', isCorrect: false },
        ],
        answerKey: 'b) probable reversal',
      },
    ],
    imagePlaceholder: '/images/module-2-market-structure.png',
    dataAiHint: 'market structure',
  },
  {
    id: 'm3',
    slug: 'order-blocks-mitigation',
    title: 'Module 3 – Order Blocks & Mitigation',
    level: 'Intermediate',
    description: 'Dive into institutional order flow—learn to spot, qualify, and trade order blocks.',
    lessons: [
      { id: 'l1', title: 'Defining an Order Block', keyTakeaways: 'Last up/down candle before displacement.', videoUrl: '/videos/m3_l1_define_ob.mp4' },
      { id: 'l2', title: 'Bullish vs Bearish OB', keyTakeaways: 'Identification criteria, ideal entry zones.', videoUrl: '/videos/m3_l2_types.mp4' },
      { id: 'l3', title: 'Mitigation & Re-pricing', keyTakeaways: 'Why price returns to OB after imbalance.', videoUrl: '/videos/m3_l3_mitigation.mp4' },
    ],
    quiz: [
      {
        question: 'The purpose of mitigation is to …',
        options: [
          { text: 'fill liquidity voids', isCorrect: false },
          { text: 'rebalance price', isCorrect: false },
          { text: 'allow institutions to exit', isCorrect: false },
          { text: 'all of the above', isCorrect: true },
        ],
        answerKey: 'd) all of the above',
      },
    ],
    imagePlaceholder: '/images/module-3-order-blocks.png',
    dataAiHint: 'financial order',
  },
  {
    id: 'm4',
    slug: 'imbalances-fair-value-gaps',
    title: 'Module 4 – Imbalances & Fair Value Gaps',
    level: 'Intermediate',
    description: 'Understand price inefficiencies and how smart money uses them for entries/exits.',
    lessons: [
      { id: 'l1', title: 'What Is an Imbalance?', keyTakeaways: 'One-sided price delivery; three-candle rule.', videoUrl: '/videos/m4_l1_imbalance.mp4' },
      { id: 'l2', title: 'Fair Value Gaps vs Liquidity Voids', keyTakeaways: 'Distinctions, how to mark them.', videoUrl: '/videos/m4_l2_fvg_vs_void.mp4' },
      { id: 'l3', title: 'Premium & Discount Arrays', keyTakeaways: 'Optimal Trade Entry (OTE) within PD arrays.', videoUrl: '/videos/m4_l3_premium_discount.mp4' },
    ],
    quiz: [
      // Sample quiz Q&A was "..." - add specific questions later
    ],
    imagePlaceholder: '/images/module-4-imbalances.png',
    dataAiHint: 'price gap',
  },
  {
    id: 'm5',
    slug: 'trading-models-execution',
    title: 'Module 5 – Trading Models & Execution',
    level: 'Advanced',
    description: 'Apply prior concepts inside high-probability ICT models.',
    lessons: [
      { id: 'l1', title: 'Judas Swing Setup', keyTakeaways: 'Fake move in Asia → real move in London.', videoUrl: '/videos/m5_l1_judas.mp4' },
      { id: 'l2', title: 'Power of Three (PO3)', keyTakeaways: 'Accumulation-Manipulation-Distribution cycle.', videoUrl: '/videos/m5_l2_po3.mp4' },
      { id: 'l3', title: 'Session Array Model', keyTakeaways: 'Combining OB + FVG + liquidity sweep in a session.', videoUrl: '/videos/m5_l3_session_model.mp4' },
    ],
    quiz: [
      // Quiz was "..." - add specific questions later
    ],
    imagePlaceholder: '/images/module-5-trading-models.png',
    dataAiHint: 'trading strategy',
  },
  {
    id: 'm6',
    slug: 'risk-management-performance-tracking',
    title: 'Module 6 – Risk Management & Performance Tracking',
    level: 'Advanced',
    description: 'Cap losses, let winners run, and build a data-driven trading journal.',
    lessons: [
      { id: 'l1', title: 'Position Sizing & R-Multiple', keyTakeaways: 'Fixed-fractional vs. Kelly vs. ICT’s 1 % rule.', videoUrl: '/videos/m6_l1_risk.mp4' },
      { id: 'l2', title: 'Trade Management', keyTakeaways: 'Scaling, partials, break-even moves.', videoUrl: '/videos/m6_l2_management.mp4' },
      { id: 'l3', title: 'Journaling & Metrics', keyTakeaways: 'Win-rate vs. expectancy; how to Iterate.', videoUrl: '/videos/m6_l3_journal.mp4' },
    ],
    quiz: [
      // Quiz was "..." - add specific questions later
    ],
    imagePlaceholder: '/images/module-6-risk-management.png',
    dataAiHint: 'risk analysis',
  },
];

export const glossaryTermsCovered: string[] = [
  'BOS', 'CHOCH', 'OB', 'FVG', 'Liquidity Sweep', 'PO3', 'OTE', // etc.
];
