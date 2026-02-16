import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Sprout, BookOpen, GraduationCap, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const levelData = [
  {
    id: 'beginner' as const,
    icon: Sprout,
    color: '#4caf50',
  },
  {
    id: 'intermediate' as const,
    icon: BookOpen,
    color: '#2196f3',
  },
  {
    id: 'advanced' as const,
    icon: GraduationCap,
    color: '#ff9800',
  },
  {
    id: 'expert' as const,
    icon: Star,
    color: '#9c27b0',
  },
];

export function LevelsSection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards animation with 3D flip
      const cards = cardsRef.current?.querySelectorAll('.level-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { rotateY: -90, y: 60, opacity: 0 },
          {
            rotateY: 0,
            y: 0,
            opacity: 1,
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

        // Icon animation after card appears
        cards.forEach((card, index) => {
          const icon = card.querySelector('.level-icon');
          gsap.fromTo(
            icon,
            { scale: 0, rotate: -180 },
            {
              scale: 1,
              rotate: 0,
              duration: 0.5,
              ease: 'elastic.out(1, 0.5)',
              scrollTrigger: {
                trigger: card,
                start: 'top 70%',
                toggleActions: 'play none none reverse',
              },
              delay: 0.2 + index * 0.12,
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="texts"
      className="py-24 relative"
      style={{ perspective: '1000px' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="font-display text-4xl sm:text-5xl font-semibold mb-4">
            {t('levels.title')}
          </h2>
          <p className="text-lg text-lingua-text-secondary max-w-2xl mx-auto">
            {t('levels.subtitle')}
          </p>
          <div className="w-24 h-1 bg-gradient-primary mx-auto mt-6 rounded-full" />
        </div>

        {/* Level Cards */}
        <div
          ref={cardsRef}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {levelData.map((level, index) => {
            const Icon = level.icon;
            return (
              <div
                key={level.id}
                className="level-card group relative bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-500 cursor-pointer preserve-3d"
                style={{
                  transformStyle: 'preserve-3d',
                  marginTop: index % 2 === 1 ? '-10px' : '0',
                }}
              >
                {/* Hover gradient overlay */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${level.color}10 0%, transparent 100%)`,
                  }}
                />

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div
                    className="level-icon w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6"
                    style={{ backgroundColor: `${level.color}20` }}
                  >
                    <Icon
                      className="w-7 h-7 transition-colors duration-300"
                      style={{ color: level.color }}
                    />
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-xl font-semibold mb-2">
                    {t(`levels.${level.id}.title`)}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-lingua-text-secondary mb-4 leading-relaxed">
                    {t(`levels.${level.id}.description`)}
                  </p>

                  {/* Text Count */}
                  <p
                    className="text-sm font-medium mb-5"
                    style={{ color: level.color }}
                  >
                    {t(`levels.${level.id}.count`)}
                  </p>

                  {/* CTA Button */}
                  <Button
                    variant="ghost"
                    className="p-0 h-auto font-medium group/btn hover:bg-transparent"
                    style={{ color: level.color }}
                  >
                    {t(`levels.${level.id}.cta`)}
                    <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </div>

                {/* Border glow on hover */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    boxShadow: `0 0 0 2px ${level.color}40, 0 20px 40px ${level.color}20`,
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
