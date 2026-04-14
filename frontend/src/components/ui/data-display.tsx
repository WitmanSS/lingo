import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// Enhanced Table components
const tableVariants = cva('w-full caption-bottom text-sm', {
  variants: {
    variant: {
      default: '',
      bordered: 'border-collapse border border-lingua-border',
      striped: '[&_tbody_tr:nth-child(odd)]:bg-lingua-bg-surface',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

interface TableProps
  extends React.TableHTMLAttributes<HTMLTableElement>,
    VariantProps<typeof tableVariants> {}

const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className, variant, ...props }, ref) => (
    <div className="relative w-full overflow-auto">
      <table
        ref={ref}
        className={cn(tableVariants({ variant }), className)}
        {...props}
      />
    </div>
  )
);
Table.displayName = 'Table';

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn('[&_tr]:border-b', className)} {...props} />
));
TableHeader.displayName = 'TableHeader';

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn('[&_tr:last-child]:border-0', className)}
    {...props}
  />
));
TableBody.displayName = 'TableBody';

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn('border-t bg-lingua-bg-surface font-medium [&>tr]:last:border-b-0', className)}
    {...props}
  />
));
TableFooter.displayName = 'TableFooter';

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      'border-b border-lingua-border transition-colors hover:bg-lingua-bg-surface-hover data-[state=selected]:bg-lingua-bg-surface',
      className
    )}
    {...props}
  />
));
TableRow.displayName = 'TableRow';

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      'h-12 px-4 text-left align-middle font-medium text-lingua-text-muted [&:has([role=checkbox])]:pr-0',
      className
    )}
    {...props}
  />
));
TableHead.displayName = 'TableHead';

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn('p-4 align-middle [&:has([role=checkbox])]:pr-0', className)}
    {...props}
  />
));
TableCell.displayName = 'TableCell';

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn('mt-4 text-sm text-lingua-text-muted', className)}
    {...props}
  />
));
TableCaption.displayName = 'TableCaption';

// Enhanced List components
interface ListProps extends React.HTMLAttributes<HTMLUListElement> {
  variant?: 'default' | 'ordered' | 'unordered' | 'inline';
  spacing?: 'tight' | 'normal' | 'loose';
}

const List = React.forwardRef<HTMLUListElement, ListProps>(
  ({ className, variant = 'unordered', spacing = 'normal', ...props }, ref) => {
    const variants = {
      default: '',
      ordered: '',
      unordered: '',
      inline: 'flex flex-wrap gap-2',
    };

    const spacings = {
      tight: 'space-y-1',
      normal: 'space-y-2',
      loose: 'space-y-4',
    };

    const Component = variant === 'ordered' ? 'ol' : 'ul';

    return React.createElement(Component, {
      ref,
      className: cn(
        variants[variant],
        variant !== 'inline' && spacings[spacing],
        className
      ),
      ...props,
    });
  }
);
List.displayName = 'List';

interface ListItemProps extends React.HTMLAttributes<HTMLLIElement> {
  variant?: 'default' | 'bullet' | 'number' | 'checkmark' | 'dash';
}

const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const variants = {
      default: '',
      bullet: 'list-disc list-inside',
      number: 'list-decimal list-inside',
      checkmark: 'flex items-center space-x-2',
      dash: 'list-[—] list-inside',
    };

    return (
      <li
        ref={ref}
        className={cn(variants[variant], className)}
        {...props}
      />
    );
  }
);
ListItem.displayName = 'ListItem';

// Enhanced Card variants for data display
interface DataCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'stats' | 'metric' | 'info' | 'achievement' | 'progress';
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
}

const DataCard = React.forwardRef<HTMLDivElement, DataCardProps>(
  ({ className, variant = 'info', size = 'md', interactive = false, ...props }, ref) => {
    const variants = {
      stats: 'bg-gradient-to-br from-lingua-primary/10 to-lingua-secondary/10 border-lingua-primary/20',
      metric: 'bg-lingua-bg-card border-lingua-border',
      info: 'bg-lingua-info/10 border-lingua-info/20',
      achievement: 'bg-gradient-to-br from-lingua-success/10 to-lingua-warning/10 border-lingua-success/20',
      progress: 'bg-lingua-bg-surface border-lingua-border',
    };

    const sizes = {
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-lg border transition-all duration-200',
          variants[variant],
          sizes[size],
          interactive && 'hover:shadow-card cursor-pointer hover:-translate-y-1',
          className
        )}
        {...props}
      />
    );
  }
);
DataCard.displayName = 'DataCard';

