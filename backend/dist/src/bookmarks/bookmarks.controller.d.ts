import { BookmarksService } from './bookmarks.service';
export declare class BookmarksController {
    private bookmarksService;
    constructor(bookmarksService: BookmarksService);
    getAll(user: any): Promise<({
        story: {
            id: string;
            level: import(".prisma/client").$Enums.Level;
            title: string;
            slug: string;
            readingTimeMinutes: number;
        };
    } & {
        id: string;
        userId: string;
        storyId: string;
        position: number;
    })[]>;
    create(user: any, data: {
        storyId: string;
        position?: number;
    }): Promise<{
        id: string;
        userId: string;
        storyId: string;
        position: number;
    }>;
    delete(user: any, id: string): Promise<{
        message: string;
    }>;
}
