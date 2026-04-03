import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/types';
import api, { setTokens, clearTokens, getAccessToken } from '@/lib/api';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  setUser: (user: User) => void;
  fetchProfile: () => Promise<void>;
  checkAuth: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.post('/auth/login', { email, password });
          const { accessToken, refreshToken, user } = response.data;

          setTokens(accessToken, refreshToken);
          set({ user, isAuthenticated: true, isLoading: false, error: null });
          return true;
        } catch (error: any) {
          const message = error.response?.data?.message || 'Login failed. Please try again.';
          set({ isLoading: false, error: message });
          return false;
        }
      },

      register: async (username: string, email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.post('/auth/register', { username, email, password });
          const { accessToken, refreshToken, user } = response.data;

          setTokens(accessToken, refreshToken);
          set({ user, isAuthenticated: true, isLoading: false, error: null });
          return true;
        } catch (error: any) {
          const message =
            error.response?.data?.errors?.join(', ') ||
            error.response?.data?.message ||
            'Registration failed. Please try again.';
          set({ isLoading: false, error: message });
          return false;
        }
      },

      logout: () => {
        // Fire-and-forget server logout
        api.post('/auth/logout').catch(() => {});
        clearTokens();
        set({ user: null, isAuthenticated: false, error: null });
      },

      setUser: (user: User) => {
        set({ user, isAuthenticated: true });
      },

      fetchProfile: async () => {
        try {
          const response = await api.get('/auth/me');
          set({ user: response.data, isAuthenticated: true });
        } catch {
          clearTokens();
          set({ user: null, isAuthenticated: false });
        }
      },

      checkAuth: () => {
        const token = getAccessToken();
        if (!token) {
          set({ user: null, isAuthenticated: false });
        }
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
