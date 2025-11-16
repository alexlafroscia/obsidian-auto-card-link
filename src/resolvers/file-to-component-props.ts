import { App, Keymap, TFile } from "obsidian";
import { of as maybeOf } from "true-myth/maybe";
import Result from "true-myth/result";
import Task, { fromPromise } from "true-myth/task";
import { fromMaybe } from "true-myth/toolbelt";

import { FileCardProps } from "../components/file-card";
import type { FileEmbedContents } from "../schema/code-block-contents";
import { parseCard } from "../schema/card";

import { enhanceCard } from "./card";
import { resolveImageProperties } from "./image-link";

export function resolveFileReference(
  value: FileEmbedContents,
  app: App,
): Result<TFile, string> {
  const { file: identifier } = value;

  const sourceFile = maybeOf(app.workspace.getActiveFile());
  const file =
    typeof identifier === "string"
      ? sourceFile
      : sourceFile.andThen(({ path }) =>
          maybeOf(
            app.metadataCache.getFirstLinkpathDest(identifier.value, path),
          ),
        );

  return fromMaybe(`Could not resolve file \`${file}\``, file);
}

export function makeOnClickHandler(file: TFile, app: App) {
  return function (event: MouseEvent) {
    app.workspace.getLeaf(Keymap.isModEvent(event)).openFile(file);
  };
}

export function resolveFileCardProps(
  file: TFile,
  app: App,
): Task<FileCardProps, string> {
  const resolveFrontmatter = new Promise<{ url: string }>((resolve) => {
    app.fileManager.processFrontMatter(file, (frontmatter) => {
      resolve(frontmatter);
    });
  });
  const resolveFrontmatterTask = fromPromise(resolveFrontmatter).mapRejected(
    () => `Frontmatter could not be resolved`,
  );

  return (
    resolveFrontmatterTask
      // Extract card props from file frontmatter
      .andThen((frontmatter) =>
        parseCard({
          title: file.basename,
          ...frontmatter,
        }),
      )
      .map((card) => ({
        ...enhanceCard(card),
        ...resolveImageProperties(card, app),
        onClick: makeOnClickHandler(file, app),
      }))
  );
}
