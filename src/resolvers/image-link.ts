import { App, getLinkpath } from "obsidian";
import Maybe, { just, nothing } from "true-myth/maybe";

import { ImageLink } from "../schema/image-link";

function resolveInternalImageLink(link: string, app: App): Maybe<string> {
  const imageRelativePath = app.metadataCache.getFirstLinkpathDest(
    getLinkpath(link),
    "",
  )?.path;

  if (!imageRelativePath) {
    return nothing<string>();
  }

  return just(app.vault.adapter.getResourcePath(imageRelativePath));
}

export function resolveImageLink(
  imageLink: ImageLink,
  app: App,
): Maybe<string> {
  switch (imageLink.type) {
    case "external":
      return just(imageLink.value);
    case "internal":
      return resolveInternalImageLink(imageLink.value, app);
  }
}
