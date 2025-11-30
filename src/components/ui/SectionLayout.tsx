import { ReactNode, useState, useRef, useEffect } from 'react'
import { SkeletonImage } from './Skeleton'
import { cn } from '@/lib/utils'

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

interface ImageSource {
  mobile: {
    webp: string
    avif: string
    fallback: string
  }
  tablet: {
    webp: string
    avif: string
    fallback: string
  }
  desktop?: {
    webp: string
    avif: string
    fallback: string
  }
}

interface SectionImageProps {
  /** Original image source (for simple usage) */
  src?: string
  /** Optimized responsive sources */
  sources?: ImageSource
  alt: string
  className?: string
  /** Priority loading for above-the-fold images */
  priority?: boolean
  /** Aspect ratio for skeleton */
  aspectRatio?: 'square' | '4/3' | '16/9' | 'auto'
}

/**
 * Section image with consistent styling (rounded corners, shadow).
 * Supports both simple src and optimized responsive sources.
 * Includes lazy loading, skeleton placeholder, and error handling.
 */
export function SectionImage({
  src,
  sources,
  alt,
  className = '',
  priority = false,
  aspectRatio = '4/3',
}: SectionImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(priority)
  const [hasError, setHasError] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (priority || !containerRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true)
            observer.disconnect()
          }
        })
      },
      {
        rootMargin: '200px',
        threshold: 0.01,
      }
    )

    observer.observe(containerRef.current)

    return () => observer.disconnect()
  }, [priority])

  if (hasError) {
    return (
      <div
        className={cn(
          'w-full rounded-none sm:rounded-[16px] bg-muted/20 flex items-center justify-center',
          'shadow-none sm:shadow-[0_4px_20px_rgba(0,0,0,0.08)]',
          aspectRatio === 'square' && 'aspect-square',
          aspectRatio === '4/3' && 'aspect-[4/3]',
          aspectRatio === '16/9' && 'aspect-video',
          aspectRatio === 'auto' && 'h-[300px]',
          className
        )}
      >
        <span className="text-muted text-sm">Image unavailable</span>
      </div>
    )
  }

  // Use optimized sources if provided
  if (sources) {
    return (
      <div
        ref={containerRef}
        className={cn(
          'relative overflow-hidden rounded-none sm:rounded-[16px]',
          'shadow-none sm:shadow-[0_4px_20px_rgba(0,0,0,0.08)]',
          'h-[280px] sm:h-auto',  // Fixed height on mobile, auto on tablet+
          className
        )}
      >
        {!isLoaded && (
          <SkeletonImage
            aspectRatio={aspectRatio}
            className="absolute inset-0 z-10"
          />
        )}

        {isInView && (
          <picture>
            {/* AVIF sources */}
            {sources.desktop && (
              <source
                media="(min-width: 1024px)"
                srcSet={sources.desktop.avif}
                type="image/avif"
              />
            )}
            <source
              media="(min-width: 768px)"
              srcSet={sources.tablet.avif}
              type="image/avif"
            />
            <source srcSet={sources.mobile.avif} type="image/avif" />

            {/* WebP sources */}
            {sources.desktop && (
              <source
                media="(min-width: 1024px)"
                srcSet={sources.desktop.webp}
                type="image/webp"
              />
            )}
            <source
              media="(min-width: 768px)"
              srcSet={sources.tablet.webp}
              type="image/webp"
            />
            <source srcSet={sources.mobile.webp} type="image/webp" />

            {/* Fallback */}
            <img
              src={sources.tablet.fallback}
              alt={alt}
              loading={priority ? 'eager' : 'lazy'}
              decoding={priority ? 'sync' : 'async'}
              onLoad={() => setIsLoaded(true)}
              onError={() => setHasError(true)}
              className={cn(
                'w-full h-full object-contain sm:object-cover sm:h-auto transition-opacity duration-500',
                isLoaded ? 'opacity-100' : 'opacity-0'
              )}
            />
          </picture>
        )}
      </div>
    )
  }

  // Simple src fallback
  return (
    <div
      ref={containerRef}
      className={cn(
        'relative overflow-hidden rounded-none sm:rounded-[16px]',
        'shadow-none sm:shadow-[0_4px_20px_rgba(0,0,0,0.08)]',
        'h-[280px] sm:h-auto',  // Fixed height on mobile, auto on tablet+
        className
      )}
    >
      {!isLoaded && (
        <SkeletonImage
          aspectRatio={aspectRatio}
          className="absolute inset-0 z-10"
        />
      )}

      {isInView && (
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={cn(
            'w-full h-full object-contain sm:object-cover sm:h-auto transition-opacity duration-500',
            isLoaded ? 'opacity-100' : 'opacity-0'
          )}
        />
      )}
    </div>
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
  // Left-aligned on mobile, optionally centered on desktop
  const alignClass = centered ? 'lg:items-center lg:text-center' : ''
  const separatorClass = hideSeparatorOnMobile ? 'hidden sm:block' : ''

  return (
    <div className={`flex flex-col ${alignClass} ${className}`}>
      <h2 className="text-xl sm:text-2xl lg:text-[32px] font-display font-semibold text-dark leading-tight mb-1">
        {title}
      </h2>
      {subtitle && (
        <div className="lg:w-fit mb-4">
          <p className="text-sm sm:text-base lg:text-lg font-display font-medium text-teal">
            {subtitle}
          </p>
          {showSeparator && (
            <div className={`separator-dashed mt-4 w-full ${separatorClass}`} />
          )}
        </div>
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
