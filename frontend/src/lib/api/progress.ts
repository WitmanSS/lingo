import api from '../api';
import type { UserProgress, Bookmark, Favorite, ReadingStats, StoryListItem, PaginatedResponse } from '@/types';

export const progressApi = {
  async getProgress(storyId: string): Promise<UserProgress | null> {
    try {
      const res = await api.get<UserProgress>(`/progress/${storyId}`);
      return res.data;
    } catch {
      return null;
    }
  },

  async updateProgress(data: {
    storyId: string;
    progressPercentage: number;
    lastPosition: number;
    readingTimeSeconds: number;
  }): Promise<UserProgress> {
    const res = await api.post<UserProgress>('/progress/update', data);
    return res.data;
  },

  async getStats(): Promise<ReadingStats> {
    const res = await api.get<ReadingStats>('/analytics/user');
    return res.data;
  },
};

export const bookmarksApi = {
  async getAll(): Promise<Bookmark[]> {
    const res = await api.get<Bookmark[]>('/bookmarks');
    return res.data;
  },

  async create(storyId: string, position: number = 0): Promise<Bookmark> {
    const res = await api.post<Bookmark>('/bookmarks', { storyId, position });
    return res.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/bookmarks/${id}`);
  },
};

export const favoritesApi = {
  async getAll(params?: { page?: number; limit?: number }): Promise<PaginatedResponse<Favorite & { story: StoryListItem }>> {
    const res = await api.get<PaginatedResponse<Favorite & { story: StoryListItem }>>('/favorites', { params });
    return res.data;
  },

  async toggle(storyId: string): Promise<{ favorited: boolean }> {
    const res = await api.post<{ favorited: boolean }>('/favorites', { storyId });
    return res.data;
  },
};
