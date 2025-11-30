import { useEffect, useRef, useState, useCallback } from 'react'
import { CursorAnimationController } from './CursorAnimationController'
import { PIXELS, REPEL } from './animation-config'
import { isFormInput, REPEL_ELEMENT_SELECTOR } from './animation-utils'
import '../CursorPixels.css'

const isTouchDevice = (): boolean => {
  if (typeof window === 'undefined') return false
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}

const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Custom cursor effect with animated pixel rectangles.
 * Pixels follow the mouse, float when idle, jitter on buttons, and explode on click.
 */
export function CursorPixels() {
  const pixelRefs = useRef<(HTMLDivElement | null)[]>([])
  const controllerRef = useRef<CursorAnimationController | null>(null)
  const hasShownRef = useRef(false)  // Track if pixels have been shown
  const [shouldRender, setShouldRender] = useState(true)

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const controller = controllerRef.current
    if (!controller) return

    controller.updateMousePosition({ x: e.clientX, y: e.clientY })

    const target = e.target as HTMLElement

    // Check for repel elements using centralized selector
    const isRepelElement = Boolean(
      target?.closest(REPEL_ELEMENT_SELECTOR)
    ) || (target instanceof HTMLLabelElement && target.querySelector('input[type="checkbox"], input[type="radio"]'))

    // Also repel when an input/textarea is focused (don't distract from form filling)
    const isInputFocused = isFormInput(document.activeElement)

    const shouldRepel = isRepelElement || isInputFocused

    // Show pixels on first mouse move, but only if NOT starting on a repel element
    // (if starting on repel element, pixels will appear when leaving it)
    if (!hasShownRef.current) {
      if (shouldRepel) {
        // Mark as shown - they'll appear when leaving repel via fade-in animation
        hasShownRef.current = true
      } else {
        hasShownRef.current = true
        controller.showPixels()
      }
    }

    controller.handleRepel(shouldRepel)
  }, [])

  const handleMouseEnter = useCallback(() => {
    hasShownRef.current = true
    controllerRef.current?.showPixels()
  }, [])

  const handleMouseLeave = useCallback(() => {
    hasShownRef.current = false  // Reset so they show again on next enter
    controllerRef.current?.hidePixels()
  }, [])

  const handleClick = useCallback(() => {
    controllerRef.current?.triggerDisrupt()
  }, [])

  // Handle focus on inputs - trigger repel immediately
  const handleFocusIn = useCallback((e: FocusEvent) => {
    if (isFormInput(e.target as Element)) {
      controllerRef.current?.handleRepel(true)
    }
  }, [])

  // Handle blur from inputs - end repel
  const handleFocusOut = useCallback((e: FocusEvent) => {
    if (isFormInput(e.target as Element)) {
      // Small delay to check if focus moved to another input
      setTimeout(() => {
        if (!isFormInput(document.activeElement)) {
          controllerRef.current?.handleRepel(false)
        }
      }, REPEL.FOCUS_TRANSITION_DELAY_MS)
    }
  }, [])

  useEffect(() => {
    if (isTouchDevice() || prefersReducedMotion()) {
      setShouldRender(false)
      return
    }

    const elements = pixelRefs.current.filter(Boolean) as HTMLDivElement[]
    if (elements.length === 0) return

    const controller = new CursorAnimationController()
    controller.initialize(elements)
    controllerRef.current = controller

    document.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('click', handleClick)
    document.addEventListener('focusin', handleFocusIn)
    document.addEventListener('focusout', handleFocusOut)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('click', handleClick)
      document.removeEventListener('focusin', handleFocusIn)
      document.removeEventListener('focusout', handleFocusOut)

      controller.cleanup()
      controllerRef.current = null
    }
  }, [handleMouseMove, handleMouseEnter, handleMouseLeave, handleClick, handleFocusIn, handleFocusOut])

  if (!shouldRender) return null

  return (
    <div className="cursor-pixels-container" aria-hidden="true">
      {PIXELS.map((pixel, index) => (
        <div
          key={pixel.id}
          ref={(el) => { pixelRefs.current[index] = el }}
          className="cursor-pixel"
          style={{
            width: pixel.width,
            height: pixel.height,
            borderRadius: pixel.rx,
            backgroundColor: pixel.color,
          }}
        />
      ))}
    </div>
  )
}
