# Design System Migration Guide

## What Changed

The Disrupt Design System has been moved to its own repository:
- **Repo:** https://github.com/Spilno-me/disrupt-design-system
- **Package:** `@disrupt/design-system`
- **Local Path:** `/Users/adrozdenko/Desktop/DDS/`

## Installation

Already installed via:
```bash
npm install git+https://github.com/Spilno-me/disrupt-design-system.git
```

## Import Changes Required

### Before (Old - Local imports):
```typescript
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { COLORS, TYPOGRAPHY } from '@/constants/designTokens'
```

### After (New - Package imports):
```typescript
import { Button } from '@disrupt/design-system'
import { Card } from '@disrupt/design-system'
import { COLORS, TYPOGRAPHY } from '@disrupt/design-system/tokens'
```

## Files to Update

### Components Using UI Components:
- All files in `src/components/sections/*.tsx`
- All files in `src/components/forms/*.tsx`
- All files in `src/pages/*.tsx`

### Files Using Design Tokens:
- Any file importing from `@/constants/designTokens`
- Any file importing from `@/constants/tailwindClasses`

## What Stays in Website Repo

- Page components (`src/pages/`)
- Section components (`src/components/sections/`)
- Form components (`src/components/forms/`)
- Layout components (`src/components/layout/`)
- Hooks (`src/hooks/`)
- Services (`src/services/`)
- i18n translations (`src/i18n/`)
- Backend (`backend/`)

## What Moved to Design System Repo

- All UI components (`src/components/ui/`)
- Design tokens (`src/constants/designTokens.ts`)
- Tailwind classes (`src/constants/tailwindClasses.ts`)
- Fonts (`src/fonts/`)
- Storybook (`.storybook/`, `src/stories/`)

## Next Steps

1. ✅ Design system repo created and pushed
2. ✅ Package installed in website
3. ⏳ Update all imports in website (NEXT)
4. ⏳ Remove old files from website
5. ⏳ Test website still works
6. ⏳ Commit changes

## Notes

- The design system can now be used in Flow, Market, and Partner products
- Updates to design system require: commit to DDS → npm update in consuming repos
- For local development: use `npm link` (instructions below if needed)
