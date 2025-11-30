import { useState, useEffect } from 'react'

const DEFAULT_INTERVAL = 4000

/**
 * Hook for rotating through hero titles at a set interval.
 * Returns the current index for the titles array.
 */
export function useHeroTitleRotation(
  titlesCount: number,
  interval = DEFAULT_INTERVAL
): number {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % titlesCount)
    }, interval)
    return () => clearInterval(timer)
  }, [titlesCount, interval])

  return currentIndex
}
