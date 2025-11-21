import * as z from "zod/mini";
import { parserFor } from "true-myth/standard-schema";

import { CardStructure } from "./card-structure";
import { InternalLink } from "./internal-link";

export const FileEmbedContents = z.object({
  file: z.union([z.literal("self"), InternalLink]),
});

export type FileEmbedContents = z.infer<typeof FileEmbedContents>;

export const CodeblockContents = z.union([
  // ...or a pointer to a file to read the metadata from
  FileEmbedContents,
  // The codeblock can contain either the direct description of the card...
  CardStructure,
]);

export type CodeblockContents = z.infer<typeof CodeblockContents>;

export const parseCodeblockContents = parserFor(CodeblockContents);
