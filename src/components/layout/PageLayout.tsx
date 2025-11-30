import { ReactNode, useCallback } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'
import { scrollToElement } from '@/utils/navigation'

interface PageLayoutProps {
  children: ReactNode
  /** Show contact button in header (defaults to true) */
  showContactButton?: boolean
}

export function PageLayout({
  children,
  showContactButton = true,
}: PageLayoutProps) {
  const handleContactClick = useCallback(() => {
    scrollToElement('contact')
  }, [])

  return (
    <div className="min-h-screen flex flex-col" data-element="page-wrapper">
      <Header
        showContactButton={showContactButton}
        onContactClick={handleContactClick}
      />

      <main className="flex-grow" data-element="main-content">
        {children}
      </main>

      <Footer />
    </div>
  )
}
