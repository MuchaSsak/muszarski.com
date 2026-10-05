import { DEFAULT_LOCALE, isLocale } from "@package/shared/locales";
import { defineMiddleware } from "astro:middleware";
import { setLinguiContext } from "lingui-for-astro";

import { getI18n } from "~/lib/i18n";

/**
 * Request-scoped Lingui context from the `[locale]` route param (wiki: site/i18n.md § Lingui wiring).
 * Astro runs middleware once per prerendered page in a static build. Pages without the param
 * (root redirect, 404) render in the default locale.
 */
export const onRequest = defineMiddleware((context, next) => {
  const param = context.params.locale;
  const locale = isLocale(param) ? param : DEFAULT_LOCALE;
  context.locals.locale = locale;
  setLinguiContext(context.locals, getI18n(locale));
  return next();
});
