import { useTranslation } from '@/hooks/useI18n'

export function ContactFormHeader() {
  const { t } = useTranslation()
  
  return (
    <div className="flex flex-col gap-4 max-w-xl" data-element="contact-form-header">
      <h2 className="text-2xl font-display font-bold leading-8 text-foreground tracking-wide">
        {t('contact.form.title')}
      </h2>
      <p className="text-base text-muted-foreground leading-6">
        {t('contact.form.subtitle')}
      </p>
    </div>
  )
}
