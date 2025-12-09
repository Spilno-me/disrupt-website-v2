import {
  PageLayout,
  AboutHeroSection,
  OurStorySection,
  OurMissionSection,
  OurVisionSection,
  OurValuesSection,
  AboutProofSection,
  PartnersSection,
  ContactSection,
} from '@adrozdenko/design-system'
import { useRouterNavigation } from '@/hooks/useRouterNavigation'

function About() {
  const { renderNavLink, renderContactLink, onLogoClick } = useRouterNavigation()

  return (
    <PageLayout
      renderNavLink={renderNavLink}
      renderContactLink={renderContactLink}
      onLogoClick={onLogoClick}
    >
      <AboutHeroSection />
      <OurStorySection />
      <OurMissionSection />
      <OurVisionSection />
      <OurValuesSection />
      <AboutProofSection />
      <PartnersSection />
      <ContactSection />
    </PageLayout>
  )
}

export default About
