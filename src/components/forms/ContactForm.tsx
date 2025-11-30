import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form'
import { createContactFormSchema, ContactFormData, defaultFormValues } from '@/schemas/createContactFormSchema'
import { useTranslation } from '@/hooks/useI18n'
import { useContactFormSubmission } from '@/hooks/useContactFormSubmission'
import { ContactFormFields } from './ContactFormFields'
import { Button } from '@/components/ui/button'

export function ContactForm() {
  const { t } = useTranslation()
  const contactFormSchema = createContactFormSchema(t)

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: defaultFormValues
  })

  const { handleSubmit } = useContactFormSubmission({ form })

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-6"
        data-element="contact-form"
      >
        <ContactFormFields control={form.control} />

        <Button
          type="submit"
          className="w-full h-9 bg-[#2D3142] text-white hover:bg-[#2D3142]/90 rounded-[12px] py-2 text-sm font-medium"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? 'Sending...' : 'Book a Demo'}
        </Button>
      </form>
    </Form>
  )
}
