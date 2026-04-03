import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthRepository } from './auth.repository';
import { PrismaService } from '../../core/database/prisma.service';
import { AppConfigService } from '../../core/config/config.service';
import * as bcrypt from 'bcrypt';

// Mock bcrypt
jest.mock('bcrypt');

describe('AuthService', () => {
  let service: AuthService;
  let authRepository: jest.Mocked<AuthRepository>;
  let jwtService: jest.Mocked<JwtService>;
  let prisma: any;
  let configService: jest.Mocked<AppConfigService>;

  const mockUser = {
    id: 'user-123',
    email: 'test@example.com',
    username: 'testuser',
    passwordHash: 'hashed-password',
    role: 'USER' as const, // Fix TS error by using const assertion which satisfies Prisma enum or import Role from client
    avatarUrl: null,
    xp: 0,
    level: 1,
    deletedAt: null,
    bio: null,
    streakDays: 0,
    lastActiveAt: null,
    createdAt: new Date(),
    lastLoginAt: null,
    emailVerified: false,
    twoFactorEnabled: false,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: AuthRepository,
          useValue: {
            findByEmail: jest.fn(),
            findById: jest.fn(),
            create: jest.fn(),
            deleteSessions: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('mock-token'),
            verify: jest.fn(),
          },
        },
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUnique: jest.fn(),
              update: jest.fn(),
            },
            refreshToken: {
              create: jest.fn(),
              findUnique: jest.fn(),
              delete: jest.fn(),
              deleteMany: jest.fn(),
            },
          },
        },
        {
          provide: AppConfigService,
          useValue: {
            bcryptRounds: 12,
            getJwtSecret: jest.fn().mockReturnValue('test-secret'),
            getJwtRefreshSecret: jest.fn().mockReturnValue('test-refresh-secret'),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    authRepository = module.get(AuthRepository);
    jwtService = module.get(JwtService);
    prisma = module.get(PrismaService);
    configService = module.get(AppConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // ─── Register ─────────────────────────────────────
  describe('register', () => {
    it('should register a new user and return tokens', async () => {
      authRepository.findByEmail.mockResolvedValue(null);
      prisma.user.findUnique.mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashed-password');
      authRepository.create.mockResolvedValue(mockUser);
      prisma.refreshToken.create.mockResolvedValue({});

      const result = await service.register({
        email: 'test@example.com',
        username: 'testuser',
        password: 'Test1234',
      });

      expect(result).toHaveProperty('accessToken');
      expect(result).toHaveProperty('refreshToken');
      expect(result).toHaveProperty('user');
      expect(result.user.email).toBe('test@example.com');
      expect(authRepository.create).toHaveBeenCalled();
    });

    it('should throw if email already exists', async () => {
      authRepository.findByEmail.mockResolvedValue(mockUser);

      await expect(
        service.register({
          email: 'test@example.com',
          username: 'testuser',
          password: 'Test1234',
        }),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw if username already exists', async () => {
      authRepository.findByEmail.mockResolvedValue(null);
      prisma.user.findUnique.mockResolvedValue(mockUser);

      await expect(
        service.register({
          email: 'new@example.com',
          username: 'testuser',
          password: 'Test1234',
        }),
      ).rejects.toThrow(BadRequestException);
    });
  });

  // ─── Login ────────────────────────────────────────
  describe('login', () => {
    it('should return tokens on valid credentials', async () => {
      authRepository.findByEmail.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      prisma.refreshToken.create.mockResolvedValue({});
      prisma.user.update.mockResolvedValue(mockUser);

      const result = await service.login('test@example.com', 'Test1234');

      expect(result).toHaveProperty('accessToken');
      expect(result).toHaveProperty('refreshToken');
      expect(result.user.email).toBe('test@example.com');
    });

    it('should throw on invalid email', async () => {
      authRepository.findByEmail.mockResolvedValue(null);

      await expect(
        service.login('wrong@example.com', 'Test1234'),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw on invalid password', async () => {
      authRepository.findByEmail.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(
        service.login('test@example.com', 'WrongPass1'),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw if user is soft-deleted', async () => {
      authRepository.findByEmail.mockResolvedValue({
        ...mockUser,
        deletedAt: new Date(),
      });

      await expect(
        service.login('test@example.com', 'Test1234'),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  // ─── Logout ───────────────────────────────────────
  describe('logout', () => {
    it('should revoke all tokens and sessions', async () => {
      prisma.refreshToken.deleteMany.mockResolvedValue({ count: 1 });
      authRepository.deleteSessions.mockResolvedValue(undefined);

      const result = await service.logout('user-123');

      expect(result).toEqual({ success: true });
      expect(prisma.refreshToken.deleteMany).toHaveBeenCalledWith({
        where: { userId: 'user-123' },
      });
      expect(authRepository.deleteSessions).toHaveBeenCalledWith('user-123');
    });
  });
});
