import * as z from "zod/mini";

import { Card } from "./card";
import { makeSchemaParser } from "./make-schema-parser";
import { InternalLink } from "./internal-link";

export const FileEmbedContents = z.object({
  file: z.union([z.literal("self"), InternalLink]),
});

export type FileEmbedContents = z.infer<typeof FileEmbedContents>;

export const CodeblockContents = z.union([
  // The codeblock can contain either the direct description of the card...
  Card,
  // ...or a pointer to a file to read the metadata from
  FileEmbedContents,
]);

export type CodeblockContents = z.infer<typeof CodeblockContents>;

export const parseCodeblockContents = makeSchemaParser(CodeblockContents);
