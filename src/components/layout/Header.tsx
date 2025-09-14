import logoImage from '@/assets/D_Pixels_Logo.png'
import { COMPANY_INFO, UI_CONSTANTS } from '@/constants/appConstants'
import { navigateToHome, scrollToElement } from '@/utils/navigation'
import { useTranslation } from '@/hooks/useI18n'
import { LanguageSwitcher } from '@/components/ui/language-switcher'
import { MobileMenu } from '@/components/ui/mobile-menu'
import { MobileLanguageSelector } from '@/components/ui/mobile-language-selector'

interface HeaderProps {
  showContactButton?: boolean
  onContactClick?: () => void
  onLogoClick?: () => void
}

export function Header({ 
  showContactButton = false, 
  onContactClick, 
  onLogoClick 
}: HeaderProps) {
  const { t } = useTranslation()
  
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

  return (
    <header 
      className={`glass-header chevron-pattern ${UI_CONSTANTS.HEADER_HEIGHT} fixed-header relative`}
      data-element="main-header"
    >
      <nav 
        className={`container mx-auto h-full flex items-center justify-between ${UI_CONSTANTS.CONTAINER_PADDING}`} 
        data-element="header-nav"
      >
        <div className="flex items-center" data-element="header-logo">
          <img 
            src={logoImage} 
            alt={COMPANY_INFO.FULL_NAME} 
            className="h-12 cursor-pointer" 
            onClick={handleLogoClick}
          />
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
          {showContactButton && (
            <div data-element="header-contact-button">
              <button 
                onClick={handleContactClick}
                className="bg-[#10b981] text-white md:bg-[#E6E8E6] md:text-black md:hover:bg-[#10b981] md:hover:text-white contact-button"
              >
                {t('header.bookCall')}
              </button>
            </div>
          )}
          
          <LanguageSwitcher />
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <MobileMenu onItemClick={() => {}}>
            {showContactButton && (
              <button 
                onClick={handleContactClick}
                className="w-full contact-button-mobile text-center"
              >
                {t('header.bookCall')}
              </button>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3 text-start">
                {t('header.language')}
              </label>
              <MobileLanguageSelector />
            </div>
          </MobileMenu>
        </div>
      </nav>
    </header>
  )
}
