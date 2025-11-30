import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { ElectricInputWrapper } from '@/components/ui/ElectricInput'
import { Control } from 'react-hook-form'
import { ContactFormData } from '@/schemas/createContactFormSchema'
import { UI_CONSTANTS, FORM_CONSTANTS } from '@/constants/appConstants'
import { useTranslation } from '@/hooks/useI18n'
import { PrivacyPolicyLabel } from './PrivacyPolicyLabel'

interface ContactFormFieldsProps {
  control: Control<ContactFormData>
}

export function ContactFormFields({ control }: ContactFormFieldsProps) {
  return (
    <>
      <NameField control={control} />
      <EmailField control={control} />
      <CompanyField control={control} />
      <MessageField control={control} />
      <PrivacyPolicyField control={control} />
    </>
  )
}

function NameField({ control }: ContactFormFieldsProps) {
  const { t } = useTranslation()

  return (
    <FormField
      control={control}
      name="name"
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel className="text-sm font-medium text-foreground">
            {t('contact.form.labels.name')}
          </FormLabel>
          <FormControl>
            <ElectricInputWrapper>
              <Input
                placeholder={t('contact.form.labels.name')}
                className={`${FORM_CONSTANTS.INPUT_HEIGHTS.MOBILE} ${FORM_CONSTANTS.INPUT_HEIGHTS.DESKTOP} ${FORM_CONSTANTS.TEXT_SIZES.MOBILE}`}
                {...field}
              />
            </ElectricInputWrapper>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

function EmailField({ control }: ContactFormFieldsProps) {
  const { t } = useTranslation()

  return (
    <FormField
      control={control}
      name="email"
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel className="text-sm font-medium text-foreground">
            {t('contact.form.labels.email')}
          </FormLabel>
          <FormControl>
            <ElectricInputWrapper>
              <Input
                type="email"
                placeholder={t('contact.form.labels.email')}
                className={`${FORM_CONSTANTS.INPUT_HEIGHTS.MOBILE} ${FORM_CONSTANTS.INPUT_HEIGHTS.DESKTOP} ${FORM_CONSTANTS.TEXT_SIZES.MOBILE}`}
                {...field}
              />
            </ElectricInputWrapper>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

function CompanyField({ control }: ContactFormFieldsProps) {
  const { t } = useTranslation()

  return (
    <FormField
      control={control}
      name="company"
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel className="text-sm font-medium text-foreground">
            {t('contact.form.labels.company')}
          </FormLabel>
          <FormControl>
            <ElectricInputWrapper>
              <Input
                placeholder={t('contact.form.labels.company')}
                className={`${FORM_CONSTANTS.INPUT_HEIGHTS.MOBILE} ${FORM_CONSTANTS.INPUT_HEIGHTS.DESKTOP} ${FORM_CONSTANTS.TEXT_SIZES.MOBILE}`}
                {...field}
              />
            </ElectricInputWrapper>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

function MessageField({ control }: ContactFormFieldsProps) {
  const { t } = useTranslation()

  return (
    <FormField
      control={control}
      name="message"
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel className="text-sm font-medium text-foreground">
            {t('contact.form.labels.message')}
          </FormLabel>
          <FormControl>
            <ElectricInputWrapper>
              <Textarea
                placeholder={t('contact.form.labels.placeholder')}
                className={`${UI_CONSTANTS.TEXTAREA_MIN_HEIGHT} resize-none`}
                {...field}
              />
            </ElectricInputWrapper>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

function PrivacyPolicyField({ control }: ContactFormFieldsProps) {
  const { t } = useTranslation()

  return (
    <FormField
      control={control}
      name="privacyPolicy"
      render={({ field }) => (
        <FormItem className="flex items-center gap-3 w-full space-y-0">
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
              className={`${FORM_CONSTANTS.CHECKBOX_SIZES.MOBILE} ${FORM_CONSTANTS.CHECKBOX_SIZES.DESKTOP} flex-shrink-0`}
            />
          </FormControl>
          <div className="grid gap-1.5 leading-none">
            <FormLabel className="text-sm leading-tight cursor-pointer">
              <PrivacyPolicyLabel text={t('contact.form.labels.privacyPolicy')} />
            </FormLabel>
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  )
}
