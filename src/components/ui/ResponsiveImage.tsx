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
}

export function ResponsiveImage({ images, alt, className }: ResponsiveImageProps) {
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
        className={className}
      />
    </picture>
  )
}
