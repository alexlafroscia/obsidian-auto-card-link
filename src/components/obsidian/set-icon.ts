import type { Action } from "svelte/action";
import { type IconName, setIcon as baseSetIcon } from "obsidian";

export const setIcon: Action<HTMLElement, IconName> = (element, iconName) => {
  baseSetIcon(element, iconName);
};
