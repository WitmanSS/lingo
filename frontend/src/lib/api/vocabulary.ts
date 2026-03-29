import api from '../api';
import type { Vocabulary, UserVocabulary, PaginatedResponse } from '@/types';

export const vocabularyApi = {
  async lookup(word: string): Promise<Vocabulary> {
    const res = await api.get<Vocabulary>(`/vocabulary/${encodeURIComponent(word)}`);
    return res.data;
  },

  async getUserVocabulary(params?: { page?: number; limit?: number }): Promise<PaginatedResponse<UserVocabulary>> {
    const res = await api.get<PaginatedResponse<UserVocabulary>>('/vocabulary', { params });
    return res.data;
  },

  async saveWord(vocabularyId: string): Promise<UserVocabulary> {
    const res = await api.post<UserVocabulary>('/vocabulary/save', { vocabularyId });
    return res.data;
  },

  async markLearned(id: string): Promise<UserVocabulary> {
    const res = await api.put<UserVocabulary>(`/vocabulary/${id}/learned`);
    return res.data;
  },

  async deleteUserWord(id: string): Promise<void> {
    await api.delete(`/vocabulary/${id}`);
  },
};
