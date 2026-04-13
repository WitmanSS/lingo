import { Level } from '@prisma/client';
export declare class QueryStoriesDto {
    page?: number;
    limit?: number;
    level?: Level;
    tag?: string;
    search?: string;
    sort?: string;
}
