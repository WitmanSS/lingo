import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { buttonVariants, type ButtonVariants } from '@/lib/component-variants';

// Enhanced Button Component
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonVariants {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, shape, asChild = false, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, shape, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

// Enhanced Card Components
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined' | 'filled' | 'glass' | 'gradient';
  size?: 'default' | 'sm' | 'lg' | 'xl';
  hover?: 'default' | 'lift' | 'glow' | 'scale';
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', size = 'default', hover = 'default', ...props }, ref) => {
    const variants = {
      default: 'rounded-lg border bg-card text-card-foreground shadow-sm',
      elevated: 'rounded-lg border bg-card text-card-foreground shadow-card',
      outlined: 'rounded-lg border-2 bg-transparent',
      filled: 'rounded-lg border bg-lingua-surface border-lingua-border',
      glass: 'rounded-lg glass border-white/20',
      gradient: 'rounded-lg bg-gradient-primary text-white border-0',
    };

    const sizes = {
      default: 'p-6',
      sm: 'p-4',
      lg: 'p-8',
      xl: 'p-10',
    };

    const hovers = {
      default: '',
      lift: 'hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200',
      glow: 'hover:shadow-purple transition-all duration-200',
      scale: 'hover:scale-105 transition-transform duration-200',
    };

    return (
      <div
        ref={ref}
        className={cn(
          variants[variant],
          sizes[size],
          hovers[hover],
          className
        )}
        {...props}
      />
    );
  }
);
Card.displayName = 'Card';

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-6', className)}
    {...props}
  />
));
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      'text-2xl font-semibold leading-none tracking-tight',
      className
    )}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
));
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center p-6 pt-0', className)}
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';

// Enhanced Badge Component
interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cva> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'level' | 'success' | 'warning' | 'error' | 'info';
  size?: 'default' | 'sm' | 'lg';
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    const variants = {
      default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
      secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
      destructive: 'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
      outline: 'text-foreground',
      level: 'border-transparent text-white',
      success: 'border-transparent bg-lingua-success text-white',
      warning: 'border-transparent bg-lingua-warning text-white',
      error: 'border-transparent bg-lingua-error text-white',
      info: 'border-transparent bg-lingua-info text-white',
    };

    const sizes = {
      default: 'px-2.5 py-0.5 text-xs',
      sm: 'px-2 py-0.5 text-xs',
      lg: 'px-3 py-1 text-sm',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-full border font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);
Badge.displayName = 'Badge';

// Enhanced Typography Components
interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'body-sm' | 'body-lg' | 'caption' | 'overline';
  color?: 'default' | 'secondary' | 'muted' | 'primary' | 'success' | 'warning' | 'error' | 'gradient';
  align?: 'left' | 'center' | 'right' | 'justify';
  as?: keyof JSX.IntrinsicElements;
}

const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, variant = 'body', color = 'default', align = 'left', as: Component = 'p', ...props }, ref) => {
    const variants = {
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
    };

    const colors = {
      default: 'text-lingua-text',
      secondary: 'text-lingua-text-secondary',
      muted: 'text-lingua-text-muted',
      primary: 'text-lingua-primary',
      success: 'text-lingua-success',
      warning: 'text-lingua-warning',
      error: 'text-lingua-error',
      gradient: 'text-gradient',
    };

    const alignments = {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
      justify: 'text-justify',
    };

    return React.createElement(
      Component,
      {
        ref,
        className: cn(variants[variant], colors[color], alignments[align], className),
        ...props,
      }
    );
  }
);
Text.displayName = 'Text';

// Container Component
interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'default' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  padding?: 'default' | 'sm' | 'lg' | 'xl' | 'none';
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = 'default', padding = 'default', ...props }, ref) => {
    const sizes = {
      default: 'max-w-7xl',
      sm: 'max-w-3xl',
      md: 'max-w-5xl',
      lg: 'max-w-7xl',
      xl: 'max-w-screen-2xl',
      full: 'max-w-full',
    };

    const paddings = {
      default: 'py-12 md:py-16 lg:py-20',
      sm: 'py-8 md:py-12',
      lg: 'py-16 md:py-20 lg:py-24',
      xl: 'py-20 md:py-24 lg:py-32',
      none: '',
    };

    return (
      <div
        ref={ref}
        className={cn('mx-auto px-4 sm:px-6 lg:px-8', sizes[size], paddings[padding], className)}
        {...props}
      />
    );
  }
);
Container.displayName = 'Container';

export {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Badge,
  Text,
  Container,
};

export type {
  ButtonProps,
  CardProps,
  BadgeProps,
  TextProps,
  ContainerProps,
};