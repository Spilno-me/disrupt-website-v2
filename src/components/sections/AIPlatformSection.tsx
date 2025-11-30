import { ArrowRight } from 'lucide-react'
import featureImage from '@/assets/figma/feature-1-image.png'

export function AIPlatformSection() {
  return (
    <section
      className="bg-[#FBFBF3] py-8 sm:py-11 lg:py-16 border-y-dashed-figma"
      data-element="ai-platform-section"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row items-center gap-6 sm:gap-10 lg:gap-16">
          {/* Image - Left on desktop, below text on mobile */}
          <div className="w-full lg:w-1/2 order-2 lg:order-1" data-element="ai-platform-image">
            <img
              src={featureImage}
              alt="AI-native platform visualization"
              className="w-full h-auto rounded-[16px] object-cover shadow-[0_6px_12px_-2px_rgba(0,0,0,0.3),0_20px_50px_-8px_rgba(0,0,0,0.2)]"
            />
          </div>

          {/* Content - Right on desktop, first on mobile */}
          <div className="w-full lg:w-1/2 flex flex-col order-1 lg:order-2" data-element="ai-platform-content">
            {/* Header group */}
            <h2 className="text-2xl lg:text-[32px] font-display font-semibold text-[#2D3142] leading-tight mb-1">
              AI-native platform
            </h2>
            <p className="text-base lg:text-lg font-display font-medium text-[#08A4BD] mb-4">
              Reduce admin. Prevent incidents. Scale with confidence.
            </p>
            <div className="separator-dashed mb-8 hidden sm:block" />

            {/* Description */}
            <p className="text-[#2D3142] text-base lg:text-lg leading-[1.6] mb-4">
              That's why we built Disrupt — an AI-native platform that reduces admin, prevents incidents, and adapts to any compliance challenge.
            </p>

            {/* Subtitle - Bold */}
            <p className="text-[#2D3142] text-base lg:text-lg leading-[1.6] font-semibold mb-6">
              Starting with EHS, architected for the enterprise.
            </p>

            {/* CTA Link */}
            <a
              href="#learn-more"
              className="inline-flex items-center gap-2 text-[#08A4BD] hover:text-[#08A4BD]/80 transition-colors font-medium"
            >
              Learn more
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
