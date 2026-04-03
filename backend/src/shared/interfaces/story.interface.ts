export interface IStory {
  id: string;
  title: string;
  slug: string;
  level: string;
  difficultyScore?: number;
  readingTimeMinutes: number;
  wordCount: number;
  coverImage?: string;
  authorId: string;
  published: boolean;
  isAIGenerated: boolean;
  createdAt: string;
  updatedAt: string;
  author: {
    id: string;
    username: string;
  };
  content?: string;
  chapters?: IStoryChapter[];
  tags?: ITag[];
  stats?: {
    views: number;
    likes: number;
    comments: number;
    rating: number;
  };
}

export interface IStoryChapter {
  id: string;
  title: string;
  content: string;
  order: number;
  wordCount: number;
}

export interface ICreateStory {
  title: string;
  content: string;
  level: string;
  tags?: string[];
}

export interface IUpdateStory {
  title?: string;
  content?: string;
  level?: string;
  published?: boolean;
  tags?: string[];
}

export interface ITag {
  id: string;
  name: string;
}
