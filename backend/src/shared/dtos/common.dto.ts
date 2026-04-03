import { IsString, IsEmail, IsOptional, MinLength } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  username!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(8)
  password!: string;

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;
}

export class UpdateUserDTO {
  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsString()
  avatarUrl?: string;
}

export class CreateStoryDTO {
  @IsString()
  title!: string;

  @IsString()
  level!: string;

  @IsString()
  content!: string;

  @IsOptional()
  @IsString()
  coverImage?: string;
}

export class UpdateStoryDTO {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsString()
  coverImage?: string;
}

export class AddVocabularyDTO {
  @IsString()
  word!: string;

  @IsString()
  definition!: string;

  @IsString()
  level!: string;

  @IsOptional()
  @IsString()
  exampleSentence?: string;

  @IsOptional()
  @IsString()
  audioUrl?: string;
}

export class PaginationDTO {
  @IsOptional()
  page?: number;

  @IsOptional()
  limit?: number;

  @IsOptional()
  @IsString()
  sortBy?: string;

  @IsOptional()
  @IsString()
  sortOrder?: 'asc' | 'desc';
}
