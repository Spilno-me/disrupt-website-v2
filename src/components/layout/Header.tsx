import { Link, useLocation } from 'react-router-dom'
import { Header as DdsHeader, NavItem } from '@adrozdenko/design-system'
import { COMPANY_INFO } from '@/constants/appConstants'
import { scrollToElement, scrollToElementWithDelay, smoothScrollToTop } from '@/utils/navigation'
import { useIsMobile } from '@/hooks/useIsMobile'
import { GLASS_CLASSES } from '@disrupt/design-system'

interface HeaderProps {
  showContactButton?: boolean
  onContactClick?: () => void
  onLogoClick?: () => void
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'Product', path: '/product' },
  { label: 'About', path: '/about' },
]

export function Header({
  showContactButton = true,
  onContactClick,
  onLogoClick
}: HeaderProps) {
  const location = useLocation()
  const isMobile = useIsMobile()

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

  // Add isActive flag to nav items based on current route
  const navItemsWithActive = NAV_ITEMS.map(item => ({
    ...item,
    isActive: location.pathname === item.path
  }))

  // Custom renderer for nav links using React Router
  const renderNavLink = (item: NavItem, children: React.ReactNode) => (
    <Link to={item.path}>
      {children}
    </Link>
  )

  // Custom renderer for contact button using React Router
  const renderContactLink = (children: React.ReactNode) => (
    <Link to="/#contact" onClick={handleContactClick}>
      {children}
    </Link>
  )

  return (
    <DdsHeader
      navItems={navItemsWithActive}
      showContactButton={showContactButton}
      contactButtonText="Let's talk"
      contactButtonPath="/#contact"
      logoAlt={COMPANY_INFO.FULL_NAME}
      showLogoTagline={true}
      onLogoClick={handleLogoClick}
      onContactClick={handleContactClick}
      renderNavLink={renderNavLink}
      renderContactLink={renderContactLink}
    />
  )
}
