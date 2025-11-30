import { Button } from '@/components/ui/button'
import { CheckListItem } from '@/components/ui/CheckListItem'
import { scrollToElement } from '@/utils/navigation'
import { BlobSection } from '@/components/ui/GridBlobCanvas'
import {
  SectionContainer,
  SectionHeading,
  TwoColumnLayout,
  Column,
  SectionImage,
} from '@/components/ui/SectionLayout'
import whoWeHelpImage from '@/assets/figma/who-we-help-image.png'

// =============================================================================
// DATA
// =============================================================================

const WHO_WE_HELP_ITEMS = [
  {
    label: 'For Companies →',
    text: 'Free your teams from repetitive admin. Cut costs while training more, preventing incidents, and reaching compliance faster.',
  },
  {
    label: 'For Consultants →',
    text: 'Slash paperwork. Gain visibility. Spend more time guiding strategy, not chasing data.',
  },
] as const

// =============================================================================
// COMPONENT
// =============================================================================

export function WhoWeHelpSection() {
  return (
    <BlobSection className="py-8 sm:py-12 lg:py-16">
      <SectionContainer>
        <TwoColumnLayout>
          {/* Content - Left side */}
          <Column>
            <SectionHeading
              title="Who We Help"
              subtitle="One Platform. Two Wins."
            />

            {/* Bullet Points */}
            <div className="flex flex-col gap-4 mb-8">
              {WHO_WE_HELP_ITEMS.map((item) => (
                <CheckListItem key={item.label} {...item} />
              ))}
            </div>

            {/* CTA Button */}
            <Button
              onClick={() => scrollToElement('contact')}
              className="h-12 bg-[#2D3142] text-white hover:bg-[#2D3142]/90 rounded-[12px] px-8 py-3 text-base font-medium"
            >
              Contact us
            </Button>
          </Column>

          {/* Image - Right side */}
          <Column>
            <SectionImage
              src={whoWeHelpImage}
              alt="Who we help visualization"
            />
          </Column>
        </TwoColumnLayout>
      </SectionContainer>
    </BlobSection>
  )
}
