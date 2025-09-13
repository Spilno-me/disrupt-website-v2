import { ContactFormData } from '@/schemas/createContactFormSchema'
import { sendContactForm, EmailPayload } from '@/services/emailService'
import { useToast } from '@/hooks/useToast'
import { useTranslation } from '@/hooks/useI18n'
import { UseFormReturn } from 'react-hook-form'
import { trackFormSubmission, trackEvent } from '@/utils/analytics'

interface UseContactFormSubmissionProps {
  form: UseFormReturn<ContactFormData>
}

export function useContactFormSubmission({ form }: UseContactFormSubmissionProps) {
  const { t } = useTranslation()
  const { showSuccess, showError } = useToast()

  const handleSubmit = async (data: ContactFormData): Promise<void> => {
    try {
      const payload = createEmailPayload(data)
      await sendContactForm(payload)

      handleSubmissionSuccess(data)
      form.reset()
    } catch (error) {
      handleSubmissionError(error)
    }
  }

  const createEmailPayload = (data: ContactFormData): EmailPayload => ({
    name: data.name,
    email: data.email,
    company: data.company,
    message: data.message,
  })

  const handleSubmissionSuccess = (data: ContactFormData): void => {
    // Track successful lead generation - this is the key business metric
    trackEvent('lead_generated', {
      source: 'contact_form',
      has_company: !!data.company
    })

    showSuccess({
      title: t('contact.form.messages.successTitle'),
      description: t('contact.form.messages.successDescription')
    })
  }

  const handleSubmissionError = (error: unknown): void => {
    trackFormSubmission('contact_form', false)

    const description = error instanceof Error
      ? error.message
      : t('contact.form.messages.errorFallback')

    showError({
      title: t('contact.form.messages.errorTitle'),
      description
    })
  }

  return { handleSubmit }
}
