import { Check } from 'lucide-react'
import {
  SectionContainer,
  SectionHeading,
  TwoColumnLayout,
  Column,
} from '@/components/ui/SectionLayout'
import { GridBlobBackground } from '@/components/ui/GridBlobCanvas'
import { ResponsiveImage } from '@/components/ui/ResponsiveImage'
import { aboutImages } from '@/assets/optimized/about'

// =============================================================================
// CONSTANTS
// =============================================================================

const VALUES = [
  { title: 'Safety', description: 'protecting people is the outcome that matters most.' },
  { title: 'Simplicity and UX', description: 'software people actually want to use.' },
  { title: 'Speed as a standard', description: 'days not weeks. Months, not years.' },
  { title: 'Scalability', description: 'software universal by nature.' },
] as const

// =============================================================================
// COMPONENT
// =============================================================================

export function OurValuesSection() {
  return (
    <section
      className="relative bg-white py-8 sm:py-11 lg:py-16 border-y-dashed-figma"
      data-element="our-values-section"
    >
      {/* Grid Blob Background */}
      <GridBlobBackground scale={1.5} />

      <SectionContainer className="relative z-[1]">
        {/* Mobile: Header first */}
        <div className="lg:hidden">
          <SectionHeading title="Our Values" />
        </div>

        <TwoColumnLayout reverse>
          {/* Content - Right on desktop */}
          <Column className="flex flex-col">
            {/* Desktop: Header inside column */}
            <div className="hidden lg:block">
              <SectionHeading title="Our Values" />
            </div>

            <ul className="flex flex-col gap-4">
              {VALUES.map((value) => (
                <li key={value.title} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#08A4BD] flex-shrink-0 mt-0.5" />
                  <span className="text-muted text-base lg:text-lg leading-[1.5]">
                    <strong className="text-dark">{value.title}</strong> – {value.description}
                  </span>
                </li>
              ))}
            </ul>
          </Column>

          {/* Image - Left on desktop */}
          <Column className="order-first lg:order-none">
            <ResponsiveImage
              images={aboutImages.ourValues}
              alt="Our Values"
              className="w-full h-auto rounded-[14px] object-cover"
            />
          </Column>
        </TwoColumnLayout>
      </SectionContainer>
    </section>
  )
}
