import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowRight, Building2, Factory, Zap, Pill, Truck } from 'lucide-react'
import { SectionContainer } from '@/components/ui/SectionLayout'

// =============================================================================
// TYPES
// =============================================================================

interface Industry {
  id: string
  name: string
  icon: React.ElementType
  description: string
  image: string
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
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing',
    icon: Factory,
    description: 'Optimize plant safety protocols with predictive risk analysis and workflow automation.',
    image: 'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=800&q=80',
  },
  {
    id: 'energy',
    name: 'Energy',
    icon: Zap,
    description: 'Ensure regulatory compliance across distributed assets with centralized monitoring.',
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80',
  },
  {
    id: 'pharma',
    name: 'Pharma',
    icon: Pill,
    description: 'Maintain GxP compliance with automated documentation and audit trail management.',
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&q=80',
  },
  {
    id: 'logistics',
    name: 'Logistics',
    icon: Truck,
    description: 'Maintain rigorous standards with automated regulatory checks.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80',
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
      layout
      className="relative h-[500px] lg:h-[600px] rounded-xl overflow-hidden cursor-pointer border border-slate-200"
      animate={{
        width: isExpanded ? 400 : 200,
        flex: isExpanded ? '0 0 400px' : '0 0 200px',
      }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      onClick={onClick}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={industry.image}
          alt={industry.name}
          className="w-full h-full object-cover"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-5">
        {/* Icon and Title - Always visible */}
        <div className="flex items-center gap-2 text-white mb-2">
          <Icon className="w-5 h-5" />
          <span className="font-medium text-sm">{industry.name}</span>
        </div>

        {/* Expanded Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="flex flex-col gap-3"
            >
              <p className="text-white/90 text-sm leading-relaxed">
                {industry.description}
              </p>
              <button className="flex items-center gap-1 text-white text-sm font-medium hover:underline w-fit">
                Learn more
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
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
