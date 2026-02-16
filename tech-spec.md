# LinguaRead - Technical Specification

## Project Overview

A multi-language English reading platform with user authentication, level-based content organization, and text contribution features.

---

## Component Inventory

### shadcn/ui Components (Built-in)

| Component | Purpose | Installation |
|-----------|---------|--------------|
| Button | CTAs, actions | `npx shadcn add button` |
| Card | Text cards, level cards | `npx shadcn add card` |
| Input | Forms, search | `npx shadcn add input` |
| Label | Form labels | `npx shadcn add label` |
| Badge | Level indicators | `npx shadcn add badge` |
| Dialog | Modals, confirmations | `npx shadcn add dialog` |
| Dropdown Menu | Language selector | `npx shadcn add dropdown-menu` |
| Select | Form dropdowns | `npx shadcn add select` |
| Tabs | Content organization | `npx shadcn add tabs` |
| Textarea | Text input forms | `npx shadcn add textarea` |
| Avatar | User profiles | `npx shadcn add avatar` |
| Separator | Visual dividers | `npx shadcn add separator` |
| Sheet | Mobile navigation | `npx shadcn add sheet` |
| Toast | Notifications | `npx shadcn add toast` |
| Skeleton | Loading states | `npx shadcn add skeleton` |
| Progress | Reading progress | `npx shadcn add progress` |
| Scroll Area | Custom scroll | `npx shadcn add scroll-area` |
| Navigation Menu | Main nav | `npx shadcn add navigation-menu` |
| Form | Form handling | `npx shadcn add form` |
| Checkbox | Form inputs | `npx shadcn add checkbox` |

### Custom Components

| Component | Purpose | Location |
|-----------|---------|----------|
| Navbar | Main navigation with auth | `components/navbar.tsx` |
| HeroSection | Landing hero | `sections/hero.tsx` |
| LevelsSection | Reading levels grid | `sections/levels.tsx` |
| HowItWorks | Steps section | `sections/how-it-works.tsx` |
| FeaturedTexts | Text cards grid | `sections/featured-texts.tsx` |
| StatsSection | Statistics counters | `sections/stats.tsx` |
| CTASection | Call to action | `sections/cta.tsx` |
| Footer | Site footer | `sections/footer.tsx` |
| TextCard | Individual text card | `components/text-card.tsx` |
| LevelCard | Level selection card | `components/level-card.tsx` |
| StepItem | How it works step | `components/step-item.tsx` |
| StatCounter | Animated counter | `components/stat-counter.tsx` |
| LanguageSelector | Language dropdown | `components/language-selector.tsx` |
| AuthModal | Login/Register modal | `components/auth-modal.tsx` |
| AnimatedSection | Scroll reveal wrapper | `components/animated-section.tsx` |

---

## Animation Implementation Table

| Animation | Library | Implementation Approach | Complexity |
|-----------|---------|------------------------|------------|
| **Hero Gradient Orbs** | CSS + GSAP | Animated divs with blur, scale/opacity on entrance | Medium |
| **Hero Headline Reveal** | GSAP SplitType | Character-by-character clip reveal with rotateX | High |
| **Hero Image 3D Tilt** | CSS 3D Transforms | perspective + rotateY/rotateX on hover | Medium |
| **3D Decoration Spin** | CSS Animation | Continuous rotation animation | Low |
| **Navbar Glassmorphism** | CSS | backdrop-filter on scroll trigger | Low |
| **Nav Link Magnetic Hover** | CSS Transforms | :hover transform with transition | Low |
| **Level Cards 3D Flip** | GSAP ScrollTrigger | rotateY entrance with stagger | High |
| **Level Card Hover Lift** | CSS 3D Transforms | translateZ + rotateX on hover | Medium |
| **Connecting Path Draw** | GSAP DrawSVG | stroke-dashoffset animation on scroll | Medium |
| **Step Icons RotateIn** | GSAP | rotate + scale entrance with elastic ease | Medium |
| **Text Cards Cascade** | GSAP ScrollTrigger | Staggered rise + fade with rotateX | Medium |
| **Card Image Zoom** | CSS Transforms | scale on hover with overflow hidden | Low |
| **Stats Counter** | GSAP | innerText countUp with snap | Medium |
| **CTA Glow Pulse** | CSS Animation | box-shadow keyframe animation | Low |
| **Footer Reveal** | GSAP ScrollTrigger | Staggered fade/slide for all elements | Medium |
| **Scroll Progress** | GSAP ScrollTrigger | Progress bar at top of page | Low |
| **Button Ripple** | CSS + JS | Pseudo-element scale animation | Medium |
| **Floating Elements** | CSS Animation | translateY keyframes with different timings | Low |

---

## Animation Library Choices

### Primary: GSAP + ScrollTrigger
**Rationale:**
- Industry-standard for complex scroll animations
- Excellent performance with transform/opacity
- Precise control over timing and easing
- ScrollTrigger for scroll-linked animations

**Usage:**
- Section entrance animations
- Scroll-linked effects
- Complex choreography
- Counter animations

### Secondary: CSS Animations/Transitions
**Rationale:**
- Best performance for simple effects
- No JavaScript overhead
- Hardware accelerated

**Usage:**
- Hover states
- Continuous ambient animations
- Simple transitions
- Micro-interactions

### Utilities
- **SplitType**: Text splitting for character/word animations
- **Intersection Observer**: Triggering animations on visibility

---

## Project File Structure

