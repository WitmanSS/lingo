import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const statsData = [
  { key: 'texts', value: 500, suffix: '+' },
  { key: 'learners', value: 10000, suffix: '+' },
  { key: 'textsRead', value: 50000, suffix: '+' },
  { key: 'levels', value: 4, suffix: '' },
];

export function StatsSection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const statItems = statsRef.current?.querySelectorAll('.stat-item');
      
      if (statItems) {
        statItems.forEach((item, index) => {
          const numberEl = item.querySelector('.stat-number');
          const labelEl = item.querySelector('.stat-label');
          const data = statsData[index];

          // Counter animation
          if (numberEl) {
            const counterObj = { value: 0 };
            gsap.to(counterObj, {
              value: data.value,
              duration: 1.5,
              ease: 'expo.out',
              scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
              },
              onUpdate: () => {
                const formatted = Math.round(counterObj.value).toLocaleString();
                numberEl.textContent = formatted + data.suffix;
              },
            });
          }

          // Label animation
          gsap.fromTo(
            labelEl,
            { y: 15, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.4,
              ease: 'expo.out',
              scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
              },
              delay: 0.2,
            }
          );
        });

        // Connecting lines animation
        const lines = statsRef.current?.querySelectorAll('.connecting-line');
        if (lines) {
          gsap.fromTo(
            lines,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 1,
              ease: 'expo.out',
              stagger: 0.1,
              scrollTrigger: {
                trigger: statsRef.current,
                start: 'top 75%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-lingua-primary/5 via-lingua-accent/10 to-lingua-primary/5" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div
          ref={statsRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4"
        >
          {statsData.map((stat, index) => (
            <div key={stat.key} className="relative">
              {/* Stat Item */}
              <div className="stat-item text-center py-8">
                <p className="stat-number font-display text-4xl sm:text-5xl font-bold text-lingua-primary mb-2 animate-scale-pulse">
                  0{stat.suffix}
                </p>
                <p className="stat-label text-sm sm:text-base text-lingua-text-secondary font-medium">
                  {t(`stats.${stat.key}`)}
                </p>
              </div>

              {/* Connecting Line (not on last item or mobile) */}
              {index < statsData.length - 1 && (
                <div
                  className="connecting-line hidden lg:block absolute top-1/2 right-0 w-full h-px bg-gradient-to-r from-lingua-primary/30 to-transparent origin-left"
                  style={{ transform: 'translateX(50%)' }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
