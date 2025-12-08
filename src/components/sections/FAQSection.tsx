import { COLORS, GridBlobBackground, Card, Accordion } from '@adrozdenko/design-system'
import type { AccordionItem } from '@adrozdenko/design-system'

// =============================================================================
// DATA
// =============================================================================

const FAQ_ITEMS: AccordionItem[] = [
  {
    question: 'How does migration from legacy systems work?',
    answer: 'Our migration team works with you to map your existing data structures, workflows, and configurations. We provide automated migration tools and dedicated support to ensure a smooth transition with minimal disruption to your operations. Most migrations complete within 4-8 weeks depending on complexity.',
  },
  {
    question: 'Is my data secure and resilient? Where is it stored?',
    answer: 'Your data is encrypted at rest and in transit using industry-standard AES-256 encryption. We use geo-redundant cloud infrastructure with automatic failover. Data is stored in SOC 2 Type II certified data centers, and you can choose your preferred region for data residency compliance.',
  },
  {
    question: 'Can I customize workflows without coding?',
    answer: 'Yes. The Creator tier (or Tier 3 Agents) allows for natural language prompts to generate mobile forms, flows, and dashboards instantly. Describe what you need, and the agent builds the form logic for you instantly.',
  },
  {
    question: 'What support is included?',
    answer: 'All tiers include access to our knowledge base, community forums, and email support. Higher tiers unlock priority support channels, dedicated success managers, and 24/7 phone support for critical issues.',
  },
  {
    question: 'How does the AI pricing work?',
    answer: 'Unlike competitors who charge per AI task or API call, our flat-rate model means unlimited AI usage is included in your per-user fee. No surprises, no overage charges—just predictable monthly costs regardless of how much AI you use.',
  },
]

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function FAQSection() {
  return (
    <section
      className="py-8 sm:py-12 lg:py-16 relative"
      data-element="faq-section"
    >
      <GridBlobBackground scale={1.5} />
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 relative z-[1]">
        {/* Dashed separator */}
        <div className="max-w-[900px] mx-auto mb-10">
          <div className="border-t-2 border-dashed border-teal/40" />
        </div>

        <div className="max-w-[620px] mx-auto">
          {/* Header */}
          <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-display font-bold leading-[1.2] text-left lg:text-center text-dark mb-10">
            FAQs
          </h2>

          {/* Accordion */}
          <Card variant="pricing" shadow="sm" style={{ borderColor: COLORS.teal }}>
            <Accordion
              items={FAQ_ITEMS}
              defaultOpenIndex={2}
              borderColor={COLORS.teal}
            />
          </Card>
        </div>
      </div>
    </section>
  )
}
