import { cn } from '@/lib/utils'

interface ImageSet {
  webp: string
  avif: string
  fallback: string
}

interface ResponsiveImageSets {
  mobile: ImageSet
  tablet: ImageSet
  desktop?: ImageSet
}

interface ResponsiveImageProps {
  images: ResponsiveImageSets
  alt: string
  className?: string
  /** Container className for wrapper div */
  containerClassName?: string
}

/**
 * Responsive image component with consistent styling across all sections.
 * - Full width on mobile with fixed 240px height and object-cover (fills container)
 * - Auto height on tablet+ with rounded corners and shadow
 */
export function ResponsiveImage({
  images,
  alt,
  className,
  containerClassName,
}: ResponsiveImageProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden w-full',
        'rounded-none sm:rounded-[16px]',
        'shadow-none sm:shadow-[0_4px_20px_rgba(0,0,0,0.08)]',
        'h-[240px] sm:h-auto',  // Fixed height on mobile for consistency
        containerClassName
      )}
    >
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
        {/* WebP - wide support */}
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
        {/* Fallback */}
        <img
          src={images.desktop?.fallback || images.tablet.fallback}
          alt={alt}
          className={cn(
            'w-full h-full object-cover',
            className
          )}
        />
      </picture>
    </div>
  )
}
