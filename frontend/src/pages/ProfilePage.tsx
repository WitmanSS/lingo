import { useTranslation } from 'react-i18next';
import { BookOpen, Clock, Award, Flame, TrendingUp, Star } from 'lucide-react';
import { useAuthStore } from '@/store/auth-store';

// Placeholder stats
const placeholderStats = {
  totalWordsRead: 12500,
  totalReadingTime: 3600,
  storiesCompleted: 8,
  vocabularyLearned: 45,
};

export default function ProfilePage() {
  const { t } = useTranslation();
  const { user } = useAuthStore();

  const stats = placeholderStats;

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-card p-8 mb-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="w-24 h-24 rounded-full bg-gradient-primary flex items-center justify-center text-white text-3xl font-display font-bold">
              {user?.username?.[0]?.toUpperCase() || 'U'}
            </div>
            <div className="text-center sm:text-left">
              <h1 className="font-display text-3xl font-semibold mb-1">
                {user?.username || 'Guest'}
              </h1>
              <p className="text-lingua-text-secondary mb-3">
                {user?.email || t('profile.loginPrompt', 'Log in to track your progress')}
              </p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-sm">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="font-medium">{t('profile.level', 'Level')} {user?.level || 1}</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <TrendingUp className="w-4 h-4 text-lingua-primary" />
                  <span className="font-medium">{user?.xp || 0} XP</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Flame className="w-4 h-4 text-orange-500" />
                  <span className="font-medium">{user?.streakDays || 0} {t('profile.dayStreak', 'day streak')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-card p-6 text-center">
            <BookOpen className="w-8 h-8 text-lingua-primary mx-auto mb-3" />
            <p className="font-display text-2xl font-bold mb-1">{stats.storiesCompleted}</p>
            <p className="text-sm text-lingua-text-secondary">{t('profile.storiesRead', 'Stories Read')}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-card p-6 text-center">
            <FileTextIcon className="w-8 h-8 text-blue-500 mx-auto mb-3" />
            <p className="font-display text-2xl font-bold mb-1">{stats.totalWordsRead.toLocaleString()}</p>
            <p className="text-sm text-lingua-text-secondary">{t('profile.wordsRead', 'Words Read')}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-card p-6 text-center">
            <Clock className="w-8 h-8 text-green-500 mx-auto mb-3" />
            <p className="font-display text-2xl font-bold mb-1">{formatTime(stats.totalReadingTime)}</p>
            <p className="text-sm text-lingua-text-secondary">{t('profile.readingTime', 'Reading Time')}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-card p-6 text-center">
            <Award className="w-8 h-8 text-purple-500 mx-auto mb-3" />
            <p className="font-display text-2xl font-bold mb-1">{stats.vocabularyLearned}</p>
            <p className="text-sm text-lingua-text-secondary">{t('profile.vocabLearned', 'Words Learned')}</p>
          </div>
        </div>

        {/* Bio Section */}
        {user?.bio && (
          <div className="bg-white rounded-2xl shadow-card p-8">
            <h2 className="font-display text-xl font-semibold mb-4">{t('profile.about', 'About')}</h2>
            <p className="text-lingua-text-secondary">{user.bio}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function FileTextIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10 9H8" /><path d="M16 13H8" /><path d="M16 17H8" />
    </svg>
  );
}
