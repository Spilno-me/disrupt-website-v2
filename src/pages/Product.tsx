import {
  PageLayout,
  ProductHeroSection,
  IndustryCarouselSection,
  FeaturesGridSection,
  ROICalculatorSection,
  PricingCardsSection,
  StrategicAdvisorySection,
  FAQSection,
  ReadyToAchieveSection,
  ContactSection,
  ScrollToTopButton,
} from '@adrozdenko/design-system'
import { useRouterNavigation } from '@/hooks/useRouterNavigation'

function Product() {
  const { renderNavLink, renderContactLink, onLogoClick } = useRouterNavigation()

  return (
    <PageLayout
      renderNavLink={renderNavLink}
      renderContactLink={renderContactLink}
      onLogoClick={onLogoClick}
    >
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
