import { API_CONFIG } from '@/constants/appConstants'

export interface EmailPayload {
  name?: string
  email: string
  company: string
  message?: string
}

export interface EmailResponse {
  success: boolean
  message: string
}

interface RequestConfig {
  timeout: number
  maxRetries: number
  retryDelay: number
}

const DEFAULT_TIMEOUT_MS = 10000
const DEFAULT_MAX_RETRIES = 3
const DEFAULT_RETRY_DELAY_MS = 1000
const CLIENT_ERROR_STATUS_PREFIX = '400'

const DEFAULT_CONFIG: RequestConfig = {
  timeout: DEFAULT_TIMEOUT_MS,
  maxRetries: DEFAULT_MAX_RETRIES,
  retryDelay: DEFAULT_RETRY_DELAY_MS
}

function createTimeoutPromise(timeoutMs: number): Promise<never> {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(`Request timeout after ${timeoutMs}ms`))
    }, timeoutMs)
  })
}

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function buildRequestUrl(endpoint: string): string {
  return `${API_CONFIG.BASE_URL}${endpoint}`
}

function createHttpRequest(url: string, payload: EmailPayload): Promise<Response> {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
}

async function parseResponseOrThrow(response: Response): Promise<EmailResponse> {
  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.message || 'Failed to send email')
  }

  return result
}

async function makeRequestWithTimeout(
  endpoint: string, 
  payload: EmailPayload, 
  config: RequestConfig
): Promise<EmailResponse> {
  const url = buildRequestUrl(endpoint)
  const httpRequest = createHttpRequest(url, payload)
  const timeoutPromise = createTimeoutPromise(config.timeout)
  
  const response = await Promise.race([httpRequest, timeoutPromise])
  return parseResponseOrThrow(response)
}

function shouldRetryRequest(error: Error, attempt: number, maxRetries: number): boolean {
  if (attempt >= maxRetries) {
    return false
  }
  
  if (error.message.includes(CLIENT_ERROR_STATUS_PREFIX)) {
    return false
  }
  
  return true
}

function calculateRetryDelay(baseDelay: number, attempt: number): number {
  return baseDelay * attempt
}

async function makeRequestWithRetry(
  endpoint: string, 
  payload: EmailPayload, 
  config: RequestConfig
): Promise<EmailResponse> {
  let lastError: Error

  for (let attempt = 1; attempt <= config.maxRetries; attempt++) {
    try {
      return await makeRequestWithTimeout(endpoint, payload, config)
    } catch (error) {
      lastError = error instanceof Error ? error : new Error('Unknown error')
      
      if (!shouldRetryRequest(lastError, attempt, config.maxRetries)) {
        throw lastError
      }
      
      const delayMs = calculateRetryDelay(config.retryDelay, attempt)
      await delay(delayMs)
    }
  }

  throw new Error(`Failed after ${config.maxRetries} attempts: ${lastError!.message}`)
}

async function sendContactForm(
  payload: EmailPayload, 
  config?: Partial<RequestConfig>
): Promise<EmailResponse> {
  const finalConfig = { ...DEFAULT_CONFIG, ...config }
  return makeRequestWithRetry(API_CONFIG.ENDPOINTS.SEND_EMAIL, payload, finalConfig)
}

export const EmailService = {
  sendContactForm
}

// For backward compatibility
export { sendContactForm }
