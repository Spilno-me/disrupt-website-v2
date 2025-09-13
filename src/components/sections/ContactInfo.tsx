import { Linkedin } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { COMPANY_INFO } from '@/constants/appConstants'
import { useTranslation } from '@/hooks/useI18n'
import { useState } from 'react'

export function ContactInfo() {
  const { t } = useTranslation()
  const emailSubject = encodeURIComponent(t('contact.info.emailSubject'))
  const emailHref = `mailto:${COMPANY_INFO.EMAIL}?subject=${emailSubject}`
  const [tooltipOpen, setTooltipOpen] = useState(false)

  return (
    <div className="flex flex-col gap-8 max-w-md mx-auto" data-element="contact-info-content">
      <div className="flex flex-col gap-6" data-element="contact-info-details">
        <div className="flex flex-col gap-3" data-element="contact-info-header">
          <h2 className="text-2xl font-display font-bold leading-8 text-foreground tracking-wide">
            {t('contact.info.title')}
          </h2>
          <p className="text-base text-muted-foreground leading-6">
            {t('contact.info.subtitle')}
          </p>
        </div>
        
        <div className="flex justify-center gap-6" data-element="contact-email-wrapper">
          <div className="flex flex-col gap-2 w-full" data-element="contact-email-info">
            <a
              href={emailHref}
              className="text-base text-muted-foreground leading-6 underline hover:no-underline"
              onClick={() => trackButtonClick('email_contact', 'contact_info')}
            >
              {COMPANY_INFO.EMAIL}
            </a>
          </div>
        </div>
      </div>
      
      <Separator data-element="contact-separator" />
      
      <div className="flex items-center justify-between" data-element="contact-social">
        <h3 className="text-base font-mono font-semibold leading-6 text-foreground">
          {t('contact.info.followLabel')}
        </h3>
        <div className="w-24 h-24 border-2 border-dashed border-blue-800 rounded-full flex items-center justify-center">
          <Tooltip open={tooltipOpen} onOpenChange={setTooltipOpen}>
            <TooltipTrigger asChild>
              <button
                className="w-20 h-20 bg-transparent border border-blue-600 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors cursor-pointer group"
                onClick={() => setTooltipOpen(!tooltipOpen)}
                onMouseEnter={() => {
                  // Only show on hover for devices with hover capability (desktop)
                  const hasHover = window.matchMedia('(hover: hover)').matches
                  if (hasHover) setTooltipOpen(true)
                }}
                onMouseLeave={() => {
                  // Only hide on mouse leave for devices with hover capability (desktop)
                  const hasHover = window.matchMedia('(hover: hover)').matches
                  if (hasHover) setTooltipOpen(false)
                }}
              >
                <Linkedin className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t('contact.info.comingSoon')}</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </div>
  )
}
