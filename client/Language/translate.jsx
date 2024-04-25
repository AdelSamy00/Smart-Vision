import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations1 from './en.json';
import arTranslations1 from './ar.json';
import enTranslations2 from './en1.json';
import arTranslations2 from './ar1.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { 
        translation: { 
          ...enTranslations1,
          ...enTranslations2,
        }
      },
      ar: { 
        translation: { 
          ...arTranslations1,
          ...arTranslations2,
        }
      },
    },
    debugger:true,
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
