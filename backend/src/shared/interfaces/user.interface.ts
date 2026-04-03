export interface IUser {
  id: string;
  username: string;
  email: string;
  role: string;
  avatarUrl?: string;
  bio?: string;
  xp: number;
  level: number;
  streakDays: number;
  createdAt: string;
  lastLoginAt?: string;
  emailVerified: boolean;
  twoFactorEnabled: boolean;
}

export interface ICreateUser {
  username: string;
  email: string;
  password: string;
}

export interface IUpdateUser {
  username?: string;
  avatarUrl?: string;
  bio?: string;
  email?: string;
}

export interface IUserProfile extends IUser {
  profile: {
    firstName?: string;
    lastName?: string;
    phone?: string;
    country?: string;
    language?: string;
    timezone?: string;
  };
}
