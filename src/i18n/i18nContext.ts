import { createContext, useContext } from 'react'
import { I18nContextType } from './types'

export const I18nContext = createContext<I18nContextType | undefined>(undefined)

export function useI18n(): I18nContextType {
  const context = useContext(I18nContext)
  
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider')
  }
  
  return context
}

export function useTranslation() {
  const { t } = useI18n()
  return { t }
}
