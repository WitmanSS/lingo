import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Clock, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTextsStore, type Level } from '@/store/texts-store';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const levelColors: Record<Level, string> = {
  beginner: 'bg-green-100 text-green-700 border-green-200',
  intermediate: 'bg-blue-100 text-blue-700 border-blue-200',
  advanced: 'bg-orange-100 text-orange-700 border-orange-200',
  expert: 'bg-purple-100 text-purple-700 border-purple-200',
};

export function FeaturedTextsSection() {
  const { t } = useTranslation();
  const { getFeaturedTexts } = useTextsStore();
  const texts = getFeaturedTexts();

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current?.querySelectorAll('.header-item') || [],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards animation
      const cards = cardsRef.current?.querySelectorAll('.text-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 80, opacity: 0, rotateX: 10 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          ref={headerRef}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12"
        >
          <div className="header-item">
            <h2 className="font-display text-4xl sm:text-5xl font-semibold mb-2">
              {t('featuredTexts.title')}
            </h2>
            <p className="text-lg text-lingua-text-secondary">
              {t('featuredTexts.subtitle')}
            </p>
          </div>
          <Button
            variant="ghost"
            className="header-item text-lingua-primary hover:text-lingua-primary-dark group self-start sm:self-auto"
          >
            {t('featuredTexts.viewAll')}
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

        {/* Text Cards Grid */}
        <div
          ref={cardsRef}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          style={{ perspective: '1000px' }}
        >
          {texts.map((text) => (
            <article
              key={text.id}
              className="text-card group bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 cursor-pointer"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Card Content */}
              <div className="p-6">
                {/* Level Badge */}
                <Badge
                  variant="outline"
                  className={`mb-4 ${levelColors[text.level]}`}
                >
                  {t(`levelsNames.${text.level}`)}
                </Badge>

                {/* Title */}
                <h3 className="font-display text-xl font-semibold mb-3 group-hover:text-lingua-primary transition-colors duration-300 line-clamp-2">
                  {text.title}
                </h3>

                {/* Preview */}
                <p className="text-sm text-lingua-text-secondary mb-4 line-clamp-3 leading-relaxed">
                  {text.preview}
                </p>

                {/* Meta */}
                <div className="flex items-center justify-between text-sm text-lingua-text-muted">
                  <span className="font-medium">{text.author}</span>
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {text.readTime} {t('featuredTexts.readTime')}
                    </span>
                    <span className="flex items-center gap-1">
                      <FileText className="w-4 h-4" />
                      {text.wordCount} {t('featuredTexts.words')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Read More Footer */}
              <div className="px-6 py-4 border-t border-lingua-border/50 bg-lingua-bg/50 group-hover:bg-lingua-primary/5 transition-colors duration-300">
                <span className="text-sm font-medium text-lingua-primary flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
                  {t('featuredTexts.readMore')}
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
