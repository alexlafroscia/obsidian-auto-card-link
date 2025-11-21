import type { Action } from "svelte/action";
import { type TooltipOptions, setTooltip as baseSetTooltip } from "obsidian";

type SetTooltipProps = [string, TooltipOptions?] | string;

export const setTooltip: Action<HTMLElement, SetTooltipProps> = (
  element,
  props,
) => {
  if (typeof props === "string") {
    props = [props];
  }

  baseSetTooltip(element, ...props);
};
