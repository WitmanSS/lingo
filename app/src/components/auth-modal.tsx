import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuthStore } from '@/store/auth-store';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'login' | 'signup';
  onModeChange: (mode: 'login' | 'signup') => void;
}

export function AuthModal({
  isOpen,
  onClose,
  mode,
  onModeChange,
}: AuthModalProps) {
  const { t } = useTranslation();
  const { login, register, isLoading } = useAuthStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (mode === 'signup') {
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters');
        return;
      }
      const success = await register(
        formData.name,
        formData.email,
        formData.password
      );
      if (success) {
        onClose();
        setFormData({ name: '', email: '', password: '', confirmPassword: '' });
      } else {
        setError('Registration failed. Please try again.');
      }
    } else {
      const success = await login(formData.email, formData.password);
      if (success) {
        onClose();
        setFormData({ name: '', email: '', password: '', confirmPassword: '' });
      } else {
        setError('Invalid email or password');
      }
    }
  };

  const switchMode = () => {
    onModeChange(mode === 'login' ? 'signup' : 'login');
    setError('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display font-semibold text-center">
            {mode === 'login'
              ? t('auth.login.title')
              : t('auth.signup.title')}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {mode === 'signup' && (
            <div className="space-y-2">
              <Label htmlFor="name">{t('auth.signup.name')}</Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="John Doe"
                required
                disabled={isLoading}
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">
              {mode === 'login' ? t('auth.login.email') : t('auth.signup.email')}
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="you@example.com"
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">
              {mode === 'login'
                ? t('auth.login.password')
                : t('auth.signup.password')}
            </Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              placeholder="••••••••"
              required
              disabled={isLoading}
            />
          </div>

          {mode === 'signup' && (
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">
                {t('auth.signup.confirmPassword')}
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                placeholder="••••••••"
                required
                disabled={isLoading}
              />
            </div>
          )}

          {error && (
            <div className="p-3 rounded-lg bg-red-50 text-red-500 text-sm">
              {error}
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-gradient-primary text-white hover:opacity-90"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : mode === 'login' ? (
              t('auth.login.submit')
            ) : (
              t('auth.signup.submit')
            )}
          </Button>
        </form>

        <div className="mt-4 text-center text-sm">
          <span className="text-lingua-text-secondary">
            {mode === 'login'
              ? t('auth.login.noAccount')
              : t('auth.signup.hasAccount')}{' '}
          </span>
          <button
            onClick={switchMode}
            className="text-lingua-primary hover:underline font-medium"
            disabled={isLoading}
          >
            {mode === 'login' ? t('auth.login.signup') : t('auth.signup.login')}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
