import { Link, useLocation } from 'react-router-dom'
import { AnimatedLogo } from '@/components/ui/AnimatedLogo'
import { COMPANY_INFO } from '@/constants/appConstants'
import { navigateToHome, scrollToElement } from '@/utils/navigation'
import { MobileMenu } from '@/components/ui/mobile-menu'
import { COLORS } from '@/constants/designTokens'

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
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-[10px] bg-[rgba(251,251,243,0.3)] border-b border-[#08A4BD] shadow-[0px_2px_4px_5px_rgba(0,0,0,0.15)]"
      data-element="main-header"
    >
      {/* Figma: padding 16px, gap 16px */}
      <nav
        className="flex items-center gap-4 p-4"
        data-element="header-nav"
      >
        {/* Figma: Container width 1359px, justify-between, gap 16px */}
        <div className="w-full max-w-[1359px] mx-auto flex items-center justify-between gap-4">
          {/* Logo - Figma: 178x54px, border-radius 10px */}
          <div className="flex items-center" data-element="header-logo">
            <AnimatedLogo
              className="h-[54px] w-[178px] rounded-[12px]"
              onClick={handleLogoClick}
              alt={COMPANY_INFO.FULL_NAME}
            />
          </div>

          {/* Desktop Navigation - Figma: Flex, gap 20px */}
          <div className="hidden md:flex items-center gap-5">
            {/* Nav Links - Figma: Flex, gap 4px */}
            <div className="flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`h-9 px-4 py-2 rounded-[8px] text-sm font-sans font-medium leading-[1.43] transition-colors flex items-center justify-center gap-2 ${
                    isActiveRoute(item.path)
                      ? 'text-[#08A4BD]'
                      : 'text-[#2D3142] hover:bg-white/10'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Contact Button */}
            {showContactButton && (
              <button
                onClick={handleContactClick}
                className="h-9 px-4 py-2 rounded-[12px] text-sm font-sans font-medium leading-[1.43] flex items-center justify-center gap-2 transition-colors hover:opacity-90 bg-[#2D3142] text-white"
              >
                Contact us
              </button>
            )}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <MobileMenu onItemClick={() => {}}>
              {/* Mobile Nav Links */}
              <div className="flex flex-col gap-2 mb-4">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`px-4 py-3 rounded-[8px] text-base font-medium cursor-pointer ${
                      isActiveRoute(item.path)
                        ? 'bg-[#08A4BD]/10 text-[#08A4BD]'
                        : 'text-[#2D3142] hover:bg-white/10'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              {/* Mobile Contact Button */}
              {showContactButton && (
                <button
                  onClick={handleContactClick}
                  className="w-full h-9 px-4 py-2 rounded-[12px] text-[14px] font-medium cursor-pointer bg-[#2D3142] text-white"
                >
                  Contact us
                </button>
              )}
            </MobileMenu>
          </div>
        </div>
      </nav>
    </header>
  )
}
