import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from './en.json';
import arTranslations from './ar.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslations },
      ar: { translation: arTranslations },
    },
    lng: 'ar',
    fallbackLng: 'ar', // Default language if translation not available
    interpolation: {
        escapeValue: false, // React already escapes values
      },
      react: {
        useSuspense: false, // Set to true if you're using Suspense
      },
  });

export default i18n;
