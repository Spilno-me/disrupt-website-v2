import { Clock, TrendingDown, Brain } from 'lucide-react'
import { FeatureCard } from './FeatureCard'
import { UI_CONSTANTS } from '@/constants/appConstants'
import { useTranslation } from '@/hooks/useI18n'

export function FeaturesSection() {
  const { t } = useTranslation()
  
  const FEATURES = [
    {
      icon: Clock,
      iconColor: 'bg-yellow-400',
      title: t('features.cards.hours.title'),
      description: t('features.cards.hours.description'),
      dataElement: 'feature-hours'
    },
    {
      icon: TrendingDown,
      iconColor: 'bg-green-500',
      title: t('features.cards.costs.title'),
      description: t('features.cards.costs.description'),
      dataElement: 'feature-costs'
    },
    {
      icon: Brain,
      iconColor: 'bg-blue-600',
      title: t('features.cards.automation.title'),
      description: t('features.cards.automation.description'),
      dataElement: 'feature-automation'
    }
  ]

  return (
    <section 
      className="relative w-full py-16 features-background features-dashed-border-top features-dashed-border-bottom" 
      data-element="features-section"
    >
      <div className="w-full px-6" data-element="features-container">
        <div className="flex flex-col items-center gap-12 w-full" data-element="features-content">
          <div className="flex flex-col items-center gap-4 max-w-4xl" data-element="features-header">
            <h2 className="text-4xl font-display font-bold text-center tracking-[4px] leading-10 text-white">
              {t('features.title')}
            </h2>
            <p className="text-base text-center leading-6 text-white">
              {t('features.subtitle')}
            </p>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-6 w-full max-w-6xl" data-element="features-grid">
            {FEATURES.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
