import { Module } from '@nestjs/common';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { CreateUserUseCase } from './use-cases/create-user.use-case';

@Module({
  imports: [InfrastructureModule],
  providers: [CreateUserUseCase],
  exports: [CreateUserUseCase],
})
export class ApplicationModule {}