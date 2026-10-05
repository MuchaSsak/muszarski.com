import { type I18n, setupI18n } from "@lingui/core";
import { type Locale, LOCALES } from "@package/shared/locales";

import { messages as en } from "~/locales/en/messages.po";
import { messages as es } from "~/locales/es/messages.po";
import { messages as pl } from "~/locales/pl/messages.po";

/**
 * One cached Lingui instance per locale (wiki: site/i18n.md § Lingui wiring). Never a global
 * `activate()`: the static build renders all locales in one process, so every caller asks for the
 * instance of its own locale. `.po` files are compiled on import by `@lingui/vite-plugin`.
 */
const CATALOGS = { en, pl, es } satisfies Record<Locale, unknown>;
const cache = new Map<Locale, I18n>();

export function getI18n(locale: Locale): I18n {
  let i18n = cache.get(locale);
  if (!i18n) {
    i18n = setupI18n({ locale, messages: { [locale]: CATALOGS[locale] } });
    cache.set(locale, i18n);
  }
  return i18n;
}

export const allLocales = LOCALES;
