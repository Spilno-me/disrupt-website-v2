import { PageLayout } from '@/components/layout/PageLayout'
import { IndustryCarouselSection } from '@/components/sections/IndustryCarouselSection'
import { FeaturesGridSection } from '@/components/sections/FeaturesGridSection'
import { ContactSection } from '@/components/sections/ContactSection'

function Product() {
  return (
    <PageLayout>
      <IndustryCarouselSection />
      <FeaturesGridSection />
      <ContactSection />
    </PageLayout>
  )
}

export default Product
