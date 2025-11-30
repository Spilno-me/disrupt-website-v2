import { NAVIGATION } from '@/constants/appConstants'

// =============================================================================
// NAVIGATION UTILITIES
// =============================================================================

const SCROLL_BEHAVIOR = 'smooth' as const

/**
 * Scroll to a specific element by its ID.
 * Used for in-page navigation (e.g., "Contact us" button).
 * Accounts for fixed header height.
 */
export function scrollToElement(elementId: string): void {
  const element = document.getElementById(elementId)
  const headerHeight = 82 // Match SPACING.headerHeight

  if (element) {
    const elementPosition = element.getBoundingClientRect().top + window.scrollY
    const offsetPosition = elementPosition - headerHeight - 16 // Extra 16px padding

    window.scrollTo({
      top: offsetPosition,
      behavior: SCROLL_BEHAVIOR,
    })
  }
}

/**
 * Scroll to the top of the page.
 * Used for "back to top" functionality.
 */
export function scrollToTop(): void {
  window.scrollTo({ top: 0, behavior: SCROLL_BEHAVIOR })
}

/**
 * Navigate to a specific route using window.location.
 * Use for hard navigation when React Router is not available.
 */
export function navigateTo(path: string): void {
  window.location.href = path
}

// Convenience aliases for common navigation targets
export const navigateToHome = () => navigateTo(NAVIGATION.HOME)
export const navigateToPrivacyPolicy = () => navigateTo(NAVIGATION.PRIVACY_POLICY)
export const navigateToTermsOfService = () => navigateTo(NAVIGATION.TERMS_OF_SERVICE)
