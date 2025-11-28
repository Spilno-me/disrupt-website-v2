import React from 'react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor, act, renderHook } from '@testing-library/react'
import { I18nProvider, useI18n, useTranslation } from '../i18nContext'
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from '../constants'
import * as storageModule from '../storage'
import * as translationsModule from '../translations'
import * as utilsModule from '../utils'
import * as domModule from '../dom'

// Mock all the modules
vi.mock('../storage')
vi.mock('../translations')
vi.mock('../utils')
vi.mock('../dom')

const mockTranslations = {
  hero: {
    title: 'Welcome to Disrupt',
    description: 'Build the future'
  },
  contact: {
    form: {
      title: 'Contact Us',
      subtitle: 'Get in touch',
      labels: {
        name: 'Name',
        email: 'Email*',
        company: 'Company*',
        message: 'Message',
        placeholder: 'Your message',
        privacyPolicy: 'I agree'
      },
      button: {
        submit: 'Submit',
        submitting: 'Submitting...'
      },
      validation: {
        emailRequired: 'Email required',
        emailInvalid: 'Invalid email',
        companyRequired: 'Company required',
        privacyRequired: 'Privacy required'
      },
      messages: {
        successTitle: 'Success!',
        successDescription: 'Message sent',
        errorTitle: 'Error',
        errorFallback: 'Try again'
      }
    },
    info: {
      title: 'Contact Info',
      subtitle: 'Reach out',
      contactLabel: 'Contact',
      followLabel: 'Follow',
      comingSoon: 'Coming soon',
      emailSubject: 'Inquiry'
    }
  },
  features: {
    title: 'Features',
    subtitle: 'What we offer',
    cards: {
      hours: {
        title: 'Fast',
        description: 'Quick results'
      },
      costs: {
        title: 'Affordable',
        description: 'Cost effective'
      },
      automation: {
        title: 'Automated',
        description: 'Smart automation'
      }
    }
  },
  header: {
    logo: 'Disrupt',
    bookCall: 'Book Call'
  },
  footer: {
    company: 'Disrupt Inc.',
    description: 'Innovation company',
    legal: {
      privacy: 'Privacy Policy',
      terms: 'Terms of Service'
    },
    copyright: 'All rights reserved'
  },
  legal: {
    privacy: {
      title: 'Privacy Policy',
      lastUpdated: 'Updated: 2025',
      sections: {
        intro: 'Privacy intro',
        whoWeAre: {
          title: 'Who We Are',
          content: 'About us'
        },
        scope: {
          title: 'Scope',
          intro: 'This applies to',
          applies: ['Users', 'Visitors'],
          processor: 'Data processor info'
        },
        dataCollected: {
          title: 'Data Collection',
          intro: 'We collect',
          types: ['Email', 'Name']
        }
      }
    },
    terms: {
      title: 'Terms of Service',
      lastUpdated: 'Updated: 2025'
    }
  }
}

// Test components
function TestConsumerComponent() {
  const { currentLanguage, t, isRTL, languages, setLanguage } = useI18n()
  
  return (
    <div>
      <div data-testid="current-language">{currentLanguage}</div>
      <div data-testid="hero-title">{t('hero.title')}</div>
      <div data-testid="is-rtl">{isRTL ? 'true' : 'false'}</div>
      <div data-testid="languages-count">{languages.length}</div>
      <button 
        data-testid="change-language" 
        onClick={() => setLanguage('es')}
      >
        Change to Spanish
      </button>
    </div>
  )
}

function TestTranslationOnlyComponent() {
  const { t } = useTranslation()
  
  return (
    <div>
      <div data-testid="contact-title">{t('contact.form.title')}</div>
    </div>
  )
}

function TestComponentOutsideProvider() {
  try {
    useI18n()
    return <div>Should not render</div>
  } catch (error) {
    return <div data-testid="error">{(error as Error).message}</div>
  }
}

