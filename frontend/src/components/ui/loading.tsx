import React from 'react';
import { cn } from '@/lib/utils';

// Skeleton component
interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'circular' | 'rectangular' | 'text';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | 'none';
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({
    className,
    variant = 'rectangular',
    width,
    height,
    animation = 'pulse',
    ...props
  }, ref) => {
    const variants = {
      default: 'rounded-md',
      circular: 'rounded-full',
      rectangular: 'rounded-none',
      text: 'rounded-sm',
    };

    const animations = {
      pulse: 'animate-pulse',
      wave: 'animate-pulse', // You can implement wave animation with CSS
      none: '',
    };

    const style: React.CSSProperties = {};
    if (width) style.width = typeof width === 'number' ? `${width}px` : width;
    if (height) style.height = typeof height === 'number' ? `${height}px` : height;

    return (
      <div
        ref={ref}
        className={cn(
          'bg-lingua-bg-surface-hover',
          variants[variant],
          animations[animation],
          className
        )}
        style={style}
        {...props}
      />
    );
  }
);
Skeleton.displayName = 'Skeleton';

// Skeleton Text component
interface SkeletonTextProps extends Omit<SkeletonProps, 'variant' | 'height'> {
  lines?: number;
  lineHeight?: 'sm' | 'md' | 'lg';
}

const SkeletonText = React.forwardRef<HTMLDivElement, SkeletonTextProps>(
  ({ className, lines = 1, lineHeight = 'md', width, ...props }, ref) => {
    const lineHeights = {
      sm: 'h-3',
      md: 'h-4',
      lg: 'h-5',
    };

    if (lines === 1) {
      return (
        <Skeleton
          ref={ref}
          variant="text"
          height={lineHeights[lineHeight]}
          width={width}
          className={className}
          {...props}
        />
      );
    }

    return (
      <div ref={ref} className={cn('space-y-2', className)} {...props}>
        {Array.from({ length: lines }, (_, i) => (
          <Skeleton
            key={i}
            variant="text"
            height={lineHeights[lineHeight]}
            width={i === lines - 1 ? '60%' : width}
          />
        ))}
      </div>
    );
  }
);
SkeletonText.displayName = 'SkeletonText';

// Skeleton Card component
interface SkeletonCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'stats' | 'list';
  showAvatar?: boolean;
  lines?: number;
}

const SkeletonCard = React.forwardRef<HTMLDivElement, SkeletonCardProps>(
  ({ className, variant = 'default', showAvatar = false, lines = 3, ...props }, ref) => {
    if (variant === 'stats') {
      return (
        <div
          ref={ref}
          className={cn('p-6 border border-lingua-border rounded-lg space-y-4', className)}
          {...props}
        >
          <div className="flex items-center space-x-4">
            {showAvatar && <Skeleton variant="circular" width={40} height={40} />}
            <div className="space-y-2 flex-1">
              <Skeleton variant="text" height="h-4" width="60%" />
              <Skeleton variant="text" height="h-6" width="40%" />
            </div>
          </div>
        </div>
      );
    }

    if (variant === 'list') {
      return (
        <div
          ref={ref}
          className={cn('p-4 border border-lingua-border rounded-lg', className)}
          {...props}
        >
          <div className="flex items-center space-x-3">
            {showAvatar && <Skeleton variant="circular" width={32} height={32} />}
            <div className="space-y-1 flex-1">
              <Skeleton variant="text" height="h-4" width="80%" />
              <Skeleton variant="text" height="h-3" width="60%" />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn('p-6 border border-lingua-border rounded-lg space-y-4', className)}
        {...props}
      >
        {showAvatar && (
          <div className="flex items-center space-x-4">
            <Skeleton variant="circular" width={48} height={48} />
            <div className="space-y-2">
              <Skeleton variant="text" height="h-5" width="60%" />
              <Skeleton variant="text" height="h-4" width="40%" />
            </div>
          </div>
        )}
        <div className="space-y-2">
          <Skeleton variant="text" height="h-4" width="100%" />
          <Skeleton variant="text" height="h-4" width="90%" />
          <Skeleton variant="text" height="h-4" width="80%" />
        </div>
      </div>
    );
  }
);
SkeletonCard.displayName = 'SkeletonCard';

// Loading Spinner component
interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'white';
}

const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, size = 'md', color = 'primary', ...props }, ref) => {
    const sizes = {
      xs: 'w-3 h-3',
      sm: 'w-4 h-4',
      md: 'w-6 h-6',
      lg: 'w-8 h-8',
      xl: 'w-12 h-12',
    };

    const colors = {
      primary: 'text-lingua-primary',
      secondary: 'text-lingua-secondary',
      white: 'text-white',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'animate-spin rounded-full border-2 border-current border-t-transparent',
          sizes[size],
          colors[color],
          className
        )}
        {...props}
      >
        <span className="sr-only">Loading...</span>
      </div>
    );
  }
);
Spinner.displayName = 'Spinner';

// Loading Dots component
interface LoadingDotsProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'white';
}

