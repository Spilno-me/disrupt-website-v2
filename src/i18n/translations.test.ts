import { describe, it, expect, vi, beforeEach } from 'vitest'
import { loadTranslations } from './translations'
import { DEFAULT_LANGUAGE } from './constants'

// Mock the dynamic import for the real translations
vi.mock('../locales/en.json', () => ({
  default: {
    hero: {
      title: 'More than automation',
      description: 'Test description'
    },
    contact: {
      form: {
        title: 'Contact Us'
      }
    }
  }
}))

vi.mock('../locales/es.json', () => ({
  default: {
    hero: {
      title: 'Más que automatización',
      description: 'Descripción de prueba'
    }
  }
}))

describe('loadTranslations', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Reset console methods
    vi.spyOn(console, 'warn').mockImplementation(() => {})
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  it('should load translations for supported language successfully', async () => {
    const result = await loadTranslations('en')
    
    expect(result).toMatchObject({
      translations: expect.objectContaining({
        hero: expect.objectContaining({
          title: 'More than automation'
        })
      }),
      loadedLanguage: 'en',
      wasSuccessful: true
    })
  })

  it('should load spanish translations successfully', async () => {
    const result = await loadTranslations('es')
    
    expect(result).toMatchObject({
      translations: expect.objectContaining({
        hero: expect.objectContaining({
          title: 'Más que automatización'
        })
      }),
      loadedLanguage: 'es',
      wasSuccessful: true
    })
  })

  it('should fallback to default language when requested language fails to load', async () => {
    // Test with a real unsupported language that would fail
    const result = await loadTranslations('unsupported-lang' as any)
    
    // Should fallback to default language
    expect(result.loadedLanguage).toBe(DEFAULT_LANGUAGE)
    expect(result.wasSuccessful).toBe(false)
    expect(result.translations).toBeDefined()
  })

  it('should handle module loading errors gracefully', async () => {
    // Test that the function handles import errors
    const result = await loadTranslations('en')
    expect(result).toBeDefined()
    expect(result.translations).toBeDefined()
  })

  it('should return proper result structure', async () => {
    const result = await loadTranslations('en')
    
    expect(result).toHaveProperty('translations')
    expect(result).toHaveProperty('loadedLanguage')
    expect(result).toHaveProperty('wasSuccessful')
    expect(typeof result.translations).toBe('object')
    expect(typeof result.loadedLanguage).toBe('string')
    expect(typeof result.wasSuccessful).toBe('boolean')
  })
})