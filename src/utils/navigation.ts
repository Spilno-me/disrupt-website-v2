import { NAVIGATION } from '@/constants/appConstants'

const SCROLL_BEHAVIOR = 'smooth' as const
const SCROLL_TOP_POSITION = 0

export function scrollToElement(elementId: string): void {
  const element = document.getElementById(elementId)
  
  if (element) {
    element.scrollIntoView({ behavior: SCROLL_BEHAVIOR })
  }
}

export function scrollToTop(): void {
  window.scrollTo({ top: SCROLL_TOP_POSITION, behavior: SCROLL_BEHAVIOR })
}

export function navigateToHome(): void {
  window.location.href = NAVIGATION.HOME
}

export function navigateToPrivacyPolicy(): void {
  window.location.href = NAVIGATION.PRIVACY_POLICY
}

export function navigateToTermsOfService(): void {
  window.location.href = NAVIGATION.TERMS_OF_SERVICE
}
