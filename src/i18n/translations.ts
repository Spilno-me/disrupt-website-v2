import { TranslationKeys, SupportedLanguage } from './types'
import { DEFAULT_LANGUAGE } from './constants'

export interface TranslationLoadResult {
  translations: TranslationKeys
  loadedLanguage: SupportedLanguage
  wasSuccessful: boolean
}

export async function loadTranslations(language: SupportedLanguage): Promise<TranslationLoadResult> {
  try {
    const translations = await importTranslationsForLanguage(language)
    return {
      translations,
      loadedLanguage: language,
      wasSuccessful: true
    }
  } catch (error) {
    console.warn(`Failed to load translations for ${language}, falling back to ${DEFAULT_LANGUAGE}`, error)
    return await loadFallbackTranslations()
  }
}

async function importTranslationsForLanguage(language: SupportedLanguage): Promise<TranslationKeys> {
  const module = await import(`./locales/${language}.json`)
  return module.default || module
}

async function loadFallbackTranslations(): Promise<TranslationLoadResult> {
  try {
    const translations = await importTranslationsForLanguage(DEFAULT_LANGUAGE)
    return {
      translations,
      loadedLanguage: DEFAULT_LANGUAGE,
      wasSuccessful: false
    }
  } catch (fallbackError) {
    console.error('Failed to load fallback translations. This is a critical error.', fallbackError)
    throw new Error('Unable to load any translations')
  }
}
