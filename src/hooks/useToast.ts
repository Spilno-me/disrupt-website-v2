import { toast } from 'sonner'
import { UI_CONSTANTS } from '@/constants/appConstants'

export interface ToastOptions {
  title: string
  description?: string
  duration?: number
}

export function useToast() {
  const showSuccess = ({ title, description, duration = UI_CONSTANTS.TOAST_DURATION }: ToastOptions) => {
    toast.success(title, {
      description,
      duration,
    })
  }

  const showError = ({ title, description, duration = UI_CONSTANTS.TOAST_DURATION }: ToastOptions) => {
    toast.error(title, {
      description,
      duration,
    })
  }

  return {
    showSuccess,
    showError
  }
}
