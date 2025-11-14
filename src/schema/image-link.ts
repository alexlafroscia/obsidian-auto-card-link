import * as z from "zod/mini";

import { InternalLink } from "./internal-link";

export const InternalImageLink = z.codec(
  InternalLink,
  z.object({
    type: z.literal("internal"),
    value: z.string(),
  }),
  {
    decode(value) {
      return { type: "internal" as const, value };
    },
    encode(value) {
      return `"[[${value}]]"`;
    },
  },
);

export const ExternalImageLink = z.codec(
  z.url("Value must be a URL"),
  z.object({
    type: z.literal("external"),
    value: z.url(),
  }),
  {
    decode(value) {
      return { type: "external" as const, value };
    },
    encode({ value }) {
      return value;
    },
  },
);

export const ImageLink = z.union(
  [InternalImageLink, ExternalImageLink],
  "Value must be an external image URL or an internal image link",
);

export type ImageLink = z.infer<typeof ImageLink>;
