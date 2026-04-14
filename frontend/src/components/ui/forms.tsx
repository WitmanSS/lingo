import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { inputVariants, type InputVariants } from '@/lib/component-variants';

// Enhanced Input component
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    InputVariants {
  error?: boolean;
  helperText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, size, error, helperText, ...props }, ref) => {
    return (
      <div className="space-y-1">
        <input
          className={cn(
            inputVariants({ variant, size }),
            error && 'border-lingua-error focus:ring-lingua-error',
            className
          )}
          ref={ref}
          {...props}
        />
        {helperText && (
          <p className={cn(
            'text-sm',
            error ? 'text-lingua-error' : 'text-lingua-text-muted'
          )}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

// Enhanced Textarea component
export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: 'default' | 'filled' | 'outlined';
  size?: 'sm' | 'default' | 'lg';
  error?: boolean;
  helperText?: string;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant = 'default', size = 'default', error, helperText, resize = 'vertical', ...props }, ref) => {
    const variants = {
      default: 'border border-lingua-border bg-lingua-bg-surface text-lingua-text placeholder:text-lingua-text-muted focus:ring-2 focus:ring-lingua-primary focus:border-lingua-primary',
      filled: 'border-0 bg-lingua-bg-surface text-lingua-text placeholder:text-lingua-text-muted focus:ring-2 focus:ring-lingua-primary',
      outlined: 'border-2 border-lingua-border bg-transparent text-lingua-text placeholder:text-lingua-text-muted focus:ring-2 focus:ring-lingua-primary focus:border-lingua-primary',
    };

    const sizes = {
      sm: 'px-3 py-2 text-sm',
      default: 'px-3 py-2 text-base',
      lg: 'px-4 py-3 text-lg',
    };

    const resizeClasses = {
      none: 'resize-none',
      vertical: 'resize-y',
      horizontal: 'resize-x',
      both: 'resize',
    };

    return (
      <div className="space-y-1">
        <textarea
          className={cn(
            'rounded-md transition-colors',
            variants[variant],
            sizes[size],
            resizeClasses[resize],
            error && 'border-lingua-error focus:ring-lingua-error',
            className
          )}
          ref={ref}
          {...props}
        />
        {helperText && (
          <p className={cn(
            'text-sm',
            error ? 'text-lingua-error' : 'text-lingua-text-muted'
          )}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';

// Enhanced Select component
export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  variant?: 'default' | 'filled' | 'outlined';
  size?: 'sm' | 'default' | 'lg';
  error?: boolean;
  helperText?: string;
  placeholder?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, variant = 'default', size = 'default', error, helperText, placeholder, children, ...props }, ref) => {
    const variants = {
      default: 'border border-lingua-border bg-lingua-bg-surface text-lingua-text focus:ring-2 focus:ring-lingua-primary focus:border-lingua-primary',
      filled: 'border-0 bg-lingua-bg-surface text-lingua-text focus:ring-2 focus:ring-lingua-primary',
      outlined: 'border-2 border-lingua-border bg-transparent text-lingua-text focus:ring-2 focus:ring-lingua-primary focus:border-lingua-primary',
    };

    const sizes = {
      sm: 'px-3 py-2 text-sm',
      default: 'px-3 py-2 text-base',
      lg: 'px-4 py-3 text-lg',
    };

    return (
      <div className="space-y-1">
        <select
          className={cn(
            'rounded-md transition-colors appearance-none bg-no-repeat bg-right pr-8',
            variants[variant],
            sizes[size],
            error && 'border-lingua-error focus:ring-lingua-error',
            className
          )}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
            backgroundPosition: 'right 0.5rem center',
            backgroundSize: '1.5em 1.5em',
          }}
          ref={ref}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {children}
        </select>
        {helperText && (
          <p className={cn(
            'text-sm',
            error ? 'text-lingua-error' : 'text-lingua-text-muted'
          )}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);
Select.displayName = 'Select';

// Checkbox component
export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: boolean;
  helperText?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    const checkboxId = id || React.useId();

    return (
      <div className="space-y-1">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id={checkboxId}
            className={cn(
              'h-4 w-4 rounded border-lingua-border text-lingua-primary focus:ring-lingua-primary focus:ring-2',
              error && 'border-lingua-error focus:ring-lingua-error',
              className
            )}
            ref={ref}
            {...props}
          />
          {label && (
            <label
              htmlFor={checkboxId}
              className="text-sm font-medium text-lingua-text cursor-pointer"
            >
              {label}
            </label>
          )}
        </div>
        {helperText && (
          <p className={cn(
            'text-sm ml-6',
            error ? 'text-lingua-error' : 'text-lingua-text-muted'
          )}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);
Checkbox.displayName = 'Checkbox';

// Radio component
export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: boolean;
}

const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const radioId = id || React.useId();

    return (
      <div className="flex items-center space-x-2">
        <input
          type="radio"
          id={radioId}
          className={cn(
            'h-4 w-4 border-lingua-border text-lingua-primary focus:ring-lingua-primary focus:ring-2',
            error && 'border-lingua-error focus:ring-lingua-error',
            className
          )}
          ref={ref}
          {...props}
        />
        {label && (
          <label
            htmlFor={radioId}
            className="text-sm font-medium text-lingua-text cursor-pointer"
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);
Radio.displayName = 'Radio';

// Radio Group component
interface RadioGroupProps {
  name: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  error?: boolean;
  helperText?: string;
  className?: string;
}

const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ name, value, onValueChange, children, error, helperText, className, ...props }, ref) => {
    return (
      <div className="space-y-1">
        <div
          ref={ref}
          className={cn('space-y-2', className)}
          role="radiogroup"
          {...props}
        >
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child) && child.type === Radio) {
              return React.cloneElement(child, {
                name,
                checked: child.props.value === value,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                  onValueChange?.(e.target.value);
                  child.props.onChange?.(e);
                },
              });
            }
            return child;
          })}
        </div>
        {helperText && (
          <p className={cn(
            'text-sm',
            error ? 'text-lingua-error' : 'text-lingua-text-muted'
          )}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);
RadioGroup.displayName = 'RadioGroup';

// Form Field wrapper with label and error handling
interface FormFieldProps {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}

const FormField = forwardRef<HTMLDivElement, FormFieldProps>(
  ({ label, error, helperText, required, className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('space-y-2', className)} {...props}>
        {label && (
          <label className="text-sm font-medium text-lingua-text">
            {label}
            {required && <span className="text-lingua-error ml-1">*</span>}
          </label>
        )}
        {children}
        {(error || helperText) && (
          <p className={cn(
            'text-sm',
            error ? 'text-lingua-error' : 'text-lingua-text-muted'
          )}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);
FormField.displayName = 'FormField';

// Form Section component
interface FormSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
}

const FormSection = forwardRef<HTMLDivElement, FormSectionProps>(
  ({ title, description, className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('space-y-6', className)} {...props}>
        {(title || description) && (
          <div className="space-y-1">
            {title && (
              <h3 className="text-lg font-medium text-lingua-text">
                {title}
              </h3>
            )}
            {description && (
              <p className="text-sm text-lingua-text-muted">
                {description}
              </p>
            )}
          </div>
        )}
        <div className="space-y-4">
          {children}
        </div>
      </div>
    );
  }
);
FormSection.displayName = 'FormSection';

export {
  Input,
  Textarea,
  Select,
  Checkbox,
  Radio,
  RadioGroup,
  FormField,
  FormSection,
};

export type {
  InputProps,
  TextareaProps,
  SelectProps,
  CheckboxProps,
  RadioProps,
  RadioGroupProps,
  FormFieldProps,
  FormSectionProps,
};