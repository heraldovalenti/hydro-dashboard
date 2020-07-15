import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import XHR from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import translationEng from './locales/en/translation.js';
import translationEs from './locales/es/translation.js';

const resources = {
  en: {
    translation: translationEng,
  },
  es: {
    translation: translationEs,
  },
};

i18n
  .use(XHR)
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .init({
    resources,
    // lng: 'en',

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
