import { useRef, useEffect, useCallback, useState } from 'react'
import { ANIMATION } from '@/constants/designTokens'

// =============================================================================
// CONSTANTS
// =============================================================================

const OUTER_RADIUS = 58
// Circumference = 2 * π * 58 ≈ 364.42, divided by 40 segments for even dashes
const DASH_GAP_SIZE = 9.11

// =============================================================================
// TYPES
// =============================================================================

export interface FeatureCardProps {
  /** Icon image source */
  icon: string
  /** Alt text for the icon */
  iconAlt: string
  /** Background color for the circle */
  circleColor: string
  /** Card title */
  title: string
  /** Card description - use ReactNode for rich text */
  description: React.ReactNode
}

// =============================================================================
// COMPONENT
// =============================================================================

/**
 * Feature card with animated rotating dashed border on hover.
 * Used in the "What Disrupt Does" section to showcase key features.
 */
export function FeatureCard({
  icon,
  iconAlt,
  circleColor,
  title,
  description,
}: FeatureCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const rotationRef = useRef(0)
  const speedRef = useRef(0)
  const svgRef = useRef<SVGSVGElement>(null)
  const animationRef = useRef<number | null>(null)

  const { MAX_SPEED, ACCELERATION, DECELERATION } = ANIMATION.rotation

  const animate = useCallback(() => {
    if (isHovered) {
      speedRef.current = Math.min(speedRef.current + ACCELERATION, MAX_SPEED)
    } else {
      speedRef.current = Math.max(speedRef.current - DECELERATION, 0)
    }

    if (speedRef.current > 0) {
      rotationRef.current += speedRef.current
      if (svgRef.current) {
        svgRef.current.style.transform = `rotate(${rotationRef.current}deg)`
      }
      animationRef.current = requestAnimationFrame(animate)
    } else {
      animationRef.current = null
    }
  }, [isHovered, ACCELERATION, DECELERATION, MAX_SPEED])

  useEffect(() => {
    if (isHovered || speedRef.current > 0) {
      animationRef.current = requestAnimationFrame(animate)
    }
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isHovered, animate])

  return (
    <div
      className="flex flex-col items-center text-center gap-4 sm:gap-6 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Icon with colored circle and dashed outer ring */}
      <div className="relative w-24 h-24 sm:w-[120px] sm:h-[120px]">
        {/* Outer dashed ring using SVG for precise control */}
        <svg
          ref={svgRef}
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 120 120"
        >
          <circle
            cx="60"
            cy="60"
            r={OUTER_RADIUS}
            fill="none"
            stroke={circleColor}
            strokeWidth="2"
            strokeDasharray={`${DASH_GAP_SIZE} ${DASH_GAP_SIZE}`}
            strokeLinecap="butt"
          />
        </svg>
        {/* Inner filled circle - inset by 8px */}
        <div
          className="absolute inset-1.5 sm:inset-2 rounded-full flex items-center justify-center"
          style={{ backgroundColor: circleColor }}
        >
          <img
            src={icon}
            alt={iconAlt}
            className="w-10 h-10 sm:w-14 sm:h-14"
          />
        </div>
      </div>

      {/* Title */}
      <h3 className="text-lg sm:text-xl font-sans font-bold text-dark">
        {title}
      </h3>

      {/* Description */}
      <p className="text-muted leading-relaxed text-sm sm:text-base max-w-[280px]">
        {description}
      </p>
    </div>
  )
}
