import { Button } from '@/components/ui/button'
import { CheckListItem } from '@/components/ui/CheckListItem'
import { scrollToElement } from '@/utils/navigation'
import { BlobSection } from '@/components/ui/GridBlobCanvas'
import { COLORS, SHADOWS, TYPOGRAPHY, SPACING } from '@/constants/designTokens'
import whoWeHelpImage from '@/assets/figma/who-we-help-image.png'

export function WhoWeHelpSection() {
  return (
    <BlobSection className="py-16">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Content - Left side */}
          <div className="w-full lg:w-1/2">
            {/* Main Heading */}
            <h2 className="text-2xl lg:text-[32px] font-display font-semibold text-[#2D3142] leading-tight mb-1">
              Who We Help
            </h2>

            {/* Subheading */}
            <p className="text-base lg:text-lg font-display font-medium text-[#08A4BD] mb-4">
              One Platform. Two Wins.
            </p>
            <div className="separator-dashed mb-8" />

            {/* Bullet Points */}
            <div className="flex flex-col gap-4 mb-8">
              <CheckListItem
                label="For Companies →"
                text="Free your teams from repetitive admin. Cut costs while training more, preventing incidents, and reaching compliance faster."
              />
              <CheckListItem
                label="For Consultants →"
                text="Slash paperwork. Gain visibility. Spend more time guiding strategy, not chasing data."
              />
            </div>

            {/* CTA Button */}
            <Button
              onClick={() => scrollToElement('contact')}
              className="h-12 bg-[#2D3142] text-white hover:bg-[#2D3142]/90 rounded-[12px] px-8 py-3 text-base font-medium"
            >
              Contact us
            </Button>
          </div>

          {/* Image - Right side */}
          <div className="w-full lg:w-1/2">
            <img
              src={whoWeHelpImage}
              alt="Who we help visualization"
              className="w-full h-auto rounded-[16px] object-cover shadow-[0_6px_12px_-2px_rgba(0,0,0,0.3),0_20px_50px_-8px_rgba(0,0,0,0.2)]"
            />
          </div>
        </div>
      </div>
    </BlobSection>
  )
}
