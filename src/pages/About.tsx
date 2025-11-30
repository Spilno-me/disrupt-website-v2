import { PageLayout } from '@/components/layout/PageLayout'
import { AboutHeroSection } from '@/components/sections/AboutHeroSection'
import { OurStorySection } from '@/components/sections/OurStorySection'
import { OurMissionSection } from '@/components/sections/OurMissionSection'
import { OurVisionSection } from '@/components/sections/OurVisionSection'
import { OurValuesSection } from '@/components/sections/OurValuesSection'
import { AboutProofSection } from '@/components/sections/AboutProofSection'
import { PartnersSection } from '@/components/sections/PartnersSection'
import { ContactSection } from '@/components/sections/ContactSection'

function About() {
  return (
    <PageLayout>
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
