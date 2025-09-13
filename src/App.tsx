import { Toaster } from 'sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { PageLayout } from '@/components/layout/PageLayout'
import { HeroSection } from '@/components/sections/HeroSection'
import { FeaturesSection } from '@/components/sections/FeaturesSection'
import { ContactSection } from '@/components/sections/ContactSection'
import { I18nLoader } from '@/components/I18nLoader'
import { scrollToElement } from '@/utils/navigation'

function App() {
  const handleContactClick = () => {
    scrollToElement('contact')
  }

  return (
    <I18nLoader>
      <TooltipProvider>
        <PageLayout 
          showContactButton={true} 
          onContactClick={handleContactClick}
        >
          <HeroSection />
          <FeaturesSection />
          <ContactSection />
        </PageLayout>
        
        <Toaster position="top-right" />
      </TooltipProvider>
    </I18nLoader>
  )
}

export default App