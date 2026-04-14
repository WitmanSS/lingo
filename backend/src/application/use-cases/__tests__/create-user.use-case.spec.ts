import { CreateUserUseCase } from '../create-user.use-case';
import { UserRepository } from '../../../domain/repositories/user.repository';
import { Email } from '../../../domain/value-objects/email.value-object';
import { Username } from '../../../domain/value-objects/username.value-object';
import { PasswordHash } from '../../../domain/value-objects/password-hash.value-object';

describe('CreateUserUseCase', () => {
  let useCase: CreateUserUseCase;
  let mockUserRepository: jest.Mocked<UserRepository>;

  beforeEach(() => {
    mockUserRepository = {
      findByEmail: jest.fn(),
      findByUsername: jest.fn(),
      findById: jest.fn(),
      save: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    useCase = new CreateUserUseCase(mockUserRepository);
  });

  it('should create a user successfully', async () => {
    const input = {
      email: 'test@example.com',
      username: 'testuser',
      password: 'password123',
    };

    mockUserRepository.findByEmail.mockResolvedValue(null);
    mockUserRepository.findByUsername.mockResolvedValue(null);
    mockUserRepository.save.mockResolvedValue(undefined);

    const result = await useCase.execute(input);

    expect(result.isSuccess).toBe(true);
    expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(
      expect.any(Email)
    );
    expect(mockUserRepository.findByUsername).toHaveBeenCalledWith(
      expect.any(Username)
    );
    expect(mockUserRepository.save).toHaveBeenCalled();
  });

  it('should fail if email already exists', async () => {
    const input = {
      email: 'existing@example.com',
      username: 'testuser',
      password: 'password123',
    };

    const existingUser = {} as any; // Mock existing user
    mockUserRepository.findByEmail.mockResolvedValue(existingUser);

    const result = await useCase.execute(input);

    expect(result.isFailure).toBe(true);
    expect(result.error.message).toContain('already exists');
  });

  it('should fail if username already exists', async () => {
    const input = {
      email: 'test@example.com',
      username: 'existinguser',
      password: 'password123',
    };

    mockUserRepository.findByEmail.mockResolvedValue(null);
    const existingUser = {} as any; // Mock existing user
    mockUserRepository.findByUsername.mockResolvedValue(existingUser);

    const result = await useCase.execute(input);

    expect(result.isFailure).toBe(true);
    expect(result.error.message).toContain('already exists');
  });
});