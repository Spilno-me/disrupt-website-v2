import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ChevronDown } from 'lucide-react'
import { COLORS } from '@/constants/designTokens'
import { GridBlobBackground } from '@/components/ui/GridBlobCanvas'

// =============================================================================
// TYPES
// =============================================================================

interface FAQItem {
  question: string
  answer: string
}

// =============================================================================
// DATA
// =============================================================================

const FAQ_ITEMS: FAQItem[] = [
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
// ACCORDION ITEM COMPONENT
// =============================================================================

interface AccordionItemProps {
  item: FAQItem
  isOpen: boolean
  onToggle: () => void
  isLast?: boolean
}

function AccordionItem({ item, isOpen, onToggle, isLast = false }: AccordionItemProps) {
  return (
    <div className={isLast ? '' : 'border-b border-dashed border-teal'}
      <button
        className="w-full flex items-center justify-between py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-teal rounded-md"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span
          className="font-sans font-medium text-sm pr-4"
          style={{ color: '#341E63' }}
        >
          {item.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0"
        >
          <ChevronDown
            className="w-5 h-5"
            style={{ color: COLORS.muted }}
          />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p
              className="pb-4 font-sans text-sm leading-relaxed"
              style={{ color: '#341E63' }}
            >
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(2) // Third item open by default

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

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
            Frequently Asked Questions
          </h2>

          {/* Accordion */}
          <div className="bg-white rounded-lg">
            {FAQ_ITEMS.map((item, index) => (
              <AccordionItem
                key={item.question}
                item={item}
                isOpen={openIndex === index}
                onToggle={() => handleToggle(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
