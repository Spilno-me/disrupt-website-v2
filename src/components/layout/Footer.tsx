import { Link } from 'react-router-dom'
import { Footer as DdsFooter } from '@adrozdenko/design-system'
import { COMPANY_INFO, NAVIGATION } from '@/constants/appConstants'

// =============================================================================
// COMPONENT
// =============================================================================

export function Footer() {
  return (
    <DdsFooter
      companyName={COMPANY_INFO.WEBSITE}
      copyrightYear={COMPANY_INFO.COPYRIGHT_YEAR}
      rightContent={
        <div className="flex items-center gap-3 sm:gap-6 flex-wrap justify-center">
          <Link
            to={NAVIGATION.PRIVACY_POLICY}
            className="text-dark hover:text-teal transition-colors text-xs sm:text-sm font-medium"
          >
            Privacy Policy
          </Link>
          <Link
            to={NAVIGATION.TERMS_OF_SERVICE}
            className="text-dark hover:text-teal transition-colors text-xs sm:text-sm font-medium"
          >
            Terms of Service
          </Link>
        </div>
      }
    />
  )
}
