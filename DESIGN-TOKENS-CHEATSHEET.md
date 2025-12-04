# Design Tokens Quick Reference

## Colors

### Brand Colors (Tailwind Utilities)

```tsx
// Primary (Dark) - #2D3142
bg-primary text-primary border-primary

// Accent (Teal) - #08A4BD
bg-accent text-accent border-accent

// Error (Red) - #F70D1A
bg-error text-error border-error

// Background - #FBFBF3
bg-background

// Surface (White) - #FFFFFF
bg-surface
```

### Color Scales

```tsx
// Dark scale: dark-50 to dark-900
bg-dark-500 text-dark-600 hover:bg-dark-700

// Teal scale: teal-50 to teal-900
bg-teal-500 hover:bg-teal-600

// Red scale: red-50 to red-900
bg-red-500 border-red-600

// Cream scale: cream-50 to cream-900
bg-cream-300 border-cream-400

// Muted scale: muted-50 to muted-900
text-muted-500
```

### Text Colors

```tsx
text-text-primary      // #2D3142 - Primary text
text-text-secondary    // #5E4F7E - Secondary text
text-text-disabled     // #9FA5B0 - Disabled text
text-text-inverse      // #FFFFFF - White text
```

---

## Spacing

```tsx
p-0    // 0px
p-1    // 4px
p-2    // 8px
p-3    // 12px
p-4    // 16px
p-6    // 24px
p-8    // 32px
p-12   // 48px
p-16   // 64px
p-24   // 96px
```

Use with: `p-`, `m-`, `px-`, `py-`, `mt-`, `gap-`, etc.

---

## Typography

### Font Families

```tsx
font-display  // Pilat Extended (headings)
font-sans     // Fixel (body text)
font-mono     // Fira Code (code)
```

### Font Sizes

```tsx
text-xs    // 12px
text-sm    // 14px
text-base  // 16px
text-lg    // 18px
text-xl    // 20px
text-2xl   // 24px
text-3xl   // 30px
text-4xl   // 36px
text-5xl   // 48px
text-6xl   // 60px
text-7xl   // 72px
```

### Font Weights

```tsx
font-normal    // 400
font-medium    // 500
font-semibold  // 600
font-bold      // 700
```

### Line Heights

```tsx
leading-tight    // 1.25
leading-normal   // 1.5
leading-relaxed  // 1.625
```

---

## Shadows

```tsx
shadow-none
shadow-sm
shadow-md
shadow-lg
shadow-xl
shadow-2xl

// Custom shadows
shadow-image   // Image-specific shadow
shadow-header  // Header glass effect
shadow-button  // Button shadow
```

---

## Border Radius

```tsx
rounded-none  // 0px
rounded-sm    // 8px
rounded-md    // 12px
rounded-lg    // 16px
rounded-xl    // 20px
rounded-2xl   // 24px
rounded-full  // 9999px
```

---

## Transitions

```tsx
// Duration
transition duration-instant  // 75ms
transition duration-fast     // 150ms
transition duration-normal   // 200ms
transition duration-smooth   // 300ms
transition duration-slow     // 500ms

// Timing
ease-linear
ease-easeIn
ease-easeOut
ease-easeInOut

// Combined
transition-colors duration-normal
transition-all duration-smooth ease-easeOut
```

---

## Breakpoints

```tsx
sm:   // 640px
md:   // 768px
lg:   // 1024px
xl:   // 1280px
2xl:  // 1440px

// Example
<div className="p-4 md:p-6 lg:p-8 xl:p-12">
  Responsive padding
</div>
```

---

## Z-Index

```tsx
z-base         // 0
z-dropdown     // 10
z-sticky       // 20
z-header       // 50
z-modal        // 100
z-tooltip      // 150
z-notification // 200
```

---

## Pre-composed Classes

### Layout

```tsx
import { LAYOUT_CLASSES } from '@/constants/tailwindClasses'

LAYOUT_CLASSES.container          // Container with max-width
LAYOUT_CLASSES.sectionPadding     // Section padding
LAYOUT_CLASSES.flexCenter         // Flex center
LAYOUT_CLASSES.twoColumn          // Two-column layout
LAYOUT_CLASSES.grid2              // 2-column grid
```

### Typography

```tsx
import { TEXT_CLASSES } from '@/constants/tailwindClasses'

TEXT_CLASSES.h1                  // H1 styling
TEXT_CLASSES.h2                  // H2 styling
TEXT_CLASSES.sectionHeading      // Section heading
TEXT_CLASSES.body                // Body text
```

### Buttons

```tsx
import { BUTTON_CLASSES } from '@/constants/tailwindClasses'

BUTTON_CLASSES.base              // Base button
BUTTON_CLASSES.primary           // Primary variant
BUTTON_CLASSES.secondary         // Secondary variant
BUTTON_CLASSES.md                // Medium size
```

### Cards

```tsx
import { CARD_CLASSES } from '@/constants/tailwindClasses'

CARD_CLASSES.base                // Base card
CARD_CLASSES.padding             // Card padding
CARD_CLASSES.hover               // Hover effect
```

---

## Common Patterns

### Button

```tsx
<button className="bg-primary text-white rounded-md px-4 py-2 transition-colors duration-normal hover:bg-dark-600">
  Click me
</button>
```

### Card

```tsx
<div className="bg-surface rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
  Card content
</div>
```

### Section

```tsx
<section className="py-16 lg:py-24">
  <div className="max-w-container mx-auto px-6 lg:px-10">
    <h2 className="text-2xl lg:text-3xl font-display font-semibold">
      Section Title
    </h2>
  </div>
</section>
```

### Two-Column Layout

```tsx
<div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
  <div>Column 1</div>
  <div>Column 2</div>
</div>
```

### Glass Effect

```tsx
<div className="backdrop-blur-[10px] bg-glass-bg border-b border-accent">
  Glass morphism
</div>
```

---

## Direct Token Usage (for dynamic styles)

```tsx
import { COLORS, SPACING, TYPOGRAPHY } from '@/constants/designTokens'

// In style prop
<div style={{
  backgroundColor: COLORS.primary,
  padding: SPACING[6],
  fontFamily: TYPOGRAPHY.fontFamily.display
}}>
  Dynamic styling
</div>
```

---

## Tips

1. **Always prefer Tailwind utilities** over hardcoded values
2. **Use semantic names** (`bg-primary`) instead of scale values (`bg-dark-500`)
3. **Use pre-composed classes** for consistency
4. **Use design tokens directly** only when Tailwind isn't sufficient
5. **Combine utilities** with the `cn()` helper from `@/lib/utils`

```tsx
import { cn } from '@/lib/utils'

<div className={cn(
  "base-classes",
  condition && "conditional-classes",
  "more-classes"
)}>
  Content
</div>
```
