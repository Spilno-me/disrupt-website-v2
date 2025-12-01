import { ReactNode, useState } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'motion/react'
import { useEffect } from 'react'

// =============================================================================
// CONFIGURATION
// =============================================================================

const ELECTRIC_GRADIENT = `linear-gradient(
  90deg,
  transparent 0%,
  cyan 20%,
  #00ffff 35%,
  white 50%,
  #00ffff 65%,
  cyan 80%,
  transparent 100%
)`

const ELECTRIC_GLOW_GRADIENT = `linear-gradient(
  90deg,
  transparent 0%,
  rgba(0, 255, 255, 0.3) 25%,
  rgba(0, 255, 255, 0.5) 50%,
  rgba(0, 255, 255, 0.3) 75%,
  transparent 100%
)`

const ANIMATION_DURATION = 1.5

// =============================================================================
// ELECTRIC INPUT WRAPPER
// =============================================================================

interface ElectricInputWrapperProps {
  children: ReactNode
}

/**
 * Wrapper component that adds electric border effect to inputs on focus.
 * Uses animated gradient that flows around the border like electricity.
 */
export function ElectricInputWrapper({ children }: ElectricInputWrapperProps) {
  const [isFocused, setIsFocused] = useState(false)

  // Use numeric value for animation (200 to -200)
  const positionX = useMotionValue(200)
  const backgroundPosition = useTransform(positionX, (x) => `${x}% 0`)

  useEffect(() => {
    if (isFocused) {
      // Reset to start position
      positionX.set(200)
      const animation = animate(positionX, -200, {
        duration: ANIMATION_DURATION,
        ease: 'linear',
        repeat: Infinity,
        repeatType: 'loop',
      })
      return () => animation.stop()
    }
  }, [isFocused, positionX])

  return (
    <div
      className="relative w-full rounded-[6px]"
      onFocusCapture={() => setIsFocused(true)}
      onBlurCapture={() => setIsFocused(false)}
    >
      {/* Electric border */}
      <motion.div
        className="absolute inset-[-2px] rounded-[8px] pointer-events-none"
        style={{
          padding: '2px',
          background: ELECTRIC_GRADIENT,
          backgroundSize: '200% 100%',
          backgroundPosition,
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isFocused ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Glow effect */}
      <motion.div
        className="absolute inset-[-4px] rounded-[10px] pointer-events-none"
        style={{
          background: ELECTRIC_GLOW_GRADIENT,
          backgroundSize: '200% 100%',
          backgroundPosition,
          filter: 'blur(6px)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isFocused ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Content */}
      <div className="relative z-[1]">{children}</div>
    </div>
  )
}

// =============================================================================
// ELECTRIC BUTTON WRAPPER
// =============================================================================

interface ElectricButtonWrapperProps {
  children: ReactNode
  className?: string
  isActive?: boolean
}

/**
 * Wrapper component that adds electric border effect to buttons on hover.
 * Uses animated gradient that flows around the border like electricity.
 * When isActive is true, the effect is always visible.
 */
export function ElectricButtonWrapper({ children, className = '', isActive = false }: ElectricButtonWrapperProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Show effect when hovered OR when active
  const showEffect = isHovered || isActive

  // Use numeric value for animation (200 to -200)
  const positionX = useMotionValue(200)
  const backgroundPosition = useTransform(positionX, (x) => `${x}% 0`)

  // Determine border radius based on className
  const isNavItem = className.includes('nav-item')
  const borderRadius = isNavItem ? '8px' : '12px'
  const innerRadius = isNavItem ? '7px' : '10px'
  const glowRadius = isNavItem ? '6px' : '8px'
  const borderInset = isNavItem ? '1px' : '2px'
  const glowInset = isNavItem ? '2px' : '4px'

  useEffect(() => {
    if (showEffect) {
      // Reset to start position
      positionX.set(200)
      const animation = animate(positionX, -200, {
        duration: ANIMATION_DURATION,
        ease: 'linear',
        repeat: Infinity,
        repeatType: 'loop',
      })
      return () => animation.stop()
    }
  }, [showEffect, positionX])

  return (
    <div
      className={`relative inline-flex ${className}`}
      style={{ borderRadius }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Inner electric border */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          inset: borderInset,
          borderRadius: innerRadius,
          border: '2px solid transparent',
          background: `${ELECTRIC_GRADIENT} border-box`,
          backgroundSize: '200% 100%',
          backgroundPosition,
          mask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
          WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          zIndex: 10,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: showEffect ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Inner glow effect */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          inset: glowInset,
          borderRadius: glowRadius,
          background: ELECTRIC_GLOW_GRADIENT.replace('0.3', '0.2').replace('0.5', '0.4'),
          backgroundSize: '200% 100%',
          backgroundPosition,
          filter: 'blur(4px)',
          zIndex: 10,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: showEffect ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Content */}
      <div className="relative z-[1]">{children}</div>
    </div>
  )
}
