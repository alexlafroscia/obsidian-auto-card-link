import * as z from "zod/mini";

export const LinkMetadata = z.object({
  title: z.string("A title must be provided"),
  url: z.string("A URL must be provided"),
  description: z.optional(z.coerce.string()),
  image: z.optional(z.string()),
  host: z.optional(z.string()),
  favicon: z.optional(z.string()),
});

export type LinkMetadata = z.infer<typeof LinkMetadata>;

export interface LinkMetadataWithIndent extends LinkMetadata {
  indent: number;
}
