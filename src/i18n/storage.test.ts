import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { retrieveStoredLanguage, persistLanguagePreference } from './storage'
import { DEFAULT_LANGUAGE, LANGUAGE_STORAGE_KEY } from './constants'

// Mock localStorage
const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn()
}

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage
})

describe('retrieveStoredLanguage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should return stored language when available', () => {
    ;(window.localStorage.getItem as any).mockReturnValue('es')
    
    const result = retrieveStoredLanguage()
    
    expect(result).toEqual({
      language: 'es',
      source: 'stored'
    })
    expect(window.localStorage.getItem).toHaveBeenCalledWith(LANGUAGE_STORAGE_KEY)
  })

  it('should return default when no stored preference', () => {
    ;(window.localStorage.getItem as any).mockReturnValue(null)
    
    const result = retrieveStoredLanguage()
    
    expect(result).toEqual({
      language: DEFAULT_LANGUAGE,
      source: 'default'
    })
  })

  it('should return error fallback when localStorage throws error', () => {
    ;(window.localStorage.getItem as any).mockImplementation(() => {
      throw new Error('localStorage unavailable')
    })
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    
    const result = retrieveStoredLanguage()
    
    expect(result).toEqual({
      language: DEFAULT_LANGUAGE,
      source: 'error'
    })
    expect(consoleSpy).toHaveBeenCalledWith(
      'Failed to access localStorage for language preference:',
      expect.any(Error)
    )
    
    consoleSpy.mockRestore()
  })

  it('should handle unsupported stored language gracefully', () => {
    ;(window.localStorage.getItem as any).mockReturnValue('unsupported')
    
    const result = retrieveStoredLanguage()
    
    expect(result).toEqual({
      language: DEFAULT_LANGUAGE,
      source: 'default'
    })
  })
})

describe('persistLanguagePreference', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should save language preference successfully', () => {
    ;(window.localStorage.setItem as any).mockImplementation(() => {})
    
    const result = persistLanguagePreference('fr')
    
    expect(result).toBe(true)
    expect(window.localStorage.setItem).toHaveBeenCalledWith(LANGUAGE_STORAGE_KEY, 'fr')
  })

  it('should return false when localStorage throws error', () => {
    ;(window.localStorage.setItem as any).mockImplementation(() => {
      throw new Error('localStorage error')
    })
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    
    const result = persistLanguagePreference('es')
    
    expect(result).toBe(false)
    expect(consoleSpy).toHaveBeenCalledWith(
      'Failed to save language preference to localStorage:',
      expect.any(Error)
    )
    
    consoleSpy.mockRestore()
  })

  it('should handle quota exceeded errors specifically', () => {
    const quotaError = new DOMException('Quota exceeded', 'QuotaExceededError')
    ;(window.localStorage.setItem as any).mockImplementation(() => {
      throw quotaError
    })
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    
    const result = persistLanguagePreference('ar')
    
    expect(result).toBe(false)
    expect(consoleSpy).toHaveBeenCalledWith(
      'Failed to save language preference to localStorage:',
      quotaError
    )
    
    consoleSpy.mockRestore()
  })
})