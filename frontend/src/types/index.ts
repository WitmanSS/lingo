// ==========================================
// LinguaRead — Shared Type Definitions
// ==========================================

// Enums
export type Level = 'A1' | 'A2' | 'B1' | 'B2';
export type Role = 'USER' | 'ADMIN';

// Auth
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

// User
export interface User {
  id: string;
  username: string;
  email: string;
  role: Role;
  avatarUrl?: string;
  bio?: string;
  xp: number;
  level: number;
  streakDays: number;
  createdAt: string;
}

export interface UpdateUserRequest {
  username?: string;
  avatarUrl?: string;
  bio?: string;
}

// Story
export interface Story {
  id: string;
  title: string;
  slug: string;
  content: string;
  level: Level;
  difficultyScore?: number;
  readingTimeMinutes: number;
  wordCount: number;
  coverImage?: string;
  authorId: string;
  author?: User;
  published: boolean;
  tags?: Tag[];
  createdAt: string;
  updatedAt: string;
}

export interface StoryListItem {
  id: string;
  title: string;
  slug: string;
  level: Level;
  readingTimeMinutes: number;
  wordCount: number;
  coverImage?: string;
  author?: { username: string };
  tags?: Tag[];
  createdAt: string;
}

export interface CreateStoryRequest {
  title: string;
  content: string;
  level: Level;
  coverImage?: string;
  tagIds?: string[];
}

// Tag
export interface Tag {
  id: string;
  name: string;
}

// Vocabulary
export interface Vocabulary {
  id: string;
  word: string;
  definition: string;
  exampleSentence?: string;
  phonetic?: string;
  level: Level;
}

export interface UserVocabulary {
  id: string;
  vocabulary: Vocabulary;
  learned: boolean;
  reviewCount: number;
  lastReviewedAt?: string;
  nextReviewAt?: string;
}

// Progress
export interface UserProgress {
  id: string;
  storyId: string;
  progressPercentage: number;
  lastPosition: number;
  completed: boolean;
  readingTimeSeconds: number;
}

// Bookmarks & Favorites
export interface Bookmark {
  id: string;
  storyId: string;
  story?: StoryListItem;
  position: number;
}

export interface Favorite {
  id: string;
  storyId: string;
  story?: StoryListItem;
}

// Notes & Comments
export interface Note {
  id: string;
  storyId: string;
  text: string;
  position: number;
}

export interface Comment {
  id: string;
  userId: string;
  user?: { username: string; avatarUrl?: string };
  storyId: string;
  content: string;
  createdAt: string;
}

// Reviews
export interface Review {
  id: string;
  userId: string;
  user?: { username: string; avatarUrl?: string };
  storyId: string;
  rating: number;
  reviewText?: string;
  createdAt: string;
}

// Quizzes
export interface Quiz {
  id: string;
  storyId: string;
  question: string;
  explanation?: string;
  options: QuizOption[];
}

export interface QuizOption {
  id: string;
  text: string;
  isCorrect?: boolean; // only visible after submission
}

export interface QuizResult {
  id: string;
  quizId: string;
  score: number;
  createdAt: string;
}

// Gamification
export interface ReadingStats {
  totalWordsRead: number;
  totalReadingTime: number;
  storiesCompleted: number;
  vocabularyLearned: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  xpReward: number;
  earnedAt?: string;
}

export interface LeaderboardEntry {
  userId: string;
  username: string;
  avatarUrl?: string;
  xp: number;
  level: number;
  rank: number;
}

// Language (i18n)
export interface Language {
  code: string;
  name: string;
  flag: string;
}

// Level Info (for landing page)
export interface LevelInfo {
  id: Level;
  title: string;
  description: string;
  count: string;
  cta: string;
  color: string;
  icon: string;
}

// API Pagination
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// API Error
export interface ApiError {
  statusCode: number;
  message: string;
  error?: string;
}
