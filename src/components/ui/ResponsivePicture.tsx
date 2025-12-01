import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

// =============================================================================
// TYPES
// =============================================================================

export interface ImageSet {
  webp: string
  avif: string
  fallback: string
}

export interface ResponsiveImageSets {
  mobile: ImageSet
  tablet: ImageSet
  desktop?: ImageSet
}

interface ResponsivePictureProps {
  images: ResponsiveImageSets
  alt: string
  className?: string
  loading?: 'lazy' | 'eager'
  decoding?: 'async' | 'sync' | 'auto'
  onLoad?: () => void
  onError?: () => void
}

// =============================================================================
// COMPONENT
// =============================================================================

/**
 * Base responsive picture component that handles multi-format image sources.
 * Renders AVIF → WebP → fallback with mobile/tablet/desktop breakpoints.
 *
 * Use this as a building block for higher-level image components.
 */
export const ResponsivePicture = forwardRef<HTMLImageElement, ResponsivePictureProps>(
  function ResponsivePicture(
    {
      images,
      alt,
      className,
      loading = 'lazy',
      decoding = 'async',
      onLoad,
      onError,
    },
    ref
  ) {
    return (
      <picture>
        {/* AVIF - best compression */}
        <source
          media="(max-width: 639px)"
          srcSet={images.mobile.avif}
          type="image/avif"
        />
        <source
          media="(max-width: 1023px)"
          srcSet={images.tablet.avif}
          type="image/avif"
        />
        {images.desktop && (
          <source
            srcSet={images.desktop.avif}
            type="image/avif"
          />
        )}

        {/* WebP - wide browser support */}
        <source
          media="(max-width: 639px)"
          srcSet={images.mobile.webp}
          type="image/webp"
        />
        <source
          media="(max-width: 1023px)"
          srcSet={images.tablet.webp}
          type="image/webp"
        />
        {images.desktop && (
          <source
            srcSet={images.desktop.webp}
            type="image/webp"
          />
        )}

        {/* PNG/JPG fallback */}
        <img
          ref={ref}
          src={images.desktop?.fallback || images.tablet.fallback}
          alt={alt}
          loading={loading}
          decoding={decoding}
          onLoad={onLoad}
          onError={onError}
          className={cn('w-full h-full object-cover scale-110', className)}
        />
      </picture>
    )
  }
)
