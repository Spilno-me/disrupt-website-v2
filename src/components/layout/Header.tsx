import { Link, useLocation } from 'react-router-dom'
import { AnimatedLogo } from '@/components/ui/AnimatedLogo'
import { COMPANY_INFO } from '@/constants/appConstants'
import { navigateToHome, scrollToElement } from '@/utils/navigation'
import { MobileMenu } from '@/components/ui/mobile-menu'
import { ElectricButtonWrapper } from '@/components/ui/ElectricInput'

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

  const handleLogoClick = () => {
    if (onLogoClick) {
      onLogoClick()
    } else {
      navigateToHome()
    }
  }

  const handleContactClick = () => {
    if (onContactClick) {
      onContactClick()
    } else {
      scrollToElement('contact')
    }
  }

  const isActiveRoute = (path: string) => {
    return location.pathname === path
  }

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-[10px] bg-cream/30 border-b border-teal shadow-[0px_2px_4px_5px_rgba(0,0,0,0.15)]"
      data-element="main-header"
    >
      <nav
        className="flex items-center gap-4 p-4"
        data-element="header-nav"
      >
        <div className="w-full max-w-[1359px] mx-auto flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center" data-element="header-logo">
            <AnimatedLogo
              className="h-[54px] w-[178px] rounded-[12px] cursor-pointer"
              onClick={handleLogoClick}
              alt={COMPANY_INFO.FULL_NAME}
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-5">
            <div className="flex items-center gap-1">
              {NAV_ITEMS.map((item) => {
                const isActive = isActiveRoute(item.path)
                const link = (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`h-9 px-4 py-2 rounded-[8px] text-sm font-sans font-medium leading-[1.43] transition-colors flex items-center justify-center gap-2 cursor-pointer ${
                      isActive
                        ? 'text-muted bg-white/30 backdrop-blur-md'
                        : 'text-dark hover:bg-white/10'
                    }`}
                  >
                    {item.label}
                  </Link>
                )

                return isActive ? (
                  <div key={item.path}>{link}</div>
                ) : (
                  <ElectricButtonWrapper key={item.path} className="nav-item">
                    {link}
                  </ElectricButtonWrapper>
                )
              })}
            </div>

            {/* Contact Button */}
            {showContactButton && (
              <ElectricButtonWrapper>
                <Link
                  to="/#contact"
                  onClick={handleContactClick}
                  className="h-9 px-4 py-2 rounded-[12px] text-sm font-sans font-medium leading-[1.43] flex items-center justify-center gap-2 transition-colors hover:opacity-90 bg-dark text-white cursor-pointer"
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
                    className={`px-4 py-3 rounded-[8px] text-base font-medium cursor-pointer ${
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
                    className="w-full h-11 px-4 py-2 rounded-[12px] text-base font-medium cursor-pointer bg-dark text-white flex items-center justify-center"
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
