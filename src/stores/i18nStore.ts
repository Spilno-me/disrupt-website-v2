import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { SupportedLanguage, TranslationKeys, LanguageInfo } from '@/i18n/types'
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE, LANGUAGE_STORAGE_KEY } from '@/i18n/constants'
import { createTranslationFunction, createLoadingTranslationFunction, detectBrowserLanguage } from '@/i18n/utils'

interface I18nState {
  // State
  currentLanguage: SupportedLanguage
  translations: TranslationKeys | null
  isLoading: boolean
  
  // Computed values
  languages: LanguageInfo[]
  isRTL: boolean
  t: (key: string) => string
  
  // Actions
  setLanguage: (language: SupportedLanguage) => Promise<void>
  initializeI18n: () => Promise<void>
  loadTranslations: (language: SupportedLanguage) => Promise<void>
}

// Static imports for all translation files
import enTranslations from '../i18n/locales/en.json'
import esTranslations from '../i18n/locales/es.json'
import itTranslations from '../i18n/locales/it.json'
import arTranslations from '../i18n/locales/ar.json'
import frTranslations from '../i18n/locales/fr.json'

// Map of language codes to translation objects
const translationMap: Record<SupportedLanguage, TranslationKeys> = {
  en: enTranslations,
  es: esTranslations,
  it: itTranslations,
  ar: arTranslations,
  fr: frTranslations
}

// Simplified import function using static imports
const importTranslations = async (language: SupportedLanguage): Promise<TranslationKeys> => {
  const translations = translationMap[language]
  if (translations) {
    return translations
  } else {
    console.warn(`No translations found for ${language}, using English fallback`)
    return translationMap.en
  }
}

// Update document attributes for language and direction
const updateDocumentAttributes = (language: SupportedLanguage) => {
  const langInfo = SUPPORTED_LANGUAGES.find(lang => lang.code === language)
  if (langInfo) {
    document.documentElement.lang = language
    document.documentElement.dir = langInfo.dir
  }
}

export const useI18nStore = create<I18nState>()(
  persist(
    (set, get) => ({
      // Initial state
      currentLanguage: DEFAULT_LANGUAGE,
      translations: null,
      isLoading: true,
      languages: SUPPORTED_LANGUAGES,
      
      // Computed values
      get isRTL() {
        const { currentLanguage } = get()
        const langInfo = SUPPORTED_LANGUAGES.find(lang => lang.code === currentLanguage)
        return langInfo?.dir === 'rtl' || false
      },
      
      t: (key: string) => {
        const state = get()
        if (state.translations) {
          return createTranslationFunction(state.translations)(key)
        } else {
          return createLoadingTranslationFunction()(key)
        }
      },
      
      // Actions
      initializeI18n: async () => {
        const state = get()
        
        try {
          // Determine initial language (persisted language or browser detection)
          let initialLanguage = state.currentLanguage
          
          // If current language is still the default, detect from browser
          if (initialLanguage === DEFAULT_LANGUAGE) {
            initialLanguage = detectBrowserLanguage()
          }
          
          set({ currentLanguage: initialLanguage })
          
          // Load translations for the initial language
          await get().loadTranslations(initialLanguage)
          
        } catch (error) {
          console.error('Failed to initialize i18n:', error)
          // Try to fall back to English as last resort
          try {
            await get().loadTranslations('en')
            set({ currentLanguage: 'en' })
          } catch (fallbackError) {
            console.error('Even fallback to English failed:', fallbackError)
          }
        } finally {
          set({ isLoading: false })
        }
      },
      
      loadTranslations: async (language: SupportedLanguage) => {
        try {
          const translations = await importTranslations(language)
          set({ translations })
          updateDocumentAttributes(language)
        } catch (error) {
          console.error(`Failed to load translations for ${language}:`, error)
          throw error
        }
      },
      
      setLanguage: async (language: SupportedLanguage) => {
        const { loadTranslations } = get()
        
        try {
          set({ currentLanguage: language })
          await loadTranslations(language)
        } catch (error) {
          console.error(`Failed to set language to ${language}:`, error)
        }
      }
    }),
    {
      name: LANGUAGE_STORAGE_KEY,
      partialize: (state) => ({ currentLanguage: state.currentLanguage }),
      version: 1
    }
  )
)

// Initialize the store when module loads
useI18nStore.getState().initializeI18n().catch(error => {
  console.error('Failed to initialize i18n store:', error)
})

// Convenience hooks
export const useCurrentLanguage = () => useI18nStore(state => state.currentLanguage)
export const useTranslations = () => useI18nStore(state => state.t)
export const useIsRTL = () => useI18nStore(state => state.isRTL)
export const useLanguages = () => useI18nStore(state => state.languages)
export const useI18nLoading = () => useI18nStore(state => state.isLoading)