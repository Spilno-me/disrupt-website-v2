import { Button } from '@/components/ui/button'
import { CheckListItem } from '@/components/ui/CheckListItem'
import { ElectricButtonWrapper } from '@/components/ui/ElectricInput'
import { scrollToElement } from '@/utils/navigation'
import { BlobSection } from '@/components/ui/GridBlobCanvas'
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
        {/* Mobile: Header first */}
        <div className="lg:hidden">
          <SectionHeading
            title="Who We Help"
            subtitle="One Platform. Two Wins."
          />
        </div>

        <TwoColumnLayout>
          {/* Content - Left side on desktop */}
          <Column>
            {/* Desktop: Header inside column */}
            <div className="hidden lg:block">
              <SectionHeading
                title="Who We Help"
                subtitle="One Platform. Two Wins."
              />
            </div>

            {/* Bullet Points */}
            <div className="flex flex-col gap-4 mb-8">
              {WHO_WE_HELP_ITEMS.map((item) => (
                <CheckListItem key={item.label} {...item} />
              ))}
            </div>

            {/* CTA Button */}
            <ElectricButtonWrapper className="w-fit">
              <Button
                onClick={() => scrollToElement('contact')}
                className="h-12 bg-[#2D3142] text-white hover:bg-[#2D3142]/90 rounded-[12px] px-8 py-3 text-base font-medium"
              >
                Contact us
              </Button>
            </ElectricButtonWrapper>
          </Column>

          {/* Image - Right side on desktop, After header on mobile */}
          <Column className="order-first lg:order-none">
            <div className="-mx-4 sm:mx-0">
              <ResponsiveImage
                images={optimizedImages.whoWeHelp}
                alt="Who we help visualization"
              />
            </div>
          </Column>
        </TwoColumnLayout>
      </SectionContainer>
    </BlobSection>
  )
}
