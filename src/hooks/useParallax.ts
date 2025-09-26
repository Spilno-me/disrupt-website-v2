import { useEffect, useState, useRef } from 'react'

interface ParallaxOptions {
  speed?: number
  offset?: number
  containerHeight?: number
  elementHeight?: number
  stopPoint?: number // Scroll position where parallax should stop (in pixels)
  debug?: boolean // Enable console logging for debugging
}

export function useParallax({ speed = 0.5, offset = 0, containerHeight = 0, elementHeight = 0, stopPoint, debug = false }: ParallaxOptions = {}) {
  const [transform, setTransform] = useState('')
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset

      // Debug logging
      if (debug) {
        console.log(`🌊 Parallax Debug:`, {
          scrollPosition: scrolled,
          stopPoint: stopPoint,
          isStoppedAtStopPoint: stopPoint !== undefined && scrolled >= stopPoint,
          speed: speed
        })
      }

      // If stopPoint is defined and we've scrolled past it, freeze the parallax
      let effectiveScrolled = scrolled
      if (stopPoint !== undefined && scrolled >= stopPoint) {
        effectiveScrolled = stopPoint
        if (debug) {
          console.log(`🛑 Parallax STOPPED at ${stopPoint}px (current scroll: ${scrolled}px)`)
        }
      }

      let translateY = (effectiveScrolled - offset) * speed

      // Calculate bounds if we have container and element dimensions
      if (containerHeight > 0 && elementHeight > 0) {
        // Start at top of image (showing antenna)
        const maxTranslateY = 0

        // End when we've revealed the full height of the image
        // Move down by the extra height (20% of container height since element is 120%)
        const minTranslateY = -(elementHeight - containerHeight)

        // Clamp the translation within bounds to show full image range
        translateY = Math.max(minTranslateY, Math.min(maxTranslateY, translateY))
      }

      if (debug) {
        console.log(`📐 Transform: translateY(${translateY}px)`)
      }

      setTransform(`translateY(${translateY}px)`)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [speed, offset, containerHeight, elementHeight, stopPoint, debug])

  return { transform, elementRef }
}