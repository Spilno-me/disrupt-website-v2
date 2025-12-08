import { COLORS, Card, FeatureItem } from '@adrozdenko/design-system'
import { Shield, BookOpen, BarChart3, Scale } from 'lucide-react'

// =============================================================================
// DATA
// =============================================================================

const ADVISORY_FEATURES = [
  {
    icon: Shield,
    title: 'Compliance Advisor',
    description: 'Real-time regulatory interpretation and gap analysis for EU/OSHA directives.',
  },
  {
    icon: BookOpen,
    title: 'Regulatory Reporter',
    description: 'Auto-generate CSRD/ESG reports, OSHA 300 logs, and RIDDOR forms.',
  },
  {
    icon: BarChart3,
    title: 'Benchmark Analyst',
    description: 'Compare your incident rates and safety culture against industry peers instantly.',
  },
  {
    icon: Scale,
    title: 'Legal Risk Advisor',
    description: 'Proactive liability assessment and litigation risk prediction.',
  },
]

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function StrategicAdvisorySection() {
  return (
    <section
      className="py-8 sm:py-12 lg:py-16 bg-cream border-y-dashed-figma"
      data-element="strategic-advisory-section"
    >
      <div className="max-w-container mx-auto px-4 sm:px-6 flex justify-center relative z-[1]">
        {/* Card */}
        <Card
          variant="pricing"
          shadow="sm"
          className="max-w-[894px] w-full relative"
          style={{ borderColor: COLORS.teal }}
        >
          {/* Badge */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <span
              className="px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold text-white whitespace-nowrap"
              style={{ backgroundColor: COLORS.feature.red }}
            >
              STRATEGIC ADVISORY ADD-ON
            </span>
          </div>

          {/* Content */}
          <div className="p-6 pt-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 mb-6">
              <div className="flex flex-col gap-2">
                <h3 className="text-xl sm:text-2xl font-display font-bold uppercase tracking-wide text-dark">
                  Expert Agents
                </h3>
                <p className="font-sans text-sm max-w-[320px] text-muted">
                  Your virtual board of directors, available 24/7.
                </p>
              </div>
              <div className="flex flex-col gap-1 md:text-right">
                <span
                  className="font-display font-bold text-2xl"
                  style={{ color: COLORS.circleRed }}
                >
                  $7500/mo
                </span>
                <span className="font-sans text-sm text-muted">
                  Replaces €100k–500k/yr consulting spend
                </span>
              </div>
            </div>

            {/* Separator */}
            <div className="w-full h-px bg-slate-200 mb-6" />

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ADVISORY_FEATURES.map((feature) => (
                <FeatureItem key={feature.title} {...feature} />
              ))}
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
