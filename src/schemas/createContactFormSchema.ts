import * as z from 'zod'

export function createContactFormSchema(t: (key: string) => string) {
  return z.object({
    name: z.string().optional(),
    email: z.string()
      .min(1, t('contact.form.validation.emailRequired'))
      .email(t('contact.form.validation.emailInvalid')),
    company: z.string().min(1, t('contact.form.validation.companyRequired')),
    message: z.string().optional(),
    privacyPolicy: z.boolean().refine(val => val === true, {
      message: t('contact.form.validation.privacyRequired')
    })
  })
}

export type ContactFormData = z.infer<ReturnType<typeof createContactFormSchema>>

export const defaultFormValues = {
  name: "",
  email: "",
  company: "",
  message: "",
  privacyPolicy: false
}