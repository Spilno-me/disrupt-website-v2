import { ReactNode, useCallback } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

interface NavItem {
  label: string
  path: string
  isActive?: boolean
}

/**
 * Hook that provides router-aware navigation functions for DDS Header/PageLayout components.
 * This enables SPA navigation without full page reloads.
 */
export function useRouterNavigation() {
  const location = useLocation()
  const navigate = useNavigate()

  // Render nav links using React Router's Link component
  const renderNavLink = useCallback(
    (item: NavItem, children: ReactNode) => {
      // Handle hash links (e.g., /#contact)
      if (item.path.includes('#')) {
        const [basePath, hash] = item.path.split('#')
        const targetPath = basePath || '/'

        // If we're already on the target page, just scroll to the hash
        if (location.pathname === targetPath) {
          return (
            <a
              href={item.path}
              onClick={(e) => {
                e.preventDefault()
                const element = document.getElementById(hash)
                element?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              {children}
            </a>
          )
        }

        // Otherwise navigate to the page with hash
        return (
          <Link to={item.path}>
            {children}
          </Link>
        )
      }

      // Regular route links
      return (
        <Link to={item.path}>
          {children}
        </Link>
      )
    },
    [location.pathname]
  )

  // Render contact link (handles hash navigation to #contact)
  const renderContactLink = useCallback(
    (children: ReactNode) => {
      const contactPath = '/#contact'
      const [basePath, hash] = contactPath.split('#')
      const targetPath = basePath || '/'

      // If we're on the home page, scroll to contact section
      if (location.pathname === targetPath) {
        return (
          <a
            href={contactPath}
            onClick={(e) => {
              e.preventDefault()
              const element = document.getElementById(hash)
              element?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            {children}
          </a>
        )
      }

      // Otherwise navigate to home page with hash
      return (
        <Link to={contactPath}>
          {children}
        </Link>
      )
    },
    [location.pathname]
  )

  // Handle logo click - navigate to home
  const onLogoClick = useCallback(() => {
    navigate('/')
  }, [navigate])

  // Get nav items with active state based on current route
  const getNavItemsWithActiveState = useCallback(
    (navItems: NavItem[]) => {
      return navItems.map((item) => ({
        ...item,
        isActive: location.pathname === item.path,
      }))
    },
    [location.pathname]
  )

  return {
    renderNavLink,
    renderContactLink,
    onLogoClick,
    getNavItemsWithActiveState,
    currentPath: location.pathname,
  }
}