const LoadingDots = React.forwardRef<HTMLDivElement, LoadingDotsProps>(
  ({ className, size = 'md', color = 'primary', ...props }, ref) => {
    const sizes = {
      sm: 'w-1 h-1',
      md: 'w-1.5 h-1.5',
      lg: 'w-2 h-2',
    };

    const colors = {
      primary: 'bg-lingua-primary',
      secondary: 'bg-lingua-secondary',
      white: 'bg-white',
    };

    return (
      <div
        ref={ref}
        className={cn('flex space-x-1', className)}
        {...props}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={cn(
              'rounded-full animate-pulse',
              sizes[size],
              colors[color]
            )}
            style={{
              animationDelay: `${i * 0.15}s`,
              animationDuration: '0.6s',
            }}
          />
        ))}
      </div>
    );
  }
);
LoadingDots.displayName = 'LoadingDots';

// Loading Overlay component
interface LoadingOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  isLoading: boolean;
  spinner?: React.ReactNode;
  message?: string;
  backdrop?: 'blur' | 'dark' | 'none';
}

const LoadingOverlay = React.forwardRef<HTMLDivElement, LoadingOverlayProps>(
  ({
    className,
    isLoading,
    spinner,
    message,
    backdrop = 'blur',
    children,
    ...props
  }, ref) => {
    const backdrops = {
      blur: 'backdrop-blur-sm',
      dark: 'bg-black/50',
      none: '',
    };

    if (!isLoading) return <>{children}</>;

    return (
      <div ref={ref} className={cn('relative', className)} {...props}>
        {children}
        <div
          className={cn(
            'absolute inset-0 flex items-center justify-center z-50',
            backdrops[backdrop]
          )}
        >
          <div className="flex flex-col items-center space-y-4 bg-white/90 dark:bg-gray-900/90 p-6 rounded-lg shadow-lg">
            {spinner || <Spinner size="lg" />}
            {message && (
              <p className="text-sm text-lingua-text-muted">{message}</p>
            )}
          </div>
        </div>
      </div>
    );
  }
);
LoadingOverlay.displayName = 'LoadingOverlay';

// Progress Bar component
interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number; // 0-100
  variant?: 'default' | 'gradient' | 'striped';
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'success' | 'warning' | 'error';
  showLabel?: boolean;
  animated?: boolean;
}

const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  ({
    className,
    value,
    variant = 'default',
    size = 'md',
    color = 'primary',
    showLabel = false,
    animated = false,
    ...props
  }, ref) => {
    const sizes = {
      sm: 'h-1',
      md: 'h-2',
      lg: 'h-3',
    };

    const colors = {
      primary: 'bg-lingua-primary',
      success: 'bg-lingua-success',
      warning: 'bg-lingua-warning',
      error: 'bg-lingua-error',
    };

    const variants = {
      default: '',
      gradient: 'bg-gradient-to-r from-lingua-primary to-lingua-secondary',
      striped: 'bg-gradient-to-r from-lingua-primary to-lingua-secondary bg-[length:20px_20px] bg-repeat',
    };

    return (
      <div
        ref={ref}
        className={cn('w-full bg-lingua-bg-surface rounded-full overflow-hidden', sizes[size], className)}
        {...props}
      >
        <div
          className={cn(
            'h-full rounded-full transition-all duration-300 ease-out',
            colors[color],
            variants[variant],
            animated && 'animate-pulse'
          )}
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
        {showLabel && (
          <div className="flex justify-center mt-2">
            <span className="text-xs text-lingua-text-muted">
              {Math.round(value)}%
            </span>
          </div>
        )}
      </div>
    );
  }
);
ProgressBar.displayName = 'ProgressBar';

// Skeleton Table component
interface SkeletonTableProps extends React.HTMLAttributes<HTMLDivElement> {
  rows?: number;
  columns?: number;
  showHeader?: boolean;
}

const SkeletonTable = React.forwardRef<HTMLDivElement, SkeletonTableProps>(
  ({ className, rows = 5, columns = 4, showHeader = true, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('space-y-4', className)} {...props}>
        {showHeader && (
          <div className="flex space-x-4">
            {Array.from({ length: columns }, (_, i) => (
              <Skeleton key={i} variant="text" height="h-4" className="flex-1" />
            ))}
          </div>
        )}
        <div className="space-y-3">
          {Array.from({ length: rows }, (_, rowIndex) => (
            <div key={rowIndex} className="flex space-x-4">
              {Array.from({ length: columns }, (_, colIndex) => (
                <Skeleton
                  key={colIndex}
                  variant="text"
                  height="h-4"
                  width={colIndex === columns - 1 ? '60%' : '100%'}
                  className="flex-1"
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }
);
SkeletonTable.displayName = 'SkeletonTable';

export {
  Skeleton,
  SkeletonText,
  SkeletonCard,
  Spinner,
  LoadingDots,
  LoadingOverlay,
  ProgressBar,
  SkeletonTable,
};

export type {
  SkeletonProps,
  SkeletonTextProps,
  SkeletonCardProps,
  SpinnerProps,
  LoadingDotsProps,
  LoadingOverlayProps,
  ProgressBarProps,
  SkeletonTableProps,
};