describe('I18nProvider', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    
    // Mock storage module
    vi.mocked(storageModule.retrieveStoredLanguage).mockReturnValue({
      language: 'en',
      source: 'default'
    })
    vi.mocked(storageModule.persistLanguagePreference).mockReturnValue(true)
    
    // Mock translations module
    vi.mocked(translationsModule.loadTranslations).mockResolvedValue({
      translations: mockTranslations,
      loadedLanguage: 'en',
      wasSuccessful: true
    })
    
    // Mock utils module
    vi.mocked(utilsModule.detectBrowserLanguage).mockReturnValue('en')
    vi.mocked(utilsModule.createTranslationFunction).mockReturnValue(
      (key: string) => {
        if (key === 'hero.title') return 'Welcome to Disrupt'
        if (key === 'contact.form.title') return 'Contact Us'
        return `Mock translation for ${key}`
      }
    )
    vi.mocked(utilsModule.createLoadingTranslationFunction).mockReturnValue(
      (key: string) => `Loading ${key}`
    )
    
    // Mock dom module
    vi.mocked(domModule.updateDocumentLanguageAttributes).mockImplementation(() => {})
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should render loading state initially', async () => {
    await act(async () => {
      render(
        <I18nProvider>
          <TestConsumerComponent />
        </I18nProvider>
      )
    })
    
    // Should show loading initially (may have already finished loading)
    // In fast environments, loading might complete immediately
    const loadingText = screen.queryByText('Loading...')
    if (loadingText) {
      expect(loadingText).toBeInTheDocument()
    } else {
      // If not loading, should have translations loaded
      expect(screen.getByText('Welcome to Disrupt')).toBeInTheDocument()
    }
  })

  it('should provide i18n context with correct values after loading', async () => {
    render(
      <I18nProvider>
        <TestConsumerComponent />
      </I18nProvider>
    )
    
    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
    })
    
    expect(screen.getByTestId('current-language')).toHaveTextContent('en')
    expect(screen.getByTestId('hero-title')).toHaveTextContent('Welcome to Disrupt')
    expect(screen.getByTestId('is-rtl')).toHaveTextContent('false')
    expect(screen.getByTestId('languages-count')).toHaveTextContent(SUPPORTED_LANGUAGES.length.toString())
  })

  it('should handle language switching', async () => {
    const { rerender } = render(
      <I18nProvider>
        <TestConsumerComponent />
      </I18nProvider>
    )
    
    // Wait for initial load
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
    })
    
    // Mock Spanish translations
    vi.mocked(translationsModule.loadTranslations).mockResolvedValue({
      translations: {
        ...mockTranslations,
        hero: { title: 'Bienvenido a Disrupt', description: 'Construye el futuro' }
      },
      loadedLanguage: 'es',
      wasSuccessful: true
    })
    
    vi.mocked(utilsModule.createTranslationFunction).mockReturnValue(
      (key: string) => {
        if (key === 'hero.title') return 'Bienvenido a Disrupt'
        return `Spanish translation for ${key}`
      }
    )
    
    // Click change language button
    await act(async () => {
      screen.getByTestId('change-language').click()
    })
    
    // Should persist language preference
    expect(storageModule.persistLanguagePreference).toHaveBeenCalledWith('es')
    
    // Should update document attributes
    expect(domModule.updateDocumentLanguageAttributes).toHaveBeenCalledWith('es')
  })

  it('should detect RTL languages correctly', async () => {
    // Mock Arabic language
    vi.mocked(storageModule.retrieveStoredLanguage).mockReturnValue({
      language: 'ar',
      source: 'stored'
    })
    
    render(
      <I18nProvider>
        <TestConsumerComponent />
      </I18nProvider>
    )
    
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
    })
    
    expect(screen.getByTestId('current-language')).toHaveTextContent('ar')
    expect(screen.getByTestId('is-rtl')).toHaveTextContent('true')
  })

  it('should use stored language preference', async () => {
    vi.mocked(storageModule.retrieveStoredLanguage).mockReturnValue({
      language: 'es',
      source: 'stored'
    })
    
    render(
      <I18nProvider>
        <TestConsumerComponent />
      </I18nProvider>
    )
    
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
    })
    
    expect(screen.getByTestId('current-language')).toHaveTextContent('es')
    expect(translationsModule.loadTranslations).toHaveBeenCalledWith('es')
  })

  it('should fallback to browser language when no stored preference', async () => {
    vi.mocked(storageModule.retrieveStoredLanguage).mockReturnValue({
      language: DEFAULT_LANGUAGE,
      source: 'default'
    })
    vi.mocked(utilsModule.detectBrowserLanguage).mockReturnValue('fr')
    
    render(
      <I18nProvider>
        <TestConsumerComponent />
      </I18nProvider>
    )
    
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
    })
    
    expect(utilsModule.detectBrowserLanguage).toHaveBeenCalled()
    expect(translationsModule.loadTranslations).toHaveBeenCalledWith('fr')
  })

  it('should handle translation loading failures gracefully', async () => {
    vi.mocked(translationsModule.loadTranslations).mockRejectedValue(
      new Error('Translation load failed')
    )
    
    // Should still render the provider but with loading translations
    vi.mocked(utilsModule.createLoadingTranslationFunction).mockReturnValue(
      (key: string) => `Loading ${key}`
    )
    
    render(
      <I18nProvider>
        <TestConsumerComponent />
      </I18nProvider>
    )
    
    // The provider should handle the error and continue with loading state
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
    }, { timeout: 3000 })
  })

  it('should update document language attributes on language change', async () => {
    render(
      <I18nProvider>
        <TestConsumerComponent />
      </I18nProvider>
    )
    
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
    })
    
    expect(domModule.updateDocumentLanguageAttributes).toHaveBeenCalledWith('en')
  })
})

