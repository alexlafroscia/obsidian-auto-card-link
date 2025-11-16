import { App, parseYaml } from "obsidian";
import { fromResult } from "true-myth/task";

import { parseCodeblockContents } from "./schema/code-block-contents";

import { createFileCard } from "./components/file-card";
import { createLinkCard } from "./components/link-card";
import { createErrorCard } from "./components/error-card";

import {
  resolveFileCardProps,
  resolveFileReference,
} from "./resolvers/file-to-component-props";
import { resolveComponentPropsFromCard } from "./resolvers/card-to-component-props";

function measureIndent(source: string): number {
  let indent = -1;
  source = source
    .split(/\r?\n|\r|\n/g)
    .map((line) =>
      line.replace(/^\t+/g, (tabs) => {
        const n = tabs.length;
        if (indent < 0) {
          indent = n;
        }
        return " ".repeat(n);
      }),
    )
    .join("\n");

  return indent;
}

export class CodeBlockProcessor {
  app: App;

  constructor(app: App) {
    this.app = app;
  }

  async run(source: string, el: HTMLElement) {
    const cardElement = await fromResult(this.parseCodeBlock(source))
      .andThen((contents) => {
        if ("file" in contents) {
          return fromResult(resolveFileReference(contents, this.app))
            .andThen((file) => resolveFileCardProps(file, this.app))
            .map((fileProps) => createFileCard(fileProps));
        } else {
          return resolveComponentPropsFromCard(contents, this.app).map(
            (cardProps) =>
              createLinkCard({
                ...cardProps,
                indent: measureIndent(source),
              }),
          );
        }
      })
      .match({
        Resolved: (element) => element,
        Rejected: (error) => createErrorCard(error),
      });

    el.appendChild(cardElement);
  }

  private parseCodeBlock(source: string) {
    const json = parseYaml(source);

    return parseCodeblockContents(json);
  }
}
