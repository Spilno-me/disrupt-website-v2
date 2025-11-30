import { BlobSection } from '@/components/ui/GridBlobCanvas'
import { CheckListItem } from '@/components/ui/CheckListItem'
import { SHADOWS } from '@/constants/designTokens'
import featureImage from '@/assets/figma/feature-5-image.png'

export function FutureCapabilitiesSection() {
  return (
    <BlobSection className="py-16">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <div className="w-full lg:w-1/2">
            <img
              src={featureImage}
              alt="Construction worker using tablet"
              className="w-full h-auto rounded-[16px] object-cover shadow-[0_6px_12px_-2px_rgba(0,0,0,0.3),0_20px_50px_-8px_rgba(0,0,0,0.2)]"
            />
          </div>

          <div className="w-full lg:w-1/2">
            <h2 className="text-2xl lg:text-[32px] font-display font-semibold text-[#2D3142] leading-tight mb-1">
              EHS First. Enterprise Always.
            </h2>

            <p className="text-base lg:text-lg font-display font-medium text-[#08A4BD] mb-4">
              Starting with EHS — building a platform that grows.
            </p>
            <div className="separator-dashed mb-8" />

            <div className="flex flex-col gap-4">
              <CheckListItem label="Sustainability reporting" text="with one-click outputs." boldLabel={false} />
              <CheckListItem label="Risk and operations" text="with predictive alerts." boldLabel={false} />
              <CheckListItem label="Finance and quality" text="with AI-driven workflows." boldLabel={false} />
            </div>
          </div>
        </div>
      </div>
    </BlobSection>
  )
}
