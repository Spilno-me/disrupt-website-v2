import {
  SectionContainer,
  SectionHeading,
  TwoColumnLayout,
  Column,
} from '@/components/ui/SectionLayout'
import { GridBlobBackground } from '@/components/ui/GridBlobCanvas'
import { ResponsiveImage } from '@/components/ui/ResponsiveImage'
import { aboutImages } from '@/assets/optimized/about'

// =============================================================================
// COMPONENT
// =============================================================================

export function OurMissionSection() {
  return (
    <section
      className="relative bg-white py-8 sm:py-11 lg:py-16 border-y-dashed-figma"
      data-element="our-mission-section"
    >
      {/* Grid Blob Background */}
      <GridBlobBackground scale={1.5} />

      <SectionContainer className="relative z-[1]">
        {/* Mobile: Header first */}
        <div className="lg:hidden">
          <SectionHeading title="Our Mission" />
        </div>

        <TwoColumnLayout>
          {/* Image - Left on desktop */}
          <Column className="order-first">
            <ResponsiveImage
              images={aboutImages.ourMission}
              alt="Our Mission"
              className="w-full h-auto rounded-[14px] object-cover"
            />
          </Column>

          {/* Content - Right on desktop */}
          <Column className="flex flex-col">
            {/* Desktop: Header inside column */}
            <div className="hidden lg:block">
              <SectionHeading title="Our Mission" />
            </div>

            {/* Description */}
            <p className="text-muted text-base lg:text-lg leading-[1.6]">
              To free people from compliance admin so they can focus on keeping
              workplaces safe and making better decisions.
            </p>
          </Column>
        </TwoColumnLayout>
      </SectionContainer>
    </section>
  )
}
