import api from '../api';
import type { Quiz, QuizResult, Achievement, LeaderboardEntry, PaginatedResponse } from '@/types';

export const quizApi = {
  async getForStory(storyId: string): Promise<Quiz[]> {
    const res = await api.get<Quiz[]>(`/stories/${storyId}/quiz`);
    return res.data;
  },

  async submit(quizId: string, selectedOptionId: string): Promise<QuizResult> {
    const res = await api.post<QuizResult>('/quiz/submit', { quizId, selectedOptionId });
    return res.data;
  },
};

export const gamificationApi = {
  async getLeaderboard(params?: { page?: number; limit?: number }): Promise<PaginatedResponse<LeaderboardEntry>> {
    const res = await api.get<PaginatedResponse<LeaderboardEntry>>('/gamification/leaderboard', { params });
    return res.data;
  },

  async getAchievements(): Promise<Achievement[]> {
    const res = await api.get<Achievement[]>('/gamification/achievements');
    return res.data;
  },
};

export const aiApi = {
  async generateStory(data: { level: string; topic?: string }): Promise<{ content: string; title: string }> {
    const res = await api.post<{ content: string; title: string }>('/ai/generate-story', data);
    return res.data;
  },

  async analyzeDifficulty(content: string): Promise<{ level: string; score: number }> {
    const res = await api.post<{ level: string; score: number }>('/ai/analyze-difficulty', { content });
    return res.data;
  },

  async extractVocabulary(content: string): Promise<{ words: Array<{ word: string; definition: string }> }> {
    const res = await api.post<{ words: Array<{ word: string; definition: string }> }>('/ai/extract-vocabulary', { content });
    return res.data;
  },

  async generateQuiz(storyId: string): Promise<Quiz[]> {
    const res = await api.post<Quiz[]>('/ai/generate-quiz', { storyId });
    return res.data;
  },

  async simplifySentence(sentence: string): Promise<{ simplified: string }> {
    const res = await api.post<{ simplified: string }>('/ai/simplify', { sentence });
    return res.data;
  },
};
