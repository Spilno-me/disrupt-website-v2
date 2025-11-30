import { ArrowRight } from 'lucide-react'
import featureImage from '@/assets/figma/feature-4-image.png'
import { Button } from '@/components/ui/button'
import { scrollToElement } from '@/utils/navigation'

export function WhyDifferentSection() {
  return (
    <section
      className="bg-[#FBFBF3] py-8 sm:py-11 lg:py-16 border-y-dashed-figma"
      data-element="why-different-section"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-6 sm:gap-10 lg:gap-16">
          {/* Content - Left side - Figma: gap 32px */}
          <div className="w-full lg:w-1/2 flex flex-col" data-element="why-different-content">
            {/* Header */}
            <h2 className="text-2xl lg:text-[32px] font-display font-semibold text-dark leading-tight mb-1">
              Why We're Different
            </h2>
            <p className="text-base lg:text-lg font-display font-medium text-[#08A4BD] mb-4">
              Not Another Tool. A New Model.
            </p>
            <div className="separator-dashed mb-8 hidden sm:block" />

            {/* Description */}
            <div className="flex flex-col gap-4 mb-6">
              <p className="text-[#6B7280] leading-relaxed text-base">
                Legacy systems were built for process, not people — leaving you dependent on consultants and trapped in admin.
              </p>
              <p className="text-[#6B7280] leading-relaxed text-base">
                Disrupt is built differently: AI-native, adaptive, and designed to keep people safer, give teams better training, and prevent incidents — while reducing the busywork that slows everyone down.
              </p>
            </div>

            {/* CTA Button - h-9 (36px), bg-[#2D3142], rounded-[12px] */}
            <Button
              onClick={() => scrollToElement('contact')}
              className="w-fit h-11 sm:h-9 bg-[#2D3142] text-white hover:bg-[#2D3142]/90 rounded-[12px] px-6 sm:px-4 py-2 gap-2 text-base sm:text-sm font-medium"
            >
              Contact us
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Image - Right side - Figma: border-radius 14px */}
          <div className="w-full lg:w-1/2" data-element="why-different-image">
            <img
              src={featureImage}
              alt="Why we're different visualization"
              className="w-full h-auto rounded-[16px] object-cover shadow-[0_6px_12px_-2px_rgba(0,0,0,0.3),0_20px_50px_-8px_rgba(0,0,0,0.2)]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
