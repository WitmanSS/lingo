import { useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/lib/i18n';
import { Navbar } from '@/components/navbar';
import { HeroSection } from '@/sections/hero';
import { LevelsSection } from '@/sections/levels';
import { HowItWorksSection } from '@/sections/how-it-works';
import { FeaturedTextsSection } from '@/sections/featured-texts';
import { StatsSection } from '@/sections/stats';
import { CTASection } from '@/sections/cta';
import { Footer } from '@/sections/footer';
import { Toaster } from '@/components/ui/sonner';
import './App.css';

function App() {
  useEffect(() => {
    // Smooth scroll for anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      if (anchor) {
        const href = anchor.getAttribute('href');
        if (href && href !== '#') {
          e.preventDefault();
          const element = document.querySelector(href);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      <div className="min-h-screen bg-lingua-bg">
        <Navbar />
        <main>
          <HeroSection />
          <LevelsSection />
          <HowItWorksSection />
          <FeaturedTextsSection />
          <StatsSection />
          <CTASection />
        </main>
        <Footer />
        <Toaster position="top-center" />
      </div>
    </I18nextProvider>
  );
}

export default App;
