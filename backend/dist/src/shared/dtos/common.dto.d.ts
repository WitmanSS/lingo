export declare class CreateUserDTO {
    username: string;
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
}
export declare class UpdateUserDTO {
    username?: string;
    bio?: string;
    avatarUrl?: string;
}
export declare class CreateStoryDTO {
    title: string;
    level: string;
    content: string;
    coverImage?: string;
}
export declare class UpdateStoryDTO {
    title?: string;
    content?: string;
    coverImage?: string;
}
export declare class AddVocabularyDTO {
    word: string;
    definition: string;
    level: string;
    exampleSentence?: string;
    audioUrl?: string;
}
export declare class PaginationDTO {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}
