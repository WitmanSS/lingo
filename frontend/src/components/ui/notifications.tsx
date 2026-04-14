import React, { createContext, useContext, useState, useCallback } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { CloseIcon, CheckIcon, ExclamationIcon, InformationIcon } from '@/components/ui/icons';

// Toast types
type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

// Toast context
interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
  clearToasts: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

// Toast Provider component
interface ToastProviderProps {
  children: React.ReactNode;
  maxToasts?: number;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  maxToasts = 5,
}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: Toast = {
      id,
      duration: 5000,
      ...toast,
    };

    setToasts((prev) => {
      const updated = [newToast, ...prev];
      return updated.slice(0, maxToasts);
    });

    // Auto remove after duration
    if (newToast.duration && newToast.duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, newToast.duration);
    }
  }, [maxToasts]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const clearToasts = useCallback(() => {
    setToasts([]);
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast, clearToasts }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
};

// Toast Container component
const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
      ))}
    </div>
  );
};

// Toast Item component
interface ToastItemProps {
  toast: Toast;
  onRemove: (id: string) => void;
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, onRemove }) => {
  const { type, title, description, action } = toast;

  const icons = {
    success: CheckIcon,
    error: ExclamationIcon,
    warning: ExclamationIcon,
    info: InformationIcon,
  };

  const Icon = icons[type];

  return (
    <div
      className={cn(
        'flex items-start space-x-3 p-4 rounded-lg border shadow-lg transition-all duration-200 max-w-sm',
        {
          'bg-lingua-success/10 border-lingua-success/20 text-lingua-success': type === 'success',
          'bg-lingua-error/10 border-lingua-error/20 text-lingua-error': type === 'error',
          'bg-lingua-warning/10 border-lingua-warning/20 text-lingua-warning': type === 'warning',
          'bg-lingua-info/10 border-lingua-info/20 text-lingua-info': type === 'info',
        }
      )}
    >
      <Icon size="sm" className="mt-0.5 flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium">{title}</p>
        {description && (
          <p className="text-sm opacity-90 mt-1">{description}</p>
        )}
        {action && (
          <button
            onClick={action.onClick}
            className="text-sm font-medium underline hover:no-underline mt-2"
          >
            {action.label}
          </button>
        )}
      </div>
      <button
        onClick={() => onRemove(toast.id)}
        className="flex-shrink-0 p-1 rounded hover:bg-black/10 transition-colors"
        aria-label="Close notification"
      >
        <CloseIcon size="xs" />
      </button>
    </div>
  );
};

// Convenience hooks for different toast types
export const useToastSuccess = () => {
  const { addToast } = useToast();
  return useCallback((title: string, description?: string, options?: Partial<Omit<Toast, 'id' | 'type' | 'title' | 'description'>>) => {
    addToast({ type: 'success', title, description, ...options });
  }, [addToast]);
};

export const useToastError = () => {
  const { addToast } = useToast();
  return useCallback((title: string, description?: string, options?: Partial<Omit<Toast, 'id' | 'type' | 'title' | 'description'>>) => {
    addToast({ type: 'error', title, description, ...options });
  }, [addToast]);
};

export const useToastWarning = () => {
  const { addToast } = useToast();
  return useCallback((title: string, description?: string, options?: Partial<Omit<Toast, 'id' | 'type' | 'title' | 'description'>>) => {
    addToast({ type: 'warning', title, description, ...options });
  }, [addToast]);
};

export const useToastInfo = () => {
  const { addToast } = useToast();
  return useCallback((title: string, description?: string, options?: Partial<Omit<Toast, 'id' | 'type' | 'title' | 'description'>>) => {
    addToast({ type: 'info', title, description, ...options });
  }, [addToast]);
};

// Alert component (static, non-dismissible)
const alertVariants = cva(
  'relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground',
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground',
        destructive:
          'border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive',
        success: 'border-lingua-success/50 text-lingua-success [&>svg]:text-lingua-success',
        warning: 'border-lingua-warning/50 text-lingua-warning [&>svg]:text-lingua-warning',
        info: 'border-lingua-info/50 text-lingua-info [&>svg]:text-lingua-info',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
);
Alert.displayName = 'Alert';

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn('mb-1 font-medium leading-none tracking-tight', className)}
    {...props}
  />
));
AlertTitle.displayName = 'AlertTitle';

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-sm [&_p]:leading-relaxed', className)}
    {...props}
  />
));
AlertDescription.displayName = 'AlertDescription';

// Banner component (for important announcements)
interface BannerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  dismissible?: boolean;
  onDismiss?: () => void;
}

const Banner = React.forwardRef<HTMLDivElement, BannerProps>(
  ({ className, variant = 'default', dismissible = false, onDismiss, children, ...props }, ref) => {
    const [isVisible, setIsVisible] = useState(true);

    const handleDismiss = () => {
      setIsVisible(false);
      onDismiss?.();
    };

    if (!isVisible) return null;

    const variants = {
      default: 'bg-lingua-bg-surface border-lingua-border text-lingua-text',
      success: 'bg-lingua-success/10 border-lingua-success/20 text-lingua-success',
      warning: 'bg-lingua-warning/10 border-lingua-warning/20 text-lingua-warning',
      error: 'bg-lingua-error/10 border-lingua-error/20 text-lingua-error',
      info: 'bg-lingua-info/10 border-lingua-info/20 text-lingua-info',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center justify-between p-4 border-b',
          variants[variant],
          className
        )}
        {...props}
      >
        <div className="flex-1">{children}</div>
        {dismissible && (
          <button
            onClick={handleDismiss}
            className="ml-4 p-1 rounded hover:bg-black/10 transition-colors"
            aria-label="Dismiss banner"
          >
            <CloseIcon size="sm" />
          </button>
        )}
      </div>
    );
  }
);
Banner.displayName = 'Banner';

// Notification Badge component
interface NotificationBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  count?: number;
  maxCount?: number;
  variant?: 'default' | 'dot';
  color?: 'primary' | 'success' | 'warning' | 'error';
}

const NotificationBadge = React.forwardRef<HTMLDivElement, NotificationBadgeProps>(
  ({ className, count, maxCount = 99, variant = 'default', color = 'primary', children, ...props }, ref) => {
    const colors = {
      primary: 'bg-lingua-primary text-white',
      success: 'bg-lingua-success text-white',
      warning: 'bg-lingua-warning text-white',
      error: 'bg-lingua-error text-white',
    };

    if (variant === 'dot') {
      return (
        <div ref={ref} className={cn('relative inline-block', className)} {...props}>
          {children}
          <div className={cn(
            'absolute -top-1 -right-1 w-2 h-2 rounded-full',
            colors[color]
          )} />
        </div>
      );
    }

    if (!count || count === 0) return <>{children}</>;

    const displayCount = count > maxCount ? `${maxCount}+` : count.toString();

    return (
      <div ref={ref} className={cn('relative inline-block', className)} {...props}>
        {children}
        <div className={cn(
          'absolute -top-2 -right-2 min-w-[1.25rem] h-5 px-1 rounded-full text-xs font-medium flex items-center justify-center',
          colors[color]
        )}>
          {displayCount}
        </div>
      </div>
    );
  }
);
NotificationBadge.displayName = 'NotificationBadge';

export {
  ToastProvider,
  useToast,
  useToastSuccess,
  useToastError,
  useToastWarning,
  useToastInfo,
  Alert,
  AlertTitle,
  AlertDescription,
  Banner,
  NotificationBadge,
};

export type {
  Toast,
  ToastType,
  ToastProviderProps,
  ToastItemProps,
  AlertProps,
  BannerProps,
  NotificationBadgeProps,
};