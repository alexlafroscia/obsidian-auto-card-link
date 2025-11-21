import { BasesView, QueryController } from "obsidian";
import { mount, unmount } from "svelte";

import FileCardList, {
  type Props as FileCardListProps,
} from "../components/FileCardList.svelte";
import { resolveBasesEntryCardProps } from "../resolvers/card/from-bases-entry";

export class FileCardListView extends BasesView {
  type = "FileCardListView";

  private fileCardListProps = $state<FileCardListProps>({ cards: [] });
  private fileCardListComponent: any;

  constructor(controller: QueryController, containerEl: HTMLElement) {
    super(controller);

    this.fileCardListComponent = mount(FileCardList, {
      target: containerEl.createDiv(),
      props: this.fileCardListProps,
    });
  }

  onDataUpdated() {
    const cards = this.data.data.map((entry) =>
      resolveBasesEntryCardProps(entry, this.config, this.app),
    );

    // Mutating the `$state` values passed as the props will automatically
    // cause the component to re-render
    this.fileCardListProps.cards = cards;
  }

  onunload() {
    unmount(this.fileCardListComponent);
  }
}
