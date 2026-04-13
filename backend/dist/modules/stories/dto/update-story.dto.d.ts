import { Level } from '@prisma/client';
export declare class UpdateStoryDto {
    title?: string;
    content?: string;
    level?: Level;
    coverImage?: string;
    tagIds?: string[];
    published?: boolean;
}
