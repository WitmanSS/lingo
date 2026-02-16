import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';

export function HeroSection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const orb3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline for entrance animations
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

      // Gradient orbs entrance
      tl.fromTo(
        orb1Ref.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 0.6, duration: 1.5 },
        0
      );
      tl.fromTo(
        orb2Ref.current,
        { scale: 0, opacity: 0 },
        { scale: 1.2, opacity: 0.4, duration: 1.5 },
        0.2
      );
      tl.fromTo(
        orb3Ref.current,
        { scale: 0, opacity: 0 },
        { scale: 0.8, opacity: 0.5, duration: 1.5 },
        0.4
      );

      // Headline animation
      tl.fromTo(
        headlineRef.current?.querySelectorAll('.headline-line') || [],
        { y: 40, opacity: 0, clipPath: 'inset(100% 0 0 0)' },
        {
          y: 0,
          opacity: 1,
          clipPath: 'inset(0% 0 0 0)',
          duration: 0.8,
          stagger: 0.15,
        },
        0.3
      );

      // Description
      tl.fromTo(
        descRef.current,
        { y: 30, opacity: 0, filter: 'blur(10px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.6 },
        0.8
      );

      // CTA buttons
      tl.fromTo(
        ctaRef.current?.querySelectorAll('button') || [],
        { y: 30, scale: 0.9, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'elastic.out(1, 0.5)' },
        1
      );

      // Stats
      tl.fromTo(
        statsRef.current?.querySelectorAll('.stat-item') || [],
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.08 },
        1.2
      );

      // Hero image
      tl.fromTo(
        imageRef.current,
        { rotateY: -15, rotateX: 5, opacity: 0 },
        { rotateY: 0, rotateX: 0, opacity: 1, duration: 1.2 },
        0.5
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden"
      style={{ perspective: '1200px' }}
    >
      {/* Animated Gradient Orbs */}
      <div
        ref={orb1Ref}
        className="absolute top-20 left-10 w-96 h-96 rounded-full bg-lingua-primary/30 blur-3xl animate-float-slow"
        style={{ animationDuration: '20s' }}
      />
      <div
        ref={orb2Ref}
        className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-lingua-accent/40 blur-3xl animate-float"
        style={{ animationDuration: '15s', animationDelay: '-5s' }}
      />
      <div
        ref={orb3Ref}
        className="absolute top-1/2 left-1/3 w-64 h-64 rounded-full bg-lingua-secondary/20 blur-3xl animate-float-slow"
        style={{ animationDuration: '18s', animationDelay: '-10s' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            {/* Headline */}
            <div ref={headlineRef} className="space-y-2">
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold leading-tight">
                <span className="headline-line block">{t('hero.title1')}</span>
                <span className="headline-line block">
                  {t('hero.title2').split(t('hero.highlight'))[0]}
                  <span className="text-gradient">{t('hero.highlight')}</span>
                </span>
              </h1>
            </div>

            {/* Description */}
            <p
              ref={descRef}
              className="text-lg text-lingua-text-secondary max-w-xl leading-relaxed"
            >
              {t('hero.description')}
            </p>

            {/* CTA Buttons */}
            <div ref={ctaRef} className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-gradient-primary text-white hover:opacity-90 px-8 py-6 text-lg font-medium group transition-all duration-300 hover:shadow-purple-lg hover:-translate-y-1"
              >
                {t('hero.startReading')}
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-lingua-border hover:border-lingua-primary hover:text-lingua-primary px-8 py-6 text-lg font-medium transition-all duration-300 hover:-translate-y-1"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                {t('hero.addYourText')}
              </Button>
            </div>

            {/* Stats */}
            <div
              ref={statsRef}
              className="flex flex-wrap gap-8 pt-4"
            >
              <div className="stat-item">
                <p className="text-2xl font-display font-bold text-lingua-primary">
                  500+
                </p>
                <p className="text-sm text-lingua-text-muted">
                  {t('hero.stats.texts')}
                </p>
              </div>
              <div className="stat-item">
                <p className="text-2xl font-display font-bold text-lingua-primary">
                  4
                </p>
                <p className="text-sm text-lingua-text-muted">
                  {t('hero.stats.levels')}
                </p>
              </div>
              <div className="stat-item">
                <p className="text-2xl font-display font-bold text-lingua-primary">
                  10K+
                </p>
                <p className="text-sm text-lingua-text-muted">
                  {t('hero.stats.learners')}
                </p>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div
            ref={imageRef}
            className="relative hidden lg:block preserve-3d"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="relative animate-float" style={{ animationDuration: '6s' }}>
              <img
                src="/images/hero-illustration.jpg"
                alt="Learning illustration"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
              {/* 3D Decoration */}
              <div
                className="absolute -bottom-10 -right-10 w-40 h-40 animate-spin-slow"
                style={{ animationDuration: '60s' }}
              >
                <img
                  src="/images/3d-decoration.png"
                  alt=""
                  className="w-full h-full object-contain opacity-80"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
