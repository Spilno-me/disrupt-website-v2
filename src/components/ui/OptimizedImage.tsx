import { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { SkeletonImage } from './Skeleton'
import { SHADOWS } from '@/constants/designTokens'

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

interface OptimizedImageProps {
  /** Responsive image sources */
  sources: ImageSource
  /** Alt text for accessibility */
  alt: string
  /** Additional CSS classes */
  className?: string
  /** Priority loading (above-the-fold images) */
  priority?: boolean
  /** Aspect ratio for skeleton placeholder */
  aspectRatio?: 'square' | '4/3' | '16/9' | 'auto'
  /** Apply shadow styling */
  withShadow?: boolean
}

/**
 * Optimized image component with:
 * - Lazy loading with Intersection Observer
 * - WebP/AVIF format support with fallbacks
 * - Responsive srcset for mobile/tablet/desktop
 * - Skeleton loading placeholder
 * - Smooth fade-in animation
 */
export function OptimizedImage({
  sources,
  alt,
  className = '',
  priority = false,
  aspectRatio = '4/3',
  withShadow = true,
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(priority)
  const [hasError, setHasError] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)
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

  const handleLoad = () => {
    setIsLoaded(true)
  }

  const handleError = () => {
    setHasError(true)
  }

  if (hasError) {
    return (
      <div
        className={cn(
          'w-full rounded-[16px] bg-muted/20 flex items-center justify-center',
          aspectRatio === 'square' && 'aspect-square',
          aspectRatio === '4/3' && 'aspect-[4/3]',
          aspectRatio === '16/9' && 'aspect-video',
          className
        )}
        style={withShadow ? { boxShadow: SHADOWS.image } : undefined}
      >
        <span className="text-muted text-sm">Image unavailable</span>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className={cn('relative overflow-hidden rounded-[16px]', className)}
      style={withShadow ? { boxShadow: SHADOWS.image } : undefined}
    >
      {/* Skeleton placeholder */}
      {!isLoaded && (
        <SkeletonImage
          aspectRatio={aspectRatio}
          className="absolute inset-0 z-10"
        />
      )}

      {/* Responsive picture element */}
      {isInView && (
        <picture>
          {/* AVIF sources - best compression */}
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

          {/* WebP sources - good compression, wider support */}
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

          {/* PNG fallback */}
          <img
            ref={imgRef}
            src={sources.tablet.fallback}
            alt={alt}
            loading={priority ? 'eager' : 'lazy'}
            decoding={priority ? 'sync' : 'async'}
            onLoad={handleLoad}
            onError={handleError}
            className={cn(
              'w-full h-auto object-cover transition-opacity duration-500',
              isLoaded ? 'opacity-100' : 'opacity-0'
            )}
          />
        </picture>
      )}
    </div>
  )
}

// ============================================================================
// SIMPLE OPTIMIZED IMAGE (for images without multiple sizes)
// ============================================================================

interface SimpleOptimizedImageProps {
  /** Original image source */
  src: string
  /** Alt text */
  alt: string
  /** Additional CSS classes */
  className?: string
  /** Priority loading */
  priority?: boolean
  /** Aspect ratio */
  aspectRatio?: 'square' | '4/3' | '16/9' | 'auto'
  /** Apply shadow */
  withShadow?: boolean
}

/**
 * Simpler optimized image for images without pre-generated responsive versions.
 * Still includes lazy loading and skeleton placeholder.
 */
export function SimpleOptimizedImage({
  src,
  alt,
  className = '',
  priority = false,
  aspectRatio = '4/3',
  withShadow = true,
}: SimpleOptimizedImageProps) {
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
          'w-full rounded-[16px] bg-muted/20 flex items-center justify-center',
          aspectRatio === 'square' && 'aspect-square',
          aspectRatio === '4/3' && 'aspect-[4/3]',
          aspectRatio === '16/9' && 'aspect-video',
          className
        )}
        style={withShadow ? { boxShadow: SHADOWS.image } : undefined}
      >
        <span className="text-muted text-sm">Image unavailable</span>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className={cn('relative overflow-hidden rounded-[16px]', className)}
      style={withShadow ? { boxShadow: SHADOWS.image } : undefined}
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
            'w-full h-auto object-cover transition-opacity duration-500',
            isLoaded ? 'opacity-100' : 'opacity-0'
          )}
        />
      )}
    </div>
  )
}
