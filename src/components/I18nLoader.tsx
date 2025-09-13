import React from 'react'
import { useI18nLoading } from '@/stores/i18nStore'

interface I18nLoaderProps {
  children: React.ReactNode
}

/**
 * Component that shows a loading screen while i18n initializes
 */
export function I18nLoader({ children }: I18nLoaderProps) {
  const isLoading = useI18nLoading()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-pulse text-lg">Loading translations...</div>
        </div>
      </div>
    )
  }

  return <>{children}</>
}