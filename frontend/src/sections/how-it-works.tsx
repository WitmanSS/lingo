import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Layers, BookOpen, BarChart3, PlusCircle } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stepsData = [
  { id: '1', icon: Layers },
  { id: '2', icon: BookOpen },
  { id: '3', icon: BarChart3 },
  { id: '4', icon: PlusCircle },
];

export function HowItWorksSection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

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

      // Path draw animation
      if (pathRef.current) {
        const pathLength = pathRef.current.getTotalLength();
        gsap.set(pathRef.current, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
        });

        gsap.to(pathRef.current, {
          strokeDashoffset: 0,
          duration: 2,
          ease: 'none',
          scrollTrigger: {
            trigger: stepsRef.current,
            start: 'top 70%',
            end: 'bottom 30%',
            scrub: 1,
          },
        });
      }

      // Steps animation
      const steps = stepsRef.current?.querySelectorAll('.step-item');
      if (steps) {
        steps.forEach((step, index) => {
          const icon = step.querySelector('.step-icon');
          const content = step.querySelector('.step-content');
          const isEven = index % 2 === 1;

          // Icon animation
          gsap.fromTo(
            icon,
            { scale: 0, rotate: isEven ? 45 : -45 },
            {
              scale: 1,
              rotate: 0,
              duration: 0.6,
              ease: 'elastic.out(1, 0.5)',
              scrollTrigger: {
                trigger: step,
                start: 'top 75%',
                toggleActions: 'play none none reverse',
              },
            }
          );

          // Content animation
          gsap.fromTo(
            content,
            { x: isEven ? -60 : 60, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.5,
              ease: 'expo.out',
              scrollTrigger: {
                trigger: step,
                start: 'top 75%',
                toggleActions: 'play none none reverse',
              },
              delay: 0.1,
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-lingua-accent/5 to-transparent" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-20">
          <h2 className="font-display text-4xl sm:text-5xl font-semibold mb-4">
            {t('howItWorks.title')}
          </h2>
          <p className="text-lg text-lingua-text-secondary max-w-2xl mx-auto">
            {t('howItWorks.subtitle')}
          </p>
        </div>

        {/* Steps */}
        <div ref={stepsRef} className="relative">
          {/* Connecting Path (Desktop) */}
          <svg
            className="absolute left-1/2 top-0 h-full w-4 -translate-x-1/2 hidden lg:block"
            viewBox="0 0 4 800"
            preserveAspectRatio="none"
          >
            <path
              ref={pathRef}
              d="M2 0 L2 800"
              stroke="url(#pathGradient)"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#6261d9" />
                <stop offset="50%" stopColor="#b8b7ec" />
                <stop offset="100%" stopColor="#6261d9" />
              </linearGradient>
            </defs>
          </svg>

          {/* Steps List */}
          <div className="space-y-16 lg:space-y-24">
            {stepsData.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 1;

              return (
                <div
                  key={step.id}
                  className={`step-item flex flex-col lg:flex-row items-center gap-8 ${
                    isEven ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Icon */}
                  <div className="step-icon flex-shrink-0 w-20 h-20 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-purple-lg animate-scale-pulse">
                    <Icon className="w-10 h-10 text-white" />
                  </div>

                  {/* Content */}
                  <div
                    className={`step-content flex-1 text-center ${
                      isEven ? 'lg:text-right' : 'lg:text-left'
                    }`}
                  >
                    <div
                      className={`inline-flex items-center gap-3 mb-3 ${
                        isEven ? 'lg:flex-row-reverse' : ''
                      }`}
                    >
                      <span className="w-8 h-8 rounded-full bg-lingua-accent/30 flex items-center justify-center text-sm font-bold text-lingua-primary">
                        {step.id}
                      </span>
                      <h3 className="font-display text-2xl font-semibold">
                        {t(`howItWorks.steps.${step.id}.title`)}
                      </h3>
                    </div>
                    <p className="text-lingua-text-secondary leading-relaxed max-w-md mx-auto lg:mx-0">
                      {t(`howItWorks.steps.${step.id}.description`)}
                    </p>
                  </div>

                  {/* Spacer for alignment */}
                  <div className="hidden lg:block flex-1" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
