import { useState, useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, animate, useInView } from 'motion/react'
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

  // Ref for scroll detection on mobile
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, {
    amount: 0.7, // Trigger when 70% visible
    margin: "-25% 0px -25% 0px",
  })

  // Debounced active state to prevent glitchy rapid toggling
  const [debouncedInView, setDebouncedInView] = useState(false)
  const debounceRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isInView) {
      // Activate immediately
      if (debounceRef.current) clearTimeout(debounceRef.current)
      setDebouncedInView(true)
    } else {
      // Delay deactivation to prevent glitches
      debounceRef.current = setTimeout(() => {
        setDebouncedInView(false)
      }, 150)
    }
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [isInView])

  // Motion values for rotation
  const rotation = useMotionValue(0)
  const smoothRotation = useSpring(rotation, SPRING_CONFIG)

  // Animation control ref
  const animationRef = useRef<ReturnType<typeof animate> | null>(null)

  // Determine if animation should be active
  const isActive = isMobile ? debouncedInView : isHovered

  // Handle animation state changes
  useEffect(() => {
    if (isActive) {
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
  }, [isActive, rotation])

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
      ref={cardRef}
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
          className="absolute inset-1.5 sm:inset-2 rounded-full flex items-center justify-center overflow-visible"
          style={{ backgroundColor: circleColor }}
        >
          <motion.div
            className="overflow-visible"
            animate={{ scale: isActive ? 1.1 : 1 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <ElectricLucideIcon
              name={iconName}
              size={48}
              isActive={isActive}
            />
          </motion.div>
        </div>
      </div>

      {/* Title - always visible */}
      <h3 className="text-lg font-sans font-semibold text-dark leading-7">
        {title}
      </h3>

      {/* Description - animated on hover (desktop only) */}
      <motion.div
        className="overflow-hidden"
        initial={false}
        animate={{
          maxHeight: isMobile ? 160 : (isHovered ? 160 : 0),
          opacity: isMobile ? 1 : (isHovered ? 1 : 0),
        }}
        transition={{
          duration: 0.4,
          ease: [0.34, 1.56, 0.64, 1],
        }}
      >
        <motion.p
          className="text-muted leading-relaxed text-sm sm:text-base max-w-[280px]"
          initial={false}
          animate={{
            y: isMobile ? 0 : (isHovered ? 0 : -20),
          }}
          transition={{
            duration: 0.4,
            ease: [0.34, 1.56, 0.64, 1],
          }}
        >
          {description}
        </motion.p>
      </motion.div>
    </div>
  )
}
