
export interface LessonDefinition {
  id: string;
  title: string;
  keyTakeaways: string;
  videoUrl: string;
  markdownPath?: string; // For Markdown-based lesson content
}

export interface QuizOptionDefinition {
  text: string;
  isCorrect: boolean;
}

export interface QuizQuestionDefinition {
  question: string;
  options: QuizOptionDefinition[];
  answerKey?: string; // e.g., "b) Wick" or index
  // answerExplanation?: string;
}

export interface ModuleDefinition {
  id: string;
  slug: string;
  title: string;
  level: 'Beginner' | 'Beginner→Intermediate' | 'Intermediate' | 'Advanced';
  description: string;
  lessons: LessonDefinition[];
  quiz: QuizQuestionDefinition[];
  imagePlaceholder: string;
  dataAiHint: string;
}

export interface GlossaryTerm {
  term: string;
  definition: string;
  category?: string; // Optional category like "Market Structure", "Order Flow"
}
