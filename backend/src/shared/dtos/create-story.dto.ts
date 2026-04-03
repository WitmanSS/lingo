import { IsString, IsEnum, IsOptional, IsArray, MinLength, MaxLength, IsBoolean } from 'class-validator';
import { Level } from '../constants/levels.constant';

export class CreateStoryDto {
  @IsString()
  @MinLength(5)
  @MaxLength(200)
  title!: string;

  @IsString()
  @MinLength(100)
  content!: string;

  @IsEnum(Level)
  level!: Level;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsBoolean()
  published?: boolean;
}
