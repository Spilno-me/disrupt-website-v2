import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { GridBlobBackground } from '@/components/ui/GridBlobCanvas'
import { HeroParticles } from '@/components/ui/HeroParticles'
import { MouseParticleRenderer } from '@/components/ui/MouseParticleRenderer'
import { useMouseParticles } from '@/hooks/useMouseParticles'
import { AnimatedCheck } from '@/components/ui/AnimatedCheck'
import { aboutImages } from '@/assets/optimized/about'

// =============================================================================
// CONSTANTS
// =============================================================================

const HERO_TITLES = ['Built to protect people', 'Designed to redefine compliance']
const SLIDE_INTERVAL = 4000

// =============================================================================
// COMPONENT
// =============================================================================

export function AboutHeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [imageLoaded, setImageLoaded] = useState(false)
  const heroFrameRef = useRef<HTMLDivElement>(null)

  const { particles, handleMouseMove } = useMouseParticles({
    enabled: imageLoaded,
    containerRef: heroFrameRef,
  })

  // Title slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % HERO_TITLES.length)
    }, SLIDE_INTERVAL)
    return () => clearInterval(interval)
  }, [])

  return (
    <section
      className="relative mb-8 lg:mb-[56px] mt-[82px]"
      data-element="about-hero-section"
      onMouseMove={handleMouseMove}
    >
      {/* Grid Blob Background */}
      <GridBlobBackground scale={1.8} />

      {/* Background Frame */}
      <div
        className="absolute inset-x-0 top-0 flex justify-center z-[1] px-0 sm:px-6"
        data-element="about-hero-bg-wrapper"
      >
        <div
          ref={heroFrameRef}
          className="w-full h-[380px] sm:h-[420px] lg:h-[499px] rounded-none sm:rounded-b-[10px] overflow-hidden relative max-w-[1440px] bg-black"
          data-element="about-hero-frame"
          data-dark-background="true"
        >
          {/* Background Image - centered */}
          <picture>
            <source
              media="(max-width: 639px)"
              srcSet={aboutImages.aboutHero.mobile.avif}
              type="image/avif"
            />
            <source
              media="(max-width: 1023px)"
              srcSet={aboutImages.aboutHero.tablet.avif}
              type="image/avif"
            />
            <source
              srcSet={aboutImages.aboutHero.desktop.avif}
              type="image/avif"
            />
            <source
              media="(max-width: 639px)"
              srcSet={aboutImages.aboutHero.mobile.webp}
              type="image/webp"
            />
            <source
              media="(max-width: 1023px)"
              srcSet={aboutImages.aboutHero.tablet.webp}
              type="image/webp"
            />
            <source
              srcSet={aboutImages.aboutHero.desktop.webp}
              type="image/webp"
            />
            <img
              src={aboutImages.aboutHero.desktop.fallback}
              alt=""
              className="w-full h-full object-cover object-center"
              onLoad={() => setImageLoaded(true)}
            />
          </picture>

          {/* Gradient overlay */}
          <div
            className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/70 via-black/40 to-transparent"
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
        data-element="about-hero-wrapper"
      >
        {/* Content Grid - Two Columns */}
        <div className="w-full flex flex-col lg:flex-row lg:gap-8 h-full px-4 sm:px-6 lg:px-[36px]">
          {/* Left Column - Title with Slideshow */}
          <div className="lg:w-[55%] flex items-start justify-start pt-12 sm:pt-16 lg:pt-24">
            <div
              className="relative h-[80px] sm:h-[90px] lg:h-[100px] w-full"
              data-element="about-hero-title"
            >
              <AnimatePresence mode="wait">
                <motion.h1
                  key={currentIndex}
                  initial={{ opacity: 0, y: -30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  className="absolute inset-0 flex items-start font-display font-bold text-white text-[32px] sm:text-[32px] lg:text-[48px] leading-[44px] sm:leading-[48px] lg:leading-[60px] tracking-[2.5px] sm:tracking-[3px] lg:tracking-[4px]"
                >
                  {HERO_TITLES[currentIndex]}
                </motion.h1>
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column - Description */}
          <div className="lg:w-[45%] flex items-start justify-start lg:justify-end pt-4 lg:pt-24">
            <div className="flex flex-col gap-5 max-w-[420px]">
              <p className="font-display font-medium text-teal text-sm sm:text-base lg:text-lg">
                Compliance has buried teams in admin for too long. We're here to change that.
              </p>

              <ul className="flex flex-col gap-3 font-sans text-[14px] sm:text-[15px] lg:text-base leading-[1.5] text-white">
                <li className="flex items-start gap-3">
                  <AnimatedCheck className="w-5 h-5" autoAnimate index={0} />
                  <span className="opacity-90">Safer workplaces through smarter compliance</span>
                </li>
                <li className="flex items-start gap-3">
                  <AnimatedCheck className="w-5 h-5" autoAnimate index={1} />
                  <span className="opacity-90">AI that eliminates admin, not just digitizes it</span>
                </li>
                <li className="flex items-start gap-3">
                  <AnimatedCheck className="w-5 h-5" autoAnimate index={2} />
                  <span className="opacity-90">More time for people, less time on paperwork</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
