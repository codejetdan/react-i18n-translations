import { Action } from "easy-peasy"

// let's define supported languages and their locales codes
// for non-TS could be stored as object `const locale = { english: 'en', ...}`
export enum Locale {
  English = 'en',
  Polish = 'pl',
  Spanish = 'es',
}

export type AppTranslations = Record<string, string>

// this type looks weird, but yeah this is how we will store our messages
// for every locale, there is one messages object from our JSON files
export type AllMessages = Record<Locale, Record<string, string>>

export type TranslationsStore = {
  locale: Locale,
  translations: AppTranslations,
  selectLanguage: Action<TranslationsStore, Locale>
}