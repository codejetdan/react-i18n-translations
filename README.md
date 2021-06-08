# 🌐 React Translations
In this cookbook we will implement quick and simple translations into the React project.
## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## How-to
### 1. Add necessary dependencies
  ```npm i -S react-intl @formatjs/cli```

### 2. Add your favourite state management library
Or just use the existing one.

```npm i -S easy-peasy```

  The translations state could be even persisted in `React.Context`.

### 3. Add translations `.json` files in `/src/lang/`

  ##### `/src/lang/en.json`:
    {
      "app.hi": "Hi!"
    }
    
  ##### `/src/lang/es.json`:
    {
      "app.hi": "¡Hola!"
    }

  ##### `/src/lang/pl.json`:
    {
      "app.hi": "Cześć!"
    }

### 4. Let's define how the types should look like (just omit this step for non-TS project 😅)
__`src/translations/types.ts`:__
  ```
  import { Action } from "easy-peasy"

  // supported languages and their locales codes
  // for non-TS project, it can be stored as object `const locale = { english: 'en', ...}`
  export enum Locale {
    English = 'en',
    Polish = 'pl',
    Spanish = 'es',
  }

  // yeah this is how we will store our messages
  // for every locale, there is one messages object from our JSON files
  export type AppTranslations = Record<string, string>
  export type AllMessages = Record<Locale, AppTranslations>

  export type TranslationsStore = {
    locale: Locale,
    messages: AllMessages,

    // easy-pasy action function takes the following params: 1. state object 2. the payload
    selectLanguage: Action<TranslationsStore, Locale>
  }
  ```

### 5. Create the translations config file
__`src/translations/config.ts`:__
  ```
  // import JSON translations files
  import englishMessages from '../lang/en.json';
  import spanishMessages from '../lang/es.json';
  import polishMessages from '../lang/pl.json';

  import { AllMessages, AppTranslations, Locale } from './types';

  // list of supported languages using defined `Locale` enumerator
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
  ```

### 6. Set-up the translations store
Of course you can use whatever lib/solution you want 😊

__`src/translations/store.ts`:__
  ```
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
  ```