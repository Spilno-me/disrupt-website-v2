import { BlobSection } from '@/components/ui/GridBlobCanvas'
import { CheckListItem } from '@/components/ui/CheckListItem'
import {
  SectionContainer,
  SectionHeading,
  TwoColumnLayout,
  Column,
  SectionImage,
} from '@/components/ui/SectionLayout'
import featureImage from '@/assets/figma/feature-2-image.png'

// =============================================================================
// DATA
// =============================================================================

const PROOF_ITEMS = [
  {
    label: '8–12× Faster Go-Live →',
    text: 'Your team operational in weeks, not years.',
  },
  {
    label: 'ROI in 6–12 months →',
    text: '239% ROI modeled over 5 years — proof your board will trust.',
  },
  {
    label: 'Lower total cost of ownership →',
    text: 'Without sacrificing compliance.',
  },
  {
    label: 'Fewer admin errors →',
    text: 'Safer workplaces and more time for training and prevention.',
  },
  {
    label: 'Flexible foundation →',
    text: 'Built for EHS today, designed to expand across the enterprise.',
  },
] as const

// =============================================================================
// COMPONENT
// =============================================================================

export function ProofSection() {
  return (
    <BlobSection className="py-8 sm:py-11 lg:py-16">
      <SectionContainer>
        <div className="flex flex-col items-center text-center">
          <SectionHeading
            title="Proof at a Glance"
            subtitle="Real Impact. Measurable Outcomes."
            centered
          />

          <TwoColumnLayout className="w-full text-left">
            <Column width="55%">
              <div className="flex flex-col gap-4">
                {PROOF_ITEMS.map((item) => (
                  <CheckListItem key={item.label} {...item} />
                ))}
              </div>
            </Column>

            <Column width="45%">
              <SectionImage
                src={featureImage}
                alt="Proof metrics visualization"
              />
            </Column>
          </TwoColumnLayout>
        </div>
      </SectionContainer>
    </BlobSection>
  )
}
