import { useState, useEffect } from 'react'

const MOBILE_BREAKPOINT = 768

/**
 * Hook to detect if the current viewport is mobile-sized.
 * Uses window.matchMedia for efficient viewport detection.
 */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.innerWidth < MOBILE_BREAKPOINT
  })

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)

    const handleChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches)
    }

    // Set initial value
    setIsMobile(mediaQuery.matches)

    // Listen for changes
    mediaQuery.addEventListener('change', handleChange)

    return () => {
      mediaQuery.removeEventListener('change', handleChange)
    }
  }, [])

  return isMobile
}
