import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/types';
import { authApi } from '@/lib/api/auth';
import { clearTokens, getAccessToken } from '@/lib/api';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  setUser: (user: User) => void;
  fetchProfile: () => Promise<void>;
  checkAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
          const response = await authApi.login({ email, password });
          set({ user: response.user, isAuthenticated: true, isLoading: false });
          return true;
        } catch {
          set({ isLoading: false });
          return false;
        }
      },

      register: async (username: string, email: string, password: string) => {
        set({ isLoading: true });
        try {
          const response = await authApi.register({ username, email, password });
          set({ user: response.user, isAuthenticated: true, isLoading: false });
          return true;
        } catch {
          set({ isLoading: false });
          return false;
        }
      },

      logout: () => {
        authApi.logout().catch(() => {});
        clearTokens();
        set({ user: null, isAuthenticated: false });
      },

      setUser: (user: User) => {
        set({ user, isAuthenticated: true });
      },

      fetchProfile: async () => {
        try {
          const user = await authApi.getProfile();
          set({ user, isAuthenticated: true });
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
