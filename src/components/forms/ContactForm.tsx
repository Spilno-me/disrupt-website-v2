import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form'
import { createContactFormSchema, ContactFormData, defaultFormValues } from '@/schemas/createContactFormSchema'
import { useTranslation } from '@/hooks/useI18n'
import { useContactFormSubmission } from '@/hooks/useContactFormSubmission'
import { FORM_CONSTANTS } from '@/constants/appConstants'
import { ContactFormHeader } from './ContactFormHeader'
import { ContactFormFields } from './ContactFormFields'
import { ContactFormSubmitButton } from './ContactFormSubmitButton'

export function ContactForm() {
  const { t } = useTranslation()
  const contactFormSchema = createContactFormSchema(t)

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: defaultFormValues
  })

  const { handleSubmit } = useContactFormSubmission({ form })

  return (
    <div className="flex flex-col gap-12 max-w-md mx-auto" data-element="contact-form-content">
      <ContactFormHeader />
      
      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(handleSubmit)} 
          className={`flex flex-col items-center ${FORM_CONSTANTS.FIELD_GAPS.MOBILE} ${FORM_CONSTANTS.FIELD_GAPS.DESKTOP}`}
          data-element="contact-form"
        >
          <ContactFormFields control={form.control} />
          <ContactFormSubmitButton isSubmitting={form.formState.isSubmitting} />
        </form>
      </Form>
    </div>
  )
}
