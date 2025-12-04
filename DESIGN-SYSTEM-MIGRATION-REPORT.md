# Design System Migration Report

**Generated:** 2025-12-04
**Status:** Audit Complete - Migration Needed

---

## Executive Summary

The design system has been successfully refactored, but **hardcoded values are still present** in many components. This report identifies all files that need migration to use the new design system tokens.

### Summary Statistics

- ✅ **Design System:** Fully implemented and working
- ⚠️ **Components Using Hardcoded Colors:** 7 files
- ⚠️ **Components Using Arbitrary Values:** 20+ files
- 📊 **Estimated Migration Effort:** 2-4 hours

---

## Priority 1: Hardcoded Colors (High Priority)

These files use hardcoded hex colors instead of design tokens. **Impact:** Inconsistency and maintenance issues.

### Files with Hardcoded Colors

| File | Issue | Current | Should Be |
|------|-------|---------|-----------|
| `src/components/sections/ContactInfo.tsx` | LinkedIn blue | `bg-[#0A66C2]` | `bg-linkedin` |
| `src/components/sections/ContactSection.tsx` | Background color | `bg-[#FBFBF3]` | `bg-background` |
| `src/components/ui/MapWithMarkers.tsx` | Primary color (2x) | `bg-[#2D3142]` | `bg-primary` |
| `src/components/ui/MapWithMarkers.tsx` | Accent color | `text-[#08A4BD]` | `text-accent` |
| `src/components/ui/textarea.tsx` | Accent color | `border-[#08A4BD]` | `border-accent` |
| `src/components/sections/PlatformTiersSection.tsx` | Muted background | `bg-[#5E4F7E]/10` | `bg-muted-50` |
| `src/components/ui/button.tsx` | Primary color | `bg-[#2D3142]` | `bg-primary` |
| `src/components/ui/input.tsx` | Accent color (2x) | `border-[#08A4BD]` | `border-accent` |

### Migration Actions

