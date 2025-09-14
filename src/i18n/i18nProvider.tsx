import { ReactNode } from 'react'
import { I18nContext } from './i18nContext'
import { useI18nState } from './useI18nState'
import { LoadingScreen } from './LoadingScreen'

interface I18nProviderProps {
  children: ReactNode
}

export function I18nProvider({ children }: I18nProviderProps) {
  const i18nState = useI18nState()

  if (i18nState.isLoading) {
    return <LoadingScreen />
  }

  return (
    <I18nContext.Provider value={i18nState.contextValue}>
      {children}
    </I18nContext.Provider>
  )
}
