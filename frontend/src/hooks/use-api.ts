import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { useAuthStore } from '@/store/auth-store';

// Types
export interface User {
  id: string;
  username: string;
  email: string;
  avatarUrl?: string;
  level: number;
  xp: number;
  streakDays: number;
}

export interface Story {
  id: string;
  title: string;
  slug: string;
  level: string;
  readingTimeMinutes: number;
  wordCount: number;
  coverImage?: string;
  author: {
    id: string;
    username: string;
  };
  averageRating?: number;
  commentCount?: number;
}

// Auth hooks
export const useCurrentUser = () => {
  return useQuery({
    queryKey: ['auth', 'me'],
    queryFn: async () => {
      const response = await api.get('/auth/me');
      return response.data as User;
    },
    retry: false,
    onSuccess: (user) => {
      useAuthStore.getState().setUser(user);
    },
    onError: () => {
      useAuthStore.getState().setUser(null);
    },
  });
};

// Stories hooks
export const useStories = (filters?: {
  level?: string;
  search?: string;
  page?: number;
  limit?: number;
}) => {
  return useQuery({
    queryKey: ['stories', filters],
    queryFn: async () => {
      const response = await api.get('/stories', { params: filters });
      return response.data;
    },
    keepPreviousData: true,
  });
};

export const useStory = (slug: string) => {
  return useQuery({
    queryKey: ['stories', slug],
    queryFn: async () => {
      const response = await api.get(`/stories/${slug}`);
      return response.data as Story;
    },
    enabled: !!slug,
  });
};

// Mutations
export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      const response = await api.post('/auth/login', credentials);
      return response.data;
    },
    onSuccess: (data) => {
      // If 2FA is required
      if (data.requires2FA) {
        return data;
      }
      // Normal login success
      queryClient.invalidateQueries(['auth']);
    },
  });
};

export const useVerify2FA = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { tempToken: string; token: string }) => {
      const response = await api.post('/auth/2fa/verify', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['auth']);
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: async (userData: { email: string; username: string; password: string }) => {
      const response = await api.post('/auth/register', userData);
      return response.data;
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await api.post('/auth/logout');
      return response.data;
    },
    onSuccess: () => {
      useAuthStore.getState().logout();
      queryClient.clear();
    },
  });
};