import { useEffect, useRef, useCallback } from 'react'

type EventCallback = () => void

/**
 * Hook that provides throttled scroll and resize event handling
 * using requestAnimationFrame for optimal performance
 */
export function useThrottledScrollResize(callback: EventCallback): void {
  const tickingRef = useRef(false)

  const throttledCallback = useCallback(() => {
    if (!tickingRef.current) {
      requestAnimationFrame(() => {
        callback()
        tickingRef.current = false
      })
      tickingRef.current = true
    }
  }, [callback])

  useEffect(() => {
    callback() // Initial call

    window.addEventListener('scroll', throttledCallback, { passive: true })
    window.addEventListener('resize', throttledCallback, { passive: true })

    return () => {
      window.removeEventListener('scroll', throttledCallback)
      window.removeEventListener('resize', throttledCallback)
    }
  }, [callback, throttledCallback])
}
