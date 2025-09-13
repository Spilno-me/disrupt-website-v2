import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import {
  getNestedValue,
  createTranslationFunction,
  createLoadingTranslationFunction,
  detectBrowserLanguage
} from './utils'
import { TranslationKeys } from './types'
import { TRANSLATION_FALLBACK_MESSAGES, DEFAULT_LANGUAGE } from './constants'

const mockTranslations: TranslationKeys = {
  hero: {
    title: 'Welcome to Disrupt',
    description: 'Build the future'
  },
  features: {
    title: 'Features',
    cards: {
      hours: {
        title: 'Fast'
      }
    }
  }
}

describe('getNestedValue', () => {
  it('should return string value for valid nested key', () => {
    const result = getNestedValue(mockTranslations, 'hero.title')
    expect(result).toBe('Welcome to Disrupt')
  })

  it('should return string value for deeply nested key', () => {
    const result = getNestedValue(mockTranslations, 'features.cards.hours.title')
    expect(result).toBe('Fast')
  })

  it('should return null for missing key', () => {
    const result = getNestedValue(mockTranslations, 'nonexistent.key')
    expect(result).toBeNull()
  })

  it('should return null for partially missing nested key', () => {
    const result = getNestedValue(mockTranslations, 'hero.nonexistent.key')
    expect(result).toBeNull()
  })

  it('should handle empty object gracefully', () => {
    const result = getNestedValue({}, 'any.key')
    expect(result).toBeNull()
  })

  it('should return null for null values in path', () => {
    const objWithNull = { test: null }
    const result = getNestedValue(objWithNull as any, 'test.nested')
    expect(result).toBeNull()
  })
})

describe('createTranslationFunction', () => {
  it('should create function that returns correct translations', () => {
    const t = createTranslationFunction(mockTranslations)
    
    expect(t('hero.title')).toBe('Welcome to Disrupt')
    expect(t('features.title')).toBe('Features')
  })

  it('should return fallback message for missing keys', () => {
    const t = createTranslationFunction(mockTranslations)
    
    const result = t('nonexistent.key')
    expect(result).toBe('[Missing: nonexistent.key]')
  })

  it('should handle non-string return values from getNestedValue', () => {
    const invalidTranslations = { test: { nested: 123 } } as any
    const t = createTranslationFunction(invalidTranslations)
    
    const result = t('test.nested')
    expect(result).toBe('[Missing: test.nested]')
  })
})

describe('createLoadingTranslationFunction', () => {
  it('should create function that returns loading messages', () => {
    const t = createLoadingTranslationFunction()
    
    const result = t('any.key')
    expect(result).toBe('[Loading: any.key]')
  })

  it('should return loading message for any key', () => {
    const t = createLoadingTranslationFunction()
    
    expect(t('hero.title')).toBe('[Loading: hero.title]')
    expect(t('features.title')).toBe('[Loading: features.title]')
    expect(t('nonexistent.key')).toBe('[Loading: nonexistent.key]')
  })
})

describe('detectBrowserLanguage', () => {
  let originalWindow: any
  
  beforeEach(() => {
    originalWindow = global.window
  })
  
  afterEach(() => {
    global.window = originalWindow
  })

  it('should return exact language match', () => {
    Object.defineProperty(window, 'navigator', {
      value: { language: 'fr' },
      writable: true
    })
    
    const result = detectBrowserLanguage()
    expect(result).toBe('fr')
  })

  it('should return language prefix match when exact match not found', () => {
    Object.defineProperty(window, 'navigator', {
      value: { language: 'fr-FR' },
      writable: true
    })
    
    const result = detectBrowserLanguage()
    expect(result).toBe('fr')
  })

  it('should return default language for unsupported language', () => {
    Object.defineProperty(window, 'navigator', {
      value: { language: 'zh-CN' },
      writable: true
    })
    
    const result = detectBrowserLanguage()
    expect(result).toBe(DEFAULT_LANGUAGE)
  })

  it('should return default language for unsupported language prefix', () => {
    Object.defineProperty(window, 'navigator', {
      value: { language: 'zh' },
      writable: true
    })
    
    const result = detectBrowserLanguage()
    expect(result).toBe(DEFAULT_LANGUAGE)
  })

  it('should return default language in server environment', () => {
    // @ts-ignore - Simulate server environment
    global.window = undefined
    
    const result = detectBrowserLanguage()
    expect(result).toBe(DEFAULT_LANGUAGE)
  })
})