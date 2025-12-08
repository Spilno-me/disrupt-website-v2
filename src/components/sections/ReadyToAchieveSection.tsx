import { Button, ElectricButtonWrapper, GridBlobBackground } from '@adrozdenko/design-system'
import { scrollToElement } from '@/utils/navigation'

// =============================================================================
// COMPONENT
// =============================================================================

export function ReadyToAchieveSection() {
  return (
    <section
      className="py-8 sm:py-12 lg:py-16 relative"
      data-element="ready-to-achieve-section"
    >
      <GridBlobBackground scale={1.5} />
      <div className="max-w-container mx-auto px-4 sm:px-6 relative z-[1]">
        <div className="flex flex-col items-start lg:items-center text-left lg:text-center">
          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl lg:text-3xl font-display font-bold leading-[1.2] mb-4 text-dark">
            Ready to Achieve Predictive Prevention?
          </h2>

          {/* Subheading */}
          <p className="text-sm sm:text-base lg:text-lg font-display font-medium max-w-[560px] mb-8 text-teal">
            Stop paying extra for AI, upgrades, and consulting that drains your ROI today.
          </p>

          {/* Button */}
          <div className="self-end sm:self-auto">
            <ElectricButtonWrapper>
              <Button
                variant="contact"
                className="px-8"
                onClick={() => scrollToElement('contact')}
              >
                Become a Partner
              </Button>
            </ElectricButtonWrapper>
          </div>
        </div>
      </div>
    </section>
  )
}
