import { useState } from 'react'
import { motion } from 'motion/react'
import { Building2, Factory, Zap, Pill, Truck } from 'lucide-react'
import { SectionContainer } from '@/components/ui/SectionLayout'

// Industry images - responsive versions
// Construction
import constructionDesktopAvif from '@/assets/optimized/product/industry-construction-desktop.avif'
import constructionDesktopWebp from '@/assets/optimized/product/industry-construction-desktop.webp'
import constructionDesktopPng from '@/assets/optimized/product/industry-construction-desktop.png'
import constructionTabletAvif from '@/assets/optimized/product/industry-construction-tablet.avif'
import constructionTabletWebp from '@/assets/optimized/product/industry-construction-tablet.webp'
import constructionTabletPng from '@/assets/optimized/product/industry-construction-tablet.png'
import constructionMobileAvif from '@/assets/optimized/product/industry-construction-mobile.avif'
import constructionMobileWebp from '@/assets/optimized/product/industry-construction-mobile.webp'
import constructionMobilePng from '@/assets/optimized/product/industry-construction-mobile.png'

// Manufacturing
import manufacturingDesktopAvif from '@/assets/optimized/product/industry-manufacturing-desktop.avif'
import manufacturingDesktopWebp from '@/assets/optimized/product/industry-manufacturing-desktop.webp'
import manufacturingDesktopPng from '@/assets/optimized/product/industry-manufacturing-desktop.png'
import manufacturingTabletAvif from '@/assets/optimized/product/industry-manufacturing-tablet.avif'
import manufacturingTabletWebp from '@/assets/optimized/product/industry-manufacturing-tablet.webp'
import manufacturingTabletPng from '@/assets/optimized/product/industry-manufacturing-tablet.png'
import manufacturingMobileAvif from '@/assets/optimized/product/industry-manufacturing-mobile.avif'
import manufacturingMobileWebp from '@/assets/optimized/product/industry-manufacturing-mobile.webp'
import manufacturingMobilePng from '@/assets/optimized/product/industry-manufacturing-mobile.png'

// Energy
import energyDesktopAvif from '@/assets/optimized/product/industry-energy-desktop.avif'
import energyDesktopWebp from '@/assets/optimized/product/industry-energy-desktop.webp'
import energyDesktopPng from '@/assets/optimized/product/industry-energy-desktop.png'
import energyTabletAvif from '@/assets/optimized/product/industry-energy-tablet.avif'
import energyTabletWebp from '@/assets/optimized/product/industry-energy-tablet.webp'
import energyTabletPng from '@/assets/optimized/product/industry-energy-tablet.png'
import energyMobileAvif from '@/assets/optimized/product/industry-energy-mobile.avif'
import energyMobileWebp from '@/assets/optimized/product/industry-energy-mobile.webp'
import energyMobilePng from '@/assets/optimized/product/industry-energy-mobile.png'

// Pharma
import pharmaDesktopAvif from '@/assets/optimized/product/industry-pharma-desktop.avif'
import pharmaDesktopWebp from '@/assets/optimized/product/industry-pharma-desktop.webp'
import pharmaDesktopPng from '@/assets/optimized/product/industry-pharma-desktop.png'
import pharmaTabletAvif from '@/assets/optimized/product/industry-pharma-tablet.avif'
import pharmaTabletWebp from '@/assets/optimized/product/industry-pharma-tablet.webp'
import pharmaTabletPng from '@/assets/optimized/product/industry-pharma-tablet.png'
import pharmaMobileAvif from '@/assets/optimized/product/industry-pharma-mobile.avif'
import pharmaMobileWebp from '@/assets/optimized/product/industry-pharma-mobile.webp'
import pharmaMobilePng from '@/assets/optimized/product/industry-pharma-mobile.png'

