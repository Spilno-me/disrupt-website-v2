import { Toaster } from 'sonner'
import {
  TooltipProvider,
  PageLayout,
  HeroSection,
  AIPlatformSection,
  WhatDisruptDoesSection,
  ProofSection,
  WhoWeHelpSection,
  WhyDifferentSection,
  FutureCapabilitiesSection,
  ContactSection,
  optimizedImages,
} from '@adrozdenko/design-system'
import { I18nLoader } from '@/components/I18nLoader'
import { useRouterNavigation } from '@/hooks/useRouterNavigation'

function App() {
  const { renderNavLink, renderContactLink, onLogoClick } = useRouterNavigation()

  return (
    <I18nLoader>
      <TooltipProvider>
        <PageLayout
          renderNavLink={renderNavLink}
          renderContactLink={renderContactLink}
          onLogoClick={onLogoClick}
        >
          <HeroSection
            title="Protect People"
            rotatingTitles={['Protect People', 'Empower Strategy', 'Cut the Admin']}
            subtitle="Compliance should make workplaces safer and decisions smarter — not bury teams in forms."
            backgroundImage={optimizedImages.heroFrame}
            layout="center"
            showParticles={true}
            showGridBlob={false}
          />
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
