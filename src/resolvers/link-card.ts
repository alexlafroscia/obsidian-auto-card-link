import { App } from "obsidian";
import Result, { ok } from "true-myth/result";

import type { ExternalLinkProps as FullExternalLinkProps } from "../components/link-card";
import { resolveImageLink } from "./image-link";
import { LinkEmbedContents } from "../schema/code-block-contents";

type ExternalLinkProps = Omit<FullExternalLinkProps, "indent">;

export function resolveLinkCardProps(
  contents: LinkEmbedContents,
  app: App,
): Result<ExternalLinkProps, string> {
  return ok({
    ...contents,

    image: contents.image
      ? resolveImageLink(contents.image, app).unwrapOr(undefined)
      : undefined,
    favicon: contents.favicon
      ? resolveImageLink(contents.favicon, app).unwrapOr(undefined)
      : undefined,
  });
}
