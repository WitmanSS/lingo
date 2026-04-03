export interface IUser {
    id: string;
    username: string;
    email: string;
    role: 'USER' | 'ADMIN' | 'MODERATOR';
    avatarUrl?: string;
    bio?: string;
    xp: number;
    level: number;
    streakDays: number;
    createdAt: Date;
    deletedAt?: Date;
}
export interface IStory {
    id: string;
    title: string;
    slug: string;
    level: 'A1' | 'A2' | 'B1' | 'B2';
    wordCount: number;
    readingTimeMinutes: number;
    coverImage?: string;
    authorId: string;
    published: boolean;
    createdAt: Date;
    deletedAt?: Date;
}
export interface IVocabulary {
    id: string;
    word: string;
    definition: string;
    level: 'A1' | 'A2' | 'B1' | 'B2';
    exampleSentence?: string;
    audioUrl?: string;
}
export interface IProgressData {
    userId: string;
    storyId: string;
    progressPercentage: number;
    readingTimeSeconds: number;
    completed: boolean;
}
