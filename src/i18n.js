import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import langEN from './lang/en.json'
import langES from './lang/es.json'

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    fallbackLng: 'en',
    detection: {
      order: ['localStorage', 'navigator']
    },
    resources: {
      en: {
        translation: langEN
      },
      es: {
        translation: langES
      }
    }
  })

export default i18next