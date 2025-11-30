import { Toaster } from 'sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { PageLayout } from '@/components/layout/PageLayout'
import { HeroSection } from '@/components/sections/HeroSection'
import { AIPlatformSection } from '@/components/sections/AIPlatformSection'
import { WhatDisruptDoesSection } from '@/components/sections/WhatDisruptDoesSection'
import { ProofSection } from '@/components/sections/ProofSection'
import { WhoWeHelpSection } from '@/components/sections/WhoWeHelpSection'
import { WhyDifferentSection } from '@/components/sections/WhyDifferentSection'
import { FutureCapabilitiesSection } from '@/components/sections/FutureCapabilitiesSection'
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
          <AIPlatformSection />
          <WhoWeHelpSection />
          <WhatDisruptDoesSection />
          <ProofSection />
          <WhyDifferentSection />
          <FutureCapabilitiesSection />
          <ContactSection />
        </PageLayout>

        <Toaster position="top-right" />
      </TooltipProvider>
    </I18nLoader>
  )
}

export default App