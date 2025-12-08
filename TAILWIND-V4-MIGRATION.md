# Tailwind v4 Migration Summary

## Key Changes for Tailwind v4

### Configuration Method
- **Tailwind v3**: Used `tailwind.config.js` (JavaScript)
- **Tailwind v4**: Uses `@theme` directive in CSS (`src/input.css`)

### What Was Fixed

#### 1. Custom Max-Width Utilities
**Problem**: `max-w-container` class wasn't being generated
**Solution**: Added to `@theme` block in `src/input.css`:
```css
@theme {
  --max-width-container: 1358px;
  --max-width-hero: 1358px;
  --max-width-header: 1358px;
}
```

#### 2. Design Tokens in CSS
All design tokens are now defined in the `@theme` block:

**Colors**:
- `--color-primary`, `--color-accent`, `--color-muted`, etc.
- Generates utilities like `bg-primary`, `text-accent`, `text-muted`

**Spacing**:
- `--spacing: 0.25rem` (base unit)
- Tailwind's spacing scale works automatically

**Border Radius**:
- `--radius-sm` through `--radius-full`
- Generates `rounded-sm`, `rounded-md`, etc.

**Shadows**:
- `--shadow-sm` through `--shadow-2xl`
- Generates `shadow-sm`, `shadow-md`, etc.

**Transitions**:
- `--transition-fast`, `--transition-normal`, `--transition-smooth`

### Files Modified

1. **src/input.css** - Added comprehensive `@theme` block
2. **src/constants/designTokens.ts** - Source of truth for tokens (1358px max-width)
3. **tailwind.config.js** - Still exists but not used by Tailwind v4

### Current Status

✅ All design tokens properly configured
✅ Custom utilities (max-w-container) working
✅ 1358px max-width applied correctly
✅ All colors, spacing, shadows, radius defined
✅ Website displaying correctly

### Important Notes

- Tailwind v4 scans `src/input.css` for `@theme` configuration
- JavaScript config file (`tailwind.config.js`) is ignored
- CSS variables follow naming convention: `--{property}-{name}`
  - Max widths: `--max-width-{name}` → `max-w-{name}`
  - Colors: `--color-{name}` → `bg-{name}`, `text-{name}`
  - Radius: `--radius-{name}` → `rounded-{name}`
  - Shadows: `--shadow-{name}` → `shadow-{name}`

### Design Token Sources

Primary source: `src/constants/designTokens.ts`
- Contains all design values
- Imported into Tailwind v4 via `@theme` in `src/input.css`
- Can be reused in React Native or other platforms

### Remaining Arbitrary Values

Some arbitrary values remain intentionally:
- Custom font sizes for specific headings (e.g., `text-[48px]`)
- Specific heights for hero sections
- Dynamic/calculated values in inline styles
- One-off custom values that don't need tokens

These are acceptable and don't require migration unless they become reusable patterns.
