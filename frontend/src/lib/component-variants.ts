import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// Enhanced Button Variants
export const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        // Lingua-specific variants
        lingua: 'bg-lingua-primary text-white hover:bg-lingua-primary-dark shadow-purple',
        'lingua-outline': 'border-2 border-lingua-primary text-lingua-primary hover:bg-lingua-primary hover:text-white',
        'lingua-ghost': 'text-lingua-primary hover:bg-lingua-accent hover:text-lingua-primary-dark',
        success: 'bg-lingua-success text-white hover:bg-lingua-success/90',
        warning: 'bg-lingua-warning text-white hover:bg-lingua-warning/90',
        error: 'bg-lingua-error text-white hover:bg-lingua-error/90',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        xl: 'h-12 rounded-lg px-10 text-base',
        icon: 'h-10 w-10',
        'icon-sm': 'h-8 w-8',
        'icon-lg': 'h-12 w-12',
      },
      shape: {
        default: '',
        square: 'rounded-none',
        pill: 'rounded-full',
        circle: 'rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      shape: 'default',
    },
  }
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;

// Enhanced Card Variants
export const cardVariants = cva(
  'rounded-lg border bg-card text-card-foreground shadow-sm',
  {
    variants: {
      variant: {
        default: '',
        elevated: 'shadow-card',
        outlined: 'border-2',
        filled: 'bg-lingua-surface border-lingua-border',
        glass: 'glass border-white/20',
        gradient: 'bg-gradient-primary text-white border-0',
      },
      size: {
        default: 'p-6',
        sm: 'p-4',
        lg: 'p-8',
        xl: 'p-10',
      },
      hover: {
        default: '',
        lift: 'hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200',
        glow: 'hover:shadow-purple transition-all duration-200',
        scale: 'hover:scale-105 transition-transform duration-200',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      hover: 'default',
    },
  }
);

export type CardVariants = VariantProps<typeof cardVariants>;

// Enhanced Badge Variants
export const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive: 'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'text-foreground',
        // Lingua-specific variants
        level: 'border-transparent text-white',
        success: 'border-transparent bg-lingua-success text-white',
        warning: 'border-transparent bg-lingua-warning text-white',
        error: 'border-transparent bg-lingua-error text-white',
        info: 'border-transparent bg-lingua-info text-white',
      },
      size: {
        default: 'px-2.5 py-0.5 text-xs',
        sm: 'px-2 py-0.5 text-xs',
        lg: 'px-3 py-1 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export type BadgeVariants = VariantProps<typeof badgeVariants>;

// Enhanced Input Variants
export const inputVariants = cva(
  'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: '',
        error: 'border-lingua-error focus-visible:ring-lingua-error',
        success: 'border-lingua-success focus-visible:ring-lingua-success',
        filled: 'bg-lingua-bg border-lingua-border',
      },
      size: {
        default: 'h-10',
        sm: 'h-8 text-sm',
        lg: 'h-12 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export type InputVariants = VariantProps<typeof inputVariants>;

// Typography Component Variants
export const textVariants = cva('', {
  variants: {
    variant: {
      h1: 'text-4xl md:text-5xl lg:text-6xl font-bold font-display leading-tight',
      h2: 'text-3xl md:text-4xl lg:text-5xl font-bold font-display leading-tight',
      h3: 'text-2xl md:text-3xl lg:text-4xl font-semibold font-display leading-tight',
      h4: 'text-xl md:text-2xl lg:text-3xl font-semibold font-display leading-snug',
      h5: 'text-lg md:text-xl lg:text-2xl font-medium font-display leading-snug',
      h6: 'text-base md:text-lg lg:text-xl font-medium font-display leading-snug',
      body: 'text-base leading-relaxed',
      'body-sm': 'text-sm leading-relaxed',
      'body-lg': 'text-lg leading-relaxed',
      caption: 'text-xs text-lingua-text-muted uppercase tracking-wide',
      overline: 'text-xs font-semibold text-lingua-primary uppercase tracking-wider',
    },
    color: {
      default: 'text-lingua-text',
      secondary: 'text-lingua-text-secondary',
      muted: 'text-lingua-text-muted',
      primary: 'text-lingua-primary',
      success: 'text-lingua-success',
      warning: 'text-lingua-warning',
      error: 'text-lingua-error',
      gradient: 'text-gradient',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
      justify: 'text-justify',
    },
  },
  defaultVariants: {
    variant: 'body',
    color: 'default',
    align: 'left',
  },
});

export type TextVariants = VariantProps<typeof textVariants>;

// Layout Container Variants
export const containerVariants = cva('mx-auto px-4 sm:px-6 lg:px-8', {
  variants: {
    size: {
      default: 'max-w-7xl',
      sm: 'max-w-3xl',
      md: 'max-w-5xl',
      lg: 'max-w-7xl',
      xl: 'max-w-screen-2xl',
      full: 'max-w-full',
    },
    padding: {
      default: 'py-12 md:py-16 lg:py-20',
      sm: 'py-8 md:py-12',
      lg: 'py-16 md:py-20 lg:py-24',
      xl: 'py-20 md:py-24 lg:py-32',
      none: '',
    },
  },
  defaultVariants: {
    size: 'default',
    padding: 'default',
  },
});

export type ContainerVariants = VariantProps<typeof containerVariants>;