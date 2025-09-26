import heroBackground from '@/assets/v2waves.png'
import { UI_CONSTANTS } from '@/constants/appConstants'
import { useTranslation } from '@/hooks/useI18n'
import { useParallax } from '@/hooks/useParallax'
import { useEffect, useRef, useState } from 'react'

export function HeroSection() {
  const { t } = useTranslation()
  const containerRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ containerHeight: 0, elementHeight: 0 })
  
  const { transform } = useParallax({
    speed: -0.5,
    offset: 0,
    containerHeight: dimensions.containerHeight,
    elementHeight: dimensions.elementHeight,
    stopPoint: 286, // Parallax stops after scrolling 286px
    debug: false // Debug mode off - parallax configured
  })

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const containerHeight = containerRef.current.offsetHeight
        // Element height is 150% of container height for more parallax range
        const elementHeight = containerHeight * 1.5
        setDimensions({ containerHeight, elementHeight })
      }
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  return (
    <section className="pt-16 pb-0" data-element="hero-section">
      <div className={`container mx-auto ${UI_CONSTANTS.CONTAINER_PADDING} flex flex-col items-center gap-16 pb-16`} data-element="hero-container">
        <div className="hero-content-wrapper w-full max-w-[840px] mx-auto" data-element="hero-text">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-semibold text-center leading-tight sm:leading-[48px] tracking-[2px] sm:tracking-[4px] drop-shadow-sm">
            {t('hero.title')}
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground text-center leading-6 sm:leading-7 mt-4">
            {t('hero.description')}
          </p>
        </div>
      </div>
      
      <div ref={containerRef} className="relative w-full h-[600px] lg:h-[500px] md:h-[400px] sm:h-[320px] overflow-hidden parallax-container" data-element="hero-image">
        <div 
          className="absolute w-full h-[150%] parallax-element"
          style={{ 
            transform,
            top: '0%',
            left: 0
          }}
        >
          <img
            src={heroBackground}
            alt="V2 Waves - Modern wave pattern design"
            className="w-[120%] h-full object-cover object-center absolute left-1/2 transform -translate-x-1/2"
          />
        </div>
      </div>
    </section>
  )
}
