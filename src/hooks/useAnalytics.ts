import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { initializeGA, trackPageView } from '@/utils/analytics'

export const useAnalytics = () => {
  const location = useLocation()

  useEffect(() => {
    initializeGA()
  }, [])

  useEffect(() => {
    trackPageView(location.pathname)
  }, [location])
}