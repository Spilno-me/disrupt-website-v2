import { useState, useCallback, useRef } from 'react'
import { GridBlobBackground } from '@/components/ui/GridBlobCanvas'
import heroFrame from '@/assets/figma/hero-frame.svg'
// Note: HeroSection uses GridBlobBackground directly (not BlobSection)
// because it has absolute positioned children and event handlers on the section
import './HeroParticles.css'

// Static particle configuration - larger, more visible dust particles
const particles = [
  { size: 8, x: 15, y: 20, delay: 0 },
  { size: 10, x: 25, y: 45, delay: 2 },
  { size: 7, x: 40, y: 15, delay: 4 },
  { size: 9, x: 55, y: 70, delay: 1 },
  { size: 8, x: 70, y: 35, delay: 3 },
  { size: 11, x: 85, y: 55, delay: 5 },
  { size: 7, x: 20, y: 75, delay: 2 },
  { size: 9, x: 45, y: 85, delay: 4 },
  { size: 8, x: 60, y: 25, delay: 1 },
  { size: 10, x: 80, y: 80, delay: 3 },
  { size: 7, x: 10, y: 50, delay: 6 },
  { size: 9, x: 35, y: 60, delay: 0 },
  { size: 8, x: 50, y: 40, delay: 2 },
  { size: 10, x: 75, y: 15, delay: 5 },
  { size: 7, x: 90, y: 45, delay: 1 },
  { size: 9, x: 30, y: 30, delay: 4 },
  { size: 8, x: 65, y: 65, delay: 3 },
  { size: 11, x: 5, y: 85, delay: 2 },
]

const colors = ['#3B82F6', '#60A5FA', '#93C5FD', '#BFDBFE']

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
  const heroFrameRef = useRef<HTMLDivElement>(null)
  const particleIdRef = useRef(0)
  const lastSpawnRef = useRef(0)

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const now = Date.now()
    // Throttle particle creation (every 150ms for subtlety)
    if (now - lastSpawnRef.current < 150) return
    lastSpawnRef.current = now

    const heroFrame = heroFrameRef.current
    if (!heroFrame) return

    const rect = heroFrame.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Only spawn if mouse is within hero frame bounds
    if (x < 0 || x > rect.width || y < 0 || y > rect.height) return

    // Limit total active particles to avoid artifacts
    if (mouseParticles.length > 12) return

    // 70% chance to spawn a particle (more organic)
    if (Math.random() > 0.7) return

    // Create 1 particle near mouse position
    const newParticle: MouseParticle = {
      id: particleIdRef.current++,
      x: x + (Math.random() - 0.5) * 30,
      y: y + (Math.random() - 0.5) * 30,
      size: 2 + Math.random() * 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      animationIndex: Math.floor(Math.random() * 6) + 1,
    }

    setMouseParticles(prev => [...prev, newParticle])

    // Remove particle after animation completes (3.5s animation)
    setTimeout(() => {
      setMouseParticles(prev => prev.filter(p => p.id !== newParticle.id))
    }, 3500)
  }, [mouseParticles.length])

  return (
    <section
      className="relative mt-[82px] mb-8 lg:mb-[56px]"
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
          className="w-full max-w-[1358px] h-[380px] sm:h-[420px] lg:h-[499px] mx-4 lg:mx-0 rounded-b-[10px] overflow-hidden relative"
          data-element="hero-bg-frame"
        >
          <img
            src={heroFrame}
            alt=""
            className="w-full h-full object-cover"
          />

          {/* Static floating particles - hidden on small mobile */}
          <div className="absolute inset-0 pointer-events-none hidden sm:block">
            {particles.map((particle, index) => (
              <div
                key={index}
                className="hero-particle"
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

          {/* Mouse-generated particles - desktop only */}
          <div className="absolute inset-0 pointer-events-none hidden lg:block">
            {mouseParticles.map(particle => (
              <div
                key={particle.id}
                className="mouse-particle"
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
        </div>
      </div>

      {/* Content wrapper - responsive sizing */}
      <div
        className="mx-auto relative z-[1] flex flex-col w-full max-w-[1358px] h-[380px] sm:h-[420px] lg:h-[499px] pointer-events-none px-4 lg:px-0"
        data-element="hero-wrapper"
      >
        {/* Container - responsive padding and gap */}
        <div
          className="w-full flex flex-col relative h-full px-4 sm:px-6 lg:px-[36px] pb-6 lg:pb-[36px] gap-6 sm:gap-8 lg:gap-[53px]"
          data-element="hero-container"
        >
          {/* Text Frame */}
          <div
            className="relative z-10 self-stretch shrink-0 pt-4 sm:pt-6 lg:pt-[30px]"
            data-element="hero-titles"
          >
            <div className="max-w-full flex flex-col items-start">
              <h1 className="font-display font-bold text-[#FBFBF3] text-[20px] sm:text-[28px] lg:text-[36px] leading-[36px] sm:leading-[48px] lg:leading-[60px] tracking-[2px] sm:tracking-[3px] lg:tracking-[4px]">
                Protect People
              </h1>
              <h1 className="font-display font-bold text-[#FBFBF3] text-[20px] sm:text-[28px] lg:text-[36px] leading-[36px] sm:leading-[48px] lg:leading-[60px] tracking-[2px] sm:tracking-[3px] lg:tracking-[4px]">
                Empower Strategy
              </h1>
              <h1 className="font-display font-bold text-[#FBFBF3] text-[20px] sm:text-[28px] lg:text-[36px] leading-[36px] sm:leading-[48px] lg:leading-[60px] tracking-[2px] sm:tracking-[3px] lg:tracking-[4px]">
                Cut the Admin
              </h1>
            </div>
          </div>

          {/* Subtitle */}
          <div
            className="relative z-10 w-full"
            data-element="hero-subtitle-wrapper"
          >
            <p
              className="text-[#FBFBF3] font-bold font-sans text-sm sm:text-base lg:text-[20px] leading-6 sm:leading-7 lg:leading-[32px] tracking-[1px] sm:tracking-[2px] lg:tracking-[4px]"
              data-element="hero-subtitle"
            >
              Compliance should make workplaces safer and decisions smarter — not bury teams in forms.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
