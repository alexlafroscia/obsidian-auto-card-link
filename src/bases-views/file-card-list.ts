import { BasesView, QueryController } from "obsidian";

import { createFileCard } from "../components/file-card";
import { resolveBasesEntryCardProps } from "../resolvers/bases-entry-card";

export class FileCardListView extends BasesView {
  type = "FileCardListView";

  private cardRootElement: HTMLElement;

  constructor(controller: QueryController, containerEl: HTMLElement) {
    super(controller);

    this.cardRootElement = containerEl.createDiv();
  }

  onDataUpdated() {
    const cardElements = this.data.data
      .map((entry) => resolveBasesEntryCardProps(entry, this.config, this.app))
      .map((props) => createFileCard(props))
      // Insert a paragraph between each card to act as a spacer
      .flatMap((cardElement, index) => {
        if (index === 0) {
          return [cardElement];
        } else {
          return [window.createEl("p"), cardElement];
        }
      });

    this.cardRootElement.replaceChildren(...cardElements);
  }
}
