import type { Card } from "../schema/card";

function ensureFaviconHasHost({
  favicon,
  url,
}: Card): Pick<Card, "favicon"> | undefined {
  if (!favicon) {
    return undefined;
  }

  if (favicon.type !== "external") {
    return undefined;
  }

  const faviconUrl = new URL(favicon.value, url);

  return {
    favicon: {
      type: "external",
      value: faviconUrl.toString(),
    },
  };
}

function ensureHostIsDefined({
  host,
  url,
}: Card): Pick<Card, "host"> | undefined {
  if (host) {
    return undefined;
  }

  const parsedUrl = new URL(url);

  return {
    host: parsedUrl.hostname,
  };
}

/**
 * Resolve some {@linkcode card} properties to make them better-suited for rendering
 *
 * - Define a `host` from the `url` if it's not provided
 * - Inject a hostname into `favicon` if it's missing
 */
export function enhanceCard(card: Card): Card {
  return {
    ...card,
    ...ensureFaviconHasHost(card),
    ...ensureHostIsDefined(card),
  };
}
