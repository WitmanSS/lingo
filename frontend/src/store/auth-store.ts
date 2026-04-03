import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/types';
import api, { setTokens, clearTokens, getAccessToken } from '@/lib/api';

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
          const response = await api.post('/auth/login', { email, password });
          const { accessToken, refreshToken, user } = response.data;

          setTokens(accessToken, refreshToken);
          set({ user, isAuthenticated: true, isLoading: false });

          console.log('Login successful, user:', user); // Debug
          return true;
        } catch (error) {
          console.error('Login failed:', error);
          set({ isLoading: false });
          return false;
        }
      },

      register: async (username: string, email: string, password: string) => {
        set({ isLoading: true });
        try {
          const response = await api.post('/auth/register', { username, email, password });
          const { accessToken, refreshToken, user } = response.data;

          setTokens(accessToken, refreshToken);
          set({ user, isAuthenticated: true, isLoading: false });

          console.log('Register successful, user:', user); // Debug
          return true;
        } catch (error) {
          console.error('Register failed:', error);
          set({ isLoading: false });
          return false;
        }
      },

      logout: () => {
        clearTokens();
        set({ user: null, isAuthenticated: false });
      },

      setUser: (user: User) => {
        set({ user, isAuthenticated: true });
      },

      fetchProfile: async () => {
        try {
          const response = await api.get('/auth/profile');
          set({ user: response.data, isAuthenticated: true });
        } catch (error) {
          console.error('Fetch profile failed:', error);
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
