import { LinkMetadata } from "./types";

export function parseLinkMetadataFromJSON(linkMetadata: any) {
  return LinkMetadata.safeParse(linkMetadata);
}
