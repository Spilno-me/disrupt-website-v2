import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ElectricButtonWrapper } from '@/components/ui/ElectricInput'
import { scrollToElement } from '@/utils/navigation'
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

export function WhyDifferentSection() {
  return (
    <section
      className="bg-cream py-8 sm:py-11 lg:py-16 border-y-dashed-figma"
      data-element="why-different-section"
    >
      <SectionContainer>
        {/* Mobile: Header first */}
        <div className="lg:hidden">
          <SectionHeading
            title="Why We're Different"
            subtitle="Not Another Tool. A New Model."
          />
        </div>

        <TwoColumnLayout reverse>
          {/* Content - Right on desktop */}
          <Column className="flex flex-col">
            {/* Desktop: Header inside column */}
            <div className="hidden lg:block">
              <SectionHeading
                title="Why We're Different"
                subtitle="Not Another Tool. A New Model."
              />
            </div>

            {/* Description */}
            <div className="flex flex-col gap-4 mb-6">
              <p className="text-muted leading-relaxed text-base">
                Legacy systems were built for process, not people — leaving you dependent on consultants and trapped in admin.
              </p>
              <p className="text-muted leading-relaxed text-base">
                Disrupt is built differently: AI-native, adaptive, and designed to keep people safer, give teams better training, and prevent incidents — while reducing the busywork that slows everyone down.
              </p>
            </div>

            {/* CTA Button */}
            <ElectricButtonWrapper className="w-fit">
              <Button
                onClick={() => scrollToElement('contact')}
                className="h-11 sm:h-9 bg-[#2D3142] text-white hover:bg-[#2D3142]/90 rounded-[12px] px-6 sm:px-4 py-2 gap-2 text-base sm:text-sm font-medium"
              >
                Contact us
                <ArrowRight className="w-4 h-4 arrow-bounce" />
              </Button>
            </ElectricButtonWrapper>
          </Column>

          {/* Image - Left on desktop, After header on mobile */}
          <Column className="order-first lg:order-none">
            <div className="-mx-4 sm:mx-0">
              <ResponsiveImage
                images={optimizedImages.feature4}
                alt="Why we're different visualization"
              />
            </div>
          </Column>
        </TwoColumnLayout>
      </SectionContainer>
    </section>
  )
}
