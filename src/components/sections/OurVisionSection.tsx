import {
  SectionContainer,
  SectionHeading,
  TwoColumnLayout,
  Column,
} from '@/components/ui/SectionLayout'
import { ResponsiveImage } from '@/components/ui/ResponsiveImage'
import { aboutImages } from '@/assets/optimized/about'

// =============================================================================
// COMPONENT
// =============================================================================

export function OurVisionSection() {
  return (
    <section
      className="relative bg-cream py-8 sm:py-11 lg:py-16 border-y-dashed-figma"
      data-element="our-vision-section"
    >
      <SectionContainer>
        {/* Mobile: Header first */}
        <div className="lg:hidden">
          <SectionHeading title="Our Vision" />
        </div>

        <TwoColumnLayout>
          {/* Content - Left on desktop */}
          <Column className="flex flex-col">
            {/* Desktop: Header inside column */}
            <div className="hidden lg:block">
              <SectionHeading title="Our Vision" />
            </div>

            {/* Description */}
            <p className="text-muted text-base lg:text-lg leading-[1.6]">
              We start where the pain is greatest — EHS. But the foundation we've built is
              bigger. Disrupt is designed to scale across the enterprise: sustainability, risk,
              finance, operations. Any workflow slowed by admin can be reimagined.
              EHS first. Enterprise quality always!
            </p>
          </Column>

          {/* Image - Right on desktop */}
          <Column>
            <ResponsiveImage
              images={aboutImages.ourVision}
              alt="Our Vision"
              className="w-full h-auto rounded-[14px] object-cover"
            />
          </Column>
        </TwoColumnLayout>
      </SectionContainer>
    </section>
  )
}
