import { LanguageInfo, SupportedLanguage } from './types'

// Translation fallback messages
export const TRANSLATION_FALLBACK_MESSAGES = {
  LOADING: 'Loading...',
  MISSING_PREFIX: '[Missing:',
  LOADING_PREFIX: '[Loading:',
  SUFFIX: ']'
} as const

// Language codes array for validation and browser detection
export const SUPPORTED_LANGUAGE_CODES: readonly SupportedLanguage[] = ['en', 'es', 'it', 'ar', 'fr'] as const

export const SUPPORTED_LANGUAGES: LanguageInfo[] = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    dir: 'ltr',
    flag: ''
  },
  {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    dir: 'ltr',
    flag: ''
  },
  {
    code: 'it',
    name: 'Italian',
    nativeName: 'Italiano',
    dir: 'ltr',
    flag: ''
  },
  {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    dir: 'rtl',
    flag: ''
  },
  {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    dir: 'ltr',
    flag: ''
  }
]

export const DEFAULT_LANGUAGE: SupportedLanguage = 'en'
export const LANGUAGE_STORAGE_KEY = 'disrupt-language'

// Contact form parsing constants
export const PRIVACY_POLICY_LINK_TEXT = 'Privacy Policy'