import { Button } from '@adrozdenko/design-system'
import { useTranslation } from '@/hooks/useI18n'

interface ContactFormSubmitButtonProps {
  isSubmitting: boolean
}

export function ContactFormSubmitButton({ isSubmitting }: ContactFormSubmitButtonProps) {
  const { t } = useTranslation()

  const buttonText = isSubmitting
    ? t('contact.form.button.submitting')
    : t('contact.form.button.submit')

  return (
    <Button
      type="submit"
      variant="accent"
      size="lg"
      fullWidth
      disabled={isSubmitting}
      effectActive
    >
      {buttonText}
    </Button>
  )
}
