import { Level } from '../constants/levels.constant';
export declare class CreateStoryDto {
    title: string;
    content: string;
    level: Level;
    tags?: string[];
    published?: boolean;
}
