import { HeroSection } from '@/sections/hero';
import { LevelsSection } from '@/sections/levels';
import { HowItWorksSection } from '@/sections/how-it-works';
import { FeaturedTextsSection } from '@/sections/featured-texts';
import { StatsSection } from '@/sections/stats';
import { CTASection } from '@/sections/cta';
import { Footer } from '@/sections/footer';

export default function HomePage() {
  return (
    <>
      <main>
        <HeroSection />
        <LevelsSection />
        <HowItWorksSection />
        <FeaturedTextsSection />
        <StatsSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
