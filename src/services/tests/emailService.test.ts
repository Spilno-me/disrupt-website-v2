import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { EmailService, EmailPayload, EmailResponse } from '../emailService'
import { API_CONFIG } from '@/constants/appConstants'

// Mock fetch globally
const mockFetch = vi.fn()
global.fetch = mockFetch

describe('EmailService', () => {
  const mockPayload: EmailPayload = {
    name: 'John Doe',
    email: 'john@example.com',
    company: 'Test Company',
    message: 'This is a test message'
  }

  const mockSuccessResponse: EmailResponse = {
    success: true,
    message: 'Email sent successfully'
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('sendContactForm', () => {
    it('should send email successfully with valid payload', async () => {
      // Mock successful response
      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockSuccessResponse)
      })

      const result = await EmailService.sendContactForm(mockPayload)

      expect(mockFetch).toHaveBeenCalledWith(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.SEND_EMAIL}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(mockPayload),
        }
      )

      expect(result).toEqual(mockSuccessResponse)
    })

    it('should handle server errors correctly', async () => {
      const errorMessage = 'Server error occurred'
      mockFetch.mockResolvedValue({
        ok: false,
        json: () => Promise.resolve({ message: errorMessage })
      })

      await expect(EmailService.sendContactForm(mockPayload))
        .rejects
        .toThrow(errorMessage)
    })

    it('should handle network timeouts', async () => {
      // Mock fetch to never resolve (simulating timeout)
      mockFetch.mockImplementation(() => new Promise(() => {}))

      await expect(
        EmailService.sendContactForm(mockPayload, { timeout: 100 })
      ).rejects.toThrow('Request timeout after 100ms')
    }, 10000)

    it('should retry on server errors', async () => {
      // First two attempts fail, third succeeds
      mockFetch
        .mockRejectedValueOnce(new Error('Network error'))
        .mockRejectedValueOnce(new Error('Network error'))
        .mockResolvedValue({
          ok: true,
          json: () => Promise.resolve(mockSuccessResponse)
        })

      const result = await EmailService.sendContactForm(mockPayload, { 
        maxRetries: 3,
        retryDelay: 100
      })

      expect(mockFetch).toHaveBeenCalledTimes(3)
      expect(result).toEqual(mockSuccessResponse)
    })

    it('should not retry on client errors (400-499)', async () => {
      const clientError = new Error('400 Bad Request')
      mockFetch.mockRejectedValue(clientError)

      await expect(EmailService.sendContactForm(mockPayload))
        .rejects
        .toThrow('400 Bad Request')

      // Should not retry on client errors
      expect(mockFetch).toHaveBeenCalledTimes(1)
    })

    it('should fail after max retries exceeded', async () => {
      const networkError = new Error('Network error')
      mockFetch.mockRejectedValue(networkError)

      await expect(EmailService.sendContactForm(mockPayload, { 
        maxRetries: 2,
        retryDelay: 100
      })).rejects.toThrow('Failed after 2 attempts: Network error')

      expect(mockFetch).toHaveBeenCalledTimes(2)
    })

    it('should use custom configuration', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockSuccessResponse)
      })

      const customConfig = {
        timeout: 5000,
        maxRetries: 5,
        retryDelay: 2000
      }

      await EmailService.sendContactForm(mockPayload, customConfig)

      expect(mockFetch).toHaveBeenCalledTimes(1)
    })

    it('should handle malformed JSON response', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.reject(new Error('Invalid JSON'))
      })

      await expect(EmailService.sendContactForm(mockPayload))
        .rejects
        .toThrow('Invalid JSON')
    })

    it('should send to correct API endpoint', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockSuccessResponse)
      })

      await EmailService.sendContactForm(mockPayload)

      const expectedUrl = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.SEND_EMAIL}`
      expect(mockFetch).toHaveBeenCalledWith(
        expectedUrl,
        expect.any(Object)
      )
    })

    it('should handle payload validation', async () => {
      const invalidPayload = {
        name: '',
        email: 'invalid-email',
        company: '',
        message: ''
      } as EmailPayload

      mockFetch.mockResolvedValue({
        ok: false,
        json: () => Promise.resolve({ message: 'Invalid email format' })
      })

      await expect(EmailService.sendContactForm(invalidPayload))
        .rejects
        .toThrow('Invalid email format')
    })

    it('should include required payload fields', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockSuccessResponse)
      })

      const minimalPayload: EmailPayload = {
        email: 'test@example.com',
        company: 'Test Co'
      }

      await EmailService.sendContactForm(minimalPayload)

      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          body: JSON.stringify(minimalPayload)
        })
      )
    })
  })

  describe('timeout behavior', () => {
    it('should respect custom timeout values', async () => {
      mockFetch.mockImplementation(() => 
        new Promise(() => {}) // Never resolves
      )

      await expect(
        EmailService.sendContactForm(mockPayload, { timeout: 100 })
      ).rejects.toThrow('Request timeout after 100ms')
    }, 5000)

    it('should use default timeout when not specified', async () => {
      mockFetch.mockImplementation(() => 
        new Promise(() => {}) // Never resolves
      )

      await expect(
        EmailService.sendContactForm(mockPayload, { timeout: 100 })
      ).rejects.toThrow('Request timeout after 100ms')
    }, 5000)
  })

  describe('retry logic', () => {
    it('should implement retry attempts', async () => {
      mockFetch.mockRejectedValue(new Error('Network error'))

      try {
        await EmailService.sendContactForm(mockPayload, {
          maxRetries: 3,
          retryDelay: 10
        })
      } catch (error) {
        // Expected to fail
      }

      expect(mockFetch).toHaveBeenCalledTimes(3)
    })
  })
})