import { useState, useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, animate } from 'motion/react'
import { ElectricLucideIcon, IconName } from '@/components/ui/ElectricLucideIcon'
import { useIsMobile } from '@/hooks'

// =============================================================================
// CONSTANTS
// =============================================================================

const OUTER_RADIUS = 58
// Circumference = 2 * π * 58 ≈ 364.42, divided by 40 segments for even dashes
const DASH_GAP_SIZE = 9.11

// Animation config
const SPIN_VELOCITY = 120 // degrees per second when hovered
const SPRING_CONFIG = { damping: 20, stiffness: 100 } // for smooth start/stop

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
  const isMobile = useIsMobile()

  // Motion values for rotation
  const rotation = useMotionValue(0)
  const smoothRotation = useSpring(rotation, SPRING_CONFIG)

  // Animation control ref
  const animationRef = useRef<ReturnType<typeof animate> | null>(null)

  // Handle hover state changes
  useEffect(() => {
    if (isMobile) return

    if (isHovered) {
      // Start continuous rotation
      const currentRotation = rotation.get()
      animationRef.current = animate(rotation, currentRotation + 360000, {
        duration: 360000 / SPIN_VELOCITY, // Time to complete many rotations
        ease: 'linear',
        repeat: Infinity,
      })
    } else {
      // Stop animation and let spring handle deceleration
      if (animationRef.current) {
        animationRef.current.stop()
        animationRef.current = null
      }
    }

    return () => {
      if (animationRef.current) {
        animationRef.current.stop()
      }
    }
  }, [isHovered, isMobile, rotation])

  const handleMouseEnter = () => {
    if (isMobile) return
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    if (isMobile) return
    setIsHovered(false)
  }

  return (
    <div
      className="flex flex-col items-center text-center gap-4 sm:gap-6 cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Icon with colored circle and dashed outer ring */}
      <div className="relative w-24 h-24 sm:w-[120px] sm:h-[120px]" data-cursor-repel="true">
        {/* Outer dashed ring using motion SVG */}
        <motion.svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 120 120"
          style={{ rotate: smoothRotation }}
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
        </motion.svg>
        {/* Inner filled circle - inset by 8px */}
        <div
          className="absolute inset-1.5 sm:inset-2 rounded-full flex items-center justify-center"
          style={{ backgroundColor: circleColor }}
        >
          <motion.div
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <ElectricLucideIcon
              name={iconName}
              size={48}
              isActive={isHovered}
            />
          </motion.div>
        </div>
      </div>

      {/* Title - always visible */}
      <h3 className="text-lg font-sans font-semibold text-dark leading-7">
        {title}
      </h3>

      {/* Description - animated on desktop (hover), always visible on mobile/tablet */}
      <motion.div
        className="overflow-hidden"
        initial={false}
        animate={{
          maxHeight: isHovered || isMobile ? 160 : 0,
          opacity: isHovered || isMobile ? 1 : 0,
        }}
        transition={{
          duration: 0.5,
          ease: [0.34, 1.56, 0.64, 1],
        }}
        style={{
          maxHeight: isMobile ? 160 : undefined,
          opacity: isMobile ? 1 : undefined,
        }}
      >
        <motion.p
          className="text-muted leading-relaxed text-sm sm:text-base max-w-[280px]"
          initial={false}
          animate={{
            y: isHovered || isMobile ? 0 : 16,
          }}
          transition={{
            duration: 0.5,
            ease: [0.34, 1.56, 0.64, 1],
          }}
        >
          {description}
        </motion.p>
      </motion.div>
    </div>
  )
}
