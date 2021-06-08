// import JSON translations files
import englishMessages from '../lang/en.json';
import spanishMessages from '../lang/es.json';
import polishMessages from '../lang/pl.json';
import { AllMessages, AppTranslations, Locale } from './types';

// list of supported languages using defined `Locale` enum
export const languages = [
  {
    locale: Locale.English,
    name: 'English',
  },
  {
    locale: Locale.Spanish,
    name: 'Spanish',
  },
  {
    locale: Locale.Polish,
    name: 'Polish',
  },
];

// Let's check if the locale that we want to use, is supported
// e.g. retrieving it from `localStorage` - get ready for the next steps 🤗
export const isSupportedLocale = (locale?: string) =>
  Boolean(languages.find(language => language.locale === locale));

const messages: AllMessages = {
  [Locale.English]: englishMessages,
  [Locale.Spanish]: spanishMessages,
  [Locale.Polish]: polishMessages,
};

export const getMessages = (locale: Locale): AppTranslations =>
  (isSupportedLocale(locale) && messages[locale]) || englishMessages


// todo: next step 😄
// export const getUserLocale = (): string => {
//   try {
//     const persistedLocale = localStorage.getItem('locale');

//     return typeof persistedLocale === 'string' && isSupportedLocale(persistedLocale)
//       ? persistedLocale
//       : navigator?.language?.split(/[-_]/)[0];
//   } catch {
//     return Locale.English;
//   }
// };