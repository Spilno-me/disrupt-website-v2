import { useState, useRef, useEffect, useCallback } from 'react'
import { ANIMATION } from '@/constants/designTokens'

interface UseSpinAnimationOptions {
  /** Maximum rotation speed */
  maxSpeed?: number
  /** Acceleration rate */
  acceleration?: number
  /** Deceleration rate (slower = more inertia) */
  deceleration?: number
  /** Speed threshold to trigger fill effect */
  fillTriggerSpeed?: number
}

interface UseSpinAnimationReturn {
  /** Whether the fill effect should show */
  showFill: boolean
  /** Ref to attach to the spinning element */
  elementRef: React.RefObject<SVGSVGElement>
  /** Handle mouse enter */
  handleMouseEnter: () => void
  /** Handle mouse leave */
  handleMouseLeave: () => void
}

/**
 * Hook for spin animation with fill effect trigger.
 * Used for LinkedIn button and similar interactive spinning elements.
 */
export function useSpinAnimation(
  options: UseSpinAnimationOptions = {}
): UseSpinAnimationReturn {
  const {
    maxSpeed = ANIMATION.linkedIn.MAX_SPEED,
    acceleration = ANIMATION.linkedIn.ACCELERATION,
    deceleration = ANIMATION.linkedIn.DECELERATION,
    fillTriggerSpeed = ANIMATION.linkedIn.FILL_TRIGGER_SPEED,
  } = options

  const [showFill, setShowFill] = useState(false)
  const elementRef = useRef<SVGSVGElement>(null)

  const stateRef = useRef({
    isHovered: false,
    rotation: 0,
    speed: 0,
    animationId: null as number | null,
  })

  const animate = useCallback(() => {
    const state = stateRef.current

    if (state.isHovered) {
      state.speed = Math.min(state.speed + acceleration, maxSpeed)
      if (state.speed >= fillTriggerSpeed) {
        setShowFill(true)
      }
    } else {
      state.speed = Math.max(state.speed - deceleration, 0)
    }

    if (state.speed > 0.01) {
      state.rotation += state.speed
      if (elementRef.current) {
        elementRef.current.style.transform = `rotate(${state.rotation}deg)`
      }
      state.animationId = requestAnimationFrame(animate)
    } else {
      state.speed = 0
      state.animationId = null
    }
  }, [acceleration, deceleration, fillTriggerSpeed, maxSpeed])

  const startAnimation = useCallback(() => {
    if (stateRef.current.animationId === null) {
      stateRef.current.animationId = requestAnimationFrame(animate)
    }
  }, [animate])

  const handleMouseEnter = useCallback(() => {
    stateRef.current.isHovered = true
    startAnimation()
  }, [startAnimation])

  const handleMouseLeave = useCallback(() => {
    stateRef.current.isHovered = false
    setShowFill(false)
    startAnimation()
  }, [startAnimation])

  useEffect(() => {
    return () => {
      if (stateRef.current.animationId !== null) {
        cancelAnimationFrame(stateRef.current.animationId)
      }
    }
  }, [])

  return {
    showFill,
    elementRef,
    handleMouseEnter,
    handleMouseLeave,
  }
}
