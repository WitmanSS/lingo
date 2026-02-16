import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Easing functions
export const easings = {
  expoOut: 'expo.out',
  expoIn: 'expo.in',
  elastic: 'elastic.out(1, 0.5)',
  smooth: 'power2.out',
  dramatic: 'power4.out',
  bounce: 'back.out(1.7)',
  liquid: 'power3.out',
};

// Create entrance animation
export const createEntranceAnimation = (
  element: HTMLElement | string,
  options: {
    y?: number;
    x?: number;
    opacity?: number;
    scale?: number;
    rotateX?: number;
    rotateY?: number;
    duration?: number;
    delay?: number;
    ease?: string;
    stagger?: number;
  } = {}
) => {
  const {
    y = 40,
    x = 0,
    opacity = 0,
    scale = 1,
    rotateX = 0,
    rotateY = 0,
    duration = 0.6,
    delay = 0,
    ease = easings.expoOut,
    stagger = 0,
  } = options;

  const fromVars: gsap.TweenVars = {
    y,
    x,
    opacity,
    scale,
    rotateX,
    rotateY,
  };

  const toVars: gsap.TweenVars = {
    y: 0,
    x: 0,
    opacity: 1,
    scale: 1,
    rotateX: 0,
    rotateY: 0,
    duration,
    delay,
    ease,
    stagger,
  };

  return gsap.fromTo(element, fromVars, toVars);
};

// Create scroll-triggered animation
export const createScrollAnimation = (
  element: HTMLElement | string,
  options: {
    trigger?: HTMLElement | string;
    start?: string;
    end?: string;
    scrub?: boolean | number;
    markers?: boolean;
    toggleActions?: string;
    animation?: gsap.TweenVars;
    from?: gsap.TweenVars;
    to?: gsap.TweenVars;
  } = {}
) => {
  const {
    trigger = element,
    start = 'top 80%',
    end = 'bottom 20%',
    scrub = false,
    markers = false,
    toggleActions = 'play none none reverse',
    from = { y: 40, opacity: 0 },
    to = { y: 0, opacity: 1, duration: 0.6, ease: easings.expoOut },
  } = options;

  const tween = gsap.fromTo(element, from, {
    ...to,
    scrollTrigger: {
      trigger,
      start,
      end,
      scrub,
      markers,
      toggleActions,
    },
  });

  return tween;
};

// Counter animation
export const animateCounter = (
  element: HTMLElement,
  targetValue: number,
  duration: number = 1.5,
  suffix: string = ''
) => {
  const obj = { value: 0 };
  
  return gsap.to(obj, {
    value: targetValue,
    duration,
    ease: easings.expoOut,
    onUpdate: () => {
      element.textContent = Math.round(obj.value).toLocaleString() + suffix;
    },
  });
};

// Stagger children animation
export const staggerChildren = (
  parent: HTMLElement | string,
  childrenSelector: string,
  options: {
    y?: number;
    opacity?: number;
    duration?: number;
    stagger?: number;
    delay?: number;
  } = {}
) => {
  const {
    y = 30,
    opacity = 0,
    duration = 0.5,
    stagger = 0.1,
    delay = 0,
  } = options;

  const children = gsap.utils.toArray<HTMLElement>(
    typeof parent === 'string' 
      ? `${parent} ${childrenSelector}` 
      : childrenSelector
  );

  return gsap.fromTo(
    children,
    { y, opacity },
    { y: 0, opacity: 1, duration, stagger, delay, ease: easings.expoOut }
  );
};

// Parallax effect
export const createParallax = (
  element: HTMLElement | string,
  speed: number = 0.5
) => {
  return gsap.to(element, {
    y: () => speed * 100,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  });
};

// Clean up all ScrollTriggers
export const cleanupScrollTriggers = () => {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
};

// Refresh ScrollTrigger
export const refreshScrollTrigger = () => {
  ScrollTrigger.refresh();
};
