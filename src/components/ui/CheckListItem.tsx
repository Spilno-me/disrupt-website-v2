import { Check } from 'lucide-react'

interface CheckListItemProps {
  /** Bold label text (e.g., "For Companies →") */
  label: string
  /** Description text following the label */
  text: string
  /** Whether the label should be bold (default: true) */
  boldLabel?: boolean
  /** Text color for the content (default: dark) */
  textColor?: 'dark' | 'muted'
}

/**
 * Reusable check list item with teal checkmark icon.
 * Used across WhoWeHelpSection, ProofSection, FutureCapabilitiesSection, etc.
 */
export function CheckListItem({
  label,
  text,
  boldLabel = true,
  textColor = 'dark',
}: CheckListItemProps) {
  const textColorClass = textColor === 'dark' ? 'text-[#2D3142]' : 'text-[#6B7280]'

  return (
    <div className="flex items-start gap-4">
      {/* Checkmark icon */}
      <Check
        className="w-6 h-6 text-[#08A4BD] flex-shrink-0 mt-1"
        strokeWidth={2.5}
      />

      {/* Text content */}
      <p className={`${textColorClass} text-lg leading-relaxed`}>
        {boldLabel ? (
          <>
            <span className="font-semibold">{label}</span> {text}
          </>
        ) : (
          <>
            {label} {text}
          </>
        )}
      </p>
    </div>
  )
}
