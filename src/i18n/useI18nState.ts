import { useState, useEffect } from 'react'
import { I18nContextType, SupportedLanguage, TranslationKeys } from './types'
import { SUPPORTED_LANGUAGES } from './constants'
import { createTranslationFunction, createLoadingTranslationFunction, detectBrowserLanguage } from './utils'
import { retrieveStoredLanguage, persistLanguagePreference } from './storage'
import { updateDocumentLanguageAttributes } from './dom'
import { loadTranslations } from './translations'

interface I18nState {
  isLoading: boolean
  contextValue: I18nContextType
}

export function useI18nState(): I18nState {
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>('en')
  const [translations, setTranslations] = useState<TranslationKeys | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    initializeLanguageAndTranslations()
  }, [])

  useEffect(() => {
    if (!isLoading && currentLanguage) {
      loadTranslationsForLanguage(currentLanguage)
    }
  }, [currentLanguage, isLoading])

  useEffect(() => {
    updateDocumentLanguageAttributes(currentLanguage)
  }, [currentLanguage])

  const initializeLanguageAndTranslations = async (): Promise<void> => {
    try {
      const initialLanguage = determineInitialLanguage()
      setCurrentLanguage(initialLanguage)
      
      await loadTranslationsForLanguage(initialLanguage)
    } catch (error) {
      await handleInitializationError(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInitializationError = async (error: unknown): Promise<void> => {
    console.error('Failed to initialize translations:', error)
    
    try {
      const fallbackResult = await loadTranslations('en')
      if (fallbackResult?.translations) {
        setTranslations(fallbackResult.translations)
      }
    } catch (fallbackError) {
      console.error('Failed to load fallback translations:', fallbackError)
    }
  }

  const determineInitialLanguage = (): SupportedLanguage => {
    const storageResult = retrieveStoredLanguage()
    
    if (storageResult?.source === 'stored') {
      return storageResult.language
    }
    
    return detectBrowserLanguage()
  }

  const loadTranslationsForLanguage = async (language: SupportedLanguage): Promise<void> => {
    if (!language) {
      console.error('No language provided for translation loading')
      return
    }
    
    try {
      const result = await loadTranslations(language)
      if (result?.translations) {
        setTranslations(result.translations)
        console.log(`Successfully loaded translations for ${language}`)
      } else {
        console.error(`No translations returned for ${language}`)
      }
    } catch (error) {
      console.error(`Failed to load translations for ${language}:`, error)
      throw error
    }
  }

  const changeLanguage = (language: SupportedLanguage): void => {
    setCurrentLanguage(language)
    persistLanguagePreference(language)
  }

  const contextValue = createContextValue(currentLanguage, changeLanguage, translations)

  return {
    isLoading,
    contextValue
  }
}

function createContextValue(
  currentLanguage: SupportedLanguage,
  changeLanguage: (language: SupportedLanguage) => void,
  translations: TranslationKeys | null
): I18nContextType {
  const currentLangInfo = SUPPORTED_LANGUAGES.find(lang => lang.code === currentLanguage)
  const isRTL = currentLangInfo?.dir === 'rtl' || false
  const t = translations 
    ? createTranslationFunction(translations) 
    : createLoadingTranslationFunction()

  return {
    currentLanguage,
    setLanguage: changeLanguage,
    t,
    isRTL,
    languages: SUPPORTED_LANGUAGES
  }
}
