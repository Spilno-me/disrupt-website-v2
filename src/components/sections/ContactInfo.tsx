import { COMPANY_INFO } from '@/constants/appConstants'
import { LinkedInButton, MapWithMarkers } from '@adrozdenko/design-system'

export function ContactInfo() {
  const emailHref = `mailto:${COMPANY_INFO.EMAIL}`

  return (
    <div className="flex flex-col gap-6" data-element="contact-info-content">
      {/* Email Section */}
      <div className="flex flex-col gap-6" data-element="contact-info-details">
        {/* Email us header */}
        <div className="flex flex-col gap-3">
          <h3 className="text-xl font-sans font-bold text-dark">
            Email us
          </h3>
          <p className="text-muted text-base">
            Reach out, and let's create something amazing.
          </p>
        </div>

        {/* Contact email */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-bold text-dark">Contact</span>
          <a
            href={emailHref}
            className="text-dark font-medium text-base underline underline-offset-4 transition-colors hover:text-teal"
          >
            {COMPANY_INFO.EMAIL}
          </a>
        </div>
      </div>

      {/* Dashed separator */}
      <div className="separator-dashed" />

      {/* Follow Us Section - inline layout */}
      <div className="flex items-center gap-4">
        <h3 className="text-xl font-sans font-bold text-dark">
          Follow us
        </h3>
        <LinkedInButton href="https://linkedin.com/company/disrupt-software" />
      </div>

      {/* Map with location markers */}
      <MapWithMarkers />
    </div>
  )
}
