import { useRef, useEffect, useCallback, useState } from 'react'
import { ANIMATION } from '@/constants/designTokens'
import { ElectricLucideIcon, IconName } from '@/components/ui/ElectricLucideIcon'

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
  /** Lucide icon name for the electric effect */
  iconName: IconName
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
  iconName,
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
      <div className="relative w-24 h-24 sm:w-[120px] sm:h-[120px]" data-cursor-repel="true">
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
          <div
            className={`transition-transform duration-300 ease-out ${
              isHovered ? 'scale-110' : 'scale-100'
            }`}
          >
            <ElectricLucideIcon
              name={iconName}
              size={48}
              isActive={isHovered}
            />
          </div>
        </div>
      </div>

      {/* Title - always visible */}
      <h3 className="text-lg font-sans font-semibold text-dark leading-7">
        {title}
      </h3>

      {/* Description - animated on desktop (hover), always visible on mobile/tablet */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] max-h-40 opacity-100 ${
          !isHovered ? 'lg:max-h-0 lg:opacity-0' : ''
        }`}
      >
        <p
          className={`text-muted leading-relaxed text-sm sm:text-base max-w-[280px] transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
            !isHovered ? 'lg:translate-y-4' : ''
          }`}
        >
          {description}
        </p>
      </div>
    </div>
  )
}
