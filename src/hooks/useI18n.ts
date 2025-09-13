import { useI18nStore } from '@/stores/i18nStore'
import type { I18nContextType } from '@/i18n/types'
import { createTranslationFunction, createLoadingTranslationFunction } from '@/i18n/utils'

/**
 * Hook to access i18n functionality using Zustand store
 * Provides the same interface as the previous React Context implementation
 */
export function useI18n(): I18nContextType {
  const store = useI18nStore()
  
  return {
    currentLanguage: store.currentLanguage,
    setLanguage: store.setLanguage,
    t: store.t,
    isRTL: store.isRTL,
    languages: store.languages
  }
}

/**
 * Convenience hook for just the translation function
 */
export function useTranslation() {
  const translations = useI18nStore(state => state.translations)
  const isLoading = useI18nStore(state => state.isLoading)
  
  const t = (key: string) => {
    if (translations) {
      return createTranslationFunction(translations)(key)
    } else {
      return createLoadingTranslationFunction()(key)
    }
  }
  
  return { t }
}