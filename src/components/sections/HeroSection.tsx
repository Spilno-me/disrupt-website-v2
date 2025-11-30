import { useState, useCallback, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { GridBlobBackground } from '@/components/ui/GridBlobCanvas'
import { ANIMATION, COLORS, SPACING, GRADIENTS } from '@/constants/designTokens'
import { optimizedImages } from '@/assets/optimized'
import './HeroParticles.css'

// =============================================================================
// CONSTANTS
// =============================================================================

const HERO_TITLES = ['Protect People', 'Empower Strategy', 'Cut the Admin']
const SLIDE_INTERVAL = 4000

// Static particle configuration - positioned as percentages
// fadeDelay and fadeDuration control the staggered subtle appearance
const STATIC_PARTICLES = [
  { size: 8, x: 15, y: 20, delay: 0, fadeDelay: 0.5, fadeDuration: 2.2 },
  { size: 10, x: 25, y: 45, delay: 2, fadeDelay: 0.8, fadeDuration: 2.5 },
  { size: 7, x: 40, y: 15, delay: 4, fadeDelay: 1.1, fadeDuration: 2.0 },
  { size: 9, x: 55, y: 70, delay: 1, fadeDelay: 1.4, fadeDuration: 2.8 },
  { size: 8, x: 70, y: 35, delay: 3, fadeDelay: 0.6, fadeDuration: 2.3 },
  { size: 11, x: 85, y: 55, delay: 5, fadeDelay: 1.7, fadeDuration: 2.6 },
  { size: 7, x: 20, y: 75, delay: 2, fadeDelay: 2.0, fadeDuration: 2.1 },
  { size: 9, x: 45, y: 85, delay: 4, fadeDelay: 1.0, fadeDuration: 2.9 },
  { size: 8, x: 60, y: 25, delay: 1, fadeDelay: 2.3, fadeDuration: 2.4 },
  { size: 10, x: 80, y: 80, delay: 3, fadeDelay: 1.5, fadeDuration: 2.7 },
  { size: 7, x: 10, y: 50, delay: 6, fadeDelay: 2.6, fadeDuration: 2.2 },
  { size: 9, x: 35, y: 60, delay: 0, fadeDelay: 0.9, fadeDuration: 3.0 },
  { size: 8, x: 50, y: 40, delay: 2, fadeDelay: 1.8, fadeDuration: 2.5 },
  { size: 10, x: 75, y: 15, delay: 5, fadeDelay: 2.1, fadeDuration: 2.3 },
  { size: 7, x: 90, y: 45, delay: 1, fadeDelay: 1.3, fadeDuration: 2.8 },
  { size: 9, x: 30, y: 30, delay: 4, fadeDelay: 2.4, fadeDuration: 2.1 },
  { size: 8, x: 65, y: 65, delay: 3, fadeDelay: 0.7, fadeDuration: 2.6 },
  { size: 11, x: 5, y: 85, delay: 2, fadeDelay: 1.9, fadeDuration: 2.4 },
] as const

// Blue palette for mouse particles
const PARTICLE_COLORS = [
  COLORS.circleBlue,
  '#60A5FA',
  '#93C5FD',
  '#BFDBFE',
] as const

// Extract animation constants
const {
  SPAWN_THROTTLE_MS,
  MAX_ACTIVE_PARTICLES,
  SPAWN_PROBABILITY,
  LIFETIME_MS,
} = ANIMATION.particles

interface MouseParticle {
  id: number
  x: number
  y: number
  size: number
  color: string
  animationIndex: number
}

export function HeroSection() {
  const [mouseParticles, setMouseParticles] = useState<MouseParticle[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [imageLoaded, setImageLoaded] = useState(false)
  const heroFrameRef = useRef<HTMLDivElement>(null)
  const particleIdRef = useRef(0)
  const lastSpawnRef = useRef(0)

  // Title slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % HERO_TITLES.length)
    }, SLIDE_INTERVAL)
    return () => clearInterval(interval)
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    // Don't spawn particles until image is loaded
    if (!imageLoaded) return

    const now = Date.now()
    if (now - lastSpawnRef.current < SPAWN_THROTTLE_MS) return
    lastSpawnRef.current = now

    const heroFrame = heroFrameRef.current
    if (!heroFrame) return

    const rect = heroFrame.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Only spawn if mouse is within hero frame bounds
    if (x < 0 || x > rect.width || y < 0 || y > rect.height) return

    // Limit total active particles to avoid artifacts
    if (mouseParticles.length > MAX_ACTIVE_PARTICLES) return

    // Probabilistic spawn for organic feel
    if (Math.random() > SPAWN_PROBABILITY) return

    // Create particle near mouse position
    const newParticle: MouseParticle = {
      id: particleIdRef.current++,
      x: x + (Math.random() - 0.5) * 30,
      y: y + (Math.random() - 0.5) * 30,
      size: 2 + Math.random() * 4,
      color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
      animationIndex: Math.floor(Math.random() * 6) + 1,
    }

    setMouseParticles(prev => [...prev, newParticle])

    // Remove particle after animation completes
    setTimeout(() => {
      setMouseParticles(prev => prev.filter(p => p.id !== newParticle.id))
    }, LIFETIME_MS)
  }, [mouseParticles.length, imageLoaded])

  return (
    <section
      className="relative mb-8 lg:mb-[56px]"
      style={{ marginTop: SPACING.headerHeight }}
      data-element="hero-section"
      onMouseMove={handleMouseMove}
    >
      <GridBlobBackground scale={1.8} />
      {/* Background Frame */}
      <div
        className="absolute inset-x-0 top-0 flex justify-center z-[1]"
        data-element="hero-bg-wrapper"
      >
        <div
          ref={heroFrameRef}
          className="w-full h-[380px] sm:h-[420px] lg:h-[499px] mx-4 lg:mx-0 rounded-b-[10px] overflow-hidden relative"
          style={{ maxWidth: SPACING.heroFrameMaxWidth }}
          data-element="hero-bg-frame"
        >
          <picture>
            {/* AVIF - best compression */}
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
            {/* WebP - wide support */}
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
            {/* PNG fallback */}
            <img
              src={optimizedImages.heroFrame.desktop.fallback}
              alt=""
              className="w-full h-full object-cover"
              onLoad={() => setImageLoaded(true)}
            />
          </picture>

          {/* Gradient overlay for better text readability */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: GRADIENTS.heroOverlay }}
          />

          {/* Static floating particles - hidden on small mobile, wait for image to load */}
          {imageLoaded && (
            <div className="absolute inset-0 pointer-events-none hidden sm:block">
              {STATIC_PARTICLES.map((particle, index) => (
                <motion.div
                  key={index}
                  className="hero-particle"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 0.85, scale: 1 }}
                  transition={{
                    duration: particle.fadeDuration,
                    delay: particle.fadeDelay,
                    ease: [0.25, 0.1, 0.25, 1], // cubic-bezier for very smooth easing
                  }}
                  style={{
                    width: particle.size,
                    height: particle.size,
                    left: `${particle.x}%`,
                    top: `${particle.y}%`,
                    animationDelay: `${particle.delay}s, ${particle.delay * 0.5}s`,
                  }}
                />
              ))}
            </div>
          )}

          {/* Mouse-generated particles - desktop only, wait for image to load */}
          {imageLoaded && (
            <div className="absolute inset-0 pointer-events-none hidden lg:block">
              {mouseParticles.map(particle => (
                <motion.div
                  key={particle.id}
                  className="mouse-particle"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{
                    width: particle.size,
                    height: particle.size,
                    left: particle.x,
                    top: particle.y,
                    backgroundColor: particle.color,
                    animation: `mouse-drift-${particle.animationIndex} 3.5s linear forwards`,
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Content wrapper - responsive sizing */}
      <div
        className="mx-auto relative z-[2] flex flex-col w-full h-[380px] sm:h-[420px] lg:h-[499px] pointer-events-none px-4 lg:px-0"
        style={{ maxWidth: SPACING.heroFrameMaxWidth }}
        data-element="hero-wrapper"
      >
        {/* Container - centered content */}
        <div
          className="w-full flex flex-col items-center justify-center relative h-full px-4 sm:px-6 lg:px-[36px]"
          data-element="hero-container"
        >
          {/* Text Frame - Motion Animation */}
          <div
            className="relative z-10 text-center w-full h-[60px] sm:h-[80px] lg:h-[100px]"
            data-element="hero-titles"
          >
            <AnimatePresence mode="wait">
              <motion.h1
                key={currentIndex}
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="absolute inset-0 flex items-center justify-center font-display font-bold text-white text-[24px] sm:text-[32px] lg:text-[48px] leading-[36px] sm:leading-[48px] lg:leading-[60px] tracking-[2px] sm:tracking-[3px] lg:tracking-[4px]"
              >
                {HERO_TITLES[currentIndex]}
              </motion.h1>
            </AnimatePresence>
          </div>

          {/* Subtitle - centered below heading */}
          <p
            className="mt-4 sm:mt-6 text-center text-white font-semibold font-sans text-sm sm:text-base lg:text-[18px] leading-5 sm:leading-6 tracking-[0.5px] sm:tracking-[1px] lg:tracking-[2px] max-w-[320px] sm:max-w-none z-10"
            data-element="hero-subtitle"
          >
            Compliance should make workplaces safer and decisions smarter — not bury teams in forms.
          </p>
        </div>
      </div>
    </section>
  )
}
