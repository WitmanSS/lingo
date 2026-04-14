import { User } from '../user.entity';
import { Email } from '../../value-objects/email.value-object';
import { Username } from '../../value-objects/username.value-object';
import { PasswordHash } from '../../value-objects/password-hash.value-object';
import { UserId } from '../../value-objects/user-id.value-object';

describe('User Entity', () => {
  const validEmail = Email.create('test@example.com').value as Email;
  const validUsername = Username.create('testuser').value as Username;
  const validPasswordHash = PasswordHash.create('hashedpassword').value as PasswordHash;
  const userId = UserId.create().value as UserId;

  it('should create a user successfully', () => {
    const user = User.create({
      id: userId,
      email: validEmail,
      username: validUsername,
      passwordHash: validPasswordHash,
    });

    expect(user.isSuccess).toBe(true);
    expect(user.value).toBeInstanceOf(User);
  });

  it('should change password successfully', () => {
    const user = User.create({
      id: userId,
      email: validEmail,
      username: validUsername,
      passwordHash: validPasswordHash,
    }).value as User;

    const newPasswordHash = PasswordHash.create('newhashedpassword').value as PasswordHash;
    const result = user.changePassword(newPasswordHash);

    expect(result.isSuccess).toBe(true);
  });

  it('should enable 2FA successfully', () => {
    const user = User.create({
      id: userId,
      email: validEmail,
      username: validUsername,
      passwordHash: validPasswordHash,
    }).value as User;

    const result = user.enable2FA('secret');

    expect(result.isSuccess).toBe(true);
    expect(user.twoFactorSecret).toBe('secret');
    expect(user.isTwoFactorEnabled).toBe(true);
  });

  it('should disable 2FA successfully', () => {
    const user = User.create({
      id: userId,
      email: validEmail,
      username: validUsername,
      passwordHash: validPasswordHash,
    }).value as User;

    user.enable2FA('secret');
    const result = user.disable2FA();

    expect(result.isSuccess).toBe(true);
    expect(user.twoFactorSecret).toBeNull();
    expect(user.isTwoFactorEnabled).toBe(false);
  });
});