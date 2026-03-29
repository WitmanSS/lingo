import { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/lib/i18n';
import { Navbar } from '@/components/navbar';
import { Toaster } from '@/components/ui/sonner';
import { Skeleton } from '@/components/ui/skeleton';
import './App.css';

// Lazy-loaded pages for code splitting
const HomePage = lazy(() => import('@/pages/HomePage'));
const StoriesPage = lazy(() => import('@/pages/StoriesPage'));
const StoryReaderPage = lazy(() => import('@/pages/StoryReaderPage'));
const ProfilePage = lazy(() => import('@/pages/ProfilePage'));

function PageLoader() {
  return (
    <div className="min-h-screen pt-24 pb-16 max-w-7xl mx-auto px-4">
      <Skeleton className="h-10 w-64 mb-4" />
      <Skeleton className="h-6 w-96 mb-8" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-64 rounded-2xl" />
        ))}
      </div>
    </div>
  );
}

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
      <BrowserRouter>
        <div className="min-h-screen bg-lingua-bg">
          <Navbar />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/stories" element={<StoriesPage />} />
              <Route path="/stories/:slug" element={<StoryReaderPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Routes>
          </Suspense>
          <Toaster position="top-center" />
        </div>
      </BrowserRouter>
    </I18nextProvider>
  );
}

export default App;
