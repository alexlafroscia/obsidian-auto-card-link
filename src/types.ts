import * as z from "zod/mini";

const ObsidianQuotedInternalLink = z.pipe(
  z.stringFormat(
    "quoted-internal-link",
    (value) => {
      return value.startsWith("[[") && value.endsWith("]]");
    },
    {
      error: "Value must be an quoted Obsidian internal link",
    },
  ),
  z.transform((valueWithBrackets) => {
    return valueWithBrackets.replace("[[", "").replace("]]", "");
  }),
);

const ObsidianUnquotedInternalLink = z.pipe(
  z.tuple([z.tuple([z.string()])]),
  z.transform((value) => {
    const [[file]] = value;

    return file;
  }),
);

const ObsidianInternalLink = z.union([
  ObsidianQuotedInternalLink,
  ObsidianUnquotedInternalLink,
]);

export const FileMetadata = z.object({
  file: ObsidianInternalLink,
});

export type FileMetadata = z.infer<typeof FileMetadata>;

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

export const CodeblockContents = z.union([FileMetadata, LinkMetadata]);

export type CodeblockContents = z.infer<typeof CodeblockContents>;
