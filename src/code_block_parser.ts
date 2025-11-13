import { parserFor } from "true-myth/standard-schema";

import { CodeblockContents } from "./types";

const codeblockContentsParser = parserFor(CodeblockContents);

export function parseLinkMetadataFromJSON(linkMetadata: unknown) {
  return codeblockContentsParser(linkMetadata);
}
