import { Check } from 'lucide-react'
import { GridBlobBackground } from '@/components/ui/GridBlobCanvas'
import { aboutImages } from '@/assets/optimized/about'
import { SPACING } from '@/constants/designTokens'

// =============================================================================
// COMPONENT
// =============================================================================

export function AboutHeroSection() {
  return (
    <section
      className="relative"
      style={{ marginTop: SPACING.headerHeight }}
      data-element="about-hero-section"
    >
      {/* Grid Blob Background - visible in light areas */}
      <GridBlobBackground scale={1.5} />

      {/* Hero Container - dark background with content */}
      <div
        className="relative z-[1] mx-auto px-0 sm:px-4 lg:px-0"
        style={{ maxWidth: SPACING.heroFrameMaxWidth }}
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
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 30%, rgba(0,0,0,0.1) 60%, transparent 100%)'
            }}
          />

          {/* Content Grid - Two Columns */}
          <div className="relative z-10 flex flex-col lg:flex-row h-full min-h-[500px] lg:min-h-[560px]">
            {/* Left Column - Title */}
            <div className="flex-1 flex items-start justify-start p-6 sm:p-8 lg:p-12 lg:pl-16 lg:pt-24">
              <h1
                className="font-display font-bold text-white text-[28px] sm:text-[32px] lg:text-[36px] leading-[1.4] tracking-[1px] max-w-[600px]"
                data-element="about-hero-title"
              >
                <span className="block">Built to protect people</span>
                <span className="block">Designed to redefine compliance</span>
              </h1>
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