// Logistics
import logisticsDesktopAvif from '@/assets/optimized/product/industry-logistics-desktop.avif'
import logisticsDesktopWebp from '@/assets/optimized/product/industry-logistics-desktop.webp'
import logisticsDesktopPng from '@/assets/optimized/product/industry-logistics-desktop.png'
import logisticsTabletAvif from '@/assets/optimized/product/industry-logistics-tablet.avif'
import logisticsTabletWebp from '@/assets/optimized/product/industry-logistics-tablet.webp'
import logisticsTabletPng from '@/assets/optimized/product/industry-logistics-tablet.png'
import logisticsMobileAvif from '@/assets/optimized/product/industry-logistics-mobile.avif'
import logisticsMobileWebp from '@/assets/optimized/product/industry-logistics-mobile.webp'
import logisticsMobilePng from '@/assets/optimized/product/industry-logistics-mobile.png'

// =============================================================================
// TYPES
// =============================================================================

interface ResponsiveImages {
  desktop: { avif: string; webp: string; png: string }
  tablet: { avif: string; webp: string; png: string }
  mobile: { avif: string; webp: string; png: string }
}

interface Industry {
  id: string
  name: string
  icon: React.ElementType
  description: string
  images: ResponsiveImages
}

// =============================================================================
// DATA
// =============================================================================

const INDUSTRIES: Industry[] = [
  {
    id: 'construction',
    name: 'Construction',
    icon: Building2,
    description: 'Streamline site safety compliance with real-time incident tracking and automated reporting.',
    images: {
      desktop: { avif: constructionDesktopAvif, webp: constructionDesktopWebp, png: constructionDesktopPng },
      tablet: { avif: constructionTabletAvif, webp: constructionTabletWebp, png: constructionTabletPng },
      mobile: { avif: constructionMobileAvif, webp: constructionMobileWebp, png: constructionMobilePng },
    },
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing',
    icon: Factory,
    description: 'Optimize plant safety protocols with predictive risk analysis and workflow automation.',
    images: {
      desktop: { avif: manufacturingDesktopAvif, webp: manufacturingDesktopWebp, png: manufacturingDesktopPng },
      tablet: { avif: manufacturingTabletAvif, webp: manufacturingTabletWebp, png: manufacturingTabletPng },
      mobile: { avif: manufacturingMobileAvif, webp: manufacturingMobileWebp, png: manufacturingMobilePng },
    },
  },
  {
    id: 'energy',
    name: 'Energy',
    icon: Zap,
    description: 'Ensure regulatory compliance across distributed assets with centralized monitoring.',
    images: {
      desktop: { avif: energyDesktopAvif, webp: energyDesktopWebp, png: energyDesktopPng },
      tablet: { avif: energyTabletAvif, webp: energyTabletWebp, png: energyTabletPng },
      mobile: { avif: energyMobileAvif, webp: energyMobileWebp, png: energyMobilePng },
    },
  },
  {
    id: 'pharma',
    name: 'Pharma',
    icon: Pill,
    description: 'Maintain GxP compliance with automated documentation and audit trail management.',
    images: {
      desktop: { avif: pharmaDesktopAvif, webp: pharmaDesktopWebp, png: pharmaDesktopPng },
      tablet: { avif: pharmaTabletAvif, webp: pharmaTabletWebp, png: pharmaTabletPng },
      mobile: { avif: pharmaMobileAvif, webp: pharmaMobileWebp, png: pharmaMobilePng },
    },
  },
  {
    id: 'logistics',
    name: 'Logistics',
    icon: Truck,
    description: 'Maintain rigorous standards with automated regulatory checks.',
    images: {
      desktop: { avif: logisticsDesktopAvif, webp: logisticsDesktopWebp, png: logisticsDesktopPng },
      tablet: { avif: logisticsTabletAvif, webp: logisticsTabletWebp, png: logisticsTabletPng },
      mobile: { avif: logisticsMobileAvif, webp: logisticsMobileWebp, png: logisticsMobilePng },
    },
  },
]

// =============================================================================
// INDUSTRY CARD COMPONENT
// =============================================================================

interface IndustryCardProps {
  industry: Industry
  isExpanded: boolean
  onClick: () => void
}

