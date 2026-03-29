import api, { setTokens, clearTokens } from '../api';
import type { AuthResponse, LoginRequest, RegisterRequest, User } from '@/types';

export const authApi = {
  async login(data: LoginRequest): Promise<AuthResponse> {
    const res = await api.post<AuthResponse>('/auth/login', data);
    setTokens(res.data.accessToken, res.data.refreshToken);
    return res.data;
  },

  async register(data: RegisterRequest): Promise<AuthResponse> {
    const res = await api.post<AuthResponse>('/auth/register', data);
    setTokens(res.data.accessToken, res.data.refreshToken);
    return res.data;
  },

  async logout(): Promise<void> {
    try {
      await api.post('/auth/logout');
    } finally {
      clearTokens();
    }
  },

  async getProfile(): Promise<User> {
    const res = await api.get<User>('/users/profile');
    return res.data;
  },

  async updateProfile(data: Partial<User>): Promise<User> {
    const res = await api.put<User>('/users/profile', data);
    return res.data;
  },
};
