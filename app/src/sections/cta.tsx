import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function CTASection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const decor1Ref = useRef<HTMLDivElement>(null);
  const decor2Ref = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Decorative shapes
      gsap.fromTo(
        decor1Ref.current,
        { y: 50, rotate: -30, opacity: 0 },
        {
          y: 0,
          rotate: 0,
          opacity: 0.3,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        decor2Ref.current,
        { y: 50, rotate: 30, opacity: 0 },
        {
          y: 0,
          rotate: 0,
          opacity: 0.3,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
          delay: 0.2,
        }
      );

      // Headline animation
      if (headlineRef.current) {
        gsap.fromTo(
          headlineRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
            delay: 0.3,
          }
        );
      }

      // Description animation
      if (descriptionRef.current) {
        gsap.fromTo(
          descriptionRef.current,
          { y: 25, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
            delay: 0.5,
          }
        );
      }

      // Buttons animation
      if (buttonsRef.current) {
        gsap.fromTo(
          buttonsRef.current.children,
          { scale: 0.9, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: 'elastic.out(1, 0.5)',
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
            delay: 0.7,
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-lingua-primary via-lingua-secondary to-lingua-primary-dark" />

      {/* Decorative shapes */}
      <div
        ref={decor1Ref}
        className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-white/10 blur-3xl animate-float-slow"
      />
      <div
        ref={decor2Ref}
        className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-white/10 blur-3xl animate-float"
        style={{ animationDelay: '-3s' }}
      />

      {/* Floating sparkles */}
      <div className="absolute top-1/4 left-1/4 animate-float" style={{ animationDuration: '4s' }}>
        <Sparkles className="w-6 h-6 text-white/30" />
      </div>
      <div className="absolute bottom-1/3 right-1/4 animate-float" style={{ animationDuration: '5s', animationDelay: '-2s' }}>
        <Sparkles className="w-8 h-8 text-white/20" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div ref={contentRef} className="text-center">
          {/* Headline */}
          <h2 ref={headlineRef} className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            {t('cta.title')}
          </h2>

          {/* Description */}
          <p ref={descriptionRef} className="text-lg sm:text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            {t('cta.description')}
          </p>

          {/* Buttons */}
          <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-lingua-primary hover:bg-white/90 px-8 py-6 text-lg font-semibold animate-pulse-glow"
            >
              {t('cta.primary')}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white/50 text-white hover:bg-white/10 hover:border-white px-8 py-6 text-lg font-semibold"
            >
              {t('cta.secondary')}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
