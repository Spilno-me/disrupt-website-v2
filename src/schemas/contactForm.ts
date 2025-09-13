import * as z from 'zod'

export const contactFormSchema = z.object({
  name: z.string().optional(),
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  company: z.string().min(1, "Company is required"),
  message: z.string().optional(),
  privacyPolicy: z.boolean().refine(val => val === true, {
    message: "You must agree to our Privacy Policy"
  })
})

export type ContactFormData = z.infer<typeof contactFormSchema>

export const defaultFormValues: ContactFormData = {
  name: "",
  email: "",
  company: "",
  message: "",
  privacyPolicy: false
}
