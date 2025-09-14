import { ReactNode } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'

interface PageLayoutProps {
  children: ReactNode
  showContactButton?: boolean
  onContactClick?: () => void
  showBackground?: boolean
}

export function PageLayout({ 
  children, 
  showContactButton = false, 
  onContactClick,
  showBackground = true 
}: PageLayoutProps) {
  return (
    <>
      {showBackground && (
        <div className="dots-background" aria-hidden="true" data-element="background-dots" />
      )}
      
      <div className="min-h-screen flex flex-col" data-element="page-wrapper">
        <Header 
          showContactButton={showContactButton} 
          onContactClick={onContactClick}
        />
        
        <main className={`flex-grow pt-16`} data-element="main-content">
          {children}
        </main>
        
        <Footer />
      </div>
    </>
  )
}
