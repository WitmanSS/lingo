export type Level = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export interface Text {
  id: string;
  title: string;
  content: string;
  preview: string;
  level: Level;
  author: string;
  readTime: number;
  wordCount: number;
  createdAt: string;
  tags: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Language {
  code: string;
  name: string;
  flag: string;
}

export interface LevelInfo {
  id: Level;
  title: string;
  description: string;
  count: string;
  cta: string;
  color: string;
  icon: string;
}
