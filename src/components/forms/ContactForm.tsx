import { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form'
import { createContactFormSchema, ContactFormData, defaultFormValues } from '@/schemas/createContactFormSchema'
import { useTranslation } from '@/hooks/useI18n'
import { useContactFormSubmission } from '@/hooks/useContactFormSubmission'
import { ContactFormFields } from './ContactFormFields'
import { ContactFormSuccessModal } from './ContactFormSuccessModal'
import { ContactFormErrorModal } from './ContactFormErrorModal'
import { Button } from '@/components/ui/button'
import { ElectricButtonWrapper } from '@/components/ui/ElectricInput'

export function ContactForm() {
  const { t } = useTranslation()
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [showErrorModal, setShowErrorModal] = useState(false)
  const lastSubmittedData = useRef<ContactFormData | null>(null)
  const contactFormSchema = createContactFormSchema(t)

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: defaultFormValues
  })

  const { handleSubmit } = useContactFormSubmission({
    form,
    onSuccess: () => setShowSuccessModal(true),
    onError: () => setShowErrorModal(true)
  })

  const onSubmit = (data: ContactFormData) => {
    lastSubmittedData.current = data
    return handleSubmit(data)
  }

  const handleRetry = () => {
    if (lastSubmittedData.current) {
      handleSubmit(lastSubmittedData.current)
    }
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
          data-element="contact-form"
        >
          <ContactFormFields control={form.control} />

          <div className="flex justify-end sm:justify-start">
            <ElectricButtonWrapper>
              <Button
                type="submit"
                variant="contact"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? 'Sending...' : 'Book a Demo'}
              </Button>
            </ElectricButtonWrapper>
          </div>
        </form>
      </Form>

      <ContactFormSuccessModal
        open={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />

      <ContactFormErrorModal
        open={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        onRetry={handleRetry}
      />
    </>
  )
}
