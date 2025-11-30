import { ReactNode } from 'react'
import { SHADOWS, COLORS, TYPOGRAPHY, SPACING } from '@/constants/designTokens'

// =============================================================================
// SECTION CONTAINER
// =============================================================================

interface SectionContainerProps {
  children: ReactNode
  className?: string
  /** Max width constraint (default: 1440px) */
  maxWidth?: string
}

/**
 * Standard section container with max-width and horizontal padding.
 * Replaces repeated `max-w-[1440px] mx-auto px-6 lg:px-10` pattern.
 */
export function SectionContainer({
  children,
  className = '',
  maxWidth = SPACING.containerMaxWidth,
}: SectionContainerProps) {
  return (
    <div className={`max-w-[${maxWidth}] mx-auto px-6 lg:px-10 ${className}`}>
      {children}
    </div>
  )
}

// =============================================================================
// TWO COLUMN LAYOUT
// =============================================================================

interface TwoColumnLayoutProps {
  children: ReactNode
  className?: string
  /** Reverse column order on desktop */
  reverse?: boolean
  /** Vertical alignment */
  align?: 'start' | 'center' | 'end'
}

/**
 * Two-column responsive layout (stacked on mobile, side-by-side on desktop).
 * Replaces repeated `flex flex-col lg:flex-row items-center gap-12 lg:gap-16` pattern.
 */
export function TwoColumnLayout({
  children,
  className = '',
  reverse = false,
  align = 'center',
}: TwoColumnLayoutProps) {
  const alignClass = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
  }[align]

  const directionClass = reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'

  return (
    <div className={`flex flex-col ${directionClass} ${alignClass} gap-12 lg:gap-16 ${className}`}>
      {children}
    </div>
  )
}

// =============================================================================
// SECTION IMAGE
// =============================================================================

interface SectionImageProps {
  src: string
  alt: string
  className?: string
}

/**
 * Section image with consistent styling (rounded corners, shadow).
 * Replaces repeated image styling pattern.
 */
export function SectionImage({ src, alt, className = '' }: SectionImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={`w-full h-auto rounded-[16px] object-cover ${className}`}
      style={{ boxShadow: SHADOWS.image }}
    />
  )
}

// =============================================================================
// SECTION HEADING
// =============================================================================

interface SectionHeadingProps {
  /** Main heading text */
  title: string
  /** Subheading text (teal color) */
  subtitle?: string
  /** Whether to show separator line after subtitle */
  showSeparator?: boolean
  /** Center align the heading group */
  centered?: boolean
  className?: string
}

/**
 * Section heading group with title, subtitle, and optional separator.
 * Provides consistent typography and spacing.
 */
export function SectionHeading({
  title,
  subtitle,
  showSeparator = true,
  centered = false,
  className = '',
}: SectionHeadingProps) {
  const alignClass = centered ? 'items-center text-center' : ''

  return (
    <div className={`flex flex-col ${alignClass} ${className}`}>
      <h2 className={`text-2xl lg:text-[32px] font-display font-semibold text-[${COLORS.dark}] leading-tight mb-1`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-base lg:text-lg font-display font-medium text-[${COLORS.teal}] mb-4`}>
          {subtitle}
        </p>
      )}
      {showSeparator && subtitle && (
        <div className={`separator-dashed mb-8 ${centered ? 'w-full max-w-md' : ''}`} />
      )}
    </div>
  )
}

// =============================================================================
// COLUMN
// =============================================================================

interface ColumnProps {
  children: ReactNode
  /** Width on desktop (default: 1/2) */
  width?: '1/2' | '45%' | '55%' | 'full'
  className?: string
}

/**
 * Column component for use within TwoColumnLayout.
 */
export function Column({ children, width = '1/2', className = '' }: ColumnProps) {
  const widthClass = {
    '1/2': 'w-full lg:w-1/2',
    '45%': 'w-full lg:w-[45%]',
    '55%': 'w-full lg:w-[55%]',
    'full': 'w-full',
  }[width]

  return (
    <div className={`${widthClass} ${className}`}>
      {children}
    </div>
  )
}
