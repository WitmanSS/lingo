import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Menu, User, LogOut, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useAuthStore } from '@/store/auth-store';
import { languages } from '@/lib/i18n';
import { AuthModal } from './auth-modal';

export function Navbar() {
  const { t, i18n } = useTranslation();
  const { user, isAuthenticated, logout } = useAuthStore();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLanguageChange = (code: string) => {
    i18n.changeLanguage(code);
  };

  const openLogin = () => {
    setAuthMode('login');
    setIsAuthModalOpen(true);
  };

  const openSignup = () => {
    setAuthMode('signup');
    setIsAuthModalOpen(true);
  };

  const currentLanguage = languages.find((l) => l.code === i18n.language) || languages[0];

  const navLinks = [
    { href: '/stories', label: t('nav.texts') },
    { href: '/#how-it-works', label: t('nav.about') },
    { href: '/#contact', label: t('nav.contact') },
  ];

  const isActive = (href: string) => {
    if (href.startsWith('/#')) return false;
    return location.pathname === href;
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'glass border-b border-lingua-accent/30 shadow-sm'
            : 'bg-transparent'
        }`}
        style={{ height: isScrolled ? '64px' : '80px' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2 group transition-transform duration-300 hover:scale-105"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center transition-transform duration-300 group-hover:rotate-6">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="font-display font-semibold text-xl text-lingua-text">
                LinguaRead
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`relative text-sm font-medium transition-colors duration-200 group ${
                    isActive(link.href)
                      ? 'text-lingua-primary'
                      : 'text-lingua-text-secondary hover:text-lingua-primary'
                  }`}
                >
                  {link.label}
                  <span className={`absolute -bottom-1 left-1/2 h-0.5 bg-lingua-primary transition-all duration-300 ${
                    isActive(link.href)
                      ? 'w-full left-0'
                      : 'w-0 group-hover:w-full group-hover:left-0'
                  }`} />
                </Link>
              ))}
            </div>

            {/* Right Side */}
            <div className="hidden md:flex items-center gap-4">
              {/* Language Selector */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-2 text-sm"
                  >
                    <span className="text-lg">{currentLanguage.flag}</span>
                    <span className="uppercase text-xs font-medium">
                      {currentLanguage.code}
                    </span>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  {languages.map((lang) => (
                    <DropdownMenuItem
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <span className="text-lg">{lang.flag}</span>
                      <span>{lang.name}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Auth Buttons or User Menu */}
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex items-center gap-2 p-1 pr-3 h-10"
                    >
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={user?.avatarUrl} />
                        <AvatarFallback className="bg-lingua-primary text-white text-sm">
                          {user?.username?.[0]?.toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium max-w-[100px] truncate">
                        {user?.username}
                      </span>
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem asChild className="flex items-center gap-2 cursor-pointer">
                      <Link to="/profile">
                        <User className="w-4 h-4" />
                        {t('nav.profile')}
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={logout}
                      className="flex items-center gap-2 cursor-pointer text-red-500"
                    >
                      <LogOut className="w-4 h-4" />
                      {t('nav.logout')}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={openLogin}
                    className="text-sm font-medium"
                  >
                    {t('nav.login')}
                  </Button>
                  <Button
                    size="sm"
                    onClick={openSignup}
                    className="bg-gradient-primary text-white hover:opacity-90 text-sm font-medium"
                  >
                    {t('nav.signup')}
                  </Button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col gap-6 mt-8">
                  {/* Mobile Nav Links */}
                  <div className="flex flex-col gap-4">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        to={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`text-lg font-medium transition-colors ${
                          isActive(link.href)
                            ? 'text-lingua-primary'
                            : 'text-lingua-text hover:text-lingua-primary'
                        }`}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>

                  <hr className="border-lingua-border" />

                  {/* Mobile Language Selector */}
                  <div className="flex flex-col gap-2">
                    <span className="text-sm text-lingua-text-muted">
                      {t('footer.languages')}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {languages.map((lang) => (
                        <Button
                          key={lang.code}
                          variant={
                            i18n.language === lang.code ? 'default' : 'outline'
                          }
                          size="sm"
                          onClick={() => handleLanguageChange(lang.code)}
                          className="flex items-center gap-1"
                        >
                          <span>{lang.flag}</span>
                          <span className="uppercase text-xs">{lang.code}</span>
                        </Button>
                      ))}
                    </div>
                  </div>

                  <hr className="border-lingua-border" />

                  {/* Mobile Auth */}
                  {isAuthenticated ? (
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={user?.avatarUrl} />
                          <AvatarFallback className="bg-lingua-primary text-white">
                            {user?.username?.[0]?.toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user?.username}</p>
                          <p className="text-sm text-lingua-text-muted">
                            {user?.email}
                          </p>
                        </div>
                      </div>
                      <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button variant="outline" className="w-full">
                          <User className="w-4 h-4 mr-2" />
                          {t('nav.profile')}
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        onClick={() => {
                          logout();
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        {t('nav.logout')}
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      <Button
                        variant="outline"
                        onClick={() => {
                          openLogin();
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full"
                      >
                        {t('nav.login')}
                      </Button>
                      <Button
                        onClick={() => {
                          openSignup();
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full bg-gradient-primary text-white"
                      >
                        {t('nav.signup')}
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        mode={authMode}
        onModeChange={setAuthMode}
      />
    </>
  );
}
