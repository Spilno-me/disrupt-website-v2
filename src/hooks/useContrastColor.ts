import { useState, useEffect, useCallback, RefObject } from 'react'
import { LAYOUT, COLOR_CONSTANTS } from '@disrupt/design-system/tokens'
import {
  getColorBrightness,
  checkDarkImageElementsInHeaderArea,
  checkPointForDarkImageBackground,
  getViewportSamplePoints,
} from '@/utils/colorUtils'
import { useThrottledScrollResize } from './useThrottledEvents'

type ContrastMode = 'dark' | 'light'

// =============================================================================
// useContrastColor - Samples background at element position
// =============================================================================

/**
 * Samples the background color at an element's position and returns
 * whether dark or light text should be used for optimal contrast.
 */
export function useContrastColor(elementRef: RefObject<HTMLElement | null>): ContrastMode {
  const [contrastMode, setContrastMode] = useState<ContrastMode>('dark')

  const checkContrast = useCallback(() => {
    const element = elementRef.current
    if (!element) return

    const rect = element.getBoundingClientRect()
    const x = Math.floor(rect.left + rect.width / 2)
    const y = Math.floor(rect.top + rect.height / 2)

    const bgColor = findBackgroundColorAtPoint(x, y)
    const brightness = getColorBrightness(bgColor)

    setContrastMode(brightness > COLOR_CONSTANTS.BRIGHTNESS_THRESHOLD ? 'dark' : 'light')
  }, [elementRef])

  useThrottledScrollResize(checkContrast)

  return contrastMode
}

/**
 * Find the background color at a specific point
 */
function findBackgroundColorAtPoint(x: number, y: number): string {
  const elementsAtPoint = document.elementsFromPoint(x, y)

  for (const el of elementsAtPoint) {
    if (el.closest('[data-element="main-header"]')) continue

    const style = window.getComputedStyle(el)
    const bg = style.backgroundColor

    if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
      return bg
    }

    // Check for background image (dark images in hero sections)
    const bgImage = style.backgroundImage
    if (bgImage && bgImage !== 'none') {
      const elDataset = el.getAttribute('data-element') || ''
      if (elDataset.includes('hero')) {
        return COLOR_CONSTANTS.ASSUMED_DARK
      }
    }
  }

  return COLOR_CONSTANTS.DEFAULT_BG
}

// =============================================================================
// useHeaderContrast - Samples multiple points across header area
// =============================================================================

/**
 * Hook for header navigation - samples at multiple points across viewport
 * to determine if light or dark text should be used.
 */
export function useHeaderContrast(): ContrastMode {
  const [contrastMode, setContrastMode] = useState<ContrastMode>('dark')

  const checkContrast = useCallback(() => {
    // Check for explicit dark background markers first
    if (checkDarkImageElementsInHeaderArea()) {
      setContrastMode('light')
      return
    }

    // Sample multiple points across the viewport
    const samplePoints = getViewportSamplePoints()
    const y = LAYOUT.HEADER_SAMPLE_Y

    for (const x of samplePoints) {
      const result = checkPointForDarkImageBackground(x, y)
      if (result.foundDarkImage) {
        setContrastMode('light')
        return
      }
    }

    // Default to dark text for light backgrounds
    setContrastMode('dark')
  }, [])

  useEffect(() => {
    checkContrast()
    const timeout = setTimeout(checkContrast, 100) // Delayed check for dynamic content
    return () => clearTimeout(timeout)
  }, [checkContrast])

  useThrottledScrollResize(checkContrast)

  return contrastMode
}
