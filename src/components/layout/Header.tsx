import { Link, useLocation } from 'react-router-dom'
import { AnimatedLogo } from '@/components/ui/AnimatedLogo'
import { COMPANY_INFO } from '@/constants/appConstants'
import { scrollToElement, scrollToElementWithDelay, smoothScrollToTop } from '@/utils/navigation'
import { MobileMenu } from '@/components/ui/mobile-menu'
import { ElectricButtonWrapper } from '@disrupt/design-system'
import { useIsMobile } from '@/hooks/useIsMobile'
import { GLASS_CLASSES } from '@disrupt/design-system'

interface HeaderProps {
  showContactButton?: boolean
  onContactClick?: () => void
  onLogoClick?: () => void
}

const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'Product', path: '/product' },
  { label: 'About', path: '/about' },
] as const

export function Header({
  showContactButton = true,
  onContactClick,
  onLogoClick
}: HeaderProps) {
  const location = useLocation()
  const isMobile = useIsMobile()

  // Always use dark text on light background
  const navTextColor = 'text-dark'
  const colorMode = 'dark'

  const handleLogoClick = () => {
    if (onLogoClick) {
      onLogoClick()
      return
    }

    // Always scroll to top of current page
    if (isMobile) {
      smoothScrollToTop()
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleContactClick = (e: React.MouseEvent) => {
    const contactElement = document.getElementById('contact')

    // If contact section exists on current page, scroll to it instead of navigating
    if (contactElement) {
      e.preventDefault()

      if (onContactClick) {
        onContactClick()
      } else if (isMobile) {
        scrollToElementWithDelay('contact')
      } else {
        scrollToElement('contact')
      }
    }
    // If no contact section, let the Link navigate to /#contact
  }

  const isActiveRoute = (path: string) => {
    return location.pathname === path
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 ${GLASS_CLASSES.header}`}
      data-element="main-header"
    >
      <nav
        className="flex items-center gap-4 py-4 px-4 sm:px-6"
        data-element="header-nav"
      >
        <div className="w-full max-w-[1440px] mx-auto flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center overflow-visible" data-element="header-logo">
            <AnimatedLogo
              className="h-[54px] w-[178px] cursor-pointer overflow-visible"
              onClick={handleLogoClick}
              alt={COMPANY_INFO.FULL_NAME}
              colorMode={colorMode}
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-5">
            <div className="flex items-center gap-1">
              {NAV_ITEMS.map((item) => {
                const isActive = isActiveRoute(item.path)
                return (
                  <ElectricButtonWrapper key={item.path} className="nav-item" isActive={isActive} colorMode={colorMode}>
                    <Link
                      to={item.path}
                      className={`h-9 px-4 py-2 rounded-sm text-sm font-sans font-medium leading-[1.43] transition-colors flex items-center justify-center gap-2 cursor-pointer ${navTextColor} ${
                        isActive ? '' : 'hover:bg-white/10'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </ElectricButtonWrapper>
                )
              })}
            </div>

            {/* Contact Button */}
            {showContactButton && (
              <ElectricButtonWrapper colorMode={colorMode}>
                <Link
                  to="/#contact"
                  onClick={handleContactClick}
                  className="h-9 px-4 py-2 rounded-sm text-sm font-sans font-medium leading-[1.43] flex items-center justify-center gap-2 transition-colors bg-dark text-white hover:bg-teal-800 cursor-pointer"
                >
                  Contact us
                </Link>
              </ElectricButtonWrapper>
            )}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <MobileMenu onItemClick={() => {}}>
              <div className="flex flex-col gap-2 mb-4">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`px-4 py-3 rounded-sm text-base font-medium cursor-pointer ${
                      isActiveRoute(item.path)
                        ? 'bg-teal/10 text-teal'
                        : 'text-dark hover:bg-white/10'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              {/* Mobile Contact Button */}
              {showContactButton && (
                <ElectricButtonWrapper className="w-full">
                  <Link
                    to="/#contact"
                    onClick={handleContactClick}
                    className="w-full h-11 px-4 py-2 rounded-sm text-base font-medium cursor-pointer bg-dark text-white hover:bg-teal-800 transition-colors flex items-center justify-center"
                  >
                    Contact us
                  </Link>
                </ElectricButtonWrapper>
              )}
            </MobileMenu>
          </div>
        </div>
      </nav>
    </header>
  )
}