```
/mnt/okcomputer/output/app/
├── public/
│   ├── images/
│   │   ├── hero-illustration.jpg
│   │   ├── 3d-decoration.png
│   │   └── ...
│   └── locales/
│       ├── az.json
│       ├── en.json
│       ├── ru.json
│       └── tr.json
├── src/
│   ├── components/
│   │   ├── ui/                    # shadcn components
│   │   ├── navbar.tsx
│   │   ├── text-card.tsx
│   │   ├── level-card.tsx
│   │   ├── step-item.tsx
│   │   ├── stat-counter.tsx
│   │   ├── language-selector.tsx
│   │   ├── auth-modal.tsx
│   │   └── animated-section.tsx
│   ├── sections/
│   │   ├── hero.tsx
│   │   ├── levels.tsx
│   │   ├── how-it-works.tsx
│   │   ├── featured-texts.tsx
│   │   ├── stats.tsx
│   │   ├── cta.tsx
│   │   └── footer.tsx
│   ├── hooks/
│   │   ├── use-scroll-animation.ts
│   │   ├── use-auth.ts
│   │   └── use-language.ts
│   ├── lib/
│   │   ├── utils.ts
│   │   ├── i18n.ts
│   │   └── animations.ts
│   ├── store/
│   │   ├── auth-store.ts
│   │   └── texts-store.ts
│   ├── types/
│   │   └── index.ts
│   ├── data/
│   │   └── texts.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── vite.config.ts
```

---

## Dependencies

### Core
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0"
  }
}
```

### Animation
```json
{
  "dependencies": {
    "gsap": "^3.12.5",
    "@gsap/react": "^2.1.0",
    "split-type": "^0.3.4"
  }
}
```

### State Management & Utils
```json
{
  "dependencies": {
    "zustand": "^4.4.7",
    "i18next": "^23.7.6",
    "react-i18next": "^13.5.0",
    "i18next-browser-languagedetector": "^7.2.0"
  }
}
```

### UI & Icons
```json
{
  "dependencies": {
    "lucide-react": "latest",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.0.0",
    "tailwind-merge": "^2.0.0"
  }
}
```

---

## Installation Commands

```bash
# Initialize project
bash /app/.kimi/skills/webapp-building/scripts/init-webapp.sh "LinguaRead"

# Install shadcn components
cd /mnt/okcomputer/output/app
npx shadcn add button card input label badge dialog dropdown-menu select tabs textarea avatar separator sheet toast skeleton progress scroll-area navigation-menu form checkbox

# Install animation libraries
npm install gsap @gsap/react split-type

# Install state management & i18n
npm install zustand i18next react-i18next i18next-browser-languagedetector
```

---

## Key Implementation Details

### GSAP Setup
```typescript
// lib/animations.ts
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const initScrollAnimations = () => {
  // Global scroll trigger defaults
  ScrollTrigger.defaults({
    toggleActions: 'play none none reverse',
  });
};

export const createEntranceAnimation = (
  element: HTMLElement,
  options: {
    y?: number;
    opacity?: number;
    duration?: number;
    delay?: number;
    ease?: string;
  } = {}
) => {
  const {
    y = 40,
    opacity = 0,
    duration = 0.6,
    delay = 0,
    ease = 'expo.out',
  } = options;

  return gsap.fromTo(
    element,
    { y, opacity },
    { y: 0, opacity: 1, duration, delay, ease }
  );
};
```

### Scroll Animation Hook
```typescript
// hooks/use-scroll-animation.ts
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useScrollAnimation = (
  animationCallback: (element: HTMLElement) => gsap.core.Tween | gsap.core.Timeline,
  deps: unknown[] = []
) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Tween | gsap.core.Timeline | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      animationRef.current = animationCallback(element);
    }, element);

    return () => {
      ctx.revert();
    };
  }, deps);

  return elementRef;
};
```

### i18n Configuration
```typescript
// lib/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import az from '../public/locales/az.json';
import en from '../public/locales/en.json';
import ru from '../public/locales/ru.json';
import tr from '../public/locales/tr.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      az: { translation: az },
      en: { translation: en },
      ru: { translation: ru },
      tr: { translation: tr },
    },
    fallbackLng: 'az',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
```

### Zustand Auth Store
```typescript
// store/auth-store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: async (email, password) => {
        // Mock login - replace with actual API
        const mockUser = {
          id: '1',
          name: 'Test User',
          email,
        };
        set({ user: mockUser, isAuthenticated: true });
      },
      register: async (name, email, password) => {
        // Mock register - replace with actual API
        const mockUser = {
          id: '1',
          name,
          email,
        };
        set({ user: mockUser, isAuthenticated: true });
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
```

---

## Performance Optimizations

1. **will-change Management**
   - Apply before animation starts
   - Remove after animation completes
   - Use sparingly on key animated elements

2. **ScrollTrigger Cleanup**
   - Always use gsap.context() for cleanup
   - Kill triggers on component unmount
   - Use `refreshPriority` for complex layouts

3. **Animation Batching**
   - Group similar animations
   - Use timelines for choreographed sequences
   - Stagger instead of individual delays

4. **Reduced Motion Support**
   ```css
   @media (prefers-reduced-motion: reduce) {
     *, *::before, *::after {
       animation-duration: 0.01ms !important;
       transition-duration: 0.01ms !important;
     }
   }
   ```

5. **Lazy Loading**
   - Defer non-critical animations
   - Use Intersection Observer for triggering
   - Load GSAP plugins on demand

---

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**Fallbacks:**
- CSS animations for simple effects
- Static layouts for no-JS
- Reduced motion for accessibility