function IndustryCard({ industry, isExpanded, onClick }: IndustryCardProps) {
  const Icon = industry.icon

  return (
    <motion.div
      className="relative h-[500px] lg:h-[600px] rounded-xl overflow-hidden cursor-pointer border border-slate-200"
      initial={false}
      animate={{
        width: isExpanded ? 400 : 200,
        flex: isExpanded ? '0 0 400px' : '0 0 200px',
      }}
      transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
      onClick={onClick}
      whileHover={{ scale: isExpanded ? 1 : 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Background Image */}
      <motion.div
        className="absolute inset-0"
        initial={false}
        animate={{ scale: isExpanded ? 1 : 1.1 }}
        transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
      >
        <picture>
          {/* Mobile (up to 640px) */}
          <source
            media="(max-width: 640px)"
            srcSet={industry.images.mobile.avif}
            type="image/avif"
          />
          <source
            media="(max-width: 640px)"
            srcSet={industry.images.mobile.webp}
            type="image/webp"
          />
          <source
            media="(max-width: 640px)"
            srcSet={industry.images.mobile.png}
            type="image/png"
          />
          {/* Tablet (641px to 1024px) */}
          <source
            media="(max-width: 1024px)"
            srcSet={industry.images.tablet.avif}
            type="image/avif"
          />
          <source
            media="(max-width: 1024px)"
            srcSet={industry.images.tablet.webp}
            type="image/webp"
          />
          <source
            media="(max-width: 1024px)"
            srcSet={industry.images.tablet.png}
            type="image/png"
          />
          {/* Desktop (1025px+) */}
          <source
            srcSet={industry.images.desktop.avif}
            type="image/avif"
          />
          <source
            srcSet={industry.images.desktop.webp}
            type="image/webp"
          />
          <img
            src={industry.images.desktop.png}
            alt={industry.name}
            className="w-full h-full object-cover"
          />
        </picture>
      </motion.div>

      {/* Overlay gradient - positioned lower on expanded cards */}
      <motion.div
        className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent"
        initial={false}
        animate={{
          height: isExpanded ? '50%' : '70%',
        }}
        transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
      />

      {/* Content */}
      <div className="absolute inset-x-0 bottom-0 p-5">
        {/* Icon and Title - slides up when expanded */}
        <motion.div
          initial={false}
          animate={{
            y: isExpanded ? -100 : 0,
          }}
          transition={{
            duration: 0.4,
            ease: [0.32, 0.72, 0, 1],
            delay: isExpanded ? 0.5 : 0,
          }}
        >
          <div className="flex items-center gap-2 text-white">
            <Icon className="w-5 h-5" />
            <span className="font-medium text-sm">{industry.name}</span>
          </div>
        </motion.div>

        {/* Description and Coming Soon - fades in below title after it moves up */}
        <motion.div
          className="absolute bottom-5 left-5 right-5"
          initial={false}
          animate={{
            opacity: isExpanded ? 1 : 0,
          }}
          transition={{
            duration: 0.3,
            ease: [0.32, 0.72, 0, 1],
            delay: isExpanded ? 0.6 : 0,
          }}
        >
          <p className="text-white/90 text-sm leading-relaxed mb-2">
            {industry.description}
          </p>
          <span className="text-white/70 text-sm font-medium">
            Coming soon
          </span>
        </motion.div>
      </div>
    </motion.div>
  )
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function IndustryCarouselSection() {
  const [expandedId, setExpandedId] = useState<string>('logistics')

  const handleCardClick = (id: string) => {
    setExpandedId(id)
  }

  return (
    <section
      className="bg-cream py-10 sm:py-14 lg:py-16 border-y-dashed-figma"
      data-element="industry-carousel-section"
    >
      <SectionContainer>
        {/* Header */}
        <div className="text-center mb-10 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-display font-bold text-dark leading-tight">
            Empowering Disruptors in
          </h2>
        </div>

        {/* Carousel */}
        <div className="flex justify-center gap-3.5 overflow-x-auto pb-4 -mx-4 px-4 lg:mx-0 lg:px-0 scrollbar-hide">
          {INDUSTRIES.map((industry) => (
            <IndustryCard
              key={industry.id}
              industry={industry}
              isExpanded={expandedId === industry.id}
              onClick={() => handleCardClick(industry.id)}
            />
          ))}
        </div>
      </SectionContainer>
    </section>
  )
}
