import { LAYOUT, COLOR_CONSTANTS } from '@/constants/designTokens'

// =============================================================================
// COLOR UTILITIES
// =============================================================================

/**
 * Calculate perceived brightness of a color (0-255)
 * Uses the relative luminance formula that accounts for human eye sensitivity
 */
export function getColorBrightness(color: string): number {
  const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/)
  if (!match) return 255 // Default to bright (use dark text)

  const r = parseInt(match[1], 10)
  const g = parseInt(match[2], 10)
  const b = parseInt(match[3], 10)

  return (r * 299 + g * 587 + b * 114) / 1000
}

/**
 * Determines if text should be dark or light based on background brightness
 */
export function getContrastMode(bgColor: string): 'dark' | 'light' {
  const brightness = getColorBrightness(bgColor)
  return brightness > COLOR_CONSTANTS.BRIGHTNESS_THRESHOLD ? 'dark' : 'light'
}

// =============================================================================
// ELEMENT DETECTION
// =============================================================================

const HEADER_SELECTOR = '[data-element="main-header"]'
const DARK_BG_SELECTOR = '[data-dark-background="true"]'

/**
 * Checks if an element should be skipped (header and its children)
 */
function shouldSkipElement(el: Element): boolean {
  return el.closest(HEADER_SELECTOR) !== null
}

/**
 * Gets the background color of an element, or null if transparent
 */
function getElementBackgroundColor(el: Element): string | null {
  const style = window.getComputedStyle(el)
  const bg = style.backgroundColor

  if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
    return bg
  }
  return null
}

/**
 * Check if any element at a point indicates a dark image background
 * Only checks for explicit data-dark-background markers
 */
export function checkPointForDarkImageBackground(x: number, y: number): { foundDarkImage: boolean; bgColor: string } {
  const elementsAtPoint = document.elementsFromPoint(x, y)

  let bgColor = COLOR_CONSTANTS.DEFAULT_BG
  let foundDarkImage = false

  // First pass: check for elements with dark background markers
  for (const el of elementsAtPoint) {
    if (shouldSkipElement(el)) continue

    if (el.getAttribute('data-dark-background') === 'true') {
      foundDarkImage = true
      break
    }
  }

  if (foundDarkImage) {
    return { foundDarkImage: true, bgColor }
  }

  // Second pass: find background color
  for (const el of elementsAtPoint) {
    if (shouldSkipElement(el)) continue

    const bg = getElementBackgroundColor(el)
    if (bg) {
      bgColor = bg
      break
    }
  }

  return { foundDarkImage, bgColor }
}

/**
 * Check if any dark image elements overlap with the header area
 */
export function checkDarkImageElementsInHeaderArea(): boolean {
  const darkImageElements = document.querySelectorAll(DARK_BG_SELECTOR)

  for (const el of darkImageElements) {
    const rect = el.getBoundingClientRect()
    if (rect.top < LAYOUT.HEADER_HEIGHT_PX && rect.bottom > 0) {
      return true
    }
  }

  return false
}

/**
 * Gets sample points across the viewport for contrast checking
 */
export function getViewportSamplePoints(): number[] {
  const viewportWidth = window.innerWidth
  return [
    Math.floor(viewportWidth * 0.25),
    Math.floor(viewportWidth * 0.5),
    Math.floor(viewportWidth * 0.75),
  ]
}
