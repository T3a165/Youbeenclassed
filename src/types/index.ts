export type Category = 
  | 'idea' 
  | 'business' 
  | 'argument' 
  | 'story' 
  | 'dish' 
  | 'startup' 
  | 'product' 
  | 'marketing' 
  | 'advice' 
  | 'conspiracy';

export type ToneMode = 'professional' | 'brutal' | 'roast';

export type Rank = 'S' | 'A' | 'B' | 'C' | 'D' | 'F';

export interface Verdict {
  score: number;
  rank: Rank;
  strengths: string[];
  weaknesses: string[];
  finalRuling: string;
  category: Category;
  tone: ToneMode;
  submission: string;
  timestamp: number;
  id: string;
}

export interface FeedItem {
  id: string;
  title: string;
  score: number;
  rank: Rank;
  verdict: string;
  category: Category;
  timestamp: number;
}

export interface LeaderboardEntry {
  rank: number;
  title: string;
  score: number;
  category: Category;
}

export const CATEGORIES: { value: Category; label: string }[] = [
  { value: 'idea', label: 'Idea Class' },
  { value: 'business', label: 'Business Class' },
  { value: 'argument', label: 'Argument Class' },
  { value: 'story', label: 'Story Class' },
  { value: 'dish', label: 'Dish Class' },
  { value: 'startup', label: 'Startup Class' },
  { value: 'product', label: 'Product Class' },
  { value: 'marketing', label: 'Marketing Idea Class' },
  { value: 'advice', label: 'Life Advice Class' },
  { value: 'conspiracy', label: 'Conspiracy Theory Class' },
];

export const TONE_MODES: { value: ToneMode; label: string; description: string }[] = [
  { value: 'professional', label: 'Professional', description: 'Analytical, neutral, and constructive' },
  { value: 'brutal', label: 'Brutal Honesty', description: 'Blunt and direct feedback' },
  { value: 'roast', label: 'Roast', description: 'Humorous and sarcastic' },
];

export const RANK_LABELS: Record<Rank, string> = {
  S: 'Legendary',
  A: 'Elite',
  B: 'Promising',
  C: 'Passable',
  D: 'Questionable',
  F: 'Catastrophic',
};

export const RANK_COLORS: Record<Rank, string> = {
  S: 'text-yellow-400',
  A: 'text-green-400',
  B: 'text-blue-400',
  C: 'text-gray-400',
  D: 'text-orange-400',
  F: 'text-red-500',
};
