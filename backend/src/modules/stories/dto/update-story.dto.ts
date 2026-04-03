import { IsOptional, IsBoolean, IsString, IsEnum, IsArray, IsUUID, MinLength, MaxLength } from 'class-validator';
import { Level } from '@prisma/client';

export class UpdateStoryDto {
  @IsOptional()
  @IsString()
  @MinLength(3, { message: 'Title must be at least 3 characters' })
  @MaxLength(200, { message: 'Title must not exceed 200 characters' })
  title?: string;

  @IsOptional()
  @IsString()
  @MinLength(50, { message: 'Content must be at least 50 characters' })
  content?: string;

  @IsOptional()
  @IsEnum(Level, { message: 'Level must be one of: A1, A2, B1, B2' })
  level?: Level;

  @IsOptional()
  @IsString()
  coverImage?: string;

  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true, message: 'Each tag ID must be a valid UUID' })
  tagIds?: string[];

  @IsOptional()
  @IsBoolean()
  published?: boolean;
}
