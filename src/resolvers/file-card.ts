import { App, Keymap } from "obsidian";
import Task, { fromPromise, reject } from "true-myth/task";
import { ok } from "true-myth/result";

import {
  type FileEmbedContents,
  parseLinkEmbedContents,
} from "../schema/code-block-contents";
import type { InternalLinkProps as FullInternalLinkProps } from "../components/link-card";
import { resolveImageLink } from "./image-link";

type InternalLinkProps = Omit<FullInternalLinkProps, "indent">;

export function resolveFileCardProps(
  value: FileEmbedContents,
  app: App,
): Task<InternalLinkProps, string> {
  const { file } = value;

  const sourceFile = app.workspace.getActiveFile();
  const referencedFile = app.metadataCache.getFirstLinkpathDest(
    file,
    sourceFile!.path,
  );

  if (!referencedFile) {
    return reject(`Could not resolve file \`${file}\``);
  }

  const resolveFrontmatter = new Promise<{ url: string }>((resolve) => {
    app.fileManager.processFrontMatter(referencedFile, (frontmatter) => {
      resolve(frontmatter);
    });
  });
  const resolveFrontmatterTask = fromPromise(resolveFrontmatter).mapRejected(
    () => `Frontmatter could not be resolved`,
  );

  return resolveFrontmatterTask
    .andThen((frontmatter) =>
      parseLinkEmbedContents({
        title: referencedFile.basename,
        ...frontmatter,
      }),
    )
    .andThen((contents) => {
      return ok({
        ...contents,

        image: contents.image
          ? resolveImageLink(contents.image, app).unwrapOr(undefined)
          : undefined,
        favicon: contents.favicon
          ? resolveImageLink(contents.favicon, app).unwrapOr(undefined)
          : undefined,
      });
    })
    .map((linkProps) => ({
      ...linkProps,

      onClick: (event) => {
        app.workspace
          .getLeaf(Keymap.isModEvent(event))
          .openFile(referencedFile);
      },
    }));
}
