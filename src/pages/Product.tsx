import { PageLayout } from '@/components/layout/PageLayout'
import { ProductHeroSection } from '@/components/sections/ProductHeroSection'
import { IndustryCarouselSection } from '@/components/sections/IndustryCarouselSection'
import { FeaturesGridSection } from '@/components/sections/FeaturesGridSection'
import { ROICalculatorSection } from '@/components/sections/ROICalculatorSection'
import { PricingCardsSection } from '@/components/sections/PricingCardsSection'
import { StrategicAdvisorySection } from '@/components/sections/StrategicAdvisorySection'
import { FAQSection } from '@/components/sections/FAQSection'
import { ReadyToAchieveSection } from '@/components/sections/ReadyToAchieveSection'
import { ContactSection } from '@/components/sections/ContactSection'
import { ScrollToTopButton } from '@adrozdenko/design-system'

function Product() {
  return (
    <PageLayout>
      <ProductHeroSection />
      <IndustryCarouselSection />
      <FeaturesGridSection />
      <ROICalculatorSection />
      <PricingCardsSection />
      <StrategicAdvisorySection />
      <ReadyToAchieveSection />
      <FAQSection />
      <ContactSection />
      <ScrollToTopButton />
    </PageLayout>
  )
}

export default Product
