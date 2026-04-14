import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// Grid component
const gridVariants = cva('grid', {
  variants: {
    cols: {
      1: 'grid-cols-1',
      2: 'grid-cols-2',
      3: 'grid-cols-3',
      4: 'grid-cols-4',
      5: 'grid-cols-5',
      6: 'grid-cols-6',
      7: 'grid-cols-7',
      8: 'grid-cols-8',
      9: 'grid-cols-9',
      10: 'grid-cols-10',
      11: 'grid-cols-11',
      12: 'grid-cols-12',
      none: 'grid-cols-none',
      subgrid: 'grid-cols-subgrid',
    },
    gap: {
      0: 'gap-0',
      1: 'gap-1',
      2: 'gap-2',
      3: 'gap-3',
      4: 'gap-4',
      5: 'gap-5',
      6: 'gap-6',
      8: 'gap-8',
      10: 'gap-10',
      12: 'gap-12',
      16: 'gap-16',
      20: 'gap-20',
      24: 'gap-24',
      32: 'gap-32',
    },
    gapX: {
      0: 'gap-x-0',
      1: 'gap-x-1',
      2: 'gap-x-2',
      3: 'gap-x-3',
      4: 'gap-x-4',
      5: 'gap-x-5',
      6: 'gap-x-6',
      8: 'gap-x-8',
      10: 'gap-x-10',
      12: 'gap-x-12',
      16: 'gap-x-16',
      20: 'gap-x-20',
      24: 'gap-x-24',
      32: 'gap-x-32',
    },
    gapY: {
      0: 'gap-y-0',
      1: 'gap-y-1',
      2: 'gap-y-2',
      3: 'gap-y-3',
      4: 'gap-y-4',
      5: 'gap-y-5',
      6: 'gap-y-6',
      8: 'gap-y-8',
      10: 'gap-y-10',
      12: 'gap-y-12',
      16: 'gap-y-16',
      20: 'gap-y-20',
      24: 'gap-y-24',
      32: 'gap-y-32',
    },
    align: {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch',
      baseline: 'items-baseline',
    },
    justify: {
      start: 'justify-items-start',
      center: 'justify-items-center',
      end: 'justify-items-end',
      stretch: 'justify-items-stretch',
    },
    place: {
      start: 'place-items-start',
      center: 'place-items-center',
      end: 'place-items-end',
      stretch: 'place-items-stretch',
    },
  },
  defaultVariants: {
    cols: 1,
    gap: 4,
  },
});

interface GridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridVariants> {}

const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ className, cols, gap, gapX, gapY, align, justify, place, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(gridVariants({ cols, gap, gapX, gapY, align, justify, place }), className)}
        {...props}
      />
    );
  }
);
Grid.displayName = 'Grid';

// Flex component
const flexVariants = cva('flex', {
  variants: {
    direction: {
      row: 'flex-row',
      'row-reverse': 'flex-row-reverse',
      col: 'flex-col',
      'col-reverse': 'flex-col-reverse',
    },
    wrap: {
      nowrap: 'flex-nowrap',
      wrap: 'flex-wrap',
      'wrap-reverse': 'flex-wrap-reverse',
    },
    align: {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch',
      baseline: 'items-baseline',
    },
    justify: {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
      around: 'justify-around',
      evenly: 'justify-evenly',
    },
    gap: {
      0: 'gap-0',
      1: 'gap-1',
      2: 'gap-2',
      3: 'gap-3',
      4: 'gap-4',
      5: 'gap-5',
      6: 'gap-6',
      8: 'gap-8',
      10: 'gap-10',
      12: 'gap-12',
      16: 'gap-16',
      20: 'gap-20',
      24: 'gap-24',
      32: 'gap-32',
    },
  },
  defaultVariants: {
    direction: 'row',
    wrap: 'nowrap',
    align: 'center',
    justify: 'start',
    gap: 2,
  },
});

interface FlexProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof flexVariants> {}

const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
  ({ className, direction, wrap, align, justify, gap, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(flexVariants({ direction, wrap, align, justify, gap }), className)}
        {...props}
      />
    );
  }
);
Flex.displayName = 'Flex';

// Stack component (vertical flex with consistent spacing)
const stackVariants = cva('flex flex-col', {
  variants: {
    align: {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch',
    },
    gap: {
      0: 'gap-0',
      1: 'gap-1',
      2: 'gap-2',
      3: 'gap-3',
      4: 'gap-4',
      5: 'gap-5',
      6: 'gap-6',
      8: 'gap-8',
      10: 'gap-10',
      12: 'gap-12',
      16: 'gap-16',
      20: 'gap-20',
      24: 'gap-24',
      32: 'gap-32',
    },
    spacing: {
      tight: 'gap-2',
      normal: 'gap-4',
      loose: 'gap-6',
      relaxed: 'gap-8',
    },
  },
  defaultVariants: {
    align: 'stretch',
    gap: 4,
  },
});

interface StackProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stackVariants> {}

const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  ({ className, align, gap, spacing, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(stackVariants({ align, gap, spacing }), className)}
        {...props}
      />
    );
  }
);
Stack.displayName = 'Stack';

// HStack and VStack convenience components
interface HStackProps extends Omit<FlexProps, 'direction'> {}
interface VStackProps extends Omit<StackProps, 'direction'> {}

const HStack = React.forwardRef<HTMLDivElement, HStackProps>(
  ({ className, ...props }, ref) => {
    return (
      <Flex
        ref={ref}
        direction="row"
        className={className}
        {...props}
      />
    );
  }
);
HStack.displayName = 'HStack';

const VStack = React.forwardRef<HTMLDivElement, VStackProps>(
  ({ className, ...props }, ref) => {
    return (
      <Stack
        ref={ref}
        className={className}
        {...props}
      />
    );
  }
);
VStack.displayName = 'VStack';

// Center component for centering content
interface CenterProps extends React.HTMLAttributes<HTMLDivElement> {
  maxWidth?: string;
}

const Center = React.forwardRef<HTMLDivElement, CenterProps>(
  ({ className, maxWidth, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex items-center justify-center', className)}
        style={maxWidth ? { maxWidth } : undefined}
        {...props}
      />
    );
  }
);
Center.displayName = 'Center';

// Spacer component for flexible spacing
interface SpacerProps extends React.HTMLAttributes<HTMLDivElement> {}

const Spacer = React.forwardRef<HTMLDivElement, SpacerProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex-1', className)}
        {...props}
      />
    );
  }
);
Spacer.displayName = 'Spacer';

// Divider component
interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
  thickness?: 'thin' | 'normal' | 'thick';
}

const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  ({ className, orientation = 'horizontal', thickness = 'normal', ...props }, ref) => {
    const thicknessClasses = {
      thin: 'h-px',
      normal: 'h-0.5',
      thick: 'h-1',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'bg-lingua-border',
          orientation === 'horizontal' ? thicknessClasses[thickness] : 'w-px h-full',
          className
        )}
        {...props}
      />
    );
  }
);
Divider.displayName = 'Divider';

export {
  Grid,
  Flex,
  Stack,
  HStack,
  VStack,
  Center,
  Spacer,
  Divider,
};

export type {
  GridProps,
  FlexProps,
  StackProps,
  HStackProps,
  VStackProps,
  CenterProps,
  SpacerProps,
  DividerProps,
};