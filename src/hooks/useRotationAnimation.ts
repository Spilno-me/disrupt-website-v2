import { useState, useRef, useEffect, useCallback } from 'react'
import { ANIMATION } from '@/constants/designTokens'

interface UseRotationAnimationOptions {
  /** Maximum rotation speed in degrees per frame */
  maxSpeed?: number
  /** Speed increase per frame when active */
  acceleration?: number
  /** Speed decrease per frame when inactive */
  deceleration?: number
}

interface UseRotationAnimationReturn {
  /** Current rotation angle in degrees */
  rotation: number
  /** Whether animation is currently active */
  isAnimating: boolean
  /** Start the rotation animation */
  start: () => void
  /** Stop the rotation animation (with deceleration) */
  stop: () => void
  /** Ref to attach to the rotating element for direct DOM manipulation */
  elementRef: React.RefObject<SVGSVGElement>
}

/**
 * Hook for smooth rotation animation with acceleration/deceleration.
 * Used for spinning elements like feature card icons and LinkedIn button.
 */
export function useRotationAnimation(
  options: UseRotationAnimationOptions = {}
): UseRotationAnimationReturn {
  const {
    maxSpeed = ANIMATION.rotation.MAX_SPEED,
    acceleration = ANIMATION.rotation.ACCELERATION,
    deceleration = ANIMATION.rotation.DECELERATION,
  } = options

  const [isAnimating, setIsAnimating] = useState(false)
  const elementRef = useRef<SVGSVGElement>(null)
  const rotationRef = useRef(0)
  const speedRef = useRef(0)
  const isActiveRef = useRef(false)
  const animationRef = useRef<number | null>(null)

  const animate = useCallback(() => {
    if (isActiveRef.current) {
      // Accelerate
      speedRef.current = Math.min(speedRef.current + acceleration, maxSpeed)
    } else {
      // Decelerate
      speedRef.current = Math.max(speedRef.current - deceleration, 0)
    }

    if (speedRef.current > 0) {
      rotationRef.current += speedRef.current
      if (elementRef.current) {
        elementRef.current.style.transform = `rotate(${rotationRef.current}deg)`
      }
      animationRef.current = requestAnimationFrame(animate)
    } else {
      animationRef.current = null
      setIsAnimating(false)
    }
  }, [acceleration, deceleration, maxSpeed])

  const startAnimation = useCallback(() => {
    if (animationRef.current === null) {
      setIsAnimating(true)
      animationRef.current = requestAnimationFrame(animate)
    }
  }, [animate])

  const start = useCallback(() => {
    isActiveRef.current = true
    startAnimation()
  }, [startAnimation])

  const stop = useCallback(() => {
    isActiveRef.current = false
    // Continue animation for deceleration
    startAnimation()
  }, [startAnimation])

  useEffect(() => {
    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return {
    rotation: rotationRef.current,
    isAnimating,
    start,
    stop,
    elementRef,
  }
}
