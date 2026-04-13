import { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/lib/i18n';
import { Navbar } from '@/components/navbar';
import { Toaster } from '@/components/ui/sonner';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuthStore } from '@/store/auth-store';
import './App.css';

// Lazy-loaded pages for code splitting
const HomePage = lazy(() => import('@/pages/HomePage'));
const StoriesPage = lazy(() => import('@/pages/StoriesPage'));
const StoryReaderPage = lazy(() => import('@/pages/StoryReaderPage'));
const ProfilePage = lazy(() => import('@/pages/ProfilePage'));
const LeaderboardPage = lazy(() => import('@/pages/LeaderboardPage'));

// Admin Pages
const AdminLayout = lazy(() => import('@/pages/admin/AdminLayout'));
const AdminDashboard = lazy(() => import('@/pages/admin/DashboardPage'));
const AdminUsers = lazy(() => import('@/pages/admin/UsersPage'));
const AdminStories = lazy(() => import('@/pages/admin/StoriesPage'));
const AdminLeaderboards = lazy(() => import('@/pages/admin/LeaderboardsPage'));
const SystemStatus = lazy(() => import('@/pages/admin/SystemStatusPage'));

// ─── Page Loader ──────────────────────────────────────
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

// ─── Protected Route Guard ────────────────────────────
function ProtectedRoute({ children, requireAdmin = false }: { children: React.ReactNode, requireAdmin?: boolean }) {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (requireAdmin && user?.role !== 'ADMIN') {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

// ─── 404 Page ─────────────────────────────────────────
function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-8">Page not found</p>
        <a href="/" className="text-primary hover:underline">
          ← Back to home
        </a>
      </div>
    </div>
  );
}

// ─── App ──────────────────────────────────────────────
function App() {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

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
          <Routes>
            {/* Standard User Layout */}
            <Route path="/" element={
              <>
                <Navbar />
                <Suspense fallback={<PageLoader />}>
                   <Outlet />
                </Suspense>
              </>
            }>
               <Route index element={<HomePage />} />
               <Route path="stories" element={<StoriesPage />} />
               <Route path="stories/:slug" element={<StoryReaderPage />} />
               <Route path="leaderboards" element={<LeaderboardPage />} />
               <Route path="profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
            </Route>

            {/* Admin Layout */}
             <Route path="/admin" element={
                <ProtectedRoute requireAdmin={true}>
                  <Suspense fallback={<PageLoader />}>
                    <AdminLayout />
                  </Suspense>
                </ProtectedRoute>
             }>
                <Route index element={<AdminDashboard />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="stories" element={<AdminStories />} />
                <Route path="moderation" element={<AdminStories />} />
                <Route path="leaderboards" element={<AdminLeaderboards />} />
                <Route path="system" element={<SystemStatus />} />
             </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <Toaster position="top-center" />
        </div>
      </BrowserRouter>
    </I18nextProvider>
  );
}

export default App;
