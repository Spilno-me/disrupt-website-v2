import { ReactNode, useState } from 'react'
import { SHADOWS } from '@/constants/designTokens'

// =============================================================================
// SECTION CONTAINER
// =============================================================================

interface SectionContainerProps {
  children: ReactNode
  className?: string
}

/**
 * Standard section container with max-width and horizontal padding.
 * Replaces repeated `max-w-[1440px] mx-auto px-4 sm:px-6` pattern.
 */
export function SectionContainer({
  children,
  className = '',
}: SectionContainerProps) {
  return (
    <div className={`max-w-[1440px] mx-auto px-4 sm:px-6 ${className}`}>
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
 * Replaces repeated `flex flex-col lg:flex-row items-center gap-6 sm:gap-10 lg:gap-16` pattern.
 */
export function TwoColumnLayout({
  children,
  className = '',
  reverse = false,
  align = 'center',
}: TwoColumnLayoutProps) {
  const alignClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
  }

  const directionClass = reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'

  return (
    <div className={`flex flex-col ${directionClass} ${alignClasses[align]} gap-6 sm:gap-10 lg:gap-16 ${className}`}>
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
 * Includes error handling for failed image loads.
 */
export function SectionImage({ src, alt, className = '' }: SectionImageProps) {
  const [hasError, setHasError] = useState(false)

  if (hasError) {
    return (
      <div
        className={`w-full h-[300px] rounded-[16px] bg-muted/20 flex items-center justify-center ${className}`}
        style={{ boxShadow: SHADOWS.image }}
      >
        <span className="text-muted text-sm">Image unavailable</span>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`w-full h-auto rounded-[16px] object-cover ${className}`}
      style={{ boxShadow: SHADOWS.image }}
      onError={() => setHasError(true)}
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
  /** Hide separator on mobile */
  hideSeparatorOnMobile?: boolean
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
  hideSeparatorOnMobile = true,
  className = '',
}: SectionHeadingProps) {
  const alignClass = centered ? 'items-center text-center' : ''
  const separatorClass = hideSeparatorOnMobile ? 'hidden sm:block' : ''

  return (
    <div className={`flex flex-col ${alignClass} ${className}`}>
      <h2 className="text-xl sm:text-2xl lg:text-[32px] font-display font-semibold text-dark leading-tight mb-1">
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm sm:text-base lg:text-lg font-display font-medium text-teal mb-4">
          {subtitle}
        </p>
      )}
      {showSeparator && subtitle && (
        <div className={`separator-dashed mb-8 ${centered ? 'w-full max-w-md' : ''} ${separatorClass}`} />
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
