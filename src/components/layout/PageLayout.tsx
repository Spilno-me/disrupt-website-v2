import { ReactNode } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'

interface PageLayoutProps {
  children: ReactNode
  showContactButton?: boolean
  onContactClick?: () => void
}

export function PageLayout({
  children,
  showContactButton = false,
  onContactClick,
}: PageLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col" data-element="page-wrapper">
      <Header
        showContactButton={showContactButton}
        onContactClick={onContactClick}
      />

      <main className="flex-grow" data-element="main-content">
        {children}
      </main>

      <Footer />
    </div>
  )
}