#### 1. ContactInfo.tsx (Line 103)
```tsx
// Before
className={`absolute inset-0 rounded-full bg-[#0A66C2] ${

// After
className={`absolute inset-0 rounded-full bg-linkedin ${
```

#### 2. ContactSection.tsx (Line 12)
```tsx
// Before
className="w-full lg:w-1/2 bg-[#FBFBF3] px-4 sm:px-6 py-8 sm:py-12 lg:py-16 lg:border-r-dashed-figma"

// After
className="w-full lg:w-1/2 bg-background px-4 sm:px-6 py-8 sm:py-12 lg:py-16 lg:border-r-dashed-figma"
```

#### 3. MapWithMarkers.tsx (Lines 400, 407, 409)
```tsx
// Before
className={`absolute left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#2D3142] text-white text-xs font-medium px-2 py-1 rounded transition-all duration-300 ${
{isMain && <span className="text-[#08A4BD] ml-1">(HQ)</span>}
<div className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2 h-2 bg-[#2D3142] rotate-45" />

// After
className={`absolute left-1/2 -translate-x-1/2 whitespace-nowrap bg-primary text-white text-xs font-medium px-2 py-1 rounded transition-all duration-300 ${
{isMain && <span className="text-accent ml-1">(HQ)</span>}
<div className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2 h-2 bg-primary rotate-45" />
```

#### 4. textarea.tsx (Line 11)
```tsx
// Before
"placeholder:text-[#08A4BD] focus-visible:border-[#08A4BD] focus-visible:ring-[#08A4BD]/20

// After
"placeholder:text-accent focus-visible:border-accent focus-visible:ring-accent/20
```

#### 5. PlatformTiersSection.tsx (Line 317)
```tsx
// Before
<tr className="bg-[#5E4F7E]/10">

// After
<tr className="bg-muted-50">
```

#### 6. button.tsx (Line 24)
```tsx
// Before
"h-12 bg-[#2D3142] text-white hover:bg-[#2D3142]/90 rounded-[12px] px-8 py-3 text-base font-medium",

// After
"h-12 bg-primary text-white hover:bg-dark-600 rounded-md px-8 py-3 text-base font-medium",
```

#### 7. input.tsx (Lines 12-13)
```tsx
// Before
"placeholder:text-[#08A4BD] selection:bg-primary selection:text-primary-foreground
"focus-visible:border-[#08A4BD] focus-visible:ring-[#08A4BD]/20 focus-visible:ring-[3px]",

// After
"placeholder:text-accent selection:bg-primary selection:text-primary-foreground
"focus-visible:border-accent focus-visible:ring-accent/20 focus-visible:ring-[3px]",
```

---

## Priority 2: Arbitrary Pixel Values (Medium Priority)

These files use arbitrary pixel values in brackets `[XXXpx]` instead of design system spacing/radius tokens.

### Common Patterns to Replace

| Current | Should Be | Reasoning |
|---------|-----------|-----------|
| `rounded-[12px]` | `rounded-md` | Uses design system radius |
| `rounded-[14px]` | `rounded-lg` | Closest match in system |
| `rounded-[16px]` | `rounded-lg` | Uses design system radius |
| `rounded-[8px]` | `rounded-sm` | Uses design system radius |
| `rounded-[6px]` | `rounded-sm` | Closest match |
| `max-w-[1440px]` | `max-w-container` | Named container width |
| `h-[54px]` | Custom (not in scale) | Consider standardizing |
| `text-[32px]` | `text-3xl` | Uses design system font size |

### Files Needing Arbitrary Value Cleanup

**High Impact (UI Components):**
1. `src/components/ui/button.tsx` - `rounded-[12px]` → `rounded-md`
2. `src/components/ui/input.tsx` - Should already use design system
3. `src/components/ui/textarea.tsx` - Should already use design system
4. `src/components/ui/ElectricInput.tsx` - `rounded-[6px]`, `rounded-[8px]`, `rounded-[10px]`
5. `src/components/ui/MapWithMarkers.tsx` - `rounded-[16px]` → `rounded-lg`
6. `src/components/ui/SectionLayout.tsx` - Multiple arbitrary values
7. `src/components/ui/OptimizedImage.tsx` - `rounded-[16px]` → `rounded-lg`

**Medium Impact (Sections):**
1. `src/components/sections/PricingCardsSection.tsx` - `rounded-[14px]` → `rounded-lg`
2. `src/components/sections/StrategicAdvisorySection.tsx` - `rounded-[14px]` → `rounded-lg`
3. `src/components/sections/FAQSection.tsx` - `text-[32px]` → `text-3xl`
4. `src/components/sections/FeaturesGridSection.tsx` - `text-[32px]` → `text-3xl`

**Low Impact (Layout):**
1. `src/components/layout/Header.tsx` - Multiple arbitrary values
2. `src/components/layout/Footer.tsx` - `max-w-[1440px]` → `max-w-container`
3. `src/components/layout/PageLayout.tsx` - `h-[200px]` (consider standardizing)

---

## Priority 3: Missing Design System Utilities (Low Priority)

These components could benefit from using pre-composed classes from `tailwindClasses.ts`.

### Opportunities for Improvement

1. **Header.tsx** - Could use `BUTTON_CLASSES` for CTA buttons
2. **ContactFormFields.tsx** - Could use `INPUT_CLASSES`
3. **All Section Components** - Could use `LAYOUT_CLASSES.container` instead of repeated `max-w-[1440px] mx-auto px-4 sm:px-6`

---

## Migration Strategy

### Phase 1: Critical Colors (1 hour)
Fix all hardcoded hex colors to use design system color utilities.

**Files:** 7 files
- ContactInfo.tsx
- ContactSection.tsx
- MapWithMarkers.tsx
- textarea.tsx
- PlatformTiersSection.tsx
- button.tsx
- input.tsx

### Phase 2: Arbitrary Values (1-2 hours)
Replace arbitrary pixel values with design system tokens.

**Priority Files:**
- All UI components (`src/components/ui/`)
- High-traffic sections (Pricing, FAQ, Features)

### Phase 3: Optimization (1 hour)
Use pre-composed classes where appropriate for consistency.

**Focus Areas:**
- Section containers → `LAYOUT_CLASSES.container`
- Button variants → `BUTTON_CLASSES`
- Text styles → `TEXT_CLASSES`

---

## Automated Migration Script

Here's a bash script to help with bulk replacements:

```bash
#!/bin/bash
# design-system-migration.sh

# Color replacements
find src -name "*.tsx" -type f -exec sed -i '' 's/bg-\[#0A66C2\]/bg-linkedin/g' {} +
find src -name "*.tsx" -type f -exec sed -i '' 's/bg-\[#FBFBF3\]/bg-background/g' {} +
find src -name "*.tsx" -type f -exec sed -i '' 's/bg-\[#2D3142\]/bg-primary/g' {} +
find src -name "*.tsx" -type f -exec sed -i '' 's/text-\[#08A4BD\]/text-accent/g' {} +
find src -name "*.tsx" -type f -exec sed -i '' 's/border-\[#08A4BD\]/border-accent/g' {} +
find src -name "*.tsx" -type f -exec sed -i '' 's/bg-\[#5E4F7E\]/bg-muted-500/g' {} +

# Border radius replacements
find src -name "*.tsx" -type f -exec sed -i '' 's/rounded-\[12px\]/rounded-md/g' {} +
find src -name "*.tsx" -type f -exec sed -i '' 's/rounded-\[16px\]/rounded-lg/g' {} +
find src -name "*.tsx" -type f -exec sed -i '' 's/rounded-\[14px\]/rounded-lg/g' {} +
find src -name "*.tsx" -type f -exec sed -i '' 's/rounded-\[8px\]/rounded-sm/g' {} +
find src -name "*.tsx" -type f -exec sed -i '' 's/rounded-\[6px\]/rounded-sm/g' {} +

# Container max-width
find src -name "*.tsx" -type f -exec sed -i '' 's/max-w-\[1440px\]/max-w-container/g' {} +

# Font sizes
find src -name "*.tsx" -type f -exec sed -i '' 's/text-\[32px\]/text-3xl/g' {} +

echo "Migration complete! Please review changes and test."
```

**⚠️ Warning:** Always review changes manually and test thoroughly. Use git to track changes.

---

## Testing Checklist

After migration, test these areas:

- [ ] All buttons render correctly with proper colors
- [ ] Input fields have correct placeholder and focus colors
- [ ] Map markers display with correct colors
- [ ] Section backgrounds use correct cream color
- [ ] LinkedIn button has correct blue
- [ ] All border radius values look consistent
- [ ] Container widths are correct (1440px)
- [ ] Typography sizes match design
- [ ] Mobile responsive breakpoints work
- [ ] Dark mode (if applicable) works correctly

---

## Benefits After Migration

### Before Migration
```tsx
<button className="h-12 bg-[#2D3142] text-white hover:bg-[#2D3142]/90 rounded-[12px]">
  Click me
</button>
```

### After Migration
```tsx
<button className="h-12 bg-primary text-white hover:bg-dark-600 rounded-md">
  Click me
</button>
```

**Benefits:**
1. ✅ Consistent with design system
2. ✅ Shorter, more readable code
3. ✅ Easier to maintain
4. ✅ Autocomplete works better
5. ✅ Centralized color changes

---

## Next Steps

1. **Review this report** - Understand the scope
2. **Create feature branch** - `git checkout -b refactor/migrate-to-design-system`
3. **Run Phase 1** - Fix critical colors (1 hour)
4. **Test thoroughly** - Ensure no visual regressions
5. **Run Phase 2** - Fix arbitrary values (1-2 hours)
6. **Run Phase 3** - Optimize with pre-composed classes (1 hour)
7. **Create PR** - Document all changes

---

## Tracking Progress

Create a checklist:

```markdown
## Phase 1: Critical Colors
- [ ] src/components/sections/ContactInfo.tsx
- [ ] src/components/sections/ContactSection.tsx
- [ ] src/components/ui/MapWithMarkers.tsx
- [ ] src/components/ui/textarea.tsx
- [ ] src/components/sections/PlatformTiersSection.tsx
- [ ] src/components/ui/button.tsx
- [ ] src/components/ui/input.tsx

## Phase 2: UI Components
- [ ] src/components/ui/ElectricInput.tsx
- [ ] src/components/ui/SectionLayout.tsx
- [ ] src/components/ui/OptimizedImage.tsx
- [ ] src/components/ui/mobile-menu.tsx

## Phase 3: Sections
- [ ] src/components/sections/PricingCardsSection.tsx
- [ ] src/components/sections/FAQSection.tsx
- [ ] src/components/sections/FeaturesGridSection.tsx
- [ ] src/components/sections/StrategicAdvisorySection.tsx

## Phase 4: Layout
- [ ] src/components/layout/Header.tsx
- [ ] src/components/layout/Footer.tsx
```

---

## Support

If you need help with migration:
1. Refer to `DESIGN-TOKENS-CHEATSHEET.md` for quick lookups
2. Refer to `DESIGN-SYSTEM.md` for detailed documentation
3. Test locally with `npm run dev`
4. Build to verify: `npm run build`

---

## Conclusion

Your design system infrastructure is solid, but components need to be updated to use it consistently. The migration is straightforward and will result in more maintainable code.

**Total Estimated Time:** 2-4 hours
**Total Files to Update:** ~20 files
**Impact:** High - Better consistency and maintainability
