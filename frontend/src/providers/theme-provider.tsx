import React, { createContext, useContext, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

type Theme = 'light' | 'dark' | 'system';

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: 'system',
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'lingo-ui-theme',
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light';

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider');

  return context;
};

// Theme toggle component
interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('system');
    } else {
      setTheme('light');
    }
  };

  const getIcon = () => {
    if (theme === 'light') {
      return (
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      );
    } else if (theme === 'dark') {
      return (
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      );
    } else {
      return (
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      );
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        'inline-flex items-center justify-center rounded-md p-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        className
      )}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light'} mode`}
    >
      {getIcon()}
    </button>
  );
}

// Dark mode CSS variables
export const darkModeVars = `
  :root {
    --lingua-bg-primary: 222.2 84% 4.9%;
    --lingua-bg-secondary: 217.2 32.6% 17.5%;
    --lingua-bg-tertiary: 217.2 19% 26.5%;
    --lingua-bg-surface: 217.2 19% 26.5%;
    --lingua-bg-surface-hover: 217.2 19% 32.1%;
    --lingua-bg-card: 222.2 84% 4.9%;
    --lingua-bg-card-hover: 217.2 32.6% 17.5%;
    --lingua-text: 210 40% 98%;
    --lingua-text-secondary: 215.4 16.3% 83.9%;
    --lingua-text-muted: 217.9 10.6% 64.9%;
    --lingua-border: 217.2 32.6% 17.5%;
    --lingua-border-hover: 217.2 19% 26.5%;
    --lingua-primary: 263.4 70% 50.4%;
    --lingua-primary-hover: 263.4 70% 60%;
    --lingua-secondary: 210 40% 96%;
    --lingua-accent: 217.2 32.6% 17.5%;
    --lingua-accent-hover: 217.2 19% 26.5%;
    --lingua-success: 142.1 76.2% 36.3%;
    --lingua-warning: 32.5 94.6% 43.7%;
    --lingua-error: 0 84.2% 60.2%;
    --lingua-info: 199.4 89% 48.3%;
  }
`;

// Light mode CSS variables (already defined in design-tokens.ts)
export const lightModeVars = `
  :root {
    --lingua-bg-primary: 0 0% 100%;
    --lingua-bg-secondary: 0 0% 96.1%;
    --lingua-bg-tertiary: 0 0% 89.8%;
    --lingua-bg-surface: 0 0% 100%;
    --lingua-bg-surface-hover: 0 0% 96.1%;
    --lingua-bg-card: 0 0% 100%;
    --lingua-bg-card-hover: 0 0% 96.1%;
    --lingua-text: 222.2 84% 4.9%;
    --lingua-text-secondary: 215.4 16.3% 46.9%;
    --lingua-text-muted: 215.4 16.3% 46.9%;
    --lingua-border: 214.3 31.8% 91.4%;
    --lingua-border-hover: 214.3 31.8% 85%;
    --lingua-primary: 262.1 83.3% 57.8%;
    --lingua-primary-hover: 262.1 83.3% 67%;
    --lingua-secondary: 210 40% 96%;
    --lingua-accent: 210 40% 96%;
    --lingua-accent-hover: 210 40% 98%;
    --lingua-success: 142.1 76.2% 36.3%;
    --lingua-warning: 32.5 94.6% 43.7%;
    --lingua-error: 0 84.2% 60.2%;
    --lingua-info: 199.4 89% 48.3%;
  }
`;