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

export function OurStorySection() {
  return (
    <section
      className="bg-cream py-8 sm:py-11 lg:py-16 border-y-dashed-figma"
      data-element="our-story-section"
    >
      <SectionContainer>
        {/* Mobile: Header first */}
        <div className="lg:hidden">
          <SectionHeading title="Our Story" />
        </div>

        <TwoColumnLayout>
          {/* Content - Left on desktop */}
          <Column className="flex flex-col">
            {/* Desktop: Header inside column */}
            <div className="hidden lg:block">
              <SectionHeading title="Our Story" />
            </div>

            {/* Description */}
            <p className="text-muted text-base lg:text-lg leading-[1.6] mb-4">
              For too long, compliance systems have trapped teams in endless admin.
              Hours lost to forms. Safety delayed by red tape. "Digital transformation"
              that only digitized inefficiency.
            </p>

            <p className="text-muted text-base lg:text-lg leading-[1.6] mb-4">
              Disrupt was created to change that.
            </p>

            <p className="text-muted text-base lg:text-lg leading-[1.6]">
              Born from EHS expertise and enterprise AI engineering, we set out to
              eliminate—not just digitize—administrative waste. Because compliance
              should mean safer workplaces, smarter strategy, and more time for people.
            </p>
          </Column>

          {/* Image - Right on desktop */}
          <Column>
            <ResponsiveImage
              images={aboutImages.ourStory}
              alt="Our Story"
              className="w-full h-auto rounded-[14px] object-cover"
            />
          </Column>
        </TwoColumnLayout>
      </SectionContainer>
    </section>
  )
}
