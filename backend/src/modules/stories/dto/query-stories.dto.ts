import { IsOptional, IsEnum, IsString, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { Level } from '@prisma/client';

export class QueryStoriesDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 12;

  @IsOptional()
  @IsEnum(Level, { message: 'Level must be one of: A1, A2, B1, B2' })
  level?: Level;

  @IsOptional()
  @IsString()
  tag?: string;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsEnum(['newest', 'oldest', 'popular'], { message: 'Sort must be: newest, oldest, or popular' })
  sort?: string = 'newest';
}
