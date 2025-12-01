import { Button } from '@/components/ui/button'
import { scrollToElement } from '@/utils/navigation'
import { COLORS } from '@/constants/designTokens'
import { GridBlobBackground } from '@/components/ui/GridBlobCanvas'

// =============================================================================
// COMPONENT
// =============================================================================

export function ReadyToAchieveSection() {
  return (
    <section
      className="py-16 lg:py-24 relative"
      data-element="ready-to-achieve-section"
    >
      <GridBlobBackground scale={1.5} />
      <div className="max-w-[1440px] mx-auto px-6 relative z-[1]">
        <div className="flex flex-col items-center text-center">
          {/* Heading */}
          <h2
            className="font-display font-bold text-2xl sm:text-3xl lg:text-[36px] leading-[1.11] mb-6"
            style={{ color: '#341E63' }}
          >
            Ready to Achieve Predictive Prevention?
          </h2>

          {/* Subheading */}
          <p
            className="font-sans text-base leading-[1.5] max-w-[560px] mb-8"
            style={{ color: COLORS.muted }}
          >
            Stop paying extra for AI, upgrades, and consulting that drains your ROI today.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              variant="outline"
              className="px-8"
              onClick={() => scrollToElement('contact')}
            >
              Request a Personalized Analysis
            </Button>
            <Button
              variant="contact"
              className="px-8"
              onClick={() => scrollToElement('contact')}
            >
              Become a Partner
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
