import { ArrowRight } from 'lucide-react'
import {
  SectionContainer,
  SectionHeading,
  TwoColumnLayout,
  Column,
  SectionImage,
} from '@/components/ui/SectionLayout'
import { optimizedImages } from '@/assets/optimized'

// =============================================================================
// COMPONENT
// =============================================================================

export function AIPlatformSection() {
  return (
    <section
      className="bg-cream py-8 sm:py-11 lg:py-16 border-y-dashed-figma"
      data-element="ai-platform-section"
    >
      <SectionContainer>
        {/* Mobile: Header first */}
        <div className="lg:hidden">
          <SectionHeading
            title="AI-native platform"
            subtitle="Reduce admin. Prevent incidents. Scale with confidence."
          />
        </div>

        <TwoColumnLayout reverse>
          {/* Content - Right on desktop */}
          <Column className="flex flex-col">
            {/* Desktop: Header inside column */}
            <div className="hidden lg:block">
              <SectionHeading
                title="AI-native platform"
                subtitle="Reduce admin. Prevent incidents. Scale with confidence."
              />
            </div>

            {/* Description - Below image on mobile */}
            <p className="text-muted text-base lg:text-lg leading-[1.6] mb-4">
              That's why we built Disrupt — an AI-native platform that reduces admin, prevents incidents, and adapts to any compliance challenge.
            </p>

            {/* Subtitle - Bold */}
            <p className="text-muted text-base lg:text-lg leading-[1.6] font-semibold mb-6">
              Starting with EHS, architected for the enterprise.
            </p>

            {/* CTA Link */}
            <a
              href="#learn-more"
              className="inline-flex items-center gap-2 text-teal hover:text-teal/80 transition-colors font-medium"
            >
              Learn more
              <ArrowRight className="w-4 h-4 arrow-bounce" />
            </a>
          </Column>

          {/* Image - Left on desktop, After header on mobile */}
          <Column className="order-first lg:order-none">
            <SectionImage
              sources={optimizedImages.feature1}
              alt="AI-native platform visualization"
            />
          </Column>
        </TwoColumnLayout>
      </SectionContainer>
    </section>
  )
}
