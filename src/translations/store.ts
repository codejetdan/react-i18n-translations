import { action, createStore } from "easy-peasy";
import { getMessages } from "./config";
import { Locale, TranslationsStore } from "./types";


// define the app default languge
const defaultLocale = Locale.English;

export const translationsStore = createStore<TranslationsStore>({
  locale: defaultLocale, 

  // get the translations for default locale
  translations: getMessages(defaultLocale),

  selectLanguage: action<TranslationsStore, Locale>((state, locale) => {
    
    // let's mutate the state! 😄
    state.locale = locale
    state.translations = getMessages(locale)
  })
});
