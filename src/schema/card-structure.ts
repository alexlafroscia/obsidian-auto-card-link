import * as z from "zod/mini";
import { parserFor } from "true-myth/standard-schema";

/**
 * Represents the "raw" representation of a card, as read directly
 * from the data source
 *
 * Each property is represented with an `any` type because the desired
 * behavior for rendering a card is to be as lenient as possible; failure
 * to parse one property does not need to prevent other properties from
 * being rendered.
 *
 * This behavior requires a two-step parsing solution:
 *
 * 1. The properties and their vaules are extracted from the data source,
 *    a process which can itself fail (if the data source is not an object)
 * 2. Each of the properties are parsed individually, which avoids an issue
 *    with one property preventing other, valid properties from being rendered
 *
 * E.g. If the `favicon` property is malformed, we don't want to prevent the
 * entire card from being rendered
 */
export const CardStructure = z.object({
  title: z.optional(z.any()),
  description: z.optional(z.any()),
  url: z.optional(z.any()),
  image: z.optional(z.any()),
  favicon: z.optional(z.any()),
});

export type CardStructure = z.infer<typeof CardStructure>;

export const parseCardStructure = parserFor(CardStructure);
