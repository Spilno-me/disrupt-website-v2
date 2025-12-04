import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@disrupt/design-system'
import { Input } from '@disrupt/design-system'
import { Textarea } from '@disrupt/design-system'
import { Checkbox } from '@disrupt/design-system'
import { ElectricInputWrapper } from '@disrupt/design-system'
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
        <FormItem className="w-full space-y-0">
          <div className="flex items-start gap-3">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
                className={`${FORM_CONSTANTS.CHECKBOX_SIZES.MOBILE} ${FORM_CONSTANTS.CHECKBOX_SIZES.DESKTOP} flex-shrink-0 mt-0.5`}
              />
            </FormControl>
            <div className="flex-1 min-h-[24px]">
              <FormLabel className="text-sm leading-tight cursor-pointer">
                <PrivacyPolicyLabel text={t('contact.form.labels.privacyPolicy')} />
              </FormLabel>
            </div>
          </div>
          <FormMessage className="ml-8" />
        </FormItem>
      )}
    />
  )
}
