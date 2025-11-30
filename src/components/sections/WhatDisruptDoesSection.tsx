import { FeatureCard, FeatureCardProps } from '@/components/ui/FeatureCard'
import { SectionContainer, SectionHeading } from '@/components/ui/SectionLayout'
import { COLORS } from '@/constants/designTokens'
import iconAutomate from '@/assets/figma/icon-automate.svg'
import iconAdvice from '@/assets/figma/icon-advice.svg'
import iconAdapt from '@/assets/figma/icon-adapt.svg'
import iconScale from '@/assets/figma/icon-scale.svg'

// =============================================================================
// FEATURE DATA
// =============================================================================

const FEATURES: FeatureCardProps[] = [
  {
    icon: iconAutomate,
    iconAlt: 'Automate icon',
    circleColor: COLORS.circleBlue,
    title: 'Automate',
    description: <>Cut up to <strong>70% of admin</strong> — freeing time for training, coaching, and prevention.</>,
  },
  {
    icon: iconAdvice,
    iconAlt: 'Advice icon',
    circleColor: COLORS.circleRed,
    title: 'Advice',
    description: <><strong>Real-time AI guidance</strong> during audits and reporting — helping teams avoid mistakes before they become incidents.</>,
  },
  {
    icon: iconAdapt,
    iconAlt: 'Adapt icon',
    circleColor: COLORS.circleYellow,
    title: 'Adapt',
    description: <>Build forms and workflows <strong>instantly</strong> — no coding, no bottlenecks. Flexible enough for EHS today.</>,
  },
  {
    icon: iconScale,
    iconAlt: 'Scale icon',
    circleColor: COLORS.circleGreen,
    title: 'Scale',
    description: <>Architected to <strong>extend beyond EHS</strong> into any workflow where admin slows people down.</>,
  },
]

// =============================================================================
// COMPONENT
// =============================================================================

export function WhatDisruptDoesSection() {
  return (
    <section
      className="bg-cream py-8 sm:py-12 lg:py-24 border-y-dashed-figma"
      data-element="what-disrupt-does-section"
    >
      <SectionContainer>
        <div className="flex flex-col items-center gap-8 sm:gap-12 lg:gap-16">
          {/* Header */}
          <SectionHeading
            title="What Disrupt does"
            subtitle="AI That Works Like a Consultant. Scales Like Software."
            centered
          />

          {/* Feature Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 w-full">
            {FEATURES.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </div>
      </SectionContainer>
    </section>
  )
}
