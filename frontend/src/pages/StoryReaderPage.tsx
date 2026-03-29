import { useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  ArrowLeft, Clock, FileText, Heart,
  Bookmark as BookmarkIcon, Minus, Plus, Moon, Sun,
  ChevronUp,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { useUIStore } from '@/store/ui-store';
import type { Level } from '@/types';

const levelColors: Record<Level, string> = {
  A1: 'bg-green-100 text-green-700 border-green-200',
  A2: 'bg-blue-100 text-blue-700 border-blue-200',
  B1: 'bg-orange-100 text-orange-700 border-orange-200',
  B2: 'bg-purple-100 text-purple-700 border-purple-200',
};

// Placeholder story until backend is connected
const placeholderStory = {
  id: '1',
  title: 'A Morning in Paris',
  slug: 'a-morning-in-paris',
  content: `The sun rose over the Seine, casting golden light on the ancient buildings. Marie walked along the cobblestone streets, breathing in the fresh morning air. The smell of freshly baked bread wafted from the nearby boulangerie. She stopped at her favorite café, where the barista greeted her with a warm smile.

"The usual?" he asked, already reaching for a cup.

Marie nodded. She loved this routine. Every morning, rain or shine, she would walk from her small apartment near Montmartre to this little café on Rue de Rivoli. It was her way of connecting with the city she had called home for the past three years.

As she sipped her café au lait, she watched the world wake up around her. Tourists began to appear, cameras in hand, marveling at the architecture. Local shopkeepers opened their doors, arranging displays of flowers, cheeses, and pastries.

Paris was never truly quiet, but these early mornings came close. There was a peacefulness in the routine, a rhythm that Marie had come to cherish. She pulled out her notebook and began to write, capturing the morning light in words.

The barista brought her a warm croissant without being asked. "On the house," he said with a wink. Marie smiled. These small moments of kindness were what made Paris special. Not the Eiffel Tower or the Louvre, but the people who made the city feel like home.

She finished her coffee, left a generous tip, and stepped back into the morning sun. The day was just beginning, and Paris had so much more to offer.`,
  level: 'A2' as Level,
  readingTimeMinutes: 5,
  wordCount: 450,
  author: { username: 'Sarah Mitchell' },
  tags: [{ id: '1', name: 'travel' }, { id: '2', name: 'culture' }],
  createdAt: '2025-01-15',
};

export default function StoryReaderPage() {
  const { t } = useTranslation();
  const { fontSize, setFontSize, isDarkMode, toggleDarkMode } = useUIStore();
  const contentRef = useRef<HTMLDivElement>(null);
  const [progressPercent, setProgressPercent] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const story = placeholderStory; // Will be replaced with API call

  // Track reading progress
  const handleScroll = useCallback(() => {
    if (!contentRef.current) return;
    const element = contentRef.current;
    const totalHeight = element.scrollHeight - element.clientHeight;
    const scrolled = element.scrollTop;
    const percentage = totalHeight > 0 ? Math.min((scrolled / totalHeight) * 100, 100) : 0;
    setProgressPercent(Math.round(percentage));
    setShowScrollTop(scrolled > 400);
  }, []);

  const scrollToTop = () => {
    contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Split content into paragraphs
  const paragraphs = story.content.split('\n\n');

  return (
    <div className={`min-h-screen pt-16 ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-lingua-bg'}`}>
      {/* Reading progress bar */}
      <div className="fixed top-16 left-0 right-0 z-40">
        <Progress value={progressPercent} className="h-1 rounded-none" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back link */}
        <Link
          to="/stories"
          className="inline-flex items-center gap-2 text-sm text-lingua-text-muted hover:text-lingua-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          {t('reader.back', 'Back to Stories')}
        </Link>

        {/* Story header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Badge variant="outline" className={levelColors[story.level]}>
              {story.level}
            </Badge>
            <div className="flex items-center gap-2 text-sm text-lingua-text-muted">
              <Clock className="w-4 h-4" />
              {story.readingTimeMinutes} {t('reader.min', 'min')}
            </div>
            <div className="flex items-center gap-2 text-sm text-lingua-text-muted">
              <FileText className="w-4 h-4" />
              {story.wordCount} {t('reader.words', 'words')}
            </div>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-semibold mb-4">
            {story.title}
          </h1>
          <p className="text-lingua-text-secondary">
            {t('reader.by', 'By')} <span className="font-medium">{story.author?.username}</span>
          </p>
        </header>

        {/* Reader controls */}
        <div className={`flex items-center justify-between p-4 rounded-xl mb-8 ${isDarkMode ? 'bg-gray-800' : 'bg-white shadow-card'}`}>
          <div className="flex items-center gap-2">
            <span className="text-sm text-lingua-text-muted mr-2">{t('reader.fontSize', 'Font')}</span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => setFontSize(Math.max(12, fontSize - 2))}
              disabled={fontSize <= 12}
            >
              <Minus className="w-4 h-4" />
            </Button>
            <span className="text-sm font-medium w-8 text-center">{fontSize}</span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => setFontSize(Math.min(28, fontSize + 2))}
              disabled={fontSize >= 28}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="h-8 w-8"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <Button
              variant="ghost"
              size="icon"
              className={`h-8 w-8 ${isFavorited ? 'text-red-500' : ''}`}
              onClick={() => setIsFavorited(!isFavorited)}
            >
              <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={`h-8 w-8 ${isBookmarked ? 'text-lingua-primary' : ''}`}
              onClick={() => setIsBookmarked(!isBookmarked)}
            >
              <BookmarkIcon className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </Button>
          </div>
        </div>

        {/* Story content */}
        <div
          ref={contentRef}
          className={`prose max-w-none rounded-2xl p-8 sm:p-12 leading-relaxed ${
            isDarkMode
              ? 'bg-gray-800 prose-invert'
              : 'bg-white shadow-card'
          }`}
          style={{ fontSize: `${fontSize}px`, lineHeight: 1.8 }}
          onScroll={handleScroll}
        >
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="mb-6 last:mb-0">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Story footer */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {story.tags?.map((tag) => (
              <span
                key={tag.id}
                className="text-xs text-lingua-text-muted bg-lingua-bg px-3 py-1.5 rounded-full border border-lingua-border"
              >
                #{tag.name}
              </span>
            ))}
          </div>
          <div className="text-sm text-lingua-text-muted">
            {t('reader.progress', 'Progress')}: {progressPercent}%
          </div>
        </div>
      </div>

      {/* Scroll to top */}
      {showScrollTop && (
        <Button
          variant="default"
          size="icon"
          className="fixed bottom-8 right-8 bg-lingua-primary hover:bg-lingua-primary-dark shadow-purple-lg z-50 rounded-full"
          onClick={scrollToTop}
        >
          <ChevronUp className="w-5 h-5" />
        </Button>
      )}
    </div>
  );
}
