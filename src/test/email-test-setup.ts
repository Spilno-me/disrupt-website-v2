import { EmailPayload } from '@/services/emailService'

// Test data for email testing
export const EMAIL_TEST_DATA = {
  RECIPIENT: 'contact@disruptinc.io',
  
  VALID_PAYLOADS: {
    complete: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      company: 'Test Company Inc.',
      message: 'This is a comprehensive test message with all fields populated.'
    } as EmailPayload,
    
    minimal: {
      email: 'minimal@example.com',
      company: 'Minimal Co'
    } as EmailPayload,
    
    special_characters: {
      name: 'José María González',
      email: 'jose.maria@example.com',
      company: 'Spëcial Châractërs & Co. Ltd.',
      message: 'Testing special characters: áéíóú, ñ, ç, €, £, ¥, 中文, العربية, 🚀'
    } as EmailPayload,
    
    long_content: {
      name: 'Long Content Test',
      email: 'longcontent@example.com',
      company: 'Long Content Testing Solutions Ltd.',
      message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '.repeat(100)
    } as EmailPayload
  },
  
  INVALID_PAYLOADS: {
    missing_email: {
      name: 'No Email',
      company: 'Missing Email Co',
      message: 'This payload is missing the required email field'
    },
    
    invalid_email: {
      name: 'Invalid Email',
      email: 'not-an-email-address',
      company: 'Invalid Email Co',
      message: 'This payload has an invalid email format'
    },
    
    missing_company: {
      name: 'Missing Company',
      email: 'missingcompany@example.com',
      message: 'This payload is missing the required company field'
    },
    
    empty_required: {
      name: '',
      email: '',
      company: '',
      message: ''
    }
  }
}

// Test configuration
export const EMAIL_TEST_CONFIG = {
  BACKEND_URL: 'http://localhost:3001',
  HEALTH_ENDPOINT: '/health',
  EMAIL_ENDPOINT: '/api/send-email',
  
  TIMEOUTS: {
    SHORT: 5000,    // 5 seconds
    MEDIUM: 15000,  // 15 seconds
    LONG: 30000     // 30 seconds
  },
  
  RETRY_CONFIG: {
    maxRetries: 3,
    retryDelay: 1000,
    timeout: 10000
  }
}

// Helper functions for testing
export const emailTestHelpers = {
  // Check if backend is available
  async isBackendAvailable(): Promise<boolean> {
    try {
      const response = await fetch(`${EMAIL_TEST_CONFIG.BACKEND_URL}${EMAIL_TEST_CONFIG.HEALTH_ENDPOINT}`)
      return response.ok
    } catch {
      return false
    }
  },
  
  // Generate test payload with timestamp
  generateTestPayload(type: keyof typeof EMAIL_TEST_DATA.VALID_PAYLOADS = 'complete'): EmailPayload {
    const basePayload = EMAIL_TEST_DATA.VALID_PAYLOADS[type]
    const timestamp = new Date().toISOString()
    
    return {
      ...basePayload,
      message: `${basePayload.message || 'Test message'} [Test timestamp: ${timestamp}]`
    }
  },
  
  // Validate email payload structure
  isValidPayload(payload: any): payload is EmailPayload {
    return (
      typeof payload === 'object' &&
      payload !== null &&
      typeof payload.email === 'string' &&
      typeof payload.company === 'string' &&
      payload.email.length > 0 &&
      payload.company.length > 0
    )
  },
  
  // Create test error scenarios
  createErrorScenarios() {
    return {
      network_timeout: new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Network timeout')), 100)
      ),
      
      server_error: Promise.reject(new Error('Internal server error')),
      
      validation_error: Promise.reject(new Error('Invalid email format')),
      
      rate_limit: Promise.reject(new Error('Rate limit exceeded'))
    }
  },
  
  // Performance testing helpers
  async measureEmailSendTime(payload: EmailPayload): Promise<number> {
    const start = Date.now()
    try {
      const { sendContactForm } = await import('@/services/emailService')
      await sendContactForm(payload)
      return Date.now() - start
    } catch (error) {
      return Date.now() - start
    }
  },
  
  // Concurrent testing
  async sendConcurrentEmails(count: number = 5): Promise<Array<{ success: boolean; duration: number }>> {
    const promises = Array.from({ length: count }, async (_, i) => {
      const start = Date.now()
      try {
        const payload = this.generateTestPayload('complete')
        payload.name = `Concurrent Test ${i + 1}`
        payload.email = `concurrent${i + 1}@example.com`
        
        const { sendContactForm } = await import('@/services/emailService')
        await sendContactForm(payload)
        
        return { success: true, duration: Date.now() - start }
      } catch (error) {
        return { success: false, duration: Date.now() - start }
      }
    })
    
    return Promise.all(promises)
  }
}

// Test environment detection
export const testEnvironment = {
  isIntegrationTest: process.env.VITEST_MODE === 'integration' || process.env.NODE_ENV === 'test',
  isLocalBackend: process.env.NODE_ENV !== 'production',
  
  shouldSkipIntegrationTests(): boolean {
    return !this.isIntegrationTest && !this.isLocalBackend
  },
  
  getTestMessage(testName: string): string {
    return `[AUTO TEST] ${testName} - ${new Date().toISOString()} - Please ignore this automated test email.`
  }
}