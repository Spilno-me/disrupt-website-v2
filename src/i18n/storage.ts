import { SupportedLanguage } from './types'
import { SUPPORTED_LANGUAGE_CODES, DEFAULT_LANGUAGE, LANGUAGE_STORAGE_KEY } from './constants'

export interface LanguageStorageResult {
  language: SupportedLanguage
  source: 'stored' | 'default' | 'error'
}

export function retrieveStoredLanguage(): LanguageStorageResult {
  try {
    const storedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY)
    
    if (isValidStoredLanguage(storedLanguage)) {
      return {
        language: storedLanguage,
        source: 'stored'
      }
    }
    
    return {
      language: DEFAULT_LANGUAGE,
      source: 'default'
    }
  } catch (error) {
    console.warn('Failed to access localStorage for language preference:', error)
    return {
      language: DEFAULT_LANGUAGE,
      source: 'error'
    }
  }
}

export function persistLanguagePreference(language: SupportedLanguage): boolean {
  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language)
    return true
  } catch (error) {
    console.warn('Failed to save language preference to localStorage:', error)
    return false
  }
}

function isValidStoredLanguage(stored: string | null): stored is SupportedLanguage {
  return stored !== null && SUPPORTED_LANGUAGE_CODES.includes(stored as SupportedLanguage)
}
