import { ArrowRight } from 'lucide-react'
import {
  SectionContainer,
  SectionHeading,
  TwoColumnLayout,
  Column,
  SectionImage,
} from '@/components/ui/SectionLayout'
import featureImage from '@/assets/figma/feature-1-image.png'

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
        <TwoColumnLayout reverse>
          {/* Image - Left on desktop */}
          <Column>
            <SectionImage
              src={featureImage}
              alt="AI-native platform visualization"
            />
          </Column>

          {/* Content - Right on desktop */}
          <Column className="flex flex-col">
            <SectionHeading
              title="AI-native platform"
              subtitle="Reduce admin. Prevent incidents. Scale with confidence."
            />

            {/* Description */}
            <p className="text-dark text-base lg:text-lg leading-[1.6] mb-4">
              That's why we built Disrupt — an AI-native platform that reduces admin, prevents incidents, and adapts to any compliance challenge.
            </p>

            {/* Subtitle - Bold */}
            <p className="text-dark text-base lg:text-lg leading-[1.6] font-semibold mb-6">
              Starting with EHS, architected for the enterprise.
            </p>

            {/* CTA Link */}
            <a
              href="#learn-more"
              className="inline-flex items-center gap-2 text-teal hover:text-teal/80 transition-colors font-medium"
            >
              Learn more
              <ArrowRight className="w-4 h-4" />
            </a>
          </Column>
        </TwoColumnLayout>
      </SectionContainer>
    </section>
  )
}
