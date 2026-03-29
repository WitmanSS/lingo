import { useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Filter, BookOpen, Clock, FileText, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import api from '@/lib/api';
import type { Level, StoryListItem } from '@/types';

const levelColors: Record<Level, string> = {
  A1: 'bg-green-100 text-green-700 border-green-200',
  A2: 'bg-blue-100 text-blue-700 border-blue-200',
  B1: 'bg-orange-100 text-orange-700 border-orange-200',
  B2: 'bg-purple-100 text-purple-700 border-purple-200',
};

// Placeholder data until backend is connected
const placeholderStories: StoryListItem[] = [
  {
    id: '1',
    title: 'A Morning in Paris',
    slug: 'a-morning-in-paris',
    level: 'A2',
    readingTimeMinutes: 5,
    wordCount: 450,
    author: { username: 'Sarah Mitchell' },
    tags: [{ id: '1', name: 'travel' }, { id: '2', name: 'culture' }],
    createdAt: '2025-01-15',
  },
  {
    id: '2',
    title: 'The Little Cafe',
    slug: 'the-little-cafe',
    level: 'A1',
    readingTimeMinutes: 3,
    wordCount: 280,
    author: { username: 'John Parker' },
    tags: [{ id: '3', name: 'daily life' }, { id: '4', name: 'food' }],
    createdAt: '2025-01-14',
  },
  {
    id: '3',
    title: 'Technology and Society',
    slug: 'technology-and-society',
    level: 'B1',
    readingTimeMinutes: 8,
    wordCount: 720,
    author: { username: 'Dr. Emily Chen' },
    tags: [{ id: '5', name: 'technology' }, { id: '6', name: 'science' }],
    createdAt: '2025-01-13',
  },
  {
    id: '4',
    title: 'Gardening Basics',
    slug: 'gardening-basics',
    level: 'A1',
    readingTimeMinutes: 4,
    wordCount: 350,
    author: { username: 'Mike Johnson' },
    tags: [{ id: '7', name: 'nature' }, { id: '8', name: 'hobby' }],
    createdAt: '2025-01-12',
  },
  {
    id: '5',
    title: 'The Last Symphony',
    slug: 'the-last-symphony',
    level: 'B2',
    readingTimeMinutes: 12,
    wordCount: 1200,
    author: { username: 'Isabella Romano' },
    tags: [{ id: '9', name: 'literature' }, { id: '10', name: 'art' }],
    createdAt: '2025-01-11',
  },
  {
    id: '6',
    title: 'Travel Tips for Europe',
    slug: 'travel-tips-for-europe',
    level: 'A2',
    readingTimeMinutes: 6,
    wordCount: 580,
    author: { username: 'Tom Williams' },
    tags: [{ id: '1', name: 'travel' }, { id: '11', name: 'tips' }],
    createdAt: '2025-01-10',
  },
];

export default function StoriesPage() {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [levelFilter, setLevelFilter] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(false);
  const [stories, setStories] = useState<StoryListItem[]>(placeholderStories);
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [level, setLevel] = useState<Level>('A1');
  const [message, setMessage] = useState('');

  const filteredStories = stories.filter((story) => {
    const matchesSearch = story.title.toLowerCase().includes(search.toLowerCase());
    const matchesLevel = levelFilter === 'all' || story.level === levelFilter;
    return matchesSearch && matchesLevel;
  });

  const submitStory = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!author.trim() || !title.trim() || !content.trim()) {
      setMessage('Username, title, and content are required.');
      return;
    }

    try {
      setIsLoading(true);
      const response = await api.post('/stories', {
        username: author.trim(),
        title: title.trim(),
        content: content.trim(),
        level,
      });

      const newStory = response.data as StoryListItem;
      setStories([newStory, ...stories]);
      setMessage('Story added successfully!');
      setAuthor('');
      setTitle('');
      setContent('');
      setLevel('A1');
    } catch (error) {
      setMessage('Failed to add story. Please try again.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const addRandomStory = async () => {
    const randomStory = {
      username: 'DemoUser',
      title: 'Random Thought on Language',
      content: 'Language is a bridge between thoughts and people. Each word shapes the story we tell ourselves and others.',
      level: 'A2' as Level,
    };
    try {
      setIsLoading(true);
      const response = await api.post('/stories', randomStory);
      const newStory = response.data as StoryListItem;
      setStories([newStory, ...stories]);
      setMessage('Random story added!');
    } catch (error) {
      setMessage('Failed to add random story.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="font-display text-4xl sm:text-5xl font-semibold mb-4">
            {t('stories.title', 'Explore Stories')}
          </h1>
          <p className="text-lg text-lingua-text-secondary max-w-2xl">
            {t('stories.subtitle', 'Choose a story that matches your level and start reading.')}
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-lingua-text-muted" />
            <Input
              placeholder={t('stories.search', 'Search stories...')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={levelFilter} onValueChange={setLevelFilter}>
            <SelectTrigger className="w-[180px]">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('stories.allLevels', 'All Levels')}</SelectItem>
              <SelectItem value="A1">A1 — Beginner</SelectItem>
              <SelectItem value="A2">A2 — Elementary</SelectItem>
              <SelectItem value="B1">B1 — Intermediate</SelectItem>
              <SelectItem value="B2">B2 — Upper Intermediate</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Create Story Form */}
        <div className="mb-8 rounded-xl border border-lingua-border p-6 bg-white">
          <h2 className="text-xl font-semibold mb-4">{t('stories.addNew', 'Add New Story')}</h2>
          <form onSubmit={submitStory} className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Input placeholder={t('stories.form.username', 'Username')} value={author} onChange={(e) => setAuthor(e.target.value)} />
              <Input placeholder={t('stories.form.title', 'Title')} value={title} onChange={(e) => setTitle(e.target.value)} />
              <Select value={level} onValueChange={(value) => setLevel(value as Level)}>
                <SelectTrigger>
                  <SelectValue placeholder={t('stories.form.level', 'Level')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A1">A1</SelectItem>
                  <SelectItem value="A2">A2</SelectItem>
                  <SelectItem value="B1">B1</SelectItem>
                  <SelectItem value="B2">B2</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={t('stories.form.content', 'Story content...')}
              className="w-full rounded-lg border border-lingua-border p-3 min-h-[120px]"
            />
            <div className="flex gap-3 items-center">
              <button type="submit" className="btn btn-primary" disabled={isLoading}>
                {isLoading ? t('stories.form.submitting', 'Submitting...') : t('stories.form.submit', 'Submit')}
              </button>
              <button type="button" className="btn btn-secondary" onClick={addRandomStory} disabled={isLoading}>
                {t('stories.form.addRandom', 'Add Random Story')}
              </button>
            </div>
            {message && <p className="text-sm text-lingua-text-muted">{message}</p>}
          </form>
        </div>

        {/* Stories Grid */}
        {isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-card">
                <Skeleton className="h-5 w-20 mb-4" />
                <Skeleton className="h-7 w-3/4 mb-3" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3 mb-4" />
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStories.map((story) => (
              <a
                key={story.id}
                href={`/stories/${story.slug}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 cursor-pointer block"
              >
                <div className="p-6">
                  <Badge variant="outline" className={`mb-4 ${levelColors[story.level]}`}>
                    {story.level}
                  </Badge>
                  <h3 className="font-display text-xl font-semibold mb-3 group-hover:text-lingua-primary transition-colors duration-300 line-clamp-2">
                    {story.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {story.tags?.map((tag) => (
                      <span key={tag.id} className="text-xs text-lingua-text-muted bg-lingua-bg px-2 py-1 rounded-full">
                        #{tag.name}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-sm text-lingua-text-muted">
                    <span className="font-medium">{story.author?.username}</span>
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {story.readingTimeMinutes}m
                      </span>
                      <span className="flex items-center gap-1">
                        <FileText className="w-4 h-4" />
                        {story.wordCount}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="px-6 py-4 border-t border-lingua-border/50 bg-lingua-bg/50 group-hover:bg-lingua-primary/5 transition-colors duration-300">
                  <span className="text-sm font-medium text-lingua-primary flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
                    {t('stories.read', 'Read Story')}
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        )}

        {filteredStories.length === 0 && !isLoading && (
          <div className="text-center py-16">
            <BookOpen className="w-16 h-16 text-lingua-text-muted mx-auto mb-4" />
            <h3 className="font-display text-xl font-semibold mb-2">
              {t('stories.noResults', 'No stories found')}
            </h3>
            <p className="text-lingua-text-secondary">
              {t('stories.noResultsDesc', 'Try adjusting your filters or search query.')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
