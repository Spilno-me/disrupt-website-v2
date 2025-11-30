import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { GridBlobBackground } from '@/components/ui/GridBlobCanvas'
import { HeroParticles } from '@/components/ui/HeroParticles'
import { MouseParticleRenderer } from '@/components/ui/MouseParticleRenderer'
import { useHeroTitleRotation } from '@/hooks/useHeroTitleRotation'
import { useMouseParticles } from '@/hooks/useMouseParticles'
import { SPACING, GRADIENTS } from '@/constants/designTokens'
import { optimizedImages } from '@/assets/optimized'
import './HeroParticles.css'

// =============================================================================
// CONSTANTS
// =============================================================================

const HERO_TITLES = ['Protect People', 'Empower Strategy', 'Cut the Admin']
const HERO_SUBTITLE = "Compliance should make workplaces safer and decisions smarter — not bury teams in forms."

// =============================================================================
// COMPONENT
// =============================================================================

export function HeroSection() {
  const [imageLoaded, setImageLoaded] = useState(false)
  const heroFrameRef = useRef<HTMLDivElement>(null)

  const currentIndex = useHeroTitleRotation(HERO_TITLES.length)
  const { particles, handleMouseMove } = useMouseParticles({
    enabled: imageLoaded,
    containerRef: heroFrameRef,
  })

  return (
    <section
      className="relative mb-8 lg:mb-[56px] mt-[82px]"
      data-element="hero-section"
      onMouseMove={handleMouseMove}
    >
      <GridBlobBackground scale={1.8} />

      {/* Background Frame */}
      <div
        className="absolute inset-x-0 top-0 flex justify-center z-[1] px-0 sm:px-6"
        data-element="hero-bg-wrapper"
      >
        <div
          ref={heroFrameRef}
          className="w-full h-[380px] sm:h-[420px] lg:h-[499px] rounded-none sm:rounded-b-[10px] overflow-hidden relative max-w-[1440px]"
          data-element="hero-bg-frame"
        >
          {/* Responsive Hero Image */}
          <picture>
            <source
              media="(max-width: 639px)"
              srcSet={optimizedImages.heroFrame.mobile.avif}
              type="image/avif"
            />
            <source
              media="(max-width: 1023px)"
              srcSet={optimizedImages.heroFrame.tablet.avif}
              type="image/avif"
            />
            <source
              srcSet={optimizedImages.heroFrame.desktop.avif}
              type="image/avif"
            />
            <source
              media="(max-width: 639px)"
              srcSet={optimizedImages.heroFrame.mobile.webp}
              type="image/webp"
            />
            <source
              media="(max-width: 1023px)"
              srcSet={optimizedImages.heroFrame.tablet.webp}
              type="image/webp"
            />
            <source
              srcSet={optimizedImages.heroFrame.desktop.webp}
              type="image/webp"
            />
            <img
              src={optimizedImages.heroFrame.desktop.fallback}
              alt=""
              className="w-full h-full object-cover object-[center_30%] sm:object-center"
              onLoad={() => setImageLoaded(true)}
            />
          </picture>

          {/* Gradient overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: GRADIENTS.heroOverlay }}
          />

          {/* Particles */}
          {imageLoaded && (
            <>
              <HeroParticles />
              <MouseParticleRenderer particles={particles} />
            </>
          )}
        </div>
      </div>

      {/* Content */}
      <div
        className="mx-auto relative z-[2] flex flex-col w-full h-[380px] sm:h-[420px] lg:h-[499px] pointer-events-none px-4 sm:px-6 max-w-[1440px]"
        data-element="hero-wrapper"
      >
        <div
          className="w-full flex flex-col items-center justify-center relative h-full px-4 sm:px-6 lg:px-[36px]"
          data-element="hero-container"
        >
          {/* Animated Title */}
          <div
            className="relative z-10 text-center w-full h-[80px] sm:h-[80px] lg:h-[100px]"
            data-element="hero-titles"
          >
            <AnimatePresence mode="wait">
              <motion.h1
                key={currentIndex}
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="absolute inset-0 flex items-center justify-center font-display font-bold text-white text-[32px] sm:text-[32px] lg:text-[48px] leading-[44px] sm:leading-[48px] lg:leading-[60px] tracking-[2.5px] sm:tracking-[3px] lg:tracking-[4px]"
              >
                {HERO_TITLES[currentIndex]}
              </motion.h1>
            </AnimatePresence>
          </div>

          {/* Subtitle */}
          <p
            className="mt-6 sm:mt-8 text-center text-white font-semibold font-sans text-base sm:text-base lg:text-[18px] leading-6 sm:leading-6 tracking-[1px] sm:tracking-[1px] lg:tracking-[2px] max-w-[340px] sm:max-w-none z-10"
            data-element="hero-subtitle"
          >
            {HERO_SUBTITLE}
          </p>
        </div>
      </div>
    </section>
  )
}
