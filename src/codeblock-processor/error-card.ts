import { MarkdownRenderChild } from "obsidian";

import Error, { type Props } from "../components/Error.svelte";
import { SvelteComponentChild } from "../svelte-component-child";

import type { RenderingContext } from ".";

export type { Props };

export class ErrorCodeblockRenderer extends MarkdownRenderChild {
  constructor(props: Props, context: RenderingContext) {
    super(context.containerEl);

    this.addChild(
      new SvelteComponentChild(Error, {
        target: context.containerEl,
        props,
      }),
    );
  }
}
