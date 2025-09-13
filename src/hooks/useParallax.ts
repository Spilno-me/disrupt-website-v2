import { useEffect, useState, useRef } from 'react'

interface ParallaxOptions {
  speed?: number
  offset?: number
  containerHeight?: number
  elementHeight?: number
}

export function useParallax({ speed = 0.5, offset = 0, containerHeight = 0, elementHeight = 0 }: ParallaxOptions = {}) {
  const [transform, setTransform] = useState('')
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset
      let translateY = (scrolled - offset) * speed
      
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
      
      setTransform(`translateY(${translateY}px)`)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [speed, offset, containerHeight, elementHeight])

  return { transform, elementRef }
}