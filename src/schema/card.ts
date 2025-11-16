import * as z from "zod/mini";

import { makeSchemaParser } from "./make-schema-parser";
import { ImageLink } from "./image-link";

export const Card = z.object({
  title: z.string("A title must be provided"),
  url: z.string("A URL must be provided"),
  description: z.optional(z.coerce.string()),
  image: z.optional(ImageLink),
  host: z.optional(z.string()),
  favicon: z.optional(ImageLink),
});

export type Card = z.infer<typeof Card>;

export const parseCard = makeSchemaParser(Card);
