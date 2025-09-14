import { TranslationKeys, SupportedLanguage } from './types'
import { TRANSLATION_FALLBACK_MESSAGES, SUPPORTED_LANGUAGE_CODES, DEFAULT_LANGUAGE } from './constants'

type TranslationValue = string | Record<string, unknown>

export function getNestedValue<T extends Record<string, unknown>>(
  obj: T,
  path: string
): TranslationValue | null {
  return path.split('.').reduce<TranslationValue | null>((current: TranslationValue | null, key: string): TranslationValue | null => {
    if (current === null) {
      return null
    }
    if (isValidTranslationContainer(current) && key in current) {
      return current[key] as TranslationValue | null
    }
    return null
  }, obj as TranslationValue)
}

function isValidTranslationContainer(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object'
}

function createMissingTranslationMessage(key: string): string {
  return `${TRANSLATION_FALLBACK_MESSAGES.MISSING_PREFIX} ${key}${TRANSLATION_FALLBACK_MESSAGES.SUFFIX}`
}

function createLoadingTranslationMessage(key: string): string {
  return `${TRANSLATION_FALLBACK_MESSAGES.LOADING_PREFIX} ${key}${TRANSLATION_FALLBACK_MESSAGES.SUFFIX}`
}

export function createTranslationFunction(translations: TranslationKeys) {
  return function translate(key: string): string {
    const value = getNestedValue(translations, key)
    
    if (value !== null && typeof value === 'string') {
      return value
    }
    
    console.warn(`Translation missing for key: ${key}`)
    return createMissingTranslationMessage(key)
  }
}

export function createLoadingTranslationFunction() {
  return function translateLoading(key: string): string {
    return createLoadingTranslationMessage(key)
  }
}

export function detectBrowserLanguage(): SupportedLanguage {
  if (typeof window === 'undefined') {
    return DEFAULT_LANGUAGE
  }
  
  const browserLanguage = navigator.language.toLowerCase()
  
  const exactMatch = findExactLanguageMatch(browserLanguage)
  if (exactMatch) {
    return exactMatch
  }
  
  const prefixMatch = findLanguagePrefixMatch(browserLanguage)
  if (prefixMatch) {
    return prefixMatch
  }
  
  return DEFAULT_LANGUAGE
}

function findExactLanguageMatch(browserLanguage: string): SupportedLanguage | null {
  return SUPPORTED_LANGUAGE_CODES.find(code => code === browserLanguage) || null
}

function findLanguagePrefixMatch(browserLanguage: string): SupportedLanguage | null {
  const languagePrefix = extractLanguagePrefix(browserLanguage)
  return SUPPORTED_LANGUAGE_CODES.find(code => code === languagePrefix) || null
}

function extractLanguagePrefix(browserLanguage: string): string {
  return browserLanguage.split('-')[0]
}