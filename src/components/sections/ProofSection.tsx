import { BlobSection } from '@/components/ui/GridBlobCanvas'
import { CheckListItem } from '@/components/ui/CheckListItem'
import { SHADOWS } from '@/constants/designTokens'
import featureImage from '@/assets/figma/feature-2-image.png'

const proofItems = [
  {
    label: '8–12× Faster Go-Live →',
    text: 'Your team operational in weeks, not years.'
  },
  {
    label: 'ROI in 6–12 months →',
    text: '239% ROI modeled over 5 years — proof your board will trust.'
  },
  {
    label: 'Lower total cost of ownership →',
    text: 'Without sacrificing compliance.'
  },
  {
    label: 'Fewer admin errors →',
    text: 'Safer workplaces and more time for training and prevention.'
  },
  {
    label: 'Flexible foundation →',
    text: 'Built for EHS today, designed to expand across the enterprise.'
  }
]

export function ProofSection() {
  return (
    <BlobSection className="py-8 sm:py-11 lg:py-16">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-xl sm:text-2xl lg:text-[32px] font-display font-semibold text-[#2D3142] leading-tight mb-1">
            Proof at a Glance
          </h2>
          <p className="text-sm sm:text-base lg:text-lg font-display font-medium text-[#08A4BD] mb-4">
            Real Impact. Measurable Outcomes.
          </p>
          <div className="separator-dashed w-full max-w-md mb-6 sm:mb-8 lg:mb-12 hidden sm:block" />

          <div className="flex flex-col lg:flex-row items-center gap-6 sm:gap-10 lg:gap-16 w-full text-left">
            <div className="w-full lg:w-[55%] flex flex-col gap-4">
              {proofItems.map((item) => (
                <CheckListItem key={item.label} {...item} />
              ))}
            </div>

            <div className="w-full lg:w-[45%]">
              <img
                src={featureImage}
                alt="Proof metrics visualization"
                className="w-full h-auto rounded-[16px] object-cover shadow-[0_6px_12px_-2px_rgba(0,0,0,0.3),0_20px_50px_-8px_rgba(0,0,0,0.2)]"
              />
            </div>
          </div>
        </div>
      </div>
    </BlobSection>
  )
}
