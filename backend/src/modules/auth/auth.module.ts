import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthRepository } from './auth.repository';
import { JwtStrategy } from './strategies/jwt.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { TwoFactorService } from './two-factor.service';
import { PasswordResetService } from './password-reset.service';
import { SessionService } from './session.service';
import { AppConfigService } from '../../core/config/config.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: (configService: AppConfigService) => ({
        secret: configService.getJwtSecret(),
        signOptions: { expiresIn: '15m' },
      }),
      inject: [AppConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthRepository,
    JwtStrategy,
    GoogleStrategy,
    TwoFactorService,
    PasswordResetService,
    SessionService,
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
