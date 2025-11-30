import {
  SectionContainer,
  SectionHeading,
  TwoColumnLayout,
  Column,
} from '@/components/ui/SectionLayout'
import { ResponsiveImage } from '@/components/ui/ResponsiveImage'
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

            {/* Description */}
            <p className="text-muted text-base lg:text-lg leading-[1.6] mb-4">
              That's why we built Disrupt — an AI-native platform that reduces admin, prevents incidents, and adapts to any compliance challenge.
            </p>

            {/* Subtitle - Bold */}
            <p className="text-muted text-base lg:text-lg leading-[1.6] font-semibold">
              Starting with EHS, architected for the enterprise.
            </p>
          </Column>

          {/* Image - Left on desktop, After header on mobile */}
          <Column className="order-first lg:order-none">
            <div className="-mx-4 sm:mx-0">
              <ResponsiveImage
                images={optimizedImages.feature1}
                alt="AI-native platform visualization"
              />
            </div>
          </Column>
        </TwoColumnLayout>
      </SectionContainer>
    </section>
  )
}