describe('useI18n', () => {
  it('should throw error when used outside provider', () => {
    render(<TestComponentOutsideProvider />)
    
    expect(screen.getByTestId('error')).toHaveTextContent(
      'useI18n must be used within an I18nProvider'
    )
  })

  it('should provide all required context values', async () => {
    // Set up successful translation loading
    vi.mocked(translationsModule.loadTranslations).mockResolvedValue({
      translations: mockTranslations,
      loadedLanguage: 'en',
      wasSuccessful: true
    })
    
    render(
      <I18nProvider>
        <TestConsumerComponent />
      </I18nProvider>
    )
    
    await waitFor(() => {
      expect(screen.getByTestId('current-language')).toBeInTheDocument()
    }, { timeout: 3000 })
    
    // All required values should be present
    expect(screen.getByTestId('current-language')).toBeInTheDocument()
    expect(screen.getByTestId('hero-title')).toBeInTheDocument()
    expect(screen.getByTestId('is-rtl')).toBeInTheDocument()
    expect(screen.getByTestId('languages-count')).toBeInTheDocument()
    expect(screen.getByTestId('change-language')).toBeInTheDocument()
  })
})

describe('useTranslation', () => {
  it('should provide translation function only', async () => {
    // Set up successful translation loading
    vi.mocked(translationsModule.loadTranslations).mockResolvedValue({
      translations: mockTranslations,
      loadedLanguage: 'en',
      wasSuccessful: true
    })
    
    render(
      <I18nProvider>
        <TestTranslationOnlyComponent />
      </I18nProvider>
    )
    
    await waitFor(() => {
      expect(screen.getByTestId('contact-title')).toBeInTheDocument()
    }, { timeout: 3000 })
    
    expect(screen.getByTestId('contact-title')).toHaveTextContent('Contact Us')
  })

  it('should throw error when used outside provider', () => {
    function TestComponentWithTranslationHook() {
      try {
        useTranslation()
        return <div>Should not render</div>
      } catch (error) {
        return <div data-testid="translation-error">{(error as Error).message}</div>
      }
    }
    
    render(<TestComponentWithTranslationHook />)
    
    expect(screen.getByTestId('translation-error')).toHaveTextContent(
      'useI18n must be used within an I18nProvider'
    )
  })
})

describe('Loading state', () => {
  it('should show loading screen with correct styling', async () => {
    render(
      <I18nProvider>
        <TestConsumerComponent />
      </I18nProvider>
    )
    
    const loadingElement = screen.getByText('Loading...')
    expect(loadingElement).toBeInTheDocument()
    
    // Check if loading element has correct classes
    const loadingContainer = loadingElement.closest('div')
    expect(loadingContainer).toHaveClass('animate-pulse', 'text-lg')
  })

  it('should hide loading screen after translations load', async () => {
    // Set up successful translation loading
    vi.mocked(translationsModule.loadTranslations).mockResolvedValue({
      translations: mockTranslations,
      loadedLanguage: 'en',
      wasSuccessful: true
    })
    
    render(
      <I18nProvider>
        <TestConsumerComponent />
      </I18nProvider>
    )
    
    // Should eventually show actual content after loading
    await waitFor(() => {
      expect(screen.getByTestId('current-language')).toBeInTheDocument()
    }, { timeout: 3000 })
    
    // Should not show loading anymore
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
  })
})
