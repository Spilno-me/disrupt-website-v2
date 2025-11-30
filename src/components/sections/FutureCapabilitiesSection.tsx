import { BlobSection } from '@/components/ui/GridBlobCanvas'
import { CheckListItem } from '@/components/ui/CheckListItem'
import {
  SectionContainer,
  SectionHeading,
  TwoColumnLayout,
  Column,
  SectionImage,
} from '@/components/ui/SectionLayout'
import featureImage from '@/assets/figma/feature-5-image.png'

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
        <TwoColumnLayout reverse>
          {/* Image - Left on desktop */}
          <Column>
            <SectionImage
              src={featureImage}
              alt="Construction worker using tablet"
            />
          </Column>

          {/* Content - Right on desktop */}
          <Column>
            <SectionHeading
              title="EHS First. Enterprise Always."
              subtitle="Starting with EHS — building a platform that grows."
            />

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
