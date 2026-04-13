import { FavoritesService } from './favorites.service';
export declare class FavoritesController {
    private favoritesService;
    constructor(favoritesService: FavoritesService);
    getAll(user: any, page?: number, limit?: number): Promise<{
        data: ({
            story: {
                id: string;
                level: import(".prisma/client").$Enums.Level;
                title: string;
                slug: string;
                readingTimeMinutes: number;
                wordCount: number;
            };
        } & {
            id: string;
            createdAt: Date;
            userId: string;
            storyId: string;
        })[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    toggle(user: any, storyId: string): Promise<{
        favorited: boolean;
    }>;
}
