import { ContactForm } from '@/components/forms/ContactForm'
import { ContactInfo } from './ContactInfo'
import { BlobSection } from '@/components/ui/GridBlobCanvas'

export function ContactSection() {
  return (
    <BlobSection id="contact" className="border-y-dashed-figma" data-element="contact-section">
      {/* Figma: max-width 1440px, full-width row layout with side margins */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row border-x-dashed-figma" data-element="contact-wrapper">
          {/* Left side - Form - Figma: padding 96px 24px, bg cream, border right dashed */}
          <div
            className="w-full lg:w-1/2 bg-[#FBFBF3] px-6 py-24 lg:border-r-dashed-figma"
            data-element="contact-form-wrapper"
          >
            <div className="max-w-lg mx-auto flex flex-col gap-12">
              {/* Header - Figma: gap 20px */}
              <div className="flex flex-col">
                <h2 className="text-2xl lg:text-[32px] font-display font-semibold text-[#2D3142] leading-tight mb-4">
                  Ready to free your teams from compliance admin?
                </h2>
                <p className="text-[#6B7280] leading-relaxed text-base">
                  Whether you're running compliance in-house or advising clients, Disrupt helps you spend less time on paperwork and more time on strategy, safety, and people.
                </p>
              </div>

              {/* Form */}
              <ContactForm />
            </div>
          </div>

          {/* Right side - Contact Info + Map - transparent to show grid/blob */}
          <div
            className="w-full lg:w-1/2 px-6 py-24"
            data-element="contact-info-wrapper"
          >
            <div className="max-w-xl mx-auto">
              <ContactInfo />
            </div>
          </div>
        </div>
      </div>
    </BlobSection>
  )
}
