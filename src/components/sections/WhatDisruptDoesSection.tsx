import { useState, useRef, useEffect, useCallback } from 'react'
import iconAutomate from '@/assets/figma/icon-automate.svg'
import iconAdvice from '@/assets/figma/icon-advice.svg'
import iconAdapt from '@/assets/figma/icon-adapt.svg'
import iconScale from '@/assets/figma/icon-scale.svg'

interface FeatureCardProps {
  icon: string
  iconAlt: string
  circleColor: string
  title: string
  description: string
}

function FeatureCard({ icon, iconAlt, circleColor, title, description }: FeatureCardProps) {
  const outerRadius = 58
  // Circumference = 2 * π * 58 ≈ 364.42, divided by 40 segments for even dashes
  const dashGapSize = 9.11

  const [isHovered, setIsHovered] = useState(false)
  const rotationRef = useRef(0)
  const speedRef = useRef(0)
  const svgRef = useRef<SVGSVGElement>(null)
  const animationRef = useRef<number>(undefined)

  const maxSpeed = 1 // degrees per frame at full speed
  const acceleration = 0.05 // speed increase per frame
  const deceleration = 0.03 // speed decrease per frame (slower = smoother braking)

  const animate = useCallback(() => {
    if (isHovered) {
      // Accelerate
      speedRef.current = Math.min(speedRef.current + acceleration, maxSpeed)
    } else {
      // Decelerate (brake)
      speedRef.current = Math.max(speedRef.current - deceleration, 0)
    }

    if (speedRef.current > 0) {
      rotationRef.current += speedRef.current
      if (svgRef.current) {
        svgRef.current.style.transform = `rotate(${rotationRef.current}deg)`
      }
      animationRef.current = requestAnimationFrame(animate)
    }
  }, [isHovered])

  useEffect(() => {
    if (isHovered || speedRef.current > 0) {
      animationRef.current = requestAnimationFrame(animate)
    }
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isHovered, animate])

  return (
    <div
      className="flex flex-col items-center text-center gap-6 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Icon with colored circle and dashed outer ring */}
      <div className="relative w-[120px] h-[120px]">
        {/* Outer dashed ring using SVG for precise control */}
        <svg
          ref={svgRef}
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 120 120"
        >
          <circle
            cx="60"
            cy="60"
            r={outerRadius}
            fill="none"
            stroke={circleColor}
            strokeWidth="2"
            strokeDasharray={`${dashGapSize} ${dashGapSize}`}
            strokeLinecap="butt"
          />
        </svg>
        {/* Inner filled circle - inset by 8px */}
        <div
          className="absolute inset-2 rounded-full flex items-center justify-center"
          style={{ backgroundColor: circleColor }}
        >
          {/* Icon - larger size */}
          <img
            src={icon}
            alt={iconAlt}
            className="w-14 h-14"
          />
        </div>
      </div>

      {/* Title */}
      <h3 className="text-xl font-sans font-bold text-[#2D3142]">
        {title}
      </h3>

      {/* Description */}
      <p
        className="text-[#6B7280] leading-relaxed text-base max-w-[280px]"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </div>
  )
}

const features = [
  {
    icon: iconAutomate,
    iconAlt: 'Automate icon',
    circleColor: '#3B82F6',
    title: 'Automate',
    description: 'Cut up to <strong>70% of admin</strong> — freeing time for training, coaching, and prevention.'
  },
  {
    icon: iconAdvice,
    iconAlt: 'Advice icon',
    circleColor: '#EF4444',
    title: 'Advice',
    description: '<strong>Real-time AI guidance</strong> during audits and reporting — helping teams avoid mistakes before they become incidents.'
  },
  {
    icon: iconAdapt,
    iconAlt: 'Adapt icon',
    circleColor: '#EAB308',
    title: 'Adapt',
    description: 'Build forms and workflows <strong>instantly</strong> — no coding, no bottlenecks. Flexible enough for EHS today.'
  },
  {
    icon: iconScale,
    iconAlt: 'Scale icon',
    circleColor: '#22C55E',
    title: 'Scale',
    description: 'Architected to <strong>extend beyond EHS</strong> into any workflow where admin slows people down.'
  }
]

export function WhatDisruptDoesSection() {
  return (
    <section className="bg-[#FBFBF3] py-8 sm:py-12 lg:py-24 border-y-dashed-figma" data-element="what-disrupt-does-section">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center gap-8 sm:gap-12 lg:gap-16">
          {/* Header */}
          <div className="flex flex-col items-center text-center">
            <h2 className="text-xl sm:text-2xl lg:text-[32px] font-display font-semibold text-[#2D3142] leading-tight mb-1">
              What Disrupt does
            </h2>
            <div className="flex flex-col items-center">
              <p className="text-sm sm:text-base lg:text-lg font-display font-medium text-[#08A4BD] mb-4">
                AI That Works Like a Consultant. Scales Like Software.
              </p>
              <div className="separator-dashed w-full hidden sm:block" />
            </div>
          </div>

          {/* Feature Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 w-full">
            {features.map((feature) => (
              <FeatureCard
                key={feature.title}
                {...feature}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
