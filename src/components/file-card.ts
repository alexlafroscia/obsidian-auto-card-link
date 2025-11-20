import { Notice, ButtonComponent } from "obsidian";

import type { CommonCardProps } from "./common";

export interface FileCardProps extends CommonCardProps {
  url?: string;

  onClick: (event: MouseEvent) => void;
}

/* === Card Creation === */

export function createFileCard(props: FileCardProps): HTMLElement {
  const containerEl = document.createElement("div");
  containerEl.addClass("auto-card-link-container");
  containerEl.setAttr("data-auto-card-link-depth", 0);

  const cardEl = document.createElement("div");
  cardEl.addClass("auto-card-link-card");
  cardEl.onClickEvent(props.onClick);
  containerEl.appendChild(cardEl);

  const mainEl = document.createElement("div");
  mainEl.addClass("auto-card-link-main");
  cardEl.appendChild(mainEl);

  const titleEl = document.createElement("div");
  titleEl.addClass("auto-card-link-title");
  titleEl.textContent = props.title;
  mainEl.appendChild(titleEl);

  if (props.description) {
    const descriptionEl = document.createElement("div");
    descriptionEl.addClass("auto-card-link-description");
    descriptionEl.textContent = props.description;
    mainEl.appendChild(descriptionEl);
  }

  const hostEl = document.createElement("div");
  hostEl.addClass("auto-card-link-host");
  mainEl.appendChild(hostEl);

  if (props.favicon) {
    const faviconEl = document.createElement("img");
    faviconEl.addClass("auto-card-link-favicon");
    faviconEl.setAttr("src", props.favicon);
    hostEl.appendChild(faviconEl);
  }

  if (props.host) {
    const hostNameEl = document.createElement("span");
    hostNameEl.textContent = props.host;
    hostEl.appendChild(hostNameEl);
  }

  if (props.image) {
    const thumbnailEl = document.createElement("img");
    thumbnailEl.addClass("auto-card-link-thumbnail");
    thumbnailEl.setAttr("src", props.image);
    thumbnailEl.setAttr("draggable", "false");
    cardEl.appendChild(thumbnailEl);
  }

  if (props.url) {
    const { url } = props;

    new ButtonComponent(containerEl)
      .setClass("auto-card-link-copy-url")
      .setClass("clickable-icon")
      .setIcon("copy")
      .setTooltip(`Copy URL\n${url}`)
      .onClick(() => {
        navigator.clipboard.writeText(url);
        new Notice("URL copied to your clipboard");
      });
  }

  return containerEl;
}
