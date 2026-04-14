import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { ChevronRightIcon } from '@/components/ui/icons';

// Breadcrumbs component
interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

interface BreadcrumbsProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  maxItems?: number;
  showHomeIcon?: boolean;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  className,
  items,
  separator = <ChevronRightIcon size="xs" />,
  maxItems = 5,
  showHomeIcon = true,
  ...props
}) => {
  const displayItems = React.useMemo(() => {
    if (items.length <= maxItems) return items;

    const startItems = items.slice(0, 2);
    const endItems = items.slice(-2);
    const middleItem = { label: '...', href: undefined };

    return [...startItems, middleItem, ...endItems];
  }, [items, maxItems]);

  return (
    <nav
      className={cn('flex items-center space-x-1 text-sm text-lingua-text-muted', className)}
      aria-label="Breadcrumb"
      {...props}
    >
      <ol className="flex items-center space-x-1">
        {displayItems.map((item, index) => {
          const isLast = index === displayItems.length - 1;
          const isEllipsis = item.label === '...';

          return (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <span className="mx-1 text-lingua-text-muted" aria-hidden="true">
                  {separator}
                </span>
              )}

              {isEllipsis ? (
                <span className="px-1" aria-hidden="true">
                  {item.label}
                </span>
              ) : item.href || item.onClick ? (
                <a
                  href={item.href}
                  onClick={item.onClick}
                  className={cn(
                    'hover:text-lingua-text transition-colors',
                    isLast ? 'text-lingua-text font-medium' : 'text-lingua-text-muted'
                  )}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {index === 0 && showHomeIcon && (
                    <span className="sr-only">Home</span>
                  )}
                  {item.label}
                </a>
              ) : (
                <span
                  className={cn(
                    isLast ? 'text-lingua-text font-medium' : 'text-lingua-text-muted'
                  )}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

// Tabs component
interface TabItem {
  id: string;
  label: string;
  content?: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
}

interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  variant?: 'default' | 'pills' | 'underline' | 'buttons';
  size?: 'sm' | 'md' | 'lg';
  orientation?: 'horizontal' | 'vertical';
}

const Tabs: React.FC<TabsProps> = ({
  className,
  tabs,
  activeTab,
  onTabChange,
  variant = 'default',
  size = 'md',
  orientation = 'horizontal',
  ...props
}) => {
  const containerClasses = cn(
    'flex',
    orientation === 'vertical' ? 'flex-col' : 'flex-col sm:flex-row',
    className
  );

  const tabListClasses = cn(
    'flex',
    orientation === 'vertical' ? 'flex-col border-r border-lingua-border' : 'border-b border-lingua-border',
    variant === 'pills' && 'bg-lingua-bg-surface p-1 rounded-lg',
    variant === 'buttons' && 'gap-1'
  );

  const tabClasses = cva(
    'flex items-center justify-center whitespace-nowrap transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lingua-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
    {
      variants: {
        variant: {
          default: 'border-b-2 border-transparent px-4 py-2 text-sm font-medium hover:text-lingua-text data-[state=active]:border-lingua-primary data-[state=active]:text-lingua-primary',
          pills: 'px-3 py-1.5 text-sm font-medium rounded-md hover:bg-lingua-bg-surface data-[state=active]:bg-white data-[state=active]:shadow-sm',
          underline: 'px-4 py-2 text-sm font-medium border-b-2 border-transparent hover:border-lingua-border data-[state=active]:border-lingua-primary data-[state=active]:text-lingua-primary',
          buttons: 'px-4 py-2 text-sm font-medium rounded-md border border-lingua-border hover:bg-lingua-bg-surface data-[state=active]:bg-lingua-primary data-[state=active]:text-white data-[state=active]:border-lingua-primary',
        },
        size: {
          sm: 'px-3 py-1.5 text-xs',
          md: 'px-4 py-2 text-sm',
          lg: 'px-6 py-3 text-base',
        },
        orientation: {
          horizontal: '',
          vertical: 'justify-start px-3 py-2 text-left',
        },
      },
      defaultVariants: {
        variant: 'default',
        size: 'md',
        orientation: 'horizontal',
      },
    }
  );

  return (
    <div className={containerClasses} {...props}>
      <div role="tablist" className={tabListClasses}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`tabpanel-${tab.id}`}
            id={`tab-${tab.id}`}
            disabled={tab.disabled}
            onClick={() => !tab.disabled && onTabChange(tab.id)}
            className={cn(
              tabClasses({ variant, size, orientation }),
              activeTab === tab.id && 'data-[state=active]:true'
            )}
          >
            {tab.icon && <span className="mr-2">{tab.icon}</span>}
            {tab.label}
          </button>
        ))}
      </div>

      <div className={cn(
        'flex-1',
        orientation === 'vertical' ? 'ml-4' : 'mt-4'
      )}>
        {tabs.map((tab) => (
          <div
            key={tab.id}
            role="tabpanel"
            id={`tabpanel-${tab.id}`}
            aria-labelledby={`tab-${tab.id}`}
            hidden={activeTab !== tab.id}
            className={activeTab === tab.id ? 'block' : 'hidden'}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};

// Pagination component
interface PaginationProps extends React.HTMLAttributes<HTMLElement> {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showFirstLast?: boolean;
  showPageNumbers?: boolean;
  maxPageNumbers?: number;
  size?: 'sm' | 'md' | 'lg';
}

const Pagination: React.FC<PaginationProps> = ({
  className,
  currentPage,
  totalPages,
  onPageChange,
  showFirstLast = true,
  showPageNumbers = true,
  maxPageNumbers = 5,
  size = 'md',
  ...props
}) => {
  const sizes = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base',
  };

  const buttonClasses = cn(
    'inline-flex items-center justify-center rounded-md border border-lingua-border bg-lingua-bg-surface text-lingua-text hover:bg-lingua-bg-surface-hover transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lingua-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
    sizes[size]
  );

  const activeButtonClasses = 'bg-lingua-primary text-white border-lingua-primary hover:bg-lingua-primary/90';

  // Calculate page numbers to show
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const halfMax = Math.floor(maxPageNumbers / 2);

    let start = Math.max(1, currentPage - halfMax);
    let end = Math.min(totalPages, start + maxPageNumbers - 1);

    if (end - start + 1 < maxPageNumbers) {
      start = Math.max(1, end - maxPageNumbers + 1);
    }

    // Add first page and ellipsis if needed
    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push('...');
    }

    // Add page numbers
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Add last page and ellipsis if needed
    if (end < totalPages) {
      if (end < totalPages - 1) pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = showPageNumbers ? getPageNumbers() : [];

  return (
    <nav
      className={cn('flex items-center justify-center space-x-1', className)}
      aria-label="Pagination"
      {...props}
    >
      {/* First button */}
      {showFirstLast && (
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className={buttonClasses}
          aria-label="Go to first page"
        >
          ≪
        </button>
      )}

      {/* Previous button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={buttonClasses}
        aria-label="Go to previous page"
      >
        ‹
      </button>

      {/* Page numbers */}
      {pageNumbers.map((page, index) => (
        <React.Fragment key={index}>
          {page === '...' ? (
            <span className="px-2 py-1 text-lingua-text-muted">...</span>
          ) : (
            <button
              onClick={() => onPageChange(page as number)}
              className={cn(
                buttonClasses,
                currentPage === page && activeButtonClasses
              )}
              aria-label={`Go to page ${page}`}
              aria-current={currentPage === page ? 'page' : undefined}
            >
              {page}
            </button>
          )}
        </React.Fragment>
      ))}

      {/* Next button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={buttonClasses}
        aria-label="Go to next page"
      >
        ›
      </button>

      {/* Last button */}
      {showFirstLast && (
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className={buttonClasses}
          aria-label="Go to last page"
        >
          ≫
        </button>
      )}
    </nav>
  );
};

// Stepper/Navigation Steps component
interface Step {
  id: string;
  title: string;
  description?: string;
  completed?: boolean;
  current?: boolean;
}

interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: Step[];
  currentStep: string;
  onStepChange?: (stepId: string) => void;
  orientation?: 'horizontal' | 'vertical';
  variant?: 'default' | 'numbered' | 'icons';
}

const Stepper: React.FC<StepperProps> = ({
  className,
  steps,
  currentStep,
  onStepChange,
  orientation = 'horizontal',
  variant = 'default',
  ...props
}) => {
  const currentIndex = steps.findIndex(step => step.id === currentStep);

  return (
    <div
      className={cn(
        'flex',
        orientation === 'vertical' ? 'flex-col space-y-4' : 'space-x-4',
        className
      )}
      {...props}
    >
      {steps.map((step, index) => {
        const isCompleted = step.completed || index < currentIndex;
        const isCurrent = step.id === currentStep;
        const isClickable = onStepChange && (isCompleted || isCurrent);

        return (
          <div
            key={step.id}
            className={cn(
              'flex items-center',
              orientation === 'vertical' ? 'space-x-3' : 'flex-col space-y-2 flex-1'
            )}
          >
            {/* Step indicator */}
            <div
              className={cn(
                'flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors',
                isCompleted
                  ? 'bg-lingua-success border-lingua-success text-white'
                  : isCurrent
                  ? 'border-lingua-primary text-lingua-primary'
                  : 'border-lingua-border text-lingua-text-muted',
                isClickable && 'cursor-pointer hover:border-lingua-primary'
              )}
              onClick={() => isClickable && onStepChange(step.id)}
            >
              {variant === 'numbered' ? (
                <span className="text-sm font-medium">{index + 1}</span>
              ) : isCompleted ? (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : (
                <span className="text-sm font-medium">{index + 1}</span>
              )}
            </div>

            {/* Step content */}
            <div className={cn(
              'flex-1 text-center',
              orientation === 'vertical' && 'text-left'
            )}>
              <h3 className={cn(
                'text-sm font-medium',
                isCurrent ? 'text-lingua-primary' : isCompleted ? 'text-lingua-text' : 'text-lingua-text-muted'
              )}>
                {step.title}
              </h3>
              {step.description && (
                <p className="text-xs text-lingua-text-muted mt-1">
                  {step.description}
                </p>
              )}
            </div>

            {/* Connector line */}
            {index < steps.length - 1 && (
              <div
                className={cn(
                  'bg-lingua-border',
                  orientation === 'vertical'
                    ? 'w-px h-8 ml-4'
                    : 'h-px flex-1 mt-4'
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

// Menu/Navigation Menu component
interface MenuItem {
  id: string;
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  disabled?: boolean;
  children?: MenuItem[];
}

interface MenuProps extends React.HTMLAttributes<HTMLDivElement> {
  items: MenuItem[];
  variant?: 'vertical' | 'horizontal';
  size?: 'sm' | 'md' | 'lg';
}

const Menu: React.FC<MenuProps> = ({
  className,
  items,
  variant = 'vertical',
  size = 'md',
  ...props
}) => {
  const sizes = {
    sm: 'text-sm py-1 px-2',
    md: 'text-base py-2 px-3',
    lg: 'text-lg py-3 px-4',
  };

  const menuItemClasses = cn(
    'flex items-center space-x-2 rounded-md transition-colors hover:bg-lingua-bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lingua-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
    sizes[size],
    variant === 'horizontal' ? 'justify-center' : 'justify-start'
  );

  const renderMenuItem = (item: MenuItem, depth = 0) => (
    <li key={item.id}>
      {item.href ? (
        <a
          href={item.href}
          className={menuItemClasses}
          style={{ paddingLeft: `${depth * 1 + 0.75}rem` }}
        >
          {item.icon && <span>{item.icon}</span>}
          <span>{item.label}</span>
        </a>
      ) : item.onClick ? (
        <button
          onClick={item.onClick}
          disabled={item.disabled}
          className={menuItemClasses}
          style={{ paddingLeft: `${depth * 1 + 0.75}rem` }}
        >
          {item.icon && <span>{item.icon}</span>}
          <span>{item.label}</span>
        </button>
      ) : (
        <span
          className={cn(menuItemClasses, 'cursor-default')}
          style={{ paddingLeft: `${depth * 1 + 0.75}rem` }}
        >
          {item.icon && <span>{item.icon}</span>}
          <span>{item.label}</span>
        </span>
      )}

      {item.children && item.children.length > 0 && (
        <ul className={cn(
          variant === 'vertical' ? 'ml-4 space-y-1' : 'ml-2'
        )}>
          {item.children.map(child => renderMenuItem(child, depth + 1))}
        </ul>
      )}
    </li>
  );

  return (
    <nav className={className} {...props}>
      <ul className={cn(
        'space-y-1',
        variant === 'horizontal' && 'flex space-x-1 space-y-0'
      )}>
        {items.map(item => renderMenuItem(item))}
      </ul>
    </nav>
  );
};

export {
  Breadcrumbs,
  Tabs,
  Pagination,
  Stepper,
  Menu,
};

export type {
  BreadcrumbItem,
  BreadcrumbsProps,
  TabItem,
  TabsProps,
  PaginationProps,
  Step,
  StepperProps,
  MenuItem,
  MenuProps,
};