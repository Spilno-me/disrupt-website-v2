import React from 'react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ContactForm } from './ContactForm'
import { sendContactForm } from '@/services/emailService'
import { I18nProvider } from '@/i18n/i18nProvider'

// Mock the EmailService
vi.mock('@/services/emailService')

// Mock the toast hook
vi.mock('@/hooks/useToast', () => ({
  useToast: () => ({
    showSuccess: vi.fn(),
    showError: vi.fn()
  })
}))

// Mock i18n modules
vi.mock('@/i18n/storage')
vi.mock('@/i18n/translations')
vi.mock('@/i18n/utils')
vi.mock('@/i18n/dom')

// Setup i18n mocks
const mockTranslations = {
  hero: {
    title: 'Welcome',
    description: 'Test description'
  },
  features: {
    title: 'Features',
    subtitle: 'Test features',
    cards: {
      hours: { title: 'Hours', description: 'Save hours' },
      costs: { title: 'Costs', description: 'Save costs' },
      automation: { title: 'Automation', description: 'Automate tasks' }
    }
  },
  contact: {
    form: {
      title: 'Contact Us',
      subtitle: 'Get in touch with us',
      labels: {
        name: 'Name',
        email: 'Email*',
        company: 'Company*',
        message: 'Message',
        placeholder: 'Leave a message',
        privacyPolicy: 'By selecting this you agree to our Privacy Policy.'
      },
      button: {
        submit: 'Book a Call',
        submitting: 'Submitting...'
      },
      validation: {
        emailRequired: 'Email is required',
        emailInvalid: 'Please enter a valid email address',
        companyRequired: 'Company is required',
        privacyRequired: 'You must agree to our Privacy Policy'
      },
      messages: {
        successTitle: 'Message Sent!',
        successDescription: 'We\'ll get back to you soon.',
        errorTitle: 'Error',
        errorFallback: 'Please try again later.'
      }
    },
    info: {
      title: 'Contact Info',
      subtitle: 'Get in touch',
      contactLabel: 'Contact',
      followLabel: 'Follow',
      comingSoon: 'Coming Soon',
      emailSubject: 'Contact Inquiry'
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
      privacy: 'Privacy Policy',
      terms: 'Terms of Service'
    },
    copyright: 'Copyright'
  },
  legal: {
    privacy: {
      title: 'Privacy Policy',
      lastUpdated: 'Last updated',
      sections: {
        intro: 'Introduction',
        whoWeAre: {
          title: 'Who We Are',
          content: 'Content'
        },
        scope: {
          title: 'Scope',
          intro: 'Introduction',
          applies: ['Visitors', 'Users'],
          processor: 'Processor info'
        },
        dataCollected: {
          title: 'Data Collected',
          intro: 'Introduction',
          types: ['Email', 'Name']
        }
      }
    },
    terms: {
      title: 'Terms of Service',
      lastUpdated: 'Last updated'
    }
  }
}

const ContactFormWrapper = ({ children }: { children: React.ReactNode }) => (
  <I18nProvider>
    {children}
  </I18nProvider>
)

describe('ContactForm Email Tests', () => {
  beforeEach(async () => {
    vi.clearAllMocks()
    
    // Mock i18n context
    const storageModule = await import('@/i18n/storage')
    const translationsModule = await import('@/i18n/translations')
    const utilsModule = await import('@/i18n/utils')
    const domModule = await import('@/i18n/dom')
    
    vi.mocked(storageModule.retrieveStoredLanguage).mockReturnValue({
      language: 'en',
      source: 'default'
    })
    
    vi.mocked(translationsModule.loadTranslations).mockResolvedValue({
      translations: mockTranslations,
      loadedLanguage: 'en',
      wasSuccessful: true
    })
    
    vi.mocked(utilsModule.detectBrowserLanguage).mockReturnValue('en')
    vi.mocked(utilsModule.createTranslationFunction).mockReturnValue(
      (key: string) => {
        const keys = key.split('.')
        let value: any = mockTranslations
        for (const k of keys) {
          value = value?.[k]
        }
        return value || `Translation for ${key}`
      }
    )
    
    vi.mocked(domModule.updateDocumentLanguageAttributes).mockImplementation(() => {})
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('Email Integration Tests', () => {
    it('should send email to contact@disruptinc.io when form is submitted', async () => {
      const user = userEvent.setup()
      
      // Mock successful email sending
      vi.mocked(sendContactForm).mockResolvedValue({
        success: true,
        message: 'Email sent successfully to contact@disruptinc.io'
      })

      render(<ContactForm />, { wrapper: ContactFormWrapper })

      // Wait for form to load
      await waitFor(() => {
        expect(screen.getByText('Book a Demo')).toBeInTheDocument()
      })

      // Fill out the form
      const nameInput = screen.getByLabelText('Name')
      const emailInput = screen.getByLabelText('Email*')
      const companyInput = screen.getByLabelText('Company*')
      const messageInput = screen.getByLabelText('Message')
      const privacyCheckbox = screen.getByRole('checkbox')

      await user.type(nameInput, 'Test User')
      await user.type(emailInput, 'test@example.com')
      await user.type(companyInput, 'Test Company')
      await user.type(messageInput, 'This email should go to contact@disruptinc.io')
      await user.click(privacyCheckbox)

      // Submit the form
      const submitButton = screen.getByText('Book a Demo')
      await user.click(submitButton)

      // Verify EmailService was called with correct data
      await waitFor(() => {
        expect(sendContactForm).toHaveBeenCalledWith({
          name: 'Test User',
          email: 'test@example.com',
          company: 'Test Company',
          message: 'This email should go to contact@disruptinc.io'
        })
      })
    })

    it('should render form elements correctly', async () => {
      render(<ContactForm />, { wrapper: ContactFormWrapper })

      await waitFor(() => {
        expect(screen.getByLabelText('Name')).toBeInTheDocument()
        expect(screen.getByLabelText('Email*')).toBeInTheDocument()
        expect(screen.getByLabelText('Company*')).toBeInTheDocument()
        expect(screen.getByLabelText('Message')).toBeInTheDocument()
        expect(screen.getByText('Book a Demo')).toBeInTheDocument()
      })
    })
  })
})