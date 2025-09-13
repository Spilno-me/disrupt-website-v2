import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { updateDocumentLanguageAttributes } from './dom'

describe('updateDocumentLanguageAttributes', () => {
  let originalDir: string
  let originalLang: string
  
  beforeEach(() => {
    // Store original values
    originalDir = document.documentElement.dir
    originalLang = document.documentElement.lang
  })
  
  afterEach(() => {
    // Restore original values
    document.documentElement.dir = originalDir
    document.documentElement.lang = originalLang
  })

  it('should set document attributes for LTR languages', () => {
    updateDocumentLanguageAttributes('en')
    
    expect(document.documentElement.lang).toBe('en')
    expect(document.documentElement.dir).toBe('ltr')
  })

  it('should set document attributes for RTL languages', () => {
    updateDocumentLanguageAttributes('ar')
    
    expect(document.documentElement.lang).toBe('ar')
    expect(document.documentElement.dir).toBe('rtl')
  })

  it('should not modify document when language info is not found', () => {
    // Set initial values
    document.documentElement.lang = 'initial'
    document.documentElement.dir = 'ltr'
    
    // Try with invalid language
    updateDocumentLanguageAttributes('invalid' as any)
    
    // Should remain unchanged since language info wasn't found
    expect(document.documentElement.lang).toBe('initial')
    expect(document.documentElement.dir).toBe('ltr')
  })

  it('should update both attributes when switching languages', () => {
    // Start with English
    updateDocumentLanguageAttributes('en')
    expect(document.documentElement.lang).toBe('en')
    expect(document.documentElement.dir).toBe('ltr')
    
    // Switch to Arabic
    updateDocumentLanguageAttributes('ar')
    expect(document.documentElement.lang).toBe('ar')
    expect(document.documentElement.dir).toBe('rtl')
  })
})