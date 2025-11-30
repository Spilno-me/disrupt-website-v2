import { PageLayout } from '@/components/layout/PageLayout'
import { IndustryCarouselSection } from '@/components/sections/IndustryCarouselSection'
import { FeaturesGridSection } from '@/components/sections/FeaturesGridSection'
import { ContactSection } from '@/components/sections/ContactSection'
import { scrollToElement } from '@/utils/navigation'

function Product() {
  const handleContactClick = () => {
    scrollToElement('contact')
  }

  return (
    <PageLayout showContactButton={true} onContactClick={handleContactClick}>
      <IndustryCarouselSection />
      <FeaturesGridSection />
      <ContactSection />
    </PageLayout>
  )
}

export default Product
