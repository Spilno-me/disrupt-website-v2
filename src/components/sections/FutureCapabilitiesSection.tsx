import { BlobSection } from '@/components/ui/GridBlobCanvas'
import { CheckListItem } from '@/components/ui/CheckListItem'
import {
  SectionContainer,
  SectionHeading,
  TwoColumnLayout,
  Column,
} from '@/components/ui/SectionLayout'
import { ResponsiveImage } from '@/components/ui/ResponsiveImage'
import { optimizedImages } from '@/assets/optimized'

// =============================================================================
// DATA
// =============================================================================

const FUTURE_CAPABILITIES = [
  { label: 'Sustainability reporting', text: 'with one-click outputs.' },
  { label: 'Risk and operations', text: 'with predictive alerts.' },
  { label: 'Finance and quality', text: 'with AI-driven workflows.' },
] as const

// =============================================================================
// COMPONENT
// =============================================================================

export function FutureCapabilitiesSection() {
  return (
    <BlobSection className="py-8 sm:py-12 lg:py-16">
      <SectionContainer>
        {/* Mobile: Header first */}
        <div className="lg:hidden">
          <SectionHeading
            title="EHS First. Enterprise Always."
            subtitle="Starting with EHS — building a platform that grows."
          />
        </div>

        <TwoColumnLayout reverse>
          {/* Image - Left on desktop, After header on mobile */}
          <Column className="order-first lg:order-none">
            <div className="-mx-4 sm:mx-0">
              <ResponsiveImage
                images={optimizedImages.feature5}
                alt="Construction worker using tablet"
              />
            </div>
          </Column>

          {/* Content - Right on desktop */}
          <Column>
            {/* Desktop: Header inside column */}
            <div className="hidden lg:block">
              <SectionHeading
                title="EHS First. Enterprise Always."
                subtitle="Starting with EHS — building a platform that grows."
              />
            </div>

            <div className="flex flex-col gap-4">
              {FUTURE_CAPABILITIES.map((item) => (
                <CheckListItem key={item.label} {...item} boldLabel={false} />
              ))}
            </div>
          </Column>
        </TwoColumnLayout>
      </SectionContainer>
    </BlobSection>
  )
}
