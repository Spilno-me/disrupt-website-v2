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

export function PartnersSection() {
  return (
    <section
      className="relative bg-white py-8 sm:py-11 lg:py-16 border-y-dashed-figma"
      data-element="partners-section"
    >
      {/* Grid Blob Background */}
      <GridBlobBackground scale={1.5} />

      <SectionContainer className="relative z-[1]">
        {/* Mobile: Header first */}
        <div className="lg:hidden">
          <SectionHeading title="Partners and Community" />
        </div>

        <TwoColumnLayout>
          {/* Image - Left on desktop */}
          <Column className="order-first">
            <ResponsiveImage
              images={aboutImages.partners}
              alt="Partners and Community"
              className="w-full h-auto rounded-[14px] object-cover"
            />
          </Column>

          {/* Content - Right on desktop */}
          <Column className="flex flex-col">
            {/* Desktop: Header inside column */}
            <div className="hidden lg:block">
              <SectionHeading title="Partners and Community" />
            </div>

            {/* Description */}
            <p className="text-muted text-base lg:text-lg leading-[1.6]">
              Disrupt is more than software. It's a growing ecosystem of safety leaders,
              consultants, and partners determined to change how enterprises approach
              compliance. Together, we're proving that technology can keep people safe, reduce
              costs, and free teams to do meaningful work.
            </p>
          </Column>
        </TwoColumnLayout>
      </SectionContainer>
    </section>
  )
}
