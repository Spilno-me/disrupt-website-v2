import { Link } from 'react-router-dom'
import { COMPANY_INFO, NAVIGATION } from '@/constants/appConstants'

// =============================================================================
// COMPONENT
// =============================================================================

export function Footer() {
  return (
    <footer
      className="fixed bottom-0 left-0 right-0 z-50 py-3 sm:py-4 backdrop-blur-[10px] bg-cream/30 border-t border-teal shadow-[0px_-2px_4px_5px_rgba(0,0,0,0.15)]"
      data-element="main-footer"
    >
      <div
        className="max-w-[1440px] mx-auto px-4 sm:px-6"
        data-element="footer-container"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-2 sm:gap-4">
          {/* Copyright */}
          <p className="text-dark text-xs sm:text-sm font-medium order-2 md:order-1">
            Copyright {COMPANY_INFO.COPYRIGHT_YEAR} © {COMPANY_INFO.WEBSITE}
          </p>

          {/* Links */}
          <div className="flex items-center gap-3 sm:gap-6 order-1 md:order-2 flex-wrap justify-center" data-element="footer-links">
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
        </div>
      </div>
    </footer>
  )
}
