import { NAVIGATION } from '@/constants/appConstants'
import { parsePrivacyPolicyText } from '@/utils/textParsing'

interface PrivacyPolicyLabelProps {
  text: string
}

export function PrivacyPolicyLabel({ text }: PrivacyPolicyLabelProps) {
  return (
    <>
      {parsePrivacyPolicyText(text).map((segment, index) => (
        segment.isLink ? (
          <a
            key={index}
            href={NAVIGATION.PRIVACY_POLICY}
            className="underline hover:no-underline"
          >
            {segment.content}
          </a>
        ) : (
          <span key={index}>{segment.content}</span>
        )
      ))}
    </>
  )
}
