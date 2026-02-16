import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Level = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export interface Text {
  id: string;
  title: string;
  content: string;
  preview: string;
  level: Level;
  author: string;
  readTime: number;
  wordCount: number;
  createdAt: string;
  tags: string[];
}

interface TextsState {
  texts: Text[];
  userTexts: Text[];
  addText: (text: Omit<Text, 'id' | 'createdAt'>) => void;
  getTextsByLevel: (level: Level) => Text[];
  getFeaturedTexts: () => Text[];
  deleteText: (id: string) => void;
}

const sampleTexts: Text[] = [
  {
    id: '1',
    title: 'A Morning in Paris',
    content: 'The sun rose over the Seine, casting golden light on the ancient buildings. Marie walked along the cobblestone streets, breathing in the fresh morning air. The smell of freshly baked bread wafted from the nearby boulangerie. She stopped at her favorite café, where the barista greeted her with a warm smile.',
    preview: 'The sun rose over the Seine, casting golden light on the ancient buildings...',
    level: 'intermediate',
    author: 'Sarah Mitchell',
    readTime: 5,
    wordCount: 450,
    createdAt: '2025-01-15',
    tags: ['travel', 'culture'],
  },
  {
    id: '2',
    title: 'The Little Cafe',
    content: 'Every day, Maria opened her cafe at seven o\'clock. The smell of fresh coffee filled the air. Her first customer was always Mr. Johnson, an old man who lived nearby. He ordered the same thing every morning: one black coffee and a croissant. Maria liked her routine. It made her happy to see her regular customers.',
    preview: 'Every day, Maria opened her cafe at seven o\'clock. The smell of fresh coffee...',
    level: 'beginner',
    author: 'John Parker',
    readTime: 3,
    wordCount: 280,
    createdAt: '2025-01-14',
    tags: ['daily life', 'food'],
  },
  {
    id: '3',
    title: 'Technology and Society',
    content: 'The rapid advancement of artificial intelligence presents both unprecedented opportunities and significant challenges for modern society. As machine learning algorithms become increasingly sophisticated, questions about privacy, employment, and ethical considerations come to the forefront. It is essential that we approach these developments with careful consideration.',
    preview: 'The rapid advancement of artificial intelligence presents both unprecedented opportunities...',
    level: 'advanced',
    author: 'Dr. Emily Chen',
    readTime: 8,
    wordCount: 720,
    createdAt: '2025-01-13',
    tags: ['technology', 'science'],
  },
  {
    id: '4',
    title: 'Gardening Basics',
    content: 'Starting a garden is easier than you think. All you need is a small space, some good soil, and a few seeds. Begin with simple plants like tomatoes or herbs. Water them regularly and make sure they get enough sunlight. Soon you will see green leaves growing. Gardening is a wonderful hobby that helps you relax.',
    preview: 'Starting a garden is easier than you think. All you need is a small space...',
    level: 'beginner',
    author: 'Mike Johnson',
    readTime: 4,
    wordCount: 350,
    createdAt: '2025-01-12',
    tags: ['nature', 'hobby'],
  },
  {
    id: '5',
    title: 'The Last Symphony',
    content: 'In the twilight of his career, the composer sat before the blank manuscript, his quill hovering uncertainly above the parchment. The weight of expectation pressed upon his shoulders like a physical force. Critics and patrons alike awaited his magnum opus, the culmination of decades spent perfecting his craft. Yet inspiration, that fickle muse, remained elusive.',
    preview: 'In the twilight of his career, the composer sat before the blank manuscript...',
    level: 'expert',
    author: 'Isabella Romano',
    readTime: 12,
    wordCount: 1200,
    createdAt: '2025-01-11',
    tags: ['literature', 'art'],
  },
  {
    id: '6',
    title: 'Travel Tips for Europe',
    content: 'Traveling through Europe on a budget requires planning, but the experiences are worth every effort. Start by booking accommodations in advance, especially during peak tourist seasons. Consider staying in hostels or using platforms that connect travelers with local hosts. Public transportation is excellent in most European cities.',
    preview: 'Traveling through Europe on a budget requires planning, but the experiences...',
    level: 'intermediate',
    author: 'Tom Williams',
    readTime: 6,
    wordCount: 580,
    createdAt: '2025-01-10',
    tags: ['travel', 'tips'],
  },
];

export const useTextsStore = create<TextsState>()(
  persist(
    (set, get) => ({
      texts: sampleTexts,
      userTexts: [],
      
      addText: (textData) => {
        const newText: Text = {
          ...textData,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
        };
        set((state) => ({
          texts: [newText, ...state.texts],
          userTexts: [newText, ...state.userTexts],
        }));
      },
      
      getTextsByLevel: (level) => {
        return get().texts.filter((text) => text.level === level);
      },
      
      getFeaturedTexts: () => {
        return get().texts.slice(0, 6);
      },
      
      deleteText: (id) => {
        set((state) => ({
          texts: state.texts.filter((t) => t.id !== id),
          userTexts: state.userTexts.filter((t) => t.id !== id),
        }));
      },
    }),
    {
      name: 'texts-storage',
      partialize: (state) => ({ userTexts: state.userTexts }),
    }
  )
);
