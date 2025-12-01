import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import {
  getNestedValue,
  createTranslationFunction,
  createLoadingTranslationFunction,
  detectBrowserLanguage
} from './utils'
import { TranslationKeys } from './types'
import { DEFAULT_LANGUAGE } from './constants'

const mockTranslations: TranslationKeys = {
  hero: {
    title: 'Welcome to Disrupt',
    description: 'Build the future'
  },
  features: {
    title: 'Features',
    subtitle: 'Test features',
    cards: {
      hours: {
        title: 'Fast',
        description: 'Save hours'
      },
      costs: {
        title: 'Costs',
        description: 'Save costs'
      },
      automation: {
        title: 'Automation',
        description: 'Automate tasks'
      }
    }
  },
  contact: {
    form: {
      title: 'Contact',
      subtitle: 'Get in touch',
      labels: {
        name: 'Name',
        email: 'Email',
        company: 'Company',
        message: 'Message',
        placeholder: 'Placeholder',
        privacyPolicy: 'Privacy Policy'
      },
      button: {
        submit: 'Submit',
        submitting: 'Submitting'
      },
      validation: {
        emailRequired: 'Email required',
        emailInvalid: 'Email invalid',
        companyRequired: 'Company required',
        privacyRequired: 'Privacy required'
      },
      messages: {
        successTitle: 'Success',
        successDescription: 'Message sent',
        errorTitle: 'Error',
        errorFallback: 'Try again'
      },
      modal: {
        title: 'Thanks!',
        description: 'Message on its way.',
        button: 'Got it'
      },
      errorModal: {
        title: 'Oops!',
        description: 'Something went wrong.',
        retryButton: 'Retry',
        closeButton: 'Close'
      }
    },
    info: {
      title: 'Contact Info',
      subtitle: 'Get in touch',
      contactLabel: 'Contact',
      followLabel: 'Follow',
      comingSoon: 'Coming Soon',
      emailSubject: 'Contact'
    }
  },
  header: {
    logo: 'Logo',
    bookCall: 'Book Call'
  },
  footer: {
    company: 'Company',
    description: 'Description',
    legal: {
      privacy: 'Privacy',
      terms: 'Terms'
    },
    copyright: 'Copyright'
  },
  legal: {
    privacy: {
      title: 'Privacy',
      lastUpdated: 'Updated',
      sections: {
        intro: 'Introduction',
        whoWeAre: {
          title: 'Who We Are',
          content: 'Content'
        },
        scope: {
          title: 'Scope',
          intro: 'Introduction',
          applies: ['Visitors'],
          processor: 'Processor'
        },
        dataCollected: {
          title: 'Data',
          intro: 'Introduction',
          types: ['Email']
        }
      }
    },
    terms: {
      title: 'Terms',
      lastUpdated: 'Updated'
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
    originalWindow = globalThis.window
  })

  afterEach(() => {
    globalThis.window = originalWindow
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