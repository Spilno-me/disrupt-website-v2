import { Button } from '@/components/ui/button'
import { ElectricButtonWrapper } from '@/components/ui/ElectricInput'
import { useTranslation } from '@/hooks/useI18n'
import { FORM_CONSTANTS } from '@/constants/appConstants'

interface ContactFormSubmitButtonProps {
  isSubmitting: boolean
}

export function ContactFormSubmitButton({ isSubmitting }: ContactFormSubmitButtonProps) {
  const { t } = useTranslation()
  
  const buttonText = getButtonText(isSubmitting, t)
  const buttonClasses = buildButtonClasses()

  return (
    <ElectricButtonWrapper className="w-full">
      <Button
        type="submit"
        className={buttonClasses}
        disabled={isSubmitting}
      >
        {buttonText}
      </Button>
    </ElectricButtonWrapper>
  )
}

function getButtonText(isSubmitting: boolean, t: (key: string) => string): string {
  return isSubmitting 
    ? t('contact.form.button.submitting') 
    : t('contact.form.button.submit')
}

function buildButtonClasses(): string {
  return [
    'w-full',
    FORM_CONSTANTS.INPUT_HEIGHTS.MOBILE,
    FORM_CONSTANTS.INPUT_HEIGHTS.DESKTOP,
    `bg-[${FORM_CONSTANTS.BUTTON_COLORS.MOBILE_SUBMIT}]`,
    'text-white',
    `sm:bg-[${FORM_CONSTANTS.BUTTON_COLORS.DESKTOP_SUBMIT}]`,
    'rounded-lg',
    'cursor-pointer',
    FORM_CONSTANTS.TEXT_SIZES.MOBILE,
    FORM_CONSTANTS.TEXT_SIZES.DESKTOP,
    'font-medium',
    'contact-form-submit'
  ].join(' ')
}
