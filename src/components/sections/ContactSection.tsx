import { ContactForm } from '@/components/forms/ContactForm'
import { ContactInfo } from './ContactInfo'

export function ContactSection() {
  return (
    <section id="contact" className="flex justify-center border-custom-dash-b" data-element="contact-section">
      <div className="flex flex-col w-full max-w-7xl" data-element="contact-main-wrapper">
        <div className="flex flex-col lg:flex-row lg:gap-20 gap-0" data-element="contact-wrapper">
          <div className="lg:w-1/2 w-full relative" data-element="contact-form-wrapper">
            <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-border to-transparent opacity-100 dashed-border-vertical" ></div>
            <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-border to-transparent opacity-100 dashed-border-vertical" ></div>
            <div className="absolute inset-x-0 bottom-0 h-px lg:hidden dashed-border-horizontal" ></div>
            <div className="contact-form-wrapper bg-background" data-element="contact-form-section">
              <ContactForm />
            </div>
          </div>
          
          <div className="lg:w-1/2 w-full relative" data-element="contact-info-wrapper">
            <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-border to-transparent opacity-100 dashed-border-vertical" ></div>
            <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-border to-transparent opacity-100 dashed-border-vertical" ></div>
            <div className="absolute inset-x-0 top-0 h-px lg:hidden dashed-border-horizontal" ></div>
            <div className="contact-info-wrapper" data-element="contact-info-section">
              <ContactInfo />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
