import { ContactFormData } from '@/schemas/createContactFormSchema'
import { sendContactForm, EmailPayload } from '@/services/emailService'
import { UseFormReturn } from 'react-hook-form'
import { trackFormSubmission, trackEvent } from '@/utils/analytics'

interface UseContactFormSubmissionProps {
  form: UseFormReturn<ContactFormData>
  onSuccess?: () => void
  onError?: () => void
}

export function useContactFormSubmission({ form, onSuccess, onError }: UseContactFormSubmissionProps) {
  const handleSubmit = async (data: ContactFormData): Promise<void> => {
    try {
      const payload = createEmailPayload(data)
      await sendContactForm(payload)

      handleSubmissionSuccess(data)
      form.reset()
    } catch {
      handleSubmissionError()
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

    onSuccess?.()
  }

  const handleSubmissionError = (): void => {
    trackFormSubmission('contact_form', false)
    onError?.()
  }

  return { handleSubmit }
}
