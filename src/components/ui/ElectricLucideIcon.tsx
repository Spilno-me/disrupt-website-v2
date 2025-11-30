import { useState, cloneElement, ReactElement } from 'react'
import { Workflow, BrainCircuit, LayoutDashboard, TrendingUp, LucideProps } from 'lucide-react'
import { COLORS } from '@/constants/designTokens'
import './ElectricIcon.css'

// =============================================================================
// TYPES
// =============================================================================

export type IconName = 'automate' | 'advice' | 'adapt' | 'scale'

interface ElectricLucideIconProps {
  /** Which icon to display */
  name: IconName
  /** Size of the icon */
  size?: number
  /** Whether the electric effect is active */
  isActive?: boolean
  /** Additional class names */
  className?: string
}

// =============================================================================
// ICON MAP
// =============================================================================

const ICON_MAP: Record<IconName, ReactElement<LucideProps>> = {
  automate: <Workflow />,
  advice: <BrainCircuit />,
  adapt: <LayoutDashboard />,
  scale: <TrendingUp />,
}

// =============================================================================
// COMPONENT
// =============================================================================

/**
 * Lucide icon with electricity running effect on hover.
 * Renders the icon twice - base white stroke and cyan electric overlay.
 */
export function ElectricLucideIcon({
  name,
  size = 52,
  isActive = false,
  className = '',
}: ElectricLucideIconProps) {
  const iconElement = ICON_MAP[name]

  // Clone the icon with base styling (white stroke + drop shadow matching Figma)
  // Figma: feOffset dy="4", feGaussianBlur stdDeviation="2.5", opacity 0.25
  // Shadow fades out when electric effect is active (lit up by electricity)
  const baseIcon = cloneElement(iconElement, {
    size,
    strokeWidth: 1.5,
    stroke: 'white',
    fill: 'none',
    className: 'absolute inset-0 transition-[filter] duration-300 ease-out',
    style: {
      filter: isActive
        ? 'drop-shadow(0 4px 2.5px rgba(0, 0, 0, 0))'
        : 'drop-shadow(0 4px 2.5px rgba(0, 0, 0, 0.25))'
    },
  })

  // Clone the icon for electric overlay (cyan stroke with animation via CSS)
  const electricIcon = cloneElement(iconElement, {
    size,
    strokeWidth: 1.5,
    fill: 'none',
  })

  return (
    <div
      className={`electric-icon relative ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Base white icon */}
      {baseIcon}

      {/* Electric overlay - CSS handles the animation on inner paths */}
      <div className={`electric-overlay ${name} ${isActive ? 'active' : ''}`}>
        {electricIcon}
      </div>
    </div>
  )
}

// =============================================================================
// DEMO COMPONENT
// =============================================================================

/**
 * Demo component showing all four icons with hover effect.
 */
export function ElectricLucideIconDemo() {
  const [hoveredIcon, setHoveredIcon] = useState<IconName | null>(null)

  const icons: { name: IconName; color: string; label: string }[] = [
    { name: 'automate', color: COLORS.circleBlue, label: 'Automate' },
    { name: 'advice', color: COLORS.circleRed, label: 'Advice' },
    { name: 'adapt', color: COLORS.circleYellow, label: 'Adapt' },
    { name: 'scale', color: COLORS.circleGreen, label: 'Scale' },
  ]

  return (
    <div className="flex gap-8 flex-wrap justify-center">
      {icons.map(({ name, color, label }) => (
        <div
          key={name}
          className="flex flex-col items-center gap-3 cursor-pointer"
          onMouseEnter={() => setHoveredIcon(name)}
          onMouseLeave={() => setHoveredIcon(null)}
        >
          {/* Circle with icon */}
          <div
            className="w-[100px] h-[100px] rounded-full flex items-center justify-center transition-transform duration-300"
            style={{
              backgroundColor: color,
              transform: hoveredIcon === name ? 'scale(1.05)' : 'scale(1)',
            }}
          >
            <ElectricLucideIcon
              name={name}
              size={48}
              isActive={hoveredIcon === name}
            />
          </div>
          <span className="text-dark font-semibold">{label}</span>
        </div>
      ))}
    </div>
  )
}
