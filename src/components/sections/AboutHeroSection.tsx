import { useState, useEffect } from 'react'
import { Check } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { GridBlobBackground } from '@/components/ui/GridBlobCanvas'
import { HeroParticles } from '@/components/ui/HeroParticles'
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

  // Title slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % HERO_TITLES.length)
    }, SLIDE_INTERVAL)
    return () => clearInterval(interval)
  }, [])

  return (
    <section
      className="relative mt-[82px]"
      data-element="about-hero-section"
    >
      {/* Grid Blob Background - visible in light areas */}
      <GridBlobBackground scale={1.5} />

      {/* Hero Container - dark background with content */}
      <div
        className="relative z-[1] mx-auto px-0 sm:px-6 max-w-[1440px]"
        data-element="about-hero-container"
      >
        {/* Dark Hero Frame */}
        <div
          className="relative w-full min-h-[500px] lg:min-h-[560px] rounded-none sm:rounded-b-[10px] overflow-hidden bg-black"
          data-element="about-hero-frame"
        >
          {/* Background Image - positioned to left */}
          <div className="absolute inset-0 lg:right-[40%]">
            <picture>
              {/* AVIF - best compression */}
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
              {/* WebP - wide support */}
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
              {/* PNG fallback */}
              <img
                src={aboutImages.aboutHero.desktop.fallback}
                alt=""
                className="w-full h-full object-cover object-center lg:object-left"
              />
            </picture>
          </div>

          {/* Gradient overlay - black on top fading to transparent for text readability */}
          <div
            className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/70 via-black/40 to-transparent"
          />

          {/* Static floating particles */}
          <HeroParticles />

          {/* Content Grid - Two Columns */}
          <div className="relative z-10 flex flex-col lg:flex-row h-full min-h-[500px] lg:min-h-[560px]">
            {/* Left Column - Title with Slideshow */}
            <div className="flex-1 flex items-start justify-start p-6 pt-12 sm:p-8 sm:pt-16 lg:p-12 lg:pl-16 lg:pt-24">
              <div
                className="relative h-[80px] sm:h-[90px] lg:h-[100px] w-full max-w-[600px]"
                data-element="about-hero-title"
              >
                <AnimatePresence mode="wait">
                  <motion.h1
                    key={currentIndex}
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 30 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    className="absolute inset-0 flex items-center font-display font-bold text-white text-[28px] sm:text-[32px] lg:text-[36px] leading-[1.4] tracking-[1px]"
                  >
                    {HERO_TITLES[currentIndex]}
                  </motion.h1>
                </AnimatePresence>
              </div>
            </div>

            {/* Right Column - Description */}
            <div className="flex-1 flex items-start justify-start lg:justify-end p-6 sm:p-8 lg:p-12 lg:pr-16 lg:pt-24">
              <div className="flex flex-col gap-5 max-w-[480px] text-white">
                <p className="font-sans text-[15px] sm:text-base lg:text-[17px] leading-[1.6] opacity-90">
                  Compliance has buried teams in admin for too long. We're here to change that.
                </p>

                <ul className="flex flex-col gap-3 font-sans text-[14px] sm:text-[15px] lg:text-base leading-[1.5]">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#08A4BD] flex-shrink-0 mt-0.5" />
                    <span className="opacity-90">Safer workplaces through smarter compliance</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#08A4BD] flex-shrink-0 mt-0.5" />
                    <span className="opacity-90">AI that eliminates admin, not just digitizes it</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#08A4BD] flex-shrink-0 mt-0.5" />
                    <span className="opacity-90">More time for people, less time on paperwork</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom spacing for sections below */}
      <div className="h-8 lg:h-14" />
    </section>
  )
}
