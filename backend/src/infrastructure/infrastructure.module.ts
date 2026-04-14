import { Module } from '@nestjs/common';
import { PrismaUserRepository } from './database/repositories/prisma-user.repository';
import { UserRepository } from '../domain/repositories/user-repository';

@Module({
  providers: [
    {
      provide: 'UserRepository',
      useClass: PrismaUserRepository,
    },
  ],
  exports: ['UserRepository'],
})
export class InfrastructureModule {}