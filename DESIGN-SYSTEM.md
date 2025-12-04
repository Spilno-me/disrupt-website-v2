# Disrupt Inc. Design System

**Version:** 2.0
**Last Updated:** 2025-12-04

---

## Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Getting Started](#getting-started)
4. [Design Tokens](#design-tokens)
5. [Usage Examples](#usage-examples)
6. [Platform Compatibility](#platform-compatibility)
7. [Migration Guide](#migration-guide)

---

## Overview

The Disrupt Inc. Design System is a **platform-agnostic**, **token-based** design system that provides a single source of truth for all design decisions. It's built to be portable across web, mobile, and other platforms.

### Key Features

- ✅ **Pure Design Tokens** - No platform-specific code in token definitions
- ✅ **Tailwind Integration** - Seamless integration with Tailwind CSS
- ✅ **TypeScript Support** - Full type safety and autocomplete
- ✅ **Multi-Platform** - Can be consumed by React, React Native, Vue, etc.
- ✅ **Comprehensive** - Colors, typography, spacing, shadows, animations, and more
- ✅ **Accessible** - Built-in focus states and WCAG-compliant colors

---

## Architecture

```
Design Tokens (Pure Data)
    ↓
Platform Adapters (Tailwind, React Native, etc.)
    ↓
Components (React, Vue, etc.)
```

### File Structure

```
src/constants/
├── designTokens.ts      # Pure design tokens (platform-agnostic)
└── tailwindClasses.ts   # Pre-composed Tailwind utility classes

tailwind.config.js       # Tailwind configuration consuming tokens
```

---

## Getting Started

### Installation

The design system is already integrated into this project. To use it:

```typescript
// Import design tokens
import { COLORS, SPACING, TYPOGRAPHY } from '@/constants/designTokens'

// Import Tailwind class helpers
import { LAYOUT_CLASSES, TEXT_CLASSES } from '@/constants/tailwindClasses'
```

### In Components

```tsx
// Option 1: Use Tailwind utilities (recommended)
<div className="bg-primary text-white rounded-lg shadow-md p-6">
  <h2 className="text-2xl font-display font-semibold">Hello World</h2>
</div>

// Option 2: Use pre-composed classes
<div className={CARD_CLASSES.base}>
  <h2 className={TEXT_CLASSES.h2}>Hello World</h2>
</div>

// Option 3: Use tokens directly (for dynamic styles)
<div style={{ backgroundColor: COLORS.primary }}>
  Hello World
</div>
```

---

## Design Tokens

### Colors

All colors follow a 50-900 scale, where 500 is the base color.

#### Brand Colors

```typescript
import { COLORS } from '@/constants/designTokens'

// Dark Scale (Primary)
COLORS.dark[500]  // #2D3142 - Primary brand color

// Teal Scale (Accent)
COLORS.teal[500]  // #08A4BD - Accent/link color

// Ferrari Red Scale
COLORS.red[500]   // #F70D1A - Brand accent

// Cream Scale (Backgrounds)
COLORS.cream[300] // #FBFBF3 - Main background

// Muted Purple Scale (Secondary text)
COLORS.muted[500] // #5E4F7E - Secondary text
```

#### Semantic Colors

```typescript
COLORS.primary      // Main brand color
COLORS.accent       // Links and accents
COLORS.background   // Page background
COLORS.surface      // Card/surface background
COLORS.error        // Error states

COLORS.text.primary    // Primary text
COLORS.text.secondary  // Secondary text
COLORS.text.disabled   // Disabled text
COLORS.text.inverse    // White text on dark
```

#### Usage in Tailwind

```tsx
<div className="bg-primary text-white">Primary button</div>
<div className="bg-accent hover:bg-teal-600">Accent button</div>
<p className="text-text-secondary">Secondary text</p>
```

---

### Spacing

T-shirt sizing scale from `px` to `96` (1px to 384px).

```typescript
import { SPACING } from '@/constants/designTokens'

SPACING[0]    // 0px
SPACING[1]    // 4px
SPACING[4]    // 16px
SPACING[6]    // 24px
SPACING[12]   // 48px
SPACING[24]   // 96px
```

#### Usage in Tailwind

```tsx
<div className="p-6 mb-4 gap-8">
  {/* p-6 = 24px padding */}
  {/* mb-4 = 16px margin-bottom */}
  {/* gap-8 = 32px gap */}
</div>
```

---

### Typography

#### Font Families

```typescript
TYPOGRAPHY.fontFamily.display  // "Pilat Extended" - Headings
TYPOGRAPHY.fontFamily.sans     // "Fixel" - Body text
TYPOGRAPHY.fontFamily.mono     // "Fira Code" - Code
```

#### Font Sizes

```typescript
TYPOGRAPHY.fontSize.xs    // 12px
TYPOGRAPHY.fontSize.sm    // 14px
TYPOGRAPHY.fontSize.base  // 16px
TYPOGRAPHY.fontSize.lg    // 18px
TYPOGRAPHY.fontSize.xl    // 20px
TYPOGRAPHY.fontSize['2xl'] // 24px
// ... up to 9xl (128px)
```

#### Usage in Tailwind

```tsx
<h1 className="font-display text-6xl font-bold">
  Hero Heading
</h1>

<p className="font-sans text-base text-text-secondary">
  Body text with secondary color
</p>
```

#### Pre-composed Text Styles

```tsx
import { TEXT_CLASSES } from '@/constants/tailwindClasses'

<h1 className={TEXT_CLASSES.h1}>Main Heading</h1>
<h2 className={TEXT_CLASSES.sectionHeading}>Section Heading</h2>
<p className={TEXT_CLASSES.body}>Body text</p>
```

---

### Shadows

```typescript
import { SHADOWS } from '@/constants/designTokens'

SHADOWS.sm      // Subtle shadow
SHADOWS.md      // Default shadow
SHADOWS.lg      // Elevated shadow
SHADOWS.xl      // High elevation
SHADOWS['2xl']  // Maximum elevation

// Custom shadows
SHADOWS.image   // Image-specific shadow
SHADOWS.header  // Header glass effect
SHADOWS.button  // Button shadow
```

#### Usage in Tailwind

```tsx
<div className="shadow-md hover:shadow-lg">
  Card with shadow
</div>

<img className="shadow-image rounded-lg" />
```

---

### Border Radius

```typescript
import { RADIUS } from '@/constants/designTokens'

RADIUS.none   // 0px
RADIUS.sm     // 8px
RADIUS.md     // 12px
RADIUS.lg     // 16px
RADIUS.xl     // 20px
RADIUS['2xl'] // 24px
RADIUS.full   // 9999px (circle)
```

#### Usage in Tailwind

```tsx
<button className="rounded-md">Button</button>
<div className="rounded-lg">Card</div>
<img className="rounded-full" />
```

---

### Transitions

```typescript
import { TRANSITIONS } from '@/constants/designTokens'

// Durations
TRANSITIONS.duration.instant  // 75ms
TRANSITIONS.duration.fast     // 150ms
TRANSITIONS.duration.normal   // 200ms
TRANSITIONS.duration.smooth   // 300ms
TRANSITIONS.duration.slow     // 500ms

// Timing functions
TRANSITIONS.timing.linear
TRANSITIONS.timing.easeIn
TRANSITIONS.timing.easeOut
TRANSITIONS.timing.easeInOut
```

#### Usage in Tailwind

```tsx
<button className="transition-colors duration-normal hover:bg-accent">
  Smooth color transition
</button>

<div className="transition-all duration-smooth ease-easeOut">
  Smooth all transitions
</div>
```

#### Pre-composed Transitions

```tsx
import { TRANSITION_CLASSES } from '@/constants/tailwindClasses'

<button className={TRANSITION_CLASSES.colors}>
  Color transition
</button>
```

---

### Breakpoints

```typescript
import { BREAKPOINTS } from '@/constants/designTokens'

BREAKPOINTS.sm    // 640px
BREAKPOINTS.md    // 768px
BREAKPOINTS.lg    // 1024px
BREAKPOINTS.xl    // 1280px
BREAKPOINTS['2xl'] // 1440px
```

#### Usage in Tailwind

```tsx
<div className="p-4 md:p-6 lg:p-8 xl:p-12">
  Responsive padding
</div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  Responsive grid
</div>
```

---

### Z-Index

```typescript
import { Z_INDEX } from '@/constants/designTokens'

Z_INDEX.base         // 0
Z_INDEX.dropdown     // 10
Z_INDEX.sticky       // 20
Z_INDEX.header       // 50
Z_INDEX.modal        // 100
Z_INDEX.tooltip      // 150
Z_INDEX.notification // 200
```

#### Usage in Tailwind

```tsx
<header className="z-header fixed top-0">
  Header
</header>

<div className="z-modal fixed inset-0">
  Modal
</div>
```

---

## Usage Examples

### Button Component

```tsx
import { BUTTON_CLASSES } from '@/constants/tailwindClasses'
import { cn } from '@/lib/utils'

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

export const Button = ({
  variant = 'primary',
  size = 'md',
  children
}: ButtonProps) => {
  return (
    <button
      className={cn(
        BUTTON_CLASSES.base,
        BUTTON_CLASSES[size],
        BUTTON_CLASSES[variant]
      )}
    >
      {children}
    </button>
  )
}
```

### Card Component

```tsx
import { CARD_CLASSES, TRANSITION_CLASSES } from '@/constants/tailwindClasses'
import { cn } from '@/lib/utils'

export const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className={cn(
        CARD_CLASSES.base,
        CARD_CLASSES.padding,
        CARD_CLASSES.hover,
        TRANSITION_CLASSES.shadow
      )}
    >
      {children}
    </div>
  )
}
```

### Section Layout

```tsx
import { LAYOUT_CLASSES, TEXT_CLASSES } from '@/constants/tailwindClasses'

export const Section = ({ title, children }) => {
  return (
    <section className={LAYOUT_CLASSES.sectionPadding}>
      <div className={LAYOUT_CLASSES.container}>
        <h2 className={TEXT_CLASSES.sectionHeading}>{title}</h2>
        <div className={LAYOUT_CLASSES.twoColumn}>
          {children}
        </div>
      </div>
    </section>
  )
}
```

---

## Platform Compatibility

### Web (Tailwind CSS)

Already configured in `tailwind.config.js`. Just use Tailwind utilities.

```tsx
<div className="bg-primary text-white p-6 rounded-lg">
  Hello World
</div>
```

### React Native

Create a React Native adapter:

```typescript
// config/react-native-theme.ts
import { COLORS, SPACING, TYPOGRAPHY } from '@/constants/designTokens'

export const theme = {
  colors: {
    primary: COLORS.primary,
    accent: COLORS.accent,
    // Map all colors
  },
  spacing: {
    xs: parseInt(SPACING[1]),
    sm: parseInt(SPACING[2]),
    // Map all spacing (convert to numbers)
  },
  typography: {
    fontSize: {
      base: parseInt(TYPOGRAPHY.fontSize.base),
      // Map all font sizes
    }
  }
}
```

### CSS Variables

For vanilla CSS/HTML projects:

```css
/* styles/variables.css */
:root {
  --color-primary: #2D3142;
  --color-accent: #08A4BD;
  --spacing-4: 16px;
  --font-display: "Pilat Extended", sans-serif;
}
```

---

## Migration Guide

### From Old System to New System

#### Before (Hardcoded Values)

```tsx
<div className="bg-[#2D3142] text-white">
  Old approach
</div>
```

#### After (Using Tokens)

```tsx
<div className="bg-primary text-white">
  New approach
</div>
```

#### Before (Old designTokens.ts)

```typescript
CLASSES.sectionContainer  // Tailwind classes in tokens
```

#### After (New System)

```typescript
import { LAYOUT_CLASSES } from '@/constants/tailwindClasses'
LAYOUT_CLASSES.container  // Separated from pure tokens
```

### Common Replacements

| Old | New |
|-----|-----|
| `bg-[#2D3142]` | `bg-primary` |
| `bg-[#08A4BD]` | `bg-accent` |
| `bg-[#FBFBF3]` | `bg-background` |
| `text-[#5E4F7E]` | `text-text-secondary` |
| `rounded-[12px]` | `rounded-md` |
| Hardcoded `px-6` | Use `SPACING` scale |

---

## Best Practices

### ✅ Do

- Use Tailwind utilities for styling
- Use semantic color names (`primary`, `accent`) instead of scale numbers in components
- Use pre-composed classes from `tailwindClasses.ts` for consistency
- Use design tokens directly only when Tailwind utilities aren't sufficient
- Keep tokens pure and platform-agnostic

### ❌ Don't

- Don't use hardcoded hex colors (`bg-[#2D3142]`)
- Don't mix token values with Tailwind classes in `designTokens.ts`
- Don't create platform-specific tokens (keep them pure)
- Don't use arbitrary values when a token exists

---

## Contributing

When adding new design tokens:

1. Add the token to `designTokens.ts` as a pure value
2. Add it to `tailwind.config.js` to make it available as a Tailwind utility
3. (Optional) Create pre-composed classes in `tailwindClasses.ts`
4. Document it in this file
5. Test across different components

---

## Future Enhancements

- [ ] Create npm package `@disrupt/design-system`
- [ ] Add Style Dictionary for multi-platform export
- [ ] Integrate with Figma using Tokens Studio
- [ ] Add Storybook for visual documentation
- [ ] Create React Native adapter
- [ ] Add dark mode tokens

---

## Support

For questions or issues with the design system, contact the development team or open an issue in the repository.