// Stats Card component
interface StatsCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    label: string;
    trend: 'up' | 'down' | 'neutral';
  };
  icon?: React.ReactNode;
  className?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  change,
  icon,
  className,
}) => {
  const trendColors = {
    up: 'text-lingua-success',
    down: 'text-lingua-error',
    neutral: 'text-lingua-text-muted',
  };

  return (
    <DataCard variant="stats" className={className}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-lingua-text-muted">{title}</p>
          <p className="text-2xl font-bold text-lingua-text">{value}</p>
          {change && (
            <p className={cn('text-xs font-medium', trendColors[change.trend])}>
              {change.trend === 'up' && '+'}
              {change.trend === 'down' && '-'}
              {Math.abs(change.value)}% {change.label}
            </p>
          )}
        </div>
        {icon && (
          <div className="text-lingua-primary">
            {icon}
          </div>
        )}
      </div>
    </DataCard>
  );
};

// Metric Card component
interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: 'up' | 'down' | 'neutral';
  className?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subtitle,
  trend,
  className,
}) => {
  const trendColors = {
    up: 'text-lingua-success',
    down: 'text-lingua-error',
    neutral: 'text-lingua-text',
  };

  return (
    <DataCard variant="metric" className={className}>
      <div className="text-center">
        <p className="text-sm font-medium text-lingua-text-muted">{title}</p>
        <p className={cn(
          'text-3xl font-bold',
          trend ? trendColors[trend] : 'text-lingua-text'
        )}>
          {value}
        </p>
        {subtitle && (
          <p className="text-xs text-lingua-text-muted mt-1">{subtitle}</p>
        )}
      </div>
    </DataCard>
  );
};

// Progress Card component
interface ProgressCardProps {
  title: string;
  progress: number; // 0-100
  label?: string;
  color?: 'primary' | 'success' | 'warning' | 'error';
  className?: string;
}

const ProgressCard: React.FC<ProgressCardProps> = ({
  title,
  progress,
  label,
  color = 'primary',
  className,
}) => {
  const colors = {
    primary: 'bg-lingua-primary',
    success: 'bg-lingua-success',
    warning: 'bg-lingua-warning',
    error: 'bg-lingua-error',
  };

  return (
    <DataCard variant="progress" className={className}>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <p className="text-sm font-medium text-lingua-text">{title}</p>
          <p className="text-sm text-lingua-text-muted">{progress}%</p>
        </div>
        <div className="w-full bg-lingua-bg-surface rounded-full h-2">
          <div
            className={cn('h-2 rounded-full transition-all duration-300', colors[color])}
            style={{ width: `${progress}%` }}
          />
        </div>
        {label && (
          <p className="text-xs text-lingua-text-muted">{label}</p>
        )}
      </div>
    </DataCard>
  );
};

// Data Grid component for responsive data display
interface DataGridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: number;
  gap?: 'sm' | 'md' | 'lg';
}

const DataGrid = React.forwardRef<HTMLDivElement, DataGridProps>(
  ({ className, columns = 1, gap = 'md', children, ...props }, ref) => {
    const gaps = {
      sm: 'gap-4',
      md: 'gap-6',
      lg: 'gap-8',
    };

    const gridCols = {
      1: 'grid-cols-1',
      2: 'grid-cols-1 md:grid-cols-2',
      3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
      5: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5',
      6: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'grid',
          gridCols[columns as keyof typeof gridCols] || gridCols[1],
          gaps[gap],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
DataGrid.displayName = 'DataGrid';

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
  List,
  ListItem,
  DataCard,
  StatsCard,
  MetricCard,
  ProgressCard,
  DataGrid,
};

export type {
  TableProps,
  ListProps,
  ListItemProps,
  DataCardProps,
  StatsCardProps,
  MetricCardProps,
  ProgressCardProps,
  DataGridProps,
};