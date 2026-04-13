import { Level } from '@prisma/client';
export declare class CreateStoryDto {
    title: string;
    content: string;
    level: Level;
    coverImage?: string;
    tagIds?: string[];
}
