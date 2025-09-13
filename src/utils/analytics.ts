import { ANALYTICS } from '@/constants/appConstants'

declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
  }
}

export const initializeGA = () => {
  if (typeof window === 'undefined' || !window.gtag) {
    return
  }
  // GA4 is already initialized in HTML, this is just a check
}

export const trackPageView = (path: string, title?: string) => {
  if (typeof window === 'undefined' || !window.gtag) {
    return
  }

  window.gtag('event', 'page_view', {
    page_title: title || document.title,
    page_location: window.location.href,
    page_path: path
  })
}

export const trackEvent = (eventName: string, parameters: Record<string, any> = {}) => {
  if (typeof window === 'undefined' || !window.gtag) {
    return
  }

  window.gtag('event', eventName, parameters)
}

export const trackFormSubmission = (formName: string, success: boolean = true) => {
  trackEvent('form_submit', {
    form_name: formName,
    success: success
  })
}

export const trackButtonClick = (buttonName: string, location?: string) => {
  trackEvent('button_click', {
    button_name: buttonName,
    location: location
  })
}

