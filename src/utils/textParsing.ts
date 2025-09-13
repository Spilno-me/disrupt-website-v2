import { PRIVACY_POLICY_LINK_TEXT } from '@/i18n/constants'

export interface TextSegment {
  content: string
  isLink: boolean
}

export function parsePrivacyPolicyText(text: string): TextSegment[] {
  if (!containsPrivacyPolicyLink(text)) {
    return [{ content: text, isLink: false }]
  }

  return buildSegmentsFromText(text)
}

function containsPrivacyPolicyLink(text: string): boolean {
  return text.includes(PRIVACY_POLICY_LINK_TEXT)
}

function buildSegmentsFromText(text: string): TextSegment[] {
  const segments: TextSegment[] = []
  const parts = text.split(PRIVACY_POLICY_LINK_TEXT)
  
  for (let i = 0; i < parts.length; i++) {
    addTextSegmentIfNotEmpty(segments, parts[i])
    addLinkSegmentIfNotLast(segments, i, parts.length)
  }
  
  return segments
}

function addTextSegmentIfNotEmpty(segments: TextSegment[], text: string): void {
  if (text) {
    segments.push({ content: text, isLink: false })
  }
}

function addLinkSegmentIfNotLast(segments: TextSegment[], currentIndex: number, totalParts: number): void {
  if (currentIndex < totalParts - 1) {
    segments.push({ content: PRIVACY_POLICY_LINK_TEXT, isLink: true })
  }
}
