import api from '../api';
import type { Story, StoryListItem, PaginatedResponse, CreateStoryRequest } from '@/types';

export interface StoriesQueryParams {
  page?: number;
  limit?: number;
  level?: string;
  tag?: string;
  search?: string;
  sort?: string;
}

export const storiesApi = {
  async getAll(params?: StoriesQueryParams): Promise<PaginatedResponse<StoryListItem>> {
    const res = await api.get<PaginatedResponse<StoryListItem>>('/stories', { params });
    return res.data;
  },

  async getBySlug(slug: string): Promise<Story> {
    const res = await api.get<Story>(`/stories/${slug}`);
    return res.data;
  },

  // Admin endpoints
  async create(data: CreateStoryRequest): Promise<Story> {
    const res = await api.post<Story>('/stories', data);
    return res.data;
  },

  async update(id: string, data: Partial<CreateStoryRequest>): Promise<Story> {
    const res = await api.put<Story>(`/stories/${id}`, data);
    return res.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/stories/${id}`);
  },
};
