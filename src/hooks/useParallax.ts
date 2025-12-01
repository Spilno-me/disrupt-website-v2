import { useEffect, useState, useRef } from 'react'

interface ParallaxOptions {
  speed?: number
  offset?: number
  containerHeight?: number
  elementHeight?: number
  stopPoint?: number
}

export function useParallax({ speed = 0.5, offset = 0, containerHeight = 0, elementHeight = 0, stopPoint }: ParallaxOptions = {}) {
  const [transform, setTransform] = useState('')
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset

      // If stopPoint is defined and we've scrolled past it, freeze the parallax
      const effectiveScrolled = stopPoint !== undefined && scrolled >= stopPoint
        ? stopPoint
        : scrolled

      let translateY = (effectiveScrolled - offset) * speed

      // Calculate bounds if we have container and element dimensions
      if (containerHeight > 0 && elementHeight > 0) {
        const maxTranslateY = 0
        const minTranslateY = -(elementHeight - containerHeight)
        translateY = Math.max(minTranslateY, Math.min(maxTranslateY, translateY))
      }

      setTransform(`translateY(${translateY}px)`)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [speed, offset, containerHeight, elementHeight, stopPoint])

  return { transform, elementRef }
}
