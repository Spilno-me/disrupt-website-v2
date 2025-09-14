import logoImage from '@/assets/D - logo-dark.png'
import { COMPANY_INFO, NAVIGATION } from '@/constants/appConstants'
import { scrollToTop } from '@/utils/navigation'
import { useTranslation } from '@/hooks/useI18n'

export function Footer() {
  const { t } = useTranslation()

  return (
    <footer 
      className="flex flex-col items-center pb-5 border-custom-dash-t footer-background" 
      data-element="main-footer"
    >
      <div
        className="container mx-auto flex flex-col items-center gap-6 py-0 px-6"
        data-element="footer-container"
      >
        <div
          className="flex flex-col items-start gap-2.5 w-[122px] h-[32px]"
          data-element="footer-spacer"
        />

        <div
          className="cursor-pointer -mt-2"
          onClick={scrollToTop}
          data-element="footer-logo"
        >
          <img
            src={logoImage}
            alt={`${COMPANY_INFO.NAME} Logo`}
            className="h-6 rounded-[10px]"
          />
        </div>
        
        <div
          className="flex flex-col sm:flex-row justify-between items-center w-full max-w-[1232px] gap-4 sm:gap-21"
          data-element="footer-content"
        >
          <p className="text-muted-foreground text-sm font-medium text-center sm:text-left">
            Copyright {COMPANY_INFO.COPYRIGHT_YEAR} © {COMPANY_INFO.WEBSITE}
          </p>

          <div className="flex items-center gap-4 sm:gap-8" data-element="footer-links">
            <a
              href={NAVIGATION.PRIVACY_POLICY}
              className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium underline"
            >
              {t('footer.legal.privacy')}
            </a>
            <a
              href={NAVIGATION.TERMS_OF_SERVICE}
              className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium underline"
            >
              {t('footer.legal.terms')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
