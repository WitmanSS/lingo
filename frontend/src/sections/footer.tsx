import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { BookOpen, Send, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { languages } from '@/lib/i18n';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Footer() {
  const { t, i18n } = useTranslation();
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const elements = contentRef.current?.querySelectorAll('.footer-animate');
      
      if (elements) {
        gsap.fromTo(
          elements,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.08,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: footerRef.current,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const handleLanguageChange = (code: string) => {
    i18n.changeLanguage(code);
  };

  const quickLinks = [
    { label: t('nav.home'), href: '#' },
    { label: t('nav.texts'), href: '#texts' },
    { label: t('nav.addText'), href: '#add-text' },
    { label: t('nav.about'), href: '#about' },
    { label: t('nav.contact'), href: '#contact' },
  ];

  const resourceLinks = [
    { label: t('footer.resources'), href: '#' },
    { label: 'Help Center', href: '#' },
    { label: 'Guidelines', href: '#' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
  ];

  return (
    <footer ref={footerRef} id="contact" className="bg-white border-t border-lingua-border/50">
      {/* Top border gradient */}
      <div className="h-1 bg-gradient-to-r from-lingua-primary via-lingua-accent to-lingua-secondary" />

      <div ref={contentRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="footer-animate lg:col-span-1">
            <a href="#" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="font-display font-semibold text-xl">
                LinguaRead
              </span>
            </a>
            <p className="text-lingua-text-secondary mb-6">
              {t('footer.tagline')}
            </p>
            {/* Social Icons */}
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 rounded-full bg-lingua-bg flex items-center justify-center text-lingua-text-secondary hover:bg-lingua-primary hover:text-white transition-all duration-300 hover:scale-110"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-animate">
            <h4 className="font-display font-semibold text-lg mb-4">
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-lingua-text-secondary hover:text-lingua-primary transition-colors duration-200 relative group"
                  >
                    {link.label}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-lingua-primary transition-all duration-300 group-hover:w-full" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="footer-animate">
            <h4 className="font-display font-semibold text-lg mb-4">
              {t('footer.resources')}
            </h4>
            <ul className="space-y-3">
              {resourceLinks.slice(1).map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-lingua-text-secondary hover:text-lingua-primary transition-colors duration-200 relative group"
                  >
                    {link.label}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-lingua-primary transition-all duration-300 group-hover:w-full" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer-animate">
            <h4 className="font-display font-semibold text-lg mb-4">
              {t('footer.newsletter.title')}
            </h4>
            <p className="text-lingua-text-secondary mb-4">
              {t('footer.newsletter.description')}
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder={t('footer.newsletter.placeholder')}
                className="flex-1"
              />
              <Button className="bg-gradient-primary text-white hover:opacity-90 px-4">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-animate mt-12 pt-8 border-t border-lingua-border/50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-lingua-text-muted">
            {t('footer.copyright')}
          </p>

          {/* Language Selector */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-lingua-text-muted">
              {t('footer.languages')}:
            </span>
            <div className="flex gap-1">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`px-2 py-1 text-sm rounded transition-colors ${
                    i18n.language === lang.code
                      ? 'bg-lingua-primary text-white'
                      : 'text-lingua-text-secondary hover:bg-lingua-bg'
                  }`}
                >
                  {lang.code.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
