import '@testing-library/jest-dom'

// Mock localStorage
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: vi.fn(() => null),
    setItem: vi.fn(() => null),
    removeItem: vi.fn(() => null),
    clear: vi.fn(() => null),
  },
  writable: true,
})

// Mock navigator.language
Object.defineProperty(window.navigator, 'language', {
  writable: true,
  value: 'en-US'
})

// Clean up localStorage mocks before each test
beforeEach(() => {
  vi.clearAllMocks()
  // Reset localStorage mock to default behavior
  ;(window.localStorage.getItem as any).mockReturnValue(null)
})
