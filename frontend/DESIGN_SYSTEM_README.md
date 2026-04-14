# Lingo Design System

A comprehensive, accessible, and scalable design system for the Lingo language learning platform. Built with React, TypeScript, and Tailwind CSS.

## Overview

This design system provides a complete set of reusable UI components, design tokens, and utilities that ensure consistency across the Lingo platform while maintaining accessibility and performance standards.

## Design Principles

- **Accessibility First**: All components follow WCAG 2.1 guidelines
- **Consistency**: Unified design language across all components
- **Scalability**: Modular architecture that grows with the platform
- **Performance**: Optimized components with minimal bundle impact
- **Type Safety**: Full TypeScript support for better developer experience

## Color Palette

The design system uses a carefully crafted color palette that supports the Lingo brand identity:

### Primary Colors
- **Primary**: `hsl(262.1, 83.3%, 57.8%)` - Main brand purple
- **Secondary**: `hsl(210, 40%, 96%)` - Light blue accent

### Semantic Colors
- **Success**: `hsl(142.1, 76.2%, 36.3%)` - Green for positive actions
- **Warning**: `hsl(32.5, 94.6%, 43.7%)` - Orange for warnings
- **Error**: `hsl(0, 84.2%, 60.2%)` - Red for errors
- **Info**: `hsl(199.4, 89%, 48.3%)` - Blue for information

### Neutral Colors
- **Background**: Multiple layers for depth and hierarchy
- **Text**: Four levels of text contrast
- **Border**: Subtle borders for component separation

## Typography

### Font Families
- **Display**: Inter (headings, prominent text)
- **Body**: Poppins (body text, UI elements)

### Scale
- **H1**: 4xl-5xl (2.25rem-3rem) - Page titles
- **H2**: 3xl-4xl (1.875rem-2.25rem) - Section headers
- **H3**: 2xl-3xl (1.5rem-1.875rem) - Component titles
- **H4**: xl-2xl (1.25rem-1.5rem) - Card headers
- **Body**: base (1rem) - Default text
- **Small**: sm (0.875rem) - Secondary text

## Spacing Scale

Consistent spacing using a 4px base unit:
- 1: 0.25rem (4px)
- 2: 0.5rem (8px)
- 3: 0.75rem (12px)
- 4: 1rem (16px)
- 5: 1.25rem (20px)
- 6: 1.5rem (24px)
- 8: 2rem (32px)
- 10: 2.5rem (40px)
- 12: 3rem (48px)
- 16: 4rem (64px)
- 20: 5rem (80px)
- 24: 6rem (96px)

## Component Categories

### Core Components
- **Button**: Multiple variants, sizes, and states
- **Card**: Flexible content containers with hover effects
- **Badge**: Status indicators and labels
- **Text**: Typography component with semantic variants

### Layout Components
- **Grid**: Responsive grid system
- **Flex**: Flexible layout utilities
- **Stack**: Vertical spacing component
- **Container**: Content width constraints
- **Center**: Centering utilities

### Form Components
- **Input**: Text input with validation states
- **Textarea**: Multi-line text input
- **Select**: Dropdown selection
- **Checkbox**: Boolean input
- **Radio**: Single selection from options
- **FormField**: Form field wrapper with labels and errors

### Data Display
- **Table**: Data tables with sorting
- **List**: Ordered and unordered lists
- **DataCard**: Information display cards
- **StatsCard**: Metric display with trends
- **ProgressCard**: Progress indicators

### Navigation
- **Breadcrumbs**: Navigation hierarchy
- **Tabs**: Tabbed content navigation
- **Pagination**: Page navigation
- **Menu**: Navigation menus
- **Stepper**: Multi-step processes

### Feedback
- **Spinner**: Loading indicators
- **Skeleton**: Content placeholders
- **ProgressBar**: Progress indicators
- **Toast**: Non-intrusive notifications
- **Alert**: Contextual messages
- **Banner**: Important announcements

### Overlays
- **Modal**: Dialog overlays
- **Drawer**: Slide-out panels
- **Tooltip**: Contextual help
- **Popover**: Floating content

### Charts & Visualization
- **BarChart**: Bar chart component
- **LineChart**: Line chart with data points
- **PieChart**: Circular data representation
- **ProgressRing**: Circular progress indicator
- **Sparkline**: Mini line charts
- **DataTable**: Advanced data tables

## Usage Examples

### Basic Button
```tsx
import { Button } from '@/components/ui';

<Button variant="primary" size="md">
  Click me
</Button>
```

### Card with Content
```tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';

<Card variant="elevated">
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
</Card>
```

### Form with Validation
```tsx
import { FormField, Input, Button } from '@/components/ui';

<FormField label="Email" error={errors.email}>
  <Input
    type="email"
    placeholder="Enter your email"
    error={!!errors.email}
  />
</FormField>
```

### Data Table
```tsx
import { DataTable } from '@/components/ui';

const columns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'status', label: 'Status', render: (value) => <Badge>{value}</Badge> }
];

<DataTable data={users} columns={columns} />
```

### Toast Notifications
```tsx
import { useToastSuccess, useToastError } from '@/components/ui';

const { addToast } = useToastSuccess();
const { addError } = useToastError();

addToast('Success!', 'Operation completed successfully');
addError('Error!', 'Something went wrong');
```

## Theme Support

The design system includes built-in dark mode support:

```tsx
import { ThemeProvider, ThemeToggle } from '@/components/ui';

function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <ThemeToggle />
      {/* Your app content */}
    </ThemeProvider>
  );
}
```

## Accessibility Features

- **Keyboard Navigation**: All interactive elements are keyboard accessible
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Focus Management**: Visible focus indicators and logical tab order
- **Color Contrast**: Meets WCAG AA standards
- **Reduced Motion**: Respects user motion preferences

## Customization

### Design Tokens
Modify design tokens in `src/lib/design-tokens.ts`:

```ts
export const colors = {
  primary: {
    50: 'hsl(262.1, 83.3%, 97.8%)',
    // ... other shades
    900: 'hsl(262.1, 83.3%, 17.8%)',
  },
  // ... other color categories
};
```

### Component Variants
Add new component variants in `src/lib/component-variants.ts`:

```ts
export const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors',
  {
    variants: {
      variant: {
        primary: 'bg-lingua-primary text-white hover:bg-lingua-primary-hover',
        // Add your custom variant here
        custom: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white',
      },
      // ... other variants
    },
  }
);
```

## Performance Considerations

- **Tree Shaking**: Only import components you use
- **Lazy Loading**: Load heavy components asynchronously
- **Memoization**: Components use React.memo where appropriate
- **Bundle Size**: Minimal dependencies, optimized for modern bundlers

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

When adding new components:

1. Follow the existing naming conventions
2. Include TypeScript types
3. Add accessibility features
4. Include usage examples
5. Test across different screen sizes
6. Update this documentation

## Migration Guide

### From Previous Versions

If migrating from an older version:

1. Update import paths to use the new index file
2. Check for deprecated props and update accordingly
3. Review theme changes and update customizations
4. Test accessibility features

## Support

For questions or issues with the design system:

1. Check the component documentation
2. Review the examples in the codebase
3. Create an issue with reproduction steps
4. Contact the design system maintainers

---

Built with ❤️ for the Lingo language learning community.