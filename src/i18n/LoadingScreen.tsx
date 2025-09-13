import { TRANSLATION_FALLBACK_MESSAGES } from './constants'

const LOADING_SCREEN_CLASSES = 'flex items-center justify-center min-h-screen'
const LOADING_CONTENT_CLASSES = 'text-center'
const LOADING_TEXT_CLASSES = 'animate-pulse text-lg'

export function LoadingScreen(): JSX.Element {
  return (
    <div className={LOADING_SCREEN_CLASSES}>
      <div className={LOADING_CONTENT_CLASSES}>
        <div className={LOADING_TEXT_CLASSES}>
          {TRANSLATION_FALLBACK_MESSAGES.LOADING}
        </div>
      </div>
    </div>
  )
}
