import { SupportedLanguage } from './types'
import { SUPPORTED_LANGUAGES } from './constants'

export function updateDocumentLanguageAttributes(language: SupportedLanguage): void {
  const languageInfo = findLanguageInfo(language)
  
  if (languageInfo) {
    setDocumentDirection(languageInfo.dir)
    setDocumentLanguage(language)
  }
}

function findLanguageInfo(language: SupportedLanguage) {
  return SUPPORTED_LANGUAGES.find(lang => lang.code === language)
}

function setDocumentDirection(direction: 'ltr' | 'rtl'): void {
  document.documentElement.dir = direction
}

function setDocumentLanguage(language: SupportedLanguage): void {
  document.documentElement.lang = language
}
