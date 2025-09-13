export interface TranslationKeys {
  hero: {
    title: string
    description: string
  }
  features: {
    title: string
    subtitle: string
    cards: {
      hours: {
        title: string
        description: string
      }
      costs: {
        title: string
        description: string
      }
      automation: {
        title: string
        description: string
      }
    }
  }
  contact: {
    form: {
      title: string
      subtitle: string
      labels: {
        name: string
        email: string
        company: string
        message: string
        placeholder: string
        privacyPolicy: string
      }
      button: {
        submit: string
        submitting: string
      }
      validation: {
        emailRequired: string
        emailInvalid: string
        companyRequired: string
        privacyRequired: string
      }
      messages: {
        successTitle: string
        successDescription: string
        errorTitle: string
        errorFallback: string
      }
    }
    info: {
      title: string
      subtitle: string
      contactLabel: string
      followLabel: string
      comingSoon: string
      emailSubject: string
    }
  }
  header: {
    logo: string
    bookCall: string
  }
  footer: {
    company: string
    description: string
    legal: {
      privacy: string
      terms: string
    }
    copyright: string
  }
  legal: {
    privacy: {
      title: string
      lastUpdated: string
      sections: {
        intro: string
        whoWeAre: {
          title: string
          content: string
        }
        scope: {
          title: string
          intro: string
          applies: string[]
          processor: string
        }
        dataCollected: {
          title: string
          intro: string
          types: string[]
        }
      }
    }
    terms: {
      title: string
      lastUpdated: string
    }
  }
}

export type SupportedLanguage = 'en' | 'es' | 'it' | 'ar' | 'fr'

export interface LanguageInfo {
  code: SupportedLanguage
  name: string
  nativeName: string
  dir: 'ltr' | 'rtl'
  flag: string
}

export interface I18nContextType {
  currentLanguage: SupportedLanguage
  setLanguage: (language: SupportedLanguage) => void
  t: (key: string) => string
  isRTL: boolean
  languages: LanguageInfo[]
}