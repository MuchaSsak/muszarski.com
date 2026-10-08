import { DEFAULT_LOCALE, isLocale } from "@package/shared/locales";
import { defineMiddleware } from "astro:middleware";
import { setLinguiContext } from "lingui-for-astro";

import { getI18n } from "~/lib/i18n";
import { typoHtml } from "~/lib/typography";

/**
 * Request-scoped Lingui context from the `[locale]` route param (wiki: site/i18n.md § Lingui wiring).
 * Astro runs middleware once per prerendered page in a static build. Pages without the param
 * (root redirect, 404) render in the default locale. Every HTML page then gets the locale's line-break typography
 * (`typoHtml`: no one-letter word at a line end, number + unit together), whatever the text's source.
 */
export const onRequest = defineMiddleware(async (context, next) => {
  const param = context.params.locale;
  const locale = isLocale(param) ? param : DEFAULT_LOCALE;
  context.locals.locale = locale;
  setLinguiContext(context.locals, getI18n(locale));
  const response = await next();
  // The CV sheet is the PDF's source: it fits itself to two pages and its text layer is checked word for word.
  if (!response.headers.get("content-type")?.includes("text/html") || context.url.pathname.endsWith("/cv/print/")) {
    return response;
  }
  return new Response(typoHtml(locale, await response.text()), response);
});
