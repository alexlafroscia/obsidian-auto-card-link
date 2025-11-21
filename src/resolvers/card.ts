import { just } from "true-myth/maybe";
import { ok } from "true-myth/result";

import type { Card } from "../schema/card";

function ensureHostIsDefined({
  host: hostResult,
  url: urlResult,
}: Card): Pick<Card, "host"> {
  return {
    host: hostResult
      // If the host does not have an error...
      .andThen((maybeHost) =>
        maybeHost.match({
          Just: (host) => ok(just(host)),
          // ... but is not defined...
          Nothing: () =>
            // ... try to parse the host from the url
            urlResult.map((maybeUrl) =>
              maybeUrl.map((urlString) => {
                const url = new URL(urlString);

                return url.hostname;
              }),
            ),
        }),
      ),
  };
}

/**
 * Resolve some {@linkcode card} properties to make them better-suited for rendering
 *
 * - Define a `host` from the `url` if it's not provided
 */
export function enhanceCard(card: Card): Card {
  return {
    ...card,
    ...ensureHostIsDefined(card),
  };
}
